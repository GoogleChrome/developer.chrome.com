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

import {store} from '../store';
import 'wicg-inert';

export const expandSideNav = store.action(() => {
  document.querySelectorAll('[data-side-nav-inert').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = true;
  });

  /** @type {SideNav} */ (document.querySelector('side-nav')).expanded = true;

  // Prevent the user from scrolling the page underneath the search modal.
  document.body.classList.add('overflow-hidden');

  return {isSideNavExpanded: true};
});

export const collapseSideNav = store.action(() => {
  document.querySelectorAll('[data-side-nav-inert').forEach(item => {
    /** @type {HTMLElement} */ (item).inert = false;
  });

  /** @type {SideNav} */ (document.querySelector('side-nav')).expanded = false;

  // Re-enable page scrolling.
  document.body.classList.remove('overflow-hidden');

  return {isSideNavExpanded: false};
});

export const restoreFocus = store.action(() => {
  /** @type {HTMLElement} */ (document.querySelector(
    '.top-nav__hamburger'
  )).focus();
});
