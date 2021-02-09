---
layout: "layouts/doc-post.njk"
title: Choosing an App Type
date: 2017-08-30
description: >
  Guidelines on when to publish a hosted app, a Chrome App, or a Chrome Extension.
---

Sometimes it's hard to decide whether you need to publish a [hosted app][1] or a [Chrome App][2]—or
maybe even an [Chrome Extension][3]. This page aims to help you choose the right type of app.

## Overview

As the following figure shows, if you already have a web app, you don't need to change it; you can
just publish it as a hosted app. If you're willing to modify your app or build one from scratch, you
have more options.

<!-- TODO(kaycebasques): This flowchart needs to be converted into text for a11y. -->

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1605580911516.png",
   alt="A flowchart of the decision process.",
   height="627",
   width="581" %}

**Note**: **2GB** is the current size limit for packaged apps. If your app (with all its essential
assets) can't fit into a 2GB ZIP file, then your app is too big to be a packaged app.

## Details

If you're having trouble deciding what type of app to create, read the article [Extensions, Packaged
Apps, and Hosted Apps in the Chrome Web Store][4]. Here's some additional information to help you
choose:

- A **hosted** app can work in all web browsers, as long as it doesn't depend on features that not
  all browsers support yet, such as [background execution][5] or [WebGL][6]. On the other hand,
  because only Chrome supports the Chrome Web Store, you have the option of tailoring your app to
  Chrome.
- A **packaged** app will work only in Chrome. However, you can reuse the app's code for ordinary
  web apps.
- Only an **extension** can present an icon in the toolbar, using a [page action][7] or [browser
  action][8].
- If you're not sure whether you need a **packaged** app or an **extension**, it should probably be
  an extension.

  **Note:** As a rule of thumb, a packaged app should feel like a hosted app, not like an extension.

- Although an **extension** has little to no UI of its own, it can sometimes have a big effect on
  the UI of other pages and web apps. For example, an extension can [replace a standard Chrome
  page][9], such as the History page (chrome://history). Or it can change the contents or formatting
  of some or all websites—to use different fonts, for example.
- The [Licensing API][10] lets you check programmatically whether the user has paid for your app
  using Chrome Web Store Payments. The Licensing API is usually used only by **hosted** apps because
  packaged apps are stored locally and [could be modified][11] to circumvent the API call.
- The [chrome.\* APIs][12] let your **packaged** app or **extension** be tightly integrated with
  Chrome. They take advantage of Chrome support for functionality such as [idle state][13],
  [internationalization][14], [tabs][15], and [windows][16].

[1]: /docs/apps
[2]: /docs/apps
[3]: /docs/extensions
[4]: /docs/webstore/apps_vs_extensions
[5]: /docs/extensions/reference/mv3/background_execution
[6]: http://www.khronos.org/webgl/
[7]: /docs/extensions/reference/browserAction
[8]: /docs/extensions/reference/browserAction
[9]: /docs/extensions/mv3/override
[10]: /docs/webstore/check_for_payment
[11]: /docs/webstore/faq#faq-app-02
[12]: /docs/extensions/reference
[13]: /docs/extensions/reference/idle
[14]: /docs/extensions/reference/i18n
[15]: /docs/extensions/reference/tabs
[16]: /docs/extensions/reference/windows
