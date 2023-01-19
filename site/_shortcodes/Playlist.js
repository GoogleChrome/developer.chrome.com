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
  const playlistViews = 0;

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
              <a href="https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}" target="_blank">
                <h4 class="playlist-video__title">${video.snippet.title}</h4>
                </a>
                <p>${video.snippet.channelTitle}</p>
              </div>

              <div class="playlist-video__action">
               <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6004 10.4C21.6004 9.73333 21.8337 9.16667 22.3004 8.7C22.7671 8.23333 23.3337 8 24.0004 8C24.6671 8 25.2337 8.23333 25.7004 8.7C26.1671 9.16667 26.4004 9.73333 26.4004 10.4C26.4004 11.0667 26.1671 11.6333 25.7004 12.1C25.2337 12.5667 24.6671 12.8 24.0004 12.8C23.3337 12.8 22.7671 12.5667 22.3004 12.1C21.8337 11.6333 21.6004 11.0667 21.6004 10.4ZM21.6004 24C21.6004 23.3333 21.8337 22.7667 22.3004 22.3C22.7671 21.8333 23.3337 21.6 24.0004 21.6C24.6671 21.6 25.2337 21.8333 25.7004 22.3C26.1671 22.7667 26.4004 23.3333 26.4004 24C26.4004 24.6667 26.1671 25.2333 25.7004 25.7C25.2337 26.1667 24.6671 26.4 24.0004 26.4C23.3337 26.4 22.7671 26.1667 22.3004 25.7C21.8337 25.2333 21.6004 24.6667 21.6004 24ZM21.6004 37.6C21.6004 36.9333 21.8337 36.3667 22.3004 35.9C22.7671 35.4333 23.3337 35.2 24.0004 35.2C24.6671 35.2 25.2337 35.4333 25.7004 35.9C26.1671 36.3667 26.4004 36.9333 26.4004 37.6C26.4004 38.2667 26.1671 38.8333 25.7004 39.3C25.2337 39.7667 24.6671 40 24.0004 40C23.3337 40 22.7671 39.7667 22.3004 39.3C21.8337 38.8333 21.6004 38.2667 21.6004 37.6Z" fill="#3C4043"/>
              </svg>

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
            <a href='https://www.youtube.com/watch?v=${playlistFirstVideo}&list=${playlistId}' target="_blank">PLAY ALL</a>
          </div>
        </div>

        <h2 class="type--h3-card gap-top-400">
          <a class="color-red-darkest surface display-inline-flex" href="https://www.youtube.com/playlist?list=${playlistId}"  target="_blank">
            ${playlistName}
          </a>
        </h2>

        <p class="playlist-meta gap-top-200">
        ${videoTotal} Videos &bull; ${playlistViews} views<br>
        Last updated on ${playlistUpdated}
        </p>

        <div class="playlist-actions gap-top-200 gap-bottom-300">
          <a class="playlist-action__link" href="#" target="_blank">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.25 20V15.75H12V14.25H16.25V10H17.75V14.25H22V15.75H17.75V20H16.25ZM3 15.75V14.25H10.5V15.75H3ZM3 11.625V10.125H14.75V11.625H3ZM3 7.5V6H14.75V7.5H3Z" fill="#3C4043"/>
        </svg>
        </a>

          <a class="playlist-action__link" href="#" target="_blank">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.875 10.8996L3.75 4.79961L4.825 3.72461L10.95 9.82461L9.875 10.8996ZM14.525 20.2496V18.7496H17.65L13.05 14.1746L14.1 13.0996L18.75 17.6996V14.5246H20.25V20.2496H14.525ZM4.8 20.2496L3.75 19.1746L17.7 5.22461H14.525V3.72461H20.25V9.44961H18.75V6.29961L4.8 20.2496Z" fill="#3C4043"/>
        </svg>
        </a>

          <a class="playlist-action__link" href="#" target="_blank">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.97 14.81C13.5 14.31 14.21 14 15 14C16.66 14 18 15.34 18 17C18 18.66 16.66 20 15 20C13.34 20 12 18.66 12 17C12 16.76 12.04 16.53 12.09 16.31L5.04 12.19C4.5 12.69 3.79 13 3 13C1.34 13 0 11.66 0 10C0 8.34 1.34 7 3 7C3.79 7 4.5 7.31 5.04 7.81L12.09 3.7C12.04 3.48 12 3.24 12 3C12 1.34 13.34 0 15 0C16.66 0 18 1.34 18 3C18 4.66 16.66 6 15 6C14.21 6 13.49 5.69 12.96 5.19L5.91 9.3C5.96 9.53 6 9.76 6 10C6 10.24 5.96 10.47 5.91 10.7L12.97 14.81ZM16 3C16 2.45 15.55 2 15 2C14.45 2 14 2.45 14 3C14 3.55 14.45 4 15 4C15.55 4 16 3.55 16 3ZM3 11C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9C3.55 9 4 9.45 4 10C4 10.55 3.55 11 3 11ZM14 17C14 17.55 14.45 18 15 18C15.55 18 16 17.55 16 17C16 16.45 15.55 16 15 16C14.45 16 14 16.45 14 17Z" fill="#5F6368"></path>
        </svg>
        </a>
        </div>

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
          <div class="decoration__logo rounded-full"></div>
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
