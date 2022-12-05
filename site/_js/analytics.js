import {
  onCLS,
  onFCP,
  onFID,
  onINP,
  onLCP,
  onTTFB,
} from 'web-vitals/attribution';
import {ids, version, dimensions} from '../_data/analytics.json';

// A function that should be called once all all analytics code has been
// initialized. Calling this will resolve the `whenAnalyticsInitialize`
// promise.
let markAnalyticsInitialized;

// A promise that settles once all analytics has been initialized.
// Internally this assigned the `resolve()` function to the module-level
// `markAnalyticsInitialized` variable.
const whenAnalyticsInitialized = new Promise(resolve => {
  markAnalyticsInitialized = resolve;
});

/**
 * @param {string} name
 * @param {Object} params
 */
export async function logEvent(name, params) {
  await whenAnalyticsInitialized;
  gtag('event', name, params);
}

/**
 * See: https://github.com/GoogleChrome/web-vitals#using-analyticsjs
 * @param {Object} metric
 */
function sendToGoogleAnalytics({
  name,
  value,
  delta,
  id,
  attribution,
  navigationType,
}) {
  const params = {
    event_category: 'Web Vitals',
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Send the raw metric value in addition to the value computed for GA
    // so it's available in BigQuery and the API.
    metric_value: value,
    // This should already by set globally, but to ensure it's consistent
    // with the web-vitals library, set it again.
    navigation_type: navigationType,
    // Use a non-interaction event to avoid affecting bounce rate.
    // This only applies to Universal Analytics and can be deleted once
    // we're only using GA4.
    non_interaction: true,
  };

  let overrides;

  switch (name) {
    case 'CLS':
      overrides = {
        debug_time: attribution.largestShiftTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.largestShiftTarget || '(not set)',
      };
      break;
    case 'FCP':
      overrides = {
        debug_ttfb: attribution.timeToFirstByte,
        debug_fb2fcp: attribution.firstByteToFCP,
        debug_load_state: attribution.loadState,
        debug_target: attribution.loadState || '(not set)',
      };
      break;
    case 'FID':
    case 'INP':
      overrides = {
        debug_event: attribution.eventType,
        debug_time: attribution.eventTime,
        debug_load_state: attribution.loadState,
        debug_target: attribution.eventTarget || '(not set)',
      };
      break;
    case 'LCP':
      overrides = {
        debug_url: attribution.url,
        debug_ttfb: attribution.timeToFirstByte,
        debug_rld: attribution.resourceLoadDelay,
        debug_rlt: attribution.resourceLoadTime,
        debug_erd: attribution.elementRenderDelay,
        debug_target: attribution.element || '(not set)',
      };
      break;
    case 'TTFB':
      overrides = {
        debug_waiting_time: attribution.waitingTime,
        debug_dns_time: attribution.dnsTime,
        debug_connection_time: attribution.connectionTime,
        debug_request_time: attribution.requestTime,
      };
      break;
  }

  logEvent(name, Object.assign(params, overrides));
}

/**
 * Adds a listener to detect back/forward cache restores and log them
 * as pageviews with the "back-forward-cache" navigation type set (in
 * case we need to distinguish them from regular pageviews).
 * https://web.dev/bfcache/#how-bfcache-affects-analytics-and-performance-measurement
 */
function addPageShowEventListener() {
  window.addEventListener(
    'pageshow',
    /**
     * @param {PageTransitionEvent} e
     */
    e => {
      if (e.persisted) {
        logEvent('pageview', {
          [dimensions.NAVIGATION_TYPE]: 'back-forward-cache',
        });
      }
    }
  );
}

/**
 * A promise that resolves once the page is activated (for prerendered pages)
 * or immediately for non-prerendered pages.
 * @type {Promise<void>}
 * */
const whenPageActivated = new Promise(resolve => {
  if (document.prerendering) {
    document.addEventListener('prerenderingchange', () => resolve());
  } else {
    resolve();
  }
});

