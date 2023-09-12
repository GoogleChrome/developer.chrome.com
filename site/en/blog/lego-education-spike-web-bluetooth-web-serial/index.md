---
layout: 'layouts/blog-post.njk'
title: 'How LEGO® Education uses the Web Bluetooth and the Web Serial APIs'
subhead: >
  For its programmable SPIKE™ kits, LEGO® Education uses the power of the web to
  make connecting the LEGO models to the computer as simple as possible.
date: 2023-05-22
updated: 2023-05-26
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/XDqpoF5gXT6DdADGPGCq.png
alt: Kids playing with the LEGO Education SPIKE kit.
authors:
  - thomassteiner
  - jakobdamjensen
tags:
  - capabilities
  - case-study
  - fugu-case-study
---

The
[LEGO® Education SPIKE™ Prime Set](https://education.lego.com/en-us/products/lego-education-spike-prime-set/45678#spike%E2%84%A2-prime)
is a STEAM (science, technology, engineering, arts and mathematics) learning
tool for students in grades six through eight (about 11 to 13 years). Combining colorful LEGO building elements,
easy-to-use hardware, and an intuitive drag-and-drop coding language based on
[Scratch](https://scratch.mit.edu/) and Python, SPIKE Prime continuously engages
students through playful learning activities to think critically and solve
complex problems, regardless of their learning level… while having fun!

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/0EVDxvuMhoU27IAu9qzG.png", alt="The breakdancer model assembled from LEGO.", width="383", height="396" %}

## Programming experience

Students use either icon blocks, word blocks (default), or Python code to
program their models. The programming environment is adapted from the
[Scratch editor](https://scratch.mit.edu/projects/editor/?tutorial=getStarted),
familiar to many students already from early STEAM education in school. In the
two visual modes, students connect blocks by dragging and dropping them onto the
programming canvas, and hook up the various blocks by connecting them.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/6LMbcOYP78GzT11Mt2tU.png", alt="The LEGO programming environment with a word block program.", width="800", height="533" %}

More advanced students can opt to use real Python code directly, which comes
with an integrated Knowledge Base to support students while they code.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/QGOUpXnJMFoj6zdzKA2Q.png", alt="The LEGO programming environment with a Python program.", width="800", height="533" %}

Having created a program in the LEGO Education SPIKE app, the students send the
program to the LEGO Education Spike Prime hub over a Bluetooth or USB
connection. The hub executes the program and controls the LEGO model.

## Included hardware

The brain of the SPIKE Education kit is the hub, which serves to control the
various other pieces of hardware like the sensors and the motors. The kit
includes a color sensor, distance sensor, and force sensor. There are also two
motors: one large, one medium. The hub connects to the computer via Bluetooth or
USB.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/AXMYSTWC9jlixgE0s49R.png", alt="The programmable parts of the LEGO SPIKE Education kit: the large hub, the three sensors for color, distance, and force; and the two motors.", width="659", height="388" %}

## Supported applications

Apart from
[platform-specific apps](https://education.lego.com/en-us/teacher-resources/lego-education-spike-prime/support-technical-info/lego-education-spike-prime-support-technical-info-get-the-lego-education-spiketm-app),
LEGO also offers the SPIKE web app, which is accessible at
[spike.legoeducation.com](https://spike.legoeducation.com). The app is currently
not cached in the browser in any way; hence users always need to be connected to
the Internet for the web app to work. LEGO officially supports Chrome browsers
on Windows 10 and 11, MacBooks, and Chromebooks. Caching improvements and making
the app installable are planned features for the future.

## Connecting the SPIKE Hub

The SPIKE Prime hub and the SPIKE Essential hub can be connected to the computer
using Bluetooth or USB. By default, the web app uses Bluetooth via the
[Web Bluetooth API](/articles/bluetooth/).

{% Video src="video/8WbTDNrhLsU0El80frMBGE4eMCD3/1BtcLKYEdq0dhVZ2L4T7.mp4", width="800", height="450", autoplay=true, loop=true, muted=true, playsinline=true %}

Alternatively, the web app uses the
[Web Serial API](/articles/serial/) when connected
via USB. In both cases, apart from the USB cable, the connection flow is almost
identical.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/QNJlGX6ACQRw235OeOQ8.png", alt="LEGO Education SPIKE app with USB connection instructions.", width="800", height="533" %}

Once connected, students upload their programs to one of the 20 storage slots of
the large hub.

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/TMt4Y8xVVWKbeVtiTIrF.png", alt="LEGO Education SPIKE 'Download to Hub' UI.", width="502", height="324" %}

For communicating with the hub, the Web Bluetooth and the Web Serial API need a
[`BluetoothDevice`](https://developer.mozilla.org/docs/Web/API/BluetoothDevice)
or a [`SerialPort`](https://developer.mozilla.org/docs/Web/API/SerialPort)
respectively. These are obtained as in the code snippets below taken from the
live app.

### Web Bluetooth API connection

```js
(X.next = 4),
  navigator.bluetooth.requestDevice({
    filters: [
      {
        namePrefix: 'GDX',
      },
    ],
    optionalServices: ['d91714ef-28b9-4f91-ba16-f0d9a604f112'],
  });
```

### Web Serial API connection

```js
const v = yield navigator.serial.requestPort({
  filters: [{
    usbVendorId: Zt.SerialVendorId.LEGO // 1684
  }]
});
yield v.open({
  baudRate: 115200
});
```

## Reasons for going web-first and using web hardware APIs

Currently, LEGO maintains
[independent versions](https://education.lego.com/en-us/downloads/spike-app/software)
of their app for Android, macOS/iPadOS, and Windows; plus
[legacy versions](https://education.lego.com/en-us/downloads/spike-legacy-app/software)
of the platform-specific apps on top, in addition to the web app. By pushing the
web app on platforms that support the underlying web hardware APIs in Chrome,
namely macOS, Windows, and ChromeOS, LEGO developers can reduce their app
maintenance burden significantly.

Another reason is download size. The web app downloads less than 20 MB in total,
whereas the macOS and iPadOS app weighs 115 MB, the Android app 178 MB, and the
Windows app clocks in at 292 MB. The initial install however, does not include
the lesson material needed in classrooms. After downloading this material, the
size increases by almost 1 GB. On the web app, the lesson content is streamed,
which enables the user to always have the latest version and only download the
exact lesson they are looking at.

Apart from these technical reasons, simplicity of classroom use is another strong
argument for going web-first. Students don't need to install an app and keep it
updated. Instead, they just follow a link and always work with the most recent
version. From LEGO's end, content updates are always possible, independent from app
store review processes.

## Tinkering with LEGO on the web

LEGO was always about creatively assembling bricks, and with LEGO Education
SPIKE being accessible from web browsers, this kit is no exception from the
rule. The developer community has already begun to create code that talks to
SPIKE. One example is [PyREPL-JS](https://github.com/tuftsceeo/PyREPLforSPIKE)
started by Tufts University's
[Gabriel Sessions](https://github.com/gabrielsessions) that provides a
[MicroPython REPL](https://pyrepl.web.app/) (read–eval–print loop) for web pages
to talk to the SPIKE hub. [Ethan Danahy](https://github.com/edanahy), likewise
from Tufts, then uses this REPL for a number of
[Web-Interfaces for SPIKE Prime](https://edanahy.github.io/WebSPIKE/), one of
which being the
[breakdancer synced to an audio file](https://education.lego.com/en-us/lessons/prime-life-hacks/break-dance#coding-tips).
The university even hosted a workshop on doing
[Machine Learning with SPIKE](https://edanahy.github.io/MLwithSPIKEworkshop/)
and hosts a
[Robotics Playground](https://www.ceeoinnovations.org/RoboticsPlayground/) with
instructions and code samples. A good start also is
[Hello SPIKE](https://edanahy.github.io/HelloSPIKE/).

{% Img src="image/8WbTDNrhLsU0El80frMBGE4eMCD3/LpftEeI6oem1QbBzVPWZ.png", alt="The breakdancer LEGO model synced to an audio file.", width="430", height="257" %}

By allowing students to communicate with physical LEGO models from within the
browser, the Web Serial and Web Bluetooth APIs open up a world of possibilities
for educational, creative, and entertainment applications. Students will always
have the latest version of the app without needing to update it. LEGO developers
in the long run will have fewer apps to maintain, which means reduced cost and
less development effort, leaving more time for doing what LEGO is best known
for: unlocking creativity.
