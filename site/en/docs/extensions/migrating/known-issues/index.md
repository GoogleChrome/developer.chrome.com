---
layout: 'layouts/doc-post.njk'
title: Known issues when migrating to Manifest V3
seoTitle: Known issues when migrating Chrome Extensions to Manifest V3
description: ''
date: 2022-09-23
updated: 2023-10-17
tags:
  - extensions-news
---

{% Aside %}
The Manifest V2 support timeline has been updated. See our [November 2023 blog post](/blog/resuming-the-transition-to-mv3/) and the [Manifest V2 support timeline page](/docs/extensions/mv3/mv2-sunset/) for details.
{% endAside %}

Recently, we announced changes to the Manifest V2 deprecation timeline, and while we remain firmly committed to Manifest V3 we acknowledge there is more work to do on our part.

*   Before announcing a new timeline for deprecation, we will finish addressing prioritized platform gaps and close the critical bugs that are documented on this page.
*   We will give developers time to build, guaranteeing at least 6 months between a timeline announcement and any experiments removing support for Manifest V2.

## Closing the platform gap

We are committed to closing the following gaps before announcing a new Manifest V2 deprecation timeline:

These issues have been collected based on feedback from partners, bug reports, and developers. In addition to these, we will continue our ongoing work to address stability issues and improve overall performance. 

**There are currently no open issues considered a critical platform gap.**

The following issues have recently been addressed:

1. **Support for [File handling on ChromeOS](/docs/extensions/mv3/file_handling/)** as a replacement for [`chrome.fileBrowserHandler`](/docs/extensions/reference/fileBrowserHandler/) [Chrome 120].
1. **User Script support:** Allow registering content scripts with arbitrary code with the new [userScripts API](/docs/extensions/reference/userscripts/) [Chrome 120]. 
1. Additional **strong service worker keepalives** for certain operations taking longer than five minutes.
    * Added in Chrome 116 for `permissions.request()`, `desktopCapture.chooseDesktopMedia()`, `identity.launchWebAuthFlow()` and `management.uninstall()`.
    * Added in Chrome 118 for `chrome.debugger`
1. **Increase the number of static and enabled rulesets** for Declarative Net Request (DNR). Enabled static rulesets increased from 10 to 50 and total static rulesets from 50 to 100 [Chrome 120].
1. Extend **[Offscreen document](/docs/extensions/reference/offscreen/) functionality** to support more reasons for using an offscreen document. Added [`GEOLOCATION`](/docs/extensions/mv3/geolocation/) in Chrome 116.
1. Improving **support for the [`chrome.tabCapture`](/docs/extensions/reference/tabCapture/) API** [Chrome 116]:
    * Support calling `getMediaStreamId()` from a service worker.
    * Support obtaining a `MediaStream` from a stream ID in an offscreen document.
1. **Extending service worker lifetimes** while there are active [`WebSocket` connections](/docs/extensions/mv3/tut_websockets/) [Chrome 116].

## Manifest V3 frequently asked questions 

**Q: Do we plan to support persistent Service Workers?**\
**A:** One of the key reasons for migrating from background scripts to service workers is the more memory efficient event-driven programming model which comes from the ephemeral nature of service workers. Consequently, we are not planning to support persistent service workers. However, to address the specific needs of extension developers, we are continuing to make many improvements to service workers. In particular:

* All extension events and API calls will extend the [service worker lifetime](/docs/extensions/mv3/service_workers/service-worker-lifecycle/). 
* Selected use cases such as native messaging will keep extensions service workers alive for longer than 5 min. 

**Q: Is there a way to access the DOM in service workers?**\
**A:** We follow the approach taken by the Web Platform of not including DOM access in web workers (which includes service workers). To support use cases requiring background DOM access from service workers we’ve introduced the possibility to delegate background work to short-lived [Offscreen documents](/docs/extensions/reference/offscreen/) which provide full DOM access.

**Q: Will there be a way to support remote code in Manifest V3?**\
**A:** To make Chrome Extensions more secure, we will continue to disallow executing arbitrary remotely hosted code in Chrome extensions. However, this does **not** mean we disallow all kinds of dynamic code execution. We still support different options of dynamically executing code in Chrome extensions:

* [Support for `eval()` in DevTools extensions](/docs/extensions/reference/devtools_inspectedWindow/#method-eval) 
* Support for [user scripts](https://github.com/w3c/webextensions/blob/main/proposals/user-scripts-api.md).
* [Executing remotely hosted code in sandboxed iframes](/docs/extensions/mv3/sandboxingEval/) 
* Remote hosted configuration files which can be interpreted at runtime in the extension package. However, possible execution paths need to be predetermined. 

**Q: My Manifest V2 extension relies on webRequestBlocking which is not supported in Manifest V3. How can I continue to provide the same functionality in Manifest V3?**\
**A:** We are confident that most request blocking use cases can be solved with the new [`declarativeNetRequest` API](/docs/extensions/reference/declarativeNetRequest/), which has the added benefit of avoiding the performance overhead of interprocess communication, executing code on every request, or requiring an active extension process at the time of the request. However, for complex [enterprise (or education) use cases](https://support.google.com/chrome/a/answer/9296680?hl=en), dynamic request blocking is still supported.

**Did we miss something?** [Please let us know](https://groups.google.com/a/chromium.org/g/chromium-extensions).

