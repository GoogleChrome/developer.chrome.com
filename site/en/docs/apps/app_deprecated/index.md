---
layout: "layouts/doc-post.njk"
title: "Disabled Web Features"
#date: TODO
#updated: TODO
#description: TODO
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Though Chrome Apps use the web platform, some web features have been disabled or else are used in a
different way. Mainly this is to avoid security issues and to improve programming practices. Below
is a summary of the disabled features of the web platform and potential work-arounds:

<table class="simple"><tbody><tr><th scope="col">Disabled</th><th scope="col">Work-around</th></tr><tr><td><code>alert</code></td><td>Use a custom lightbox/popup.</td></tr><tr><td>Browser chrome APIs</td><td>N/A.</td></tr><tr><td><code>confirm</code></td><td>Use a custom lightbox/popup.</td></tr><tr><td><code>document.cookie</code></td><td>Packaged app pages are not rendered on the server, so there is no need to use these.</td></tr><tr><td><code>document.close</code></td><td>N/A.</td></tr><tr><td><code>document.open</code></td><td>N/A.</td></tr><tr><td><code>document.write</code></td><td>Use document.createElement.</td></tr><tr><td>External resources</td><td>Use the <code>webview</code> tag for iframes. See <a href="app_external">Embed Content</a> and <a href="webview_tag">Webview Tag API</a>. Video and audio are allowed to have non-local URLs.</td></tr><tr><td>Flash</td><td>Use HTML5 Platform.</td></tr><tr><td>Form submission</td><td>Use JavaScript to process form content (listen for submit event, process data locally first before sending to server).</td></tr><tr><td>javascript: urls</td><td>You cannot use bookmarklets for inline javascript on anchors. Use the traditional click handler instead.</td></tr><tr><td>localStorage</td><td>Use IndexedDB or the Storage API (which also syncs to the cloud).</td></tr><tr><td>Navigation</td><td>Links open up with the system web browser. <code>window.history</code> and <code>window.location</code> are disabled.</td></tr><tr><td>Non-sandboxed plugins</td><td>N/A.</td></tr><tr><td><code>showModalDialog</code></td><td>Use a custom lightbox/popup.</td></tr><tr><td>Synchronous <code>XMLHttpRequest</code></td><td>Use async-only <code>XMLHttpRequest</code>: <a href="http://updates.html5rocks.com/2012/01/Getting-Rid-of-Synchronous-XHRs">Getting Rid of Synchrounous XXRs</a>.</td></tr><tr><td>User Text selection</td><td>By default, users can no longer select text like they can on a web page. To make areas of the app's text selectable, apply the CSS style, <code>-webkit-user-select: text;</code>.</td></tr><tr><td>webSql</td><td>Use IndexedDB or <a href="app_storage">Filesystem API</a>.</td></tr></tbody></table>

[1]: https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html
[2]: /apps/migration
[3]: app_external
[4]: webview_tag
[5]: http://updates.html5rocks.com/2012/01/Getting-Rid-of-Synchronous-XHRs
[6]: app_storage
