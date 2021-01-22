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
 * @fileoverview A responsive side navigation menu. On mobile, this menu will
 * optionally show project-specific links, and allow the user to toggle back
 * to site-wide navigation.
 */
import {BaseElement} from './base-element';
import './navigation-tree';
import './navigation-rail';
import {collapseSideNav, restoreFocus} from '../actions/side-nav';

export class SideNav extends BaseElement {
  static get properties() {
    return {
      type: {type: String, reflect: true},
      view: {type: String, reflect: true},
      animating: {type: Boolean, reflect: true},
      expanding: {type: Boolean},
      collapsing: {type: Boolean},
      switchingViews: {type: Boolean},
      expanded: {type: Boolean, attribute: false},
    };
  }

  set expanded(value) {
    if (this._expanded === value) {
      return;
    }

    if (value) {
      this.setAttribute('expanded', '');
      this.expanding = true;
      this.intersectionObserver.observe(this);
    } else {
      this.removeAttribute('expanded');
      this.collapsing = true;
      this.intersectionObserver.disconnect();
    }

    this.animating = true;
    this._expanded = value;
  }

  get expanded() {
    return this._expanded;
  }

  constructor() {
    super();
    this.type = 'site';
    this.animating = false;
    this.expanding = false;
    this.collapsing = false;
    this.switchingViews = false;
    this._expanded = false;

    this.onBack = this.onBack.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    // Keep track of whether the sidebar is visible. This only matters if the sidebar is opened
    // on a small screen and then becomes larger. We call `onVisibleChange` to close the sidebar.
    this.intersectionObserver = new IntersectionObserver(entries => {
      let visible = false;
      for (const entry of entries) {
        if (entry.target === this) {
          visible = entry.intersectionRatio > 0;
        }
      }
      this.onVisibleChange(visible);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Configure initial state.
    // If we're on a project page on mobile then the side-nav should initially
    // show the project navigation, followed by the site-wide navigation.
    if (this.type === 'project') {
      this.view = 'project';
    } else {
      this.view = 'site';
    }

    this.projectView = /** @type {!HTMLElement} */ (this.querySelector(
      'navigation-tree'
    ));

    this.siteView = /** @type {!HTMLElement} */ (this.querySelector(
      'navigation-rail'
    ));

    // This will catch if the user clicks the ::before element which acts as a
    // site overlay when the side-nav is expanded on mobile.
    // It will not fire if the user is clicking around inside of the
    // side-nav-views element because that element stops event
    // propogation (see below).
    this.addEventListener('click', collapseSideNav);

    // If one of the nav elements inside of side-nav was clicked, we
    // block the click so the side-nav won't collapse. If the click was outside
    // of the container/on the overlay, we close the side-nav.
    this.querySelectorAll('navigation-rail, navigation-tree').forEach(nav =>
      nav.addEventListener('click', this.onBlockClicks)
    );

    this.addEventListener('navigation-rail-collapse', collapseSideNav);
    this.addEventListener('navigation-tree-back', this.onBack);
    this.addEventListener('transitionend', this.onTransitionEnd);
  }

  disconnectedCallback() {
    this.removeEventListener('click', collapseSideNav);
    this.querySelectorAll('navigation-rail, navigation-tree').forEach(nav =>
      nav.removeEventListener('click', this.onBlockClicks)
    );
    this.removeEventListener('navigation-rail-collapse', collapseSideNav);
    this.removeEventListener('navigation-tree-back', this.onBack);
    this.removeEventListener('transitionend', this.onTransitionEnd);
  }

  /**
   * Called by IntersectionObserver with visibility changes.
   *
   * @param {boolean} visible
   */
  onVisibleChange(visible) {
    if (!visible) {
      collapseSideNav();
    }
  }

  /**
   * Block clicks if the user is just clicking around inside of the nav element.
   * @param {Event} e
   */
  onBlockClicks(e) {
    const link = /** @type {HTMLElement} */ (e.target).closest('a');
    if (!link) {
      e.stopPropagation();
    }
  }

  /**
   * Lets the user toggle from project-specific links, to site-wide links.
   */
  onBack() {
    this.animating = true;
    this.switchingViews = true;
    this.view = 'site';
  }

  onTransitionEnd() {
    this.animating = false;

    if (this.collapsing) {
      this.collapsing = false;
      if (this.type === 'project') {
        this.view = 'project';
      }
      // Tell the page to restore focus to the hamburger menu button in the
      // top-nav.
      restoreFocus();
      return;
    }

    if (this.expanding) {
      this.expanding = false;
      if (this.type === 'project') {
        /** @type {HTMLElement} */ (this.projectView).focus();
      } else {
        /** @type {HTMLElement} */ (this.siteView).focus();
      }
      return;
    }

    if (this.switchingViews) {
      this.switchingViews = false;
      /** @type {HTMLElement} */ (this.siteView).focus();
      return;
    }
  }
}

customElements.define('side-nav', SideNav);
