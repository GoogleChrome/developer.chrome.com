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

// Utilities
import './store.js';
import './analytics.js';
import './a11y.js';

// Web Components
// These are components that appear on _every_ page.
import './web-components/search-box';
import './web-components/side-nav';
import './web-components/top-nav';
import './web-components/share-button';
import './web-components/web-tabs';
import './web-components/language-select';
import './third-party/announcement-banner/announcement-banner';

// This is only used on content pages.
import './web-components/toc-active';

// This component is only used on the tags page, but we don't split load yet.
import './web-components/select-loader';

import 'webdev-infra/web-components/YouTube';

import './web-components/filter-modal';
import './web-components/filtered-element';
import './web-components/checkbox-group';
import './web-components/enhanced-select';
import './web-components/tag-pill-list';
