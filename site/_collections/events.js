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

const authorsData = require('../_data/authorsData.json');
const {defaultAvatarImg} = require('../_data/site.json');
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

/**
 * @returns {EventsCollectionItem[]}
 */
const getEvents = ({collections, filter, sort, locale = 'en'}) => {
  return collections
    .getFilteredByGlob(`./site/${locale}/meet-the-team/events/**/*.md`)
    .filter(filter)
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
      };
    })
    .sort(sort);
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EventsCollectionItem[]}
 */
const pastEvents = collections => {
  return getEvents({
    collections,
    filter: event => isPastEvent(event),
    sort: (a, b) => b.date - a.date,
  });
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EventsCollectionItem[]}
 */
const currentEvents = collections => {
  return getEvents({
    collections,
    filter: event => isPastEvent(event) === false,
    sort: (a, b) => a.date - b.date,
  });
};

/**
 * @param {String} authorHandle
 * @returns {{image: string, twitter: string|undefined, linkedin: string|undefined, title: string}}
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
  };
};

/**
 * @param session
 * @returns {{title}|*}
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

module.exports = {currentEvents, pastEvents};
