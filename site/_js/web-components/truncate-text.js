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
 * @fileoverview A component that truncates nested text to the maxLength provided
 */
import {BaseElement} from './base-element';
import truncateString from '../utils/truncate-string';

export class TruncateText extends BaseElement {
  constructor() {
    super();
    this.truncatedText = '';
    this.onClick = this.onClick.bind(this);
  }

  static get properties() {
    return {
      maxLength: {type: Number, reflect: true},
      fullText: {type: String, reflect: true},
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.maxLength = this.maxLength ?? 200;
    this.fullText = this.fullText || '';

    if (this.fullText.length === 0 || this.fullText.length <= this.maxLength)
      return;

    this.truncatedText = truncateString(this.fullText, this.maxLength);

    this.innerHTML =
      this.truncatedText +
      " <button class='button button-text truncate-text-button'>see more</button>";

    this.button = this.querySelector('.truncate-text-button');

    if (!this.button) return;

    this.button.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    if (!this.button) return;

    this.button.removeEventListener('click', this.onClick);
  }

  onClick(e) {
    e.preventDefault();
    this.innerHTML = this.fullText;
  }
}

customElements.define('truncate-text', TruncateText);
