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
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import arrowIcon from '../../_includes/icons/arrow-forward.svg';
import {generateIdSalt} from '../utils/salt';

export class LoadMore extends BaseElement {
  constructor() {
    super();

    this.total = null;
    this.skip = 0;
    this.take = 10;
    /**
     * @callback
     * @param {number} skip
     * @param {number} take
     * @returns {{items: string[], updated_total: number|undefined}} a list of html strings and an updated total if appropriate
     */
    this.fetchItems = null;
    this.initialItems = [];
    this.loadedItems = [];
    this._loading = false;
    this._haveError = false;
    this.i18n = {};
    this._id = `load-more-${generateIdSalt('load-more-')}`;
  }

  static get properties() {
    return {
      skip: {type: Number, reflect: true},
      take: {type: Number, reflect: true},
      total: {type: Number, reflect: true},
      fetchItems: {type: Function, reflect: false},
      _loading: {type: Boolean, state: true},
      i18n: {type: Object, reflect: true},
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.initialItems = Array.from(this.children);
    this.skip = this.initialItems.length;
  }

  shouldUpdate(_changedProperties) {
    return !('resolved' in this.dataset) || _changedProperties.has('_loading');
  }

  updated(_changedProperties) {
    if (
      'resolved' in this.dataset &&
      _changedProperties.has('_loading') &&
      this._loading === true
    ) {
      this.updateComplete.then(async () => {
        await this._loadMore();
        this._loading = false;
      });
    }

    super.updated(_changedProperties);
  }

  async _loadMore() {
    try {
      this._haveError = false;

      const {items, updated_total} = await this.fetchItems(
        this.skip,
        this.take
      );

      if (updated_total !== undefined) {
        this.total = updated_total;
      }

      this.loadedItems = this.loadedItems.concat(items);

      this.skip += items.length;

      this.dispatchEvent(
        new CustomEvent('items-loaded', {
          detail: items,
        })
      );
    } catch (e) {
      this._haveError = true;
    }
  }

  restart() {
    this.loadedItems = [];
    this.initialItems = [];
    this.skip = 0;
    this._loading = true;
  }

  _renderError() {
    if (!this._haveError) return null;

    return html`
      <p class="load-more__error color-red-medium gap-top-300">
        ${this.i18n.errorMessage}
        <a
          href="https://github.com/GoogleChrome/developer.chrome.com/issues/new?labels=bug&template=bug_report.md"
          class="color-red-medium"
        >
          ${this.i18n.errorLinkLabel}
        </a>
      </p>
    `;
  }

  _handleClick() {
    this._loading = true;
  }

  _renderButton() {
    if (this.skip >= this.total) return null;

    return html`
      <button
        ?disabled="${this._loading}"
        class="load-more__button type--small display-inline-flex"
        aria-controls="${this._id}-items"
        @click="${this._handleClick}"
      >
        ${this.i18n.buttonLabel} ${unsafeSVG(arrowIcon)}
      </button>
    `;
  }

  _renderItems() {
    if (this._haveError) return null;

    const haveItems =
      this.initialItems.length > 0 || this.loadedItems.length > 0;

    if (!haveItems)
      return html`<p class="load-more__noResults">
        ${this.i18n.noResultsMessage}
      </p>`;

    return html`
      <div id="${this._id}-items" class="load-more__items">
        ${this.initialItems} ${unsafeHTML(this.loadedItems.join(''))}
      </div>
    `;
  }

  render() {
    return html`
      ${this._renderItems()} ${this._renderError()} ${this._renderButton()}
    `;
  }
}

customElements.define('load-more', LoadMore);
