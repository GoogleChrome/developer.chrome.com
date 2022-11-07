---
layout: 'layouts/blog-post.njk'
title: 'DevTools 의 새로운 기능 (Chrome 107)'
authors:
  - jecelynyeen
date: 2022-09-20
description: '키보드 단축키 커스터마이징, 메모리 인스펙터에서 C/C++ 객체 하이라이팅 등'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yDRjqPiA7WSfo7ED5rOS.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi) 님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='1uwv6HbR8HU' %}

## DevTools 에서 키보드 단축키 커스터마이징 {: #shortcuts }

DevTools 에서 선호하는 명령어에 대한 키보드 단축키를 커스터마이징할 수 있습니다.

**설정** > **Shortcuts** 로 들어가서, 명령어에 마우스를 올린 뒤 **Edit** 버튼 (펜 아이콘)을 클릭하여 키보드 단축키를 커스터마이징할 수 있습니다. 조합형 단축키 (여러 키를 클릭하는 단축키)를 생성할 수도 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="DevTools에서 키보드 단축키 커스터마이징", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Chromium issues: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


## 키보드 단축키로 라이트 / 다크 테마 전환하기 {: #toggle-themes }

편리하게 [라이트 / 다크 테마](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) 를 전환하는 키보드 단축키를 설정할 수 있습니다. 기본적으로는 이 전환 액션에 대한 키보드 단축키가 설정되어 있지 않습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="키보드 단축키로 라이트 / 다크 테마 전환하기", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


## 메모리 인스펙터에서 C/C++ 객체 하이라이팅 {: #memory }

[메모리 인스펙터](/docs/devtools/memory-inspector/) 에서 모든 C/C++ 메모리 객체의 바이트를 강조 표시합니다.

웹 어셈블리 주변 메모리에서 객체의 바이트를 인식하는 건 골칫거리였습니다. 기존에는 객체의 시작부터 객체의 크기와 바이트를 알아야 했습니다.

이 기능은 주변 메모리에서 분리하는 데 도움을 줍니다. [C/C++ 디버깅을 위한 메모리 인스펙터 확장](/blog/memory-inspector-extended-cpp/) 에서 이 변경점을 더 상세하게 알아볼 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="메모리 인스펙터에서 C/C++ 객체 하이라이팅", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Chromium issue: [1336568](https://crbug.com/1336568)


## HAR 가져오기에서 전체 이니시에이터 정보 지원 {: #har }

[HAR 가져오기](/docs/devtools/network/reference/#save-as-har) 에서 전체 **이니시에이터** 정보를 지원합니다. 이전에는 **네트워크** 패널에서 가져오기를 수행할 때 일부 이니시에이터 정보만 보여줬습니다.

이니시에이터 정보는 네트워크 요청의 출처를 추적하고 네트워크 관련 문제를 식별하는 데 도움을 줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="HAR 가져오기에서 전체 이니시에이터 정보 지원", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Chromium issue: [1343185](https://crbug.com/1343185)



## `Enter` 키를 눌러 DOM 검색 시작 {: #search-type }

<kbd>Enter</kbd> 키를 누른 후 항상 DOM 검색을 시작하는 **Search as you type** 설정을 비활성화할 수 있습니다.

**요소** 패널에서 <kbd>Control</kbd> 이나 <kbd>Command</kbd> + <kbd>F</kbd> 키를 통해 검색바를 전환합니다. 검색 입력창에서 쿼리를 입력하면 기본 동작으로 DOM 트리가 첫번째로 일치한 요소로 이동하고 강조 표시합니다.

사용자, 특히 항상 긴 검색 쿼리로 작업하는 테스터들에게는 이 동작이 적합하지 않습니다. DOM 트리가 긴 검색 쿼리 (예시: `//div[@id="example"]`)로 인해 여러번 이동할 수 있습니다. 이러한 동작은 불필요한 움직임을 만듭니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="DOM 검색", width="800", height="505" %}

**설정** > **환경 설정** 에서 **Search as you type** 을 비활성화하세요. 이 변경사항을 통해 <kbd>Enter</kbd> 키를 누른 경우에만 검색이 시작되게 할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Search as you type 설정", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Chromium issue: [1344526](https://crbug.com/1344526)


## CSS flexbox `align-content` `start` 및 `end` 아이콘 표시 {: #flexbox }

**스타일** 영역에서 `display: flex` 나 `display: inline-flex` 로 선언된 CSS 클래스 내 `align-content` 속성을 수정합니다. 자동완성에서 `start` 및 `end` 가 아이콘과 함께 나타납니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="flexbox align-content 속성", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Chromium issue: [1139945](https://crbug.com/1139945)


## 기타 하이라이트 {: #misc }

- **콘솔** 사이드바에서 올바른 메시지 갯수를 보여줍니다. 이전에는 콘솔 메시지를 클리어했을 때 갯수가 올바르게 새로고침되지 않았습니다. ([1343311](https://crbug.com/1343311))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
