---
layout: "layouts/doc-post.njk"
title: "Shortcuts"
authors:
  - sofiayem
date: 2023-02-16
#updated: YYYY-MM-DD
description: "Shortcuts tab reference."
---

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Shortcuts** lists default shortcuts you can use while focused in DevTools to speed up your workflow.

For a full list of default shortcuts, see [Keyboard shortcuts](/docs/devtools/shortcuts/).

{% Aside 'gotchas' %}
You can use the Visual Studio Code alternatives to default shortcuts. Select `Visual Studio Code` from {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Shortcuts** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Match shortcuts from preset**.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bi4B0or5wylM4jit6DfD.png", alt="Visual Studio Code shortcut alternatives.", width="800", height="416" %}

## Customize shortcuts {: #customize-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

To customize keyboard shortcuts:

1. [Open Settings](/docs/devtools/settings/#open).
1. In the **Shortcuts** tab, hover over any shortcut and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="24", height="24" %} **Edit** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BuceMKLqXmgLxRZPXTfg.png", alt="Edit shortcut.", width="800", height="596" %}

1. Put the cursor in the text bar and press any convenient combination of keys (chord). DevTools notifies you if the combination is already in use.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lsqH7u5rnAcaE3dQdqWH.png", alt="A chord shortcut that is already in use.", width="800", height="565" %}

1. Record a new combination and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7l4ffLtFrht87gVnT0IZ.svg", alt="Check.", width="24", height="24" %} **Check** button.

   {% Aside 'gotchas' %}
   To add an additional synonymous combination, click **Add a shortcut** and record another chord in a similar way.
   {% endAside %}

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3VBJ5QKkUCG1H2FX8f78.png", alt="Save the new shortcut.", width="800", height="565" %}

To revert or delete changes, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tby5LrQzKTKzHia2fEBO.svg", alt="Back.", width="24", height="24" %} **Back** or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete**.

## Add shortcuts to unassigned actions {: #assign-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

By default, DevTools doesn't assign shortcuts to all available actions.

For example, to toggle [light and dark theme preference](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) with a keystroke, in the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** > **Rendering** section, set your own shortcut as described in [Customize shortcuts](#customize-shortcuts).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Toggle light and dark themes with keyboard shortcut.", width="800", height="576" %}

## Restore default shortcuts {: #restore-defaults }

To bring back defaults, click **Restore default shortcuts** in the bottom-right corner of the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nQK0bSoeOzjAzWnmC3AY.png", alt="Restore default shortcuts.", width="800", height="463" %}
