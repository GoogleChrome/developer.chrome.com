---
layout: "layouts/doc-post.njk"
title: "View page resources"
authors:
  - kaycebasques
date: 2015-04-13
#updated: YYYY-MM-DD
description: "Organize resources by frame, domain, type, or other criteria."
---

This guide teaches you how to use Chrome DevTools to view a web page's resources. Resources are the
files that a page needs in order to display correctly. Examples of resources include CSS,
JavaScript, and HTML files, as well as images.

This guide assumes that you're familiar with the basics of [web development][1] and [Chrome
DevTools][2].

## Open resources {: #open }

When you know the name of the resource that you want to inspect, the **Command Menu** provides a
fast way of opening the resource.

1.  Press <kbd>Control</kbd>+<kbd>P</kbd> or <kbd>Command</kbd>+<kbd>P</kbd> (Mac). The **Open
    File** dialog opens.

    {% Img src="image/admin/ePelDGfcT6Hfrr1vF8CX.png", alt="The Open File dialog", width="800", height="525" %}

    **Figure 1**. The **Open File** dialog

2.  Select the file from the dropdown, or start typing the filename and press <kbd>Enter</kbd> once
    the correct file is highlighted in the autocomplete box.

    {% Img src="image/admin/tjhqwIEsFmrtwwzwj9ZO.png", alt="Typing a filename in the Open File dialog", width="800", height="525" %}

    **Figure 2**. Typing a filename in the **Open File** dialog

### Open resources in the Network panel {: #networkopen }

See [Inspect a resource's details][3].

{% Img src="image/admin/YmoO7pCFBrffHlGwfMIA.png", alt="Inspecting a resource in the Network panel", width="800", height="712" %}

**Figure 3**. Inspecting a resource in the **Network** panel

### Reveal resources in the Network panel from other panels {: #reveal }

The [Browse resources][4] section below shows you how to view resources from various parts of the
DevTools UI. If you ever want to inspect a resource in the **Network** panel, right-click the
resource and select **Reveal in Network panel**.

{% Img src="image/admin/94tXtlAYi1TGwxAvyfCK.png", alt="Reveal in Network panel", width="800", height="552" %}

**Figure 4**. The **Reveal in Network panel** option

## Browse resources {: #browse }

### Browse resources in the Network panel {: #network }

See [Log network activity][5].

{% Img src="image/admin/LjlsVzvEYBHIq89pyPvX.png", alt="Page resources in the Network Log", width="800", height="670" %}

**Figure 5**. Page resources in the Network Log

### Browse by directory {: #directory }

To view a page's resources organized by directory:

1.  Click the **Sources** tab to open the **Sources** panel.
2.  Click the **Page** tab to show the page's resources. The **Page** pane opens.

    {% Img src="image/admin/8RBI1gfYe2F9c0bwzecj.png", alt="The Page pane", width="800", height="569" %}

    **Figure 6**. The **Page** pane

    Here's a breakdown of the non-obvious items in **Figure 6**:

    - **top** is the main document [browsing context][6].
    - **airhorner.com** represents a domain. All resources nested under it come from that domain.
      For example, the full URL of the **comlink.global.js** file is probably
      `https://airhorner.com/scripts/comlink.global.js`.
    - **scripts** is a directory.
    - **(index)** is the main HTML document.
    - **iu3** is another browsing context. This context was probably created by an `<iframe>`
      element embedded in the main document HTML.
    - **sw.js** is a service worker execution context.

3.  Click a resource to view it in the **Editor**.

    {% Img src="image/admin/SXzv1u024QcYu3ksW2vD.png", alt="Viewing a file in the Editor", width="800", height="525" %}

    **Figure 7**. Viewing a file in the **Editor**

### Browse by filename {: #filename }

By default the **Page** pane groups resources by directory. To disable this grouping and view each
domain's resources as a flat list:

1.  Open the **Page** pane. See [Browse by directory][7].
2.  Click **More Options** {% Img src="image/admin/W3Y7nl0uwxmN3iDrJZNf.png", alt="More Options", width="6", height="26" %} and
    disable **Group By Folder**.

    {% Img src="image/admin/a0OHG2BZiNXY6KokvSWV.png", alt="Group By Folder", width="800", height="569" %}

    **Figure 8**. The **Group By Folder** option

    Resources are organized by file type. Within each file type the resources are organized
    alphabetically.

    {% Img src="image/admin/wGs16uT9kEKM9QQOHOOd.png", alt="The Page pane after disabling Group By Folder", width="800", height="560" %}

    **Figure 9**. The **Page** pane after disabling **Group By Folder**

### Browse by file type {: #type }

To group resources together based on their file type:

1.  Click the **Application** tab. The **Application** panel opens. By default the **Manifest** pane
    usually opens first.

    {% Img src="image/admin/ZxpM3TjLQSP6BvcagXhx.png", alt="The Application panel", width="800", height="569" %}

    **Figure 10**. The **Application** panel

2.  Scroll down to the **Frames** pane.

    {% Img src="image/admin/RZ46ottxz421leSHMvZ6.png", alt="The Frames pane", width="800", height="525" %}

    **Figure 11**. The **Frames** pane

3.  Expand the sections that you're interested in.
4.  Click a resource to view it.

    {% Img src="image/admin/C2YgZCn7WRtuGMtRZIAk.png", alt="Viewing a resource in the Application panel", width="800", height="525" %}

    **Figure 11**. Viewing a resource in the **Application** panel

#### Browse files by type in the Network panel {: #browse_files_by_type_in_the_network_panel }

See [Filter by resource type][8].

{% Img src="image/admin/fT0hQdZIboOBrfOYLVHs.png", alt="Filtering for CSS in the Network Log", width="800", height="575" %}

**Figure 12**. Filtering for CSS in the Network Log

[1]: https://developer.mozilla.org/en-US/docs/Learn
[2]: /docs/devtools/overview/#start
[3]: /docs/devtools/network#details
[4]: #browse
[5]: /docs/devtools/network#load
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
[7]: #directory
[8]: /docs/devtools/network#type
