---
layout: "layouts/doc-post.njk"
title: "Search: Find text across all loaded resources"
authors:
  - sofiayem
date: 2022-05-27
#updated: YYYY-MM-DD
description: "Find text across all loaded resources with the Search tab."
---

Use the **Search** tab to find text across all loaded resources.

{% Aside 'gotchas' %}
The **Search** tab doesn't show results from network headers and responses. To search across them, follow the steps in [Search network headers and responses](/docs/devtools/network/#search).
{% endAside %}

Alternatively, use [built-in search bars](#built-in-search-bars) to find text in a resource opened in a specific tool.

## Open the Search tab {: #open-search }

You can open the **Search** tab in several ways. First, [open DevTools](/docs/devtools/open/), then do one of the following:

- In the top-right corner of DevTools, select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools", width="20", height="20" %} **Customize and control DevTools** > **More tools** > **Search**.
- Press `Esc` to open [**Drawer**](/docs/devtools/customize/#drawer), and in the top-left corner, select {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N5Lkpdwpaz4YqRGFr2Ks.svg", alt="Customize and control DevTools", width="20", height="20" %} **More Tools** > **Search**.
- Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>F</kbd> (Windows/Linux).

## Search for text across all loaded resources {: #search-loaded-resources }

To search for text across all loaded resources, in the search bar on the **Search** tab, type your query and press <kbd>Enter</kbd>.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/D3YatkHJm3NkOEPMcxzg.png", alt="Search results.", width="800", height="626" %}

To make your query case-sensitive, toggle the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/egjnpBbgTvj6FDiIbfoc.png", alt="Match case.", width="25", height="20" %} **Match Case** button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/u2YlZUWEgtSIr7Ma7iol.png", alt="Match Case button.", width="800", height="444" %}

To search for text that matches a RegEx pattern, toggle the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/97kuRQETaw1jnAfMHrbQ.png", alt="RegEx button.", width="17", height="18" %} **Use Regular Expression** button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/OMfgsPc0jnodtsmaL7A1.png", alt="RegEx button.", width="800", height="558" %}

{% Aside 'gotchas' %}
You don't need to wrap your RegEx query in forward slashes. 
{% endAside %}

### Rerun a search query and clear results {: #rerun-and-clear }

To rerun your search query, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/sX65QEDYhwBFHCM24BtV.svg", alt="Refresh.", width="20", height="20" %} **Refresh**.

To clear your search results, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Nh5W7S7oEdlTcjarzxKC.svg", alt="Clear.", width="20", height="20" %} **Clear**.

## Search for text in a specific tool {: #built-in-search-bars }

To narrow your search scope to a resource opened in a specific tool, you can use a built-in search bar if the tool supports it.

Search bars have up and down buttons to jump to previous and next search results.

To open a built-in search bar in a specific tool, press <kbd>Command</kbd>+<kbd>F</kbd> (Mac) or <kbd>Control</kbd>+<kbd>F</kbd> (Windows/Linux).

Not all DevTools panels and tabs have a built-in search bar but those that do, often provide tool-specific features. Below is a list of tools with search bars and their features.

<table class="with-borders with-heading-tint"><thead><tr><td>Panel or tab</td><td>Case-sensitive</td><td>RegEx</td><td>Tool-specific features</td></tr></thead><tbody><tr><td><a href="/docs/devtools/dom/#search">Elements</a></td><td></td><td></td><td>Search by selector and XPath.</td></tr><tr><td><a href="/docs/devtools/console/reference/#search">Console</a></td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td></td></tr><tr><td><a href="/docs/devtools/javascript/reference/#search">Sources</a></td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>Replace text.</td></tr><tr><td><a href="/docs/devtools/network/#search">Network</a></td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>Scope: network headers and responses.</td></tr><tr><td><a href="/docs/devtools/evaluate-performance/reference/#search">Performance</a></td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>Scope: activities.</td></tr><tr><td>Memory</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td></td><td>Scopes: string search for all profiles; cost, name, and file search for sampling profiles.</td></tr><tr><td>JavaScript Profiler</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td></td><td>Scope: cost, name, and file search for CPU profiles.</td></tr><tr><td>Quick Source</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td>{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lh0C6z3sePNX1Tiibddr.svg", alt="Check.", width="24", height="24" %}</td><td></td></tr></tbody></table>
