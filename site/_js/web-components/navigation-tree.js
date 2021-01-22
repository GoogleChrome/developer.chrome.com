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
 * @fileoverview A component for managing a tree of links.
 * These links can be grouped into expandable sections.
 */
import {BaseElement} from './base-element';
import {expandable} from '../behaviors/expandable';

export class NavigationTree extends BaseElement {
  constructor() {
    super();
    this.onBack = this.onBack.bind(this);
  }

  connectedCallback() {
    // Imbue expandable buttons with aria-expanded behavior.
    // @ts-ignore
    this.querySelectorAll('[data-expandable]').forEach(expandable);

    this.backBtn = /** @type {HTMLElement} */ (this.querySelector(
      '.navigation-tree__back'
    ));
    this.backBtn.addEventListener('click', this.onBack);
  }

  disconnectedCallback() {
    /** @type {HTMLElement} */ (this.backBtn).removeEventListener(
      'click',
      this.onBack
    );
  }

  onBack() {
    this.dispatchEvent(new Event('navigation-tree-back', {bubbles: true}));
  }
}

customElements.define('navigation-tree', NavigationTree);
