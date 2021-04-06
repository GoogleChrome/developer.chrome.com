---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 89)"
authors:
  - jecelynyeen
date: 2021-01-19
updated: 2021-02-24
description:
  "Debugging support for Trusted Types violations, capture node screenshot beyond viewport, new
  Trust Tokens tab for network requests and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/brc7vpdKlH1gHEk9aJM6.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-89
---

{% Aside %}
Interested in helping improve DevTools? Sign up to participate in [Google User Research here][1].
{% endAside %}

{% YouTube id="msHeKmMEeHU" %}

{% YouTube id="VtaRYSBIbU4" %}

## Debugging support for Trusted Types violations {: #trusted-types }

### Breakpoint on Trusted Type violations {: #trusted-types-violations }

You can now set breakpoints and catch exceptions on Trusted Type Violations in the **Sources**
panel.

[Trusted Types][2] API helps you prevent DOM-based cross-site scripting vulnerabilities. Learn how
to write, review and maintain applications free of DOM XSS vulnerabilities with Trusted Types
[here][3].

In the **Sources** panel, open the **debugger** sidebar pane. Expand the **CSP Violation
Breakpoints** section and enable the **Trusted Type violations** checkbox to pause on the
exceptions. Try it yourself with [this demo page][4].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/n4ml9mus6jP2pl11HNeA.png", alt="Breakpoint on Trusted Type violations", width="800", height="647" %}

Chromium issue: [1142804][5]

### Link issue in the Sources panel to the Issues tab {: #trusted-type-link }

The **Sources** panel now shows a warning icon next to the line that violates Trusted Type. Hover on
it to preview the exception. Click on it to expand the **Issues** tab, it provides more details on
the exceptions and guidance on how to fix it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/re7PFta0SoSQXlvJt5AK.png", alt="Link issue in the Sources panel to the Issues tab", width="800", height="613" %}

Chromium issue: [1150883][6]

## Capture node screenshot beyond viewport {: #node-screenshot }

You can now capture node screenshots for a full node, including content below the fold. Previously,
the screenshot was cut off for content not visible in the viewport. The full-page screenshots are
precise now as well.

In the **Elements** panel, right click on an element and select **Capture node screenshot**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/0BdfMKAxWPSImRe0mkkA.png", alt="Capture node screenshot beyond viewport", width="800", height="486" %}

Chromium issue: [1003629][7]

## New Trust Tokens tab for network requests {: #trust-token }

Inspect the Trust Token network requests with the new **Trust Tokens** tab.

Trust Token is a new API to help combat fraud and distinguish bots from real humans, without passive
tracking. Learn how to [get started with Trust Tokens][8].

Further debugging support will come in the next releases.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/5ldrMvlmQ8iSnFPnV1jG.png", alt="New Trust Token tab for network requests", width="800", height="656" %}

Chromium issue: [1126824][9]

## Lighthouse 7 in the Lighthouse panel {: #lighthouse }

The **Lighthouse** panel is now running Lighthouse 7. Check out the [release notes][10] for a full
list of changes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/O2w1DjKGBOzjBx1gVZ2N.png", alt="Lighthouse 7 in the Lighthouse panel", width="800", height="535" %}

New audits in Lighthouse 7:

- **Preload Largest Contentful Paint (LCP) image**. Audits if the image used by the LCP element is
  preloaded in order to improve your LCP time.
- **Issues logged to the `Issues` panel**. Indicates a list of unresolved issues in the `Issues`
  panel.
- **Progressive Web Apps (PWA)**. The PWA Category changed fairly significantly.
- The **Installable** group is now powered entirely by the capability checks that enable Chrome's
  installable criteria. These are the same signals seen in the **Manifest pane**.

  - The "Registers a service worker…" audit moves to the **PWA Optimized** group, and the "Uses
    HTTPS" audit is now included as part of the key "installability requirements" audit.
  - The **Fast and reliable** group is removed. As the revamped "installability requirements" audit
    includes offline-capability checking, the "current page and start_url respond with 200 when
    offline" audit was removed. The "Page load is fast enough on mobile network" audit was removed
    too.

