---
layout: "layouts/doc-post.njk"
title: "Network features reference"
authors:
  - kaycebasques
  - sofiayem
date: 2015-04-13
updated: 2023-04-03
description: "A comprehensive reference of Chrome DevTools Network panel features."
---

Discover new ways to analyze how your page loads in this comprehensive reference of Chrome DevTools
network analysis features.

## Record network requests {: #record }

By default, DevTools records all network requests in the **Network** panel, so long as DevTools is open.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/h90CtfziXluvh1LSSKJE.png", alt="The Network panel.", width="800", height="470" %}

### Stop recording network requests {: #stop-recording }

To stop recording requests:

- Click **Stop recording network log**
  {% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/20E6CLcSzNV2GELQu7oC.png", alt="Stop recording network.", width="18", height="18" %}
  on the **Network** panel. It turns grey to indicate that DevTools is no longer recording requests.
- Press <kbd>Command</kbd>> + <kbd>E</kbd> (Mac) or <kbd>Control</kbd> + <kbd>E</kbd> (Windows, Linux) while the **Network** panel is in focus.

### Clear requests {: #clear }

Click **Clear**
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MadqZsIZpo1sj3qQ3GsZ.svg", alt="Clear.", width="24", height="24" %}
on the **Network** panel to clear all requests from the **Requests** table.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2P2L80XfBoFWJFxU9TpK.png", alt="The Clear button.", width="800", height="470" %}

### Save requests across page loads {: #preserve-log }

To save requests across page loads, check the **Preserve log** checkbox on the **Network** panel.
DevTools saves all requests until you disable **Preserve log**.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/JrR2GlPhEO8LgHd3X9mS.mp4", autoplay="false", controls="true", muted="true", class="screenshot"%}

### Capture screenshots during page load {: #screenshots }

Capture screenshots to analyze what users see as they wait for your page to load.

To enable screenshots, open **Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} inside the **Network** panel and check **Capture screenshots**.

Reload the page while the **Network** panel is in focus to capture screenshots.

Once captured, you can interact with screenshots in the following ways:

- Hover over a screenshot to view the point at which that screenshot was captured. A yellow line
  appears on the Overview pane.
- Click a screenshot's thumbnail to filter out any requests that occurred after the screenshot was
  captured.
- Double-click a thumbnail to zoom in on it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TRFujw0pi0nHF3GwDuRn.png", alt="Capture screenshots enabled.", width="800", height="571" %}

### Replay XHR request {: #replay-xhr }

To replay an XHR request, do one of the following in the **Requests** table:

- Select the request and press <kbd>R</kbd>.
- Right-click the request and select **Replay XHR**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AFacMOgv6D0CFTr6U5e8.png", alt="Selecting Replay XHR.", width="800", height="496" %}

## Change loading behavior {: #change_loading_behavior }

### Emulate a first-time visitor by disabling the browser cache {: #disable-cache }

To emulate how a first-time user experiences your site, check the **Disable cache** checkbox.
DevTools disables the browser cache. This more accurately emulates a first-time user's experience,
because requests are served from the browser cache on repeat visits.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QTDnaY32hLDipeRW8e3O.png", alt="The Disable Cache checkbox.", width="800", height="497" %}

#### Disable the browser cache from the Network conditions drawer {: #disable-cache-network-conditions }

If you want to disable the cache while working in other DevTools panels, use the **Network conditions**
drawer.

1.  Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7oHKETDhf3c0SFRrLyVi.png", alt="Network conditions.", width="25", height="20" %} icon to open the **Network Conditions** drawer.
2.  Check or uncheck the **Disable cache** checkbox.

### Manually clear the browser cache {: #clear-cache }

To manually clear the browser cache at any time, right-click anywhere in the **Requests** table and
select **Clear browser cache**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4pIMBj7zOAk1y5Agmmoj.png", alt="Selecting Clear Browser Cache.", width="800", height="497" %}

### Emulate offline {: #offline }

There's a new class of web apps, called [Progressive Web Apps][2], which can function offline with
the help of [service workers][3]. When you're building this type of app, it's useful to be able to
quickly simulate a device that has no data connection.

To simulate a completely offline network experience, select **Offline** from the **Network throttling** drop-down menu next to the **Disable cache** checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lHvzbNUlrm2Mvd4H1Ywc.png", alt="Offline selected from the drop-down menu.", width="800", height="620" %}

