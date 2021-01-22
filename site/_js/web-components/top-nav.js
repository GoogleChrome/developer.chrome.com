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
 * @fileoverview A component to manage the state of the top navigation and
 * search elements.
 */
import {BaseStateElement} from './base-state-element';
import {expandSideNav} from '../actions/side-nav';

export class TopNav extends BaseStateElement {
  connectedCallback() {
    super.connectedCallback();
    this.hamburgerBtn = /** @type {HTMLElement} */ (this.querySelector(
      '.top-nav__hamburger'
    ));
    this.hamburgerBtn.addEventListener('click', expandSideNav);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    /** @type {HTMLElement} */ (this.hamburgerBtn).removeEventListener(
      'click',
      expandSideNav
    );
  }

  onStateChanged({isSearchActive}) {
    if (isSearchActive) {
      this.setAttribute('data-search-active', '');
    } else {
      this.removeAttribute('data-search-active');
    }
  }
}

customElements.define('top-nav', TopNav);
