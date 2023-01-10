/*
 * Copyright 2023 Google LLC
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

let filterValue = [];

/**
* @param searchText
* @param selectedValue
*/
function displayShowcase(searchText, selectedValue) {
  const articles = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.fugu-card[data-used-apis]'));
  if (!searchText.length && !selectedValue.length) {
    articles.forEach((article) => {
      article.style.display = 'block';
    });
  } else {
    articles.forEach((article) => {
      article.style.display = 'none';
    });
  }

  const filter = selectedValue.join(' ');
  const container = document.querySelector('.fugu-container');
  const matchingFilterArticles = /** @type {NodeListOf<HTMLElement>} */ (container?.querySelectorAll(`article[data-used-apis*="${filter}"]`));
  const matchingSearchArticles = /** @type {NodeListOf<HTMLElement>} */ (container?.querySelectorAll(`article[data-name*="${searchText}"]`));

  matchingSearchArticles?.forEach((article) => {
    if (!matchingFilterArticles?.length) article.style.display = 'block';
    else {
      matchingFilterArticles.forEach((filterArticle) => {
        if (article === filterArticle) {
          filterArticle.style.display = 'block';
        }
      });
    }
  });
  
  matchingFilterArticles?.forEach((article) => {
    if (!matchingSearchArticles?.length) article.style.display = 'block';
    else {
      matchingSearchArticles.forEach((searchArticle) => {
        if (article === searchArticle) {
          searchArticle.style.display = 'block';
        }
      });
    }
  });
}

const searchByAppNameElement = /** @type {HTMLElement} */ (document.querySelector('input.search-apps'));
searchByAppNameElement.addEventListener('input', (e) => {
  const articles = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.fugu-card[data-used-apis]'));
  articles.forEach((article) => {
    article.style.display = 'none';
  });

  const value = /** @type {HTMLInputElement} */ (e.target).value.toLowerCase();
  displayShowcase(value, filterValue)
});

const searchByApiElement = /** @type {HTMLElement} */ (document.querySelector('.search-apis'));
searchByApiElement.addEventListener('click', (e) => {
  const selections = document.querySelectorAll('li.button[selected]');
  const filterPills = document.querySelectorAll('span.tag-pill');

  const selectedOptions = []
  selections.forEach((option) => {
    return selectedOptions.push(option?.textContent?.trim())
  })
  filterPills.forEach((pill) => {
    if (selectedOptions.includes(pill?.textContent?.trim())) {
      const value = pill?.textContent?.trim().toLowerCase().split(' ').join('-');

      if (!filterValue.includes(value)) {
        filterValue.push(value);
        const searchValue = /** @type {HTMLInputElement} */ (searchByAppNameElement).value?.toLowerCase();
        displayShowcase(searchValue, filterValue)
      }

      pill.removeAttribute('hidden');
    }
  })
});

const closeButtonPills = document.querySelectorAll('span.tag-pill button');
closeButtonPills.forEach(button => {
  button.addEventListener('click', () => {
    /** @type {HTMLElement} */ (button.parentNode).setAttribute('hidden', 'true');

    const enhancedOption = document.querySelectorAll('.enhanced-select__options li');
    const enhancedSelect = document.querySelector('enhanced-select.search-apis');
    enhancedOption.forEach(option => {
      if (option.textContent?.trim() === /** @type {HTMLElement} */ (button.parentNode).textContent?.trim()) {
        option.removeAttribute('selected');
        /** @type {HTMLElement} */ enhancedSelect?.setAttribute('value', '[]')
      }
    });

    const value = button?.textContent?.trim().toLowerCase().split(' ').join('-');
    filterValue = filterValue.filter(v => v !== value)
    
    const searchValue = /** @type {HTMLInputElement} */ (searchByAppNameElement).value.toLowerCase();
    displayShowcase(searchValue, filterValue)
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'f' && e.metaKey) {
    e.preventDefault();
    searchByAppNameElement.focus();
  }
});
