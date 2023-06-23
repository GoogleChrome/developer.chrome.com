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
   * Represents the fields in the FrontMatter of posts' Markdown files.
   */
  export interface FrontMatterData {
    title: string;
    layout?: string;
    description?: string;
    subhead?: string;
    /**
     * Date is technically optional for frontmatter, but any frontmatter without a date is filtered out and not used.
     * It's easier to just assume it's not an optional property.
     */
    date: Date;
    updated?: Date;
    authors?: string[];
    tags?: string[];
    hero?: string;
    alt?: string;
    origin_trial?: {
      url: string;
    };
    permalink?: string;
    type?: PostTypes;
    i18n?: {
      [key: string]: TODO;
    };
    draft?: boolean;
    api?: string;
    extra_permissions?: string[];
    extra_permissions_html?: string;
    special_permissions_html?: string;
    has_warning?: string;
    // The following properties are added dynamically
    locale: string;
    url: string;
    [key: string]: any;
  }
}

// empty export to keep file a module
export {};
