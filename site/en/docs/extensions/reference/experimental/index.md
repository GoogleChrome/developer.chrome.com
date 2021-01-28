---
layout: "layouts/doc-post.njk"
title: "chrome.experimental.* APIs"
date: 2012-09-17
updated: 2015-05-11
description: How to use and provide feedback on chrome.experimental APIs.
---

## List of APIs {: #overview }

We'd like your [feedback][1] on the following experimental APIs:

<table><tbody><tr><th>Name</th><th>Description</th></tr></tbody></table>

Pay special attention to the following APIs, which we expect to finalize soon: **devtools**,
**permissions**, For examples of using the experimental APIs, see [Samples][2].

<div class="aside aside--warning"><b>Caution:</b> Don't depend on these experimental APIs. They might disappear, and they <em>will</em> change. Also, the Chrome Web Store doesn't allow you to upload items that use experimental APIs.</div>

## How to use experimental APIs {: #using }

1.  Make sure you're using either [Canary][3] (which you can use at the same time as other Chrome
    channels) or the [Dev channel][4]. Although the experimental APIs might work in other versions,
    we need your feedback on the latest incarnation of the APIs, which you can find in Canary and on
    the Dev channel.

2.  Specify the "experimental" [permission][5] in your manifest, like this:

    ```json/1
    "permissions": [
      "experimental",
      ...
    ],
    ```

3.  Enable the experimental API in your browser. You can do this in either of two ways:
    - Go to **chrome://flags**, find "Experimental Extension APIs", click its "Enable" link, and
      restart Chrome. From now on, unless you return to that page and disable experimental APIs,
      you'll be able to run extensions and apps that use experimental APIs.
    - Specify the **\--enable-experimental-extension-apis** flag each time you launch the browser.
      On Windows, you can do this by modifying the properties of the shortcut that you use to launch
      Google Chrome. For example:

      ```text
      path_to_chrome.exe --enable-experimental-extension-apis
      ```

4.  [Give us feedback!][6] Your comments and suggestions help us improve the APIs and decide which
    ones should move from experimental to supported.

## More APIs {: #other }

For information on the standard APIs, see [chrome.\* APIs][7] and [Other APIs][8].

[1]: http://groups.google.com/a/chromium.org/group/chromium-extensions/topics
[2]: /docs/extensions/mv2/samples#search:experimental
[3]: http://tools.google.com/dlpage/chromesxs
[4]: http://www.chromium.org/getting-involved/dev-channel
[5]: /docs/extensions/mv2/declare_permissions
[6]: http://groups.google.com/a/chromium.org/group/chromium-extensions/topics
[7]: /docs/extensions/reference
[8]: /docs/extensions/api_other
