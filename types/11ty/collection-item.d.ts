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
  export interface EleventyCollectionItem {
    /**
     * The full path to the source input file (including the path to the input directory)
     */
    inputPath: string;
    /**
     * Mapped from the input file name, useful for permalinks. Read more about [`fileSlug`](https://www.11ty.dev/docs/data-eleventy-supplied/#fileslug).
     */
    fileSlug: string;
    /**
     * The full path to the output file to be written for this content
     */
    outputPath: string;
    /**
     * URL used to link to this piece of content.
     */
    url: string;
    /**
     * The resolved date used for sorting. Read more about [Content Dates](https://www.11ty.dev/docs/dates/).
     */
    date: Date;
    /**
     * All data for this piece of content (includes any data inherited from layouts)
     */
    data: TODO;
    /**
     * The rendered content of this template. This does not include layout wrappers.
     */
    templateContent: unknown;
    /**
     * @UNDOCUMENTED
     */
    template: {
      [key: string]: TODO;
    };
  }
}

// empty export to keep file a module
export {};
