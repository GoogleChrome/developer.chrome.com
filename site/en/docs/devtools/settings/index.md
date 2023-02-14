---
layout: "layouts/doc-post.njk"
title: "Settings reference"
authors:
  - sofiayem
date: 2023-01-18
#updated: YYYY-MM-DD
description: "A comprehensive reference of all DevTools settings."
---

Configure DevTools to your preferences with this comprehensive list of DevTools settings.

## Open Settings {: #open }

To open **Settings**:

1. [Open DevTools](/docs/devtools/open/) on any page.
1. Do one of the following:

   - Click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** button in the action bar at the top.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KSgG5FtMU6pvdR8qUpJq.png", alt="The Settings button in the action bar at the top of DevTools.", width="800", height="464" %}

   Or, when focused in DevTools, press:

   - <kbd>?</kbd>
   - <kbd>F1</kbd> on Windows or Linux
   - <kbd>Fn</kbd> + <kbd>F1</kbd> on Mac

The **Settings** panel has a list of tabs explained in detail in the next sections.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bEjoxfvtBIHKXqb4lvnN.png", alt="The Settings panel.", width="800", height="450" %}

## Preferences

The **Preferences** tab lists both general customization options and panel-specific ones.

To set preferences, open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [Settings][1] > **Preferences** and scroll down to one of the sections described next.

To restore default preferences, scroll down to the end of the **Preferences** tab and click **Restore defaults and reload**.

### Appearance

This section lists options that customize DevTools appearance.

{% Details %}

{% DetailsSummary %}
**Themes** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} sets a color theme for DevTools UI.
{% endDetailsSummary %}

<fieldset>
   <legend>Themes:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m0URI9jodUrMxioYEZ11.gif", alt="Changing DevTools theme from system preference to dark to light.", width="400", height="400", style="float:right;", class="screenshot" %}

- System preference
- Light
- Dark

</fieldset>
{% endDetails %}

{% Details %}

{% DetailsSummary %}
**Panel layout** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} arranges panes in panels.
{% endDetailsSummary %}

Affects **Elements** > **Styles** and sister tabs, and the **Sources** > **Debugger** pane. The **auto** option makes the layout depend on DevTools width.

<fieldset>
   <legend>Panel layout:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/RO1dKsa37xhMhqCKRD6j.gif", alt="Changing the Element's panel layout from horizontal to vertical.", width="400", height="400", style="float:right;", class="screenshot" %}

- horizontal
- vertical
- auto

</fieldset>
{% endDetails %}

{% Details %}

{% DetailsSummary %}
**Color format** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} sets the format of CSS color values in **Elements** > **Styles**.
{% endDetailsSummary %}

DevTools automatically converts any valid color value to the chosen format.

<fieldset>
   <legend>Color format:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EbCbudgcqUV01eWiGEWP.gif", alt="Changing color formats in the Styles pane.", width="350", height="350", style="float:right;", class="screenshot" %}

- As authored
- HEX: #dac0de
- RGB: rgb(128 255 255)
- HSL: hsl(300deg 80% 90%)

</fieldset>
{% endDetails %}

{% Details %}

{% DetailsSummary %}
**Language** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} sets the locale for DevTools UI.
{% endDetailsSummary %}

To apply this setting, reload DevTools.

<fieldset>
   <legend>Language:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UTiCVB0hCtDhrUyHumc6.png", alt="The Settings panel in Chinese.", width="400", height="400", style="float:right;" %}

- Browser UI language
- One of locale options, in this example, Chinese

</fieldset>
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable <kbd>Ctrl/Cmd</kbd> + <kbd>0</kbd>-<kbd>9</kbd> shortcut to switch panels** lets you open panels using the keyboard.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/YrWD91prdAFdWvEOOwyw.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}

This video shows how to switch between the tabs using the corresponding keyboard shortcuts.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Disable paused state overlay** hides the **Paused in debugger** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VI5VMTjA0xztwDvQzH2j.png", alt="Play and step over buttons.", width="50", height="22" %} overlay in the viewport when code execution is paused.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/arkcXtPmTBTuqZJJ4sz6.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show What's New after each update** automatically opens the **What's New** drawer tab after each Chrome update.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bUkU6F9okmYJ5L88neGH.png", alt="The What's New drawer tab.", width="800", height="616" %}
{% endDetails %}

