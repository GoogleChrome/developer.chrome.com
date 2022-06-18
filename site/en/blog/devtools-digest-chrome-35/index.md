---
layout: 'layouts/blog-post.njk'
title: DevTools Digest - Chrome 35
description: Updates to the Developer Tools in Chrome 35
authors:
  - umarhansa
date: 2014-06-26
#updated: 2014-07-04
---

Hi all, in the [last edition](http://www.html5rocks.com/en/tutorials/developertools/chrome-33/) of the DevTools Digest we got to check out the powerful Asynchronous call stacks and a few others. In this edition, we’ll see an improved Network Panel filtering (with autocomplete), edit abilities with Shadow DOM content, CodeMirror 4 updates and more.

## Network panel filtering

You can now filter resources by certain fields such as Domain. One filter format is this: `Domain:website.com`. In addition to filtering, you also get autocomplete suggestions for valid filter values which update in realtime as you type your query. You may find this useful when you need to find all resources served by a particular domain. [[crbubg.com/258421](https://code.google.com/p/chromium/issues/detail?id=258421)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/O6RLGWANDD5QbaGRLyWS.png", alt="Network panel filtering.", width="663", height="255" %}
</figure>

## Edit Shadow DOM content

DevTools has always been able to edit regular HTML in the Elements panel, these capabilities now extend to elements part of a Shadow DOM. [[crbug.com/348991](https://code.google.com/p/chromium/issues/detail?id=348991)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/f8XPL9UA5Dk0A5Ula165.png", alt="Edit Shadow DOM content.", width="644", height="321" %}
</figure>

## Upgrade to CodeMirror 4.0

CodeMirror, the JavaScript based text editor being used as part of the Sources Panel has been upgraded to version 4. A bunch of new functionality has been added as a result of this. [crbug.com/356878](http://crbug.com/356878)]

<figure>
{% Video src="video/T4FyVKpzu4WKF1kBNvXepbi08t52/fB2nd9HYQ5NcEyhjJBq8.mp4", autoplay="true", loop="true", muted="true" %}
</figure>

## Quick search for a CSS-property

You can now search property names, values, or rule selectors from the new search box in the Styles pane. Results are highlighted in real-time as you type your query. [[crbug.com/278852](https://code.google.com/p/chromium/issues/detail?id=278852)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/LcqKO4X8tvpMF32iDvew.png", alt="Quick search for a CSS-property.", width="582", height="436" %}
</figure>

## Timestamps next to console messages

When logging messages in a quick succession, it may be useful to see the exact time a message is logged. You can enable this via DevTools Experiments. [[crbug.com/131714](https://code.google.com/p/chromium/issues/detail?id=131714)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/LvhTaIp8sqkqSmHKjQfm.png", alt="Timestamps next to console messages.", width="263", height="43" %}
</figure>

## Memory Statistics breakdown for heap snapshots

When viewing a recorded heap snapshot, notice the stastics pie chart which gives a visual, color-coded overview as to what aspect of JavaScript is consuming the most memory. Currently an experimental feature, enable “Heap snapshot statistics” to try it out. [[crbug.com/346335](https://code.google.com/p/chromium/issues/detail?id=346335)]

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/sz0xlE2CtmFRMmruA3Fs.png", alt="Memory Statistics breakdown for heap snapshots.", width="558", height="353" %}
</figure>

## View the original source of a console.log, not the wrapped version

You probably have a console.log wrapper function, but unfortunately in console all your messages come from something like util.js:46. Now you can have DevTools resolve your original locations. Enter the file which wraps console log messages into the “Skip stepping through sources with particular names” input box to have DevTools blackbox it and then show the true source of a log statement. [[crbug.com/231007](https://code.google.com/p/chromium/issues/detail?id=231007)]

## A few more small, but powerful additions

- **Refresh the Event Listeners pane** in the Elements Panel, after dynamically adding or removing JavaScript event listeners. [[crbug.com/341044](https://code.google.com/p/chromium/issues/detail?id=341044)]

- You can use **`Ctrl+` to gain focus on the Console input**, you may find this useful for a keyboard only workflow in the DevTools. [[crbug.com/144943](crbug.com/144943)]

- **border-style autocomplete suggestions** for values (dotted, dashed, double, groove) have been updated to match the spec. [[crbug.com/349998](https://code.google.com/p/chromium/issues/detail?id=349998)]

- **Restore defaults and reload** button **has been added to the Settings panel which does exactly what it says on the tin. [[crbug.com/135451](https://code.google.com/p/chromium/issues/detail?id=135451)]

- Currently an experimental feature, you can try out **dock to left** to discover its suitability for your workflow. The other layout modes are dock to main window (right or bottom) and undock into a separate window. [[crbug.com/134282](https://code.google.com/p/chromium/issues/detail?id=134282)]

- "[wheel](https://developer.mozilla.org/docs/Web/Reference/Events/wheel)" is now offered as an **event listener breakpoint**, this is in addition to the usual click, mousemove, mousedown etc. events. [[crbug.com/347562](https://code.google.com/p/chromium/issues/detail?id=347562)]

That’s all for now, thanks for reading!
