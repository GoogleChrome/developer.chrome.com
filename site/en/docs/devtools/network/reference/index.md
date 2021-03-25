---
layout: "layouts/doc-post.njk"
title: "Network features reference"
authors:
  - kaycebasques
date: 2015-04-13
#updated: YYYY-MM-DD
description: "A comprehensive reference of Chrome DevTools Network panel features."
---

Discover new ways to analyze how your page loads in this comprehensive reference of Chrome DevTools
network analysis features.

{% Aside %}

**Note:** This reference is based on Chrome 58. If you use another version of Chrome, the UI and
features of DevTools may be different. Check `chrome://help` to see what version of Chrome you're
running.

{% endAside %}

## Record network requests {: #record }

By default, DevTools records all network requests in the Network panel, so long as DevTools is open.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/62R1WFVGgPSfnWi6EJcd.png", alt="The Network panel.", width="800", height="562" %}

**Figure 1**. The Network panel

### Stop recording network requests {: #stop-recording }

To stop recording requests:

- Click **Stop recording network log**
  {% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/20E6CLcSzNV2GELQu7oC.png", alt="Stop recording network", width="18", height="18" %}
  on the Network panel. It turns grey to indicate that DevTools is no longer recording requests.
- Press Command+E (Mac) or Control+E (Windows, Linux) while the Network panel is in focus.

### Clear requests {: #clear }

Click **Clear**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SUPMgMoG5s0cLAe1yKEd.png", alt="Clear", width="26", height="26" %}
on the Network panel to clear all requests from the Requests table.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/IZwN127NS4ZHwAJ4QJNx.svg", alt="The Clear button.", width="606", height="900" %}

**Figure 2**. Clear, outlined in blue

### Save requests across page loads {: #preserve-log }

To save requests across page loads, check the **Preserve log** checkbox on the Network panel.
DevTools saves all requests until you disable **Preserve log**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9xALh1ItognWtTexZzRv.svg", alt="The Preserve Log checkbox.", width="606", height="450" %}

**Figure 3**. The Preserve Log checkbox, outlined in blue

### Capture screenshots during page load {: #screenshots }

Capture screenshots to analyze what users see as they wait for your page to load.

To enable screenshots, click **Capture screenshots**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/MzwAIIiGa9ZOUqfsCBaj.png", alt="Capture screenshots", width="26", height="16" %}
on the Network panel. It turns blue when enabled.

Reload the page while the Network panel is in focus to capture screenshots.

Once captured, you can interact with screenshots in the following ways:

- Hover over a screenshot to view the point at which that screenshot was captured. A yellow line
  appears on the Overview pane.
- Click a screenshot's thumbnail to filter out any requests that occurred after the screenshot was
  captured.
- Double-click a thumbnail to zoom in on it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/cqE56LuAWj7R8H3xFCXt.png", alt="Hovering over a screenshot.", width="800", height="509" %}

**Figure 4**. Hovering over a screenshot. The yellow, vertical line in the Overview pane and the
Waterfall represent the time at which the screenshot was captured.

### Replay XHR request {: #replay-xhr }

To replay an XHR request, right-click the request in the Requests table and select **Replay XHR**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/q78sXBNcIyDKpzm3nQja.png", alt="Selecting Replay XHR.", width="800", height="625" %}

**Figure 5**. Selecting Replay XHR

## Change loading behavior {: #change_loading_behavior }

### Emulate a first-time visitor by disabling the browser cache {: #disable-cache }

To emulate how a first-time user experiences your site, check the **Disable cache** checkbox.
DevTools disables the browser cache. This more accurately emulates a first-time user's experience,
because requests are served from the browser cache on repeat visits.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/04bkZSC2b8Dsi0eE7H0J.svg", alt="The Disable Cache checkbox.", width="606", height="450" %}

**Figure 6**. The Disable Cache checkbox, outlined in blue

#### Disable the browser cache from the Network Conditions drawer {: #disable-cache-network-conditions }

If you want to disable the cache while working in other DevTools panels, use the Network Conditions
drawer.

1.  Open the [Network Conditions drawer][1].
2.  Check or uncheck the **Disable cache** checkbox.

### Manually clear the browser cache {: #clear-cache }

To manually clear the browser cache at any time, right-click anywhere in the Requests table and
select **Clear Browser Cache**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/m8T2kha4f43D1ipWIVWj.png", alt="Selecting Clear Browser Cache.", width="800", height="596" %}

**Figure 7**. Selecting Clear Browser Cache

### Emulate offline {: #offline }

There's a new class of web apps, called [Progressive Web Apps][2], which can function offline with
the help of [service workers][3]. When you're building this type of app, it's useful to be able to
quickly simulate a device that has no data connection.

Check the **Offline** checkbox to simulate a completely offline network experience.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2GrWegpdEJMfsnEYNkq6.svg", alt="The Offline checkbox", width="684", height="450" %}

**Figure 8**. The Offline checkbox, outlined in blue

### Emulate slow network connections {: #throttling }

Emulate 2G, 3G, and other connection speeds from the **Network Throttling** menu.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7LD09urCKiCrkJcsYhiA.svg", alt="The Network Throttling menu.", width="753", height="450" %}

**Figure 9**. The Network Throttling menu, outlined in blue

You can select from a variety of presets, such as Regular or Good 2G. You can also add your own
custom presets by opening the Network Throttling menu and selecting **Custom** > **Add**.

DevTools displays a warning icon next to the **Network** tab to remind you that throttling is
enabled.

#### Emulate slow network connections from the Network Conditions drawer {: #throttling-network-conditions }

If you want to throttle the network connection while working in other DevTools panels, use the
Network Conditions drawer.

1.  Open the [Network Conditions drawer][4].
2.  Select your desired connection speed from the **Network Throttling** menu.

### Manually clear browser cookies {: #clear-cookies }

To manually clear browser cookies at any time, right-click anywhere in the Requests table and select
**Clear Browser Cookies**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GJpOkjNwoZTgr4VnFlC4.png", alt="Selecting Clear Browser Cookies.", width="800", height="597" %}

**Figure 10**. Selecting Clear Browser Cookies

### Override the user agent {: #user-agent }

To manually override the user agent:

1.  Open the [Network Conditions drawer][5].
2.  Uncheck **Select automatically**.
3.  Choose a user agent option from the menu, or enter a custom one in the text box.

## Filter requests {: #filter }

### Filter requests by properties {: #filter-by-property }

Use the **Filter** text box to filter requests by properties, such as the domain or size of the
request.

If you can't see the text box, the Filters pane is probably hidden. See [Hide the Filters pane][6].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/oCVPgkalqEC6p9WWbaPu.svg", alt="The Filters text box.", width="684", height="450" %}

**Figure 11**. The Filters text box, outlined in blue

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
  in `.com`. DevTools shows a populates the autocomplete dropdown menu with all of the domains it
  has encountered.
- `has-response-header`. Show the resources that contain the specified HTTP response header.
  DevTools populates the autocomplete dropdown with all of the response headers that it has
  encountered.
- `is`. Use `is:running` to find `WebSocket` resources.
- `larger-than`. Show resources that are larger than the specified size, in bytes. Setting a value
  of `1000` is equivalent to setting a value of `1k`.
- `method`. Show resources that were retrieved over a specified HTTP method type. DevTools populates
  the autocomplete dropdown with all of the HTTP methods it has encountered.
- `mime-type`. Show resources of a specified MIME type. DevTools populates the autocomplete dropdown
  with all MIME types it has encountered.
- `mixed-content`. Show all mixed content resources (`mixed-content:all`) or just the ones that are
  currently displayed (`mixed-content:displayed`).
- `priority`. Show resources whose priority level matches the specified value.
- `resource-type`. Show resources of a resource type, e.g. image. DevTools populates the
  autocomplete dropdown with all resource types it has encountered.
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
  populates the autocomplete dropdown menu with all of the status codes it has encountered.
- `url`. Show the resources that have a `url` matching the specified value.

### Filter requests by type {: #filter-by-type }

To filter requests by request type, click the **XHR**, **JS**, **CSS**, **Img**, **Media**,
**Font**, **Doc**, **WS** (WebSocket), **Manifest**, or **Other** (any other type not listed here)
buttons on the Network panel.

If you can't see these buttons, the Filters pane is probably hidden. See [Hide the Filters
pane][11].

