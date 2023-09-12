---
layout: 'layouts/blog-post.njk'
title: 'How the image editing app Photopea uses the File Handling API to let users open files from their file explorer'
subhead: >
  The File Handling API allows web applications to register themselves as a file handler for file formats the application can support. Learn how the image editing application Photopea makes use of this API.
date: 2023-05-15
# updated: 2023-05-15
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/IRV9bhPXJnRUXrFWfYE5.png
alt: Photopea logo pattern
authors:
  - thomassteiner
  - ivankutskir
tags:
  - capabilities
  - case-study
  - fugu-case-study
---

## Introduction

(This article is also available in form of a video.)

{% YouTube id="Y40vMQap9fs", startTime="269" %}

[Photopea](https://www.photopea.com/) is a free online image editor developed by [Ivan Kutskir](https://blog.ivank.net/). Ivan started working on the app in 2012, and maintains a [blog](https://blog.photopea.com/) sharing the major features he adds to Photopea. Photopea can work with PSD (Adobe Photoshop), XCF (GIMP), Sketch (Sketch App), XD (Adobe XD), and CDR (CorelDRAW) formats.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/m3t2Hh7UCspDdSm7tWIp.png", alt="The Photopea app.", width="800", height="450" %}

## File handling in Photopea

As an [installable PWA](https://web.dev/install-criteria/), Photopea runs in a standalone window when the user chooses to install the app. Doing so unlocks a PWA super power, which Photopea makes heavy use of: [file handling](/articles/file-handling/).

### The declarative part of the File Handling API

After installation, Photopea registers itself as a file handler with the operating system for the different file formats it supports. This happens in the [Web App Manifest](https://developer.mozilla.org/es/docs/Web/Manifest), by adding the [`file_handlers`](/articles/file-handling/#the-declarative-part-of-the-file-handling-api) field. Each supported file type is an object, the [`action`](/articles/file-handling/#the-declarative-part-of-the-file-handling-api:~:text=An-,%22action%22,-property%20that%20points) has a relative URL as its value, the [`accept`](/articles/file-handling/#the-declarative-part-of-the-file-handling-api:~:text=An-,%22accept%22,-property%20with%20an) object a map of MIME types and associated file extensions. For example, `{"image/jpeg": [".jpeg", ".jpg"]}`. The following code is the production [Web App Manifest of Photopea](https://www.photopea.com/manifest.json), with the relevant parts highlighted.

```json/11-34
{
	"name": "Photopea",
	"short_name": "Photopea",
	"display": "standalone",
	"icons": [
		{  "src": "promo/icon512.png",     "type": "image/png", "sizes": "512x512"  },
		{  "src": "promo/maskable512.png", "type": "image/png", "sizes": "512x512", "purpose":"maskable"  }
	],
	"start_url": "/?utm_source=homescreen",
	"background_color":"#0f171d",
	"theme_color": "#474747",
	"file_handlers": [
		{ "action": "/", "accept": {  "image/psd" : [ ".psd" ]  } },
		{ "action": "/", "accept": {  "image/jpeg": [ ".jpeg", ".jpg" ]  } },
		{ "action": "/", "accept": {  "image/png" : [ ".png" ]  } },
		{ "action": "/", "accept": {  "image/webp": [ ".webp" ]  } },
		{ "action": "/", "accept": {  "image/bmp" : [ ".bmp" ]  } },
		{ "action": "/", "accept": {  "image/gif" : [ ".gif" ]  } },
		{ "action": "/", "accept": {  "image/svg+xml": [ ".svg" ]  } },
		{ "action": "/", "accept": {  "image/pdf" : [ ".pdf" ]  } },
		{ "action": "/", "accept": {  "image/tiff": [ ".tif", ".tiff" ]  } },
		{ "action": "/", "accept": {  "image/ai"  : [ ".ai"  ]  } },
		{ "action": "/", "accept": {  "image/psb": [ ".psb" ]  } },
		{ "action": "/", "accept": {  "image/xcf": [ ".xcf" ]  } },
		{ "action": "/", "accept": {  "image/sketch": [ ".sketch" ]  } },
		{ "action": "/", "accept": {  "image/xd" : [ ".xd"  ]  } },
		{ "action": "/", "accept": {  "image/pxd": [ ".pxd" ]  } },
		{ "action": "/", "accept": {  "image/cdr": [ ".cdr" ]  } },
		{ "action": "/", "accept": {  "image/eps": [ ".eps", ".ps" ]  } },
		{ "action": "/", "accept": {  "image/x-icon": [ ".ico" ]  } },
		{ "action": "/", "accept": {  "image/jpx": [ ".jpx" ]  } },
		{ "action": "/", "accept": {  "image/jp2": [ ".jp2" ]  } },
		{ "action": "/", "accept": {  "image/x-tga": [ ".tga" ]  } },
		{ "action": "/", "accept": {  "image/vnd-ms.dds": [ ".dds" ]  } }
	],
	"share_target": {
		"action": "/",
		"method": "POST",
		"enctype": "multipart/form-data",
		"params": {
			"files": [
			{
				"name": "image",
				"accept": ["image/jpeg", "image/png", "image/webp", "image/gif"]
			}
		  ]
		}
	}
}
```

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/zY7DwqqJLZuLNAKem6dd.png", alt="The macOS Finder with the user right-clicking a file and then choosing 'Open with' Photopea.", width="800", height="808" %}

### The imperative part of the File Handling API

The imperative part of the API then deals with actually handling the file(s) that the operating system passes to the PWA. Photopea's [code](https://www.photopea.com/code/pp/pp.js) is obviously heavily minimized and uglified, but nevertheless the gist of the snippet below is not so hard to grasp. The [`LaunchQueue`](https://developer.mozilla.org/docs/Web/API/LaunchQueue) interface (minified as `N`) has a [`setConsumer()`](https://developer.mozilla.org/docs/Web/API/LaunchQueue/setConsumer) method, which accepts a function as an argument. This function in turn takes a [`LaunchParams`](https://developer.mozilla.org/docs/Web/API/LaunchParams) object (minified as `W`) . This `LaunchParams` object has a [`files`](https://developer.mozilla.org/docs/Web/API/LaunchParams/files) property pointing at a read-only array of [`FileSystemHandle`](https://developer.mozilla.org/docs/Web/API/FileSystemHandle) objects, which the rest of the code then loops over and for each obtains the [`File`](https://developer.mozilla.org/docs/Web/API/File) object (minified as `G`) by calling [`getFile()`](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/getFile). This file is then passed off to other logic in Photopea that takes care of displaying the file.

```js
var N = window.launchQueue;
if (N) {
  var $ = this.UA;
  N.setConsumer(function (W) {
    var O = W.files;
    console.log(O);
    for (var Y = 0; Y < O.length; Y++) {
      var T = O[Y];
      T.getFile().then(function (G) {
        $.YO([G], null, null, null, [T]);
      });
    }
  });
}
```

## Conclusions

[Users have been asking](https://www.reddit.com/r/photopea/comments/nwokkt/making_photopea_the_default_image_editor/) for [Photopea to become a file handler for images](https://github.com/photopea/photopea/issues/1901) for a long time. In 2020, when the question appeared, this feature was completely unthinkable, but an [eager user discovered the file handling API](https://github.com/photopea/photopea/issues/1901#issuecomment-1010608610) in its earliest stages in the beginning of 2022 when it was still behind a flag. File handling eventually [shipped in Chrome 102](https://fugu-tracker.web.app/#file-handling) and has been a beloved Photopea feature used on a daily basis by its users, some even [calling it a gamechanger](https://github.com/photopea/photopea/issues/1901#issuecomment-1011285025). Be sure to [give Photopea a try](https://www.photopea.com/), install it on your desktop, and then try opening one of the file formats it supports! Happy image editing!
