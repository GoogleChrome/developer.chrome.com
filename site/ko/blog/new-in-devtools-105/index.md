---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 105)"
authors:
  - jecelynyeen
date: 2022-08-12
updated: 2022-08-12
description: "Supports step-by-step replay and mouse over events in the Recorder, LCP in the Performance insights panel and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oc4swlP62b8h9zBnfHpa.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-105
draft: true
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi) 님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% include 'partials/devtools/ko/banner.md' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->


<!-- ## Step-by-step replay in the Recorder {: #recorder } -->
## Recorder의 단계별 재생 기능 {: #recorder }
<!-- You can now set a breakpoint and replay a user flow step by step in the **Recorder** panel. -->
이제 **Recorder** 패널에서 브레이크포인트를 설정하고, 유저 플로우를 단계별로 재생할 수 있습니다.
<!-- To set a breakpoint, click on the blue dot next to a step. Replay your user flow, the replay will pause before executing the step. From here, you can continue the replay, execute a step, or cancel the replay. -->
브레이크포인트를 설정하기 위해, 각 단계 옆에 있는 파란색 점을 클릭합니다. 여러분의 유저 플로우가 재생되며, 각 단계를 실행하기 전에 재생이 잠시 정지되며, 이 때 여려분은 재생을 계속하거나, 각 단계를 실행하거나, 혹은 재생을 취소할 수 있습니다.
<!-- With this feature, you can fully visualize and debug your user flow with ease. -->
이 기능은 여러분들로 하여금 여러분의 유저 플로우를 보다 쉽게 시각화할 수 있으며, 디버깅을 보다 용이하게 할 수 있습니다.
<!-- See [Recorder features reference](/docs/devtools/recorder/reference/) for more information. -->
자세한 설명은 [Recorder features reference](/docs/devtools/recorder/reference/) 를 참고하세요.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5RqFNkPTbtEXSC4KovNF.png", alt="Step-by-step replay in the Recorder", width="800", height="547" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Support mouse over event in the Recorder panel {: #recorder-hover } -->
## Recorder 패널에서 마우스 오버 이벤트 기능 지원 {: #recorder-hover }
<!-- The **Recorder** now supports adding a mouse over (hover) step manually in a recording.  -->
**Recorder** 기능에서 레코딩 시에 마우스 오버 (호버) 단계를 수동으로 추가하는 것이 가능해졌습니다. 
<!-- [This demo](https://jec.fyi/demo/menu-hover) shows a pop up menu on hover. Try to record a user flow and click a menu item. -->
[데모](https://jec.fyi/demo/menu-hover)에서 볼 수 있듯이, 마우스 호버 시에 팝업 메뉴가 표출됩니다. 유저 플로우의 녹화 및 메뉴 아이템 클릭을 시도해 보세요.
<!-- If you replay the user flow now, it will fail because the **Recorder** doesn’t capture mouse over events automatically during recording. To resolve this, [add a step manually](/docs/devtools/recorder/reference/#add-and-remove-steps) to hover over the selector before clicking the menu item.  -->
녹화 중에 **Recorder** 가 마우스 오버 이벤트를 자동적으로 감지하기 않기 때문에 지금 당신이 유저 플로우를 재생한다고 할지라도 재생이 실패할 것입니다. 이 문제를 해결하기 위해서, 메뉴 항목을 클릭하기 전에 [이 단계를 수동으로 추가](/docs/devtools/recorder/reference/#add-and-remove-steps)하여 셀렉터 위로 마우스를 올릴 수 있습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GY1ZkqEU3zbGmhEKoblN.png", alt="Support mouse over event in the Recorder", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Largest Contentful Paint (LCP) in the Performance insights panel {: #lcp } -->
## Performance insights 패널의 Largest Contentful Paint (LCP) {: #lcp }
<!-- LCP is an important, user-centric metric for measuring [perceived load speed](https://web.dev/user-centric-performance-metrics/#types-of-metrics). You can now find out the critical paths and root causes of a [Largest Contentful Paint (LCP)](https://web.dev/lcp/). -->
LCP 는 [인지 로딩 속도](https://web.dev/user-centric-performance-metrics/#types-of-metrics)를 측정하기 위한 중요한 사용자 중심적 측정 기준입니다.
여러분은 이제 [최대 콘텐츠풀 페인트(LCP)](https://web.dev/lcp/) 의 중요한 경로와 근본적인 원인을 찾을 수 있습니다.
<!-- In a [performance recording](/docs/devtools/performance-insights/#record), click on the LCP badge in the **Timeline**. In the **Details** pane, you can view the LCP score, learn how to fix resources that slow down the LCP and see the critical path for the LCP resource. -->
[performance recording](/docs/devtools/performance-insights/#record) 에서, **타임라인** 의 LCP 뱃지를 클릭하세요. **Details** 창에서, 여러분은 LCP 점수를 볼 수 있고, LCP를 느리게 만드는 리소스를 어떻게 수정할지를 알 수 있고, LCP 자원의 중요한 경로를 찾을 수 있습니다.
<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
[Performance Insights](/docs/devtools/performance-insights/) 를 통해 실행 가능한 다각도의 해법을 얻는 방법과, 여러분의 웹사이트 성능 개선을 어떻게 할 수 있는지를 알아보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NZZJ1FzXxqj2U2NR0U53.png", alt="LCP in the Performance insights panel", width="800", height="751" %}

Chromium issue: [1326481](https://crbug.com/1326481)


<!-- ## Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts {: #foit-fout } -->
## 레이아웃 변경에 대한 잠재적인 근본 원인으로서 텍스트 깜박임(FOIT, FOUT) 식별
<!-- The **Performance insights** panel now detects [flash of invisible text (FOIT) and flash of unstyled text (FOUT)](https://web.dev/preload-optional-fonts/#font-rendering) as potential root causes for layout shifts. -->
이제 **Performance insights** 패널에서, 레이아웃 변경에 대한 잠재적 근본 원인으로서 [보이지 않는 텍스트 깜박임(FOIT)과 스타일이 지정되지 않은 텍스트 깜박임(FOUT)](https://web.dev/preload-optional-fonts/#font-rendering)을 감지할 수 있습니다.
<!-- To view the potential root causes of a layout shift, click on a screenshot in the **Layout shifts** track. -->
레이아웃 변경의 잠재적 근본 원인을 찾아보기 위해서, **Layout shifts** 트랙 내의 스크린샷을 클릭하세요.
<!-- See [Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/) to learn the technique to prevent layout shifts.  -->
[WebFont 로딩 및 렌더링 최적화](https://web.dev/optimize-webfont-loading/)에서 레이아웃 변경을 방지하기 위한 기술들을 배워 보세요.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AMN5oD5hlKhPhnq98sIB.png", alt="FOUT in the Performance insights panel", width="800", height="497" %}

Chromium issues: [1334628](https://crbug.com/1334628), [1328873](https://crbug.com/1328873)


<!-- ## Protocol handlers in the Manifest pane {: #manifest } -->
## 매니페스트 창의 프로토콜 핸들러
<!-- You can now use DevTools to test the [URL protocol handler registration](https://web.dev/url-protocol-handler/) for [Progressive Web Apps (PWA)](https://web.dev/learn/pwa/). -->
이제 여러분은 DevTools를 이용하여 [프로그레시브 웹 앱(PWA)](https://web.dev/learn/pwa/)에 대한 [URL 프로토콜 핸들러 등록](https://web.dev/url-protocol-handler/)을 테스트할 수 있습니다.

<!-- The URL protocol handler registration lets installed PWAs handle links that use a specific protocol (e.g. [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) for a more integrated experience. -->
URL 프로토콜 핸들러 등록을 통해, 설치된 PWA(프로그레시브 웹 앱)이 특정한 프로토콜 (예: [`magnet`](https://wikipedia.org/wiki/Magnet_URI_scheme), `web+example`) 를 핸들링하도록 할 수 있으며, 이는 더욱 통합된 경험을 위해서입니다.

<!-- Navigate to the **Protocol Handlers** section via the **Application** > **Manifest** pane. You can view and test all the available protocols here. -->
여러분은 **애플리케이션** > **매니페스트** 창을 통해 **프로토콜 핸들러** 로 들어갈 수 있으며, 여기서 모든 이용가능한 프로토콜을 확인하고 테스트할 수 있습니다.

<!-- For example, install [this demo PWA](https://protocol-handler.glitch.me/). In the **Protocol Handlers** section, type “americano” and click **Test protocol** to open the coffee page in the PWA.  -->


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DuH2YwkYGPpYjnUKln8m.png", alt="Protocol handlers in the Manifest pane", width="800", height="402" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cc2291cce5c5d199540334d01fcfe27207bc5962 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1aa36584d580ed5aa2caf7a8533f2c89b16ab66b #}

Chromium issues: [1300613](https://crbug.com/1300613)


<!-- ## Top layer badge in the Elements panel {: #top-layer } -->

<!-- Use the [top layer badge](/blog/top-layer-devtools/#top-layer-support-design-in-devtools) to understand the concept of the top layer and visualize how the top layer content changes.  -->

<!-- The [`<dialog>` element](https://web.dev/building-a-dialog-component/) has recently become stable across browsers. When you open a dialog, it is put into a [top layer](/blog/top-layer-devtools/). Top level content renders on top of all the other content.  -->

<!-- In this [demo](https://jec.fyi/demo/dialog), click **Open dialog**.  -->

<!-- To help visualize the top layer elements, DevTools adds a top layer container (`#top-layer`) to the DOM tree. It resides after the closing `</html>` tag.   -->

<!-- To jump from the top layer container element to the top layer tree element, click the **reveal** button next to the element or its backdrop in the top layer container. -->

<!-- Next to the top layer tree element (for example, the dialog element), click the **top-layer** badge to jump to the top layer container. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pGMsiKw0IhplBMd4hZCv.png", alt="Top layer badge in the Elements panel", width="800", height="538" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a8d58fa6e258423aef2b00ead3aea563629eef43 #}

Chromium issue: [1313690](https://crbug.com/1313690)


<!-- ## Attach Wasm debugging information at runtime {: #wasm } -->

<!-- You can now attach DWARF debugging information for wasm during runtime. Previously, the **Sources** panel only supported attaching sourcemaps to JavaScript and Wasm files. -->

<!-- Open a Wasm file in the **Sources** panel. Right-click in the editor and select **Add DWARF debugging info…**  to attach debugging information on demand.  -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/i5DMV6DFNGRYkrXyBtlg.png", alt="ALT_TEXT_HERE", width="800", height="559" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/112d6ec238ea3b1cb12f1cabc5b988afc74022db  #}

Chromium issue: [1341255](https://crbug.com/1341255)


<!-- ## Support live edit during debugging {: #live-edit } -->

<!-- You can now edit the top-most function on the stack without restarting the debugger. -->

<!-- In Chrome 104, DevTools brings back the [restart frame](/blog/new-in-devtools-104/) feature. However, you weren't able to edit the function you are currently paused in. It is common for developers to break in a function and then edit that function while paused.  -->

<!-- With this update, the debugger automatically restarts the function with the following restrictions: -->

<!-- - Only the top-most function can be edited while paused -->
<!-- - No recursive call on the same function further down the stack -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0PG2PnQUh5bnpIulyj7m.png", alt="live edit during debugging", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b41deeb8b0b228ea4628a49e79a7ce4d8ab32ffa #}

Chromium issue: [1334484](https://crbug.com/1334484)


<!-- ## View and edit @scope at rules in the Styles pane {: #scope } -->

<!-- You can now view and edit the [CSS `@scope` at-rules](https://drafts.csswg.org/css-cascade-6/#scope-atrule) in the **Styles** pane.  -->

<!-- The `@scope` at rules is part of the [CSS Cascading and Inheritance Level 6 specification](https://drafts.csswg.org/css-cascade-6/). These rules allow developers to scope style rules in CSS. -->

<!-- Open [this demo page](https://codepen.io/miriamsuzanne/details/ZErXZVY) and inspect the hyperlink within the `<div class=”dark-theme”>` element. In the **Styles** pane, view the `@scope` at-rules. Click the rule declaration to edit it. -->

{% Aside %}
<!-- The CSS `@scope` is currently under development. To test this feature, enable the **Experimental Web Platform features** flag via `chrome://flags/#enable-experimental-web-platform-features`. -->
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LnkBUWoEl11HGiAD4ag7.png", alt="@scope at rules in the Styles pane", width="800", height="464" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8b2309caa9ea358bc07d4d48eb976cc3dc6884cd #}

Chromium issue: [1337777](https://crbug.com/1337777)


<!-- ## Sourcemap improvements {: #sourcemaps } -->

<!-- Here are a few fixes on sourcemaps to improve the overall debugging experience: -->

<!-- - DevTools now properly resolves sourcemap identifiers with punctuation. Some modern minifiers (for example, [esbuild](https://esbuild.github.io/)) produce sourcemaps that merge identifiers with subsequent punctuation (comma, parentheses, semicolon).  -->
<!-- - DevTools now resolves sourcemap names for constructors with a `super` call. -->
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6djFfkrtPzXuNYq5m8Vk.png", alt="ALT_TEXT_HERE", width="800", height="441" %}
<!-- - Fixed source map URL indexing for duplicate canonical URLs. Previously, breakpoints were not activated in some files because of duplicate canonical URLs. -->


Chromium issue: [1335338](https://crbug.com/1335338), [1333411](https://crbug.com/1333411)


<!-- ## Miscellaneous highlights {: #misc } -->
 
<!-- These are some noteworthy fixes in this release: -->

<!-- - Properly remove a local storage key value pair from the table in the **Application** > **Local Storage** pane when it is deleted. ([1339280](https://crbug.com/1339280)) -->
<!-- - The color previews are now correctly displayed when viewing CSS files in the **Sources** panel. Previously, their positions were misplaced. ([1340062](https://crbug.com/1340062)) -->
<!-- - Consistently display the CSS flex and grid items in the **Layout** pane, as well as display them as badges in the **Elements** panel. Previously, the flex and grid items were randomly missing in both places. ([1340441](https://crbug.com/1340441), [1273992](https://crbug.com/1273992)) -->
<!-- - A new **Creator Ad Script** link is available for [ad frames](https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md#adtracker) if DevTools found the script that caused the frame to be labeled as an ad. You can open a frame via **Application** > **Frames**. ([1217041](https://crbug.com/1217041)) -->

{% include 'partials/devtools/ko/reach-out.md' %}
{% include 'partials/devtools/ko/whats-new.md' %}
