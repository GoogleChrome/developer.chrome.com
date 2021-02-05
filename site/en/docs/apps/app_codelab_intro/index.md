---
layout: "layouts/doc-post.njk"
title: "Build a Todo Chrome App"
date: 2014-10-17
updated: 2014-10-20
description: An introduction to the codelab.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Welcome to the Chrome Apps codelab.

Follow along with each step to learn about the basic building blocks of the Chrome Apps platform. By
the end of this codelab, you will have an offline-enabled and feature-rich Todo app that you can
install on your desktop computer.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/epH3dXjtGY32KrRzPjt2.png",
       alt="A screenshot of the finished codelab", height="538", width="800" %}

The finished Todo app can be [installed from the Chrome Web Store][3].

Along the way, you will learn:

- How to create, run, and debug a Chrome App in [Step 1][4].
- How to update an existing web app as a Chrome App, deal with Content Security Policy issues, and
  add local storage support in [Step 2][5].
- How to implement alarms and notifications in [Step 3][6].
- How to display web pages inline in [Step 4][7].
- How to load resources (like images) from external sources in [Step 5][8].
- How to write to a file in the native filesystem in [Step 6][9].
- How to publish your app to the Chrome Web Store in [Step 7][10].

To prepare for this codelab:

- Use the latest version of [Google Chrome][11].
- Start fresh in an empty project directory on your development computer.
- [Download the reference code][12] for all steps or [view them on Github][13] in case you get
  stuck.

Each step builds on top of the previous. You can skip any step and use previous step solutions in
the reference code.

Let's get started. Go to [Step 1 - Create and run a Chrome App »][14]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: http://goo.gl/qNNUX
[4]: ../app_codelab_basics
[5]: ../app_codelab_import_todomvc
[6]: ../app_codelab_alarms
[7]: ../app_codelab_webview
[8]: ../app_codelab_images
[9]: ../app_codelab_filesystem
[10]: ../app_codelab_publish
[11]: https://www.google.com/intl/en/chrome/browser/
[12]: https://github.com/mangini/io13-codelab/archive/master.zip
[13]: https://github.com/mangini/io13-codelab/tree/master/cheat_code
[14]: ../app_codelab_basics
