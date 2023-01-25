const fetch = require('node-fetch/lib/index');
const apiKey = 'AIzaSyAzOX6K8IXsxPwQ0rgW7QgJPndroPOiWfc';
const maxResults = 50;
const part = 'snippet';

/** Renders a a YouTube playlist widget
 * @param {string} playlistId is a YouTube playlist id
 */
async function Playlist(playlistId) {
  let videoNumber = 1;
  let videoTotal = 0;

  // Set some empty variables to populate
  let channelId = '';
  let channelName = '';
  let channelThumb = '';
  let playlistName = '';
  let playlistFirstVideo = '';
  let playlistThumb = '';
  let playlistUpdated = '';
  let playlistHtml = '';

  /*
    Playlist Information
  */
  await fetch(
    'https://youtube.googleapis.com/youtube/v3/playlists?part=' +
      part +
      '&id=' +
      playlistId +
      '&key=' +
      apiKey
  )
    .then(res => res.json())
    .then(playlistResult => {
      if (playlistResult.items.length > 0) {
        channelId = playlistResult.items[0].snippet.channelId;
        playlistName = playlistResult.items[0].snippet.title;
        playlistThumb = playlistResult.items[0].snippet.thumbnails.medium.url;
        playlistUpdated = new Date(
          playlistResult.items[0].snippet.publishedAt
        ).toLocaleDateString('en-us', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } else {
        return false;
      }

      // Next Call: Query Channel Information
      return fetch(
        'https://youtube.googleapis.com/youtube/v3/channels?part=' +
          part +
          '&id=' +
          channelId +
          '&key=' +
          apiKey
      );
    })
    .then(res => res.json())
    .then(channelResult => {
      channelName = channelResult.items[0].snippet.title;
      channelThumb = channelResult.items[0].snippet.thumbnails.medium.url;

      // Next Call: Query Channel Information
      return fetch(
        'https://youtube.googleapis.com/youtube/v3/playlistItems?part=' +
          part +
          '&playlistId=' +
          playlistId +
          '&maxResults = ' +
          maxResults +
          '&key=' +
          apiKey
      );
    })
    .then(res => res.json())
    .then(videosResult => {
      playlistFirstVideo = videosResult.items[0].snippet.resourceId.videoId;
      videosResult.items.forEach(video => {
        playlistHtml =
          playlistHtml +
          `<div class="playlist-video">
            <div class="playlist-video__number">${videoNumber}</div>


            <div class="playlist-video--content">
              <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank">
              <div class="playlist-video__thumbnail">
                <img src="${video.snippet.thumbnails.medium.url}" height="114" width="204" alt="Thumbnail" class="rounded-lg">
              </div>
              </a>

              <div class="playlist-video__details">
              <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" class="no-visited" target="_blank">
                <h4 class="playlist-video__title">${video.snippet.title}</h4>
                </a>
                <p>${video.snippet.channelTitle}</p>
              </div>
            </div>
          </div>`;

        videoNumber++;
        videoTotal++;
      });
    })
    .catch(error => {
      console.error(error);
    });

  return `<div class="gap-top-400">
    <div class="playlist hairline rounded-lg width-full">

      <div class="playlist-details rounded-lg">
      <div class="playlist-details-inner rounded-lg">
        <div class="playlist-thumbnail">
          <img src="${playlistThumb}" height="158" width="316" alt="Thumbnail for ${playlistName}" class="rounded-lg">
          <div class="playlist-play-all">
            <a href='https://www.youtube.com/watch?v=${playlistFirstVideo}&list=${playlistId}' target="_blank" class="no-visited">PLAY ALL</a>
          </div>
        </div>

        <h2 class="type--h3-card gap-top-400">
          <a class="color-red-darkest surface display-inline-flex no-visited" href="https://www.youtube.com/playlist?list=${playlistId}"  target="_blank">
            ${playlistName}
          </a>
        </h2>

        <p class="playlist-meta gap-top-200 gap-bottom-300">
        ${videoTotal} Videos<br>
        Last updated on ${playlistUpdated}
        </p>

        <div class="playlist-channel">
          <div class="playlist-channel__icon">
            <img src="${channelThumb}" alt="Channel icon" height="56" width="56">
          </div>

          <p class="playlist-channel__name">${channelName}</p>

          <div class="playlist-channel__subscribe">
            <a href="https://www.youtube.com/channel/${channelId}?sub_confirmation=1" target="_blank" class="material-button button-filled button-round display-inline-flex color-bg bg-red-medium">Subscribe</a>
          </div>
        </div>
        ${
          videoTotal >= 4
            ? `<div class="playlist-decorations">
          <div class="decoration__small rounded-full"></div>
          <div class="decoration__logo rounded-full"><img src="https://wd.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/mnB7qJh1Z1LAoPoqJ9B1.png" alt="YouTube logo decoration" /></div>
          <div class="decoration__large rounded-full"></div>
        </div>`
            : ''
        }
        
      </div>
      </div>

      <div class="playlist-videos">${playlistHtml}</div>

    </div>
  </div>`;
}

module.exports = {Playlist};
