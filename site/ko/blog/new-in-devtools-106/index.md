---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 106)"
authors:
  - jecelynyeen
date: 2022-09-16
updated: 2022-09-16
description: "Better support for modern web debugging, LCP timings breakdown in the Performance Insights, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/E4CsREgOkGDdOfu6qCCs.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-106
---

*이 게시글의 번역에는 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 참여하셨으며, [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님과 [최원영]](https://www.linkedin.com/in/toruchoi)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='5gBqTXctxO8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->

## 소스 패널에서 작성/배포 단위로 파일 그룹화하기

**작성/배포 단위로 파일 그룹화하기**는 이제 3점 메뉴에 위치합니다. 이전에는 네비게이션 패널에서 바로 확인할 수 있었습니다.
이 [데모](https://ng-devtools.netlify.app/)를 열어보세요. 먼저 원본 소스 코드 (작성됨으로 표기)를 확인하기 위해 **작성/배포 단위로 파일 그룹화하기** 설정을 활성화하고, 빠르게 확인해봅시다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HI12Jz3K7CCy0cm01jBk.png", alt="Group files by Authored / Deployed", width="800", height="405" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


## 개선된 스택 추적 {: #stack-traces }

 ### 비동기 동작에 대한 연결된 스택 추적  {: #async }

이제 몇몇 동작들이 비동기적으로 발생하도록 스케쥴링되었을 떄, 개발자 도구의 스택 추적기는 동작의 "전체 스토리"를 표현합니다. 이전에는 일부 스토리만을 보여주었습니다.
예를 들어 이 [데모](https://ng-devtools.netlify.app/)를 실행하고, 증가 버튼을 클릭한 뒤 **콘솔**에 에러 메세지를 확장해봅시다. 소스 코드에서 비동기 `timeout` 동작을 포함하고 있을 것입니다.

```js
// application.component.ts

async increment() {
    await Promise.resolve().then(() => timeout(100));
    …
}
```

이전에는 스택 추적은 타임아웃 동작만을 보여주었으며, 동작의 "진짜 발생 이유"는 보여주지 않았습니다.
이 변경으로 더불어 이제 개발자 도구는 버튼 컴포넌트의 `onClick` 이벤트로 인해 동작이 발생하였음을 보여주고, `increment` 함수가 타임아웃 동작에 이어 발생함을 보여줍니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2jAETpw8QWzsg1Wqk0Ya.png", alt="Linked stack traces for asynchronous operations", width="800", height="442" %}

그 외에도 DevTools는 새로운 "Async Stack Tagging" 기능을 도입했습니다. 비동기 코드의 두 부분을 새로운 `console.createTask()` 메서드와 함께 연결하면 작업의 전체 스토리를 알 수 있습니다. 자세한 내용은 [DevTools의 최신 디버깅](/blog/devtools-modern-web-debugging/#linked-stack-traces)을 참조하세요.

복잡하게 보이나요? 전혀 그렇지 않습니다. 대부분의 경우 사용 중인 프레임워크가 스케쥴링과 비동기 동작을 처리합니다. 이 경우 API의 구현은 프레임워크에 달려 있으므로 걱정할 필요가 없습니다. (예: Angular는 이와 같은 [변경 사항](https://chromium-review.googlesource.com/c/v8/v8/+/3776678)을 구현했습니다.)

{# https://chromium.googlesource.com/v8/v8/+/c53c20fe64b5b21f5a4838ebcfdb96357189fc76 #}

Chromium bug: [1334585](https://crbug.com1334585)


### 알려진 서드파티 스크립트를 자동으로 무시하기 {: #auto-ignore }

이제 개발자도구가 무시 목록에 알려진 타사 스크립트를 자동으로 추가하므로 디버깅 시 코드의 문제를 더 빠르게 확인할 수 있습니다.

이 [데모](https://ng-devtools.netlify.app/)를 열고 증가 버튼을 클릭한 뒤 **콘솔**에서 오류 메시지를 확장해봅시다. 스택 추적에는 코드만 표시됩니다(예: `app.component.ts` `button.component.ts`). 전체 스택 추적을 보려면 **더 많은 프레임 표시**를 클릭하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="스택 추적에서 알려진 서드파티 스크립트 자동으로 무시하기", width="800", height="425" %}

이전에는 스택 추적에 `zone.js` 및 `core.mjs`와 같은 타사 스크립트가 포함되었습니다. 이는 소스 코드가 아니라 번들러(예: webpack) 또는 프레임워크(예: Angular)에 의해 생성된 코드이며, 이로 인해 오류의 근본 원인을 확인하는 데 더 오랜 시간이 걸리게됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GQ9B11tKBcFc1BxQYW9z.png", alt="스택 추적에서 알려진 서드파티 스크립트 자동으로 무시하기", width="800", height="425" %}

내부적으로 개발자도구는 소스 맵의 새로운 `x_google_ignoreList` 속성을 기반으로 하는 서드파티 스크립트를 무시합니다. 이를 위해 프레임워크와 번들러가 이 정보를 제공해야 할 필요는 있습니다. [사례 연구: DevTools를 사용한 더 나은 앵귤러 디버깅](/blog/devtools-better-angular-debugging/#x_google_ignorelist-in-angular)을 참조하세요.

추가적으로 항상 전체 스택 추적을 보려면 **설정** > **무시 목록** > **알려진 서드파티 스크립트를 자동으로 무시 목록에 추가**를 통해 설정을 비활성화할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/elkhLqA0KV8pWYFgKk8g.png", alt="알려진 서드파티 스크립트를 자동으로 무시하기 설정", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/e09e489c2b1233ab424d562abc22f297c6322878 #}

Chromium bug: [1323199](https://crbug.com/1323199)


## 개선된 호출 스택 디버깅 {: #call-stack }

이제 **알려진 서드파티 스크립트를 자동으로 무시 목록에 추가하기** 설정을 사용하면 호출 스택에 코드와 관련된 프레임들만 표시됩니다.

이 [데모](https://ng-devtools.netlify.app/)를 열고 `app.component.ts`의 `increment()` 함수에 중단점을 설정합니다. 페이지에서 증가 버튼을 클릭하여 중단점을 트리거해보세요. 호출 스택은 코드의 프레임(예를 들ㅓ `app.component.ts` 및 `button.component.ts`)만 표시하는 것을 확인할 수 있습니다.

모든 프레임을 보려면 **무시 목록에 있는 프레임 표시**를 활성화합니다. 이전에는 개발자도구가 기본적으로 모든 프레임을 표시했습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PdjPrBAV7TXn8FHcRR6R.png", alt="개선된 호출 스택 디버깅", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/73c559d02676e4329645120e657416e7f15de42b #}

Chromium bug: [1352488](https://crbug.com/1352488)


## 소스 패널에서 무시 목록에 포함된 소스들 숨기기 {: #ignore-nav }

**탐색** 창에서 관련 없는 파일을 숨기려면 **무시 목록에 있는 소스 숨기기**를 활성화합니다. 이를 통해 코드에만 집중할 수 있습니다.

이 [데모](https://ng-devtools.netlify.app/)를 실행해보세요. **소스** 패널에서, `node_modules` 및 `webpack`은 서드파티 스크립트입니다. 3점 메뉴를 클릭하고 **무시 목록에 포함된 소스 숨기기**를 선택하여 창에서 해당 소스들을 숨길 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Y4KSjl9zJQdnAhTvtnXm.png", alt="소스 패널에서 무시 목록에 포함된 소스들 숨기기", width="800", height="449" %}

Chromium bug: [1352488](https://crbug.com/1352488)


## 명령 메뉴에서 무시 목록에 포함된 소스들 숨기기 {: #ignore-search }

**무시 목록에 포함된 소스 숨기기** 설정을 사용하면 [명령 메뉴](/docs/devtools/command-menu/)에서 파일을 더 빨리 찾을 수 있습니다. 이전에는 **명령 메뉴**에서 파일을 검색하면 사용자와 관련이 없을 수 있는 서드파티 파일이 함꼐 반환되었습니다.

예를 들어 **무시 목록에 포함된 소스 숨기기** 설정을 활성화하고 3점 메뉴를 클릭합니다. **파일 열기**를 선택한 뒤 버튼 구성 요소를 검색하기 위해 "ton"을 입력합니다. 이전에는 결과에 `node_modules` 파일 중 하나인 `node_modules` 파일이 포함되었으며, 첫 번째 결과로도 표시되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vi0yhKte5KN511F57FQM.png", alt="명령 메뉴에서 무시 목록에 있는 파일 숨기기", width="800", height="425" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9144105ce3efd70babe74c19e808616864be631b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c010ce7baa6930cb633372b5d8024a18b3f7ed66 #}

Chromium bug: [1336604](https://crbug.com/1336604)


## 성능 패널의 새로운 상호 작용 추적  {: #performance }

**성능** 패널의 새로운 **상호작용** 추적을 사용하여 상호작용을 시각화하고 잠재적인 응답 민감성 문제를 추적할 수 있습니다.

예를 들어 이 [데모 페이지](https://coffee-cart.netlify.app/?ad=1)에서 [성능 기록을 시작해봅시다](/docs/devtools/evaluate-performance/#record). 커피를 클릭하고 기록을 중지합니다. **상호작용** 트랙에 두 개의 상호작용이 표시됩니다. 두 상호 작용 모두 동일한 ID를 가지며, 이는 상호 작용들이 동일한 사용자의 동작에서 트리거되었음을 나타냅니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LpHJbSGra2ZCHpy3ns7q.png", alt="성능 패널의 상호 작용 추적", width="800", height="489" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6d97228951a6c8884b3ac4b712e966e79f2bdc3c #}

Chromium bug: [1347390](https://crbug.com/1347390)


## Performance Insights 패널의 LCP 타이밍 분석 {: #insights }

**Performance Insights** 패널은 이제 [최대 콘텐츠풀 페인트(Largest Containful Paint, LCP)](/docs/devtools/performance-insights/#)의 [타이밍 분석](web.dev/optimize-lcp/#lcp-breakdown)을 표시합니다. 이러한 타이밍 정보를 사용하여 LCP 성능을 개선할 수 있는 방법을 확인할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hU6RmoRjFskL8P2ZAB9l.png", alt="Performance Insights 패널의 LCP 타이밍 분석", width="800", height="523" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/883542a3727a5bc1415ffee7c7bc7f7218d9e2a5 #}

Chromium bug: [1351735](https://crbug.com/1351735)


## Auto-generate default name for recordings in the Recorder panel {: #recorder }

이제 **기록* 패널은 새로운 기록의 이름을 자동으로 생성합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0TMJgVqyk7AeoWIR6Vee.png", alt="기록 패널의 기본 기록 명칭들", width="800", height="565" %}

{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fbf1466b00d1ff2c36fce81fde1b21f33b689a76 #}

Chromium bug: [1351383](https://crbug.com/1351383)


## 그외의 하이라이트들 {: #misc }

- 이전에는 [기록 확장 프로그램들](/docs/devtools/recorder/reference/#extension-troubleshooting)이 **기록** 패널에서 종종 표시되지 않았습니다. ([1351416](https://crbug.com/1351416))
- **스타일** 창은 이제 [SVG `<stop>`](https://developer.mozilla.org/docs/Web/SVG/Element/stop) 요소의 `stop-color` 속성에 대한 색상 선택기를 표시해줍니다. ([1351096](https://crbug.com/1351096))
- **Performance Insights** 패널에서 레이아웃 변경의 근본적 잠재원인인 [레이아웃](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)을 유발하는 스크립트를 식별합니다. ([1343019](https://crbug.com/1343019))
- **Performance Insights** 패널에서 LCP 웹 글꼴의 주요 경로를 표시합니다. ([1350390](https://crbug.com/1350390))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/50a84ca8e5b556e27bb285477f21a99f0ccb7050 #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/2687a701a67e543faeff3f936f215534bf8221bf #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1f6ef0d58292665e06eded4059d8714a2e487e8a #}
{# https://chrome-internal.googlesource.com/devtools/devtools-internal/+/fe7254c9a51f964b2a106becc1b22f38033b9f50 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
