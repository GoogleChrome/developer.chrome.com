---
layout: 'layouts/blog-post.njk'
title: DevTools terminal
description: Using your terminal from the DevTools
authors:
  - addyosmani
date: 2013-12-09
#updated: 2014-07-04
---

[DevTools Terminal](https://github.com/petethepig/devtools-terminal) is a new Chrome DevTools extension that brings the [power](http://blog.dfilimonov.com/2013/09/12/devtools-terminal.html) of the terminal to your browser. If you ever find yourself context-switching between Chrome and the command-line for tasks like: pulling down assets, using git, grunt, wget or even vim - you may find this extension a useful time-saver.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ops8cU1TRyAIAWY0nDpy.png", alt="DevTools Terminal is great for quick command-line tweaks.", width="800", height="507" %}
  <figcaption>DevTools Terminal is useful for quick command-line tweaks from inside Chrome while working on your webapp.</figcaption>
</figure>

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/vaMpGxP7rghapZXqhGGS.png", alt="Using cURL in DevTools Terminal.", width="800", height="541" %}
  <figcaption>After using <a href="https://twitter.com/ChromiumDev/status/317183238026186752">Copy as cURL</a> in the Network Panel, I can easily paste the complete command into DevTools Terminal and run it.</figcaption>
</figure>

## Why use a terminal in the browser?

During development, you’re probably used to working with a few different tools: your text editor for authoring, a browser for testing and debugging and the terminal for updating packages, curling headers or even a build process using Grunt.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ExjllkcT6t5g81F1jVqp.png", alt="Running Grunt in DevTools Terminal.", width="800", height="537" %}
  <figcaption>Running build tasks with Grunt without having to leave the browser.</figcaption>
</figure>

Having to switch contexts between tools during development can be distracting and can lead to inefficiency. We’ve previously talked about how (for certain types of projects) you can debug and author code directly inside the Chrome DevTools using [Workspaces](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/) without leaving the browser.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/etmu4jAedNADeJeNUuo1.png", alt="Git workflow.", width="800", height="511" %}
  <figcaption>A complete git workflow is also possible. Great for a <em>git diff</em> after authoring in a Workspace.</figcaption>
</figure>

DevTools Terminal (by Dmitry Filimonov) completes that story, making it possible to code, debug and build from inside the same window. You get access to tab, ctrl and even Git colors making it feel familiar to the terminal you’ve used to using in your daily workflow.

## Workflow

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/KKysTYMYwF814PDNcrku.png", alt="Authoring workflow.", width="800", height="527" %}
  <figcaption>Begin new projects with a <em>git clone</em>, <em>yeoman</em> or any other tool accessible via the terminal.</figcaption>
</figure>

My personal workflow for authoring in Chrome now looks a little like this:

- **DevTools Terminal** use it to `git clone` a GitHub repository, `touch` a new file or run `yo (yeoman)` to create an app. If I want I can launch a new server to preview the app too
- **Workspaces:** edit and debug my webapp inside Chrome. If I launched a server earlier I can map my local project to my network files. I can use Sass or Less and have my [CSS preprocessor](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors) changes mapped back to my CSS files.
- **DevTools Terminal:** I can now commit to source control, use a package manager (npm, bower) to pull down dependencies or run my build process (grunt, make) to generate an optimized version of the same app.
- Although it can take a while to get used to the window arrangement, it’s pleasant being able to achieve most of what I need from inside the browser.

<figure>
  {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/repu3bVis275Ch3xiBWk.png", alt="Using ls in the terminal.", width="800", height="544" %}
  <figcaption>List filenames in the current working directory using <em>ls</em>. Great for visualizing directories outside of your Workspace.</figcaption>
</figure>

## Installation

DevTools Terminal can be installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/devtools-terminal/leakmhneaibbdapdoienlkifomjceknl?hl=en). If you’re a Mac or Linux user, once you’ve added it to Chrome, you can simply "Inspect Element" or `Ctrl + Shift + I` to open up the DevTools and you’ll be able to access it via the new “Terminal” tab.
Windows users will need to connect the extension to the system terminal using a Node.js proxy. To get this setup, install the `devtools-terminal` module from npm:
`npm install -g devtools-terminal`

Then open up a new command-line window and run `devtools-terminal`. Next, open up the DevTools and in the "Terminal" tab, connect to the server using the default configuration options. You’ll be able to customize the port and address further if needed.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/qW9QsPRAqyts6AYQDkNR.png", alt="DevTools Terminal supports customizing connection details during setup.", width="800", height="552" %}
</figure>

## Limitations

DevTools Terminal does have a few limitations worth noting. Unlike Terminal.app or iTerm2 on the Mac, it doesn’t yet support tabs, multiple windows or history playback. You can however open as many new tabs of Chrome as you like, each of which can have their own DevTools Terminal instance. This can be done from the Chrome Apps screen:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ukHQYhZyRUwTwiXwC1AU.png", alt="DevTools Terminal supports both a light theme and a dark theme.", width="800", height="446" %}
  <figcaption>At present, the extension supports both the default light theme and a dark theme.</figcaption>
</figure>

This extension currently relies on [NPAPI](http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html), which is being phased out over the next year in favor of the Native Messaging API. DevTools Terminal author Dmitry Fillimonov plans to move away from NPAPI in favor of either this API or the Native Client API in the near future.

## Conclusions

DevTools Terminal (and extensions similar to it, like [Auxilio](http://krasimirtsonev.com/blog/article/Auxilio-Chrome-extension-or-how-I-boost-my-productivity)) can help you avoid switching back and forth between your editor, the browser and command-line during development.
Whilst an in-browser terminal may not be everyone’s cup of tea, you may find the extension a useful complement to your workflow and we encourage you to try it out and see how you like it!