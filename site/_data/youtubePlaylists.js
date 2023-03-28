const fs = require('fs');
const path = require('path');

/**
 * Filters the channels data to retrieve the spefic channel info for each playlist
 * @param {string} channelId The channel id of the playlist
 * @param {object} channels The channels data from the external data flow
 * @returns {object}
 */
function getChannelData(channelId, channels) {
  return channels.filter(channel => channel.id === channelId)[0];
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

module.exports = async () => {
  const playlistsFile = path.join(
    __dirname,
    '../../external/data/youtube-playlist.json'
  );
  const data = JSON.parse(fs.readFileSync(playlistsFile, 'utf-8'));

  data.playlists.forEach(playlist => {
    playlist.updated = formatDate(playlist.updated);
    playlist.channel = getChannelData(playlist.channel, data.channels);
  });

  return data.playlists;
};
