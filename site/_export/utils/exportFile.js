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

const path = require('path');
const fse = require('fs-extra');

const BASE_PATH = path.join(__dirname, '../../../dist/_export/');

/**
 * @param {Object} ctx 11ty context object coming from a shortcode
 * @param {any} data The data to be written
 * @param {String|undefined} customFilePath An optional explicit filePath to use
 */
async function exportFile(ctx, data = undefined, customFilePath = undefined) {
  try {
    let filePath = customFilePath;
    if (!filePath) {
      filePath = ctx.exportPath;
      // Assume we are only writing .md files, assets gets a forced customFilePath
      // Always check if a .md file with the same name exists, and if it does,
      // rename it and make it the folders index.md
      if (fse.existsSync(path.join(BASE_PATH, filePath, ctx.articleName))) {
        filePath = `${filePath}/${ctx.articleName}/index.md`;
      } else {
        // Check if there is a {filePath}.md file and move it to {filePath}/index.md
        // if that's the case
        const filePathStub = filePath.replace(/\/$/, '');
        if (fse.existsSync(`${path.join(BASE_PATH, filePathStub)}.md`)) {
          try {
            await fse.move(
              path.join(BASE_PATH, `${filePathStub}.md`),
              path.join(BASE_PATH, `${filePathStub}/index.md`)
            );
          } catch (e) {
            console.info(
              'Could not move',
              `${filePathStub}.md`,
              'to',
              `${filePathStub}/index.md`
            );
          }
        }

        filePath = `${filePath}/${ctx.articleName}.md`;
      }
    }

    filePath = path.join(BASE_PATH, filePath);

    if (!data) {
      console.error('No data to export to', filePath);
    }

    await fse.outputFile(filePath, data);
  } catch (e) {
    console.log('Failed to export file', ctx?.exportPath || customFilePath);
    console.error(e);
  }
}

module.exports = {exportFile};
