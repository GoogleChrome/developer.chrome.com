---
layout: 'layouts/doc-post.njk'
title: 'Register attribution triggers'
subhead: >
  Learn how to register attribution triggers to count your conversions.
description: >
  Learn how to register attribution triggers to count your conversions.
date: 2022-12-15
updated: 2023-06-29
authors:
  - maudn
---

An **attribution trigger** is the event that tells the browser to capture conversions.

By following the steps in this document, you can register triggers to register conversions that the browser then attributes to the relevant source events—namely, ad impressions or ad clicks.

## Registration methods

To register triggers, use HTML elements or JavaScript calls:

-  `<a>` tag
-  `<img>` tag
-  `<script>` tag
-  `fetch` call
-  `XMLHttpRequest`
-  `window.open`

This generates network requests that you then respond to with a trigger registration HTTP response header.

## Register a trigger to attribute a conversion

Registering a trigger is similar to
[registering an attribution source event](http://localhost:8080/docs/privacy-sandbox/attribution-reporting/register-attribution-source/). The [complete steps](#step-1-initiate-the-trigger-registration) are described later. Here's the summary:

1. **Initiate the trigger registration.** Use a pixel or a `fetch()` call to make
    a request.
1. **Complete the trigger registration** by responding with the trigger
    registration header. 
      <br><br>

   
    Upon receiving the pixel request—sent either to the
    endpoint defined in the usual `src` attribute, or to the endpoint defined
    in `attributionsrc` if you've chosen to use `attributionsrc` and given it
    a value—respond with the header `Attribution-Reporting-Register-Trigger`.
      <br><br>

    In this header, specify the trigger data you want surfaced in
    reports ultimately. Any response can set this header. As long as it's a
    response to a request made from a site that matches the `destination`,
    sources will be matched. When the header is received, the
    browser looks for matching sources and schedules a report.
    

    {% Aside %}
    When the browser receives an attribution trigger response from an attributionsrc URL on a given page, a local storage lookup is done to find a source that matches both the attributionsrc origin and that page URL's eTLD+1.
    <br>
    If multiple sources are found, the browser picks the one that was stored most recently—unless sources have different priorities, in which the browser picks the one with the greatest priority. 
    {% endAside %}

### Dealing with subdomains

If `destination` is `https://advertiser.example`, conversions on both
`https://advertiser.example` and its subdomains, such as `https://shop.advertiser.example` can be attributed. <br>

If `destination` is `https://shop.advertiser.example`, conversions on both `https://advertiser.example` and
`https://shop.advertiser.example` can be attributed.


## Required and optional attributes

As you use HTML elements or make JavaScript calls to register triggers, you
may need to use `attributionsrc`
or `attributionReporting`. Refer to the following table for details on when these are
required.

When `attributionsrc` is **optional**, using it indicates that the request is eligible for Attribution Reporting. If you use
`attributionsrc`, the browser sends the
`Attribution-Reporting-Eligible` header. It's also useful for app-to-web
measurement: if `attributionsrc` is present, the browser sends the 
`Attribution-Reporting-Support` header.

<table>
  <thead>
    <tr>
      <th>Registration method</th>
     
      <th><strong>Trigger</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;a></code> tag</td>
      <td><em>N/A</em> 
<em>Anchors cannot register a trigger.</em></td>
    </tr>
    <tr>
      <td><code>&lt;img></code> tag</td>
      <td><code>attributionsrc</code> is <strong>optional. </strong>The header
is sufficient to register a trigger.</td>
    </tr>
    <tr>
      <td><code>&lt;script></code> tag</td>
      <td><code>attributionsrc</code> is <strong>optional</strong>. The header
is sufficient to register a trigger.</td>
    </tr>
    <tr>
      <td><code>fetch</code> call</td>
      <td>The <code>attributionReporting</code> option is 
<strong>required</strong>.</td>
    </tr>
    <tr>
      <td><code>XMLHttpRequest</code>
      </td>
      <td>The <code>attributionReporting</code> option is 
<strong>required</strong>.</td>
    </tr>
    <tr>
      <td><code>window.open()</code>
      </td>
      <td><em>N/A</em> 
<em><code>window.open</code> cannot register a trigger.</em></td>
    </tr>
  </tbody>
</table>

### Step 1: Initiate the trigger registration

You can register a trigger using a pixel (`<img>` tag) or script tag.

#### Using existing conversion pixels

```html
<img src="..." width="1" height="1">
```

{% Aside 'important' %}
*   The origin for src must match the origin that performed source registration. 
*   An attribution can only be triggered on a page whose [eTLD+1](https://web.dev/same-site-same-origin/#%22schemeful-same-site%22) matches the site that was provided in destination upon source registration. 
{% endAside %}

#### Using a script tag

You can perform trigger registration with a script tag; it behaves identically to `<img>`. The following code samples illustrate the use of `fetch()` and `XMLHttpRequest()` (XHR).

This code effectively simulates what an HTML request with `attributionsrc` would do:

```javascript
// With fetch
const attributionReporting = {
  eventSourceEligible: false,
  triggerEligible: true,
};

// Optionally set keepalive to ensure the request outlives the page.
window.fetch("https://adtech.example/attribution_source?my_ad_id=123", 
  { keepalive: true, attributionReporting });
```

```javascript
// With XMLHttpRequest:
const attributionReporting = {
  eventSourceEligible: false,
  triggerEligible: true,
};

const req = new XMLHttpRequest();
  req.open('GET', url);
  req.setAttributionReporting(
      attributionReporting);
  req.send();
```

{% Aside 'important' %}
- The origin for <code>src</code> must match the origin that performed
source registration. 
- An attribution can only be triggered on a page whose <a
href="https://web.dev/same-site-same-origin/#%22schemeful-same-site%22">eTLD+1</a>
matches the site that was provided in <code>destination</code> upon source
registration.
{% endAside %}

#### `attributionsrc` with or without a value

You can add `attributionsrc` either with or without a value.

```html
<!-- Without a value -->
<img src="..." width="1" height="1" attributionsrc>

<!--With a value (URL) -->
<img src="..." width="1" height="1" attributionsrc="https://...">
```

If you set a value for `attributionsrc`, it should be a single URL. 

Using a URL causes the browser to initiate a **separate** keepalive fetch request—one
for each URL—which includes the `Attribution-Reporting-Eligible` request
header.

This is useful if you want to make the source registration by responding to a
request that is separate from the element's main request.  

For example, if you need to register sources for clicks on an anchor element,
you may not actually be in control of the destination; in this case, you'll want
a configuration whereby you send the source registration header as a response to a request
that is separate from the navigation, and that you can completely control. By
specifying an explicit value for `attributionsrc`, you're instructing the
browser to make that extra request and configuring its destination.


### Step 2: Respond with a header 

Upon receiving the browser request, respond and include in your response the `Attribution-Reporting-Register-Trigger` header:

```javascript
JSON.stringify({event_trigger_data: [{
      trigger_data: '412444888111012',
      // Optional
      priority: '1000000000000',
	deduplication_key: '2345698765'
    }], debug_key: '1115698977'})
```

{% Aside 'caution' %}
The event_trigger_data field value must be nested in square brackets, because the browser expects a JSON array. This is useful for filters.
{% endAside %}

## Next steps

Learn how to [Register attribution sources](/docs/privacy-sandbox/attribution-reporting/register-attribution-source/).
