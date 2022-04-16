---
layout: "layouts/doc-post.njk"
title: Handling service worker updates with immediacy
date: 2021-12-07
description: >
  Sometimes when you update a service worker, it's good to let users know. Here, you'll learn how to do just that.
---

By default, the [service worker lifecycle](/docs/workbox/service-worker-lifecycle/) requires that [when an updated service worker is found and installed](/docs/workbox/service-worker-lifecycle/#handling-service-worker-updates), all open tabs that the current service worker is controlling must be closed or undergo a navigation before the updated service worker activates and takes control.

In many cases, it may be fine to allow this to happen in due course, but in some cases, you may want to give the user a heads up that there's a pending service worker update, and then automate the process of switching over to the new service worker. To do this, you'll need to add some code in your page, and your service worker.

## The code to put in your page

The following code runs in an inline `<script>` element using JavaScript modules imported from a CDN-hosted version of `workbox-window`. It registers a service worker using `workbox-window`, and will react if the service worker gets stuck in the waiting phase. When a waiting service worker is found, this code informs the user that an updated version of the site is available and prompts them to reload.

```html
<!-- This script tag uses JavaScript modules, so the proper `type` attribute value is required -->
<script type="module">
  // This code sample uses features introduced in Workbox v6.
  import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-window.prod.mjs';

  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    let registration;

    const showSkipWaitingPrompt = async (event) => {
      // Assuming the user accepted the update, set up a listener
      // that will reload the page as soon as the previously waiting
      // service worker has taken control.
      wb.addEventListener('controlling', () => {
        // At this point, reloading will ensure that the current
        // tab is loaded under the control of the new service worker.
        // Depending on your web app, you may want to auto-save or
        // persist transient state before triggering the reload.
        window.location.reload();
      });

      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.

      // This code assumes your app has a promptForUpdate() method,
      // which returns true if the user wants to update.
      // Implementing this is app-specific; some examples are:
      // https://open-ui.org/components/alert.research or
      // https://open-ui.org/components/toast.research
      const updateAccepted = await promptForUpdate();

      if (updateAccepted) {
        wb.messageSkipWaiting();
      }
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener('waiting', (event) => {
      showSkipWaitingPrompt(event);
    });

    wb.register();
  }
</script>
```

{% Aside %}
This type of UI element is variously called a ["toast"](https://open-ui.org/components/toast.research) or an ["alert"](https://open-ui.org/components/alert.research), and there are many pre-made implementations you can drop-in to your site if you don't want to write your own. For this example, it's implementation is left abstract.
{% endAside %}

If they accept, `messageSkipWaiting()` tells the waiting service worker to invoke [`self.skipWaiting()`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting), meaning it will begin to activate. Once activated, the new service worker will take control of any existing clients, triggering the `controlling` event in `workbox-window`. When this happens, the current page reloads using the latest version of all the precached assets and any new routing logic found in the updated service worker.

{% Aside %}
This is just one approach to this problem. For a more detailed explanation of the problem, and alternative approaches, read this article by [Redfin Engineering](https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68).
{% endAside %}

## The code to put in your service worker

Once you've got the code from the previous section in your page, you'll need to add some code to your service worker that lets it know when to skip the waiting phase. If you're using [`generateSW`](/docs/workbox/precaching-with-workbox/#precaching-with-generatesw) from `workbox-build` and you have its `skipWaiting` option set to `false` (the default), then you're good to go, as the code below will be automatically included in your generated service worker file.

If you're writing your own service worker&mdash;perhaps in conjunction with one of Workbox's build tools in [`injectManifest` mode](/docs/workbox/precaching-with-workbox/#precaching-with-injectmanifest)&mdash;you'll need to add the following code yourself:

```js
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

This will listen for messages sent to the service worker from `workbox-window` with a `type` value of `SKIP_WAITING`, and when that happens, calls `self.skipWaiting()`. The `messageSkipWaiting()` method in `workbox-window`, shown in the earlier code sample, is responsible for sending this message.

## Do you need to show a prompt?

This isn't a pattern every application that deploys a service worker needs to follow. It's for select scenarios where failing to provide an opportunity to reload a page on a service worker update may bring about unexpected behaviors. There are no hard and fast rules for whether you should show a reload prompt, but here are a few situations in which it may make sense:

- You use precaching extensively. Where static assets are concerned, you can have issues later on if you use a network-first or network-only strategy for navigation requests, but lazy-load static assets. This can cause situations where versioned assets may change, and a service worker hasn't precached them. Offering a reload button here may avoid some unexpected behaviors.
- If you're serving precached HTML. In this case, you should _strongly_ consider offering a reload button on service worker updates, since updates to that HTML won't be recognized until the updated service worker takes control.
- If you don't rely mostly on runtime caching. When caching resources at runtime, you don't need to let the user know they should reload. As versioned assets change, they will be added to the runtime cache in due course&mdash;assuming navigation requests use a network-first or network-only strategy.
- When using a stale-while-revidate strategy, you might consider using the [`workbox-broadcast-update` module](/docs/workbox/modules/workbox-broadcast-update/) to notify users of service worker updates.

Whether you need to notify the user of updates to a service worker depends on your application, and its unique requirements. If you find that your users are experiencing strange behaviors when you push out a new service worker, that's probably your best signal that you should notify them.
