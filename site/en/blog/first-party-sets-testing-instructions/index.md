---
layout: 'layouts/blog-post.njk'
title: First-Party Sets testing instructions
description: >
  First-Party Sets can allow related domain names that are owned and operated by
  the same entity to be treated as first-party in situations where first party and
  third party are otherwise treated differently. 
date: 2022-12-01
thumbnail: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg'
alt: A diagram showing First-Party Sets. One set contains domains example.com,
  example.rs, and example.co.uk. The other set contains brandx.site,
  fly-brandx.site, and drive-brandx.site.
is_outdated: true
new_available_content_url: /docs/privacy-sandbox/first-party-sets-integration/
tags: 
  - privacy
authors:
  - mihajlija
---


The latest iteration of First-Party Sets is ready for developer feature-flag testing from Chrome 108. We are actively working on First-Party Sets with an aim to move towards shipping, so we will be considering feedback for this phase of developer testing up until the release of Chrome 111 at the beginning of March (March 7, 2023).

Ecosystem feedback has highlighted cross-site use cases that will be impacted when third-party cookies are no longer supported in Chrome. The First-Party Sets proposal examines and addresses a class of cross-site use cases in which the interdependent sites share a relationship that can be expressed to the browser such that the browser can take the appropriate action on behalf of the user and/or effectively present that information to the user.

The updated proposal uses two APIs (the Storage Access API and a new API tentatively named `requestStorageAccessForOrigin`) to provide sites with an active method of requesting cross-site access for their cookies within a First-Party Set. The instructions below should allow you to test and validate what sets you may want to create for your sites and the right points to call the two different APIs.

## First-Party Sets overview

First-Party Sets (FPS) is a web platform mechanism for developers to declare relationships among sites, so that browsers can use this information to enable limited cross-site cookie access for specific, user-facing purposes. Chrome will use these declared relationships to decide when to allow or deny a site access to their cookies when in a third-party context.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg", alt="", width="800", height="513" %}

At a high level, a First-Party Set is a collection of domains, for which there is a single "set primary" and potentially multiple "set members". Only site authors are able to submit their domains to a set, and they will be required to declare the relationship between each "set member" to its "set primary". Set members can include a range of different domain types with [subsets based on use cases](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets).

{% Aside %}
As the proposal has evolved, FPS no longer relies on `SameParty` attribute on cookies to enable cross-site cookie access.
{% endAside %}

To facilitate the browser's handling of each subset according to the privacy implications of each subset, we are proposing leveraging the [Storage Access API (SAA)](https://privacycg.github.io/storage-access/) and requestStorageAccessForOrigin to enable cookie access within a FPS.

