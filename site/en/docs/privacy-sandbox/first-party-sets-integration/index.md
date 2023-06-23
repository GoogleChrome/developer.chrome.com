---
layout: 'layouts/blog-post.njk'
title: "First-Party Sets: developer guide"
date: 2023-01-12
updated: 2023-05-10
thumbnail: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/SV7SXAQRcVnBZEgjgxYc.png'
alt: A diagram showing an embedded site calling requestStorageAccess.
tags: 
  - privacy
authors:
  - mihajlija
  - jney
  - sarino
---


[First-Party Sets (FPS)](docs/privacy-sandbox/first-party-sets/) is a web platform mechanism which helps browsers to understand the relationships amongst a collection of domains. This allows browsers to make key decisions to enable certain site functions (such as whether to allow access to cross-site cookies) and to present this information to users.

As Chrome deprecates third-party cookies, its goal is to maintain key use cases on the web while improving privacy for users. For example, many sites rely on multiple domains to serve a single user experience. Organizations may want to maintain different top-level domains for multiple use cases like country specific domains or service domains for hosting images or video. FPS allows sites to share data across domains, with specific controls.

## What is a First-Party Set

At a high level, a First-Party Set is a collection of domains, for which there is a single "set primary" and potentially multiple "set members".

In the example below, `primary` lists the primary domain, and `associatedSites` lists domains that meet the requirements of the [associated subset](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements).

```js
{
  "primary": "https://primary.com",
  "associatedSites": ["https://associate1.com", "https://associate2.com", "https://associate3.com"]
}
```

