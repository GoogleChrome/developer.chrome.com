---
layout: 'layouts/doc-post.njk'
title: 'Controlling browser features with Permissions Policy'
subhead: >
  Manage how your page and third-party iframes on your page have access to browser features.
description: >
  A proposal to manage how your page and embedded third-party iframes access to browser features.
date: 2022-04-20
authors:
  - kevinkiklee
---

Permissions Policy, formerly known as Feature Policy, allows the developer to
control the browser features available to a page, its iframes, and
subresources, by declaring a set of policies for the browser to enforce. These
policies are applied to origins provided in a response header origin list.
The origin list can contain same-origins and/or cross-origins, and it allows
the developer to control first-party and third-party access to browser features.

The user has the final decision to allow access to more powerful features, and needs to provide explicit permission via a prompt. 

Permissions Policy allows the top-level site to define what it and its third
parties intend to use, and removes the burden from the user of determining
whether the feature access request is legitimate or not. For example, by
blocking the geolocation feature for all third parties via Permissions Policy,
the developer can be certain that no third party will gain access to the user's
geolocation. 

{% Aside %}
[Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox/) is a series of proposals to satisfy third-party use cases without third-party cookies or other tracking mechanisms.

Privacy Sandbox APIs, such as [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) and the [Topics API](/docs/privacy-sandbox/topics/), are managed by Permissions Policy in the same way that features like `geolocation` and `camera` are managed. For a list of web platform APIs that rely on Permissions Policy, see the [feature list](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md). Note, this list may not be current.
{% endAside %}


## Changes to Permissions Policy

Permissions Policy was previously known as Feature Policy. The key concepts remain the same, but there are some important changes along with the name.

### Structured Fields usage

