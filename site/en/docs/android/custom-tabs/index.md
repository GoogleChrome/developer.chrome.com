---
layout: "layouts/doc-post.njk"
title: Overview
seoTitle: Android Custom Tabs Overview
date: 2020-02-04
updated: 2023-03-25
description: Learn when best to use Android Custom Tabs for opening an URL in your Android app.
---

<style>
video {
    max-width: calc(var(--vid-width) * 1px);
    max-height: calc(var(--vid-height) * 1px);
}
</style>

Custom Tabs are a feature in Android browsers that gives app developers
a way to add a customized browser experience directly within their app.

Loading web content has been a part of mobile apps since the early days of
smartphones, but older options can present challenges for developers. Launching the
actual browser is a heavy context switch for users that isn't customizable,
while WebViews [don't support][6] all features of the web platform, don't share
state with the browser and add maintenance overhead.

Custom Tabs offer a better user experience than simply opening an external
browser. They allow users to remain within the app while browsing, increasing
engagement and reducing the risk of users abandoning the app. They accomplish
this by being powered directly by the user's preferred browser, and automatically
sharing the state and features offered by it. You don't need to write custom
code to manage requests, permission grants, or cookie stores.


## What can Custom Tabs do?

By using a Custom Tab, your web content will load in whatever rendering engine
powers your user's preferred browser. Any API or web platform feature is
available there, and will be available in your Custom Tab. Their browsing session,
saved passwords, payment methods, and addresses will all show up just like they
are accustomed to already.

## What can I customize in a Custom Tab?

Quite a bit! Custom Tabs give you fine grained control over a lot of the browser
chrome and user experience. Within your app, you launch a Custom Tab via an [Intent](7).
When this Intent is called, you can add a number of attributes to the
[CustomTabIntent](8) to get the exact experience you want. Some of the customizations
that you are able to add are listed below.

Custom entrance and exit animations to match the rest of your app

<figure>
{% Video preload=true, loop=true, playsinline=true, autoplay=true, src="video/DXqUldooyJOUnj3qXSYLHbUgUI93/sIeKPXwrHXdCXtGRrv2Q.mp4", width="350", height="730", class="screenshot" %}
  <figcaption>A mobile browser, transiting between screens, ending with a web site loaded in a Custom Tab</figcaption>
</figure>

Modifing the toolbar color to match your app's branding.

<figure>
{% Video loop=true, playsinline=true, autoplay=true, src="video/DXqUldooyJOUnj3qXSYLHbUgUI93/kQ0LUuUdcWFM34IPg5I6.mp4", width="350", height="730", class="screenshot"  %}
  <figcaption>A mobile browser, transitioning to a Custom Tab with colors matching a website</figcaption>
</figure>

Color consistency that can stay with your app, even if they switch between light and dark themes.

<figure>
{% Video loop=true, playsinline=true, autoplay=true, src="video/DXqUldooyJOUnj3qXSYLHbUgUI93/YBinAgwhx0kFizQWrrEr.mp4", width="350", height="730", class="screenshot"  %}
  <figcaption>And that color consistency can stay with your app, even if they switch between light and dark themes.</figcaption>
</figure>

Custom actions and entries to the browser's toolbar, and menus.

<figure>
{% Video loop=true, playsinline=true, autoplay=true, src="video/DXqUldooyJOUnj3qXSYLHbUgUI93/QFiyUPGANEvjVqfsujF4.mp4", width="350", height="730", class="screenshot"  %}
  <figcaption>A Custom Tab showing its menu, with custom entries.</figcaption>
</figure>

Control the launch height of the Custom Tab, enabling things like streaming your videos while interacting with your web store.

<figure>
{% Video loop=true, playsinline=true, autoplay=true, src="video/DXqUldooyJOUnj3qXSYLHbUgUI93/lsyAKIKYdD87QjSiSQOw.mp4", width="350", height="730", class="screenshot"  %}
  <figcaption>A partial Custom Tab opening with a set height.</figcaption>
</figure>

That is far from everything. Custom Tabs are very powerful, and under active development. Each browser needs to add support for these features as they become available. While nearly all have some level of support, it is important to know what may or may not be available in your user's browsers. We created a [feature comparison table](/docs/android/custom-tabs/browser-support) to quickly check the availability of the different features across popular Android browsers.

You can test this now with our [sample][1] on GitHub.

## When should I use Custom Tabs?

There is no single "correct" way to load web content. In certain situations,
WebView is going to be the right technology to use. For example, if you are
exclusively hosting your own content inside your app, or if you need to inject
javascript directly from your app. If your app directs people to URLs outside
domains, the built in shared state in Custom Tabs means they are likely a
better choice. Other strengths of Custom Tabs include:

1. Security: Custom Tabs use Google's Safe Browsing to protect the user and the
device from dangerous sites.
1. Performance optimization:
	1. Pre-warming of the Browser in the background, while avoiding stealing
	resources from the application.
	1. Speed up the page load time by speculatively loading URLs in advance.
1. Lifecycle management: Apps launching a Custom Tab won't be evicted by the
	system during the Tabs use - its importance is raised to the "foreground" level.
1. Shared cookie jar and permissions model so users don't have to sign-in to sites
	they are already connected to, or re-grant permissions they have already
	granted.
1. Browser features like Data Saver are shared, if enabled - loading content faster and cheaper.
1. Synchronized AutoComplete across devices for better form completion.
1. Users can easily return to app with an integrated back button.

## Custom Tabs vs Trusted Web Activity

[Trusted Web Activities][9] extend the Custom Tabs protocol and shares most of its benefits.
But, instead of providing a customized UI, it allows developers to open a browser tab without
any UI at all. It is recommended for developers who want to open their own
[Progressive Web App][10], in full screen, inside their own Android app.

## Where are Custom Tabs available?

Custom Tabs is a feature supported by browsers on the Android platform. It was originally
introduced by [Chrome][2], on version 45. The protocol is supported by most Android
browsers.

We are looking for feedback, questions and suggestions on this project, so we encourage you to file
issues on [crbug.com][3] and ask questions to our Twitter account
[@ChromiumDev][4].

## Getting Started

In addition to the [GitHub Demo][1], we have a number of guides to help you get started with Custom Tabs.


<ul>
{% for item in docs.android.toc %}
    {% if item.title == 'i18n.docs.android.customtabs' %}
        {% for section in item.sections %}
            {% if section.title == 'i18n.docs.android.guides' %}
              {% for item in section.sections %}
                  {% set post = helpers.findByUrl(collections.all, item.url, locale) %}
                  {% if not post %}
                    {% set post = helpers.findByUrl(collections.all, item.url, 'en') %}
                  {% endif %}
                  {% if post %}
                    {% if item.title %}
                      {% set articleTitle = item.title | i18n(locale) %}
                    {% else %}
                       {% set articleTitle = post.data.title %}
                    {% endif %}
                     <li>[{{articleTitle}}]({{ post.url }})</li>
                  {% endif %}
              {% endfor %}
            {% endif %}
        {% endfor %}
    {% endif %}
{% endfor %}
</ul>

For questions, check the [chrome-custom-tabs][5] tag on StackOverflow.

[1]: https://github.com/GoogleChrome/android-browser-helper/tree/master/demos/custom-tabs-example-app
[2]: https://play.google.com/store/apps/details?id=com.chrome
[3]: https://crbug.com
[4]: https://twitter.com/ChromiumDev
[5]: https://stackoverflow.com/questions/tagged/chrome-custom-tabs
[6]: https://research.google/pubs/pub46739/
[7]: https://developer.android.com/guide/components/intents-filters
[8]: https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent
[9]: /docs/android/trusted-web-activity/
[10]: https://web.dev/progressive-web-apps/
[11]: /docs/android/custom-tabs/integration-guide/
