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

(() => {
  const cards = document.querySelectorAll('.fugu-card');
  /** @type HTMLInputElement|null */
  const searchAppsInput = document.querySelector('#search-fugu-apps');
  /** @type ExtendedSelect|null */
  const apiSelect = document.querySelector('#api-select');
  const searchClose = document.querySelector('#search-fugu-apps-close');
  const container = document.querySelector('.fugu-showcase');

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

  if ('share' in navigator && 'canShare' in navigator) {
    const imageToPNG = async blob => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const image = await createImageBitmap(blob);
      canvas.width = image.width;
      canvas.height = image.height;
      context?.drawImage(image, 0, 0);
      return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png');
      });
    };

    const prepareShareData = async shareLink => {
      try {
        const fuguCard = shareLink.closest('.fugu-card');
        const heading = fuguCard.querySelector('h2');
        const appURL = heading?.querySelector('a').href;
        const appName = heading.textContent?.trim();
        const tagPills = fuguCard?.querySelectorAll('.tag-pill');
        const appAPIs = Array.from(tagPills)
          .slice(0, 2)
          .map(a => `👉 ${a.textContent}`)
          .join('\n');
        const screenshotURL = fuguCard.querySelector('img').currentSrc;
        const fileName = screenshotURL
          .split('/')
          .pop()
          .replace('.webp', '.png');
        const blob = await fetch(screenshotURL, {
          mode: 'cors',
        }).then(response => response.blob());
        const pngBlob = await imageToPNG(blob);
        const file = new File([pngBlob], fileName);

        const fuguShowcaseI18N = JSON.parse(
          document.querySelector('#fugu-showcase-i18n').textContent
        );
        const iJustFoundTheApp = fuguShowcaseI18N.i_just_found_the_app;
        const itUsesTheseFuguAPIs = fuguShowcaseI18N.it_uses_these_fugu_apis;
        const viaTheFuguShowcase = fuguShowcaseI18N.via_the_fugu_showcase;

        const shareData = {
          files: [file],
          text: `${iJustFoundTheApp} “${appName}”: ${appURL}.\n\n${itUsesTheseFuguAPIs}:\n\n${appAPIs}\n\n(${viaTheFuguShowcase}: ${location.href})`.trim(),
        };
        return shareData;
      } catch (err) {
        return err;
      }
    };

    document.querySelectorAll('.web-share').forEach(shareButton => {
      shareButton.classList.remove('visibility-hidden');

      shareButton.addEventListener('click', async () => {
        const shareData = await prepareShareData(shareButton);
        if (shareData instanceof Error) {
          console.error(shareData.name, shareData.message);
          return;
        }
        try {
          if (!navigator.canShare(shareData)) {
            console.warn('Cannot share data', shareData);
            return;
          }
          await navigator.share(shareData);
        } catch (err) {
          if (err.name === 'AbortError') {
            return;
          } else if (err.name === 'NotAllowedError') {
            // Try sharing without the screenshot.
            try {
              delete shareData.files;
              await navigator.share(shareData);
            } catch (err) {
              if (err.name === 'AbortError') {
                return;
              }
              console.error(err.name, err.message);
              return;
            }
          }
          console.error(err.name, err.message);
          return;
        }
      });
    });
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'f' && e.metaKey) {
      e.preventDefault();
      searchAppsInput.focus();
    }
  });
})();
