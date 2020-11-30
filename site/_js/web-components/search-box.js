/*
 * Copyright 2020 Google LLC
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
import algoliasearch from 'algoliasearch/dist/algoliasearch-lite.esm.browser';
import {html} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';

import closeIcon from '../../_includes/icons/close.svg';
import searchIcon from '../../_includes/icons/search.svg';

import {BaseElement} from './base-element';

import {activateSearch, deactivateSearch} from '../actions/search';

const client = algoliasearch('0PPZV3EY55', 'f08cd9d7ead266781a7c2455b5f4a7b2');
const index = client.initIndex('prod_developer_chrome');

export class SearchBox extends BaseElement {
  static get properties() {
    return {
      active: {type: Boolean, reflect: true},
      buttonLabel: {type: String},
      locale: {type: String},
      placeholder: {type: String},
      results: {type: Array},
    };
  }

  set active(isActive) {
    if (this._active === isActive) {
      return;
    }

    const oldVal = this._active;
    this._active = isActive;
    if (isActive) {
      activateSearch();
    } else {
      deactivateSearch();
    }
    this.requestUpdate('active', oldVal);
  }

  get active() {
    return this._active;
  }

  constructor() {
    super();
    this._active = false;
    this.buttonLabel = 'open search';
    this.locale = 'en';
    this.placeholder = 'Search';
    /** @type AlgoliaCollectionItem[] */
    this.results = [];
    this.query = '';
    this.closeIcon = unsafeSVG(closeIcon);
    this.searchIcon = unsafeSVG(searchIcon);
  }

  firstUpdated() {
    this.input = /** @type {HTMLElement} */ (this.querySelector(
      '.search-box__input'
    ));
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onInput(e) {
    this.active = true;
    this.search(e.target.value);
  }

  async toggleSearch() {
    this.active = !this.active;
    if (this.active) {
      // Wait for the element to render, then focus the input.
      // We do this because the input will be display: none on mobile
      // and calling focus() on it would have no effect.
      await this.updateComplete;
      this.input?.focus();
    }
  }

  async search(query) {
    this.query = query.trim();
    if (this.query === '') {
      this.results = [];
      return;
    }
    try {
      const {hits: results} = await index.search(query, {
        hitsPerPage: 10,
        filters: `locale:"${this.locale}"`,
        highlightPreTag: '<strong>',
        highlightPostTag: '</strong>',
        // Adds a _snippetResult property to the response, truncated to 25 words.
        attributesToSnippet: ['content:25'],
        snippetEllipsisText: '…',
      });
      this.results = results.map(r => {
        const title = r._highlightResult.title.value;
        const content = r._snippetResult.content.value;
        const url = r.url;
        return {title, content, url};
      });
    } catch (err) {
      console.error(err);
      console.error(err.debugData);
    }
  }

  /**
   * @param {string} [content]
   * @return {TemplateResult|undefined}
   */
  renderContent(content) {
    if (!content || content.length === 0) {
      return;
    }
    return html`<p class="search-result__content">${unsafeHTML(content)}</p>`;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResults() {
    if (!this.active) {
      return;
    }
    return html`
      <div class="search-box__results">
        ${this.results.map(r => {
          return html`
            <div class="search-box__result">
              <a class="search-box__link" href="${r.url}">
                <h3 class="search-box__title type--h6">
                  ${unsafeHTML(r.title)}
                </h3>
                <div class="search-box__snippet type--small">
                  ${this.renderContent(r.content)}
                </div>
              </a>
            </div>
          `;
        })}
      </div>
    `;
  }

  render() {
    // prettier-ignore
    return html`
      <div class="search-box__inner">
        <button
          @click="${this.toggleSearch}"
          aria-label="${this.buttonLabel}"
          class="search-box__btn"
        >
          ${this.active ? this.closeIcon : this.searchIcon}
        </button>

        <input
          type="text"
          role="search"
          class="search-box__input"
          placeholder="${this.placeholder}"
          @input="${this.onInput}"
        />
      </div>
      ${this.renderResults()}
    `;
  }
}

customElements.define('search-box', SearchBox);
