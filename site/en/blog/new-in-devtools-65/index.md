---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 65)"
authors:
  - kaycebasques
date: 2018-01-17
#updated: YYYY-MM-DD
description: "Local Overrides, accessibility tools, performance and SEO audits, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CkUbVNFvO8lq77aAbawF.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-65
---

New features coming to DevTools in Chrome 65 include:

- [**Local Overrides**][1]
- [New accessibility tools][2]
- [The **Changes** tab][3]
- [New SEO and performance audits][4]
- [Multiple recordings in the **Performance** panel][5]
- [Reliable code stepping with workers and asynchronous code][6]

Read on, or watch the video version of these release notes, below.

{% YouTube id="D1pV7ermy6w" %}

{% Aside %}

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

{% endAside %}

## Local Overrides {: #overrides }

**Local Overrides** let you make changes in DevTools, and keep those changes across page loads.
Previously, any changes that you made in DevTools would be lost when you reloaded the page. **Local
Overrides** work for most file types, with a couple of exceptions. See [Limitations][7].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pPRYEcOzEloITwitsHRd.gif", alt="Persisting a CSS change across page loads with Local Overrides.", width="800", height="469" %}

**Figure 1**. Persisting a CSS change across page loads with **Local Overrides**

How it works:

- You specify a directory where DevTools should save changes.
- When you make changes in DevTools, DevTools saves a copy of the modified file to your directory.
- When you reload the page, DevTools serves the local, modified file, rather than the network
  resource.

To set up **Local Overrides**:

1.  Open the **Sources** panel.
2.  Open the **Overrides** tab.

    {% Img src="image/admin/KBYIoNu3MLcdTwVrF2of.png", alt="The Overrides tab", width="800", height="588" %}

    **Figure 2**. The **Overrides** tab

3.  Click **Setup Overrides**.
4.  Select which directory you want to save your changes to.
5.  At the top of your viewport, click **Allow** to give DevTools read and write access to the
    directory.
6.  Make your changes.

### Limitations {: #overrides-limitations }

- DevTools doesn't save changes made in the **DOM Tree** of the **Elements** panel. Edit HTML in the
  **Sources** panel instead.
- If you edit CSS in the **Styles** pane, and the source of that CSS is an HTML file, DevTools won't
  save the change. Edit the HTML file in the **Sources** panel instead.

### Related features {: #overrides-related }

- [Workspaces][8]. DevTools automatically maps network resources to a local repository. Whenever you
  make a change in DevTools, that change gets saved to your local repository, too.

## The Changes tab {: #changes }

Track changes that you make locally in DevTools via the new **Changes** tab.

{% Img src="image/admin/Sz85zGJr0pSZK0qmSLRI.png", alt="The Changes tab", width="800", height="651" %}

**Figure 3**. The **Changes** tab

## New accessibility tools {: #a11y }

Use the new **Accessibility** pane to inspect the accessibility properties of an element, and
inspect the contrast ratio of text elements in the **Color Picker** to ensure that they're
accessible to users with low-vision impairments or color-vision deficiencies.

### Accessibility pane {: #a11y-pane }

Use the **Accessibility** pane on the **Elements** panel to investigate the accessibility properties
of the currently-selected element.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9HZSgKaMWJ2YVNSeJGs4.png", alt="The Accessibility pane", width="800", height="601" %}

**Figure 4**. The **Accessibility** pane shows the ARIA attributes and computed properties for the
element that's currently selected in the **DOM Tree** on the **Elements** panel, as well as its
position in the accessibility tree

Check out Rob Dodson's A11ycast on labeling below to see the **Accessibility** pane in action.

{% YouTube id="8dCUzOiMRy4" %}

### Contrast ratio in the Color Picker {: #contrast }

The [Color Picker][9] now shows you the contrast ratio of text elements. Increasing the contrast
ratio of text elements makes your site more accessible to users with low-vision impairments or
color-vision deficiencies. See [Color and contrast][10] to learn more about how contrast ratio
affects accessibility.

Improving the color contrast of your text elements makes your site more usable for _all_ users. In
other words, if your text is grey with a white background, that's hard for anyone to read.

