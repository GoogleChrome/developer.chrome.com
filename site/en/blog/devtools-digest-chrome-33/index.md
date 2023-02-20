---
layout: 'layouts/blog-post.njk'
title: DevTools Digest
description: Updates to the Developer tools in Chrome 33
authors:
  - umarhansa
date: 2014-02-27
#updated: 2014-07-04
---

## Asynchronous call stacks

Stack traces can now be associated with the asynchronous source of an event. There is support for timers, animation frames, XHRs, event listeners and more. We'll soon be posting a full writeup of asynchronous call stacks to HTML5 Rocks. (Don't forget to check 'Enable support for async stack traces' in DevTools experiments.) [[crbug.com/272416](https://code.google.com/p/chromium/issues/detail?id=272416)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/10v9MSO8CmTbgqib7kJe.png", alt="Async call stack.", width="468", height="289" %}
</figure>

## getEventListeners(window)

When viewing the DOM of a page, it's not always obvious what elements have JavaScript event listeners registered on them, if any. All registered event listeners on the `window` object (or any DOM node for that matter) can now be retrieved via [getEventListeners](https://developers.google.com/chrome-developer-tools/docs/commandline-api#geteventlistenersobject) in the Console panel as part of the Command Line API. [[crbug.com/336472](https://code.google.com/p/chromium/issues/detail?id=336472)]

## Navigate through source code editing locations

Sources panel introduces the concept of editing locations which are essentially cursor positions in the code editor. `Alt-` takes you to previous editing locations (the piece of code you were previously at) and `Alt+` goes forward. [[crbug.com/281507](https://code.google.com/p/chromium/issues/detail?id=281507)]

## Box Shadow auto suggest values are updated

Auto suggest values for the CSS property `box-shadow` have been updated to include the keyword of `none`. [[crbug.com/332355](https://code.google.com/p/chromium/issues/detail?id=332355)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Yux0PdVucZzzZuwJyvvA.png", alt="Box-shadow none", width="213", height="88" %}
</figure>

## Go to a specific line number and a specific column

Go to a line number at a specific column using `:line:column` in the Sources panel ‘Search by filename’ (`Ctrl + O` or `Cmd + O`) dialogue box. [[crbug.com/337909](https://code.google.com/p/chromium/issues/detail?id=337909)]


<figure>
{% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/v7fTkaWsMpwpDW4HnyvH.mp4", autoplay="true", loop="true", muted="true"%}
</figure>

## Easier resizing with the toolbar handle

Any empty space on the main DevTools toolbar now acts as a valid resize handle. [[crbug.com/304730](https://code.google.com/p/chromium/issues/detail?id=304730)]

## Retina friendly network bars

The network bars which were originally formed from images have now been created in CSS making them resolution independent and retina friendly. [[crbug.com/330659](https://code.google.com/p/chromium/issues/detail?id=330659)]

## Reducing noise in the console

Unknown arguments passed to the [meta viewport](https://developer.mozilla.org//docs/Mozilla/Mobile/Viewport_meta_tag) tag are no longer displayed as errors in the console, but rather, warnings meaning less noise for you to sift through. [[crbug.com/332794](https://code.google.com/p/chromium/issues/detail?id=332794)]

## Remove color formatting cog

The Styles pane cog to cycle through color formats is now removed, though you can still change this preference in DevTools settings. [[crbug.com/333840](https://code.google.com/p/chromium/issues/detail?id=333840)]

## Sticky console tab

The console tab in the drawer now correctly remembers its state correctly after a reload. [[crbug.com/328551](https://code.google.com/p/chromium/issues/detail?id=328551)]

## Improved explanation on text autosizing

A link to the [mobile emulation](https://developers.google.com/chrome-developer-tools/docs/mobile-emulation) documentation has been added into DevTools to help explain more on emulation and Text autosizing, a tooltip also appears for the text autosizing checkbox. [[crbug.com/319092](https://code.google.com/p/chromium/issues/detail?id=319092)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/GgJSvezgc6SxWvr0lWiK.png", alt="Text autosizing tooltip", width="324", height="70" %}
</figure>

## Remote IP address

You can now view the IP address of a host in the Network panel resource view. [[crbug.com/255602](https://code.google.com/p/chromium/issues/detail?id=255602)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/iObyPVTyehf7aJ9xsEcp.png", alt="Remote IP Address", width="274", height="66" %}
</figure>


Thanks for reading. You can try these features out in Canary, alternatively many of the features mentioned in the [December edition](http://updates.html5rocks.com/2013/12/DevTools-Digest-December-2013) are now available in Chrome stable!
