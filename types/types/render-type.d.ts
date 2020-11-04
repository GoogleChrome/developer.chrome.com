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
  export interface RenderType {
    name: string;
    type: string;
    optional?: boolean;
    comment?: string;

    // interface, object etc
    properties?: RenderType[];

    // enum
    options?: string[];

    // function
    parameters?: RenderType[];
    returnType?: RenderType;
  }

  export interface RenderNamespace {
    name: string;
    shortName: string;  // name without "chrome." prefix
    permalink: string;  // used for URLs
    comment?: string;

    updated?: string;
    release?: number;

    // top-levels shown on API page
    methods: RenderType[];
    types: RenderType[];
  }
}

// empty export to keep file a module
export {};
