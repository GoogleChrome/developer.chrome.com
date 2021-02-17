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

const terser = require('terser');

/** @type {Map<string, string>} */
const cache = new Map();

/**
 * This minifies all inline JS before inclusion into the page.
 *
 * @param {cheerio.Selector} $ A cheerio representation of the page. This object will be
 * modified in place.
 */
const processInlineJs = async $ => {
  const $scripts = $('script');

  /** @type {Promise<void>[]} */
  const work = [];

  /**
   * @param {cheerio.Cheerio} $script
   */
  const process = async $script => {
    const content = $script.html() ?? '';
    if (!content) {
      throw new Error('got bad script tag, no contents');
    }
    const prev = cache.get(content);
    if (prev !== undefined) {
      $script.html(prev);
      return;
    }

    const out = await terser.minify(content, {output: {comments: false}});
    const code = out.code ?? '';
    $script.html(code);
    cache.set(content, code);
  };

  $scripts.each(async (_, elem) => {
    const $script = $(elem);

    // TODO(samthor): We could introduce a nonce here that is easy to replace later.
    if ($script.attr('src')) {
      return;
    }

    work.push(process($script));
  });

  await Promise.all(work);
};

module.exports = {processInlineJs};
