---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 102)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "새로운 Performance insights 창, light/dark 테마 에뮬레이팅 바로가기 외 여러 가지 업데이트."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hi4lr0K9V9WE2HGgE7m8.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-102
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하였으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='0V_ph7PA_aw' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: New Performance insights panel {: #perf } -->
## 미리보기 기능: 새로운 Performance insights 창 {: #perf }

<!-- Use the **Performance insights** panel to get actionable and use-case-driven insights on your website's performance. -->
**Performance insights** 창을 이용하여 웹사이트 성능에 대해 실천 가능한, 그리고 유스 케이스에 기반한 인사이트를 발견할 수 있습니다.
<!-- [Open the panel](/docs/devtools/performance-insights/#open) and start a new recording based on your use case. For example, let’s measure the page load of this [demo page](https://coffee-cart.netlify.app/?ad=1). -->
여기를 [클릭](/docs/devtools/performance-insights/#open)하여 창을 열고, 여러분의 유스 케이스를 바탕으로 녹화를 시작합니다. 한 가지 예시로, 이 [데모 페이지](https://coffee-cart.netlify.app/?ad=1) 로딩을 측정해 보겠습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/EjgH5CD6FHnzoEhDEWxu.png", alt="새로운 Performance insights 창", width="800", height="585" %}

<!-- Once the recording is complete, you get the performance insights on the  **Insights** pane. Click on each insight item (for example, Render blocking request, layout shift) to understand the issue and potential fixes.  -->
녹화가 완료되면, 여러분은 **Insight** 창에서 Performance insight 를 볼 수 있습니다. 각각의 인사이트 항목(예시: Render blocking request 및 layout shift)을 클릭하여 페이지 내의 이슈와 잠재적인 수정 사항에 대해 알아보세요.
<!-- Go to the **Performance insights** panel [documentation](/docs/devtools/performance-insights/) to learn more with the step-by-step tutorial.  -->
**Performance insights** [관련 문서](/docs/devtools/performance-insights/) 로 가면 단계별 튜토리얼을 볼 수 있습니다.
<!-- This is a preview feature to help web developers (especially non-performance experts) to identify and fix potential performance issues. Our team is actively working on this feature and we are looking for your [feedback](https://crbug.com/1270700) for further enhancements. -->
Performance insights 는 미리보기 기능으로서, 성능 전문가가 아닌 웹 개발자들이 잠재적인 성능 문제를 인식하고 해결하는 데에 도음을 줄 수 있습니다. 우리는 이 기능을 현재 활발하게 개발하고 있으며, 더 많은 개선사항을 위해서 여러분의 [피드백](https://crbug.com/1270700)이 필요합니다.
Chromium issue: [1270700](https://crbug.com/1270700)


<!-- ## New shortcuts to emulate light and dark themes {: #emulation } -->
## 새 바로가기 메뉴 -  라이트 테마 및 다크 테마 에뮬레이팅하기 {: #emulation }
<!-- You can now emulate the light and dark themes quicker (CSS media feature [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query)) with the new shortcuts in the **Styles** pane. -->
여러분은 이제 **스타일** 창의 새 바로가기를 통해 라이트 테마 및 다크 테마를 좀 더 빠르게 에뮬레이트할 수 있습니다. (CSS 미디어 기능 [prefers-color-scheme](https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query))
<!-- Previously, it took more steps to [emulate themes](/docs/devtools/rendering/emulate-css/) in the **Rendering** tab.   -->
이전에는, **렌더링** 탭에서 [테마 에뮬레이션](/docs/devtools/rendering/emulate-css/) 을 위해 더 많은 단계를 거쳐야 했습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dCbNHwE5ICGNXRUws1zz.png", alt="라이트 테마 및 다크 테마를 에뮬레이팅하기 위한 새로운 바로가기", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/34c39bcabca71195024f1312ec29eecf464a633d #}

Chromium issue: [1314299](https://crbug.com/1314299)


<!-- ## Improve security on the Network Preview tab {: #network-preview } -->
## 네트워크 창의 미리보기 탭 보안 개선 {: #network-preview }
<!-- DevTools now apply the Content Security Policy (CSP) in the **Preview** tab in the **Network** panel. -->
DevTools의 새로운 기능 중 하나로, **네트워크** 창의 **미리보기** 탭에 콘텐츠 보안 정책(CSP)이 적용되었습니다.
<!-- For example, the first screenshot shows a page that contains [mixed content](https://web.dev/what-is-mixed-content/). The page loads over a secure HTTPS connection, but the stylesheet loads over an insecure HTTP connection. -->
예를 들어, 첫 번째 스크린샷을 보면 이 페이지에는 [혼합 콘텐츠](https://web.dev/what-is-mixed-content/)가 포함되어 있습니다. 이 페이지는 안전한 HTTPS 연결을 통해 로딩되지만, 스타일시트는 로딩을 위해 보안되지 않은 HTTP 연결을 이용합니다.
<!-- The browser blocked the stylesheet request by default. However, when you opened the page via the **Preview** tab in the **Network** panel, the stylesheet was not blocked previously (hence the background turned into red). It is now blocked as you would expect (second screenshot). -->
브라우저는 스타일시트 요청을 기본적으로 제한합니다. 그러나 이 페이지를 **네트워크** 창의 **미리보기** 탭을 통해 열었을 때, 이전에는 스타일시트의 요청이 제한되지 않았습니다. (따라서 배경이 붉게 바뀝니다.) 그러나 이제는 여러분이 기대하는 것처럼 요청이 받아들여지지 않습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jxqxoJYqWXGzj4V9aJaX.png", alt="네트워크 창의 미리 보기 탭 보안 개선", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/95bce20a2490b59a36d5da04c5f81d8c38230a39 #}

Chromium issue: [833147](https://crbug.com/833147)


<!-- ## Improved reloading at breakpoint {: #debugger } -->
## 브레이크 포인트에서의 새로고침 개선 {: #debugger }
<!-- The debugger now terminates script execution when reloading at breakpoint. -->
이제 브레이크 포인트에서 새로고침이 발생할 시, 스크립트 실행이 디버거에 의해 종료됩니다.
<!-- For example, the script got into an endless loop previously when setting and reloading at the `ReactDOM` breakpoint in this [React demo](https://react-stuck.glitch.me/). The **Sources** panel broke due to the endless loop.  -->
예를 들어, [리액트 데모 페이지](https://react-stuck.glitch.me/) 내부의 `ReactDOM` 브레이크포인트가 설정되고 새로고침될 때 이전에는 종료되지 않는 루프로 인해 소스 패널이 동작하지 않았습니다.
<!-- Continuing to execute JavaScript is causing a lot of trouble for developers and might leave the renderer in a broken state. This change aligns the debugging behavior with other browsers like Firefox. -->
계속해서 자바스크립트를 실행하는 것은 개발자들에게 매우 많은 문제를 야기할 것이고, 또한 이는 렌더러를 깨진 상태로 남아 있게 할 수도 있습니다. 이 변경 사항은 디버깅 동작을 파이어폭스와 같은 다른 브라우저의 동작과 일치하도록 조정합니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QBv59pX5TE9c7iJAB3Xu.png", alt="브레이크 포인트에서의 개선된 새로고침", width="800", height="566" %}

{# https://chromium.googlesource.com/chromium/src/+/ea207cee9bbd9b6731228d94778b23138373ec97 #}

Chromium issues: [1014415](https://crbug.com/1014415), [1004038](https://crbug.com/1004038), [1112863](https://crbug.com/1112863), [1134899](https://crbug.com/1134899)


<!-- ## Console updates  {: #console } -->
## 콘솔 업데이트  {: #console }
<!-- ### Handle script execution errors in the Console {: #errors } -->
### 콘솔에서의 스크립트 실행 오류 다루기 {: #errors }
<!-- Errors during script evaluation in the Console now generate proper error events that trigger the `window.onerror` handler and are dispatched as `"error"` events on the window object. -->
콘솔에서의 스크립트 평가 중 발생한 오류는 `window.onerror` 핸들러를 실행시키는 데 적절한 오류 이벤트를 생성하며, 이 이벤트는 윈도우 객체의 `"error"` 이벤트로 전달됩니다. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gBtY4zD39SPizfcCGJJW.png", alt="콘솔에서의 스크립트 실행 오류 다루기", width="800", height="487" %}

{# https://chromium.googlesource.com/v8/v8/+/56cfdd68c731c53d016326b890b56b5c30098998 #}

Chromium issue: [1295750](https://crbug.com/1295750)


<!-- ### Commit live expression with Enter {: #live-expression } -->
### 엔터키로 라이브 표현식 행하기 {: #live-expression }
<!-- Once you finish typing a [live expression](/blog/new-in-devtools-70/#watch), you can click `Enter` to commit it. Previously, hitting Enter resulted in adding new lines. This is inconsistent with other parts of the DevTools.  -->
이번 업데이트에서 여러분이 [라이브 표현식](/blog/new-in-devtools-70/#watch)을 타이핑한 후 실행하기 위해서는 `Enter`를 클릭하면 됩니다. 이전 버전에서는 Enter 키를 치면 새로운 라인이 추가되었으며, 이는 DevTools 의 다른 기능들과 일치하지 않았습니다.
<!-- To add a new line in the **live expression** editor, use `Shift` + `Enter` instead. -->
**라이브 표현식** 편집기에서 새로운 라인을 추가하기 위해서는 `Shift` + `Enter` 를 사용하세요.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yB7m2052mYzgsRgjIMvs.png", alt="엔터키로 라이브 표현식 실행하기", width="800", height="541" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f6f73b8d9eedbc5b6006e61c3be0d843188eac55 #}

Chromium issue: [1260744](https://crbug.com/1260744)


<!-- ## Cancel user flow recording at the start {: #recorder } -->
## 시작 전에 유저 플로우 녹화 취소하기 {: #recorder }
<!-- You can cancel the recording during the start of user flow recording. Previously, there was no option to cancel the recording. -->
이전 버전에서는 녹화를 취소할 수 있는 옵션이 없었으나 이제 유저 플로우 녹화 시작 중에도 취소가 가능해졌습니다. 


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3vhz3UrjLd9lJKcYw2FU.png", alt="시작 중에 유저 플로우 녹화 취소하기", width="800", height="488" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Display inherited highlight pseudo-elements in the Styles pane {: #pseudo } -->
## 스타일 창에 상속된 하이라이트 의사 요소들 표시하기 {: #pseudo }
<!-- View the inherited highlight pseudo-elements  (e.g. `::selection`, `::spelling-error`, `::grammar-error`, and `::highlight`) in the **Styles** pane. Previously, these rules were not displayed. -->
**스타일** 창에서 상속된 하이라이트 의사 요소들 (예시: `::selection`, `::spelling-error`, `::grammar-error`, `::highlight`)을 보세요. 이전에는 이 규칙들이 표시되지 않았습니다. 
<!-- As mentioned in the [specification](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade), when multiple styles conflict, cascade determines the winning style. This new feature helps you understand the inheritance and priority of the rules. -->
[스펙 문서](https://drafts.csswg.org/css-pseudo-4/#highlight-cascade)에 언급되었듯이 다중 스타일이 충돌을 일으킬 때, 캐스케이드가 가장 우선시되는 스타일을 결정합니다. 이 새로운 기능은 여러분들로 하여금 상속과 우선되는 규칙을 더 잘 이해할 수 있도록 해 줍니다.
{% Aside %}
<!-- At the moment, you need to run Chrome with the `--enable-blink-features=HighlightInheritance` flag to enable this feature. -->
현재는 이 기능을 활성화하기 위해서 `--enable-blink-features=HighlightInheritance` 플래그를 활성화하여 크롬을 실행하여야 합니다.
{% endAside %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fD8vohg49HvBPW53GV2Q.png", alt="스타일 창에 상속된 하이라이트 의사 속성들 표시하기", width="800", height="529" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bfe1683fe8b2eaa9ea2960dedca2e4a0bbc73546 #}

Chromium issue: [1024156](https://crbug.com/1024156)


<!-- ## Miscellaneous highlights {: #misc } -->
## 기타 하이라이트 {: #misc }
<!-- These are some noteworthy fixes in this release: -->
그 외 여러 가지 주목할 만한 개선점들이 추가되었습니다:
<!-- - The **Properties** pane now displays accessor properties with value by default. It was hidden mistakenly previously. ([1309087](https://crbug.com/1309087))
- The **Styles** pane now properly shows the overridden `@support` rules as strikethrough. Previously, the rules weren’t strikethrough. ([1298025](https://crbug.com/1298025))
- Fixed the CSS formatting logic in the **Sources** panel that caused multiple blank lines when editing CSS. ([1309588](https://crbug.com/1309588))
- Cap the **Expand recursively** option of an object in the **Console** to maximum 100 so it does not go on forever for circular objects. ([1272450](https://crbug.com/1272450)) -->

- 이제 **속성** 창은 창은 이전 버전에서는 숨겨져 있었던 접근자 속성 값을 기본적으로 표시합니다. ([1309087](https://crbug.com/1309087))
- **스타일** 창이 오버라이딩된 `@support` 규칙을 취소선으로 적절하게 표시하기 시작했습니다. 이전 버전에서는 취소선이 표시되지 않았습니다. ([1298025](https://crbug.com/1298025))
- **소스** 창에서 CSS를 편집할 떄 여러 개의 빈 줄을 만들던 CSS 포매팅 로직이 현 버전에서 수정되었습니다.
- **콘솔**에 있는 객체의 **재귀적으로 확장** 옵션을 최대 100으로 제한하여 원형 개체에 대해 영원히 지속되지 않도록 합니다. ([1272450](https://crbug.com/1272450))
 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d4240f8bc96a3ebd2dc2a5b316fd41c24e20fb3c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cf09d1de8a0277dbaa9e2000a8d2fcca69e7128e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6616b9f0cd3e9f1138fb0f409fbe91206d5c8640 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9751653723e15073588f985ba53ba5204475b8c5 #}


<!-- ## [Experimental] Copy CSS changes {: #copy } -->
## [실험 기능] CSS에서의 변경사항 복사 {: #copy }
{% Aside %}
<!-- To enable the experiment, check **Sync CSS changes in the Styles pane** under **Settings** > **Experiments**. -->
이 기능을 활성화하기 위해, **설정** > **실험** 으로 들어간 후 **Sync CSS changes in the Styles pane** 를 체크해 줍니다.
{% endAside %}

<!-- With this experiment, the **Styles** pane highlights your CSS changes in green. You can hover over the changed rules and click on the new copy button next to it to copy it. -->
**스타일** 창은 여러분의 CSS 변경사항을 녹색으로 강조해 줍니다. 변경사항 위로 마우스를 가져간 다음 옆에 있는 복사 버튼을 클릭하여 복사할 수 있습니다.

<!-- Apart from that, you can copy all CSS changes across declarations by right-clicking on any rule, and selecting **Copy all CSS changes**. -->
그 외에도, 어떤 규칙 위에서 마우스 우클릭 후 **모든 CSS 변경사항 복사** 를 선택하여, 모든 변경사항들을 복사할 수 있습니다.
<!-- A new **Copy** button is added to the [Changes](/docs/devtools/changes/) tab as well to help you keep track and copy your CSS changes with ease! -->
[변경사항](/docs/devtools/changes/) 탭에 새로운 **복사** 버튼이 추가되었으며, 이는 여러분들의 변경 이력을 추적하고 CSS 변경사항들을 쉽게 복사할 수 있도록 합니다. ]
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7PYMKJNBguswcas6jbpu.png", alt="Copy CSS changes", width="800", height="488", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/afe5698f1cd20304d2763574ef8e9faf6a4a6db1 #}
{# ​​https://chromium.googlesource.com/devtools/devtools-frontend/+/5de1d6140cad945783f3ca54055134f4a7db42a1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/573dfc1cca09e49177ece3898c9ba9619c386f06 #} 

Chromium issue: [1268754](https://crbug.com/1268754)


<!-- ## [Experimental] Picking color outside of browser {: #color-picker } -->
## [실험 기능] 브라우저 바깥의 색상 선택하기
{% Aside %}
<!-- To enable the experiment, check **Enable color picking outside the browser window** under **Settings** > **Experiments**. -->
이 기능을 활성화하기 위해 **설정** > **실험** 으로 들어간 후 **Enable color picking outside the browser window** 를 체크해 줍니다.
{% endAside %}

<!-- Enable this experiment to pick a color outside of the browser with the color picker. Previously, you could only pick a color within the browser. -->
이전 버전에서는 브라우저 내부에서만 색상을 선택할 수 있었습니다만 실험 기능을 활성화하여, 브라우저 바깥의 색상을 컬러 피커를 통해 선택할 수 있습니다.
<!-- In the **Styles** pane, click on any color preview to open the color picker. Use the eyedropper to pick color from anywhere.  -->
**스타일** 창에서 임의의 색상 미리보기를 클릭하여 컬러 피커를 열 수 있으며, 스포이드 아이콘을 이용하여 원하는 곳의 색상을 선택합니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/h3xLPNl1QdvyuzZpNuqW.png", alt="브라우저 바깥의 색상 선택하기", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1a73be9f3cb75fdd57578224b71396fbf68f8637 #}

Chromium issue: [1245191](https://crbug.com/1245191)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
