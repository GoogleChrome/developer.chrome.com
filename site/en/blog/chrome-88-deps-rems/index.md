---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 88

# Required
description: >
  A round up of the deprecations and removals in Chrome 88 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2020-12-04

# Optional
# Include an updated date when you update your post
updated: 2021-01-19

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - deprecations-removals




---

{% Aside %}
Visit ChromeStatus.com for lists of 
<a href="https://www.chromestatus.com/features#browsers.chrome.status%3A%22Deprecated%22">current deprecations</a>
and <a href="https://www.chromestatus.com/features#browsers.chrome.status:%22Removed%22">previous removals</a>.  
{% endAside %}


Chrome 88 beta was released on December 3, 2020 and is expected to become the
stable version in the third week of January 2021.

## Don't allow popups during page unload (enterprises)

Since Chrome 80, pages have no longer been able to open a new page during
unloading using `window.open()`. Since then enterprises have been able to use
the `AllowPopupsDuringPageUnload` policy flag to allow popups during page
unload. Starting in Chrome 88, this flag is no longer supported.

## Web Components v0 removed

Web Components v0 have been in a reverse origin trial since Chrome 80. This
allowed users of the API time to upgrade their sites while ensuring that new
adopters of Web Components used version 1. The reverse origin trial ends with
Chrome 87, making Chrome 88 the first in which version 0 is no longer supported.
The Web Components v1 APIs replace Web Components v0 and are fully supported in
Chrome, Safari, Firefox, and Edge. This removal covers the items listed below. 

[Custom Elements v0](https://www.chromestatus.com/feature/4642138092470272)
[HTML Imports](https://www.chromestatus.com/feature/5144752345317376)
[Shadow DOM v0](https://www.chromestatus.com/feature/4507242028072960)

## FTP support removed

Chrome [has removed support for FTP
URLs](https://www.chromestatus.com/feature/6246151319715840). The legacy FTP
implementation in Chrome has no support for encrypted connections (FTPS), nor
proxies. Usage of FTP in the browser is sufficiently low that it is no longer
viable to invest in improving the existing FTP client. In addition, more capable
FTP clients are available on all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support
for accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed
entirely in Google Chrome 76.

The remaining capabilities of Google Chrome’s FTP implementation were restricted
to either displaying a directory listing or downloading a resource over
unencrypted connections. 

In Chrome 77, FTP support was disabled by default for fifty percent of users but
was available with flags.

In Chrome 88 all FTP support is disabled.


## Deprecation policy


To keep the platform healthy, we sometimes remove APIs from the Web Platform which have run their course. There can be many reasons why we would remove an
API, such as:

- They are superseded by newer APIs.
- They are updated to reflect changes to specifications to bring alignment and consistency with other browsers.
- They are early experiments that never came to fruition in other browsers and thus can increase the burden of support for web developers.


Some of these changes will have an effect on a very small number of sites. To mitigate issues ahead of time, we try to give developers advanced notice so they can make the required changes to keep their sites running.

Chrome currently has a <a href="http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation"> process for deprecations and removals of API's</a>, essentially:


- Announce on the <a href="https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev">blink-dev</a> mailing list.
- Set warnings and give time scales in the Chrome DevTools Console when usage is detected on the page.
- Wait, monitor, and then remove the feature as usage drops.
 


You can find a list of all deprecated features on chromestatus.com using the <a href="https://www.chromestatus.com/features#deprecated"> deprecated filter </a> and removed features by applying the <a href="https://www.chromestatus.com/features#removed">removed filter</a>. We will also try to summarize some of the changes, reasoning, and migration paths in these posts.
