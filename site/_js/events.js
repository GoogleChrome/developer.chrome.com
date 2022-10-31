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

import './web-components/enhanced-event-card';
import './web-components/truncate-text';
import './web-components/enhanced-select';
import './web-components/checkbox-group';
import {RenderEventCard} from './render-event-card';
import {loadMore} from './load-more';
import memoize from './utils/memoize';
import {isPastEvent, sortAsc, sortDesc} from './utils/events';

const getEvents = async () => {
  const response = await fetch('/events.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /events.json');
  }

  const all = await response.json();

  return {
    upcomingEvents: all.filter(event => !isPastEvent(event)),
    pastEvents: all.filter(event => isPastEvent(event)),
  };
};

(async function () {
  const getMemoizedEvents = memoize(getEvents);
  const skip = 5;
  const take = 1;

  loadMore(
    document.getElementById('load-upcoming-events'),
    document.getElementById('upcoming-events'),
    async (skip, take) => {
      const {upcomingEvents} = await getMemoizedEvents();

      return upcomingEvents
        .sort(sortAsc)
        .slice(skip, take + skip)
        .map(event => RenderEventCard(event));
    },
    {skip, take}
  );

  loadMore(
    document.getElementById('load-past-events'),
    document.getElementById('past-events'),
    async (skip, take) => {
      const {pastEvents} = await getMemoizedEvents();

      return pastEvents
        .sort(sortDesc)
        .slice(skip, take + skip)
        .map(event => RenderEventCard(event));
    },
    {skip, take}
  );
})();
