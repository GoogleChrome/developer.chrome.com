---
layout: "layouts/doc-post.njk"
title: "Measure Resource Loading Times"
authors:
  - kaycebasques
  - megginkearney
date: 2015-04-13
updated: 2020-07-10
description: "Measure the network performance of your web application using the Chrome DevTools Network panel."
---

!!!.aside.aside--warning

**Warning:** This page is deprecated. At the top of each section, there's a link to an up-to-date
page where you can find similar information.

!!!

Measure the network performance of your site using the **Network** panel.

The **Network** panel records information about each network operation on a page, including detailed
timing data, HTTP request and response headers, cookies, and more.

## TL;DR {: #tldr }

- Use the Network panel to record and analyze network activity.
- View load information in aggregate or for individual resources.
- Filter and sort how resources are displayed.
- Save, copy, and clear network recordings.
- Customize the Network panel to your needs.

## Network panel overview {: #network_panel_overview }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See following sections for up-to-date information:

- [Controls pane][1]
- [Filters pane][2]
- [Overview pane][3]
- [Requests pane][4]
- [Summary pane][5]

!!!

The Network panel consists of five panes:

1.  **Controls**. Use these options to control how the **Network** panel looks and functions.
2.  **Filters**. Use these options to control which resources are displayed in the **Requests
    Table**. Tip: hold <kbd>Cmd</kbd> (Mac) or <kbd>Ctrl</kbd> (Window/Linux), and then click on a
    filter to select multiple filters at the same time.
3.  **Overview**. This graph shows a timeline of when resources were retrieved. If you see multiple
    bars stacked vertically, it means that those resources were retrieved simultaneously.
4.  **Requests Table**. This table lists out every resource that was retrieved. By default, this
    table is sorted chronologically, with the earliest resources at the top. Clicking on the name of
    a resource yields more information about it. Tip: right-click on any of the table headers except
    **Timeline** to add or remove columns of information.
5.  **Summary**. At a glance this pane tells you the total number of requests, amount of data
    transferred, and load times.

{% Img src="image/admin/hrAt9lxLr9Ui39NuFc8N.png", alt="network panel panes", width="800", height="410" %}

The **Requests Table** displays the following columns by default. You can [add and remove
columns][6].

- **Name**. The name of the resource.
- **Status**. The HTTP status code.
- **Type**. The MIME type of the requested resource.
- **Initiator**. The object or process that initiated the request. It can have one of the following
  values:
  - **Parser**. Chrome's HTML parser initiated the request.
  - **Redirect**. An HTTP redirect initiated the request.
  - **Script**. A script initiated the request.
  - **Other**. Some other process or action initiated the request, such as the user navigating to a
    page via a link, or by entering a URL in the address bar.
- **Size**. The combined size of the response headers (usually a few hundred bytes) plus the
  response body, as delivered by the server.
- **Time**. The total duration, from the start of the request to the receipt of the final byte in
  the response.
- **Timeline**. The Timeline column displays a visual waterfall of all network requests. Clicking
  the header of this column reveals a menu of additional sorting fields.

## Record network activity {: #record_network_activity }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Start or stop recording][7] for up-to-date information.

!!!

When the **Network** panel is open, DevTools records all network activity by default. To record,
just reload a page while the panel is open, or wait for network activity on the currently loaded
page.

You can tell whether or not DevTools is recording via the **record** button. When it's red
({% Img src="image/admin/JrOUQPBj3AR2rbPlz6Us.png", alt="record button on", width="36", height="36" %}), DevTools is recording.
When it's grey ({% Img src="image/admin/lTHzHYK2HjIhzujkWQbV.png", alt="record button off", width="26", height="26" %}),
DevTools is not recording. Click this button to start or stop recording, or press the keyboard
shortcut <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>.

## Capture screenshots during recording {: #filmstrip }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Capture screenshots during recording][8] for up-to-date
information.

!!!

