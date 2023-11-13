---
# Required
layout: 'layouts/blog-post.njk'
title: Deprecating the `unload` event
seoTitle: Deprecating the unload event
description: |
  The unload event will be gradually deprecated starting from Chrome 117. Learn what this means and how sites and enterprises can prepare for this
authors:
  - demianrenzulli
  - tunetheweb
date: 2023-08-10
updated: 2023-11-13
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Mxh3dDENwFYXpkwD1z9X.jpg
alt: Shipping container being unloaded by a large crane
tags:
  - performance
  - origin-trials
  - deprecations-removals
  - chrome-117
---

The [`unload` event](https://developer.mozilla.org/docs/Web/API/Window/unload_event) will be gradually [deprecated](https://chromestatus.com/feature/5579556305502208) by gradually changing the default so that `unload` handlers stop firing on pages unless a page explicitly opts in to re-enable them.

## Deprecation timeline

{% Aside 'update' %}
This timeline has been updated as of 13th November 2023.
{% endAside %}

We noted that unload behavior would likely be subject to changes as early as January 2019, when we announced our [intent to implement a back/forward cache](https://groups.google.com/a/chromium.org/g/blink-dev/c/OVROmzNUng0/m/1gTmi-I3EQAJ). In parallel to the implementation work, we conducted a large outreach which resulted in a significant drop of [unload usage](https://chromestatus.com/metrics/feature/timeline/popularity/203). To complement this outreach, we also started to offer ways to test the effect of deprecating unload from Chrome 115:

- In the wild testing via the [Permission-Policy API for unload](#permissions-policy) in Chrome 115 (July 2023)
- Local testing by enabling a [flag](#chrome-flags-and-command-line-switches) in Chrome 117 (September 2023)

Following these outreach and trial phases, here is how we expect the _soft deprecation_ to roll out:

- A scoped phase where unload will gradually cease to function for the top 50 popular sites ([reference](https://en.wikipedia.org/wiki/List_of_most-visited_websites) as of the time of writing).
  - Starting with 1% of users from Chrome 120 (end of November 2023).
  - Ending with 100% of users by the end of Q3 2024
- In addition, from Q3 2024, we intend to start a generic phase where unload will gradually cease to function on any sites, starting with 1% of users and ending with 100% of users by the end of Q1 2025.

Note that we also offer a [menu of opt-out options](#options-comparison) in case this soft deprecation timeline doesn't provide sufficient time to migrate away from unload. Our goal is to use this _soft deprecation_ to inform the timeline for the last phase (_hard deprecation of unload_) in which these opt-outs will be removed or reduced.

<figure>
{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/RImjbA5lHjnw9HGDbDy7.png", alt="Timeline of the unload deprecation.", width="800", height="317" %}
</figure>

## Background

`unload` was designed to fire when the document is being unloaded. In theory, it can be used to run code any time a user is navigating away from a page, or as an end of session callback.

Scenarios where this event was most commonly used include:

- **Saving user data**: Save data before leaving the page.
- **Performing cleanup tasks**: Closing open resources before abandoning the page.
- **Sending analytics**: Sending data related to user interactions at the end of the session.

However the `unload` event [is extremely unreliable](/articles/page-lifecycle-api/#the-unload-event).

On desktop Chrome and Firefox, `unload` is reasonably reliable but it has a negative impact on a site's performance by preventing the usage of [bfcache (back/forward cache)](https://web.dev/articles/bfcache#never_use_the_unload_event).

On mobile browsers `unload` often doesn't run as tabs are frequently backgrounded and then killed. For this reason browsers choose to prioritize the bfcache on mobile over `unload`, making them even more unreliable. Safari also uses this behaviour on desktop.

The Chrome team believe using the mobile model of prioritizing bfcache over `unload` on desktop [would be disruptive](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#unload-as-specced-is-a-footgun) by making it more unreliable there too, when previously this has been reasonably reliable in Chrome (and Firefox). Instead, Chrome's aim is to remove the `unload` event completely. Until then it will remain reliable on desktop for those who have explicitly opted-out of the deprecation.

## Why deprecate the `unload` event?

Deprecating `unload` is a key step in a much bigger recognition of the web we live in now. The `unload` event gives a false sense of control of the app lifecycle that is increasingly untrue of how we browse the web in the modern computing world.

Mobile operating systems frequently freeze or unload web pages to conserve memory and desktop browsers are doing this more and more now too for the same reasons. Even without operating system interventions, users themselves frequently tab switch and kill old tabs without formally "leaving pages".

Removing the `unload` event as obselete is a recognition that we as web developers need to ensure our paradigm matches that of the real world and not depend on outdated concepts that no longer hold true—if they ever did.

## Alternatives to `unload` events

Instead of `unload` it is recommended to use:

- [`visibilitychange`](/articles/page-lifecycle-api/#event-visibilitychange): To determine when the visibility of a page changes. This event happens when the user switches tabs, minimizes the browser window, or opens a new page. Consider the [`hidden` state](/articles/page-lifecycle-api/#advice-hidden) the last reliable time to save app and user data.
- [`pagehide`](/articles/page-lifecycle-api/#event-pagehide): To determine when the user has navigated away from the page. This event happens when the user navigates away from the page, reloads the page, or closes the browser window. The `pagehide` event is not fired when the page is simply minimized or switched to another tab. Note that, as `pagehide` does not make a page ineligible for the back/forward cache, it is possible a page can be restored after this event fires. If you're cleaning up any resources in this event, then they may have to be restored on page restore.

The [`beforeunload`](https://developer.mozilla.org/docs/Web/API/Window/beforeunload_event) event has a slightly different use case to `unload` in that it is a cancellable event. It is often used to warn users of unsaved changes when navigating away. This event is also unrealiable as it will not fire if a background tab is killed. It is recommended to limit use of `beforeunload` and [only add it conditionally](/blog/page-lifecycle-api/#the-beforeunload-event). Instead, use the above events for most `unload` replacements.

For more details, see [this advice on never using the `unload` handler](/articles/page-lifecycle-api/#the-unload-event).

## Detect usage of `unload`

There are different tools to help you find appearances of the `unload` event on pages. This allows sites to discover if they are using this event—either in their own code, or via libraries—and so may be affected by the upcoming deprecation.

### Lighthouse

[Lighthouse](/docs/lighthouse/) has a [`no-unload-listeners` audit](https://github.com/GoogleChrome/lighthouse/pull/11085), which warns developers if any JavaScript on their pages (including that from third-party libraries) adds an `unload` event listener.

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/0IbgnaeYF2zHOfhwdVcc.png", alt="Lighthouse audit showing unload handlers in use", width="800", height="304" %}
</figure>

### Chrome DevTools

[Chrome DevTools](/docs/devtools/) includes a [`back-foward-cache` audit](/docs/devtools/application/back-forward-cache/) to help you identify issues that may prevent your page from being eligible for back/forward cache, including the usage of the `unload` handler.

To test back/forward cache, follow these steps:

1. On your page, [open DevTools](/docs/devtools/open/), then navigate to **Application** > **Background services** > **Back/forward cache**.

2. Click **Test back/forward cache** Chrome automatically takes you to `chrome://terms/` and back to your page. Alternatively, you can click the browser's back and forward buttons.

If your page isn't eligible for back/forward caching, the **Back/forward cache** tab shows you a list of issues. Under **Actionable**, you can see if you are using `unload`:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/fY1MHKVLYCr5wcRcnyw3.png", alt="Chrome DevTools Back/forward cache testing tool showing an unload handler was used", width="800", height="422" %}
</figure>

### Reporting API

The [Reporting API](https://www.w3.org/TR/reporting-1/) can be used to in conjuction with a read-only Permission Policy to detect usage of `unload` from your website users.

For more details see [usUsing Reporting API to find unloads](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#using-reportingapi-to-find-unloads)

### Bfcache `notRestoredReasons` API

The [`notRestoredReasons` property](/docs/web-platform/bfcache-notrestoredreasons/)—added to the [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) class—reports information on whether documents were blocked from using the [bfcache](https://web.dev/articles/bfcache) on navigation, and why. Usage instructions can be found [here](/docs/web-platform/bfcache-notrestoredreasons/). This is an example of how the response object warning of an existing `unload` listener looks like:

```js
{
   blocked: true,
   children: [],
   id: "",
   name: "",
   reasons: [ "Internal Error", "Unload handler" ],
   src: "",
   url: "a.com"
}
```

## Control access to `unload`

Chrome will deprecate the `unload` event gradually. In the meantime, you can use different tools to control this behavior and prepare for the upcoming deprecation. Keep in mind that you should not rely on these techniques in the long term, and you should plan to migrate to the alternatives instead as soon as possible.

The following options allow you to enable or disable `unload` handlers to test how your site would work without them so you can prepare for the upcoming deprecation. There are different types of policies:

- [Permissions Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md): This is a platform API for site owners to control access to features, at a site or an individual page level, via the usage of HTTP headers.
- [Enterprise policies](https://chromeenterprise.google/policies/): Tools for IT admins to configure Chrome for their organization or business. They can be configured via an admin panel, like the [Google Admin Console](https://support.google.com/a/answer/182076?hl=en).
- [Chrome flags](/docs/web-platform/chrome-flags/): This allows an individual developer to change the `unload` deprecation setting to test impact on various sites.

### Permissions Policy

A Permissions Policy [has been added from Chrome 115](https://chromestatus.com/feature/5760325231050752) to allow sites to opt-out of using `unload` handlers and immediately benefit from the bfcache to improve site performance. See [these examples on how to set this for your site](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-unload.md#examples). This allows sites to get ahead of the `unload` deprecation.

This [will be extended in Chrome 117](https://chromestatus.com/feature/5579556305502208) to allow sites to do the reverse, and to opt-in to continuing to try to fire `unload` handlers, as Chrome changes the default for these to not fire in future. See [these examples on how to continue to allow unload handlers to fire for your site](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#reenabling-unload-for-a-frame). This opt-in will not remain forever and should be used to allow time for sites to migrate away from `unload` handlers.

### Enterprise policy

Enterprises that have software that depends on the `unload` event to function correctly can use the [`ForcePermissionPolicyUnloadDefaultEnabled` policy](https://chromium-review.googlesource.com/c/chromium/src/+/4730081) to prevent the gradual deprecation for devices under their control. By enabling this policy, `unload` will continue to default to enabled for all origins. A page may still set a stricter policy if it wants. Like the Permissions Policy opt-out, this is a tool to mitigate potential breaking changes, but it should not be used indefinitely.

### Chrome flags and command line switches

As well as the enterprise policy, you can disable the deprecation for individual users via the Chrome flags and command lines swtiches:

Setting `chrome://flags/#deprecate-unload` this to `enabled` will bring forward the deprecation default and prevent `unload` handlers from firing. They can still be overridden on a site-by-site basis via Permissions Policy, but will continue to fire by default.

These settings can be also be controlled by [command line switches](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#testing-with-chrome).

### Options comparison

The following table summarizes the different uses of the options discussed previously:

<table>
  <thead>
    <tr>
      <td style="min-width: 250px;"></td>
      <th>Bring deprecation forward</th>
      <th>Bring deprecation forward (with exceptions)</th>
      <th>Prevent deprecation to secure time for a migration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Permissions Policy<br><em>(applies to pages/sites)</em></td>
      <td style="text-align: center;">Yes</td>
      <td style="text-align: center;">Yes</td>
      <td style="text-align: center;">Yes</td>
    </tr>
    <tr>
      <td>Enterprise policy<br><em>(applies to devices)</em></td>
      <td style="text-align: center;">No</td>
      <td style="text-align: center;">No</td>
      <td style="text-align: center;">Yes</td>
    </tr>
    <tr>
      <td>Chrome flags<br><em>(applies to individual users)</em></td>
      <td style="text-align: center;">Yes</td>
      <td style="text-align: center;">No</td>
      <td style="text-align: center;">No</td>
    </tr>
    <tr>
      <td>Chrome command line switches<br><em>(applies to individual users)</em></td>
      <td style="text-align: center;">Yes</td>
      <td style="text-align: center;">No</td>
      <td style="text-align: center;">Yes</td>
    </tr>
  </tbody>
</table>

## Conclusion

`unload` handlers are being deprecated. They have been unreliable for a long time and are not guaranteed to be fired on all cases where a document gets destroyed. Additionally, `unload` handlers are incompatible with [bfcache](https://web.dev/articles/bfcache).

Sites that currently make use of `unload` handlers should prepare for this upcoming deprecation by testing for any existing `unload` handlers, removing or migrating them or, as a last resort, delaying the deprecation if more time is needed.

## Acknowledgements

_Thanks to Kenji Baheux, Fergal Daly, Adriana Jara, and Jeremy Wagner for help reviewing this article._

_Hero image by [Anja Bauermann](https://unsplash.com/@anja_hb) on [Unsplash](https://unsplash.com/photos/D1LnfycCHks)_
