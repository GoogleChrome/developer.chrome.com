---
layout: "layouts/doc-post.njk"
title: "Sources panel overview"
authors:
  - kaycebasques
  - sofiayem
date: 2018-01-09
updated: 2022-07-21
description:
  "View and edit files, create Snippets, debug JavaScript, and set up Workspaces in the Sources
  panel of Chrome DevTools."
tags:
  - html
  - css
  - javascript
---

Use the Chrome DevTools **Sources** panel to:

- [View files][1].
- [Edit CSS and JavaScript][2].
- [Create and save **Snippets** of JavaScript][3], which you can run on any page. **Snippets** are
  similar to bookmarklets.
- [Debug JavaScript][4].
- [Set up a Workspace][5], so that changes you make in DevTools get saved to the code on your file
  system.

## View files {: #files }

Use the **Page** pane to view all of the resources that the page has loaded.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/smmuE51BssHZBgSb2Ytb.png", alt="The Page pane.", width="800", height="536" %}

How the **Page** pane is organized:

- The top-level, such as `top` on the screenshot above, represents an [HTML frame][6]. You'll find `top` on
  every page that you visit. `top` represents the main document frame.
- The second-level, such as `developers.google.com` on the screenshot above, represents an [origin][7].
- The third-level, fourth-level, and so on, represent directories and resources that were loaded
  from that origin. For example, on the screenshot above, the full path to the resource 
  `devsite-googler-button` is `developers.google.com/_static/19aa27122b/css/devsite-googler-button`.

Click a file in the **Page** pane to view its contents in the **Editor** pane. You can view any type
of file. For images, you see a preview of the image.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ByErR7HFeQ7zOVjF4Wyp.png", alt="Viewing a file in the Editor pane.", width="800", height="530" %}

## Edit CSS and JavaScript {: #edit }

Use the **Editor** pane to edit CSS and JavaScript. DevTools updates the page to run your new code.
For example, if you edit the `background-color` of an element, you'll see that change take effect
immediately.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/p0sdJ5tx5yQx1cuOLimO.gif", alt="Editing CSS in the Editor pane", width="800", height="461" %}

CSS changes take effect immediately, no save needed. For JavaScript changes to take effect, press
Command+S (Mac) or Control+S (Windows, Linux). DevTools doesn't re-run a script, so the only
JavaScript changes that take effect are those that you make inside of functions. For example, note
 how `console.log('A')` doesn't run, whereas `console.log('B')` does.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vtNDAWnzXAV5H0cjkZdT.gif", alt="Editing JavaScript in the Editor pane.", width="800", height="461" %}

If DevTools re-ran the entire script after making the change, then the text `A` would have been logged to the
**Console**.

DevTools erases your CSS and JavaScript changes when you reload the page. See [Set up a
Workspace][8] to learn how to save the changes to your file system.

## Create, save, and run Snippets {: #snippets }

Snippets are scripts which you can run on any page. Imagine that you repeatedly type out the
following code in the **Console**, in order to insert the jQuery library into a page, so that you
can run jQuery commands from the **Console**:

```js
let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.crossOrigin = 'anonymous';
script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
document.head.appendChild(script);
```

Instead, you can save this code in a **Snippet** and run it with a couple of button clicks, any time
you need it. DevTools saves the **Snippet** to your file system. For example, examine a **Snippet**
that inserts the jQuery library into a page.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/nl6ALIOWRQZdn35Y86ip.png", alt="A Snippet that inserts the jQuery library into a page.", width="800", height="430" %}

To run a **Snippet**:

- Open the file in the **Snippets** pane, and click **Run** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bJ1ZWs8NN8S0NaZnCHyQ.svg", alt="The Run button.", width="24", height="24" %} on the action bar at the bottom.
- Open the [**Command Menu**][9], delete the `>` character, type `!`, type the name of your
  **Snippet**, then press Enter.

See [Run Snippets Of Code From Any Page][10] to learn more.

## Debug JavaScript {: #debug }

Rather than using `console.log()` to infer where your JavaScript is going wrong, consider using the
Chrome DevTools debugging tools, instead. The general idea is to set a breakpoint, which is an
intentional stopping place in your code, and then step through your code's execution, one line at a
time.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/FKKzVSy54zN5nRV0DkVk.png", alt="Pausing at a breakpoint.", width="800", height="526" %}

As you step through the code, you can view and change the values of all currently-defined
properties and variables, run JavaScript in the **Console**, and more.

See [Get Started With Debugging JavaScript][11] to learn the basics of debugging in DevTools.

### Focus only on your code {: #focus-on-your-code }

{% Aside %}
**Note**: The following features are available from Chrome version 106.
{% endAside %}

Chrome DevTools lets you focus only on the code you author by filtering out the noise generated by frameworks and build tools you leverage when building web applications.

To provide you with the modern web debugging experience, DevTools does the following:

- **Separates authored and deployed code**. To help you find your code quicker, [the **Sources** panel separates the code](/docs/devtools/javascript/reference/#group-authored-and-deployed) you create from the bundled and minified code.
- **Ignores known third-party code**:
  - [The **Sources** panel hides such sources](/docs/devtools/javascript/reference/#hide-ignore-listed) from the file tree on the **Page** pane.
  - [The **Console** hides such frames from stack traces](/docs/devtools/console/reference/#show-third-party).
  - [The **Open File** menu hides such files from search results](/docs/devtools/command-menu/#open-ignore-listed-files).

Additionally, if supported by frameworks, the [**Call Stack** in the debugger](/docs/devtools/javascript/reference/#async-frames) and [stack traces in the **Console**](/docs/devtools/console/reference/#async-stack-traces) show the full history of asynchronous operations.

To learn more, see:

- [Modern web debugging in Chrome DevTools](/blog/devtools-modern-web-debugging/)
- [Case Study: Better Angular Debugging with DevTools](/blog/devtools-better-angular-debugging/)

## Set up a Workspace {: #workspace }

By default, when you edit a file in the **Sources** panel, those changes are lost when you reload
the page. **Workspaces** enable you to save the changes that you make in DevTools to your file
system. Essentially, this lets you use DevTools as your code editor.

See [Edit Files With Workspaces][12] to get started.

[1]: #files
[2]: #edit
[3]: #snippets
[4]: #debug
[5]: #workspace
[6]: https://www.w3.org/TR/html401/present/frames.html
[7]: https://html.spec.whatwg.org/multipage/origin.html#origin
[8]: #workspace
[9]: /docs/devtools/command-menu/
[10]: /docs/devtools/javascript/snippets
[11]: /docs/devtools/javascript
[12]: /docs/devtools/workspaces
