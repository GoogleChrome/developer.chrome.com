/*
 * Copyright 2022 Google LLC
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
 * @fileoverview Wraps a native select element, offering custom ux.
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import arrowDownIcon from '../../_includes/icons/arrow-down.svg';
import {generateIdSalt} from '../utils/salt';

export class EnhancedSelect extends BaseElement {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);

    this.classList.add('enhanced-select');
    this._dropdownId = `enhanced-select-dropdown-${generateIdSalt(
      'enhanced-select-dropdown-'
    )}`;
  }

  static get properties() {
    return {
      open: {type: Boolean, reflect: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this._label = this._getLabel();
    this._select = this._getSelect();
    this._options = this._getOptions(this._select);

    this.addEventListener('focusout', this.onFocusOut);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusout', this.onFocusOut);
  }

  render() {
    return html`
      <div class="enhanced-select__wrapper" ?open="${this.open}">
        <label
          class="display-flex align-center"
          aria-controls="${this._dropdownId}"
          @click="${this.onClick}"
          @keypress="${this.onClick}"
          tabindex="0"
        >
          ${this._label} ${unsafeSVG(arrowDownIcon)}
        </label>

        <ul id="${this._dropdownId}" class="enhanced-select__options">
          ${this._options?.map(
            o => html`
              <button class="button width-full gap-bottom-100">
                ${o.label}
              </button>
            `
          )}
        </ul>
      </div>

      <div class="enhanced-select__select">${this._select}</div>
    `;
  }

  /**
   * @returns {string|null}
   * @private
   */
  _getLabel() {
    const element = this.querySelector('label');

    if (!element || !element.firstChild) {
      throw new Error('Please provide a populated label element');
    }

    return element.firstChild.nodeValue;
  }

  /**
   * @returns {HTMLSelectElement}
   * @private
   */
  _getSelect() {
    const element = this.querySelector('select');

    if (!element || !element.firstChild) {
      throw new Error('Please provide a select element');
    }

    return element;
  }

  /**
   * @param selectElement
   * @returns {{label: string, value: string}[]}
   * @private
   */
  _getOptions(selectElement) {
    const elements = selectElement.querySelectorAll('option');

    if (elements.length === 0) {
      throw new Error('Please provide one or more option elements');
    }

    return Array.from(elements).map(option => {
      return {
        label: option.innerText,
        value: option.getAttribute('value'),
      };
    });
  }

  onClick(e) {
    if (e.type === 'keypress' && e.keyCode !== 13) {
      return;
    }

    this.open = !this.open;
  }

  onFocusOut(e) {
    if (this.contains(e.relatedTarget)) return;

    this.open = false;
  }
}

customElements.define('enhanced-select', EnhancedSelect);
