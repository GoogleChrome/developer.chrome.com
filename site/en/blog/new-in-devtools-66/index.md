---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 66)"
authors:
  - kaycebasques
date: 2018-02-26
#updated: YYYY-MM-DD
description: "Blackboxing in the Network panel, auto-adjust zooming in Device Mode, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3K94BKdNuYeQQpXJgwxF.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-66
---

New features and major changes coming to DevTools in Chrome 66 include:

- [Blackboxing in the **Network** panel][1]
- [Auto-adjust zooming in **Device Mode**][2]
- [Pretty-printing in the **Preview** and **Response** tabs][3]
- [Previewing HTML content in the **Preview** tab][4]
- [**Local Overrides** with styles inside of HTML][5]

{% Aside %}

**Note:** Check what version of Chrome you're running at `chrome://version`. If you're running an
earlier version, these features won't exist. If you're running a later version, these features may
have changed. Chrome auto-updates to a new major version about every 6 weeks.

{% endAside %}

Read on, or watch the video version of the release notes below.

{% YouTube id="eaYXFTJVewA" %}

## Blackboxing in the Network panel {: #blackboxing }

The **Initiator** column in the **Network** panel tells you why a resource was requested. For
example, if JavaScript causes an image to be fetched, the **Initiator** column shows you the line of
JavaScript code that caused the request.

{% Aside %}

**Note:** You can hide or show columns in the **Network** panel by right-clicking the table header.

{% endAside %}

Previously, if your framework wrapped network requests in a wrapper, the **Initiator** column
wouldn't be that helpful. All network requests pointed to the same line of wrapper code.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/8LJ6KpBZs1LYKTWzCO5f.png", alt="The Initiator column shows that all of the requests were initiated by line 2 of requests.js.", width="800", height="500" %}

**Figure 1**. The **Initiator** column shows that all of the requests were initiated by line 2 of
`requests.js`

What you really want in this scenario is to see the application code that causes the request. That's
now possible:

1.  Hover over the **Initiator** column. The call stack that caused the request appears in a pop-up.
2.  Right-click the call that you want to hide from the initiator results.
3.  Select **Blackbox script**. The **Initiator** column now hides any calls from the script that
    you blackboxed.

{% Img src="image/admin/hpgshbdiwKtYMcRsfVt9.png", alt="Blackboxing requests.js.", width="800", height="518" %}

**Figure 2**. Blackboxing `requests.js`

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/QwQvjkwMlSyLLdzQGZKC.png", alt="After blackboxing requests.js, the Initiator column now shows more helpful results.", width="800", height="500" %}

**Figure 3**. After blackboxing `requests.js`, the **Initiator** column now shows more helpful
results

Manage your blackboxed scripts from the **Blackboxing** tab in [Settings][6].

See [Ignore a script or pattern of scripts][7] to learn more about blackboxing.

## Pretty-printing in the Preview and Response tabs {: #pretty-printing }

The **Preview** tab in the **Network** panel now pretty-prints resources by default when it detects
that those resources have been minified.

{% Img src="image/admin/pGztOri2zTIkZm559MvP.png", alt="The Preview tab pretty-printing the contents of analytics.js by default.", width="800", height="527" %}

**Figure 4**. The **Preview** tab pretty-printing the contents of `analytics.js` by default

To view the unminified version of a resource, use the **Response** tab. You can also manually
pretty-print resources from the **Response** tab, via the new **Format** button.

{% Img src="image/admin/EvUzuxoqJEAd6US9bEzK.png", alt="Manually pretty-printing the contents of analytics.js via the Format button.", width="800", height="527" %}

**Figure 5**. Manually pretty-printing the contents of `analytics.js` via the **Format** button

## Previewing HTML content in the Preview tab {: #previews }

Previously, the **Preview** tab in the **Network** panel showed the code of an HTML resource in
certain situations, while rendering a preview of the HTML in others. The **Preview** tab now always
does a basic rendering of the HTML. It's not intended to be a full browser, so it may not display
HTML exactly as you expect. If you want to see the HTML code, click the **Response** tab, or
right-click a resource and select **Open in Sources panel**.

