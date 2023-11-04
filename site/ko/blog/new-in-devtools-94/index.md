---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "DevTools 를 원하는 언어로 사용할 수 있습니다. 그 외 새 Nest Hub 기기들, 새 CSS 컨테이너 쿼리 배지 등 많은 새 기능들을 확인해보세요."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jQ7c8hUZLtFYoN2Xvuyx.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하였으며, [이지웅](https://bit.ly/JiwoongLeePortfolio)님과 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님, 그리고 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*


{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}

## DevTools 를 이제 여러분들이 선호하는 언어로 사용하세요 {: #localized }

Chrome DevTools는 80개 이상 언어를 제공하여, 여러분들의 기호에 맞는 언어를 골라서 사용할 수 있습니다.

[Settings](/docs/devtools/customize/#settings) 메뉴를 열고, **Preferences** > **Language** 드롭다운 메뉴에서 여러분들이 원하는 언어를 선택한 다음  DevTools 를 새로고침해 줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gfNZHj7vJTQELSiz78d2.png", alt="Settings > Preferences 에서 언어를 선택하세요", width="800", height="519" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium issue: [1163928](https://crbug.com/1163928)

## 기기 목록에 Nest Hub 가 새로 추가되었습니다 {: #nest-hub }

이제 [기기 모드](/docs/devtools/device-mode/)에서 Nest Hub 및 Nest Hub Max의 화면크기로 시뮬레이션할 수 있습니다.

[Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) 를 클릭한 다음,&nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="토글 디바이스 툴바", width="20", height="22" %}&nbsp;,  기기 목록에서  Nest Hub 혹은 Nest Hub Max 를 선택하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="기기 모드의 Nest Hub device", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium issue: [1223525](https://crbug.com/1223525)


## 프레임 상세 화면에서 Origin trials 가 제공됩니다 {: #origin-trials }

이제 웹사이트의 [origin trials](/blog/origin-trials/)  에 대한 정보를 애플리케이션 패널 하단의 프레임 상세 화면에서 볼 수 있습니다.

여러분들은 [Origin trials](/blog/origin-trials/) 를 통해 새로운 기능 혹은 실험적인 기능을 이들이 안정화되기 전에 제한적인 시간 동안 시도 및 적용해 볼 수 있습니다.

Origin trials 가 포함된 페이지 (예시:  [demo page](https://mediastreamtrack.glitch.me))를 엽니다. **애플리케이션** 패널에서 스크롤을 **프레임** 섹션까지 내린 후 top 프레임을 선택합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="프레임 상세 화면에서의 Origin trials", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium issue: [607555](https://crbug.com/607555)


## 새로운 CSS 컨테이너 쿼리 배지 {: #container-queries }

**컨테이너** 배지가 컨테이너 요소 옆에 새롭게 추가되었습니다. (```@container``` 규칙의 조건과 부합하는 조상 요소를 의미합니다.), 배지를 클릭하여 페이지에서 선택한 컨테이너 및 모든 쿼리의 하위 항목의 오버레이 표시를 보여주거나 숨길 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS 컨테이너 쿼리 배지", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium issue: [1146422](https://crbug.com/1146422)


## 네트워크 필터 반전을 위한 새로운 체크박스 추가 {: #invert-network-filter }

네트워크 패널에 **Invert** 체크박스가 새로 추가되었으며, 이를 이용해 필터들을 반전시킬 수 있습니다.

예를 들어, 404 스테이터스 코드가 포함된 네트워크 요청만을 걸러내기 위해 "status-code:404" 를 입력해 보세요. 그리고 **Invert** 체크박스를 활성화시켜 필터링 옵션을 반전시켜 보세요. (404 스테이터스 코드가 포함되지 않은 모든 네트워크 요청을 표시합니다.)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="네트워크 필터 반전", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium issue: [1054464](https://crbug.com/1054464)


## 콘솔 사이드바 제거 예정 {: #deprecated }

필터 UI를 툴바로 옮기기 위해, 콘솔 사이드바가 더 이상 사용되지 않고 제거될 예정입니다. 우려사항이나 피드백이 있다면 [이슈 트래커](https://crbug.com/1232937)를 통해 알려 주세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="콘솔 사이드바 제거 안내", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium issue: [1232937](https://crbug.com/1232937)


## 문제 탭과 네트워크 패널에서 Raw Set-Cookie 헤더 표시 {: #raw-cookies }

DevTools 의 **문제** 탭에서 이제 Raw ```Set-Cookie``` 헤더를 볼 수 있습니다.

이전에는 쿠키가 형식에 맞지 않았을 때 (올바르지 않은 ```Set-Cookie``` 헤더) DevTools의 네트워크 패널에 표시되지 않았습니다. **네트워크** 패널에서 새로 추가된 ```response-header-set-cookie``` 를 사용하면 Raw ```Set-Cookie``` 헤더 응답을 걸러낼 수 있습니다. DevTools 는 **문제** 탭의 Raw ```Set-Cookie``` 헤더 응답을 **네트워크** 패널로 연결합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="문제 탭과 네트워크 패널의 Raw 'Set-Cookie' 헤더", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium issue: [1179186](https://crbug.com/1179186)


## 고유한 속성인 네이티브 접근자를 콘솔에서 일관성 있게 표시 {: #native-accessors }

이제 **콘솔**에서 네이티브 접근자를 고유한 속성으로서 일관성 있게 표시합니다.


예를 들면 **콘솔**에서 `new Int8Array([1, 2, 3])` 코드를 표시할 때,  ```length```, ```byteOffset``` 네이티브 접근자들을 미리보기에서 표시하지 않았지만, 이번 업데이트를 통해 네이티브 접근자를 미리보기에서 확인할 수 있으며, 확장 시에 값들이 빠르게 표시됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="고유한 속성인 네이티브 접근자를 콘솔에서 일관성 있게 ", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium issues: [1076820](https://crbug.com/1076820), [1199247](https://crbug.com/1199247)


## #sourceURL이 있는 인라인 스크립트에 적합한 오류 스택 추적 {: #inline-script }

DevTools 는 이제 ```#sourceURL```을 사용하여 인라인 스크립트를 올바르게 해결하고 디버깅을 위한 적절한 오류 스택 추적을 표시합니다.

이전에 DevTools는 여는 ```<script>``` 태그가 아닌 주변 문서를 기준으로 `#sourceURL`이 있는 인라인 스크립트에 대해 잘못된 위치를 표시했습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="#sourceURL이 있는 인라인 스크립트에 대한 적절한 오류 스택 추적", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium issues: [1183990](https://crbug.com/1183990), [578269](https://crbug.com/578269)

## 계산됨 영역에서 컬러 포맷 변경 {: #color-unit }

색상 미리보기를 <kbd>Shift</kbd> 를 누른 채 클릭하여, 계산됨 영역에서 요소의 컬러 포맷을 변경할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="컬러 포맷 변경을 위해 Shift와 함께 컬러 미리보기 클릭", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium issue: [1226371](https://crbug.com/1226371)

## 커스텀 툴팁을 네이티브 HTML 툴팁으로 변경 {: #tooltip }

이제 DevTools 의 모든 컴포넌트에서 네이티브 HTML 툴팁을 사용합니다. 네이티브 HTML 툴팁의 스타일링이 어려워 오랜 시간동안 DevTools 에서 커스텀 툴팁을 사용했지만, 커스텀 툴팁 구현체를 유지보수하는 건 어려운 작업이었고 주기적으로 난해한 이슈들과 마주하게 되었습니다.

따라서 커스텀 툴팁 구현체의 이점을 재평가한 후, 네이티브 HTML 툴팁이 DevTools 에서 충분히 잘 동작하고, 사용자들이 경험할 수 있는 다양한 문제점을 방지해준다는 사실을 알게 되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools 툴팁", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium issue: [1223391](https://crbug.com/1223391)


## [실험실 기능] 문제 탭에서 이슈들을 숨기기 {: #hide-issues }

{% Aside %}
실험실 기능을 활성화하려면 **설정 > 실험** 에 있는 **Enable hide issues menu** 를 체크하세요.
{% endAside %}

**Enable hide issues menu**를 활성화하여, **문제** 탭에서 이슈들을 숨길 수 있습니다. 이 방법으로 우리는 우리에게 중요한 이슈들에 좀더 집중할 수 있습니다.

**문제** 탭에서 이슈에 hover 하여 우측에 있는 이슈 메뉴 {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="더보기", width="4", height="20" %} 를 클릭한 뒤,
**Hide issues like this** 를 클릭하면 이슈를 감출 수 있습니다.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="실험적인 hide issue context menu", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium issue: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
