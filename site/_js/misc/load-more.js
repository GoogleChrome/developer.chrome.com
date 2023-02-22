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
 * @param {Function} fetchItems
 * @param {Function} onError
 * @param {{skip?:number,take?:number, total?:number}} params
 * @returns {Promise<{currentOffset, total, take, nextPage, isLastPage, restart}>}
 */
export const loadMore = async (fetchItems, onError, params = {}) => {
  if (!params.total) {
    throw new Error('Parameter missing: total');
  }

  let currentOffset = params.skip || 0;
  let total = params.total;
  const take = params.take || 10;

  const nextPage = async () => {
    try {
      const {items, updated_total} = await fetchItems(currentOffset, take);

      total = updated_total;

      currentOffset += take;

      return items;
    } catch (e) {
      onError(e);
    }
  };

  return {
    currentOffset: () => currentOffset,
    total: () => total,
    take: () => take,
    isLastPage: () => currentOffset >= total,
    nextPage,
    restart: async () => {
      currentOffset = 0;
      return await nextPage();
    },
  };
};
