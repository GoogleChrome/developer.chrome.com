---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 83)"
authors:
  - kaycebasques
date: 2020-03-10
#updated: YYYY-MM-DD
description:
  "Emulate color vision deficiencies, emulate locales, COOP and COEP debugging, and lots more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZYa1YaBoE4bmPPGd1sN2.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-83
---

{% YouTube id="MLNERCykDPg" %}

## Emulate vision deficiencies {: #vision-deficiencies }

Open the [Rendering tab][1] and use the new **Emulate vision deficiencies** feature to get a better
idea of how people with different types of vision deficiencies experience your site.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4Q4dkh5YFfsKnz2F89t4.png", alt="Emulating blurred vision.", width="800", height="481" %}

Emulating blurred vision.

DevTools can emulate blurred vision and the following [types of color vision deficiencies][2]:

- Protanopia: the inability to perceive any red light.
- Deuteranopia: the inability to perceive any green light.
- Tritanopia: the inability to perceive any blue light.
- Achromatopsia: the inability to perceive any color except for shades of grey (extremely rare).

Less extreme versions of these color vision deficiencies exist, and in fact they are more common.
For example, _protanomaly_ is a reduced sensitivity to red light (as opposed to _protanopia_, which
is the complete inability to perceive red light). However, these "-omaly" vision deficiencies are
not as clearly defined: every person with such a vision deficiency is different and might see things
differently (being able to perceive more/less of the relevant colors).

By designing for the more extreme simulations in DevTools, your web apps are guaranteed to be
accessible to people with protanomaly, deuteranomaly, tritanomaly, and achromatomaly as well.

