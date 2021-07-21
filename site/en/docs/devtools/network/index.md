---
layout: "layouts/doc-post.njk"
title: "Inspect network activity"
authors:
  - kaycebasques
date: 2019-02-08
#updated: YYYY-MM-DD
description: "A tutorial on the most popular network-related features in Chrome DevTools."
---

This is a hands-on tutorial of some of the most commonly-used DevTools features related to
inspecting a page's network activity.

See [Network Reference][1] if you'd like to browse features instead.

Read on, or watch the video version of this tutorial:

{% YouTube id="e1gAyQuIFQo" %}

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

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9AnMWdLvN65DifDwkONZ.png", alt="The demo", width="800", height="479" %}

    **Figure 1**. The demo

    You might prefer to move the demo to a separate window.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mDIziHLxuEvmZaeJpXV8.png", alt="The demo in one window and this tutorial in a different window", width="800", height="450" %}

    **Figure 2**. The demo in one window and this tutorial in a different window

2.  [Open DevTools][4] by pressing Control+Shift+J or Command+Option+J (Mac). The **Console** panel
    opens.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/PpIqpPhho6H1ZKKnHQg8.png", alt="The Console", width="800", height="393" %}

    **Figure 3**. The Console

    You might prefer to [dock DevTools to the bottom of your window][5].

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ijHIRzKPfVI6NxrdNtCa.png", alt="DevTools docked to the bottom of the window", width="800", height="625" %}

    **Figure 4**. DevTools docked to the bottom of the window

3.  Click the **Network** tab. The Network panel opens.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/t3ET7u5x7PDBjyuSrZp8.png", alt="DevTools docked to the bottom of the window", width="800", height="625" %}

    **Figure 5**. DevTools docked to the bottom of the window

Right now the Network panel is empty. That's because DevTools only logs network activity while it's
open and no network activity has occurred since you opened DevTools.

## Log network activity {: #load }

To view the network activity that a page causes:

1.  Reload the page. The Network panel logs all network activity in the **Network Log**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Q4AZ84qTJLEnfToJYVLR.png", alt="The Network Log", width="800", height="670" %}

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

      {% Aside %}

      **Note** The graph above the Network Log is called the Overview. You won't be using it in this
      tutorial, so you can hide it if you prefer. See [Hide the Overview pane][6].

      {% endAside %}

2.  So long as you've got DevTools open, it will record network activity in the Network Log. To
    demonstrate this, first look at the bottom of the **Network Log** and make a mental note of the
    last activity.
3.  Now, click the **Get Data** button in the demo.
4.  Look at the bottom of the **Network Log** again. There's a new resource called
    `getstarted.json`. Clicking the **Get Data** button caused the page to request this file.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qQs6Wr5FQSRQGdgAve33.png", alt="A new resource in the Network Log", width="800", height="689" %}

    **Figure 7**. A new resource in the Network Log

## Show more information {: #information }

The columns of the Network Log are configurable. You can hide columns that you're not using. There
are also many columns that are hidden by default which you may find useful.

1.  Right-click the header of the Network Log table and select **Domain**. The domain of each
    resource is now shown.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/YsQoJMZxnAvRvOe2uMDt.png", alt="Enabling the Domain column", width="800", height="698" %}

    **Figure 8**. Enabling the Domain column

{% Aside %}

**Tip** You can see the full URL of a resource by hovering over its cell in the **Name** column.

{% endAside %}

## Simulate a slower network connection {: #throttle }

The network connection of the computer that you use to build sites is probably faster than the
network connections of the mobile devices of your users. By throttling the page you can get a better
idea of how long a page takes to load on a mobile device.

1.  Click the **Throttling** dropdown, which is set to **Online** by default.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4KbIdeahGnkabzSNqBic.png", alt="Enabling throttling", width="800", height="623" %}

    **Figure 9**. Enabling throttling

2.  Select **Slow 3G**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/WWxl67JuU1GXvW3S54Hw.png", alt="Selecting Slow 3G", width="800", height="622" %}

    **Figure 10**. Selecting Slow 3G

3.  Long-press **Reload** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6Zix64R1K9bMxOVgMjpw.png", alt="Reload", width="24", height="25" %} and then
    select **Empty Cache And Hard Reload**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/2jZjKEtRSz6qSatQqRMA.png", alt="Empty Cache And Hard Reload", width="800", height="620" %}

    **Figure 11**. Empty Cache And Hard Reload

    On repeat visits, the browser usually serves some files from its [cache][7], which speeds up the
    page load. **Empty Cache And Hard Reload** forces the browser to go the network for all
    resources. This is helpful when you want to see how a first-time visitor experiences a page
    load.

    {% Aside %}

    **Note** The **Empty Cache And Hard Reload** workflow is only available when DevTools is open.

    {% endAside %}

