const fs = require('fs').promises;
const path = require('path');
const YOUTUBE_BASE_URL = 'https://www.youtube.com/';

/**
 * Pulls a list of playlists
 *
 * @return {promise} A promise that resolves in an array containing all the playlists
 */
async function getPlaylistData() {
  let playlists;
  const playlistsFile = path.join(
    __dirname,
    '../../external/data/youtube-playlist.json'
  );
  try {
    playlists = JSON.parse(await fs.readFile(playlistsFile, 'utf-8'));
  } catch (error) {
    console.error('Error while reading the playlist data', error);
  }
  return playlists;
}

/**
 * Filters the channels data to retrieve the spefic channel info for each playlist
 * @param {string} channelId The channel id of the playlist
 * @param {object} channels The channels data from the external data flow
 * @returns {object}
 */
function getChannelData(channelId, channels) {
  const channel = channels.filter(channel => channel.id === channelId)[0];
  channel.subscribe = `${YOUTUBE_BASE_URL}/channel/${channel.id}?sub_confirmation=1`;
  return channel;
}

/**
 * Formats the date of the last update for each playlist
 * @param {string} date The date of the last update in ISO 8601 format
 * @returns {string}
 */
function formatDate(date) {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Builds the video url and adds it to each video object
 * @param {object[]} videos
 * @param {string} playlistId
 * @returns {object[]}
 */
function formatVideos(videos, playlistId) {
  videos.forEach(video => {
    video.url = `${YOUTUBE_BASE_URL}watch?v=${video.id}&list=${playlistId}`;
  });
  return videos;
}

/**
 * Builds the playlist url
 * @param {string} playlistId
 * @returns {string}
 */
function getPlaylistUrl(playlistId) {
  return `${YOUTUBE_BASE_URL}playlist?list=${playlistId}`;
}

/**
 * Builds the url for the "Play All" button
 * @param {string} playlistId
 * @param {string} firstVideoUrl
 * @returns {string}
 */
function getPlayAllUrl(playlistId, firstVideoUrl) {
  return `${YOUTUBE_BASE_URL}watch?v=${firstVideoUrl}&list=${playlistId}`;
}

module.exports = async () => {
  const data = await getPlaylistData();
  const playlists = {};
  data.playlists.forEach(playlist => {
    playlist.url = getPlaylistUrl(playlist.id);
    playlist.playAll = getPlayAllUrl(playlist.id, playlist.videos[0].id);
    playlist.updated = formatDate(playlist.updated);
    playlist.channel = getChannelData(playlist.channel, data.channels);
    playlist.videos = formatVideos(playlist.videos, playlist.id);
    playlists[playlist.id] = playlist;
  });

  return playlists;
};
