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

// Make headings copyable by clicking.
const copyLinkToClipboard = () => {
  if (!('clipboard' in navigator)) {
    return;
  }
  document
    .querySelector('main')
    // ToDo: Use `:is(h2, h3, h4, h5, h6)[id]` once support is better.
    .querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]')
    .forEach((heading) => {
      heading.addEventListener('click', (ev) => {
        // Don't jump when the '#' is clicked.
        if (ev.target.nodeName === 'A') {
          ev.preventDefault();
        }
        // Only run once.
        if (heading.dataset.toasted) {
          return;
        }
        try {
          navigator.clipboard.writeText(
            `${location.origin}${location.pathname}#${heading.id}`,
          );
          const temp = heading.innerHTML;
          heading.innerHTML += '&nbsp;<small>(📋 Copied)</small>';
          heading.dataset.toasted = 'toasted';
          setTimeout(() => {
            heading.innerHTML = temp;
            delete heading.dataset.toasted;
          }, 2_000);
        } catch (err) {
          console.warn(err.name, err.message);
        }
      });
    });
};

copyLinkToClipboard();
