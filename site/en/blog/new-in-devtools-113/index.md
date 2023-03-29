---
layout: 'layouts/blog-post.njk'
title: "What's New in DevTools (Chrome 113)"
authors:
  - sofiayem
  - jecelynyeen
date: 2023-04-28
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GJvLUWB0oNIje3SXYusK.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-113
---
<!--image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gctGASDKBFTUtOQqVq2H.png  -->

{% Partial 'devtools/banner.md' %}

*No 'What's new in DevTools' video for this release. Check out the latest DevTools Tips video to learn [how to identify and fix CSS issues with the Styles pane](https://youtu.be/iuZx0kHS0Xs).*

<!-- $contentStart -->

## Override network response headers {: #network }

You can now override response headers in the **Network** panel. Previously, you needed access to the actual web server to experiment with HTTP response headers.

To override a header, navigate to **Network** > **Headers** > **Response Headers**, hover over a header's value, and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/k3WKQOAItcJ2pliOyD47.svg", alt="Edit.", width="24", height="24" %}.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ToaHmqIbeBcxFrsDru5r.png", alt="Hovering over a header's value.", width="800", height="600" %}

DevTools may prompt you to select a folder to store the overrides in. Select a folder and grant DevTools access to it. You can now edit the value.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/FK0TTBTVcSEzQwVnAgE2.png", alt="Editing a header's value.", width="800", height="600" %}

To add a custom header, scroll down to the end of the section and click **Add header**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BdMvlHGbQmtn6Vgs74PP.png", alt="Adding a custom header.", width="800", height="560" %}

To edit all overrides in a single place, click **Header overrides** next to the **Response Headers** section. DevTools takes you to the `.headers` file.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/8me5sql6VAIOfP9gHF9X.png", alt="Editing overrides.", width="800", height="471" %}

There you can also click **Add override rule** to override multiple requests using wildcards (`*`).

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/102f7c4f25ffcdd66d800d8c4bf8dbcce7e29e79 #}

Chromium issue: [1288023](https://crbug.com/1288023).

##  {: # }



{#  #}
{#  #}

Chromium issue: [](https://crbug.com/).

##  {: # }



{#  #}
{#  #}

Chromium issue: [](https://crbug.com/).

##  {: # }



{#  #}
{#  #}

Chromium issue: [](https://crbug.com/).


## Miscellaneous highlights {: #misc }

These are some noteworthy fixes in this release:

- 

<!-- $contentEnd -->

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
