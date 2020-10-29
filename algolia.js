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
require('dotenv').config();
const algoliasearch = require('algoliasearch');
const fs = require('fs');

async function index() {
  if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
    console.warn('Missing Algolia environment variables, skipping indexing.');
    return;
  }

  const raw = fs.readFileSync('dist/algolia.json', 'utf-8');
  const algoliaData = JSON.parse(raw);

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
  const index = client.initIndex('prod_developer_chrome');

  console.log(`Indexing ${algoliaData.length} articles`);

  await index.replaceAllObjects(algoliaData, {
    autoGenerateObjectIDIfNotExist: true,
  });
  console.log('Done!');
}

index().catch(err => {
  console.error(err);
  throw err;
});
