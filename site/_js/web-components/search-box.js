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
import {debounce} from '../utils/debounce';

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
      docsLabel: {type: String},
      blogLabel: {type: String},
      locale: {type: String},
      placeholder: {type: String},
      results: {type: Array},
      cursor: {type: Number},
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
      this.cursor = -1;
      deactivateSearch();
    }
    this.setAttribute('aria-expanded', isActive.toString());
    this.requestUpdate('active', oldVal);
  }

  get active() {
    return this._active;
  }

  constructor() {
    super();
    this._active = false;
    this.buttonLabel = 'open search';
    this.docsLabel = 'Documentation';
    this.blogLabel = 'Blog';
    this.locale = 'en';
    this.placeholder = 'Search';
    this.query = '';
    /** @type AlgoliaCollectionItem[] */
    this.results = [];
    /** @type AlgoliaCollectionItem[] */
    this.docsResults = [];
    /** @type AlgoliaCollectionItem[] */
    this.blogResults = [];
    // Used when rendering categorized results. The counter helps ensure that
    // each result has a unique id that corresponds to its rendered order in
    // the list.
    this.resultsCounter = -1;
    // Used to track which result the user has navigated to using their keyboard.
    this.cursor = -1;
    /** @type {!HTMLInputElement} */
    this.input;
    this.closeIcon = unsafeSVG(closeIcon);
    this.searchIcon = unsafeSVG(searchIcon);

    this.renderResult = this.renderResult.bind(this);
    this.search = debounce(this.search.bind(this), 500);
  }

  clearSearch() {
    this.active = false;
    this.input.value = '';
    this.search('');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-owns', 'search-box__results');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', 'false');
  }

  firstUpdated() {
    this.input = /** @type {!HTMLInputElement} */ (this.querySelector(
      '.search-box__input'
    ));

    // Purely for style points.
    // Add a meta/ctrl + K keyboard shortcut to quick-focus the search input.
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        this.input.focus();
      }
    });
  }

  /**
   * Keep track of cursor changes and reflect them to aria-activedescendant.
   * This ensures screen readers properly announce the current search result.
   * We do this because focus never leaves the search input box, so when the
   * user is arrowing through results, we have to tell the screen reader about
   * it.
   * @param {Map<string, string>} changedProperties A Map of LitElement properties that changed.
   */
  updated(changedProperties) {
    if (!changedProperties.has('cursor')) {
      return;
    }

    if (this.cursor === -1) {
      this.input.removeAttribute('aria-activedescendant');
      return;
    }

    this.input.setAttribute(
      'aria-activedescendant',
      `search-box__link-${this.cursor}`
    );
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onInput(e) {
    // If the user has deleted everything in the search box, clear all state
    // and hide the results modal.
    if (!this.input.value) {
      this.clearSearch();
      return;
    }

    this.active = true;
    this.search(e.target.value);
  }

  /**
   * @param {WKeyboardEvent} e
   */
  onKeyDown(e) {
    // Check if the user is navigating within the search popout.
    switch (e.key) {
      case 'Home':
        e.preventDefault();
        this.firstHit();
        return;

      case 'End':
        e.preventDefault();
        this.lastHit();
        return;

      case 'ArrowUp':
        e.preventDefault();
        this.prevHit();
        return;

      case 'ArrowDown':
        e.preventDefault();
        this.nextHit();
        return;

      case 'Enter':
        this.navigateToResult();
        return;

      case 'Escape':
        this.clearSearch();
        return;
    }
  }

  firstHit() {
    this.cursor = 0;
    this.scrollHitIntoView();
  }

  nextHit() {
    if (this.cursor < this.results.length - 1) {
      this.cursor++;
    } else {
      this.cursor = 0;
    }
    this.scrollHitIntoView();
  }

  lastHit() {
    this.cursor = this.results.length - 1;
    this.scrollHitIntoView();
  }

  prevHit() {
    if (this.cursor <= 0) {
      this.cursor = this.results.length - 1;
    } else {
      --this.cursor;
    }
    this.scrollHitIntoView();
  }

  navigateToResult() {
    const link = /** @type {HTMLAnchorElement} */ (this.querySelector(
      '.search-box__link[aria-selected="true"]'
    ));

    if (link) {
      window.location.href = link.href;
    }
  }

  /**
   * Changing this.cursor causes LitElement to render,
   * so we wait for LitElement to render,
   * then we attempt to scroll the current active link into view.
   *
   * This is done because focus never leaves the input field since the user may
   * still be typing their query. As a result, we need to tell the browser to
   * scroll if the user has arrowed down to a result that has overflown the
   * container.
   */
  scrollHitIntoView() {
    this.requestUpdate().then(() => {
      const activeLink = /** @type {HTMLAnchorElement} */ (this.querySelector(
        '.search-box__link[aria-selected="true"]'
      ));

      const modal = /** @type {HTMLElement} */ (this.querySelector(
        '.search-box__results'
      ));

      // Unfortunately we can't use scrollIntoView() as it seems to scroll the
      // entire page. So instead we manually scroll the modal to the offsetTop
      // of the active link.
      if (activeLink && modal) {
        modal.scrollTo({top: activeLink.offsetTop, behavior: 'smooth'});
      }
    });
  }

  async toggleSearch() {
    this.active = !this.active;
    if (this.active) {
      // Wait for the element to render, then focus the input.
      // We do this because the input will be display: none on mobile
      // and calling focus() on it would have no effect.
      await this.updateComplete;
      this.input.focus();
    } else {
      this.clearSearch();
    }
  }

  async search(query) {
    this.query = query.trim();
    if (this.query === '') {
      this.results = [];
      this.docsResults = [];
      this.blogResults = [];
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
        // Algolia organizes searchable fields into the following structure:
        // {title: {value: 'some content', matchLevel: 'full|partial|none' }}
        // This helper just lets us define keys that we want to extract the
        // value from and add to the top level result object.
        // At present we only use a single key, 'title', but we'll probably add
        // more keys over time (tags, etc) so I'm leaving this helper in place.
        const highlightKeys = ['title'];
        for (const highlightKey of highlightKeys) {
          const highlightValue = r._highlightResult[highlightKey];
          if (highlightValue && highlightValue.matchLevel === 'full') {
            r[highlightKey] = highlightValue.value;
          }
        }
        r.snippet = r._snippetResult.content.value;
        return r;
      });

      // Further categorize results into docs and blog posts.
      this.docsResults = this.results.filter(r => r.type === 'doc');
      this.blogResults = this.results.filter(r => r.type === 'blogPost');
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

    return html`<p>${unsafeHTML(content)}</p>`;
  }

  /**
   * @param {string} [image]
   * @return {TemplateResult|undefined}
   */
  renderImage(image) {
    if (!image || image.length === 0) {
      return;
    }

    return html`<img
      class="search-box__thumbnail"
      src="${image}"
      width="100"
      height="100"
      alt=""
    />`;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResult(result) {
    // Because we split results across multiple sections (docs, blog, etc)
    // we need to have a single top-level counter so when the user presses
    // the down arrow key, we navigate to the next result, regardless of
    // which section its in.
    this.resultsCounter += 1;
    return html`
      <div role="presentation">
        <a
          id="search-box__link-${this.resultsCounter}"
          class="search-box__link"
          href="${result.url}"
          aria-selected="${this.resultsCounter === this.cursor}"
          role="option"
        >
          <div>
            <h3 class="search-box__title type--h6">
              ${unsafeHTML(result.title)}
            </h3>
            <div class="search-box__snippet type--small">
              ${this.renderContent(result.snippet)}
            </div>
          </div>
          ${this.renderImage(result.image)}
        </a>
      </div>
    `;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  renderResults() {
    if (!this.active) {
      return;
    }

    this.blogResults = this.blogResults || [];
    this.docsResults = this.docsResults || [];

    this.resultsCounter = -1;
    return html`
      <div
        id="search-box__results"
        class="search-box__results"
        role="listbox"
        aria-label="${this.placeholder}"
      >
        ${this.blogResults.length
          ? html`
              <div class="search-box__result-heading type--label">
                ${this.blogLabel.toUpperCase()}
              </div>
              ${this.blogResults.map(this.renderResult)}
            `
          : ''}
        ${this.docsResults.length
          ? html`
              <div class="search-box__result-heading type--label">
                ${this.docsLabel.toUpperCase()}
              </div>
              ${this.docsResults.map(this.renderResult)}
            `
          : ''}
      </div>
    `;
  }

  render() {
    // prettier-ignore
    return html`
      <div class="search-box__inner" role="presentation">
        <button
          @click="${this.toggleSearch}"
          aria-label="${this.buttonLabel}"
          class="search-box__btn"
        >
          ${this.active ? this.closeIcon : this.searchIcon}
        </button>

        <input
          type="text"
          class="search-box__input"
          placeholder="${this.placeholder}"
          @input="${this.onInput}"
          @keydown="${this.onKeyDown}"
          aria-label="${this.placeholder}"
          aria-autocomplete="list"
        />
      </div>
      ${this.renderResults()}
    `;
  }
}

customElements.define('search-box', SearchBox);