{% Img src="image/admin/YG7Bo8L4mFmHNZHOlQ5k.png", alt="Inspecting the contrast ratio of the highlighted H1 element.", width="800", height="508" %}

**Figure 5**. Inspecting the contrast ratio of the highlighted `h1` element

In **Figure 5**, the two checkmarks next to **4.61** means that this element meets the [enhanced
recommended contrast ratio (AAA)][11]. If it only had one checkmark, that would mean it met the
[minimum recommended contrast ratio (AA)][12].

Click **Show More** {% Img src="image/admin/XmkOAQRvFegERSyqg7ri.png", alt="Show More", width="16", height="10" %} to expand the **Contrast
Ratio** section. The white line in the **Color Spectrum** box represents the boundary between colors
that meet the recommended contrast ratio, and those that don't. For example, since the grey color in
**Figure 6** meets recommendations, that means that all of the colors below the white line also meet
recommendations.

{% Img src="image/admin/lUbK35fGHAwETU0JboBp.png", alt="The expanded Contrast Ratio section.", width="800", height="668" %}

**Figure 6**. The expanded **Contrast Ratio** section

#### Related features {: #contrast-related }

The **Audits** panel has an automated accessibility audit for ensuring that _every_ text element on
a page has a sufficient contrast ratio.

See [Run Lighthouse in Chrome DevTools][13], or watch the A11ycast below, to learn how to use the
**Audits** panel to test accessibility.

{% YouTube id="b0Q5Zp\_yKaU" %}

## New audits {: #audits }

Chrome 65 ships with a whole new category of SEO audits, and many new performance audits.

{% Aside %}

**Note:** The **Audits** panel is powered by [Lighthouse][14]. Chrome 64 runs Lighthouse version
2.5. Chrome 65 runs Lighthouse version 2.8. So this section is simply a summary of the Lighthouse
updates from 2.6, 2.7, and 2.8.

{% endAside %}

### New SEO audits {: #seo }

Ensuring that your pages pass each of the audits in the new **SEO** category may help improve your
search engine rankings.

{% Img src="image/admin/TUJ4tg2xSAF3xz53mkL6.png", alt="The new SEO category of audits.", width="800", height="926" %}

**Figure 7**. The new **SEO** category of audits

### New performance audits {: #performance }

Chrome 65 also ships with many new performance audits:

- JavaScript boot-up time is high
- Uses inefficient cache policy on static assets
- Avoids page redirects
- Document uses plugins
- Minify CSS
- Minify JavaScript

**Perf matters!** After Mynet improved their page load speed by 4X, users spent 43% more time on the
site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per article
pageview. [Learn more][15].

**Tip!** If you want to improve the load performance of your pages, but don't know where to start,
try the **Audits** panel. You give it a URL, and it gives you a detailed report on many different
ways you can improve that page. [Get started][16].

### Other updates {: #audits-other }

- [New, manual accessibility audits][17]
- [Updates to the WebP audit][18] to make it more inclusive of other next-generation image formats
- [A rehaul of the accessibility score][19]
- If an accessibility audit is not applicable for a page, that audit no longer counts towards the
  accessibility score
- Performance is now the top section in reports

## Reliable code stepping with workers and asynchronous code {: #stepping }

Chrome 65 brings updates to the **Step Into**
{% Img src="image/admin/M2uaA0NnXNpNicUiKtFg.png", alt="Step Into", width="18", height="26" %} button when stepping into
code that passes messages between threads, and asynchronous code. If you want the previous stepping
behavior, you can use the new **Step** {% Img src="image/admin/JhOtwtYfcNqWJ7iHHL29.png", alt="Step", width="26", height="19" %}
button, instead.

### Stepping into code that passes messages between threads {: #workers }

When you step into code that passes messages between threads, DevTools now shows you what happens in
each thread.

For example, the app in **Figure 8** passes a message between the main thread and the worker thread.
After stepping into the `postMessage()` call on the main thread, DevTools pauses in the `onmessage`
handler in the worker thread. The `onmessage` handler itself posts a message back to the main
thread. Stepping into _that_ call pauses DevTools back in the main thread.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yWJphKwL2YJvA9T8C1uo.gif", alt="Stepping into message-passing code in Chrome 65.", width="800", height="516" %}

