---
layout: "layouts/doc-post.njk"
title: "Open Chrome DevTools"
authors:
  - kaycebasques
date: 2018-12-14
updated: 2020-07-10
description: "All of the ways that you can open Chrome DevTools."
---

There are many ways to open Chrome DevTools, because different users want fast access to different
parts of the DevTools UI.

## Open the Elements panel to inspect the DOM or CSS {: #elements }

When you want to inspect a DOM node's styles or attributes, right-click the element and select
**Inspect**.

![The Inspect option](/web/tools/chrome-devtools/images/inspect.png)

**Figure 1**. The **Inspect** option

Or press Command+Option+C (Mac) or Control+Shift+C (Windows, Linux, Chrome OS).

See [Get Started With Viewing And Changing CSS][1].

## Open the Console panel to view logged messages or run JavaScript {: #console }

Press Command+Option+J (Mac) or Control+Shift+J (Windows, Linux, Chrome OS) to jump straight into
the **Console** panel.

See [Get Started With The Console][2].

## Open the last panel you had open {: #last }

Press Command+Option+I (Mac) or Control+Shift+I.

## Open DevTools from Chrome's main menu {: #chrome }

Click **Customize and control Google Chrome**
![Customize and control Google Chrome](/web/tools/chrome-devtools/images/shared/main-menu.png) and
then select **More Tools** > **Developer Tools**.

![Opening DevTools from Chrome's main menu.](/web/tools/chrome-devtools/images/open-from-main.png)

**Figure 2**. Opening DevTools from Chrome's main menu

## Auto-open DevTools on every new tab {: #auto }

Open Chrome from the command line and pass the `--auto-open-devtools-for-tabs` flag.

Mac:

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --auto-open-devtools-for-tabs
```

[1]: /web/tools/chrome-devtools/css
[2]: /web/tools/chrome-devtools/console/get-started
