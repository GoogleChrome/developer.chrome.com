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

/**
 * @fileoverview A component for managing a Material navigation rail.
 */
import {BaseElement} from './base-element';

export class NavigationRail extends BaseElement {
  constructor() {
    super();
    this.onClose = this.onClose.bind(this);
  }

  connectedCallback() {
    this.closeBtn = /** @type {HTMLElement} */ (this.querySelector(
      '.navigation-rail__close'
    ));
    this.closeBtn.addEventListener('click', this.onClose);
  }

  disconnectedCallback() {
    /** @type {HTMLElement} */ (this.closeBtn).removeEventListener(
      'click',
      this.onClose
    );
  }

  onClose() {
    this.dispatchEvent(new Event('navigation-rail-collapse', {bubbles: true}));
  }
}

customElements.define('navigation-rail', NavigationRail);
