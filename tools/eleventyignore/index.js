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

/**
 * @file This outputs an .eleventyignore file in the root of the project.
 * This is used to tell eleventy to ignore large sections of the docs in order
 * to speed up build times. For instance, the native-client docs have around
 * 1000 pages of API reference that can safely be ignored if you're just
 * developing locally.
 *
 * To tell eleventy to ignore a section, add one of the environment variables
 * to your .env file.
 */

require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');
const warning = chalk.black.bgYellow;
const locales = require('../../site/_data/site.json').locales;

// Default files that should always be ignored.
let ignores = [
  'node_modules',
  '**/README.md',
  '**/_example',
  '**/preview/layouts',
  '*.swp',
];

const isProduction = process.env.NODE_ENV === 'production';
// This will automatically be set to true by GitHub Actions.
const isCI = process.env.CI;

// Only use ignore environment variables during dev and CI builds.
if (!isProduction || isCI) {
  const isTruthy = value => {
    if (value === '0' || value === 'false') return false;
    return !!value;
  };

  // Ignore translated documents
  if (!isTruthy(process.env.ELEVENTY_INCLUDE_TRANSLATED)) {
    console.log(warning('Ignoring TRANSLATED docs.'));
    const translated = locales
      .filter(locale => locale !== 'en')
      .map(locale => `site/${locale}/**/*`);
    ignores = [...ignores, ...translated];
  }

  // Ignore /blog/
  if (isTruthy(process.env.ELEVENTY_IGNORE_BLOG)) {
    console.log(warning('Ignoring BLOG.'));
    ignores.push('site/**/blog/**/*');
  }

  // Ignore /docs/
  if (isTruthy(process.env.ELEVENTY_IGNORE_DOCS)) {
    console.log(warning('Ignoring ALL docs.'));
    ignores.push('site/**/docs/**/*');
  }

  // Ignore /docs/android/
  if (isTruthy(process.env.ELEVENTY_IGNORE_ANDROID)) {
    console.log(warning('Ignoring android docs.'));
    ignores.push('site/**/docs/android/**/*');
  }

  // Ignore /docs/apps/
  if (isTruthy(process.env.ELEVENTY_IGNORE_APPS)) {
    console.log(warning('Ignoring apps docs.'));
    ignores.push('site/**/docs/apps/**/*');
  }

  // Ignore /docs/devtools/
  if (isTruthy(process.env.ELEVENTY_IGNORE_DEVTOOLS)) {
    console.log(warning('Ignoring devtools docs.'));
    ignores.push('site/**/docs/devtools/**/*');
  }

  // Ignore /docs/extensions/
  if (isTruthy(process.env.ELEVENTY_IGNORE_EXTENSIONS)) {
    console.log(warning('Ignoring extensions docs.'));
    ignores.push('site/**/docs/extensions/**/*');
  }

  // Ignore /docs/handbook/
  if (isTruthy(process.env.ELEVENTY_IGNORE_HANDBOOK)) {
    console.log(warning('Ignoring handbook docs.'));
    ignores.push('site/**/docs/handbook/**/*');
  }

  // Ignore /docs/lighthouse/
  if (isTruthy(process.env.ELEVENTY_IGNORE_LIGHTHOUSE)) {
    console.log(warning('Ignoring lighthouse docs.'));
    ignores.push('site/**/docs/lighthouse/**/*');
  }

  // Ignore /docs/multidevice/
  if (isTruthy(process.env.ELEVENTY_IGNORE_MULTIDEVICE)) {
    console.log(warning('Ignoring multidevice docs.'));
    ignores.push('site/**/docs/multidevice/**/*');
  }

  // Ignore /docs/native-client/
  if (isTruthy(process.env.ELEVENTY_IGNORE_NACL)) {
    console.log(warning('Ignoring native-client docs.'));
    ignores.push('site/**/docs/native-client/**/*');
  }

  // Ignore /docs/privacy-sandbox/
  if (isTruthy(process.env.ELEVENTY_IGNORE_PRIVACY_SANDBOX)) {
    console.log(warning('Ignoring privacy-sandbox docs.'));
    ignores.push('site/**/docs/privacy-sandbox/**/*');
  }

  // Ignore /docs/versionhistory/
  if (isTruthy(process.env.ELEVENTY_IGNORE_VERSIONHISTORY)) {
    console.log(warning('Ignoring versionhistory docs.'));
    ignores.push('site/**/docs/versionhistory/**/*');
  }

  // Ignore /docs/webstore/
  if (isTruthy(process.env.ELEVENTY_IGNORE_WEBSTORE)) {
    console.log(warning('Ignoring webstore docs.'));
    ignores.push('site/**/docs/webstore/**/*');
  }

  // Ignore /docs/workbox/
  if (isTruthy(process.env.ELEVENTY_IGNORE_WORKBOX)) {
    console.log(warning('Ignoring workbox docs.'));
    ignores.push('site/**/docs/workbox/**/*');
  }
}

fs.writeFileSync('.eleventyignore', ignores.join('\n'));
