---
layout: "layouts/doc-post.njk"
title: "Create Your First App"
date: 2012-09-17
updated: 2015-06-22
description: A tutorial on how to create a basic Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

This tutorial walks you through creating your first Chrome App. Chrome Apps are structured similarly
to extensions so current developers will recognize the manifest and packaging methods. When you're
done, you'll just need to produce a zip file of your code and assets in order to [publish][3] your
app.

A Chrome App contains these components:

- The **manifest** tells Chrome about your app, what it is, how to launch it and the extra
  permissions that it requires.
- The **background script** is used to create the event page responsible for managing the app life
  cycle.
- All code must be included in the Chrome App package. This includes HTML, JS, CSS and Native Client
  modules.
- All **icons** and other assets must be included in the package as well.

{% Aside %}

**API Samples:** Want to play with the code? Check out the [hello-world][4] sample.

{% endAside %}

## Step 1: Create the manifest {: #one }

First create your `manifest.json` file ([Formats: Manifest Files][5] describes this manifest in
detail):

```json
{
  "name": "Hello World!",
  "description": "My first Chrome App.",
  "version": "0.1",
  "manifest_version": 2,
  "app": {
    "background": {
      "scripts": ["background.js"]
    }
  },
  "icons": { "16": "calculator-16.png", "128": "calculator-128.png" }
}
```

{% Aside %}

**Important:** Chrome Apps **must** use [manifest version 2][6].

{% endAside %}

## Step 2: Create the background script {: #two }

Next create a new file called `background.js` with the following content:

```js
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'outerBounds': {
      'width': 400,
      'height': 500
    }
  });
});
```

In the above sample code, the [onLaunched event][7] will be fired when the user starts the app. It
then immediately opens a window for the app of the specified width and height. Your background
script may contain additional listeners, windows, post messages, and launch data, all of which are
used by the event page to manage the app.

## Step 3: Create a window page {: #three }

Create your `window.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div>Hello, world!</div>
  </body>
</html>
```

## Step 4: Create the icons {: #four }

Copy these icons to your app folder:

- [calculator-16.png][8]
- [calculator-128.png][9]

## Step 5: Launch your app {: #five }

### Enable flags {: #enable }

Many of the Chrome Apps APIs are still experimental, so you should enable experimental APIs so that
you can try them out:

- Go to **chrome://flags**.
- Find "Experimental Extension APIs", and click its "Enable" link.
- Restart Chrome.

### Load your app {: #load }

To load your app, bring up the apps and extensions management page by clicking the Chrome settings icon
and choosing **Tools > Extensions**.

Make sure the **Developer mode** checkbox has been selected.

Click the **Load unpacked extension** button, navigate to your app's folder and click **OK**.

### Open new tab and launch {: #open }

Once you've loaded your app, open a New Tab page and click on your new app icon.

### Or, load and launch from command line

These command line options to Chrome may help you iterate:

- `--load-and-launch-app=/path/to/app/` installs the unpacked application from the given path, and
  launches it. If the application is already running it is reloaded with the updated content.
- `--app-id=ajjhbohkjpincjgiieeomimlgnll` launches an app already loaded into Chrome. It does not
  restart any previously running app, but it does launch the new app with any updated content.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: publish_app
[4]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/hello-world
[5]: manifest
[6]: manifestVersion
[7]: app_lifecycle#lifecycle
[8]: /static/images/calculator-16.png
[9]: /static/images/calculator-128.png
