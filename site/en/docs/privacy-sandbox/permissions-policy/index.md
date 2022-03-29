---
layout: 'layouts/doc-post.njk'
title: 'Controlling browser features with Permissions Policy'
subhead: >
  Manage how your page and third-party iframes on your page have access to browser features
date: 2022-03-31
authors:
  - kevinkiklee
---

<!--lint disable no-smart-quotes-->


There are numerous features available in the browser that provide important functionality to the user. A video camera allows you to chat with people around the world and GPS enables driving in an unfamiliar neighborhood. Unfortunately, these important features can be misused for malicious purposes that violate user privacy. Developers should have a clear understanding of who has access to browser features, and control that access. 

Permissions Policy allows the developer to control the browser features available to a page and its iframes, by declaring a set of policies for the browser to enforce. The policies are applied to origins provided in a response header origin list. The origins in the origin list can be same-origin (where your code resides) or cross-origin (where someone else’s code resides). 

### Changes from Feature Policy

Permissions Policy has been renamed from Feature Policy. The key concepts remain the same between the two, but there are some important changes along with the name: 

#### Structured Fields usage

[Structured Fields](https://www.rfc-editor.org/rfc/rfc8941.html) provide a set of common data structures to standardize parsing and serialization of HTTP header field values. You can learn more about Structured Fields from the [introduction article](https://www.fastly.com/blog/improve-http-structured-headers).

* Before (Feature Policy):
  * `geolocation ‘self’ https://example.com; camera ‘none’`
* After (Permissions Policy): 
  * `geolocation=(self "https://example.com"), camera=()`

#### The header origin list must be combined with the allow attribute in the iframe tag 

* WIth Feature Policy, you were able to enable the feature to a cross-origin frame by either adding the origin to the header origin list or adding an allow attribute to the iframe tag. With Permissions Policy, if you add a cross-origin to the origin list, the iframe tag for that origin must include the allow attribute.
* If the response does not contain a Permissions Policy header, the origin list is considered to have the default value of `*`, and just adding the allow attribute to the iframe allows access to the feature.
* Therefore, it is recommended that the Permissions Policy header is explicitly set in the response, so that cross-origin iframes that are not listed in the origin list will be blocked from accessing the feature even with an allow attribute in the tag.

Feature Policy can still be used after Chrome 88, but it acts as an alias for Permissions Policy. Other than the syntax, there is no difference in logic between the two. If both Permissions Policy and Feature Policy are used together, the Permissions Policy header will have higher priority, and will overwrite the value provided from the Feature Policy header. 

## Usage

### Quick overview

Before we dive deep, let’s take a quick look at a common scenario where you are the owner of a website and you want to control how your site and third-party code use browser features. 

* Your site is `https://your-site.example`.
* Your site embeds an iframe from same-origin (`https://your-site.example`). 
* Your site embeds an iframe from `https://trusted-site.example` that you trust. 
* Your site also displays ads served by `https://ad.example`. 
* You want to enable the geolocation feature only for your site and the trusted site. 

In this case, use the following header: 
```text
Permissions-Policy: geolocation=(self "https://trusted-site.example")
```

And explicitly set the `allow` attribute in the iframe tag: 
```html
<iframe src="https://trusted-site.example" allow="geolocation">
```
{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/6glnEtP01JOyxOtdephq.png", alt="Quick overview diagram of Permissions Policy usage", width="800", height="238" %}

In this example, the header origin list lets only your site (`self`) and `https://trusted-site.example` to use the geolocation feature. `https://ad.example` is not allowed to use geolocation. 

1. Your site `https://your-site.example` is allowed to use the geolocation feature with the user’s consent.
1. An iframe served from same-origin (`https://your-site.example`) is allowed to use the feature without the usage of the `allow` attribute.
1. An iframe served from a cross-origin (`https://trusted-site.example`) that has been added to the origin list, and also has the `allow` attribute set on the iframe tag is allowed to use the feature.
1. An iframe served from a cross-origin (`https://trusted-site.example`) that has been added to the origin list, but does not have the `allow` attribute set on the iframe tag is blocked from using the feature.
1. An iframe served from a cross-origin (`https://ad.example`) that has not been added to the origin list is blocked from using the feature even with the `allow` attribute on the iframe tag.

### HTTP Header

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/jfhckpPdaepkw8bRPM0G.png", alt="HTTP response header diagram", width="800", height="459" %}

```text
Permissions-Policy: &lt;feature&gt;=(&lt;token&gt;|&lt;origin(s)&gt;)
```

A Permissions-Policy header in the response from the server is used to set the allowed origins for the feature. The header value can take a combination of tokens and strings of origins. The [available tokens](https://w3c.github.io/webappsec-permissions-policy/#structured-header-serialization) are `*` for all origins and `self` for same-origin.

Here are some example key-value pairs:

* Syntax: `[FEATURE]=*` 
  * Policy applied to all origins
  * Example: `geolocation=*`
* Syntax: `[FEATURE]=(self)`
  * Policy applied to same-origin
  * Example: `geolocation=(self)`
* Syntax: `[FEATURE]=([ORIGIN(s)])` 
  * Policy applied to the specified origins
  * Example: `geolocation=("https://a.example" "https://b.example")`
  * In addition to adding the origin to the origin list in the header, the iframe with that origin must set the allow attribute in the tag. The origin list header provides a list of valid origins for the allow attribute to consume. 
* Syntax: `[FEATURE]=(self [ORIGIN(s)])`
  * Policy applied to same origin and the specified origins
  * Example: `geolocation=(self "https://a.example" "https://b.example")`
* Syntax: `[FEATURE]=()` 
  * Feature blocked for all origins
  * Example: `geolocation=()`

{% Aside 'gotchas' %}
Separate multiple features in the header with a comma. Separate multiple origins in the origin list with a space between. 
{% endAside %}

{% Aside 'gotchas' %}
If the Permission Policy header is not present in the response, the default value `*` token is used, which allows all iframes on the page with an `allow` attribute to use the feature. Therefore, it is strongly recommended that the origin list is explicitly set in the Permissions-Policy header to control access. 
{% endAside %}

{% Aside 'gotchas' %}
With the change in Permissions Policy from Feature Policy, just adding the origin in the header origin list is no longer enough to enable the feature for a cross-origin iframe. The iframe must include the allow attribute if it’s a cross-origin regardless of what is set in the header origin list. 
{% endAside %}

### Iframe

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/mD9lgR2lky1kdL8tohHx.png", alt="Iframes setup", width="800", height="316" %}

For cross-origin usage, an iframe needs the `allow` attribute in the tag to gain access to the feature.

Syntax: `<iframe src="[ORIGIN]" allow="[FEATURE] <’src’ | [ORIGIN(s)]"></iframe>`

For example:

```html
<iframe src="https://trusted-site.example" allow="geolocation">
```

{% Aside 'gotchas' %}
The syntax `allow="geolocation"` is a shorthand for allow="geolocation 'src'". src is a special token that expands into the origin of the iframe’s `src` attribute. 
{% endAside %} 

#### Handling iframe navigation

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/Y7RGrm7k7ysTtKfLvhO4.png", alt="Iframe navigation setup", width="500", height="283" %}

By default, if an iframe navigates to another origin, the policy is not applied to the origin that the iframe navigates to. By listing the origin that iframe navigates to in the `allow` attribute, the permissions policy that was applied to the original iframe will be applied to the origin the iframe navigates to. 

```html
<iframe src="https://trusted-site.example" allow="geolocation https://trusted-site.example https://trusted-navigated-site.example">
```

You can see it in action by visiting the iframe [navigation demo](https://permissions-policy-demo.glitch.me/demo/nav-allowed).

## Example setups

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

When the origin list is set to the `*` token, the feature is allowed for all origins present on the page, including itself and all iframes. In this example, all code served from `https://your-site.example` and the codes served from `https://trusted-site.example` iframe and `https://ad.example` have access to the geolocation feature in the user’s browser. Remember that the allow attribute must also be set on the iframe itself along with adding the origin to the header origin list. 

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

This syntax allows the usage of geolocation to both self (`https://your-site.example`) and `https://trusted-site.example`. Remember to explicitly add the allow attribute to the iframe tag. If there is another iframe with `<iframe src="https://ad.example” allow="geolocation">`, then `https://ad.example` will not have access to the geolocation feature. Only the original page and `https://trusted-site.example` that is listed in the origin list along with having the allow attribute in the iframe tag will have access to the user’s feature. 

This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/some-allowed). 

### Feature blocked on all origins

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/QplbQpjXOSnZxMBlNeLN.png", alt="Architecture of all origins blocked from accessing the feature", width="682", height="421" %}

```text
Permissions-Policy: geolocation=()
```

With an empty origin list, the feature is blocked for all origins. This setup can be seen in the [demo](https://permissions-policy-demo.glitch.me/demo/none-allowed). 

## Use the JavaScript API

The existing JavaScript API of Feature Policy is found as an object on either the document or the element (`document.featurePolicy or element.featurePolicy`). The JS API for Permissions Policy has not been implemented yet, and the existing Feature Policy JS API can be used for policies set by Permissions Policy with a limitation. There are [remaining questions](https://github.com/w3c/webappsec-permissions-policy/issues/401) regarding JS API implementation, and a [proposal](https://github.com/w3c/webappsec-permissions-policy/issues/401#issuecomment-824878596) has been made to move the logic into [Permissions API](https://developer.mozilla.org/docs/Web/API/Permissions_API). Join the discussion if you have any thoughts. 

(Default-origin is the origin of the document or the element that the policy is attached to).

### featurePolicy.allowsFeature(feature)

* Returns `true` if the feature is allowed for the default-origin usage. 
* The behavior is the same for both policies set by Permissions Policy and the previous Feature Policy
* When `allowsFeature()` is called on an iframe element (`iframeEl.featurePolicy.allowsFeature(‘geolocation’)`), the returned value reflects if the allow attribute is set on the iframe

### featurePolicy.allowsFeature(feature, origin)

* Returns `true` if the feature is allowed for the specified origin. 
* If the method is called on `document`, this method no longer tells you whether the feature is allowed for the specified origin like Feature Policy did. Now, this method tells you that it’s possible for the feature to be allowed to that origin. You must conduct an additional check of whether the iframe has the `allow` attribute set or not. The developer must conduct an additional check for the `allow` attribute on the iframe element to determine if the feature is allowed for the third-party origin. 

#### Code example with `document`

The following code snippet checks that the allow attribute value contains the string ‘camera’. 

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
  && someIframeEl.getAttribute(‘allow’).includes('camera')

const isCameraFeatureAllowed = isCameraPolicySet && hasCameraAttributeValue
```

#### Better approach for checking iframe feature access

Instead of the above approach, you can use element.allowsFeature(feature) that takes the allow attribute into account unlike document.allowsFeature(feature, origin) that does not. To simplify the code, we can use that to inspect the featurePolicy object on the actual iframe element, rather than checking for that origin from the document. 

```js
const someIframeEl = document.getElementById(‘some-iframe’)
const isCameraFeatureAllowed = someIframeEl.featurePolicy.allowsFeature(‘camera’)
```

### featurePolicy.allowedFeatures()

* Returns a list of features allowed for the default-origin usage.
* The behavior is the same for both policies set by Permissions Policy and Feature Policy
* When the associated node is an iframe, the allow attribute is taken into account.

### featurePolicy.features()

* Returns a list of features available in the browser.
* The behavior is the same for both policies set by Permissions Policy and Feature Policy

## Migration from Feature-Policy

If you are currently using the Feature-Policy header, you can implement the following steps to prepare for Permissions Policy.

### Replace Feature Policy headers with Permissions Policy headers

Since the Feature Policy headers are only supported in Chromium-based browsers, and Permissions Policy headers are supported since [Chrome 88](https://chromestatus.com/feature/5745992911552512), it is safe to update the existing headers with Permissions Policy.

If you have a Feature-Policy header like this:
```text
Feature-Policy:
  autoplay *;
  geolocation ‘self’;
  camera ‘self’ ‘https://trusted-site.example’;
  fullscreen ‘none’;	
```

Update it to the Structured Fields syntax that Permissions Policy header uses:
```text
Permissions-Policy: 
  autoplay=*,
  geolocation=(self),
  camera=(self ‘https://trusted-site.example’),
  fullscreen=()
```

### Update `document.allowsFeature(feature, origin)` usage

If you are using document.allowsFeature(feature, origin) method, use allowsFeature(feature) method attached on the iframe element, and not the containing document. The method element.allowsFeature(feature) accounts for the allow attribute while document.allowsFeature(feature, origin) does not. The sample code is found in the [previous example section](#better-approach-for-checking-iframe-feature-access).

## Reporting API

The [Reporting API](https://web.dev/reporting-api/) provides a reporting mechanism for web applications in a consistent manner, and Reporting API for Permissions Policy violations is available as an experimental feature.

```text
Reporting-Endpoints: main-endpoint="https://reports.example/main", default="https://reports.example/default"

Content-Security-Policy: script-src 'self'; object-src 'none'; report-to main-endpoint;
Document-Policy: document-write=?0; report-to=main-endpoint;
```

In the current implementation, you can receive policy violation reports from any violations occurring within that frame by configuring an endpoint named 'default' like the example above. Subframes will require their own reporting configuration. 

There is currently a discussion regarding its usefulness, and feel free to share your thoughts at the [Reporting API discussion](https://github.com/w3c/webappsec-permissions-policy/issues/386).

## Chrome DevTools integration

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/BBe4KFDoiYEkWApctsOE.png", alt="Chrome DevTools integration with Permissions Policy", width="800", height="446" %}

Check the allowed features and disallowed features of each frame in DevTools under the Application panel. Select the frame in the sidebar that you want to inspect. You will be presented with a list of features that the selected frame is allowed to use, and a list of features that are blocked in that frame. 

## Find out more

For a deeper understanding of Permissions Policy, utilize the following resources: 

* [Permissions Policy specs](https://www.w3.org/TR/permissions-policy-1/)
* [Permissions Policy explainer](https://github.com/w3c/webappsec-permissions-policy/blob/main/permissions-policy-explainer.md)
* [A list of policy controlled features](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md).
