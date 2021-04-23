---
layout: 'layouts/blog-post.njk'
title: SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 91
authors:
  - jakearchibald
description: >
  SharedArrayBuffer will arrive in Android Chrome 88. It will only be available
  to pages that are cross-origin isolated. Starting in Desktop Chrome 91 it will
  also only be available to cross-origin isolated pages. You can register for an
  origin trial to retain the current behavior until Desktop Chrome 96.
origin_trial:
  url: /origintrials/#/view_trial/303992974847508481
date: 2021-01-18
updated: 2021-04-22
hero: image/CZmpGM8Eo1dFe0KNhEO9SGO8Ok23/tWnZEOnNmBeFcZxuR9Dx.jpg
alt: A collection of padlocks.
---

It's fair to say [`SharedArrayBuffer`][mdn] has had a bit of a rough landing on the
web, but things are settling down. Here's what you need to know:

## In brief

- `SharedArrayBuffer` is currently supported in Firefox 79+, and will arrive in Android
  Chrome 88. However, it's only available to pages that are [cross-origin
  isolated](#cross-origin-isolation).
- `SharedArrayBuffer` is currently available in Desktop Chrome, but from Chrome
  91 it will be limited to cross-origin isolated pages. If you don't think you
  can make this change in time, you can [register for an origin trial](#origin-trial) to retain
  the current behavior until at least Chrome 96.
- If you intend to enable cross-origin isolation to continue using
  `SharedArrayBuffer` evaluate the impact this will have on other cross-origin
  elements on your website, such as ad placements. Check if `SharedArrayBuffer`
  is used by any of your third-party resources to understand impact and
  guidance. 


## Cross-origin isolation overview {: #cross-origin-isolation }

You can make a page _cross-origin isolated_ by serving the page with these
headers:

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

Once you do this, your page will not be able to load cross-origin content unless
the resource explicitly allows it via a [`Cross-Origin-Resource-Policy`][corp]
header or [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers
(`Access-Control-Allow-*` and so forth).

There's also a [reporting
API](https://web.dev/coop-coep/#observe-issues-using-the-reporting-api), so you
can gather data on requests that failed as a result of
`Cross-Origin-Embedder-Policy` and `Cross-Origin-Opener-Policy`.

If you don't think you can make these changes in time for Chrome 91, you can
[register for an origin trial](#origin-trial) to retain current Desktop Chrome
behavior until at least Chrome 96.

{% Aside %}
**Update, April 2021**

We've been exploring ways to deploy `Cross-Origin-Resource-Policy` at scale, as
cross-origin isolation requires all subresources to explicitly opt-in. And we
have come up with the idea of going in the opposite direction: a new [COEP
"credentialless" mode](https://github.com/mikewest/credentiallessness/) that
allows loading resources without the CORP header by stripping all their
credentials. We are figuring out the details of how it should work, but we hope
this will lighten your burden of making sure the subresources are sending the
`Cross-Origin-Resource-Policy` header.

Also, it's known that the `Cross-Origin-Opener-Policy: same-origin` header will
break integrations that require cross-origin window interactions such as OAuth
and payments. To mitigate this problem, we are [exploring relaxing the
condition](https://github.com/whatwg/html/issues/6364) to enable cross-origin
isolation to `Cross-Origin-Opener-Policy: same-origin-allow-popups`. This way
the communication with the window opened by itself will be possible.

If you want to enable cross-origin isolation to use `SharedArrayBuffer` but are
blocked by these challenges, we recommend [registering for an origin
trial](#origin-trial) and waiting until the new modes are available. We are not
planning to terminate the origin trial until these new modes are available. {%
endAside %}

Check out the [Further reading](#resources) section at the bottom of this page
for more guidance and information on cross-origin isolation.

## How did we get here? {: #history }

`SharedArrayBuffer` arrived in Chrome 60 (that's July 2017, for those of you who
think of time in dates rather than Chrome versions), and everything was great.
For 6 months.

In January 2018 a vulnerability was revealed in some popular CPUs. See the
[announcement](https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html)
for full details, but it essentially meant that code could use high-resolution
timers to read memory that it shouldn't have access to.

This was a problem for us browser vendors, as we want to allow sites to execute
code in the form of JavaScript and WASM, but strictly control the memory this
code can access. If you arrive on my website, I shouldn't be able to read
anything from the internet banking site you also have open. In fact, I shouldn't
even know you have your internet banking site open. These are fundamentals of
web security.

To mitigate this, we reduced the resolution of our high-resolution timers such
as `performance.now()`. However, you can _create_ a high-resolution timer using
`SharedArrayBuffer` by modifying memory in a tight loop in a worker, and reading
it back in another thread. This couldn't be effectively mitigated without
heavily impacting well-intentioned code, so `SharedArrayBuffer` was disabled
altogether.

A general mitigation is to ensure a webpage's system process doesn't contain
sensitive data from elsewhere. Chrome had invested in a multi-process
architecture from the start ([remember the
comic?](https://www.google.com/googlebooks/chrome/big_00.html)), but there were
still cases where data from multiple sites could end up in the same process:

```html
<iframe src="https://your-bank.example/balance.json"></iframe>
<script src="https://your-bank.example/balance.json"></script>
<link rel="stylesheet" href="https://your-bank.example/balance.json" />
<img src="https://your-bank.example/balance.json" />
<video src="https://your-bank.example/balance.json"></video>
<!-- …and more… -->
```

These APIs have a 'legacy' behavior that allows content from other origins to be
used without opt-in from the other origin. These requests are made with the
cookies of the other origin, so it's a full 'logged in' request. Nowadays, new
APIs require the other origin to opt-in using
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

We worked around these legacy APIs by preventing content from entering the
webpage's process if it looked 'incorrect', and called it [cross-origin read
blocking](https://developers.google.com/web/updates/2018/07/site-isolation#corb).
So, in the above cases, we wouldn't allow JSON to enter the process, as it isn't
a valid format for any of those APIs. That is, except iframes. For iframes we
put the content in a different process.

With these mitigations in place, we reintroduced `SharedArrayBuffer` in Chrome
68 (July 2018), but only on desktop. The extra process requirements meant we
couldn't do the same on mobile devices. It was also noted that Chrome's solution
was incomplete, as we were only blocking 'incorrect' data formats, whereas it's
possible (although unusual) that valid CSS/JS/images at guessable URLs can
contain private data.

Web standards folks got together to come up with a more complete cross-browser
solution. The solution was to give pages a way to say "I hereby relinquish my
ability to bring other-origin content into this process without their opt-in".
This declaration is done via [COOP and COEP headers](https://web.dev/coop-coep/)
served with the page. The browser enforces that, and in exchange the page gains
access to `SharedArrayBuffer` and other APIs with similar powers. Other origins
can opt-in to content embedding via
[`Cross-Origin-Resource-Policy`](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)>)
or [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Firefox was the first to ship `SharedArrayBuffer` with this restriction, in
version 79 (July 2020).

Then, in January 2021, I wrote this article, and you read it. Hello.

And that's where we are now. Chrome 88 brings `SharedArrayBuffer` back to
Android for pages that are cross-origin isolated, and Chrome 91 brings the same
requirements to desktop, both for consistency, and to achieve total cross-origin
isolation.

## Delaying the Desktop Chrome change {: #origin-trial }

This is a temporary exception in the form of an 'origin trial' that gives folks
more time to implement cross-origin isolated pages. It enables
`SharedArrayBuffer` without requiring the page to be cross-origin isolated. The
exception expires in Chrome 96, and the exception only applies to Desktop
Chrome.

1. [Request a token]({{origin_trial.url}}) for your origin.
2. Add the token to your pages using an `Origin-Trial` HTTP header. The
   resulting response header should look something like: `Origin-Trial:
   TOKEN_GOES_HERE`

{% Aside 'caution' %}
You can only enable the origin trial using an `Origin-Trial` HTTP header.
Do not use a meta tag.
{% endAside %}

To verify that it's working properly, install [Chrome
91 beta](https://www.google.com/chrome/beta/) for testing.

## Further reading {: #resources }

- [A guide to enable cross-origin
  isolation](https://web.dev/cross-origin-isolation-guide)
- [How to cross-origin isolate your pages](https://web.dev/coop-coep/)
- [Why cross-origin isolation is needed](https://web.dev/why-coop-coep/)

Banner photo by <a
href="https://unsplash.com/@yeeeeeeha?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Daniel
Gregoire</a> on <a
href="https://unsplash.com/s/photos/padlocks?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
[compat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#browser_compatibility
[corp]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)
