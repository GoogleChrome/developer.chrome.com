---
layout: "layouts/doc-post.njk"
title: "Migrating from Packaged App to Chrome App or Extension"
#date: TODO
#updated: TODO
description: Guidelines on converting your packaged app to a Chrome App or Extension.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on Windows, Mac, and Linux. Chrome OS
will continue to support Chrome Apps. Additionally, Chrome and the Web Store will continue to
support extensions on all platforms. [Read the announcement][1] and learn more about [migrating your
app][2].

{% endAside %}

Since their initial introduction, packaged apps have evolved into Chrome Apps and Chrome Extensions.
If your your legacy packaged app has an active user base, you will likely want to migrate to a new
Chrome App or Extension, rather than publishing a new seperate item in the Chrome Web Store.

## Quick Overview of Migration {: #overview }

- You'll need to decide whether your new item should be either a Chrome App or a Chrome Extension.
- Convert your legacy app to the new type, test it, and package it as a ZIP file.
- In the CWS Developer Dashboard, upload the new ZIP.

## Step 1: Determine item type. {: #step1 }

First you'll need to determine the item type that best fits your application.

If your legacy app interacts with open-web content that your users browse to, expects to be in a
Chrome tab, or needs a UI surface in the Chrome address bar, then it should become an extension. If,
on the other hand, your legacy app is more like a native application and could be implemented as its
own top-level window running side-by-side with Chrome rather than in a Chrome tab, then it should
become a Chrome App.

## Step 2: Prepare for the new CWS {: #step2 }

You will also need to prepare for the new Chrome Web Store requirements.

The first requirement is that your manifest be updated to Version 2. Read the tutorial for migration
to Manifest v2. In addition to certain manifest naming changes and the removal of certain deprecated
APIs, Manifest Version 2 includes a default Content Security Policy. In the case of extensions, it's
a good idea to update to CSP, but for Chrome Apps, it's a requirement. Finally, remove
app:launch:local_path from your legacy app's manifest. This was the manifest key that determined
that your app was a legacy packaged app. The next steps depend on which new item type you're
targeting.

## Step 3: Update your code. {: #step3 }

If you've decided your app should be a Chrome Extension, you'll want to familiarize yourself with
all the details about Chrome Extensions. The principal difference between a legacy packaged app and
a Chrome Extension is that packaged apps had their own Chrome tab to themselves, whereas extensions
generally enhance other web content that your users are browsing in Chrome. So you'll need to decide
whether to modify your legacy app to operate as an enhancement to web content, or else fit its UI
into the surfaces offered by browser actions or page actions.

If you've decided to convert your packaged app to a Chrome App, you'll need to understand the Chrome
Apps lifecycle, and how to create an event page as the starting point for your app. The easiest
first step will be to resurrect your legacy app in a Chrome App window. To do so, create an event
page, and in the chrome.app.runtime.onLaunched() event handler, call chrome.app.window.create(), and
for the url parameter, pass in the URL of the start page you had been using for
app:launch:local_path in your legacy app manifest. Reloading your app should bring up a new window
outside Chrome with your legacy app's content inside, and you can iterate from that point onward to
restore any missing functionality. Once your app is running again, have a look at the new Chrome App
APIs that are now available to your app. You might be inspired to take your legacy app in a whole
new product direction!

## Step 4: Test your app {: #step4 }

Some things to look out for: is user data preserved? Are all UI elements still reachable? If you're
struggling to fit concepts from your app into the new type, consider whether you should change your
app-or-extension decision.

## Step 5: Upload and Publish. {: #step5 }

Once you upload the new version of your product, the Store will automatically detect that it's a new
type.

## Step 6: Promote your new item {: #step6 }

Congratulations! Your legacy app is now migrated. Let your users know about the change, and go find
new users!

[1]: http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html
[2]: /apps/migration
