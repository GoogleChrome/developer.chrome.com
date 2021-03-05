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
  export type RenderTypeType = "?" |
      "primitive" |
      "reference" |
      "array" |
      "type" |
      "object" |
      "union" |
      "function";

  export interface VersionData {
    low?: number;
    high?: number;
    deprecated?: number;
    unknown?: true;
  }

  export interface RenderBase {
    name?: string;
    fullName?: string;
    version?: VersionData;
    comment?: string;            // HTML, will always be wrapped by <p></p>
    deprecatedComment?: string;  // HTML, not a pargraph
    optional?: boolean;
  }

  export interface RenderType extends RenderBase {
    type: RenderTypeType;

    // primitive
    primitiveType?: string;
    literalValue?: string;

    // reference
    referenceType?: string;
    referenceLink?: string;
    referenceTemplates?: RenderType[];

    // array
    elementType?: RenderType;
    minLength?: number;
    maxLength?: number;

    // type/object
    properties?: RenderType[];
    templates?: string[];

    // union
    options?: RenderType[];
    isEnum?: boolean;

    // function
    parameters?: RenderType[];
    returnType?: RenderType;
  }

  export interface RenderNamespace extends RenderBase {
    permissions?: string[];
    platforms?: string[];
    source?: string;

    updated?: string;
    release?: number;

    // top-levels shown on API page
    types: RenderType[];
    properties: RenderType[];
    methods: RenderType[];
    events: RenderType[];

    channel: "stable" | "beta" | "dev";
    minManifestVersion?: number;
    maxManifestVersion?: number;
  }
}

// empty export to keep file a module
export {};
