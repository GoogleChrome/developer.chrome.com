const fs = require('fs');
const { formatDateShort } = require('../_data/lib/date');
const { EventParticipantCard } = require('./EventParticipantCard')
const {html} = require('common-tags');

const calendarIcon =  fs.readFileSync(`site/_includes/icons/calendar.svg`, 'utf-8');
const clockIcon =  fs.readFileSync(`site/_includes/icons/clock.svg`, 'utf-8');
const pinIcon =  fs.readFileSync(`site/_includes/icons/pin.svg`, 'utf-8');

function EventCard(event) {
  return html`
    <enhanced-event-card>
      <article class="event-card pad-400 no-js" show-details="0">
          <div class="display-flex">
            <figure class="event-card__desktop-image gap-right-400 flex-shrink-none">
                <!--Todo - handle images-->
                <img src="https://via.placeholder.com/250"
                     alt="placeholder"
                     loading="lazy"
                     width="225"
                     decoding="async"/>
            </figure>

            <div class="event-card__overview display-flex direction-column justify-content-between">
              <div>
                <h4 class="event-card__title">
                  <figure class="event-card__image gap-right-200 flex-shrink-none">
                    <!--Todo - handle images-->
                    <img src="https://via.placeholder.com/250"
                         alt="placeholder"
                         loading="lazy"
                         width="38"
                         decoding="async"/>
                  </figure>

                  ${event.title}
                </h4>

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
                  <h5 class="event-card__title gap-bottom-300 display-flex align-center">
                    <!--Todo - handle images-->
                    <img alt="Milica Mihajlija"
                         class="flex-shrink-none height-600 width-600 rounded-full gap-right-300"
                         decoding="async"
                         height="40"
                         width="40"
                         loading="lazy"
                         sizes="40px"
                         src="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format"
                         srcset="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=40 40w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=46 46w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=52 52w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=59 59w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=68 68w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=77 77w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=88 88w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=100 100w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=114 114w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=120 120w"
                      />
                      ${talk.speaker}
                    </h5>

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

              ${event.participant_groups.map((group) => (
                EventParticipantCard(html`
                    <h5 class="event-card__title gap-bottom-300 display-flex align-center">
                      <!--Todo - handle images-->
                      <img alt="Milica Mihajlija"
                           class="flex-shrink-none height-600 width-600 rounded-full gap-right-300"
                           decoding="async"
                           height="40"
                           width="40"
                           loading="lazy"
                           sizes="40px"
                           src="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format"
                           srcset="https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=40 40w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=46 46w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=52 52w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=59 59w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=68 68w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=77 77w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=88 88w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=100 100w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=114 114w, https://wd.imgix.net/image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/lLsarI5KPmS0kwK9L4Ea.jpeg?auto=format&amp;w=120 120w"
                        />
                        ${group.participants.length === 1 ? group.participants[0].name : 'Multiple participants'}
                      </h5>

                      ${group.participants.length > 1 && (
                        html`
                          <p class="event-card__sub-title gap-bottom-200">Participants</p>
                          <p class="gap-bottom-300">${group.participants.map(p => p.name).join(', ')}</p>
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
                  `)
              ))}
          </div>
      </article>
    </enhanced-event-card>
  `;
}

module.exports = {EventCard};
