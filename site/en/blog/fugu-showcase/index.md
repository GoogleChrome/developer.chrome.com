---
layout: 'layouts/blog-post.njk'
title: Project Fugu API showcase
subhead: >
  The Project Fugu API Showcase is a collection of apps that make use of APIs that were conceived in
  the context of Project Fugu.
description: The Project Fugu API Showcase is a collection of apps that use APIs created in the context of Project Fugu.
authors:
  - thomassteiner
date: 2022-04-25
updated: 2022-06-01
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
tags:
  - capabilities
---

## Motivation

The Capabilities Project (code name [Project Fugu](/blog/fugu-status/)) is a cross-company effort
with the objective of making it possible for web apps to do anything platform-specific apps can. We
enable amazing web applications like [Photoshop](https://web.dev/ps-on-the-web/) by exposing the
capabilities of the underlying operating system platforms to the web platform, while maintaining
user security, privacy, trust, and other core tenets of the web.

But what are examples of some of the apps that make use of these capabilities? The Project Fugu API
Showcase embedded below is sourced by community submissions and contains a filterable list of apps
that make use of one or more APIs that were developed in the context of the project.

{% Aside 'success' %}
You can propose missing apps to the showcase by submitting them via an
[anonymous form](https://docs.google.com/forms/d/e/1FAIpQLScNd1rClbmFWh6FcMmjUNrwg9RLz8Jk4BkHz_-EOpmkVd_-9g/viewform).
Submissions are reviewed on a regular basis and the showcase will be updated accordingly.
{% endAside %}

You can launch each app by clicking the app's name, the app's preview image, or the **Launch app**
link. For many apps, you can also see the source code by clicking **Source code**. On supporting
browsers, you can share any of the listed apps via the **Share app** feature. As a special inception
Easter egg, the Project Fugu API Showcase is of course
<a href="/blog/fugu-showcase/#developer.chrome.com!blog!fugu-showcase" target="_blank">contained
in the Project Fugu API Showcase</a>. Happy browsing!

## Showcase

<div class="showcase-container" style="width: 100%">
  <iframe
    title="Fugu showcase"
    name="showcase"
    style="min-height: 1200px;width: 100%;border: solid 1px var(--color-hairline);"
    src="https://googlechromelabs.github.io/fugu-showcase/data/"
    allow="web-share; clipboard-write; clipboard"
    onload="this.contentWindow.postMessage({hash:location.hash.substr(1),search:location.search.substr(1)},'*');"
  ></iframe>
</div>

<!-- TODO: @tomayac
  Remove this inline script once a stand-alone has been implemented.
-->
<script>
  const SHOWCASE_URL = 'https://googlechromelabs.github.io/fugu-showcase/data/';
  window.addEventListener('message', (event) => {
    if (event.origin !== new URL(SHOWCASE_URL).origin) {
      return;
    }
    const url = new URL(window.location);
    if ('search' in event.data) {
      const key = 'api';
      if (event.data.search) {
        const params = new URLSearchParams(event.data.search);
        const value = params.get(key);
        url.searchParams.set(key, value);
        url.hash = '';
      } else {
        url.searchParams.delete(key);
      }
    }
    if ('hash' in event.data) {
      url.hash = event.data.hash;
    }
    window.history.pushState({}, '', url);
  });
</script>
