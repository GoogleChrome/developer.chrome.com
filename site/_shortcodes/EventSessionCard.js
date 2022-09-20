const {html} = require('common-tags');

function EventSessionCard(content) {
  return html` <article class="event-session-card bg-bg">${content}</article> `;
}

module.exports = {EventSessionCard};
