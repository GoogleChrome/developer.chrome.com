---
layout: 'layouts/doc-post.njk'
title: "Step 1: Create and Run a Chrome App"
date: 2014-10-17
updated: 2014-10-20
description: How to create, install, run, and debug a basic Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

In this step, you will learn:

- The basic building blocks of a Chrome App, including the manifest file and background scripts.
- How to install, run, and debug a Chrome App.

_Estimated time to complete this step: 10 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][3].

## Get familiar with Chrome Apps {: #app-components }

A Chrome App contains these components:

- The **manifest** specifies the meta information of your app. The manifest tells Chrome about your
  app, how to launch it, and any extra permissions that it requires.
- The **event page**, also called a **background script**, is responsible for managing the app life
  cycle. The background script is where you register listeners for specific app events such as the
  launching and closing of the app's window.
- All **code files** must be packaged in the Chrome App. This includes HTML, CSS, JS, and Native
  Client modules.
- **Assets**, including app icons, should be packaged in the Chrome App as well.

### Create a manifest {: #manifest }

Open your favorite code/text editor and create the following file named **manifest.json**:

```json
{
  "manifest_version": 2,
  "name": "Codelab",
  "version": "1",
  "icons": {
    "128": "icon_128.png"
  },
  "permissions": [],
  "app": {
    "background": {
      "scripts": ["background.js"]
    }
  },
  "minimum_chrome_version": "28"
}
```

Notice how this manifest describes a background script named _background.js_. You will create that
file next.

```json
"background": {
  "scripts": ["background.js"]
}
```

We'll supply you with an app icon later in this step:

```json
"icons": {
  "128": "icon_128.png"
},
```

### Create a background script {: #background-script }

Create the following file and save it as **_background.js_**:

```js
/**
 * Listens for the app launching then creates the window
 *
 * @see /apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
});
```

This background script simply waits for the [chrome.app.runtime.onLaunched][4] launch event for the
application and executes the callback function:

```js
chrome.app.runtime.onLaunched.addListener(function() {
  //...
});
```

When the Chrome App is launched, [chrome.app.window.create()][5] will create a new window using a
basic HTML page (_index.html_) as the source. You will create the HTML view in the next step.

```js
chrome.app.window.create('index.html', {
  id: 'main',
  bounds: { width: 620, height: 500 }
});
```

Background scripts may contain additional listeners, windows, post messages, and launch data—all
of which are used by the event page to manage the app.

### Create an HTML view {: #html-view }

Create a simple web page to display a "Hello World" message to the screen and save it as
**_index.html_**:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>Hello, let's code!</h1>
</body>
</html>
```

Just like any other web page, within this HTML file you can include additional packaged JavaScript,
CSS, or assets.

### Add an app icon {: #app-icon }

Right-click and save this 128x128 image to your project folder as **_icon_128.png_**:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oWw4vtq0F2ZrXo3uKhwG.png",
       alt="Chrome App icon for this codelab", height="128", width="128" %}

You will use this PNG as our application's icon that users will see in the launch menu.

### Confirm that you have created all your files {: #confirm-files }

You should have these 4 files in your project folder now:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/gYAyOofu4qTqwZj0tZVL.png",
       alt="File folder screenshot", height="110", width="590" %}

## Install a Chrome App in developer mode {: #developer-mode }

Use **developer mode** to quickly load and launch your app without having to finalize your app as a
distribution package.

1.  Access **chrome://extensions** from the Chrome omnibox.
2.  Check off the **Developer mode** check box.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/KIzjun6cpH8zHXJ4hBdF.gif",
       alt="Enable developer mode", height="188", width="735" %}

3.  Click **Load unpacked extension**.
4.  Using the file picker dialog, navigate to your app's project folder and select it to load your
    app.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/t1hNzCpoh1S1STdxzhMd.gif",
       alt="Load unpacked extensions", height="289", width="634" %}

## Launch your finished Hello World app {: #launch }

After loading your project as an unpacked extension, click **Launch** next to your installed app. A
new standalone window should open up:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iibtdGOdf6gyQHUncpH0.png",
       alt="The finished Hello World app after Step 1", height="283", width="334" %}

Congratulations, you've just created a new Chrome App!

## Debug a Chrome App with Chrome DevTools {: #devtools-debug }

You can use the [Chrome Developer Tools][6] to inspect, debug, audit, and test your app just like
you do on a regular web page.

After you make changes to your code and reload your app (**right-click > Reload App**), check the
DevTools console for any errors (**right-click > Inspect Element**).

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/8ZT2FbBlw1hD74sRWHJq.png",
       alt="Inspect Element dialog box", height="283", width="334" %}

(We'll cover the **Inspect Background Page** option in [Step 3][7] with alarms.)

The DevTools JavaScript console has access to the same APIs available to your app. You can easily
test an API call before adding it to your code:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ip0mFYkSIYw3sObYAow3.png",
       alt="DevTools console log", height="181", width="645" %}

## For more information {: #recap }

For more detailed information about some of the APIs introduced in this step, refer to:

- [Manifest File Format][8] [↑][9]
- [Manifest - Icons][10] [↑][11]
- [Chrome App Lifecycle][12] [↑][13]
- [chrome.app.runtime.onLaunched][14] [↑][15]
- [chrome.app.window.create()][16] [↑][17]

Ready to continue onto the next step? Go to [Step 2 - Import an existing web app »][18]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: #launch
[4]: /docs/extensions/reference/app_runtime#event-onLaunched
[5]: /docs/extensions/reference/app_window#method-create
[6]: /devtools
[7]: ../app_codelab_alarms
[8]: /apps/manifest "Read 'Manifest File Format' in the Chrome developer docs"
[9]: #manifest "This feature mentioned in 'Create a manifest'"
[10]: /apps/manifest/icons "Read 'Manifest - Icons' in the Chrome developer docs"
[11]: #app-icon "This feature mentioned in 'Add an app icon'"
[12]: ../app_lifecycle "Read 'Manifest File Format' in the Chrome developer docs"
[13]: #background-script "This feature mentioned in 'Create a background script'"
[14]:
  /docs/extensions/reference/app_runtime#event-onLaunched
  "Read 'chrome.app.runtime.onLaunched' in the Chrome developer docs"
[15]: #background-script "This feature mentioned in 'Create a background script'"
[16]:
  /docs/extensions/reference/app_window#method-create
  "Read 'chrome.app.window.create()' in the Chrome developer docs"
[17]: #background-script "This feature mentioned in 'Create a background script'"
[18]: ../app_codelab_import_todomvc