The **Network** panel can capture screenshots during a page load. This feature is known as the
**Filmstrip**.

Click on the **camera** icon to enable the Filmstrip. When the icon is grey, the Filmstrip is
disabled (![filmstrip
disabled](/web/tools/chrome-devtools/network/imgs/filmstrip-disabled.png)).
When the icon is blue, it is enabled
({% Img src="image/admin/NsdIk1xJniWJNXyYnYyr.png", alt="filmstrip enabled", width="36", height="26" %}).

Reload the page to capture the screenshots. The screenshots are displayed above the **Overview**.

{% Img src="image/admin/AU7QLdVkzOKnTIMnFpDi.png", alt="recording with filmstrip", width="800", height="785" %}

When you hover over a screenshot, the **Timeline** displays a vertical yellow line indicating when
the frame was captured.

{% Img src="image/admin/NwsEDx3eLKAK3qrNseYB.png", alt="filmstrip overlay on timeline", width="603", height="463" %}

Double-click on a screenshot to view a zoomed version of the screenshot. While a screenshot is
zoomed, use the left and right arrows of your keyboard to navigate between screenshots.

{% Img src="image/admin/UU6IV81uujlKNvzzGuzO.png", alt="zoomed filmstrip screenshot", width="800", height="746" %}

## View DOMContentLoaded and load event information {: #view_domcontentloaded_and_load_event_information }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [View load events][9] for up-to-date information.

!!!

The **Network** panel highlights two events: [`DOMContentLoaded`][10] and [`load`][11].

`DOMContentLoaded` is fired when the initial markup of a page has been parsed. It is displayed in
two places on the **Network** panel:

1.  The blue vertical bar in the **Overview** pane signifies the event.
2.  In the **Summary** pane you can see the exact time of the event.

{% Img src="image/admin/yCoUaXomSETtioC4mK18.png", alt="DOMContentLoaded event on network panel", width="521", height="408" %}

`load` is fired when a page has fully loaded. It is displayed in three places:

1.  The red vertical bar in the **Overview** pane signifies the event.
2.  The red vertical bar in the **Requests Table** signifies the event, too.
3.  In the **Summary** pane you can see the exact time of the event.

{% Img src="image/admin/jeBgWyebLc72gG5fF1HK.png", alt="load event on network panel", width="448", height="437" %}

## View details for a single resource {: #view_details_for_a_single_resource }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [View details][12] for up-to-date information.

!!!

Click on a resource name (under the **Name** column of the **Requests Table**) to view more
information about that resource.

The tabs available change depending on what type of resource you've selected, but the four tabs
below are most common:

- **Headers**. HTTP headers associated with the resource.
- **Preview**. Previews of JSON, image, and text resources.
- **Response**. HTTP response data (if any).
- **Timing**. A granular breakdown of the request lifecycle for the resource.

{% Img src="image/admin/Ofxk7Dui2KnayPuO60gO.png", alt="viewing details for a single resource", width="800", height="417" %}

### View network timing {: #view_network_timing }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Timing tab][13] for up-to-date information.

!!!

Click the **Timing** tab to view a granular breakdown of the request lifecycle for a single
resource.

The lifecycle shows how much time is spent in the following categories:

- Queuing
- Stalled
- If applicable: DNS lookup, initial connection, SSL handshake
- Request sent
- Waiting (Time to first byte (TTFB))
- Content Download

{% Img src="image/admin/6RUnd9L8yhxp1CBbbXJM.png", alt="timing tab", width="800", height="462" %}

You can also view this same information by hovering your mouse over a resource within the
**Timeline** graph.

{% Img src="image/admin/vxf49R2GItgQml8QibyW.png", alt="timing data for one resource in timeline", width="800", height="458" %}

Related Guides:

- [Understanding Resource Timing][14]

### View HTTP headers {: #view_http_headers }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Headers tab][15] for up-to-date information.

!!!

Clicking the **Headers** shows the headers for that resource.

