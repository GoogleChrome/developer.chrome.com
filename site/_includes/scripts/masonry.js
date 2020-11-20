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
 * @fileoverview Arrange elements into a masonry style layout.
 * Elements are split into two columns—odd elements in column 1, event elements
 * in column 2.
 * Elements look "up" to find the element that came before them in the grid.
 * They use translateY() to move themselves further down the column using this
 * offset.
 */

(() => {
  // This corresponds with the masonry breakpoint defined in _config.scss
  const minViewportWidth = 860;
  const gap = 32;
  const grid = /** @type {HTMLElement} */ (document.querySelector(
    '.masonry-grid'
  ));
  const items = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(
    '.masonry-grid__item'
  ));
  let isObserving;

  /**
   * Iterates over every item in the grid and sets their translateY() so we get
   * a nice masonry effect.
   * This function also sets the height of the grid by determining the element
   * furthest down the page.
   */
  function layout() {
    // Define an initial height for the grid.
    // This will increase as the items are transformed down the page.
    let gridHeight = 0;

    items.forEach((item, idx) => {
      // Ignore the first two items since they're at the top of each column
      // and don't need to move.
      if (idx < 2) {
        return;
      }

      // We capture the initial y position of the first element so we can
      // subtract it from the bottom of other elements. If the grid itself is
      // 10px down the page we need to subtract this from each element's y
      // position, otherwise they would translate too far down the page.
      //
      // I tried moving this outside of the forEach but found that it could
      // get stale if the user had scrolled the page and some of the bottom
      // cards would appear too high up.
      const initialY = items[0].getBoundingClientRect().y;

      const previousItem = items[idx - 2];
      const previousItemRect = previousItem.getBoundingClientRect();
      const previousItemBottom = previousItemRect.bottom - initialY;

      const currentItemRect = item.getBoundingClientRect();
      const currentItemTop = previousItemBottom + gap;
      const currentItemBottom = currentItemTop + currentItemRect.height;

      // Find the box that's furthest down the page and use it to set the
      // height of the grid.
      // Because we're transforming our elements we need to do this to force
      // things like the footer down to the bottom of the page.
      gridHeight = Math.max(currentItemBottom, gridHeight);

      // prettier-ignore
      item.style.transform = `translateY(${currentItemTop}px)`;
      grid.style.height = `${gridHeight}px`;
    });
  }

  /**
   * Run the layout function any time any element changes in size.
   */
  const ro = new ResizeObserver(() => {
    layout();
  });

  /**
   * This function is called when we no longer need our masonry layout.
   * It removes the explicit height and transforms on the grid and grid items.
   */
  function cleanup() {
    items.forEach(item => {
      item.style.transform = 'none';
    });
    grid.style.height = 'auto';
  }

  /**
   * Start observing the grid items.
   */
  function connect() {
    if (isObserving) {
      return;
    }

    items.forEach(item => ro.observe(item));
    isObserving = true;
  }

  /**
   * Stop observing the grid items.
   */
  function disconnect() {
    if (!isObserving) {
      return;
    }

    ro.disconnect();
    isObserving = false;
    cleanup();
  }

  /**
   * Check against our minWidth to determine if the screen is large enough to
   * allow our masonry layout.
   */
  function shouldWeObserve() {
    if (window.innerWidth >= minViewportWidth) {
      connect();
    } else {
      disconnect();
    }
  }

  window.addEventListener('resize', shouldWeObserve);
  shouldWeObserve();
})();
