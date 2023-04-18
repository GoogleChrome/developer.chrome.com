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
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

import {store} from '../store';
import {removeEntry} from '../actions/filter';

export class MobileFilters extends BaseElement {
  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStoreUpdate.bind(this));
    this.addEventListener('click', this.openMobileFilters);
    this.addEventListener('click', this.closeMobileFilters);
    this.addEventListener('click', this.resetFilters);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.openMobileFilters);
    this.removeEventListener('click', this.closeMobileFilters);
  }

  openMobileFilters(event) {
    const target = event.target;
    if (target.classList.contains('mobile-filters-btn')) {
      /** @type {HTMLDialogElement|null} */
      const dialog = document.querySelector('#mobile-filters');
      if (dialog) {
        dialog.showModal();
      }
    }
  }

  resetFilters(event) {
    const target = event.target;
    if (target.id === 'mobile-filters-reset') {
      for (const item of this.items) {
        removeEntry(item.name, item);
      }
    }
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

  closeMobileFilters(event) {
    const target = event.target;
    if (target.id === 'mobile-filters-done' || target.nodeName === 'DIALOG') {
      /** @type {HTMLDialogElement|null} */
      const dialog = document.querySelector('#mobile-filters');
      if (dialog) {
        dialog.close();
      }
    }
  }

  render() {
    return html` ${unsafeHTML(this.innerHTML)} `;
  }
}

customElements.define('mobile-filters', MobileFilters);
