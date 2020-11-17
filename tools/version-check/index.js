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

/**
 * @fileoverview Warns if a user's Node version is not v14 or later.
 */

const requiredMajorVersion = 14;

const versionMatch = /^v(\d+)\./.exec(process.version);
if (!versionMatch || +versionMatch[1] < requiredMajorVersion) {
  throw new Error(
    `Please install Node >=v${requiredMajorVersion}, found ${process.version}`
  );
}