## Capture screenshots {: #screenshots }

Screenshots let you see how a page looked over time while it was loading.

1.  Click **Capture Screenshots**
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wXN8qM2CVEuXXSDEANQP.png", alt="Capture Screenshots", width="26", height="16" %}.
2.  Reload the page again via the **Empty Cache And Hard Reload** workflow. See [Simulate a slower
    connection][8] if you need a reminder on how to do this. The Screenshots pane provides
    thumbnails of how the page looked at various points during the loading process.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ezM74scmuBU68lOL8hHs.png", alt="Screenshots of the page load", width="800", height="672" %}

    **Figure 12**. Screenshots of the page load

3.  Click the first thumbnail. DevTools shows you what network activity was occurring at that moment
    in time.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/P2z9yzPK20RPe4pKDEtA.png", alt="The network activity that was happening during the first screenshot", width="800", height="672" %}

    **Figure 13**. The network activity that was happening during the first screenshot

4.  Click **Capture Screenshots**
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/wXN8qM2CVEuXXSDEANQP.png", alt="Capture Screenshots", width="26", height="16" %} again to close
    the Screenshots pane.
5.  Reload the page again.

## Inspect a resource's details {: #details }

Click a resource to learn more information about it. Try it now:

1.  Click `getstarted.html`. The **Headers** tab is shown. Use this tab to inspect HTTP headers.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Hy3k9tz8CnW3RrzeMPch.png", alt="The Headers tab", width="800", height="712" %}

    **Figure 14**. The Headers tab

2.  Click the **Preview** tab. A basic rendering of the HTML is shown.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/iUvlIVyQlZjzVvkwPU89.png", alt="The Preview tab", width="800", height="712" %}

    **Figure 15**. The Preview tab

    This tab is helpful when an API returns an error code in HTML and it's easier to read the
    rendered HTML than the HTML source code, or when inspecting images.

3.  Click the **Response** tab. The HTML source code is shown.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/x94xMX1owJR5M3Pm71ln.png", alt="The Response tab", width="800", height="712" %}

    **Figure 16**. The Response tab

    {% Aside %}

    **Tip** When a file is minified, clicking the **Format**
    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/M9e9yKo9gzxlsRvw3i0t.png", alt="Format", width="30", height="24" %} button at the bottom of the
    **Response** tab re-formats the file's contents for readability.

    {% endAside %}

4.  Click the **Timing** tab. A breakdown of the network activity for this resource is shown.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9zzih7q9yqAejNmzfoIM.png", alt="The Timing tab", width="800", height="736" %}

    **Figure 17**. The Timing tab

5.  Click **Close** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/R9i0QcALlmZf86wPd6X8.png", alt="Close", width="14", height="15" %} to view the Network
    Log again.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/lpYAsLVvE4KYpFRStzzG.png", alt="The Close button", width="800", height="736" %}

    **Figure 18**. The Close button

## Search network headers and responses {: #search }

Use the **Search** pane when you need to search the HTTP headers and responses of all resources for
a certain string or regular expression.

For example, suppose you want to check if your resources are using reasonable [cache policies][9].

1.  Click **Search** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rEiMt86Ljm1En0bEpEtJ.png", alt="Search", width="28", height="28" %}. The Search pane
    opens to the left of the Network log.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rYeYU92i6nt7kmW2g1mb.png", alt="The Search pane", width="800", height="633" %}

    **Figure 19**. The Search pane

2.  Type `Cache-Control` and press Enter. The Search pane lists all instances of `Cache-Control`
    that it finds in resource headers or content.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GJGtel25mxh4J77uxuOn.png", alt="Search results for Cache-Control", width="800", height="633" %}

    **Figure 20**. Search results for `Cache-Control`

3.  Click a result to view it. If the query was found in a header, the Headers tab opens. If the
    query was found in content, the Response tab opens.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/n47UmtdF6eS1E0t4bt2p.png", alt="A search result highlighted in the Headers tab", width="800", height="633" %}

    **Figure 21**. A search result highlighted in the Headers tab

4.  Close the Search pane and the Timing tab.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FIs5ZndPsYlLoO3DefZQ.png", alt="The Close buttons", width="800", height="634" %}

    **Figure 22**. The Close buttons

## Filter resources {: #filter }

