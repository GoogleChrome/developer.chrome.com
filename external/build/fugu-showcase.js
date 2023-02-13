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
 * @fileoverview Fetches the most recent Fugu Showcase data from
 * https://googlechromelabs.github.io/fugu-showcase/
 */

require('dotenv').config();

const {default: fetch} = require('node-fetch');
const fs = require('fs');
const path = require('path');

const url = 'https://googlechromelabs.github.io/fugu-showcase/data/data.json';

async function getContentLength(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
    });
    const contentLength = response.headers.get('Content-Length');
    return contentLength;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

async function toRSS(jsonData) {
  let rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Project Fugu API Showcase</title>
      <description>The Project Fugu API Showcase is a collection of apps that make use of APIs that were conceived in the context of Project Fugu.</description>
      <link>https://developer.chrome.com/fugu-showcase/feed.xml</link>
      <atom:link href="https://developer.chrome.com/fugu-showcase/feed.xml" rel="self" type="application/rss+xml" />`;

  jsonData.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const promises = jsonData.map(
    item =>
      new Promise(async resolve => {
        const contentLength = await getContentLength(
          `https://googlechromelabs.github.io/fugu-showcase/data/${item.screenshot}`
        );
        const id = item.screenshot.replace('.webp', '');
        resolve(`
      <item>
        <title>${escapeXml(item.title)}</title>
        <description>${escapeXml(item.description)}</description>
        <pubDate>${new Date(item.timestamp).toUTCString()}</pubDate>
        <link>https://developer.chrome.com/fugu-showcase/#${id}</link>
        <enclosure url="https://googlechromelabs.github.io/fugu-showcase/data/${
          item.screenshot
        }" length="${contentLength}" type="image/webp" />
        <guid>https://developer.chrome.com/fugu-showcase/#${id}</guid>
      </item>`);
      })
  );

  const rssItems = await Promise.all(promises);

  rss += rssItems.join('');
  rss += `
    </channel>
  </rss>`;

  return rss;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
    }
  });
}

async function run() {
  const r = await fetch(url);

  if (!r.ok) {
    throw new Error(`Could not fetch Fugu Showcase data, status: ${r.status}`);
  }

  const json = await r.json();

  if (json['errors']) {
    const error = json['errors'][0];
    throw new Error(`${error.code}: ${error.message}`);
  }

  const targetFile = path.join(__dirname, '../data/fugu-showcase.json');
  fs.writeFileSync(targetFile, JSON.stringify(json));

  const rss = await toRSS(json);
  const targetRssFile = path.join(
    __dirname,
    '../../site/en/fugu-showcase/feed.xml'
  );
  fs.writeFileSync(targetRssFile, rss);
}

run();