Chromium issue: [772558][11]

## Elements panel updates {: #elements-panel }

### Support forcing the CSS `:target` state {: #force-target }

You can now use DevTools to force and inspect the CSS `:target` state.

In the **Elements** panel, select an element and toggle the element state. Enable the `:target`
checkbox to force and inspect the styles.

Use the `:target` pseudo-class to style element when the hash in the URL and the id of an element
are the same. Check out [this demo][12] to try it yourself. This new DevTools feature lets you test
such styles without having to manually change the URL all the time.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SnKrCguBPha7VmjEchMZ.png", alt="forcing the CSS `:target` state", width="800", height="608" %}

Chromium issue: [1156628][13]

### New shortcut to duplicate element {: #duplicate-element }

Use the new **Duplicate element** shortcut to clone an element instantly.

Right click an element in the **Elements** panel, select **Duplicate element**. A new element will
be created under it.

Alternatively, you can duplicate element with keyboard shortcuts:

- Mac: `Shift` + `Option` + `⬇️`
- Window/ Linux: `Shift` + `Alt` + `⬇️`

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9HLBPzr6IYSvlcZmfU2m.png", alt="Duplicate element", width="800", height="486" %}

Chromium issues: [1150797][14], [1150797][15]

### Color pickers for custom CSS properties {: #color-picker }

The **Styles** pane now shows color pickers for custom CSS properties.

In addition, you can hold the `Shift` key and click on color picker to cycle through the RGBA, HSLA,
and Hex representations of the color value.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/LLhYxniQAoO9I0u4ZbqS.png", alt="Color pickers for custom CSS properties", width="800", height="325" %}

Chromium issue: [1147016][16]

### New shortcuts to copy CSS properties {: #copy-css }

You can now copy CSS properties quicker with a few new shortcuts.

In the **Elements** panel, select an element. Then, right-click on a CSS class or a CSS property in
the **Styles** pane to copy the value.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wxHEAyYa7grzbOu1MJZn.png", alt="New shortcuts to copy CSS properties", width="800", height="486" %}

Copy options for CSS class:

- **Copy selector**. Copy the current selector name.
- **Copy rule**. Copy the rule of the current selector.
- **Copy all declarations**: Copy all declarations under the current rule, including invalid and
  prefixed properties.

Copy options for CSS property:

- **Copy declaration**. Copy the declaration of the current line.
- **Copy property**. Copy the property of the current line.
- **Copy value**: Copy the value of the current line.

Chromium issue: [1152391][17]

## Cookies updates {: #cookies-updates }

### New option to show URL-decoded cookies {: #cookies-decoded }

You can now opt to view the URL-decoded cookies value in the **Cookies** pane.

Go to the **Application** panel and select the **Cookies** pane. Select any cookie on the list.
Enable the new **Show URL decoded** checkbox to view the decoded cookie.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pnOmLhiXbAJ5bstgSkAU.png", alt="Option to show URL-decoded cookies", width="800", height="425" %}

Chromium issue: [997625][18]

### Clear only visible cookies {: #clear-cookies }

The **Clear all cookies** button in the Cookies pane is now replaced by **Clear filtered cookies**
button.

In the **Application** panel > **Cookies** pane, enter text in the textbox to filter the cookies. In
our example here, we filter the list by "PREF". Click on the **Clear filtered cookies** button to
delete the visible cookies. Clear the filter text and you will see the other cookies remain in the
list. Previously, you only had the option to clear all cookies.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zAhaz751IjUxN1BGc3Tc.png", alt="Clear only visible cookies", width="800", height="425" %}

Chromium issue: [978059][19]

### New option to clear third-party cookies in the Storage pane {: #third-party-cookies }

