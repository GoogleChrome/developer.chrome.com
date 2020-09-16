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
const minify = require('html-minifier').minify;
/* eslint-disable node/no-unpublished-require */
const PurgeCSS = require('purgecss').PurgeCSS;
const csso = require('csso');
const pathToCss = 'dist/css/main.css';

/**
 * Inlines the CSS.
 * Optimizes HTML
 */

const purifyCss = async (rawContent, outputPath) => {
  let content = rawContent;
  if (
    !outputPath ||
    !outputPath.endsWith('.html') ||
    /data-style-override/.test(content)
  ) {
    return;
  }
  const before = fs.readFileSync(pathToCss, {
    encoding: 'utf-8',
  });

  const purged = await new PurgeCSS().purge({
    content: [
      {
        raw: rawContent,
        extension: 'html',
      },
    ],
    css: [
      {
        raw: before,
      },
    ],
    fontFace: true,
    variables: true,
  });

  const after = csso.minify(purged[0].css).css;
  // console.log('CSS reduction', before.length - after.length);

  if (after.length) {
    content = content.replace('</head>', `<style>${after}</style></head>`);
  }

  return content;
};

const minifyHtml = (rawContent, outputPath) => {
  let content = rawContent;
  if (outputPath && outputPath.endsWith('.html')) {
    try {
      content = minify(content, {
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        sortClassName: true,
        sortAttributes: true,
        html5: true,
        decodeEntities: true,
      });
      return content;
    } catch (err) {
      console.log('Could not minify:', outputPath);
      return rawContent;
    }
  }
};

module.exports = {
  initArguments: {},
  configFunction: async eleventyConfig => {
    eleventyConfig.addTransform('purifyCss', purifyCss);
    eleventyConfig.addTransform('minifyHtml', minifyHtml);
  },
};
