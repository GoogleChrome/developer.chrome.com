---
layout: "layouts/doc-post.njk"
title: "Preferences"
authors:
  - sofiayem
date: 2023-02-14
#updated: YYYY-MM-DD
description: "Preferences tab reference."
---

Configure the appearance and behavior of DevTools and its panels using {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings**](/docs/devtools/settings/#open) > **Preferences**. This tab lists both general customization options and panel-specific ones.

To set preferences, open {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [Settings](/docs/devtools/settings/#open) > **Preferences** and scroll down to one of the sections described next.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/IFH59J9W2RT4nDN2miTU.png", alt="The Appearance section in the Preferences tab.", width="800", height="812" %}

To find out what each setting does, search this page for the setting's name and expand its description.

This reference indicates different settings with the following icons:

- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} Checkboxes
- Drop-down lists {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %}
- {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E7duEXTRnleJ5OOJ0f0C.svg", alt="Deprecated.", width="24", height="24" %} Deprecated

To restore default preferences, scroll down to the end of the **Preferences** tab and click **Restore defaults and reload**.

## Appearance

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
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/E7duEXTRnleJ5OOJ0f0C.svg", alt="Deprecated.", width="24", height="24" %} **Color format** {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/VPpFJAIWgNSaTmnYrqNP.svg", alt="Drop-down.", width="24", height="24" %} sets the format of CSS color values in **Elements** > **Styles**.
{% endDetailsSummary %}

{% Aside %}
**Deprecated**: This settings is disabled to make room for [HD color spaces](/docs/devtools/css/color/).

To re-enable it, clear the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Experiments**](/docs/devtools/settings/experiments/) > {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Disable the deprecated Color Format setting** checkbox.
{% endAside %}

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

## Sources

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
- The **Sources** panel also puts a link to the generated or minified file in the status bar.
{% endAside %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rWo3UOHwEWTfiG4lvq8v.png", alt="The Sources panel shows a link to the minified file in the status bar.", width="800", height="472" %}
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

## Elements

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

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show CSS documentation tooltip** displays a tooltip with a short description when you hover over a property in the **Styles** pane.
{% endDetailsSummary %}

The **Learn more** link takes you an [MDN CSS Reference](https://developer.mozilla.org/docs/Web/CSS/Reference) on the property.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/v0joPkQg0NiMauy0bwwB.png", alt="The tooltip with documentation on a CSS property.", width="800", height="651" %}
{% endDetails %}

## Network

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

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/GQg1mjs5D3cXbthrJgw5.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video first shows that the requests aren't blocked. Then, after you enable this option, a pattern in the **Network request blocking** drawer blocks them.
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
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Group network log by frame** is the same as [Group by frames](/docs/devtools/network/reference/#group-by-frames) in the **Network** panel. This option groups requests initiated by inline frames.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/QgdViJaRvfWo8suAE6a6.png", alt="The network request log with requests grouped by inline frames.", width="800", height="702" %}
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Force ad blocking on this site** blocks [detected ads](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md) on the page while DevTools is open.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BLkQZlLgXuqPNIMnq95b.png", alt="An ad-related network request shown in the Network panel with the Blocked Requests filter enabled.", width="800", height="565" %}
{% endDetails %}

## Performance

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

## Console

This section lists options that customize the **Console**. Most of the options are the same as in [Console Settings](/docs/devtools/console/reference/#settings).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SXLYnxuqs3l2Z45JPMRp.png", alt="Similar options in Console and in Settings.", width="800", height="434" %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Hide network messages** hides network messages in the **Console**.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/aisMEFeYdzs84s9ZKO5M.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows how to hide network messages with this option both in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} **Settings** and in [Console Settings](/docs/devtools/console/reference/#settings)
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Selected context only** makes the **Console** show messages only for the selected context: top, iframe, worker, or extension.
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
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Accept autocomplete suggestion on Enter** makes the **Console** accept the selected suggestion from the autocomplete drop-down when you press <kbd>Enter</kbd>.
{% endDetailsSummary %}

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/yM8StJzP6O0p3uaREet6.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows what happens when you press <kbd>Enter</kbd> before and after enabling this option.
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
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Treat code evaluation as user action** turns any command you run in the **Console** into user interaction.
{% endDetailsSummary %}

In other words, it sets [`navigator.userActivation.isActive`](https://developer.mozilla.org/docs/Web/API/Navigator/userActivation) to `true` upon evaluation. You can find the same option in [Console > Settings](/docs/devtools/console/reference/#trigger-user-activation).

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/BRgg3ck0UVpTbYPmJsyV.mp4", autoplay=false, controls="true", muted="true", class="screenshot" %}
This video shows the evaluation result of `navigator.userActivation.isActive` before and after enabling this option.
{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Automatically expand console.trace() messages** makes the **Console** display expanded `console.trace()` messages when it logs them.
{% endDetailsSummary %}

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/cbD03Bo9vkRelkn9g8Y4.png", alt="An expanded console.trace() message in the Console.", width="800", height="648" %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Preserve log upon navigation** makes the **Console** log a `Navigated to` message upon every navigation and save logs across all pages.
{% endDetailsSummary %}

You can find the same option in [Console > Settings](/docs/devtools/console/reference/#persist).

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/wXm8EGHa1UpmT4x8hj90.png", alt="The Console shows 'Navigated to' messages and saves logs across different pages.", width="800", height="361" %}
{% endDetails %}

## Extension

This section lists options that customize link handling for Chrome DevTools extensions.

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

## Persistence

This section lists options that control how DevTools saves the changes you make.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable local overrides** makes DevTools persist changes you make to sources across page loads.
{% endDetailsSummary %}

For more information, see [Local Overrides](/docs/devtools/workspaces/#overrides).
{% endDetails %}

## Debugger {: #debugger }

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

## Global

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

## Sync

This section lets you set up the synchronization of settings between devices.

{% Details %}
{% DetailsSummary %}
{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable settings sync** allows you to sync DevTools settings across multiple devices.
{% endDetailsSummary %}

To use this setting, first [enable Chrome Sync](https://support.google.com/chrome/answer/185277). For more information, see [Sync settings](/docs/devtools/customize/#sync).
{% endDetails %}