When clearing the site data in the **Storage** pane, DevTools now clear only first-party cookies by
default. Enable the **including third-party cookies** to clear the third-party cookies as well.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/er8quEgmF213hP3VZttB.png", alt="Option to clear third-party cookies", width="800", height="560" %}

Chromium issue: [1012337][20]

## Edit User-Agent Client Hints for custom devices {: #ua-ch }

You can now edit User-Agent Client Hints for custom devices.

Go to **Settings** > **Devices** and click on **Add custom device...**. Expand the **User agent
client hints** section to edit the client hints.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/s2OkwDr8s63Bpafkxn5H.png", alt="Edit User-Agent Client Hints", width="800", height="654" %}

User-Agent Client Hints are an alternative to User-Agent string that enables developers to access
information about a user's browser in a privacy-preserving and ergonomic way. Learn more about
User-Agent Client Hints in [web.dev/user-agent-client-hints/][21].

Chromium issue: [1073909][22]

## Network panel updates {: #network-panel }

### Persist "record network log" setting {: #network-log }

DevTools now persist the "Record network log" setting. Previously, DevTools reset the user's choice
whenever a page reloads.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/fErbXLcGbIfdNM6gSBJa.png", alt="Record network log", width="781", height="506" %}

Chromium issue: [1122580][23]

### View WebTransport connections in the Network panel {: #webtransport }

Network panel now displays WebTransport connections.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zfiSENqbaEj3h3EC7k7Z.png", alt="WebTransport connections", width="800", height="548" %}

WebTransport is a new API offering low-latency, bidirectional, client-server messaging. Learn more
about its use cases, and how to give feedback about the future of the implementation in
[web.dev/webtransport/][24].

Chromium issue: [1152290][25]

### "Online" renamed to "No throttling" {: #no-throttling }

The network emulation option "Online" is now renamed to "No Throttling".

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vQGmNPetuiitvDExaVUk.png", alt="Record network log", width="781", height="506" %}

Chromium issue: [1028078][26]

## New copy options in the Console, Sources panel, and Styles pane {: #copy-sources-console }

### New shortcuts to copy object in the Console and Sources panel {: #copy-object }

You can now copy object values with the new shortcuts in the Console and Sources panel. This is
handy especially when you have a large object (e.g. a long array) to copy.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SY5Q0ZWNEMw3D6I92yuU.png", alt="Copy object in the Console", width="800", height="495" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/EZq4ebF3ODAW0SKAozCN.png", alt="Copy object in the Sources panel", width="800", height="442" %}

Chromium issues: [1149859][27], [1148353][28]

### New shortcuts to copy file name in the Sources panel and Styles pane {: #copy-file-name }

You can now copy file name by right clicking on:

- a file in the **Sources** panel, or
- the file name in the **Styles pane** in the **Elements** panel

Select **Copy file name** from the context menu to copy the file name.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mpC0UTlCe9TqEpixFMSO.png", alt="Copy file name in the Sources panel", width="800", height="458" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/xeT5KVBN2o93vcvaRY0F.png", alt="Copy file name in the Styles pane", width="800", height="458" %}

Chromium issue: [1155120][29]

## Frame details view updates {: #frame-details }

### New Service Workers information in the Frame details view {: #sw }

DevTools now displays dedicated service workers under the frame which creates them.

In the **Application** panel, expand a frame with service workers, then select a service worker
under the **Service Workers** tree to view the details.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/meaIcn7vhs70V7itXyzD.png", alt="Service Workers information in the Frame details view", width="800", height="535" %}

Chromium issue: [1122507][30]

### Measure Memory information in the Frame details view {: #measure-memory }

The `performance.measureMemory()` API status is now displayed under the **API availability**
section.

The new `performance.measureMemory()` API estimates the memory usage of the entire web page. Learn
how to monitor your web page's total memory usage with this new API in [this article][31].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/U8l8pJWqcmLTBbrIEZK7.png", alt="Measure Memory", width="800", height="535" %}

Chromium issue: [1139899][32]

