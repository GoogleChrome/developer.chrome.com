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

import {store} from '../store';

export const setFilter = store.action((state, name, entry) => {
  const filters = Object.assign({}, state.filters || {}, {[name]: entry});
  return {filters};
});

export const removeEntry = store.action((state, name, entry) => {
  const entries = state.filters[name];
  state.filters[name] = entries.filter(e => e.value !== entry.value);
  return state;
});

export const clearFilters = store.action(() => {
  return {filters: {}};
});
