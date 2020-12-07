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

const path = require('path');
const {defaultLocale} = require('../_data/site.json');

const absolute = url => {
  if (!path.isAbsolute(url)) {
    url = path.join('/', url);
  }
  return url;
};

const trailingSlash = url => {
  if (!url.endsWith('/')) {
    url = path.join(url, '/');
  }
  return url;
};

const leadingAndTrailingSlash = url => {
  return trailingSlash(absolute(url));
};

const stripDefaultLocale = url => {
  if (typeof url !== 'string') {
    return url; // shows up for `permalink: false`
  }
  if (url.startsWith(`/${defaultLocale}/`)) {
    url = url.substring(`/${defaultLocale}`.length);
  }
  return url;
};

module.exports = {
  absolute,
  trailingSlash,
  leadingAndTrailingSlash,
  stripDefaultLocale,
};
