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
 * @fileoverview A component for displaying items on a table that can be filtered. If the filter
 * selection doesn't match the filter data specified the component results hidden
 */
import {BaseStateElement} from './base-state-element';
//import {html} from 'lit-element';

export class FilteredElement extends BaseStateElement {
  static get properties() {
    return {
      hidden: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.hidden = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.content = this.innerHTML;

    this.filters = {};
    const attributes = this.getAttributeNames();
    for (const attribute of attributes) {
      if (!attribute.startsWith('data-filter-')) {
        continue;
      }
      const name = attribute.replace('data-filter-', '');
      this.filters[name] = this.getAttribute(attribute);
    }
  }

  onStateChanged(state) {
    const activeFilters = state.filters || {};

    // Remove any empty filter arrays
    for (const key in activeFilters) {
      if (activeFilters[key] && activeFilters[key].length === 0) {
        delete activeFilters[key];
      }
    }

    // Check for matches
    if (Object.keys(activeFilters).length === 0) {
      // Show all elements when no filters are active
      this.hidden = false;
      return;
    }

    // Hide elements that don't match the active filters
    this.hidden = false;

    for (const [filterName, filterInput] of Object.entries(activeFilters)) {
      const values = filterInput.map(input => input.value);
      if (this.filters && !values.includes(this.filters[filterName])) {
        this.hidden = true;
      }
    }
  }
}
customElements.define('filtered-element', FilteredElement);
