---
layout: "layouts/doc-post.njk"
title: "Overview"
date: 2016-03-28
#updated: YYYY-MM-DD
description: "Get started with Google Chrome's built-in web developer tools."
---

Chrome DevTools is a set of web developer tools built directly into the [Google Chrome][1] browser.
DevTools can help you edit pages on-the-fly and diagnose problems quickly, which ultimately helps
you build better websites, faster.

{% YouTube id="VYyQv0CSZOE" %}

Check out the video for live demonstrations of core DevTools workflows, including debugging CSS,
prototyping CSS, debugging JavaScript, and analyzing load performance.

## Open DevTools {: #open }

There are many ways to open DevTools, because different users want quick access to different parts
of the DevTools UI.

- When you want to work with the DOM or CSS, right-click an element on the page and select
  **Inspect** to jump into the **Elements** panel. Or press Command+Option+C (Mac) or
  Control+Shift+C (Windows, Linux, Chrome OS).
- When you want to see logged messages or run JavaScript, press Command+Option+J (Mac) or
  Control+Shift+J (Windows, Linux, Chrome OS) to jump straight into the **Console** panel.

See [Open Chrome DevTools][2] for more details and workflows.

## Get started {: #start }

If you're a more experienced web developer, here are the recommended starting points for learning
how DevTools can improve your productivity:

