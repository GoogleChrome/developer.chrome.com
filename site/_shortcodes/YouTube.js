/*
 * Copyright 2020 Google LLC
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

const {html} = require('common-tags');

/**
 * A YouTube video embed.
 * @param {{id: string, startTime?: string}} args
 * @return {string}
 */
const YouTube = args => {
  const {id, startTime} = args;

  if (!id) {
    throw new Error('No `id` provided to YouTube shortcode.');
  }

  let src = `https://www.youtube.com/embed/${id}`;
  if (startTime) {
    src += `?start=${startTime}`;
  }

  return html`
    <div class="youtube">
      <iframe
        class="youtube__embed"
        src="${src}"
        title="youtube embed"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  `;
};

module.exports = {YouTube};
