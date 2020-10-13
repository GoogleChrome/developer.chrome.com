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
import {BaseElement} from './base-element';
import {expandSideNav} from '../actions/side-nav';

export class TopNav extends BaseElement {
  connectedCallback() {
    this.hamburgerBtn = this.querySelector('.top-nav__hamburger');
    this.hamburgerBtn?.addEventListener('click', expandSideNav);
  }

  disconnectedCallback() {
    this.hamburgerBtn?.removeEventListener('click', expandSideNav);
  }
}

customElements.define('top-nav', TopNav);
