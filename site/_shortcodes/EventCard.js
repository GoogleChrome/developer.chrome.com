const fs = require('fs');
const { formatDateShort } = require('../_data/lib/date');
const { EventParticipantCard } = require('./EventParticipantCard')
const {html} = require('common-tags');

const calendarIcon =  fs.readFileSync(`site/_includes/icons/calendar.svg`, 'utf-8');
const clockIcon =  fs.readFileSync(`site/_includes/icons/clock.svg`, 'utf-8');
const pinIcon =  fs.readFileSync(`site/_includes/icons/pin.svg`, 'utf-8');

function EventCard(event) {
  return html`
    <article class="event-card pad-400 gap-bottom-400">
        <div class="display-flex">
          <figure class="gap-right-400 flex-shrink-none">
              <!--Todo - handle images-->
              <img src="https://via.placeholder.com/250"
                   alt="placeholder"
                   loading="lazy"
                   decoding="async"/>
          </figure>

          <div class="display-flex direction-column justify-content-between">
            <div>
              <h4 class="event-card__title gap-bottom-200">
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

            <a class="material-button bg-blue-medium button-filled button-round color-bg"
               href="/docs/"
            >
              See event details
            </a>
          </div>
        </div>

        <div class="gap-top-400 display-grid grid-cols-2 grid-gap-400">
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
  `;
}

module.exports = {EventCard};
