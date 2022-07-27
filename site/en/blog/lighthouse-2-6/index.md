---
layout: 'layouts/blog-post.njk'
title:  Lighthouse 2.6 Updates
description: >
     New performance audits, a rehaul of the accessibility score, report UX improvements, and bug fixes.
authors:
  - vinamratasingal
  - brendankenny
  - kaycebasques
date: 2017-12-13
updated: 2017-12-13
---



Lighthouse 2.6 is out! Highlights include:

* [New performance audits](#perf).
* [A rehaul of the accessibility section score](#a11y).
* [Improvements to the report UX](#report-ux).
* [A bug fix for the aspect ratio audit](#bug-fix).

See the [2.6 release notes][RN] for the full list of new features, changes,
and bug fixes.

## How to update to 2.6 

* NPM. Run `npm update lighthouse`. Run `npm update lighthouse -g` flag if you installed
  Lighthouse globally.
* Chrome Extension. The extension should automatically update, but you can manually update it
  via `chrome://extensions`.
* DevTools. The Audits panel will be shipping with 2.6 in Chrome 65. You can check what version
  of Chrome you're running via `chrome://version`. Chrome updates to a new version about every
  6 weeks. You can run the latest Chrome code by downloading [Chrome Canary][Canary].

## New performance audits 

### JavaScript boot-up time is high 

View a breakdown of the time your page spends parsing, compiling, and executing each script.
JavaScript boot-up time is a somewhat-hidden but important factor in page load time.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/415ucuTDFbUcGVuYoWye.png", alt="The 'JavaScript boot-up time is high' audit.", width="800", height="490" %}
  <figcaption>
    <b>Figure 1</b>. The <b>JavaScript boot-up time is high</b> audit
  </figcaption>
</figure>

### Uses inefficient cache policy on static assets

Make sure that the browser properly caches each of your resources.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/kdhYuGwJA5Zbc3JfSolg.png", alt="The 'Uses inefficient cache policy on static assets' audit", width="800", height="447" %}
  <figcaption>
    <b>Figure 2</b>. The <b>Uses inefficient cache policy on static assets</b> audit
  </figcaption>
</figure>

### Avoids page redirects

Page redirects add an extra network roundtrip, or two if an extra DNS lookup is required.
Minimize redirects in order to speed up page load time.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/itm8IKvqwchJuHzrvBlE.png", alt="The 'Avoids page redirects' audit", width="800", height="205" %}
  <figcaption>
    <b>Figure 3</b>. The <b>Avoids page redirects</b> audit
  </figcaption>
</figure>

## Rehaul of the accessibility section score

In Lighthouse 2.6, the aggregate accessibility score is calculated differently. The score weighs
each accessibility audit based on the severity of its impact on user experience, as well as the
frequency of the issue, based on the [HTTP Archive](http://httparchive.org/) dataset. See
[googlechrome/lighthouse/issues/3444](https://github.com/GoogleChrome/lighthouse/issues/3444)
for an in-depth discussion.

## Report UX Improvements 

Note: These updates are in the Chrome Extension version of Lighthouse only. They are not yet
in the Audits panel of DevTools.

### Top-level errors

At the top of your report, Lighthouse alerts you to errors that may have affected your page's
scores.


<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/q43EGNd9CsifEbHBX3fg.png", alt="Top-level errors at the top of a report", width="800", height="230" %}
  <figcaption>
    <b>Figure 4</b>. Top-level errors at the top of a report
  </figcaption>
</figure>

### Print summary and expanded views

Click **Export Report** ![Export Report][Export]{:.cdt-inl} then select **Print Summary** or
**Print Expanded** to print out summarized or detailed versions of your reports.



<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/9iDDjzIYaoXiDDR0aF0I.png", alt="Print summary and expanded views", width="800", height="244" %}
  <figcaption>
    <b>Figure 5</b>. Print summary and expanded views
  </figcaption>
</figure>

## Aspect ratio bug fix

2.6 also fixes a bug that caused the **Displays images with correct aspect ratio** audit to fail
even when there were no images on the page, or all images were properly sized.


[cdt]: /web/tools/lighthouse/#devtools
[node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[cli]: /web/tools/lighthouse/#cli
[ce]: /web/tools/lighthouse/#extension
[rn]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.6.0
[canary]: https://www.google.com/chrome/browser/canary.html
[export]: /web/updates/images/2017/12/export-report.png