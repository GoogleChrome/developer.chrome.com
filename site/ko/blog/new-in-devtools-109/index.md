---
layout: 'layouts/blog-post.njk'
title: "DevTools 의 새로운 기능 (Chrome 109)"
authors:
  - jecelynyeen
date: 2023-01-15
description: 'Recorder내의 단계, Performance Recording의 실제 함수명, 그리고 그 이상을 복사할 수 있습니다.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fmfV4TpjIZ8BNFnOpjdb.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-109
---

*이 게시글의 번역에는 [Steven H. Yang (양현진)](https://www.linkedin.com/in/syang0624/)님이 참여하셨으며, [최원영](https://www.linkedin.com/in/toruchoi)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ko/_partials/devtools/whats-new.md file -->


<!-- ## Recorder: Copy as options for steps, in-page replay, step’s context menu {: #recorder } -->
## Recorder: 단계, 페이지 내 재생, 단계별 상황에 맞는 옵션을 복사할 수  있습니다. {: #recorder }
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uCqjrGj716ZbDJ4N37dl.png", alt="Recorder 패널 안의 새로운 복사 옵션.", width="800", height="615" %}

<!-- Open an existing user flow in the **Recorder**. Previously, when you replayed the user flow, DevTools would always start the replay by navigating to or reloading the page. -->
**Recorder**에서 기존 사용자 흐름을 엽니다. 이전에는 사용자 흐름을 재생할 때 항상 DevTools가 페이지를 탐색하거나 다시 로드하여 재생을 시작했습니다.

<!-- With the latest updates, the **Recorder** shows the navigation step separately. You can right-click and remove it to perform in-page replay!  -->
최신 업데이트 덕분에 **Recorder** 에서 네비게이션 단계가 별도로 표시됩니다. 본 업데이트로 마우스 우클릭 후 제거로 페이지내 재생을 사용하실 수 있습니다.
<!-- Apart from that, you can right-click a step and copy it to the clipboard in the **Recorder* panel instead of exporting the whole user flow. It works with [extensions](https://goo.gle/recorder-extension) too. For example, try to copy a step as a [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. With this feature, you can update any existing script with ease. -->
뿐만 아니라, 전체 사용자 흐름을 내보내는 대신에 이제 단계를 우클릭하여 **Recorder** 클리보드에 복사할 수 있습니다. 이 기능은 [확장기능](https://goo.gle/recorder-extension)과도 호환됩니다! 예를 들어 [Nightwatch Test](https://bit.ly/nightwatch-recorder) 처럼 단계를 복사해보십시오. 이 기능으로 기존 스크립트를 보다 쉽게 업데이트 하실 수 있습니다.
<!-- Previously, you could access the step menu only through the 3-dot button. You can now right-click anywhere on the step to access the menu. -->
이전에는, 단계 메뉴를 더보기 버튼을 클릭해야만 사용하실 수 있었지만, 이제는 어떤 곳에서 우클릭을 하셔도 메뉴를 단계 메뉴를 확인하실 수 있습니다.
Chromium issues: [1322313](https://crbug.com/1322313), [1351649](https://crbug.com/1351649), [1322313](https://crbug.com/1322313), [1339767](https://crbug.com/1339767)


<!-- ## Show actual function names in performance’s recordings {: #performance } -->
## Performance Recording 내에서의 실제 함수명 표출 {: #performance }
<!-- The **Performance** panel now shows the actual function names and their sources in the trace if there’s a sourcemap. -->
Source map이 있는 경우, **Performace** 패널에는 이제 실제 함수명과 추적된 소스를 보여줍니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/9pHMVM1ARXrlyLoTziVA.png", alt="Performance 패널의 함수 이름 표시에 대한 기존 방식과 현재 방식의 비교.", width="800", height="509" %}

<!-- In this example, a source file is minified during production. For example, the `sayHi` function is minified as `n`, and the `takeABreak` function is minified as `o` in this [demo](https://clinquant-mousse-2f2396.netlify.app/). -->
이 예시를 보면, 소스 파일이 production 중에 최소화 되었습니다. 예를 들어 이 [데모](https://clinquant-mousse-2f2396.netlify.app/)에서는 `sayHi` 함수는 `n`으로 최소화 되었고, `takeABreak` 함수는 `o`로 최소화 되었습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ywER8cdQUNYrdAaBJTKT.png", alt="축소화 기존 방식과 현재 방식의 파일 비교.", width="800", height="392" %}

<!-- Previously, when you recorded a trace in the **Performance** panel, the trace only showed you the minified function names. This made it harder to debug.  -->
업데이트 이전에는 **Performance** 패널에서 추적을 기록할 때 추적에 최소화된 함수 이름만 표시되었습니다. 이것은 디버깅을 어렵게 만들었습니다.
<!-- With the latest changes, DevTools now reads the source map and shows the actual function names and source location.  -->
최신 업데이트 덕분에, DevTools는 이제 소스 맵을 읽고 실제 함수명과 소스의 위치를 보여줍니다.
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4be8b5bcc00889ca35a455aa093ec242dce8ce6c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/24d850860bda04864069e6c0d4dab32c8f53bc7f  #}

Chromium issues: [1364601](https://crbug.com/1364601), [1364601](https://crbug.com/1364601)


<!-- ## New keyboard shortcuts in the Console & Sources panel {: #keyboard-shortcuts } -->
콘솔 및 소스 패널에서의 새로운 단축키 {: #keyboard-shortcuts }
<!-- You can switch between tabs in the **Sources** panel using: -->
<!-- On MacOS, <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd> -->
<!-- On Windows and Linux, <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd> -->
이제 **Sources** 패널에서 아래와 같이 탭을 변경하실 수 있습니다:
MacOS에서 <kbd>Function</kbd> + <kbd>Command</kbd> + <kbd>Arrow up</kbd> and <kbd>down</kbd>
Windows와 Linux에서 <kbd>Control</kbd> + <kbd>Page up</kbd> or <kbd>down</kbd>
<!-- Moreover, you can navigate the autocomplete suggestions with <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd> on MacOS, similar to [Emacs](https://www.gnu.org/software/emacs/). For example, you can type `window.` in the `Console` and use these shortcuts to navigate. -->
뿐만 아니라, [Emacs](https://www.gnu.org/software/emacs/)와 비슷하게, MacOS에서 <kbd>Ctrl</kbd> + <kbd>N</kbd> and <kbd>Ctrl + P</kbd>로 이제 자동완성 기능을 탐색할 수 있습니다. 예를 들어 `Console`에 `window.`를 입력하고 단축키를 사용하여 탐색할 수 있습니다
<!-- On top of that, DevTools now accepts <kbd>Arrow Right</kbd> for autocompletion only at the end of line. For example, an autocomplete dialog shows when you are editing something in the middle of the code. When you press the <kbd>Arrow Right</kbd> key, most likely, you want to set the cursor to the next position instead of autocomplete. This UX change better aligns with your authoring workflow. -->
끝이 아닙니다. DevTools는 이제 각 줄에 끝에서만 <kbd>Arrow Right</kbd>로 자동완성을 지원합니다. 예를 들어, 코드 중간에 있는 부분을 작업할 때 자동완성 대화 상자가 표시될 것 입니다. 이 때 <kbd>Arrow Right</kbd>를 누르면 대부분의 경우 자동완성 보다는 다음 위치로 설정을 원하실 것입니다. 이 UX의 변경을 워크플로우와 더 부합합니다.
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/686acb9789020a511405a53a13ad754a7e928c99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/09c3ceaa1605b29d1074d0cf310958bdb823149d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6468c740419d01d4e13c9ad914001959e78ca782 #}

Chromium issue: [1167965](https://crbug.com/1167965), [1172535](https://crbug.com/1172535),  [1371585](https://crbug.com/1371585). [1369503](https://crbug.com/1369503)


<!-- ## Improved JavaScript debugging {: #debugging } -->
## 향상된 JavaScript 디버깅 {: debugging}
<!-- These are some JavaScript debugging improvements in this release: -->
아래 언급된 사항들은 이번 향상된 JavaScript 디버깅의 일부분입니다:
<!-- - `new.target` is a meta-property that lets you detect whether a function or constructor was called using the new operator. You can now log `new.target` in the **Console** to check its value during debugging. Previously, it would return errors when you entered `new.target`. -->
`new.target` 새로운 연산자로 함수나 생성자가 호출되었는지를 확인할 수 있는 메타 속성입니다. 이제 **Console**에 `new.target`을 기록하여 디버깅 중에 값을 확인할 수 있습니다. 이전에는 `new.target`을 입력하면 오류 값이 반환되었었습니다.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hKOEn03BZN2IUmWJ1Hho.png", alt="new.target 평가 디버깅 전/후 결과 비교.", width="800", height="499" %}
<!-- - A `WeakRef` object lets you hold a weak reference to another object, without preventing that object from getting garbage-collected. DevTools now shows an inline preview for the value and evaluates the weak reference directly in the console during debugging. Previously, you had to explicitly call “deref” on them to resolve it. -->
`WeakRef` 개체는 이제 다른 개체에 대한 WeakReference를 불필요한 수집의 필요 없이 개체를 유지할 수 있도록 해줍니다. 이제 DevTools는 값에 대한 Inline 미리 보기를 표시하고 디버깅 중에 콘솔에서 직접 취약한 참조를 평가합니다. 이전에는 이를 해결하기 위해 "deref"를 사용해야 했었습니다.
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M7DP4bI7pA07oY7M21wF.png", alt="WeakRef 평가 디버깅의 전/후 결과 비교.", width="800", height="453" %} 
<!-- - Fixed inline preview for shadowed variable. Previously, the display value was incorrect.  -->
   {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XHL8pnBxhZ65ni7zYV0Q.png", alt="그림자로 표시된 변수의 Inline 미리보기 전/후 비교.", width="800", height="519" %} 
<!-- - Deobfuscate variable names in `Generator` and `async` functions in the **Scope** pane in the **Sources** panel. -->
**Sources** 패널의 **Scope** 창에 있는 `Generator` 및 `async` 함수의 변수 이름을 해독합니다.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8bec401b1934ca55f9d742ee68f72cca4de47931 #}
{# https://chromium.googlesource.com/v8/v8/+/b2892b5f24b7b97ad930356a9376b8a9b2a1d360 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b92fd6fc20ab07c9791f374e0e41c54863c7ad3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/17e5e4392d054dc0a3af46eefff7caef6b4ce975 #}

Chromium issues: [1267690](https://crbug.com/1267690), [1246863](https://crbug.com/1246863) [1371322](https://crbug.com/1371322), [1311637](https://crbug.com/1311637)


<!-- ## Miscellaneous highlights {: #misc } -->
## 기타 하이라이트 {: #misc }
<!-- These are some noteworthy fixes in this release: -->
이번 릴리스에서 주목할 만한 수정 사항들입니다:
<!-- - Support more hints for inactive CSS properties in the **Styles** pane - inline height and width, flex and grid properties. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508)) -->
- **Styles** 창에서 inline height과 width, flex/grid 속성 같은 비활성 CSS 속성에 대한 힌트를 제공합니다. ([1373597](https://crbug.com/1373597), [1178508](https://crbug.com/1178508), [1178508](https://crbug.com/1178508),[1178508](https://crbug.com/1178508))
<!-- - Fixed syntax highlighting. It was not working properly since the recent [code editor](https://codemirror.net/) upgrade in DevTools. ([1290182](https://crbug.com//1290182)) -->
- DevTools의 [코드 에디터](https://codemirror.net/)가 업데이트 되고 Syntax Highlighting이 잘 작동하지 않았지만, 이번 릴리즈에서 개선되었습니다. ([1290182](https://crbug.com//1290182))
<!-- - Capture input change events properly after on blur event in the **Recorder**. ([1378488](https://crbug.com/1378488)) -->
- **Recorder**에서 흐림 이벤트 후 입력 변경 이벤트를 올바르게 캡처합니다. ([1378488](https://crbug.com/1378488))
<!-- - Update Puppeteer replay script on export for better debugging experience in the **Recorder**. ([1351649](https://crbug.com/1351649)) -->
- **Recorder**에서 더 나은 디버깅 환경을 위해 내보내기 시 Puppetier 재생 스크립트가 업데이트 되었습니다. ([1351649](https://crbug.com/1351649))
<!-- - Support record and replay in the **Recorder** for remote debugging. ([1185727](https://crbug.com/1185727))  -->
- 이제 리모트 디버깅 시 **Recorder** 내에서 녹화와 재생을 지원합니다. ([1185727](https://crbug.com/1185727))
<!-- - Fixed parsing of special CSS variable names in `var()`. Previously, DevTools didn't support parsing variables with escaped characters like `var(--fo\ o)`. , ([1378992](https://crbug.com/1378992)) -->
- `var()`에서 특수 CSS 변수 이름의 고정 구문을 분석합니다. 이전에는 DevTools에서 `var(--fo\o)`와 같은 이스케이프 문자를 사용하는 구문 분석 변수를 지원하지 않았습니다. ([1378992](https://crbug.com/1378992))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d7bbaba2b82bb3b8c90e8d47c1f36fba2182c5e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2767a58a7b4d306ce737c342d57e0fa330d8b08f  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b42002b898216e97acf94627d5d3d745a1ba1252 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0cdc185928246ca5b7e320763f8c942c8a1d2db  #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/55382b27eff3539c8aba42ea501eb8de4f7ba57c #}


<!-- ## [Experimental] Enhanced UX in managing breakpoints -->
## [실험 기능] 브레이크포인트 관리시의 UX 개선
{% Aside %}
<!-- To enable the experiment, check **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** under **Settings** > **Experiments**. -->
실험 기능을 사용하기 위해서는 **Settings** > **Experiments** 에서 **Enable re-designed Breakpoint Sidebar Pane in the Sources Panel** 를 체크하십시오.
{% endAside %}

<!-- The current **Breakpoints** pane provides little visual aid in overseeing all breakpoints. On top of that, frequently used actions are hidden behind the context menu. -->
지금의 **Breakpoints** 창에서는 전반적인 브레이크포인트를 볼 수 있는 제한된 시각 보조 기능을 지원합니다. 심지어는 자주 사용하는 기능들은 context 메뉴 아래에 숨겨져 있었습니다.
<!-- This experimental UX redesign aims at bringing structure into the **Breakpoints** pane and allow developers to have quick access to commonly used features, in particular editing and removing breakpoints. -->
이 실험적인 UX 리디자인은 **Breakpoints** 창 안에 구조를 가져오고, 개발자들이 자주 사용하는 기능을 빠르게 접근할 수 있도록 합니다. 특히, 브레이크포인트의 수정 및 제거에 관해서 말입니다.
<!-- These are some highlights: -->
몇 몇 하이라이트들 입니다:
<!-- - Both pause options are in the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- 두 일시 정지 옵션 모두 **Breakpoints** 창 안에 있으며 차이를 이해할 수 있는 텍스트로 표시되었습니다.
<!-- - Breakpoints are grouped by file, ordered by line/column number, and collapsible.** -->
- 브레이크포인트들은 행열 순서에 맞게 파일별로 그룹화 되었으며, 접을 수 있습니다.
<!-- - New options to remove and edit breakpoint when hovering over a breakpoint or file name in the **Breakpoint** pane. -->
- **Breakpoint** 창에서 브레이크포인트나 파일명을 호버링했을 때 브레이크포인트를 삭제 혹은 수정할 수 있습니다.
<!-- Read the full changes in our [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) and leave your feedback [here](https://crbug.com/1394686). -->
보다 자세한 변동 사항들은 [RFC (closed)](https://github.com/ChromeDevTools/rfcs/discussions/3) 을 확인해주시길 바라며, 피드백을 [여기](https://crbug.com/1394686)에 남겨주세요. 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ytfyl8qK5rkHQRTS3sXf.png", alt="디자인 수정 전/후의 브레이크포인트 창 보이기.", width="800", height="684" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2140378e0bb1687b263c226de01b741487ff324 #}
Chromium issues: [1346231](https://crbug.com/1346231), [1324904](https://crbug.com/1324904) 


<!-- ## [Experimental] Automatic in-place pretty print -->
## [실험 기능] 자동적으로 알맞은 위치에 출력하기
{% Aside %}
<!-- To enable the experiment, check **Automatically pretty print in the Sources panel** under **Settings** > **Experiments**. -->
실험 기능을 사용하기 위해서는 **Settings** > **Experiments** 에서 **Automatically pretty print in the Sources panel** 를 체크하십시오.
{% endAside %}

<!-- The **Sources** panel now automatically pretty print minified source files in-place. You can click on the **pretty print button `{ }` to underdo it. -->
이제 **Sources** 패널에서 자동적으로 축소된 파일들을 알맞은 위치에 출력합니다. **pretty print button `{ }`을 클릭하여 underdo할 수 있습니다.
<!-- Previously, the **Sources** panel shows minified content by default. Developers need to click on the pretty print button manually to format the content. On top of that, the pretty printed content is not displayed in the same file, but in another `::formatted` tab. -->
이전에는 **Sources** 패널에서 축소된 파일을 기보으로 보여줬습니다. 개발자들은 알맞은 위치에 출력 버튼을 수동적으로 눌러야만 내용을 포맷할 수 있었습니다. 심지어는 알맞은 위치에 출력된 내용도 같은 파일에서가 아닌 `::formatted`탭 에서 확인할 수 있었습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="자동 미화 프린트 전/후 축소된 파일 보이기.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0c96e7f4cdaf2009e5223553cabb606099f85569 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6ea8fee1935d3c56dfea1edaa752af09579fffcc #}

Chromium issue: [1164184](https://crbug.com/1164184)




{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