To enable multiple type filters simultaneously, hold Command (Mac) or Control (Windows, Linux) and
then click.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/EOVhAQmzNZXNSrvMwXv5.png", alt="Using the Type filters to display JS, CSS, and Document resources.", width="800", height="421" %}

**Figure 12**. Using the Type filters to display JS, CSS, and Doc\[ument\] resources.

### Filter requests by time {: #filter-by-time }

Click and drag left or right on the Overview pane to only display requests that were active during
that time frame. The filter is inclusive. Any request that was active during the highlighted time is
shown.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/HasYhu7GxWfIp5Jq4ASn.png", alt="Filtering out any requests that weren't active around 2500ms.", width="800", height="511" %}

**Figure 13**. Filtering out any requests that weren't active around 2500ms

### Hide data URLs {: #hide_data_urls }

[Data URLs][12] are small files embedded into other documents. Any request that you see in the
Requests table that starts with `data:` is a data URL.

Check the **Hide data URLs** checkbox to hide these requests.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hz8BXb9YlYLhCGarY12J.svg", alt="The Hide Data URLs checkbox.", width="705", height="450" %}

**Figure 14**. The Hide Data URLs checkbox

## Sort requests {: #sort_requests }

By default, the requests in the Requests table are sorted by initiation time, but you can sort the
table using other criteria.