Send feedback to [Chromium issue #1003700][3].

## Emulate locales {: #locales }

You can now emulate locales by setting a location in **Sensors** > **Location**. [Open the **Command
Menu**][4] and type `Sensors` to access the **Sensors** tab. After performing these actions DevTools
modifies the current default locale, affecting the following:

- `Intl.*` APIs, e.g. `new Intl.NumberFormat().resolvedOptions().locale`
- other locale-aware JavaScript APIs such as `String.prototype.localeCompare` and
  `*.prototype.toLocaleString`, e.g. `123_456..toLocaleString()`
- DOM APIs such as `navigator.language` and `navigator.languages`
- the [`Accept-Language`][5] HTTP request header

{% Aside %}

**Note:** updates to `navigator.language` and `navigator.languages` are not visible immediately, but
only after the next navigation or page reload. Changes to the `Accept-Language` HTTP header are only
reflected for subsequent requests.

{% endAside %}

{% YouTube id="lZEFwACYPo0" %}

Check out [Locale-dependent code example][6] to try it yourself.

Send feedback to [Chromium issue #1051822][7].

## Cross-Origin Embedder Policy (COEP) debugging {: #COEP }

The Network panel now provides [Cross-Origin Embedder Policy][8] debugging information.

The **Status** column now provides a quick explanation of why a request was blocked as well as a
link to view that request's headers for further debugging:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NR5ijqUdPHunvoOBWWlC.png", alt="Blocked requests in the Status column", width="800", height="384" %}

The **Response Headers** section of the **Headers** tab provides more guidance on how to resolve the
issues:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yFJu74FPKJkn99nTK14j.png", alt="More guidance in the Response Headers section", width="800", height="438" %}

Send feedback to [Chromium issue #1051466][9].

## New icons for breakpoints, conditional breakpoints, and logpoints {: #debugging-icons }

The **Sources** panel has new icons for breakpoints, conditional breakpoints, and logpoints:

- [Breakpoints][10] 
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/bB8RsXECQym7qfO16kaj.png", alt="Breakpoint", width="100", height="100" %}
  are represented by red circles.
- [Conditional Breakpoints][11]
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ua2vgvlpL0lbMT7mOzgy.png", alt="Conditional Breakpoint", width="100", height="100" %}
  are represented by half-red half-white circles.
- [Logpoints][12]
  {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GU0U13igWpNgErv9aSod.png", alt="Logpoint", width="100", height="100" %}
  are represented by red circles with Console icons.

The motivation for the new icons was to make the UI more consistent with other GUI debugging tools
(which usually color breakpoints red) and to make it easier to distinguish between the 3 features at
a glance.

Send feedback to [Chromium issue #1041830][13].

## View network requests that set a specific cookie path {: #cookie-path }

Use the new `cookie-path` filter keyword in the **Network** panel to focus on the network requests
that set a specific [cookie path][14].

Check out [Filter requests by properties][15] to discover more special keywords like `cookie-path`.

## **Dock to left** from the Command Menu {: #dock-to-left }

Open the [Command Menu][16] and run the `Dock to left` command to move DevTools to the left of your
viewport.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Fxnb0smaHkiP5PrXKO76.png", alt="DevTools docked to the left of the viewport", width="800", height="481" %}

{% Aside %}

**Note:** DevTools has had the **Dock to left** feature for a long time but it was previously only
accessible from the [**Main Menu**][17]. The new feature in Chrome 83 is that you can now access
this feature from the Command Menu.

{% endAside %}

Send feedback to [Chromium issue #1011679][18].

## The `Settings` option in the **Main Menu** has moved {: #settings }

The option for opening [Settings][19] from the **Main Menu** can now be found under **More Tools**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/aR6qHi4byFMPYGPitlu0.png", alt="Main Menu > More Tools > Settings", width="800", height="468" %}

Send feedback to [Chromium issue #1050855][20].

## The **Audits** panel is now the **Lighthouse** panel {: #lighthouse }

The DevTools and Lighthouse teams frequently got feedback from web developers that they would hear
that it's possible to run [Lighthouse][21] from DevTools, but when they went to try it out they
couldn't find the "Lighthouse" panel, so the **Audits** panel is now the **Lighthouse** panel.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/IJz4ISkV6IoWnMjVjOwF.png", alt="The Lighthouse panel", width="800", height="828" %}

## Delete all Local Overrides in a folder {: #overrides }

After setting up [Local Overrides][22] you can now right-click a folder and select the new **Delete
all overrides** option to delete all Local Overrides in that folder.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MutXfOtMnvN3IKjSOb6q.png", alt="Delete all overrides", width="800", height="534" %}

Send feedback to [Chromium issue #1016501][23].

## Updated Long tasks UI {: #long-tasks }

A [Long Task][24] is JavaScript code that monopolizes the main thread for a long time, causing a web
page to freeze.

You've been able to [visualize Long Tasks in the Performance panel][25] for a while now, but in
Chrome 83 the Long Task visualization UI in the Performance panel has been updated. The Long Task
portion of a task is now colored with a striped red background.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zB1QLni239q7xxTYqUhP.png", alt="The new Long Task UI", width="800", height="568" %}

Send feedback to [Chromium issue #1054447][26].

## Maskable icon support in the Manifest pane {: #maskable-icons }

Android Oreo introduced adaptive icons, which display app icons in a variety of shapes across
different device models. [Maskable icons][27] are a new icon format that support adaptive icons,
which enable you to ensure that your [PWA][28] icon looks good on devices that support the maskable
icons standard.

Enable the new **Show only the minimum safe area for maskable icons** checkbox in the **Manifest**
pane to check that your maskable icon will look good on Android Oreo devices. Check out [Are my
current icons ready?][29] to learn more.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/IRDdXdCbPKD2wkKWdPlk.png", alt="The 'Show only the minimum safe area for maskable icons' checkbox", width="800", height="626" %}

{% Aside %}

**Note:** This feature launched in Chrome 81. We're covering it here in Chrome 83 because we forgot
to cover it in What's New In DevTools (Chrome 81).

{% endAside %}

[1]: /docs/devtools/evaluate-performance/reference#rendering
[2]: http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
[3]: https://crbug.com/1003700
[4]: /docs/devtools/command-menu
[5]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language
[6]: https://mathiasbynens.be/demo/locale
[7]: https://crbug.com/1051822
[8]:
  https://docs.google.com/document/d/1zDlfvfTJ_9e8Jdc8ehuV4zMEu9ySMCiTGMS9y0GU92k/edit#bookmark=id.uo6kivyh0ge2
[9]: https://crbug.com/1051466
[10]: /docs/devtools/javascript/breakpoints#loc
[11]: /docs/devtools/javascript/breakpoints#conditional-loc
[12]: /blog/new-in-devtools-73#logpoints
[13]: https://crbug.com/1041830
[14]: https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie#Directives
[15]: /docs/devtools/network/reference#filter-by-property
[16]: /docs/devtools/command-menu
[17]: /docs/devtools/customize/placement#menu
[18]: https://crbug.com/1011679
[19]: /docs/devtools/customize#settings
[20]: https://crbug.com/1050855
[21]: https://developers.google.com/web/tools/lighthouse
[22]: /blog/new-in-devtools-65#overrides
[23]: https://crbug.com/1016501
[24]: https://web.dev/long-tasks-devtools/#what-are-long-tasks
[25]:
  https://web.dev/long-tasks-devtools/#are-there-long-tasks-in-my-page-that-could-delay-interactivity
[26]: https://crbug.com/1054447
[27]: https://web.dev/maskable-icon/
[28]: https://web.dev/progressive-web-apps
[29]: https://web.dev/maskable-icon/#are-my-current-icons-ready

