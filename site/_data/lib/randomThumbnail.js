/*
 * Copyright 2022 Google LLC
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
 * @file Returns a random thumbnail from a list of uploaded images
 * to use for posts that don't have one.
 */

const THUMBNAILS = [
  'image/lKgJZH2YLpV46uAKAtfp4jfvXhx2/vAFVtpJhUqiCMljeW1v6.png',
  'image/lKgJZH2YLpV46uAKAtfp4jfvXhx2/0F5N3AWuDqrqOQdCljvA.png',
  'image/lKgJZH2YLpV46uAKAtfp4jfvXhx2/GI7uCJjYZ1sKcg94jLxh.png',
  'image/lKgJZH2YLpV46uAKAtfp4jfvXhx2/MbTXdCO0RKvRpBMrAGNU.png',
];

function randomThumbnail() {
  const index = Math.floor(Math.random() * THUMBNAILS.length);
  return THUMBNAILS[index];
}

module.exports = {
  randomThumbnail,
};
