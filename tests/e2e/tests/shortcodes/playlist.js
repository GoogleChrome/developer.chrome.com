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

test('renders a playlist', async t => {
  const $ = await getPageByUrl('en/shortcodes/playlist/default');

  t.assert($('.playlist').length === 1);

  t.assert($('.playlist__thumbnail > img').attr('src') !== '');

  t.assert($('.playlist__play-all > a').attr('href') !== '');

  t.assert($('.playlist__name > a').text().trim().length !== 0);
  t.assert($('.playlist__name > a').attr('href') !== '');

  t.assert($('.playlist__channel-name').text().trim().length !== 0);
  t.assert($('.playlist__channel-icon > img').attr('src') !== '');
  t.assert($('.playlist__channel-subscribe > a').attr('href') !== '');

  t.assert($('.playlist__videos').length !== 0);
  t.assert($('.playlist-video__number').text().trim().length !== 0);
  t.assert($('.playlist-video__content > a').attr('href') !== '');
  t.assert($('.playlist-video__thumbnail > img').attr('src') !== '');
});
