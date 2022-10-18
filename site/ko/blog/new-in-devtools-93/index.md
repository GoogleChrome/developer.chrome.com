---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-07-28
updated: 2021-07-28
description:
  "수정 가능한 CSS 컨테이너 쿼리, 웹 번들 프리뷰, Console 에서 더 나은 문자열 제어 및 추가 업데이트 소식"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Cs7C4adVQQjG54wEmBch.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였습니다. [이지웅](https://bit.ly/JiwoongLeePortfolio) 님이 리뷰어로 참여했습니다!*

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Styles 영역에서 CSS 컨테이너 쿼리를 수정할 수 있습니다 {: #container-queries }
이제 **Styles** 영역에서 [CSS 컨테이너 쿼리](https://web.dev/new-responsive/#responsive-to-the-container) 를 보고 수정할 수 있습니다.

컨테이너 쿼리는 반응형 디자인을 구현하기 위해 더 다양한 접근 방식을 제공합니다.
`@container` 규칙은 `@media` 를 사용한 미디어 쿼리와 비슷한 방식으로 동작합니다.
하지만 뷰포트와 유저 에이전트 정보를 찾는 대신, `@container` 는 특정한 조건에 맞는 조상 컨테이너를 사용합니다.

**Elements** 패널에서 `@container` 규칙을 가지고 있는 DOM 요소를 선택하면 이제 DevTools 의 `Styles` 영역에서 `@container` 정보를 보여줍니다.
요소를 클릭하고 사이즈를 변경해보세요. **Styles** 영역에서 컨테이너에 상응하는 정보를 보여줄 것입니다.
페이지에서 컨테이너 요소를 강조 표시하고 컨테이너 크기를 확인하려면 마우스를 가져갑니다.
컨테이너 요소를 선택하려면 해당 요소를 클릭하세요.

컨테이너 쿼리는 현재 실험 기능입니다. `chrome://flags` 에서 `#enable-container-queries` 플래그를 활성화한 상태로 테스트하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png", alt="Styles 영역에서 CSS 컨테이너 쿼리를 수정할 수 있습니다.", width="800", height="554" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## Network 패널에서 Web bundle 미리보기 {: #web-bundle }
[Web bundle](https://web.dev/web-bundles/) 여러개의 HTTP 리소스를 하나의 파일로 묶은 파일 포맷입니다. 이제 **Network** 패널에서 web bundle 의 내용을 미리볼 수 있습니다.

web bundle은 현재 실험 기능입니다. `chrome://flags` 에서 `#enable-experimental-web-platform-features` 플래그를 활성화한 상태로 테스트하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png", alt="web bundle 미리보기", width="800", height="492" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7 #}

Chromium issue: [1182537](https://crbug.com/1182537)


## Attribution Reporting API 디버깅 {: #attribution-reporting }
Attribution Reporting API 에러가 **Issues** 탭에 노출됩니다.

[Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) 은 크로스 사이트 식별자를 사용하지 않고 광고 클릭이나 노출같은 사용자 액션을 측정하는 데 도움을 주는 새로운 API 입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Issues 탭에서 Attribution Reporting API 에러를 볼 수 있습니다.", width="800", height="501" %}

Chromium issue: [1190735](https://crbug.com/1190735)


## Console 에서 더 나은 문자열 (string) 제어 {: #string }
**Console** 의 새로운 컨텍스트 메뉴를 사용하면 **Console** 내 모든 문자열을 콘텐츠, JavaScript 리터럴 또는 JSON 리터럴로 복사할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png", alt="Console의 새로운 컨텍스트 메뉴", width="800", height="477" %}

Chrome 90에서 DevTools는 **Console** 이 [문자열 출력을 언제나 유효한 JSON 리터럴로 변경](/en/blog/new-in-devtools-90/#double-quotes) 하도록 업데이트 하였습니다. 이러한 변경사항이 오히려 혼란을 줄 수 있다는 피드백을 개발자로부터 받았고, 일부는 이스케이프 양이 과도하거나, 출력된 값을 읽기 어렵다고 느끼기도 하였습니다.

이제 **Console** 에서는 문자열 출력을 유효한 JavaScript 리터럴로 변경하고, 문자열 복사 옵션을 3개 추가로 제공합니다. **Copy as JavaScript literal** 옵션은 적절한 특수 문자를 이스케이프하고 문자열 내용에 따라 작은따옴표, 큰따옴표 또는 억음 부호 (backtick)를 사용하여 문자열을 래핑합니다. **Copy string contents** 는 새 줄 및 기타 특수 문자를 포함한 원시 문자열 콘텐츠를 그대로 클립보드에 복사합니다. 마지막으로 **Copy as JSON literal** 은 문자열을 유효한 JSON 리터럴로 변환하고 클립보드에 복사합니다.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539 #}

Chromium issue: [1208389](https://crbug.com/1208389)


## CORS 디버깅 개선 {: #cors }
이제 **Console** 에서 CORS 관련 TypeErrors 는 Network 패널과 Issues 탭으로 연결됩니다.

CORS 관련 에러 메시지 옆에 있는 두 개의 새 아이콘을 클릭하여 network 요청을 보거나, 에러 메시지를 상세하게 살펴보고 Issues 탭에서 더 나은 해결법을 찾을 수도 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png", alt="CORS 관련 에러 메시지 옆의 두 아이콘", width="800", height="485" %}

Chromium issue: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }
**Lighthouse** 패널이 이제 Lighthouse 8.1로 업데이트 되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png", alt="Lighthouse", width="800", height="628" %}

사이트에서 Lighthouse에 소스맵을 제공하는 경우, **View Treemap** 버튼을 클릭하여 로딩 시 사이즈와 적용 범위별로 필터링된 JavaScript 분석을 볼 수 있습니다.

보고서에 새로운 메트릭 필터 (스크린샷에서 **Show audits relevant to** 필터 참고)가 추가되었습니다. 특정 메트릭을 선택하여 해당 메트릭을 개선하는 데 가장 관련성이 높은 진단 결과 및 개선 사항만 추려서 볼 수 있습니다.

**Performance Category** 에서는 웹의 현재 상태를 더 잘 반영하고, 다른 성능 측정 도구들과 정렬하기 위한 점수 책정 방식 변경이 있었습니다.

전체 변경 사항은 [release notes](https://github.com/GoogleChrome/lighthouse/releases) 를 참고하세요.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1 #}

Chromium issue: [772558](https://crbug.com/772558)


## Manifest 영역에서 new note URL을 보여줍니다 {: #new-note-url }
이제 Manifest 영역에서 [new note URL](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking)을 보여줍니다.

현재 ChromeOS (CrOS)에서 "new-note" 를 선언한 Chrome Apps 및 Android Apps 는 스타일러스 설정 (CrOS 기기가 스타일러스와 함께 사용된 경우 표시됨)에서 메모 작성 앱으로 선택할 수 있습니다. 메모 앱으로 선택하면 스타일러스 팔레트의 "메모 만들기 (Create Note)" 버튼에서 앱을 실행할 수 있습니다. 애플리케이션 manifest 에 `new-note-url` 필드를 추가하는 건, 웹 앱이 앱과 동일하게 동작하게 하기 위한 노력의 결과입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png", alt="Manifest 영역의 new note URL", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e #}

Chromium issue: [1185678](https://crbug.com/1185678)


## CSS 매칭 셀렉터 수정 {: #matching-selectors }
DevTools 에서 CSS 매칭 셀렉터를 수정했지만, 마지막 릴리즈에서 제대로 동작하지 않았습니다.

**Styles** 영역에서 쉼표로 구분된 셀렉터는 선택된 DOM 노드와의 매칭 여부에 따라 색상이 다르게 지정됩니다.

- 매칭하지 않는 셀렉터는 밝은 회색으로 표시됩니다.
- 매칭하는 셀렉터는 검은색으로 표시됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png", alt="CSS 매칭 셀렉터", width="800", height="477" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3 #}

Chromium issue: [1219153](https://crbug.com/1219153)


## Network 영역에서 JSON 응답 Pretty-printing 하기 {: #pretty-print-json }
이제 **Network** 영역에서 JSON 응답을 Pretty-print 하여 보여줄 수 있습니다.

**Network** 영역에서 JSON 응답을 실행하고, `{}` 아이콘을 클릭하면 Pretty-print 하여 보여줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt=" Network 영역에서 JSON 응답 Pretty-printing", width="800", height="523" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb #}

Chromium bug: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
