---
# Required
layout: 'layouts/blog-post.njk'
title: Deprecating the `unload` event
description: |
  The unload event will be gradually deprecated starting from Chrome 117. Learn what this means and how sites and enterprises can prepare for this
authors:
  - demianrenzulli
  - tunetheweb
date: 2023-08-10
#updated: 2023-08-10
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Mxh3dDENwFYXpkwD1z9X.jpg
alt: Shipping container being unloaded by a large crane
tags:
  - performance
  - origin-trials
  - deprecations-removals
  - chrome-117
---

The [`unload` event](https://developer.mozilla.org/docs/Web/API/Window/unload_event) will be gradually [deprecated](https://chromestatus.com/feature/5579556305502208) starting from Chrome 117. The deprecation will occur by gradually changing the default so that `unload` handlers stop firing on pages unless page explicitly opts in to re-enable them.

## Background

`unload` was designed to fire when the document is being unloaded. In theory, it can be used to run code any time a user is navigating away from a page, or as an end of session callback.

Scenarios where this event was most commonly used include:

- **Saving user data**: Save data before leaving the page.
- **Performing cleanup tasks**: Closing open resources before abandoning the page.
- **Sending analytics**: Sending data related to user interactions at the end of the session.

However the `unload` event [is extremely unreliable](/blog/page-lifecycle-api/#the-unload-event). In most browsers the code often won't run and when it does it has a negative impact on a site's performance, by preventing the usage of [bfcache (back/forward cache)](https://web.dev/bfcache/#never-use-the-unload-event).

This is a historical legacy and the unload handler [should not prevent use of the bfcache according to specification](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#unload-as-specced). Chrome aims to move to conform more to spec (as Safari already does), and with the aim of being able to fully deprecate the legacy unload handler at some point in the future.

## Alternatives to `unload` events

Instead of `unload` it is recommended to use:

- [`visibilitychange`](/blog/page-lifecycle-api/#event-visibilitychange): To determine when the visibility of a page changes. This event happens when the user switches tabs, minimizes the browser window, or opens a new page. Consider the [`hidden state`](/blog/page-lifecycle-api/#advice-hidden) the last reliable time to save app and user data.
- [`pagehide`](/blog/page-lifecycle-api/#event-pagehide): To determine when the user has navigated away from the page. This event happens when the user navigates away from the page, reloads the page, or closes the browser window. The `pagehide` event is not fired when the page is simply minimized or switched to another tab. Note that, as `pagehide` does not make a page ineligible for the back/forward cache it is possible a page can be restored after this event fires, so if cleaning up any resources in this event, then they may have to be restored on page restore.

For more details, see [this advice on never using the unload handler](https://web.dev/bfcache/#never-use-the-unload-event).

## Detect usage of unload

There are different tools to help you find appearances of the `unload` event on pages. This allows sites to discover if they are using this event—either in their own code, or via libraries—and so may be affected by the upcoming deprecation.

### Lighthouse

[Lighthouse](/docs/lighthouse/) has a [`no-unload-listeners` audit](https://github.com/GoogleChrome/lighthouse/pull/11085), which warns developers if any JavaScript on their pages (including that from third-party libraries) adds an `unload` event listener.

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/0IbgnaeYF2zHOfhwdVcc.png", alt="Lighthouse audit showing unload handlers in use", width="800", height="304" %}

### Chrome DevTools

[Chrome DevTools](/docs/devtools/) includes a [`back-foward-cache` audit](/docs/devtools/application/back-forward-cache/) to help you identify issues that may prevent your page from being eligible for back/forward cache, including the usage of the `unload` handler.

To test back/forward cache, follow these steps:

1. On your page, [open DevTools](/docs/devtools/open/), then navigate to **Application** > **Background services** > **Back/forward cache**.

2. Click **Test back/forward cache** Chrome automatically takes you to chrome://terms/ and back to your page. Alternatively, you can click the browser's back and forward buttons.

If your page isn't eligible for back/forward caching, the Back/forward cache tab shows you a list of issues. Under **Actionable** you can see if you are using `unload`:

{% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/fY1MHKVLYCr5wcRcnyw3.png", alt="Chrome DevTools Back/forward cache testing tool showing an unload handler was used", width="800", height="422" %}

### Bfcache `notRestoredReasons` API

The [`notRestoredReasons` property](/docs/web-platform/bfcache-notrestoredreasons/), added to the [`PerformanceNavigationTiming`](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) class, reports information on whether documents were blocked from using the [bfcache](https://web.dev/bfcache/) on navigation, and why. Usage instructions can be found [here](/docs/web-platform/bfcache-notrestoredreasons/). This is an example of how the response object warning of an existing `unload` listener looks like:

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

## Control access to unload

Chrome will deprecate the `unload` event gradually. In the meantime you can use different tools to control this behavior and prepare for the upcoming deprecation. Keep in mind that you should not rely on these techniques in the long term and you should plan to migrate to the alternatives instead as soon as possible.

The following options allow you to enable or disable `unload` handlers to test how your site would work without them so you can prepare for the upcoming deprecation. There are different types of policies:

- [Permissions-Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md): This is a platform API for site owners to control access to features, at a site or an individual page level, via the usage of HTTP headers.
- [Enterprise policies](https://chromeenterprise.google/policies/): Tools for IT admins to configure Chrome for their organization or business. They can be configured via an admin panel, like the [Google Admin Console](https://support.google.com/a/answer/182076?hl=en).
- [Chrome flags](/docs/web-platform/chrome-flags/): This allows an individual developer to change the unload deprecation setting to test impact on various sites.

### Permission-Policy

A Permission-Policy [has been added from Chrome 115](https://chromestatus.com/feature/5760325231050752) to allow sites to opt-out of using unload handlers and immediately benefit from bfcache usage to improve site performance. See [these examples on how to set this for your site](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-unload.md#examples). This allows sites to get ahead of the unload deprecation.

This [will be extended in Chrome 117](https://chromestatus.com/feature/5579556305502208) to allow sites to do the reverse, and to opt-in to continuing to try to fire unload handlers, as Chrome changes the default for these not to fire in future. See [these examples on how to continue to allow unload handlers to fire for your site](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#reenabling-unload-for-a-frame). This opt-in will not remain forever and should be used to allow time for sites to migrate away from unload handlers.

### Enterprise policy

Enterprises that have software that depends on the `unload` event to function correctly can use the [`ForcePermissionPolicyUnloadDefaultEnabled` policy](https://chromium-review.googlesource.com/c/chromium/src/+/4730081) to prevent the gradual deprecation for devices under their control. By enabling this policy, the Permissions-Policy for unload will continue to default to enabled for all origins. A page may still set a stricter policy if it wants. Like the Permission Policy opt-out, this is a tool to mitigate potential breaking changes but should not be used indefinitely.

### Chrome flags

As well as the enterprise policy, you can disable the deprecation for individual users via the flag: `chrome://flags/#deprecate-unload`. Setting this to `disabled` will prevent Chrome from switching the default on `unload` handlers and allow them to continue to fire. They can still be overridden on a site by site basis via Permissions-Policy, but will continue to fire by default.

As well as Chrome flags, these settings [can be controlled by command line options](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-deprecate-unload.md#testing-with-chrome).


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
  <thead>
  <tbody>
    <tr>
      <td>Permission-Policy<br><em>(applies to sites)</em></td>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Enterprise policy<br><em>(applies to devices)</em></td>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
      </tr>
    <tr>
      <td>Chrome flags<br><em>(applies to individual users)</em></td>
      <td>Yes</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
  </tbody>
</table>

## Conclusion

`unload` handlers are being deprecated. They have been unreliable for a long time and are not guaranteed to be fired on all cases where a document gets destroyed. Additionally, `unload` handlers are incompatible with [bfcache](https://web.dev/bfcache/).

Sites that currently make use of `unload` handlers should prepare for this upcoming deprecation by testing for any existing `unload` handlers, removing or migrating them or, as a last resort, delaying the deprecation if more time is needed.

## Acknowledgements

_Hero image by [Anja Bauermann](https://unsplash.com/@anja_hb) on [Unsplash](https://unsplash.com/photos/D1LnfycCHks)_
