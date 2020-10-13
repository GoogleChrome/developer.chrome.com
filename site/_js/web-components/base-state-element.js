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

import {store} from '../store';
import {BaseElement} from './base-element';

/**
 * Base element which subscribes to global state.
 *
 * @extends {BaseElement}
 */
export class BaseStateElement extends BaseElement {
  constructor() {
    super();
    this.onStateChanged = this.onStateChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    store.subscribe(this.onStateChanged);
    this.onStateChanged(store.getState());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    store.unsubscribe(this.onStateChanged);
  }

  /**
   * This method will be called whenever unistore state changes,
   * you can overwrite the method to hook into the event and deconstruct the state.
   *
   * @param {!Object<string, *>} state
   */

  // @ts-ignore-start
  onStateChanged(state) {} // eslint-disable-line no-unused-vars
  // @ts-ignore-end
}
