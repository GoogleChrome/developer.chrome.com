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

import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

export class FiltersWrapper extends BaseElement {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.openMobileFilters);
    this.addEventListener('click', this.closeMobileFilters);
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
        //dialog.showModal();
      }
    }
  }

  closeMobileFilters(event) {
    const target = event.target;
    if (target.id === 'mobile-filters-done') {
      /** @type {HTMLDialogElement|null} */
      const dialog = document.querySelector('#mobile-filters');
      if (dialog) {
        //dialog.close();
      }
    }
  }

  render() {
    return html` ${unsafeHTML(this.innerHTML)} `;
  }
}

customElements.define('filters-wrapper', FiltersWrapper);
