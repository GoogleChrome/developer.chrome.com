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
  export interface EleventyPagination<T = EleventyCollectionItem> {
    /**
     * Array of current page's chunk of data
     */
    items?: T[];
    /**
     * Current page number, 0 indexed
     */
    pageNumber?: number;
    /**
     * Array of all page hrefs (in order)
     */
    hrefs?: string[];
    href?: {
      /**
       * Put inside <a href="">Next Page</a>
       */
      next: string | null;
      /**
       * Put inside <a href="">Previous Page</a>
       */
      previous: string | null;
      first: string;
      last: string;
    };
    /**
     * Array of all chunks of paginated data (in order)
     */
    pages?: T[][];
    page?: {
      /**
       * Next page's chunk of data
       */
      next: T[];
      /**
       * Previous page's chunk of data
       */
      previous: T[];
      first: T[];
      last: T[];
    };
    /**
     * The original string key to the dataset
     */
    data?: string;
    /**
     * Page chunk sizes
     */
    size?: number;
    before?: (data: TODO[]) => TODO;
  }
}

// empty export to keep file a module
export {};
