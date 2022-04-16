---
layout: 'layouts/blog-post.njk'
title: Introducing video player sample 
description: >
  The Video Player Sample is an open source video player web app built using the same architecture as the 60 Minutes and RedBull.tv apps.
authors:
  - petelepage
date: 2012-01-06
updated: 2019-02-01 

---

Have you ever wanted a fun and beautiful way to publish videos on your own site like the new [60 Minutes](http://www.cbsnews.com/htdocs/60minutesapp/) or [RedBull.tv](https://chrome.google.com/webstore/detail/red-bull-tv/pbalkogcfbpplioohgihkidalmomblfc) apps from the Chrome Web Store? I'm excited to announce the release of [The Video Player Sample](https://code.google.com/archive/p/video-player-sample/) web app! The Video Player Sample is an open source video player web app built using the same architecture as the 60 Minutes and RedBull.tv apps. It can be customized, extended, or just used out of the box and populated with your own content.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/c0EC0gpUC3DphdxjKvm1.png", alt="Video player example full screen", width="320", height="240" %}
</figure>

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Pof6PIn8JwFH79YWLtnx.png", alt="Video player example", width="320", height="240" %}
</figure>

## How it works

When a user opens the Video Player Sample, they can choose to watch a single video or create a playlist of videos/episodes from a list that they have uploaded and populated to the app. [The Video Player Sample](https://code.google.com/archive/p/video-player-sample/downloads) is configured and information about the videos is stored in JSON files (config.json and data.json respectively), both of which are located in the data directory.

### Key features
* A beautiful video watching experience, including a full screen view
* Ability to subscribe to shows, watch episodes, create play lists
* Support for multiple video formats depending on what the user’s browser supports (including WebM, Ogg, MP4, and even a Flash fallback)
* A [Categories](http://video-player-sample.appspot.com/#/shows) page with an overview of the different shows/categories available in the app
* Notifications of new episodes (when the app is installed via the Chrome Web Store)
* Built in support for sharing to Google+, Twitter and Facebook
* To ensure easy customization, all source files, including the Photoshop PSD’s, are included

### How it's built

The Video Player Sample is written for the open web platform using HTML and JavaScript, broadly following the [Model View Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern and structure.

* It is built using the open source [Google Closure JavaScript library](https://developers.google.com/closure/)
* Compiled with the [Closure Compiler](https://developers.google.com/closure/compiler/)
* Distributed through the Chrome Web Store to take advantage of notifications

### Browser Support

In addition to working as an app that can be installed through the Chrome Web Store, the Video Player Sample has been tested and works in all of the modern browsers.

### Try it out

You can see a demo of the video player in action in the [demo app](https://code.google.com/archive/p/video-player-sample/downloads). To learn more about how the app works, check out the [documentation](https://code.google.com/archive/p/video-player-sample/).

You can grab the code from [Google Code](https://code.google.com/archive/p/video-player-sample/).

Enjoy!


