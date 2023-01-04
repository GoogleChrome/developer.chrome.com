---
layout: 'layouts/blog-post.njk'
title: Chrome DevTools for mobile
description: Screencast and emulation
authors:
  - paulirish
date: 2013-12-02
#updated: 2014-07-04
---

Developing for mobile should be just as easy as it is developing for desktop. We've been working hard in the Chrome DevTools to make things easier for you and it's time to unveil some new features that should dramatically improve your mobile web development.  **First up, remote debugging and then we'll unveil proper mobile emulation**.

## Screencast your device screen to desktop

{% YouTube id="Q7rEFEMpwe4" %}

Until now, while remote debugging you've had to shift your eyes back and forth between your device and your devtools. Now, **Screencast displays your devices's screen right alongside your devtools**. Seeing it is good, but interacting with it is even better:

- licks on the screencast are **translated into taps** and proper touch events are fired on the device.
- **Inspect element** on your device with your desktop pointer
- Type on your desktop keyboard--**all keystrokes are sent to the device**. A huge timesaver over typing with your thumbs.
- Scroll the page by flinging it with your pointer or just sliding on your laptop trackpad.


The [full documentation on screencasting](/docs/devtools/remote-debugging/) captures all this and more, like sending a pinch zoom gesture. [Chrome on Android Beta](https://play.google.com/store/apps/details?id=com.chrome.beta) (m32) required.

## Easy Remote Debugging

18 months ago, Chrome introduced proper remote debugging for WebKit browsers, but if you tried it out back then, you had to deal with a 400MB Android SDK download, adding the `adb` binary to your `$PATH` and some magical command line incantations.

Now, we're happy to announce you can forget all that. **Chrome can now natively discover and talk to your USB connected devices**. We've implemented the `adb` protocol directly over USB in Chrome, so you you can easily head to `Menu > Tools > Inspect Devices` and immediately start your remote debugging session.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/qOcqomBEapYcCUn4F1GI.png", alt="Discover USB connected devices.", width="800", height="415" %}
</figure>

This works great in all platforms, including Chrome OS, though do note that on Windows, you'll need to first [install proper USB drivers](http://developer.android.com/tools/extras/oem-usb.html) to talk to the device. If you've never tried it before you'll also need to enable USB debugging on the device and confirm you're using Chrome for Android Beta. [Read the full docs.](/docs/devtools/remote-debugging/).

{% Aside 'gotchas' %}
Chrome will now keep your screen from going to sleep while you're remote debugging. Good for debugging but keep a watch on your device!
{% endAside %}

### Port-forward for local projects

You're developing on localhost:8000 but your phone can't reach that. So, we added port forwarding directly into the remote debugging workflow. Now it's easy to work on your full projects, without any tunneling hacks. On `about:inspect` click into Port Forwarding to set what ports you want available, and they'll light up in green if they're good to go.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/rPvm3XWt2k7xRQZEOOOM.png", alt="Port Forwarding", width="753", height="501" %}
</figure>

## Mobile Emulation

You don't always have the devices you need to test for compatibility, do you? While remote debugging real devices is going to give you the best feel for performance and touch, you can now realistically emulate many device characteristics on desktop, saving you time and making your iteration loop much faster.

{% YouTube id="z7sTRdSpA04" %}

### Emulate screen size, devicePixelRatio, and `<meta viewport>` with full touch event simulation

If you've seen the previous Device Metrics feature, what's now available is a huge upgrade.  The team has worked hard to make the new mobile emulation get a near-reality representation of what you'd see on real devices. For example, WebKit browsers maintain a complex text autosizing algorithm and, in fact, each device has a specific "fudge factor" for the text autosizing that changes to help keep text legible. In emulation mode you can confirm this behavior is being applied and see the results.

#### Device Pixel Ratio

Until now, it's been nearly impossible to see what a hi-DPI device displays on a low-DPI device. Now, the dPR emulation in DevTools will adapt your view to let you zoom into a deep DPI scenario. In addition, you can expect `window.devicePixelRatio`, `@media (-webkit-min-device-pixel-ratio: 2)`, `image-set( url(pic2x.jpg) 2x, …)`, etc to reflect your setting, allowing you to view how your app adapts including loading different dpi-specific assets.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/IURE3cAF9lTJewOjPzgo.gif", alt="Device pixel ratio small.", width="532", height="415" %}
</figure>

The device emulation does not extend all the way to browser features or bugs. So, while emulating iOS, WebGL will still work and you won't hit the [iOS 5 orientation zoom bug](https://github.com/scottjehl/Device-Bugs/issues/2). To experience that variability, head to the device.

#### Proper emulation of `<meta viewport>` (and `@viewport`)

Testing the behavior of what `width=device-width` and `minimum-scale:1.0` do has previously been a device-only game. Now you can quickly try out [different viewports](http://andreasbovens.github.io/understanding-viewport/) and observe how they're rendered.



{% Aside %}
**Protip**: use shift-drag or shift-scroll to mimic a pinch zoom on the device.
{% endAside %}

#### Touch Event simulation
The __emulate touch screen__ setting will make sure your clicks are interpretted as `touchstart` and so on. Plus, synthetic events like zoom, scroll and pan will work. To pinch-zoom, simply `shift`+drag or `shift`+scroll to zoom into the content. You'll get a great view of the content scaling beyond the viewport.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JEmtQ0SELXLSJOVA2JDZ.gif", alt="Scrolling emulation.", width="495", height="384" %}
</figure>

Lastly, your standbys of useragent spoofing (both at the request header and `window.navigator` level), geolocation, and orientation emulation let you explore your device's full functionality.

#### Device Presets
The emulation presets let you select a phone or tablet and get the correct screen size, __dPR__, UA applied for that device, along with full touch events and viewport emulated as well. You can try particular presets or easily can tweak these characteristics one by one.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/lMRjHu2GQHx2bg7EumGk.png", alt="Device presets", width="568", height="419" %}
</figure>

Hop over to devtools.chrome.com for the [full docs on Mobile Emulation with DevTools](/docs/devtools/device-mode)

## Demo
To get the full demo of **all these features in action**, check out my 23 minute talk from Chrome Dev Summit on the DevTools for mobile:

{% YouTube id="gZH1d2Co1X0" %}
