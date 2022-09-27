const fs = require('fs');
const {formatDateShort} = require('../_data/lib/date');
const {EventSessionCard} = require('./EventSessionCard');
const {html} = require('common-tags');
const {i18n} = require('../_filters/i18n');
const {Img} = require('./Img');

const calendarIcon = fs.readFileSync(
  'site/_includes/icons/calendar.svg',
  'utf-8'
);
const pinIcon = fs.readFileSync('site/_includes/icons/pin.svg', 'utf-8');
const slidesIcon = fs.readFileSync('site/_includes/icons/slides.svg', 'utf-8');
const videoIcon = fs.readFileSync('site/_includes/icons/video.svg', 'utf-8');
const launchIcon = fs.readFileSync('site/_includes/icons/launch.svg', 'utf-8');

const PLACEHOLDER_IMG =
  'image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/5nwgD8ftJ8DREfN1QF7z.png';

function EventCard(event) {
  const image = Img({
    src: event.image ?? PLACEHOLDER_IMG,
    width: 400,
    height: 400,
    alt: event.title,
  });

  return html`
    <enhanced-event-card>
      <article id="${event.id}"
               class="event-card pad-400 lg:pad-500 no-js"
               tabindex="0"
               show-details="0">
          <div class="display-flex">
            <figure class="event-card__desktop-image gap-right-500 flex-shrink-none">
              ${image}
            </figure>

            <div class="event-card__overview display-flex direction-column justify-content-between">
              <div>
                <div class="event-card__title">
                  <figure class="event-card__image gap-right-200 flex-shrink-none">
                    ${image}
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
                      ${pinIcon}
                      ${event.location}
                  </p>

                  <p class="display-flex align-center">
                      ${calendarIcon}
                      ${formatDateShort(event.date)}
                  </p>
                </div>
              </div>

              <button class="material-button button-filled button-round">
                See who's joining
              </a>
            </div>
          </div>

          <div class="event-card__details gap-top-400 grid-cols-1 grid-gap-400 lg:grid-cols-2">
              ${event.sessions
                .filter(session => session.type === 'speaker')
                .map(session =>
                  EventSessionCard(html`
                    <a
                      href="${event.externalUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="event-card__title decoration-none gap-bottom-300 display-flex align-center justify-content-between"
                    >
                      <span class="display-flex align-center">
                        ${Img({
                          src: session.speaker.image,
                          width: 40,
                          height: 40,
                          alt: i18n(session.speaker.title),
                          class:
                            'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
                        })}
                        ${i18n(session.speaker.title)}
                      </span>

                      ${launchIcon}
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
                    ${linksHtml(session)}
                    ${session.topics.map(topic => topicHtml(topic))}
                  `)
                )}

              ${event.sessions
                .filter(talk => talk.type === 'participant')
                .map(session => {
                  const icon =
                    session.participants.length === 1
                      ? session.participants[0].image
                      : 'image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/NLdnaqMpBEjPaCtVEfcJ.svg';
                  const title =
                    session.participants.length === 1
                      ? i18n(session.participants[0].title)
                      : 'Multiple participants';

                  return EventSessionCard(html`
                    <a
                      href="${event.externalUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="event-card__title decoration-none gap-bottom-300 display-flex align-center justify-content-between"
                    >
                      <span class="display-flex align-center">
                        ${Img({
                          src: icon,
                          width: 40,
                          height: 40,
                          alt: title,
                          class:
                            'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
                        })}
                        ${title}
                      </span>

                      ${launchIcon}
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

const participantHTML = participants => {
  const processed = participants.map(participant => {
    const title = i18n(participant.title);

    if (participant.twitter) {
      return html`
        <a
          href="https://twitter.com/${participant.twitter}"
          target="_blank"
          rel="noopener noreferrer"
          >${title}</a
        >
      `;
    }

    if (participant.linkedin) {
      return html`
        <a
          href="${participant.linkedin}"
          target="_blank"
          rel="noopener noreferrer"
          >${title}</a
        >
      `;
    }

    return html` ${title}`;
  });

  return processed.join(', ');
};

const linksHtml = session => {
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
          ${slidesIcon} Slides
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
          ${videoIcon} Video
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

const topicHtml = topic => {
  return html`
    <span
      class="display-inline-block surface color-secondary-text hairline rounded-lg tag-pill type--label gap-right-100"
    >
      ${topic}
    </span>
  `;
};

module.exports = {EventCard};
