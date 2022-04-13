---
layout: 'layouts/blog-post.njk'
title: DevTools Digest - More power with the new command menu 
description: >
   Read about DevTools' new command menu and its over 60 actions that enable super fast workflows.
authors:
  - pbakaus
date: 2016-04-21
updated: 2020-07-24
---


Read about DevTools' new **command menu** and its over 60 actions that enable super fast workflows.

## Cmd/Ctrl+Shift+P to bring up the Command Menu

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/GcMoVISdvDLuocfrUI0I.png", alt="Command Menu in DevTools", width="800", height="489" %}
</figure>

The "Jump to File" dialog that appears when you press
`Cmd + P` (or `Ctrl + P`) in the Sources panel isn't terribly well known,
but has been around for a while. We've now went much further than that and
developed a text-editor-inspired command menu that can drive almost every
important action in DevTools.

Hit `Cmd + Shift + P`
(or `Ctrl + Shift + P`) anywhere (even when the page
is in focus!) to bring up the Command Menu, then type to filter and hit
`Enter` to trigger the action. A few sample actions you could try:

  * Appearance: Switch to Dark Theme
  * DevTools: Dock to bottom
  * Mobile: Inspect Devices...
  * Network: Go offline

The new command menu is a super quick way to navigate and discover new settings and actions across DevTools.

Looking for the good old "Go to member" dialog that was previously also
associated with that shortcut? It is still there, just hit
`Cmd + Shift + O`
(or `Ctrl + Shift + O`) from now on.

## Pretty-print HTML

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/uMD2PeQUk3GqOYGcYlqy.jpg", alt="Pretty HTML.", width="800", height="340" %}
</figure>

We've had pretty-print for JS and CSS sources built into the Sources panel for
a while now, but have just extended it to support full-blown
HTML pretty-printing. Give it a try – not only does it reformat the HTML, it
also reformats the JavaScript and CSS within it!

- - -

As always, [let us know what you think via
Twitter](https://twitter.com/intent/tweet?text=%40ChromeDevTools) or the
comments below, and submit bugs to [crbug.com/new](https://crbug.com/new).

Until next month!
Paul Bakaus & the DevTools team