With the SAA, sites may actively request cross-site cookie access. Chrome will automatically grant the request if the requesting site and the top-level website are in the same FPS. Please see [Storage Access API (SAA) documentation](https://developer.mozilla.org/docs/Web/API/Storage_Access_API) for information on how calls to SAA are processed by other browsers.

SAA currently requires that the document obtains user activation before calling the API's methods.

This can make adopting FPS challenging for top-level sites that use cross-site images or script tags requiring cookies. To [address some of these challenges](https://github.com/WICG/first-party-sets#extending-the-storage-access-api) we've proposed a new API, [`requestStorageAccessForOrigin`](https://github.com/mreichhoff/requestStorageAccessForOrigin), to make it easier for developers to adopt this change. This API is also available for testing.

## Set submission

The canonical FPS list will be a publicly viewable list in a JSON file format housed in a new [FPS GitHub repository](https://github.com/googlechrome/first-party-sets), which will serve as the source-of-truth for all sets. Chrome will consume this file to apply to its behavior.

To learn more about the proposed process and requirements for submitting sets, check out the [submission guidelines](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md). You can also try submitting a set to test the various technical checks that will validate the submissions. Note that all submissions will be cleared before FPS is available in stable versions of Chrome.

As the set submission process is still under active development, for local testing, you can only create sets on the command line and pass them directly to the browser. For local testing, it is not required to submit a set to the GitHub repo in order to test with feature flags.

## How to test locally

### Prerequisites

To test FPS locally, use Chrome 108 or higher launched from the command line. 

To preview upcoming Chrome features before they're released, download the [Beta](https://www.google.com/chrome/beta/) or [Canary](https://www.google.com/chrome/canary/) version of Chrome.

### Example

{% Aside %}
To see a FPS demo in action, visit [https://first-party-sets.glitch.me/](https://first-party-sets.glitch.me/).
{% endAside %}

```text
google-chrome \
--enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI" \
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
```

Learn more about [how to run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/).

### Steps

To enable FPS locally, you need to use Chrome's  `--enable-features` option with a comma-separated list of flags that are explained in this section and declare a set of related sites as a JSON object to pass to `--use-first-party-set`.


#### Enable FPS

`FirstPartySets` enables FPS in Chrome.

```text
FirstPartySets
```

{% Aside %}
Starting in Chrome M109, [site data will be cleared in case members of a set change](https://github.com/WICG/first-party-sets#clearing-site-data-on-set-transitions). This prevents linking a user's identity across all the sets a site has historically been in. 
{% endAside %}



#### Enable Storage Access API

```text
StorageAccessAPI
```

Enables [Storage Access API](https://privacycg.github.io/storage-access/) (SAA) in Chrome which allows embedded iframes to use `requestStorageAccess()` to request access to cookies in a cross-site context, even when third-party cookies are blocked by the browser.

Note that when called, `requestStorageAccess()` requires a user gesture in order to resolve. Future versions of Chrome may impose different sets of requirements, as the SAA specification is still evolving. Refer [here](https://bugs.chromium.org/u/shuuran@chromium.org/hotlists/First-Party-Sets-GA) for a list of planned improvements to Chrome's implementation of the SAA.

```text
StorageAccessAPIForOriginExtension
```

Enables top-level sites to use `requestStorageAccessForOrigin()` to request storage access on behalf of specific origins. This is useful for top-level sites that use cross-site images or script tags requiring cookies and [addresses some of the challenges in adopting](https://github.com/WICG/first-party-sets#extending-the-storage-access-api) SAA.

#### Declare a set locally

A First-Party Set is a collection of domains, for which there is a single "set primary" and potentially multiple "set members". Set members can include a range of different domain types with [subsets based on use cases](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsetsgh-use-case-based-subsets).

Create a JSON object that contains URLs that are members of a set and pass it to `--use-first-party-set`.

In the example below,  `primary` lists the primary domain, and `associatedSites` lists domains that meet the requirements of the [associated subset](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets).

```json
{
     "primary": "https://primary.com",
    "associatedSites": ["https://associate1.com", "https://associate2.com", "https://associate3.com"]
}
```

Example:

{% Aside %}
When you define a set on the command line, ensure you quote the entire string and escape the quotes within the JSON.
{% endAside %}

```text
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}"
```

For local testing, you can only create sets on the command line and pass them directly to the browser. For local testing purposes there will be no set validation, but when FPS ships in stable versions, all sets will need to be submitted to the FPS GitHub repo and be subject to validation criteria.

#### Enable FPS UI

```text
PageInfoCookiesSubpage
```

Enables showing FPS in the PageInfo section accessible from the URL bar.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/ZljqGAmnZWXbFTQWhtMw.png", alt="", width="800", height="513" %}

```text
PrivacySandboxFirstPartySetsUI
```

Enables FPS UI "Allow related sites to see your activity in the group" option in Chrome settings, under Privacy and Security → Cookies and other site data (chrome://settings/cookies).

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/Bp6CSnAztSTEB7epeAm0.png", alt="", width="800", height="513" %}

#### Verify that third party cookies are blocked

1.  In Chrome settings, go to Privacy and Security → Cookies and other site data or chrome://settings/cookies.
1.  Under General settings ensure that "Block third-party cookies" is enabled.
1.  Check that the sub-option "Allow related sites to see your activity in the group" is also enabled.

## Security considerations

Since Storage Access API allows websites to regain access to third-party cookies in select cases, it may leave web applications susceptible to cross-site attacks and information leaks. Sites that rely on cookies in cross-site contexts should be aware of the risks of [CSRF](https://developer.mozilla.org/docs/Glossary/CSRF) and other attacks.

### Planned improvements

To improve this, future Chrome releases will require additional security controls, with the goal of ensuring explicit embeddee opt-in. The proposed improvements would: only grant access on a per-frame basis, require CORS on credentialed requests, and keep the scope of access to the origin only. You can read more in the [recent security analysis](https://docs.google.com/document/d/1AsrETl-7XvnZNbG81Zy9BcZfKbqACQYBSrjM3VsIpjY/edit#heading=h.vb3ujl8dnk4q).

Check out the [list of planned improvements](https://bugs.chromium.org/u/shuuran@chromium.org/hotlists/First-Party-Sets-GA) to Chrome's implementation of the SAA.

Note that Chrome only sends cookies marked SameSite=None in cross-site embedded contexts, which is where the Storage Access API is relevant. Until all browsers have deprecated default access to those cookies, however, no assumptions can be made about where the cookie could be used. It is not safe to assume that access would only be allowed within an FPS, and sites should continue using standard security best practices.

## Engage and share feedback

Local testing is an opportunity to try out the Storage Access API mechanism for enabling FPS and share feedback or any issues you run into. Additionally, testing out the set submission process on GitHub is an opportunity to share your experience with the process and validation steps. To engage and share feedback about the updated proposal:

-   Raise issues and follow the discussion on [GitHub](https://github.com/WICG/first-party-sets/issues).
-   Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-   Explore different avenues for giving [feedback on Privacy Sandbox proposals](/docs/privacy-sandbox/feedback/).