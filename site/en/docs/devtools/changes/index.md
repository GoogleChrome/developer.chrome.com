---
layout: "layouts/doc-post.njk"
title: "Changes: Track your CSS and JavaScript changes"
authors:
  - sofiayem
date: 2022-04-26
#updated: YYYY-MM-DD
description:
  "Track changes to CSS and JavaScript."
tags:
  - javascript
  - css
  - prototype-fixes
---

With the **Changes** tab, track the changes you make to:

- CSS in [**Elements** > **Styles**](/docs/devtools/css/#declarations) and [**Sources**](docs/devtools/javascript/sources/#edit)
- JavaScript in [**Sources**](docs/devtools/javascript/sources/#edit)

The **Changes** tab shows changes you made within DevTools. If you reload either DevTools or your page, the changes disappear.

To make DevTools remember changes across page loads, follow the steps in [Local overrides](/blog/new-in-devtools-65/#overrides).

To make DevTools write changes to your local sources, follow the steps in [Edit and save files with Workspaces](/docs/devtools/workspaces/).

## Open the Changes tab {: #open-changes }

To open the **Changes** tab:

1. [Open DevTools](/docs/devtools/open/).

1. Press <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows, Linux, ChromeOS) to open the **Command Menu**.

1. Start typing `changes`, select **Show Changes**, and press <kbd>Enter</kbd>.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/iMMEfImU6TnblWJKLln2.png", alt="Run the Show Changes command", width="800", height="349" %}

Alternatively, in the upper right corner, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="More", width="17", height="17" %} **Customize and control DevTools** > **More tools** > **Changes**.

By default, DevTools displays the **Changes** tab at the bottom of your DevTools window, in the **Drawer**.

## View and understand your changes {: #view-changes }

## Revert all changes made to a file {: #revert-changes}
