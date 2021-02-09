---
title: "The Chromium Chronicle #5: Coding Outside the Sandbox"
description: >
  All code has bugs. The Chrome Browser process has no sandbox, meaning those
  bugs could give malcious code full access to the whole device. This episode
  explains the dos and don'ts of coding without a sandbox.
layout: 'layouts/blog-post.njk'
date: 2019-08-27
updated: 2019-09-17
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 5:** by Ade in Mountain View, CA (August, 2019)<br>
[Previous episodes](/tags/chromium-chronicle/)

Chrome is split into processes. Some of them are sandboxed, which means that
they have reduced access to the system and to users' accounts. In a sandboxed
process, bugs that allow malicious code to run are much less severe.

**The browser process has no sandbox**, so a bug could give malicious code full
access to the whole device. What should you do differently? And what's the
situation with other processes?

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/FFBrFUv5NMb2xhG4Zukw.png", alt="Sandbox diagram", height="310", width="800" %}

**All code has bugs.** In the browser process, those bugs allow malicious code
to install a program, steal user data, adjust computer settings, access content
of all browser tabs, login data, etc.

**In other processes, OS access is limited** via platform-specific restrictions.
For more information, see Chrome's [sandbox implementation guide][sandbox-implementation].

Make sure to avoid the following common mistakes:

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/H5cmSK3JieUkRBdPw9oj.jpg", alt="rule of two", className="float-left", height="597", width="800" %}

* **Don't parse or interpret untrustworthy data using C++ in the
  browser process.**
* Don't trust the origin a renderer claims to represent. The browser's
  [RenderFrameHost][render-frame-host] can be used to get the current origin securely.

<br style="clear: both;" />

{% Compare 'better' %}

Instead, use the following best practices:

* Be extra paranoid if your code is in the browser process.
* Validate all IPC from other processes. Assume all other processes are already
  compromised and out to trick you.
* Do your processing in a renderer or utility process or some other sandboxed
  process. Ideally, also use a memory safe language such as JavaScript
  (solves >50% security bugs).

{% endCompare %}

For years, we ran network stacks (e.g. HTTP, DNS, QUIC) in the browser process,
which led to some [critical vulnerabilities][critical-vulnerabilities]. On
some platforms, networking now has its own process, with a sandbox coming.

## Additional Resources

* [Chromium's Rule of Two][rule-of-two]: no more than two of unsafe data,
unsafe code, and unsafe process.
* [Validating IPC Data][validating-ipc]: a guide on how to ensure that IPCs
from the renderer process are not full of fibs and misrepresentations.

[sandbox-implementation]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[render-frame-host]: https://cs.chromium.org/search/?q=RenderFrameHost&sq=package:chromium&type=cs
[critical-vulnerabilities]: https://bugs.chromium.org/p/chromium/issues/list?q=type%3Dbug-security%20component%3AInternals%3ENetwork%20status%3Afixed%2Cverified%20security_severity%3Dcritical&can=1
[rule-of-two]: https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md
[validating-ipc]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/security/mojo.md#Validate-privilege_presuming-data-received-over-IPC
