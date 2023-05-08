---
layout: 'layouts/doc-post.njk'
title: 'User-Agent reduction snippets'
subhead: >
  Code snippets to transform the current Chrome user-agent to the reduced format.
description: >
  Test your sites and services against the reduced Chrome user-agent with regular expressions.
date: 2021-11-26
authors:
  - rowan_m
---

A collection of code snippets to let you transform the current Chrome user-agent
string to the new reduced format. [Submit versions for your preferred platforms
and
languages](https://github.com/GoogleChrome/developer.chrome.com//blob/main/site/en/docs/privacy-sandbox/user-agent/snippets/index.md)
or let us know what would be useful to add!

## Background

Chrome is [reducing the information exposed in its user-agent
string](/docs/privacy-sandbox/user-agent/). This will be happening incrementally
over a period of time with the final state removing the OS version, device, and
full browser version portions of the string.

Here's an example of how that would look on a mobile device:

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android <span style="background: #ef9a9a">12; Pixel 5</span>)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.<span  style="background:
#ef9a9a">0.4638.16</span> Mobile Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0
(Linux; Android <span style="background: #a5d6a7">10; K</span>)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.<span style="background:
#a5d6a7">0.0.0</span> Mobile Safari/537.36</span> {% endCompare %}

## How to override the user-agent in your code

You can [test the string locally](/docs/privacy-sandbox/user-agent/#test-locally)
with the help of regular expressions.

{% Aside %}
[Enroll your sites in the origin
trial](/blog/user-agent-reduction-origin-trial/) to
enable Chrome browsers visiting your site to send the reduced version of the
`user-agent`.
{% endAside %}

As the format for the reduced `user-agent` string is available, this means you can
transform and test the new string against your own code—either by overriding and
replacing it, or by generating the new version and testing side-by-side.

### Regular expression

A regular expression that will **only** match safely transformable Chrome
user-agents and pulls out the necessary variable values to slot into a template
for the new format.

All on one line for easy copying. It is long, but that's to prioritise only
matching against Chrome and doing with relatively cheap checks.

```text
/^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/
```

The expression captures the following values:

*   `platform`: captures the platform or operating system
*   `major`: captures the browser major version
*   `mobile`: captures the mobile device indicator

The captured values should be inserted into this template string for the reduced
format.

```text
Mozilla/5.0 (${unifiedPlatform[matched.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.major}.0.0.0${matched.mobile} Safari/537.36
```

The `unifiedPlatform` value comes from taking the short `platform` match and
replacing it with the appropriate reduced value.

* `Lin`    → `Linux; Android 10; K`
* `Win`    → `Windows NT 10.0; Win64; x64`
* `Mac`    → `Macintosh; Intel Mac OS X 10_15_7`
* `X11; C` → `X11; CrOS x86_64 14541.0.0`
* `X11; L` → `X11; Linux x86_64`

### JavaScript

In client-side JavaScript, the following snippet can be used to override the
current value of
[`navigator.userAgent`](https://developer.mozilla.org/docs/Web/API/Navigator/userAgent)
with the reduced format.

Demo:
[reduced-ua.glitch.me/javascript.html](https://reduced-ua.glitch.me/javascript.html)

```javascript
const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
const matched = chromeUAs.exec(navigator.userAgent);

if (matched) {
  // Map detected platform to reduced value
  const unifiedPlatform = {
    'Lin': 'Linux; Android 10; K',
    'Win': 'Windows NT 10.0; Win64; x64',
    'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
    'X11; C': 'X11; CrOS x86_64 14541.0.0',
    'X11; L': 'X11; Linux x86_64',
  };
  const reducedUA =
        `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) ` +
        `AppleWebKit/537.36 (KHTML, like Gecko) ` +
        `Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`
  // Override navigator.userAgent with the reduced string
  Object.defineProperty(navigator, 'userAgent', {
    value: reducedUA,
    writable: false,
    configurable: true
  });
}
```

### Node.js

In [Node.js](https://nodejs.org/) you can use the following snippet to override
the incoming [`User-Agent`
header](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)
with the reduced format.

Demo:
[reduced-ua.glitch.me/server-side](https://reduced-ua.glitch.me/server-side)

```javascript
const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
const matched = chromeUAs.exec(request.get('user-agent'));

if (matched) {
  const unifiedPlatform = {
    'Lin': 'Linux; Android 10; K',
    'Win': 'Windows NT 10.0; Win64; x64',
    'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
    'X11; C': 'X11; CrOS x86_64 14541.0.0',
    'X11; L': 'X11; Linux x86_64',
  };
  request.headers['user-agent'] = `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`;
}
```

### CloudFlare Workers

You can use a [CloudFlare Worker](https://developers.cloudflare.com/workers/) to
proxy and transform requests to your own site. This snippet replaces the
incoming [`User-Agent`
header](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)
with the reduced format.

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const chromeUAs = /^Mozilla\/5\.0 \(((?<platform>Lin|Win|Mac|X11; C|X11; L)+[^\)]+)\) AppleWebKit\/537.36 \(KHTML, like Gecko\) Chrome\/(?<major>\d+)[\d\.]+(?<mobile>[ Mobile]*) Safari\/537\.36$/;
  const matched = chromeUAs.exec(request.headers.get('user-agent'));

  if (matched) {
    const unifiedPlatform = {
      'Lin': 'Linux; Android 10; K',
      'Win': 'Windows NT 10.0; Win64; x64',
      'Mac': 'Macintosh; Intel Mac OS X 10_15_7',
      'X11; C': 'X11; CrOS x86_64 14541.0.0',
      'X11; L': 'X11; Linux x86_64',
    };

    const clonedRequest = new Request(request, {referrer: request.referrer});
    clonedRequest.headers.set('user-agent', `Mozilla/5.0 (${unifiedPlatform[matched.groups.platform]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${matched.groups.major}.0.0.0${matched.groups.mobile} Safari/537.36`);
    return await fetch(clonedRequest);
  } else {
    return await fetch(request);
  }
}
```
