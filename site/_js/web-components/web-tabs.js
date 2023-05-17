/*
 * Copyright 2021 Google LLC
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
 * @fileoverview A component for displaying horizontal tabs.
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {generateIdSalt} from '../utils/salt';

export class WebTabs extends BaseElement {
  constructor() {
    super();
    this._tabPanels = [];
    this.onSelect = this.onSelect.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._id = `tabs-${generateIdSalt('tabs-')}`;
    this._selected = this._getSelectedTabIndex();
  }

  onSelect(e) {
    const tabIndex = parseInt(e.target.id.split('-').pop(), 10);
    if (this._selected !== tabIndex) {
      this._select(tabIndex);
    }
  }

  _select(tabIndex) {
    this._selected = tabIndex;
    this._tabPanels.forEach(tabPanel => {
      const tabIndex = parseInt(tabPanel.id.split('-').pop(), 10);
      const tabId = '#' + tabPanel.getAttribute('aria-labelledby');
      const tab = this.querySelector(tabId);
      if (this._selected !== tabIndex) {
        tabPanel.setAttribute('hidden', 'hidden');
        tab?.setAttribute('tabindex', '-1');
        tab?.setAttribute('aria-selected', 'false');
      } else {
        tabPanel.removeAttribute('hidden');
        tab?.setAttribute('tabindex', '0');
        tab?.setAttribute('aria-selected', 'true');
      }
    });
  }

  _formatTabs() {
    return this._tabPanels.map((child, i) => {
      const title = child.getAttribute('title');
      child.removeAttribute('title');
      const tabId = `${this._id}__tab-${i}`;
      const tabPanelId = `${this._id}__tabpanel-${i}`;
      child.setAttribute('id', tabPanelId);
      child.setAttribute('role', 'tabpanel');
      child.setAttribute('aria-labelledby', tabId);
      child.setAttribute('tabindex', 0);
      if (i !== this._selected) {
        child.setAttribute('hidden', 'hidden');
      } else {
        child.removeAttribute('hidden');
      }

      return html`<button
        role="tab"
        id="${tabId}"
        aria-selected="${i === this._selected}"
        aria-controls="${tabPanelId}"
        tabindex="${i === this._selected ? 0 : -1}"
        @click="${this.onSelect}"
      >
        ${title}
      </button>`;
    });
  }

  _getSelectedTabIndex() {
    const hash = window.location.hash;

    if (!hash) {
      return 0;
    }

    const targetElement = this.querySelector(hash);

    if (!targetElement) {
      return 0;
    }

    const tab = targetElement.closest('web-tab');

    if (!tab) {
      return 0;
    }

    return Array.from(this.children).indexOf(tab);
  }

  render() {
    if ('resolved' in this.dataset) {
      return Array.from(this.children);
    }

    this._tabPanels = Array.from(this.children);
    const tabs = this._formatTabs();

    return html`
      <div role="tablist">${tabs}</div>
      ${this._tabPanels}
    `;
  }
}

customElements.define('web-tabs', WebTabs);
