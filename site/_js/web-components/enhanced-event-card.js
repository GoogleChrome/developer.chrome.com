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
 * @fileoverview A component that Enhances the event card nested within,
 * offering better UX to js users.
 */
import {BaseElement} from './base-element';

export class EnhancedEventCard extends BaseElement {
  constructor() {
    super();

    this.toggleEventDetails = this.toggleEventDetails.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.card = this.getCard();
    this.card.enhance();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.card?.handleDisconnect();
  }

  toggleEventDetails() {
    this.card?.toggleOpen();
  }

  getCard() {
    const card = this.querySelector('.event-card');

    if (!card) {
      throw new Error('Missing event card');
    }

    const button = this.getButton();

    return {
      enhance() {
        card.removeAttribute('tabindex');
        card.classList.remove('no-js');
        button.addEventListener();
      },
      handleDisconnect() {
        button.removeEventListener();
      },
      isOpen: () => Boolean(card.getAttribute('show-details')),
      toggleOpen() {
        const open = this.isOpen();
        button.toggleLabel(open);
        card.setAttribute('show-details', open ? '' : 'show-details');
      },
    };
  }

  getButton() {
    const button = this.querySelector('.event-card__overview button');

    if (!button) {
      throw new Error('Event card is missing the details button');
    }

    const originalLabel = button.innerHTML;

    return {
      toggleLabel: detailsVisible => {
        button.innerHTML = detailsVisible ? originalLabel : 'Hide details';
      },
      addEventListener: () => {
        button.addEventListener('click', this.toggleEventDetails);
      },
      removeEventListener: () => {
        button.removeEventListener('click', this.toggleEventDetails);
      },
    };
  }
}

customElements.define('enhanced-event-card', EnhancedEventCard);