### Sort by column {: #sort-by-column }

Click the header of any column in the Requests to sort requests by that column.

### Sort by activity phase {: #sort-by-activity }

To change how the Waterfall sorts requests, right-click the header of the Requests table, hover over
**Waterfall**, and select one of the following options:

- **Start Time**. The first request that was initiated is at the top.
- **Response Time**. The first request that started downloading is at the top.
- **End Time**. The first request that finished is at the top.
- **Total Duration**. The request with the shortest connection setup and request / response is at
  the top.
- **Latency**. The request that waited the shortest time for a response is at the top.

These descriptions assume that each respective option is ranked from shortest to longest. Clicking
on the **Waterfall** column's header reverses the order.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tJOhr2jBQWy2CdKHDlUl.png", alt="Sorting the Waterfall by total duration.", width="800", height="525" %}

**Figure 15**. Sorting the Waterfall by total duration. The lighter portion of each bar is time
spent waiting. The darker portion is time spent downloading bytes.

## Analyze requests {: #analyze }

So long as DevTools is open, it logs all requests in the Network panel. Use the Network panel to
analyze requests.

### View a log of requests {: #requests }

Use the Requests table to view a log of all requests made while DevTools has been open. Clicking or
hovering over requests reveals more information about them.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/aUR3bbt8luG6r5p2WIuP.svg", alt="The Requests table.", width="684", height="450" %}

**Figure 16**. The Requests table, outlined in blue

The Requests table displays the following columns by default:

- **Name**. The filename of, or an identifier for, the resource.
- **Status**. The HTTP status code.
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

Right-click the header of the Requests table and select an option to hide or show it. Currently
displayed options have checkmarks next to them.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hGwBQqVdg2QGM6aSzFdj.png", alt="Adding a column to the Requests table.", width="800", height="722" %}

**Figure 17**. Adding a column to the Requests table.

#### Add custom columns {: #custom-columns }

