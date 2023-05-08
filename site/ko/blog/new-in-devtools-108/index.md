---
layout: 'layouts/blog-post.njk'
title: "DevTools 의 새로운 기능 (Chrome 108)"
authors:
  - jecelynyeen
date: 2022-10-26
description: '비활성화된 CSS 프로퍼티들에 대한 힌트, Recorder 에서의 새로운 XPath와 텍스트 셀렉터 및 그 외'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5PYEDgDI7c4ggFKUSUx4.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-108
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='UVtXrWvq_oI' %}

<!-- Translation instructions:
  1. Remove the "draft: true" tag above when submitting PR
  2. Provide translations under each of the English commented original content
  3. Translate the "description" tag above
  4. Translate all the <img> alt text
  5. Update the sites/ko/_partials/devtools/whats-new.md file -->


<!-- ## Hints for inactive CSS properties {: #css-hint } -->
## 비활성화된 CSS 프로퍼티에 대한 힌트 {: #css-hint }
<!-- DevTools now identifies CSS styles that are valid but have no visible effect. In the **Styles** pane, DevTools fades out the inactive properties. Hover over the icon next to it to understand why the rule has no visible effect.  -->
이제 DevTools는 유효하지만 시각적 효과를 가지고 있지 않은 CSS 스타일들을 식별합니다. **Style** 창에서 DevTools는 비활성화된 프로퍼티들을 페이드아웃시킵니다. 규칙이 시각적 효과가 없는 이유를 이해하기 위해서 그 옆의 아이콘 위로 마우스를 가져가 보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/oqkN6QudxNIx4Zq22J89.png", alt="비활성화된 CSS 프로퍼티에 대한 힌트.", width="800", height="526" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d6c1fea1e79b8373ff913a6d9919d097d1141254 #}

Chromium issue: [1178508](https://crbug.com/1178508)


<!-- ## Auto-detect XPath and text selectors in the Recorder panel {: #recorder } -->
## Recoder 패널에서 XPath와 텍스트 셀렉터의 자동 인식 {: #recorder }
<!-- The **Recorder** panel now supports XPath and text selectors. [Start recording a user flow](/docs/devtools/recorder/#record) and the recorder automatically picks the XPath and shortest unique text of an element as selector if available. -->
**Recoder** 패널은 이제 XPath 와 텍스트 셀렉터를 지원합니다. [유저 플로우 레코딩 시작](/docs/devtools/recorder/#record) 이후 레코더는 사용가능한 경우, 자동적으로 요소의 XPath 와 가장 짧은 고유한 텍스트를 셀렉터로 선택합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/NJVIK95TtKaXxzNVoGI6.png", alt="Recorder 패널에서의 XPath와 텍스트 셀렉터.", width="800", height="579" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/7441acfff5d9dfd373742797d2db46a809c9df67 #}

Chromium issues: [1327206](https://crbug.com/1327206),[1327209] (https://crbug.com/1327209)


<!-- ## Step through comma-separated expressions {: #debugging } -->
## 쉼표로 구분된 표현을 통해 다음 행으로 건너뛰기 {: #debugging }
<!-- You can now step through comma-separated expressions during debugging. This improves the debuggability of minified code. -->
이제 여러분은 디버깅 중에 쉼표로 구분된 표현식을 통해 다음 행으로 건너갈 수 있습니다. 이는 최소화된 코드의 디버깅 가능성을 개선할 수 있습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4lUgUfPMhD9qxtZ7uvHV.png", alt="쉼표로 구분된 표현식을 통해 다음 행으로 진행", width="800", height="473" %}

<!-- Previously, DevTools only supported stepping through semicolon-separated expressions. -->
DevTools는 이전 버전까지는 오직 세미콜론으로 구분된 표현식을 통한 진행만을 지원했습니다.
<!-- Given the code below, -->
아래 예시 코드에서 보듯이,
```js
function foo() {}

function bar() {
  foo();
  foo();
  return 42;
}
```

<!-- Transpilers and minifiers may turn them into comma-separated expressions. -->
트랜스파일러와 미니파이어가 이들을 쉼표로 구분된 표현식으로 바꿀지도 모릅니다.
```js
function bar(){return foo(),foo(),42}
```

<!-- This creates confusion during debugging because the stepping behavior is different between minified and authored code. It is even more confusing when using source maps to debug the minified code in terms of the original code, as the developer is then looking at semicolons (which were under the hood turned into commas by the toolchain) but the debugger doesn't stop on them. -->
이렇게 하면 축소된 코드와 작성된 코드 간에 동작이 다르기 때문에 디버깅 중에 혼란을 야기합니다. 소스 맵을 사용하여 축소된 코드를 원래 코드와 관련지어 디버깅할 때 개발자가 세미콜론(툴체인에 의해 쉼표로 바뀐 후드 아래에 있음)을 보고 있음에도 디버거가 멈추지 않기 때문에 훨씬 혼란을 가중시킵니다.


{# https://chromium.googlesource.com/v8/v8/+/ade6d191c8566e3fe7331d2ef37e43760c7cb363 #}

Chromium issue: [1370200](https://crbug.com/1370200)


<!-- ## Improved Ignore list setting {: #ignore-list } -->
## 개선된 무시 목록 설정 {: #ignore-list }
<!-- Go to **Settings** > **Ignore List**. DevTools improves the design to help you configure the rules to [ignore a single script or pattern of scripts](/docs/devtools/javascript/reference/#settings-ignore-list). -->

**설정**에서 **무시 목록**으로 들어갈 수 있습니다. DevTools 는 여러분들이 [단일 스크립트 혹은 스크립트들의 패턴을 무시할 수 있는](/docs/devtools/javascript/reference/#settings-ignore-list) 규칙들을 잘 구성할 수 있도록 디자인을 개선합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qazPkaZ3TkSrIBU89Jtn.png", alt="무시 목록 탭", width="800", height="535" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9441d8775b38b47db91bb5182f6349f3036d3751 #}

Chromium issue: [1356517](https://crbug.com/1356517)


<!-- ## Miscellaneous highlights {: #misc } -->
## 기타 하이라이트 {: #misc }

<!-- These are some noteworthy fixes in this release: -->
이번 릴리스에서 주목할 만한 수정 사항들입니다:
<!-- - Autocomplete CSS property name in the **Styles** pane on pressing space. ([1343316](https://crbug.com/1343316)) -->
- **스타일** 창에서 스페이스바를 누르면 CSS 프로퍼티 이름이 자동으로 완성됩니다. ([1343316](https://crbug.com/1343316))
<!-- - Remove auto scroll in the **Element** panel’s breadcrumb. ([1369734](https://crbug.com/1369734)) -->
- **요소** 패널의 이동 경로에서 자동 스크롤을 삭제합니다. ([1369734](https://crbug.com/1369734))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ccfb914765146ce514b9645117d9f95052bd3471 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4b6c1b6671e08a39e4d37772e87ff2cf41cb7327 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
