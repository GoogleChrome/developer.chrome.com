---
layout: 'layouts/doc-post.njk'
title: "Step 3: Add Alarms and Notifications"
date: 2014-10-17
updated: 2015-01-06
description: How to wake your Chrome App at specified intervals and use notifications.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

{% Aside %}

**Want to start fresh from here?** Find the previous step's code in the [reference code zip][3]
under **_cheat_code > solution_for_step2_**.

{% endAside %}

In this step, you will learn:

- How to wake your app at specified intervals to execute background tasks.
- How to use on-screen notifications to draw attention to something important.

_Estimated time to complete this step: 20 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][4].

## Enhance your Todo app with reminders {: #overview }

Enhance the Todo app by adding functionality to remind the user if they have open todos—even when
the app is closed.

First, you need to add a way for the app to regularly check for uncompleted todos. Next, the app
needs to display a message to the user, even if the Todo app window is closed. To accomplish this,
you need to understand how alarms and notifications work in Chrome Apps.

## Add alarms {: #alarms }

Use [`chrome.alarms`][5] to set a wake up interval. As long as Chrome is running, the alarm listener
is called at approximately the interval set.

### Update app permissions {: #update-permissions-alarms }

In **_manifest.json_**, request the `"alarms"` permission:

```json
"permissions": ["storage", "alarms"],
```

### Update background scripts {: #update-background-script-alarms }

In **_background.js_**, add an [`onAlarm`][6] listener. For now, the callback function will just log
a message to the Console whenever there is a todo item:

```js/6-8
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
});
chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
});
```

### Update HTML view {: #update-html-view-alarms }

In **_index.html_**, add an **Activate alarm** button:

```js/1
<footer id="info">
  <button id="toggleAlarm">Activate alarm</button>
  ...
</footer>
```

You now need to write the JavaScript event handler for this new button. Recall from [Step 2][7] that
one of the most common CSP non-compliances is caused by inline JavaScript. In _index.html_, add this
line to import a new _alarms.js_ file which you will create in the following step:

```js/3
  </footer>
  ...
  <script src="js/app.js"></script>
  <script src="js/alarms.js"></script>
</body>
```

### Create alarms script {: #add-alarms-script }

Create a new file in your **_js_** folder called **_alarms.js_**.

Use the code below to add `checkAlarm()`, `createAlarm()`, `cancelAlarm()` and `toggleAlarm()`
methods, along with a click event handler to toggle the alarm when the **Activate alarm** button is
clicked.

```js
(function () {
  'use strict';
   var alarmName = 'remindme';
   function checkAlarm(callback) {
     chrome.alarms.getAll(function(alarms) {
       var hasAlarm = alarms.some(function(a) {
         return a.name == alarmName;
       });
       var newLabel;
       if (hasAlarm) {
         newLabel = 'Cancel alarm';
       } else {
         newLabel = 'Activate alarm';
       }
       document.getElementById('toggleAlarm').innerText = newLabel;
       if (callback) callback(hasAlarm);
     })
   }
   function createAlarm() {
     chrome.alarms.create(alarmName, {
       delayInMinutes: 0.1, periodInMinutes: 0.1});
   }
   function cancelAlarm() {
     chrome.alarms.clear(alarmName);
   }
   function doToggleAlarm() {
     checkAlarm( function(hasAlarm) {
       if (hasAlarm) {
         cancelAlarm();
       } else {
         createAlarm();
       }
       checkAlarm();
     });
   }
  $$('#toggleAlarm').addEventListener('click', doToggleAlarm);
  checkAlarm();
})();
```

Reload your app and spend a few moments activating (and deactivating) the alarm.

{% Aside %}

Since the log messages are being sent to the Console via the event page (aka background script), you
need to **right-click > Inspect Background Page** to see the log messages:

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oc61HiXGKKbfETFGyNCK.png", alt="Inspect background page messages", height="522", width="623" %}

{% Aside %}

It's also worthwhile to continue to use **right-click > Inspect Element** to make sure you do not
have errors in other JavaScript files.

{% endAside %}

Whenever you have the alarm activated, you should see log messages being printed in the Console
every time the alarm "rings":

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZkL2Fy0sumTyDvJmfmo3.png", alt="Alarm messages printing to the Console", height="456", width="800" %}

You should notice that:

- Even when you close the Todo app window, the alarms will keep coming.
- On platforms other than Chrome OS, if you completely close all Chrome browser instances, alarms
  won't trigger.

Let's go over some of the pieces in _alarms.js_ that use `chrome.alarms` methods one by one.

### Create alarms {: #create-alarms }

