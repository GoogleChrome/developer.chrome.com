---
layout: 'layouts/blog-post.njk'
title: Troubleshooting Chrome's origin trials
subhead: Origin trials are a way to test a new or experimental web platform feature. This guide explains how to troubleshoot common problems with trial tokens in meta tags, headers, and scripts. You'll also learn about debugging support in Chrome DevTools.
authors:
  - samdutton
date: 2021-08-11
updated: 2021-09-07
hero: image/80mq7dk16vVEg8BBhsVe42n6zn82/b52LlVcFfbFtxgfT0BoF.jpg
alt: Test tubes in a metal rack, one containing clear green liquid.
tags:
  - origin-trials
---

{% Aside %}
This guide assumes a working knowledge of origin trials in Chrome.

* [Getting started with Chrome's origin trials](/blog/origin-trials/) explains the basics.
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
  <input class="w-checkbox" type="checkbox" id="check-region">
  <label for="check-region" class="w-ml--l"><a href="#region">The origin trial is available in your 
    region</a></label>
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
</div>


## Try it out! {: #demos}

The demos below show each of the ways to provide an origin trial token and access a trial feature:

* [ot-meta.glitch.me](https://ot-meta.glitch.me): token in an `origin-trial` meta tag
* [ot-header.glitch.me](https://ot-header.glitch.me): token in an `Origin-Trial` response header
* [ot-3p.glitch.me](https://ot-3p.glitch.me): token injected by a third-party script
* [ot-iframe.glitch.me](https://ot-iframe.glitch.me): origin trial feature accessed in an iframe


## Use Chrome DevTools to check tokens

From Chrome 93 DevTools provides origin trial information in the 
Application panel for the selected frame.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/D31iwicSkRzUJLTlhAZh.png", alt="Chrome DevTools 
origin trials information in the Application panel", width="800", height="424" %}

Expand the top frame to inspect origin trial tokens available for a subframe. For example, for the 
demo page at [ot-iframe.glitch.me](https://ot-iframe.glitch.me), you can see that the page in the 
iframe provides a token.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/CMxi5ePZrKhoa5lpaIrf.png", alt="Chrome DevTools 
  Application panel, showing origin trial tokens for page in iframe", width="800", height="403" %}

* **Token Status**: Whether the page has a valid token. Note that for some origin trials there may be 
other factors, such as geographical restrictions, that mean the origin trial feature is not 
available, despite the presence of a valid token.
* **Origin**: The [Web Origin](https://web.dev/same-site-same-origin/#origin) registered for the 
token.
* **Expiry Time**: the maximum (latest) possible expiry date/time for the token, which will normally 
match the end of the trial. This is not the same as the Valid Until date for the token displayed 
on your origin trial's My Registrations](/origintrials/#/trials/my) 
page, which shows how long the token is currently valid for, and [can be extended](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#21-what-does-the-valid-until-date-mean-for-my-tokens).
* **Usage Restriction**: Usage limits, which [can be set](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#20-what-are-the-options-for-usage-restrictions-on-tokens) for some trials.
* **Third Party**: Whether [third-party matching](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#18-how-can-i-enable-an-experimental-feature-as-embedded-content-on-different-domains) 
is enabled for the token. This is available for some origin trials, where a trial feature needs to 
be accessed on multiple sites from third-party scripts.
* **Match Sub-Domains**: Whether [subdomain matching](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#13-i-have-multiple-testingstaging-domains-or-subdomains-that-are-programmatically-generated-do-i-need-to-request-a-token-for-every-subdomain) 
is enabled for the token. This enables an origin trial feature to be tested on multiple 
subdomains of an origin, without requiring a different token for every subdomain.

Chrome DevTools will display a warning next to the trial name if the trial is not available in your 
region, the token has expired, or if there are other restrictions.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/iW93yyW0wFk7qCeIkqLx.png", alt="Chrome DevTools 
origin trials information in the Application panel showing expired token", width="800", height="424" %}

{% Aside 'gotchas' %}
If a page provides an origin trial dynamically via script, it may not be shown initially in the 
Application panel. You may need to reload Chrome DevTools (not the page). 

For examples of pages that _do_ include an origin trial token, see the [demos](#demos) listed above.
{% endAside %}


---

## It's not working! 🤔

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

Microsoft Edge has its own [origin trial framework](https://developer.microsoft.com/en-us/microsoft-edge/origin-trials/). 
Enrollment in an Edge origin trial won't enable a feature in Chrome.


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
These examples truncate the token value. Make sure to **check the whole token**—or at least the start 
and end of it! It's easy to accidentally leave out a character.

A complete token looks like this:

<pre>Bj3DysCv1VjknU4jJvkDEwnQZK/vmse1rcd5jZogunrkwtKW92
vmygya6gyKe5GveTObBy3NT5DiC8yiiXnXGwMAAABZeyJvcmlnaW9i7
iJodHXwczovL3NpbXBsLmluZm86NDQzIiwiZmVhdHVyZSI6Ik5BIiwi
ZXhwaXH5IjoxNjMxNjYzOTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=</pre>
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
page showing https://example.com selected as Web Origin", width="800", height="549" %}

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
Network panel showing origin trials response header", width="800", height="616" %}


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
registration page showing third-party matching selected", width="800", height="612" %}

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
origin trials information in the Application panel, highlighting Status: Success", width="800", height="424" %}

If your token has expired, DevTools will display Status `Expired` and your [My&nbsp;Registrations&nbsp;page](/origintrials/#/trials/my) for the trial will display an **Expired Tokens** section:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/l61ghrJpV0SvwGlRbXlz.png", alt="Chrome origin trials 
My Registrations page showing expired tokens", width="800", height="591" %}


### The origin trial hasn't ended {: #trial-ended}

You can check the end date for an origin trial from its [registration page](/origintrials/#/trials/active):

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/0f2Wdcfj3D3UwZmWx33S.png", alt="Chrome Origin Trials
page for First Party Sets & SameParty with Trial Available details highlighted", width="800", height="737" %}

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


### The origin trial is available in your region {: #region}

Not all origin trials are supported in all geographical regions.

If a trial isn't supported in your region, Chrome DevTools will display a `TrialNotAllowed` warning:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/jToK0McIe9AgqCS3rymo.png", alt="Chrome DevTools 
origin trials information in the Application panel showing TrialNotAllowed warning", width="800", 
height="424" %}

### Origin trial usage restrictions haven't been exceeded {: #usage-restrictions}

By default, an origin trial feature will be enabled on any page that has a valid token for the trial.

However, except in rare cases, origin trial usage is [limited to a maximum of 0.5% of all Chrome page loads](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#19-are-there-any-usage-limits-on-experimental-features). 
The origin trial feature will be disabled if total usage by all Chrome users exceeds that amount. 
DevTools will show the token status as disabled.

{% Aside %}
★ The **Expected Usage** field on the trial registration page doesn't impact your origin trial 
token. It's purely informational for Chrome's origin trial team. 
{% endAside %}

Some trials also provide an option to limit usage, which means origin trial features will be 
disabled for some users. This option is made available from the registration page for an origin 
trial that offers it:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/Nj4PiSu4vVNS3tcw61JC.png", alt="Chrome origin trials 
registration page showing usage restrictions", width="800", height="711" %}

If you're noticing that access by your users to an origin trial feature is lower than expected, 
make sure that 'Standard Limit' is selected.

{% Aside 'gotchas' %}
Access to trials is limited to specific versions of Chrome. In some cases, this may mean a trial 
feature is only available to pre-Stable Chrome channels: Canary, Dev and Beta. 

Check that the origin trial is [enabled for the Chrome versions accessing your site](#version). 
{% endAside %}


### Iframes provide their own tokens {: #iframe}

To enable an origin trial feature, an iframe must provide a token valid for its origin. Iframes 
don't inherit access to features enabled for pages that contain them.

A demo showing access to an origin trial feature in an iframe is available at 
[ot-iframe.glitch.me](https://ot-iframe.glitch.me).

### Permissions policies are correctly configured {: #permissions-policies}

Some origin trial features may be affected by a [`Permissions-Policy`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) 
header (previously known as a `Feature-Policy` header). You can check for this in the 
[Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=subject%3Aintent%20subject%3Ato%20subject%3Aexperiment) 
for the trial feature, or in developer documentation for the feature on [web.dev](https://web.dev) 
or [developer.chrome.com/blog](/blog).

Make sure the feature you are attempting to access is not blocked by a `Permissions-Policy` 
directive. You can check for response headers in the Chrome DevTools Network panel, and view the 
full list of allowed features in the Application panel.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/AcG4YbivB3L4lM43vIRe.png", alt="Chrome DevTools 
  Application panel, showing Permissions Policy Allowed Feature", width="800", height="408" %}


### What about the workers? {: #workers}

Origin trials features can be made available to service workers, shared workers, and dedicated 
workers. However, the only way to enable access for service workers and shared workers is to provide 
a token in an `Origin-Trial` header. Dedicated workers inherit access to features enabled by their 
parent document.


## Find out more

-  [Getting started with Chrome's origin trials](/blog/origin-trials/)
-  [What are third-party origin trials?](/blog/third-party-origin-trials/)
-  [Origin trials guide for web developers](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
-  [Origin trial explainer](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
-  [Running an origin trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
-  [Process for launching new features in Chromium](https://www.chromium.org/blink/launching-features)
-  [Intent to explain: Demystifying the Blink shipping process](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
---

Photo by [Bill Oxford](https://unsplash.com/@bill_oxford) on [Unsplash](https://unsplash.com/photos/tR0PPLuN6Pw).