The **Headers** tab displays the resource's request URL, HTTP method, and response status code.
Additionally, it lists the HTTP response and request headers and their values, and any query string
parameters.

![HTTP headers for a single resource](/web/tools/chrome-devtools/network/imgs/network-headers.png)

You can view response headers, request headers, or query string parameters in source or parsed
format by clicking the `view source` or `view parsed` link next to each section.

{% Img src="image/admin/WX3vXwlhEHYA6Vqtak6G.png", alt="view header source", width="688", height="443" %}

You can also view query string parameters in URL-encoded or decoded format by clicking the
`view URL encoded` or `view decoded` link next to that section.

{% Img src="image/admin/cYsjomXfTDW02AwNzlr5.png", alt="view URL encoded", width="703", height="453" %}

### Preview a resource {: #preview_a_resource }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Preview tab][16] for up-to-date information.

!!!

Click the **Preview** tab to view a preview of that resource. The **Preview** tab may or may not
display any useful information, depending on the type of resource you've selected.

{% Img src="image/admin/xyCjEPOCCaPf2GsqqX3U.png", alt="image resource preview", width="800", height="284" %}

### View HTTP response content {: #view_http_response_content }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Response tab][17] for up-to-date information.

!!!

Click the **Response** tab to view the resource's unformatted HTTP response content. The
**Response** tab may or may not contain any useful information, depending on the type of resource
you've selected.

{% Img src="image/admin/LjPyUw50DPhH9dF4cTtq.png", alt="JSON resource response data", width="798", height="478" %}

### View cookies {: #view_cookies }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Cookies tab][18] for up-to-date information.

!!!

Click the **Cookies** tab to view a table of cookies transmitted in the resource's HTTP request and
response headers. This tab is only available when cookies are transmitted.

Below is a description of each of the columns in the table:

- **Name**. The cookie's name.
- **Value**. The cookie's value.
- **Domain**. The domain the cookie belongs to.
- **Path**. The URL path the cookie came from.
- **Expires / Max-Age**. The value of the cookie's expires or max-age properties.
- **Size**. The size of the cookie in bytes.
- **HTTP**. Indicates that the cookie should only be set by the browser in the HTTP request, and
  cannot be accessed with JavaScript.
- **Secure**. The presence of this attribute indicates that the cookie should only be transmitted
  over a secure connection.

{% Img src="image/admin/PtS1RmV1pR5HcbSpBE2C.png", alt="resource cookies", width="800", height="290" %}

### View WebSocket frames {: #view_websocket_frames }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Frames tab][19] for up-to-date information.

!!!

Click the **Frames** tab to view [`WebSocket`][20] connection information. This tab is only visible
when the selected resource initiated a `WebSocket` connection.

{% Img src="image/admin/k8A3ogJIVFBTPbaI2bt0.png", alt="websocket frames tab", width="800", height="393" %}

The list below describes each of the columns in the table on the **Frames** tab:

- **Data**. The message payload. If the message is plain text, it's displayed here. For binary
  opcodes, this field displays the opcode's name and code. The following opcodes are supported:
  - Continuation Frame
  - Binary Frame
  - Connection Close Frame
  - Ping Frame
  - Pong Frame
- **Length**. The length of the message payload in bytes.
- **Time**. The time stamp when the message was created.

Messages are color-coded according to their type:

- Outgoing text messages are color-coded light-green.
- Incoming text messages are white.
- WebSocket opcodes are light-yellow.
- Errors are light-red.

**Notes about current implementation:**

- To refresh the **Frames** table after new messages arrive, click the resource name on the left.
- Only the last 100 `WebSocket` messages are preserved by the **Frames** table.

## View resource initiators and dependencies {: #initiators-dependencies }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [View initiators and dependencies][21] for up-to-date
information.

!!!

Hold <kbd>Shift</kbd> and hover over a resource to view its initiators and dependencies. This
section refers to the resource that you are hovering over as the **target**.

