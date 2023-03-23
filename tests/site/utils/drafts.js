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

const {
  isScheduledForFuture,
  isPublished,
} = require('../../../site/_utils/drafts');

test('isScheduledForFuture throws if now is not a date', t => {
  const error = t.throws(
    () => {
      const post = {date: new Date(), data: {}};
      isScheduledForFuture(post.date, 'now');
    },
    {instanceOf: Error}
  );

  t.is(error.message, 'argument <now> must be a Date object.');
});

test('isScheduledForFuture returns false if date is earlier than now', t => {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const post = {date: now, data: {}};

  const actual = isScheduledForFuture(post.date, now);
  t.false(actual);
});

test('isScheduledForFuture returns true if date is later than now', t => {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  const post = {date: tomorrow, data: {}};

  const actual = isScheduledForFuture(post.date, now);
  t.true(actual);
});

test('isScheduledForFuture returns true if time is later than now', t => {
  const now = new Date();
  const inOneMinute = new Date();
  inOneMinute.setMinutes(now.getMinutes() + 1);

  const post = {date: inOneMinute, data: {}};

  const actual = isScheduledForFuture(post.date, now);
  t.true(actual);
});

test('isScheduledForFuture returns false if time is earlier than now', t => {
  const now = new Date();
  const inOneMinute = new Date();
  inOneMinute.setMinutes(now.getMinutes() + 1);

  const post = {date: now, data: {}};

  const actual = isScheduledForFuture(post.date, inOneMinute);
  t.false(actual);
});

test('isPublished is false if post is a draft', t => {
  const data = {draft: true, page: {date: new Date()}};

  const actual = isPublished(data);
  t.false(actual);
});

test('isPublished is false if post has a future date', t => {
  const now = new Date();
  const inOneHour = new Date();
  inOneHour.setHours(now.getHours() + 1);
  const data = {draft: false, page: {date: inOneHour}};

  const actual = isPublished(data);
  t.false(actual);
});

test('isPublished is true if not a draft and post has a past date', t => {
  const now = new Date();
  const oneHourAgo = new Date();
  oneHourAgo.setHours(now.getHours() - 1);
  const data = {draft: false, page: {date: oneHourAgo}};

  const actual = isPublished(data);
  t.true(actual);
});
