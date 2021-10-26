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

import * as typedoc from 'typedoc';

declare global {
  export interface RenderGroup {
    title: string;
    prefix: string;
    contents: typedoc.JSONOutput.DeclarationReflection[];
  }

  export interface RenderNamespace {
    shortName: string;
    name: string;
    root: typedoc.JSONOutput.DeclarationReflection;
    groups: RenderGroup[];
  }

  export interface FeatureInfo {
    platformAppsOnly?: true;
    disallowServiceWorkers?: true;
    deprecated?: {
      value: string;
      since?: string;
    };
    minManifest?: string;
    maxManifest?: string;
    since?: string;
    channel: string;
    permissions?: string[];
    manifestKeys?: string[];
  }

  export interface ExtendedReferenceType extends typedoc.JSONOutput.ReferenceType {
    _href?: string;
  }

  export interface ExtendedReflection extends typedoc.JSONOutput.DeclarationReflection {
    _name: string;
    _feature: FeatureInfo;

    _comment?: string;

    _pageHref: string;
    _pageId?: string;

    _type?: {
      properties: typedoc.JSONOutput.DeclarationReflection[];
    };

    _method?: {
      parameters: typedoc.JSONOutput.ParameterReflection[];
    };

    // TODO: declarative stuff
    _event?: {
      conditions?: typedoc.JSONOutput.SomeType[];
      actions?: typedoc.JSONOutput.SomeType[];
    };
  }
}