import './web-components/truncate-text';
import './web-components/enhanced-select';
import './web-components/checkbox-group';
// eslint-disable-next-line no-unused-vars
import {TagPillList} from './web-components/tag-pill-list';
import {EnhancedSelect} from './web-components/enhanced-select';

let activeFilters = {};
let searchKeyword = '';
const filterContainer = document.querySelector(
  '.extension-samples-container__filters'
);
const selectedFilterContainer = document.querySelector('.selected-filters');
/** @type { TagPillList|null } */
const activeFiltersList = document.querySelector('#active-filters');
const selectFields = document.querySelectorAll('.samples-filter');
const wrapper = document.querySelector('.samples-list');
const searchInput = document.querySelector('#search-extension-samples');

function init() {
  removeNoJsClass();
  initItemData();
  addListeners();
  addMobileListeners();
}

init();

function removeNoJsClass() {
  filterContainer?.classList.remove('no-js');
  selectedFilterContainer?.classList.remove('no-js');
  wrapper?.classList.remove('no-js');
}

function addListeners() {
  document.querySelectorAll('.sample-item').forEach(sampleElement => {
    const showMoreButton = sampleElement.querySelector('.show-more-button');
    if (!showMoreButton) {
      return;
    }
    const showMoreText = showMoreButton.getAttribute('data-more');
    const showLessText = showMoreButton.getAttribute('data-less');
    showMoreButton.addEventListener('click', () => {
      const isHidden = showMoreButton.textContent === showMoreText;
      if (isHidden) {
        const usedApis = /** @type {SampleElement} */ (
          sampleElement
        ).data.apis.slice(3);
        const fragment = document.createDocumentFragment();
        for (const api of usedApis) {
          const apiDocUrl = `/docs/extensions/mv3/reference/${api.namespace}/#${api.type}-${api.propertyName}`;
          const pillElement = document.createElement('a');
          pillElement.classList.add(
            'more-api-pill',
            'tag-pill',
            'surface',
            'hairline',
            'color-secondary-text',
            'type--label',
            'weight-regular',
            'rounded-lg'
          );
          pillElement.setAttribute('href', apiDocUrl);
          pillElement.setAttribute('target', '_blank');
          pillElement.setAttribute('rel', 'noopener');
          pillElement.textContent = `${api.namespace}.${api.propertyName}`;
          fragment.appendChild(pillElement);
        }
        showMoreButton.parentNode?.insertBefore(fragment, showMoreButton);
        showMoreButton.textContent = showLessText;
      } else {
        const moreApiPills = sampleElement.querySelectorAll('.more-api-pill');
        moreApiPills.forEach(pill => pill.remove());
        showMoreButton.textContent = showMoreText;
      }
    });
  });

  selectFields.forEach(ele => {
    ele.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }

      activeFilters[t.name] = t.value;

      updateUi();
      updateTagPills();
    });
  });

  searchInput?.addEventListener('input', e => {
    if (!(e instanceof InputEvent)) return;

    if (e.isComposing) return;
    searchKeyword = /** @type { HTMLInputElement } */ (e.target).value.trim();
    updateUi();
  });

  document
    .querySelector('#search-extension-samples-close')
    ?.addEventListener('click', () => {
      /** @type { HTMLInputElement } */ (searchInput).value = '';
      searchKeyword = '';
      updateUi();
    });

  activeFiltersList?.addEventListener('removed-pill', e => {
    if (!(e instanceof CustomEvent)) return;

    const index = activeFilters[e.detail.key].indexOf(e.detail.value);

    activeFilters[e.detail.key].splice(index, 1);

    updateUi();

    selectFields.forEach(field => {
      /** @type { EnhancedSelect } */ (field).setValue(
        activeFilters[field.getAttribute('name')] || []
      );
    });

    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        const target = activeFilters?.[checkbox.getAttribute('name')];

        /** @type { HTMLInputElement } */ (checkbox).checked =
          target && target.includes(checkbox.getAttribute('value'));
      });
  });
}

