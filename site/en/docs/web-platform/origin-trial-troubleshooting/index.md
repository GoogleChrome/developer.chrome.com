---
layout: 'layouts/doc-post.njk'
title: Troubleshoot Chrome origin trials
subhead: >
  Address common problems with trial tokens in meta tags, headers, and
  scripts.
description: >
  Address common problems with trial tokens in meta tags, headers, and
  scripts. You'll also learn about debugging support in Chrome DevTools.
authors:
  - samdutton
date: 2021-08-11
updated: 2023-01-05
hero: image/80mq7dk16vVEg8BBhsVe42n6zn82/b52LlVcFfbFtxgfT0BoF.jpg
alt: Test tubes in a metal rack, one containing clear green liquid.
tags:
  - origin-trials
---

{% Aside %}
This guide assumes a working knowledge of origin trials in Chrome.

* [Getting started with Chrome's origin trials](/docs/web-platform/origin-trials/) explains the basics.
* [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#faq) 
provides a detailed FAQ. 

If you encounter a bug with origin trials in Chrome, please 
[submit a new issue](https://github.com/GoogleChrome/OriginTrials/issues/new) on the Chrome origin 
trials GitHub repo.
{% endAside %}

## Checklist

To troubleshoot an origin trial, work through each of the issues below using the supplied links.

<div class="w-display--inline-flex" style="line-height: 2em;">
  <input class="w-checkbox" type="checkbox" id="check-chrome">
  <label for="check-chrome" class="w-ml--l"><a href="#chrome">You're testing in Chrome, not Chromium 
    or another browser</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-chrome-versions">
  <label for="check-chrome-versions" class="w-ml--l"><a href="#version">The origin trial is enabled 
    for the Chrome versions accessing your site</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-chrome-settings">
  <label for="check-chrome-settings" class="w-ml--l"><a href="#settings">The origin trial is not 
  disabled by Chrome settings</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-syntax">
  <label for="check-syntax" class="w-ml--l"><a href="#syntax">Keywords and syntax are correct</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-whole">
  <label for="check-whole" class="w-ml--l"><a href="#whole">Token isn't missing characters at the start 
    or end</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-origin-first">
  <label for="check-origin-first" class="w-ml--l"><a href="#origin-first">First-party token 
    origin matches page origin</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-first">
  <label for="check-token-first" class="w-ml--l"><a href="#token-first">First-party token is served 
    from the origin that uses it</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-origin-third">
  <label for="check-origin-third" class="w-ml--l"><a href="#origin-third">Third-party token origin 
    matches script origin</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-third">
  <label for="check-token-third" class="w-ml--l"><a href="#token-third">Third-party script uses a 
    third-party token</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-third-script">
  <label for="check-token-third-script" class="w-ml--l"><a href="#token-third-script">Third-party 
token is provided via an external script, not a meta tag, HTTP header or inline script</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-method">
  <label for="check-token-method" class="w-ml--l"><a href="#token-method">Origin trial feature access 
  is supported for the method used to provide a trial token</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-subdomain">
  <label for="check-subdomain" class="w-ml--l"><a href="#subdomain">Subdomain matching is enabled for a 
    token used on a subdomain</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-still-valid">
  <label for="check-token-still-valid" class="w-ml--l"><a href="#token-still-valid">The token is 
  still valid</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-trial-ended">
  <label for="check-trial-ended" class="w-ml--l"><a href="#trial-ended">The origin trial hasn't 
    ended</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-user">
  <label for="check-user" class="w-ml--l"><a href="#user">The origin trial is available for the current user</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-usage-restrictions">
  <label for="check-usage-restrictions" class="w-ml--l"><a href="#usage-restrictions">Origin trial 
  usage restrictions haven't been exceeded</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-iframe">
  <label for="check-iframe" class="w-ml--l"><a href="#iframe">Iframes provide their own 
    tokens</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-permissions-policies">
  <label for="check-permissions-policies" class="w-ml--l"><a href="#permissions-policies">Permissions 
    policies are correctly configured</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-workers">
  <label for="check-workers" class="w-ml--l"><a href="#workers">Worker access is enabled</a></label>
  <br>
  <input class="w-checkbox" type="checkbox" id="check-token-before-access">
  <label for="token-before-access" class="w-ml--l"><a href="#token-before-access">Token is provided before feature is accessed</a></label>
</div>


## Try it out! {: #demos}

The demos below show each of the ways to provide an origin trial token and access a trial feature:

* [ot-meta.glitch.me](https://ot-meta.glitch.me): token in an `origin-trial` meta tag
* [ot-header.glitch.me](https://ot-header.glitch.me): token in an `Origin-Trial` response header
* [ot-3p.glitch.me](https://ot-3p.glitch.me): token injected by a third-party script
* [ot-iframe.glitch.me](https://ot-iframe.glitch.me): origin trial feature accessed in an iframe
* [ot-iframe-3p.glitch.me](https://ot-iframe-3p.glitch.me): cross-origin iframe examples


## Use Chrome DevTools to check tokens

From Chrome 93 DevTools provides origin trial information in the 
Application panel for the selected frame.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/D31iwicSkRzUJLTlhAZh.png", alt="Chrome DevTools 
origin trials information in the Application panel.", width="800", height="424" %}

Expand the top frame to inspect origin trial tokens available for a subframe. For example, for the 
demo page at [ot-iframe.glitch.me](https://ot-iframe.glitch.me), you can see that the page in the 
iframe provides a token.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/CMxi5ePZrKhoa5lpaIrf.png", alt="Chrome DevTools 
  Application panel, showing origin trial tokens for page in iframe.", width="800", height="403" %}

* **Token Status**: Whether the page has a valid token. Note that for some origin trials there may be 
other factors, such as geographical restrictions, that mean the origin trial feature is not 
available, despite the presence of a valid token. [Chrome DevTools status codes](#devtools-status)
explains the meaning of each of the codes for origin trials.
* **Origin**: The [Web Origin](https://web.dev/same-site-same-origin/#origin) registered for the 
token.
* **Expiry Time**: the maximum (latest) possible expiry date/time for the token, which will normally 
match the end of the trial. This is not the same as the Valid Until date for the token displayed 
in [My Registrations](/origintrials/#/trials/my),
, which shows how long the token is currently valid for, and
[can be extended](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#21-what-does-the-valid-until-date-mean-for-my-tokens).
* **Usage Restriction**: Usage limits, which [can be set](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#20-what-are-the-options-for-usage-restrictions-on-tokens) for some trials.
* **Third Party**: Whether [third-party matching](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#18-how-can-i-enable-an-experimental-feature-as-embedded-content-on-different-domains) 
is enabled for the token. This is available for some origin trials, where a trial feature needs to 
be accessed on multiple sites from third-party scripts.
* **Match Sub-Domains**: Whether [subdomain matching](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#13-i-have-multiple-testingstaging-domains-or-subdomains-that-are-programmatically-generated-do-i-need-to-request-a-token-for-every-subdomain) 
is enabled for the token. This enables an origin trial feature to be tested on multiple 
subdomains of an origin, without requiring a different token for every subdomain.

Chrome DevTools will display a warning next to the trial name if the trial is not available 
for the current user, the token has expired, or if there are other restrictions.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/iW93yyW0wFk7qCeIkqLx.png", alt="Chrome DevTools 
origin trials information in the Application panel showing expired token", width="800", height="424" %}

{% Aside 'gotchas' %}
If a page provides an origin trial dynamically via script, it may not be shown initially in the 
Application panel. You may need to reload Chrome DevTools (not the page). 

For examples of pages that _do_ include an origin trial token, see the [demos](#demos) listed above.
{% endAside %}


## Chrome DevTools status codes {: #devtools-status}

* **Expired**: Token has passed its expiration date. The token will need to be renewed, to
generate a new token with a new expiration date.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=97)

* **FeatureDisabled**: Trial is currently disabled for use.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=100)

* **FeatureDisabledForUser**: This token has been designated as disabled for the current user via an
alternative usage restriction. See the "User Subset Exclusions" section of the [design doc](https://docs.google.com/document/d/1xALH9W7rWmX0FpjudhDeS2TNTEOXuPn4Tlc9VmuPdHA).<br>
[Source code 1](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=106)<br>
[Source code 2](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/common/origin_trials/trial_token.h;l=155)

* **Insecure**: The request origin is insecure, and the trial is not enabled for insecure origins.
As explained in the [origin trial token validator code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=200):
'For third-party tokens, both the current origin and the script origin must be secure. Due to
subdomain matching, the token origin might not be an exact match for one of the provided script
origins, and the result doesn't indicate which specific origin was matched. This means it's not a
direct lookup to find the appropriate script origin. To avoid re-doing all the origin comparisons,
there are shortcuts that depend on how many script origins were provided. There must be at least
one, or the third party token would not be validated successfully.'<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=200)

* **InvalidSignature**: The token has an invalid or malformed signature.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator_unittest.cc;l=105)

* **Malformed**: Token is malformed and could not be parsed.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token.cc;l=88)

{% Aside 'caution' %}
For **InvalidSignature** or **Malformed** errors, the token may conform to a valid format but not be
recognized by the current browser or browser version. It is possible that the token is usable by a
different browser.
{% endAside %}

* **NotSupported**: The origin trial defined by the token is not supported in the Chromium
'embedder': a browser such as Chrome or Edge, a WebView, or some other user agent.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=258)

* **Success**: The token is well-formed, has not expired, matches an origin trial feature, and is
requested from an expected origin.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token.cc;l=84)

* **TokenDisabled**: Token has been marked as disabled and cannot be used.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=103)

* **TrialNotAllowed**: The origin trial is [not available for the current user](/docs/web-platform/origin-trial-troubleshooting/#user).<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/origin_trials/origin_trial_context.cc;drc=96a0ae6d349eb7dd0288df76491b717cb65422f9;l=486)

* **UnknownTrial**: The token specifies a feature name that does not match any known trial.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token_validator.cc;l=178)

* **WrongOrigin**: The request origin does not match the origin specified in the token. This can
include the scheme, hostname, or port. This status will also be displayed if a [third-party token](#token-third-script)
is provided in an HTTP header, meta tag, or inline script, rather than from an external JavaScript file.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token.cc;drc=610603f89f0dd4da794848e4f8670a179efbcf38;l=262)

* **WrongVersion**: Wrong token version: only token version 2 and 3 are currently supported.<br>
[Source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/common/origin_trials/trial_token.cc;l=137)


---

## It's not working! <span role="img" aria="Thinking emoji.">🤔</span>

If your origin trial isn't working as expected, make sure you've met the following conditions.

### You're testing in Chrome, not Chromium or another browser {: #chrome}

Chrome origin trials are designed to work for Chrome users. Don't rely on Chrome origin trial tokens 
to enable trial features in other browsers, including Chromium, and other Chromium-based browsers. 
This is because Chrome origin trials are specific to features made available in Chrome for 
experimentation.

{% Aside 'caution' %}
As described below, some origin trials are not rolled out to all Chrome channels.

Additionally, not all origin trial features can be made available on all platforms or operating 
systems. Some origin trials may only be available on desktop, Android, or WebView. 

In particular, **Chrome on iOS and iPadOS does not support Chrome origin trials**. All browsers on 
iOS and iPadOS [must use WebKit](https://developer.apple.com/app-store/review/guidelines/#2.5.6), 
the same engine used by Safari. Chrome on iOS and iPadOS is built on [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview).
{% endAside %}

Origin trials are also available for [Firefox](https://wiki.mozilla.org/Origin_Trials) and [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/origin-trials/). Enrollment in a Firefox or Edge origin trial won't enable a feature in Chrome.


### The origin trial is enabled for the Chrome versions accessing your site {: #version}

Access to trials is limited to specific versions of Chrome. In some cases, this may mean a trial 
feature is only available to pre-Stable Chrome channels: Canary, Dev and Beta. 

You can check version availability from the [registration page](/origintrials/#/trials/active) 
for the trial:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/I6CRBeKSEhsqzAdQQvzm.png", alt="Chrome Origin Trials
page for First Party Sets & SameParty with Chrome availability highlighted", width="800", height="653" %}

You can check the Chrome version you're using from chrome://version.


### The origin trial is not disabled by Chrome settings {: #settings}

If an individual user reports that a feature is not working for them, check that the feature is not 
disabled in their Chrome settings. For example, [Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox) 
features can be disabled from the `chrome://settings/privacySandbox` page.


### Keywords and syntax are correct {: #syntax}

Make sure to use appropriate keywords and syntax for origin trial tokens. 

{: #whole}

{% Aside 'caution' %}
These examples truncate the token value. Make sure to **check the whole token**, or at least the start 
and end of it! It's easy to accidentally leave out a character.

A complete token looks like this:

```txt
Bj3DysCv1VjknU4jJvkDEwnQZK/vmse1rcd5jZogunrkwtKW92
vmygya6gyKe5GveTObBy3NT5DiC8yiiXnXGwMAAABZeyJvcmlnaW9i7
iJodHXwczovL3NpbXBsLmluZm86NDQzIiwiZmVhdHVyZSI6Ik5BIiwi
ZXhwaXH5IjoxNjMxNjYzOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=
```

{% endAside %}

For first-party usage, a token can be provided in an `origin-trial` meta tag:

```html
<meta http-equiv="origin-trial" content="Aj4DysCv3VjknU3...">
```

Alternatively, a token can be provided in an `Origin-Trial` response header. Here's an example using 
[Express](https://expressjs.com/) in Node.js:

```js
app.use(function(req, res, next) {
  res.setHeader('Origin-Trial', 'Aj4DysCv3VjknU3...')
  next();
});
```

Tokens can also be provided [using JavaScript](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#16-can-i-provide-tokens-by-running-script):

```js
function addTrialToken(tokenContents) {
  const tokenElement = document.createElement('meta');
  tokenElement.httpEquiv = 'origin-trial';
  tokenElement.content = tokenContents;
  document.head.appendChild(tokenElement);
}
```

{% Aside 'caution' %}
For first-party usage, tokens can be provided via in an `origin-trial` meta tag, an `Origin-Trial` 
response header, or via JavaScript.

Third-party tokens **must** be provided via JavaScript.

{% endAside %}

### First-party token origin matches page origin {: #origin-first}

Make sure the **Web Origin** value selected when you register for a trial matches the origin of the 
page that has the meta tag or header which provides the token.

For example, if you selected `https://example.com` as the **Web Origin**:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/GFlAHALbXwTlJWRw7yxc.jpg", alt="Chrome Origin Trials 
page showing https://example.com selected as Web Origin.", width="800", height="549" %}

You might get a token value like this:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XPcrzUXhrs3XT7A6UgOg.png", alt="Chrome Origin Trials 
page showing token value.", width="800", height="549" %}

Check that this value matches the token used on the page you're troubleshooting. 

For a token provided in a meta tag, check the HTML:

```html
  <meta http-equiv="origin-trial" content="Aj4DysCv3VjknU3...">
```

For a token provided in a header, you can check the token value from the 
[Chrome DevTools Network panel](/docs/devtools/network/) under **Response Headers**:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/g0PNnOiSxlaqdSHkmBLx.png", alt="Chrome DevTools 
Network panel showing origin trials response header.", width="800", height="616" %}


### First-party token is served from the origin that uses it {: #token-first}

To enable access to an origin trial feature for code included in a page served from your origin, 
provide a trial token in a meta tag, header, or via JavaScript from the same origin. 

The origin registered for a token must match the origin that serves it.

{% Aside %}
The **Third-party matching** option is only provided for origin trials where it makes sense to try 
out a feature in a third-party context. Not every origin trial offers third-party tokens.
{% endAside %}


### Third-party token origin matches script origin {: #origin-third}

You can register to participate in an origin trial for scripts that are injected on other origins.

For example, if you want scripts that are served from `javascript-library.example` to take part in 
an origin trial, you need to register a token with third-party matching for `javascript-library.example`. 

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/IExwqTS7Snel52lr04AG.png", alt="Chrome origin trials 
registration page showing third-party matching selected.", width="800", height="612" %}

The origin value for a third-party token must match the origin of the script that injects it.


### Third-party script uses a third-party token {: #token-third}

You cannot enable a third-party script to participate in an origin trial on your site simply by 
registering a token for your origin, and not for the script. 

Third-party scripts need to use tokens with third-party matching enabled, injected via the script 
itself (not included in a meta tag or header on your site) using code like the following:

```js
function addTrialToken(tokenContents) {
  const tokenElement = document.createElement('meta');
  tokenElement.httpEquiv = 'origin-trial';
  tokenElement.content = tokenContents;
  document.head.appendChild(tokenElement);
}
```

### Third-party token is provided via an external script, not a meta tag, HTTP header or inline script {: #token-third-script}

Third-party tokens are validated against the origin of the script that injected them, but inline
scripts and `<meta>` tags in static markup do not have an origin (i.e. a source URL). 

This means that a third-party token must be provided via an external script, not in a `<meta>` tag
or inline script. It doesn't matter if the external script that injects the token comes from the
same origin as the containing page, or a different origin, as long as the origin of the script matches 
an origin registered for the trial.

You can see a demo of this at [ot-iframe-3p.glitch.me](https://ot-iframe-3p.glitch.me).  

{% Aside %}
If need be, you can [provide multiple tokens](/docs/web-platform/origin-trials/#multiple) on the same page,
for the same origin trial or for different trials.
{% endAside %}


### Origin trial feature access is supported for the method used to provide a trial token {: #token-method}

Some types of access to origin trial features require you to provide a trial token in a specific way. 
For example, the only way to enable [origin trial access for service workers and shared workers](#workers) is to 
provide a token in an `Origin-Trial` header. 


### Subdomain matching is enabled for a token used on a subdomain {: #subdomain}

If an origin trial feature doesn't seem to be working for some pages on your site, check that 
tokens are correctly set up for the subdomains serving them.

When you register for an origin trial, you can optionally choose to match all subdomains of the 
origin:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/gh51Y3N9DOwgIhWiyrE3.png", alt="Chrome origin trials 
registration page showing subdomain-matching selected", width="800", height="613" %}

You can also match subdomains for third-party tokens:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/NdCgtgNaV9BbikfIhDYl.png", alt="Chrome origin trials 
registration page showing third-party matching and subdomain-matching selected", width="800", height="612" %}

Subdomain tokens [will not be issued](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#13-i-have-multiple-testingstaging-domains-or-subdomains-that-are-programmatically-generated-do-i-need-to-request-a-token-for-every-subdomain) 
for origins in the [Public Suffix List](https://publicsuffix.org/). For example, you cannot register 
an origin such as  https://appspot.com or https://github.io, though you can register for domains
within that origin, such as https://example.appspot.com or https://example.github.io.


### The token is still valid {: #token-still-valid}

Tokens are valid for six weeks after they're created. Beyond that, you must submit feedback in order 
to extend the Valid Until date. [Origin Trials Guide for Web Developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#22-how-do-i-keep-my-tokens-active-for-the-entire-trial) explains how to make sure 
your token is valid for an entire origin trial. 

{% Aside %}
There is always a gap after the end of the final origin trial for a feature, and when the feature 
begins to be rolled out to all Chrome users: usually two weeks. In other words, there will always be 
a time during which a feature is not available in origin trial and hasn't yet been made available by 
default to all users.

[Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial) has 
more detail about trial timelines.
{% endAside %}

You can check for active tokens on your Chrome Origin Trials [My Registrations page](/origintrials/#/trials/my): 

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/XRSqveK1hiuOxAfJrKDx.png", alt="Chrome origin trials 
My Registrations page showing Valid Until date", width="800", height="612" %}

Chrome DevTools displays Status `Success` if the token is still valid:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/fO8LVqZb8Hv0kIg6HdK7.png", alt="Chrome DevTools 
origin trials information in the Application panel, highlighting Status: Success.", width="800", height="424" %}

If your token has expired, DevTools will display the status `Expired` and your
[My Registrations page](/origintrials/#/trials/my) will display an **Expired Tokens** section.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/l61ghrJpV0SvwGlRbXlz.png", alt="Chrome origin trials 
My Registrations page showing expired tokens.", width="800", height="591" %}


### The origin trial hasn't ended {: #trial-ended}

You can check the end date for an origin trial from its [registration page](/origintrials/#/trials/active):

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/0f2Wdcfj3D3UwZmWx33S.png", alt="Chrome Origin Trials
page for First Party Sets & SameParty with Trial Available details highlighted.", width="800", height="737" %}

For trials that have ended, DevTools will display something like this:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/iW93yyW0wFk7qCeIkqLx.png", alt="Chrome DevTools 
origin trials information in the Application panel showing ValidTokenNotProvided and Status Expired", 
width="800", height="424" %}

You will be sent automated emails when feedback is required or a token is about to expire, though 
not when the trial ends.

{% Aside 'caution' %}
There may be more than one origin trial for a feature.

Some features may undergo multiple origin trials before being rolled out in Chrome to all users.

Check the [blink-dev mailing list](https://groups.google.com/a/chromium.org/g/blink-dev) for updates on the 
status of the feature you're testing.
{% endAside %}


### The origin trial is available for the current user {: #user}

Some origin trials are unavailable to certain users, even if a valid token is provided.

If a trial isn't available for the current user, Chrome DevTools will display a `TrialNotAllowed` warning:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/jToK0McIe9AgqCS3rymo.png",
alt="Chrome DevTools origin trials information in the Application panel showing TrialNotAllowed warning.",
width="800", height="424" %}

Information about usage restrictions and availability will be provided for each origin trial.

As with any web platform feature, you should use [feature detection](https://developer.mozilla.org/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)
to confirm that an origin trial feature is supported before you use it.


### Origin trial usage restrictions haven't been exceeded {: #usage-restrictions}

By default, an origin trial feature will be enabled on any page that has a valid token for the trial.

However, except in rare cases, origin trial usage is [limited to a maximum of 0.5% of all Chrome page loads](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#19-are-there-any-usage-limits-on-experimental-features). 
The origin trial feature will be disabled if total usage by all Chrome users exceeds that amount. 
DevTools will show the token status as disabled.

{% Aside %}
The **Expected Usage** field on the trial registration page doesn't impact your
origin trial token. It's purely informational for Chrome's origin trial team. 
{% endAside %}

Some trials also provide an option to limit usage, which means origin trial features will be 
disabled for some users. This option is made available from the registration page for an origin 
trial that offers it:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/Nj4PiSu4vVNS3tcw61JC.png", alt="Chrome origin trials 
registration page showing usage restrictions.", width="800", height="711" %}

If you're noticing that access by your users to an origin trial feature is lower than expected, 
make sure that 'Standard Limit' is selected.

{% Aside 'gotchas' %}
Access to trials is limited to specific versions of Chrome. In some cases, this may mean a trial 
feature is only available to pre-Stable Chrome channels: Canary, Dev and Beta. 

Check that the origin trial is [enabled for the Chrome versions accessing your site](#version). 
{% endAside %}


### Iframes provide their own tokens {: #iframe}

To allow access to an origin trial feature, an iframe must provide a token in a meta tag, an HTTP
header, or [programmatically](#programmatic). Iframes don't inherit access to features enabled for
pages that contain them.

[ot-iframe.glitch.me](https://ot-iframe.glitch.me) demonstrates access to an origin trial feature
from an iframe. [ot-iframe-3p.glitch.me](https://ot-iframe-3p.glitch.me) provides multiple
cross-origin iframe examples.

{% Aside 'caution' %}

When you register for a trial, don't select _Third-party matching_ just because you plan to access a
trial feature from an iframe!

A [third-party token](/docs/web-platform/third-party-origin-trials/#register-for-a-third-party-origin-trial)
only activates a trial feature if it's provided in an external JavaScript file, included via a
`<script>` element. A third-party token won't work when provided in a meta tag, inline script or HTTP header.

{% endAside %}

### Permissions policies are correctly configured {: #permissions-policies}

Some origin trial features may be affected by a [`Permissions-Policy`](/docs/privacy-sandbox/permissions-policy/) 
header (previously known as a `Feature-Policy` header). You can check for this in the 
[Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=subject%3Aintent%20subject%3Ato%20subject%3Aexperiment) 
for the trial feature, or in developer documentation for the feature on [web.dev](https://web.dev) 
or [developer.chrome.com/blog](/blog).

Make sure the feature you are attempting to access is not blocked by a `Permissions-Policy` 
directive. You can check for response headers in the Chrome DevTools Network panel, and view the 
full list of allowed features in the Application panel.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/AcG4YbivB3L4lM43vIRe.png", alt="Chrome DevTools 
  Application panel, showing Permissions Policy Allowed Feature.", width="800", height="408" %}


### What about the workers? {: #workers}

Origin trials features can be made available to service workers, shared workers, and dedicated 
workers. However, the only way to enable access for service workers and shared workers is to provide 
a token in an `Origin-Trial` header.

Dedicated workers inherit access to features enabled by their parent document.


### Token is provided before feature is accessed {: #token-before-access}

Make sure that an origin trial token is provided _before_ a trial feature is accessed. 
For example, if a page provides a token via JavaScript, make sure the code to provide the token 
is run before code that attempts to access the trial feature.


## Origin trial demos

* [Token in a meta tag](https://ot-meta.glitch.me)
* [Token in a header](https://ot-header.glitch.me)
* [Feature accessed in an iframe](https://ot-iframe.glitch.me)
* [Token injected by third-party script](https://ot-3p.glitch.me)
* [ot-iframe-3p.glitch.me](https://ot-iframe-3p.glitch.me): cross-origin iframe examples


## Find out more

* [Get started with Chrome's origin trials](/docs/web-platform/origin-trials/)
* [Third-party origin trials](/docs/web-platform/third-party-origin-trials/)
* [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
* [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
* [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
* [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
* [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
* [Use Origin Trials in Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/origin-trials/)
* [Origin trials for Firefox](https://wiki.mozilla.org/Origin_Trials)
