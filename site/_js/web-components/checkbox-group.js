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
 * @fileoverview Improves the UX of grouped checkboxes
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {debounce} from '../utils/debounce';

/**
 * @type {HTMLElement}
 */
class CheckboxGroup extends BaseElement {
  constructor() {
    super();

    this._handleMassSelect = this._handleMassSelect.bind(this);
    this._handleChange = debounce(this._handleChange.bind(this), 10);

    this.setAttribute('enhanced', '');

    this.elements = {
      initialChildren: Array.from(this.children),
      checkboxes: this._getCheckboxes(),
    };

    this.allSelected = false;
  }

  static get properties() {
    return {
      allSelected: {type: Boolean, reflect: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.elements.massSelectButton = this.querySelector(
      '.checkbox-group__mass-select'
    );

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this._handleChange);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', this._handleChange);
    });

    this.elements.massSelectButton.removeEventListener(
      'click',
      this._handleMassSelect
    );
  }

  render() {
    return html`
      <button
        class="checkbox-group__mass-select button button-text type--h5 color-primary"
        @click="${this._handleMassSelect}"
      >
        ${this.allSelected ? 'Deselect all' : 'Select all'}
      </button>

      ${this.elements.initialChildren}
    `;
  }

  _handleChange() {
    const checked = this.elements.checkboxes
      .filter(checkbox => checkbox.disabled === false)
      .find(checkbox => checkbox.checked === false);

    this.allSelected = checked === undefined;
  }

  _handleMassSelect(e) {
    e.preventDefault();

    const allSelected = this.allSelected;

    this.elements.checkboxes.forEach(checkbox => {
      if (
        (allSelected && !checkbox.checked) ||
        (!allSelected && checkbox.checked) ||
        checkbox.disabled
      )
        return;

      checkbox.checked = !allSelected;
      checkbox.dispatchEvent(new Event('change'));
    });
  }

  /**
   * @returns {HTMLInputElement[]}
   */
  _getCheckboxes() {
    return Array.from(this.querySelectorAll('input[type="checkbox"]'));
  }
}

customElements.define('checkbox-group', CheckboxGroup);
