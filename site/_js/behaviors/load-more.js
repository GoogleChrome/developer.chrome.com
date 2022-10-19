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
 * @param {HTMLElement} button
 * @param {HTMLElement} container
 * @param {Function} fetchItems
 * @param {{skip?:number,take?:number, total:number}} params
 * @returns {Promise<void>}
 */
export const loadMore = async (button, container, fetchItems, params) => {
  let loading = false;
  let currentOffset = params.skip || 0;
  const take = params.take || 10;

  function removeButton() {
    button.classList.add('display-none');
    button.setAttribute('disabled', '');
  }

  button.addEventListener('click', async e => {
    e.preventDefault();

    if (loading) return;

    loading = true;

    const items = await fetchItems(currentOffset, take);

    items.forEach(html => container.insertAdjacentHTML('beforeend', html));

    currentOffset += take;

    if (currentOffset >= params.total) {
      removeButton();
    }

    loading = false;
  });
};