## Provide feedback from the Issues tab {: #issues-feedback }

If you ever want to improve an issue message, go to the **Issues** tab from the **Console** or
**More Settings** > **More tools** > **Issues** > to open the **Issues** tab. Expand an issue
message, and click on the **Is the issue message helpful to you?**, then you can provide feedback in
the pop up.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1mHpJG1ZJx1BIeujytHZ.png", alt="Issue feedback link", width="800", height="484" %}

## Dropped frames in the Performance panel {: #dropped-frames }

When [analyzing load performance in the Performance panel][33], the **Frames** section now marks
dropped frames as red. Hover on it to find out the frame rate.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/I8t2Qhtdq1GGsBD5qUtI.png", alt="Dropped frames", width="800", height="486" %}

Chromium issue: [1075865][34]

## Emulate foldable and dual-screen in Device Mode {: #dual-screen }

You can now emulate dual-screen and foldable devices in DevTools.

After [enabling the Device Toolbar][35], select one of these devices: **Surface Duo** or **Samsung
Galaxy Fold**.

Click on the new span icon to toggle between single-screen or folded and dual-screen or unfolded
postures.

You can also enable the **Experimental Web Platform features** to access the new CSS media
`screen-spanning` feature and JavaScript `getWindowSegments` API. The experimental icon displays the
state of the **Experimental Web Platform features** flag. The icon is highlighted when the flag is
turned on. Navigate to `chrome://flags` and toggle the flag.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/l9IMKxmIqrFWujrAlMYH.png", alt="Emulate dual-screen", width="800", height="593" %}

Chromium issue: [1054281][36]

## Experimental features {: #experimental_features }

### Automate browser testing with Puppeteer Recorder {: #record }

{% Aside %}

To enable the experiment, check the **Recorder** checkbox under **Settings** > **Experiments**.

{% endAside %}

DevTools can now generate [Puppeteer][37] scripts based on your interaction with the browser, making
it easier for you to automate browser testing. Puppeteer is a Node.js library which provides a
high-level API to control Chrome or Chromium over the [DevTools Protocol][38].

Go to [this demo page][39]. Open the **Sources** panel in DevTools. Select the **Recording** tab on
the left pane. Add a new recording and name the file (e.g. test01.js).

Click on the **Record** button at the bottom to start recording the interaction. Try to fill in the
on-screen form. Observe that Puppeteer commands are appended to the file accordingly. Click on the
**Record** button again to stop the recording.

To run the script, follow the [Getting started guide][40] in Puppeteer official site.

Please note that this is an early-stage experiment. We plan to improve and expand the Recorder
functionality over time.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Zc9OSaUw36vrDYsXLgnn.png", alt="Puppeteer Recorder", width="800", height="504" %}

Chromium issue: [1144127][41]

### Font editor in the Styles pane {: #font }

{% Aside %}

To enable the experiment, check the **Enable new Font Editor tools within Styles pane** checkbox
under **Settings** > **Experiments**.

{% endAside %}

The new Font Editor is a popover editor in the **Styles pane** for font related properties to help
you find the perfect typography for your webpage.

The popover provides a clean UI to dynamically manipulate typography with a series of intuitive
input types.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Pu60VDlqxVDDQYYXbe8Q.png", alt="Font editor in the Styles pane", width="800", height="486" %}

Chromium issue: [1093229][42]

### CSS flexbox debugging tools {: #flexbox }

{% Aside %}

To enable the experiment, check the **Enable CSS Flexbox debugging features** checkbox under
**Settings** > **Experiments**.

{% endAside %}

DevTools added experimental support for [flexbox debugging since last release][43].

DevTools now draws a guiding line to help you better visualize the CSS `align-items` property. The
CSS `gap` property is supported as well. In our example here, we have CSS `gap: 12px;`. Notice the
hatching pattern for each gap.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/brHBni7Gr96jMSjRc1mb.png", alt="Flexbox", width="800", height="671" %}

