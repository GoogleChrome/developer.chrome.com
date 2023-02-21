/**
 * @fileoverview Fetches the most recent playlists by specified channels from YouTube
 */

require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');
const ms = require('ms');
const {google} = require('googleapis');

/**
 * Time interval to determine if the current data set is stale
 */
const FETCH_INTERVAL = ms('4h');

/**
 * Config constants to interact with the YouTube API
 */
const API_KEY = process.env.YOUTUBE_API_KEY;
const PART = 'snippet';
const MAX_RESULTS = 50;

/**
 * Set Google Chrome Developers Youtube channel ID (https://www.youtube.com/@ChromeDevs)
 */
const CHANNELS = 'UCnUYZLuoy1rq1aVMwx4aTzw';

/**
 * Target directory for the fetched data
 */
const targetFile = path.join(__dirname, '../data/youtube-playlist.json');
const currentTimestamp = Date.now();

const result = {};

const youtube = google.youtube('v3');

/**
 * Main function that starts the data fetching process form the channel name
 * specified in the config.
 */

async function run() {
  if (!process.env.YOUTUBE_API_KEY) {
    if (process.env.CI) {
      return;
    }
    throw new Error('No `API KEY` environment var for production');
  }

  /**
   * Fetch current data set and checks timestamp to see if the data is stale
   */
  let dataAge = 0;
  try {
    const targetFileExists = await checkIfFileexists(targetFile);
    if (targetFileExists) {
      const currentDataRaw = await fs.readFile(targetFile);
      const currentData = JSON.parse(currentDataRaw.toString());

      dataAge = currentTimestamp - currentData.timestamp;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching the current data');
  }
  if (dataAge > FETCH_INTERVAL || !dataAge) {
    result.timestamp = currentTimestamp;

    result.playlists = [];
    result.channels = [];
    const channelsArray = CHANNELS.split(',');

    for (const channel of channelsArray) {
      try {
        const channelRes = await getChannelData([channel.trim()]);
        result.channels.push(channelRes);
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching the channel data');
      }

      try {
        const playlistRes = await getPlaylistData(channel.trim());
        result.playlists = [...result.playlists, ...playlistRes];
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching the playlist data');
      }
    }

    await fs.writeFile(targetFile, JSON.stringify(result));
  }
}

/**
 * Function that accepts a channel id and fetches all the meta data for
 * the playlist and then calls the function needed for fetching the
 * single videos data
 * @param {string} id The YouTube playlist id
 * @return {promise} A promise that resolves in the YouTube playlist data
 * neeeded to display the playlist component
 */

async function getPlaylistData(id) {
  const playlistData = [];
  const response = await youtube?.playlists?.list({
    part: [PART],
    channelId: id,
    auth: API_KEY,
    maxResults: MAX_RESULTS,
  });

  const playlists = response?.data?.items;

  if (!playlists || playlists.length === 0) {
    throw new Error('No playlist found');
  } else {
    for (const playlist of playlists) {
      if (playlist.id) {
        try {
          const videoRes = await getPlaylistItemData(playlist?.id);
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
          console.error(error);
          throw new Error('Error fetching the playlist data');
        }
      }
    }
  }

  return playlistData;
}

/**
 * Function that accepts a video Id and fetches all the video meta data
 * the component will need to render correctly the playlist.
 * @param {string} id The YouTube playlist id
 * @return {promise} A promise that resolves in the YouTube videos data
 * needed to display the playlist component
 */

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

/**
 * Function that accepts a channel username and ignites the data fetching
 * cascade. Picks up the Channel data and then calls the function needed for
 * fetching the playlists data.
 * @param {array} id The YouTube channel id
 * @return {promise} A promise that resolves in the YouTube Channel data needed
 * to display the playlist component
 */

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

/**
 * Function that accepts a file path and checks if the file exists
 * @param {string} path A string with a path pointing to the file to check
 * @returns {promise} A promise that resolves in a boolean indicating if the file exists
 * or not
 */
async function checkIfFileexists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

run();
