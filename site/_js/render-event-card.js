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

const {html} = require('common-tags');
const {formatDateShort} = require('../_data/lib/date');

/**
 * Renders an event card.
 *
 * @param {object} event
 * @param {object} icons
 * @returns string
 */
function RenderEventCard(event, icons) {
  const buttonLabel = event.isPastEvent ? 'See details' : "See who's joining";

  return html`
    <enhanced-event-card>
      <article id="${event.id}"
               class="event-card pad-400 lg:pad-500 no-js"
               tabindex="0"
               show-details="">
          <div class="display-flex">
            <figure class="event-card__desktop-image gap-right-500 flex-shrink-none">
              ${event.image}
            </figure>

            <div class="event-card__overview display-flex direction-column justify-content-between">
              <div>
                <div class="event-card__title">
                  <figure class="event-card__image gap-right-200 flex-shrink-none">
                    ${event.image}
                  </figure>

                  <a href="${event.externalUrl}"
                     class="decoration-none"
                     target="_blank">
                    ${event.title}
                  </a>
                </div>

                <p>
                  ${event.summary}
                </p>

                <div class="event-card__meta display-flex gap-bottom-400">
                  <p class="display-flex align-center gap-right-500">
                      ${icons.pinIcon}
                      ${event.location}
                  </p>

                  <p class="display-flex align-center">
                      ${icons.calendarIcon}
                      ${formatDateShort(event.date)}
                  </p>
                </div>
              </div>

              <button class="material-button button-filled button-round">
                ${buttonLabel}
              </a>
            </div>
          </div>

          <div class="event-card__details gap-top-400 grid-cols-1 grid-gap-400 lg:grid-cols-2">
              ${event.sessions
                .filter(session => session.type === 'speaker')
                .map(session =>
                  sessionHtml(html`
                    <a
                      href="${event.externalUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="event-card__title decoration-none gap-bottom-300 display-flex align-center justify-content-between"
                    >
                      <span class="display-flex align-center">
                        ${session.image} ${session.speaker.title}
                      </span>

                      ${icons.launchIcon}
                    </a>

                    <p class="event-card__sub-title gap-bottom-200">
                      Talk title
                    </p>

                    <p class="gap-bottom-300">${session.title}</p>

                    ${Boolean(session.description) &&
                    html`
                      <p class="event-card__sub-title gap-bottom-200">
                        Details
                      </p>

                      <div class="gap-bottom-300">
                        <p>
                          <truncate-text maxLength="100"
                            >${session.description}</truncate-text
                          >
                        </p>
                      </div>
                    `}
                    ${linksHtml(session, icons)}
                    ${session.topics.map(topic => topicHtml(topic))}
                  `)
                )}

              ${event.sessions
                .filter(talk => talk.type === 'participant')
                .map(session => {
                  return sessionHtml(html`
                    <a
                      href="${event.externalUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="event-card__title decoration-none gap-bottom-300 display-flex align-center justify-content-between"
                    >
                      <span class="display-flex align-center">
                        ${session.image} ${session.title}
                      </span>

                      ${icons.launchIcon}
                    </a>

                    <p class="event-card__sub-title gap-bottom-200">
                      Participant details
                    </p>

                    ${session.description.length > 0 &&
                    html`
                      <div class="gap-bottom-300">
                        <p>
                          <truncate-text maxLength="100"
                            >${session.description}</truncate-text
                          >
                        </p>
                      </div>
                    `}
                    ${session.participants.length > 1 &&
                    html`
                      <p class="event-card__sub-title gap-bottom-200">
                        Participants
                      </p>
                      <p class="gap-bottom-300">
                        ${participantHTML(session.participants)}
                      </p>
                    `}
                    ${session.topics.map(topic => topicHtml(topic))}
                  `);
                })}
          </div>
      </article>
    </enhanced-event-card>
  `;
}

/**
 * @param {object[]} participants
 * @returns {string}
 */
const participantHTML = participants => {
  const processed = participants.map(participant => {
    if (participant.twitter) {
      return html`
        <a
          href="https://twitter.com/${participant.twitter}"
          target="_blank"
          rel="noopener noreferrer"
          >${participant.title}</a
        >
      `;
    }

    if (participant.linkedin) {
      return html`
        <a
          href="${participant.linkedin}"
          target="_blank"
          rel="noopener noreferrer"
          >${participant.title}</a
        >
      `;
    }

    return html` ${participant.title}`;
  });

  return processed.join(', ');
};

/**
 *
 * @param {object} session
 * @param {object} icons
 * @returns {string}
 */
const linksHtml = (session, icons) => {
  if (!session.slidesUrl && !session.videoUrl) {
    return '';
  }

  const slidesLink = session.slidesUrl
    ? html`
        <a
          href="${session.slidesUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="display-flex align-center gap-right-300 decoration-none"
        >
          ${icons.slidesIcon} Slides
        </a>
      `
    : '';

  const videoLink = session.videoUrl
    ? html`
        <a
          href="${session.videoUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="display-flex align-center decoration-none"
        >
          ${icons.videoIcon} Video
        </a>
      `
    : '';

  return html`
    <div class="event-card__sub-title gap-bottom-100">Link to Talk</div>

    <div class="event-card__links display-flex gap-bottom-300">
      ${slidesLink} ${videoLink}
    </div>
  `;
};

/**
 * @param {string} topic
 * @returns {string}
 */
const topicHtml = topic => {
  return html`
    <span
      class="display-inline-block color-secondary-text hairline rounded-lg tag-pill type--label gap-right-100"
    >
      ${topic}
    </span>
  `;
};

/**
 * @param {string} content
 * @returns {string}
 */
const sessionHtml = content => {
  return html` <article class="event-session-card bg-bg">${content}</article>`;
};

module.exports = {RenderEventCard};
