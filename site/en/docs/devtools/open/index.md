---
layout: "layouts/doc-post.njk"
title: "Open Chrome DevTools"
authors:
  - kaycebasques
date: 2018-12-14
#updated: YYYY-MM-DD
description: "All of the ways that you can open Chrome DevTools."
---

There are many ways to open Chrome DevTools, because different users want fast access to different
parts of the DevTools UI.

## Open the Elements panel to inspect the DOM or CSS {: #elements }

When you want to inspect a DOM node's styles or attributes, right-click the element and select
**Inspect**.

{% Img src="image/admin/yDROFVw6p2poGhkOdFKu.png", alt="The Inspect option", width="800", height="648" %}

**Figure 1**. The **Inspect** option

Or press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>C</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> (Windows, Linux, Chrome OS).

See [Get Started With Viewing And Changing CSS][1].

## Open the Console panel to view logged messages or run JavaScript {: #console }

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to jump straight into
the **Console** panel.

See [Get Started With The Console][2].

## Open the last panel you had open {: #last }

Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) or <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>.

## Open DevTools from Chrome's main menu {: #chrome }

Click **Customize and control Google Chrome**
{% Img src="image/admin/t7rsoT0IGcnwvW76Xj32.png", alt="Customize and control Google Chrome", width="6", height="26" %} and
then select **More Tools** > **Developer Tools**.

{% Img src="image/admin/0bZRHFrsZGxpTAWhYCg6.png", alt="Opening DevTools from Chrome's main menu.", width="800", height="492" %}

**Figure 2**. Opening DevTools from Chrome's main menu

## Auto-open DevTools on every new tab {: #auto }

Open Chrome from the Command line and pass the `--auto-open-devtools-for-tabs` flag.

Mac:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs
```

This will only work if an instance of Chrome is not already running. From then
on, every new tab will automatically open DevTools until the user fully quits
Chrome.

[1]: /docs/devtools/css
[2]: /docs/devtools/console/get-started
