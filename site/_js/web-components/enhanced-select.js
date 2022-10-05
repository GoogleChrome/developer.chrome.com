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
 * @fileoverview Progressively enhances the select element. Supports
 * both single and multi select.
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import arrowDownIcon from '../../_includes/icons/arrow-down.svg';
import {generateIdSalt} from '../utils/salt';

export class EnhancedSelect extends BaseElement {
  static get formAssociated() {
    return true;
  }

  constructor() {
    super();

    // @ts-ignore
    this.internals = this.attachInternals();

    this.handleOpen = this.handleOpen.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleSelection = this.handleSelection.bind(this);

    this.classList.add('enhanced-select');

    const nativeSelect = this._getSelect();

    this.name = this.name || this._getName(nativeSelect);
    this.multiple = this.multiple || nativeSelect.hasAttribute('multiple');
    this.label = this._getLabel();
    this.options = this._getOptions();
    this._dropdownId = this._generateId('dropdown');
    this._labelId = this._generateId('label');
    this._elements = {};

    this.setValue(this.getSelectedValues());
  }

  static get properties() {
    return {
      name: {type: String, reflect: true},
      label: {type: String, reflect: false},
      value: {type: Array, reflect: true},
      open: {type: Boolean, reflect: true},
      multiple: {type: Boolean, reflect: true},
      options: {type: Array, reflect: false},
    };
  }

  setValue(value) {
    this.value = value;

    const data = new FormData();

    value.forEach(value => data.append(this.name, value));

    this.internals.setFormValue(data);

    this.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this._elements.label = this.querySelector(`#${this._labelId}`);
    this._elements.buttons = this.querySelector(`#${this._dropdownId} button`);

    this.addEventListener('focusout', this.handleFocusOut);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('focusout', this.handleFocusOut);

    this._elements.label?.removeEventListener('click', this.handleOpen);
    this._elements.label?.removeEventListener('keypress', this.handleOpen);
    Array.from(this._elements.buttons).forEach(button =>
      button.removeEventListener('click', this.handleSelection)
    );
  }

  render() {
    return html`
      <div
        class="enhanced-select__wrapper display-flex align-center"
        ?open="${this.open}"
      >
        <label
          id="${this._labelId}"
          class="display-flex align-center"
          aria-controls="${this._dropdownId}"
          tabindex="0"
          @click="${this.handleOpen}"
          @keypress="${this.handleOpen}"
        >
          ${this.label} ${unsafeSVG(arrowDownIcon)}
        </label>

        <ul id="${this._dropdownId}" class="enhanced-select__options">
          ${this.options.map(
            option => html`
              <button
                class="button width-full gap-bottom-100"
                @click="${this.handleSelection}"
                ?selected="${this.value.includes(option.value)}"
                id="${option.id}"
              >
                ${option.label}
              </button>
            `
          )}
        </ul>
      </div>
    `;
  }

  /**
   * @returns {string|null}
   * @private
   */
  _getLabel() {
    const element = this.querySelector('label');

    if (!element || !element.firstChild) {
      throw new Error('Missing element: label');
    }

    return element.firstChild.nodeValue;
  }

  _getName(nativeSelect) {
    if (!nativeSelect.hasAttribute('name')) {
      throw new Error('Missing attribute: name');
    }

    return nativeSelect.getAttribute('name');
  }

  /**
   * @returns {HTMLSelectElement}
   * @private
   */
  _getSelect() {
    const element = this.querySelector('select');

    if (!element || !element.firstChild) {
      throw new Error('Missing element: select');
    }

    return element;
  }

  /**
   * @returns {{id, label: *, value: *, selected: *}[]}
   * @private
   */
  _getOptions() {
    const elements = this.querySelectorAll('option');

    if (elements.length === 0) {
      throw new Error('Missing element: option');
    }

    return Array.from(elements).map((option, index) => ({
      id: option.id || this._generateId(`option-${index}`),
      label: option.label,
      value: option.value,
      selected: option.selected,
    }));
  }

  /**
   * @param {string} element
   * @returns {string}
   * @private
   */
  _generateId(element) {
    const prefix = `enhanced-select-${element}`;

    return `${prefix}-${generateIdSalt(prefix)}`;
  }

  handleOpen(e) {
    if (e.type === 'keypress' && e.keyCode !== 13) {
      return;
    }

    this.open = !this.open;
  }

  handleFocusOut(e) {
    if (this.contains(e.relatedTarget)) return;

    this.open = false;
  }

  handleSelection(e) {
    e.preventDefault();

    const option = this.options.find(option => e.target.id === option.id);

    if (!option) {
      throw new Error(`Missing option: ${e.target.id}`);
    }

    this.multiple
      ? (option.selected = !option.selected)
      : this.options.map(o => (o.selected = o === option));

    this.setValue(this.getSelectedValues());

    this.open = this.multiple;
  }

  getSelectedValues() {
    return this.options.filter(o => o.selected).map(o => o.value);
  }
}

customElements.define('enhanced-select', EnhancedSelect);
