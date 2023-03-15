/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Enhances events lists - reloading when filters
 * applied and making it possible to fetch more.
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import memoize from '../utils/memoize';
// eslint-disable-next-line no-unused-vars
import {LoadMore} from './load-more';

const getEvents = memoize(async () => {
  const response = await fetch('/events.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /events.json');
  }

  const all = await response.json();

  return {
    upcomingEvents: all.filter(event => !event.isPastEvent),
    pastEvents: all.filter(event => event.isPastEvent),
  };
});

export class EnhancedEventsList extends BaseElement {
  constructor() {
    super();

    this.type = null;
    this.filters = {};
    this.total = null;
    this.loadedItems = [];
    this.initialItems = [];
    this.errorMessage = this.querySelector('enhanced-events-list-error');
    this.fetchItems = this.fetchItems.bind(this);
  }

  static get properties() {
    return {
      filters: {type: Object, reflect: true},
      type: {type: String, reflect: true},
      loadedItems: {type: Array, reflect: false},
      total: {type: Number, reflect: false},
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.initialItems = Array.from(
      this.querySelectorAll('enhanced-event-card')
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  async attributeChangedCallback(name, oldval, newval) {
    if ('resolved' in this.dataset && name === 'filters') {
      /** @type {LoadMore} */ (this.querySelector('load-more'))?.restart();
    }

    super.attributeChangedCallback(name, oldval, newval);
  }

  /**
   * @param {{location:array, topics:array, googlers:array}[]} events
   * @returns {*}
   */
  filterEvents(events) {
    return events.filter(event => {
      if (
        this.filters.locations?.length &&
        !this.filters.locations.some(location => location === event.location)
      ) {
        return false;
      }

      if (
        this.filters.topics?.length &&
        !this.filters.topics.some(topic => event.topics.includes(topic))
      ) {
        return false;
      }

      if (
        this.filters.googlers?.length &&
        !this.filters.googlers.some(googler => event.googlers.includes(googler))
      ) {
        return false;
      }

      return true;
    });
  }

  async fetchItems(skip, take) {
    this.haveError = false;

    const groups = await getEvents();
    const events =
      this.type === 'UPCOMING'
        ? this.filterEvents(groups.upcomingEvents)
        : this.filterEvents(groups.pastEvents);

    return {
      updated_total: events.length,
      items: events.slice(skip, take + skip).map(event => event.html),
    };
  }

  render() {
    return html`
      <load-more .fetchItems="${this.fetchItems}" .total="${this.total}">
        ${this.initialItems}
        <load-more-error> ${this.errorMessage}</load-more-error>
      </load-more>
    `;
  }
}

customElements.define('enhanced-events-list', EnhancedEventsList);
