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

import './web-components/enhanced-event-card';
import './web-components/truncate-text';
import './web-components/enhanced-select';
import './web-components/checkbox-group';
import {RenderEventCard} from './render-event-card';
import {loadMore} from './behaviors/load-more';
import memoize from './utils/memoize';

// Todo - abstract to separate file and refactor collection
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);
const isPastEvent = event => {
  return new Date(event.date).getTime() < startOfDay.getTime();
};
//Todo - end

// Todo - abstract to separate file and refactor collection
const sortDesc = (a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();
const sortAsc = (a, b) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();
//Todo - end

const getEvents = async () => {
  const response = await fetch('/events.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /events.json');
  }

  const events = await response.json();

  return {
    upcomingEvents: events.filter(event => !isPastEvent(event)),
    pastEvents: events.filter(event => isPastEvent(event)),
  };
};

(async function () {
  //todo:
  //- ensure elements exist
  const getMemoizedEvents = memoize(getEvents);

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
    {skip: 5, take: 1}
  );
})();
