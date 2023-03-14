import {
  onCLS,
  onFCP,
  onFID,
  onLCP,
  onTTFB,
  onINP,
} from 'web-vitals/attribution';
import {dimensions} from '../_data/analytics.json';

/**
 * See: https://github.com/GoogleChrome/web-vitals#using-analyticsjs
 * @param {Object} metric
 */
function sendToGoogleAnalytics({name, delta, id, attribution, navigationType}) {
  let webVitalInfo = '(not set)';

  switch (name) {
    case 'CLS':
      webVitalInfo = attribution.largestShiftTarget;
      break;
    case 'FID':
    case 'INP':
      webVitalInfo = attribution.eventTarget;
      break;
    case 'LCP':
      webVitalInfo = attribution.element;
      break;
  }

  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,

    // See: https://web.dev/debug-web-vitals-in-the-field/
    [dimensions.WEB_VITALS_DEBUG]: webVitalInfo,
    // Override for 'navigational-prefetch' for the prefetch origin trial
    // experiment (https://github.com/GoogleChrome/developer.chrome.com/pull/5216)
    [dimensions.NAVIGATION_TYPE]:
      navigationType === 'navigate' &&
      performance.getEntriesByType &&
      performance.getEntriesByType('navigation')[0].deliveryType ===
        'navigational-prefetch'
        ? 'navigational-prefetch'
        : navigationType,
  });
}

/**
 * Add a listener to detect back/forward cache restores and track them
 * as pageviews with the "bfcache" navigation type set (in case we need
 * to distinguish them from regular pageviews).
 * https://web.dev/bfcache/#how-bfcache-affects-analytics-and-performance-measurement
 */
window.addEventListener(
  'pageshow',
  /**
   * @param {PageTransitionEvent} e
   */
  e => {
    if (e.persisted) {
      ga('set', dimensions.NAVIGATION_TYPE, 'back-forward-cache');
      ga('send', 'pageview');
    }
  }
);

onCLS(sendToGoogleAnalytics);
onFCP(sendToGoogleAnalytics);
onFID(sendToGoogleAnalytics);
onINP(sendToGoogleAnalytics);
onLCP(sendToGoogleAnalytics);
onTTFB(sendToGoogleAnalytics);
