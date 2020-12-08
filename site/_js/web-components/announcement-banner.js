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

class Banner extends HTMLElement {
  connectedCallback() {
    // No matter when this runs, the close button will not be visible until
    // after this class is added—this prevents ghost clicks on the button before
    // the event listener is added.
    this.setAttribute('active', '');

    const button = this.querySelector('[data-banner-close-btn]');
    button?.addEventListener('click', () => {
      this.savePreference();
      this.close();
    });
  }

  savePreference() {
    const storageKey = this.getAttribute('storage-key') || '';
    const cta = this.querySelector('a[href]');
    if (cta) {
      const ctaUrl = cta.getAttribute('href') || '';
      localStorage.setItem(storageKey, ctaUrl);
    }
  }

  close() {
    this.setAttribute('hidden', 'true');
  }
}

window.customElements.define('announcement-banner', Banner);
