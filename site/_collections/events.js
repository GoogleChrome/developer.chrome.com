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

const authorsData = require('../_data/authorsData.json');
const PLACEHOLDER_IMG =
  'image/tcFciHGuF3MxnTr1y5ue01OGLBn2/PFaMfvDZoPorronbpdU8.svg';

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

/**
 * @returns {EleventyCollectionItem[]}
 */
const getEvents = (collections, filter, sort) => {
  return collections
    .getFilteredByGlob('./site/en/meet-the-team/events/**/*.md')
    .filter(filter)
    .map(event => {
      event.data.isPastEvent = isPastEvent(event);

      event.data.sessions = event.data.sessions.map(session => {
        if (session.type === 'speaker') {
          session.speaker = getAuthorData(session.speaker);
        }

        if (session.type === 'participant') {
          session.participants = session.participants.map(p => {
            return getAuthorData(p);
          });
        }

        return session;
      });

      return event;
    })
    .sort(sort);
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EleventyCollectionItem[]}
 */
const pastEvents = collections => {
  return getEvents(
    collections,
    event => isPastEvent(event),
    (a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  );
};

/**
 * @param {EleventyCollectionObject} collections
 * @returns {EleventyCollectionItem[]}
 */
const currentEvents = collections => {
  return getEvents(
    collections,
    event => isPastEvent(event) === false,
    (a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  );
};

/**
 * @param authorHandle
 * @returns {{image: string, twitter: string|undefined, linkedin: string|undefined, title: string}}
 */
const getAuthorData = authorHandle => {
  if (typeof authorsData[authorHandle] === 'undefined') {
    throw new Error(`Invalid author: ${authorHandle}`);
  }

  return {
    image: authorsData[authorHandle].image ?? PLACEHOLDER_IMG,
    title: `i18n.authors.${authorHandle}.title`,
    twitter: authorsData[authorHandle].twitter,
    linkedin: authorsData[authorHandle].linkedin,
  };
};

/**
 * @param event
 * @returns {boolean}
 */
const isPastEvent = event => {
  return new Date(event.date).getTime() < startOfDay.getTime();
};

module.exports = {currentEvents, pastEvents};
