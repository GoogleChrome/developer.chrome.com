---
layout: "layouts/doc-post.njk"
title: "Chrome App Lifecycle"
date: 2012-09-17
updated: 2014-11-14
description: An overview of the lifecycle of Chrome Apps.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The app runtime and event page are responsible for managing the app lifecycle. The app runtime
manages app installation, controls the event page, and can shutdown the app at anytime. The event
page listens out for events from the app runtime and manages what gets launched and how.

## How the lifecycle works {: #lifecycle }

The app runtime loads the event page from a user's desktop and the `onLaunch()` event is fired. This
event tells the event page what windows to launch and their dimensions.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JjrzyAmp9vghsqh71tKu.png",
       alt="how app lifecycle works", height="329", width="444" %}

When the event page has no executing JavaScript, no pending callbacks, and no open windows, the
runtime unloads the event page and closes the app. Before unloading the event page, the
`onSuspend()` event is fired. This gives the event page opportunity to do simple clean-up tasks
before the app is closed.

## Create event page and windows {: #eventpage }

All apps must have an event page. This page contains the top-level logic of the application with
none of its own UI and is responsible for creating the windows for all other app pages.

### Create event page {: #create_event_page }

To create the event page, include the "background" field in the app manifest and include the
`background.js` in the scripts array. Any library scripts used by the event page need to be added to
the "background" field first:

```json
"background": {
  "scripts": [
    "foo.js",
    "background.js"
  ]
}
```

Your event page must include the `onLaunched()` function. This function is called when your
application is launched in any way:

```js
chrome.app.runtime.onLaunched.addListener(function() {
  // Tell your app what to launch and how.
});
```

### Create windows {: #create_windows }

An event page may create one or more windows at its discretion. By default, these windows are
created with a script connection to the event page and are directly scriptable by the event page.

Windows in Chrome Apps are not associated with any Chrome browser windows. They have an optional
frame with title bar and size controls, and a recommended window ID. Windows without IDs will not
restore to their size and location after restart.

Here's a sample window created from `background.js`:

```js
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
    id: 'MyWindowID',
    bounds: {
      width: 800,
      height: 600,
      left: 100,
      top: 100
    },
    minWidth: 800,
    minHeight: 600
  });
});
```

### Including Launch Data {: #launch_data }

Depending on how your app is launched, you may need to handle launch data in your event page. By
default, there is no launch data when the app is started by the app launcher. For apps that have
file handlers, you need to handle the `launchData.items` parameter to allow them to be launched with
files.

## Listening for app runtime events {: #runtime }

The app runtime controls the app installs, updates, and uninstalls. You don't need to do anything to
set up the app runtime, but your event page can listen out for the `onInstalled()` event to store
local settings and the `onSuspend()` event to do simple clean-up tasks before the event page is
unloaded.

### Storing local settings {: #local_settings }

`chrome.runtime.onInstalled()` is called when your app has first been installed, or when it has been
updated. Any time this function is called, the `onInstalled` event is fired. The event page can
listen for this event and use the [Storage API][3] to store and update local settings (see also
[Storage options][4]).

```js
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set(object items, function callback);
});
```

### Preventing data loss {: #preventing_loss }

Users can uninstall your app at any time. When uninstalled, no executing code or private data is
left behind. This can lead to data loss since the users may be uninstalling an app that has locally
edited, unsynchronized data. You should stash data to prevent data loss.

At a minimum, you should store user settings so that if users reinstall your app, their information
is still available for reuse. Using the Storage API ([storage.sync][5]), user data can be
automatically synced with Chrome sync.

### Clean-up before app closes {: #clean-up }

The app runtime sends the `onSuspend()` event to the event page before unloading it. Your event page
can listen out for this event and do clean-up tasks and save state before the app closes.

Once this event is fired, the app runtime starts the process of closing the app. If the app has open
windows it may be restarted in the future via the `onRestarted` event. In this case the app should
save its current state to persistent storage so it can restart in the same state if it receives an
`onRestarted` event. The app only has a few seconds to save its state, after which it will be
terminated, so it is a good idea to be incrementally saving app state while the app is running
normally.

After receiving `onSuspend` no further events will be delivered to the app, unless the suspension is
aborted for some reason. In this case the `onSuspendCanceled` will be delivered to the app, and the
app won't be unloaded.

```js
chrome.runtime.onSuspend.addListener(function() {
  // Do some simple clean-up tasks.
});
```

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: storage
[4]: app_storage#options
[5]: /apps/storage#property-sync
