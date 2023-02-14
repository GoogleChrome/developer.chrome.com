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
    // @ts-ignore
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const promises = jsonData.map(item => {
    const id = item.screenshot.replace('.webp', '');
    return getContentLength(
      `https://googlechromelabs.github.io/fugu-showcase/data/${item.screenshot}`
    ).then(
      contentLength =>
        `
      <item>
        <title>${item.appURL} — ${escapeXml(item.title)}</title>
        <description><![CDATA[
          ${item.description ? `<p>${escapeXml(item.description)}</p>` : ''}
          ${item.isElectronApp ? '<p>(This is an Electron.js app.)</p>' : ''}
          <p>
            ${
              contentLength
                ? `<img style="max-width: 100%; height: auto;" src="https://googlechromelabs.github.io/fugu-showcase/data/${item.screenshot}" alt="The app at ${item.appURL}."/>`
                : '<img style="width: 200px; height: 150px;" src="data:image/svg+xml;base64,CjxzdmcKICB2aWV3Qm94PSIwIDAgNDAwIDIyNSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgc2xpY2UiCj4KICA8cGF0aCBmaWxsPSJyZ2JhKDE0NSwxNDUsMTQ1LDAuNSkiIGQ9Ik0wIDBoNDAwdjIyNUgweiIgLz4KICA8dGV4dAogICAgZmlsbD0icmdiYSgwLDAsMCwwLjMzKSIKICAgIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksc2Fucy1zZXJpZiIKICAgIGZvbnQtc2l6ZT0iMXJlbSIKICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiCiAgICB4PSIyMDAiCiAgICB5PSIxMTMiCiAgICBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIKICA+CiAgICBTY3JlZW5zaG90IG5vdCBhdmFpbGFibGUKICA8L3RleHQ+Cjwvc3ZnPg==" alt=""/>'
            }
          </p>
          <p>
            🚀 Try it out and <a href="${item.appURL}">${
          item.isElectronApp ? 'download' : 'launch'
        } the app</a>.
          </p>
          ${
            item.sourceURL
              ? `<p>🧑‍💻 Check out the <a href="${item.sourceURL}">source code</a>.</p>`
              : ''
          }
          <p><strong>Used APIs:</strong></p>
          <ul>
            ${item.usedAPIs
              .map(usedAPI => {
                return `<li><a href="${usedAPI.url}"> ${escapeXml(
                  usedAPI.name
                )}</a></li>`;
              })
              .join('\n')}
          </ul>
        ]]></description>
        <enclosure url="https://googlechromelabs.github.io/fugu-showcase/data/${
          item.screenshot
        }" length="${contentLength}" type="image/webp" />
        <pubDate>${new Date(item.timestamp).toUTCString()}</pubDate>
        <link>https://developer.chrome.com/fugu-showcase/#${id}</link>
        <guid>https://developer.chrome.com/fugu-showcase/#${id}</guid>
      </item>`
    );
  });

  const rssItems = await Promise.all(promises);

  rss += rssItems.join('');
  rss += `
    </channel>
  </rss>`;

  return rss.replace(/^\s*$\n/gm, '');
}

function escapeXml(unsafe) {
  // @ts-ignore
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
    return '';
  });
}

async function run() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Could not fetch Fugu Showcase data. Status code: ${response.status}`
    );
  }

  const json = await response.json();

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
