---
layout: "layouts/doc-post.njk"
title: "Inspect Network Activity In Chrome DevTools"
authors:
  - kaycebasques
date: 2019-02-08
updated: 2020-07-10
description: "A tutorial on the most popular network-related features in Chrome DevTools."
---

This is a hands-on tutorial of some of the most commonly-used DevTools features related to
inspecting a page's network activity.

See [Network Reference][1] if you'd like to browse features instead.

Read on, or watch the video version of this tutorial:

{% youtube id="e1gAyQuIFQo" %}

## When to use the Network panel {: #overview }

In general, use the Network panel when you need to make sure that resources are being downloaded or
uploaded as expected. The most common use cases for the Network panel are:

- Making sure that resources are actually being uploaded or downloaded at all.
- Inspecting the properties of an individual resource, such as its HTTP headers, content, size, and
  so on.

If you're looking for ways to improve page load performance, _don't_ start with the Network panel.
There are many types of load performance issues that aren't related to network activity. Start with
the Audits panel because it gives you targeted suggestions on how to improve your page. See
[Optimize Website Speed][2].

## Open the Network panel {: #open }

To get the most out of this tutorial, open up the demo and try out the features on the demo page.

1.  Open the [Get Started Demo][3].

    ![The demo](/web/tools/chrome-devtools/network-performance/imgs/tutorial/demo.png)

    **Figure 1**. The demo

    You might prefer to move the demo to a separate window.

    ![The demo in one window and this tutorial in a different window](/web/tools/chrome-devtools/network-performance/imgs/tutorial/windows.png)

    **Figure 2**. The demo in one window and this tutorial in a different window

2.  [Open DevTools][4] by pressing Control+Shift+J or Command+Option+J (Mac). The **Console** panel
    opens.

    ![The Console](/web/tools/chrome-devtools/network-performance/imgs/tutorial/console.png)

    **Figure 3**. The Console

    You might prefer to [dock DevTools to the bottom of your window][5].

    ![DevTools docked to the bottom of the window](/web/tools/chrome-devtools/network-performance/imgs/tutorial/docked.png)

    **Figure 4**. DevTools docked to the bottom of the window

3.  Click the **Network** tab. The Network panel opens.

    ![DevTools docked to the bottom of the window](/web/tools/chrome-devtools/network-performance/imgs/tutorial/network.png)

    **Figure 5**. DevTools docked to the bottom of the window

Right now the Network panel is empty. That's because DevTools only logs network activity while it's
open and no network activity has occurred since you opened DevTools.

## Log network activity {: #load }

To view the network activity that a page causes:

1.  Reload the page. The Network panel logs all network activity in the **Network Log**.

    ![The Network Log](/web/tools/chrome-devtools/network-performance/imgs/tutorial/log.png)

    **Figure 6**. The Network Log

    Each row of the **Network Log** represents a resource. By default the resources are listed
    chronologically. The top resource is usually the main HTML document. The bottom resource is
    whatever was requested last.

    Each column represents information about a resource. **Figure 6** shows the default columns:

    - **Status**. The HTTP response code.
    - **Type**. The resource type.
    - **Initiator**. What caused a resource to be requested. Clicking a link in the Initiator column
      takes you to the source code that caused the request.
    - **Time**. How long the request took.
    - **Waterfall**. A graphical representation of the different stages of the request. Hover over a
      Waterfall to see a breakdown.

      !!!.aside.aside--note

      **Note** The graph above the Network Log is called the Overview. You won't be using it in this
      tutorial, so you can hide it if you prefer. See [Hide the Overview pane][6].

      !!!

2.  So long as you've got DevTools open, it will record network activity in the Network Log. To
    demonstrate this, first look at the bottom of the **Network Log** and make a mental note of the
    last activity.
3.  Now, click the **Get Data** button in the demo.
4.  Look at the bottom of the **Network Log** again. There's a new resource called
    `getstarted.json`. Clicking the **Get Data** button caused the page to request this file.

    ![A new resource in the Network Log](/web/tools/chrome-devtools/network-performance/imgs/tutorial/runtime.png)

    **Figure 7**. A new resource in the Network Log

## Show more information {: #information }

The columns of the Network Log are configurable. You can hide columns that you're not using. There
are also many columns that are hidden by default which you may find useful.

1.  Right-click the header of the Network Log table and select **Domain**. The domain of each
    resource is now shown.

    ![Enabling the Domain column](/web/tools/chrome-devtools/network-performance/imgs/tutorial/domain.png)

    **Figure 8**. Enabling the Domain column

**Tip** You can see the full URL of a resource by hovering over its cell in the **Name** column.

## Simulate a slower network connection {: #throttle }

The network connection of the computer that you use to build sites is probably faster than the
network connections of the mobile devices of your users. By throttling the page you can get a better
idea of how long a page takes to load on a mobile device.

