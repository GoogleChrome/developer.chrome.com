---
layout: 'layouts/doc-post.njk'
title: 'Register attribution sources'
subhead: >
  Learn how to register sources to attribute clicks and views to the appropriate events.
description: >
  Learn how to register sources to attribute clicks and views to the appropriate events.
date: 2022-12-15
updated: 2023-06-29
authors:
  - maudn
---

An **attribution source** is an ad-related event (a click or view), to which an ad tech can attach the following kinds of information:
  - Contextual reporting data, such as the ad creative ID, information about the campaign, or geography.
  - A conversion destination, as in the site where you expect the user to convert.

By following the steps in this document, you can register sources—ad impressions or clicks—to which the browser then attributes conversions.
## Registration methods

To register attribution sources, use HTML elements or JavaScript calls:

-  `<a>` tag
-  `<img>` tag
-  `<script>` tag
-  `fetch` call
-  `XMLHttpRequest`
-  `window.open`

This generates network requests you then respond to with a source
registration HTTP response header.

## Register sources for clicks or views

 To register an attribution source for either clicks or views, follow the steps outlined here. The [complete steps](#step-1-initiate-source-registration) follow. Here's the summary:

1. **Initiate the source registration**. Use an HTML element or a
    JavaScript call to make a request. This step is different for clicks and views, as you'll notice in the following sections.
1. **Complete the source registration** by responding with the source
    registration header. Upon receiving that request, respond with the header
    `Attribution-Reporting-Register-Source`. In that header, specify the
    desired Attribution Reporting configuration. This step is the same for both clicks and views.

### Required and optional attributes

As you use HTML elements or make JavaScript calls to register sources, you
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
      <th><strong>Source</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>&lt;a></code> tag</td>
      <td>(navigation source)<br>
<code>attributionsrc</code> is <strong>required</strong>.</td>
    </tr>
    <tr>
      <td><code>&lt;img></code> tag</td>
      <td>(event source)<br>
<code>attributionsrc</code> is <strong>required</strong>.</td>
    </tr>
    <tr>
  <td><code>&lt;script></code> tag</td>
  <td>(event source)<br>
<code>attributionsrc</code> is <strong>required</strong>.</td>
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
      <td>(navigation source)<br>
<code>attributionsrc</code> is <strong>required.</strong></td>
    </tr>
  </tbody>
</table>


### Step 1: Initiate source registration

Step 1 is different for clicks and views. Open the corresponding tabs for each.


<web-tabs id="tabs">
<web-tab title="Clicks step 1.">
    <p>
    </p>

To register an attribution source for a click, you can use an <code>&lt;a></code> tag or JavaScript
<code>window.open()</code>.

#### Using an anchor

Add `attributionsrc` to existing &lt;a> tags for which you want to measure impressions or clicks:

```html
<a href="https://shoes.example/..." 
  attributionsrc>Click me</a>
```

Review the [example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/views/adtech/ad-click.pug) for more information.


#### Using a script

Call `window.open()` with `attributionsrc`:

```javascript
window.open(
  "https://shoes.example/...",
  "_blank",
  "attributionsrc");
```

To be taken into account, this method must be called within 5 seconds of user interaction.

<p>
Instead of adding <code>attributionsrc</code> by itself, for an image or script you can specify a single URL value:


<pre>
&lt;a href=... attributionsrc="https://a.example/register-source">
</pre>

In the JavaScript case, if you give `attributionsrc` a value, make sure
to encode that URL in case it contains special characters such as '=' that
would cause the parameter to be improperly parsed. 
        
Encode as follows:
<p>

```javascript
const encodedUrl = encodeURIComponent(
  'https://adtech.example/attribution_source?ad_id=...');
window.open(
  "https://shoes.example/landing",
   "_blank",
   attributionsrc=${encodedUrl});
```

`attributionsrc` can also take a space-separated list of URLs as illustrated here with an anchor tag:

```html
<!-- With an anchor tag -->
<a href=... attributionsrc="https://a.example/register-source 
  https://b.example/register-source"> 
```

or as it is here using `window.open()`.

```javascript
// With window.open()
window.open('...', '_blank', attributionsrc=${encodedUrl1}
  attributionsrc=${encodedUrl2})
```

In such cases, both URLs receive `navigation-source-eligible` `attributionsrc`
requests (requests that include the `Attribution-Reporting-Eligible` header).

#### `attributionsrc` with or without a value

As you saw previously, you can specify `attributionsrc` without a URL. You can also specify a
single URL. Additionally, for sources only (not applicable to [triggers](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger/)), you can use a space-separated list of URLs.

Using URLs causes the browser to initiate a **separate** keepalive fetch request—one
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

For step 1 of registering views go to <a href="#tabs">the tabs</a> and select Views step 1.

  </web-tab>
  <web-tab title="Views step 1.">
<p>

To register an attribution source for a view, you can use an image or script tag to which you'll add the `attributionsrc` attribute.

Alternatively, you can use JavaScript `fetch()` or `XMLHttpRequest()`. 

#### With an image


```html
<img attributionsrc
src="https://adtech.example/attribution_source?ad_id=..."/>
```

#### With a script

```html
<script attributionsrc
  src="https://adtech.example/attribution_source?ad_id=..."/>
```
<p>
Optionally, you can specify a URL value for
<code>attributionsrc</code> in the same way as for
clicks; that is, for an image or script , you can set the <code>attributionsrc</code> URL or URLs like so:

With a single URL:

 ```html
 attributionsrc="https://adtech.example/attribution_source?ad_id=123"
 ```

 With a list of URLs:

  ```javascript
  attributionsrc="https://a.example/register-source
    https://b.example/register-source"
  ```


#### Using `fetch()` or `XMLHttpRequest()`

This code effectively simulates what an HTML request with `attributionsrc` would do:

```javascript
// With fetch
const attributionReporting = {
  eventSourceEligible: true,
  triggerEligible: false,
};

// Optionally set keepalive to ensure the request outlives the page.
window.fetch("https://adtech.example/attribution_source?my_ad_id=123", { 
  keepalive: true, attributionReporting });
```


```javascript
// With XHR
const attributionReporting = {
  eventSourceEligible: true,
  triggerEligible: false,
};

const req = new XMLHttpRequest();
  req.open('GET', url);
  req.setAttributionReporting(
    attributionReporting);
  req.send();
```
For step 1 of registering clicks go to <a href="#tabs">the tabs</a> and select Clicks step 1.

  </web-tab>

</web-tabs>

<hr>

### Step 2: Respond with header (clicks and views)

The next step for both clicks and views is to respond with the `Attribution-Reporting-Register-Source` header.

Review the [example code](https://github.com/GoogleChromeLabs/trust-safety-demo/blob/8f3d874b79ab0c8a15822fbcd09e94042aee7dcd/conversion-measurement/functions/apps/adtech.js#L170) for more information.

Upon receiving the browser request on the server, respond and include in
your response the `Attribution-Reporting-Register-Source` header.

```javascript
 res.set(
  'Attribution-Reporting-Register-Source',    
  JSON.stringify({
	// Use source_event_id to map it to any granular information 
  //you need at ad-serving time
      source_event_id: '412444888111012',
      destination: 'https://advertiser.example',
      // Optional fields
      expiry: '604800',
      priority: '100',
	debug_key: '122939999'
    })
 );
```

## Next steps

Learn how to [Register attribution triggers](/docs/privacy-sandbox/attribution-reporting/register-attribution-trigger/).