**Figure 8**. Stepping into message-passing code in Chrome 65

When you stepped into code like this in earlier versions of Chrome, Chrome only showed you the
main-thread-side of the code, as you can see in **Figure 9**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/QQjOfRK20H2aX5zMj8So.gif", alt="Stepping into message-passing code in Chrome 63.", width="800", height="505" %}

**Figure 9**. Stepping into message-passing code in Chrome 63

### Stepping into asynchronous code {: #async }

When stepping into asynchronous code, DevTools now assumes that you want to pause in the the
asynchronous code that eventually runs.

For example, in **Figure 10** after stepping into `setTimeout()`, DevTools runs all of the code
leading up to that point behind the scenes, and then pauses in the function that's passed to
`setTimeout()`.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ScY08USz9qwwCH01YJpE.gif", alt="Stepping into asynchronous code in Chrome 65.", width="800", height="541" %}

**Figure 10**. Stepping into asynchronous code in Chrome 65

When you stepped into code like this in Chrome 63, DevTools paused in code as it chronologically
ran, as you can see in **Figure 11**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ScY08USz9qwwCH01YJpE.gif", alt="Stepping into asynchronous code in Chrome 63.", width="800", height="541" %}

**Figure 11**. Stepping into asynchronous code in Chrome 63

## Multiple recordings in the Performance panel {: #recordings }

The **Performance** panel now lets you temporarily save up to 5 recordings. The recordings are
deleted when you close your DevTools window. See [Get Started with Analyzing Runtime
Performance][20] to get comfortable with the **Performance** panel.

{% Img src="image/admin/FJl8iAdG706qJV74fjob.png", alt="Selecting between multiple recordings in the Performance panel.", width="800", height="712" %}

**Figure 12**. Selecting between multiple recordings in the **Performance** panel

## Bonus: Automate DevTools actions with Puppeteer 1.0 {: #puppeteer }

{% Aside %}

**Note:** This section isn't related to Chrome 65.

{% endAside %}

Version 1.0 of Puppeteer, a browser automation tool maintained by the Chrome DevTools team, is now
out. You can use Puppeteer to automate many tasks that were previously only available via DevTools,
such as capturing screenshots:

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();
```

It also has APIs for lots of generally useful automation tasks, such as generating PDFs:

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});
  await browser.close();
})();
```

See [Quick Start][21] to learn more.

You can also use Puppeteer to expose DevTools features while browsing without ever explicitly
opening DevTools. See [Using DevTools Features Without Opening DevTools][22] for an example.

[1]: #overrides
[2]: #a11y
[3]: #changes
[4]: #audits
[5]: #recordings
[6]: #stepping
[7]: #overrides-limitations
[8]: /blog/new-in-devtools-63#workspaces
[9]: /docs/devtools/css/reference#color-picker
[10]: https://developers.google.com/web/fundamentals/accessibility/accessible-styles#color_and_contrast
[11]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[12]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast
[13]: https://developers.google.com/web/tools/lighthouse#devtools
[14]: https://developers.google.com/web/tools/lighthouse
[15]: https://developers.google.com/web/showcase/2017/mynet
[16]: https://developers.google.com/web/tools/lighthouse#devtools
[17]: https://developers.google.com/web/updates/2018/01/lighthouse#a11y
[18]: https://developers.google.com/web/updates/2018/01/lighthouse#webp
[19]: https://developers.google.com/web/updates/2017/12/lighthouse#a11y
[20]: /docs/devtools/evaluate-performance
[21]: https://developers.google.com/web/tools/puppeteer/get-started
[22]: /blog/new-in-devtools-65-without-devtools
[23]: https://www.google.com/chrome/browser/canary.html
[24]: /blog/new-in-devtools-59#coverage
[25]: /blog/new-in-devtools-59#screenshots
[26]: /blog/new-in-devtools-59#block-requests
[27]: /blog/new-in-devtools-59#async
[28]: /blog/new-in-devtools-59#command-menu
