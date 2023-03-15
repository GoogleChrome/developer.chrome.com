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

export class LoadMore extends BaseElement {
  constructor() {
    super();

    this.total = null;
    this.skip = 0;
    this.take = 10;
    this.fetchItems = null;
    this.initialItems = [];
    this.loadedItems = [];
    this.button = null;
    this._loading = false;
    this._haveError = false;
    this.i18n = {};
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

    this.initialItems = Array.from(this.querySelectorAll('.load-more__item'));
    this.skip = this.initialItems.length;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    this.button = this._getButton();
    this.button?.handleConnect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.button?.handleDisconnect();
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

      this.total = updated_total;

      this.loadedItems = this.loadedItems.concat(items);

      this.skip += items.length;
    } catch (e) {
      this._haveError = true;
    }
  }

  _getButton() {
    const element = this.querySelector('.load-more__button');

    const handleClick = async () => {
      this._loading = true;
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

  restart() {
    this.loadedItems = [];
    this.initialItems = [];
    this.skip = 0;
    this._loading = true;
  }

  _renderError() {
    if (!this._haveError) return null;

    return html`
      <p class="color-red-medium gap-top-300">
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

  _renderButton() {
    if (this.skip >= this.total) return null;

    return html`
      <button
        ?disabled="${this._loading}"
        class="load-more__button type--small display-inline-flex"
        aria-controls="upcoming-events"
      >
        ${this.i18n.buttonLabel} ${unsafeSVG(arrowIcon)}
      </button>
    `;
  }

  //todo - fix aria-controls
  render() {
    return html`
      <div class="load-more__items">
        ${this.initialItems} ${unsafeHTML(this.loadedItems.join(''))}
      </div>
      ${this._renderError()} ${this._renderButton()}
    `;
  }
}

customElements.define('load-more', LoadMore);
