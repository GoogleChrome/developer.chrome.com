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
 * @param {Function} onError
 * @param {{skip?:number,take?:number, total?:number}} params
 * @returns {Promise<{}>}
 */
export const loadMore = async (
  button,
  container,
  fetchItems,
  onError,
  params = {}
) => {
  let currentOffset = params.skip || 0;
  const total = getTotalItems(container, params);
  const take = params.take || 10;

  button.addEventListener('click', async e => {
    e.preventDefault();

    button.setAttribute('disabled', '');

    try {
      const items = await fetchItems(currentOffset, take);

      container.insertAdjacentHTML('beforeend', items.join(''));

      currentOffset += take;
    } catch (e) {
      onError(e);
    }

    button.removeAttribute('disabled');

    if (currentOffset >= total) {
      button.setAttribute('hidden', '');
    }
  });

  if (currentOffset >= total) {
    button.setAttribute('hidden', '');
  }

  return {
    currentOffset: () => currentOffset,
    total: () => total,
    take: () => take,
  };
};

/**
 * @param {HTMLElement} container
 * @param {{total?:number}} params

 */
function getTotalItems(container, params) {
  if (
    typeof params.total === 'undefined' &&
    !container.hasAttribute('total-items')
  ) {
    throw new Error('Missing total: please pass via attribute or params');
  }

  return params.total ?? Number(container.getAttribute('total-items'));
}
