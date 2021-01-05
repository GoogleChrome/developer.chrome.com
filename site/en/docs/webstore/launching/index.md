---
layout: "layouts/doc-post.njk"
title: Launching Your App in the Chrome Web Store
date: 2010-10-01
description: An overview of how to launch an app in the Chrome Web Store.
---

The Chrome Web Store is an upcoming new way to distribute and sell your web apps. It [recently
opened up for developer preview][1], and web app developers are beginning to build and package their
apps for the launch of the store later this year. We're going to walk you through launching an app
so you have a smooth experience and are well positioned for a successful consumer launch.

## Bootstrap: Join the apps developer discussion group

Chat with your peers and ask questions of the community in the [apps developer discussion group][2].

## Step One: Design your app

Before diving into the technical details of the Chrome Web Store, it's important to focus first on
the design of your web app. Paying careful attention to your target users and what goals they are
trying to accomplish will ensure you are building the right app. Web apps are more action, or verb,
oriented than traditional websites, and successful web apps have a targeted set of use cases in
mind.

The design of your app will be influenced by your target audience, the message you want to send, the
emotions you want to evoke, the brand you are trying to cultivate, and of course the functionality
of the app itself. Design is not just the choice of button colors, but is a holistic approach to
shaping how your users perceive and interact with your product. A well executed design permeates
every aspect of the web app development process.

We've written about design principles we think are important for well executed web apps. [Thinking
in Web Apps][3] lists five design principles:

- Tight focus
- Big screen
- Rich experience
- Beauty
- Speed

Web apps should be focused on doing one thing very well, with a tight focus that helps a user
accomplish a goal. We believe "big screen" web apps allow developers to maximize usage of modern
wide screen devices, with flexible scalable layouts that fill the available browser window. Users
have come to expect a rich experience from their web apps, full of audio, video, graceful
transitions, graphical feedback, and access to modern features such as geolocation. Beautiful web
apps exploit modern web standards such as CSS3 and web fonts to present information and the design
in visually stunning ways, while never getting in the way of the functionality. Of course, a web app
is designed with speed in mind, on both the server and the client, using local storage, web workers,
advanced caching and syncing, and CSS3 transitions and animations.

Ideally, a user should forget they are using a browser and simply be drawn into the web app. You may
find some design inspiration at [Lovely Web Apps][4].

When designing your application, remember you can assume that users will be using Google Chrome,
which means you can use any number of advanced HTML5 and CSS3 features.

## Step Two: Build your app

The actual web app construction phase occurs once you have a handle on the design direction for your
application. This is where the rubber hits the road, as you build the web app and test its features.

There are many technologies to pick from, which is one of the great aspects of the open web. Below
are some options:

- **HTML5** - the family of HTML5, CSS, and JavaScript technologies powering the modern web. Learn
  more at [HTML5 Rocks!][5] and [HTML5 Boilerplate][6].
- **Native Client** - run your native C/C++ code in the browser's sandbox! Get started with the
  [Native Client SDK][7]. (Note: this technology is still in development, but you can try it out
  now.)
- **Adobe Flash** - probably the most widely distributed browser plug-in.
- **A mix** - mix and match these technologies as best as you see fit.

Iterate quickly, gathering constant feedback from your testers and users. If you are building a new
app, release with the minimal viable product and add features and enhancements with each iteration.
The beauty of web app development is the ease in which you can respond to customer feedback, without
a cumbersome re-deployment process.

During this phase you'll no doubt be exploring and implementing the many HTML5 features that will
help deliver a "next generation" app look and feel. Because the Chrome Web Store is initially
targeted at Google Chrome, you can build the app with two assumptions in mind: you have a wide array
of modern HTML5 features available, and your initial set of users will be using Google Chrome.

There are [two different types of installable web apps][8]: packaged and hosted. Hosted web apps are
regular web apps, served from web servers. Packaged web apps are bundled and are completely
installed into the user's browser. You'll decide which type of installable web app to build during
this step. Hosted web apps are most familiar to you, and packaged web apps might appeal to you if
you don't want to run any servers or need to access the Google Chrome extension APIs. Regardless of
type, you'll still need a ZIP file that includes a [manifest file][9] and any icons required (always
a 128x128; also a 16x16 for packaged web apps). You can find more details in the documentation for
[hosted apps][10] and [Chrome Apps][11].

