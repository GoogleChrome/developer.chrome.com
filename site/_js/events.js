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

import memoize from './utils/memoize';
import './web-components/enhanced-event-card';
import './web-components/truncate-text';
import './web-components/enhanced-select';
import './web-components/checkbox-group';
// eslint-disable-next-line no-unused-vars
import {TagPillList} from './web-components/tag-pill-list';
import {EnhancedSelect} from './web-components/enhanced-select';
// eslint-disable-next-line no-unused-vars
import {LoadMore} from './web-components/load-more';

let activeFilters = {};
/** @type {TagPillList|null} */
const activeFiltersList = document.querySelector('#active-filters');
/** @type {LoadMore|null} */
const upcomingEvents = document.querySelector('#upcoming-events');
/** @type {LoadMore|null} */
const pastEvents = document.querySelector('#past-events');
const selectFields = document.querySelectorAll('.events-filter');
const wrapper = document.querySelector('.events-list');
const upcomingTab = document.querySelector('[role=tab]:first-child');
const pastTab = document.querySelector('[role=tab]:last-child');

(() => {
  setFetchItems();
  addListeners();
  addMobileListeners();
})();

function addListeners() {
  selectFields.forEach(ele => {
    ele.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }

      activeFilters[t.name] = t.value;

      restart();
      updateTagPills();
      updateFiltersAttribute();
    });
  });

  activeFiltersList?.addEventListener('removed-pill', e => {
    if (!(e instanceof CustomEvent)) return;

    const index = activeFilters[e.detail.key].indexOf(e.detail.value);

    activeFilters[e.detail.key].splice(index, 1);

    restart();

    selectFields.forEach(field => {
      /** @type {EnhancedSelect} */ (field).setValue(
        activeFilters[field.getAttribute('name')] || []
      );
    });

    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        const target = activeFilters?.[checkbox.getAttribute('name')];

        /** @type {HTMLInputElement } */ (checkbox).checked =
          target && target.includes(checkbox.getAttribute('value'));
      });
  });

  upcomingEvents?.addEventListener('items-loaded', e => {
    if (!(e.target instanceof LoadMore)) return;

    updateCount(upcomingTab, e.target.total);
  });

  pastEvents?.addEventListener('items-loaded', e => {
    if (!(e.target instanceof LoadMore)) return;

    updateCount(pastTab, e.target.total);
  });
}

function updateCount(element, total) {
  if (!(element instanceof HTMLElement)) return;

  element.innerText = element.innerText.replace(/\([0-9]+\)/, `(${total})`);
}

function setFetchItems() {
  if (upcomingEvents)
    upcomingEvents.fetchItems = async (skip, take) => {
      const groups = await getEvents();

      const events = filterEvents(groups.upcomingEvents);

      return {
        updated_total: events.length,
        items: events.slice(skip, take + skip).map(event => event.html),
      };
    };

  if (pastEvents)
    pastEvents.fetchItems = async (skip, take) => {
      const groups = await getEvents();

      const events = filterEvents(groups.pastEvents);

      return {
        updated_total: events.length,
        items: events.slice(skip, take + skip).map(event => event.html),
      };
    };
}

const getEvents = memoize(async () => {
  const response = await fetch('/events.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /events.json');
  }

  const all = await response.json();

  return {
    upcomingEvents: all.filter(event => !event.isPastEvent),
    pastEvents: all.filter(event => event.isPastEvent),
  };
});

const filterEvents = events => {
  return events.filter(event => {
    if (
      activeFilters.locations?.length &&
      !activeFilters.locations.some(location => location === event.location)
    ) {
      return false;
    }

    if (
      activeFilters.topics?.length &&
      !activeFilters.topics.some(topic => event.topics.includes(topic))
    ) {
      return false;
    }

    if (
      activeFilters.googlers?.length &&
      !activeFilters.googlers.some(googler => event.googlers.includes(googler))
    ) {
      return false;
    }

    return true;
  });
};

function updateTagPills() {
  if (!activeFiltersList) return;

  activeFiltersList.items = Object.entries(activeFilters).flatMap(i => {
    return i[1].map(value => ({key: i[0], value: value}));
  });
}

/*
Used exclusively to modify the margin when pills
are present. Can be replaced with a :has selector
once FF supports it.
*/
function updateFiltersAttribute() {
  if (Object.values(activeFilters).some(i => i.length > 0)) {
    wrapper?.setAttribute('data-active-filters', '');
  } else {
    wrapper?.removeAttribute('data-active-filters');
  }
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

    restart();
    updateTagPills();
    updateFiltersAttribute();
    closeFiltersModal();
  });

  reset?.addEventListener('click', () => {
    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        /** @type {HTMLInputElement } */ (checkbox).checked = false;
      });
  });

  function closeFiltersModal() {
    // @ts-ignore
    filters?.close();
  }
}

function restart() {
  if (upcomingEvents) upcomingEvents.restart();
  if (pastEvents) pastEvents.restart();
}
