/*
 * Copyright 2021 Google LLC
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
 * @fileoverview Selects the most relevant sub-element in a TOC. Sets
 * `[toc--active]` on the contained <a href> that matches the heading most
 * visible on the page.
 *
 * Operates on a single `<article>` found in the document. Refuses to operate
 * if it's not found.
 */
import {BaseElement} from './base-element';

export class TocActive extends BaseElement {
  constructor() {
    super();
    this.updateHeading = () => {};

    /** @type {HTMLAnchorElement?} */
    this.previousActiveAnchor = null;

    /** @type {Set<HTMLElement>} */
    this.visibleHeadings = new Set();

    let rafPending = 0;

    const options = {threshold: 0.5};
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const t = /** @type {HTMLElement} */ (entry.target);
        if (entry.isIntersecting) {
          this.visibleHeadings.add(t);
        } else {
          this.visibleHeadings.delete(t);
        }

        // After any heading becomes visible or invisible (most likely due to
        // scroll or on startup), check which one is most active in a rAF.
        if (rafPending) {
          return;
        }
        rafPending = window.requestAnimationFrame(() => {
          rafPending = 0;
          this.updateHeading();
        });
      });
    }, options);
  }

  connectedCallback() {
    super.connectedCallback();

    // Make sure we have an article. Abandon if not.
    const se = document.scrollingElement;
    const target = document.body.querySelector('article');
    if (!target || !se) {
      return;
    }

    /** @type {{[hash: string]: HTMLAnchorElement}} */
    const tocLinkDict = {};
    const links = /** @type {NodeListOf<HTMLAnchorElement>} */ (
      this.querySelectorAll('a[href]')
    );
    /** @type {HTMLAnchorElement?} */
    let firstLink = null;
    for (const link of links) {
      const rawHref = link.getAttribute('href') ?? '';
      if (rawHref.startsWith('#')) {
        tocLinkDict[rawHref.substr(1)] = link;
        if (firstLink === null) {
          firstLink = link;
        }
      }
    }

    // Add all the headings in the article to an IntersectionObserver.
    const allArticleHeadings = /** @type {NodeListOf<HTMLElement>} */ (
      target.querySelectorAll('[id]')
    );
    for (const articleHeading of allArticleHeadings) {
      this.observer.observe(articleHeading);
    }

    this.updateHeading = () => {
      // Find the first visible anchor element inside the article that has a
      // matching link in the TOC.
      // We assume the DOM order matches the display order.
      /** @type {HTMLAnchorElement?} */
      let found = null;
      for (const articleHeading of allArticleHeadings) {
        if (
          this.visibleHeadings.has(articleHeading) &&
          articleHeading.id in tocLinkDict
        ) {
          found = tocLinkDict[articleHeading.id];
          break;
        }
      }

      if (found === this.previousActiveAnchor) {
        return;
      }

      // We don't remove `toc-active` from a previous anchor if there's no new
      // best found heading: this is possible in long articles where there's no
      // visible headings in a large section of text.
      // This basically makes it appear as if something is always active.
      if (found) {
        if (this.previousActiveAnchor) {
          this.previousActiveAnchor.removeAttribute('toc--active');
        }
        found.setAttribute('toc--active', '');
        this.previousActiveAnchor = found;

        // Scroll this heading into view, ensuring that long ToCs will always
        // have the active heading visible in the scroll area. If it's the first
        // heading, actually scroll to the top of the container (first element
        // child), so the "Table of Contents" heading appears.
        if (found === firstLink) {
          this.scrollTop = 0;
        } else {
          localScrollIntoView(found, this);
        }
      }
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();

    if (this.previousActiveAnchor) {
      this.previousActiveAnchor.removeAttribute('toc--active');
      this.previousActiveAnchor = null;
    }
  }
}

/**
 * This is a simplified version of `scrollIntoView`, as that causes odd
 * interactions with nested scroll containers in Chrome.
 *
 * @param {Element} target
 * @param {Element} container
 */
function localScrollIntoView(target, container) {
  const bounds = target.getBoundingClientRect();
  const containerBounds = container.getBoundingClientRect();

  const offTop = containerBounds.top - bounds.top;
  if (offTop > 0) {
    // Target is above the element.
    container.scrollTop -= offTop;
  } else {
    const offEnd = bounds.bottom - containerBounds.bottom;
    if (offEnd > 0) {
      // Target is below the element.
      container.scrollTop += offEnd;
    }
  }
}

customElements.define('toc-active', TocActive);
