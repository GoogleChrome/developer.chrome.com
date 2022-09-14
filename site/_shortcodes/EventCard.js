const fs = require('fs');
const { formatDateShort } = require('../_data/lib/date');
const { EventParticipantCard } = require('./EventParticipantCard')
const {html} = require('common-tags');
const {i18n} = require('../_filters/i18n');
const {Img} = require('./Img');

const calendarIcon =  fs.readFileSync(`site/_includes/icons/calendar.svg`, 'utf-8');
const clockIcon =  fs.readFileSync(`site/_includes/icons/clock.svg`, 'utf-8');
const pinIcon =  fs.readFileSync(`site/_includes/icons/pin.svg`, 'utf-8');
const PLACEHOLDER_IMG =
  'image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/5nwgD8ftJ8DREfN1QF7z.png';

function EventCard(event) {
  const image = Img({
    src: event.image ?? PLACEHOLDER_IMG,
    width: 225,
    height: 225,
    alt: event.title,
  });

  return html`
    <enhanced-event-card>
      <article class="event-card pad-400 no-js" tabindex="0" show-details="0">
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

                  ${event.title}
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

              <button class="material-button button-filled button-round color-bg">
                See event details
              </a>
            </div>
          </div>

          <div class="event-card__details gap-top-400 grid-cols-1 grid-gap-400 lg:grid-cols-2">
              ${event.talks.map((talk) => (
                EventParticipantCard(html`
                    <div class="event-card__title gap-bottom-300 display-flex align-center">
                        ${Img({
                          src: talk.speaker.image,
                          width: 40,
                          height: 40,
                          alt: i18n(talk.speaker.title),
                          class: 'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
                        })}
                        ${i18n(talk.speaker.title)}
                    </div>

                    <p class="event-card__sub-title gap-bottom-200">${talk.title}</p>

                    <div class="gap-bottom-200">
                      <p>${talk.description}</p>
                    </div>

                    <a href="/todo"
                       class="surface color-secondary-text decoration-none hairline rounded-lg tag-pill type--label weight-regular">
                      ${talk.topic}
                    </a>

                    <p class="display-flex align-center gap-top-300">${clockIcon} ${talk.time}</p>
                `)
              ))}

              ${event.participant_groups.map((group) => {
                const icon = group.participants.length === 1 ? group.participants[0].image : 'image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/NLdnaqMpBEjPaCtVEfcJ.svg';
                const title = group.participants.length === 1 ? i18n(group.participants[0].title) : 'Multiple participants';

                return EventParticipantCard(html`
                    <h5 class="event-card__title gap-bottom-300 display-flex align-center">
                        ${Img({
                          src: icon,
                          width: 40,
                          height: 40,
                          alt: title,
                          class: 'flex-shrink-none height-600 width-600 rounded-full gap-right-300',
                        })}

                        ${title}
                    </h5>

                    ${group.participants.length > 1 && (
                      html`
                          <p class="event-card__sub-title gap-bottom-200">Participants</p>
                          <p class="gap-bottom-300">${group.participants.map(p => i18n(p.title)).join(', ')}</p>
                        `
                    )}

                    <p class="event-card__sub-title gap-bottom-200">Participant details</p>

                    <div class="gap-bottom-200">
                        <p>${group.description}</p>
                    </div>

                    ${group.topic && (
                      html`
                          <a href="/todo"
                             class="surface color-secondary-text decoration-none hairline rounded-lg tag-pill type--label weight-regular">
                            ${group.topic}
                          </a>
                      `
                    )}
                `);
              })}
          </div>
      </article>
    </enhanced-event-card>
  `;
}

module.exports = {EventCard};
