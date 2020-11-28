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

import createStore from 'unistore';
import devtools from 'unistore/devtools';

// If a url ends in ?debug then this will set the isDebug flag to true.
// When isDebug is true, unistore will load in the Redux DevTools.
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
const params = new URLSearchParams(window.location.search);
const isDebug = params.has('debug');

const initialState = {
  isSideNavExpanded: false,
  isSearchActive: false,
};

let store;
if (isDebug) {
  store = devtools(createStore(initialState));
} else {
  store = createStore(initialState);
}

export {store};
