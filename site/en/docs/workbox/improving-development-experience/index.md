---
layout: "layouts/doc-post.njk"
title: Improving the service worker development experience
date: 2021-10-20
description: >
  How to solve some of the local development issues you may encounter when using service workers.
---

While the service worker lifecycle ensures a predictable installation and update process, 
it can make the local development cycle a little more nuanced.

In the typical local development cycle, developers save changes to files in a text editor, 
then switch to the browser to verify changes, and the process repeats. 
When a service worker is in the mix, this cycle is largely the same, 
but there may be differences between what the developer expects and what the browser does.

## Exceptions for local development

In general, service worker APIs are only available on pages served over HTTPS, 
but there are exceptions to this rule where they may be available over HTTP. 
One notable exception is for pages served over `localhost`, which works well for local development.

However, it's not unusual for developers to specify local hostnames aside from `localhost` in a 
[hosts file](https://en.wikipedia.org/wiki/Hosts_(file)). 
This is required in local development environments when multiple projects require separate hostnames. 
In these cases, provisioning a self-signed certificate will do.

A more convenient workaround is to instruct the browser to make exceptions for service worker testing. 
For Chrome, navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure` 
and specify insecure origins to treat as secure origins. 
Firefox offers a way to test service workers on insecure origins through the `devtools.serviceWorkers.testing.enabled` setting in `about:config`.

{% Aside 'warning' %}
While treating insecure local hostnames as secure shouldn't be risky for local development, 
never instruct users to use this tool. It's meant for developers only!
{% endAside %}

## Service worker development aids

Local development with a service worker in the mix can lead to seemingly unexpected behaviors. 
For example, let's say a cache-only strategy is in place for unversioned static assets, or a precached "you're offline" page that's expected to update on reload after making changes. 
Because a stale version of those assets are always being served from a `Cache` instance, 
they seemingly never update! 
Frustrating as this is, the service worker is only doing what it was built to do, 
but there are some ways to make testing easier.

*By far the most effective way to test a service worker is to rely on private browsing windows*, such as incognito windows in Chrome, 
or Firefox's Private Browsing feature. 
Every time you open a private browsing window, you start fresh. 
There are no active service workers, and no open `Cache` instances. The routine for this kind of testing is:

1. Open a private browsing window.
2. Navigate to a page that registers a service worker.
3. Verify if the service worker behaves as you expect.
4. Close the incognito window.
5. Repeat.

With this process, you're faithfully mimicking the service worker lifecycle.

Other testing tools available in the [Chrome DevTools Application panel](/docs/devtools/progressive-web-apps/) 
can help&mdash;though they can modify the service worker lifecycle in some ways.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/nSbFQMn5zGJmaoVBKwF4.png", alt="The Chrome DevTools Application Panel.", width="800", height="234" %}

The application panel has a subpanel labeled **Service Workers**, 
which shows active service workers for the current page. 
Each active service worker can be manually updated or even unregistered altogether. 
There are also three toggles at the top that aid in development.

1. **Offline** simulates offline conditions. This helps when testing if an active service worker is serving offline content.
2. **Update on reload**: when toggled, refetches and replaces the current service worker any time the page is reloaded.
3. **Bypass for network**, when toggled, circumvents any code in a service worker's `fetch` event and always fetches content from the network.

{% Aside 'caution' %}
It may be tempting to rely on the "Update for reload" checkbox during local development. 
In fact, it's quite useful. 
Unfortunately, it's easy to leave on, and fundamentally changes how the service worker lifecycle works as long as it's checked and Chrome's DevTools are open. 
Our recommendation is to avoid making this feature a central part of testing service workers.
{% endAside %}

These are helpful toggles, particularly **Bypass for network**, 
which is great when you're developing a project with an active service worker, 
but also want to ensure that the experience works as expected without a service worker.

Firefox has a similar application panel in its developer tools, 
but the functionality is restricted to showing what service workers are installed, 
as well as the ability to manually unregister any active service workers for the current page. 
It's just as helpful, but it does require more manual effort in the local development cycle.

## Shift and reload

When developing locally with an active service worker without the need for the functionality that **update on refresh** or **bypass for network** provides, it's also useful to hold <kbd>Shift</kbd> and press the refresh button.

{% Aside %}
*Tip:* A keyboard-only variation of this involves pressing 
<kbd>Shift</kbd>, <kbd>Cmd</kbd>, and <kbd>R</kbd> on macOS machines, and <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, and <kbd>R</kbd> on Windows or other machines.
{% endAside %}

This is called a _forced refresh_, which bypasses the HTTP cache for the network. 
When a service worker is active, a forced refresh will also bypass the service worker entirely.

{% Aside 'caution' %}
Be aware that a forced refresh only bypasses the service worker one time only and not for subsequent requests! 
The service worker will take control again on the next navigation request that hasn't been kicked off by a forced refresh.
{% endAside %}

This functionality is great if there is uncertainty around whether a particular caching strategy is working as intended, 
and it's useful to grab everything from the network to compare behaviors with and without a service worker. 
Better yet, it's a specified behavior, so all browsers that support service workers will observe it.

## Inspecting cache contents

It's hard to tell if a caching strategy is working as intended if the cache can't be inspected. 
Sure, the cache _could_ be inspected in code, 
but that's a process involving debuggers and/or `console` statements when a visual tool would be better suited for the task. 
The Application panel in Chrome DevTools offers a subpanel to inspect the contents of `Cache` instances.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/ViwYPrULHpoh6As2m9st.png", alt="Inspecting the cache in DevTools", width="800", height="445" %}

This subpanel makes service worker development easier by offering functionality such as:

- View the names of `Cache` instances.
- The ability to inspect the response body of cached assets, and their associated response headers.
- Evict one or more items from the cache, or even delete entire `Cache` instances.

This graphical user interface makes it easier to inspect service worker caches to see if items were added, updated, or removed altogether from a service worker cache. Firefox offers [its own cache viewer with similar functionality](https://developer.mozilla.org/docs/Tools/Storage_Inspector), although it lives in a separate **Storage** panel.

## Simulating a storage quota

In websites with lots of large static assets (such as high-resolution images), 
it's possible to hit storage quotas. When this happens, 
the browser will evict items from the cache that it deems stale, or otherwise worthy to sacrifice to make room for new assets.

Dealing with storage quotas should be a part of service worker development, 
and Workbox makes that process simpler than managing it yourself. 
With or without Workbox, though, simulating a custom storage quota to test cache management logic might be a good idea.

<figure>
    {% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/EkLwut99tIZR0tionBte.png", alt="The storage usage viewer.", width="800", height="781" %}

    <figcaption>The storage usage viewer in the Application panel of Chrome's DevTools. Here, a custom storage quota is being set.</figcaption>
</figure>

The Application panel in Chrome's DevTools has a **Storage** subpanel that offers information on how much of the current storage quota is being used by the page. 
It also allows for a custom quota to be specified in megabytes. 
When in effect, Chrome will enforce the custom storage quota so it can be tested.

Incidentally, this subpanel also contains a **Clear site data** button and a whole array of associated checkboxes for what should be cleared when the button is clicked. 
Among these items are any open `Cache` instances, and the ability to unregister any active service workers controlling the page.

## Easier development, better productivity

When developers are unencumbered, they can work more confidently and be more productive. 
Local development with a service worker can be nuanced, but it doesn't have to be painful. 
With these tips and tricks, developing with an active service worker should be much more transparent and predictable, 
leading to a better developer experience.
