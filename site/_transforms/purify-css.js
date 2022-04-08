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

const fs = require('fs');
/* eslint-disable node/no-unpublished-require */
const PurgeCSS = require('purgecss').PurgeCSS;

let mainCSS;
const MAIN_CSS_FILE = 'dist/css/main.css';

/**
 * Inlines all of the page's CSS into the <head>
 */

const purifyCss = async (content, outputPath) => {
  if (
    outputPath &&
    outputPath.endsWith('.html') &&
    !/data-style-override/.test(content)
  ) {
    // Lazily populate the full CSS file string. We don't want to read this
    // earlier as the file might not be written to dist/ yet.
    if (!mainCSS) {
      mainCSS = fs.readFileSync(MAIN_CSS_FILE, {
        encoding: 'utf-8',
      });
    }

    const purged = await new PurgeCSS().purge({
      // Here we take the actual text of the current page and give it to
      // PurgeCss to grep and look for any strings that match the regex listed
      // in the `defaultExtractor`.
      // In addition, we tell it to look at all of our js files.
      // Really all it's doing is looking for strings like ".some-class" and if
      // it appears in either the js bundle or the page html, it preserves that
      // class in the CSS. All other classes/selectors/etc will get purged.
      // The Tailwind docs have a nice explainer:
      // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
      content: [
        {
          raw: content,
          extension: 'html',
        },
        './site/_js/**/*.js',
      ],
      css: [
        {
          raw: mainCSS,
        },
      ],
      fontFace: true,
      defaultExtractor: content => {
        return content.match(/[A-Za-z0-9\\:_-]+/g) || [];
      },
    });

    // The CSS in the <style> tag will be optimized during HTML minification.
    content = content.replace(
      '</head>',
      `<style>${purged[0].css}</style></head>`
    );
  }

  return content;
};

module.exports = {purifyCss};
