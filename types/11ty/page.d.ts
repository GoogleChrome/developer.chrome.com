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

declare global {
  export interface EleventyPage {
    /**
     * JS Date Object for current page (used to sort collections)
     */
    date: Date;
    /**
     * The path to the original source file for the template
     * Note: this will include your input directory path!
     */
    inputPath: string;
    /**
     * For permalinks: inputPath filename minus template file extension (New in v0.3.4)
     */
    fileSlug: string;
    /**
     * For permalinks: inputPath minus template file extension (New in v0.9.0)
     */
    filePathStem: string;
    /**
     * URL can be used in <a href> to link to other templates
     */
    url: string;
    /**
     * Depends on your output directory (the default is _site)
     * You probably won't use this: `url` is better.
     */
    outputPath: string;
  }
}

// empty export to keep file a module
export {};
