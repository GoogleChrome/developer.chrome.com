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

const fse = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');

const TMP_PATH = path.join(__dirname, '../../..', '.tmp', 'files');
const TMP_PATH_IMAGE_MIN = path.join(__dirname, '../../..', '.tmp', 'images');

let limit = null;

async function getFileFromCache(url) {
  const parsedUrl = new URL(url, 'https://web-dev.imgix.net/');
  const src = parsedUrl.pathname;

  if (fse.existsSync(path.join(TMP_PATH, src))) {
    const file = await fse.readFile(path.join(TMP_PATH, src));
    return file;
  }

  return;
}

/**
 * Downloads a file from the web or gets it from the cache
 * at TMP_PATH.
 * @param {String?} url The URL to download
 * @returns
 */
async function getImageFromRemote(url) {
  const parsedUrl = new URL(url, 'https://web-dev.imgix.net/');
  const src = parsedUrl.pathname;

  let file = await fetch(parsedUrl.toString());
  file = await file.buffer();
  if (!file) {
    return;
  }

  await fse.outputFile(path.join(TMP_PATH, src), file);
  console.log('Downloaded', url, 'from remote ...');
  return file;
}

async function getFile(url, forceDownload = false) {
  const file = await getFileFromCache(url);
  if (file && !forceDownload) {
    return file;
  }

  if (!limit) {
    const pLimit = (await import('p-limit')).default;
    limit = pLimit(1);
  }

  return limit(() => getImageFromRemote(url));
}

async function imagemin(buffer) {
  const imagemin = (await import('imagemin')).default;

  const jpegRecompress = (await import('imagemin-jpeg-recompress')).default;
  const pngquant = (await import('imagemin-pngquant')).default;

  try {
    const image = await imagemin.buffer(buffer, {
      plugins: [
        jpegRecompress({
          accurate: true,
          quality: 'high',
        }),
        pngquant({quality: [0.7, 0.8]}),
      ],
    });

    return image;
  } catch(e) {
    // Minifying might fail, for example the output might be larger
    // than the output, if the input has been compressed with
    // better tools. Then just return the original image
    return buffer;
  }
}

async function getImage(url, forceDownload = false) {
  const parsedUrl = new URL(url, 'https://web-dev.imgix.net/');
  const src = parsedUrl.pathname;

  // Check if the file has already been downloaded and optimized,
  // if not, download it and optimize it.
  if (fse.existsSync(path.join(TMP_PATH_IMAGE_MIN, src)) && !forceDownload) {
    return await fse.readFile(path.join(TMP_PATH_IMAGE_MIN, src));
  }

  let file = await getFile(url, forceDownload);
  if (file && !url.endsWith('.svg')) {
    file = await imagemin(file);
    try {
      await fse.outputFile(path.join(TMP_PATH_IMAGE_MIN, src), file);
    } catch(e) {
      console.error('Failed to write image after minification', src);
    }
    return file;
  }

  return file;
}

module.exports = {getImageFromRemote: getFile, getImage};