Chromium issue: [1139949][44]

### New CSP Violations tab {: #csp }

{% Aside %}

To enable the experiment, check the **Show CSP Violations view** checkbox under **Settings** >
**Experiments**.

{% endAside %}

View all Content Security Policy (CSP) violations at a glance in the new **CSP Violations** tab.
This new tab is an experiment that should make it easier to work with web pages with a large amount
of CSP and Trusted Type violations.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/xmTnAFhWeCA9FryrRbpa.png", alt="CSP Violations tab", width="800", height="517" %}

Chromium issue: [1137837][45]

### New color contrast calculation - Advanced Perceptual Contrast Algorithm (APCA) {: #apca }

{% Aside %}

To enable the experiment, check the **Enable new Advanced Perceptual Contrast Algorithm (APCA)
replacing previous contrast ratio and AA/AAA guidelines** checkbox under **Settings** >
**Experiments**.

{% endAside %}

The [Advanced Perceptual Contrast Algorithm (APCA)][46] is replacing the [AA][47]/[AAA][48]
guidelines contrast ratio in the [Color Picker][49].

APCA is a new way to compute contrast based on modern research on color perception. Compared to
AA/AAA guidelines, APCA is more context-dependent. The contrast is calculated based on the text's
spatial properties (font weight & size), color (perceived lightness difference between text and
background), and context (ambient light, surroundings, intended purpose of the text).

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hjvKOnOw41pDjkOsyW1E.png", alt="APCA in Color Picker", width="800", height="543" %}

Chromium issue: [1121900][50]

[1]:
  https://google.qualtrics.com/jfe/form/SV_9YbKj35IGoGsDBj?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXFm430458
[2]: https://github.com/w3c/webappsec-trusted-types
[3]: https://web.dev/trusted-types/
[4]: https://tt-enforced.glitch.me/
[5]: https://crbug.com/1142804
[6]: https://crbug.com/1150883
[7]: https://crbug.com/1003629
[8]: https://web.dev/trust-tokens/
[9]: https://crbug.com/1126824
[10]: https://github.com/GoogleChrome/lighthouse/releases/tag/v7.0.0
[11]: https://crbug.com/772558
[12]: https://jec.fyi/demo/css-target#section-2
[13]: https://crbug.com/1156628
[14]: https://crbug.com/1150797
[15]: https://crbug.com/1150797
[16]: https://crbug.com/1147016
[17]: https://crbug.com/1152391
[18]: https://crbug.com/997625
[19]: https://crbug.com/978059
[20]: https://crbug.com/1012337
[21]: https://web.dev/user-agent-client-hints/
[22]: https://crbug.com/1073909
[23]: https://crbug.com/1122580
[24]: https://web.dev/webtransport/
[25]: https://crbug.com/1152290
[26]: https://crbug.com/1028078
[27]: https://crbug.com/1149859
[28]: https://crbug.com/1148353
[29]: https://crbug.com/1155120
[30]: https://crbug.com/1122507
[31]: https://web.dev/monitor-total-page-memory-usage
[32]: https://crbug.com/1139899
[33]: /docs/devtools/evaluate-performance/reference#record-load
[34]: https://crbug.com/1075865
[35]: /docs/devtools/device-mode#viewport
[36]: https://crbug.com/1054281
[37]: https://pptr.dev/
[38]: https://chromedevtools.github.io/devtools-protocol/
[39]: https://jec.fyi/demo/recorder
[40]: https://pptr.dev/
[41]: https://crbug.com/1144127
[42]: https://crbug.com/1093229
[43]: /blog/new-in-devtools-88#flexbox
[44]: https://crbug.com/1139949
[45]: https://crbug.com/1137837
[46]: https://w3c.github.io/silver/guidelines/methods/Method-font-characteristic-contrast.html
[47]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum
[48]: https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced
[49]: /docs/devtools/accessibility/reference#contrast
[50]: https://crbug.com/1121900
