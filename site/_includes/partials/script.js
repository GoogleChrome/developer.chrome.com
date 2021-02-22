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
    '{{ analytics.TRACKING_VERSION }}'
  );
  ga('send', 'pageview');

  try {
    const ctaUrl = 'https://policies.google.com/technologies/cookies';
    const savedCtaUrl = localStorage.getItem('user-cookies');

    if (savedCtaUrl === ctaUrl) {
      document.documentElement.classList.add('banner--hide');
    }
  } catch (e) {
    // ignore
  }
})();
