---
layout: "layouts/blog-post.njk"
title: How the new Breakpoints sidebar helps you debug faster
authors:
  - kimanh
  - vaatika
description: To make it easier to perform common actions such as deleting or disabling breakpoints, we've redesigned the breakpoints sidebar so that you can perform them with a single click.
date: 2023-04-11
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SY5h3eWJ9kamVHVWE67H.jpg'
alt: 'Have a break during debugging with the new Breakpoints sidebar.'
tags:
    - devtools-engineering
    - devtools
---

<!--header banner, do not remove-->
{% Partial 'devtools/banner.md' %}

{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/UH8qvUJgBfTJgLLvCYHf.png", alt="The old and new breakpoint sidebar pane side-by-side.", width="800", height="542" %}

If you’re on Chrome 111 or later, you might have already noticed that we’ve changed the design of our breakpoint sidebar. With Chrome 113, the new sidebar entirely replaces the old design. Our goal with the redesign was to **improve the breakpoint workflow** by:

Providing a **better overview** on all breakpoints that are set.
Making common user workflows with breakpoints **easier to access** and **more intuitive**.
Making **cool existing breakpoint features visible**.

This post assumes that you are already familiar with debugging using breakpoints. If you haven’t used breakpoints before, head over to [this overview on breakpoints](/docs/devtools/javascript/breakpoints/) and learn more about how you can use breakpoints to debug your code.

Now, let’s have a look at what the redesign offers, and how you can make use of the new sidebar! Note that the redesign concentrates on making *existing features* more intuitive to use and easier to access, instead of adding new features.

## Pause on exceptions to investigate why your code is throwing an error
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/aDWojX4t1MPbYiWWx0LF.png", alt="Pause on caught and uncaught exceptions.", width="800", height="954" %}

Does your code throw an exception? Fret not! Chrome DevTools allows you to pause on exceptions to stop execution at the point where your exception is thrown. This can help you to investigate and better understand the circumstances under which your code throws an error. You can choose whether you want to pause on caught exceptions, uncaught exceptions, or both, by checking the corresponding checkboxes in the sidebar.

{% Aside 'caution' %}
For Node debugging, pausing on caught exceptions with Chrome 113 is only possible if also pausing on uncaught exceptions. This is a dependency that previously existed and needs to be kept for Node LTS compatibility reasons. As soon as Node LTS release 18 is no longer supported, we will also allow independent pausing for Node. Follow [crbug/1382762](https://crbug.com/1382762) for updates.
{% endAside %}

## Manage your breakpoints: expand relevant breakpoint groups, and collapse others to focus on what’s relevant
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/IXPxkcj2J8xBpPkfdixb.png", alt="Collapse and expand breakpoint groups.", width="800", height="563" %}

Breakpoints may be spread across several files. The breakpoint sidebar groups breakpoints according to the file they belong to. Focus on only those that matter for your current debugging session by expanding the relevant breakpoint groups, and collapsing the remaining ones.

{% Aside 'important' %}
If several files happen to have the same file name, Chrome DevTools will also try to show you a part of the file path next to the file name that can help you to differentiate between files.
{% endAside %}

## Manage your breakpoints: one click to jump to code, remove, or enable/disable breakpoints
The breakpoint sidebar allows you to accomplish common tasks with one click. Here’s an overview of how you can ...

Navigate to the breakpoint location in the Code Editor.
Remove one breakpoint or all breakpoints within a file.
Enable or disable one breakpoint or all breakpoints within a file.

And all this with one click! Of course, these options are also available in the context menu:

### Jump to the breakpoint location by clicking on the breakpoint code snippet
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/duee9EoYpcp1P4PssWPN.png", alt="Jump to the source code location in the code editor.", width="800", height="539" %}

Do you want to check where in the code you have set your breakpoint, and analyze the surrounding code? Just click on the code snippet of a breakpoint within the sidebar, and it will open the code location in the code editor.

### Remove a single breakpoint or all breakpoints within a file by clicking on the remove button
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/uKx0eR0LjYl7ndVqs1zw.png", alt="Remove a single breakpoint or all breakpoints within a file.", width="800", height="557" %}

Hover over a breakpoint or a breakpoint group to reveal a remove button that removes a single or all breakpoints in a file on click.

### Disable a single or all breakpoints within a file
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/E44VYlrAOF3zAXfidoti.png", alt="Enable or disable a single or all breakpoints within a file.", width="800", height="566" %}

Check or uncheck the checkbox next to a breakpoint to enable or disable it.

To enable or disable all breakpoints in a file, hover over the breakpoint group and check or uncheck the checkbox that appears next to the file name.

## Make use of these lesser known breakpoint features: conditional breakpoints and logpoints

{% Aside 'key-term' %}
If you want to know more about the differences between regular breakpoints, conditional breakpoints, and logpoints, head over to our [documentation on breakpoint types](/docs/devtools/javascript/breakpoints/#loc) which explains how you can use these different breakpoint types to debug your code.

 **TLDR**: conditional breakpoints stop execution only if a *condition* that you specify is true. Logpoints, on the other hand, are the counterpart of using `console.log`, but in Chrome DevTools.
{% endAside %}

### Edit breakpoint conditions or change your logpoint log by editing a breakpoint
{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/JlVzdMlBdeJHZKNdJmCZ.png", alt="Edit breakpoint conditions or change logpoint logs.", width="800", height="536" %}

Edit a breakpoint condition or log by hovering over a breakpoint and clicking the *edit* button that appears. This opens a dialog for changing the breakpoint type and the details of your breakpoint.

Alternatively, select the line of the breakpoint in the code editor and type in <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>b</kbd> on Linux and <kbd>Command</kbd>+<kbd>Alt</kbd>+<kbd>b</kbd> on Mac to open the breakpoint edit dialog.

You can also quickly double-check your condition or logpoint log by hovering over the breakpoint in the sidebar:

{% Img src="image/3ILBH0X0aDOqDIm6SgH3OTHT8832/7yEtQaz5qDVnIyii4BFa.png", alt="View condition or logpoint log.", width="800", height="566" %}

## Conclusion

Our goal behind the redesign of the breakpoint sidebar was to make debugging with breakpoints easier. Most importantly, we aimed to make things more structured, and easier to access and understand. We hope these improvements will help you in your next debugging session!

If you have suggestions for further improvements, let us know by [filing a bug](https://crbug.com/new)!

<!--footer message, do not remove-->
{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
