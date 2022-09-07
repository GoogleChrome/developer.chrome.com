const fs = require('fs');
const { formatDateShort } = require('../_data/lib/date');

const placeholderIcon =  fs.readFileSync(`site/_includes/icons/world.svg`, 'utf-8');

function EventCard(event) {
  return `<article class="event-card display-flex pad-400 gap-bottom-400">
  <figure class="gap-right-400 flex-shrink-none">
    <img src="https://via.placeholder.com/250" alt="placeholder"/>
  </figure>

  <div class="display-flex direction-column justify-content-between">
    <div>
      <p class="type--h5 gap-bottom-200">
        ${event.title}
      </p>

      <p class="gap-bottom-200">
        ${event.summary}
      </p>

      <div class="event-card__meta display-flex gap-bottom-400">
        <div class="display-flex align-center gap-right-500">
            ${placeholderIcon}
            ${event.location}
        </div>

        <div class="display-flex align-center">
            ${placeholderIcon}
            ${formatDateShort(event.date)}
        </div>
      </div>
    </div>

    <a class="material-button bg-blue-medium button-filled button-round color-bg"
       href="/docs/"
    >
      See event details
    </a>
  </div>
</article>`;
}

module.exports = {EventCard};
