---
layout: 'layouts/blog-post.njk'
title: The EME logger extension
description: >
   EME Logger is a Chrome extension that logs Encrypted Media Extensions (EME) events and calls to the DevTools console.
authors:
  - samdutton
date: 2015-09-16
updated: 2015-09-16
---


Do you use Encrypted Media Extensions?

If so, you may be interested in [EME Logger](https://chrome.google.com/webstore/detail/eme-call-and-event-logger/cniohcjecdcdhgmlofniddfoeokbpbpb): a Chrome extension from Google that logs EME events and calls to the DevTools console along with debugging information.

You can install [EME Logger extension](https://chrome.google.com/webstore/detail/eme-call-and-event-logger/cniohcjecdcdhgmlofniddfoeokbpbpb) from the Chrome Web Store..

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/8f8Obn8dgc2nC4fdbdHC.png", alt="Screenshot of protected content playing in a video element on a web page, with the Chrome DevTools console showing logging from the EME Logger extension.", width="800", height="500" %}
</figure>


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/DthC6qO2W3uIGcuv1VBf.png", alt="Screenshot of the Chrome DevTools console showing logging from the EME Logger extension.", width="800", height="597" %}
</figure>


The code for EME Logger is available at [github.com/google/eme_logger](https://github.com/google/eme_logger). Patches, bug reports and feature requests welcome.

More information about EME is available from the HTML5 Rocks article [EME WTF](http://www.html5rocks.com/tutorials/eme/basics/)?

As an alternative to 'roll your own' EME, we recommend Shaka Player: an easy-to-use JavaScript library developed by Google that enables adaptive delivery of protected (and unprotected) media. Shaka Player implements [Dynamic Adaptive Streaming over HTTP](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx) with [Media Source Extensions](http://www.html5rocks.com/tutorials/eme/basics/#related-technology-1) to deliver the best possible video performance at any bandwidth. Shaka also supports multilingual content for audio tracks and subtitles. Find out more about Shaka Player at [g.co/shakainfo](http://g.co/shakainfo).



