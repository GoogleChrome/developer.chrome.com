/**
 * @fileoverview Fetches the most recent playlists by specified channels from YouTube
 */

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

// Set an interval of time that makes this data stale and converts it in ms
const FETCH_INTERVAL_HOURS = 4;
const FETCH_INTERVAL_MILLISECONDS = FETCH_INTERVAL_HOURS * 3600000;

// Set all the config constansts needed for the API calls
const API_KEY = process.env.YOUTUBE_API_KEY;
const PART = 'snippet';
const CHANNELS = 'UCnUYZLuoy1rq1aVMwx4aTzw';
const MAX_RESULTS = 50;

//Set the target directory for the JSON file
const targetFile = path.join(__dirname, '../data/youtube-playlist.json');
const currentTimestamp = Date.now();

//Initialise the final result object
const result = {};

//Initialise the Youtube API library
const youtube = google.youtube('v3');

// Main function that starts the data fetching process form the channel name
// specified in the config.

async function run() {
  if (!process.env.YOUTUBE_API_KEY) {
    if (process.env.CI) {
      return; // do nothing, the fallback data will win
    }
    throw new Error('No `API KEY` environment var for production');
  }

  //Set current timestamp
  result.timestamp = currentTimestamp;

  //Starts data fetch for each channel speficied in the config
  result.playlists = [];
  result.channels = [];
  const channelsArray = CHANNELS.split(',');

  for (const channel of channelsArray) {
    try {
      const channelRes = await getChannelData(channel.trim());
      result.channels.push(channelRes);
    } catch (error) {
      throw new Error('Error fetching the channel data');
    }

    try {
      const playlistRes = await getPlaylistData(channel.trim());
      result.playlists = [...result.playlists, ...playlistRes];
    } catch (error) {
      throw new Error('Error fetching the playlist data');
    }
  }

  //Overrides stale data with the data that's just been fetched
  fs.writeFileSync(targetFile, JSON.stringify(result));
}

// Function that accepts a channel id and fetches all the meta data for
// the playlist and then calls the function needed for fetching the
// single videos data

async function getPlaylistData(id) {
  const playlistData = [];
  const response = await youtube.playlists.list({
    part: [PART],
    channelId: id,
    auth: API_KEY,
    maxResults: MAX_RESULTS,
  });

  const playlists = response.data.items;

  if (!playlists || playlists.length === 0) {
    throw new Error('No playlist found');
  } else {
    for (const playlist of playlists) {
      try {
        const videoRes = await getPlaylistItemData(playlist.id);
        playlistData.push({
          id: playlist.id,
          title: playlist?.snippet?.title,
          description: playlist?.snippet?.description,
          thumbnail: playlist?.snippet?.thumbnails?.medium?.url,
          updated: playlist?.snippet?.publishedAt,
          channel: playlist?.snippet?.channelId,
          videos: videoRes,
        });
      } catch (error) {
        throw new Error('Error fetching the playlist data');
      }
    }
  }

  return playlistData;
}

// Function that accepts a video Id and fetches all the video meta data
// the component will need to render correctly the playlist

async function getPlaylistItemData(id) {
  const playlistItemData = [];
  const response = await youtube.playlistItems.list({
    part: [PART],
    playlistId: id,
    auth: API_KEY,
    maxResults: MAX_RESULTS,
  });

  const videos = response.data.items;

  if (!videos || videos.length === 0) {
    throw new Error('No playlist videos found');
  } else {
    for (const video of videos) {
      playlistItemData.push({
        id: video.id,
        title: video?.snippet?.title,
        description: video?.snippet?.description,
        thumbnail: video?.snippet?.thumbnails?.medium?.url,
      });
    }
  }

  return playlistItemData;
}

// Function that accepts a channel username and ignites the data fetching
// cascade. Picks up the Channel data and then calls the function needed for
// Fetching the playlists data

async function getChannelData(id) {
  const channelData = {};
  const response = await youtube.channels.list({
    part: [PART],
    id: id,
    auth: API_KEY,
  });

  const channels = response.data.items;

  if (!channels || channels.length === 0) {
    throw new Error('No channel found');
  } else {
    channelData.id = channels[0]?.id;
    channelData.name = channels[0]?.snippet?.title;
    channelData.description = channels[0]?.snippet?.description;
    channelData.thumbnail = channels[0]?.snippet?.thumbnails?.medium?.url;
  }

  return channelData;
}

// Fetch current data set and checks timestamp to see if the data is stale
let dataAge = 0;
try {
  if (fs.existsSync(targetFile)) {
    const currentDataRaw = fs.readFileSync(targetFile);
    const currentData = JSON.parse(currentDataRaw.toString());

    dataAge = currentTimestamp - currentData.timestamp;
  }
} catch (err) {
  console.error(err);
}

if (dataAge > FETCH_INTERVAL_MILLISECONDS || !dataAge) {
  console.log('HERE');
  run();
}
