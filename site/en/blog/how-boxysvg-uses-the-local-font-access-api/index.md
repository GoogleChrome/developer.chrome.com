---
layout: 'layouts/blog-post.njk'
title: 'How vector image editing app Boxy SVG uses the Local Font Access API to let users pick their favorite local fonts'
subhead: >
  The Local Font Access API provides a mechanism to access the user's locally installed font data, including higher-level details such as names, styles, and families, as well as the raw bytes of the underlying font files. Learn how the SVG editing app Boxy SVG makes use of this API.
date: 2023-06-01
# updated: 2023-06-01
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/81OfVmaxz3gTsqVIXu5i.png
alt: Boxy SVG icon pattern.
authors:
  - thomassteiner
  - jarekfoksa
tags:
  - capabilities
  - case-study
  - fugu-case-study
---

## Introduction

(This article is also available in form of a video.)

{% YouTube id="Y40vMQap9fs", startTime="611" %}

[Boxy SVG](https://boxy-svg.com/) is a vector graphics editor. Its main use case is editing drawings in the SVG file format, for creating illustrations, logos, icons, and other elements of graphic design. It's developed by Polish developer [Jarosław Foksa](https://foksa.name/) and was initially released on March 15, 2013. Jarosław runs a [Boxy SVG blog](https://boxy-svg.com/blog/) in which he announces new features he adds to the app. The developer is a strong supporter of [Chromium's Project Fugu](/capabilities/) and even has a [Fugu tag](https://boxy-svg.com/ideas?tag=Fugu) on the app's ideas tracker.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/o6MUEFgmC4FesGkgvKRO.png", alt="The Boxy SVG app editing the Project Fugu icon SVG.", width="780", height="790" %}

## Local Font Access API in Boxy SVG

One feature addition Jarosław [blogged about](https://boxy-svg.com/blog/15/enabling-local-system-fonts-support) was the [Local Font Access API](https://developer.mozilla.org/docs/Web/API/Local_Font_Access_API). The Local Font Access API lets users access their locally installed fonts, including higher-level details such as names, styles, and families, as well as the raw bytes of the underlying font files. In the following screenshot you can see how I have granted the app access to the locally installed fonts on my MacBook and chosen the Marker Felt font for my text.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/kmTDSfp4WLZP234sHio4.png", alt="The Boxy SVG app editing the Project Fugu icon SVG adding the text 'Project Fugu rocks' set in the font Marker Felt, which is shown selected in the font picker.", width="800", height="629" %}

The underlying code is quite straightforward. When the user opens the font family picker for the first time, the application first checks if the web browser supports the Local Font Access API.

It also checks for the old experimental version of the API and uses it if present. As of 2023, you can safely ignore the old API as it was available only for a short time via experimental Chrome flags, but some Chromium-derivatives may still use it.

```js
let isLocalFontsApiEnabled = (
  // Local Font Access API, Chrome >= 102
  window.queryLocalFonts !== undefined ||
  // Experimental Local Font Access API, Chrome < 102
  navigator.fonts?.query !== undefined
);
```

If the Local Font Access API is not available, the font family picker will turn gray. A placeholder text will be displayed to the user instead of the fonts list:

```js
if (isLocalFontsApiEnabled === false) {
  showPlaceholder("no-local-fonts-api");
  return;
}
```

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/p38nlxh8V49Eiq9hDZx7.png", alt="Font picker showing the message 'Your browser does not support the Local Font Access API'.", width="536", height="616" %}

Otherwise, the Local Font Access API is used to retrieve the list of all fonts from the operating system. Notice the `try…catch` block which is needed in order to handle permission errors properly.

```js
let localFonts;

if (isLocalFontsApiEnabled === true) {
  try {
    // Local Font Access API, Chrome >= 102
    if (window.queryLocalFonts) {
      localFonts = await window.queryLocalFonts();
    }
    // Experimental Local Font Access API, Chrome < 102
    else if (navigator.fonts?.query) {
      localFonts = await navigator.fonts.query({
        persistentAccess: true,
      });
    }
  } catch (error) {
    showError(error.message, error.name);
  }
}
```

Once the list of local fonts is retrieved, a simplified and normalized `fontsIndex` is created from it:

```js
let fontsIndex = [];

for (let localFont of localFonts) {
  let face = "400";

  // Determine the face name
  {
    let subfamily = localFont.style.toLowerCase();
    subfamily = subfamily.replaceAll(" ", "");
    subfamily = subfamily.replaceAll("-", "");
    subfamily = subfamily.replaceAll("_", "");

    if (subfamily.includes("thin")) {
      face = "100";
    } else if (subfamily.includes("extralight")) {
      face = "200";
    } else if (subfamily.includes("light")) {
      face = "300";
    } else if (subfamily.includes("medium")) {
      face = "500";
    } else if (subfamily.includes("semibold")) {
      face = "600";
    } else if (subfamily.includes("extrabold")) {
      face = "800";
    } else if (subfamily.includes("ultrabold")) {
      face = "900";
    } else if (subfamily.includes("bold")) {
      face = "700";
    }

    if (subfamily.includes("italic")) {
      face += "i";
    }
  }

  let descriptor = fontsIndex.find((descriptor) => {
    return descriptor.family === localFont.family);
  });

  if (descriptor) {
    if (descriptor.faces.includes(face) === false) {
      descriptor.faces.push(face);
    }
  } else {
    let descriptor = {
      family: localFont.family,
      faces: [face],
    };

    fontsIndex.push(descriptor);
  }
}

for (let descriptor of fontsIndex) {
  descriptor.faces.sort();
}
```

The normalized fonts index is then stored in the IndexedDB database so that it can be easily queried, shared between app instances, and preserved between sessions. Boxy SVG uses [Dexie.js](https://dexie.org/) to manage the database:

```js
let database = new Dexie("LocalFontsManager");
database.version(1).stores({cache: "family"}).
await database.cache.clear();
await database.cache.bulkPut(fontsIndex);
```

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/wOqmYchMTIcpBVDYtYRF.png", alt="Chrome DevTools Storage section showing the IndexedDB table with the fonts cache.", width="800", height="349" %}

Once the database is populated, the font picker widget can query it and display the results on the screen:

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/DwxVY9gHlHwoGTf6joGm.png", alt="Font picker populated with fonts.", width="530", height="754" %}

It's worth mentioning that Boxy SVG renders the list in a custom element named `<bx-fontfamilypicker>` and styles each font list item so that it's displayed in the particular font family. To isolate from the rest of the page, Boxy SVG uses the [Shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM) in this and other custom elements.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/Q9xLSc9rK2Pjn5T5Lblt.png", alt="Chrome DevTools Elements panel showing the font picker being inspected: a custom element named 'bx-fontfamiliypicker'.", width="800", height="288" %}

## Conclusions

[The local fonts feature](https://boxy-svg.com/ideas/80/system-fonts-list-in-typography-panel) has been really popular, with users enjoying access to their local fonts for their designs and creations. When the API shape changed and the [feature broke](https://boxy-svg.com/bugs/237/cant-access-local-fonts-with-chrome-102) briefly, users noted immediately. Jarosław was quick to change the code to the defensive pattern you can see in the snippet above that works with the up-to-date Chrome and also other Chromium derivatives that may not have switched to the latest version. Take Boxy SVG for a spin and be sure to check out your locally installed fonts. You might discover some long forgotten classics like [Zapf Dingbats](https://en.wikipedia.org/wiki/Zapf_Dingbats) or [Webdings](https://en.wikipedia.org/wiki/Webdings).