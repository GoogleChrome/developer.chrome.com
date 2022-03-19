---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 99)"
authors:
  - jecelynyeen
date: 2022-03-08
updated: 2022-03-08
description: 'View and edit @supports at rules, rename and customize recording’s selector, and more.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5QajycMSqwtiKSZD5MXU.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
draft: true
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하였으며, [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% include 'partials/devtools/ko/banner.md' %}

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Chrome 100  {: #m100 } -->
## 크롬 100

<!-- Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones. -->
드디어 크롬의 100번째 버전이 발표되었습니다! 크롬 DevTools 도 계속해서 웹 개발자들을 위해 더 신뢰감 높은 도구를 제공할 것입니다. **What's New** 탭을 눌러 마일스톤을 축하할 수 있도록 시간을 잠시 내 주세요.

<!-- As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->
언제나처럼 [What’s New in DevTools video](https://goo.gle/devtools-youtube)를 클릭하면 새로운 기능을 소개하는 영상이 재생됩니다.
{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- ## View and edit @supports at rules in the Styles pane {: #supports } -->
## 스타일 창의 규칙에서 @supports 보기 및 편집하기 {: #supports }

<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->
**스타일** 창에서 CSS `@supports` 규칙을 확인하고 편집할 수 있게 되었습니다. 이 기능은 개발자들이 실시간으로 at-rules 규칙을 더 쉽게 실험할 수 있도록 합니다.

<!-- Open this [demo page](https://jec.fyi/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.  -->
[데모 페이지](https://jec.fyi/demo/at-support)를 열고 `<div class=”box”>` 요소를 [검사](/docs/devtools/dom/#inspect)하고, **스타일** 창에서 `@supports` at-규칙을 확인해 보세요. 그리고 이를 편집하기 위해서는 규칙의 선언을 클릭하면 됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="View and edit @supports at rules", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Chromium issues: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Recorder 창의 개선점 {: #recorder }

<!-- ### Support common selectors by default {: #selector } -->
### 공통 셀렉터의 기본적인 지원 {: #selector }

<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->
녹화하는 동안 고유한 셀렉터를 결정할 때, [Recorder] 패널은 자동적으로 다음 속성을 가지는 요소들을 선호하게 됩니다.


- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->
위 속성들은 자동회 테스트에서 사용되는 공통 셀렉터들입니다.

<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fyi/demo/recorder). Fill in an email address and observe the selector value. -->
예를 들어, [데모 페이지](https://jec.fyi/demo/recorder)에서 [start a new recording](/docs/devtools/recorder/#record)을 클릭합니다. 이메일 주소를 기입하고 셀렉터 값을 관찰해 보세요.

<!-- Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes. -->
이메일 요소가 `data-testid` 를 정의하도록 했으므로, 이것이 자동적으로 `id` 나 `class` 속성 대신에 셀렉터로써 사용됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="Support common selectors by default", width="800", height="585" %}


<!-- ### Customize the recording’s selector {: #customize-selector } -->
### 녹화 셀렉터의 커스터마이징 {: #customize-selector }

<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->

만일 [공통 셀렉터](/docs/devtools/recorder/#selector)를 사용하고 있지 않다면, 당신은 녹화 셀렉터를 커스터마이징할 수 있습니다.

<!-- For example, this [demo page](https://jec.fyi/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->

예를 들어, [데모 페이지](https://jec.fyi/demo/recorder)는 `data-automate` 속성을 셀렉터로서 사용하고 있습니다. [start a new recording](/docs/devtools/recorder/#record) 을 클릭하고 `data-automate` 를 셀렉터 요소로 넣습니다. 이메일 주소를 채우고, 셀렉터 값(`[data-automate=email-address]`)을 관찰해 보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Customize the recording’s selector", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="The result of custom selector selection", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->
### 녹화 이름 바꾸기 {: #recorder-rename }

<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title. -->
여러분은 이제 [Recorder](/docs/devtools/recorder/) 창에서 녹화 타이틀 옆의 편집 버튼(연필 아이콘)을 이용해 녹화 이름을 바꿀 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="Rename a recording", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->
## 호버링을 통한 클래스/함수 미리보기 {: #properties }

<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->
소스 코드에서 오직 함수 이름과 위치로의 링크만을 보여 주던 이전과는 달리, 이제 디버깅하는 동안 여러분은 **소스** 창에서 클래스 혹은 함수 위로 마우스를 올려 속성을 미리 볼 수 있게 되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="Preview class/function properties on hover", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Chromium issue: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->

<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->

<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->

<!-- This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.  -->

<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Partially presented frames in the Performance panel", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Chromium issue: [1261130](https://crbug.com/1261130)


<!-- ## Miscellaneous highlights {: #misc } -->

<!-- These are some noteworthy fixes in this release: -->

<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->
<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->
<!-- - The **Sources** panel now correctly displays scope variable names when debugging with sourcemap. Previously, the **Sources** panel displays minified scope variable names despite sourcemap being provided. ([1294682](https://crbug.com/1294682))  -->
<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->


{% include 'partials/devtools/ko/reach-out.md' %}
{% include 'partials/devtools/ko/whats-new.md' %}
