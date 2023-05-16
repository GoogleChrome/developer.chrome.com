/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Fetches the most recent playlists by specified channels from YouTube
 */

require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');
const ms = require('ms');
const youtube = require('googleapis').google.youtube('v3');
const {Storage} = require('@google-cloud/storage');

/**
 * Time interval to determine if the current data set is stale
 */
const FETCH_INTERVAL = ms('4h');

/**
 * Config constants to interact with the YouTube API
 */
const API_KEY = process.env.YOUTUBE_API_KEY;
const PART = ['snippet'];
const MAX_RESULTS = 50;

/**
 * Set Google Chrome Developers Youtube channel ID (https://www.youtube.com/@ChromeDevs)
 */
const CHANNELS = ['UCnUYZLuoy1rq1aVMwx4aTzw'];

/**
 * Target directory for the fetched data
 */
const targetFile = path.join(__dirname, '../data/youtube-playlist.json');
const currentTimestamp = Date.now();

const result = {};

/**
 * Fetches all the meta data for the playlist and then calls the function
 * needed for fetching the single videos data
 * @param {string} channelId The YouTube channel id
 * @return {promise} A promise that resolves in the YouTube playlist data
 * neeeded to display the playlist component
 */
async function getPlaylistData(channelId) {
  const data = [];
  const response = await youtube?.playlists?.list({
    part: PART,
    channelId: channelId,
    auth: API_KEY,
    maxResults: MAX_RESULTS,
  });

  const playlists = response?.data?.items;

  if (!playlists || playlists.length === 0) {
    console.warn('No playlist found');
    return data;
  }

  await Promise.all(
    playlists.map(async playlist => {
      if (playlist.id) {
        try {
          const videoRes = await getPlaylistItemData(playlist?.id);
          data.push({
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
    })
  );

  return data;
}

/**
 * Fetches all the video meta data the component will need to render correctly the playlist.
 * @param {string} id The YouTube playlist id
 * @return {promise} A promise that resolves in the YouTube videos data
 * needed to display the playlist component
 */
async function getPlaylistItemData(id) {
  const data = [];
  const response = await youtube.playlistItems.list({
    part: PART,
    playlistId: id,
    auth: API_KEY,
    maxResults: MAX_RESULTS,
  });

  const videos = response.data.items;

  if (!videos || videos.length === 0) {
    throw new Error('No playlist videos found');
  }
  for (const video of videos) {
    data.push({
      id: video?.snippet?.resourceId?.videoId,
      title: video?.snippet?.title,
      description: video?.snippet?.description,
      thumbnail: video?.snippet?.thumbnails?.medium?.url,
    });
  }

  return data;
}

/**
 * Fetches all the channel meta data the component will need to render correctly the playlist.
 * @param {string[]} id The YouTube channel id
 * @return {promise} A promise that resolves in the YouTube Channel data needed
 * to display the playlist component
 */
async function getChannelData(id) {
  const data = {};
  const response = await youtube.channels.list({
    part: PART,
    id: id,
    auth: API_KEY,
  });

  const channels = response.data.items;

  if (!channels || channels.length === 0) {
    return data;
  }
  data.id = channels[0]?.id;
  data.name = channels[0]?.snippet?.title;
  data.description = channels[0]?.snippet?.description;
  data.thumbnail = channels[0]?.snippet?.thumbnails?.medium?.url;

  return data;
}

/**
 * Checks if the data is stale and needs to be refetched
 *
 * @return {promise} A promise that resolves in a boolean to indicate if the data is stale or not
 */
async function checkDataTimestamp() {
  const storage = new Storage();
  try {
    const [fileMetadata] = await storage
      .bucket('external-dcc-data')
      .file('youtube-playlist.json')
      .getMetadata();

    const fileTimestamp = new Date(fileMetadata.timeCreated).getTime();

    if (currentTimestamp - fileTimestamp > FETCH_INTERVAL) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      'Error reading file or file not found, refetching from YouTube'
    );
    return true;
  }
}

/**
 * Starts the data fetching process form the channel name
 * specified in the config.
 */
async function run() {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error('No `YOUTUBE_API_KEY` environment var for production');
  }

  const isDataStale = await checkDataTimestamp();
  if (!isDataStale) {
    console.log('YouTube data is not stale yet, no need to fetch.');
    return;
  }
  result.timestamp = currentTimestamp;

  result.playlists = [];
  result.channels = [];

  const channelRes = await getChannelData(CHANNELS);
  result.channels.push(channelRes);

  await Promise.all(
    CHANNELS.map(async channel => {
      try {
        const playlistRes = await getPlaylistData(channel.trim());
        result.playlists = [...result.playlists, ...playlistRes];
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching the playlist data');
      }
    })
  );

  await fs.writeFile(targetFile, JSON.stringify(result));
}

run();
