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

const fs = require('fs');
const path = require('path');

const {milestones} = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../external/data/chrome-release.json'),
    {encoding: 'utf8'}
  )
);

const AVAILABLE_DATES = ['stableDate', 'earliestBetaDate', 'finalBetaDate'];

/**
 * Filters a Chrome milestone number to the specified date,
 * to keep announcements like "available from Chrome 123, expected on ..."
 * fresh and informative
 *
 * @param {number} milestone
 * @param {string} dateType
 * @return {string}
 * @this {any}
 */
function ChromeDate(milestone, dateType = 'stableDate') {
  // If someone is using old external data, milestones are not yet
  // available so this is to avoid breaking their build
  if (!milestones) {
    return 'TBA';
  }

  const milestoneData = milestones[milestone];
  if (!milestoneData) {
    throw new Error(
      `No data available for milestone '${milestone}'. ` +
        'Try running `npm run sync-external`' +
        'and verify the specified milestone is not older/' +
        'further in the future than 2 years.'
    );
  }

  if (!AVAILABLE_DATES.includes(dateType)) {
    throw new Error(
      `There is no milestone date '${dateType}'. Use one of ${AVAILABLE_DATES.join(
        ','
      )}.`
    );
  }

  const date = new Date(milestoneData[dateType]);
  const formattedDate = new Intl.DateTimeFormat(this.ctx.locale || 'en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  // Make sure date gets not split over multiple lines, and mark
  // the returned string as safe, to avoid having to |safe everytime
  // in the template
  return formattedDate.replace(' ', '&nbsp;');
}

module.exports = {ChromeDate};
