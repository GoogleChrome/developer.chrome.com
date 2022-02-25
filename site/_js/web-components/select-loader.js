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
 * @fileoverview Changes to the URL in the selected option of a <select>.
 * Each option must have an attribute of "href" to be eligible. Used for the
 * tags page.
 */
import {BaseElement} from './base-element';

export class SelectLoader extends BaseElement {
  constructor() {
    super();

    this.addEventListener('change', event => {
      const t = event.target;
      if (!(t instanceof HTMLSelectElement)) {
        return;
      }
      const option = t.selectedOptions[0];
      if (option) {
        const href = option.getAttribute('href');
        if (href) {
          window.location.assign(href);
        }
      }

      // Choose the zero/default index again, in case the user presses Back
      // later on.
      t.selectedIndex = 0;
    });
  }
}

customElements.define('select-loader', SelectLoader);