DevTools displays a warning icon next to the **Network** tab to remind you that offline is enabled.

### Emulate slow network connections {: #throttling }

To emulate slow 3G, fast 3G, and other connection speeds, select the corresponding options from the **Throttling** menu.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VSk4XiLkW8TZBCPFzSmE.png", alt="The Network Throttling menu.", width="800", height="620" %}

DevTools displays a warning icon next to the **Network** tab to remind you that throttling is enabled.

#### Create custom throttling profiles {: #throttling-profile}

In addition to presets, such as slow or fast 3G, you can also add your own
custom throttling profiles:

1. Open the **Throttling** menu and select **Custom** > **Add...**.
1. Set up a new throttling profile as described in [**Settings** > **Throttling**](/docs/devtools/settings/#throttling).
1. Back on the **Network** panel, select your new profile from the **Throttling** drop-down menu.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UnSmIJe1OEp98TkLFlUE.png", alt="A custom profile selected from the throttling menu. The Network panel displays a warning icon.", width="800", height="464" %}

DevTools displays a {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/jsbv7jCK4GsRjL6e8RcF.svg", alt="Warning.", width="24", height="24" %} warning icon next to the **Network** panel to remind you that throttling is enabled.

#### Throttle WebSocket connections {: #throttle-websocket}

In addition to HTTP requests, DevTools throttles WebSocket connections since version 99.

To observe WebSocket throttling:

1. Initiate a new connection, for example, by using a [test tool](https://www.piesocket.com/websocket-tester).
1. On the **Network** panel, select **No throttling** and send a message through the connection.
1. Create a very slow [custom throttling profile](#throttling-profile), for example, `10 kbit/s`. Such a slow profile will help you notice the difference.
1. On the **Network** panel, select the profile and send another message.
1. Toggle the **WS** filter, click your connection name, open the **Messages** tab, and check the time difference between sent and echoed messages with and without throttling. For example:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tqynaMk7SIL6oIYwuBgM.png", alt="Messages sent and echoed with and without throttling.", width="800", height="694" %}

#### Emulate slow network connections from the Network conditions drawer {: #throttling-network-conditions }

If you want to throttle the network connection while working in other DevTools panels, use the
**Network conditions** drawer.

1.  Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7oHKETDhf3c0SFRrLyVi.png", alt="Network conditions.", width="25", height="20" %} icon to open the **Network Conditions** drawer.
2.  Select your desired connection speed from the **Network throttling** menu.

### Manually clear browser cookies {: #clear-cookies }

To manually clear browser cookies at any time, right-click anywhere in the **Requests** table and select
**Clear browser cookies**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4mVbTicUyxwkmd5TB1HS.png", alt="Selecting Clear Browser Cookies.", width="800", height="497" %}

### Override HTTP response headers {: #override-headers }

See [Override files and HTTP response headers locally](/docs/devtools/overrides/#override-headers).

### Override the user agent {: #user-agent }

To manually override the user agent:

1.  Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7oHKETDhf3c0SFRrLyVi.png", alt="Network conditions.", width="25", height="20" %} icon to open the **Network Conditions** drawer.
2.  Uncheck **Select automatically**.
3.  Choose a user agent option from the menu, or enter a custom one in the text box.

## Filter requests {: #filter }

### Filter requests by properties {: #filter-by-property }

Use the **Filter** text box to filter requests by properties, such as the domain or size of the
request.

If you can't see the text box, the Filters pane is probably hidden. See [Hide the Filters pane][6].

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eAaEpNrTCSg41cEP8cmZ.png", alt="The Filters text box and Invert checkbox.", width="800", height="497" %}

To invert your filter, check the **Invert** checkbox next to the **Filter** text box.

You can use multiple properties simultaneously by separating each property with a space. For
example, `mime-type:image/gif larger-than:1K` displays all GIFs that are larger than one kilobyte.
These multi-property filters are equivalent to AND operations. OR operations are currently not
supported.

Below is a complete list of supported properties.

- `cookie-domain`. Show the resources that set a specific [cookie domain][7].
- `cookie-name`. Show the resources that set a specific [cookie name][8].
- `cookie-path`. Show the resources that set a specific [cookie path][9].
- `cookie-value`. Show the resources that set a specific [cookie value][10].
- `domain`. Only display resources from the specified domain. You can use a wildcard character (`*`)
  to include multiple domains. For example, `*.com` displays resources from all domain names ending
  in `.com`. DevTools shows a populates the autocomplete drop-down menu with all of the domains it
  has encountered.
- `has-response-header`. Show the resources that contain the specified HTTP response header.
  DevTools populates the autocomplete drop-down with all of the response headers that it has
  encountered.
- `is`. Use `is:running` to find `WebSocket` resources.
- `larger-than`. Show resources that are larger than the specified size, in bytes. Setting a value
  of `1000` is equivalent to setting a value of `1k`.
- `method`. Show resources that were retrieved over a specified HTTP method type. DevTools populates
  the autocomplete drop-down with all of the HTTP methods it has encountered.
- `mime-type`. Show resources of a specified MIME type. DevTools populates the autocomplete drop-down
  with all MIME types it has encountered.
- `mixed-content`. Show all mixed content resources (`mixed-content:all`) or just the ones that are
  currently displayed (`mixed-content:displayed`).
- `priority`. Show resources whose priority level matches the specified value.
- `resource-type`. Show resources of a resource type, e.g. image. DevTools populates the
  autocomplete drop-down with all resource types it has encountered.
- `response-header-set-cookie`. Show raw Set-Cookie headers in the Issues tab. Malformed cookies
  with incorrect `Set-Cookie` headers will be flagged in the Network panel.
- `scheme`. Show resources retrieved over unprotected HTTP (`scheme:http`) or protected HTTPS
  (`scheme:https`).
- `set-cookie-domain`. Show the resources that have a `Set-Cookie` header with a `Domain` attribute
  that matches the specified value. DevTools populates the autocomplete with all of the cookie
  domains that it has encountered.
- `set-cookie-name`. Show the resources that have a `Set-Cookie` header with a name that matches the
  specified value. DevTools populates the autocomplete with all of the cookie names that it has
  encountered.
- `set-cookie-value`. Show the resources that have a `Set-Cookie` header with a value that matches
  the specified value. DevTools populates the autocomplete with all of the cookie values that it has
  encountered.
- `status-code`. Only show resources whose HTTP status code match the specified code. DevTools
  populates the autocomplete drop-down menu with all of the status codes it has encountered.
- `url`. Show the resources that have a `url` matching the specified value.

### Filter requests by type {: #filter-by-type }

To filter requests by request type, click the **All**, **Fetch/XHR**, **JS**, **CSS**, **Img**, **Media**,
**Font**, **Doc**, **WS** (WebSocket), **Wasm** (WebAssembly), **Manifest**, or **Other** (any other type not listed here)
buttons on the **Network** panel.

If you can't see these buttons, the Filters pane is probably hidden. See [Hide the Filters
pane][11].

To enable multiple type filters simultaneously, hold <kbd>Command</kbd> (Mac) or <kbd>Control</kbd> (Windows, Linux) and
then click.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qyaC96XHbPxdAmKTdKLR.png", alt="Using the Type filters to display JS, CSS, and Document resources.", width="800", height="470" %}

### Filter requests by time {: #filter-by-time }

Click and drag left or right on the **Overview** pane to display only the requests that were active during
that time frame. The filter is inclusive. Any request that was active during the highlighted time is
shown.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/z4WdOID7XreBRKtpSLSq.png", alt="Filtering out any requests that weren't active around 21-25 ms.", width="800", height="449" %}

### Hide data URLs {: #hide_data_urls }

[Data URLs][12] are small files embedded into other documents. Any request that you see in the
**Requests** table that starts with `data:` is a data URL.

Check the **Hide data URLs** checkbox to hide these requests.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Y3TDa8EhT6gARFcLFwKf.png", alt="The Hide Data URLs checkbox.", width="800", height="514" %}

The status bar at the bottom displays the number of the shown requests out of the total.

## Sort requests {: #sort_requests }

By default, the requests in the **Requests** table are sorted by initiation time, but you can sort the
table using other criteria.

### Sort by column {: #sort-by-column }

Click the header of any column in the **Requests** table to sort requests by that column.

### Sort by activity phase {: #sort-by-activity }

To change how the **Waterfall** sorts requests, right-click the header of the Requests table, hover over
**Waterfall**, and select one of the following options:

- **Start Time**. The first request that was initiated is at the top.
- **Response Time**. The first request that started downloading is at the top.
- **End Time**. The first request that finished is at the top.
- **Total Duration**. The request with the shortest connection setup and request / response is at
  the top.
- **Latency**. The request that waited the shortest time for a response is at the top.

These descriptions assume that each respective option is ranked from shortest to longest. Clicking
on the **Waterfall** column's header reverses the order.

In this example, the **Waterfall** is sorted by total duration. The lighter portion of each bar is time
spent waiting. The darker portion is time spent downloading bytes.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uZ9aJ5DdZR91THhaVYD5.png", alt="Sorting the Waterfall by total duration.", width="800", height="655" %}

## Analyze requests {: #analyze }

So long as DevTools is open, it logs all requests in the **Network** panel. Use the **Network** panel to
analyze requests.

### View a log of requests {: #requests }

Use the **Requests** table to view a log of all requests made while DevTools has been open. Clicking or
hovering over requests reveals more information about them.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0lULFSOjRlz3L83HPcKX.png", alt="The Requests table.", width="800", height="514" %}

The Requests table displays the following columns by default:

- **Name**. The filename of, or an identifier for, the resource.
- **Status**. This column can show the following values:
  - HTTP status code, for example, `200` or `404`.
  - [`CORS error`](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors) for requests failed due to Cross-Origin Resource Sharing (CORS).
  - Generic `(failed)` or `(blocked:origin)` for other requests.
- **Type**. The MIME type of the requested resource.
- **Initiator**. The following objects or processes can initiate requests:
  - **Parser**. Chrome's HTML parser.
  - **Redirect**. An HTTP redirect.
  - **Script**. A JavaScript function.
  - **Other**. Some other process or action, such as navigating to a page via a link or entering a
    URL in the address bar.
- **Size**. The combined size of the response headers plus the response body, as delivered by the
  server.
- **Time**. The total duration, from the start of the request to the receipt of the final byte in
  the response.
- [**Waterfall**][13]. A visual breakdown of each request's activity.

#### Add or remove columns {: #columns }

Right-click the header of the **Requests** table and select an option to hide or show it. Currently
displayed options have check marks next to them.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/zgkV5JsQ7MDYgkWL889O.png", alt="Adding a column to the Requests table.", width="800", height="684" %}

#### Add custom columns {: #custom-columns }

To add a custom column to the **Requests** table:

1. Right-click the header of the **Requests** table and select **Response Headers** > **Manage Header Columns**.
1. In the dialog window, click **Add custom header**, enter its name, and click **Add**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sCXdKBGzlfwQBBeyNdta.png", alt="Adding a custom column to the Requests table.", width="800", height="563" %}

### Group requests by inline frames {: #group-by-frames }

If inline frames on a page initiate a lot of requests, you can make the request log frendlier by grouping them.

To group requests by iframes, open **Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} inside the **Network** panel and check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group by frame**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QgdViJaRvfWo8suAE6a6.png", alt="The network request log with requests grouped by iframes.", width="800", height="702" %}

To view a request initiated by an inline frame, expand it in the request log.

### View the timing of requests in relation to one another {: #waterfall }

Use the **Waterfall** to view the timing of requests in relation to one another. By default, the
**Waterfall** is organized by the start time of the requests. So, requests that are farther to the left
started earlier than those that are farther to the right.

See [Sort by activity phase][14] to see the different ways that you can sort the **Waterfall**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/saFyvknJ8gVDOH2aiHwD.png", alt="The Waterfall column of the Requests pane.", width="800", height="620" %}

### Analyze the messages of a WebSocket connection {: #frames }

To view the messages of a WebSocket connection:

1.  Under the **Name** column of the **Requests** table, click the URL of the WebSocket connection.
2.  Click the **Messages** tab. The table shows the last 100 messages.

To refresh the table, re-click the name of the WebSocket connection under the **Name** column of the
**Requests** table.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8Ieh1BTg2ezYNAKS3p2q.png", alt="The Messages tab.", width="800", height="453" %}

The table contains three columns:

- **Data**. The message payload. If the message is plain text, it's displayed here. For binary
  opcodes, this column displays the opcode's name and code. The following opcodes are supported:
  Continuation Frame, Binary Frame, Connection Close Frame, Ping Frame, and Pong Frame.
- **Length**. The length of the message payload, in bytes.
- **Time**. The time when the message was received or sent.

Messages are color-coded according to their type:

- Outgoing text messages are light-green.
- Incoming text messages are white.
- WebSocket opcodes are light-yellow.
- Errors are light-red.

### View a preview of a response body {: #preview }

To view a preview of a response body:

1.  Click the URL of the request, under the **Name** column of the **Requests** table.
2.  Click the **Preview** tab.

This tab is mostly useful for viewing images.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/91J6iI0F1RkJZEXBysdR.png", alt="The Preview tab.", width="800", height="508" %}

### View a response body {: #response }

To view the response body to a request:

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Response** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KDZZBMl2isErxrNSY0gQ.png", alt="The Response tab.", width="800", height="479" %}

### View HTTP headers {: #headers }

To view HTTP header data about a request:

1.  Click on the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Headers** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0l9iRxK3yvrnha53NiKH.png", alt="The Headers tab.", width="800", height="469" %}

#### View HTTP header source {: #header-source }

By default, the **Headers** tab shows header names alphabetically. To view the HTTP header names in the
order they were received:

1.  Open the **Headers** tab for the request you're interested in. See [View HTTP headers][15].
2.  Click **view source**, next to the **Request Header** or **Response Header** section.


#### Provisional headers warning {: #provisional-headers }

Sometimes the **Headers** tab shows the `Provisional headers are shown...` warning message. This may be due to the following reasons:

- The request wasn't sent over the network but was served from a local cache, which doesn't store the original request headers. In this case, you can [disable caching](#disable-cache) to see the full request headers.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AQfq69qS2Ig6lT9Y7vcc.png", alt="Provisional headers warning message.", width="800", height="517" %}

- The network resource isn't valid. For example, execute `fetch("https://jec.fish.com/unknown-url/")` in the **Console**.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xMKUHQxXLiRDiiUTol5J.png", alt="Provisional headers warning message.", width="800", height="517" %}

DevTools can also display only provisional headers due to security reasons.

### View request payload {: #payload }

To view the request's payload, that is, its query string parameters and form data, select a request from the **Requests** table and open the **Payload** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/CphRGKa7PnCOQtaTcUiP.png", alt="The Payload tab.", width="800", height="570" %}

#### View payload source {: #payload-source }

By default, DevTools shows the payload in a human-readable form.

To view the sources of query string parameters and form data, on the **Payload** tab, click **view source** next to the **Query String Parameters** or **Form Data** sections.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/H7hbmfoT9PSUezdmHNyH.png", alt="The view source buttons.", width="800", height="570" %}

#### View URL-decoded arguments of query string parameters {: #payload-encodings }

To toggle URL-encoding for arguments, on the **Payload** tab, click **view decoded** or **view URL-encoded**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gLU4MbYYgb80DfHKd52R.png", alt="Toggle URL-encoding.", width="800", height="570" %}

### View cookies {: #cookies }

To view the cookies sent in a request's HTTP header:

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Cookies** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/y55aBxOJQCA4cOERdvXJ.png", alt="The Cookies tab.", width="800", height="286" %}

For a description of each of the columns, see [Fields][19].

To modify cookies, see [View, edit, and delete cookies](/docs/devtools/storage/cookies).

### View the timing breakdown of a request {: #timing }

To view the timing breakdown of a request:

1.  Click the URL of the request, under the **Name** column of the **Requests** table.
2.  Click the **Timing** tab.

See [Preview a timing breakdown][20] for a faster way to access this data.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/gN0L0udjKqdP6BDaLKlH.png", alt="The Timing tab.", width="800", height="666" %}

See [Timing breakdown phases explained][21] for more information about each of the phases that you
may see in the **Timing** tab.

#### Preview a timing breakdown {: #timing-preview }

To view a preview of the timing breakdown of a request, hover over the request's entry in the
**Waterfall** column of the Requests table.

See [View the timing breakdown of a request][23] for a way to access this data that does not require
hovering.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7KlTSfkZgbfcXNviw9dm.png", alt="Previewing the timing breakdown of a request.", width="800", height="666" %}

#### Timing breakdown phases explained {: #timing-explanation }

Here's more information about each of the phases you may see in the **Timing** tab:

- **Queueing**. The browser queues requests when:
  - There are higher priority requests.
  - There are already six TCP connections open for this origin, which is the limit. Applies to
    HTTP/1.0 and HTTP/1.1 only.
  - The browser is briefly allocating space in the disk cache
- **Stalled**. The request could be stalled for any of the reasons described in **Queueing**.
- **DNS Lookup**. The browser is resolving the request's IP address.
- **Initial connection**. The browser is establishing a connection, including TCP handshakes/retries
  and negotiating an SSL.
- **Proxy negotiation**. The browser is negotiating the request with a [proxy server][24].
- **Request sent**. The request is being sent.
- **ServiceWorker Preparation**. The browser is starting up the service worker.
- **Request to ServiceWorker**. The request is being sent to the service worker.
- **Waiting (TTFB)**. The browser is waiting for the first byte of a response. TTFB stands for Time
  To First Byte. This timing includes 1 round trip of latency and the time the server took to
  prepare the response.
- **Content Download**. The browser is receiving the response, either directly from the network or from a service worker. This value is the total amount of time spent reading the response body. Larger than expected values could indicate a slow network, or that the browser is busy performing other work which delays the response from being read.
- **Receiving Push**. The browser is receiving data for this response via HTTP/2 Server Push.
- **Reading Push**. The browser is reading the local data previously received.

### View initiators and dependencies {: #initiators-dependencies }

To view the initiators and dependencies of a request, hold <kbd>Shift</kbd> and hover over the request in the
Requests table. DevTools colors initiators green, and dependencies red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mZ595sGwSfA6lZMzWbXy.png", alt="Viewing the initiators and dependencies of a request.", width="800", height="388" %}

When the **Requests** table is ordered chronologically, the first green request above the request that
you're hovering over is the initiator of the dependency. If there's another green request above
that, that higher request is the initiator of the initiator. And so on.

### View load events {: #load }

DevTools displays the timing of the `DOMContentLoaded` and `load` events in multiple places on the
**Network** panel. The `DOMContentLoaded` event is colored blue, and the `load` event is red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3PdgVRzrO1ujiTIHrx1B.png", alt="The locations of the DOMContentLoaded and load events on the Network panel.", width="800", height="476" %}

### View the total number of requests {: #total-number }

The total number of requests is listed in the **Summary** pane, at the bottom of the **Network** panel.

{% Aside "caution" %}

**Caution:** This number only tracks requests that have been logged since DevTools was opened. If
other requests occurred before DevTools was opened, those requests aren't counted.

{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/20mIck1GaPzmjeHtrnbd.png", alt="The total number of requests since DevTools was opened.", width="800", height="428" %}

### View the total size of transferred and loaded resources {: #total-size }

DevTools lists the total size of transferred and loaded (uncompressed) resources in the **Summary** pane, at the bottom of the **Network** panel.

{% Aside "caution" %}

**Caution:** This number only tracks requests that have been logged since DevTools was opened. If
other requests occurred before DevTools was opened, those requests aren't counted.

{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2oSUzbdlzdwgvsgeRQr6.png", alt="The total size of transferred and loaded resources.", width="800", height="428" %}

See [View the uncompressed size of a resource][25] to see how large resources are after the browser uncompresses them.

### View the stack trace that caused a request {: #initiator-stack-trace }

When a JavaScript statement causes a resource to be requested, hover over the **Initiator** column
to view the stack trace leading up to the request.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/x4z1d0vaP4Copn4Bqb4R.png", alt="The stack trace leading up to a resource request.", width="800", height="439" %}

### View the uncompressed size of a resource {: #uncompressed }

Check **Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} > **Use large request rows** and then look at the bottom value of the **Size** column.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/na2zXsl9y3f8FqYcdMsT.png", alt="An example of uncompressed resources.", width="800", height="500" %}

In this example, the compressed size of the `www.google.com` document that was sent over the network was
`43.8 KB`, whereas the uncompressed size was `136 KB`.

## Export requests data {: #export }

### Save all network requests to a HAR file {: #save-as-har }

[HAR (HTTP Archive)][26] is a file format used by several HTTP session tools to export the captured data. The format is a JSON object with a particular set of fields.

You can save all network requests to a HAR file in two ways:

- Right-click any request in the **Requests** table and select **Save all as HAR with content**.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X4lTWJrOAasUtZwD20BT.png", alt="Selecting Save all as HAR with content.", width="800", height="455" %}
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XEd84LBN4Rjoj6WUnpg2.svg", alt="Export.", width="24", height="24" %} **Export HAR** in the action bar at the top of the **Network** panel.
  {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JaytyulU4VllFs9yH5B0.png", alt="The Export HAR button in the action bar at the top.", width="800", height="528" %}

{% Aside %}
**Note**: DevTools exports all requests that have occurred since you opened DevTools to the HAR file. You can't filter requests to export. To save a single request, see [Copy one or more requests to the clipboard](#copy).
{% endAside %}

Once you have a HAR file, you can import it back into DevTools for [analysis][26] in two ways:

- Drag-and-drop the HAR file into the **Requests** table.
- Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oiUyFA6HRhsKOpUyaq0g.svg", alt="Import.", width="24", height="24" %} **Import HAR** in the action bar at the top of the **Network** panel.

{% Aside %}
**Note**: The **Network** panel reads and shows [initiators](/docs/devtools/network/reference/#requests) for the requests imported from HAR files.
{% endAside %}

### Copy one or more requests to the clipboard {: #copy }

Under the **Name** column of the Requests table, right-click a request, hover over **Copy**, and
select one of the following options:

- **Copy link address**. Copy the request's URL to the clipboard.
- **Copy file name**. Copy the file's name to the clipboard.
- **Copy response**. Copy the response body to the clipboard.
- **Copy as PowerShell**. Copy the request as a PowerShell command.
- **Copy as fetch**. Copy the request as a fetch call.
- **Copy as Node.js fetch**. Copy the request as a Node.js fetch call.
- **Copy as cURL**. Copy the request as a cURL command.
- **Copy all as PowerShell**. Copy all requests as a chain of PowerShell commands.
- **Copy all as fetch**. Copy all requests as a chain of fetch calls.
- **Copy all as Node.js fetch**. Copy all requests as a chain of Node.js fetch calls.
- **Copy all as cURL**. Copy all requests as a chain of cURL commands.
- **Copy all as HAR**. Copy all requests as HAR data.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/R9WBfJe2pdJihGYfcDbV.png", alt="Selecting Copy options.", width="800", height="455" %}

## Change the layout of the Network panel {: #change_the_layout_of_the_network_panel }

Expand or collapse sections of the **Network** panel UI to focus on what's important to you.

### Hide the Filters pane {: #hide-filters }

By default, DevTools shows the [Filters pane][27]. Click **Filter**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BmGbqXVYxIY2kwgbNmsp.png", alt="Filter.", width="28", height="24" %}
to hide it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/5OSQ3dUijdXDHsj9iZIA.png", alt="The Hide Filters button.", width="800", height="498" %}

### Use large request rows {: #request-rows }

Use large rows when you want more whitespace in your network requests table. Some columns also
provide a little more information when using large rows. For example, the bottom value of the
**Size** column is the uncompressed size of a request.

Open **Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} and click **Use large request rows** to enable large rows.

{% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/rhXHHi7yxFm6IqiwQ7C3.png",
  alt="The use large request rows checkbox.", width="800", height="614" %}

### Hide the Overview pane {: #hide-overview }

By default, DevTools shows the [Overview pane][28]. Open **Settings** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} and uncheck the **Show
overview** checkbox to hide it.

{% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/uWWJfuFbpiClEFjPTdVD.png",
  alt="The show overview checkbox.", width="800", height="614" %}

[1]: #network-conditions
[2]: https://web.dev/progressive-web-apps
[3]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[4]: #network-conditions
[5]: #network-conditions
[6]: #hide-filters
[7]: https://developer.mozilla.org/docs/web/http/headers/set-cookie#attributes
[8]: https://developer.mozilla.org/docs/web/http/headers/set-cookie#attributes
[9]: https://developer.mozilla.org/docs/web/http/headers/set-cookie#attributes
[10]: https://developer.mozilla.org/docs/web/http/headers/set-cookie#attributes
[11]: #hide-filters
[12]: https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
[13]: #waterfall
[14]: #sort-by-activity
[15]: #headers
[16]: #headers
[17]: #payload
[18]: #payload
[19]: /docs/devtools/storage/cookies/#fields
[20]: #timing-preview
[21]: #timing-explanation
[22]: #timing
[23]: #timing
[24]: https://en.wikipedia.org/wiki/Proxy_server
[25]: #uncompressed
[26]: https://toolbox.googleapps.com/apps/har_analyzer/
[27]: #filter
[28]: #overview
