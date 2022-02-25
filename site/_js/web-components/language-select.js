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
 * @fileoverview A component for selecting the language version.
 */
import {LanguageSelect} from 'webdev-infra/web-components/LanguageSelect';

/**
 * @type {HTMLElement}
 */
class DccLanguageSelect extends LanguageSelect {
  constructor() {
    super();
    this.current = 'en';
    this.supportedLanguages = [];
  }

  onChange(e) {
    const lang = e.target.value;
    if (!this.supportedLanguages.includes(lang)) {
      return;
    }
    if (lang !== this.current) {
      const pathParts = location.pathname.split('/');
      const replace = this.supportedLanguages.includes(pathParts[1]) ? 1 : 0;
      pathParts.splice(1, replace, lang);
      location.href = pathParts.join('/');
    }
  }
}

// @ts-ignore
customElements.define('language-select', DccLanguageSelect);
