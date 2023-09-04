---
title: >
  DevTools Tips: Snippets and live expressions
description: >
  Use Snippets to run code you frequently use and live expressions to watch values in real time.
layout: 'layouts/blog-post.njk'
date: 2023-08-31
authors:
  - sofiayem
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XLtGnF6v8O8YXwQGPjwJ.png'
alt: >
  DevTools Tips hero logo
tags:
  - devtools
  - devtools-tips
---

Use **Snippets** in DevTools to run code you frequently use and live expression to watch JavaScript values in real time.

{% YouTube id='zW9ibQbYJNE' %}

Watch the video to learn how to:

- Create a snippet or open the **Snippets** pane:

  - With the [Command Menu](/docs/devtools/command-menu/)
  - In [**Sources** > **Snippets**](/docs/devtools/javascript/snippets/#open).

- Run your new snippet:

  - With the <kbd>Command</kbd> / <kbd>Control</kbd> + <kbd>Enter</kbd> shortcut in **Sources**
  - From the [Command Menu](/docs/devtools/command-menu/#help) using `!`.

- Pass values to your snippet:

  1. Pause it with a [breakpoint](/docs/devtools/javascript/breakpoints/#loc).
  1. Set values in the [**Sources** > **Scope**](/docs/devtools/javascript/reference/#scope) pane.
  1. Resume execution.

- Execute snippets from the **Console**: load them as global functions and run once.
- Use [Console Utilities API](/docs/devtools/console/utilities/) in your snippets.
- Use [**Console** > **Live Expressions**](/docs/devtools/console/live-expressions/):

  - To execute a piece of code you want to run repeatedly, for example, during a debugging session.
  - Watch how the values change during execution in real time.

To learn more, see:

- [Run commands in the Command Menu](/docs/devtools/command-menu/)
- [Run snippets of JavaScript](/docs/devtools/javascript/snippets/)
- [Console Utilities API reference](/docs/devtools/console/utilities/)
- [Watch JavaScript values in real time with Live Expressions](/docs/devtools/console/live-expressions/)
