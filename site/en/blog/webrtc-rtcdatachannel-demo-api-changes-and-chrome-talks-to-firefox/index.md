---
layout: 'layouts/blog-post.njk'
title: WebRTC - RTCDataChannel demo, API changes... and Chrome talks to Firefox
description: >
  WebRTC - RTCDataChannel demo, API changes... and Chrome talks to Firefox
authors:
  - samdutton
date: 2013-02-05
updated: 2019-03-09

---

More good news from our old friend [WebRTC](https://webrtc.org/).

[To be precise](https://en.wikipedia.org/wiki/File:Thomson_and_Thompson_in_Asterix.png): three pieces of good news and a couple of minor API changes.

## RTCDataChannel for Chrome

RTCDataChannel has been implemented in Chrome, and there's a great little demo at [simpl.info/dc](https://simpl.info/rtcdatachannel/).

This demo shows peer-to-peer communication of arbitrary data &ndash; in less than a hundred lines of code. You'll need Chrome 25 or above for this, which at this point means [Beta](https://www.google.com/intl/en/chrome/beta/) or [Canary](https://www.google.com/intl/en/chrome/canary/).

RTCDataChannel makes the most of features built into RTCPeerConnection &ndash; not least, the use if the ICE framework to get through firewalls and NATs &ndash; and has lots of potential applications where low latency is paramount: for gaming, remote desktop applications, real-time text chat and file transfer.

For more information about RTCDataChannel, take a look at [Getting Started with WebRTC](https://www.html5rocks.com/tutorials/webrtc/basics/#toc-rtcdatachannel).

## API changes

Less exciting, but still important: from Chrome 26, some RTCPeerConnection and MediaStream API properties have become __getter__ methods:
1. MediaStream now has the `getAudioTracks()` method instead of the audioTracks property, and `getVideoTracks()` instead of `videoTracks`.
1. RTCPeerConnection now has `getLocalStreams()` instead of `localStreams`, and `getRemoteStreams()` instead of `remoteStreams`.


To get a glimpse of MediaStream in action, take a look at the [simpl.info/gum](https://simpl.info/getusermedia/) `getUserMedia` demo. The `stream` variable is in global scope: examine it from the console. Likewise for RTCPeerConnection at [simpl.info/pc](https://simpl.info/pc): the RTCPeerConnection objects `pc1` and `pc2` are in global scope.

## Chrome <=> Firefox

[And](https://twitter.com/search?q=webrtc+chrome+firefox) [in](https://webrtc.github.io/samples/) [case](https://webcache.googleusercontent.com/search?q=cache:PLV2QvKBwkIJ:https://hacks.mozilla.org/2013/02/hello-chrome-its-firefox-calling/+&cd=1&hl=en&ct=clnk) [you](https://blog.chromium.org/2013/02/hello-firefox-this-is-chrome-calling.html) [missed](https://news.google.com/search?q=chrome+firefox+webrtc&hl=en-US&gl=US&ceid=US:en) [it](https://news.ycombinator.com/item?id=5166239), Chrome can now 'talk' to Firefox.

You can try this out now at [webrtc.org/start](https://webrtc.org/start/), which has full instructions, links to source code, and information about API differences.</p>

Tip of the hat to those at Mozilla and Google who made it all happen.

{% YouTube id="MsAWR_rJ5n8" %}

Happy coding! And please let us know of any bugs, either by commenting on this post, or at [bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect).
And don't forget, you can always get up-to-date implementation information from the excellent [chromestatus.com](https://www.chromestatus.com/features).


