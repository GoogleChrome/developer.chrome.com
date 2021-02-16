---
layout: "layouts/doc-post.njk"
title: "View Page Resources With Chrome DevTools"
authors:
  - kaycebasques
date: 2015-04-13
updated: 2020-07-10
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

    ![The Open File dialog](/web/tools/chrome-devtools/resources/imgs/openfile.png)

    **Figure 1**. The **Open File** dialog

2.  Select the file from the dropdown, or start typing the filename and press <kbd>Enter</kbd> once
    the correct file is highlighted in the autocomplete box.

    ![Typing a filename in the Open File dialog](/web/tools/chrome-devtools/resources/imgs/filesearch.png)

    **Figure 2**. Typing a filename in the **Open File** dialog

### Open resources in the Network panel {: #networkopen }

See [Inspect a resource's details][3].

![Inspecting a resource in the Network panel](/web/tools/chrome-devtools/network-performance/imgs/tutorial/response.png)

**Figure 3**. Inspecting a resource in the **Network** panel

### Reveal resources in the Network panel from other panels {: #reveal }

The [Browse resources][4] section below shows you how to view resources from various parts of the
DevTools UI. If you ever want to inspect a resource in the **Network** panel, right-click the
resource and select **Reveal in Network panel**.

![Reveal in Network panel](/web/tools/chrome-devtools/resources/imgs/reveal.png)

**Figure 4**. The **Reveal in Network panel** option

## Browse resources {: #browse }

### Browse resources in the Network panel {: #network }

See [Log network activity][5].

![Page resources in the Network Log](/web/tools/chrome-devtools/network-performance/imgs/tutorial/log.png)

**Figure 5**. Page resources in the Network Log

### Browse by directory {: #directory }

To view a page's resources organized by directory:

1.  Click the **Sources** tab to open the **Sources** panel.
2.  Click the **Page** tab to show the page's resources. The **Page** pane opens.

    ![The Page pane](/web/tools/chrome-devtools/resources/imgs/page.png)

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

    ![Viewing a file in the Editor](/web/tools/chrome-devtools/resources/imgs/sourcesview.png)

    **Figure 7**. Viewing a file in the **Editor**

### Browse by filename {: #filename }

By default the **Page** pane groups resources by directory. To disable this grouping and view each
domain's resources as a flat list:

1.  Open the **Page** pane. See [Browse by directory][7].
2.  Click **More Options** ![More Options](/web/tools/chrome-devtools/images/shared/more.png) and
    disable **Group By Folder**.

    ![Group By Folder](/web/tools/chrome-devtools/resources/imgs/groupbyfolder.png)

    **Figure 8**. The **Group By Folder** option

    Resources are organized by file type. Within each file type the resources are organized
    alphabetically.

    ![The Page pane after disabling Group By Folder](/web/tools/chrome-devtools/resources/imgs/filenames.png)

    **Figure 9**. The **Page** pane after disabling **Group By Folder**

### Browse by file type {: #type }

To group resources together based on their file type:

1.  Click the **Application** tab. The **Application** panel opens. By default the **Manifest** pane
    usually opens first.

    ![The Application panel](/web/tools/chrome-devtools/resources/imgs/application.png)

    **Figure 10**. The **Application** panel

2.  Scroll down to the **Frames** pane.

    ![The Frames pane](/web/tools/chrome-devtools/resources/imgs/frames.png)

    **Figure 11**. The **Frames** pane

3.  Expand the sections that you're interested in.
4.  Click a resource to view it.

    ![Viewing a resource in the Application panel](/web/tools/chrome-devtools/resources/imgs/applicationview.png)

    **Figure 11**. Viewing a resource in the **Application** panel

#### Browse files by type in the Network panel {: #browse_files_by_type_in_the_network_panel }

See [Filter by resource type][8].

![Filtering for CSS in the Network Log](/web/tools/chrome-devtools/network-performance/imgs/tutorial/css.png)

**Figure 12**. Filtering for CSS in the Network Log

[1]: https://developer.mozilla.org/en-US/docs/Learn
[2]: /web/tools/chrome-devtools#start
[3]: /web/tools/chrome-devtools/network#details
[4]: #browse
[5]: /web/tools/chrome-devtools/network#load
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
[7]: #directory
[8]: /web/tools/chrome-devtools/network#type
