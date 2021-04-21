---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 90)"
authors:
  - jecelynyeen
date: 2021-02-28
updated: 2021-03-01
description:
  "Debugging support for CSS Flexbox, performance heads-up display on page, issues tab updates and
  more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lB7dsXtKeasPNZXiUFfu.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-90
---

{% Aside %}
Interested in helping improve DevTools? Sign up to participate in [Google User Research here](https://google.qualtrics.com/jfe/form/SV_9YbKj35IGoGsDBj?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXFm430458).
{% endAside %}

{% YouTube id="UyXPdYLQVQk" %}

{% YouTube id="kOodTLAjPsE" %}

## New CSS flexbox debugging tools {: #flexbox }

DevTools now has dedicated CSS flexbox debugging tools!

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hbg2toNQJqIWB30Mo2xt.png", alt="CSS flexbox debugging tools", width="800", height="452" %}

When an HTML element on your page has `display: flex` or `display: inline-flex` applied to it, you
can see a `flex` badge next to it in the Elements panel. Click the badge to toggle the display of a
flex overlay on the page.

In the **Styles** pane, you can click on the new icon next to the `display: flex` or
`display: inline-flex` to open the **Flexbox** editor. Flexbox editor provides a quick way to edit
the flexbox properties. Try it yourself!

In addition, the **Layout** pane has a **Flexbox** section, display all the flexbox elements on the
page. You can toggle the overlay of each element.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pgEhguLqTSHn5AuiA7Ti.png", alt="Flexbox section in the Layout pane", width="800", height="303" %}

Chromium issues: [1166710][1], [1175699][2]

## New Core Web Vitals overlay {: #cwv }

Better visualize and measure your page performance with the new Core Web Vitals overlay.

[Core Web Vitals][3] is an initiative by Google to provide unified guidance for quality signals that
are essential to delivering a great user experience on the web.

Open the [Command Menu][4], run the **Show Rendering** command, and then enable the **Core Web
Vitals** checkbox.

The overlay currently displays:

- [Largest Contentful Paint (LCP)][5]: measures _loading performance_. To provide a good user
  experience, LCP should occur **within 2.5 seconds** of when the page first starts loading.
- [First Input Delay (FID)][6]: measures _interactivity_. To provide a good user experience, pages
  should have a FID of **less than 100 milliseconds**.
- [Cumulative Layout Shift (CLS)][7]: measures _visual stability_. To provide a good user
  experience, pages should maintain a CLS of **less than 0.1**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/95Iw3l9ePIopJuApx65h.png", alt="Core Web Vitals overlay", width="800", height="506" %}

Chromium issue: [1152089][8]

## Issues tab updates {: #issues }

### Moved issue count to the Console status bar {: #issue-count }

A new issue count button is now added in the **Console status bar** to improve the visibility of
issues warnings. This will replace the issue message in the **Console**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vg2AGCiq8IWkXU7MoHR9.png", alt="Issue count in the Console status bar", width="800", height="487" %}

Chromium issue: [1140516][9]

### Report Trusted Web Activity issues {: #twa }

The **Issues tab** now reports [Trusted Web Activity][10] issues. This aims to help developers
understand and fix the Trusted Web Activity issues of their sites, improving the quality of their
applications.

Open a Trusted Web Activity. Then, open the **Issues** tabs by clicking on the [Issues count][11]
button in the **Console** status bar to view the issues. Watch this [talk][12] by Andre to learn
more about how to create and deploy Trusted Web Activity.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FSoAR540YOC6B86Cl7l7.png", alt="Trusted Web Activity issues in the Issues tab", width="800", height="453" %}

Chromium issue: [1147479][13]

## Format strings as (valid) JavaScript string literals in the Console {: #double-quotes }

Now, the **Console** formats strings as valid JavaScript string literals in the Console. Previously,
the **Console** would not escape double quotes when printing strings.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4OPajz8MHz5lPMhPpzg5.png", alt="Format strings as (valid) JavaScript string literals", width="800", height="439" %}

Chromium issue: [1178530][14]

## New Trust Tokens pane in the Application panel {: #trust-token-pane }

DevTools now displays all available Trust Tokens in the current browsing context in the new **Trust
Tokens** pane, under the **Application** panel.

Trust Token is a new API to help combat fraud and distinguish bots from real humans, without passive
tracking. Learn how to [get started with Trust Tokens][15].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/j5idcrmLOWTIcd6vG0q9.png", alt="New Trust Tokens pane", width="800", height="474" %}

Chromium issue: [1126824][16]

## Emulate the CSS color-gamut media feature {: #css-gamut }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OpwDY2ebDj8aOzTR9RlS.png", alt="Emulate the CSS color-gamut media feature", width="800", height="463" %}

The [`color-gamut`][17] media query lets you test the approximate range of colors that are supported
by the browser and the output device. For example, if the `color-gamut: p3` media query matches, it
means that the user's device supports the Display-P3 colorspace.

Open the [Command Menu][18], run the **Show Rendering** command, and then set the **Emulate CSS
media feature color-gamut** dropdown.

Chromium issue: [1073887][19]

## Improved Progressive Web Apps tooling {: #pwa }

DevTools now display a more detailed [Progressive Web Apps (PWA)][20] installability warning message
in the **Console**, with a link to [documentation][21].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gotE1NFtBfITfdz4QDei.png", alt="PWA installability warning", width="800", height="346" %}

The **Manifest** pane now shows a warning message if the manifest **description** exceeds 324
characters.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/DIxxWCedyNCknMSvO1rb.png", alt="PWA description truncate warning", width="800", height="514" %}

In addition, the **Manifest** pane now shows a warning message if the screenshot of the PWA doesn't
match the requirements. Learn more about the the PWA [screenshots][22] property and its requirements
here.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lZzs7jdcln4N1D6PEBA6.png", alt="PWA screenshot warning", width="800", height="299" %}

Chromium issue: [1146450][23], [1169689][24], [965802][25]

## New `Remote Address Space` column in the Network panel {: #remote-address-space }

Use the new `Remote Address Space` column in the Network panel to see the network IP address space
of each network resource.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Wz4Z5hiSK66IKoRWQGDj.png", alt="New 'Remote Address Space' column", width="800", height="470" %}

Chromium issue: [1128885][26]

## Performance improvements {: #perf }

Page loads performance with DevTools opened are now improved. In some extreme cases we saw **10x**
performance improvements.

DevTools collects stack traces and attaches them to console messages or asynchronous tasks for later
consumption by the developer in case of an issue. Since this collection has to happen synchronously
in the browser engine, slow stack trace collection can significantly slow down the page with
DevTools open. We've managed to reduce the overhead of stack trace collection significantly.

Stay tuned for a more detailed engineering blog post explained on the implementation.

Chromium issues: [1069425][27], [1077657][28]

## Display allowed/disallowed features in the Frame details view {: #permission-policy }

Frame details view now shows a list of allowed and disallowed browser features controlled by the
Permissions policy.

[Permissions policy][29] is a web platform API which gives a website the ability to allow or block
the use of browser features in its own frame or in iframes that it embeds.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Ylt0ONDSndEn36MPmRUS.png", alt="Allowed/disallowed features based on Permission policy", width="800", height="497" %}

Chromium issue: [1158827][30]

## New `SameParty` column in the Cookies pane {: #sameparty }

The Cookies pane in the Application panel now displays the `SameParty` attribute of the cookies. The
`SameParty` attribute is a new boolean attribute to indicate whether a cookie should be included in
requests to origins of the same [First-Party Sets][31].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/8qaTUkcNI1wv0qh4U00g.png", alt="SameParty column", width="800", height="497" %}

Chromium issue: [1161427][32]

## Deprecated non-standard `fn.displayName` support {: #display-name }

Support for the non-standard `fn.displayName` has been deprecated. Use `fn.name` instead.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oXk5CGKAAPyJIQeecS0I.png", alt="Example usage of displayName", width="800", height="488" %}

Chrome has traditionally supported the non-standard `fn.displayName` property as a way for
developers to control debug names for functions that show up in `error.stack` and in DevTools stack
traces. In the example above, the **Call Stack** would previously show `noLongerSupport`.

Replace `fn.displayName` with the standard `fn.name`, which was made configurable (via
`Object.defineProperty`) in ECMAScript 2015 to replace the non-standard`fn.displayName` property.

Support for `fn.displayName` has been unreliable and not consistent across browser engines. It slows
down stack trace collection, a cost that developers always pay no matter whether they actually use
`fn.displayName` or not.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/aieojilTMlsewNdAaHHh.png", alt="Example usage of name", width="800", height="455" %}

Chromium issue: [1177685][33]

## Deprecation of `Don't show Chrome Data Saver warning` in the Settings menu {: #data-saver-warning }

The `Don't show Chrome Data Saver warning` setting is removed because [Chrome Data Saver has been
deprecated][34].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/d0T9rqp1ASln0kWXE41w.png", alt="Deprecated 'Don't show Chrome Data Saver warning' settings", width="800", height="473" %}

Chromium issue: [1056922][35]

## Experimental features {: #experimental }

### Automatic low-contrast issue reporting in the Issues tab {: #low-contrast }

{% Aside %}

To enable the experiment, check the **Enable automatic contrast issue reporting via the Issues
panel** checkbox under **Settings** > **Experiments**.

{% endAside %}

DevTools added experimental support for reporting contrast issues in the Issues tab automatically.

[Low-contrast text][36] is the most common automatically-detectable accessibility issue on the web.
Displaying these issues in the Issues tab helps developers discover these issues easier.

Open a page with low-contrast issues (e.g. this [demo][37]). Then, open the **Issues** tabs by
clicking on the [Issues count][38] button in the **Console** status bar to view the issues.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rZE5UWUXF4K9JCMA3oSF.png", alt="Automatic low-contrast issue reporting", width="800", height="520" %}

Chromium issue: [1155460][39]

### Full accessibility tree view in the Elements panel {: #accesibility-tree }

{% Aside %}

To enable the experiment, check the **Full accessibility tree view in Elements pane** checkbox under
**Settings** > **Experiments**.

{% endAside %}

You can now toggle to view the new and improved full accessibility tree view of a page.

The current [accessibility pane][40] provides a limited display of its nodes, only showing the
direct ancestor chain from the root node to the inspected node. The new accessibility tree view aims
to improve that and makes the accessibility tree more explorable, useful, and easier for developers
to use.

After enabling the experiment, a new button will show in the **Elements** panel, click to switch
between the existing DOM tree and the full accessibility tree.

Please note that this is an early-stage experiment. We plan to improve and expand the functionality
over time.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pkTyHQF0YfbgiE9IZufX.png", alt="Full accessibility tree view", width="800", height="535" %}

Chromium issue: [887173][41]

[1]: https://crbug.com/1166710
[2]: https://crbug.com/1175699
[3]: https://web.dev/vitals/
[4]: /docs/devtools/command-menu
[5]: https://web.dev/lcp/
[6]: https://web.dev/fid/
[7]: https://web.dev/cls/
[8]: https://crbug.com/1152089
[9]: https://crbug.com/1140516
[10]: /docs/android/trusted-web-activity/overview
[11]: #issue-count
[12]: https://youtu.be/QJlbMfW3jPc
[13]: https://crbug.com/1147479
[14]: https://crbug.com/1178530
[15]: https://web.dev/trust-tokens/
[16]: https://crbug.com/1126824
[17]: https://www.chromestatus.com/feature/5354410980933632
[18]: /docs/devtools/command-menu
[19]: https://crbug.com/1073887
[20]: https://web.dev/progressive-web-apps/
[21]: https://goo.gle/improved-pwa-offline-detection
[22]: https://web.dev/add-manifest/#screenshots
[23]: https://crbug.com/1146450
[24]: https://crbug.com/1169689
[25]: https://crbug.com/965802
[26]: https://crbug.com/1128885
[27]: https://crbug.com/1069425
[28]: https://crbug.com/1077657
[29]: https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md
[30]: https://crbug.com/1158827
[31]: https://github.com/privacycg/first-party-sets
[32]: https://crbug.com/1161427
[33]: https://crbug.com/1177685
[34]: https://blog.chromium.org/2019/04/data-saver-is-now-lite-mode.html
[35]: https://crbug.com/1056922
[36]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
[37]: https://jec.fyi/demo/cds-anchovy
[38]: #issue-count
[39]: https://crbug.com/1155460
[40]: /docs/devtools/accessibility/reference#pane
[41]: https://crbug.com/887173
