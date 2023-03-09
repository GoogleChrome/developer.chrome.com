---
layout: 'layouts/blog-post.njk'
title: "First-Party Sets: integration guide"
date: 2023-01-12
thumbnail: 'image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/JL7L7S2qKI53pTWACfcv.jpg'
alt: A diagram with one First-Party Set that contains domains example.com,
  example.rs, and example.co.uk. The other contains brandx.site,
  fly-brandx.site, and drive-brandx.site.
tags: 
  - privacy
authors:
  - jney
  - sarino
---


First-Party Sets (FPS) is a web platform mechanism which helps browsers to
understand the relationships amongst a collection of domains. This allows browsers
to make key decisions (such as whether to facilitate access to cross-site
cookies) to enable certain site functions and to present this information
to users. FPS allows sites to share data across domains, with specific
controls.

## Familiarize yourself with the API

Chrome has been iterating on FPS based on feedback from the ecosystem. The
original proposal required that sites share a common brand, a common privacy
policy, and common ownership. After listening to feedback, some of which is
[summarized on GitHub repo](https://github.com/WICG/first-party-sets/issues/93#issuecomment-1298786481),
Chrome has updated the proposal to orient around "primaries" and "subsets" of
domains, so FPS can better focus on use cases. The subsets approach creates
different rules for different domains to improve flexibility and transparency.

There are two key components to the proposal:

-   **Policy**. The framework governing how relationships amongst domains
    may be declared.
-   **Technology**. The method by which the browser may manage cross-domain
    cookie access based on the declared relationship between domains

At a high level, a First-Party Set is a collection of domains, for which there
is a single "set primary" and potentially multiple "set members". Only site
authors will be able to submit their own set, and they will be required to
declare the relationship between each "set member" to its "set primary." Set
members could include a range of different domain types and must be part of a
[subset based on a use case](https://github.com/WICG/first-party-sets#defining-a-set-through-use-case-based-subsets).

To facilitate the browser's ability to handle each subset differently, we are
leveraging the [Storage Access API
(SAA)](https://privacycg.github.io/storage-access/) to enable cookie access
within a FPS.

## Goals

As Chrome deprecates third-party cookies, we want to mitigate breakage of
non-tracking flows that affect the user experience on the web. For example, we
know that many sites rely on multiple domains to serve a single user experience.
Organizations may want to maintain different top-level domains for multiple use
cases like country specific domains or service domains for hosting images or
video. Chrome's goals are to maintain key uses on the web while improving
privacy for users.

FPS can achieve this by meeting these two goals:

-   Allow for browsers to understand the relationships between domains of
    multi-domain sites so that they can make decisions on behalf of the user
    (such as facilitating requests for access to cross-site cookies), and/or
    effectively present that information to the user.
-   Uphold existing web security principles.

## Prerequisites and setup

Chrome is only planning to test FPS with feature flags at the moment. This
means all testing will be done locally using these flags. To test FPS locally,
use Chrome 108 or higher launched from the command line.

Use the steps outlined in the
[testing instructions](/blog/first-party-sets-testing-instructions/)
to set up.

## Applying use cases

Not every domain goes in your First-Party Set. Part of testing is figuring out
where to draw your privacy boundaries and how you want to fit your domains into
different subsets.

The goal of testing with FPS is to evaluate whether your site's use cases will
still be maintained using the Storage Access API and the logic applied by FPS.

The [use cases](https://github.com/WICG/first-party-sets#use-cases) that FPS is
meant to evaluate are:

-   **Country customization**. Leveraging localized sites while relying on
    shared infrastructure (example.co.uk may rely on a service hosted by
    example.ca).
-   **Service domain integration**. Leveraging service domains that users
    never directly interact with, but provide services across the same
    organization's sites (example-cdn.com).
-   **User content separation**. Accessing data on different domains that
    separate user-uploaded content from other site content for security
    reasons, while allowing the sandboxed domain access to authentication (and
    other) cookies.
-   **Embedded authenticated content**. Supporting embedded content from
    across affiliated properties (videos, documents, or resources restricted to
    the user signed in on the top-level site).
-   **Sign-in**. Supporting sign-in across affiliated properties. As Chrome
    has [noted](https://github.com/WICG/first-party-sets#use-cases), however,
    the [FedCM API](https://github.com/fedidcg/FedCM) may also be appropriate
    for some use cases.
-   **Analytics**. Deploying analytics and measurement of user journeys across
    affiliated properties to improve quality of services.

## Testing methodology

### Scope

The FPS proposal has two key components:

- The FPS submission process via GitHub.
- Enabling cookie access within a declared FPS via the APIs.

Early testing goals and what we’re looking for:

- "Functional testing" of both components, the submission process and enabling cookie access.
- Validating that the process and the technology work and that cookie access can be enabled within the declared FPS.
- Identifying potential bugs.

The testing methodology for both of these components is outlined below.

### Key aspects

-  Only developer feature-flag testing will be available from Chrome 108.
   This means there is no origin trial testing at  the moment.
-  For local testing, you can only declare sets on the command line and
   pass them directly to the browser. You're not required to submit the
   set to the GitHub repo for local testing with feature flags.

{% Aside 'caution' %}
Before First-Party Sets launches in Chrome, all the sets created on
GitHub during the testing phase will be deleted, which means that entities
will have to submit them again.
{% endAside %}

## Testing the FPS submission process

To declare the relationship amongst the domains and specify
which subset they are part of, follow the steps below:

1.  Identify the relevant domains, this includes the **set primary** and
    **set members**, that will be part of the FPS. Also identify which **subset
    type** each set member belongs to.
1.  Ensure the
    [set formation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-formation-requirements)
    and
    [set validation requirements](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-validation-requirements)
    are in place.
1.  Declare the FPS in the correct
    [JSON format](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md#set-submissions).
1.  Submit the First Party Set (JSON format from previous step) by creating
    a
    [pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
    to the
    [`first_party_sets.JSON`](https://github.com/GoogleChrome/first-party-sets/blob/main/first_party_sets.JSON)
    where Chrome will host the **canonical FPS list**.
    -   A GitHub account is required to create PRs.
    -   The canonical FPS list is a public JSON file that serves as the
        source-of-truth of approved sets. It will be consumed by Chrome to
        apply the behavior.

Once the PR is created, a series of checks will happen to validate that the
requirements from step 2 are in place.

If successful, the submitter will be notified. At this time, approved PRs will
be manually merged in batches to the canonical FPS list once per week (Tuesdays
at 12pm Eastern Time).

If any of the checks fails, the submitter will be notified through a PR failure
on GitHub. The submitter can fix the errors and create a new PR, and keep in
mind that:

-   The PR failure notification may also provide additional information on
    why the submission may have failed.
-   All technical checks governing set submissions are conducted on GitHub,
    and consequently all submission failures resulting from technical checks
    will be viewable on GitHub.

## Testing the APIs to enable cookie access within a declared FPS

This is the process to verify that cross-site cookie access is enabled in the
declared FPS.

It uses the Storage Access API (SAA) and a new API
tentatively named `requestStorageAccessForOrigin` (rSAFor). These APIs provide
sites with an active method of requesting cross-site access
for their cookies within a First-Party Set.

To run the tests locally follow these steps:

1.  Ensure you have Chrome 108 or higher (you can use Chrome
    [Beta](https://www.google.com/chrome/beta/) or
    [Canary](https://www.google.com/chrome/canary/)).
1.  Launch Chrome from the
    [command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags/)
    including the feature-flags (as shown in the documentation).
1.  Verify that third-party cookies are **disabled** in Chrome settings.
1.  Call the APIs (SAA or rSAFor) from the sites that are being tested and
    validate access to the cross-site cookies.

For more details, check out the step-by-step guide from Chrome's
[developer documentation](/blog/first-party-sets-testing-instructions/).

### Demo

If you're following along the steps in the developer documentation, you can try
the [demo](https://first-party-sets.glitch.me/) to see it in action and check
the [demo source code](https://glitch.com/edit/#!/first-party-sets).

The demo First-Party Set is declared as following:

```js
{
  "primary": "https://first-party-sets.glitch.me",
  "associatedSites": ["https://fps-member-1.glitch.me"]
}
```

For local testing, this is declared via the command line (see step 2 above).

On the demo sites, some validation is done to check if the browser has support
for the APIs:


```js
/* 
 * UA-CH to validate supported browser version 
 */
if (navigator.userAgentData.brands.some(b => { return b.brand === 'Google Chrome' && parseInt(b.version, 10) >= 108 })) {
// Supported
} else {
	// Not supported
}

/* 
 * Validate SAA and rSAFor are available 
 */
if ('requestStorageAccess' in document) {
	// SAA available
} else {
	// SAA not available
}

if ('requestStorageAccessForOrigin' in document) {
	// rSAFor available
} else {
	// rSAFor not available
}
```

Check out the demo
[source code on Glitch](https://glitch.com/edit/#!/first-party-sets?path=public%2Findex.html%3A99%3A28).

Once all the checks pass, you can click the button to *create a cookie on the
primary site*. Then you'll be able to *access this cookie from the associated
site* using both APIs (SAA and rSAFor).

#### Accessing the cookie with SAA

The associated site `fps-member-1.glitch.me` has an `<iframe>` embedding the
primary site `first-party-sets.glitch.me`.

*Inside the `<iframe>`* the following code runs to check if access to the
cookie is granted.

```js
if ('requestStorageAccess' in document) {
document.requestStorageAccess().then(
    		(res) => { console.log('access granted', res) },
    		(err) => { console.log('access denied', err) }
  	);
}
```

Note that the very first time this site is visited, the access should be
**denied**.

Inside the `<iframe>` there is a `<button>` that when clicked, runs the
following code:

```js
if ('requestStorageAccess' in document) {
  	document.requestStorageAccess();
  	location.reload();
} else {
window.alert('document.requestStorageAccess not enabled.');
}
```

The page is reloaded and the cookies should be accessible now.

#### Accessing the cookie with rSAFor

The associated site `fps-member-1.glitch.me` has an `<iframe>` embedding the
primary site `first-party-sets.glitch.me`.

There is a `<button>` on the site that when clicked, runs the following code:

```js
if ('requestStorageAccessForOrigin' in document) {
document.requestStorageAccessForOrigin('https://first-party-sets.glitch.me');
  	location.reload();
} else {
  	window.alert('document.requestStorageAccessForOrigin not enabled.');
}
```

Note the *key difference* in this case we call rSAFor **outside the `<iframe>`**
which has the advantage of allowing top-level sites to use cross-site images or
script tags requiring cookies.

### API roadmap

The team is implementing improvements to the API in light of
[security considerations](https://docs.google.com/document/d/1AsrETl-7XvnZNbG81Zy9BcZfKbqACQYBSrjM3VsIpjY/edit#heading=h.vb3ujl8dnk4q).

Some key changes that are in progress are the following:

-   rSA grants will apply **per-frame** (in the current code, grants are
    per-page)
    -   In response to this change, rSA and rSAForOrigin grants will be
        treated as **separate permissions**.
-   For rSAForOrigin, subresource requests will require **CORS protection**
    to be given their `SameSite=None` cookies, ensuring explicit opt-in.

These changes may require additional integration work for web developers. You
can find the full list of planned improvements
[in a Chromium bug](https://bugs.chromium.org/u/3722074794/hotlists/First-Party-Sets-GA).