/**
 * Gets the type of navigation for this page. In most cases this is the
 * value returned by the Navigation Timing API (normalized to use kebab case),
 * but in addition to this it also captures pages that were prerendered
 * as well as page that were restored after a discard.
 * @returns {string}
 */
function getNavigationType() {
  if (document.wasDiscarded) {
    return 'restore';
  }

  const navEntry =
    self.performance &&
    performance.getEntriesByType &&
    performance.getEntriesByType('navigation')[0];

  if (navEntry) {
    // Prerendered pages have an activationStart time after activation
    if (Number(navEntry.activationStart) > 0) {
      return 'prerender';
    } else {
      return navEntry.type.replace(/_/, '-');
    }
  }
  return '(not set)';
}

/**
 * Returns a list of any `prerender` speculation rules defined by any
 * `script[type=speculationrules]` elements on the page.
 * @returns {Object}
 */
function getPrerenderRules() {
  return [...document.querySelectorAll('script[type=speculationrules]')]
    .map(s => {
      try {
        return JSON.parse(`${s.textContent}`).prerender;
      } catch {
        // Ignore parse errors.
      }
    })
    .flat() // Remove scripts with errors or no prerender rules.
    .filter(rule => rule && rule.source === 'list');
}

/**
 * Logs analytics events for `prerender` speculation rules, if that browser
 * support speculation rules and is not in Data Saver mode.
 * @returns {void}
 */
function logPrerenders() {
  // Only log prerender attempts if supported
  // and not in datasaver mode
  if (
    !(
      HTMLScriptElement.supports &&
      HTMLScriptElement.supports('speculationrules')
    ) ||
    navigator.connection?.saveData
  ) {
    return;
  }

  const prerenderURLs = new Set(
    getPrerenderRules()
      .map(r => r.urls)
      .flat()
  );

  prerenderURLs.forEach(prerenderURL => {
    logEvent('prerender_attempt', {
      value: 1,
      event_category: 'Site-Wide Custom Events',
      event_label: prerenderURL,
      // Use a non-interaction event to avoid affecting bounce rate.
      non_interaction: true,
    });
  });
}

/**
 * @param {string} name
 * @returns {string|null}
 */
function getMeta(name) {
  /** @type {HTMLMetaElement | null} */
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta && meta.content;
}

/**
 * Returns the UA or GA4 config for a given analytics measurement ID,
 * configured for the web.dev accounts.
 * @param {string} id
 * @returns {['config', string, Gtag.ConfigParams]}
 */
function getConfig(id) {
  const config = {
    measurement_version: version,
    navigation_type: getNavigationType(),
    page_path: location.pathname,
    page_authors: getMeta('authors'),
    page_tags: getMeta('tags'),
    color_scheme_preference: self.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light',
  };
  if (id.startsWith('UA-')) {
    Object.assign(config, {
      transport_type: 'beacon',
      // See: https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
      custom_map: {
        [dimensions.MEASUREMENT_VERSION]: 'measurement_version',
        [dimensions.NAVIGATION_TYPE]: 'navigation_type',
        [dimensions.COLOR_SCHEME_PREFERENCE]: 'color_scheme_preference',
        [dimensions.WEB_VITALS_DEBUG]: 'debug_target',
      },
    });
  }
  if (id.startsWith('G-')) {
    if (location.hostname === 'localhost') {
      config.debug_mode = true;
    }
  }
  return ['config', id, config];
}

async function initAnalytics() {
  // If prerendering then only init once the page is activated
  await whenPageActivated;

  gtag(...getConfig(ids.GA4));
  gtag(...getConfig(ids.UA));

  addPageShowEventListener();

  onCLS(sendToGoogleAnalytics);
  onFCP(sendToGoogleAnalytics);
  onFID(sendToGoogleAnalytics);
  onINP(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
  onTTFB(sendToGoogleAnalytics);

  logPrerenders();

  markAnalyticsInitialized();
}

// Some pages on web.dev include the full site JS but doesn't load
// the gtag.js library. We can't initialize analytics in those cases.
if (typeof gtag === 'function') {
  initAnalytics();
}
