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
 * @fileoverview A component responsible for handling orchestration on th
 * events page.
 */
import {BaseElement} from './base-element';
import {EnhancedSelect} from './enhanced-select';

export class EnhancedEventsPage extends BaseElement {
  constructor() {
    super();

    this.selectedFilters = {
      topics: [],
      location: [],
      googler: [],
    };

    this.filterElements = this.getFilterElements();
    this.mobileElements = this.getMobileElements();
  }

  static get properties() {
    return {
      selectedFilters: {type: Object, state: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.mobileElements.handleConnect();
    this.filterElements.handleConnect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mobileElements.handleDisconnect();
    this.filterElements.handleDisconnect();
  }

  /**
   * @returns {{handleConnect: function, handleDisconnect: function, opener: Element, filters: Element}}
   */
  getMobileElements() {
    const filters = this.querySelector('#mobile-filters');
    const opener = this.querySelector('#mobile-filters-opener');

    if (opener === null) {
      throw new Error('Element missing: #mobile-filters-opener');
    }

    if (filters === null) {
      throw new Error('Element missing: #mobile-filters');
    }

    const handleOpen = () => {
      // @ts-ignore
      filters.showModal();
    };

    const closeOnBackdropClick = e => {
      // @ts-ignore
      if (e.target.tagName === 'DIALOG') filters.close();
    };

    return {
      filters,
      opener,
      handleConnect: () => {
        opener.addEventListener('click', handleOpen);
        filters.addEventListener('click', closeOnBackdropClick);
      },
      handleDisconnect: () => {
        opener.removeEventListener('click', handleOpen);
        filters.removeEventListener('click', closeOnBackdropClick);
      },
    };
  }

  /**
   * @returns {{handleConnect: function, handleDisconnect: function, filters: NodeListOf<Element>}}
   */
  getFilterElements() {
    const filters = this.querySelectorAll('.events-filter');

    const clickHandler = e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }

      this.selectedFilters = {
        ...this.selectedFilters,
        ...{[t.name]: t.value},
      };
    };

    return {
      filters,
      handleConnect: () => {
        filters.forEach(ele => {
          ele.addEventListener('change', clickHandler);
        });
      },
      handleDisconnect: () => {
        filters.forEach(ele => {
          ele.removeEventListener('change', clickHandler);
        });
      },
    };
  }

  render() {
    return Array.from(this.children);
  }
}

customElements.define('enhanced-events-page', EnhancedEventsPage);
