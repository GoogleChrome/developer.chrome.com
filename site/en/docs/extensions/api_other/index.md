---
layout: "layouts/doc-post.njk"
title: "Web APIs"
#date: TODO
#updated: TODO
#description: TODO
---

In addition to the [chrome.\* APIs][1], extensions can use all the APIs that the browser provides to
web pages and apps. If the browser doesn't support an API you want to use, you can bundle additional
API libraries into your extension.

Here's a sampling of the APIs that extensions can use:

Standard JavaScript APIs

: These are the same core JavaScript and [Document Object Model][2] (DOM) APIs that you can use in
ordinary web apps.

XMLHttpRequest

: Use [XMLHttpRequest][3] to request data from one or more servers. The [permissions][4] field of the
  manifest specifies which hosts the extension can send requests to.

HTML and other emerging APIs

: Google Chrome supports modern HTML features, along with other emerging APIs. Here are some of the
  APIs you can use:

  - audio ([tutorial][5])
  - application cache ([tutorial][6])
  - canvas ([articles][7])
  - geolocation ([tutorial][8])
  - local storage ([tutorial][9])
  - notifications ([tutorial][10])
  - video ([tutorial][11])
  - web database ([tutorial][12])

  See [html5rocks.com][13] for HTML5 information, tutorials, an interactive playground, and links to
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

[1]: /docs/extensions/reference
[2]: https://developer.mozilla.org/en-US/docs/Web/API
[3]: /docs/extensions/mv2/xhr
[4]: /docs/extensions/mv2/declare_permissions
[5]: http://www.html5rocks.com/tutorials/audio/quick/
[6]: http://www.html5rocks.com/tutorials/appcache/beginner/
[7]: http://www.html5rocks.com/en/tutorials/#canvas
[8]: http://www.html5rocks.com/tutorials/geolocation/trip_meter/
[9]: http://www.html5rocks.com/en/tutorials/offline/storage/
[10]: http://www.html5rocks.com/tutorials/notifications/quick/
[11]: http://www.html5rocks.com/en/tutorials/video/basics/
[12]: http://www.html5rocks.com/tutorials/webdatabase/todo/
[13]: http://www.html5rocks.com