- [View and Change the DOM][3]
- [View and Change a Page's Styles (CSS)][4]
- [Debug JavaScript][5]
- [View Messages and Run JavaScript in the Console][6]
- [Optimize Website Speed][7]
- [Inspect Network Activity][8]

## Discover DevTools {: #discover }

The DevTools UI can be a little overwhelming... there are so many tabs! But, if you take some time
to get familiar with each tab to understand what's possible, you may discover that DevTools can
seriously boost your productivity.

{% Aside %}

**Note:** In the DevTools docs, the top-level tabs are called panels.

{% endAside %}

### Device Mode {: #device-mode }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KCl7BybVtFjmOigO56Si.png", alt="Device Mode", width="800", height="613" %}

Simulate mobile devices.

- [Device Mode][9]
- [Test Responsive and Device-specific Viewports][10]
- [Emulate Sensors: Geolocation & Accelerometer][11]

### Elements panel {: #elements }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/UjVAPTnFGxLEc5RLDwBy.png", alt="Elements Panel", width="800", height="609" %}

View and change the DOM and CSS.

- [Get Started With Viewing And Changing The DOM][12]
- [Get Started With Viewing And Changing CSS][13]
- [Inspect and Tweak Your Pages][14]
- [Edit Styles][15]
- [Edit the DOM][16]
- [Inspect Animations][17]
- [Find Unused CSS][18]

### Console panel {: #console }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hlgSxlGaLKLeQ45nGwUC.png", alt="Console Panel", width="800", height="469" %}

View messages and run JavaScript from the Console.

- [Get Started With The Console][19]
- [Using the Console][20]
- [Interact from Command Line][21]
- [Console API Reference][22]

### Sources panel {: #sources }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tYPZahEdu0RMGFFcCvyp.png", alt="Sources Panel", width="800", height="655" %}

Debug JavaScript, persist changes made in DevTools across page reloads, save and run snippets of
JavaScript, and save changes that you make in DevTools to disk.

- [Get Started With Debugging JavaScript][23]
- [Pause Your Code With Breakpoints][24]
- [Save Changes to Disk with Workspaces][25]
- [Run Snippets Of Code From Any Page][26]
- [JavaScript Debugging Reference][27]
- [Persist Changes Across Page Reloads with Local Overrides][28]
- [Find Unused JavaScript][29]

### Network panel {: #network }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/XE91VMkc9x1jdMQR1Iep.png", alt="Network Panel", width="800", height="649" %}

View and debug network activity.

- [Get Started][30]
- [Network Issues Guide][31]
- [Network Panel Reference][32]

### Performance panel {: #performance }

{% Aside %}

**Note:** In Chrome 58 the Timeline panel was renamed to the Performance panel.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nCVPdzEUA2XIY5txAG1G.png", alt="Timeline Panel", width="800", height="649" %}

Find ways to improve load and runtime performance.

- [Optimize Website Speed][33]
- [Get Started With Analyzing Runtime Performance][34]
- [Performance Analysis Reference][35]
- [Analyze runtime performance][36]
- [Diagnose Forced Synchronous Layouts][37]

### Memory panel {: #memory }

{% Aside %}

**Note:** In Chrome 58 the Profiles panel was renamed to the Memory panel.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oR8gZtwxxhRLj77xYsWd.png", alt="Profiles Panel", width="800", height="655" %}

- [Fix Memory Problems][38]
- [JavaScript CPU Profiler][39]

### Application panel {: #application }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zVZBef8kCIP6uEm9em9y.png", alt="Application Panel", width="800", height="500" %}

Inspect all resources that are loaded, including IndexedDB or Web SQL databases, local and session
storage, cookies, Application Cache, images, fonts, and stylesheets.

- [Debug Progressive Web Apps][40]
- [Inspect and Manage Storage, Databases, and Caches][41]
- [Inspect and Delete Cookies][42]
- [Inspect Resources][43]

### Security panel {: #security }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wB3jgziVHoF13hYf8Yi1.png", alt="Security Panel", width="800", height="573" %}

Debug mixed content issues, certificate problems, and more.

- [Understand Security Issues][44]

## Community {: #community }

File bug reports and feature requests in Crbug, which is the engineering team's bug tracker.

[Crbug][45]

If you want to alert us to a bug or feature request but don't have much time, you're welcome to send
a tweet to @ChromeDevTools. We reply and send announcements from the account regularly.

[Twitter][46]

For help with using DevTools, Stack Overflow is the best channel.

[Stack Overflow][47]

To file bugs or feature requests on the DevTools docs, open a GitHub issue on the Web Fundamentals
repository.

[Docs Issues][48]

DevTools also has a Slack channel, but the team doesn't monitor it consistently.

[Slack][49]

[1]: https://www.google.com/chrome/
[2]: /docs/devtools/open
[3]: /docs/devtools/dom
[4]: /docs/devtools/css
[5]: /docs/devtools/javascript
[6]: /docs/devtools/console/get-started
[7]: /docs/devtools/speed/get-started
[8]: /docs/devtools/network
[9]: /docs/devtools/device-mode
[10]: /docs/devtools/device-mode/emulate-mobile-viewports
[11]: /docs/devtools/device-mode/device-input-and-sensors
[12]: /docs/devtools/dom
[13]: /docs/devtools/css
[14]: /docs/devtools/inspect-styles
[15]: /docs/devtools/inspect-styles/edit-styles
[16]: /docs/devtools/inspect-styles/edit-dom
[17]: /docs/devtools/inspect-styles/animations
[18]: /docs/devtools/coverage
[19]: /docs/devtools/console/get-started
[20]: /docs/devtools/console
[21]: /docs/devtools/console/command-line-reference
[22]: /docs/devtools/console/console-reference
[23]: /docs/devtools/javascript
[24]: /docs/devtools/javascript/breakpoints
[25]: /web/tools/setup/setup-workflow
[26]: /docs/devtools/snippets
[27]: /docs/devtools/javascript/reference
[28]: /blog/new-in-devtools-65#overrides
[29]: /docs/devtools/coverage
[30]: /docs/devtools/network
[31]: /docs/devtools/network/issues
[32]: /docs/devtools/network/reference
[33]: /docs/devtools/speed/get-started
[34]: /docs/devtools/evaluate-performance
[35]: /docs/devtools/evaluate-performance/reference
[36]: /docs/devtools/rendering-tools
[37]: /docs/devtools/rendering-tools/forced-synchronous-layouts
[38]: /docs/devtools/memory-problems
[39]: /docs/devtools/rendering-tools/js-execution
[40]: /docs/devtools/progressive-web-apps
[41]: /docs/devtools/manage-data/local-storage
[42]: /docs/devtools/manage-data/cookies
[43]: /docs/devtools/manage-data/page-resources
[44]: /docs/devtools/security
[45]: https://crbug.com/new
[46]: https://twitter.com/ChromeDevTools
[47]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools
[48]: https://github.com/google/webfundamentals/issues/new
[49]: https://chromiumdev.slack.com/messages/devtools/
