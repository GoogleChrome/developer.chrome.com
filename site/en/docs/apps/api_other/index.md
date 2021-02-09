---
layout: "layouts/doc-post.njk"
title: "Web APIs"
date: 2012-09-17
updated: 2017-03-01
description: Chrome Apps can use all the APIs that are available to websites.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

In addition to the [chrome.\* APIs][3], extensions can use all the APIs that the browser provides to
web pages and apps. If the browser doesn't support an API you want to use, you can bundle additional
API libraries into your extension.

Here's a sampling of the APIs that extensions can use:

Standard JavaScript APIs

: These are the same core JavaScript and [Document Object Model][4] (DOM) APIs that you can use in
  ordinary web apps.

XMLHttpRequest

: Use [XMLHttpRequest][5] to request data from one or more servers. The [permissions][6] field of the
  manifest specifies which hosts the extension can send requests to.

HTML and other emerging APIs

: Google Chrome supports modern HTML features, along with other emerging APIs. Here are some of the
  APIs you can use:

  - audio ([tutorial][7])
  - application cache ([tutorial][8])
  - canvas ([articles][9])
  - fullscreen ([article][10])
    - In Chrome Apps, fullscreen is entered without prompting the user or providing exit instructions.
      HTML5 fullscreen requires the `app.window.fullscreen` permission in the manifest. In normal
      webpages, the browser intercepts the ESC key to exit pointer lock ensuring a consistent escape
      method for users. That is also the behavior in Chrome Apps unless the
      `app.window.fullscreen.overrideEsc` permission is used to enable the app to call
      `preventDefault` on keydown and keyup events.
  - geolocation ([tutorial][11])
  - local storage ([tutorial][12])
  - notifications ([tutorial][13])
  - pointer lock ([tutorial][14])
    - In Chrome Apps, pointer lock is entered without requiring a user gesture, prompting the user, or
      providing exit instructions. Pointer lock requires the `pointerlock` permission in the manifest.
      Also, there is no default exit behavior. In normal webpages, the browser intercepts the ESC key
      to exit pointer lock. This behavior is not present in Chrome Apps.
  - video ([tutorial][15])
  - web database ([tutorial][16])

  See [html5rocks.com][17] for HTML5 information, tutorials, an interactive playground, and links to
  other resources.

Web APIs

: Your extension can use Web APIs. Especially useful are the CSS features such as filters,
  animations, and transformations. Here's an example of using WebKit styles to make the UI spin:

  ```html
  <style>
    div:hover {
      transform: rotate(360deg);
      transition: all 1s ease-out;
    }
  </style>
  ```

V8 APIs, such as JSON

: Because JSON is in V8, you don't need to include a JSON library to use JSON functions.

APIs in bundled libraries

: If you want to use a library that the browser doesn't provide (for example, jQuery), you can bundle
  that library's JavaScript files with your extension. Bundled libraries work in extensions just as
  they do in other web pages.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: /docs/extensions/reference/
[4]: https://developer.mozilla.org/en/Gecko_DOM_Reference
[5]: /docs/extensions/mv2/xhr/
[6]: /docs/extensions/mv2/declare_permissions/
[7]: http://www.html5rocks.com/tutorials/audio/quick/
[8]: http://www.html5rocks.com/tutorials/appcache/beginner/
[9]: http://www.html5rocks.com/en/tutorials/#canvas
[10]: http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API
[11]: http://www.html5rocks.com/tutorials/geolocation/trip_meter/
[12]: http://www.html5rocks.com/en/tutorials/offline/storage/
[13]: http://www.html5rocks.com/tutorials/notifications/quick/
[14]: http://www.html5rocks.com/en/tutorials/pointerlock/intro/
[15]: http://www.html5rocks.com/en/tutorials/video/basics/
[16]: http://www.html5rocks.com/tutorials/webdatabase/todo/
[17]: http://www.html5rocks.com
