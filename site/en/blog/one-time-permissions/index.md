---
layout: 'layouts/blog-post.njk'
title: 'One-time permissions in Chrome'
description: >
  "Allow this time" is a one-time option for permission grants in Chrome. It will initially be available on desktop only for geolocation, camera, and microphone.
authors:
  - maudn
date: 2023-07-31
updated: 2023-07-31
hero: image/O2RNUyVSLubjvENAT3e7JSdqSOx1/FRytD8YVBZi9P3hAcOXv.jpeg
alt: Permission prompt in Chrome, with the Allow this time option.
tags:
  - capabilities
  - privacy
---


With a gradual rollout from [Chrome 116](https://chromiumdash.appspot.com/schedule), we will be adding the **Allow this time** option to permission prompts. Our goal is to make it easier for people to use powerful web capabilities on their own terms. **Allow this time** will initially be available on desktop for some of the most common permissions: geolocation, camera, and microphone. Permission prompts for other capabilities and on the mobile web are unchanged for now, but may change in the future.

**If you're a site owner, review [Impact and Recommendations](#impact-and-recommendations), and try the [demo](#demo).**

## A new UX for permissions

### Permissions UX before Chrome 116

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TcL9YukUHlkdn1bLbZTv.png", alt="Permission prompt showing only block and allow.", width="800", height="427" %}
  <figcaption>
    Permission prompt before Chrome 116.
  </figcaption>
</figure>

Users are presented with three options:

- **Allow**: Persistent allow.
- **Block**: Persistent block.
- Clicking the **x** button: Temporary block. The site can prompt the user again later, at most three times.

Permissions can be managed via the **Site controls** in the address bar or via the **Site settings**.

{% Aside 'key-term' %}
*Site controls*: User-facing information and controls for a site, accessible after clicking the icon in the address bar.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UD9Don3Ks7ZYL0cF2c2c.png", alt="The site controls menu in Chrome.", width="483", height="370" %}
  <figcaption>
    Site controls in Chrome.
  </figcaption>
</figure>
{% endAside %}

{% Aside 'key-term' %}
*Site settings*: User-facing information and controls for a site. Site settings can be accessed by clicking **Site settings** in the **Site controls** menu, or via Chrome's **Settings** page (`chrome://settings` or the **Settings** entry in the [three-dot-menu](https://support.google.com/chrome/answer/114662?hl=en)).
{% endAside %}

### New permissions UX from Chrome 116

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/7aSSSclHdEj33k5ifeQv.png", alt="Permission prompt with the new one-time option.", width="800", height="560" %}
  <figcaption>
    Permission prompt with the new one-time option. This is the new permission prompt on desktop for geolocation, camera, and microphone.
  </figcaption>
</figure>

Users are presented with four options:

- **Allow this time**: Temporary allow.
- **Allow on every visit**: Persistent allow.
- **Don't allow**: Persistent block.
- Clicking the **x** button: Temporary block.

When users select **Allow this time**, the granted permission is temporary, also referred to as _one-time permission_. Its duration is limited to the current ongoing interaction with a web application. 

<figure>
{% Video src="video/O2RNUyVSLubjvENAT3e7JSdqSOx1/EqRZdDpv30X1x7FdOGFP.mov", width="800", height="547", autoplay=true, muted=true, playsinline=true, loop=true%}
  <figcaption>
    One-time permissions can be managed like other permissions, via the <strong>Site controls</strong> or <strong>Site settings</strong>.
  </figcaption>
</figure>


### User benefits and UX design of "Allow this time"

**Allow this time** provides users with:

- **Increased control.** Chrome user research has shown that users often are not ready to make a persistent decision for website permissions, trying to assess if they get value in return for granting permissions. Offering a one-time Allow option accommodates this need and makes allowing access less risky.
- **More clarity.** Explicit **Allow this time** and **Allow on every visit** options make it clear that one of the options is temporary, while the other one is persistent.

{% Aside %}
Chrome UX teams tested multiple layout and string variations before settling on the vertical three-button layout. User feedback indicated that a layout similar to mobile UIs provides safer outcomes and better expectation match. We think that this is partly due to users being already familiar with this pattern.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/wthfyv9PF4DUz5XnBbgk.jpg", alt="Permission prompt for an Android app.", width="336", height="674" %}
  <figcaption>
  Permission prompt for an Android app, with three options presented in vertically-stacked buttons, including a one-time permission. Source: https://developer.android.com/training/location/permissions.
  </figcaption>
</figure>

{% endAside %}

## One-time permissions in other browsers

On the web, one-time permissions are supported in a number of browsers, including Safari and Firefox. To see how they work on your device, experiment with [https://permission.site/one-time](https://permission.site/one-time). Make sure to try out geolocation, camera, and microphone permissions, as they may have specific behaviors.

For example:
* In Safari 16 on desktop, geolocation is one-time by default (until next navigation). The user can opt into access being persisted for 24 hours via a checkbox.
* In Firefox 115 on desktop, geolocation, camera and microphone permissions are one-time by default. The user can opt into persistent access via a checkbox.

{% Aside %}
One-time permissions are also built into several mobile operating systems.
{% endAside %}


## Impact and recommendations

Impact of one-time permissions:
- The introduction of one-time permissions does not impact permissions that users have previously granted persistently. 
- Once a user makes a decision on a permission prompt, then for the duration of their visit, the permission state is either granted or denied. One-time permissions make no difference in this regard. 
- However, if the user selects **Allow this time**, they will see a permission prompt again on their next visit. 

To accommodate for one-time permissions, we recommend that site owners do the following:

- Ensure your implementation follows best practices around permissions. Review [Best practices](#best-practices).
- Understand when one-time permissions expire. See details in [Expiration of one-time permissions](#expiration).
- Understand how the [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API) behaves for one-time permissions, and **how to observe expiration.** Review details in [Permissions API](#permissions-api).

{% Aside %}
Chrome [removes permissions](https://blog.google/products/chrome/5-tips-to-stay-safer-online-with-chrome/#:~:text=A%20more%20proactive%20Safety%20Check) from sites users haven't recently visited. This is independent from one-time permissions.
{% endAside %}

### Best practices {: #best-practices }

**Allow this time** may make people more likely to grant permissions to try out capabilities, but it may also reduce their willingness to grant permanent access. This makes it even more important to follow best practices.

- Provide the necessary context before requesting permissions. Explain to your users why they'll benefit from a capability.
- Requests permissions at an appropriate and expected moment. Ideally, let your users express their intention to use a certain capability at their own pace.
- For the duration of the user’s visit, provide the same experience regardless of whether the user selected the one-time or persistent option.

Review additional guidance in [Permission UX](https://developers.google.com/web/fundamentals/push-notifications/permission-ux).

### Expiration of one-time permissions {: #expiration }

By default, all web permissions are bound to an [origin](https://web.dev/same-site-same-origin/#origin), which can be thought of as an app of its own. With **Allow this time**, the user gives a one-time permission to an origin. In essence, one-time permissions expire when the user stops actively interacting with that origin for some time. This means the site can continue to use the capability if the user briefly switches to another web page in a different tab but then comes back.

In more detail, one-time permission grants expire as soon as any of the following conditions are met:

* The page has been closed, was navigated away from, or was [discarded](/blog/page-lifecycle-api/#states:~:text=next%20states%3A%0ANONE-,Discarded,-A%20page%20is). This includes closing Chrome.
* 16 hours have passed since granting permission.
* The user manually revokes the permission (for example, in **Site controls**), or the permission is overridden through an enterprise policy.
* The page has been in the [background](#background-tab) for at least 5 minutes—except if the capability is allowed to run in the background, like camera or microphone. In this case, as long as the site uses the capability, Chrome shows a [tab strip indicator](#tab-strip-indicator) and doesn't start the 5-minute timer until the page stops using the capability. Note that the 16-hour timer is still running.

{% Aside %}
A user may have several tabs of the same origin open simultaneously. In that case, the expiration conditions are unchanged—you only need to replace the term "page" with "all pages from that origin".
{% endAside %}

#### Background tab {: #background-tab }
A browser tab is in the _background_ when it's not in the foreground. A tab is in the foreground when it's the visible tab in a browser window that is not minimized. 

In Chrome, some capabilities, like geolocation, can only run in the foreground tab. They're not allowed to run in a background tab. Others, like camera and microphone, are allowed to run in a background tab. 

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/Cjc8Tj8lnks8eB6Ntx7k.jpg", alt="A screenshot of the browser window highlight an active foreground tab and inactive background tab.", width="800", height="579" %}

#### Tab strip indicator {: #tab-strip-indicator }

Capabilities that continue to run when the tab is in the background have a *tab strip indicator*. 
For example, camera has a tab strip indicator.

<figure>
{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/RE7sxBJLNpuvD7wUcOJW.jpg", alt="A tab with a red dot.", width="515", height="111" %}
  <figcaption>
  The tab indicator for camera access is a red dot.
  </figcaption>
</figure>



Geolocation doesn't need a tab strip indicator, because geolocation access is paused as soon as the page is in the background.

{% Aside 'gotchas' %}
Geolocation has an address bar indicator, but no tab strip indicator.
{% endAside %}

#### Examples

* **Geolocation**: The user is on `example.com` and grants one-time geolocation access. The user switches to another tab. This makes `example.com` a background tab. Geolocation access is paused immediately because Chrome doesn't allow background geolocation access, but the one-time permission grant is still valid. If the user comes back to `example.com` within five minutes, the page can resume geolocation access (and the 5-minute expiry timer is reset). If they don't, the one-time permission expires. 
* **Camera/Microphone**: The user is on `example.com` and grants one-time camera access. The user switches to another tab. This makes `example.com` a background tab. Camera access can continue because Chrome allows camera access to continue in the background. Chrome keeps displaying the tab strip indicator for camera as long as it's in use to keep the user informed. At some point, the site may decide to stop camera access, in which case the 5-minute expiry timer starts. After 5 minutes without camera access, the one-time permission expires.


### Permissions API {: #permissions-api }

{% Aside 'caution' %}

At the time of this writing, the [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API) is only available for some capabilities, depending on the browser. Review the list of capabilities that are permissions-aware [here](https://developer.mozilla.org/docs/Web/API/Permissions_API#permission-aware_apis), and detailed browser support [here](https://developer.mozilla.org/docs/Web/API/Permissions_API#browser_compatibility).
{% BrowserCompat 'api.Permissions' %}

{% endAside %}

To query the status of API permissions, you can use the [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API):

- If the user picks **Allow this time**, the Permission API status is set to `granted`.  This means that an unexpired one-time permission and a persistent permission are indistinguishable and have the same status: `granted`.
- Once the one-time permission expires, the status will be set back to `prompt`.
- To observe the expiration of a one-time permission, register a [`PermissionStatus.onchange`](https://developer.mozilla.org/docs/Web/API/PermissionStatus) event handler.

{% Aside 'objective' %}
Review example code [here](https://github.com/chromium/permission.site/blob/master/one-time.js#L17), and try the [demo](https://permission.site/one-time) to observe these behaviors.
{% endAside %}

{% Aside 'gotchas' %}
Do not use the `prompt` state as a signal that a user is a first-time user. This has never been a reliable signal. With one-time permissions, it becomes even less reliable because `prompt` may now be the status of a permission that the user has previously chosen to **Allow this time** but has since expired. For example, because all tabs from that origin were in the background for 5 minutes.
{% endAside %}

## Demo

1.  Open [Chrome 116](https://chromiumdash.appspot.com/schedule) or newer, on a desktop computer.
2.  Open `chrome://flags/#one-time-permission` and select **Enable**. Restart Chrome. This step force-enables one-time permissions in case they aren't yet rolled out in your Chrome browser.
3.  Open [https://permission.site/one-time](https://permission.site/one-time).
4.  Click the **Geolocation** button.
5.  Observe the new one-time permission prompt.
6.  Pick **Allow this time**.
7.  Open the **Site controls**. Observe that you can manage the one-time permission.
8.  Close the tab for [https://permission.site/one-time](https://permission.site/one-time). Make sure that no other tab for that origin is open.
9.  Open [https://permission.site/one-time](https://permission.site/one-time) in a new tab.
10. Open the **Site controls**. Navigate to the **Site settings**.
11. Observe that the Geolocation permission is now back to its initial state: **Ask (default)**.

## Conclusion and feedback

One-time permissions offer users more choice, and Chrome's new permission UI brings a more consistent permission user experience across browsers and platforms.

If you encounter any issues with one-time permissions, [file a new crbug issue for permission prompts](https://bugs.chromium.org/p/chromium/issues/entry?components=UI%3EBrowser%3EPermissions%3EPrompts).

### Acknowledgements

Thanks to [Rachel Andrew](/authors/rachelandrew), Balazs Engedy, Marian Harbach, Florian Jacky and [Thomas Steiner](/authors/thomassteiner/) for reviewing this article.
