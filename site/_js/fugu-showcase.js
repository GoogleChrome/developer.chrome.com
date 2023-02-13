// @ts-nocheck

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

const fallbackSVGBase64 = window.btoa(
  `
<svg
  viewBox="0 0 400 225"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid slice"
>
  <path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" />
  <text
    fill="rgba(0,0,0,0.33)"
    font-family="system-ui,sans-serif"
    font-size="1rem"
    text-anchor="middle"
    x="200"
    y="113"
    dominant-baseline="central"
  >
    ${
      JSON.parse(document.querySelector('#fugu-showcase-i18n').textContent)
        .screenshot_not_available
    }
  </text>
</svg>`
);

(() => {
  const cards = document.querySelectorAll('.fugu-card');
  /** @type HTMLInputElement|null */
  const searchAppsInput = document.querySelector('#search-fugu-apps');
  /** @type ExtendedSelect|null */
  const apiSelect = document.querySelector('#api-select');
  const searchClose = document.querySelector('#search-fugu-apps-close');
  const container = document.querySelector('.fugu-showcase');

  // In case any of the screenshots fail to load, add a fallback image.
  for (const card of cards) {
    const img = card.querySelector('img');
    img?.addEventListener('error', () => {
      const picture = img.closest('picture');
      picture?.querySelector('source[media]')?.remove();
      const source = picture?.querySelector('source');
      if (source) {
        source.srcset = `data:image/svg+xml;base64,${fallbackSVGBase64}`;
      }
    });
  }

  if (!searchAppsInput || !apiSelect) {
    return;
  }

  const onSearch = () => {
    const searchTerm = searchAppsInput.value;
    const selectedApis = apiSelect.value;
    filterCards(cards, searchTerm, selectedApis);
    const url = new URL(window.location.href);
    url.hash = searchTerm ? '#' + searchTerm : '';
    if (selectedApis.length) {
      url.searchParams.set('api', selectedApis.join(','));
    } else {
      url.searchParams.delete('api');
    }
    window.history.pushState({}, '', url);
  };

  const onAppLinkClick = e => {
    const appLink = e.target?.closest('.fugu-app-link');
    if (appLink) {
      e.preventDefault();
      navigator.clipboard.writeText(appLink.href);
      window.history.pushState({}, '', appLink.href);
      searchAppsInput.value = document.location.hash.replace('#', '') || '';
      onSearch();
    }
  };

  apiSelect.addEventListener('change', onSearch);
  searchAppsInput.addEventListener('input', onSearch);
  searchClose?.addEventListener('click', () => {
    searchAppsInput.value = '';
    onSearch();
  });
  container?.addEventListener('click', onAppLinkClick);

  const filterCards = (cards, searchTerm, selectedApis) => {
    if (selectedApis.length === 0 && searchTerm.length === 0) {
      cards.forEach(card => card.removeAttribute('hidden'));
      return;
    }
    const isSelectedApi = api => selectedApis.includes(api);
    cards.forEach(card => {
      const cardApis = card.dataset.usedApis.split(' ');
      const matchApis = selectedApis.length
        ? cardApis.some(isSelectedApi)
        : true;
      if (card.dataset.terms.match(searchTerm) && matchApis) {
        card.removeAttribute('hidden');
      } else {
        card.setAttribute('hidden', 'true');
      }
    });
  };

  searchAppsInput.value = document.location.hash.replace('#', '') || '';
  apiSelect.value =
    new URL(document.location.href).searchParams.get('api')?.split(',') || [];
  onSearch();

  window.addEventListener('keydown', e => {
    if (e.key === 'f' && e.metaKey) {
      e.preventDefault();
      searchAppsInput.focus();
    }
  });
})();
