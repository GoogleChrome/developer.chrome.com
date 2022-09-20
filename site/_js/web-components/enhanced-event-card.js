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

import { BaseElement } from './base-element'

/* eslint-disable require-jsdoc */
export class EnhancedEventCard extends BaseElement {
  connectedCallback() {
    super.connectedCallback();

    this.card = this.getCardElement()
    this.detailsButton = this.getButtonElement(this.card)

    this.detailsButton.addEventListener('click', this.toggleEventDetails);

    this.card.removeAttribute('tabindex');
    this.card.classList.remove('no-js');
  }

  toggleEventDetails = () =>  {
    // @ts-ignore
    const visible = this.card.getAttribute('show-details') === "1" ? "0" : "1";

    this.detailsButton.innerHTML = visible === "1" ? 'Hide event details' : 'See event details';

    // @ts-ignore
    this.card.setAttribute('show-details', visible);
  }

  getCardElement() {
    const card = this.querySelector('.event-card');

    if (!card) {
      throw new Error('Missing event card');
    }

    return card;
  }

  getButtonElement(card) {
    const button = card.querySelector('.event-card__overview button');

    if (!button) {
      throw new Error('Event card is missing the details button');
    }

    return button;
  }
}

customElements.define('enhanced-event-card', EnhancedEventCard);
