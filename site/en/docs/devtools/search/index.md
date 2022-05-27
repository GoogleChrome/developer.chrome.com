---
layout: "layouts/doc-post.njk"
title: "Search: Find text across all loaded resources"
authors:
  - sofiayem
date: 2022-05-27
#updated: YYYY-MM-DD
description: "Find text across all loaded resources with the Search tab."
---

Find text across all loaded resources with the **Search** tab.

## Open the Search tab {: #open-search }

You can open the **Search** tab in several ways.

First, [open DevTools](/docs/devtools/open/), the do one of the following:

- In the top-right corner of DevTools, select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools", width="20", height="20" %} **Customize and control DevTools** > **More tools** > **Search**.
- Press `Esc` to open [**Drawer**](/docs/devtools/customize/#drawer), and in the top-left corner, select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools", width="20", height="20" %} **More Tools** > **Search**.
- Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows/Linux).

## Search for text in all loaded resources {: #search-loaded-resources }

To search for text across all loaded resources, in the search box on the **Search** tab, type your query, and press <kbd>Enter</kbd>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/D3YatkHJm3NkOEPMcxzg.png", alt="Search results.", width="800", height="626" %}

To search for case-sensitive text, toggle the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/egjnpBbgTvj6FDiIbfoc.png", alt="Match case.", width="25", height="20" %} **Match Case** button, type your query, and press <kbd>Enter</kbd>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/u2YlZUWEgtSIr7Ma7iol.png", alt="Match Case button.", width="800", height="444" %}

To search for text that matches a `regex` pattern, toggle the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/97kuRQETaw1jnAfMHrbQ.png", alt="RegEx button.", width="17", height="18" %} **Use Regular Expression** button, enter your `regex` expression, and press <kbd>Enter</kbd>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OMfgsPc0jnodtsmaL7A1.png", alt="RegEx button.", width="800", height="558" %}

{% Aside 'gotchas' %}
You don't need to wrap your RegEx in forward slashes. 
{% endAside %}

To rerun your search query, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} **Refresh**.

To clear your search results, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Nh5W7S7oEdlTcjarzxKC.svg", alt="Clear.", width="20", height="20" %} **Clear**.

## Search for headers in the Network panel {: #search-network-headers }

To help you avoid confusion, the **Search** tab in the **Drawer** doesn't search across network headers and responses. To search across them, follow these steps:

1. [Open the **Network** panel](/docs/devtools/network/#open).
1. Press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+<kbd>F</kbd> (Windows/Linux) to open the **Search** pane within the **Network** panel.
1. Type your query and press <kbd>Enter</kbd>.
