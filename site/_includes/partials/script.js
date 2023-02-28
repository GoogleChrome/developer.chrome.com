/*
 * Copyright 2021 Google LLC
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
 * @fileoverview This is inline script run on every page.
 *
 * Note that this is included by 11ty, so { { } } (without spaces)'s are expanded.
 */

/* eslint-disable no-undef */
// @ts-nocheck
(function () {
  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga('create', '{{ analytics.id }}');
  ga('set', 'transport', 'beacon');
  ga('set', 'page', window.location.pathname);
  // nb. Analytics requires dimension values to be strings.
  ga(
    'set',
    '{{ analytics.dimensions.TRACKING_VERSION }}',
    '{{ analytics.version }}'
  );
  try {
    // For the document speculation rules origin trial
    // overwrite the navigation type
    const navEntry = performance.getEntriesByType('navigation')[0];
    const navigationType =
      navEntry.type === 'navigate' &&
      navEntry.deliveryType === 'navigational-prefetch'
        ? 'navigational-prefetch'
        : navEntry.type.replace(/_/g, '-');
    ga('set', '{{ analytics.dimensions.NAVIGATION_TYPE }}', navigationType);
  } catch (error) {
    ga('set', '{{ analytics.dimensions.NAVIGATION_TYPE }}', '(not set)');
  }

  ga('send', 'pageview');

  // Check if the user has accepted cookies. If so, set an attribute on
  // the html element which will hide the banner.
  try {
    const cookiesCtaUrl = '{{ site.cookiesCtaUrl }}';
    const savedCookiesCtaUrl = localStorage.getItem('user-cookies');

    if (savedCookiesCtaUrl === cookiesCtaUrl) {
      document.documentElement.setAttribute('data-cookies-accepted', '');
    }
  } catch (e) {
    // ignore
  }

  // If we're displaying a promotional banner, check if the user has dismissed
  // it. If so, set an attribute on the html element to hide the banner.
  // Note that it's possible for a banner to have more than one action but
  // we always use the url from the first action as the localStorage value.
  try {
    const bannerCtaUrl = '{{ banner.actions[0].href }}';
    const savedBannerCtaUrl = localStorage.getItem('user-banner');

    if (savedBannerCtaUrl === bannerCtaUrl) {
      document.documentElement.setAttribute('data-banner-dismissed', '');
    }
  } catch (e) {
    // ignore
  }
})();
