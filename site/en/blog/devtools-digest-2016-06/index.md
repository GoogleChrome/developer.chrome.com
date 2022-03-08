---
# Required
layout: 'layouts/blog-post.njk'

# Required
title: DevTools Digest, September 2016 - DevTools in 2016 and Beyond

# Required
description: >
  Big themes and trends for DevTools in 2016 and beyond.

# Optional
# How to add a new author
# https://developer.chrome.com/docs/handbook/how-to/add-an-author/
authors:
  - kaycebasques

# Required
date: 2016-06-06

# Optional
# Include an updated date when you update your post
updated: 2019-01-16

# Optional
# How to add a new tag
# https://developer.chrome.com/docs/handbook/how-to/add-a-tag/
tags:
  - devtools



---

{% YouTube id="x8u0n4dT-WI" %}

Google I/O 2016 is a wrap. DevTools had a strong presence at I/O, including a talk by Paul Bakaus, Paul Irish, and Seth Thompson outlining the future of DevTools. Check out the video below or read on to learn more about where DevTools is headed in 2016 and beyond.

## Authoring

DevTools aims to make every stage of the web development lifecycle easier. You probably know that DevTools can help you debug or profile a website, but you may not know how to use it to help you author a site. By "authoring" we mean the act of creating a site. One of the goals in the foreseeable future is to make it easier for you to iterate, experiment, and emulate your site across multiple devices. 

### Device mode

The DevTools team continues to iterate on the Device Mode experience, which received its first major upgrade in Chrome 49. Check out the post from March ([A new Device Mode for a mobile-first world](https://developers.google.com/web/updates/2016/03/device-mode-v2)) for an overview of the updates. The overarching goal is to provide a seamless workflow for viewing and emulating your site across all form factors. 

Here's a quick summary of some Device Mode updates that have landed in Canary since we posted the article back in March. 

When viewing a page as a specific device, you can immerse yourself more in the experience by showing the device hardware around your page. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/RBpUDTieYuMyKtAxchFk.png", alt="Showing device frame", width="485", height="640" %}
</figure>

The device orientation menu lets you view your page when different system UI elements, such as the navigation bar and keyboard, are active.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/jxrIISJmbV6DgGnSUHNn.png", alt="Showing system UI elements", width="472", height="640" %}
</figure>

The desktop story has improved, too. Thanks to Device Mode's zoom feature, you can emulate desktop screens larger than the screen that you're actually working on, such as a 4K (3840px x 
2160px) screen. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/6slBKwkZvS70Gt0M7mML.png", alt="Showing a 4K screen", width="640", height="367" %}
</figure>

You can throttle the network directly from the Device Mode UI, rather than having to switch to the Network panel. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/6hMXS4H2pGwfpCr22BnT.png", alt="Network throttling", width="640", height="473" %}
</figure>

### Source diffs

When you iterate upon a site's styling, it's easy to lose track of your changes. To fix this, DevTools is going to use visual cues on the line number gutter of the Sources panel to help you keep track of your changes. Deleted lines are indicated with a red line, modified lines are highlighted purple, and new lines are highlighted green. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/WcfWQZoPNvGbA1nEJn1l.png", alt="Sources diff in Sources panel", width="640", height="353" %}
</figure>

You'll also be able to keep track of your changes in the new Quick Source drawer tab:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/yBpJnlCQYB8MDsGKBZl2.png", alt="Quick source drawer tab", width="640", height="476" %}
</figure>

For the first time, the Quick Source tab lets you focus on your HTML or JavaScript source code at the same time as your CSS rules. Also, when you click a CSS property in the Styles pane, the Quick Source tab automatically jumps to and highlights the definition in the source. 

Enable the **sources diff** experiment in Chrome Canary to try it out today.  

### Live Sass editing

Here's a sneak peek of some upcoming major improvements to the Sass editing workflow. These features are very early in the experimental phase. We'll follow up in a later post when they're ready for you to try out. 

Basically, DevTools is going to let you view and edit Sass variables like you always hoped it would. Click on a value that was compiled from a Sass variable, and the new Quick Sources tab jumps to the definition of the variable. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/03A7JxNhwIqm5sLjdIft.gif", alt="Viewing a Sass variable definition", width="800", height="448" %}
</figure>

When editing a value that was compiled from a Sass variable, your edit updates the Sass variable, not just the individual property that you selected.


## Progressive web apps

Look at the list of [web and Chrome talks at Google I/O 2016](https://www.youtube.com/playlist?list=PLNYkxOF6rcIDz1TzmmMRBC-kd8zPRTQIP) and you'll see a huge theme emerging in the world of web development: [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).

As the Progressive Web App model emerges, DevTools is iterating rapidly to provide the tools developers need to create great progressive web apps. We realized that building and debugging these modern applications often comes with unique requirements, so DevTools has dedicated an entire panel to Progressive Web Application development. Open up Chrome Canary and you'll see that the Resources panel has been replaced with the Application panel. All of the previous functionality from the Resources panel is still there. There's just a few new panes designed specifically for Progressive Web App development:

The Manifest pane gives you a visual representation of the app manifest file. From here you can manually trigger the "Add to home screen" workflow. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/CU5Rp1p8e69qIwObqidv.png", alt="Manifest pane", width="640", height="547" %}
</figure>

The Service Workers pane lets you inspect and interact with the service worker registered for the current page. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ADuje0D3F5E07vHqrKyu.png", alt="Service Worker pane", width="800", height="336" %}
</figure>


And the Clear Storage pane lets you wipe all sorts of data so that you can view a page with a clean slate. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ZAFQp5pFvJMf4iaskAuc.png", alt="Clear Storage pane", width="800", height="817" %}
</figure>

## JavaScript

Crossing the boundary between frontend and backend is a difficult part of fullstack web development. If you discover that your backend is returning a 500 status code while debugging a web app, you have effectively reached the limit of DevTools' usefulness, requiring you to change contexts and fire up your backend development environment to debug the problem.

With backends written in Node.js, however, the boundaries between frontend and backend are starting to blur. Since Node.js runs on the V8 JavaScript engine (the same engine that powers Google Chrome) we wanted to make it possible to debug Node.js from DevTools. Thanks to the V8, DevTools, and Google Cloud Platform for Node.js teams, you can now use all of DevTools' powerful debugging features to introspect a Node.js app. The functionality has already reached Node.js [nightly builds](https://nodejs.org/download/nightly/){: .external }, although DevTools integration is still being polished before being included in a major release. Debugging your Node.js app from DevTools will someday be as simple as passing `node --inspect app.js` and connecting from DevTools in any Chrome window.

Although existing tools such as [Node Inspector](https://github.com/node-inspector/node-inspector) provide GUI-based debugging experiences, the new Node.js DevTools integration will remain up-to-date with DevTools’ latest debugging features, such as async stack debugging, blackboxing, and ES6 support.

