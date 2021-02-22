---
layout: "layouts/doc-post.njk"
title: "Offline First"
date: 2012-09-17
updated: 2015-09-25
description: How to build Chrome Apps that work offline.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Because internet connections can be flakey or non-existent, you need to consider _offline first_:
write your app as if it has no internet connection. Once your app works offline, add whatever
network functionality you need for your app to do more when it's online. Read on for tips on
implementing your offline-enabled app.

## Overview {: #overview }

Chrome Apps get the following for free:

- Your app's files—all of its JavaScript, CSS, and fonts, plus other resources it needs (such as
  images)—are **already downloaded**.
- Your app can **save and optionally sync** small amounts of data using the [Chrome Storage API][3].
- Your app can **detect changes in connectivity** by listening for [online and offline events][4].

But those abilities aren't enough to guarantee that your app will work offline. Your offline-enabled
app should follow these rules:

Use local data whenever possible.

: When using resources from the internet, use `XMLHttpRequest` to get it, and then save the data
  locally. You can use the Chrome Storage API, IndexedDB, or Filesystem API to save data locally.

Separate your app's UI from its data.

: Separating the UI and data not only improves your app's design and eases the task of enabling
  offline usage, but also lets you provide other views of the user's data. An MVC framework can help
  you keep the UI and data separate.

Assume your app can be closed at any time.

: Save application state (both locally and remotely, when possible) so that users can pick up wherever
  they left off.

Test your app thoroughly.

: Make sure your app works well in both [common and tricky scenarios][5].

## Security restrictions {: #possibilities }

Chrome Apps are limited in where they can place their resources:

- Because local data is visible on the user's machine and can't be securely encrypted, **sensitive
  data must stay on the server**. For example, don't store passwords or credit card numbers locally.
- All **JavaScript** that the app executes must be in the app's package. It **cannot** be inline.
- All **CSS styles**, **images**, and **fonts** can be initially located either in the app's package
  or at a remote URL. If the resource is remote, you can't specify it in your HTML. Instead, get the
  data using `XMLHttpRequest` (see [Referencing external resources][6]). Then either refer to the
  data with a blob URL or (better yet) save and then load the data using the [Filesystem
  API][7].
  
  {% Aside %}

  **Note:** Styles can be inline or in separate `.css` files.

  {% endAside %}

You can, however, load large media resources such as videos and sounds from external sites. One
reason for this exception to the rule is that the `<video>` and `<audio>` elements have good fallback
behavior when an app has limited or no connectivity. Another reason is that fetching and serving
media with `XMLHttpRequest` and blob URLs currently does not allow streaming or partial buffering.

To provide a sandboxed iframe, you can create an `<webview>` tag. Its contents can be remote, but it
has no direct access to the Chrome app APIs (see [Embed external web pages][8]).

Some of the restrictions on Chrome Apps are enforced by the [Content Security Policy (CSP)][9] which
is always the following and cannot be changed for Chrome Apps:

```text
default-src 'self';
connect-src * data: blob: filesystem:;
style-src 'self' blob: data: filesystem: 'unsafe-inline';
img-src 'self' blob: data: filesystem:;
frame-src 'self' blob: data: filesystem:;
font-src 'self' blob: data: filesystem:;
media-src * data: blob: filesystem:;
```

## Specifying offline_enabled {: #manifest }

It is assumed that your app behaves well offline. If it doesn't, you should advertise that fact, so
that its launch icon is dimmed when the user is offline. To do so, set `offline_enabled` to `false`
in the [app manifest file][10]:

```json
{
  "name": "My app",
  ...
  "offline_enabled": false,
  ...
}
```

## Saving data locally {: #saving-locally }

The following table shows your options for saving data locally (see also [Manage Data][11]).

<table class="simple"><tbody><tr><th>API</th><th>Best use</th><th>Notes</th></tr><tr><td>Chrome Storage API</td><td>Small amounts of string data</td><td>Great for settings and state. Easy to sync remotely (but you don't have to). Not good for larger amounts of data, due to quotas.</td></tr><tr><td>IndexedDB API</td><td>Structured data</td><td>Enables fast searches on data. Use with the <a href="declare_permissions">unlimitedStorage permission</a>.</td></tr><tr><td>Filesystem API</td><td>Anything else</td><td>Provides a sandboxed area where you can store files. Use with the <a href="declare_permissions">unlimitedStorage permission</a>.</td></tr></tbody></table>

{% Aside %}

**Note:** Packaged apps cannot use Web SQL Database or localStorage. The WebSQL specification has
been deprecated for awhile now, and localStorage handles data synchronously (which means it can be
slow). The Storage API handles data asynchronously.

{% endAside %}

## Saving data remotely {: #saving-remotely }

In general, how you save data remotely is up to you, but some frameworks and APIs can help (see [MVC
Architecture][14]). If you use the Chrome Storage API, then all syncable data is automatically
synced whenever the app is online and the user is signed in to Chrome. If the user isn't signed in,
they'll be prompted to sign in. However, note that the user's synced data is deleted if the user
uninstalls your app. {QUESTION: true?}

Consider saving users' data for at least 30 days after your app is uninstalled, so that users will
have a good experience if they reinstall your app.

## Separating UI from data {: #mvc }

Using an MVC framework can help you design and implement your app so that the data is completely
separate from the app's view on the data. See [MVC Architecture][15] for a list of MVC frameworks.

If your app talks to a custom server, the server should give you data, not chunks of HTML. Think in
terms of RESTful APIs.

Once your data is separate from your app, it's much easier to provide alternate views of the data.
For example, you might provide a website view of any public data. Not only can a website view be
useful when your user is away from Chrome, but it can enable search engines to find the data.

## Testing {: #testing }

Make sure your app works well under the following circumstances:

- The app is installed, and then immediately goes offline. In other words, the first use of the app
  is offline.
- The app is installed on one computer and then synced to another.
- The app is uninstalled and then immediately installed again.
- The app is running on two computers at the same time, with the same profile. The app must behave
  reasonably when one computer goes offline, the user does a bunch of stuff on that computer, and
  then the computer comes online again.
- The app has intermittent connectivity, switching often between online and offline.

Also make sure that the app saves **no sensitive user data** (such as passwords) on the user's
machine.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: storage
[4]: https://developer.mozilla.org/en/Online_and_offline_events
[5]: #testing
[6]: app_external#external
[7]: app_storage
[8]: app_external#webview
[9]: contentSecurityPolicy
[10]: manifest
[11]: app_storage
[12]: declare_permissions
[13]: declare_permissions
[14]: app_frameworks
[15]: app_frameworks