[Structured Fields](https://www.rfc-editor.org/rfc/rfc8941.html) provide a set of common data structures to standardize parsing and serialization of HTTP header field values. Learn more about Structured Fields from Fastly's blog post, "[Improving HTTP with structured header fields](https://www.fastly.com/blog/improve-http-structured-headers)".

{% Compare 'worse', 'old' %}
  ```text
  geolocation 'self' https://example.com; camera 'none'
  ```
  {% CompareCaption %}
    Before with Feature Policy.
  {% endCompareCaption %}
{% endCompare %}

{% Compare 'better', 'new' %}
  ```text
  geolocation=(self "https://example.com"), camera=()
  ```
  {% CompareCaption %}
    Now with Permissions Policy.
  {% endCompareCaption %}
{% endCompare %}

### Combine headers with the iframe `allow` attribute

With Feature Policy, you could add the feature to a cross-origin frame by either adding the origin to the header origin list or adding an `allow` attribute to the iframe tag. With Permissions Policy, if you add a cross-origin frame to the origin list, the iframe tag for that origin must include the `allow` attribute.
If the response does not contain a Permissions Policy header, the origin list is considered to have the default value of `*`. Adding the `allow` attribute to the iframe allows access to the feature.

Therefore, we recommend developers explicitly set the Permissions Policy header in the response, so that cross-origin iframes which aren't listed in the origin list are blocked from accessing this feature, even if `allow` is present.

Feature Policy can still be used after Chrome 88, but it acts as an alias for Permissions Policy. Other than the syntax, there is no difference in logic. If both Permissions Policy and Feature Policy headers are used together, the `Permissions-Policy` header will have higher priority, and will overwrite the value provided by the `Feature-Policy` header. 

## How do I use Permissions Policy? {: #usage }

### Quick overview

Before we dive deep, let's take a quick look at a common scenario where you are the owner of a website and you want to control how your site and third-party code use browser features. 

* Your site is `https://your-site.example`.
* Your site embeds an iframe from same-origin (`https://your-site.example`). 
* Your site embeds an iframe from `https://trusted-site.example` that you trust. 
* Your site also displays ads served by `https://ad.example`. 
* You want to allow geolocation only for your site and the trusted site, not for the ad. 

In this case, use the following header: 

```text
Permissions-Policy: geolocation=(self "https://trusted-site.example")
```

And explicitly set the `allow` attribute to the iframe tag for the trusted site:
 
```html
<iframe src="https://trusted-site.example" allow="geolocation">
```
{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/8mRSZZQAhoAHsa6Tgvyo.png", alt="Quick overview diagram of Permissions Policy usage.", width="700", height="238" %}

In this example, the header origin list lets only your site (`self`) and `trusted-site.example` to use the geolocation feature. `ad.example` is not allowed to use geolocation. 

1. Your site `your-site.example` is allowed to use the geolocation feature with the user's consent.
1. A same-origin iframe (`your-site.example`) is allowed to use the feature without the usage of the `allow` attribute.
1. An iframe served from a different subdomain (`subdomain.your-site-example`) that was not added to the origin list, and has the allow attribute set on the iframe tag, is blocked from using the feature. Different subdomains are considered same-site but cross-origin. 
1. A cross-origin iframe (`trusted-site.example`) that was added to the origin list and has the `allow` attribute set on the iframe tag is allowed to use the feature.
1. A cross-origin iframe (`trusted-site.example`) added to the origin list, without the `allow` attribute, is blocked from using the feature.
1. A cross-origin iframe (`ad.example`) which wasn't added to the origin list is blocked from using the feature, even if the `allow` attribute is included in the iframe tag.

### `Permissions-Policy` HTTP response header

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/jfhckpPdaepkw8bRPM0G.png", alt="The user makes a request, the server responds with the Permissions Policy header, and then the browser grants access based on that header.", width="800", height="459" %}

```text
Permissions-Policy: &lt;feature&gt;=(&lt;token&gt;|&lt;origin(s)&gt;)
```

Use a `Permissions-Policy` header in the response from the server to set the allowed origins for a feature. The header value can take a combination of tokens and strings of origins. The [available tokens](https://w3c.github.io/webappsec-permissions-policy/#structured-header-serialization) are `*` for all origins and `self` for same-origin.

If your header is for multiple features, separate the features with a comma. If you list multiple origins, separate each origin in the origin list with a space. For headers which list an origin that's a cross-origin request, the iframe tag must include the `allow` attribute. 

Here are some example key-value pairs:

* Syntax: `[FEATURE]=*` 
  * Policy applied to all origins
  * Example: `geolocation=*`
* Syntax: `[FEATURE]=(self)`
  * Policy applied to same-origin
  * Example: `geolocation=(self)`
* Syntax: `[FEATURE]=(self [ORIGIN(s)])`
  * Policy applied to same origin and the specified origins
  * Example: `geolocation=(self "https://a.example" "https://b.example")`
  * `self` is a shorthand for `https://your-site.example`
* Syntax: `[FEATURE]=([ORIGIN(s)])` 
  * Policy applied to same origin and the specified origins
  * Example: `geolocation=("https://your-site.example" "https://a.example" "https://b.example")`
  * When using this syntax, one of the origins should be the origin of the embedder. If the embedder page itself is not granted the permissions, the iframes embedded in that page will be also blocked even though they are added to the origin list because Permissions Policy delegates permissions. You can also use the `self` token.
* Syntax: `[FEATURE]=()` 
  * Feature blocked for all origins
  * Example: `geolocation=()`

{% Aside 'warning' %}
If the Permission Policy header is not present in the response, the default value `*` token is used. This allows all iframes on the page with an `allow` attribute to use the feature. Therefore, it is strongly recommended that the origin list is explicitly set in the Permissions-Policy header to control access. 
{% endAside %}

{% Aside 'gotchas' %}
With the change in Permissions Policy from Feature Policy, adding the origin to the header origin list is no longer enough to enable the feature for a cross-origin iframe. The iframe must include the `allow` attribute if it's cross-origin, regardless of what is set in the header origin list. 
{% endAside %}

#### Different subdomains and paths

Different subdomains, such as `https://your-site.example` and `https://subdomain.your-site.example`, are considered [same-site but cross-origin](https://web.dev/same-site-same-origin/). Therefore, adding a subdomain in the origin list does not allow access to another subdomain of the same site. Every embedded subdomain that wants to use the feature must be added separately to the origin list. For example, if access to the user's browsing topics is allowed to the same-origin only with the header `Permissions-Policy: browsing-topics=(self)`, an iframe from a different subdomain of the same site, `https://subdomain.your-site.example`, will not have access to the topics. 

Different paths, such as `https://your-site.example` and `https://your-site.example/embed`, are considered same-origin, and different paths do not have to be listed in the origin list. 

### Iframe `allow` attribute

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/mD9lgR2lky1kdL8tohHx.png", alt="Iframes setup", width="800", height="316" %}

For cross-origin usage, an iframe needs the `allow` attribute in the tag to gain access to the feature.

Syntax: `<iframe src="[ORIGIN]" allow="[FEATURE] <'src' | [ORIGIN(s)]"></iframe>`

For example:

```html
<iframe src="https://trusted-site.example" allow="geolocation">
```

{% Aside %}
The syntax `allow="geolocation"` is a shorthand for allow="geolocation 'src'". src is a special token that expands into the origin of the iframe's `src` attribute. 
{% endAside %} 

#### Handling iframe navigation

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/Y7RGrm7k7ysTtKfLvhO4.png", alt="Iframe navigation setup", width="500", height="283" %}

By default, if an iframe navigates to another origin, the policy is not applied to the origin that the iframe navigates to. By listing the origin that the iframe navigates to in the `allow` attribute, the Permissions Policy that was applied to the original iframe will be applied to the origin the iframe navigates to. 

```html
<iframe src="https://trusted-site.example" allow="geolocation https://trusted-site.example https://trusted-navigated-site.example">
```

You can see it in action by visiting the [iframe navigation demo](https://permissions-policy-demo.glitch.me/demo/nav-allowed).

## Example Permissions Policy setups

The examples of the following setups can be found in the [demo](https://permissions-policy-demo.glitch.me/demo/).

### Feature allowed on all origins

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/uzpMbPWgvHjJwF4TTAIG.png", alt="Architecture of all origins allowed to access the feature", width="800", height="491" %}

```text
Permissions-Policy: geolocation=*
```

```html
<iframe src="https://trusted-site.example" allow="geolocation">
<iframe src="https://ad.example" allow="geolocation">
```

When the origin list is set to the `*` token, the feature is allowed for all origins present on the page, including itself and all iframes. In this example, all code served from `https://your-site.example` and the codes served from `https://trusted-site.example` iframe and `https://ad.example` have access to the geolocation feature in the user's browser. Remember that the allow attribute must also be set on the iframe itself along with adding the origin to the header origin list. 

This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/all-allowed). 

### Feature allowed on same-origin only

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qMXplbgF43NkktDHgyec.png", alt="Architecture of only same origin allowed to access the feature", width="800", height="490" %}

```text
Permissions-Policy: geolocation=(self)
```

Using the `self` token allows geolocation usage to the same-origin only. Cross-origins will not have access to the feature. In this example, only `https://trusted-site.example` (`self`) will have access to geolocation. Utilize this syntax if you want the feature only for your page and no one else. 

This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/same-allowed). 

### Feature allowed on same-origin and specific cross-origins

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/txgnW1b0dQRvnxhrjnGZ.png", alt="Architecture of specified origins allowed to access the feature", width="683", height="429" %}

```text
Permissions-Policy: geolocation=(self "https://trusted-site.example")
```

This syntax allows the usage of geolocation to both self (`https://your-site.example`) and `https://trusted-site.example`. Remember to explicitly add the allow attribute to the iframe tag. If there is another iframe with `<iframe src="https://ad.example" allow="geolocation">`, then `https://ad.example` will not have access to the geolocation feature. Only the original page and `https://trusted-site.example` that is listed in the origin list along with having the allow attribute in the iframe tag will have access to the user's feature. 

This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/some-allowed). 

### Feature blocked on all origins

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/QplbQpjXOSnZxMBlNeLN.png", alt="Architecture of all origins blocked from accessing the feature", width="682", height="421" %}

```text
Permissions-Policy: geolocation=()
```

With an empty origin list, the feature is blocked for all origins. This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/none-allowed). 

{% Aside 'gotchas' %}
It isn't possible to allow the feature for embedded cross-origins if the feature is blocked for same-origin. Since the permissions applied to the parent page are delegated to the embedded iframes, the feature must be enabled for same-origin if the feature is to be allowed for cross-origins.
{% endAside %}

## Use the JavaScript API

The existing JavaScript API of Feature Policy is found as an object on either the document or the element (`document.featurePolicy or element.featurePolicy`). The JavaScript API for Permissions Policy has not been implemented yet.

The Feature Policy API can be used for policies set by Permissions Policy, with some limitations. There are [remaining questions](https://github.com/w3c/webappsec-permissions-policy/issues/401) regarding a JavaScript API implementation, and a [proposal](https://github.com/w3c/webappsec-permissions-policy/issues/401#issuecomment-824878596) has been made to move the logic into the [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API). Join the discussion if you have any thoughts. 

### featurePolicy.allowsFeature(feature)

* Returns `true` if the feature is allowed for the default-origin usage. 
* The behavior is the same for both policies set by Permissions Policy and the previous Feature Policy
* When `allowsFeature()` is called on an iframe element (`iframeEl.featurePolicy.allowsFeature('geolocation')`), the returned value reflects if the allow attribute is set on the iframe

### featurePolicy.allowsFeature(feature, origin)

* Returns `true` if the feature is allowed for the specified origin. 
* If the method is called on `document`, this method no longer tells you whether the feature is allowed for the specified origin like Feature Policy did. Now, this method tells you that it's possible for the feature to be allowed to that origin. You must conduct an additional check of whether the iframe has the `allow` attribute set or not. The developer must conduct an additional check for the `allow` attribute on the iframe element to determine if the feature is allowed for the third-party origin. 

#### Check for features in an iframe with the  `element` object

You can use `element.allowsFeature(feature)` that takes the allow attribute into account unlike `document.allowsFeature(feature, origin)` that does not. 

```js
const someIframeEl = document.getElementById('some-iframe')
const isCameraFeatureAllowed = someIframeEl.featurePolicy.allowsFeature('camera')
```

### featurePolicy.allowedFeatures()

* Returns a list of features allowed for the default-origin usage.
* The behavior is the same for both policies set by Permissions Policy and Feature Policy
* When the associated node is an iframe, the allow attribute is taken into account.

### featurePolicy.features()

* Returns a list of features available in the browser.
* The behavior is the same for both policies set by Permissions Policy and Feature Policy

## Chrome DevTools integration

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/BBe4KFDoiYEkWApctsOE.png", alt="Chrome DevTools integration with Permissions Policy", width="800", height="446" %}

Check out how Permissions Policy works in DevTools.

1. [Open Chrome DevTools](/docs/devtools/open/#elements).
2. Open the **Application** panel to check the allowed features and disallowed features of each frame.
3. In the sidebar, select the frame that you want to inspect. You will be presented with a list of features that the selected frame is allowed to use and a list of features that are blocked in that frame. 

## Migration from Feature-Policy

If you are currently using the `Feature-Policy` header, you can implement the following steps to migrate to Permissions Policy.

### Replace Feature Policy headers with Permissions Policy headers

Since the Feature Policy headers are only supported in Chromium-based browsers, and Permissions Policy headers are supported since [Chrome 88](https://chromestatus.com/feature/5745992911552512), it is safe to update the existing headers with Permissions Policy.

{% Compare 'worse', 'old' %}
```text
Feature-Policy:
  autoplay *;
  geolocation 'self';
  camera 'self' 'https://trusted-site.example';
  fullscreen 'none';	
```
  {% CompareCaption %}
    Before with Feature Policy.
  {% endCompareCaption %}
{% endCompare %}

{% Compare 'better', 'new' %}
```text
Permissions-Policy: 
  autoplay=*,
  geolocation=(self),
  camera=(self "https://trusted-site.example"),
  fullscreen=()
```
  {% CompareCaption %}
    Now with Permissions Policy.
  {% endCompareCaption %}
{% endCompare %}

### Update `document.allowsFeature(feature, origin)` usage

If you are using `document.allowsFeature(feature, origin)` method to check allowed features for iframes, use `allowsFeature(feature)` method attached on the iframe element, and not the containing `document`. The method `element.allowsFeature(feature)` accounts for the allow attribute while `document.allowsFeature(feature, origin)` does not.  

#### Checking feature access with `document`

To continue using `document` as the base node, then you must conduct an additional check for the `allow` attribute on the iframe tag. 

```html
<iframe id="some-iframe" src="https://example.com" allow="camera"></iframe>
```

```text
Permissions-Policy: camera=(self "https://example.com")
```

```js
const isCameraPolicySet = document.featurePolicy.allowsFeature('camera', 'https://example.com') 

const someIframeEl = document.getElementById('some-iframe')
const hasCameraAttributeValue = someIframeEl.hasAttribute('allow') 
&& someIframeEl.getAttribute('allow').includes('camera')

const isCameraFeatureAllowed = isCameraPolicySet && hasCameraAttributeValue
```

Instead of updating the existing code using `document`, it's recommended to call `allowsFeature()` on the `element` object like the previous example.

## Reporting API

The [Reporting API](https://web.dev/reporting-api/) provides a reporting mechanism for web applications in a consistent manner, and Reporting API for Permissions Policy violations is available as an experimental feature.

If you would like to test the experimental feature, follow the [walkthrough](https://web.dev/reporting-api/#use-devtools) and enable the flag in `chrome://flags/#enable-experimental-web-platform-features`. With the flag enabled, you can observe Permissions Policy violations in DevTools under the Application tab:

The following example shows how the Reporting API header may be constructed: 

```text
Reporting-Endpoints: main-endpoint="https://reports.example/main", default="https://reports.example/default"

Content-Security-Policy: script-src 'self'; object-src 'none'; report-to main-endpoint;
Document-Policy: document-write=?0; report-to=main-endpoint;
```

In the current implementation, you can receive policy violation reports from any violations occurring within that frame by configuring an endpoint named 'default' like the example above. Subframes will require their own reporting configuration. 

{% Aside %}
If you would like to see Permissions Policy support in the Reporting API by default, [add your support or comments to the discussion](https://github.com/w3c/webappsec-permissions-policy/issues/386).
{% endAside %}

## Find out more

For a deeper understanding of Permissions Policy, refer to the following resources: 

* [Permissions Policy specs](https://www.w3.org/TR/permissions-policy-1/)
* [Permissions Policy explainer](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md)
* A list of [policy-controlled features](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md).