DevTools provides numerous workflows for filtering out resources that aren't relevant to the task at
hand.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/j4JtxgfJxPPn7COPLmH5.png", alt="The Filters toolbar", width="800", height="634" %}

**Figure 23**. The Filters toolbar

The **Filters** toolbar should be enabled by default. If not:

1.  Click **Filter** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Y2jMjWqUoZJ2lOG5Q3Bv.png", alt="Filter", width="28", height="24" %} to show it.

### Filter by string, regular expression, or property {: #filterbox }

The **Filter** text box supports many different types of filtering.

1.  Type `png` into the **Filter** text box. Only the files that contain the text `png` are shown.
    In this case the only files that match the filter are the PNG images.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JJ5xBp2BbNhNri3J1jdH.png", alt="A string filter", width="800", height="633" %}

    **Figure 24**. A string filter

2.  Type `/.*\.[cj]s+$/`. DevTools filters out any resource with a filename that doesn't end with a
    `j` or a `c` followed by 1 or more `s` characters.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Z0mF2pbe5N8PgcNoVIEE.png", alt="A regular expression filter", width="800", height="633" %}

    **Figure 25**. A regular expression filter

3.  Type `-main.css`. DevTools filters out `main.css`. If any other file matched the pattern they
    would also be filtered out.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/3Ml2s7x4sXmlZNHkQUBg.png", alt="A negative filter", width="800", height="633" %}

    **Figure 26**. A negative filter

4.  Type `domain:raw.githubusercontent.com` into the **Filter** text box. DevTools filters out any
    resource with a URL that does not match this domain.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ToCFCEuYEkoKg7JkRcqm.png", alt="A property filter", width="800", height="633" %}

    **Figure 27**. A property filter

    See [Filter requests by properties][10] for the full list of filterable properties.

5.  Clear the **Filter** text box of any text.

### Filter by resource type {: #type }

To focus in on a certain type of file, such as stylesheets:

1.  Click **CSS**. All other file types are filtered out.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/SYxh0kv0yo7hy8H6HZlD.png", alt="Showing CSS files only", width="800", height="575" %}

    **Figure 28**. Showing CSS files only

2.  To also see scripts, hold Control or Command (Mac) and then click **JS**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6tb0m3L4JmEWH5P905Xg.png", alt="Showing CSS and JS files only", width="800", height="575" %}

    **Figure 29**. Showing CSS and JS files only

3.  Click **All** to remove the filters and see all resources again.

See [Filter requests][11] for other filtering workflows.

## Block requests {: #block }

How does a page look and behave when some of its resources aren't available? Does it fail
completely, or is it still somewhat functional? Block requests to find out:

1.  Press Control+Shift+P or Command+Shift+P (Mac) to open the **Command Menu**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/riAGV1Hg1AifCAIeBwJG.png", alt="The Command Menu", width="800", height="714" %}

    **Figure 30**. The Command Menu

2.  Type `block`, select **Show Request Blocking**, and press Enter.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/YtfXlycEiESm7imzJIdg.png", alt="Show Request Blocking", width="800", height="615" %}

    **Figure 31**. Show Request Blocking

3.  Click **Add Pattern** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pX4YIMDftDDHOO0h9Ks1.png", alt="Add Pattern", width="20", height="20" %}.
4.  Type `main.css`.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mAaDUCJfFNOM6mYXvtTI.png", alt="Blocking main.css", width="800", height="688" %}

    **Figure 32**. Blocking `main.css`

5.  Click **Add**.
6.  Reload the page. As expected, the page's styling is slightly messed up because its main
    stylesheet has been blocked. Note the `main.css` row in the Network Log. The red text means that
    the resource was blocked.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1mEX7Yn8xEZ3wXQCAUQP.png", alt="main.css has been blocked", width="800", height="771" %}

    **Figure 33**. `main.css` has been blocked

7.  Uncheck the **Enable request blocking** checkbox.

## Next steps {: #next }

Congratulations, you have completed the tutorial. Click **Dispense Award** to receive your award.

Check out the [Network Reference][12] to discover more DevTools features related to inspecting
network activity.

[1]: /docs/devtools/network/reference
[2]: /docs/devtools/speed/get-started
[3]: https://devtools.glitch.me/network/getstarted.html
[4]: /docs/devtools/open
[5]: /docs/devtools/customize/#placement
[6]: /docs/devtools/network/reference#hide-overview
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[8]: #throttle
[9]: https://web.dev/uses-long-cache-ttl/
[10]: /docs/devtools/network/reference#filter-by-property
[11]: /docs/devtools/network/reference#filter
[12]: /docs/devtools/network/reference