1.  Click the **Throttling** dropdown, which is set to **Online** by default.

    ![Enabling throttling](/web/tools/chrome-devtools/network-performance/imgs/tutorial/throttling.png)

    **Figure 9**. Enabling throttling

2.  Select **Slow 3G**.

    ![Selecting Slow 3G](/web/tools/chrome-devtools/network-performance/imgs/tutorial/slow3g.png)

    **Figure 10**. Selecting Slow 3G

3.  Long-press **Reload** ![Reload](/web/tools/chrome-devtools/images/shared/reload.png) and then
    select **Empty Cache And Hard Reload**.

    ![Empty Cache And Hard Reload](/web/tools/chrome-devtools/network-performance/imgs/tutorial/hardreload.png)

    **Figure 11**. Empty Cache And Hard Reload

    On repeat visits, the browser usually serves some files from its [cache][7], which speeds up the
    page load. **Empty Cache And Hard Reload** forces the browser to go the network for all
    resources. This is helpful when you want to see how a first-time visitor experiences a page
    load.

    !!!.aside.aside--note

    **Note** The **Empty Cache And Hard Reload** workflow is only available when DevTools is open.

    !!!

## Capture screenshots {: #screenshots }

Screenshots let you see how a page looked over time while it was loading.

1.  Click **Capture Screenshots**
    ![Capture Screenshots](/web/tools/chrome-devtools/images/shared/screenshots.png).
2.  Reload the page again via the **Empty Cache And Hard Reload** workflow. See [Simulate a slower
    connection][8] if you need a reminder on how to do this. The Screenshots pane provides
    thumbnails of how the page looked at various points during the loading process.

    ![Screenshots of the page load](/web/tools/chrome-devtools/network-performance/imgs/tutorial/allscreenshots.png)

    **Figure 12**. Screenshots of the page load

3.  Click the first thumbnail. DevTools shows you what network activity was occurring at that moment
    in time.

    ![The network activity that was happening during the first screenshot](/web/tools/chrome-devtools/network-performance/imgs/tutorial/firstscreenshot.png)

    **Figure 13**. The network activity that was happening during the first screenshot

4.  Click **Capture Screenshots**
    ![Capture Screenshots](/web/tools/chrome-devtools/images/shared/screenshots.png) again to close
    the Screenshots pane.
5.  Reload the page again.

## Inspect a resource's details {: #details }

Click a resource to learn more information about it. Try it now:

1.  Click `getstarted.html`. The **Headers** tab is shown. Use this tab to inspect HTTP headers.

    ![The Headers tab](/web/tools/chrome-devtools/network-performance/imgs/tutorial/headers.png)

    **Figure 14**. The Headers tab

2.  Click the **Preview** tab. A basic rendering of the HTML is shown.

    ![The Preview tab](/web/tools/chrome-devtools/network-performance/imgs/tutorial/preview.png)

    **Figure 15**. The Preview tab

    This tab is helpful when an API returns an error code in HTML and it's easier to read the
    rendered HTML than the HTML source code, or when inspecting images.

3.  Click the **Response** tab. The HTML source code is shown.

    ![The Response tab](/web/tools/chrome-devtools/network-performance/imgs/tutorial/response.png)

    **Figure 16**. The Response tab

    **Tip** When a file is minified, clicking the **Format**
    ![Format](/web/tools/chrome-devtools/images/shared/format.png) button at the bottom of the
    **Response** tab re-formats the file's contents for readability.

4.  Click the **Timing** tab. A breakdown of the network activity for this resource is shown.

    ![The Timing tab](/web/tools/chrome-devtools/network-performance/imgs/tutorial/timing.png)

    **Figure 17**. The Timing tab

5.  Click **Close** ![Close](/web/tools/chrome-devtools/images/shared/close.png) to view the Network
    Log again.

    ![The Close button](/web/tools/chrome-devtools/network-performance/imgs/tutorial/close-timing.png)

    **Figure 18**. The Close button

## Search network headers and responses {: #search }

Use the **Search** pane when you need to search the HTTP headers and responses of all resources for
a certain string or regular expression.

For example, suppose you want to check if your resources are using reasonable [cache policies][9].

1.  Click **Search** ![Search](/web/tools/chrome-devtools/images/shared/search.png). The Search pane
    opens to the left of the Network log.

    ![The Search pane](/web/tools/chrome-devtools/network-performance/imgs/tutorial/search.png)

    **Figure 19**. The Search pane

2.  Type `Cache-Control` and press Enter. The Search pane lists all instances of `Cache-Control`
    that it finds in resource headers or content.

    ![Search results for Cache-Control](/web/tools/chrome-devtools/network-performance/imgs/tutorial/results.png)

    **Figure 20**. Search results for `Cache-Control`

3.  Click a result to view it. If the query was found in a header, the Headers tab opens. If the
    query was found in content, the Response tab opens.

    ![A search result highlighted in the Headers tab](/web/tools/chrome-devtools/network-performance/imgs/tutorial/cache.png)

    **Figure 21**. A search result highlighted in the Headers tab

