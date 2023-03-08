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

/**
 * @fileoverview Given a key-value array, renders
 * a list of tag-pills
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import closeIcon from '../../_includes/icons/close.svg';

export class TagPillList extends BaseElement {
  constructor() {
    super();

    this.items = [];
  }

  static get properties() {
    return {
      items: {type: Array, reflect: true},
    };
  }

  _handleClick(item) {
    const event = new CustomEvent('remove-pill', {
      detail: item,
    });

    this.dispatchEvent(event);
  }

  render() {
    const items = this.items.map(
      item => html`
        <span
          class="surface color-blue-medium hairline rounded-lg tag-pill type--label display-inline-flex align-center "
          data-key="${item.key}"
          data-value="${item.value}"
          @click="${() => this._handleClick(item)}"
        >
          ${item.value} ${unsafeSVG(closeIcon)}
        </span>
      `
    );

    return html`${items}`;
  }
}

customElements.define('tag-pill-list', TagPillList);
