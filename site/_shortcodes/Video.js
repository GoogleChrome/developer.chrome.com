/*
 * Copyright 2021 Google LLC
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
const {Video: BuildVideoShortcode} = require('webdev-infra/shortcodes/Video');

const {bucket, imgixDomain} = require('../_data/site.json');

const Video = BuildVideoShortcode(bucket, imgixDomain);

/**
 * @param {import('webdev-infra/types').VideoArgs} args Named arguments
 * @returns {string}
 */
function VideoAlt(args) {
  let html = Video.call(this, args);
  if (this.ctx.export) {
    // Replace double spaces in html with single spaces, as otherwise
    // it looks weird in generated markdown
    html = html.replace(/\s\s+/g, ' ');
  }

  return html;
}

module.exports = {Video: VideoAlt};