To add a custom column to the Requests table, right-click the header of the Requests table and
select **Response Headers** > **Manage Header Columns**.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7zoqb5aU14tK8jiNMgQw.png", alt="Adding a custom column to the Requests table.", width="800", height="669" %}

**Figure 18**. Adding a custom column to the Requests table.

### View the timing of requests in relation to one another {: #waterfall }

Use the Waterfall to view the timing of requests in relation to one another. By default, the
Waterfall is organized by the start time of the requests. So, requests that are farther to the left
started earlier than those that are farther to the right.

See [Sort by activity phase][14] to see the different ways that you can sort the Waterfall.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/3I6fk1zlTDXx5J6hRaOJ.png", alt="The Waterfall column of the Requests pane.", width="800", height="556" %}

**Figure 19**. The Waterfall column of the Requests pane.

### Analyze the frames of a WebSocket Connection {: #frames }

To view the frames of a WebSocket connection:

1.  Click the URL of the WebSocket connection, under the **Name** column of the Requests table.
2.  Click the **Frames** tab. The table shows the last 100 frames.

To refresh the table, re-click the name of the WebSocket connection under the **Name** column of the
Requests table.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/QgftKdIKE6NqaFwlZAVc.svg", alt="The Frames tab.", width="657", height="450" %}

**Figure 20**. The Frames tab, outlined in blue

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

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Preview** tab.

This tab is mostly useful for viewing images.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/v3bEdPqabJ8vxsXfsboK.svg", alt="The Preview tab.", width="705", height="450" %}

**Figure 21**. The Preview tab, outlined in blue

### View a response body {: #response }

To view the response body to a request:

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Response** tab.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/th1QacW6EGUpityje3Rk.svg", alt="The Response tab.", width="705", height="450" %}

**Figure 22**. The Response tab, outlined in blue

### View HTTP headers {: #headers }

To view HTTP header data about a request:

1.  Click on the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Headers** tab.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Zv6sbHi6fZfZMWufSp75.svg", alt="The Headers tab.", width="684", height="450" %}

**Figure 23**. The Headers tab, outlined in blue

#### View HTTP header source {: #header-source }

By default, the Headers tab shows header names alphabetically. To view the HTTP header names in the
order they were received:

1.  Open the **Headers** tab for the request you're interested in. See [View HTTP headers][15].
2.  Click **view source**, next to the **Request Header** or **Response Header** section.

### View query string parameters {: #query-string }

To view the query string parameters of a URL in a human-readable format:

1.  Open the **Headers** tab for the request you're interested in. See [View HTTP headers][16].
2.  Go to the **Query String Parameters** section.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/B5QMjpRJZ72xKQ3uWLlh.svg", alt="The Query String Parameters section.", width="684", height="450" %}

**Figure 24**. The Query String Parameters section, outlined in blue

#### View query string parameters source {: #query-string-source }

To view the query string parameter source of a request:

1.  Go to the Query String Parameters section. See [View query string parameters][17].
2.  Click **view source**.

#### View URL-encoded query string parameters {: #query-string-encodings }

To view query string parameters in a human-readable format, but with encodings preserved:

1.  Go to the Query String Parameters section. See [View query string parameters][18].
2.  Click **view URL encoded**.

### View cookies {: #cookies }

To view the cookies sent in a request's HTTP header:

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Cookies** tab.

See [Fields][19] for a description of each of the columns.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/y2W5yVOMWqgL8ZE1Lklh.svg", alt="The Cookies tab.", width="744", height="450" %}

**Figure 25**. The Cookies tab, outlined in blue

### View the timing breakdown of a request {: #timing }

To view the timing breakdown of a request:

1.  Click the URL of the request, under the **Name** column of the Requests table.
2.  Click the **Timing** tab.

See [Preview a timing breakdown][20] for a faster way to access this data.

