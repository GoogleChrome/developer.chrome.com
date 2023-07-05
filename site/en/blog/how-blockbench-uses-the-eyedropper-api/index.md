---
layout: 'layouts/blog-post.njk'
title: 'How the 3D model editor Blockbench uses the EyeDropper API to let users choose colors from everywhere'
subhead: >
  The EyeDropper API provides a mechanism for creating an eyedropper tool that lets users sample colors from their screens, including outside of the browser window. Learn how the 3D model editor Blockbench uses this API in their codebase.
date: 2023-05-17
# updated: 2023-05-17
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/6fIc5QdWayhjyXmIFEi6.png
alt: Computer created with Blockbench.
authors:
  - thomassteiner
  - jannispetersen
tags:
  - capabilities
  - case-study
  - fugu-case-study
---

## Introduction

(This article is also available in form of a video.)

{% YouTube id="Y40vMQap9fs", startTime="394" %}

[Blockbench](https://www.blockbench.net/) is a free, modern model editor for low-poly models with pixel art textures. If you have ever played [Minecraft](https://www.minecraft.net/), chances are you have seen assets that were created with Blockbench, for example the goat, which was added to Minecraft as part of the Caves and Cliffs Update, Part 1. The GPL version 3 licensed Blockbench code is [open source on GitHub](https://github.com/JannisX11/blockbench).

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/3NK0qVqDGnG7hTpaZpUS.png", alt="Minecraft sheep designed with Blockbench.", width="800", height="426" %}

To try Blockbench, launch the app by navigating to [web.blockbench.net](https://web.blockbench.net/). As a PWA, you can install it to your desktop and launch it in a standalone window. If you are new to 3D modeling, you can start with one of the many open source `.bbmodel` file examples that you can find using GitHub's code search. For example, try the train model that you can see in the following screenshot.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/hE98H7sZPBvB8iTwnLlm.png", alt="Editing a train model in Blockbench.", width="800", height="557" %}

## The EyeDropper API

Among many other features, Blockbench offers a paint feature, so if you ever wanted to tag a train, now you can. Please don't do this in the real world. You can see that for my tagging, I used a bright orange.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/aECYxTYC8RZHglK31nFz.png", alt="The tag 'Tom was here' and a peace sign written on the train model.", width="800", height="595" %}

This is actually an orange that I have extracted directly from the [macOS Ventura wallpaper](https://9to5mac.com/2022/10/05/macos-13-ventura-wallpaper-download-it-right-here/) through the [EyeDropper API](https://developer.mozilla.org/docs/Web/API/EyeDropper_API). As you can see in the following screenshot, the eye dropper (the orange circle left of the app window) can reach outside of the application straight into my desktop, or any other app that I may have open.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/YqL7rf4OUgnlROPugFuy.png", alt="Color picker shown reaching out of the Blockbench app and picking a color from the desktop background image.", width="800", height="426" %}

With Blockbench being open source, you can learn how the developers have implemented the API. The code in question is in [`JannisX11/blockbench/blob/master/js/texturing/color.js`](https://github.com/JannisX11/blockbench/blob/35ced3b3d094ffbf3f2b9548e82bc31c27e0cd05/js/texturing/color.js#L1034-L1049). Blockbench is also available as an Electron.js app. You can see from the comment, it has special case handling for an [issue in Electron](https://github.com/electron/electron/issues/27980), where the color picker can't pick color outside of the window. With the web API, which you can see in the highlighted part of the code snippet, this is not an issue. Using the API is straightforward. Instantiate a new [`EyeDropper`](https://developer.mozilla.org/docs/Web/API/EyeDropper) instance and call its [`open()`](https://developer.mozilla.org/docs/Web/API/EyeDropper/open) method. This method resolves with an `sRGBHex` string representing the selected color, in [hexadecimal sRGB format](https://developer.mozilla.org/docs/Web/CSS/hex-color).

```js/11-12
new Action("pick_screen_color", {
  icon: "colorize",
  category: "color",
  condition: () => typeof EyeDropper == "function",
  click: async function () {
    if (Blockbench.platform == "win32") {
      // workaround for https://github.com/electron/electron/issues/27980
      ipcRenderer.send("request-color-picker", {
        sync: settings.sync_color.value,
      });
    } else if (typeof EyeDropper == "function") {
      let dropper = new EyeDropper();
      let { sRGBHex } = await dropper.open();
      ColorPanel.set(sRGBHex);
    }
  },
});
```

## Conclusions

Color pickers are a small, but important piece of creativity software like Blockbench. More often than not, the desired color is not part of the app window, but is to-be-found somewhere outside, maybe even [on a different screen](https://github.com/mockingbot/mb_colorpicker_desktop_native/issues/10). A color picker that doesn't let you pick colors in such cases can be close to useless. The [EyeDropper API](https://developer.mozilla.org/docs/Web/API/EyeDropper_API) was created exactly for use cases like this, and has been working great for Blockbench ever since it was [implemented](https://github.com/JannisX11/blockbench/commit/e8639293541a22e06011ba4cc4293fc6b684bdc3#diff-b29213ddb78f7fe749e4856e6e059474bab78936d85b91f187a2ec3d5f3ca568) in November 2021. If you play with Blockbench, happy color picking!
