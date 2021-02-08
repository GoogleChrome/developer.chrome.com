---
layout: "layouts/doc-post.njk"
title: "Chrome Apps Architecture"
date: 2012-09-17
updated: 2014-06-06
description: An overview of the software architecture of Chrome Apps.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Chrome Apps integrate closely with a user's operating system. They are designed to be run outside of
a browser tab, to run robustly in offline and poor connectivity scenarios and to have far more
powerful capabilities than are available in a typical web browsing environment. The app container,
programming, and security models support these Chrome App requirements.

## App container model {: #container }

The app container describes the visual appearance and loading behavior of Chrome Apps. Chrome Apps
look different than traditional web apps because the app container does not show any traditional web
page UI controls; it simply contains a blank rectangular area. This allows an app to blend with
"native" apps on the system, and it prevents the user from "messing" with the app logic by manually
changing the URL.

Chrome Apps are loaded differently than web apps. Both load the same type of content: HTML documents
with CSS and JavaScript; however, a Chrome App is loaded in the app container, not in the browser
tab. Also, the app container must load the main document of the Chrome App from a local source. This
forces all Chrome Apps to be at least minimally functional when offline and it provides a place to
enforce stricter security measures.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1elqMcady4myIQ5qqQxA.png",
       alt="how app container model works", height="172", width="671" %}

## Programming model {: #programming }

The programming model describes the lifecycle and window behavior of Chrome Apps. Similar to native
apps, the goal of this programming model is to give users and their systems full control over the
app lifecycle. The Chrome App lifecycle should be independent of browser window behavior or a
network connection.

The "event page" manages the Chrome App lifecycle by responding to user gestures and system events.
This page is invisible, only exists in the background, and can be closed automatically by the system
runtime. It controls how windows open and close and when the app is started or terminated. There can
only be one "event page" for a Chrome App.

{% YouTube id="yr1jgREbH8U" %}

### App lifecycle at a glance {: #lifecycle }

For detailed instructions on how to use the programming model, see [Manage App Lifecycle][3]. Here's
a brief summary of the Chrome App lifecyle to get you started:

<table class="simple"><tbody><tr><th scope="col">Stage</th><th scope="col">Summary</th></tr><tr><td>Installation</td><td>User chooses to install the app and explicitly accepts the <a href="declare_permissions">permissions</a>.</td></tr><tr><td>Startup</td><td>The event page is loaded, the 'launch' event fires, and app pages open in windows. You <a href="app_lifecycle#eventpage">create the windows</a> that your app requires, how they look, and how they communicate with the event page and with other windows.</td></tr><tr><td>Termination</td><td>User can terminate apps at any time and app can be quickly restored to previous state. <a href="app_lifecycle#local_settings">Stashing data</a> protects against data loss.</td></tr><tr><td>Update</td><td>Apps can be updated at any time; however, the code that a Chrome App is running cannot change during a startup/termination cycle.</td></tr><tr><td>Uninstallation</td><td>User can actively uninstall apps. When uninstalled, no executing code or private data is left behind.</td></tr></tbody></table>

## Security model {: #security }

The Chrome Apps security model protects users by ensuring their information is managed in a safe and
secure manner. [Comply with CSP][7] includes detailed information on how to comply with content
security policy. This policy blocks dangerous scripting reducing cross-site scripting bugs and
protecting users against man-in-the-middle attacks.

Loading the Chrome App main page locally provides a place to enforce stricter security than the web.
Like Chrome extensions, users must explicitly agree to trust the Chrome App on install; they grant
the app permission to access and use their data. Each API that your app uses will have its own
permission. The Chrome Apps security model also provides the ability to set up privilege separation
on a per window basis. This allows you to minimize the code in your app that has access to dangerous
APIs, while still getting to use them.

Chrome Apps reuse Chrome extension process isolation, and take this a step further by isolating
storage and external content. Each app has its own private storage area and can't access the storage
of another app or personal data (such as cookies) for websites that you use in your browser. All
external processes are isolated from the app. Since iframes run in the same process as the
surrounding page, they can only be used to load other app pages. You can use the `object` tag to
[embed external content][8]; this content runs in a separate process from the app.

{% YouTube id="EDtiWN42lHs" %}

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: app_lifecycle
[4]: declare_permissions
[5]: app_lifecycle#eventpage
[6]: app_lifecycle#local_settings
[7]: contentSecurityPolicy
[8]: app_external
