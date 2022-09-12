const {html} = require('common-tags');

function EventParticipantCard(content) {
  return html`
    <article class="event-participant-card bg-bg pad-400 pad-top-500 pad-bottom-500">
        ${content}
    </article>
  `;
}

module.exports = {EventParticipantCard};
