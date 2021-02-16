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

/**
 * @fileoverview A button that triggers a share action.
 */
import {BaseElement} from './base-element';

export class ShareButton extends BaseElement {
  connectedCallback() {
    super.connectedCallback();
    this.onShare = this.onShare.bind(this);
    this.addEventListener('click', this.onShare);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    /** @type {HTMLElement} */ (this).removeEventListener(
      'click',
      this.onShare
    );
  }

  onShare(e) {
    e.preventDefault();
    if ('share' in window.navigator) {
      navigator.share({
        text: this.shareText,
        url: this.shareUrl,
      });
    } else {
      const url = new URL('https://twitter.com/share');
      url.searchParams.set('url', this.shareUrl);
      url.searchParams.set('text', this.shareText);
      window.open(url.toString(), 'share-twitter', 'width=550,height=235');
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