The first resource above the target that is color-coded green is the initiator of the target. If
there is a second resource above that which is color-coded green, that's the initiator of the
initiator. Any resources below the target that are color-coded red are dependencies of the target.

In the screenshot below, the target is `dn/`. The initiator of the target is the script beginning
with `rs=AA2Y`. The initiator of the initiator (`rs=AA2Y`) is `google.com`. Last, `dn.js` is a
dependency of the target (`dn/`).

![viewing resource initiators and
dependencies](/web/tools/chrome-devtools/network/imgs/initiators-dependencies.png)

Keep in mind that for pages with lots of resources it's possible that you may not be able to see all
of the initiators or dependencies.

## Sort requests {: #sort_requests }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Sort by activity phase][22] for up-to-date information.

!!!

By default, the resources in the **Requests Table** are sorted by the start time of each request,
starting with the earliest requests at the top.

Click on the header of a column to sort the table by each resource's value for that header. Click
the same header again to change the sort order to ascending or descending.

The **Timeline** column is unique from the others. When clicked, it displays a menu of sort fields:

- **Timeline**. Sorts by the start time of each network request. This is the default sort, and is
  the same as sorting by the **Start Time** option.
- **Start Time**. Sorts by the start time of each network request (same as sorting by the
  **Timeline** option).
- **Response Time**. Sorts by each request's response time.
- **End Time**. Sorts by the time when each request completed.
- **Duration**. Sorts by the total time of each request. Select this filter to determine which
  resource takes the longest time to load.
- **Latency**. Sorts by the time between the start of the request and the beginning of the response.
  Select this filter to determine which resource takes the longest time to first byte (TTFB).

{% Img src="image/admin/mpvVd5lf8BQXoGrtuVm1.png", alt="Timeline sort fields", width="800", height="463" %}

## Filter requests {: #filter_requests }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Filters panel][23] for up-to-date information.

!!!

The **Network** panel provides numerous ways to filter which resources are displayed. Click the
**filters** button ({% Img src="image/admin/MYLfTABCgv4ZVueCZ4wG.png", alt="filters button", width="28", height="24" %}) to hide
or display the **Filters** pane.

Use the content type buttons to only display resources of the selected content type.

!!!.aside.aside--note

**Note:** Hold <kbd>Cmd</kbd> (Mac) or <kbd>Ctrl</kbd> (Windows/Linux) and then click to enable
multiple filters simultaneously.

!!!

![multiple content type filters selected
simultaneously](/web/tools/chrome-devtools/network/imgs/multiple-content-type-filters.png)

The **filter** text field is deceptively powerful. If you enter an arbitrary string in it, the
**Network** panel only displays the resources whose filenames match the given string.

{% Img src="image/admin/XOztMSLewAESyqKU3G2P.png", alt="resource name filtering", width="800", height="534" %}

The **filter** text field also supports various keywords that let you sort resources by various
properties, such as file size using the `larger-than` keyword.

The list below describes all of the keywords.

- `domain`. Only display resources from the specified domain. You can use a wildcard character (`*`)
  to include multiple domains. For example, `*.com` displays resources from all domain names ending
  in `.com`. DevTools populates the autocomplete dropdown menu with all of the domains it has
  encountered.
- `has-response-header`. Show the resources that contain the specified HTTP response header.
  DevTools populates the autocomplete dropdown with all of the response headers that it has
  encountered.
- `is`. Use `is:running` to find `WebSocket` resources.
- `larger-than`. Show resources that are larger than the specified size, in bytes. Setting a value
  of `1000` is equivalent to setting a value of `1k`.
- `method`. Show resources that were retrieved over a specified HTTP method type. DevTools populates
  the dropdown with all of the HTTP methods it has encountered.
- `mime-type`. Show resources of a specified MIME type. DevTools populates the dropdown with all
  MIME types it has encountered.
- `mixed-content`. Show all mixed content resources (`mixed-content:all`) or just the ones that are
  currently displayed (`mixed-content:displayed`).
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

