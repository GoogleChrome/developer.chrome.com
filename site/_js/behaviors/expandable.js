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

const expandableElements = new WeakSet();

/**
 * Imbues an HTMLElement with aria-expanded behaviors. The element will default
 * to aria-expanded="false" unless the element has an existing aria-expanded
 * attribute.
 * @param {HTMLElement} element An HTMLElement
 */
export const expandable = element => {
  if (!element || expandableElements.has(element)) {
    return;
  }

  function isAriaExpanded(element) {
    return element.getAttribute('aria-expanded') === 'true';
  }

  function toggleAriaExpanded(e) {
    const element = e.currentTarget;
    const update = !isAriaExpanded(element);
    element.setAttribute('aria-expanded', update ? 'true' : 'false');
  }

  element.addEventListener('click', toggleAriaExpanded);
  expandableElements.add(element);
};
