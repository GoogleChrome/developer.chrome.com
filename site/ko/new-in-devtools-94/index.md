---
layout: "layouts/blog-post.njk"
title: "What's New In DevTools (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "Use DevTools in your preferred language, new Nest Hub devices, new CSS container queries badge and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/js1uKEulNBGj0PoJkqZq.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

{% include 'partials/devtools/kr/banner.md' %}

## DevTools 를 이제 여러분들이 선호하는 언어로 사용하세요. {: #localized }

크롬  DevTools 는 현재 80개 이상의 언어를 제공하며, 여러분들은 기호에 맞는 언어를 골라서 사용할 수 있습니다!

[Settings](/docs/devtools/customize/#settings) 메뉴를 열고, **Preferences** > **Language** 드롭다운 메뉴에서 여러분들이 원하는 언어를 선택한 다음  DevTools 를 새로고침해 줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="Change language in Settings > Preferences", width="800", height="494" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium issue: [1163928](https://crbug.com/1163928)

## 기기 목록에 Nest Hub 가 새로이 추가되었습니다. {: #nest-hub }

이제  [기기 목록](/docs/devtools/device-mode/) 에서 Nest Hub와 Nest Hub Max 의 Dimension 들을 시뮬레이션할 수 있습니다.

[Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) 를 클릭한 다음,&nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %}&nbsp;,  기기 목록에서  Nest Hub 혹은 Nest Hub Max 를 선택하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub device in the Device mode", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium issue: [1223525](https://crbug.com/1223525)


## 프레임 상세 화면에서 Origin trials 가 제공됩니다. {: #origin-trials }
이제 웹사이트의 [origin trials](/blog/origin-trials/)  에 대한 정보를 애플리케이션 패널 하단의 프레임 디테일 뷰에서 볼 수 있습니다.

사용자들은 [Origin trials](/blog/origin-trials/) 를 통해 새로운 기능 혹은 실험중인 기능에 접근할 수 있으며, 이는 사용자들로 하여금 해당 기능이 안정화되기 전에 제한적인 시간 동안 시도해 볼 수 있도록 하기 위함입니다.

