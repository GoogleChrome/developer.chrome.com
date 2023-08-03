---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 104)"
authors:
  - jecelynyeen
date: 2022-07-13
updated: 2022-07-13
description: "디버깅 중에 frame 재시작하기, Recorder 패널의 느리게 다시보기 옵션들, 등"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/doPgfbmwel0LDhSkjP0t.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-104
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi) 님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='4RXWfw7Xg_Y' %}

## 디버깅 중에 frame 재시작하기 {: #restart-frame }

**frame 재시작** 기능이 돌아왔습니다! 함수 어딘가에서 중단된 경우 이전 코드를 다시 실행할 수 있습니다. 이 기능은 안정성 문제가 있어 Chrome 92에서 더 이상 사용되지 않고 제거되었습니다.

다음 [예제](https://jec.fish/)에서 디버거는 `toggleColorScheme` 함수의 끝 부분에 있는 브레이크 포인트 (343 라인) 에서 멈춥니다. `toggleColorScheme` 함수부터 다시 디버깅을 시작하기 위해서, **Debugger** 창에 있는 **Call stack** 섹션을 열고, `toggleColorScheme` 을 우클릭한 뒤 **Restart frame** 을 클릭하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uBcTkuIaoHHTgJCiGNED.png", alt="디버깅 중에 frame 재시작하기", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f6749f5cbbfc7d3c89cb2b6b3557d0ff33536ad #}

Chromium issue: [1303521](https://crbug.com/1303521)


## Recorder 패널의 느리게 다시보기 옵션들 {: #recorder }

이제 유저 플로우를 더 느린 속도 (느리게, 매우 느리게, 아주 느리게)로 다시볼 수 있습니다. 이러한 옵션을 통해 화면을 다시 보기할 때 각 단계를 더 면밀히 살펴볼 수 있게 합니다.

**Recorder** 패널을 [열고](/docs/devtools/recorder/#open), [start a new recording](/docs/devtools/recorder/#record) 을 클릭하세요. 녹화가 끝나고 나서 **Replay** 드롭다운 버튼을 클릭하세요. or 다시 보기를 선택했을 때 속도를 선택할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yLIIMlaew0EWfEYdDbXJ.png", alt="Recorder 패널에서 더 다양한 느린 속도 다시보기 옵션", width="800", height="486" %}

Chromium issue: [1306756](https://crbug.com/1306756)


## Recorder 패널을 위한 확장 도구 만들기 {: #recorder-extension }

선호하는 포맷으로 다시보기 스크립트를 추출하기 위해 Chrome 확장 도구를 만들거나 설치할 수 있습니다. 제작하는 방법에 대해 자세히 알고싶다면 [Recorder extension API](/docs/extensions/reference/devtools_recorder/) 문서를 참고하세요.

데모 확장도구를 설치하려면 문서에 존재하는 [다음 스텝](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) 을 따라하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="Recorder 패널을 위한 확장 도구 만들기", width="800", height="486" %}

Chromium issue: [1325751](https://crbug.com/1325751)


## 소스 패널에서 작성자 순/배포 순으로 파일 그룹핑하기 {: #authored-deployed }


소스 패널에서 **작성자 순/배포 순으로 파일 그룹핑하기** 옵션을 사용하여 파일을 묶을 수 있습니다. 프레임워크 (React, Angular 등)을 이용해 웹 애플리케이션을 개발할 때, 빌드 도구 (Webpack, Vite)를 통해 생성된 압축된 파일들을 소스 파일에서 살펴보기 어려울 수 있기 때문입니다.

이 체크박스를 이용해, 파일을 2가지 카테고리로 그룹하여 빠르게 찾을 수 있습니다. 
 
- **Authored**. IDE에서 보는 것과 비슷하게 소스 파일을 봅니다. DevTools 는 (빌드 도구에서 제공한) 소스맵을 바탕으로 이 파일들을 생성합니다.
- **Deployed**. 브라우저에서 읽어들인 실제 파일들입니다. 보통 이 파일들은 경량화되어있습니다.
 
다음 [React 데모](https://reactjs.org/) 에서 한 번 해보세요!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5E1qbkl0Gx1REx7FdqEr.png", alt="소스 패널에서 작성자 / 배포 순 그룹하기", width="800", height="521" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6bc65d0595702fc826ca87e2cfe519a134b62d90 #}
 
Chromium issue: [960909](https://crbug.com/960909)


## Performance insights 패널에서 새로운 User Timings 추적 {: #performance }

**Performance insights** 패널 안에서 새로운 **User Timings** 트랙을 사용하여 녹화본 내의 `performance.measure()` 마크를 시각화할 수 있습니다.

예를 들어, 다음 [웹 페이지](https://jec.fish/demo/perf-measure) 에서 [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) 메서드를 텍스트 로딩 경과 시간을 계산하기 위해 사용하고 있습니다.

[measuring the page load](/docs/devtools/performance-insights/#record) 를 시작하면, 녹화본에서 **User Timings** 트랙이 보일 것입니다. 타이밍 아이템을 클릭하면 사이드 영역에서 상세한 내용을 볼 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nxPCp6UaiGWJCWWx4Laa.png", alt="Performance insights 패널에서 새로운 User Timings 추적", width="800", height="499" %}

Chromium issue: [1322808](https://crbug.com/1322808)

 
## 요소의 할당된 슬롯 표시 {: #slot }

**요소** 패널에서 슬롯된 요소는 `slot` 뱃지와 함께 보입니다. 레이아웃 문제를 디버깅 할 때 이 기능을 사용하여 노드의 레이아웃에 영향을 미치는 요소를 더 빨리 식별할 수 있습니다.

다음 [예제](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) 에서는 이름 있는 슬롯을 가진 카드들을 포함하고 있습니다. 카드의 `person-occupation` 슬롯을 찾아낸 뒤, 할당된 슬롯에 표시된 `slot` 뱃지를 클릭하세요.

[<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) 요소와 [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) 요소를 사용하여 웹 컴포넌트의 shadow DOM을 채우는 데 사용할 수 있는 유연한 템플릿을 만드는 방법에 대해서 [배워보세요](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uQGHp9WoMCG1RIAkgIF.png", alt="요소의 할당된 슬롯 표시", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/164e238dabefc08018318a981131eedf2e81736b #}

Chromium issue: [1018906](https://crbug.com/1018906)


## 성능 기록을 위한 하드웨어 동시성 시뮬레이션 {: #simulate }
 
**성능** 패널에서 **하드웨어 동시성** 설정을 사용하여 `navigator.hardwareConcurrency` 를 통해 보고된 값을 정의할 수 있습니다.

일부 애플리케이션은 `navigator.hardwareConcurrency`를 사용하여 애플리케이션의 병렬 처리 정도를 제어합니다. 
예를 들어, Emscripten pthread 풀 사이즈를 제어할 수 있습니다. 이 기능을 통해 개발자는 다양한 코어 수로 애플리케이션 성능을 테스트할 수 있습니다.
 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PyykGRv29FZbBKJAwWOW.png", alt="성능 기록을 위한 하드웨어 동시성 시뮬레이션", width="800", height="536" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b26de259d74a45e700d989ad9178c5e3a8b73145 #}
 
Chromium issue: [1297439](https://crbug.com/1297439)


## CSS 변수 자동 완성 시 색상이 아닌 값 미리보기 {: #css-var }

CSS 변수를 자동완성할 때, DevTools 는 값이 노드에 어떤 종류의 변경사항을 불러일으키는 지 미리 볼 수 있도록 색상이 아닌 값을 의미 있는 값으로 채웁니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V4slwNtX9HwLPdAyr8JF.png", alt="CSS 변수 자동 완성 시 색상이 아닌 값 미리보기", width="800", height="431" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/977cc58cb5654a2b68142ef8ac1b3f9ac2822694 #}

Chromium issue: [1285091](https://crbug.com/1285091)

        
## 뒤로-앞으로 캐시 창에서 차단 프레임 식별 {: #bfcache }

**애플리케이션** 패널의 [뒤로-앞으로 캐시](/docs/devtools/application/back-forward-cache/) 창의 새로운 **frames** 섹션에서, 페이지가 bfcache에 적합하지 못하게 하는 차단 프레임을 식별할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UaRYEoYYoXhjSIn9seYK.png", alt="뒤로-앞으로 캐시 영역에서 차단 프레임 식별", width="800", height="486" %}
 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/897799b24fff0639d483111dd2d957288ba2bd06 #}
 
Chromium issue: [1288158](https://crbug.com/1288158) 
 
 
## 자바스크립트 객체 자동완성 제안 기능 개선 {: #autocomplete }

자바스크립트 객체 속성 자동 완성이 다음 순서대로 노출됩니다.

1. 자신의 열거 가능한 속성
2. 자신의 열거 불가능한 속성
3. 상속받은 열거 가능한 속성
4. 상속받은 열거 불가능한 속성

이전에는 자동완성 제안 기능이 상속된 속성보다 자체 속성을 선호하고, 모든 상속된 속성에는 동일한 우선순위가 부여되었기 때문에 개발자가 관련 속성을 찾기가 더 어려웠습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IvFTcOWrBOTTMRHqn8u4.png", alt="자바스크립트 객체 자동완성 제안 기능 개선", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cee5205ae93c95b1dce49e220b9ebfa8c998d5a6 #}
 
Chromium issue: [1299241](https://crbug.com/1299241)

 
## 소스맵 개선 {: #sourcemaps }

전반적인 디버깅 경험을 개선하기 위한 소스맵 수정 사항이 있습니다.
 
- sourceURL 어노테이션을 이용한 인라인 `<script>` 에서 중단점이 동작합니다.
- 디버거가 소스맵을 사용하여 **Scope** 뷰에서 블록 범위 변수를 확인합니다.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gv9cGnDMF7OVlXPWntII.png", alt="블록 범위 변수 확인", width="800", height="532" %}
- 디버거가 소스맵을 사용하여 **Scope** 뷰에서 화살표 함수 내 변수를 확인합니다.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZk0xjwMQAqknkW5G4Xf.png", alt="함수 내 변수 확인", width="800", height="479" %}

Chromium issues: [1329113](https://crbug.com/1329113), [1322115](https://crbug.com/1322115)
 
 
## 기타 하이라이트 {: #misc }
 
이번 릴리스에서 수정된 사항들입니다.
 
- **소스** 패널에서 **자동 완성** 설정 수정, 이전에는 설정이 비활성화된 경우에도 자동 완성이 항상 켜져 있었습니다. ([1323286](https://crbug.com/1323286))
- **애플리케이션** 패널 내 **Manifest** 탭에서 최신 색상 스킴 포맷으로 파싱하도록 개선 ([1318305](https://crbug.com/1318305))
- **Performance insights** 패널에서 `<script async>` 렌더링 차단 이슈를 위한 제안을 개선. 이전에는 DevTools가 script가 이미 async 속성을 가지고 있어도 `script 태그에 async 속성을 추가하세요` 라고 제안했습니다. ([1334096](https://crbug.com/1334096))
- **Performance insights** 패널에서 레이아웃 시프트를 유발할 가능성이 있는 iframe을 감지해냅니다. **Details** 창에서 iframe 상세를 볼 수 있습니다. ([1328873](https://crbug.com/1328873))
- **커맨드 메뉴** 에서 [파일 열기](/docs/devtools/resources/#open) 할 때, 작성된 파일 (소스맵을 통해 생성된 파일)이 비슷한 이름의 배포된 스크립트보다 더 상위에 노출됩니다. ([1312929](https://crbug.com/1312929)) 

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
