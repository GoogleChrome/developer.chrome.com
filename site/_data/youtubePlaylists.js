const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const playlistFile = path.join(
    __dirname,
    '../../external/data/youtube-playlists.json'
  );
  let playlists = JSON.parse(fs.readFileSync(playlistFile, 'utf-8'));

  return playlists;
};
