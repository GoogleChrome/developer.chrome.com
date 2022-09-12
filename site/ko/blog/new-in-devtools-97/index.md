---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
  "새로운 Recorder 패널, Device Mode 의 기기 목록 갱신 등"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4oKuqdeNrPY27y4pg3St.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

## 프리뷰 기능: 새로운 Recorder 패널 {: #recorder }

새로 나온 **Recorder** 패널을 사용해서 사용자의 플로우를 녹화하여 다시 재생하고 측정해보세요

[**Recorder** 패널 열기](/docs/devtools/recorder/#open). 화면의 지시에 따라 새 녹화를 시작합니다.

예를 들어 [커피 주문 데모](https://coffee-cart.netlify.app/) 애플리케이션에서 커피 구매 프로세스를 녹화해볼 수 있습니다. 커피를 추가한 뒤 주문 상세를 넣은 뒤, 녹화를 끝낼 수 있으며, 프로세스를 다시 재생하거나 **Measure performance** 버튼을 클릭하여 **Performance** 패널에서 사용자의 플로우를 측정할 수 있습니다.

단계별 튜토리얼을 보려면 **Recorder** 패널 [문서](/docs/devtools/recorder/) 를 살펴보세요.

**Recorder** 패널은 프리뷰 기능입니다. Chrome 팀에서는 더 나은 개선을 위해 여러분의 [피드백](https://goo.gle/recorder-feedback)을 기대하고 있으며 열심히 작업하고 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Recorder 패널", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1257499](https://crbug.com/1257499)

## Device Mode 의 기기 목록 갱신 {: #device }

[기기 툴바를 활성화](/docs/devtools/device-mode#viewport)하면 기기 목록에 더 많은 최신 기기가 추가됩니다. 해상도를 시뮬레이션할 기기를 선택하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="Device Mode의 기기 목록 갱신", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Chromium issue: [1223525](https://crbug.com/1223525)


## HTML로 수정에서 자동완성 {: #code-completion }

**HTML로 수정** UI 에서 자동 완성과 문법 강조를 지원합니다. **요소** 패널의 요소에서 우클릭한 뒤, **HTML로 수정** 을 선택하세요. DOM 속성 (예시: `id`, `aria`)을 작성해보세요, 자동 완성은 여러분이 찾고 있는 속성명을 찾는데 도움이 될 것입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="HTML로 수정에서 자동완성", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Chromium issue: [1215072](https://crbug.com/1215072)


## 코드 디버깅 경험 개선 {: #debugging }

이제 열 번호가 Console의 출력 오류에 포함됩니다.
특히 압축된 (minified) 자바스크립트로 디버깅하려면 열 번호에 쉽게 접근할 수 있어야 합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="에러 출력에서 열 번호 노출", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Chromium issue: [1073064](https://crbug.com/1073064)


## [실험실 기능] 여러 기기 사이의 DevTools 설정 동기화 {: #sync }

Chrome 프로필 동기화를 활성화하였을 때 DevTools 설정이 기본적으로 여러 기기에서 동기화됩니다. DevTools 동기화 설정은 **설정** > **동기화** > **설정 동기화 사용** 에서 변경 가능합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="DevTools 동기화 설정", width="800", height="654" %}

이 새로운 설정은 여러 기기를 통해 작업하는 것을 더 수월하게 해줄 것입니다. 예를 들어, 다음과 같은 디자인 설정이 여러 기기에서 동기화되어 일관된 경험을 제공할 수 있으며 같은 세팅을 여러번 재정의할 필요가 없어집니다. 동기화 기능에 대한 더 자세한 내용은 [DevTools 맞춤 설정](/docs/devtools/customize/) 에서 살펴보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="디자인 설정", width="800", height="584" %}

이 기능은 현재 실험실 기능이며, Chrome 팀에서 해당 기능을 작업하고 있습니다. 피드백은 [여기](https://crbug.com/1245541) 를 통해 Chorme 팀에 공유해주세요.

Chromium issue: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
