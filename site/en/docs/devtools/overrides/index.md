---
layout: "layouts/doc-post.njk"
title: "Override files and HTTP response headers locally"
authors:
  - sofiayem
date: 2023-04-12
#updated: YYYY-MM-DD
description: "Use local overrides to keep changes you make in DevTools across page loads."
tags:
  - prototype-fixes
  - javascript
  - css
  - network
---

With local overrides, you can keep the changes you make in DevTools across page loads. You can also [override HTTP response headers](#override-headers).

How it works:

- When you make changes in DevTools, DevTools saves a copy of the modified file to a folder you specify.
- When you reload the page, DevTools serves the local, modified file, rather than the network resource.

{% Aside 'important' %}
You can also save your changes directly to source files. See [Edit and save files with Workspaces](/docs/devtools/workspaces/).
{% endAside %}

## Limitations {: #limitations }

Local overrides work for network response headers and for most file types, with a couple of exceptions:

- DevTools doesn't save changes made in the DOM tree of the [**Elements**](/docs/devtools/dom/) panel.
- If you edit CSS in the **Styles** pane, and the source of that CSS is an HTML file, DevTools won't save the change.

Instead, you can edit HTML files in the [**Sources**](/docs/devtools/sources/) panel.

## Enable or disable local overrides {: #enable-overrides }

Specify a folder where DevTools will keep your changes:

1. [Open DevTools](/docs/devtools/open) on a page.
1. Go to [**Sources**](/docs/devtools/sources/) > **Overrides** and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eY8MaTQqlXF3oiT6STmy.svg", alt="Add.", width="20", height="20" %} **Select folder for overrides**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Mcwf0iY9MPSBTsbm3MWH.png", alt="The 'Select folder for overrides' button.", width="800", height="425" %}

1. Pick a folder and, when prompted, allow DevTools access to it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Uq6nmriJ6PMGAWqRzTtq.png", alt="Local overrides enabled in a specified folder.", width="800", height="404" %}

To view the files served by the server again, clear {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZtDyFg7cjkxacORB3GQn.svg", alt="Cleared checkbox.", width="24", height="24" %} **Enable local overrides** at any time.

To delete all the files with changes, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MadqZsIZpo1sj3qQ3GsZ.svg", alt="Clear.", width="24", height="24" %}.

## Make changes {: #make-changes }

Make changes to your code, for example, edit [CSS in the **Elements** panel](/docs/devtools/css/reference/#change-declaration), or [JavaScript in **Sources**](/docs/devtools/javascript/reference/#edit).

DevTools saves the modified files, lists them in **Sources** > **Overrides**, and shows you the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/s81rU6SgdmbseeBDGbPl.png", alt="Saved.", width="17", height="20" %} icon next to the overridden files.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/FPuaWwuQ3HFlgOuc4ZP4.png", alt="Overridden files listed in the Sources > Overrides and icons next to these files.", width="800", height="540" %}

## Track your local changes {: #track-changes }

You can keep track of all the changes you make in one place—the [**Changes**](/docs/devtools/changes/) drawer tab.

## Override HTTP response headers {: #override-headers }

From the **Network** panel, you can override HTTP response headers without the access to the web server.

With response header overrides, you can locally prototype fixes for various headers, including but not limited to:

- [Cross-Origin Resource Sharing (CORS) Headers](https://developer.mozilla.org/docs/Web/HTTP/CORS)
- [Permissions-Policy Headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/Permissions-Policy)
- [Cross-Origin Isolation Headers](https://web.dev/coop-coep/)

To override a response header:

1. [Open DevTools](/docs/devtools/open), for example, on [this demo page](https://cors-demo-devtools.glitch.me/).
1. Go to **Network**, select a request from the table, open **Headers** > **Response Headers**.
1. Hover over a response header value and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %}.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/U9f8IhtBACotmtYUNjtO.png", alt="The edit button next to a response header.", width="800", height="552" %}

1. If prompted, pick a folder for DevTools to save changes to and allow access.
1. Modify a header.

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
