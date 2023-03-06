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
import {loadMore} from '../misc/load-more';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

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
    this.loader = null;
    this.loadMoreButton = this.getLoadMoreButton();
    this.loadedItems = [];
    this.initialItems = [];
    this.omitInitialItems = false;
    this.haveError = false;
    this.errorMessage = this.querySelector('enhanced-events-list-error');
  }

  static get properties() {
    return {
      filters: {type: Object, reflect: true},
      type: {type: String, reflect: true},
      loadedItems: {type: Array, reflect: false},
      total: {type: Number, reflect: false},
      haveError: {type: Boolean, reflect: false},
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.initialItems = Array.from(
      this.querySelectorAll('enhanced-event-card')
    );

    this.loader = await this.initLoadMore();

    this.loadMoreButton?.handleConnect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.loadMoreButton?.handleDisconnect();
  }

  async attributeChangedCallback(name, oldval, newval) {
    if ('resolved' in this.dataset && name === 'filters') {
      this.omitInitialItems = true;
      this.loadedItems = await this.loader?.restart();
    }

    super.attributeChangedCallback(name, oldval, newval);
  }

  getLoadMoreButton() {
    const element = this.querySelector('.load-more__button');

    const handleClick = async () => {
      if (!element) return;

      element.setAttribute('disabled', '');

      const loaded = await this.loader?.nextPage();

      this.loadedItems = this.loadedItems.concat(loaded);

      element.removeAttribute('disabled');
    };

    return {
      element,
      handleConnect: () => {
        element?.addEventListener('click', handleClick);
      },
      handleDisconnect: () => {
        element?.removeEventListener('click', handleClick);
      },
    };
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

  /**
   * @returns {Promise<{currentOffset, total, take, nextPage, isLastPage, restart}>}
   */
  async initLoadMore() {
    return loadMore(
      async (skip, take) => {
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
      },
      () => (this.haveError = true),
      {
        skip: this.initialItems.length,
        take: 10,
        total: this.total,
      }
    );
  }

  render() {
    const initialItems = this.omitInitialItems ? null : this.initialItems;

    const loadMoreButton = this.loader?.isLastPage()
      ? null
      : this.loadMoreButton?.element;

    const errorMessage = this.haveError ? this.errorMessage : null;

    return html`
      <div class="display-grid grid-cols-1 grid-gap-400">
        ${initialItems} ${unsafeHTML(this.loadedItems.join(''))}
      </div>
      ${loadMoreButton} ${errorMessage}
    `;
  }
}

customElements.define('enhanced-events-list', EnhancedEventsList);