The canonical FPS list is a publicly viewable list in a JSON file format hosted in the [FPS GitHub repository](https://github.com/googlechrome/first-party-sets), which serves as the source-of-truth for all sets. Chrome consumes this file to apply to its behavior.

Only those with administrative control over a domain can create a set with that domain. Submitters are required to declare the relationship between each "set member" to its "set primary". Set members could include a range of different domain types and must be part of a [subset based on a use case](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements).

If your application depends on access to cross-site cookies (also called third-party cookies) across sites within the same First-Party Set, you can use [Storage Access API (SAA)](https://privacycg.github.io/storage-access/) and the [requestStorageAccessFor API](https://privacycg.github.io/requestStorageAccessFor/) to request access to those cookies. Depending on the subset that each site is part of, the browser may handle the request differently.

To learn more about the process and requirements for submitting sets, check out the [submission guidelines](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md). Submitted sets will go through various technical checks to validate the submissions.

## FPS use cases

First-Party Sets are a good match for cases when an organization needs a form of shared identity across different top-level sites.

Some of the use cases for FPS are:

-   **Country customization**. Leveraging localized sites while relying on shared infrastructure (example.co.uk may rely on a service hosted by example.ca).
-   **Service domain integration**. Leveraging service domains that users never directly interact with, but provide services across the same organization's sites (example-cdn.com).
-   **User content separation**. Accessing data on different domains that separate user-uploaded content from other site content for security reasons, while allowing the sandboxed domain access to authentication (and other) cookies. If you are serving inactive user-uploaded content, you may also be able to safely host it on the same domain by following best practices [here](https://security.googleblog.com/2023/04/securely-hosting-user-data-in-modern.html).
-   **Embedded authenticated content**. Supporting embedded content from across affiliated properties (videos, documents, or resources restricted to the user signed in on the top-level site).
-   **Sign-in**. Supporting sign-in across affiliated properties. The [FedCM API](/docs/privacy-sandbox/fedcm/) may also be appropriate for some use cases.
-   **Analytics**. Deploying analytics and measurement of user journeys across affiliated properties to improve quality of services.


## FPS integration details

### Storage Access API

The [Storage Access API (SAA)](https://privacycg.github.io/storage-access/) provides a way for embedded cross-origin content to access the storage that it would normally only have access to in a first-party context.

Embedded resources can use SAA methods to check whether they currently have access to storage, and to request access from the user agent.

When third-party cookies are blocked, but First-Party Sets are allowed, Chrome will automatically grant that permission for sites within the set and deny it for sites outside the set.

{% Aside %}
SAA is shipping in several browsers, however there are [differences between browser implementations](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#safari_implementation_differences) in the rules of handling storage access.
{% endAside %}

### Checking and requesting storage access

To check whether they currently have access to storage embedded sites can use [`Document.hasStorageAccess()`](https://developer.mozilla.org/docs/Web/API/Document/requestStorageAccess) method. 

The method returns a promise that resolves with a boolean value indicating whether the document already has access to its cookies or not. The promise also returns true if the iframe is same-origin as the top frame.

{% BrowserCompat 'api.Document.hasStorageAccess' %}

To request access to cookies in a cross-site context embedded sites can use [`Document.requestStorageAccess()`](https://developer.mozilla.org/docs/Web/API/Document/requestStorageAccess) (rSA). 

When called, the method requires a [user gesture](https://html.spec.whatwg.org/multipage/interaction.html#user-activation-processing-model) to resolve, otherwise it will throw an exception. It returns a promise that resolves if the access to storage was granted, and rejects if access was denied.

{% BrowserCompat 'api.Document.requestStorageAccess' %}

### requestStorageAccessFor in Chrome

SAA only allows embedded sites to request access to storage from within `<iframe>` elements that have received user interaction.

This poses challenges in adopting SAA for top-level sites that use cross-site images or script tags requiring cookies.

To address this, Chrome has implemented a way for top-level sites to request storage access on behalf of specific origins with [`Document.requestStorageAccessFor()`](https://privacycg.github.io/requestStorageAccessFor/) (rSAFor).

```js
 document.requestStorageAccessFor('https://target.site')
```

### Checking storage access permissions

Access to some browser features, like camera or geolocation, is based on user-granted permissions. The Permissions API provides a way to check the permission status for accessing an API–whether it has been granted, denied, or it requires some form of user interaction, such as clicking a prompt or interacting with the page.

You can query permission status using `navigator.permissions.query()`.

To check the storage access permission for the current context you need to pass in the `'storage-access'` string:

```js
navigator.permissions.query({name: 'storage-access'})
```

To check the storage access permission for a specified origin,  you need to pass in the `'top-level-storage-access'` string:

```js
navigator.permissions.query({name: 'top-level-storage-access', requestedOrigin: 'https://target.site'})
```

Note that to protect the integrity of the embedded origin, this checks only permissions granted by the top-level document using `document.requestStorageAccessFor`.

Depending on whether the permission can be automatically granted or it requires a user gesture, it will return `prompt` or `granted`.

### Per frame model

rSA grants apply per [frame](https://www.w3.org/TR/html401/present/frames.html). rSA and rSAFor grants are treated as separate permissions.

Each new frame will need to request storage access individually and it will automatically be granted access.  Only the first request requires user gesture, any subsequent requests initiated by the iframe, such as navigation or subresources will not need to wait for a user gesture as that will be granted for the browsing session by the initial request.

Refreshing, reloading, or otherwise recreating the iframe will require requesting access again.

### Cookie requirements

Cookies must specify both the `SameSite=None` and `Secure` attributes as rSA only [provides access for cookies that are already marked for use in cross-site contexts](https://privacycg.github.io/storage-access/#cookies). 

Cookies with `SameSite=Lax`, `SameSite=Strict`, or without a `SameSite` attribute are for first-party use only and will **never** be shared in a cross-site context regardless of rSA.

### Security

For rSAFor, subresource requests require [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/docs/Web/HTTP/CORS) headers or `crossorigin` attribute on the resources, ensuring explicit opt-in.

## Implementation examples

### Requesting access to storage from an embedded cross-origin iframe

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/SV7SXAQRcVnBZEgjgxYc.png", alt="", width="800", height="402" %}

#### Check if you have storage access

To check if you already have storage access use `document.hasStorageAccess()`.

If the promise resolves true, you can access storage in the cross-site context. If it resolves false, you need to request storage access.

```js
document.hasStorageAccess().then((hasAccess) => {
    if (hasAccess) {
      // You can access storage in this context
    } else {
      // You have to request storage access
    }
});
```

#### Request storage access

If you need to request storage access, first check the storage access permission `navigator.permissions.query({name: 'storage-access'})` to see if that requires a user gesture or it can be automatically granted.

If the permission is `granted` you can call `document.requestStorageAccess()` and it should succeed without a user gesture.

If the permission status is `prompt` you need to initiate the `document.requestStorageAccess()` call after a user gesture, such as a button click.

{% Aside %}
If you try calling `requestStorageAccess()` before the permission is granted or a user gesture is registered, it will throw an error: _"requestStorageAccess: Must be handling a user gesture to use"_.
{% endAside %}

Example:

```js
navigator.permissions.query({name: 'storage-access'}).then(res => {
  if (res.state === 'granted') {
    // Permission has already been granted
    // You can request storage access without any user gesture
    rSA();
  } else if (res.state === 'prompt') {
    // Requesting storage access requires user gesture
    // For example, clicking a button
    const btn = document.createElement("button");
    btn.textContent = "Grant access";
    btn.addEventListener('click', () => {
      // Request storage access
      rSA();
    });
    document.body.appendChild(btn);
  }
});

function rSA() {
  if ('requestStorageAccess' in document) {
    document.requestStorageAccess().then(
      (res) => {
        // Use storage access
      },
      (err) => {
        // Handle errors
      }
    );
  }
}
```

Subsequent requests from within the frame, navigations or subresources, will automatically have permission for accessing cross-site cookies. `hasStorageAccess()` returns true and cross-site cookies from the same First-Party Set will be sent on those requests without any additional JavaScript calls.


### Top-level sites requesting cookie access on behalf of cross-origin sites

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/jRgDgWl7yb1cEcwpcdMo.png", alt="", width="800", height="408" %}

Top-level sites can use `requestStorageAccessFor()` to request storage access on behalf of specific origins.

`hasStorageAccess()` only checks whether the site calling it has storage access, so a top level site can check the permissions for another origin.

To discover if the user will be prompted or if storage access has already been granted to specified origin, call  `navigator.permissions.query({name: 'top-level-storage-access', requestedOrigin: 'https://target.site'})`.

If the permission is `granted` you can call `document.requestStorageAccessFor('https://target.site')`. It should succeed without a user gesture.

If the permission is `prompt` then you will need to hook the `document.requestStorageAccessFor('https://target.site')` call behind the user gesture, such as a button click.

Example:

```js
navigator.permissions.query({name:'top-level-storage-access',requestedOrigin: 'https://target.site'}).then(res => {
  if (res.state === 'granted') {
    // Permission has already been granted
    // You can request storage access without any user gesture
    rSAFor();
  } else if (res.state === 'prompt') {
    // Requesting storage access requires user gesture
    // For example, clicking a button
    const btn = document.createElement("button");
    btn.textContent = "Grant access";
    btn.addEventListener('click', () => {
      // Request storage access
      rSAFor();
    });
    document.body.appendChild(btn);
  }
});

function rSAFor() {
  if ('requestStorageAccessFor' in document) {
    document.requestStorageAccessFor().then(
      (res) => {
        // Use storage access
      },
      (err) => {
        // Handle errors
      }
    );
  }
}
```

After a successful `requestStorageAccessFor()` call, cross-site requests will include cookies if they include CORS or the crossorigin attribute, so sites may want to wait before triggering a request.

The requests must use the `credentials: 'include'`  option and resources must include `crossorigin="use-credentials"` attribute.

```js
function checkCookie() {
    fetch('https://first-party-sets.glitch.me/getcookies.json', {
        method: 'GET',
        credentials: 'include'
      })
      .then((response) => response.json())
      .then((json) => {
      // Do something
      });
  }
```

## How to test locally

### Prerequisites

To test FPS locally, use Chrome 113 or higher launched from the command line.

To preview upcoming Chrome features before they're released, download the Beta or Canary version of Chrome.

### Example

{% Aside %}
To see a FPS demo in action, visit [https://first-party-sets.glitch.me/](https://first-party-sets.glitch.me/).
{% endAside %}

To enable FPS locally, you need to use Chrome's `--enable-features` option with a comma-separated list of flags that are explained in this section.

Learn more about how to [run Chromium with flags](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/).

```js
--enable-features="FirstPartySets,StorageAccessAPI,StorageAccessAPIForOriginExtension,PageInfoCookiesSubpage,PrivacySandboxFirstPartySetsUI" \
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
https://first-party-sets.glitch.me/
```

- `FirstPartySets` enables FPS in Chrome.`
StorageAccessAPI` enables Storage Access API.
- `StorageAccessAPIForOriginExtension` enables top-level sites to use requestStorageAccessFor() to request storage access on behalf of specific origins.
- `PageInfoCookiesSubpage` enables showing FPS in the PageInfo section accessible from the URL bar.
- `PrivacySandboxFirstPartySetsUI` enables FPS UI "Allow related sites to see your activity in the group" option in Chrome settings, under Privacy and Security → Cookies and other site data (chrome://settings/cookies).

### Declare a set locally

To declare a set locally, create a JSON object that contains URLs that are members of a set and pass it to `--use-first-party-set`.

```text
--use-first-party-set="{\"primary\": \"https://first-party-sets.glitch.me\", \"associatedSites\": [\"https://fps-member-1.glitch.me\"]}" \
https://first-party-sets.glitch.me/
```

### Verify that third-party cookies are blocked

1.  In Chrome settings, go to Privacy and Security → Cookies and other site data or chrome://settings/cookies.
1.  Under General settings ensure that "Block third-party cookies" is enabled.
1.  Check that the sub-option "Allow related sites to see your activity in the group" is also enabled.

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/dPck21yLTAF5cU59DzdZ.png", alt="Screenshot of Chrome settings page", width="800", height="486" %}

### Verify that you have access to cross-site cookies

Call the APIs (rSA or rSAFor) from the sites that are being tested and validate access to the cross-site cookies.

## FPS submission process

To declare the relationship amongst the domains and specify which subset they are part of, follow the steps below:

1.  Identify the relevant domains, this includes the **set primary** and **set members**, that will be part of the FPS. Also identify which **subset type** each set member belongs to.
1.  Ensure the [set formation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements) and [set validation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-validation-requirements) are in place.
1.  Declare the FPS in the correct [JSON format](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-submissions).
1.  Submit the First Party Set by creating a [pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) to the [`first_party_sets.JSON`](https://github.com/GoogleChrome/first-party-sets/blob/main/first_party_sets.JSON) where Chrome will host the canonical FPS list. (A GitHub account is required to create PRs, and you will need to sign a [Contributor's License Agreement (CLA)](https://cla.developers.google.com/about) to contribute to the list.)

Once the PR is created, a series of checks will happen to validate that the requirements from step 2 are in place.

{% Aside %}
Before creating a PR, you can [test your submission locally](https://github.com/GoogleChrome/first-party-sets/blob/main/Getting-Started.md#testing-your-submission-locally) to see if it passes the checks.
{% endAside %}

If successful, the PR will indicate that checks have been passed. Approved PRs will be manually merged in batches to the canonical FPS list once per week (Tuesdays at 12pm Eastern Time).

If any of the checks fails, the submitter will be notified through a PR failure on GitHub. The submitter can fix the errors and update the PR, and keep in mind that:

-   When the PR fails, an error message will provide additional information on why the submission may have failed ([example](https://github.com/GoogleChrome/first-party-sets/pull/26)).
-   All technical checks governing set submissions are conducted on GitHub, and consequently all submission failures resulting from technical checks will be viewable on GitHub.

## Enterprise policies

To meet the needs of enterprise users Chrome has a couple of enterprise policies in place:

-   Systems that might not be able to integrate with First-Party Sets can disable the First-Party Sets feature in all enterprise instances of Chrome with the [`FirstPartySetsEnabled` policy](https://chromeenterprise.google/policies/#FirstPartySetsEnabled).
-   Some enterprise systems have internal only sites (such as an intranet) with registrable domains that differ from the domains in their First-Party Set. If they need to treat these sites as part of their First-Party Sets without exposing them publicly (as the domains may be confidential) they can augment or override their public First-Party Sets list with the [`FirstPartySetsOverrides` policy](https://chromeenterprise.google/policies/#FirstPartySetsOverrides).

## Share feedback

Submitting a set on GitHub and working with the Storage Access API and the `requestStorageAccessFor` API are opportunities to share your experience with the process and any issues you run into.

To join discussions about the First Party Sets:

-   Join the First-Party Sets [public mailing list](https://groups.google.com/u/2/a/chromium.org/g/first-party-sets-discuss).
-   Raise issues and follow the discussion on [First-Party Sets GitHub repo](https://github.com/WICG/first-party-sets).
