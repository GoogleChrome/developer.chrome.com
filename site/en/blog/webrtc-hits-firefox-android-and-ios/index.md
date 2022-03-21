---
layout: 'layouts/blog-post.njk'
title: WebRTC hits Firefox, Android and iOS
description: >
  WebRTC hits Firefox, Android and iOS
authors:
  - samdutton
date: 2012-12-09
updated: 2019-02-22

---

A **lot** has happened with WebRTC over the last few weeks. Time for an update!

In particular, we're really excited to see WebRTC arriving on multiple browsers and platforms.

`getUserMedia` is available now in Chrome with no flags, as well as Opera, and Firefox Nightly/Aurora (though for Firefox you'll need to [set preferences](https://hacks.mozilla.org/2012/11/progress-update-on-webrtc-for-firefox-on-desktop/)). Take a look at the cross-browser demo of `getUserMedia` at [simpl.info/gum](https://simpl.info/getusermedia/) - and check out Chris Wilson's [amazing examples](http://webaudiodemos.appspot.com/) of using `getUserMedia` as input for Web Audio.

`webkitRTCPeerConnection` is now in Chrome stable and it's flagless. TURN server support is available in Chrome 24 and above. There's an ultra-simple demo of Chrome's RTCPeerConnection implementation at [simpl.info/pc](https://simpl.info/rtcpeerconnection/) and a great video chat application at [apprtc.appspot.com](//apprtc.appspot.com). (A word of explanation about the name: after several iterations, it's currently known as `webkitRTCPeerConnection`. Other names and implementations have been deprecated. When the standards process has stabilized, the `webkit` prefix will be removed.)

WebRTC has also now been implemented for desktop in Firefox Nightly and Aurora, and for iOS and Android via the Ericsson [Bowser browser](https://labs.ericsson.com/apps/bowser).

## DataChannel

[DataChannel](https://www.html5rocks.com/tutorials/webrtc/basics/) is a WebRTC API for high performance, low latency, peer-to-peer communication of arbitrary data. The API is simple-similar to WebSocket - but communication occurs directly between browsers, so DataChannel can be much faster than WebSocket even if a relay (TURN) server is required (when 'hole punching' to cope with firewalls and NATs fails).

DataChannel is planned for version 25 of Chrome, behind a flag – though it may miss this version. This will be for experimentation only, may not be fully functional, and communication won't be possible with the Firefox implementation. DataChannel in later versions should be more stable and will be implemented so as to enable interaction with DataChannel in Firefox.

Firefox Nightly/Aurora supports `mozGetUserMedia`, `mozRTCPeerConnection` and `DataChannel` (but don't forget to set your about:config preferences!)

Here's a screenshot of DataChannel running in Firefox:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/BaO7CJv1MbtPW6GKQEIw.png", alt="Firefox DataChannel screenshot", width="800", height="868" %}
</figure>

This demo is at [http://mozilla.github.com/webrtc-landing/data_test.html](http://mozilla.github.io/webrtc-landing/data_test.html). Here's a code snippet:


```js
pc1.onconnection = function() {
    log("pc1 onConnection ");
    dc1 = pc1.createDataChannel("This is pc1",{}); // reliable (TCP-like)
    dc1 = pc1.createDataChannel("This is pc1",{outOfOrderAllowed: true, maxRetransmitNum: 0}); // unreliable (UDP-like)
    log("pc1 created channel " + dc1 + " binarytype = " + dc1.binaryType);
    channel = dc1;
    channel.binaryType = "blob";
    log("pc1 new binarytype = " + dc1.binaryType);

    // Since we create the datachannel, don't wait for onDataChannel!
    channel.onmessage = function(evt) {
    if (evt.data instanceof Blob) {
        fancy_log("*** pc2 sent Blob: " + evt.data + ", length=" + evt.data.size,"blue");
    } else {
        fancy_log('pc2 said: ' + evt.data, "blue");
    }
    }
    channel.onopen = function() {
    log("pc1 onopen fired for " + channel);
    channel.send("pc1 says Hello...");
    log("pc1 state: " + channel.state);
    }
    channel.onclose = function() {
    log("pc1 onclose fired");
    };
    log("pc1 state:" + channel.readyState);
        }
```

More information and demos for the Firefox implementation are available from the [hacks.mozilla.org blog](https://hacks.mozilla.org/2012/11/progress-update-on-webrtc-for-firefox-on-desktop/). Basic WebRTC support is due for release in Firefox 18 at the beginning of 2013, and support is planned for additional features including `getUserMedia` and createOffer/Answer constraints, as well as TURN (to allow communication between browsers behind firewalls).

For more information about WebRTC, see [Getting Started With WebRTC](https://www.html5rocks.com/tutorials/webrtc/basics/). There's even a [WebRTC book](http://webrtcbook.com/), available in print and several eBook formats.

## Resolution Constraints

[Constraint have been implemented in Chrome 24 and above](https://tools.ietf.org/html/draft-alvestrand-constraints-resolution-00#page-4). These can be used to set values for video resolution for `getUserMedia()` and RTCPeerConnection `addStream()` calls.

There's an example at [simpl.info/getusermedia/constraints](https://simpl.info/getusermedia/constraints/index.html). Play around with different constraints by setting a breakpoint and tweaking values.

A couple of gotchas... `getUserMedia` constraints set in one browser tab affect constraints for all tabs opened subsequently. Setting a disallowed value for constraints gives a rather cryptic error message:

```js
navigator.getUserMedia error:  NavigatorUserMediaError {code: 1, PERMISSION_DENIED: 1}
```

Likewise the error if you try to use `getUserMedia` from the local file system, not on a server!

## Streaming screen capture

Tab Capture is now available [in the Chrome Dev channel](/extensions/tabCapture). This makes it possible to capture the visible area of the tab as a stream, which can then be used locally, or with RTCPeerConnection's `addStream()`. Very useful for sceencasting and web page sharing. For more information see the [WebRTC Tab Content Capture proposal](http://www.chromium.org/developers/design-documents/extensions/proposed-changes/apis-under-development/webrtc-tab-content-capture).

Keep us posted by commenting on this update: we'd love to hear what you're doing with these APIs.

...and don't forget to file any bugs you encounter at [chromiumbugs.appspot.com](https://chromiumbugs.appspot.com/)!
