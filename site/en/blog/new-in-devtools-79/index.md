---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 79)"
authors:
  - kaycebasques
date: 2019-10-15
#updated: YYYY-MM-DD
description:
  "Debug why cookies were blocked, simulate prefers-color-scheme: dark, code coverage
  updates, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VpChegha4JnMfgnkLChs.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-79
---

## New features for cookies {: #cookies }

### Debug why a cookie was blocked {: #blockedcookies }

After recording network activity, select a network resource and then navigate to the updated
**Cookies** tab to understand why that resource's request or response cookies were blocked. See
[Changes to the default behavior without SameSite][1] to understand why you might be seeing more
blocked cookies in Chrome 76 and later.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/I8l1Wb6XJovxlxygGcQz.png", alt="The Cookies tab.", width="800", height="618" %}

The **Cookies** tab.

- Yellow **Request Cookies** were not sent over the wire. These are hidden by default. Click **show
  filtered out request cookies** to show them.
- Yellow **Response Cookies** were sent over the wire but not stored.
- Hover over **More Information**
  ![info](https://developers.google.com/web/updates/images/2019/10/info.png) to learn why a cookie
  was blocked.
- Most of the data in the **Request Cookies** and **Response Cookies** tables comes from the
  resource's HTTP headers. The **Domain**, **Path**, and **Expires/Max-Age** data comes from the
  [Chrome DevTools Protocol][2].

Chromium issues [#856777][3], [#993843][4]

### View cookie values {: #cookiepreviews }

Click a row in the [Cookies pane][5] to view the value of that cookie.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZDLwhWKNzfEXhFDIM4qO.png", alt="Viewing the value of a cookie.", width="800", height="324" %}

Viewing the value of a cookie.

{% Aside %}

**Note:** The main difference between the Cookies tab in the Network panel and the Cookies pane in
the Application panel is that the Cookies pane in the Application panel lets you edit and delete
cookies.

{% endAside %}

Chromium issue [#462370][6]

## Simulate different prefers-color-scheme and prefers-reduced-motion preferences {: #userpreferences }

The [prefers-color-scheme][7] media query lets you match your site's style to your user's
preferences. For example, if the `prefers-color-scheme: dark` media query is true, it means that
your user has set their operating system to dark mode and prefers dark mode UIs.

Open the [Command Menu][8], run the **Show Rendering** command, and then set the **Emulate CSS media
feature prefers-color-scheme** dropdown to debug your `prefers-color-scheme: dark` and
`prefers-color-scheme: light` styles.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZLTfvieg3K4jUnt9GqOh.png", alt="prefers-color-scheme: dark", width="800", height="372" %}

When `prefers-color-scheme: dark` is set (middle box) the Styles pane (right box) shows the CSS that
gets applied when that media query is true and the viewport shows the dark mode styles (left box).

You can also simulate `prefers-reduced-motion: reduce` using the **Emulate CSS media feature
prefers-reduced-motion** dropdown next to the **Emulate CSS media feature prefers-color-scheme**
dropdown.

Chromium issue [#1004246][9]

## Timezone emulation {: #timezone }

The Sensors tab now lets you not only [override geolocation][10], but also emulate arbitrary
timezones and test the impact on your web apps. Perhaps surprisingly, this new feature improves the
reliability of geolocation emulation as well: previously, web apps could detect location spoofing by
matching the location against the user's local timezone. Now that geolocation and timezone emulation
are coupled, this category of mismatches is eliminated.

## Code coverage updates {: #coverage }

The [Coverage tab][11] can help you [find unused JavaScript and CSS][12].

The Coverage tab now uses new colors to represent used and unused code. This color combination is
proven to be more accessible for people with color vision deficiencies. The red bar on the left
represents unused code, and the bluish bar on the right represents used code.

The new coverage **type filter** text box lets you filter for coverage information by its type:
display only JavaScript coverage, only CSS, or display all types of coverage.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Pzd50LvrnFeWfqBKpG8B.png", alt="The Coverage tab.", width="800", height="437" %}

The Coverage tab.

The Sources panel displays code coverage data when it is available. Clicking the red or bluish marks
next to the line number opens the Coverage tab and highlights the file.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5D3z80VU7dw3efoCgAkn.png", alt="Coverage data in the Sources panel.", width="800", height="611" %}

Coverage data in the Sources panel. Line 8 is an example of unused code. Line 11 is an example of
used code.

Chromium issues [#1003671][13], [#1004185][14]

## Debug why a network resource was requested {: #initiator }

After recording network activity, select a network resource and then navigate to the **Initiator**
tab to understand why the resource was requested. The **Request call stack** section describes the
JavaScript call stack leading up to the network request.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pTGHyz9hMoyHpSDG6791.png", alt="The Initiator tab.", width="800", height="491" %}

The **Initiator** tab.

{% Aside %}

**Note:** You can also access this data by hovering over the **Initiator** column in the Network
Log. We added the **Initiator** tab because it's more accessible.

{% endAside %}

Chromium issues [963183][15], [842488][16]

## Console and Sources panels respect indentation preferences again {: #indentation }

For a long time DevTools has had a setting to customize your indentation preference to 2 spaces, 4
spaces, 8 spaces, or tabs. Recently the setting was essentially useless because the Console and
Sources panels were ignoring the setting. This bug is now fixed.

Go to [**Settings**][17] > **Preferences** > **Sources** > **Default Indentation** to set your
preference.

Chromium issue [#977394][18]

## New shortcuts for cursor navigation {: #console }

Press Control+P in the Console or Sources panels to move your cursor to the line above. Press
Control+N to move your cursor to the line below.

Chromium issue [#983874][19]

[1]: https://web.dev/samesite-cookies-explained#changes-to-the-default-behavior-without-samesite
[2]: https://chromedevtools.github.io/devtools-protocol/
[3]: https://crbug.com/856777
[4]: https://crbug.com/993843
[5]: /docs/devtools/storage/cookies
[6]: https://crbug.com/462370
[7]: https://web.dev/prefers-color-scheme
[8]: /docs/devtools/command-menu
[9]: https://crbug.com/1004246
[10]: /docs/devtools/device-mode/geolocation
[11]: /docs/devtools/coverage
[12]: https://web.dev/remove-unused-code/
[13]: https://crbug.com/1003671
[14]: https://crbug.com/1004185
[15]: https://crbug.com/963183
[16]: https://crbug.com/842488
[17]: /docs/devtools/customize#settings
[18]: https://crbug.com/977394
[19]: https://crbug.com/983874
