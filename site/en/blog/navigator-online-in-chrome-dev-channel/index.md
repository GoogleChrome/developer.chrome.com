---
layout: 'layouts/blog-post.njk'
title: navigator.onLine in Chrome Dev channel
description: >
  With the offline APIs in HTML5, there's no excuse not to provide a flawless offline experience for users.
authors:
  - ericbidelman
date: 2011-06-23
updated: 2011-06-23

---


With the [offline APIs](http://www.html5rocks.com/features/offline) in HTML5, there's no excuse not to provide a flawless offline experience for users. One thing that can help this story is the `navigator.onLine` property; a feature that recently landed in Chrome dev channel. This property returns `true` or `false` depending on whether or not the app has network connectivity:

```js
if (navigator.onLine) {
    console.log('ONLINE!');
} else {
    console.log('Connection flaky');
}
```   

A web app can also listen for `online` and `offline` events to determine when the connection is available again or when an app goes offline:

```js
window.addEventListener('online', function(e) {
    // Re-sync data with server.
}, false);

window.addEventListener('offline', function(e) {
    // Queue up events for server.
}, false);
```    

I've posted a working demo at [http://html5-demos.appspot.com/static/navigator.onLine.html](http://html5-demos.appspot.com/static/navigator.onLine.html) and more information on offline events can be found in the [MDN](https://developer.mozilla.org/Online_and_offline_events).


