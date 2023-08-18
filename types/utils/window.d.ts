/*
 * Copyright 2023 Google LLC
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
  interface Document extends Document {
    wasDiscarded: boolean;
    prerendering: boolean;
  }
  interface Window extends Window {
    dataLayer: Record<string, any>[];
    /**
     * The `gtag` function for Google Analytics.
     *
     * @param {string} command - The command for gtag.
     * @param {string} eventName - The name of the event.
     * @param {Object} [params] - Additional parameters.
     */
    gtag: (command: string, eventName: string, params?: any) => void;
  }
}

// empty export to keep file a module
export {};
