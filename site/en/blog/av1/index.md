---
title: Improved video calling with faster AV1 encoding
description: >
 Chrome 113 includes inprovements to the AV1 software encoder from the Chrome Open Media team.
layout: 'layouts/blog-post.njk'
date: 2023-05-02
hero: 'image/kheDArv5csY6rvQUJDbWRscckLr1/S3R9fqgJNQhGjrl1oIpr.jpg'
alt: A woman sat at an outdoor table looking into a laptop.
authors:
 - roshanbaliga
 - marcopaniconi
 - yunqingwang
tags:
 - performance
 - chrome-113
 - media
---

Videoconferencing brings us together, even when we're thousands of miles apart. Whether it's catching up with your best friend, or having a quick meeting with a coworker, video calls have become an integral part of our lives.

State of the art video codecs such as [AV1](https://en.wikipedia.org/wiki/AV1) can dramatically improve video call quality, while using less bandwidth to transmit higher quality video.  We're now seeing AV1 hardware encoders in desktops and laptops, but what about users who have older devices?

The Chrome Open Media team has worked for the last 18 months to make the AV1 software encoder (libaom) much faster, unlocking better quality AV1 video calling on all devices. Chrome 113 includes libaom v3.6.0, which greatly improves real-time communications performance—both speed and quality—for speeds 6 through 10. In particular we added a "Speed 10" setting for devices with limited CPU capabilities. 

Google Meet has tested AV1 successfully in extremely low bandwidth conditions—down to 40 kbps—which unlocks video calling to users whose poor Internet connections previously prevented them from making video calls.  Users with better Internet connectivity get improved video calls.  Compared to VP9 speed 7, AV1 Speed 10 provides 12% better quality at the same bandwidth, while running 25% faster on desktops.

The 3.6.0 release of libaom also includes improvements targeting screen sharing. Compared to VP9 speed 7, AV1 Speed 10 provides 45% better compression while running 35% faster. 

Starting with Chrome 113 any WebRTC app can take advantage of these AV1 improvements.

## Resources

- [The full source code for libaom 3.6.0](https://aomedia.googlesource.com/aom/+/refs/tags/v3.6.0).
- [The Getting Started guide for WebRTC](https://webrtc.org/getting-started/overview).

## Acknowledgments

Many thanks to the entire Chrome Open Media team for their work on AV1, especially Jerome Jiang, Marco Paniconi, Chi Yo Tsai, and Yunqing Wang.  Special thanks to Michael Horowitz from the Google Meet team.

_Image by [Anete Lūsiņa](https://unsplash.com/@anete_lusina?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)._