See [Timing breakdown phases explained][21] for more information about each of the phases that you
may see in the Timing tab.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/yDJ70NF49BREe9kHD7pw.svg", alt="The Timing tab.", width="615", height="450" %}

**Figure 26**. The Timing tab, outlined in blue

Here's more information about each of the phases.

See [View timing breakdown][22] for another way to access this view.

#### Preview a timing breakdown {: #timing-preview }

To view a preview of the timing breakdown of a request, hover over the request's entry in the
**Waterfall** column of the Requests table.

See [View the timing breakdown of a request][23] for a way to access this data that does not require
hovering.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c7kf94kHB11kK5AyYyMn.png", alt="Previewing the timing breakdown of a request.", width="800", height="556" %}

**Figure 27**. Previewing the timing breakdown of a request

#### Timing breakdown phases explained {: #timing-explanation }

Here's more information about each of the phases you may see in the Timing tab:

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
- **Content Download**. The browser is receiving the response.
- **Receiving Push**. The browser is receiving data for this response via HTTP/2 Server Push.
- **Reading Push**. The browser is reading the local data previously received.

### View initiators and dependencies {: #initiators-dependencies }

To view the initiators and dependencies of a request, hold Shift and hover over the request in the
Requests table. DevTools colors initiators green, and dependencies red.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JiZisZ4UmarOjo5cAwf3.png", alt="Viewing the initiators and dependencies of a request.", width="800", height="568" %}

**Figure 28**. Viewing the initiators and dependencies of a request

When the Requests table is ordered chronologically, the first green request above the request that
you're hovering over is the initiator of the dependency. If there's another green request above
that, that higher request is the initiator of the initiator. And so on.

### View load events {: #load }

DevTools displays the timing of the `DOMContentLoaded` and `load` events in multiple places on the
Network panel. The `DOMContentLoaded` event is colored blue, and the `load` event is red.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FzH6gwuHgXuGnasATVOH.svg", alt="The locations of the DOMContentLoaded and load events on the Network panel.", width="585", height="450" %}

**Figure 29**. The locations of the `DOMContentLoaded` and `load` events in the Network panel

### View the total number of requests {: #total-number }

The total number of requests is listed in the Summary pane, at the bottom of the Network panel.

{% Aside "caution" %}

**Caution:** This number only tracks requests that have been logged since DevTools was opened. If
other requests occurred before DevTools was opened, those requests aren't counted.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Ce9YHacO35q8t5wbmFp9.svg", alt="The total number of requests since DevTools was opened", width="705", height="450" %}

**Figure 30**. The total number of requests since DevTools was opened

### View the total download size {: #total-size }

The total download size of requests is listed in the Summary pane, at the bottom of the Network
panel.

{% Aside "caution" %}

**Caution:** This number only tracks requests that have been logged since DevTools was opened. If
other requests occurred before DevTools was opened, those requests aren't counted.

