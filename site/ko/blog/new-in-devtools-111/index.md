---
layout: 'layouts/blog-post.njk'
title: "DevTools 의 새로운 기능 (Chrome 111)"
authors:
  - jecelynyeen
date: 2023-02-16
description: ""
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lYvShntTncz50VwLI9dP.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-111
draft: true
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하셨으며, [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님과 [Steven H. Yang (양현진)](https://www.linkedin.com/in/syang0624/)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ko/_partials/devtools/whats-new.md file -->


<!-- ## Debugging HD color with the Styles pane {: #color } -->
## 스타일 창에서 고화질 컬러 디버깅하기 {: #color }

<!-- New [CSS color types and spaces](/blog/chrome-111-beta/#new-css-color-types-and-spaces) are coming to the web! It is equally exciting that DevTools introduced new tools to help developers create, convert and debug High Definition color.  -->
[CSS color types and spaces](/blog/chrome-111-beta/#new-css-color-types-and-spaces) 가 새롭게 다가옵니다! 이와 함께 개발자들이 고해상도 컬러를 만들고, 바꾸고, 디버깅할 수 있도록 하는 새로운 기능이 DevTools 에 추가되었습니다.

<!-- The **Styles** pane now supports 12 new color spaces and 7 new gamuts as outlined in the [CSS Color Level 4](https://www.w3.org/TR/css-color-4/) specification. See [High Definition CSS Color Guide](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools) for a comprehensive understanding of color options available on the web. -->

[CSS 색상 레벨 4](https://www.w3.org/TR/css-color-4/)에 설명된 대로, **스타일** 창은 현재 12개의 새로운 색상 공간과 7개의 새로운 색상 범위를 제공합니다. [고해상도 CSS 색상 가이드](/articles/high-definition-css-color-guide/#debugging-color-with-chrome-devtools)를 참고하여 웹에서 어떤 색상 옵션들이 사용 가능한지를 알아보세요.


<!-- Here are examples of CSS color definitions with `color()`, `lch()`, `oklab()` and `color-mix()`. -->
다음은 `color()`, `lch()`, `oklab()` 및 `color-mix()`를 사용한 CSS 색상 정의의 예시입니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dA8VCKaSZhNb9gzlAUT9.png", alt="CSS 색상 정의의 예시", width="800", height="509" %}

<!-- When using the `color-mix()` function, you can view the final color output in the **Computed** pane. -->
`color-mix()` 함수를 사용할 때, 여러분은 **계산됨** 창에서 최종 색상 결과물을 볼 수 있습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3VkOGbbb5qLVvo1A1qSa.png", alt="계산됨 창에서의 색상-혼합 결과", width="800", height="487" %}

<!-- The color picker supports all the new color spaces with more features. For example, click on the color swatch of `color(display-p3 1 0 1)`. A gamut boundary line has also been added, distinguishing between the `sRGB` and `display-p3` gamuts for a clearer understanding of your selected color's gamut. -->
컬러 피커는 더 많은 기능들과 함께 모든 새로운 색상 공간을 지원합니다. 예로서,  `color(display-p3 1 0 1)`의 색상 견본을 클릭해 봅시다. `sRGB` 와 `display-p3` 영역 사이를 나누어, 여러분이 선택한 색상 영역을 좀더 알아보기 쉽게끔 하는 영역 경계선이 추가됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bL6uw8VV4cGuDd9hmAjX.png", alt="영역 경계선.", width="800", height="657" %}

<!-- DevTools supports converting colors between color formats. Use the **Change Color Format** icon to access the conversion popup, or simply use the `Shift` + click on a color swatch in the **Styles** pane. -->
DevTools는 색상 포맷간의 변환을 지원합니다. **색상 포맷 바꾸기** 아이콘을 이용하거나 혹은 **스타일** 창의 색상 견본 위에서 간단히 `Shift` 키와 함께 클릭하여 변환 팝업을 표시할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uoz3yaPPdVs6T2ASnQ62.png", alt="색상 포맷 사이에서의 색상 변환", width="800", height="460" %}

<!-- When converting, it's important to know if the conversion was clipped to fit the space. DevTools puts a warning icon next to the converted color that alerts you to this clipping. -->
색상 변환 시, 색상 공간에 맞도록 변환된 색이 제대로 보정되었는지를 아는 것이 중요합니다. DevTools는 변환된 색상 옆에 이 보정에 대한 경고 아이콘을 표시합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5Y4rVIqL9rjuSbHcodKr.png", alt="컬러 클리핑에 대한 경고", width="800", height="657" %}

<!-- In addition, you can pick colors from your screen with the new shortcut. Press 'c' to activate the eye dropper and hit `Escape` to deactivate it. The eyedropper tool only samples colors in the sRGB color space. For example, if you try to sample the color `color(display-p3 1 0 1)`, which is outside of the sRGB color space, the eyedropper tool will clip the color to the nearest color in the sRGB space, which is magenta `color(display-p3 0.92 0.2 0.97)`. -->
또한, 색상을 선택하려는 여려분을 위해 새로운 단축키가 생겼습니다. 'c' 를 눌러서 스포이드 아이콘을 활성화시킬 수 있으며, 'ESC' 로 비활성화할 수 있습니다. 스포이드 툴은 오직 sRGB 색상 공간에서만 색상을 추출할 수 있습니다. 예를 들자면 여러분이 `color(display-p3 1 0 1)`-sRGB 색상 공간의 바깥에 존재하고 있다-색상을 추출하려 시도한다면, 스포이드 툴은 sRGB 공간에 비추어 보아 가장 가까운 색상으로 자동적으로 보정합니다. 위 예제의 색상은 마젠타 `color(display-p3 0.92 0.2 0.97)`로 보정될 것입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VNBu6RenRerRqNhNYfyf.png", alt="스포이드 툴 활성화", width="800", height="657" %}

<!-- Finally, the **Color format** setting is now deprecated to make room for the new HD color format. -->
마침내, **색상 형식** 설정은 더 이상 사용되지 않으며, 이는 새로운 고해상도 색상 포맷 설정을 위함입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SPymkBgxzI6iVAvLdWBN.png", alt="Color format setting deprecation.", width="800", height="441" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f600600cf51a6582870c99e9a6b9a6a9ba76f9dc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e813f07e6a47b39c04c64a409dd08be294432490 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5b54410ab252e1cdc882c3a71e86b04c3de055fa #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/392b216dfae9c04697d7d0591af547c2482f7666 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9f3432a40c557b3faa3da01fc2ef84e4cf60e66a #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/504995fbfc3bf21bcaf2718b6a469c5f23814936 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6cc705a56def86c35d61b45a98371c190f4275e8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e9a64d873ac41e8d585e60b4934879abd8ba4977 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/abe7076d2df519b001dbea807a3aaf5beaa86fc0 #} 

Chromium issues: [1073895](https://crbug.com/1073895), [1395782](https://crbug.com/1395782), 
<!--  [1408777](https://crbug.com/1408777),  [1395782](https://crbug.com/1395782),  [1392717](https://crbug.com/1392717), [1382409](https://crbug.com/1382409), [1392054](https://crbug.com/1392054) -->


<!-- ## Enhanced breakpoint UX {: #breakpoint-redesign } -->
## 개선된 중단점 UX {: #breakpoint-redesign }
<!-- The redesigned **Breakpoints** pane allows you to have quick access to commonly used features, in particular, deactivating, editing, and removing breakpoints. -->
여러분은 새롭게 디자인된 **중단점** 창을 사용하여, 일반적으로 사용되는 기능, 특히 중단점의 비활성화, 편집 및 제거에 빠르게 접근할 수 있습니다.

<!-- These are some highlights: -->
몇몇 하이라이트를 소개해 드리겠습니다:

<!-- - Both pause exception options moved to the **Breakpoints** pane and labeled with text to make it more self-explanatory. -->
- 두 가지의 '예외에서 일시중지' 옵션들이 **중단점** 창으로 옮겨졌으며, 또한 좀더 알아보기 쉬운 방식으로 표시됩니다.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KADuAqVdrxxQDg5AYYeA.png", alt="예외에서 일시중지", width="800", height="518" %}

<!-- - Breakpoints are grouped by file, ordered by line or column numbers, and are collapsible. -->
- 중단점들은 파일로 그룹지어지며, 행 혹은 열 번호로 정렬되고, 접을 수 있습니다.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/AXJ7IL5aJ6gwbZmnoH39.png", alt="Group breakpoints by file.", width="800", height="454" %}

<!-- - There are new options to deactivate, remove, and edit breakpoints when hovering over a breakpoint or file. -->
    - 중단점 또는 파일 위로 마우스를 가져갈 때 중단점을 비활성화하거나, 제거하거나 편집할 수 있는 새로운 옵션이 있습니다.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vAQ4YuWGuXYLxXQXt0HG.png", alt="New options to deactivate breakpoints.", width="800", height="496" %}

<!-- - Click the edit breakpoint button to open the breakpoint editor. From here, you can enter the breakpoint condition or switch to a logpoint. -->
    - 중단점 편집하기 버튼을 클릭하여 중단점 편집기를 엽니다. 여러분은 여기서 중단점 조건으로 들어가거나 혹은 로그포인트로 전환할 수 있습니다.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/SrgbxxF8U3s9yzDPV25q.png", alt="중단점 편집 다이얼로그", width="800", height="697" %}

<!-- See [JavaScript debugging reference](/docs/devtools/javascript/reference/) to learn how to debug with DevTools. -->
DevTools 를 이용하여 디버깅하는 방법을 자세히 알고 싶으시다면 [JavaScript debugging reference](/docs/devtools/javascript/reference/) 를 참조하세요.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/48b648b65cd05071d1950e50d0b529ff20294780 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6c8a19b3922ed95818b5751f1b6548724ff868c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b955a3533292790168431db4e54906d4b1fa64a #} 
Chromium issues: [1407586](https://crbug.com/1407586), [1402891](https://crbug.com/1402891), [1402893](https://crbug.com/1402893)

<!-- ## Customizable Recorder shortcuts {: #recorder } -->
## 사용자 설정 가능한 녹음기 단축키 {: #recorder }
<!-- Use keyboard shortcuts to record and replay user flows quicker. -->
유저 플로우를 좀더 빠르게 녹화하고 재생하기 위한 단축키를 사용해 보세요.
<!-- The **Recorder** introduces a few convenient keyboard shortcuts for faster recording and replaying of user flows.  -->
유저 플로우의 녹화 및 재생을 좀더 빠르게 하기 위한 편리한 단축키 몇 개가 **녹음기** 에서 제공됩니다.
<!-- Don’t remember the shortcuts? No problem, click the `?` button to view all the shortcuts at any time. -->
단축키들을 기억하기 어려우신가요? 괜찮습니다. `?` 버튼을 클릭하여 모든 단축키를 언제나 볼 수 있습니다
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BJq63X8k89HTdINY2RKu.png", alt="녹음기 단축키", width="800", height="625" %}

<!-- You can even customize these shortcuts via the **Settings** menu. -->
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FtZSO1pPSooAbBrPTGC6.png", alt="Customize Recorder shortcuts.", width="800", height="494" %}
**설정** 메뉴에서 여러분이 원하는 대로 단축키들을 설정할 수도 있습니다.
<!-- If you're working in a different panel and want to start a user flow recording, use the **Create a new recording** command from the [Command Menu](/docs/devtools/command-menu/) in DevTools to get started. -->
만일 여러분이 다른 패널에서 작업 중이고, 유저 플로우를 새롭게 녹화하고 싶다면, DevTools의 [명령어 메뉴](/docs/devtools/command-menu/)에서 **새 기록 만들기** 명령어를 이용하여 시작하시면 됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fErUqzQ03p5zOk301nTN.png", alt="새로운 녹음 명령어 만들기", width="800", height="435" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/140ffb3e4c5e084eff5522508310af5dd407cf6e #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/e61fa89b8d073c4ff6b4da3599f83bf5972d5415 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/ffc735e599881fec2779477e6c20165e2796da69 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/f57026189fb51f801bf2ea2611afcb932fa32bef #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/0a7c428980b8f8a60e83c780e17f6a6f94007493 #} 
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/aea51aad7026881ad26ca1b270d12338adb92d79 #} 

Chromium issue: [1339771](https://crbug.com/bbb)


<!-- ## Better syntax highlight for Angular {: #syntax } -->
## Angular 를 위한 개선된 구문 강조 {: #syntax }

<!-- DevTools enhanced the syntax highlighting for Angular HTML templates, making it easier for you to read code and recognize its structure. -->
DevTools는 Angular HTML 템플릿에 대한 구문 강조 표시를 개선하여 코드를 더 쉽게 읽고 해당 구조를 인식할 수 있도록 합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lJU7wOa4vNDb2Vm2zPJq.png", alt="Angular HTML 템플릿에 대한 구문 강조", width="800", height="507" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4ec36d2fc5e7506d1ff65fd282a43215164f03f2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/717953202d0e8463257e09cc3f68a7769fd25300 #}

Chromium issues: [1385374](https://crbug.com/1385374),  [1385678](https://crbug.com/1385678)


<!-- ## Reorganize caches in the Application panel {: #cache } -->
## 애플리케이션 패널에서의 캐시 재조직 {: #cache }

<!-- The **Cache Storage** pane can now be found in the **Storage** section of the **Application** panel, while the **Back/forward cache** pane has been moved to the **Background Services** section.  -->
**애플리케이션** 패널의 **저장용량** 섹션에 **캐시 저장공간** 창이 생겼으며, **뒤로-앞으로 캐시** 창이 **백그라운드 서비스** 섹션으로 이동되었습니다.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q5ZeDvMc3OseF8fQve5A.png", alt="애플리케이션 패널에서의 캐시", width="800", height="506" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/adccf1afe5d585b294dee247f5a4982aca8f5f1e  #}

Chromium issue: [1407166](https://crbug.com/1407166)


<!-- ## Miscellaneous highlights {: #misc } -->
## 기타 하이라이트 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
이번 릴리스에는 몇몇 주목할 만한 수정사항이 포함되어 있습니다:
<!-- - DevTools has been updated to respect the [Disable cache](/docs/devtools/network/reference/#disable-cache) setting when loading sourcemaps. ([1407084](https://crbug.com/1407084)) -->
- 소스 맵을 읽어들일 때 [캐시 비활성화](/docs/devtools/network/reference/#disable-cache) 설정을 따르도록 업데이트되었습니다. ([1407084](https://crbug.com/1407084)) 

<!-- - The **Elements** panel now instantly autofocuses on the first matching element in search results. ([1381853](https://crbug.com/1381853)) -->
- The **요소** 패널은 이제 검색 결과에서 일치하는 최초의 요소에 자동적으로 초점을 맞춥니다. ([1381853](https://crbug.com/1381853))
<!-- - Various fixes to improve the sourcemap and breakpoints reliability. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134)) -->
- 소스맵과 중단점에서의 신뢰성 개선과 관련된 것들이 수정되었습니다. ([508270](https://crbug.com/508270), [1403362](https://crbug.com/1403362), [1403432](https://crbug.com/1403432), [1396298](https://crbug.com/1396298), [1395337](https://crbug.com/1395337), [1405134](https://crbug.com/1405134))


<!-- - To better facilitate debugging, DevTools now supports evaluating expressions with private class members. ([1381806](https://crbug.com/1381806)) -->
- 디버깅을 좀더 용이하게 하기 위해, 이제 DevTools는 클래스의 private 멤버 변수에 대한 값을 표출합니다.  now supports evaluating expressions with private class members. ([1381806](https://crbug.com/1381806))


    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/q68fvo870weBVwupujqf.png", alt="클래스 멤버 변수 값 표시", width="800", height="683" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
