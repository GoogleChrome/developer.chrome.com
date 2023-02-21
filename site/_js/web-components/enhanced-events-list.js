/*
 * Copyright 2022 Google LLC
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

  //todo - handle
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
    this.loader = null;
    this.loadMoreButton = this.getLoadMoreButton();
    this.loadedItems = [];
    this.initialItems = [];
  }

  static get properties() {
    return {
      filters: {type: Object, reflect: true},
      type: {type: String, reflect: true},
      loadedItems: {type: Array, reflect: false},
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
    super.attributeChangedCallback(name, oldval, newval);

    if ('resolved' in this.dataset && name === 'filters') {
      const loaded = await this.loader?.restart();

      this.loadedItems = loaded || [];
    }
  }

  getLoadMoreButton() {
    const element = this.querySelector('.load-more__button');

    const handleClick = async () => {
      if (!element) return;

      element.setAttribute('disabled', '');

      const loaded = await this.loader?.next();

      this.loadedItems = this.loadedItems.concat(loaded || []);

      element.removeAttribute('disabled');

      if (this.loader?.currentOffset() >= this.loader?.total()) {
        element.setAttribute('hidden', '');
      }
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
        this.filters?.location !== undefined &&
        this.filters.location[0] !== event.location
      ) {
        return false;
      }

      if (
        this.filters?.topics !== undefined &&
        !this.filters.topics.some(topic => event.topics.includes(topic))
      ) {
        return false;
      }

      if (
        this.filters?.googler !== undefined &&
        !event.googlers.includes(this.filters.googler[0])
      ) {
        return false;
      }

      return true;
    });
  }

  haveFilters() {
    return Object.entries(this.filters).some(i => i[1].length > 0);
  }

  /**
   * @returns {Promise<{currentOffset, total, take, restart}|null>}
   */
  async initLoadMore() {
    return loadMore(
      async (skip, take) => {
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
      () => {
        document
          .getElementById('loading-error')
          ?.classList.remove('display-none');
      },
      {
        skip: this.initialItems.length,
        take: 10,
      }
    );
  }

  render() {
    const initialItems = !this.haveFilters() ? this.initialItems : null;

    return html`
      <div class="display-grid grid-cols-1 grid-gap-400">
        ${initialItems} ${unsafeHTML(this.loadedItems.join(''))}
      </div>
      ${this.loadMoreButton?.element}
    `;
  }
}

customElements.define('enhanced-events-list', EnhancedEventsList);