{% Img src="image/admin/sZcyshIjXIgfT064asGm.png", alt="Previewing HTML in the Preview tab.", width="800", height="547" %}

**Figure 6**. Previewing HTML in the **Preview** tab

## Auto-adjust zooming in Device Mode {: #auto-adjust }

When in [**Device Mode**][8], open the **Zoom** dropdown and select **Auto-adjust zoom** to
automatically resize the viewport whenever you change device orientation.

{% YouTube id="OCXQem0YaJM" %}

## Local Overrides now works with some styles defined in HTML {: #overrides }

Back when DevTools launched [**Local Overrides**][9] in Chrome 65, one limitation was that it
couldn't track changes to styles defined within HTML. For example, in **Figure 7** there's a style
rule in the `head` of the document that declares `font-weight: bold` for `h1` elements.

{% Img src="image/admin/N4V6uciEsD8KxEJflPZc.png", alt="An example of styles defined within HTML", width="800", height="486" %}

**Figure 7**. An example of styles defined within HTML

In Chrome 65, if you changed the `font-weight` declaration via the DevTools **Style** pane, **Local
Overrides** wouldn't track the change. In other words, on the next reload, the style would revert
back to `font-weight: bold`. But in Chrome 66, changes like this now persist across page loads.

{% Aside 'caution' %}

**Caution:** **Local Overrides** can track changes like this _so long as the style is defined in the
HTML document that was sent over the network_. If you have a script that dynamically adds styles to
an HTML document, **Local Overrides** still won't be able to detect those changes.

{% endAside %}

## Bonus tip: Blackbox framework scripts to make Event Listener Breakpoints more useful {: #tip }

{% Aside %}

**Note:** This section is not related to Chrome 66. It's just a bonus tip about an existing feature
that you may find useful.

{% endAside %}

Back when I created the [Get Started With Debugging JavaScript][10] video, some viewers commented
that event listener breakpoints aren't useful for apps built on top of frameworks, because the event
listeners are often wrapped in framework code. For example, in **Figure 8** I've set up a `click`
breakpoint in DevTools. When I click the button in the demo, DevTools automatically pauses in the
first line of listener code. In this case, it pauses in Vue.js's wrapper code on line 1802, which
isn't that helpful.

{% Img src="image/admin/R6aqGqlETYfPt229gX88.png", alt="The click breakpoint pauses in Vue.js' wrapper code.", width="800", height="486" %}

**Figure 8**. The `click` breakpoint pauses in Vue.js' wrapper code

Since the Vue.js script is in a separate file, I can blackbox that script from the **Call Stack**
pane in order to make this `click` breakpoint more useful.

{% Img src="image/admin/HthqwHAzXf5v61dwRZFh.png", alt="Blackboxing the Vue.js script from the Call Stack pane.", width="800", height="454" %}

**Figure 9**. Blackboxing the Vue.js script from the **Call Stack** pane

The next time I click the button and trigger the `click` breakpoint, it executes the Vue.js code
without pausing in it, and then pauses on the first line of code in my app's listener, which is
where I really wanted to pause all along.

{% Img src="image/admin/0UHBfrZykjGbEfFkrCwE.png", alt="The click breakpoint now pauses on the app's listener code.", width="800", height="486" %}

**Figure 10**. The `click` breakpoint now pauses on the app's listener code

[1]: #blackboxing
[2]: #auto-adjust
[3]: #pretty-printing
[4]: #previews
[5]: #overrides
[6]: /docs/devtools/customize/#settings
[7]: /docs/devtools/javascript/reference#blackbox
[8]: /docs/devtools/device-mode
[9]: /blog/new-in-devtools-65#overrides
[10]: https://youtu.be/H0XScE08hy8
[11]: https://www.google.com/chrome/browser/canary.html
[12]: /blog/new-in-devtools-59#coverage
[13]: /blog/new-in-devtools-59#screenshots
[14]: /blog/new-in-devtools-59#block-requests
[15]: /blog/new-in-devtools-59#async
[16]: /blog/new-in-devtools-59#command-menu
