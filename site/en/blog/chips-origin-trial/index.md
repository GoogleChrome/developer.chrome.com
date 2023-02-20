---
layout: 'layouts/doc-post.njk'
title: 'Cookies Having Independent Partitioned State (CHIPS) origin trial'
subhead: >
  Starting in Chrome 100, CHIPS origin trial allows opting cookies in to "partitioned" storage, with a separate cookie jar per top-level site.
description: >
  Starting in Chrome 100, CHIPS origin trial allows opting cookies in to "partitioned" storage, with a separate cookie jar per top-level site. Partitioned cookies can be set by a third-party service, but only read within the context of the top-level site where they were initially set.
date: 2022-03-17
updated: 2022-09-23
authors:
  - mihajlija  
tags:
 - origin-trials
 - cookies
 - privacy
---

## Changes

- **September 2022**:  See the [updated information on extending the origin trial through Chrome 106](/blog/chips-origin-trial-extended).
- **June 2022**:  As of Chrome 104, setting cookies with the `Partitioned` attribute no longer requires omitting the `Domain` attribute.
- **May 2022**: As of Chrome 103, sending `Accept-CH: Sec-CH-Partitioned-Cookies` header is no longer required for opting into the origin trial.


## What is CHIPS?

[Cookies Having Independent Partitioned State (CHIPS)](/docs/privacy-sandbox/chips/) is a Privacy Sandbox proposal that allows developers to opt a cookie into "partitioned" storage, with separate cookie jars per top-level site.

A partitioned third-party cookie is tied to the top-level site where it's initially set and cannot be accessed from elsewhere. The aim is to allow cookies to be set by a third-party service, but only read within the context of the top-level site where they were initially set.

## Who is the origin trial for?

This trial is available as a [third-party origin trial](/blog/third-party-origin-trials/), which enables providers of embedded content to try out a new feature across multiple sites.

If a site enrolls in the trial as a first-party, the cookie partitioning functionality will be available to any third-party content providers on that site as well. These third-party providers should also expect to receive extra HTTP headers, indicating their enrollment in the origin trial.

## How long will the trial run?

The trial will be available from Chrome 100 to Chrome 105. Check the [Chrome release schedule](https://chromiumdash.appspot.com/schedule) for the planned release dates.

## How to enroll in the origin trial

### Prerequisites

Chrome stable 103.

### Steps

1.  To register for the origin trial and get a token for your domains, visit the [CHIPS origin trial page](/origintrials/#/view_trial/1239615797433729025).

1.  Include the `Origin-Trial` header with a valid token in any responses with `Set-Cookie` header that include `Partitioned`:

    ```js
    Origin-Trial: <ORIGIN TRIAL TOKEN>
    ```

1.  Add `Partitioned` attribute to cookies in one of two ways:

    -   In `Set-Cookie `header:

        ```text
        Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
        ```

    -   In Javascript:

        ```js
        cookieStore.set({
        name: '__Host-name',
        value: 'value',
        secure: true,
        path: '/',
        sameSite: 'none',
        // Set a partitioned cookie using the attribute below.
        partitioned: true,
        });
        ```

### Example

Sites participating in the origin trial should include the following headers in their response:

```text
Origin-Trial: <ORIGIN TRIAL TOKEN>
Set-Cookie: __Host-name=value; Secure; Path=/; SameSite=None; Partitioned;
```

## Verify that it's working

### Inspect the headers

If you have successfully opted into the origin trial and set a partitioned cookie, subsequent requests from the Chrome client will include the `Sec-CH-Partitioned-Cookies: ?0` request header until the current session is ended.

```text
Sec-CH-Partitioned-Cookies: ?0
Cookie: __Host-name=value
```

If your site receives the cookie without this client hint, opting into the origin trial was not successful and the cookie you are receiving is not partitioned.

Responses which do not include a `Set-Cookie` header with `Partitioned` will not impact a site's origin trial participation status.

If you do not respond with a valid token in the `Origin-Trial` header the partitioned cookies on the machine will be converted to unpartitioned cookies.

For more details, check out [CHIPS documentation on chromium.org](https://www.chromium.org/updates/chips/).

### DevTools

1.  Go to `chrome://flags/#partitioned-cookies` and change the setting to "Enabled".
1.  Restart Chromium by clicking the "Relaunch" button in the bottom-right corner, or by navigating to chrome://restart.
1.  Go to `chrome://settings/cookies` and make sure that the radio button is set to "Allow all cookies" or "Block third-party cookies in Incognito".
1.  Load the site with the embed.
1.  Open Open DevTools to **Application** > **Cookies** > yourSite and look for the **Partition Key** column in DevTools.

{% Aside %}
Not every client will have the origin trial enabled.
{% endAside %}

## Additional details

### Cookies requirements

-   Partitioned cookies must be set with the `Secure` and `Path=/`.
-   `SameParty` attribute cannot be used along with `Partitioned.`

Chrome will enforce these rules for cookies set with the `Partitioned` attribute whether cookie partitioning is enabled or disabled. Cookies that are set incorrectly will be rejected.

If cookie partitioning is disabled, but the cookie is set with the correct attributes, Chrome will ignore the  `Partitioned` attribute and the resulting cookie will still be sent in requests to its host on different top-level sites than where it was set.

Partitioned cookies should include `SameSite=None` attribute as well, to allow cookies to be sent in a third-party context in browsers that do not support cookie partitioning.

### Javascript and service workers

Frames that opt into the origin trial will have access to reading and writing partitioned cookies via JavaScript APIs such as `document.cookie` and the CookieStore API. Frames that are not in the trial's scripts will not be able to read nor write partitioned cookies.\
The CHIPS origin trial is currently not supported in service workers.

## Engage and share feedback

-   Raise issues and follow the discussion on [GitHub](https://github.com/WICG/CHIPS/issues).
-   Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
-   Explore different avenues for giving [feedback on Privacy Sandbox proposals](/docs/privacy-sandbox/feedback/).
