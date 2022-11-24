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

async function prerenderLink(url) {
  // Only prerender internal URLs
  if (
    !url ||
    !(
      url.toString().startsWith(location.origin) ||
      url.toString().startsWith('/')
    )
  ) {
    return '';
  }

  const specScript = document.createElement('script');
  specScript.type = 'speculationrules';
  const specRules = {
    prerender: [
      {
        source: 'list',
        urls: [url],
      },
    ],
  };
  specScript.textContent = JSON.stringify(specRules);
  document.body.append(specScript);

  ga('send', 'event', {
    eventCategory: 'Site-Wide Custom Events',
    eventAction: 'Prerender attempt',
    eventLabel: url,
    eventValue: 1,
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
  });
  return;
}

function addPrerenderLinkListener() {
  if (
    HTMLScriptElement.supports &&
    HTMLScriptElement.supports('speculationrules')
  ) {
    return;
  }

  document.addEventListener(
    'mousedown',
    /**
     * @param {WMouseEvent} e
     */
    e => {
      const clickableEl = e.target.closest('a[href]');
      if (!clickableEl) {
        return;
      }
      prerenderLink(clickableEl.href);
    }
  );
}

addPrerenderLinkListener();
