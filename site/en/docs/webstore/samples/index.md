---
layout: "layouts/doc-post.njk"
title: "Samples"
date: 2017-08-30
description: Code samples demonstrating how to use the Chrome Web Store Licensing API.
---

The following basic samples demonstrate how to use the Chrome Web Store Licensing API. Each sample
app obtains the user's OpenID identifier (as described in [Identifying the User][1]) and makes an
OAuth request with it to the Licensing API (as described in [Checking for Payment][2]) to determine
whether the user has paid for the app.

## Java {: #java }

A sample Java app that runs on Google App Engine and takes advantage of App Engine's native OpenID
support. To enable OAuth signing, this app uses the [OAuth Signpost][3] library.

This sample is featured in the [Licensing API tutorial][4].

You can browse the source, download all the files, or see the app in action:

- [Browse code repository][5]
- [Download ZIP file][6]
- [Try live demo][7]

## Python {: #python }

A sample Python app that runs on Google App Engine and takes advantage of App Engine's native OpenID
support. To enable OAuth signing, this app uses the [Python OAuth2][8] library.

You can browse the source or download all the files:

- [Browse code repository][9]
- [Download ZIP file][10]

## PHP {: #php }

A sample PHP app that uses the [LightOpenId][11] and [OAuth for PHP][12] libraries.

You can browse the source, download all the files, or see the app in action:

- [Browse code repository][13]
- [Download ZIP file][14]
- [Try live demo][15]

[1]: /docs/webstore/identify_user
[2]: /docs/webstore/check_for_payment
[3]: http://code.google.com/p/oauth-signpost/
[4]: /docs/webstore/get_started
[5]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-java/
[6]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-java.zip
[7]: http://hellolicense.appspot.com/
[8]: http://github.com/simplegeo/python-oauth2
[9]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-python/
[10]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-python.zip
[11]: http://gitorious.org/lightopenid
[12]: http://oauth.googlecode.com/svn/code/php/
[13]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-php/
[14]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-php.zip
[15]: http://googlecodesamples.com/chrome_webstore/hello-php/index.php