{% endAside %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hlTa0Pu0GRSTt1yuantk.svg", alt="The total download size of requests", width="705", height="450" %}

**Figure 31**. The total download size of requests

See [View the uncompressed size of a resource][25] to see how large resources are after the browser
uncompresses them.

### View the stack trace that caused a request {: #initiator-stack-trace }

When a JavaScript statement causes a resource to be requested, hover over the **Initiator** column
to view the stack trace leading up to the request.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tAENLxUdEAUkxHpAysBL.png", alt="The stack trace leading up to a resource request", width="800", height="455" %}

**Figure 32**. The stack trace leading up to a resource request

### View the uncompressed size of a resource {: #uncompressed }

Click **Use Large Request Rows**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lvgZdF4HI4aDB451wS5G.png", alt="Use Large Request Rows", width="28", height="20" %}
and then look at the bottom value of the **Size** column.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OkTz8xZwi0zVh2GWltnE.png", alt="An example of uncompressed resources.", width="800", height="478" %}

**Figure 33**. The compressed size of the `jquery-bundle.js` file that was sent over the network was
`30.9 KB`, whereas the uncompressed size was `86.3 KB`

## Export requests data {: #export }

### Save all network requests to a HAR file {: #save-as-har }

To save all network requests to a HAR file:

1.  Right-click any request in the Requests table.
2.  Select **Save as HAR with Content**. DevTools saves all requests that have occurred since you
    opened DevTools to the HAR file. There is no way to filter requests, or to save just a single
    request.

Once you've got a HAR file, you can import it back into DevTools for analysis. Just drag-and-drop
the HAR file into the Requests table. See also [HAR Analyzer][26].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FjVMRBNwMyIlkUElRzYI.png", alt="Selecting Save as HAR with Content.", width="800", height="490" %}

**Figure 34**. Selecting **Save as HAR with Content**

### Copy one or more requests to the clipboard {: #copy }

Under the **Name** column of the Requests table, right-click a request, hover over **Copy**, and
select one of the following options:

- **Copy Link Address**. Copy the request's URL to the clipboard.
- **Copy Response**. Copy the response body to the clipboard.
- **Copy as cURL**. Copy the request as a cURL command.
- **Copy All as cURL**. Copy all requests as a chain of cURL commands.
- **Copy All as HAR**. Copy all requests as HAR data.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FCQLdbRS9UMc4eFHzYvI.png", alt="Selecting Copy Response.", width="800", height="514" %}

**Figure 35**. Selecting Copy Response

## Change the layout of the Network panel {: #change_the_layout_of_the_network_panel }

Expand or collapse sections of the Network panel UI to focus on what's important to you.

### Hide the Filters pane {: #hide-filters }

By default, DevTools shows the [Filters pane][27]. Click **Filter**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/BmGbqXVYxIY2kwgbNmsp.png", alt="Filter", width="28", height="24" %}
to hide it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/zN18ngzI6ejSpoKMYKJG.svg", alt="The Hide Filters button", width="705", height="450" %}

**Figure 36**. Hide Filters, outlined in blue

### Use large request rows {: #request-rows }

Use large rows when you want more whitespace in your network requests table. Some columns also
provide a little more information when using large rows. For example, the bottom value of the
**Size** column is the uncompressed size of a request.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OkTz8xZwi0zVh2GWltnE.png", alt="An example of large request rows in the Requests pane.", width="800", height="478" %}

**Figure 37**. An example of large request rows in the Requests pane

Click **Use large request rows**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lvgZdF4HI4aDB451wS5G.png", alt="Use large request rows", width="28", height="20" %}
to enable large rows.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/inNDJZFVu1zUQ4jz1XhV.svg", alt="The Large Request Rows button", width="705", height="450" %}

**Figure 38**. Large Request Rows, outlined in blue

### Hide the Overview pane {: #hide-overview }

By default, DevTools shows the [Overview pane][28]. Click **Hide overview**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Ghte2yf6yUoWNtBfUY6c.png", alt="Hide overview", width="34", height="22" %}
to hide it.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SjuObPgFeP2thIv8NWem.svg", alt="The Hide Overview button", width="705", height="450" %}

**Figure 39**. Hide Overview, outlined in blue

[1]: #network-conditions
[2]: https://web.dev/progressive-web-apps
[3]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
[4]: #network-conditions
[5]: #network-conditions
[6]: #hide-filters
[7]: https://developer.mozilla.org/en-US/docs/web/http/headers/set-cookie#attributes
[8]: https://developer.mozilla.org/en-US/docs/web/http/headers/set-cookie#attributes
[9]: https://developer.mozilla.org/en-US/docs/web/http/headers/set-cookie#attributes
[10]: https://developer.mozilla.org/en-US/docs/web/http/headers/set-cookie#attributes
[11]: #hide-filters
[12]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
[13]: #waterfall
[14]: #sort-by-activity
[15]: #headers
[16]: #headers
[17]: #query-string
[18]: #query-string
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
