---
layout: "layouts/doc-post.njk"
title: "Watch variables in Sources"
authors:
  - jonathangarbee
date: 2016-02-11
#updated: YYYY-MM-DD
description:
  "Chrome DevTools allows you to easily see multiple variables throughout your application."
---

{% Aside 'warning' %}

**Warning:** This page is deprecated. See following section for up-to-date information: [Watch the
values of custom JavaScript expressions][1]

{% endAside %}

Chrome DevTools allows you to easily see multiple variables throughout your application. Watching
variables within Sources keeps you out of the console and focused on improving your code.

The Sources panel provides the ability to watch variables within your application. This is located
in the watch section of the debugger sidebar. By taking advantage of this functionality you will not
need repeatedly log objects to the console.

{% Img src="image/admin/CKt18LDyBiqZ0D2GxUKk.png", alt="Watch section of debugger", width="800", height="625" %}

## Adding variables {: #adding_variables }

To add a variable to the watch list use the add icon to the right of the section heading. This will
open an inline input where you provide the variable name to watch. Once it is filled in press your
<kbd>Enter</kbd> key to add it to the list.

{% Img src="image/admin/VTzjYywdF1D5xQEx5iIv.png", alt="Add to watch list button", width="357", height="263" %}

The watcher will show you the current value of the variable as it is added. If the variable is not
set or can't be found it will show <Not Available> for the value.

{% Img src="image/admin/qUVQAccqDdO9QZS30NSu.png", alt="Undefined variable in the watch list", width="328", height="206" %}

## Updating variables {: #updating_variables }

Variable values may change as an application continues to operate. The watch list is not a live view
of the variables unless you are stepping through execution. When you are stepping through execution
using [breakpoints][2], the watched values will update automatically. To manually recheck the
variables in the list press the refresh button to the right of the section heading.

{% Img src="image/admin/AthCSFuyq6VkbAyXonPm.png", alt="Refresh watch variables button", width="328", height="205" %}

As the refresh is requested the current application state is rechecked. Every watched item will be
updated with the current values.

{% Img src="image/admin/VEQsI4m2Tb4fVUkijTLJ.png", alt="Updated variable being watched", width="359", height="202" %}

## Removing variables {: #removing_variables }

To keep what you are looking at minimal for faster work you may need to remove variables from the
watch list. This can be done by hovering the variable and then clicking the removal icon that
appears to the right.

{% Img src="image/admin/aXkD0ZIzyIPnd0Aq3n4F.png", alt="Hover variable to remove from watch list", width="358", height="207" %}

[1]: /docs/devtools/javascript/reference#watch
[2]: /docs/devtools/javascript/breakpoints
