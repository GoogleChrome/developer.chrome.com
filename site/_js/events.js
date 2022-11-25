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
import {loadMore} from './misc/load-more';
import memoize from './utils/memoize';

const getEvents = async () => {
  const response = await fetch('/events.json');

  if (response.status !== 200) {
    throw new Error('Unable to fetch /events.json');
  }

  const all = await response.json();

  return {
    upcomingEvents: all.filter(event => !event.isPastEvent),
    pastEvents: all.filter(event => event.isPastEvent),
  };
};

const getMemoizedEvents = memoize(getEvents);

const eventLists = [
  {
    loadMore: document.getElementById('load-upcoming-events'),
    container: document.getElementById('upcoming-events'),
    fetchItems: async (skip, take) => {
      const {upcomingEvents} = await getMemoizedEvents();

      return upcomingEvents
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(skip, take + skip)
        .map(event => event.html);
    },
  },
  {
    loadMore: document.getElementById('load-past-events'),
    container: document.getElementById('past-events'),
    fetchItems: async (skip, take) => {
      const {pastEvents} = await getMemoizedEvents();

      return pastEvents
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(skip, take + skip)
        .map(event => event.html);
    },
  },
];

eventLists.forEach(list => {
  if (list.loadMore === null || list.container === null) return;

  const skip = list.container.querySelectorAll('enhanced-event-card').length;

  loadMore(
    list.loadMore,
    list.container,
    list.fetchItems,
    () => {
      document
        .getElementById('loading-error')
        ?.classList.remove('display-none');
    },
    {
      skip,
      take: 10,
    }
  );
});
