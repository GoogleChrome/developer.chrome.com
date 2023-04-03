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
import './web-components/checkbox-group';
import './web-components/enhanced-select';
import {EnhancedSelect} from './web-components/enhanced-select';
// eslint-disable-next-line no-unused-vars
import {TagPillList} from './web-components/tag-pill-list';

let activeFilters = {};
/** @type {TagPillList|null} */
const activeFiltersList = document.querySelector('#active-filters');
const selectFields = document.querySelectorAll('.deprecation-filter');
const clearFilters = document.querySelector('.clear-filters');

/**
 * Formats the active filters values for the tag pills section
 *
 * @returns {Object}
 */
function updateTagPills() {
  if (!activeFiltersList) return;

  activeFiltersList.items = Object.entries(activeFilters).flatMap(i => {
    if (i[0] === 'removal-date') {
      i[1] = [formatDateRange(i[1][0])];
    }
    const pills = i[1].map(value => ({key: i[0], value: value}));

    clearFilters?.classList.remove('hidden');
    if (pills.length === 0) {
      clearFilters?.classList.add('hidden');
    }

    return pills;
  });
}

/**
 * Transforms the selected date range option in a date range starting from the current date
 *
 * @param {String} days The value of the date range filter
 * @returns {String}
 */
function formatDateRange(days) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + parseInt(days));

  const startDate = new Date();
  const startDateString = `${startDate.getDate()} ${startDate.toLocaleString(
    'default',
    {month: 'short'}
  )}`;
  const endDateString = `${endDate.getDate()} ${endDate.toLocaleString(
    'default',
    {month: 'short'}
  )}`;
  return `${startDateString} - ${endDateString}`;
}

/**
 * Adds all the event listeners needed for the mobile UI
 *
 * @returns {void}
 */
function addMobileListeners() {
  /** @type {HTMLDialogElement|null} */
  const filters = document.querySelector('#mobile-filters');
  const opener = document.querySelector('#mobile-filters-opener');
  const done = document.getElementById('mobile-filters-done');
  const reset = document.getElementById('mobile-filters-reset');
  const removalDates = document.querySelectorAll('input[name="removal-date"]');

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

    activeFilters = selected.reduce((payload, checkbox) => {
      const name = checkbox.getAttribute('name');
      const value = checkbox.getAttribute('value');

      if (name === null) return payload;

      if (typeof payload[name] === 'undefined') {
        payload[name] = [value];
        return payload;
      }

      payload[name].push(value);

      return payload;
    }, {});
    updateTagPills();
    closeFiltersModal();
  });

  reset?.addEventListener('click', () => {
    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        /** @type {HTMLInputElement } */ (checkbox).checked = false;
      });
  });

  removalDates.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      removalDates.forEach(otherCheckbox => {
        if (otherCheckbox !== checkbox) {
          /** @type {HTMLInputElement } */ (otherCheckbox).checked = false;
        }
      });
    });
  });

  function closeFiltersModal() {
    // @ts-ignore
    filters?.close();
  }
}

/**
 * Adds the listener to the "Clear Filters" tag pill
 *
 * @returns {void}
 */
function addClearFilterListener() {
  clearFilters?.addEventListener('click', () => {
    selectFields.forEach(element => {
      // @ts-ignore
      element.value = [];
      // @ts-ignore
      element.options.forEach(option => {
        option.selected = false;
      });
    });
    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        /** @type {HTMLInputElement } */ (checkbox).checked = false;
      });
    activeFilters = {};
    updateTagPills();
    clearFilters?.classList.add('hidden');
  });
}

/**
 * Adds the listeners to the select inputs used on desktop/tablet
 *
 * @returns {void}
 */
function addSelectListeners() {
  selectFields.forEach(element => {
    element.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }
      activeFilters[t.name] = t.value;
      updateTagPills();
    });
  });
  selectFields.forEach(element => {
    element.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }
      activeFilters[t.name] = t.value;
      updateTagPills();
    });
  });
}

(() => {
  addSelectListeners();
  addMobileListeners();
  addClearFilterListener();
})();
