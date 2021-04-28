---
layout: "layouts/doc-post.njk"
title: Frequently Asked Questions
date: 2020-06-09
description: Frequently asked questions about Chrome Web Store.
---

The [Chrome Web Store][1] lets you publish free or paid apps where Google Chrome users can easily
find them. This FAQ answers many common questions about the Chrome Web Store. If you don't find your
answer here, check the [extension hosting changes FAQs][2], the [general extension FAQs][3], or the
[chromium-apps group][4].

Please expand the _Table of Contents_ to quickly navigate this page.

## General Questions

### What is the Chrome Web Store? {: #faq-gen-01 }

The Chrome Web Store is an open marketplace for [Chrome Apps][apps], [Google Chrome
Extensions][ext], and [Google Chrome Themes][themes], where consumers may browse, install, and
purchase items and install them in their browser. These items are built with web technologies and
run inside of web browsers.

### How many people use Chrome? {: #faq-gen-02 }

In 2015, Google announced one billion active users for Chrome. It's also important to note that
Chrome Web Store apps can run in any browser that supports the web technologies used to build the
app.

### Is there a road map for Chrome? {: #faq-gen-05 }

You can follow the [Google Chrome Releases blog][95] to learn about all the latest changes that are
being made to Chrome. You can create and track bugs and features in the [Chromium bug tracker][96],
and we recommend that you download and install the [Dev channel build][97] of Chrome browser.

### Which version of Chrome should I target for my Chrome Web Store apps? {: #faq-gen-06 }

You should target Chrome 8 as a minimum, however the Chrome Web Store was made available to all
users in Chrome 9.

### Why would someone install a web app instead of just using a bookmark or typing in a URL? {: #faq-gen-07 }

Installing an app ensures it is launchable from the New Tab Page via the Chrome apps launcher.
Installing an app also allows you to grant it privileges such as unlimited local storage and
background pages.

### Is there an approval process for apps in the store? {: #faq-gen-08 }

All apps go through an automated review process and in some cases, an app will be published without
further manual review. There may be some instances in which a manual review will be required before
the app is published based on our [program policies][98]. In some cases, where sensitive permissions
are requested, review times and/or approval times may be longer.

### How will users find my app? {: #faq-gen-09 }

The Chrome Web Store will surface web apps in a variety of ways. Of course, each app gets a page in
the store, which will be searchable via the store and other search engines. There will be category
lists in the store, as well as a variety of curated and algorithmically generated lists. We
recommend that you broadly promote your web app, through marketing websites and other means, so that
users will find your app even outside of the store.

### Why am I being asked to pay a registration fee? {: #faq-gen-11 }

The registration fee helps to prevent fraud in the Chrome Web Store. You need to pay this one-time
fee before you can access the Chrome Web Store Developer Dashboard.

{% Aside %}
If you are already using the developer dashboard but haven't paid this fee yet, you must
now pay it in order to continue accessing your developer dashboard. This one-time fee is now part of
the standard [developer registration process][99].
{% endAside %}

### How can I sign up using my Google Apps email address (for example, admin@example.com)? {: #faq-gen-17 }

If you can't sign into the Chrome Web Store Developer Dashboard with your Google Apps email address,
you have two options:

1.  Go to [https://www.google.com/accounts/NewAccount][100], and create a Google Account whose login
    email is your Google Apps email address. Once you do this, you'll be able to log in using that
    email address. Note, however, that you'll have two accounts with the same login email address: a
    Google Account and a Google Apps account.
2.  Wait until the domain is transferred to the new Google Apps account infrastructure. Transitioned
    Google Apps accounts will be able to log into the Chrome Web Store Developer Dashboard. For more
    information, read the [help for the new Google Apps infrastructure][101].

We recommend option 1 if you want to get up and running as soon as possible.

### What types of apps or extensions are not allowed in the store? {: #faq-gen-22 }

While we try to allow most apps and extensions, a small number of extensions are explicitly
disallowed in our [Developer Terms of Service][102] and [Program Policies][103]. Such apps or
extensions will be removed when they are brought to our attention.

### How do I report an abusive app or extension? {: #faq-gen-23 }

To report an app or extension which violates our Terms of Service, locate the corresponding listing
in the store and use the "Report abuse" link.

### How are items ranked in the store? {: #faq-gen-24 }

Items in the store are ranked or featured in order to make it easier for users to find high quality
content. Ranking is performed by a heuristic that takes into account ratings from users as well as
usage statistics, such as the number of downloads vs. uninstalls over time.

Other factors include the following:

- The design is pleasant to the eye.
- The item provides a clear purpose and fills a real user need.
- The setup and onboarding flow are intuitive.
- The item is easy to use.

### What are "By Google" extensions?

Certain extensions on the Chrome Web Store are marked as "By Google". These extensions have been
developed by Google and go through a rigorous review process. You may also search specifically for
these extensions by checking the "By Google" checkbox on the search pages.

### How are "Featured" items selected? {: #faq-gen-25 }

The Chrome Web Store team occasionally selects interesting listings as "Featured" listings. We're
not accepting requests to be featured at this point, since that would quickly become unmanageable.
Here are a few tips to increase the likelihood that we'll feature your listing:

- Write a great piece of software
- Make sure your listing looks really nice (nice icon, good descriptions, crisp screenshots and/or
  videos)
- Promote your listing independently so that it starts to rise in the rankings

### How can my app or extension be selected for a collection? {: #faq-gen-26 }

The collections are curated, and are not intended to be comprehensive. A collection is curated using
the ranking criteria already listed and may be selected to provide helpful results for certain
circumstantial situations, such as work-from-home extensions. Solicitations to be placed in a
collection are not accepted.

### How can I provide support for users of my app or extension? {: #faq-gen-27 }

You can set up discussion groups to communicate with your users. One way of doing so is through
[Google Groups][104].

### Can I remove comments from my listing if I believe they are unfair? {: #faq-gen-28 }

No, you can't remove user comments. However, we encourage you to respond to user feedback in the
comments to show that you are addressing their concerns.

You may also report fake reviews via the Developer Support Form.

### Is there a limit to the number of items I can have on the Chrome Web Store? {: #faq-gen-29 }

You can upload as many items to the Chrome Web Store as you like, but by default, you are limited to
having a total of 20 published items at any one time. This limit applies to the sum of your Chrome
Apps and Chrome Extensions as a total—it is not 20 of each item. If you reach this limit, [you may
request a limit increase][105]. The Chrome Web Store staff will review your existing items and your
developer account history, and if approved, you will be granted an increase. Please note that if
your developer account has been suspended in the past, or you have had items taken down previously
for policy violations, or your items consistently receive low quality ratings, your request may be
denied.

### Can I obfuscate my code? {: #faq-gen-30 }

As of October 1st 2018, developers must not obfuscate code or conceal functionality of their
extensions. This also applies to any external code or resource fetched by the extension package. For
more information, please review our [program policies][106].

## Development

### How do I write an extension? {: #faq-dev-01 }

You can find all the information you need to develop extensions and apps at [/docs/extensions/][ext]
and [/docs/apps/][apps], respectively.

### Should I build a web app or an extension? {: #faq-gen-10 }

Extensions are primarily used to extend functionality of the user's browser. For instance,
extensions are commonly used to interact with the pages that a user views, add custom context menus,
or manipulate tabs and windows. Web apps, on the other hand, are applications in their own right and
rarely need to extend browser functionality.

### How can I push an update of my code to my users? {: #faq-dev-02 }

Visit [https://chrome.google.com/webstore/devconsole][110] and click on the listing you wish to
update. Once you upload a new version and click **Publish**, your update will automatically be
pushed out to users over the next few hours.

### Can I host my own app or extension? {: #faq-dev-03 }

Yes, you may host your own app or extension, although you will need to take care of [packaging and
serving the][111] [auto-update manifest][112] yourself.

## Creating a listing

### In what format should I upload my code? {: #faq-listing-01 }

To upload an item to the Chrome Web Store, submit a ZIP file containing the files used in your app,
theme, or extension. Do not upload a .crx file; the submission will fail.

### How long will it take for my listing to appear in the store? {: #faq-listing-02 }

The item won't appear in the web store until it has successfully completed the review process.
(Although the item's unique ID is generated as soon as you upload your first zip file.) For further
details, see [How long will it take to review my item?][114].

Extensions which are published to the same domain as the publisher address may be approved more
quickly.

### How can I remove my listing from the store? {: #faq-listing-03 }

Visit [https://chrome.google.com/webstore/developer/dashboard][115]. Click the item you want to
remove from the store, so that the edit page for that item appears. Then click the "more options"
icon in the top right-hand corner and select **Unpublish**. Your listing will no longer be visible
in the store.

### What are the screenshot and text requirements for the store? {: #faq-listing-04 }

See [Supplying Images][116] for guidelines on supplying images for the store. Some other best
practices to consider:

- Write a catchy title, a clear and descriptive short description, and a detailed long description.
- Create screenshots that demonstrate how your app or extension works.
- Upload a screencast, such as a YouTube video or a Google Docs Presentation, to demonstrate how
  your app or extension works.
- Post a support link so that users don't clutter your comments thread with bug reports.

### How can I import an existing app or extension into the store? {: #faq-listing-05 }

You may import an app or extension with a pre-existing key into the store (see [instructions][117]).

### How can I export an app or extension from the store? {: #faq-listing-06 }

Currently we do not support exporting a listing's sources or private key from the store.

### Why did I receive a "Cannot parse the manifest" error when uploading my app or extension? {: #faq-listing-07 }

The manifest file needs to be in JSON format. Most likely, you've included a comment in the manifest
file that is not recognized by the Chrome Web Store's JSON parser. Try removing any comments from
the manifest file and try re-uploading.

### I've verified my domain, and I have a wildcard app URL like \*://example.com, but the Chrome Web Store is still asking me to verify my domain. What gives? {: #faq-gen-15 }

If you use a wildcard like \*://example.com, make sure you have verified both http://example.com and
https://example.com.

### When I try to upload my app to the Chrome Web Store, I get this error: "(Server rejected) An error occurred: please try again later." What gives? {: #faq-gen-16 }

This error occasionally occurs if you've been logged into the Chrome Web Store for a long time. If
you sign out of your Google Account and then sign back in, you should be able to upload your app.

### Can I control the regions where my app is listed? {: #faq-gen-18 }

Yes, you can select which regions your application appears in. This might be because your app is
only applicable to the local market, or you might have specific obligations that mean you can only
make your app available in certain regions.

### How do I localize my listing in the store? {: #faq-gen-19 }

There are two points where you need to localize your app for listing in a region that isn't your
home market.

1.  Your app package. See [Internationalizing Your App][118] for information on localizing your
    app's presence inside Chrome.
2.  Your detailed listing. The developer dashboard now includes the ability for you to select all
    the regions that you want your application to appear in, allows you to localize the detailed
    description, price points relative to the market you are in, and screenshots.

### How do I localize my detailed description? {: #faq-gen-20 }

You first need to [internationalize][119] your app and specify a "default_locale" attribute in your
manifest. Once you upload your internationalized app, a selection box will appear at the top of your
app listing, allowing you to switch between languages that you support and change the detailed
description.

### How do I show different screenshot images per region? {: #faq-gen-21 }

Visit your app page in the [Chrome Web Store Developer Dashboard][120], change the currently
selected language to your desired choice (for example "en-GB") and upload a screenshot as normal.
Once the image is uploaded you will be presented with an option to "Show this item in **all**
locales" or "Show this item **only** in the 'en-GB' locale". Select the later to show the screenshot
to only users of the "en-GB" Chrome Web Store.

### My item's status says "pending review." What does this mean? {: #faq-listing-08 }

This means that you've submitted your item for publishing and it is currently in the queue to be
reviewed. The item will not appear in the store until it passes this review. (See also [How long
will it take to review my item?][121])

### How long will it take to review my item? {: #faq-listing-108 }

Review times vary; some reviews complete in a few hours, others take many days, and in some cases a
review can take several weeks. Some reasons that an item could require more extensive review
include:

- The item is suspected to contain or to be distributed by malware or unwanted software.
- The item is suspected to violate one of the developer program policies.
- The item may have already been previously removed for a legal or policy violation, and has been
  resubmitted.
- The item requests powerful permissions that require in-depth review.

Note that all item submissions—whether for a new item or an update to an existing one—are
subject to the same review process.

For more information about the unwanted software policy, see:
[https://www.google.com/about/company/unwanted-software-policy.html][122].

For more information about the developer program policies, see:
[/webstore/program_policies][123].

If your item's status says "pending review" for more than three weeks, you should [contact
support][124].

### Why isn't my app showing up on search? {: #faq-listing-09 }

It depends. There are several reasons why your item may not be showing up in search.

- You just published your app. It might take a few hours before we index it.
- Your app manifest is version 1. We have upgraded to manifest version 2, therefore all manifest v1
  apps are unlisted. Please upgrade your item to manifest v2. See more details [here][125].
- Your app contains an NPAPI. All apps containing NPAPI are now unlisted. For more details around
  our NPAPI deprecation timelines, see our blog post [here][126].
- Your app is a Google Application Marketplace app. All Google Application Marketplace apps will
  only be visible on the corresponding management page for Google Application Marketplace, not on
  chrome.google.com/webstore.
- Your app is not listed in the region you are searching in. See more details [here][127].

### My app has been removed from the Chrome Web Store. What should I do? {: #faq-listing-10 }

Application removals count as strikes against the good standing of your developer account. Multiple
or egregious policy violations may result in termination of your developer account.

- For all policy violation app removals, you will receive a removal notification email with more
  details in the developer account listed as the owner of the app. Please make the appropriate
  changes so your app complies with all [Developer Program Policies][128], [Branding
  Guidelines][129] and [Terms of Services][130]. Once you have remedied the violation you can
  resubmit via your developer dashboard.
- Please do not re-publish a removed application until the policy violation has been remedied. If
  you have additional questions or feel your item was wrongly removed, you can reply directly to the
  removal email and appeal.
- If you believe your developer account was wrongly terminated, you can appeal [here][131]. We will
  only reinstate accounts if an error was made, and a re-review finds that your account does not
  violate the developer terms.

### How do I link my Play and Chrome Web Store item so that the "Available for Android" link appears on my item detail page? {: #faq-listing-11 }

We regularly run a script that looks for exact matches between the item name and the developer email
address in Play and CWS. If there is an exact match, the "Available for Android" link will
automatically show up on your item detail page the next time the script runs. At this point, there
is no way to enter the information into your listing.

## Installable web apps

### What is the difference between packaged apps and hosted apps? {: #faq-app-01 }

Hosted apps operate as traditional web apps (served via web servers and running inside of web
browsers) and do not have access to the extended Chrome APIs that extensions can use. Packaged apps
are bundled into the `.crx` file and can use the extensions APIs.

### Can I sell a packaged app? {: #faq-app-02 }

Yes, but there are risks in doing so. Specifically, it is easy for motivated people to bypass
payments for packaged apps. This holds true even if you have used our Licensing API in your locally
stored packaged app, since locally stored content is not secure and can be modified (including calls
to the Licensing API). If you'd like to have the option of blocking access to your app by
unauthorized users, selling a packaged app may not be the right solution for you. An alternative to
consider is moving to a hosted app model with a server-side licensing check.

### Why do you allow developers the option of paid packaged apps? {: #faq-app-02.5 }

There are good reasons to offer a paid packaged app, even with the [limitations explained
above][142]. Packaged apps let you easily provide functionality to your users without the overhead
of managing a hosted service. Charging for a packaged app is a quick and simple way to enable a
low-friction transaction if the app provides clear user value. However, it is up to the developer to
decide which solution is right for them.

### Can installable web apps have page actions? {: #faq-app-03 }

No. Although packaged apps get most of the functionality of extensions, they can't have page
actions.

### Can installable web apps have browser actions? {: #faq-app-04 }

No. Although packaged apps get most of the functionality of extensions, they can't have browser
actions.

### Can I use Google AdSense in my Chrome product? {: #faq-app-05 }

According to the Google AdSense [program policies][143], Chrome-integrated websites ('hosted apps')
may use AdSense; Chrome apps ('packaged apps'), extensions, and themes may not.

### Can I use Google Analytics? {: #faq-app-06 }

Yes. Packaged apps and extensions can use the [Chrome Platform Analytics][144] library. Hosted apps
can use one of the Google Analytics libraries for standard websites (e.g., [analytics.js][145]).

### What is the size limit for apps in the store? {: #faq-app-07 }

The `.crx` file is currently limited to 2GB.

### Do installable web apps run from the desktop, installed as separate apps, or otherwise operate independently of the browser? {: #faq-app-10 }

No, Chrome Web Store apps are just web apps written with traditional web technologies, and are run
via the browser.

### What is actually installed by an installable web app? {: #faq-app-11 }

Only the `.crx` package is actually installed into the browser; any contents not bundled into the
`.crx` package will continue to be served by web servers. Installable web apps are not installed
into the base operating system, desktop, or outside of the browser.

### Do Chrome Web Store apps work in browsers other than Chrome? {: #faq-app-12 }

Hosted apps are built with standard and common web technologies, and depending on the features you
choose, will work in most or all browsers. The `.crx` package information you create to list the app
in the store will not work with other browsers, but users do not need the `.crx` package to access a
hosted web app in other browsers. (They can always directly access the app.) Packaged apps, because
they are packaged in `.crx` files and might access the Google Chrome Extension APIs, will not work
in other browsers.

### Will users of other browsers be able to install apps directly from the Chrome Web Store? {: #faq-app-13 }

Not at this point. However, they will be able to access your app via directly typing in the URL,
launching bookmarks, and discovering your app via search engines. We hope that some form of
installable web apps is a concept that appeals to other browsers and will eventually be a
cross-browser feature.

### Do installable web apps work on different operating systems? {: #faq-app-14 }

Yes. They are just web apps, and are typically written with web technologies like HTML, CSS, and
JavaScript.

### How do I store my content for offline access? {: #faq-app-15 }

This answer to this depends on the type of content and the storage requirements.

- For a packaged app or extension, you can put all HTML, CSS, JavaScript, images, and other assets
  into your `.crx` file. This embeds everything you need into the installable `.crx` file. This
  bundling might be good for apps with content that rarely changes, such as ebooks. Chrome provides
  an update mechanism to automatically deliver your updates to your users.
- The [App Cache][146], an HTML5 feature, is a good way to locally cache resources such as HTML,
  CSS, and JavaScript. These resources aren't included in the `.crx` file, but are downloaded the
  first time the app is accessed. They are not downloaded again until the App Cache file itself is
  changed. The App Cache is good for enabling fast startup, while retaining control over asset
  versioning.
- Local Storage, another HTML5 feature, is a key/value storage system that can store strings. Local
  Storage is often used in place of some cookies, and it lives longer than the session. There is no
  way, however, to send a populated Local Storage database on application install or load. You will
  need to populate the Local Storage programmatically.
- WebSQL DB is a full SQL database embedded in the Chrome browser. While stalled in the standards
  process, this is a very powerful way to store highly structured data. Again, there is no way to
  send a populated database on application install or load, so you will have to programmatically
  populate the database. Also, this database can only store text, but you can use the data URI
  scheme to store binary data.
- In the future, the [File APIs][147] will be a useful addition to this array of offline storage
  options, as they allow your web app to read and write files to a locally managed file store. These
  APIs are not fully supported by Chrome, but follow the [Google Chrome Releases blog][148] to stay
  up to date.

For more details, read [a more detailed article on HTML5 offline options][149].

### What makes a good web app? {: #faq-app-16 }

While this is a subjective question, we have some notes in the article [Thinking in Web Apps][150].
Briefly, and generally speaking, apps that are Big Screen, have a Rich Experience, are Good At One
Thing, are Visually Appealing, and are Fast will be web apps that people love to use.

### What is the screen resolution for Chrome Web Store apps? {: #faq-app-17 }

Typical screen resolutions are 1024x768 and 1280x1024, but because users are free to resize their
browser windows, we recommend fluid, full screen layouts that resize gracefully down to 1024x768
(but then should scale up to very large, as well). Consider using Google Analytics to see what the
most common screen resolutions are for your app's users.

### Do apps run in full screen? {: #faq-app-18 }

Apps can run in full screen mode using the [Fullscreen API][151]. See this [HTML5Rocks update][152]
for more information on using this API in your application.

### Will apps work on Android? {: #faq-app-19 }

If your app is pure HTML, CSS3, and JavaScript and is hosted on your servers there is a good chance
that it will work in the browser on Android. However, `.crx` files (including packaged apps) are not
supported on Android. Users cannot install their apps onto the Android browser, but they can most
likely use those apps by directly accessing the app's URL.

### Will apps work on Google TV? {: #faq-app-20 }

Google TV runs the Chrome browser, so it should be able to run your hosted web app. Installing apps
directly from Chrome Web Store will not be available on Google TV at launch however. Users may
directly type the URL for your hosted app, or use traditional search to find and start your app.

### What can I do to protect the content of my web app? {: #faq-app-21 }

You can determine if a user has paid for access to your app by using the Chrome Web Store Licensing
API. If the user hasn't bought the app you deny access to that resource. Ultimately, Chrome Web
Store apps are just web apps, so the same considerations for content protection must be taken into
account.

### What happens when a user clicks an external link in my app? {: #faq-app-22 }

The same thing as if they clicked a link that's internal to your app: the browser follows the link,
using the current tab.

### How should my app handle the back button? {: #faq-app-23 }

As with all web apps, you cannot rely on the back button always being present. Users might hide
them, screen readers might not use them correctly, and so on. You should design your app to
correctly support both back buttons and application-defined navigation.

### How can I detect whether my app is running as an installed web app and via the Chrome app launcher (and not just via a bookmark or link)? {: #faq-app-24 }

Use JavaScript to check whether `window.chrome.app.isInstalled` is defined. If it is, the app is
running from the Chrome app launcher. Here's an example of the code you'd use:

```js
if (window.chrome.app.isInstalled) {
 // You're running as an installed app, via the app launcher!
 } else {
  // You're running via a bookmark/link.
}
```

### My app is available in multiple regions. Can I list it in different categories for each region? {: #faq-app-25 }

No, the categories will be consistent across regions. If you list in one category, you will be
listed in that category in all regions.

## Extensions

### Can I sell extensions in the store? {: #faq-extensions-01 }

Yes! You can sell your Chrome Extension using [one-time payments][153].

### Can I use the Licensing API with extensions? {: #faq-extensions-02 }

Yes, see the section on [verifying payment and offering free trial][154] .

## Themes

### Can I sell themes in the store? {: #faq-themes-01 }

Yes! You can sell your Chrome Theme using [one-time payments][156].

### Can I use the Licensing API with themes? {: #faq-themes-02 }

No, themes have no code or server-side components.

## Additional Troubleshooting

If you've fixed all errors produced by the tools and continue experiencing issues, please [contact
us][158] with any additional details regarding the problem. Please send us a screenshot of the
problem and include your .crx file.

### How can I raise P2B concerns?

European developers can raise concerns about clarity of terms, policies, or other Platform To
Business related issues by contacting CWS support.

[1]: http://chrome.google.com/webstore
[2]: /docs/extensions/mv2/hosting_changes
[3]: /docs/extensions/mv2/faq
[4]: http://groups.google.com/a/chromium.org/group/chromium-apps
[5]: #faq-gen-01
[6]: #faq-gen-02
[7]: #faq-gen-05
[8]: #faq-gen-06
[9]: #faq-gen-07
[10]: #faq-gen-08
[11]: #faq-gen-09
[12]: #faq-gen-11
[13]: #faq-gen-17
[14]: #faq-gen-22
[15]: #faq-gen-23
[16]: #faq-gen-24
[17]: #faq-gen-25
[18]: #faq-gen-26
[19]: #faq-gen-27
[20]: #faq-gen-28
[21]: #faq-gen-29
[22]: #faq-gen-30
[23]: #faq-dev-01
[24]: #faq-gen-10
[25]: #faq-dev-02
[26]: #faq-dev-03
[27]: #faq-listing-01
[28]: #faq-listing-02
[29]: #faq-listing-03
[30]: #faq-listing-04
[31]: #faq-listing-05
[32]: #faq-listing-06
[33]: #faq-listing-07
[34]: #faq-gen-15
[35]: #faq-gen-16
[36]: #faq-gen-18
[37]: #faq-gen-19
[38]: #faq-gen-20
[39]: #faq-gen-21
[40]: #faq-listing-08
[41]: #faq-listing-108
[42]: #faq-listing-09
[43]: #faq-listing-10
[44]: #faq-listing-11
[45]: #faq-payments-01
[46]: #faq-payments-02
[47]: #faq-payments-03
[48]: #faq-payments-04
[49]: #faq-payments-05
[50]: #faq-payments-06
[51]: #faq-payments-07
[52]: #faq-payments-09
[53]: #faq-payments-10
[54]: #faq-payments-11
[55]: #faq-payments-12
[56]: #faq-payments-13
[57]: #faq-payments-14
[58]: #faq-payments-15
[59]: #faq-payments-16
[60]: #faq-app-01
[61]: #faq-app-02
[62]: #faq-app-02.5
[63]: #faq-app-03
[64]: #faq-app-04
[65]: #faq-app-05
[66]: #faq-app-06
[67]: #faq-app-07
[68]: #faq-app-08
[69]: #faq-app-09
[70]: #faq-app-10
[71]: #faq-app-11
[72]: #faq-app-12
[73]: #faq-app-13
[74]: #faq-app-14
[75]: #faq-app-15
[76]: #faq-app-16
[77]: #faq-app-17
[78]: #faq-app-18
[79]: #faq-app-19
[80]: #faq-app-20
[81]: #faq-app-21
[82]: #faq-app-22
[83]: #faq-app-23
[84]: #faq-app-24
[85]: #faq-app-25
[86]: #faq-app-26
[87]: #faq-app-27
[88]: #faq-extensions-01
[89]: #faq-extensions-02
[90]: #faq-themes-01
[91]: #faq-themes-02
[95]: http://googlechromereleases.blogspot.com/
[96]: http://crbug.com
[97]: http://www.chromium.org/getting-involved/dev-channel
[98]: /docs/webstore/program_policies
[99]: /docs/webstore/register
[100]: https://www.google.com/accounts/NewAccount
[101]: http://www.google.com/support/a/bin/topic.py?topic=28917
[102]: /docs/webstore/terms
[103]: /docs/webstore/intl/en/program_policies.html
[104]: http://groups.google.com
[105]: https://support.google.com/chrome_webstore/contact/developer_support
[106]: /docs/webstore/program_policies
[110]: https://chrome.google.com/webstore/devconsole
[111]: http://code.google.com/chrome/extensions/packaging.html
[112]: http://code.google.com/chrome/extensions/autoupdate.html
[114]: #faq-listing-108
[115]: https://chrome.google.com/webstore/developer/dashboard
[116]: images
[117]:
  http://groups.google.com/group/chromium-extensions/browse_thread/thread/defbf282d11a8cc4/a2d1aedb84bc60b9
[118]: /docs/webstore/i18n
[119]: /docs/webstore/i18n
[120]: https://chrome.google.com/webstore/developer/dashboard
[121]: #faq-listing-108
[122]: https://www.google.com/about/company/unwanted-software-policy.html
[123]: /docs/webstore/program_policies
[124]: https://support.google.com/chrome_webstore/contact/developer_support/?hl=en
[125]: /docs/extensions/mv2/manifestVersion
[126]: http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html
[127]: https://support.google.com/chrome_webstore/answer/1254182?hl=en&ref_topic=1734051
[128]: /docs/webstore/program_policies
[129]: /docs/webstore/branding
[130]: /docs/webstore/terms
[131]: https://support.google.com/chrome_webstore/contact/cws_dev_appeals
[133]: //developers.google.com/wallet/digital/docs/
[134]: /docs/webstore/check_for_payment
[135]: https://developers.google.com/commerce/wallet/digital/
[136]: https://developers.google.com/chrome/web-store/docs/payments-otp#verifying-payment
[137]: /docs/webstore/pricing#seller
[138]: /docs/webstore/pricing#seller
[139]: https://chrome.google.com/webstore/developer/dashboard
[140]: /docs/webstore/pricing#matrix
[142]: #faq-app-02
[143]: https://support.google.com/adsense/answer/48182?hl=en&ref_topic=1261918
[144]: /apps/analytics
[145]: https://developers.google.com/analytics/devguides/collection/analyticsjs/
[146]: http://www.html5rocks.com/tutorials/appcache/beginner/
[147]: http://www.w3.org/TR/FileAPI/
[148]: http://googlechromereleases.blogspot.com/
[149]: http://www.html5rocks.com/tutorials/offline/whats-offline/
[150]: https://developers.google.com/chrome/apps/
[151]: http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
[152]: http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API
[153]: https://developers.google.com/chrome/web-store/docs/payments-otp
[154]: https://developers.google.com/chrome/web-store/docs/payments-otp#verifying-payment
[156]: https://developers.google.com/chrome/web-store/docs/payments-otp
[158]: https://support.google.com/chrome_webstore/contact/developer_support/?hl=en

[apps]: /docs/apps/
[ext]: /docs/extensions/
[themes]: /docs/extensions/mv3/themes/
