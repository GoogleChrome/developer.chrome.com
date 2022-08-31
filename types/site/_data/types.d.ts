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
    /**
     * Default value of a attribute.
     */
    default?: string;
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
    chromeOsOnly?: true;
  }

  /**
   * This is something referencing another type, so include a {@link _href} where possible.
   */
  export interface ExtendedReferenceType
    extends typedoc.JSONOutput.ReferenceType {
    _href?: string;
  }

  /**
   * Contains extended information about a DeclarationReflection that makes it easy to render by
   * our Nunjucks templates.
   */
  export interface ExtendedReflection
    extends typedoc.JSONOutput.DeclarationReflection {
    _name: string;
    _feature: FeatureInfo;

    _comment?: string;

    /**
     * The name of the folder that contains this item.
     */
    _pageHref: string;

    /**
     * The ID on the page. This will be empty for the namespace itself.
     */
    _pageId?: string;

    /**
     * Set if this is something like a dictionary, interface or class that has named elements.
     */
    _type?: {
      properties: ExtendedReflection[];
    };

    /**
     * Set if this is a method or function.
     */
    _method?: {
      parameters: ExtendedReflection[];
      return?: ExtendedReflection;
      isReturnsAsync?: true;
    };

    /**
     * Set if this is actually a property that inherits from `chrome.Event` or friends. The
     * conditions/actions properties are only set if this is a delcarative event.
     */
    _event?: {
      conditions?: typedoc.JSONOutput.SomeType[];
      actions?: typedoc.JSONOutput.SomeType[];
    };

    /**
     * Set if this had `@chrome-enum` annotations (used to describe different enum options).
     */
    _enums?: TypesEnumPair[];
  }

  export interface TypesEnumPair {
    value: string | number;
    description: string;
  }
}
