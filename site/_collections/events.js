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
const memoize = require('../_js/utils/memoize');
const authorsData = require('../_data/authorsData.json');
const {defaultAvatarImg} = require('../_data/site.json');
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

/**
 * @returns {EventsCollectionItem[]}
 */
const getEvents = memoize(({collections, locale = 'en'}) => {
  return collections
    .getFilteredByGlob(`./site/${locale}/meet-the-team/events/**/*.md`)
    .map(event => {
      const sessions = event.data.sessions.map(session =>
        processSession(session)
      );

      return {
        id: event.data.id,
        title: event.data.title,
        externalUrl: event.data.externalUrl,
        summary: event.data.summary,
        location: event.data.location,
        date: event.data.date,
        isPastEvent: isPastEvent(event),
        sessions,
        image: event.data.image,
        topics: [...new Set(sessions.flatMap(s => s.topics))],
        googlers: sessions.flatMap(s => {
          return s.speaker
            ? s.speaker.handle
            : s.participants.map(p => p.handle);
        }),
      };
    });
});

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EventsCollectionItem[]}
 */
const pastEvents = collections => {
  return getEvents({collections})
    .filter(event => isPastEvent(event))
    .sort((a, b) => b.date - a.date);
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EventsCollectionItem[]}
 */
const currentEvents = collections => {
  return getEvents({collections})
    .filter(event => isPastEvent(event) === false)
    .sort((a, b) => a.date - b.date);
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {{locations:string[], googlers:{}[], topics:string[]}}
 */
const eventTags = collections => {
  const events = getEvents({collections});

  return {
    locations: uniqueLocations(events),
    googlers: uniqueGooglers(events),
    topics: uniqueTopics(events),
  };
};

/**
 * @param {String} authorHandle
 * @returns {{image: string, twitter: string|undefined, linkedin: string|undefined, title: string, handle:string}}
 */
const getAuthorData = authorHandle => {
  if (typeof authorsData[authorHandle] === 'undefined') {
    throw new Error(`Invalid author: ${authorHandle}`);
  }

  const authorData = authorsData[authorHandle];

  return {
    image: authorData.image ?? defaultAvatarImg,
    title: `i18n.authors.${authorHandle}.title`,
    twitter: authorData.twitter,
    linkedin: authorData.linkedin,
    handle: authorHandle,
  };
};

/**
 * @param session
 * @returns {EventSessionCollectionItem}
 */
const processSession = session => {
  if (session.type === 'speaker') {
    session.speaker = getAuthorData(session.speaker);
    session.image = session.speaker.image;

    return session;
  }

  session.participants = session.participants.map(p => {
    return getAuthorData(p);
  });

  return session;
};

const isPastEvent = event => {
  return event.date < startOfDay;
};

/**
 * @param {EventsCollectionItem[]} events
 * @returns {{}[]}
 */
const uniqueGooglers = events => {
  const rawSpeakers = events
    .map(e =>
      e.sessions.flatMap(s => {
        if (s.speaker) {
          return {handle: s.speaker.handle, title: s.speaker.title};
        }

        return s.participants.map(p => ({handle: p.handle, title: p.title}));
      })
    )
    .flat();

  return rawSpeakers
    .filter(
      (s, i) => rawSpeakers.findIndex(first => s.handle === first.handle) === i
    )
    .sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * @param {EventsCollectionItem[]} events
 * @returns {string[]}
 */
const uniqueTopics = events => {
  const topics = events.map(e => e.sessions.flatMap(s => s.topics)).flat();

  return [...new Set(topics)].sort((a, b) => a.localeCompare(b));
};

/**
 * @param {EventsCollectionItem[]} events
 * @returns {string[]}
 */
const uniqueLocations = events => {
  const locations = events.map(e => e.location);

  return [...new Set(locations)].sort((a, b) => a.localeCompare(b));
};

module.exports = {currentEvents, pastEvents, eventTags};
