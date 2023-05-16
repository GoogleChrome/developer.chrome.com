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

const {html} = require('common-tags');

/**
 * Generates HTML table for Android Browser feature comparison
 *
 * @param {string} _method the method being referenced in the table
 * @param {string} chrome configuration data for chrome
 * @param {string} edge configuration data for microsoft edge
 * @param {string} firefox configuration data for firefox
 * @param {string} opera configuration data for opera
 * @param {string} samsung configuration data for samsung internet
 * @param {string} brave configuration data for brave
 * @param {string} tor configuration data for tor browser
 * @param {string} uc configuration data for uc
 * @return {string}
 */

const BROWSERS = {
  chrome: {
    name: 'Chrome',
    link: 'https://play.google.com/store/apps/details?id=com.android.chrome',
  },
  edge: {
    name: 'Microsoft Edge',
    link: 'https://play.google.com/store/apps/details?id=com.microsoft.emmx',
  },
  firefox: {
    name: 'Firefox',
    link: 'https://play.google.com/store/apps/details?id=org.mozilla.firefox',
  },
  opera: {
    name: 'Opera',
    link: 'https://play.google.com/store/apps/details?id=com.opera.browser',
  },
  samsung: {
    name: 'Samsung Internet',
    link: 'https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser',
  },
  brave: {
    name: 'Brave',
    link: 'https://play.google.com/store/apps/details?id=com.brave.browser',
  },
  tor: {
    name: 'Tor',
    link: 'https://play.google.com/store/apps/details?id=org.torproject.torbrowser',
  },
  uc: {
    name: 'UC',
    link: 'https://play.google.com/store/apps/details?id=com.UCMobile.intl',
  },
};

const COMPAT = {
  y: {
    short: 'yes',
    label: 'Supported',
    display: '✓',
  },
  n: {
    short: 'no',
    label: 'Unsupported',
    display: '✗',
  },
  ct_unimplemented: {
    short: 'na',
    label: 'CustomTabs Unimplemented',
    display: '—',
  },
};

const AndroidBrowserSupportTable = args => {
  const {_method} = args;
  const browsers = Object.entries(args).filter(a => !a[0].startsWith('_'));

  const headings = browsers
    .map(b => {
      const [browser] = b;
      const {name, link} = BROWSERS[browser];

      return html`<th title="${name}" data-browser="${browser}">
        <a href="${link}" rel="nofollow">${name}</a>
      </th>`;
    })
    .join('');

  const body = browsers
    .map(b => {
      const [browser, supportNote] = b;
      const [support, version] = supportNote.split('@');
      const {name} = BROWSERS[browser];
      const compatValue = COMPAT[support]?.short || 'bug';
      const label = COMPAT[support]?.label || support;
      const displayValue = COMPAT[support]?.display || COMPAT.y.display;
      let hoverTitle = '';

      if (compatValue === 'na') {
        hoverTitle = 'CustomTabs are not supported in general';
      } else {
        hoverTitle = `${_method} ${
          compatValue === 'yes' ? 'Supported' : 'Unsupported'
        }`;
      }

      hoverTitle = `${hoverTitle} as of ${name} version ${version}`;

      return html`<td
        data-browser="${browser}"
        data-compat="${compatValue}"
        aria-label="${label}"
      >
        <span title="${hoverTitle}"> ${displayValue} </span>
      </td>`;
    })
    .join('');

  return html`<table>
    <thead>
      <tr>
        ${headings}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${body}
      </tr>
    </tbody>
  </table> `;
};

module.exports = {AndroidBrowserSupportTable};
