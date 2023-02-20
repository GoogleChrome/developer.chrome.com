---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: Deprecations and removals in Chrome 86

# Required
description: >
  A round up of the deprecations and removals in Chrome 86 to help you plan.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - joemedley

# Required
date: 2020-09-03

# Optional
# Include an updated date when you update your post
updated: 2020-09-03

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

## Remove WebComponents v0

Web Components v0 was removed from desktop and Android in Chrome 80. Chromium 86
removes them from WebView. This removal includes Custom Elements v0, Shadow DOM
v0, and HTML Imports.

## Deprecate FTP support

Chrome is deprecating and removing support for FTP URLs. The current FTP
implementation in Google Chrome has no support for encrypted connections (FTPS),
nor proxies. Usage of FTP in the browser is sufficiently low that it is no
longer viable to invest in improving the existing FTP client. In addition, more
capable FTP clients are available on all affected platforms.

Google Chrome 72 and later removed support for fetching document subresources
over FTP and rendering of top level FTP resources. Currently navigating to FTP
URLs results in showing a directory listing or a download depending on the type
of resource. A bug in Google Chrome 74 and later resulted in dropping support
for accessing FTP URLs over HTTP proxies. Proxy support for FTP was removed
entirely in Google Chrome 76.

The remaining capabilities of Google Chrome’s FTP implementation are restricted
to either displaying a directory listing or downloading a resource over
unencrypted connections. 

Deprecation of support will follow this timeline:

### Chrome 86

FTP is still enabled by default for most users, but turned off for pre-release
channels (Canary and Beta) and will be experimentally turned off for one percent
of stable users. In this version you can re-enable it from the command line
using either the `--enable-ftp` command line flag or the
`--enable-features=FtpProtocol` flag.

### Chrome 87

FTP support will be disabled by default for fifty percent of users but can be
enabled using the flags listed above.

###Chrome 88

FTP support will be disabled.

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
