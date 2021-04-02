---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 80)"
authors:
  - kaycebasques
date: 2019-12-05
#updated: YYYY-MM-DD
description:
  "Support for let and class redeclarations in the Console, improved WebAssembly debugging, and
  more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SdD71qEn4fqf8LF5kH2H.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-80
---

{% YouTube id="2EiPb1opH3g" %}

## Support for `let` and `class` redeclarations in the Console {: #redeclarations }

The Console now supports redeclarations of `let` and `class` statements. The inability to redeclare
was a common annoyance for web developers who use the Console to experiment with new JavaScript
code.

{% Aside "warning" %}

Redeclaring a `let` or `class` statement in a script outside of the Console or within a single
Console input will still cause a `SyntaxError`.

{% endAside %}

For example, previously, when redeclaring a local variable with `let`, the Console would throw an
error:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Vl5ixHwhHp2lUc8Y0qvY.png", alt="A screenshot of the Console in Chrome 78 showing that the let redeclaration fails.", width="800", height="447" %}

Now, the Console allows the redeclaration:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mJwYqPFpIO73IAC38Uqv.png", alt="A screenshot of the Console in Chrome 80 showing that the let redeclaration succeeds.", width="800", height="493" %}

Chromium issue [#1004193][1]

## Improved WebAssembly debugging {: #webassembly }

DevTools has started to support the [DWARF Debugging Standard][2], which means increased support for
stepping over code, setting breakpoints, and resolving stack traces in your source languages within
DevTools. Check out [Improved WebAssembly debugging in Chrome DevTools][3] for the full story.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9ANP4ItuuJ8PjPrVCgmR.png", alt="A screenshot of the new DWARF-powered WebAssembly debugging.", width="800", height="446" %}

## Network panel updates {: #network }

### Request Initiator Chains in the Initiator tab {: #initiators }

You can now view the initiators and dependencies of a network request as a nested list. This can
help you understand why a resource was requested, or what network activity a certain resource (such
as a script) caused.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/meHk2Mm8MqaTl5GeZxtl.png", alt="A screenshot of a Request Initiator Chain in the Initiator tab", width="800", height="410" %}

After [logging network activity in the Network panel][4], click a resource and then go to the
**Initiator** tab to view its **Request Initiator Chain**:

- The _inspected resource_ is bold. In the screenshot above, `https://web.dev/default-627898b5.js`
  is the inspected resource.
- The resources above the inspected resource are the _initiators_. In the screenshot above,
  `https://web.dev/bootstrap.js` is the initiator of `https://web.dev/default-627898b5.js`. In other
  words, `https://web.dev/bootstrap.js` caused the network request for
  `https://web.dev/default-627898b5.js`.
- The resources below the inspected resource are the _dependencies_. In the screenshot above,
  `https://web.dev/chunk-f34f99f7.js` is a dependency of `https://web.dev/default-627898b5.js`. In
  other words, `https://web.dev/default-627898b5.js` caused the network request for
  `https://web.dev/chunk-f34f99f7.js`.

{% Aside %}

Initiator and dependency information can also be accessed by holding Shift and then hovering over
network resources. See [View initiators and dependencies][5].

{% endAside %}

Chromium issue [#842488][6]

### Highlight the selected network request in the Overview {: #overview }

After you click a network resource in order to inspect it, the Network panel now puts a blue border
around that resource in the **Overview**. This can help you detect if the network request is
happening earlier or later than expected.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pyt6Fzlzt8gefPvjUKie.png", alt="A screenshot of the Overview pane highlighting the inspected resource.", width="800", height="465" %}

Chromium issue [#988253][7]

### URL and path columns in the Network panel {: #columns }

Use the new **Path** and **URL** columns in the **Network** panel to see the absolute path or full
URL of each network resource.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zO6RL23L8xQLEsWqh9Ec.png", alt="A screenshot of the new Path and URL columns in the Network panel.", width="800", height="366" %}

Right-click the **Waterfall** table header and select **Path** or **URL** to show the new columns.

Chromium issue [#993366][8]

### Updated User-Agent strings {: #useragents }

DevTools supports setting a custom User-Agent string through the **Network Conditions** tab. The
User-Agent string affects the `User-Agent` HTTP header attached to network resources, and also the
value of `navigator.userAgent`.

The predefined User-Agent strings have been updated to reflect modern browser versions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ONxZp1H5PnvusPEDGEJu.png", alt="A screenshot of the User Agent menu in the Network Conditions tab.", width="800", height="681" %}

To access **Network Conditions**, [open the Command Menu][9] and run the `Show Network Conditions`
command.

{% Aside %}

You can also [set User-Agent strings in Device Mode][10].

{% endAside %}

Chromium issue [#1029031][11]

## Audits panel updates {: #audits }

### New configuration UI {: #config }

The configuration UI has a new, responsive design, and the throttling configuration options have
been simplified. See [Audits Panel Throttling][12] for more information on the throttling UI
changes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2VHTNHEFIGhcBX3DavHi.png", alt="The new configuration UI.", width="800", height="401" %}

## Coverage tab updates {: #coverage }

### Per-function or per-block coverage modes {: #modes }

The [Coverage tab][13] has a new dropdown menu that lets you specify whether code coverage data
should be collected **per function** or **per block**. **Per block** coverage is more detailed but
also far more expensive to collect. DevTools uses **per function** coverage by default now.

{% Aside "caution" %}

You may see large code coverage differences in HTML files depending on whether you use **per
function** or **per block** mode. When using **per function** mode, inline scripts in HTML files are
treated as functions. If the script executes at all then DevTools will mark the entire script as
used code. Only if the script doesn't execute at all will DevTools mark the script as unused code.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lZqzpkt0TEaZcpLv8nLz.png", alt="The coverage mode dropdown menu.", width="800", height="630" %}

### Coverage must now be initiated by a page reload {: #reload }

Toggling code coverage without a page reload has been removed because the coverage data was
unreliable. For example, a function can be reported as unused if its execution was a long time ago
and V8's garbage collector has cleaned it up.

Chromium issue [#1004203][14]

[1]: https://crbug.com/1004193
[2]: http://dwarfstd.org/
[3]: https://developers.google.com/web/updates/2019/12/webassembly
[4]: /docs/devtools/network
[5]: /docs/devtools/network/reference#initiators-dependencies
[6]: https://crbug.com/842488
[7]: https://crbug.com/988253
[8]: https://crbug.com/993366
[9]: /docs/devtools/command-menu
[10]: /docs/devtools/device-mode#viewport
[11]: https://crbug.com/1029031
[12]:
  https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md#devtools-audits-panel-throttling
[13]: /docs/devtools/coverage
[14]: https://crbug.com/1004203
