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
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import caretIcon from '../../_includes/icons/caret-down.svg';

/**
 * @type {HTMLElement}
 */
class CheckboxGroup extends BaseElement {
  constructor() {
    super();

    this._handleMassSelect = this._handleMassSelect.bind(this);
    this._handleShowMore = this._handleShowMore.bind(this);
    this._computeAllSelected = debounce(
      this._computeAllSelected.bind(this),
      10
    );

    this.setAttribute('enhanced', '');

    this.elements = {
      initialChildren: Array.from(this.children),
      checkboxes: this._getCheckboxes(),
    };

    this.show = 4;
    this.i18n = {};
  }

  static get properties() {
    return {
      allSelected: {type: Boolean, reflect: true},
      show: {type: Number, reflect: true},
      i18n: {type: Object, reflect: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.elements.massSelectButton = this.querySelector(
      '.checkbox-group__mass-select'
    );

    this.elements.showMoreButton = this.querySelector(
      '.checkbox-group__show-more'
    );

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', this._computeAllSelected);
    });

    this._computeAllSelected();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.elements.checkboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', this._computeAllSelected);
    });

    this.elements.massSelectButton.removeEventListener(
      'click',
      this._handleMassSelect
    );
  }

  render() {
    return html`
      <button
        class="checkbox-group__mass-select button button-text type--h6 color-primary"
        @click="${this._handleMassSelect}"
      >
        ${this.allSelected ? this.i18n.reset : this.i18n.select_all}
      </button>

      <div>${this.elements.initialChildren.slice(0, this.show)}</div>

      ${this._renderShowMoreButton()}
    `;
  }

  /**
   * @return {TemplateResult|undefined}
   */
  _renderShowMoreButton() {
    if (this.show >= this.elements.checkboxes.length) return;

    return html`
      <button
        class="checkbox-group__show-more button button-text type--h6 color-primary display-flex align-center"
        @click="${this._handleShowMore}"
      >
        ${unsafeSVG(caretIcon)} More
      </button>
    `;
  }

  _computeAllSelected() {
    const checked = this.elements.checkboxes
      .filter(checkbox => checkbox.disabled === false)
      .find(checkbox => checkbox.checked === false);

    this.allSelected = checked === undefined;
  }

  /**
   * @param {MouseEvent } e
   */
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

    this.show = this.elements.checkboxes.length;
  }

  /**
   * @param {MouseEvent }e
   */
  _handleShowMore(e) {
    e.preventDefault();

    this.show = this.elements.checkboxes.length;
  }

  /**
   * @returns {HTMLInputElement[]}
   */
  _getCheckboxes() {
    return Array.from(this.querySelectorAll('input[type="checkbox"]'));
  }
}

customElements.define('checkbox-group', CheckboxGroup);
