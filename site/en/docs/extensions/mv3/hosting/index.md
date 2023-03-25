---
layout: "layouts/doc-post.njk"
title: "Extension hosting"
seoTitle: "Chrome Extension hosting"
date: 2012-09-18
updated: 2021-12-10
description: >
  How to host your Chrome extension.
---

<!--
Reframe this to focus explicitly on hosting.

2 options:
- CWS
- Self-hosting

CWS is by far the most common

note that during development you can also load unpacked.
-->

There are multiple ways to install a Chrome extension, but there are
only two officially supported distribution mechanisms.

[Chrome Web Store][cws-about]

: Chrome Web Store is an online marketplace for Chrome extensions and themes. Developers who
  register with the Chrome Web Store can publish their extensions and make them available to users
  across the world. Only extensions hosted on and signed by the Chrome Web Store can be directly
  installed by users. See [Publish in the Chrome Web Store][cws-publish] and [Enterprise
  publishing options][cws-enterprise] for more information about how to publish on Chrome Web Store.

Self-hosting

: Self hosting is the practice of hosting an extension outside of the Chrome Web Store. This option is used in
  managed environments where system administrators control Chrome with [enterprise
  policies][external-enterprise-policy]. See [Linux installation][doc-linux-hosting] for information
  on how to host an extension on your own server.

In both cases, Chrome periodically checks extension hosts for new versions of installed extensions
and automatically updates them without user intervention.

[Unpacked extensions][doc-load-unpacked] should only be used to load trusted code during the
development process.

{% Aside %}
Windows/macOS users can only install self-hosted extensions through enterprise policies. However, Linux users can manually install packed extensions that are not distributed or signed by Chrome
Web Store.
{% endAside %}

[cws-about]: /docs/webstore/about_webstore
[cws-enterprise]: /docs/webstore/cws-enterprise
[cws-publish]: /docs/webstore/publish
[doc-linux-hosting]: /docs/extensions/mv3/linux_hosting
[doc-load-unpacked]: /docs/extensions/mv3/getstarted#unpacked
[external-enterprise-policy]: https://chromeenterprise.google/policies/
