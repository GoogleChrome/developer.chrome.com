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
 * @fileoverview Gets all the comments from a GitHub issue and updates an
 * existing comment coming from a bot or creates a new one.
 */

const {requestGitHubApi} = require('./gitHubApi');

const GITHUB_BOT_NAME = 'chrome-devrel-infra[bot]';

async function updateStickyComment(prNumber, body) {
  const {data: comments} = await requestGitHubApi(
    'GET',
    `issues/${prNumber}/comments`
  );

  const comment = comments.find(comment => {
    return comment.user.login === GITHUB_BOT_NAME;
  });

  if (!comment) {
    await requestGitHubApi('POST', `issues/${prNumber}/comments`, {body});
  } else {
    await requestGitHubApi('PATCH', `issues/comments/${comment.id}`, {body});
  }
}

module.exports = {updateStickyComment};
