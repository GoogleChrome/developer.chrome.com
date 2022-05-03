---
layout: 'layouts/blog-post.njk'
title: Project Fugu API showcase
subhead: >
  The Project Fugu API Showcase is a collection of apps that make use of APIs that were conceived
  in the context of Project Fugu.
authors:
  - thomassteiner
date: 2022-04-25
updated: 2022-05-03
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
tags:
  - capabilities
---

## Motivation

The Capabilities Project (code name [Project Fugu](/blog/fugu-status/)) is a cross-company effort with
the objective of making it possible for web apps to do anything platform-specific apps can. We
enable amazing web applications like [Photoshop](https://web.dev/ps-on-the-web/) by exposing the capabilities of
the underlying operating system platforms to the web platform, while maintaining user security,
privacy, trust, and other core tenets of the web.

But what are examples of some of the apps that make use of these capabilities? The Project Fugu API
Showcase embedded below is sourced by community submissions and contains a filterable list of apps
that make use of one or more APIs that were developed in the context of the project. You can propose
missing apps by submitting them via an
[anonymous form](https://docs.google.com/forms/d/e/1FAIpQLScNd1rClbmFWh6FcMmjUNrwg9RLz8Jk4BkHz_-EOpmkVd_-9g/viewform).
Submissions are reviewed on a regular basis and the showcase will be updated accordingly.

You can launch each app by clicking the app's name, the app's preview image, or the **Launch app**
link. For many apps, you can also see the source code by clicking **Source code**. On supporting
browsers, you can share any of the listed apps via the **Share app** feature. As a special inception
Easter egg, the Project Fugu API Showcase is of course
<a href="https://tomayac.github.io/fugu-showcase/data/#tomayac.github.io!fugu-showcase!data" target="showcase">contained
in the Project Fugu API Showcase</a>. Happy browsing!

## Showcase

<div class="showcase-container" style="height: 100%; width: 100%">
  <noscript>
    <iframe
      title="Fugu showcase"
      name="showcase"
      style="min-height: 1000px; width: 100%; border: solid 1px var(--color-hairline);"
      src="https://tomayac.github.io/fugu-showcase/data/"
      allow="web-share; clipboard-write; clipboard"
    ></iframe>
  </noscript>
</div>

<script>
  const SHOWCASE_URL = 'https://tomayac.github.io/fugu-showcase/data/';
  
  const iframe = document.createElement('iframe');
  iframe.title = 'Project Fugu API Showcase';
  iframe.name = 'showcase';
  iframe.style.minHeight = '1000px';
  iframe.style.width = '100%';
  iframe.style.border = 'solid 1px var(--color-hairline)';
  iframe.allow = 'web-share; clipboard-write; clipboard';
  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage(
      {
        hash: location.hash.substr(1),
        search: location.search.substr(1),
      },
      '*'
    );
  });
  document.querySelector('.showcase-container').append(iframe);
  iframe.src = SHOWCASE_URL;

  window.addEventListener('message', (event) => {
    if (event.origin !== new URL(SHOWCASE_URL).origin) {
      return;
    }
    const url = new URL(window.location);
    if ('search' in event.data) {
      if (event.data.search) {
        const [key, value] = event.data.search.split('=');
        url.searchParams.set(key, value);
        url.hash = '';
      } else {
        url.searchParams.delete('api');
      }
    }
    if ('hash' in event.data) {
      url.hash = event.data.hash;
    }
    window.history.pushState({}, '', url);
  });
</script>
