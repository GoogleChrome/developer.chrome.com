---
layout: 'layouts/blog-post.njk'
title: Help test bounce tracking mitigations
description: >
  We plan to launch mitigations to limit tracking from a particular technique called "bounce tracking" later this year.
  We would like to invite developers to test this new feature with feature flags and provide feedback.
authors:
  - wanderview
  - anusmitaray
date: 2023-05-30
---

As part of our efforts to improve privacy on the web, the Chrome team has been actively working to prevent cross-site tracking of users. We plan to launch mitigations to limit tracking from a particular technique called "bounce tracking" later this year.

While we don't expect many non-tracking sites will be adversely affected by these changes, we would like to invite developers to test this new feature with feature flags and provide feedback.

## What is bounce tracking?

Bounce tracking is a technique that allows a third-party site to store a cookie even when third-party cookies are blocked. Third-party tracking code included on a page can be used to redirect a user to a tracker's site, where a cookie can be set, then back to the original page. This redirection can often happen so quickly that a user may not even notice.

Bounce tracking can either be done as a "bounce back" or as a "bounce through".

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/fr3NNSkHF6x6r2i8NwqR.png", alt="Shows an example of a bounce back where site1.example redirects to tracker.example, cookies are accessed, and then redirects back to the original site.", width="528", height="203" %}
<figcaption>
  <p>Bounce Back Tracking.</p>
</figure>

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/HbRv8UEXhcWPyMbxTLOJ.png", alt="Shows an example of bounce through where site1.example redirects to tracking.example. cookies are accessed, and then redirects to site2.example.", width="586", height="211" %}
<figcaption>
  <p>Bounce Through Tracking.</p>
</figure>

In both instances, users may be unaware they have visited `tracker.example`. They may believe they have only visited `site1.example` or tried to navigate to `site2.example`.

## What is Chrome planning to change?

Chrome intends to protect users from bounce tracking by periodically deleting state for these tracking sites. The process will work as follows:

1. Chrome will monitor navigations and internally flag sites that are part of a "stateful bounce". This means a navigation redirected through the site, and that the site accessed state during the redirection. This includes both server-initiated redirections and client-side redirections where JavaScript programmatically triggers a navigation. Accessing state includes both cookies and other types of storage; for example, localstorage, indexedDB, and so on.
1. Chrome will periodically examine the list of flagged sites and check to see if the user has actively used the site by interacting with it within the last 45 days. This interaction can occur before, during, or after the bounce was detected.
1. If the site does not have any user interaction and third-party cookies are blocked, then its state will be deleted.

We hope to launch these changes to users who have opted-in to blocking third-party cookies in early Q3 2023.

{% Aside %}  
This algorithm operates on sites defined by [eTLD+1](https://developer.mozilla.org/docs/Glossary/eTLD#:~:text=The%20related%20concept%20eTLD%2B1%20means%20an%20eTLD%20plus%20the%20next%20part%20of%20the%20domain%20name.%20Because%20eTLDs%20are%20registrable%2C%20all%20domains%20with%20the%20same%20eTLD%2B1%20are%20owned%20by%20the%20same%20organization.). As a result, both "foo.example.site" and "bar.example.site" are treated as "example.site".  
{% endAside %}

{% Aside %}   
It's important to note that deletion only occurs when third-party cookies are blocked. This means that initially only users that have opted-in to blocking third-party cookies or are using Incognito mode will be protected from bounce tracking. The feature will roll out to all users later when [third-party cookie deprecation moves forward](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline/).  
 {% endAside %}

## Will this break other redirection flows?

The user interaction check is intended to protect non-tracking sites from deletion in cases where they also use a redirection flow. For example, SSO, federated authentication, and payment flows often perform these kinds of interactions. Accordingly, we don't expect SSO, federated authentication, or payments flows to be impacted. For example, the act of logging into the identity provider, however, counts as a user interaction and prevents deletion.

## How can I tell if my site is impacted?

Bounce tracking mitigations are available to test with feature flags from Chrome version 115 (currently the latest [Canary](https://www.google.com/chrome/canary/)):

1. Create a [new Chrome profile](https://support.google.com/chrome/answer/2364824). An existing profile that you have used for web development might have interactions logged on the bounce site that your typical website users may not experience.
1. Set the [flag](/docs/web-platform/chrome-flags/#chromeflags) at `chrome://flags/#bounce-tracking-mitigations` to "Enabled With Deletion".
1. Enable third-party cookie blocking in `chrome://settings/cookies` by selecting "Block third-party cookies".
1. Perform your workflow that involves redirections.
1. Open the Chrome DevTools [Issues tab](/docs/devtools/issues/) and look for a message titled "Chrome may soon delete state for intermediate websites in a recent navigation chain".
1. Force the bounce tracking deletion check to occur by going to the DevTools Application Panel, clicking on **Bounce Tracking Mitigations** under **Background Services**, and then pressing **Force Run**.  Alternatively, you can wait up to two hours for the deletion to occur.
1. Perform your workflow that would expect to have state present on the site bounced through.

For example, if in step (4) you visit [this demo page](https://bounce-tracking-demo.glitch.me/) and select the "bounce me" link, then you can expect to see a DevTools issue:

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/YtP70APBL2ZSbBVa2EYX.png", alt="A screenshot of the DevTools issue indicating bounce-tracking-demo-tracker.glitch.me is at risk of being deleted.", width="800", height="218" %}
<figcaption>
  <p>Screenshot of the DevTools issue.</p>
</figure>

Then, in step 6 you can force the deletion to occur immediately by using the DevTools Application Panel:

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/6QPd7ZS0s5F1uDXZberP.png", alt="A screenshot of the devtools application tab with the bounce tracking mitigations panel selected.  The panel shows that the force run operation has been used and storage has been deleted for the demo site.", width="800", height="273" %}
<figcaption>
  <p>DevTools bounce tracking mitigations panel.</p>
</figure>

If you then revisit the [demo](https://bounce-tracking-demo.glitch.me/) and perform the bounce, you should see a new identifier produced because the state was cleared.

## Enterprise use cases

Some enterprises use managed devices in a way that [automatically signs users into their SSO site](https://github.com/privacycg/nav-tracking-mitigations/issues/36). Since the user does not interact with the SSO site, this can cause Chrome to treat the site as a bounce tracker.

To mitigate this issue enterprises can use [cookie policies](https://chromeenterprise.google/policies/atomic-groups/#CookiesSettings) to enable third-party cookies for the SSO site. This will then prevent bounce tracking mitigations from taking effect for that site.

## Feedback

You can provide feedback in the [Chromium bug tracker](http://crbug.com/new) using the "Privacy>NavTracking" component. Feedback can also be left as a [W3C PrivacyCG Navigation-based Tracking Mitigations issue](https://github.com/privacycg/nav-tracking-mitigations/issues).
