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
const {i18n} = require('../_filters/i18n');
const {Img} = require('../_shortcodes/Img');
const {defaultAvatarImg, chromeImg} = require('../_data/site.json');
const {isPastEvent, sortAsc, sortDesc} = require('../_js/utils/events');

const EVENT_PLACEHOLDER =
  'image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/5nwgD8ftJ8DREfN1QF7z.png';

/**
 * @returns {EventsCollectionItem[]}
 */
const getEvents = ({collections, filter, sort, locale = 'en'}) => {
  return collections
    .getFilteredByGlob(`./site/${locale}/meet-the-team/events/**/*.md`)
    .filter(filter)
    .map(event => {
      const sessions = event.data.sessions.map(session =>
        processSession(session, locale)
      );

      const image = Img({
        src: event.data.image ?? EVENT_PLACEHOLDER,
        width: 400,
        height: 400,
        alt: event.data.title,
      });

      return {
        id: event.data.id,
        title: event.data.title,
        externalUrl: event.data.externalUrl,
        summary: event.data.summary,
        location: event.data.location,
        date: event.data.date,
        isPastEvent: isPastEvent(event),
        sessions,
        image,
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
    sort: sortDesc,
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
    sort: sortAsc,
  });
};

/**
 * @param {String} authorHandle
 * @param {String} locale
 * @returns {{image: string, twitter: string|undefined, linkedin: string|undefined, title: string}}
 */
const getAuthorData = (authorHandle, locale) => {
  if (typeof authorsData[authorHandle] === 'undefined') {
    throw new Error(`Invalid author: ${authorHandle}`);
  }

  const authorData = authorsData[authorHandle];

  return {
    image: authorData.image ?? defaultAvatarImg,
    title: i18n(`i18n.authors.${authorHandle}.title`, locale),
    twitter: authorData.twitter,
    linkedin: authorData.linkedin,
  };
};

/**
 * @param session
 * @param {String} locale
 * @returns {{title}|*}
 */
const processSession = (session, locale) => {
  if (session.type === 'speaker') {
    session.speaker = getAuthorData(session.speaker, locale);
    session.image = Img({
      src: session.speaker.image,
      width: 40,
      height: 40,
      alt: session.speaker.title ?? session.title,
      class: 'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
    });

    return session;
  }

  session.participants = session.participants.map(p => {
    return getAuthorData(p, locale);
  });

  session.title =
    session.participants.length === 1
      ? session.participants[0].title
      : i18n('i18n.events.multiple_participants');

  session.image = Img({
    src:
      session.participants.length === 1
        ? session.participants[0].image
        : chromeImg,
    width: 40,
    height: 40,
    alt: session.title,
    class: 'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
  });

  return session;
};

module.exports = {currentEvents, pastEvents};
