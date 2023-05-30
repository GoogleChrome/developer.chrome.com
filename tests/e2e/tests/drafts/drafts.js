/*
 * Copyright 2023 Google LLC
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
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line ava/no-import-test-files
const {distPath} = require('../../utils.js');
const {isTruthy} = require('../../../../site/_utils/isTruthy.js');

test('Output a non-draft file', t => {
  const filePath = path.join(distPath, 'en/drafts/not-a-draft/index.html');
  const statsObj = fs.statSync(filePath);

  t.truthy(statsObj);
});

test('Outputs a past file', t => {
  const filePath = path.join(distPath, 'en/drafts/past-post/index.html');
  const statsObj = fs.statSync(filePath);

  t.truthy(statsObj);
});

test('Outputs a past file with canonical date', t => {
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-canonical/index.html'
  );
  const statsObj = fs.statSync(filePath);

  t.truthy(statsObj);
});

test('Outputs a past file with date with space', t => {
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-with-space/index.html'
  );
  const statsObj = fs.statSync(filePath);

  t.truthy(statsObj);
});

test('Outputs a past file with date with timezone', t => {
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-with-timezone/index.html'
  );
  const statsObj = fs.statSync(filePath);

  t.truthy(statsObj);
});

if (process.env.NODE_ENV === 'production' && !isTruthy(process.env.CI)) {
  test('Does not output a draft file', t => {
    const filePath = path.join(distPath, 'en/drafts/draft/index.html');
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});

    t.is(error.code, 'ENOENT');
  });

  test('Does not output a future file', t => {
    const filePath = path.join(distPath, 'en/drafts/future-post/index.html');
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});
    t.is(error.code, 'ENOENT');
  });

  test('Does not output a future file with canonical date', t => {
    const filePath = path.join(
      distPath,
      'en/drafts/future-post-date-canonical/index.html'
    );
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});
    t.is(error.code, 'ENOENT');
  });

  test('Does not output a future file with date with space', t => {
    const filePath = path.join(
      distPath,
      'en/drafts/future-post-date-with-space/index.html'
    );
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});
    t.is(error.code, 'ENOENT');
  });

  test('Does not output a future file with date with timezone', t => {
    const filePath = path.join(
      distPath,
      'en/drafts/future-post-date-with-timezone/index.html'
    );
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});
    t.is(error.code, 'ENOENT');
  });

  test('Does not output a past draft file', t => {
    const filePath = path.join(
      distPath,
      'en/drafts/past-post-draft/index.html'
    );
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});
    t.is(error.code, 'ENOENT');
  });
}