4.  Close the Search pane and the Timing tab.

    ![The Close buttons](/web/tools/chrome-devtools/network-performance/imgs/tutorial/close-buttons.png)

    **Figure 22**. The Close buttons

## Filter resources {: #filter }

DevTools provides numerous workflows for filtering out resources that aren't relevant to the task at
hand.

![The Filters toolbar](/web/tools/chrome-devtools/network-performance/imgs/tutorial/filters.png)

**Figure 23**. The Filters toolbar

The **Filters** toolbar should be enabled by default. If not:

1.  Click **Filter** ![Filter](/web/tools/chrome-devtools/images/shared/filter.png) to show it.

### Filter by string, regular expression, or property {: #filterbox }

The **Filter** text box supports many different types of filtering.

1.  Type `png` into the **Filter** text box. Only the files that contain the text `png` are shown.
    In this case the only files that match the filter are the PNG images.

    ![A string filter](/web/tools/chrome-devtools/network-performance/imgs/tutorial/png.png)

    **Figure 24**. A string filter

2.  Type `/.*\.[cj]s+$/`. DevTools filters out any resource with a filename that doesn't end with a
    `j` or a `c` followed by 1 or more `s` characters.

    ![A regular expression filter](/web/tools/chrome-devtools/network-performance/imgs/tutorial/regex.png)

    **Figure 25**. A regular expression filter

3.  Type `-main.css`. DevTools filters out `main.css`. If any other file matched the pattern they
    would also be filtered out.

    ![A negative filter](/web/tools/chrome-devtools/network-performance/imgs/tutorial/negative.png)

    **Figure 26**. A negative filter

4.  Type `domain:raw.githubusercontent.com` into the **Filter** text box. DevTools filters out any
    resource with a URL that does not match this domain.

    ![A property filter](/web/tools/chrome-devtools/network-performance/imgs/tutorial/property.png)

    **Figure 27**. A property filter

    See [Filter requests by properties][10] for the full list of filterable properties.

5.  Clear the **Filter** text box of any text.

### Filter by resource type {: #type }

To focus in on a certain type of file, such as stylesheets:

1.  Click **CSS**. All other file types are filtered out.

    ![Showing CSS files only](/web/tools/chrome-devtools/network-performance/imgs/tutorial/css.png)

    **Figure 28**. Showing CSS files only

2.  To also see scripts, hold Control or Command (Mac) and then click **JS**.

    ![Showing CSS and JS files only](/web/tools/chrome-devtools/network-performance/imgs/tutorial/cssjs.png)

    **Figure 29**. Showing CSS and JS files only

3.  Click **All** to remove the filters and see all resources again.

See [Filter requests][11] for other filtering workflows.

## Block requests {: #block }

How does a page look and behave when some of its resources aren't available? Does it fail
completely, or is it still somewhat functional? Block requests to find out:

1.  Press Control+Shift+P or Command+Shift+P (Mac) to open the **Command Menu**.

    ![The Command Menu](/web/tools/chrome-devtools/network-performance/imgs/tutorial/commandmenu.png)

    **Figure 30**. The Command Menu

2.  Type `block`, select **Show Request Blocking**, and press Enter.

    ![Show Request Blocking](/web/tools/chrome-devtools/network-performance/imgs/tutorial/block.png)

    **Figure 31**. Show Request Blocking

3.  Click **Add Pattern** ![Add Pattern](/web/tools/chrome-devtools/images/shared/add.png).
4.  Type `main.css`.

    ![Blocking main.css](/web/tools/chrome-devtools/network-performance/imgs/tutorial/addblock.png)

    **Figure 32**. Blocking `main.css`

5.  Click **Add**.
6.  Reload the page. As expected, the page's styling is slightly messed up because its main
    stylesheet has been blocked. Note the `main.css` row in the Network Log. The red text means that
    the resource was blocked.

    ![main.css has been blocked](/web/tools/chrome-devtools/network-performance/imgs/tutorial/blockedstyles.png)

    **Figure 33**. `main.css` has been blocked

7.  Uncheck the **Enable request blocking** checkbox.

## Next steps {: #next }

Congratulations, you have completed the tutorial. Click **Dispense Award** to receive your award.

Check out the [Network Reference][12] to discover more DevTools features related to inspecting
network activity.

[1]: /web/tools/chrome-devtools/network-performance/reference
[2]: /web/tools/chrome-devtools/speed/get-started
[3]: https://devtools.glitch.me/network/getstarted.html
[4]: /web/tools/chrome-devtools/open
[5]: /web/tools/chrome-devtools/ui#placement
[6]: /web/tools/chrome-devtools/network-performance/reference#hide-overview
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[8]: #throttle
[9]: /web/tools/lighthouse/audits/cache-policy
[10]: /web/tools/chrome-devtools/network-performance/reference#filter-by-property
[11]: /web/tools/chrome-devtools/network-performance/reference#filter
[12]: /web/tools/chrome-devtools/network-performance/reference
