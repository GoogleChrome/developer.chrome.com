---
layout: "layouts/doc-post.njk"
title: Extensions and Apps in the Chrome Web Store
date: 2010-09-01
description: How installable web apps differ from Extensions.
---

The Chrome Web Store introduces the concept of [installable web apps][1]. These apps will live
alongside extensions and themes in the store, which will become the one-stop shop for all three
types of installable components. So what exactly are installable web apps and how do they differ
from extensions? I'm glad you asked...

## Apps and Extensions: A Different User Experience

There's no "better" approach here; apps and extensions are simply different creatures. Let's
understand apps first. They are just how they sound: applications you can run inside your browser
with a dedicated user interface and, typically, rich user interaction. We've already had the concept
of "web apps" in the browser for a few years, as something more rich and interactive than a website,
but less cumbersome and monolithic than a desktop application. Examples include games, photo
editors, and video players; all of these categories are viable as tightly focused apps running
inside the browser. Google Chrome is just formalizing the web app concept in a way that will be
familiar to anyone who's used apps on a smartphone.

How about extensions? Extensions also provide functionality, but unlike apps, there is little or no
UI component. Instead, they extend the functionality of Google Chrome and the websites being viewed
in it. For example, they can extend Google Chrome by adding a new button to the address bar, such as
an ever-present currency converter. Buttons like this can also apply to the current website being
viewed—for example, click the currency converter button to convert all prices on the website you're
viewing. Similarly, you can introduce new items to the context menu, change the behavior of the
omnibox (the input field on the address bar), access the user's browsing history (with consent), and
[much more][2]. You can alter web pages too—for example, embed a "mail this" button next to every
link in every page, or customize the layout of your favorite website.

Compared to apps, extensions cut across websites and web apps; they are usually in effect across all
websites (though some are site-specific). Apps don't combine with other apps in this way; they run
standalone, like any regular website. You can get a better idea of what extensions can do by
browsing the [Extensions Gallery][3].

## Technical Model: A Consistent Model for Packaging and Distribution

Apps and extensions may present a very different user experience, but fortunately for developers,
there's a consistent model for packaging and distributing apps. Here's what they have in common:

**Packaging:** Both are packaged as ".crx" files. These CRX files are special ZIP archives that
contain a manifest.json config file, along with the resources composing the app or extension.

**Browser Support for Development:** The Google Chrome browser has built-in support to help you
develop your app or extension. You can view all apps and extensions at **chrome://extensions/**
(also accessible via menus), and by clicking on "Developer Mode", you get access to tools for
adding, reloading, and packing your apps and extensions. You can also pack CRX files from the
command line.

**Installation Process:** These CRX files can live on any server, and a user can install them by
simply clicking on a link to download the file. In many cases, the server the CRX lives on will be
the Chrome Web Store.

**Permissions:** When users download a CRX file, the browser will indicate which permissions (if
any) it's requesting, according to the included manifest.json config. Installation will only proceed
with the user's consent. Developers can declare that the app or extension should be [autoupdated][4]
whenever a new version is released. Autoupdates happen in the background unless the required
permissions have changed.

The main difference between apps and extensions, from a technical perspective, is a special "launch"
parameter in the manifest. It's present only in apps, and it tells Google Chrome what to show when
the user starts up an installed app. There are also a whole bunch of parameters specific to
extension functionality—for example, you would use the "page_action" parameter to add a button to
the address bar. So are these things mutually exclusive—you either have a "launch" parameter or have
the extension parameters? Not quite...

## Hosted Apps, Packaged Apps, and Extensions

There are actually two kinds of apps: hosted and packaged. A hosted app wraps an online website, so
the CRX package can be as simple as a single manifest.json file pointing to the website. A packaged
app contains the whole kit and kaboodle inside the CRX package—HTML, CSS, and so on, all run from
the user's hard drive.

Packaged apps are a kind of missing link between extensions and hosted apps. They look the same as a
hosted app to the user, but under the covers, they are really like traditional extensions with that
special "launch" parameter. They have access to almost all functionality afforded to regular
extensions—context menu, background pages, and so on. The only exception is that packaged apps can't
add buttons to the address bar.

Returning to the example in the previous section, it's perfectly valid for a packaged app to add an
item to Google Chrome's [context menu][5]. However, it's completely invalid for a hosted app to do
the same thing. In some respects, a packaged app lets you have your cake and eat it: the appearance
of a packaged app with the power of an extension. But there are still plenty of reasons to use pure
extensions and hosted apps.

## When You Need Extension Behavior: Deciding Between Pure Extensions and Packaged Apps

If you want to extend browser behavior or modify web pages, you have no choice but to use an
extension or a packaged app; hosted apps don't have those privileges. You will then be able to
provide any number of extension behaviors. Should you go down this path, the next decision comes
down to pure extension versus packaged app. It's so easy to add a "launch" parameter to your
manifest, you might be tempted to take a pure extension and tack on a dedicated UI for it. Think
twice. Users don't want apps superfluously appearing on their New Tab page if they aren't adding any
value. So make your extension a packaged app only if it's genuinely useful.