In `createAlarm()`, use the [`chrome.alarms.create()`][8] API to create an alarm when **Activate
alarm** is toggled.

```js
chrome.alarms.create(alarmName, {delayInMinutes: 0.1, periodInMinutes: 0.1});
```

The first parameter is an optional string identifying an unique name for your alarm, for example,
`remindme`. (Note: You need to set an alarm name in order to cancel it by name.)

The second parameter is an `alarmInfo` object. Valid properties for `alarmInfo` include `when` or
`delayInMinutes`, and `periodInMinutes`. In order to reduce the load on the user's machine, Chrome
limits alarms to once every minute. We are using small values (0.1 of a minute) here for demo
purposes only.

### Clear alarms {: #clear-alarms }

In `cancelAlarm()`, use the [`chrome.alarms.clear()`][9] API to cancel an alarm when **Cancel
alarm** is toggled.

```js
chrome.alarms.clear(alarmName);
```

The first parameter should be the identifying string you used as an alarm name in
`chrome.alarms.create()`.

The second (optional) parameter is a callback function that should take on the format:

```js
function(boolean wasCleared) {...};
```

### Get alarms {: #get-alarms }

In `checkAlarm()`, use the [`chrome.alarms.getAll()`][10] API to get an array of all created alarms
in order to update the UI state of the toggle button.

`getAll()` accepts a callback function that passes in an array of `Alarm` objects. To see what's in
an `Alarm`, you can inspect running alarms in the DevTools Console like so:

```js
chrome.alarms.getAll(function(alarms) {
  console.log(alarms);
  console.log(alarms[0]);
});
```

This will output an object such as
`{name: "remindme", periodInMinutes: 0.1, scheduledTime: 1397587981166.858}` as seen below:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1tnuWJK9u6U79P9gNsri.png", alt="Use getAll() to inspect running alarms.", height="208", width="800" %}

### Get ready for the next section {: #next-section }

Now that alarms are in place to poll the app at regular intervals, use this as a base for adding
visual notifications.

## Add notifications {: #notifications }

Let's change the alarm notification to something the user can easily notice. Use
[`chrome.notifications`][11] to show a desktop notification like the one below:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/05PL1Eb7DMVoXTDgbpk8.png", alt="Our Todo app notification", height="103", width="382" %}

When the user clicks on the notification, the Todo app window should come into view.

### Update app permissions {: #update-permissions-notifications }

In **_manifest.json_**, request the `"notifications"` permission:

```json
"permissions": ["storage", "alarms", "notifications"],
```

### Update background scripts {: #update-background-script-notifications }

In **_background.js_**, refactor the `chrome.app.window.create()` callback into a standalone method
so you can reuse it:

```js/1-6,8/0,7
chrome.app.runtime.onLaunched.addListener(function() {
function launch() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
}
});
chrome.app.runtime.onLaunched.addListener(launch);
...
```

### Update alarm listener {: #update-alarm-listener }

At the top of the _background.js_, add a variable for a database name that's used in the alarm
listener:

```js
var dbName = 'todos-vanillajs';
```

The value of `dbName` is the same database name set in line 17 of _js/app.js_:

```js
var todo = new Todo('todos-vanillajs');
```

### Create a notification {: #create-notification }

Instead of simply logging a new alarm to the Console, update the `onAlarm` listener to get stored
data via `chrome.storage.local.get()` and call a `showNotification()` method:

```js/2/1
chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
  chrome.storage.local.get(dbName, showNotification);
});
```

Add this `showNotification()` method to _background.js_:

```js/4-22
function launch(){
  ...
}

function showNotification(storedData) {
  var openTodos = 0;
  if ( storedData[dbName].todos ) {
    storedData[dbName].todos.forEach(function(todo) {
      if ( !todo.completed ) {
        openTodos++;
      }
    });
  }
  if (openTodos>0) {
    // Now create the notification
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon_128.png',
        title: 'Don\'t forget!',
        message: 'You have '+openTodos+' things to do. Wake up, dude!'
     }, function(notificationId) {});
  }
}

chrome.app.runtime.onLaunched.addListener(launch);
...
```

`showNotification()` will check for open (uncompleted) todo items. If there is at least one open
todo item, create a notification popup via [`chrome.notifications.create()`][12].

The first parameter is an uniquely identifying notification name. You must have an id set in order
to clear or handle interactions with that particular notification. If the id matches an existing
notification, `create()` first clears that notification before making a new notification.

The second parameter is a [`NotificationOptions`][13] object. There are many options for rendering
the notification popup. Here we are using a "basic" notification with an icon, title, and message.
Other notification types include images, lists, and progress indicators. Feel free to return to this
section when you are done Step 3 and experiment with other notification features.