{% Img src="image/admin/My9T3k1jiDim7xWfyvd5.png", alt="filtering by file size", width="800", height="541" %}

Some of the keywords above mention an autocomplete dropdown menu. To trigger the autocomplete menu,
type in the keyword followed by a colon. For example, in the screenshot below typing `domain:`
triggered the autocomplete dropdown.

{% Img src="image/admin/ho7cqGHhyR4RpJ3nKom5.png", alt="filter text field autocomplete", width="627", height="464" %}

## Copy, save, and clear network information {: #copy_save_and_clear_network_information }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See following sections for up-to-date information:

- [Copy one or all requests][24]
- [Save as HAR with content][25]
- [Clear browser cache][26]
- [Clear browser cookies][27]

!!!

Right-click within the **Requests Table** to copy, save, or delete network information. Some of the
options are context-sensitive, so if you want to operate on a single resource, you need to
right-click on that resource's row. The list below describes each of the options.

- **Copy Response**. Copies the HTTP response of the selected resource to the system clipboard.
- **Copy as cURL**. Copies the network request of the selected resource as a [cURL][28] command
  string to the system clipboard. See [Copying requests as cURL commands][29].
- **Copy All as HAR**. Copies all resources to the system clipboard as [HAR][30] data. A HAR file
  contains a JSON data structure that describes the network "waterfall". Several [third-party][31]
  [tools][32] can reconstruct the network waterfall from the data in the HAR file. See [Web
  Performance Power Tool: HTTP Archive (HAR)][33] for more information.
- **Save as HAR with Content**. Saves all network data to an HAR file along with each page resource.
  Binary resources, including images, are encoded as Base64-encoded text.
- **Clear Browser Cache**. Clear the browser cache. **Tip**: You can also enable or disable the
  browser cache from the [**Network Conditions**][34] drawer.
- **Clear Browser Cookies**. Clear the browser's cookies.
- **Open in Sources Panel**. Open the selected resource in the **Sources** panel.
- **Open Link in New Tab**. Opens the selected resource in a new tab. You can also double-click the
  resource name in the Network table.
- **Copy Link Address**. Copies the resource URL to the system clipboard.
- **Save**. Save the selected text resource. Only displayed on text resources.
- **Replay XHR**. Re-send the selected `XMLHTTPRequest`. Only displayed on XHR resources.

{% Img src="image/admin/ky2wjgfn7byGZOEfVzlN.png", alt="copy and save context menu", width="800", height="530" %}

### Copy one or all requests as cURL commands {: #curl }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Copy one or all requests][35] for up-to-date information.

!!!

[cURL][36] is a command line tool for making HTTP transactions.

Right-click on a resource within the Requests Table, hover over **Copy** and then select **Copy as
cURL** to copy a string of cURL requests for all resources that have been detected by the Network
panel.

{% Img src="image/admin/OkEzTLeVYrTSxSzTnbQj.png", alt="Copy single request as cURL command", width="800", height="599" %}

Select **Copy All as cURL** to copy a string of cURL requests for all resources that have been
detected by the Network panel.

When you copy all, filtering is ignored (e.g. if you filter the Network panel to only display CSS
resources and then press **Copy All as cURL**, you'll get all the detected resources, not just the
CSS).

## Customize the Network panel {: #customize_the_network_panel }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Use large or small requests rows][37] for up-to-date
information.

!!!

By default the **Requests Table** displays resources with small rows. Click the **Use large resource
rows** button
({% Img src="image/admin/qORtyUwSi1OvgruasPeS.png", alt="large resource rows button", width="28", height="20" %})
to increase the size of each row.

Large rows enable some columns to display two text fields: a primary field and a secondary field.
The column header indicates the meaning of the secondary field.

{% Img src="image/admin/CCMgQghnwoej5dQCXJaK.png", alt="large resource rows", width="800", height="656" %}

### Add and remove table columns {: #add_and_remove_table_columns }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See following sections for up-to-date information:

