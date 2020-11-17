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
import {algolia} from '../../_data/site.json';

const client = algoliasearch(algolia.applicationID, algolia.apiKey);
const index = client.initIndex(algolia.indexName);

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

  constructor() {
    super();
    this.active = false;
    this.buttonLabel = 'open search';
    this.locale = 'en';
    this.placeholder = 'Search';
    /** @type AlgoliaCollectionItem[] */
    this.results = [];
    this.query = '';
    this.closeIcon = unsafeSVG(closeIcon);
    this.searchIcon = unsafeSVG(searchIcon);
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onInput(e) {
    this.active = true;
    this.search(e.target.value);
  }

  /**
   * @param {WMouseEvent<HTMLButtonElement>} e
   */
  toggleSearch(e) {
    this.active = !this.active;
    if (this.active) {
      e.target.blur();
      this.querySelector('input')?.focus();
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
      });
      this.results = results.map(r => {
        const highlightKeys = ['title', 'content'];
        for (const highlightKey of highlightKeys) {
          const highlightValue = r._highlightResult[highlightKey];
          if (highlightValue && highlightValue.matchLevel === 'full') {
            r[highlightKey] = highlightValue.value;
          }
        }
        return r;
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
    return html`
      <p class="search-result__content">
        ${unsafeHTML(content)}
      </p>
    `;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResults() {
    if (!this.active) {
      return;
    }
    return html`<div>
      <button
        @click="${this.toggleSearch}"
        class="search-box__btn button display-flex align-center justify-center width-700 height-700"
      >
        ${this.closeIcon}
      </button>
      ${this.results.map(r => {
        return html`
          <div>
            <a href="${r.url}">
              <h3>${unsafeHTML(r.title)}</h3>
              ${this.renderContent(r.content)}
            </a>
          </div>
        `;
      })}
    </div>`;
  }

  render() {
    return html`
      <div class="search-box__inner align-center display-grid">
        <button
          @click="${this.toggleSearch}"
          aria-label="${this.buttonLabel}"
          class="search-box__btn button display-flex lg:display-none align-center justify-center width-700 height-700"
        >
          ${this.active ? this.closeIcon : this.searchIcon}
        </button>

        <input
          type="search"
          class="search-box__input lg:display-block lg:width-full
          ${this.active ? '' : 'display-none'}"
          aria-label="search"
          placeholder="${this.placeholder}"
          @input="${this.onInput}"
        />

        ${this.searchIcon}
      </div>
      ${this.renderResults()}
    `;
  }
}

customElements.define('search-box', SearchBox);
