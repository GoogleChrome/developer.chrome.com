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
  export interface TwitterTweet {
    [key: string]: any; // This lets us add additional properties to this object.
    created_at: string;
    id: number;
    id_str: string;
    text?: string;
    full_text?: string;
    source: string;
    truncated: boolean;
    in_reply_to_status_id?: number | null;
    in_reply_to_status_id_str?: string | null;
    in_reply_to_user_id?: number | null;
    in_reply_to_user_id_str?: string | null;
    in_reply_to_screen_name?: string | null;
    user?: TwitterUser | null;
    coordinates?: TwitterCoordinates | null;
    place?: TwitterPlaces | null;
    quoted_status_id?: number;
    quoted_status_id_str?: string;
    is_quote_status: boolean;
    quoted_status?: TwitterTweet;
    retweeted_status?: TwitterTweet;
    quote_count?: number | null;
    reply_count: number;
    retweet_count: number;
    favorite_count: number;
    entities: TwitterEntities;
    extended_entities?: any;
    favorited?: boolean | null;
    retweeted: boolean;
    possibly_sensitive?: boolean | null;
    filter_level: string;
    lang: string;
    matching_rules?: unknown[];
  }
  
  export interface TwitterUser {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location?: string | null;
    derived?: unknown[];
    url?: string | null;
    description?: string | null;
    protected: boolean;
    verified: boolean;
    followers_count: number;
    friends_count: number;
    listed_count: number;
    favourites_count: number;
    statuses_count: number;
    created_at: string;
    profile_banner_url: string;
    profile_image_url_https: string;
    default_profile: boolean;
    default_profile_image: boolean;
    withheld_in_countries?: string[];
    withheld_scope?: string;
  }

  export interface TwitterCoordinates {
    coordinates: [number, number];
    type: 'Point';
  }

  export interface TwitterPlaces {
    id: string;
    url: string;
    place_type: string;
    name: string;
    full_name: string;
    country_code: string;
    country: string;
    bounding_box: {
      coordinates: [number, number][][];
      type: 'Polygon';
    } | TwitterCoordinates;
    attributes?: unknown;
  }

  export interface TwitterSize {
    w: number;
    h: number;
    resize: 'fit' | 'crop';
  }

  export interface TwitterEntities {
    hashtags?: {
      indices: [number, number];
      text: string;
    }[];
    media?: {
      display_url: string;
      expanded_url: string;
      id: number;
      id_str: string;
      indices: [number, number];
      media_url: string;
      media_url_https: string;
      sizes: {
        thumb: TwitterSize;
        large: TwitterSize;
        medium: TwitterSize;
        small: TwitterSize;
      }
      source_status_id?: number | null;
      source_status_id_str?: string | null;
      type: 'photo' | 'video' | 'animated_gif';
      url: string;
    }[];
    urls?: {
      display_url: string;
      expanded_url: string;
      indices: [number, number];
      url: string;
    }[];
    user_mentions?: {
      id: number;
      id_str: string;
      indices: [number, number];
      name: string;
      screen_name: string;
    }[];
    symbols?: {
      indices: [number, number];
      text: string;
    }[];
    polls?: {
      options: unknown[];
      end_datetime: string;
      duration_minutes: string;
    }[];
  }
}

// empty export to keep file a module
export {};