- [Show or hide columns][38]
- [Add custom columns][39]

!!!

Right-click on any of the headers in the **Requests Table** to add or remove columns.

{% Img src="image/admin/dOiQavClenmBDKOKG07R.png", alt="Add or remove columns", width="800", height="825" %}

### Preserve the network log upon navigation {: #preserve_the_network_log_upon_navigation }

!!!.aside.aside--warning

**Warning:** This page is deprecated. See [Preserve log][40] for up-to-date information.

!!!

By default, the network activity recording is discarded whenever you reload the current page or load
a different page. Enable the **Preserve log** checkbox to save the network log across these
scenarios. New records are appended to the bottom of the **Requests Table**.

## Additional resources {: #additional_resources }

To learn more optimizing the network performance of your application, see the following resources:

- Use [PageSpeed Insights][41] to identify performance best practices that can be applied to your
  site, and [PageSpeed optimization tools][42] to automate the process of applying those best
  practices.
- [High Performance Networking in Google Chrome][43] discusses Chrome network internals and how you
  can take advantage of them to make your site faster.
- [How gzip compression works][44] provides a high-level overview gzip compression and why it's a
  good idea.
- [Web Performance Best Practices][45] provides additional tips for optimizing the network
  performance of your web page or application.

[1]: /web/tools/chrome-devtools/network/reference#controls
[2]: /web/tools/chrome-devtools/network/reference#filters
[3]: /web/tools/chrome-devtools/network/reference#overview
[4]: /web/tools/chrome-devtools/network/reference#requests
[5]: /web/tools/chrome-devtools/network/reference#summary
[6]: #add-and-remove-table-columns
[7]: /web/tools/chrome-devtools/network/reference#record
[8]: /web/tools/chrome-devtools/network/reference#screenshots
[9]: /web/tools/chrome-devtools/network/reference#load
[10]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
[11]: https://developer.mozilla.org/en-US/docs/Web/Events/load
[12]: /web/tools/chrome-devtools/network/reference#details
[13]: /web/tools/chrome-devtools/network/reference#timing
[14]: /web/tools/chrome-devtools/network/understanding-resource-timing
[15]: /web/tools/chrome-devtools/network/reference#headers
[16]: /web/tools/chrome-devtools/network/reference#preview
[17]: /web/tools/chrome-devtools/network/reference#response
[18]: /web/tools/chrome-devtools/network/reference#cookies
[19]: /web/tools/chrome-devtools/network/reference#frames
[20]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[21]: /web/tools/chrome-devtools/network/reference#initiators-dependencies
[22]: /web/tools/chrome-devtools/network/reference#sort-by-activity
[23]: /web/tools/chrome-devtools/network/reference#filters
[24]: /web/tools/chrome-devtools/network/reference#copy
[25]: /web/tools/chrome-devtools/network/reference#save-as-har
[26]: /web/tools/chrome-devtools/network/reference#clear-cache
[27]: /web/tools/chrome-devtools/network/reference#clear-cookies
[28]: http://curl.haxx.se/
[29]: #copy-requests-as-curl-commands
[30]: https://en.wikipedia.org/wiki/.har
[31]: https://ericduran.github.io/chromeHAR/
[32]: https://code.google.com/p/harviewer/
[33]: https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/
[34]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[35]: /web/tools/chrome-devtools/network/reference#copy
[36]: http://curl.haxx.se/
[37]: /web/tools/chrome-devtools/network/reference#request-rows
[38]: /web/tools/chrome-devtools/network/reference#columns
[39]: /web/tools/chrome-devtools/network/reference#custom-columns
[40]: /web/tools/chrome-devtools/network/reference#preserve-log
[41]: /speed/pagespeed/insights
[42]: /speed/pagespeed/optimization
[43]: https://www.igvita.com/posa/high-performance-networking-in-google-chrome/
[44]: /speed/articles/gzip
[45]: /speed/docs/best-practices/rules_intro
