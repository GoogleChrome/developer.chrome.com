/*
 * Copyright 2021 Google LLC
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

/**
 * @fileoverview A component for launching a share action.
 */
import {BaseElement} from './base-element';

export class ShareButton extends BaseElement {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onClick);
  }

  onClick(e) {
    // If Web Share API is available, intercept the call.
    if ('share' in window.navigator) {
      e.preventDefault();
      navigator.share({
        text: this.shareText,
        url: this.shareUrl,
      });
    }
  }

  get shareUrl() {
    return window.location.href;
  }

  get shareText() {
    const messageText = this.getAttribute('message');
    return messageText && messageText.length ? messageText : document.title;
  }
}

customElements.define('share-button', ShareButton);
