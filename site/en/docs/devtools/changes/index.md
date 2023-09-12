---
layout: "layouts/doc-post.njk"
title: "Changes: Track your HTML, CSS, and JavaScript changes"
authors:
  - sofiayem
date: 2022-04-26
updated: 2023-01-02
description:
  "Track changes to HTML, CSS, and JavaScript."
tags:
  - javascript
  - css
  - html
---

With the **Changes** tab, track the changes you make to:

- HTML in [**Sources**](/docs/devtools/javascript/sources/#edit) with enabled [Local overrides](blog/new-in-devtools-65/#overrides)
- CSS in [**Elements** > **Styles**](/docs/devtools/css/#declarations) or [**Sources**](/docs/devtools/javascript/sources/#edit)
- JavaScript in [**Sources**](/docs/devtools/javascript/sources/#edit)

The **Changes** tab shows changes you made within DevTools. If you reload either DevTools or your page, the changes disappear.

To make DevTools persist changes across page loads, follow the steps in [Local overrides](/blog/new-in-devtools-65/#overrides).

To make DevTools write changes to your local sources, follow the steps in [Edit and save files with Workspaces](/docs/devtools/workspaces/).

## Open the Changes tab {: #open-changes }

To open the **Changes** tab:

1. [Open DevTools](/docs/devtools/open/).

1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) to open the **Command Menu**.

1. Start typing `changes`, select **Show Changes**, and press <kbd>Enter</kbd>.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iMMEfImU6TnblWJKLln2.png", alt="Run the Show Changes command", width="800", height="349" %}

Alternatively, in the upper right corner, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="", width="24", height="24" %} **Customize and control DevTools** > **More tools** > **Changes**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/4eQAS6Jv4bh37Q8yODjA.png", alt="More tools > Changes", width="800", height="460" %}

By default, DevTools displays the **Changes** tab at the bottom of your DevTools window, in the **Drawer**.

## View and understand your changes {: #view-changes }

To view your changes:

1. [Open DevTools](/docs/devtools/open/).
1. Make changes to your sources:

   - HTML: First, enable [Local overrides](/blog/new-in-devtools-65/#overrides), then make changes in **Sources**
   - CSS in [**Elements** > **Styles**](/docs/devtools/css/#declarations) or [**Sources**](/docs/devtools/javascript/sources/#edit)
   - JavaScript in [**Sources**](/docs/devtools/javascript/sources/#edit)

1. [Open the **Changes** tab](#open-changes) and select a file in the right-hand side of the tab.
1. Observe a `diff` output that highlights the following:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qkldtZMyhliuFy7c3SiG.png", alt="Highlighted diff in the Changes tab", width="800", height="479" %}

The **Changes** tab pretty-prints the `diff` output automatically, so you don't have to scroll horizontally to see the changes in a single line.

## Copy CSS changes {: #copy-css-changes }

If you made changes to CSS in [**Elements** > **Styles**](/docs/devtools/css/#declarations), you can copy all of them with a single button:

1. [Open the **Changes** tab](#open-changes) and, in the right-hand side of the tab, select the CSS file you made changes to.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Tza78o0COW0Bn9eb1mgS.png", alt="Copy.", width="800", height="428" %}

1. Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0vPvwat277ITJphiOtml.svg", alt="Copy.", width="20", height="20" %} **Copy** button at the bottom of the **Changes tab**.

## Revert all changes made to a file {: #revert-changes}

To revert changes made to a file:

1. On left-hand side of the **Changes** tab, select a file with changes to revert.
1. On the action bar at the bottom, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/d1eyw9WYyVIT5UnIOlcE.svg", alt="Undo", width="20", height="20" %} **Revert all changes to current file**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/j8aKXkFcYiQenQtHxenn.png", alt="Revert button", width="800", height="414" %}
