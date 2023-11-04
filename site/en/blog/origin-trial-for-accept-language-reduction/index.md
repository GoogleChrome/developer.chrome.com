---
layout: 'layouts/blog-post.njk'
title: Participate in origin trial for Accept-Language Reduction
description: >
  Accept-Language Reduction is an effort to reduce passive fingerprinting surfaces in the Chrome browser. 
date: 2022-12-01
tags: 
  - privacy
authors:
  - victortan
---

Accept-Language Reduction is an effort to reduce passive fingerprinting
surfaces by reducing the user's language preferences in the
[`Accept-Language`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language)
header and only sending the user's most preferred language (just one).

Beginning with the [Chrome 109](https://chromiumdash.appspot.com/schedule)
Beta, we'll open up
[the origin trial](/origintrials/#/view_trial/-7166352907053301759)
for Accept-Language Reduction enabling sites to opt into receiving the reduced
`Accept-Language` header. This will allow sites to discover and fix problems
before the reduced `Accept-Language` becomes the default behavior in Chrome in a
future release. To test the feature before it launches to stable population, be
sure to opt in and test before the release date for Chrome 109 ([currently
scheduled](https://chromiumdash.appspot.com/schedule) for Jan 10th, 2023).

Check out the examples of `Accept-Language` header before and after the reduction below.

{% Compare 'worse', 'current' %}

```text
Accept-Language: en-GB,en;q=0.9,de;q=0.8,fr;q=0.7
```

{% endCompare %}

{% Compare 'better', 'proposed' %}

```text
Accept-Language: en-GB
```

{% endCompare %}


Below is an overview of the origin trial and what to expect. You can share your
feedback on this change or any issues you encounter during the origin trial in
the [Accept-Language Reduction GitHub
repository](https://github.com/Tanych/accept-language).

## What is Accept-Language?

The
[Accept-Language](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Language)
string is shared on every HTTP request and exposed in JavaScript to all
resources loaded by the browser. Currently, it contains all of the user's
preferred languages.

## Why is Accept-Language being reduced?

Accept-Language Reduction is an effort to reduce passive fingerprinting
surfaces in Chrome.

Currently, the `Accept-Language` header is shared by default on every HTTP
request and exposed in JavaScript to all resources loaded by the browser. It
contains all language preferences of the user. Rather than the browser sending
the full list of languages that the user has configured in case sites wish to
provide multilingual content, we are introducing a new way for sites to indicate
multilingual content and the browser will take responsibility to do the language
negotiation and display the preferred language.

Another reason is that many sites may not be using the `Accept-Language` headers
for language negotiation at all (for example, [one
study](https://wonderproxy.com/blog/accept-language/) indicates only 7.2% of the
top 10,000 sites use `Accept-Language`). Chrome Incognito mode already reduced the
`Accept-Language` to one.

## What does this mean for web developers?

Sites that rely on `Accept-Language` to do language negotiation should
prepare to receive reduced `Accept-Language` and consider participating in the
origin trial. The reduced `Accept-Language` values will appear in:

-   The `Accept-Language` HTTP request header.
-   The `navigator.languages` JavaScript getter.

The browser will take responsibility for language negotiation to select the
user's preferred language to send to sites. To make this happen, sites need to
add two headers
[`Variants`](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-variants-06#section-2)
(a new header indicates sites supporting languages) `Accept-Language` and
[`Content-Language`](https://datatracker.ietf.org/doc/html/rfc3282) in the
response header (see detailed example below).

The reduced `Accept-Language` plans currently don't include iOS and WebView, and
those platforms will continue to get users' full list of `Accept-Language`.
Support for these platforms is planned for a later date.

## Origin trial for Accept-Language Reduction

An origin trial requires the participating site to provide a token in its
response which tells the browser to enable the specified trial. However, this
means that on the browser's initial request to the site it has no way of knowing
if the site is participating in an origin trial. This means that _the initial
request in a session will not send the reduced `Accept-Language header`_.
Requests for subresources in that page, both same-origin and cross-origin, will
receive the reduced `Accept-Language` header. Subsequent same-origin navigations
will also receive the reduced `Accept-Language` header. Cross-origin navigations
will revert to sending the full header, while the cross-origin requests within the 
page (such as third-party iframe requests) will still send the reduced `Accept-Language`
header if the top-level frame request has a valid origin trial token.

This is similar to the User-Agent reduction origin trial and if you would like
to learn more about the internal Chromium implementation, you can read more in
[Implementing Reduce Accept-Language HTTP header](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/).

## Participate in the Accept-Language Reduction origin trial

You can read further guidance in
[Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/),
but the essential steps are shown below.

### Step 1
To register for the origin trial and get a token for your domains,
visit the
[Trial for Accept-Language Reduction](/origintrials/#/view_trial/-7166352907053301759)
page.

### Step 2

Update your HTTP response headers:

1.  Add `Origin-Trial: <ORIGIN TRIAL TOKEN>` to your HTTP response
        header, where <`ORIGIN TRIAL TOKEN`> contains the token you got when
        registering for the origin trial.
1.  Add `Content-Language` to your HTTP response header to indicate
        the language(s) intended for the audience.
1.  Add `Variants` to your HTTP response header to indicate sites
        supported languages.
1.  [Optional] Add `Vary: Accept-Language` to your HTTP response
        to create a cache key for content negotiation.
1.  Setting those headers will only trigger browser language
        negotiation (a potential restart for the initial request) for the given
        origin. To make sites display the correct language representation for
        the users, you also need to update sites sending the content based on
        the user's Accept-Language header (see example below).
        
{% Aside %}
If the response headers contain a valid `Origin-Trial`
token, `Content-Language` and valid `Variants` header, then all
subresource requests (for example, for images or stylesheets) and
subnavigations (for example, iframes) will send the reduced
Accept-Language string, even if the origins of those requests are not
enrolled in the origin trial.
{% endAside %}

### Step 3

Load your website in Chrome M109 Beta (or later) and start receiving the
reduced Accept-Language string.

Submit any issues or feedback to the Accept-Language Reduction [GitHub
repository](https://github.com/Tanych/accept-language).

## Demo

For a demonstration of a multilingual site which opted-in the origin trial
(along with the source code) see
[https://reduce-accept-language.glitch.me/](https://reduce-accept-language.glitch.me/).

For a demonstration of opt-in and opt-out the origin trial (along with the
source code) see
[https://reduce-accept-language-ot.glitch.me/](https://reduce-accept-language-ot.glitch.me/).

For example, `example.com` supports `ja` (Japanese) and `en` (English). A
request may be:

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: en
```

The site knows the user prefers content in English based on the user's
accept-language. The response headers may include:

```text
HTTP/1.1 200 OK
Content-Language: en
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

If user has a preference for Japanese language content, the request would be:

```text
GET / HTTP/1.1
Host: example.com
Accept-Language: ja
```

In this case, the site responds with headers for Japanese content:

```text
HTTP/1.1 200 OK
Content-Language: ja
Variants: Accept-Language=(en ja)
Origin-Token: a-valid-token
```

On the server-side, the site may be looking for specific language support but
falling back to a default if no support is detected:

```js
if(accept_language == 'ja') {
    res.response('ja_page')
}
else {
   res.response('en_page')
}
```

In the example above, `example.com` responds either `en` or `ja` based on the
`Accept-Language` value, defaulting to `en` if none match.  In this case, the
site can also provide redirects to corresponding language pages either `/en` or
`/ja` based on the `Accept-Language` value.  See detailed examples related to
redirects on
[the implementation doc](https://docs.google.com/document/d/1RkPDf7DNtcOj4KXeW8wNCuYfto-drnGYST_NvZe3GoY/edit#bookmark=id.eml73ve0kywe).

## Third-party origin trial support

We currently don't support registering your domains as a
[third-party for the trial](/docs/web-platform/third-party-origin-trials/).
If you operate a service that is implemented as a subresource across origins
(like ad serving or analytics), you will only receive the reduced
`Accept-Language` header if the top-level site is participating in the origin
trial.

## Validate that the origin trial is working

The guide to
[troubleshooting Chrome's origin trials](/docs/web-platform/origin-trial-troubleshooting/)
provides a full checklist for ensuring your token is correctly configured.

You configure multiple languages and their priority from
`chrome://settings/languages` or Settings → Languages. Consider selecting a
language your site does **not** support and moving that to the top of the list
to ensure that the additional renegotiation is triggered.

The initial response's headers containing the origin trial token should look
like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/9vMsKcqCF2wEQ7K4dxKT.png", alt="A screenshot of the request header with the reduce Accept-Language.", width="800", height="228" %}

Subsequent request headers containing the reduced Accept-Language look like:

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/kdfphse1F4gscnY74UJi.png", alt="The initial response's headers containing the origin trial token.", width="800", height="257" %}

## Stop participating in the origin trial

At any given point in time during the trial, you can stop participating and
receive the full list of user's Accept-Language. To stop participating:

1.  Remove the `Origin-Trial` header for the Accept-Language Reduction
    trial from your HTTP response.
1.  [Optional] Remove `Variants` header which is added to opt-in the
    origin trial in your HTTP response if you are not interested in sending
    this header. You can also use `Variants` with an empty value to accomplish
    this.
1.  [Optional] Remove `Content-Language` header which is added to
    opt-in the origin trial in your HTTP response if you are not interested in
    sending this header.

## Origin trial duration

The Accept-Language Reduction origin trial will run for at least six months,
which corresponds to about six Chrome milestones. The origin trial will appear
in M109 and end with M114 (it means the last Chrome release that has the trial
available). At that point, Chrome will evaluate the feedback from the origin
trial before proceeding with sending the reduced Accept-Language string in a
phased manner: first reduce the Accept-Language HTTP header and then reduce the
JS interface. If a site needs more time to test they can opt into a subsequent
deprecation origin trial, which would allow them to access the full
Accept-Language string for at least another six months. We will publish more
details on the deprecation trial when it's ready.

## Share feedback

Submit any issues or feedback to the Accept-Language Reduction [GitHub
repository](https://github.com/Tanych/accept-language).