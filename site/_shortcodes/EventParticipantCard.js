const {html} = require('common-tags');

function EventParticipantCard(content) {
  return html`
    <article class="event-participant-card bg-bg">
        ${content}
    </article>
  `;
}

module.exports = {EventParticipantCard};
