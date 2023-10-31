---
layout: 'layouts/blog-post.njk'
title: "DevTools 의 새로운 기능 (Chrome 109)"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Copy step as script in the Recorder, actual function names in performance’s recordings, and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fmfV4TpjIZ8BNFnOpjdb.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
draft: true
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ko/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="New copy options in the Recorder panel.", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->

<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->

<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->

Chromium issues: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)


<!-- ## Show actual function names in performance’s recordings {: #performance } -->

<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a source map. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Show before and after comparison of function names display in the Performance panel.", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="Show files before and after minfication.", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->

<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Chromium issues: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->

<!-- You can switch between tabs in the **Sources** panel using: -->
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->

<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->

<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Chromium issue: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->

<!-- These are some JavaScript debugging improvements in this release: -->

<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="Show before and after comparison of new.target evaluation debugging.", width="800", height="499" %}
<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="Show before and after comparison of WeakRef evaluation during debugging.", width="800", height="453" %}
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="Show before and after comparison inline preview for shadowed variable.", width="800", height="519" %}
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Chromium issues: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->

<!-- These are some noteworthy fixes in this release: -->

<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->

{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->

<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->

<!-- These are some highlights: -->

<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->

<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="Show Breakpoint pane before and after the redesign.", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Chromium issues: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904)


<!-- ## [Experimental] Automatic in-place pretty print -->

{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->

<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Show a minified file before and after automatic in-place pretty print.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Chromium issue: [1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
