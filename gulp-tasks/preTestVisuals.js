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

const rimraf = require('rimraf');
const {mkdirSync} = require('fs');
const {cp} = require('fs/promises');

module.exports = async function preTestVisuals() {
  // eslint-disable-next-line
  const {execa} = await import('execa');

  rimraf.sync('tests/visual/fixtures/dist');
  mkdirSync('tests/visual/fixtures/dist', {recursive: true});

  await Promise.all([execa('gulp'), execa('npx', ['rollup', '-c'])]);
  // Copy all of whats normally built into dist by the default tasks
  // into the test dist directory as well
  cp('dist', 'tests/visual/fixtures/dist', {recursive: true});
};
