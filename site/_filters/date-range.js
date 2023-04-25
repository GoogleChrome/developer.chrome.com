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

const today = new Date();
const ms = require('ms');

/**
 * Checks the date range to return the appropriate filter value
 * @param {string} date in yyyy-mm-dd format
 * @return {number}
 */
function dateRange(date) {
  const dateObj = new Date(`${date}T00:00:00.000Z`);
  const timeUntilRemoval = dateObj.getTime() - today.getTime();

  if (timeUntilRemoval < 0) {
    return -1;
  } else if (timeUntilRemoval <= ms('7d')) {
    return 7;
  } else if (timeUntilRemoval <= ms('30d')) {
    return 30;
  } else if (timeUntilRemoval <= ms('90d')) {
    return 90;
  } else if (timeUntilRemoval <= ms('180d')) {
    return 180;
  } else if (timeUntilRemoval <= ms('365d')) {
    return 365;
  }

  return -1;
}

module.exports = {
  dateRange,
};
