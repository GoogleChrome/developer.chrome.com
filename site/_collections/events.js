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

/**
 * Returns a list of events
 * *
 * @param {EleventyCollectionObject} collections
 * @returns {EleventyCollectionItem[]}
 */
module.exports = collections => {
  return collections
    .getFilteredByGlob('./site/en/meet-the-team/events/**/*.md')
    .map((event) => {
      event.data.id = event.fileSlug;

      event.data.sessions = event.data.sessions
        .map((session) => {
          if (session.type === 'speaker') {
            session.speaker = getAuthorData(session.speaker)
          }

          if (session.type === 'participant') {
            session.participants = session.participants.map((p) => {
              return getAuthorData(p);
            });
          }
          return session;
        });

      return event;
    })
    .sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

function getAuthorData(authorHandle)
{
  if (typeof authorsData[authorHandle] === 'undefined') {
    throw new Error(`Invalid author: ${authorHandle}`);
  }

  return {
    image: authorsData[authorHandle].image ?? PLACEHOLDER_IMG,
    title: `i18n.authors.${authorHandle}.title`
  };
}
