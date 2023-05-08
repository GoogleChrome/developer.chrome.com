---
layout: 'layouts/blog-post.njk'
title: Payment Handler API will require CSP `connect-src`
description: >
    The Payment Handler API users will have to add the payment endpoint to the `connect-src` directive if you are using CSP.
authors:
  - agektmr
  - rouslan
hero: image/YLflGBAPWecgtKJLqCJHSzHqe2J2/BDMyj4VRZDXXLXQiDq1C.jpg
alt: 'Using a ATM - Hand pressing number'
date: 2022-09-29
---

[The Payment Handler API](https://web.dev/web-based-payment-apps-overview/)
allows payment providers to make their custom payment experience available for
merchants, along with [the Payment Request
API](https://web.dev/how-payment-request-api-works/).

The information on this page only applies to websites that use both [CSP
(Content-Security-Policy)](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/)
and the Payment Request API. If you use neither or only one of the two, then you
can skip these instructions. 

To check if your payment provider is using the Payment Handler API, contact them
and follow their instructions.

If you are using the Payment Handler API and CSP (Content-Security-Policy) for
better protection, you need to make sure the domains of HTTP requests sent from
the browser are added to [the `connect-src` directive of the CSP
header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src).

For example, if your JavaScript code invokes `new
PaymentRequest([{supportedOrigins: ‘https://example.com/pay’}], details)`, then
your CSP `connect-src` must include `https://example.com` or
`https://example.com/pay`:

```http
Content-Security-Policy: connect-src https://example.com/pay  
```

If `https://example.com/pay` is a cross-origin redirect, then the destination
origin should be included in the CSP too. For example, if
`https://example.com/pay` redirects to `https://pay.example.com`, then both
origins must be included in the CSP:

```http
Content-Security-Policy: connect-src https://example.com/pay https://pay.example.com
```

{% Aside %}

 A URL payment method identifier is allowed up to 3 same-site redirects. If any
 redirects occur, then all of the URLs must be in the CSP.

{% endAside %}

## Try it out locally

To enable the feature locally before it is shipped:

1. Go to `chrome://flags/#web-payment-api-csp`on Chrome.
2. Change "CSP policy for Web Payment API" from "Default" to "Enabled".
3. Restart Chrome.

## Check the request URLs

To check the URLs of the requests sent from the Payment Handler API:

1. Enable  `chrome://flags/#web-payment-api-csp`.
2. Go to your checkout page and open Chrome’s Developer Tools.
3. Look for error messages like the following:
    ```text
    RangeError: Failed to construct 'PaymentRequest': https://example.com/pay payment method identifier violates Content Security Policy.
    ```
4. Add the specified method identifier to your CSP.

Photo by <a href="https://unsplash.com/@eduschadesoares?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Eduardo Soares</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