### Sources

This section lists options that customize the **Sources** panel.

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Search in anonymous and content scripts** lets you search all loaded JavaScript files, including those in Chrome extensions, using the **Search** tab.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Zta4SxypaPFjcv91biaq.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}

This video shows how to search for text in an extension source file.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Automatically reveal files in sidebar** selects files on the **Sources** > **Page** pane when you switch between tabs in the **Editor**.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/eQ2BduTutmhTREwULIqY.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how, with this option enabled, the **Sources** panel selects files in the navigation tree as you switch between tabs.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable JavaScript source maps** lets DevTools find sources of generated or minified JavaScript files.
{% endDetailsSummary %}

{% Aside 'gotchas' %}
- This option works only if the source maps are available.
- The **Sources** panel shows the source files under the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Authored** drop-down in the navigation tree.
- The **Sources** panel also puts a link to the generated or minified file in the status bar.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/APHkhTpIXCfhyTuqS1qd.png", alt="The Sources panel shows the source file under the Authored section in the navigation tree and a link to the file in the status bar.", width="800", height="523" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable tab moves focus** makes the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S524x8aO4ifUuMRDCf6p.svg", alt="Tab key.", width="24", height="24" %} <kbd>Tab</kbd> key move focus inside DevTools instead of inserting a Tab character in the **Editor**.
{% endDetailsSummary %}

Requires to reload DevTools.

