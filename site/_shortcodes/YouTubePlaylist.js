const {html} = require('common-tags');

/**
 * Generates the HTML to render each single video added to the playlist
 * @param {object} video An object with the single video data
 * @param {number} videoNumber The index of the video within the playlist
 * @param {string} channelTitle The title of the channel owning the playlist
 * @returns {string}
 */
function getVideoHtml(video, videoNumber, channelTitle) {
  return html`<div class="playlist-video">
    <div class="playlist-video__number">${videoNumber}</div>

    <div class="playlist-video__content">
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

/**
 * Generates the HTML to render the channel section
 * @param {string} channelThumbnail The url to the channel profile picture
 * @param {string} channelName The channel name
 * @param {string} channelId The channel id
 * @returns {string}
 */
function getChannelHtml(channelThumbnail, channelName, channelId) {
  return html`<div class="playlist__channel-details">
      <div class="playlist__channel-icon">
        <img
          src="${channelThumbnail}"
          alt="Channel icon"
          height="56"
          width="56"
        />
      </div>

      <p class="playlist__channel-name">${channelName}</p>
    </div>
    <div class="playlist__channel-subscribe">
      <a
        href="https://www.youtube.com/channel/${channelId}?sub_confirmation=1"
        target="_blank"
        class="material-button button-filled button-round display-inline-flex color-bg bg-red-medium"
        >Subscribe</a
      >
    </div>`;
}

/**
 * Generates the HTML to render the playlist meta section
 * @param {string} playlistThumbnail The playlist thumbnail
 * @param {string} playlistName The playlist name
 * @param {string} playlistFirstVideo The id of the playlists' first video
 * @param {string} playlistId The playlist id
 * @returns {string}
 */
function getPlaylistHtml(
  playlistThumbnail,
  playlistName,
  playlistFirstVideo,
  playlistId
) {
  return html`<div class="playlist__thumbnail">
      <img
        src="${playlistThumbnail}"
        height="158"
        width="316"
        alt="Thumbnail for ${playlistName}"
        class="rounded-lg"
      />
      <div class="playlist__play-all">
        <a
          href="https://www.youtube.com/watch?v=${playlistFirstVideo}&list=${playlistId}"
          target="_blank"
          class="no-visited"
          >PLAY ALL</a
        >
      </div>
    </div>

    <h2 class="playlist__name type--h3-card gap-top-400">
      <a
        class="color-red-darkest surface display-inline-flex no-visited"
        href="https://www.youtube.com/playlist?list=${playlistId}"
        target="_blank"
      >
        ${playlistName}
      </a>
    </h2>`;
}

/**
 * Generates the HTML to render the outer component including channel info, playlist info and single videos
 * @param {number} videoTotal The total number of videos within the playlist
 * @param {string} playlistUpdated The date of the last update on the playlist
 * @param {string} playlistHtml The HTML displaying the playlist data
 * @param {string} channelHtml The HTML displaying the channel data
 * @param {string} videosHtml The HTML displaying the video items
 * @returns {string}
 */

function getComponentHtml(
  videoTotal,
  playlistUpdated,
  playlistHtml,
  channelHtml,
  videosHtml
) {
  return html`<div class="gap-top-400">
    <div class="playlist hairline rounded-lg width-full">
      <div class="playlist__details rounded-lg">
        <div class="playlist__details-inner rounded-lg">
          ${playlistHtml}

          <p class="playlist__meta gap-top-200">
            ${videoTotal} Videos<br />
            Last updated on ${playlistUpdated}
          </p>

          <div class="playlist__channel">${channelHtml}</div>
          ${videoTotal >= 4 ? '<div class="playlist__decorations"></div>' : ''}
        </div>
      </div>

      <div class="playlist__videos">${videosHtml}</div>
    </div>
  </div>`;
}

async function getPlaylistData(id) {
  let playlistsData = null;
  let playlistResult = [];
  let channelResult = [];

  try {
    playlistsData = require('../../external/data/youtube-playlist.json');
  } catch (e) {
    console.error('YouTube Playlists data file is missing');
    return;
  }
  playlistResult = playlistsData?.playlists.filter(playlist => {
    return playlist.id === id;
  });
  if (playlistResult) {
    channelResult = playlistsData?.channels.filter(channel => {
      return channel.id === playlistResult[0]?.channel;
    });
  }

  return {
    playlist: playlistResult[0],
    channel: channelResult[0],
  };
}

/** Renders a a YouTube playlist widget
 * @param {string} playlistId is a YouTube playlist id
 * @this {any} The eleventy context
 */

async function YouTubePlaylist(playlistId) {
  let videosHtml = '';

  const playlistData = await getPlaylistData(playlistId);

  if (!playlistData) return '';
  const videoTotal = playlistData?.playlist?.videos.length;

  if (!playlistData.playlist) {
    throw new Error('Playlist Id not found');
  }

  const channelId = playlistData?.channel?.id;
  const channelName = playlistData?.channel?.name;
  const channelThumbnail = playlistData?.channel?.thumbnail;
  const playlistFirstVideo = playlistData?.playlist?.videos[0].id;
  const playlistName = playlistData?.playlist?.title;
  const playlistThumbnail = playlistData?.playlist?.thumbnail;
  const playlistUpdated = new Date(
    playlistData?.playlist?.updated
  ).toLocaleDateString(this.ctx.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const videos = playlistData.playlist.videos;
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    videosHtml += getVideoHtml(video, i + 1, channelName);
  }

  const channelHtml = getChannelHtml(channelThumbnail, channelName, channelId);
  const playlistHtml = getPlaylistHtml(
    playlistThumbnail,
    playlistName,
    playlistFirstVideo,
    playlistId
  );
  const result = getComponentHtml(
    videoTotal,
    playlistUpdated,
    playlistHtml,
    channelHtml,
    videosHtml
  );

  return result;
}

module.exports = {YouTubePlaylist};
