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
    deprecated?: number;
    deprecatedComment?: string;
    channel?: "stable" | "beta" | "dev";
    unknown?: true;
  }

  export interface RenderBase {
    name?: string;
    fullName?: string;
    version?: VersionData;
    comment?: string;     // HTML, will always be wrapped by <p></p>
    optional?: boolean;
  }

  export interface RenderType extends RenderBase {
    type: RenderTypeType;
    optional?: boolean;

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
    shortName: string;  // name without "chrome." prefix

    permissions?: string[];
    platforms?: string[];
    source?: string;
    updated?: string;

    // top-levels shown on API page
    types: RenderType[];
    properties: RenderType[];
    methods: RenderType[];
    events: RenderType[];
  }

  export interface RawVersionDataValue {
    low?: number;
    high?: number;
    deprecated?: number;
    release?: "stable" | "beta" | "dev";
  }
}

// empty export to keep file a module
export {};
