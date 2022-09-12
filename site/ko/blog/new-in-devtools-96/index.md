---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 96)"
authors:
  - jecelynyeen
date: 2021-10-25
updated: 2021-10-25
description:
  "새로운 CSS 개요 영역, CSS 의 prefers-contrast 미디어 기능 에뮬레이션, 크롬의 자동 어두운 테마 기능 에뮬레이션 및 다른 새로운 기능들."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/61LuaWeAzEc2dbdFjnWm.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-96
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- Remember to update the whats-new.md file as well -->
<!-- end: translation instructions -->

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하였으며, [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님과 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='3CXbhnaFNEw' %}

## 미리보기 기능: 새로운 CSS 개요 영역 {: #css-overview }

당신의 페이지에 존재할 수 있는 잠재적 CSS 개선사항을 보여 주는 새로운 CSS 개요 패널을 사용해 보세요.
[**CSS 개요** 패널 열기](/docs/devtools/css-overview#open) 그리고 **Capture overview** 를 클릭하여 페이지 내의 CSS에 관한 보고서를 생성할 수 있습니다.

여러분은 CSS의 정보들을 더욱 깊이 파고들 수 있게 됩니다. 예를 들어, **색상** 섹션의 색상을 클릭해서 동일한 색상이 적용되는 요소들의 리스트를 볼 수 있으며, 하나의 구성요소를 클릭해서 **구성요소** 패널에서 열어 볼 수 있습니다.

**CSS 개요** 패널은 프리뷰 기능입니다. 우리는 이 기능에 계속적인 노력을 기울이고 있으며, 또한 더 많은 개선점을 찾기 위해서 여러분의 [피드백](https://goo.gle/css-overview-feedback)이 필요합니다. 

**CSS 개요** 에 대해 좀 더 알고 싶으시다면 [더보기](/docs/devtools/css-overview)를 클릭하여 첨부된 문서를 읽어 보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fXXPihV3bTl82WDJGX51.png", alt="CSS Overview panel", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1254557](https://crbug.com/1254557)


## 복원 및 개선된 CSS 길이 편집 및 복사 기능 {: #length }

이전 배포판에서 중단되었던 길이를 갖는 CSS 요소에 대한 **CSS 복사하기**와 **텍스트로 편집하기** 기능이 복구되었습니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/3zxmVrRNd767L9zPDvU8.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

그리고 여러분들은 드래그하여 단위 값을 조정할 수 있고, 드롭 다운을 통해 단위 타입을 업데이트할 수 있습니다. 이 길이 작성 기능은 텍스트 경험으로서 기본 편집에 영향을 주지 않아야 합니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/YkvFZGBllRecee2EAzYf.mp4", autoplay="true", muted="true", loop="true", class="screenshot"  %}

사용 중에 혹시 이슈를 발견했을 경우에는 [피드백 링크](https://goo.gle/length-feedback)를 통해 알려 주세요.

한편, 이 기능을 비활성화하고 싶으시다면 **설정** > **실험** > **Enable CSS length authoring tools in the Styles pane** 체크박스를 해제하면 됩니다.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0042092ccbcdfb5b113c28b9a58c2cf1219b10c4 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c8f39d4c60841439ebf75d1a2d8fdfe50e1355a9 #}

Chromium issues: [1259088](https://crbug.com/1259088), [1172993](https://crbug.com/1172993)


## 렌더링 탭의 업데이트 

### CSS 의 prefers-contrast 미디어 기능 에뮬레이션 {: #prefers-contrast }

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/47fsHvVLiVC9J0eWY9wD.png", alt="Emulate the CSS prefers-contrast media feature", width="800", height="483" %}

[prefers-contrast](https://www.chromestatus.com/feature/5646323212615680)는 사용자가 어느 수준의 명암 대비를 요청했는지를 확인할 수 있는 미디어 기능입니다.

[명령어 표시](/docs/devtools/command-menu/)를 열고 **렌더링 표시** 명령어를 실행하세요. 그리고 드롭다운 메뉴에서 **CSS 미디어 기능 prefers-contrast 에뮬레이션** 을 선택하세요.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22cec8dbfa7b46c8b633e3555212556ec6f78df9 #}

Chromium issue: [1139777](https://crbug.com/1139777)


### 크롬의 자동 어두운 테마 기능 에뮬레이션 {: #auto-dark-mode }

DevTools 를 사용하여 자동 어두운 테마를 에뮬레이션할 수 있으며, 이를 이용해 사용자들은 크롬의 [자동 어두운 테마](/blog/auto-dark-theme/)가 설정되었을 때 어떻게 보일지를 쉽게 확인할 수 있습니다.

크롬 96은 안드로이드의 [자동 어두운 테마](/blog/auto-dark-theme/)에 대한 [Origin Trial](/blog/origin-trials/)을 제시합니다. 이 기능을 이용하여, 사용자가 운영체제 단에서 다크 테마를 적용했을 때, 크롬 브라우저는 자동 생성된 라이트 테마를 라이트 테마로 제작된 웹사이트에 적용합니다.

[명령어 표시](/docs/devtools/command-menu/)를 열고 **렌더링 표시** 명령어를 실행합니다. 그리고 **자동 어두운 모드 에뮬레이션** 을 설정합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QHS8kupNsTXnKD7HomYy.png", alt="Emulate the Chrome’s Auto Dark Theme feature", width="800", height="483" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0d7e03ffa64ba8432ec9db3e067abeb60cd53d7e #}

Chromium issue: [1243309](https://crbug.com/1243309)


<!-- ## Copy declarations as JavaScript in the Styles pane {: #copy-as-js } -->
## 스타일 영역에서 선언을 자바스크립트로 복사하기 {: #copy-as-js }

쉽게 CSS 규칙을 자바스크립트 프로퍼티로 복사하기 위한 새로운 두 개의 옵션이 컨텍스트 메뉴에 추가되었습니다. 이 바로가기 옵션들은 개발자들, 특히 [CSS-in-JS](/blog/css-in-js/#what-is-css-in-js)라이브러리를 사용하는 개발자들에게 편리합니다.

**스타일** 영역의 CSS 규칙에서 마우스 오른쪽을 클릭합니다. **선언을 JS로 복사**를 선택하여 하나의 규칙을 복사하거나, 혹은 **모든 선언을 JS로 복사**를 선택하여 모든 규칙을 복사할 수 있습니다.

예를 들어, 아래의 예제는 `padding-left: '1.5rem'` 를 클립보드로 복사할 것입니다.

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M4mKimxhUs6f4hc0wMuO.png", alt="Copy declaration as JavaScript", width="800", height="469" %} -->

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ca17a55104e6baf8d4ab360b484111bfa93c9b7f #}

Chromium issue: [1253635](https://crbug.com/1253635)


<!-- ## New Payload tab in the Network panel {: #payload } -->
## 네트워크 패널의 새로운 페이로드 탭 {: #payload }

페이로드가 있는 네트워크 요청을 조사할 때, **네트워크** 패널에 새로이 추가된 **페이로드** 탭을 사용하세요. 이전 버전에서, 페이로드 정보는 **헤더** 탭에서 사용 가능했습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1DTIW7zoIqf3VE2WMJmX.png", alt="Payload tab in the Network panel", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eae72f667aa10a1a8316fbf8b2ac03ff514bb4da #}

Chromium issue: [1214030](https://crbug.com/1214030)


<!-- ## Improved the display of properties in the Properties pane {: #properties } -->
## 속성 영역 내의 속성 표시 방법의 개선 {: #properties }

**속성** 영역은 인스턴스의 모든 속성을 표시하는 대신, 오직 관련된 속성값들만을 표시합니다. DOM 프로토타입과 메소드들은 현재 제거되었습니다.
이제 손쉬운 방법으로 **속성** 영역의 [개선](/blog/new-in-devtools-95/#properties)들과 관련된 속성들을 함께 위치시킬 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hs4KfBZOBeyWHF42Xsuq.png", alt="The display of properties in the Properties pane", width="800", height="387" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f1574e9b550317c481a943fec059d84bfb863564 #}

Chromium issue: [1226262](https://crbug.com/1226262) 


## 콘솔 업데이트

### 콘솔의 CORS 에러 숨김 옵션 {: #hide-cors-errors }

**콘솔** 에서 CORS 오류를 숨길 수 있습니다. CORS 오류들은 현재 이슈 탭에 리포트되고 있으므로, **콘솔** 에서 이들을 숨기는 것은 콘솔 내부에 어지럽게 흩어진 오류들을 줄이는 데 도움을 줄 수 있습니다. 

**콘솔**에서 **설정** 아이콘을 클릭한 다음 **콘솔에 CORS 오류 표시** 체크박스를 해제합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m3ZzZI5VkYSYCfCLDHUi.png", alt="Option to hide CORS errors in the Console", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/82873eeb1c1430790ad3a2cd2a698135bd6eb3de #}

Chromium issue: [1251176](https://crbug.com/1251176)


### 콘솔에서 적절한 `Intl` 객체 미리보기 및 값 판별 {: #intl }

[Intl](https://tc39.es/ecma402/#intl-object)객체는 적절한 미리보기 기능을 가지고 있고, 또한 콘솔은 이 객체의 모든 값을 괄호닫음 없이 모두 표시합니다. 

<!-- {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxGQoDdnilseKTFsxdbC.png", alt="Intl objects in the Console", width="800", height="559" %} -->

{# https://chromium-review.googlesource.com/c/v8/v8/+/3196175 #}

Chromium issue: [1073804](https://crbug.com/1073804)


### 일관적인 async 스택 추적 {: #async }

다른 비동기 태스크와 일관성을 유지하기 위해, 이제 DevTools 는 `async` 함수에 대한 `async` 스택 트레이스를 보여 줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wuKo84nrDzbhwCnIVU2n.png", alt="async stack traces", width="800", height="427" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2a04e234f25602d1b7e7ff7bd0d39bde3f2c1ec  #}

Chromium issue: [1254259](https://crbug.com/1254259)


### 콘솔 사이드바 유지 {: #console-sidebar }

콘솔 사이드바가 유지됩니다. 크롬 94애서 [콘솔 사이드바 제거 예정](/blog/new-in-devtools-94/#deprecated)이 발표되었고, 이에 따라 우리는 개발자들에게 피드백 혹은 우려사항을 요청했습니다.
현재 우리는 제거가 예정된 콘솔 사이드바에 대해 충분한 피드백을 받았으며, 따라서 이를 제거하기보다는 개선을 위해 힘쓸 것입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XIsLjvBFSeaTN5BtEgmU.png", alt="Console sidebar", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b0650096c934bf60c21d51ae8a51c94e8f907d38 #}

Chromium issues: [1232937](https://crbug.com/1232937), [1255586](https://crbug.com/1255586)


## 애플리케이션 패널 내 애플리케이션 캐시 영역 제거 예정 {: #app-cache }

[AppCache](https://web.dev/appcache-removal/)에 대한 지원이 크롬 및 다른 크로미움 기반 브라우저에서 중단됨에 따라, 애플리케이션 패널 내부 [애플리케이션 캐시](/docs/devtools/storage/applicationcache/) 영역이 제거되었습니다.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/de4d15e955d6145674e3885cde8a5a70f1269b79 #}

Chromium issue: [1084190](https://crbug.com/1084190) 


## [실험실 기능] 애플리케이션 패널에 새롭게 추가된 Reporting API 영역 {: #reporting-api }

{% Aside %}
이 기능을 활성화하기 위해서, **설정** > **실험** > **Enable Reporting API panel in the Application panel** 체크박스에 체크해 주세요.
{% endAside %}

[Reporting API](https://web.dev/reporting-api/)는 개발자들이 웹페이지, 제거된 API 호츨 등에서의 보안수칙 위반을 잘 모니터링할 수 있도록 설계되었습니다.

이 실험을 활성화함으로써, 여러분들은 이제 보고된 상태를 **애플리케이션** 패널의 새로운 **Reporting API** 영역에서 볼 수 있습니다.
**Endpoints** 섹션은 현재 개발중임을 염두에 두세요. (따라서 엔드포인트는 현재 보고되지 않습니다.)

[관련문서](https://web.dev/reporting-api/)를 통해 **Reporting API**에 대해 좀더 알아볼 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hbwFqi9aNDOj70FhLXsn.png", alt="Reporting API pane in the Application panel", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0516bfc7d4cee077452d31b1550ea1d3c594705 #}

Chromium issue: [1205856](https://crbug.com/1205856)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
