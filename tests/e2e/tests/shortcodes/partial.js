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

const test = require('ava');

// eslint-disable-next-line ava/no-import-test-files
const {getPageByUrl} = require('../../utils.js');

test('renders a partial with markdown', async t => {
  const $ = await getPageByUrl('en/shortcodes/partial/markdown');

  t.assert($('strong').length === 1);
});

test('renders nested shortcodes in partials', async t => {
  const $ = await getPageByUrl('en/shortcodes/partial/nested');

  t.assert($('.aside').length === 1);
});

test('renders translated partial if available', async t => {
  const $ = await getPageByUrl('es/shortcodes/partial/translated');
  t.assert($('.aside').text().trim() === 'Spanish.');
});

test('renders english partial if not translated', async t => {
  const $ = await getPageByUrl('es/shortcodes/partial/untranslated');
  t.assert($('.aside').text().trim() === 'Always English.');
});
