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
  export interface EventsCollectionItem {
    summary: string,
    date: string,
    image: string,
    externalUrl: string,
    sessions: EventsSessionCollectionItem[],
    location: string,
    id: string,
    title: string,
    isPastEvent: boolean
  }

  export interface EventSessionCollectionItem {
    title:string,
    description:string,
    type:string,
    topics:string[],
    slidesUrl:string,
    videoUrl:string,
    image?:string,
    speaker?:EventPersonCollectionItem,
    participants?:EventPersonCollectionItem[]
  }

  export interface EventPersonCollectionItem {
    image: string,
    twitter: string|undefined,
    linkedin: string|undefined,
    title: string,
    handle: string
  }
}

// empty export to keep file a module
export {};
