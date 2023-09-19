---
layout: "layouts/doc-post.njk"
title: "Override web content and HTTP response headers locally"
authors:
  - sofiayem
date: 2023-04-12
updated: 2023-09-20
description: "Use local overrides to mock remote resources and keep the changes you make in DevTools across page loads."
tags:
  - prototype-fixes
  - javascript
  - css
  - network
---

With local overrides, you can [override HTTP response headers](#override-headers) and [web content](#make-changes), including [XHR and fetch requests](#override-xhr-fetch), to mock remote resources even if you don't have access to them. This lets you prototype changes without waiting for the backend to support them. Local overrides also lets you keep the changes you make in DevTools across page loads.

How it works:

- When you make changes in DevTools, DevTools saves a copy of the modified file to a folder you specify.
- When you reload the page, DevTools serves the local, modified file, rather than the network resource.

{% Aside 'important' %}
You can also save your changes directly to source files. See [Edit and save files with Workspaces](/docs/devtools/workspaces/).
{% endAside %}

## Limitations {: #limitations }

Local overrides work for network response headers and for most file types, including XHR and fetch requests, with a couple of exceptions:

- DevTools doesn't save changes made in the DOM tree of the [**Elements**](/docs/devtools/dom/) panel.
- If you edit CSS in the **Styles** pane, and the source of that CSS is an HTML file, DevTools won't save the change.

Instead, you can edit HTML files in the [**Sources**](/docs/devtools/sources/) panel.

## Set up local overrides {: #set-up }

You can override web content or response headers right away in the **Network** panel:

1. [Open DevTools](/docs/devtools/open), navigate to the **Network** panel, right-click a request you want to override, choose **Override headers** or **Override content** from the drop-down menu.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qOixESNMKApJdBaw0Kcy.png", alt="Choosing override content from the right-click menu of a request.", width="800", height="425" %}
1. If you haven't set up local overrides yet, in the action bar at the top, DevTools prompts you to:
   1. **Select a folder** to store the override files in.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/oEWmbPqoEmv7uOF1KwAg.png", alt="DevTools prompts you to select a folder.", width="800", height="515" %}
   1. Click **Allow** to grant DevTools access rights to it.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RkMW3bOZAroc83TujxBq.png", alt="DevTools requests access.", width="800", height="515" %}
1. If you have local overrides set up but disabled, DevTools automatically enables them.
1. Once local overrides are set up and enabled, depending on what you are about to override, DevTools takes you to:

   - The **Sources** panel to let you make changes to [web content](#make-changes).
   - The editor in **Network** > **Headers** > **Response Headers** to let you make changes to [response headers](#override-headers).

To temporarily disable local overrides or delete all the override files, navigate to **Sources** > **Overrides** and clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Empty checkbox.", width="24", height="24" %} **Enable Local Overrides** checkbox or click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mMGdymtMmpYX2j3PRSfa.svg", alt="Clear.", width="24", height="24" %} **Clear** respectively.

To delete a single override files or all overrides in a folder, right-click the file or folder in **Sources** > **Overrides**, select **Delete**, then click **OK** in the dialog. This action can't be undone and you will have to manually recreate the deleted overrides.

To quickly see all overrides, in the **Network** panel, right-click a request and select **Show all overrides**. DevTools will take you to **Sources** > **Overrides**.

## Override web content {: #make-changes }

To override web content:
1. [Set up local overrides](#set-up).
1. Make changes to files and save them in DevTools.

{% Aside 'note' %}
You can't override [source-mapped](/docs/devtools/javascript/source-maps/) files. If you right-click a request in the **Network** panel and select **Override content** DevTools shows you a dialog that takes you to the original source files instead.
{% endAside %}

For example, you can edit [files in **Sources**](/docs/devtools/javascript/reference/#edit) or [CSS in **Elements** > **Styles**](/docs/devtools/css/reference/#change-declaration), unless the CSS lives in [HTML files](#limitations).

DevTools saves the modified files, lists them in **Sources** > **Overrides**, and shows you the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} icon next to the overridden files in the relevant panels and panes: **Elements** > **Styles**, **Network**, and **Sources** > **Overrides**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fpsd3XU6dnDWVhHJa2ID.png", alt="The corresponding icons next to overridden files in Sources, Network, and Elements > Styles", width="800", height="649" %}

### Override XHR or fetch requests to mock remote resources {: #override-xhr-fetch }

With local overrides, you don't need access to the backend and don't have to wait for it to support your changes. Mock and experiment on the fly:

1. [Set up local overrides](#set-up).
1. In **Network**, [filter for **XHR/fetch** requests](/docs/devtools/network/reference/#filter-by-type), find the one you need, right-click it, and select **Override content**.
1. Make your changes to the fetched data and save the file.
1. {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="24", height="24" %} **Refresh** the page and observe your changes applied.

To learn this workflow, watch the following video:

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/TNcd8DCxoK6OmHQqJjKT.mp4", autoplay="false", loop="true", muted="true", controls="true", width="800", height="704", class="screenshot" %}

### Track your local changes {: #track-changes }

You can keep track of all the changes you make to web content in one place—the [**Changes**](/docs/devtools/changes/) drawer tab.

## Override HTTP response headers {: #override-headers }

From the **Network** panel, you can override HTTP response headers without access to the web server.

With response header overrides, you can locally prototype fixes for various headers, including but not limited to:

- [Cross-Origin Resource Sharing (CORS) Headers](https://developer.mozilla.org/docs/Web/HTTP/CORS)
- [Permissions-Policy Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Permissions-Policy)
- [Cross-Origin Isolation Headers](https://web.dev/coop-coep/)

To override a response header:

1. [Set up local overrides](#set-up) and inspect, for example, [this demo page](https://cors-demo-devtools.glitch.me/).
1. Go to **Network**, find a request, right-click it, and select **Override headers**. DevTools takes you to the **Headers** > **Response Headers** editor.
1. Hover over a response header value and place a cursor there.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/6u5U79XxwBavyHX8nEOc.png", alt="The Response Headers editor.", width="800", height="608" %}

   Alternatively, to enable the **Response Headers** editor, hover over a response header value and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %}.

1. Modify or add a new header.

   {% Aside %}
   This example adds the `Access-Control-Allow-Origin: *` header to get rid of a [CORS error](https://web.dev/cross-origin-resource-sharing/).
   {% endAside %}

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IhXa4zihNp5Gsi9eBPhN.png", alt="Modifying an existing header value, adding a new one, and removing an override.", width="800", height="653" %}

   - To edit a header value, click it.
   - To add a new header, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %} **Add header**.
   - To remove a header override, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Bg5rfKrzHBaF621Ag9IN.svg", alt="Delete.", width="20", height="20" %} next to it. This removes the headers you added or reverts modified values back to original values.
   
   DevTools highlights modified headers <span style="background-color:#e9f2ec;">in green</span> and removed overrides <span style="background-color:#ffeff0;text-decoration-line: line-through;">in red</span>.

1. {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} Refresh the page to apply the changes.

### Edit all response header overrides {: #edit-response-header-overrides }

To edit all header overrides in one place:

1. Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} **Header overrides** next to the **Response Headers** section.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/LMtR86HKtlYF7JgmFM6W.png", alt="The Header overrides link next to the Response Headers section.", width="800", height="631" %}

   DevTools takes you to the corresponding `.headers` file in **Sources** > **Overrides**.

1. Edit the `.headers` file:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/X8qHpRfwGOLdFTDYWeCb.png", alt="Editing the .headers file.", width="800", height="503" %}

   - To add a new override rule, click **Add override rule**. A rule here is a set of headers and values and a single or multiple request to apply them to.

     {% Aside %}
     You can use [wildcards](https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#type-RequestPattern) to specify multiple requests at once. Designate multiple characters with `*` and a single one with `?`.
     {% endAside %}

   - To add a header-value pair to a rule, hover over another pair and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %}.
   - To revert a header value, remove an added header or a rule, hover over it and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Bg5rfKrzHBaF621Ag9IN.svg", alt="Delete.", width="20", height="20" %}.

1. Save the `.headers` file with <kbd>Command</kbd> / <kbd>Control</kbd> + <kbd>S</kbd>.
1. {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} Refresh the page to apply the changes.
