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

(() => {
  removeNoJsClass();
  initItemData();
  addListeners();
  addMobileListeners();
})();

function removeNoJsClass() {
  if (!filterContainer) {
    throw new Error('Missing filter container');
  }
  filterContainer.classList.remove('no-js');
  if (!selectedFilterContainer) {
    throw new Error('Missing selected filter container');
  }
  selectedFilterContainer.classList.remove('no-js');
}

function addListeners() {
  selectFields.forEach(ele => {
    ele.addEventListener('change', e => {
      const t = e.target;

      if (!(t instanceof EnhancedSelect)) {
        return;
      }

      activeFilters[t.name] = t.value;

      restart();
      updateTagPills();
    });
  });

  searchInput?.addEventListener('input', e => {
    if (!(e instanceof InputEvent)) return;

    if (e.isComposing) return;
    searchKeyword = /** @type { HTMLInputElement } */ (e.target).value.trim();
    restart();
  });

  document
    .querySelector('#search-extension-samples-close')
    ?.addEventListener('click', () => {
      /** @type { HTMLInputElement } */ (searchInput).value = '';
      searchKeyword = '';
      restart();
    });

  activeFiltersList?.addEventListener('removed-pill', e => {
    if (!(e instanceof CustomEvent)) return;

    const index = activeFilters[e.detail.key].indexOf(e.detail.value);

    activeFilters[e.detail.key].splice(index, 1);

    restart();

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
    // @ts-ignore
    item.data = sample;
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

  // @ts-ignore
  opener?.addEventListener('click', () => filters.showModal());

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

    restart();
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

function restart() {
  if (
    !activeFilters.types?.length &&
    !activeFilters.permissions?.length &&
    !activeFilters.apis?.length &&
    !searchKeyword
  ) {
    wrapper?.querySelectorAll('.sample-item').forEach(item => {
      /** @type { HTMLDivElement } */ (item).style.display = 'block';
    });
    return;
  }
  wrapper?.querySelectorAll('.sample-item').forEach(item => {
    // @ts-ignore
    const hide = !shouldSampleShown(item.data);
    /** @type { HTMLDivElement } */ (item).style.display = hide
      ? 'none'
      : 'block';
  });
}