Origin trials 가 포함된 페이지 (예시:  [demo page](https://mediastreamtrack.glitch.me))를 엽니다. **애플리케이션** 패널에서 스크롤을 **프레임** 섹션까지 내린 후 최상단 프레임을 선택합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials in the Frame details view", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium issue: [607555](https://crbug.com/607555)


## 새로운 CSS 컨테이너 쿼리 배지 {: #container-queries }
**컨테이너** 배지가 컨테이너 요소 옆에 새롭게 추가되었습니다. (```@container``` 규칙의 조건과 부합하는 조상 요소를 의미합니다.), 배지를 클릭하여 페이지에서 선택한 컨테이너 및 모든 쿼리의 하위 항목의 오버레이 표시를 토글합니다. ]

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS container queries badge", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## 체크박스 클릭 한 번으로 네트워크 필터 반전 가능 {: #invert-network-filter }
네트워크 패널에 **Invert** 체크박스가 새로이 추가되었으며, 이를 이용해 필터들을 반전시킬 수 있습니다.

예를 들어, 404 상태 코드가 포함된 네트워크 요청만을 걸러내기 위해 "status-code:404" 를 타이핑해 보세요. 그리고 **Invert** 체크박스를 활성화시켜 필터링 옵션을 반전시켜 보세요. (404 상태 코드가 포함되지 않은 모든 네트워크 요청을 표시합니다.)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Invert the network filters", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium issue: [1054464](https://crbug.com/1054464)


## 다가오는 콘솔 사이드바의 디프리케이션 {: #deprecated }
필터 사용자 인터페이스를 툴바로 옮기기 위해, 콘솔 사이드바가 더 이상 사용되지 않고 제거될 예정입니다. 혹시 염려되는 게 있으시거나 어떤 피드백이 있으시다면 [이슈 트래커](https://crbug.com/1232937)를 통해 알려 주세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Console sidebar deprecation message", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium issue: [1232937](https://crbug.com/1232937)


## 이슈 탭과 네트워크 패널에서 로우(raw) Set-Cookie 헤더 표시 {: #raw-cookies }
DevTools 의 **이슈** 탭에서 이제 로우(raw) ```Set-Cookie``` 헤더를 볼 수 있습니다.

이전에는 쿠키가 형식에 맞지 않았을 때 (정확하지 않은 ```Set-Cookie``` 헤더),  이는 DevTools의 네트워크 패널에 표시되지 않았습니다. 한편 새롭게 ```response-header-set-cookie``` 필터가 **네트워크** 패널에 추가됨으로써, 이제 사용자들은 로우(raw) ```Set-Cookie``` 헤더 응답을 걸러낼 수 있습니다. DevTools 는 **이슈** 탭의 로우(raw) ```Set-Cookie``` 헤더 응답을 **네트워크** 패널로 연결합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Raw 'Set-Cookie' headers in the Issues tab and Network panel", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium issue: [1179186](https://crbug.com/1179186)


## 고유한 프로퍼티로서의 내이티브 접근자를 콘솔에서 일관성 있게 표시 {: #native-accessors }
**콘솔**에서 내이티브 접근자를 그것의 고유한 프로퍼티로서 일관성 있게 표시할 수 있습니다.

예를 들면 **콘솔**에서 `new Int8Array([1, 2, 3])` 코드를 표시할 때,  ```length```, ```byteOffset``` 과 같은 내이티브 접근자들은 미리보기에서 표시되지 않았습니다만, 이번 업데이트를 통해 사용자들은 내이티브 접근자를 미리보기에서 확인할 수 있으며 확장 시에 값들이 빠르게 표시됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Consistent display native accessors as own properties in the Console", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium issues: [1076820](https://crbug.com/1076820), [1199247](https://crbug.com/1199247)


## #sourceURL을 포함하는 인라인 스크립트를 위한 적절한 오류 스택 추적 {: #inline-script }
DevTools 는 현재 ```#sourceURL``` 이 있는 인라인 스크립트를 잘 해결하고 있으며, 또한 적절한 오류 스택 추적을 제공하여 사용자의 디버깅을 돕습니다.

이전의 DevTools 는 `#sourceURL`이 있는 인라인 스크립트에 대해 잘못된 위치를 표시했으며, 이는 ```<script>``` 의 시작점이 아닌 주변의 문서가 기준이 되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Proper error stack traces for inline scripts with #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium issues: [1183990](https://crbug.com/1183990), [578269](https://crbug.com/578269)

## 계산된 창에서의 색상 포맷 변경 {: #color-unit }

색상 미리보기에서 <kbd>Shift</kbd> 와 함께 클릭함으로써 사용자들은 이제 계산된 창에 있는 엘레먼트들의 색상 포맷을 변경할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+Click the color preview to change color format", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium issue: [1226371](https://crbug.com/1226371)

## 사용자 정의 도구 설명이 내이티브 HTML 도구 설명으로 변경됨 {: #tooltip }

이제 DevTools 는 모든 컴포넌트들에 대해 내이티브 HTML 도구 설명을 채택합니다. 내이티브 HTML 도구 설명의 스타일링 부족으로 인해 오랜 시간 동안 사용자 정의 도구 설명이 DevTools 내에 구현되어 왔습니다만, 공교롭게도, 사용자 정의 도구 설명을 유지하는 것은 복잡하기 때문에 우리는 이에 기인한 난해한 버그들을 정기적으로 접하게 됐습니다.

그래서 우리는 사용자 정의 구현의 이점에 대해 가중치를 새로 부여했고, 이 과정에서 DevTools 에 대해서 내이티브 HTML 도구 설명이 충분함을 발견하였습니다. 또한 내이티브 도구 설명을 받아들이는 것이 사용자의 관점에서 발생할 수 있는 다양한 문제점을 방지합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium issue: [1223391](https://crbug.com/1223391)


## [실험중] 이슈 탭에서 이슈들을 숨기기 {: #hide-issues }
{% Aside %}
실험중인 기능들을 이용하기 위해서,  **설정 > 실험중** 아래에 있는 **이슈 숨기기 활성화** 메뉴를 체크합니다.
{% endAside %}

**이슈 숨기기 메뉴**를 활성화하여, **이슈** 탭에서 이슈들을 숨길 수 있습니다. 이 방법으로 우리는 중요한 이슈들에 더욱 집중할 수 있습니다.

**이슈** 탭에서 이슈를 가리키고 이슈 메뉴를 클릭하십시오.&nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %}  오른쪽에 있는 **이 방법으로 이슈 숨기기**를 선택하여 이슈를 감출 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Experimental hide issue context menu", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium issue: [1175722](https://crbug.com/1175722)

{% include 'partials/devtools/kr/reach-out.md' %}
{% include 'partials/devtools/kr/whats-new.md' %}
