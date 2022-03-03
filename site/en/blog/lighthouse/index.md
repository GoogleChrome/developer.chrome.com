---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Lighthouse 2.8 Updates

# Required
description: >
  New perf and SEO audits, perf as the first section in reports, and more.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - vinamratasingal
  - paulirish
  - kaycebasques

# Required
date: 2018-02-09

# Optional
# Include an updated date when you update your post
updated: 2020-07-24

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - lighthouse


---

[Lighthouse](https://developers.google.com/web/tools/lighthouse) 2.8 is out! Highlights include:

* [New Performance and SEO audits](#audits)
* [Performance as the first section of Lighthouse report](#report)
* [Updated Accessibility scoring](#a11y)
* [New loading message and fast facts](#message)
* [New Lighthouse release guide](#release)

See the [2.8 release notes][RN] for the full list of new features, changes, and bug
fixes.

[rn]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.8.0

## How to update to 2.8

* NPM. Run `npm update lighthouse`, or `npm update lighthouse -g` flag if you installed
  Lighthouse globally.
* Chrome Extension. The extension should automatically update, but you can manually update it
  via `chrome://extensions`.
* DevTools. The Audits panel will be shipping with 2.8 in Chrome 65. You can check what version
  of Chrome you're running via `chrome://version`. Chrome updates to a new version about every
  6 weeks. You can run the latest Chrome code by downloading [Chrome Canary][Canary].

[canary]: https://www.google.com/chrome/browser/canary.html

## New Performance and SEO audits

The **Avoid Plugins** audit lists plugins that you should remove, since plugins prevent the
page from being mobile-friendly. Most mobile devices don't support plugins.

<figure>
 {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/n3pIgXBjj1jPINc5up11.png", alt="The Avoid Plugins audit.", width="800", height="586" %}
  <figcaption>
    <b>Figure 1</b>. The <b>Avoid Plugins</b> audit
  </figcaption>
</figure>



The **Document Has A Valid rel=canonical** audit in the SEO category checks for a
`rel=canonical` URL to make sure that a crawler knows which URL to show in search results.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/PTNCxZyHURcgjYzpLGoZ.png", alt="The Document Has A Valid rel=canonical audit.", width="800", height="103" %}
  <figcaption>
    <b>Figure 2</b>. The <b>Document Has A Valid</b> <code>rel=canonical</code> audit
  </figcaption>
</figure>

The **Page Is Mobile-Friendly** and **Structured Data Is Valid** manual audits can help further
improve your SEO. "Manual" in this case means that Lighthouse can't automate these audits, so
you need to test them yourself.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/io7sgHdX35lRg6umDo56.png", alt="The manual SEO audits.", width="800", height="295" %}
  <figcaption>
    <b>Figure 3</b>. The manual SEO audits
  </figcaption>
</figure>

The **Minify CSS** and **Minify JavaScript** audits in the Performance category check for any
CSS or Javascript that can be minified to reduce payload size and parse time.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JjEOe4RZ59QrZsSCUEDJ.png", alt="The Minify CSS and Minify JavaScript audits.", width="800", height="190" %}
  <figcaption>
    <b>Figure 4</b>. The <b>Minify CSS</b> and <b>Minify JavaScript</b> audits
  </figcaption>
</figure>

## Performance as the first category in Lighthouse reports

Performance is now the first category you see in Lighthouse reports. Some users thought that
Lighthouse was only for Progressive Web Apps, since that was the first category in reports. In
reality, Lighthouse can help you understand how to improve any web page, whether or not it's
a [Progressive Web App][PWA].

[pwa]: https://developers.google.com/web/progressive-web-apps/

## Updated Accessibility scoring 

If an accessibility audit is not applicable for a given page, that audit no longer counts
towards the **Accessibility** score.

## New loading message and fast facts 

{% Aside %}
This update is only visible when you run Lighthouse from the **Audits** panel of Chrome
DevTools.
{% endAside %}


<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/jK9UENoU3p1Jm2mx8UL9.gif", alt="The loading message and fast facts in Chrome DevTools.", width="496", height="300" %}
  <figcaption>
    <b>Figure 5</b>. The loading message and fast facts in Chrome DevTools
  </figcaption>
</figure>

## New Lighthouse release guide

Check out the [Release Guide For Maintainers][release] for information on
release timing, naming conventions, and more.

[release]: https://github.com/GoogleChrome/lighthouse/blob/master/docs/releasing.md

