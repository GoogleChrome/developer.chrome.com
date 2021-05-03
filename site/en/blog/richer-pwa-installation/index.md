---
layout: 'layouts/blog-post.njk'
title: Richer PWA installation UI
description: An introduction to the Richer Install UI with guidance on how to implement it.
date: 2021-04-23
authors:
  - mustafa
tags:
  - progressive-web-apps
hero: "image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/H5CevJUnOWSewM02r4on.jpg"
alt: "New install surface for progressive web apps"
---

{% Aside 'caution' %}
This is an experimental UI, and could potentially change in the future depending on developer, user, 
and partner feedback. We are also planning on expanding the UI to consider use cases where users need to be 
educated about powerful features like WebSockets. 
{% endAside %}


## Introduction {: #introduction }

Mobile devices and the introduction of device vendor app stores have changed users' mental model
of how to discover, evaluate and install software. Users are now so familiar with app stores, and
the additional information that is provided through app stores such as context about the app,
social feedback, ratings etc that you see the app store metaphor emerging in Desktop operating
systems including ChromeOS, Mac and Windows. 

 
## Challenge with today's install surfaces {: #today }

Today, if a user wants to install a PWA, an infobar and modal overlay appears with minimal
information. If they continue to install, the process is over too quickly without giving
context to the user. This goes against their expectations of installing apps and can leave them
somewhat confused about what has happened.  


{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/VwB1V3K61vQMs1htKJpY.png", alt="An example of PWA install UI", width="360", height="720" %}

To enable developers to provide installed experiences on par with native experiences
Chrome is introducing a new install surface, Richer Install, that allows developers to add a
description and screenshots to their manifest file and have it appear in a bottomsheet dialog
within Chrome for Android. 

{% Columns %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/RoQRxu3CPkKvAtkxYsAQ.jpeg", alt="Example of bottomsheet UI in Chrome", width="360", height="720" %}
{% Aside %}
Example of bottomsheet UI in Chrome.
{% endAside %}
{% endColumn %}
{% endColumns %}

This gives developers the opportunity to create a more enticing install process
that better aligns to user expectations and that mimics their existing mental model
of installed experiences. 

{% Columns %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/SpStAtUk8Zp5iwi9yqKP.jpg", 
alt="Richer Install UI Expanded", width="342", height="722" %}
{% Aside %}
Richer Install UI Expanded
{% endAside %}
{% endColumn %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/k7r4yKqrh6iOm2XyZHfw.jpg", 
alt="Richer Install UI Collapsed", width="342", height="722" %}
{% Aside %}
Richer Install UI Collapsed
{% endAside %}
{% endColumn %}
{% endColumns %}

## Backwards compatibility {: #compatibility }

Websites that do not include at least one screenshot to their manifest file will continue to receive 
the existing prompts. This may change in the future depending on uptake of the developer community 
and users' reaction.  

## Previewing the UI {: #previewing }

This UI works in M91 non stable channels (Chrome Dev and Chrome Canary) on Android, with the flag `#mobile-pwa-install-use-bottom-sheet` enabled in `chrome://flags`.

This feature is enabled on [squoosh.app](https://squoosh.app) and can be previewed there. As an
aside, [#screenshots](https://web.dev/add-manifest/#screenshots) and 
[#description](https://web.dev/add-manifest/#description) fields are already documented; 
you can give it a try behind the flag. 

## Implementation {: #implementation }

To enable Richer installs on your site you need to add at least one screenshot to your 
manifest file. Descriptions are not required but are recommended. 

Origins that are too long to fit the UI are truncated, this is also known as eliding and is used
as a [security measure to protect users](https://chromium.googlesource.com/chromium/src/+/master/docs/security/url_display_guidelines/url_display_guidelines.md#eliding-urls). 

Let's take a look at how you can trigger Richer Install UI when installing a PWA. This is an example
of a squoosh.app implementation. Let's assume that you have your name and origin
defined.

The manifest should look like this; 

 ```javascript
 {
"name": "Squoosh App",
"icons": [{
"src": "image/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
"start_url": "/?start_url",
"scope": "/",
"display": "standalone",
"background_color": "#fff",
"theme_color": "#fff"
}
 ```

Now add the screenshots to the end of the manifest.json file; 

## Screenshots {: #screenshots }

To add screenshots you need to determine the size, source and type, following this 
[criteria](https://web.dev/add-manifest/#screenshots). 

* Width and height must be at least 320px and at most 3840px.
* The maximum dimension can't be more than 2.3 times as long as the minimum dimension.
* Screenshots must have the same aspect ratio.
* Only JPEG and PNG image formats are supported.

Currently animated gifs are not supported. Also, you need to include the size and type of the image so it 
is rendered correctly. 
[See this code example](https://glitch.com/edit/#!/richerinstall-screenshot?path=manifest.json%3A14%3A24).

 ```javascript
 "screenshots": [
    {
     "src": "source/image1.gif",
      "sizes": "320x640",
      "type": "image/gif"
    }
]
```
 
{% Columns %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/7jsL23QoMfniU7WTHDK8.jpg", 
alt="A single screenshot added.", width="342", height="684" %}
{% Aside %}
A single screenshot added.
{% endAside %}
{% endColumn %}
{% endColumns %}

## Description {: #description }

Descriptions are not compulsory, so there is no minimum requirement. However, there is a maximum that 
kicks in after 7 lines of text (roughly 324 characters). After this an ellipse will appear and 
truncate longer descriptions 
([for example](https://glitch.com/edit/#!/richerinstall-longer-description)). 

In the future we will consider adding other data such as categories and app rating, but this will 
be based on feedback from developers and users. 
[See the example code here](https://glitch.com/edit/#!/richerinstall-description?path=manifest.json%3A13%3A29).

 ```javascript
"description": "Compress and compare images with different codecs 
right in your browser."
 ```

{% Columns %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/oOj7Ls7cQ8E274faxfOz.jpg", 
alt="Description added", width="342", height="684" %}
{% Aside %}
Description added.
{% endAside %}
{% endColumn %}
{% Column %}
{% Img src="image/xizoeLGxYNf3VLUHc5BsIoiE1Af1/Dpzs03K6QmBkZaefX2nU.jpg", 
alt="A longer description that has been truncated.", width="342", height="684" %}
{% Aside %}
Longer descriptions are truncated.
{% endAside %}
{% endColumn %}
{% endColumns %}



## Feedback  
In the coming months we would love to see how developers explore this new UI patterned and we 
would like to get feedback from you. Reachout to us on 
[Twitter](https://twitter.com/ChromiumDev). 