{% Aside 'gotchas' %}
This setting makes {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Default indentation** inactive because the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S524x8aO4ifUuMRDCf6p.svg", alt="Tab key.", width="24", height="24" %} <kbd>Tab</kbd> key doesn't insert characters in this case.
{% endAside %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/sKSYoqCLFlVCXTVEMYln.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows Tab characters inserted with the Tab key. Then when you enable this option and reload DevTools, the Tab key moves focus.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Detect indentation** sets indentation to the one in the source file opened in the **Editor**.
{% endDetailsSummary %}

Requires to reload DevTools.

{% Aside 'gotchas' %}
This setting overrides {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Default indentation**. In the following video, the default indentation is set to eight spaces, while the detected indentation in the file is two spaces.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Show whitespace characters: All** lets you to see whitespace characters as dots (`...`) and tabs as lines (`—`).
{% endAside %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/8ygLiSj7HNZUMo6dzvcL.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows the default indentation of eight spaces. Then when you enable this option, it overrides the default indentation to that of the source file.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Autocompletion** enables handy suggestions in the **Editor**.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Z4KyM0L8km8dvZ8dXbNW.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first doesn't show any suggestions. Then when you enable this option, the **Editor** shows suggestions for command completion.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Bracket matching** underlines and highlights in <span style="background-color: rgb(255 0 0 / 10%);">light red</span> in the **Editor** a square bracket, curly bracket, or parenthesis without a pair.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Pb1iDVxwwgudmhHAjRLq.png", alt="A curly bracket without a pair underlined with red.", width="800", height="480" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Code folding** lets you fold and unfold code blocks in curly brackets in the **Editor**.
{% endDetailsSummary %}

Requires to reload DevTools.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/kHPWexKmutMWp3LcUq70.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to fold code blocks when you enable this option.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
**Show whitespace characters** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} displays whitespace characters in the **Editor**.
{% endDetailsSummary %}

Requires to reload DevTools. Options do the following:

- **All** denotes all whitespace characters as dots (`...`). Additionally, the **Editor** denotes the <kbd>Tab</kbd> character as a line (`—`).
- **Trailing** highlights whitespace characters at the end of lines in <span style="background-color: rgb(255 0 0 / 10%);">light red</span>.

<fieldset>
   <legend>Show whitespace characters:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9fwpKgKO8BjWqtCfsFQK.png", alt="Options selected: All and Trailing.", width="500", height="450", style="float:right;" %}

- None
- All (`...`)
- <span style="background-color: rgb(255 0 0 / 10%);">Trailing</span>

</fieldset>
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Display variable values inline while debugging** shows you the variable values next to assignment statements while the execution is paused.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/x4Q1Jeo4eATAFMF1rRB3.png", alt="The Debugger paused during function execution displays variable values next to assignment statements.", width="800", height="471" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Focus Sources panel when triggering a breakpoint** opens **Sources** > **Editor** at the line with the breakpoint that paused execution.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/glzqVP8HXvfLtazD7SAb.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows the **Sources** panel out of focus when paused at a breakpoint. Then when you enable this option, DevTools opens the **Editor** in the **Sources** panel and shows you the line of code with the breakpoint.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable CSS source maps** lets DevTools find the sources of generated CSS files, for example, `.scss`, and show them to you.
{% endDetailsSummary %}

{% Aside 'gotchas' %}
- This option works only if the source maps are available.
- The **Sources** panel shows `.scss` files under the **Authored** section of the navigation tree.
- The **Elements** > **Styles** pane shows links to sources next to CSS rules applied to an element.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/W3OaNvTptDewtDK9uP5S.png", alt="The Sources panel shows .scss files in the Authored section of the navigation tree. The Styles pane in the Elements panel shows links to .scss sources next to CSS rules.", width="800", height="627" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Allow scrolling past end of file** lets you scroll further than the last line in the **Editor**.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/xYbfk6alu2SelsyENVa3.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows you how to scroll past the end of file when you enable this option.
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Allow DevTools to load resources, such as source maps, from remote file paths**. Disabled by default for security reasons.
{% endDetailsSummary %}

{% Aside 'caution' %}
[Remote file paths are a security vulnerability](https://bugs.chromium.org/p/chromium/issues/detail?id=1342722). It is best to use this option only if you are aware of consequences.
{% endAside %}

If left disabled, DevTools logs to the **Console** messages similar to the following:

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/mGlaXEprcQk0ktzVP6RJ.png", alt="A message in the Console informing that loading from a remote file path is prohibited for security reasons.", width="800", height="347" %}

{% endDetails %}

{% Details %}

{% DetailsSummary %}
**Default indentation** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} lets you choose the number of spaces the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S524x8aO4ifUuMRDCf6p.svg", alt="Tab key.", width="24", height="24" %} <kbd>Tab</kbd> key inserts in the **Editor**.
{% endDetailsSummary %}

{% Aside 'gotchas' %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Detect indentation** overrides this setting and sets indentation to the that of the source file. Requires to reload DevTools.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable tab moves focus** overrides the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/S524x8aO4ifUuMRDCf6p.svg", alt="Tab key.", width="24", height="24" %} <kbd>Tab</kbd> key. It moves focus instead of inserting characters.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Show whitespace characters: All** lets you to see whitespace characters as dots (`...`) and tabs as lines (`—`).
{% endAside %}

<fieldset>
   <legend>Default indentation:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MGVhZwyQduSG0YHI5Zz9.gif", alt="Disabling overriding options and changing default indentation from two spaces to eight, then to the Tab key.", width="450", height="350", style="float:right;", class="screenshot" %}

- 2 spaces
- 4 spaces
- 8 spaces
- Tab character

</fieldset>

This example shows how to set the default indentation to eight spaces first and then to a Tab character.
{% endDetails %}

### Elements

This section lists options that customize the **Elements** panel.

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show user agent shadow DOM** displays shadow DOM nodes in the DOM tree.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qSmOLxRlz4AQVqlsKiKB.png", alt="The Elements panel shows shadow DOM nodes.", width="800", height="426" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Word wrap** breaks long lines in the DOM tree and wraps them to the next line.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/vPnJzrRG9ApKalbwFkPR.png", alt="The Elements panel breaks long lines by words and wraps them onto the next line.", width="800", height="534" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show HTML comments** displays HTML comments in the DOM tree.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/HqEIqRj7EUf5nLRO0wet.png", alt="The Elements panel shows HTML comments.", width="800", height="562" %}
{% endDetails %}

{% Details %}

{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Reveal DOM node on hover** selects the corresponding node in the DOM tree as you hover over an element in the viewport in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7s3JQLXmIQmQa4CFXaNv.png", alt="Inspect.", width="22", height="20" %} inspect mode.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/DZSVQcWURpAEpBKzhfk9.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows that DOM nodes aren't selected in the DOM tree. Then when you enable this option, the **Elements** panel selects the nodes on hover.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show detailed inspect tooltip** displays the tooltip in the viewport in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7s3JQLXmIQmQa4CFXaNv.png", alt="Inspect.", width="22", height="20" %} inspect mode as you hover over an element.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3ZY81k912eWqytHKKZex.png", alt="The detailed tooltip shown in inspect mode.", width="800", height="531" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show rulers on hover** displays the rulers in the viewport as you hover over elements in the DOM tree.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/kYLQC0rNON8sAdCSJTpu.png", alt="Rulers shown in viewport.", width="800", height="531" %}
{% endDetails %}

### Network

This section lists options that customize the **Network** panel. Most of the options are the same as in the panel's settings.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Preserve log** is the same as [**Preserve log**](/docs/devtools/network/reference/#preserve-log) in the **Network** panel. Saves requests across page loads.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/JrR2GlPhEO8LgHd3X9mS.mp4", autoplay=false, controls="true", muted="true", class="screenshot"%}
This video first shows the requests log refreshed on page reload, then persisted when you enable this option.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Record network log** is the same as {% Img src="image/QMjXarRXcMarxQddwrEdPvHVM242/20E6CLcSzNV2GELQu7oC.png", alt="Record network log.", width="18", height="18" %} [Record network log](/docs/devtools/network/reference/#stop-recording) in the **Network** panel. Starts or stops recording requests in the network log.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/j1rsoseicBEQLePQYflZ.png", alt="The Record network log button in the Network panel.", width="800", height="520" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable network request blocking** blocks requests that match patterns in the **Network request blocking** drawer.
{% endDetailsSummary %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Disable cache (while DevTools is open)** is the same as [Disable cache](/docs/devtools/network/reference/#disable-cache) in the **Network** panel. Disables browser cache.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QTDnaY32hLDipeRW8e3O.png", alt="The Disable Cache checkbox.", width="800", height="497" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Color-code resource types** highlights requests in different colors depending on their type in the **Waterfall** column of the network log.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/yZzFqn1XYAGb0Awv3kcs.png", alt="The Waterfall column on the Network tab without and with color-coding.", width="800", height="458" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group network log by frame** is the same as [Group by frames](/docs/devtools/network/reference/#group-by-frames) in the **Network** panel. Groups by frame the requests initiated by inline frames.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QgdViJaRvfWo8suAE6a6.png", alt="The network request log with requests grouped by inline frames.", width="800", height="702" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Force ad blocking on this site** blocks [detected ads](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md) on the page while DevTools is open.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BLkQZlLgXuqPNIMnq95b.png", alt="An ad-related network request shown in the Network panel with the Blocked Requests filter enabled.", width="800", height="565" %}
{% endDetails %}

### Performance

This section lists options that customize the **Performance** panel.

{% Details %}
{% DetailsSummary %}
**Flamechart mouse wheel action** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} assigns scroll or zoom action to your mouse wheel when you navigate the flame chart.
{% endDetailsSummary %}

<fieldset>
   <legend>Flame chart mouse wheel action:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m2ILo76N2nDtuwfBk9RK.gif", alt="Changing mouse wheel action from scrolls to zoom for the flame chart.", width="500", height="350", style="float:right;", class="screenshot" %}

- Scroll
- Zoom

</fieldset>

This example shows both scroll and zoom mouse wheel actions on a flame chart in the **Performance** panel.
{% endDetails %}

### Console

This section lists options that customize the **Console**. Most of the options are the same as in [Console Settings](/docs/devtools/console/reference/#settings).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/2W5sU2YKs7YDKdW4q18n.png", alt="Similar options in Console and in Settings.", width="800", height="425" %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide network messages** hides network messages in the **Console**.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/aisMEFeYdzs84s9ZKO5M.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to hide network messages with this option both in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** and in [Console Settings](/docs/devtools/console/reference/#settings)
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Selected context only** makes the **Console** show only the selected context on a page with inline frames.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/cbBhLBD0NUJsfx5nEjCv.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to enable this option both in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** and in [Console > Settings](/docs/devtools/console/reference/#filtercontext) and select the context in the **Console**.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Log XMLHttpRequests** makes the **Console** log XHR and fetch requests.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/pyFzAk9i8WB8Dbu9wIaV.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to enable this option both in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** and [Console > Settings](/docs/devtools/console/reference/#xhr) and log the `XHR finished loading` messages to the **Console**.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show timestamps** makes the **Console** show timestamps next to messages.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/dOxVraGB4d2mXkvIV8IP.png", alt="Messages with timestamps listed in the Console.", width="800", height="528" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Autocomplete from history** makes the **Console** suggest commands you ran earlier as you type.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#autocomplete).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZExKvWICbDczngyGrgRw.png", alt="Autocomplete drop-down with a command option from Console history.", width="800", height="517" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group similar messages in console** makes the **Console** group similar messages together.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#group).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/p5wek29Dgubg7aNeqim4.png", alt="Similar messages in the Console grouped together.", width="800", height="513" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CORS errors in console** makes the **Console** show the [CORS errors](https://developer.mozilla.org/docs/Web/HTTP/CORS/Errors) it logged.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#cors-errors).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/z8PhGt1M7ri90edOFKqY.png", alt="Console shows CORS errors.", width="800", height="483" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Eager evaluation** makes the **Console** show a preview of an output as you type a command.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#eagereval).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/M54pZmDvnWxKWvDqEuRz.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows various output previews.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Evaluate triggers user activation** makes the **Console** set `navigator.userActivation.isActive` to `true` upon evaluation, that is, upon any command you run.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#trigger-user-activation).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Wfwxdk8XSvqR665dVEAr.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to enable this option both in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** and [Console > Settings](/docs/devtools/console/reference/#trigger-user-activation).
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Preserve log upon navigation** makes the **Console** log a `Navigated to` message upon every navigation and save logs across all pages.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#persist).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wXm8EGHa1UpmT4x8hj90.png", alt="The Console shows 'Navigated to' messages and saves logs across different pages.", width="800", height="361" %}
{% endDetails %}

### Extension

This section lists options that customize the **Performance** panel.

{% Details %}

{% DetailsSummary %}
**Link handling** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} sets an option to open files with when you click a link to a source file, for example, in the **Elements** > **Styles** pane.
{% endDetailsSummary %}

<fieldset>
   <legend>Link handling:</legend>

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZcYMyo861JIU4bFw1Wlc.png", alt="Choosing an option to open links with.", width="800", height="395", style="float:right;" %}

- Auto. Opens files in the **Sources** panel by default.
- Arbitrary option that can be added by a DevTools extension.

</fieldset>
{% endDetails %}

### Persistence

This section lists options that control how DevTools saves the changes you make.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable local overrides** makes DevTools persist changes you make to sources across page loads.
{% endDetailsSummary %}

For more information, see [Local Overrides](/docs/devtools/workspaces/#overrides).
{% endDetails %}

### Debugger {: #debugger }

This section lists options that control the **Debugger** behavior.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Disable JavaScript** allows you to see how your webpage looks and behaves when [JavaScript is disabled](/docs/devtools/javascript/disable/). 
{% endDetailsSummary %}

Reload the page to see if and how the page depends on JavaScript while loading.

When JavaScript is disabled, Chrome shows the corresponding {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SLXe2Th4LGAg34pe6CPj.png", alt="Disabled JavaScript.", width="22", height="20" %} icon in the address bar and DevTools shows a warning {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BOj6neshf7WbowM3j21R.svg", alt="Warning.", width="22", height="22" %} icon next to **Sources**.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MeeQhKyCdJ11EC26pU2j.png", alt="An icon in the address bar and a warning icon next to Sources in DevTools.", width="800", height="475" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Disable async stack traces** hides the "full story" of the async operation in the **Call Stack**.
{% endDetailsSummary %}

By default, the **Debugger** tries to trace async operations if the framework you're using supports such tracing.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/d2TM68V7nOeJWYMmvaSW.png", alt="The async operation in the Call Stack.", width="800", height="575" %}
For more information, see [View async stack traces](/docs/devtools/console/reference/#async-stack-traces).
{% endDetails %}

### Global

This section lists options that have global effects in DevTools.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Auto-open DevTools for popups** opens DevTools when you click links that open new tabs. That is, all links with `target=_blank`.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/c7LuWSe2cqFDjAVFKE0S.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows how to click on a link and open a new tab *without* DevTools. Then when you enable this option, a new tab opens *with* DevTools.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} [**Search as you type**](/docs/devtools/dom/#search) makes DevTools "jump" to the first search result as you type your search query. If disabled, DevTools takes you to the result only when you press <kbd>Enter</kbd>.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/QjpVziHLucolDVylOsG2.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows how DevTools "jumps" as you type a search query. Then when you enable this option, DevTools takes you to the first result when you press <kbd>Enter</kbd>.
{% endDetails %}

### Sync

This section lets you set up the synchronization of settings between devices.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable settings sync** allows you to sync DevTools settings across multiple devices.
{% endDetailsSummary %}

To use this setting, first [enable Chrome Sync](https://support.google.com/chrome/answer/185277). For more information, see [Sync settings](/docs/devtools/customize/#sync).
{% endDetails %}

## Workspace

[**Workspaces**](/docs/devtools/workspaces/) let you to save changes that you make within DevTools to source code that's stored on your computer.

{% Aside 'gotchas' %}
DevTools automatically maps your local sources to network resources using source maps. This way, you can make changes to sources in DevTools and immediately see the effect on the website you host locally and view in Chrome.
{% endAside %}

### Customize exclusions {: #workspace-exclusions }

The **Folder exclude pattern** is the default global RegEx pattern that lists common and third-party folders and file types that DevTools excludes from workspaces so you can focus only on your code.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/m6NjzWTH82irjOeSOCGu.png", alt="Folder exclude pattern in the Workspace tab.", width="800", height="471" %}
You can manually add new folders or file types to the pattern. Pattern changes take effect after reloading DevTools.

To change the default global list of excluded folders and files, edit the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Workspace** > **Folder exclude pattern** textbox.

### Manage Workspaces {: #manage-workspaces }

The **Workspace** tab lists folders you have set up as **Workspaces** and, for each folder, subfolders you manually excluded.
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/qtIbAfoPg7C7OlMMygWk.png", alt="A workspace folder with excluded subfolders.", width="800", height="536" %}
Changes to files in subfolders listed as excluded don't persist. Excluded subfolders are workplace-specific, not global.

To add a new **Workspace**:

1. [Open Settings][1].
1. In the **Workspace** tab, click **Add folder**.
1. Select the folder with your sources.
1. Click **Allow** in the prompt at the top to let DevTools make changes to sources.
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Fpb3F57oHqX2HYNRPxY2.png", alt="The prompt requesting full access to sources for DevTools.", width="800", height="387" %}

To remove a workspace, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0G3yI9F8BnkrEXyLf5EJ.svg", alt="Close.", width="24", height="24" %} next to the corresponding folder.

## Experiments

{% Aside 'caution' %}
Chrome DevTools experiments may be unstable.
{% endAside %}

To enable an experiment:

1. [Open Settings][1].
1. In the **Experiments** tab, search for the experiment you would like to try in the **Filter** textbox.
1. Enable the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the experiment.
1. Close {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings**.
1. If required, click **Reload DevTools** in the prompt at the top.

The next time you open DevTools, the experiment is enabled. To disable an experiment, clear the corresponding checkbox.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/TmKNYVbWgbsx5MSnHLgs.png", alt="The Experiments tab.", width="800", height="533" %}

## Ignore List

The **Ignore List** tab lets you configure the list of scripts the [debugger](/docs/devtools/javascript/) ignores.

To enable or disable all ignore listing for the debugger, check or clear {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**. This is the main switch for all ignore-listing capabilities.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bissqX3mFMWLW6A1M4kp.png", alt="The Enable Ignore Listing checkbox.", width="800", height="548" %}

With ignore-listing enabled, you can further customize the list of scripts to ignore.

### Ignore Chrome Extensions code  {: #skip-extensions }

To make [the debugger skip code from Chrome Extensions](/docs/devtools/javascript/ignore-chrome-extension-scripts/), check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Add content scripts to ignore list**.

### Ignore known third-party scripts {: #skip-third-party }

To make the debugger skip known third-party scripts, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Automatically add known third-party scripts to ignore list**.

{% Aside 'gotchas' %}
DevTools adds third-party scripts to the ignore list based on the `x_google_ignoreList` property in sourcemaps. Frameworks and bundlers need to supply this information.

As of Chrome version 106, [Angular v14.1.0](https://github.com/angular/angular-cli/releases/tag/14.1.0) supports this feature. See [Case Study: Better Angular Debugging with DevTools](http://localhost:8080/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular).
{% endAside %}

### Ignore a custom list of scripts {: #custom-ignore-pattern }

To ignore a single script or a custom pattern of scripts:

1.  Check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable Ignore Listing**.
1.  In the **Custom exclusion rules** section, click **Add pattern**.
    {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SToKXhMb1doVUojwzzaV.png", alt="Adding a custom pattern to the Ignore List.", width="800", height="587" %}
1.  Specify the script name or a RegEx pattern of script names to ignore.
1.  Click **Add** to save changes.

### Manage a custom list of ignored scripts {: #manage-custom-ignore-list }

To enable or disable ignoring of a specific script or pattern of script names, in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** > **Ignore List** > **Custom exclusion rules**, check or clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} checkbox next to the script or pattern.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0DZDXRV7SOgWGrzUEM7X.png", alt="A custom ignore list with a pattern or script names enabled.", width="800", height="569" %}

To edit or remove a script or a pattern of script names, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Devices

The **Devices** tab contains a list of devices and their dimensions. You can select these devices from the **Dimentions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

### Add a device to the Dimensions list {: #add-device }

To add a device to the list:

1. [Open Settings][1].
1. In the **Device** tab, enable the checkbox next to a device you want to add.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/81OxvjyGhfLMe1UZFJQX.png", alt="A list of enabled devices in the Devices tab.", width="800", height="606" %}

### Add a custom device {: #add-custom-device }

If you don't see a device you want to test, add a custom one:

1. [Open Settings][1].
1. In the **Device** tab, click **Add custom device**.
1. Specify the device details, for example, as shown on the screenshot:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/saf99v91L29TNeFEAKev.png", alt="Pixel 7 Pro device details.", width="800", height="1039" %}

   {% Aside 'gotchas' %}
   For more information on what to specify, see [User-Agent Client Hints](https://web.dev/user-agent-client-hints/).
   {% endAside %}

1. Click **Save**. Your device is enabled by default and you can select it from the **Dimentions** drop-down list in [device mode](/docs/devtools/device-mode/#device).

To edit or remove a custom device you added, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Throttling

The **Throttling** tab contains a list of custom throttling profiles. You can use these profiles to test [custom connection speeds in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To add a custom profile:

1. [Open Settings][1].
1. In the **Throttling** tab, click **Add custom profile**.
1. Specify the following values for the new entry:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/g3rn7EG4jq5Y3gofMlJH.png", alt="Creating a new profile in the Throttling tab.", width="800", height="464" %}

   - **Profile Name**.
   - **Download** and **Upload** speeds in Kbps.
   - **Latency** in milliseconds.

1. Click **Add** to save the new profile. You can now select it from the [throttling drop-down list in the **Network** panel](/docs/devtools/network/reference/#throttling-profile).

To edit or remove an existing profile, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Locations

The **Location** tab contains a list of geolocation presets. You can use these presets to [override geolocation](/docs/devtools/sensors/#geolocation) in Chrome. You can also populate the list with your own preset that you use frequently.

To add a custom preset:

1. [Open Settings][1].
1. In the **Locations** tab, click **Add location**.
1. Specify the following values for the new entry. For example, let's add New York as a new location.
   - **Location name**: `New York`.
   - **Latitude**: `40.72403285608484`.
   - **Longitude**: `-73.94397543423175`.
   - **Timezone ID**: `America/New_York` as defined in the [latest release of the Time Zone Database](https://data.iana.org/time-zones/releases/).
   - **Locale**: `en-US` as defined by [BCP47](https://www.rfc-editor.org/info/bcp47).

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/poZ1KfliVyP8Np7bbZmV.png", alt="Specifying values for a new entry in the Locations list.", width="800", height="526" %}

   {% Aside 'gotchas' %}
   To copy latitude and longitude, right-click a city name on [Google Maps](https://www.google.co.uk/maps/place/New+York,+NY,+USA/).
   {% endAside %}
   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/AMgkP56ZekXmsK64VkS7.png", alt="New York coordinates on Google Maps.", width="400", height="351" %}

1. Click **Save**. Now you can select this preset from the [**Sensors** > **Location** drop-down list](/docs/devtools/device-mode/geolocation/#override).

To edit or remove an existing preset, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="22", height="22" %} or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YxQ6ggkbUKxxxqHiaUz4.svg", alt="Delete.", width="22", height="22" %} buttons that appear on hover.

## Shortcuts

The **Shortcuts** tab lists default shortcuts you can use while focused in DevTools to speed up your workflow.

For a full list of default shortcuts, see [Keyboard shortcuts](/docs/devtools/shortcuts/).

{% Aside 'gotchas' %}
You can use the Visual Studio Code alternatives to default shortcuts. Select `Visual Studio Code` from {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} **Settings** > **Shortcuts** > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} **Match shortcuts from preset**.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/bi4B0or5wylM4jit6DfD.png", alt="Visual Studio Code shortcut alternatives.", width="800", height="416" %}

### Customize shortcuts {: #customize-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

To customize keyboard shortcuts:

1. [Open Settings][1].
1. In the **Shortcuts** tab, hover over any shortcut and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/JJEyylF1sToNKTtoFm4Q.svg", alt="Edit.", width="24", height="24" %} **Edit** button.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BuceMKLqXmgLxRZPXTfg.png", alt="Edit shortcut.", width="800", height="596" %}

1. Put the cursor in the text bar and press any convenient combination of keys (chord). DevTools notifies you if the combination is already in use.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/lsqH7u5rnAcaE3dQdqWH.png", alt="A chord shortcut that is already in use.", width="800", height="565" %}

1. Record a new combination and click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/7l4ffLtFrht87gVnT0IZ.svg", alt="Check.", width="24", height="24" %} **Check** button.

   {% Aside 'gotchas' %}
   To add an additional synonymous combination, click **Add a shortcut** and record another chord in a similar way.
   {% endAside %}

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3VBJ5QKkUCG1H2FX8f78.png", alt="Save the new shortcut.", width="800", height="565" %}

To revert or delete changes, click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/tby5LrQzKTKzHia2fEBO.svg", alt="Back.", width="24", height="24" %} **Back** or {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete.", width="24", height="24" %} **Delete**.

### Add shortcuts to unassigned actions {: #assign-shortcuts }

{% Aside %}
This is a preview option. To enable it, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [**Settings** > **Experiments**](#experiments) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable keyboard shortcut editor**.
{% endAside %}

By default, DevTools doesn't assign shortcuts to all available actions.

For example, to toggle [light and dark theme preference](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) with a keystroke, in the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** > **Rendering** section, set your own shortcut as described in [Customize shortcuts](#customize-shortcuts).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Toggle light and dark themes with keyboard shortcut.", width="800", height="576" %}

### Restore default shortcuts {: #restore-defaults }

To bring back defaults, click **Restore default shortcuts** in the bottom-right corner of the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %}  **Settings** > **Shortcuts** tab.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/nQK0bSoeOzjAzWnmC3AY.png", alt="Restore default shortcuts.", width="800", height="463" %}

[1]: /docs/devtools/settings/#open
