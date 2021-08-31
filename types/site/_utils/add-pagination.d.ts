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
  /**
   * This is the single item that ends up being rendered for e.g. an individual tag page.
   */
  export interface PaginatedPage<T = EleventyCollectionItem, X = {}> {

    /**
     * The date for the very first entry that was used to create all the pages
     * paginated for this entry/tag/author/etc.
     */
    date: Date,

    /**
     * The user-visible URL for this page, e.g. "/en/blah/".
     */
    href: string,

    /**
     * The on-disk target for this page, e.g., "/en/blah/index.html".
     */
    permalink: string,

    /**
     * This mirrors the actual EleventyPagination type, but is "made up" for multidimensional
     * pagination, e.g., tags, that themselves have a number of inner items. It's not called
     * "pagination" so we avoid confusion: it's _NOT_ the same object, it's nested.
     *
     * TODO: We only use items, and the next/previous href here. The rest just mirrors 11ty's
     * real object just in case we try to use it that way.
     */
    contents: {
      items: T[],
      pageNumber: number,
      hrefs: string[],
      href: {
        next: string?,
        previous: string?,
        first: string,
        last: string,
      },
    },

    /**
     * Extra data from the additional type.
     *
     * TODO(samthor): There's no reason this needs to be directly _on_ the PaginatedPage itself.
     * It could literally be a property.
     */
    [other: keyof X]: X[other];
  }
}

// empty export to keep file a module
export {};
