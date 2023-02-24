const fs = require('fs').promises;
const path = require('path');

module.exports = async id => {
  const playlistFile = path.join(
    __dirname,
    '../../external/data/youtube-playlist.json'
  );
  const playlists = JSON.parse(await fs.readFile(playlistFile, 'utf-8'));

  let playlistResult = [];
  let channelResult = [];

  playlistResult = playlists?.playlists.filter(playlist => {
    return playlist.id === id;
  });
  if (playlistResult) {
    channelResult = playlists?.channels.filter(channel => {
      return channel.id === playlistResult[0]?.channel;
    });
  }

  return {
    playlist: playlistResult[0],
    channel: channelResult[0],
  };
};
