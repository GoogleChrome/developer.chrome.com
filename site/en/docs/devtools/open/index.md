---
layout: "layouts/doc-post.njk"
title: "Open Chrome DevTools"
authors:
  - kaycebasques
  - jecelynyeen
  - sofiayem
date: 2018-12-14
updated: 2022-10-26
description: "All of the ways that you can open Chrome DevTools."
---

{% YouTube id="X65TAP8a530" %}

There are many ways to open Chrome DevTools. Choose your favorite way from this comprehensive reference.

You can access DevTools using Chrome UI or keyboard:

- From [drop-down menus in Chrome](#chrome-menu).
- With dedicated [shortcuts](#shortcuts) that open **Elements**, **Console**, or the last panel you used.

Additionally, learn how to [auto-open DevTools for every new tab](#auto).

## Open DevTools from Chrome menus {: #chrome-menu }

If you prefer UI, you can access DevTools from drop-down menus in Chrome.

### Open the Elements panel to inspect the DOM or CSS {: #inspect}

To inspect, right-click an element on a page and select **Inspect**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/uLh67ZUQIEJ5En0vcJgq.png", alt="The Inspect option in a drop-down menu in Chrome.", width="800", height="608" %}

DevTools opens the **Elements** panel and selects the element in the DOM tree. In the **Styles** pane, you can see CSS rules applied to the selected element.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WTJEhyPfarXQqli3LMwW.png", alt="An element selected in the Elements panel.", width="800", height="469" %}

### Open the last panel you used from Chrome's main menu {: #last }

To open the last DevTools panel, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/N7wEDmtW9lnrSxPRupMa.svg", alt="Three-dot menu.", width="22", height="22" %} button to the right of the address bar and select **More Tools** > **Developer Tools**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bkh79zEFaByczisr3lD5.png", alt="The Developer Tools option selected from the three-dot menu.", width="800", height="516" %}

Alternatively, you can open the last panel with a shortcut. See the next section to learn more.

## Open panels with shortcuts: Elements, Console, or your last panel  {: #shortcuts }

If you prefer keyboard, press a shortcut in Chrome depending on your operating system:

<table>
<thead>
  <tr>
    <th>OS</th>
    <th>Elements</th>
    <th>Console</th>
    <th>Your last panel</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Windows or Linux</td>
    <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <strong>C</strong></td>
    <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <strong>J</strong></td>
    <td><kbd>F12</kbd></br><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <strong>I</strong></td>
  </tr>
  <tr>
    <td>Mac</td>
    <td><kbd>Cmd</kbd> + <kbd>Option</kbd> + <strong>C</strong></td>
    <td><kbd>Cmd</kbd> + <kbd>Option</kbd> + <strong>J</strong></td>
    <td><kbd>Fn</kbd> + <kbd>F12</kbd></br><kbd>Cmd</kbd> + <kbd>Option</kbd> + <strong>I</strong></td>
  </tr>
</tbody>
</table>

Here's an easy way to memorize the shortcuts:

- **C** stands for CSS.
- **J** for JavaScript.
- **I** designates your choice.

The **C** shortcut opens the **Elements** panel in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7s3JQLXmIQmQa4CFXaNv.png", alt="Inspect.", width="21", height="20" %} inspector mode. This mode shows you helpful tooltips when you hover over elements on a page. You can also click any element to view its CSS in the **Elements** > **Styles** pane.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/j55nQO3vIZKKlu59ID15.png", alt="The Elements panel in inspector mode with a tooltip.", width="800", height="475" %}

For the full list of DevTools shortcuts, see [Keyboard shortcuts](/docs/devtools/shortcuts/).

## Auto-open DevTools on every new tab {: #auto }

Run Chrome from the command line and pass the `--auto-open-devtools-for-tabs` flag:

1. Quit any running Chrome instance.

   {% Aside 'gotchas' %}
   This flag works only for the first Chrome instance you open. If it doesn't work for you, for example, on Windows, make sure to end any residing Chrome processes from the Task Manager.
   {% endAside %}

1. Run your favorite terminal or command line application.
1. Depending on your operating system, run the following command:

- MacOS:

  ```shell
  open -a "Google Chrome" --args --auto-open-devtools-for-tabs
  ```

- Windows:

  ```shell
  start chrome --auto-open-devtools-for-tabs
  ```

- Linux:

  ```shell
  google-chrome --auto-open-devtools-for-tabs
  ```

DevTools will automatically open for every new tab until you close Chrome.

## What's next?

{% Aside 'success' %}
Congratulations! You've successfully unlocked the power of Chrome DevTools.
{% endAside %}

Next, watch the following video to learn some useful shortcuts and settings for quicker DevTools navigation.

{% YouTube id="xHusjrb_34A" %}

For a more hands-on learning experience, see [how to customize DevTools](/docs/devtools/customize/).
