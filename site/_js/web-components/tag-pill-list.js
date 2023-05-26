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
 * @fileoverview Given a key-value array, renders
 * a list of tag-pills
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import closeIcon from '../../_includes/icons/close-tag-pill.svg';

import {store} from '../store';
import {removeEntry, clearFilters} from '../actions/filter';

export class TagPillList extends BaseElement {
  static get properties() {
    return {
      items: {type: Array, reflect: true},
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdate.bind(this));
  }

  onStoreUpdate(state) {
    const filters = state.filters || {};
    const items = [];
    for (const [name, entries] of Object.entries(filters)) {
      for (const item of entries) {
        items.push({
          name: name,
          value: item.value,
          label: item.label,
        });
      }
    }
    this.items = items;
  }

  _onClickPill(item) {
    removeEntry(item.name, item);
  }

  _onClickClearPills() {
    clearFilters();
  }

  render() {
    return [
      this.items.length > 0
        ? html`
            <span
              class="clear-filters tag-pill rounded-lg surface hairline type--small display-inline-flex align-center"
              @click="${() => this._onClickClearPills()}"
            >
              Clear filters
            </span>
          `
        : '',
      this.items.map(
        item => html`
          <span
            class="surface hairline rounded-lg tag-pill type--small display-inline-flex align-center "
            data-name="${item.name}"
            data-value="${item.value}"
            @click="${() => this._onClickPill(item)}"
          >
            ${item.label} ${unsafeSVG(closeIcon)}
          </span>
        `
      ),
    ];
  }
}

customElements.define('tag-pill-list', TagPillList);
