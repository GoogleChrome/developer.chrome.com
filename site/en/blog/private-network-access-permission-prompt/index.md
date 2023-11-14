---
layout: 'layouts/blog-post.njk'
title: "Private Network Access Permission prompt origin trial: An easy path to migrate websites with HTTPS"
authors:
  - lyf
description: Chrome is deprecating access to private network endpoints from non-secure public websites as part of the Private Network Access specification. Permission prompt is a way to relax mixed content check for devices which cannot migrate themselves with secure context. Read on for recommended actions.
date: 2023-11-13
updated: 2023-11-13
hero: image/VbsHyyQopiec0718rMq2kTE1hke2/iqanYAE91Ab6BsgwhBjq.jpg
alt: An airplane in the sky
tags:
  - chrome-120
  - security
---

## Background

Blocking requests to private networks from insecure public websites starting in Chrome 94. Feedback from websites currently participating in the [Private Network Access from non-secure contexts deprecation trial](/origintrials/#/view_trial/4081387162304512001) has emphasized the difficulty in migrating affected websites to HTTPS. A deprecation trial of non-secure contexts restriction has started since then.

The most common voice from that was the difficulties of migrating private devices with HTTPS and the violation of mixed context check because of that.

Now we officially announced a new permission prompt under the Origin Trial to solve the problem above.

## Permission prompt as the new option

By adding the new `targetAddressSpace` attribute as a fetch option, the request will be able to skip the mixed content check.

Example:
```text
fetch("http://router.local/ping", {
  targetAddressSpace: "private",
});
```

{% Aside %}
Note: `local` IP address such as 127.0.0.0/8 or ::1/128 [RFC4632](https://www.rfc-editor.org/rfc/rfc4632) are regard as [potentially trustworthy](https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy) in mixed content check, so that we don't need the permission prompt in this case.
{% endAside %}

As mentioned in [Private Network Access: introducing preflights](/blog/private-network-access-preflight/), a preflight will be sent ahead of the main request for any private network requests. This preflight request will carry a new header, `Access-Control-Request-Private-Network: true`, and the response to it must carry a corresponding header, `Access-Control-Allow-Private-Network: true`.

For the new permission prompt in particular, we required devices to add two new response headers: `Private-Network-Access-Name` and `Private-Network-Access-ID`.

```text
Private-Network-Access-Name: <some human-readable device name>
Private-Network-Access-ID: <the MAC address of the device>
```

Example:
```text
Private-Network-Access-Name: "My Smart Toothbrush"
Private-Network-Access-ID: "01:23:45:67:89:0A"
```

`Private-Network-Access-ID`` should be a 48-bit value presented as 6 hexadecimal bytes.
`Private-Network-Access-Name`` should be a valid name is a string that matches the [ECMAScript] regexp /^[a-z0-9_-.]+$/. 248 is the maximum number of UTF-8 code units in the name.

{% Aside %}
Note: When mixed content check has been skipped for the private network permission prompt, the preflight will be enforced even under the preflight warning mode.
{% endAside %}

## Demo

You can check out the demo at: [https://private-network-access-permission-test.glitch.me/](https://private-network-access-permission-test.glitch.me/).

## Register for an origin trial

To ensure that Private Network Access Permission Prompt are helping developers adopt secure context restrictions for private network access, we are making them available in Chrome from version 120 to 122 as an origin trial.

Register for the origin trial to enable your website to use the permission prompt:

1. [Request a token](/origintrials/#/view_trial/1367968386813788161) for your origin.
2. Use the token in one of the following ways:
  - In your HTML:
  ```html
  <meta http-equiv="Origin-Trial" content="TOKEN_GOES_HERE">
  ```
  - In your Javascript:
  ```js
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Origin-Trial';
  meta.content = 'TOKEN_GOES_HERE';
  document.head.append(meta);
  ```
  - In the HTTP headers:
  ```text
  Origin-Trial: TOKEN_GOES_HERE
  ```

If you have any feedback on this feature, file an issue in the [GitHub repository](https://github.com/WICG/private-network-access).

## Resources

- [Private Network Access Permission Prompt Spec](https://wicg.github.io/private-network-access/#permission-prompt)

- [Private Network Access Permission Prompt Explainer](https://github.com/WICG/private-network-access/blob/main/permission_prompt/explainer.md)

- [Walk through relaxing mixed-context for private network access](https://docs.google.com/document/d/1W70cFFaBGWd0EeOOMxJh9zkmxZ903vKUaGjyF-w7HcY/edit?usp=sharing):
