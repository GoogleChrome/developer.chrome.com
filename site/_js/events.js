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

import './web-components/enhanced-event-card';
import './web-components/truncate-text';
import './web-components/enhanced-select';
import './web-components/checkbox-group';
import './web-components/enhanced-events-list';
import {EnhancedSelect} from './web-components/enhanced-select';

let activeFilters = {},
  upcomingEvents,
  pastEvents;

(() => {
  /** @type {EnhancedEventsList|null} */
  upcomingEvents = document.querySelector('#upcoming-events');
  /** @type {EnhancedEventsList|null} */
  pastEvents = document.querySelector('#past-events');
  const filters = document.querySelectorAll('.events-filter');

  filters.forEach(ele => {
    ele.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }

      //todo - update the ui showing list of selected filters.
      activeFilters = {
        ...activeFilters,
        ...{[t.name]: t.value},
      };

      injectFilters();
    });
  });

  addMobileListeners();
})();

function injectFilters() {
  if (upcomingEvents) upcomingEvents.filters = activeFilters;
  if (pastEvents) pastEvents.filters = activeFilters;
}

function addMobileListeners() {
  /** @type {HTMLDialogElement|null} */
  const filters = document.querySelector('#mobile-filters');
  const opener = document.querySelector('#mobile-filters-opener');
  const done = document.getElementById('mobile-filters-done');
  const reset = document.getElementById('mobile-filters-reset');

  // @ts-ignore
  opener?.addEventListener('click', () => filters.showModal());

  filters?.addEventListener('click', e => {
    if (/** @type {HTMLElement} */ (e.target).nodeName === 'DIALOG')
      closeFiltersModal();
  });

  done?.addEventListener('click', () => {
    const selected = Array.from(
      document.querySelectorAll(
        '#mobile-filters input[type="checkbox"]:checked'
      )
    );

    activeFilters = selected.reduce((target, checkbox) => {
      const name = checkbox.getAttribute('name');
      const value = checkbox.getAttribute('value');

      if (name === null) return target;

      if (typeof target[name] === 'undefined') {
        target[name] = [value];
        return target;
      }

      target[name].push(value);

      return target;
    }, {});

    injectFilters();
    closeFiltersModal();
  });

  function closeFiltersModal() {
    // @ts-ignore
    filters?.close();
  }
}
