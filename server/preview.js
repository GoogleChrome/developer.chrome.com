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

const Eleventy = require("@11ty/eleventy");
const fs = require('fs');
const path = require('path');

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getTranslatedLangDirs = () => {
  return getDirectories(path.join(__dirname, '..', 'site'))
    .filter(dirName => {
      return !dirName.startsWith('_') && dirName !== 'en';
    })
    .map(dir => path.join('site', dir, '**', '*'))
}

// TODO: Use fastglob instead of a heuristic here.
const getDirsWithException = (baseDir, exception) => {
  return getDirectories(path.join(__dirname, '..', 'site', baseDir))
    .filter(dirName => {
      return !dirName.startsWith('_') && dirName !== exception;
    })
    .map(dir => path.join('site', baseDir, dir, '**', '*'))
}


/**
 * @type {express.RequestHandler}
 */
const previewHandler = async (req, res, next) => {
  const eleventyIgnorePatterns = [
    ...getTranslatedLangDirs(),
    ...getDirsWithException('en', 'sanity'),
  ];

  let elev = new Eleventy('./site', 'dist', {
    configPath: ".eleventy.js",
    config: function(eleventyConfig) {
      eleventyIgnorePatterns.forEach(entry => {
        eleventyConfig.ignores.add(entry);
      })
    },
  });
  await elev.write();

  res.redirect(`/sanity/${req.params.sanity_slug}`);
};

module.exports = {previewHandler};