If your web app is using the integrated payment system (Chrome Web Store Payments) you'll need to
build in support for both OpenID to [identify the user][12] and the Chrome Web Store Licensing API
to [see if that user has successfully paid][13].

We also recommend that you [add support for Google Chrome Frame][14], a plugin that adds Google
Chrome's capabilities, including its HTML5 features, to legacy browsers such as IE6, IE7, and IE8.
Enabling support is as simple as sending an HTTP header or adding a <meta> tag to your pages. When
you support Chrome Frame, you are helping legacy browser users access the full potential of your web
app.

## Step Three: Determine how to monetize

It's obviously important to be able to monetize your web app. The Chrome Web Store offers one-time
payments as well as monthly and yearly subscriptions through Chrome Web Store Payments (which
currently requires a US bank account). Picking a price point is up to you (and the market), and we
encourage you to determine the value proposition of the app and what it might be worth to your
users.

If the Chrome Web Store Payments system does not meet your needs, you are free to use a third-party
payment processor. You are free to monetize using any mechanism that makes sense for your app and
your users.

The Chrome Web Store also supports a free trial option. The free trial offers a low barrier to entry
and allows users to try your web app for free. How you distinguish between the free and paid
versions is totally up to you; the Chrome Web Store does not dictate exactly what free trial means
to your app. Many web apps will find free trial to be a great way to encourage users to install the
app and get a feel for it before purchase.

Other monetization options include displaying ads (an option for hosted web apps), or simply
offering your web app for free.

For new web apps, don't be afraid to try different payment options. You are free to change the
amounts or mechanisms based on feedback and experiments. Incorporate analytics and metrics from day
one to track your web app's usage and growth.

[Integrating with the Chrome Web Store Payments][15] system is easy, using a simple JSON (or Atom)
REST-based service. Requests are signed by OAuth, and you can [test your integration with the
Licensing API][16] using special user IDs and our [OAuth Playground][17].

## Step Four: Package and publish your app

Detailed documentation is available to help you [publish your app into the Chrome Web Store][18].
The steps involve writing a manifest file, zipping it up, uploading the ZIP file to the [Chrome
Developer Dashboard][19], and providing configuration and content about your web app.

A one-time registration fee of \$5, designed to [create better safeguards][20] against fraudulent
web apps in the gallery, is required before you can use the Chrome Web Store developer dashboard.
You must also verify your domain with [Google Webmaster Tools][21] in order to identify "official"
web apps in the Chrome Web Store.

## Step Five: Get your app noticed

One of the primary goals for the Chrome Web Store is to enhance the discoverability and distribution
of your web apps. Numerous in-store mechanisms, both curated and algorithmic, will help users find,
evaluate, purchase, and install your web app. However, we encourage you to take a broader approach
to marketing your web app.

To start, building a consistently designed marketing site for your web app will help ensure users
notice, and learn more, about your web app. You will have total control over the design and
execution of this marketing site, and thus can craft the perfect message for your current and future
users. You can deep-link to the Chrome Web Store's listing for your app, leading people right to
your web app.

Of course, using social media is a great way to share your web app. Google Buzz, Twitter, and
Facebook are excellent ways to encourage your users to become followers, and your followers to
become your advocates.

The Chrome Web Store itself will offer opportunities to be _featured_, both in storewide curated
lists as well as inside of individual categories. Featured apps tend to get noticed, and the best
way to be featured is to build a great app that people will love and that really highlights what the
modern web is capable of.

The Chrome Web Store's listing for your app allows you to display a few [screenshots][22] and a
YouTube video. Use these opportunities to show off your app, and use the video to highlight key
features and explain the use cases.

Hosting your web app in the Chrome Web Store is the primary way to get noticed, and a broad
marketing campaign can expand your message's reach, get your app noticed, and find more users.

## Step Six: Solicit feedback, measure, and track your users

Listening to users is extremely important, and we recommend that you provide a way for users to give
you feedback. Numerous services can help you do this, from [Google Groups][23] to community
management apps such as [UserVoice][24] or [Get Satisfaction][25]. Remember that it's not enough to
offer a place for users to voice their ideas. You should also respond and ensure that your users
feel like their voices are heard.