Certain extensions will really benefit from an app UI. Imagine a news reader extension that shows
users notifications every time a new story is posted. It's easy to see how this extension could
introduce a dedicated UI showing the stream of recent stories—a proper "big page" experience to
augment what was previously transient content.

Other extensions, not so much. Extensions often have a very specific purpose, so building a new app
UI—even if it is related to the extension's behavior—is probably not what users are after, and it
would be better to build the app UI as a separate app. Imagine a social bookmarking extension
providing a "bookmark this" action via a context menu item. You could imagine the extension becoming
a general-purpose app for the social bookmarking service, but there's a good argument that this is
distinct functionality that should be encapsulated in a separate app, as many users will only want
one or the other, but not both.

Even if your extension needs a UI, it might be enough to use one of the existing extension mechanism
UIs, instead of the full-page UI offered by apps. Extensions can manifest themselves in the form of
context menu items, custom toolbars, notification dialogs, and buttons on the address bar that
reveal extra content when clicked. Also, note that extensions have the concept of [options
pages][6], so you don't need to create an app just to support option setting.

## When You Need App Behavior: Deciding Between Packaged Apps and Hosted Apps

If you want a full-page UI and an icon in the New Tab page, you should opt for an app; that is, your
manifest will include a "launch" parameter. It will be a packaged app if the parameter points to a
local URI ("launch_path") and a hosted app if the URI is online ("web_url"). Incidentally, "pure"
extensions achieved a similar effect in the past by including a hyperlink to a packaged HTML page,
which would then be shown as a full page. We expect many developers will migrate this kind of
extension to a packaged app in the future.

How to decide between packaged and hosted apps? Let's start with the advantages of packaged apps:

- As we've already noted, packaged apps can provide extension behavior. Your packaged app might
  emphasise the extension behavior (an "extension with a face"), the app behavior ("app with extra")
  or it might be a balanced blend of the two styles. The flexibility of packaged apps will be
  appealing to developers seeking to improve the experience of their apps and differentiate from
  similar products. You can still build a standard web app running on a regular website, but make it
  an installable web app and you can add extension behavior to enhance the experience for those who
  install it.
- Packaged apps can run in the background, even when the user hasn't launched your app. This is
  actually just a special case of the previous point, because a powerful extension privilege is the
  ability to run a background page. It starts when the browser starts and is ever-present. Your app
  could therefore keep data fresh and show HTML5 notifications (alerts that work even when the user
  is in another app). Thus, packaged apps support "always on" functionality, while hosted apps are
  only on when they're in the user's active tab.
- Packaged apps will load immediately, being held on the user's hard drive.
- Certain apps, like some games and utilities, will need no network connection at all. These are
  ideal candidates for packaged apps because the user will be able to run them offline. That said,
  hosted apps can usually achieve the same effect with the judicious use of [Application
  Caching][7], a generic HTML5 technology.

For comparison, these are the advantages of hosted apps:

- Hosted apps are easier from an infrastructure perspective if you are looking to offer your web app
  as a regular site to all browsers. (Incidentally, we think this is fine as long as you follow
  basic design principles for installable web apps.) In the case of packaged apps, you'll probably
  need to write a script to put your assets inside a CRX file and in some cases, you may need to
  refactor your code somewhat. Note, however, packaged apps can still perform requests back to your
  website (or indeed any website, since packaged apps can use the "permissions" parameter to perform
  cross-domain requests).
- Hosted apps are especially easier if your existing web app uses server-side scripting to generate
  your pages and content, or if your app relies on form submissions and full page refreshes. With a
  packaged app, you're relying on JavaScript to make any changes to the page.
- Hosted apps may be a better choice if your app and content are very large. The store imposes a 2GB
  limit on CRX files, though a packaged app could always download further content via network calls.
- Hosted apps will require less permissions to be granted by the user. This is the flipside to the
  benefits of extension behavior that packaged apps enjoy.
- Hosted apps will update automatically, just by updating your server. However, this is not a
  significant advantage, because packaged apps support autoupdating, and this is transparent to the
  user unless you've changed the required permissions.

## Summary

The Chrome Web Store opens up a range of new possibilities for creators of web apps and extensions
alike. It provides a new way for users to explore web apps and brings extension functionality to the
attention of a mainstream audience. Appreciating the difference between apps and extensions, and
choosing the approach that makes sense for your own work, is key to building the best possible
experience for your users.

To learn more about installable web apps and ask questions to our team, you can visit our
[discussion group][8].

[1]: https://developers.google.com/chrome/apps/
[2]: http://code.google.com/chrome/extensions/overview.html
[3]: https://chrome.google.com/webstore/category/extensions
[4]: http://code.google.com/chrome/extensions/autoupdate.html
[5]: http://code.google.com/chrome/extensions/contextMenus.html
[6]: http://code.google.com/chrome/extensions/options.html
[7]: http://www.html5rocks.com/tutorials/appcache/beginner/
[8]: http://groups.google.com/a/chromium.org/group/chromium-apps/topics