The third (optional) parameter is a callback method that should take on the format:

```js
function(string notificationId) {...};
```

### Handle notification interactions {: #interact-with-notification }

Open the Todo app when the user clicks on the notification. At the end of _background.js_, create a
[`chrome.notifications.onClicked`][14] event handler:

```js
chrome.notifications.onClicked.addListener(function() {
  launch();
});
```

The event handler callback simply calls the `launch()` method. `chrome.app.window.create()` either
creates a new Chrome App window if one doesn't already exist, or brings into focus the currently
open window that has the window id of `main`.

## Launch your finished Todo app {: #launch }

You are done Step 3! Reload your Todo app now with reminders.

Check these behaviors work as expected:

- If you don't have any uncompleted todo items, there are no popup notifications.
- If you click on the notification when your app is closed, the Todo app will open or come into
  focus.

### Troubleshooting {: #troubleshooting }

Your final _background.js_ file should look like [this][15]. If notifications are not showing up,
confirm that your Chrome is version 28 or higher. If notifications still don't show up, check for
error messages in the DevTools Console on both the main window (**right click > Inspect Element**)
and the background page (**right click > Inspect Background Page**).

## For more information {: #recap }

For more detailed information about some of the APIs introduced in this step, refer to:

- [Declare Permissions][16] [↑][17]
- [chrome.alarms][18] [↑][19]
- [chrome.alarms.onAlarm][20] [↑][21]
- [chrome.alarms.create()][22] [↑][23]
- [chrome.alarms.clear()][24] [↑][25]
- [chrome.alarms.getAll()][26] [↑][27]
- [chrome.notifications][28] [↑][29]
- [chrome.notifications.create()][30] [↑][31]
- [NotificationOptions][32] [↑][33]
- [chrome.notifications.onClicked][34] [↑][35]

Ready to continue onto the next step? Go to [Step 4 - Open external links with a webview »][36]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/mangini/io13-codelab/archive/master.zip
[4]: #launch
[5]: /docs/extensions/reference/alarms
[6]: /apps/alarms#event-onAlarm
[7]: /apps/app_codelab_import_todomvc#csp-compliance
[8]: /docs/extensions/reference/alarms#method-create
[9]: /apps/alarms#method-clear
[10]: /apps/alarms#method-getAll
[11]: /apps/notifications
[12]: /apps/notifications#method-create
[13]: /apps/notifications#type-NotificationOptions
[14]: /apps/notifications#event-onClicked
[15]:
  https://github.com/mangini/io13-codelab/blob/master/cheat_code/solution_for_step3/background.js
[16]: /apps/declare_permissions "Read 'Declare Permissions' in the Chrome developer docs"
[17]: #update-permissions-alarms "This feature mentioned in 'Update app permissions for alarms'"
[18]: /docs/extensions/reference/alarms "Read 'chrome.alarms' in the Chrome developer docs"
[19]: #alarms "This feature mentioned in 'Add alarm reminders'"
[20]: /apps/alarms#event-onAlarm "Read 'chrome.alarms.onAlarm' in the Chrome developer docs"
[21]: #update-background-script-alarms "This feature mentioned in ''"
[22]: /apps/alarms#method-create "Read 'chrome.alarms.create()' in the Chrome developer docs"
[23]: #create-alarms "This feature mentioned in 'Create alarms'"
[24]: /apps/alarms#method-clear "Read 'chrome.alarms.clear()' in the Chrome developer docs"
[25]: #clear-alarms "This feature mentioned in 'Clear alarms'"
[26]: /apps/alarms#method-getAll "Read 'chrome.alarms.getAll()' in the Chrome developer docs"
[27]: #get-alarms "This feature mentioned in 'Get alarms'"
[28]: /apps/notifications "Read 'chrome.notifications' in the Chrome developer docs"
[29]: #notifications "This feature mentioned in 'Add notifications'"
[30]:
  /apps/notifications#method-create
  "Read 'chrome.notifications.create()' in the Chrome developer docs"
[31]: #create-notification "This feature mentioned in 'Create a notification'"
[32]:
  /apps/notifications#type-NotificationOptions
  "Read 'NotificationOptions' in the Chrome developer docs"
[33]: #create-notification "This feature mentioned in 'Create a notification'"
[34]:
  /apps/notifications#event-onClicked
  "Read 'chrome.notifications.onClicked' in the Chrome developer docs"
[35]: #interact-with-notification "This feature mentioned in 'Handle notification interactions'"
[36]: ../app_codelab_webview/