function initItemData() {
  const dataWrapper = document.getElementById('extension-samples-data');
  if (!dataWrapper) {
    throw new Error('Missing data wrapper');
  }
  const data = JSON.parse(dataWrapper.innerText);
  const items = document.querySelectorAll('.sample-item');
  items.forEach(item => {
    const name = item.getAttribute('data-sample-name');
    if (!name) {
      throw new Error('Missing sample name');
    }
    const sample = data.find(i => i.name === name);
    if (!sample) {
      throw new Error(`Missing sample data for ${name}`);
    }
    /** @type {SampleElement} */ (item).data = sample;
  });
}

const shouldSampleShown = data => {
  if (
    searchKeyword &&
    !data.name?.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    !data.title?.toLowerCase().includes(searchKeyword.toLowerCase()) &&
    !data.description?.toLowerCase().includes(searchKeyword.toLowerCase())
  ) {
    return false;
  }

  if (
    activeFilters.types?.length &&
    !activeFilters.types.some(type => type === data.type)
  ) {
    return false;
  }

  if (
    activeFilters.permissions?.length &&
    !activeFilters.permissions.some(permission =>
      data.permissions.includes(permission)
    )
  ) {
    return false;
  }

  if (
    activeFilters.permissions?.length &&
    !activeFilters.permissions.some(permission =>
      data.permissions.includes(permission)
    )
  ) {
    return false;
  }

  if (
    activeFilters.apis?.length &&
    !activeFilters.apis.some(api => {
      const parsedApi = api.split('_');
      const apiNamespace = parsedApi[0];
      const apiProperty = parsedApi[1];
      return data.apis.some(
        api =>
          api.namespace === apiNamespace && api.propertyName === apiProperty
      );
    })
  ) {
    return false;
  }

  return true;
};

function updateTagPills() {
  if (!activeFiltersList) return;

  activeFiltersList.items = Object.entries(activeFilters).flatMap(i => {
    return i[1].map(value => ({key: i[0], value: value}));
  });
}

function addMobileListeners() {
  /** @type { HTMLDialogElement|null } */
  const filters = document.querySelector('#mobile-filters');
  const opener = document.querySelector('#mobile-filters-opener');
  const done = document.getElementById('mobile-filters-done');
  const reset = document.getElementById('mobile-filters-reset');

  opener?.addEventListener('click', () => filters?.showModal());

  filters?.addEventListener('click', e => {
    if (/** @type { HTMLElement } */ (e.target).nodeName === 'DIALOG')
      closeFiltersModal();
  });

  done?.addEventListener('click', () => {
    const selected = Array.from(
      document.querySelectorAll(
        '#mobile-filters input[type="checkbox"]:checked'
      )
    );

    activeFilters = selected.reduce((payload, checkbox) => {
      const name = checkbox.getAttribute('name');
      const value = checkbox.getAttribute('value');

      if (name === null) return payload;

      if (typeof payload[name] === 'undefined') {
        payload[name] = [value];
        return payload;
      }

      payload[name].push(value);

      return payload;
    }, {});

    updateUi();
    updateTagPills();
    closeFiltersModal();
  });

  reset?.addEventListener('click', () => {
    document
      .querySelectorAll('#mobile-filters input[type="checkbox"]:checked')
      .forEach(checkbox => {
        /** @type { HTMLInputElement } */ (checkbox).checked = false;
      });
  });

  function closeFiltersModal() {
    filters?.close();
  }
}

function updateUi() {
  if (!wrapper) {
    throw new Error('Missing wrapper');
  }

  if (
    !activeFilters.types?.length &&
    !activeFilters.permissions?.length &&
    !activeFilters.apis?.length &&
    !searchKeyword
  ) {
    /** @type { NodeListOf<SampleElement> } */
    (wrapper.querySelectorAll('.sample-item')).forEach(item => {
      item.style.display = 'block';
    });
    return;
  }

  /** @type { NodeListOf<SampleElement> } */
  (wrapper.querySelectorAll('.sample-item')).forEach(item => {
    const hide = !shouldSampleShown(item.data);
    item.style.display = hide ? 'none' : 'block';
  });
}
