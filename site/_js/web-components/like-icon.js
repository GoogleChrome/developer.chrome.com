/*
 * Copyright 2022 Google LLC
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
 * @fileoverview A component for displaying a "like" icon. Persist the likes
 * to the LocalStorage and to Firebase Datastore.
 */
import {BaseElement} from './base-element';
import {html} from 'lit-element';

/* eslint-disable node/no-missing-import */
// @ts-ignore
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {
  getDatabase,
  connectDatabaseEmulator,
  ref,
  set,
  onValue,
  increment,
  // @ts-ignore
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  // @ts-ignore
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app-check.js';

const config = {
  apiKey: 'AIzaSyCyThSjI_ZUT1NwV9aQLtqklVcNj72gvo8',
  databaseURL: 'https://web-dev-production-1.firebaseio.com',
  projectId: 'web-dev-production-1',
  appId: '1:1051961234704:web:d706ff04eb3dc39d128195',
};
const recaptchaPublicKey = '6LenWycfAAAAAOH50MRMcDLEUGa5UJZbSYCns0u7';
const storagePrefix = 'dcc-like-icon';

const app = initializeApp(config);
const db = getDatabase(app);
if (location.hostname === 'localhost') {
  // Point to the DB emulator running on localhost
  connectDatabaseEmulator(db, 'localhost', 9000);
} else {
  // App check does not work against emulator.
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaPublicKey),
    isTokenAutoRefreshEnabled: true,
  });
}

export class LikeIcon extends BaseElement {
  static get properties() {
    return {
      item: {type: String, reflect: true},
      likes: {type: Number},
      liked: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.item = '';
    this.itemId = '';
    this.onClick = this.onClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.onClick);

    this.itemId = `${storagePrefix}-${this.item}`;

    // Read like status from local storage
    const item = localStorage.getItem(this.itemId);
    this.liked = item === 'true';

    // Read likes from Firebase DB
    this.likesRef = ref(db, 'dcc-likes/' + this.itemId + '/likesCount');
    this.unsubscribe = onValue(this.likesRef, snapshot => {
      const data = snapshot.val();
      if (!data) {
        set(this.likesRef, 0);
      }
      this.likes = data ? data : 0;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.onClick);
    this.unsubscribe();
  }

  onClick(e) {
    e.preventDefault();

    // Save to local storage.
    this.liked = !this.liked;
    localStorage.setItem(this.itemId, this.liked);

    // Save to store.
    const delta = this.liked ? 1 : -1;
    set(this.likesRef, increment(delta));
  }

  render() {
    // prettier-ignore
    return html`<a href="#"
        class="ga-event"
        data-ga-label="${this.itemId}"
        data-ga-category="action"
        data-ga-action="dcc-like"
        data-liked="${this.liked}"
      >
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.88659 16.6603L8.88587 16.6596C6.30081 14.3155 4.19567 12.4057 2.73078 10.6147C1.27162 8.83074 0.5 7.22576 0.5 5.5C0.5 2.69614 2.69614 0.5 5.5 0.5C7.08861 0.5 8.62112 1.24197 9.61932 2.41417L10 2.8612L10.3807 2.41417C11.3789 1.24197 12.9114 0.5 14.5 0.5C17.3039 0.5 19.5 2.69614 19.5 5.5C19.5 7.22577 18.7284 8.83077 17.2691 10.6161C15.8065 12.4055 13.7058 14.3144 11.1265 16.6584L11.1148 16.669L11.1137 16.67L10.0013 17.675L8.88659 16.6603Z" stroke="currentColor" class="fill-like">
        </svg><span>${this.likes}</span>
      </a>
    `;
  }
}
customElements.define('like-icon', LikeIcon);
