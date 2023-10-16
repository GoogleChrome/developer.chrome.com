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
  **Inspect** to jump into the **Elements** panel. Or press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>C</kbd> (Mac) or
  <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux, ChromeOS).
- When you want to see logged messages or run JavaScript, press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
  <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, ChromesOS) to jump straight into the **Console** panel.

See [Open Chrome DevTools][2] for more details and workflows.

## Get started {: #start }

If you're a more experienced web developer, here are the recommended starting points for learning
how DevTools can improve your productivity:

- [View and change the DOM][3]
- [View and change CSS][4]
- [Debug JavaScript][5]
- [View messages and run JavaScript in the Console][6]
- [Optimize website speed][7]
- [Inspect network activity][8]

## Discover DevTools {: #discover }

The DevTools UI can be a little overwhelming... there are so many tabs! But, if you take some time
to get familiar with each tab to understand what's possible, you may discover that DevTools can
seriously boost your productivity.

{% Aside %}

**Note:** In the DevTools docs, the top-level tabs are called panels.

{% endAside %}

### Device Mode {: #device-mode }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/roZeihCLy8b7qwT6HY4G.png", alt="Device mode turned on in viewport.", width="800", height="625" %}

Simulate mobile devices.

- [Device mode][9]
- [Emulate device sensors][11]

### Elements panel {: #elements }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wSHhyk4ReCEtXESW4SIl.png", alt="Elements panel.", width="800", height="490" %}

View and change the DOM and CSS.

- [Get started with viewing and changing the DOM][12]
- [Get started with viewing and changing CSS][13]
- [Edit CSS][15]
- [Edit the DOM][16]
- [Find invalid, overridden, inactive, and other CSS][51]
- [Identify potential CSS improvements][53]
- [Emulate light/dark themes, contrast, and other CSS media features][52]
- [Find unused CSS][18]
- [Inspect animations][17]

### Console panel {: #console }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SvFMhX9k5z5f9oIfgq3V.png", alt="Console panel.", width="800", height="560" %}

View messages and run JavaScript from the Console.

- [Get started with the Console][19]
- [Console Utilities API reference][21]
- [Console API reference][22]

### Sources panel {: #sources }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/asZUgjzzWVOOt4APCCBb.png", alt="Sources panel.", width="800", height="559" %}

Debug JavaScript, persist changes made in DevTools across page reloads, save and run snippets of
JavaScript, and save changes that you make in DevTools to local sources.

- [Get started with debugging JavaScript][23]
- [Pause your code with breakpoints][24]
- [Edit and save files in a workspace][25]
- [Run snippets of JavaScript][26]
- [JavaScript debugging reference][27]
- [Override web content and HTTP response headers locally][28]

### Network panel {: #network }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QxdsutNioCfOjBzf9IfD.png", alt="Network panel.", width="800", height="657" %}

View and debug network activity.

- [Inspect network activity][30]
- [Network features reference][32]
- [View page resources][43]

### Recorder panel {: #recorder }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XKjlKjhuoccuFPCQqQ05.png", alt="Recorder panel.", width="800", height="606" %}

Record, replay, and measure user flows.

- [Record, replay, and measure user flows][54] 
- [Customize the Recorder with extensions][55]
- [Recorder features reference][56]

### Performance panel {: #performance }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8WrcYMjztXXwvgPF8UUB.png", alt="Performance panel.", width="800", height="693" %}

Find ways to improve load and runtime performance.

- [Optimize website speed][33]
- [Analyze runtime performance][34]
- [Performance features reference][35]

### Memory panel {: #memory }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/e1Ij43yPpTlhmRrlab9h.png", alt="Memory panel.", width="800", height="562" %}

Find and fix memory issues that affect page performance, for example, memory leaks.

- [Fix memory problems][38]

### Application panel {: #application }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Mt5cwUg90P4CkF8i3w3V.png", alt="The Application panel with the Service workers section opened.", width="800", height="630" %}

Inspect all resources that are loaded, including IndexedDB or Web SQL databases, local and session
storage, cookies, Application Cache, images, fonts, and stylesheets.

- [Debug Progressive Web Apps][40]
- [View and edit local storage][41]
- [View, add, edit, and delete cookies][42]
- [View origin trial information][50]

### Security panel {: #security }

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/pmyoJrTpfD8s1vA3uEiR.png", alt="Security panel.", width="800", height="562" %}

Debug mixed content issues, certificate problems, and more.

- [Understand security issues][44]

## Community {: #community }

File bug reports and feature requests in Crbug, which is the engineering team's bug tracker.

[Crbug][45]

If you want to alert us to a bug or feature request but don't have much time, you're welcome to send
a tweet to @ChromeDevTools. We reply and send announcements from the account regularly.

[Twitter][46]

For help with using DevTools, Stack Overflow is the best channel.

[Stack Overflow][47]

To file bugs or feature requests on the DevTools docs, open a GitHub issue.

[Docs Issues][48]

DevTools also has a Slack channel, but the team doesn't monitor it consistently.

[Slack][49]

[1]: https://www.google.com/chrome/
[2]: /docs/devtools/open
[3]: /docs/devtools/dom
[4]: /docs/devtools/css
[5]: /docs/devtools/javascript
[6]: /docs/devtools/console
[7]: /docs/devtools/speed/get-started
[8]: /docs/devtools/network
[9]: /docs/devtools/device-mode
[11]: /docs/devtools/sensors/
[12]: /docs/devtools/dom
[13]: /docs/devtools/css
[14]: /docs/devtools/css/#view
[15]: /docs/devtools/css/reference/#change
[16]: /docs/devtools/dom/#edit
[17]: /docs/devtools/css/animations
[18]: /docs/devtools/coverage
[19]: /docs/devtools/console
[20]: /docs/devtools/console
[21]: /docs/devtools/console/utilities
[22]: /docs/devtools/console/api
[23]: /docs/devtools/javascript
[24]: /docs/devtools/javascript/breakpoints
[25]: /docs/devtools/workspaces
[26]: /docs/devtools/javascript/snippets
[27]: /docs/devtools/javascript/reference
[28]: /blog/new-in-devtools-65#overrides
[29]: /docs/devtools/coverage
[30]: /docs/devtools/network
[31]: /docs/devtools/issues
[32]: /docs/devtools/network/reference
[33]: /docs/devtools/speed/get-started
[34]: /docs/devtools/evaluate-performance
[35]: /docs/devtools/evaluate-performance/reference
[36]: /docs/devtools/evaluate-performance
[37]: /docs/devtools/evaluate-performance/#find_the_bottleneck
[38]: /docs/devtools/memory-problems
[39]: /docs/devtools/rendering-tools/js-execution
[40]: /docs/devtools/progressive-web-apps
[41]: /docs/devtools/storage/localstorage
[42]: /docs/devtools/storage/cookies
[43]: /docs/devtools/resources
[44]: /docs/devtools/security
[45]: https://crbug.com/new
[46]: https://twitter.com/ChromeDevTools
[47]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools
[48]: https://github.com/GoogleChrome/developer.chrome.com/issues/new/choose
[49]: https://chromiumdev.slack.com/messages/devtools/
[50]: /docs/web-platform/origin-trials/#devtools
[51]: /docs/devtools/css/issues/
[52]: /docs/devtools/rendering/
[53]: /docs/devtools/css-overview/
[54]: /docs/devtools/recorder/
[55]: /docs/devtools/recorder/extensions/
[56]: /docs/devtools/recorder/reference/
