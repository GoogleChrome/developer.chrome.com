/*
 * Copyright 2023 Google LLC
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

import './web-components/enhanced-select';
import {loadMore} from './misc/load-more';
import memoize from './utils/memoize';

let filteredValue = [];
const searchByAppNameElement = /** @type {HTMLElement} */ (
  document.querySelector('input.search-apps')
);

const searchByApiElement = /** @type {HTMLElement} */ (
  document.querySelector('.search-apis')
);

renderShowcaseItems();

async function getShowcaseItems() {
  const response = await fetch('/showcase.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /showcase.json');
  }

  const fuguItems = await response.json();

  const searchText = /** @type {HTMLInputElement} */ (
    searchByAppNameElement
  ).value?.toLowerCase();

  const isSearchText = !!searchText.length;
  const isFiltered = !!filteredValue.length;

  fuguItems.map(item => {
    const apis = item.usedAPIs;
    const usedAPIs = apis.map(api => {
      return api.name.replace(/\s+/g, '-').toLowerCase();
    });
    const apisList = apis.map(api => {
      return api.name.toLowerCase();
    });

    const space = ' ';
    const uniqueAPIsList = [...new Set(apisList.join(space).split(space))];
    const uniqueAPIsStr = uniqueAPIsList.join(space);
    const isSearchAPIsMatched = uniqueAPIsStr.match(searchText) !== null;
    const isSearchNameMatched =
      item.title.toLowerCase().match(searchText) !== null;

    const isSearchValueMatched = isSearchNameMatched || isSearchAPIsMatched;
    let isShow = !isSearchText && !isFiltered ? true : false;

    if (isSearchText && isFiltered) {
      if (isSearchValueMatched) {
        filteredValue.forEach(selected => {
          isShow = usedAPIs.includes(selected) ? true : false;
        });
      }
    } else if (!isSearchText && isFiltered) {
      filteredValue.forEach(selected => {
        isShow = usedAPIs.includes(selected) ? true : false;
      });
    } else {
      isShow = isSearchValueMatched ? true : false;
    }

    return (item.isShow = isShow);
  });

  return {
    items: fuguItems.filter(item => item.isShow === true),
  };
}

async function renderShowcaseItems() {
  const getMemoizedShowcase = memoize(getShowcaseItems);
  const {items} = await getMemoizedShowcase();
  const loadMoreButton = document.getElementById('load-more-showcase');
  const container = /** @type {HTMLElement} */ document.querySelector(
    '.fugu-showcase-container'
  );
  const htmlItems = items.map(item => item.html);

  if (!container) return;
  container.innerHTML = htmlItems.slice(0, 9).join('');

  const showcase = {
    loadMore: loadMoreButton,
    container: container,
    fetchItems: async (skip, take) => {
      return items.slice(skip, take + skip).map(showcase => showcase.html);
    },
  };

  if (!showcase.loadMore) return;

  const itemsPerPage = 9;
  if (items.length > itemsPerPage) {
    loadMoreButton?.removeAttribute('hidden');
  } else {
    loadMoreButton?.setAttribute('hidden', 'true');
  }

  const skip = showcase.container.querySelectorAll('.fugu-card').length;
  const onError = () => {
    document.getElementById('loading-error')?.classList.remove('display-none');
  };
  const params = {
    skip,
    take: itemsPerPage,
  };

  loadMore(
    showcase.loadMore,
    // @ts-ignore
    showcase.container,
    showcase.fetchItems,
    onError,
    params
  );
}

searchByAppNameElement.addEventListener('input', () => {
  renderShowcaseItems();
});

searchByApiElement.addEventListener('click', () => {
  const selections = document.querySelectorAll('li.button[selected]');
  const filterPills = document.querySelectorAll('span.tag-pill');

  const selectedOptions = [];
  selections.forEach(option => {
    return selectedOptions.push(option?.textContent?.trim());
  });
  filterPills.forEach(pill => {
    if (selectedOptions.includes(pill?.textContent?.trim())) {
      const value = pill?.textContent
        ?.trim()
        .toLowerCase()
        .split(' ')
        .join('-');

      if (!filteredValue.includes(value)) {
        filteredValue.push(value);
        renderShowcaseItems();
      }

      pill.removeAttribute('hidden');
    }
  });
});

const closeButtonPills = document.querySelectorAll('span.tag-pill button');
closeButtonPills.forEach(button => {
  button.addEventListener('click', () => {
    /** @type {HTMLElement} */ (button.parentNode).setAttribute(
      'hidden',
      'true'
    );

    const enhancedOption = document.querySelectorAll(
      '.enhanced-select__options li'
    );
    const enhancedSelect = document.querySelector(
      'enhanced-select.search-apis'
    );

    enhancedOption.forEach(option => {
      if (
        option.textContent?.trim() ===
        /** @type {HTMLElement} */ (button.parentNode).textContent?.trim()
      ) {
        option.removeAttribute('selected');
        /** @type {HTMLElement} */ enhancedSelect?.setAttribute('value', '[]');
      }
    });

    const value = button?.textContent
      ?.trim()
      .toLowerCase()
      .split(' ')
      .join('-');

    filteredValue = filteredValue.filter(v => v !== value);
    renderShowcaseItems();
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'f' && e.metaKey) {
    e.preventDefault();
    searchByAppNameElement.focus();
  }
});
