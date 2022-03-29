---
layout: 'layouts/blog-post.njk'
title:  Lighthouse 2.5 updates
description: >
     Five new audits, the chrome-launcher standalone Node module, and a new throttling guide.
authors:
    - vinamratasingal
    - brendankenny
date: 2017-10-17
updated: 2017-10-17
---


[Lighthouse][LH] 2.5 is now released! Highlights include:



* [chrome-launcher available as a standalone Node module](#launcher).
* [Five new audits](#audits).
* [A new throttling guide for advanced audiences](#throttling).

See the [release notes][RN] for the full list of new features, changes,
and bug fixes coming to Lighthouse in version 2.5.



## chrome-launcher is now a standalone Node module

[chrome-launcher][cl] is now a standalone Node module, making it easier
to launch Google Chrome from your own Node applications.



## Five new audits

### Appropriate aspect ratios

*Category: Best Practices*

The **Does not use images with appropriate aspect ratios** audit alerts
you when an image's rendered aspect ratio is significantly different
than the image's actual dimensions. The aspect ratio is the ratio between
width and height. If the ratio is significantly different when rendered,
then the image probably looks distorted.


### JavaScript libraries with security vulnerabilities 

*Category: Best Practices*

The **Includes front-end JavaScript libraries with known security
vulnerabilities** audit warns you about how many vulnerabilities a library
has, as well as the highest severity level among those vulnerabilities.


### Unused JavaScript

*Category: Performance*

The **Unused JavaScript** audit breaks down how much JavaScript a page loads
but does not use during startup.

Note: This audit is only available when running Lighthouse from Node or
the command line in [full-config mode][full].




### Low server response times

*Category: Performance*

The **Keep server response times low (TTFB)** audit measures how long it
takes the client to receive the first byte of the main document. If Time To
First Byte (TTFB) is long, then the request is taking a long time traveling
through the network, or the server is slow.


### Console errors 

*Category: Best Practices*

The **Browser errors were logged to the console** audit alerts you to
any errors that are logged to the console as the page loads.


## Throttling guide 

Check out the new [Throttling Guide][Throttling] to learn how to
conduct high-quality, packet-level throttling. This guide is intended
for advanced audiences.

[throttling]: https://github.com/GoogleChrome/lighthouse/blob/master/docs/throttling.md
[cdt]: /web/tools/lighthouse/#devtools
[node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[cli]: /web/tools/lighthouse/#cli
[ce]: /web/tools/lighthouse/#extension
[lh]: /web/tools/lighthouse/
[rn]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.5.0#chrome-launcher
[cl]: https://www.npmjs.com/package/chrome-launcher
[full]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/config/full-config.js