Tracking which features and pages of your app are actually used, where your users are coming from,
and even what screen size is most popular is very important. [Google Analytics][26] can track a
tremendous amount of aggregate data and provide you with the statistics you need to make informed
decisions. Note that you can also add Google Analytics to your app's Chrome Web Store page.

A/B testing is a great way to determine which technique works best, by offering both options to
different pools of users. For example, you could try two different calls to action and measure which
phrase leads to more conversions.

Think Vitamin has an informative article titled [How to Track Six Key Metrics for Your Web App][27].
Metrics such as churn (percentage of customers that cancel each month), CMRR (contracted monthly
recurring revenue), and LPC (lifetime profit per customer) are explained, including formulas and
spreadsheet examples.

We recommend the "measure, iterate, listen, repeat" cycle for constant change based on real-life
facts and data.

## Pre-launch checklist

The Chrome Web Store opens for consumers later this year. Let's run through the preflight checklist:

- Did you join the [apps developer discussion group][28]?
- Did you test your web app in the [Dev channel of Google Chrome][29]?
- Did you upload the ZIP file of the manifest and icons into the [Chrome Web Store Developer
  Dashboard][19]?
- Did you verify your domain with the Google Webmaster Tools?
- Did you test both success and failure scenarios with the Chrome Web Store Licensing API, or
  whatever registration and payment systems you are using?
- Did you upload compelling screenshots to the store?
- Did you create an informative video for the store page?
- Did you create a marketing website for your app?
- Did you install an analytics package on the store's page for your app?
- Did you install an analytics package in your app?
- Did you configure a user feedback tool?
- Are you tracking key metrics?
- Did you test what happens if a user has cookies turned off? Or JavaScript disabled?
- Did you check the spelling in your app?
- Is your app accessible to people with disabilities?
- Does each action or app state have a unique URL that a user can bookmark or share?
- Is your web app's favicon configured?
- Do you have the proper copyrights?
- Is your web app's 404 page configured?
- Did you add support for [Chrome Frame][31]?

[Launchlist][32] has as even longer checklist for a successful web app launch.

## Launch!

You can upload your web app into the Chrome Web Store today. It's the perfect time to test and
experiment before the consumer release.

We hope this post helps you get started with the Chrome Web Store. For more information, read about
[web app design principles][33], check out the [Chrome Web Store FAQ][34], and browse our [developer
documentation][35]. We look forward to seeing your app in the store!

[1]: http://blog.chromium.org/2010/08/get-your-apps-ready-for-chrome-web.html
[2]: https://groups.google.com/a/chromium.org/group/chromium-apps/topics
[3]: https://developers.google.com/chrome/apps/articles/thinking_in_web_apps
[4]: http://lovelywebapps.blogspot.com/
[5]: http://html5rocks.com/
[6]: http://html5boilerplate.com/
[7]: http://code.google.com/p/nativeclient-sdk/
[8]: /docs/webstore/apps_vs_extensions#pkgVsHost
[9]: http://code.google.com/chrome/extensions/manifest.html
[10]: https://developers.google.com/chrome/apps/docs/developers_guide
[11]: /docs/apps/
[12]: /docs/webstore/identify_user
[13]: /docs/webstore/check_for_payment
[14]: https://developers.google.com/chrome/chrome-frame/
[15]: /docs/webstore/check_for_payment
[16]: /docs/webstore/check_for_payment#test
[17]: http://googlecodesamples.com/oauth_playground/
[18]: /docs/webstore/publish
[19]: https://chrome.google.com/extensions/developer/dashboard
[20]: http://blog.chromium.org/2010/08/security-improvements-and-registration.html
[21]: http://www.google.com/webmasters/
[22]: /docs/webstore/images#screenshots
[23]: http://groups.google.com
[24]: https://uservoice.com/
[25]: http://getsatisfaction.com/
[26]: http://www.google.com/analytics
[27]: http://thinkvitamin.com/web-apps/how-to-track-six-key-metrics-for-your-web-app/
[28]: https://groups.google.com/a/chromium.org/group/chromium-apps/topics
[29]: http://www.chromium.org/getting-involved/dev-channel
[31]: https://developers.google.com/chrome/chrome-frame/
[32]: http://launchlist.net/
[33]: https://developers.google.com/chrome/apps/articles/thinking_in_web_apps
[34]: /docs/webstore/faq
[35]: /docs/webstore/overview
