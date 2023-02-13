const {html} = require('common-tags');

const playlistsData = require('../_data/youtubePlaylists');

/** Renders a a YouTube playlist widget
 * @param {string} playlistId is a YouTube playlist id
 */

async function Playlist(playlistId) {
  let videoNumber = 1;
  let videoTotal = 0;

  // Set some empty variables to populate
  let playlistHtml = '';

  const playlistData = await playlistsData(playlistId);
  const channelId = playlistData?.channel?.id;
  const channelName = playlistData?.channel?.name;
  const channelThumb = playlistData?.channel?.thumbnail;
  const playlistFirstVideo = playlistData?.playlist?.videos[0].id;
  const playlistName = playlistData?.playlist?.title;
  const playlistThumb = playlistData?.playlist?.thumbnail;
  const playlistUpdated = new Date(
    playlistData?.playlist?.updated
  ).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  playlistData?.playlist?.videos.forEach(video => {
    playlistHtml += getVideoHtml(video, videoNumber, channelName);

    videoNumber++;
    videoTotal++;
  });

  const result = getChannelHtml(
    playlistThumb,
    playlistName,
    playlistFirstVideo,
    playlistId,
    videoTotal,
    playlistUpdated,
    channelThumb,
    channelName,
    channelId,
    playlistHtml
  );

  return result;
}

function getVideoHtml(video, videoNumber, channelTitle) {
  return html`<div class="playlist-video">
    <div class="playlist-video__number">${videoNumber}</div>

    <div class="playlist-video--content">
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
        <div class="playlist-video__thumbnail">
          <img
            src="${video.thumbnail}"
            height="114"
            width="204"
            alt="Thumbnail"
            class="rounded-lg"
          />
        </div>
      </a>

      <div class="playlist-video__details">
        <a
          href="https://www.youtube.com/watch?v=${video.id}"
          class="no-visited"
          target="_blank"
        >
          <h4 class="playlist-video__title">${video.title}</h4>
        </a>
        <p>${channelTitle}</p>
      </div>
    </div>
  </div>`;
}

function getChannelHtml(
  playlistThumb,
  playlistName,
  playlistFirstVideo,
  playlistId,
  videoTotal,
  playlistUpdated,
  channelThumb,
  channelName,
  channelId,
  playlistHtml
) {
  return html`<div class="gap-top-400">
    <div class="playlist hairline rounded-lg width-full">
      <div class="playlist-details rounded-lg">
        <div class="playlist-details-inner rounded-lg">
          <div class="playlist-thumbnail">
            <img
              src="${playlistThumb}"
              height="158"
              width="316"
              alt="Thumbnail for ${playlistName}"
              class="rounded-lg"
            />
            <div class="playlist-play-all">
              <a
                href="https://www.youtube.com/watch?v=${playlistFirstVideo}&list=${playlistId}"
                target="_blank"
                class="no-visited"
                >PLAY ALL</a
              >
            </div>
          </div>

          <h2 class="playlist-name type--h3-card gap-top-400">
            <a
              class="color-red-darkest surface display-inline-flex no-visited"
              href="https://www.youtube.com/playlist?list=${playlistId}"
              target="_blank"
            >
              ${playlistName}
            </a>
          </h2>

          <p class="playlist-meta gap-top-200">
            ${videoTotal} Videos<br />
            Last updated on ${playlistUpdated}
          </p>

          <div class="playlist-channel">
            <div class="playlist-channel__details">
              <div class="playlist-channel__icon">
                <img
                  src="${channelThumb}"
                  alt="Channel icon"
                  height="56"
                  width="56"
                />
              </div>

              <p class="playlist-channel__name">${channelName}</p>
            </div>
            <div class="playlist-channel__subscribe">
              <a
                href="https://www.youtube.com/channel/${channelId}?sub_confirmation=1"
                target="_blank"
                class="material-button button-filled button-round display-inline-flex color-bg bg-red-medium"
                >Subscribe</a
              >
            </div>
          </div>
          ${videoTotal >= 4
            ? `<div class="playlist-decorations">
          <img src="https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/3IgLIoZypldJWF5SSLR5.svg" alt="YouTube logo decoration" />
        </div>`
            : ''}
        </div>
      </div>

      <div class="playlist-videos">${playlistHtml}</div>
    </div>
  </div>`;
}
module.exports = {Playlist};
