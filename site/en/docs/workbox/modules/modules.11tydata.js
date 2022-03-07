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

/**
 * @fileoverview Exists while Workbox is being ported across. Don't index pages on Algolia.
 */

/**
 * @return {EleventyData}
 */
module.exports = {
  // This is the default hero image for all Workbox pages.
  hero: 'image/QMjXarRXcMarxQddwrEdPvHVM242/ZUBXF0hK0jo9q4RvELUs.png',
  eleventyComputed: {
    reference: data =>
      data.workboxApiModules[data.title]
        ? `/docs/workbox/reference/${data.title}/`
        : null,
  },
};
