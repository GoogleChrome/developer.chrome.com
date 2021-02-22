---
layout: "layouts/doc-post.njk"
title: "Analytics"
date: 2013-08-01
#updated: TODO
description: How to integrate Google Analytics into your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

<table class="intro"><tbody><tr><td><strong>Description:</strong></td><td>Use the Chrome Platform Analytics JavaScript library to measure user interactions with your app.</td></tr><tr><td><strong>Samples:</strong></td><td><a href="https://github.com/GoogleChrome/chrome-platform-analytics/tree/master/src/example">JavaScript and Closure examples</a></td></tr><tr><td><strong>Learn&nbsp;more:</strong></td><td><a href="https://github.com/GoogleChrome/chrome-platform-analytics/wiki">Chrome Platform Analytics</a></td></tr></tbody></table>

## Overview {: #overview }

The [Google Analytics Platform][5] lets you measure user interactions with your business across
various devices and environments. The platform provides resources to collect, store, process, and
report on user interactions. [Chrome Platform Analytics][6] (CPA) is a client library that lets you
collect user interactions in Packaged Apps and Extensions, and send them to the Google Analytics
Platform.

The CPA library follows the basic usage pattern of [Google Analytics][7] and will feel familiar to
existing users of Google Analytics. However, unlike the web-centric official Google Analytics
JavaScript libraries, the CPA library uses an "app-centric" model that is better suited for Packaged
Apps. Among other features, the library provides methods for specific types of hits, such as "event"
and "appView", and it can be used in both Closure-based and traditional JavaScript projects.

## Privacy {: #privacy }

[Google Analytics Policies][8] require you to give users notice about analytics tracking and the
option to opt out of tracking. The CPA library makes it easy to build privacy-friendly apps by
providing library-level support for user opt-out.

## Library {: #library }

The CPA library is hosted on GitHub: [chrome-platform-analytics][9].

The library is [google-analytics-bundle.js][10].

## Documentation {: #documentation }

Documentation for the CPA library is aslo on GitHub. See specifically:

- [Prerequisites][11]
- [API Reference][12]
- [How-To][13]

## Examples {: #examples }

For an illustration of how to use the CPA library to measure user interactions in an app, see the
[examples][14].

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/GoogleChrome/chrome-platform-analytics/tree/master/src/example
[4]: https://github.com/GoogleChrome/chrome-platform-analytics/wiki
[5]: https://developers.google.com/analytics/devguides/platform/
[6]: https://github.com/GoogleChrome/chrome-platform-analytics/wiki
[7]: http://www.google.com/analytics/index.html
[8]: https://developers.google.com/analytics/devguides/collection/protocol/policy
[9]: https://github.com/GoogleChrome/chrome-platform-analytics
[10]:
  https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/google-analytics-bundle.js
[11]: https://github.com/GoogleChrome/chrome-platform-analytics/wiki#prerequisites
[12]: https://github.com/GoogleChrome/chrome-platform-analytics/wiki#api-reference
[13]: https://github.com/GoogleChrome/chrome-platform-analytics/wiki#how-to
[14]: https://github.com/GoogleChrome/chrome-platform-analytics/tree/master/src/example
