---
layout: "layouts/doc-post.njk"
title: "Workspace"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Workspace tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > [**Workspace**](/docs/devtools/workspaces/) lets you save changes that you make within DevTools to source code that's stored on your computer.

{% Aside 'gotchas' %}
DevTools automatically maps your local sources to network resources using source maps. This way, you can make changes to sources in DevTools and immediately see the effect on the website you host locally and view in Chrome.
{% endAside %}

To configure your workspaces, open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [Settings](/docs/devtools/settings/#open) > **Workspace**.

## Customize exclusions {: #workspace-exclusions }

The **Folder exclude pattern** is the default global RegEx pattern that lists common and third-party folders and file types that DevTools excludes from workspaces so you can focus only on your code.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m6NjzWTH82irjOeSOCGu.png", alt="Folder exclude pattern in the Workspace tab.", width="800", height="471" %}
You can manually add new folders or file types to the pattern. Pattern changes take effect after reloading DevTools.

To change the default global list of excluded folders and files, edit the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Workspace** > **Folder exclude pattern** textbox.

## Manage Workspaces {: #manage-workspaces }

The **Workspace** tab lists folders you have set up as **Workspaces** and, for each folder, subfolders you manually excluded.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qtIbAfoPg7C7OlMMygWk.png", alt="A workspace folder with excluded subfolders.", width="800", height="536" %}
Changes to files in subfolders listed as excluded don't persist. Excluded subfolders are workplace-specific, not global.

To add a new **Workspace**:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Workspace** tab, click **Add folder**.
1. Select the folder with your sources.
1. Click **Allow** in the prompt at the top to let DevTools make changes to sources.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fpb3F57oHqX2HYNRPxY2.png", alt="The prompt requesting full access to sources for DevTools.", width="800", height="387" %}

To remove a workspace, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0G3yI9F8BnkrEXyLf5EJ.svg", alt="Close.", width="24", height="24" %} next to the corresponding folder.
