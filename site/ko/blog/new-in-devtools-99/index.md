---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 99)"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "웹 소켓 요청 쓰로틀링, 새로운 Reporting API 창, console 스타일링 등"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iStno9LHU3f6DJe6hOIb.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-99
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='zFVWeOKZBHs' %}

## 웹 소켓 요청 쓰로틀링 {: #websocket }

**네트워크** 패널에서 웹 소켓 요청에 대한 쓰로틀링을 지원합니다. 이전에는 웹 소켓 요청에 대한 네트워크 쓰로틀링은 동작하지 않았습니다.

**네트워크** 패널을 열고 웹 소켓 요청을 클릭한 뒤 **Messages** 탭에서 메시지 이동을 측정할 수 있습니다. **Slow 3G** 를 선택해서 쓰로틀을 걸어보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="웹 소켓 요청 쓰로틀링", width="800", height="540" %}

Chromium 이슈: [423246](https://crbug.com/423246)


## 애플리케이션 패널에 Reporting API 창 추가 {: #reporting-api }

**Reporting API** 창을 사용하여 페이지에서 생성된 보고서와 그 상태를 모니터링할 수 있습니다.

[Reporting API](https://web.dev/reporting-api/) 는 페이지에 대한 보안 위험도, 더 이상 사용되지 않는 API 호출 등을 모니터링하는 데 도움을 주도록 설계되었습니다.

Reporting API 를 사용하고자 하는 페이지에 접속하세요 (예시: [demo page](https://reporting-api-demo.glitch.me/)).
**애플리케이션** 패널에서 스크롤을 내려 **백그라운드 서비스** 영역의 **Reporting API** 창을 선택하세요.

**Reports** 영역에서는 페이지에서 생성된 보고서 목록과 그 상태를 보여줍니다. 보고서를 클릭하여 상세한 내용을 볼 수 있습니다.

**Endpoints** 영역에서는 `Reporting-Endpoints` 헤더에 구성된 모든 엔드포인트에 대한 개요를 제공합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API 창", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/668bc7a4bc6bea854e8fc21f0e0ca3953ff5e95a #}

Chromium 이슈: [1205856](https://crbug.com/1205856)


## Recorder 패널에서 요소가 클릭 가능 / 표시될 때까지 대기 지원 {: #recorder }

사용자 흐름에 대한 기록을 재생할 때, **Recorder** 패널은 이제 특정 요소가 뷰포트에 표시되거나 클릭 가능할 때까지 기다리거나 다음 단계를 재생하기 전에 요소를 뷰포트 내로 자동으로 스크롤하고자 시도합니다. 이전에는 재생이 즉시 실패했습니다.

또한 뷰포트 바깥에 위치한 화면 밖 메뉴 예제를 소개합니다. 이는 활성화되었을 때 즉시 화면에 들어옵니다. 사용자 흐름은 메뉴를 토글하고, 메뉴 아이템을 클릭하는 것입니다. 이전에는 메뉴 아이템이 슬라이딩 되었지만 뷰포트에서는 아직 보이지 않기 때문에 마지막 단계에서 재생이 실패했습니다. 지금은 수정되었습니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qf8f2x1u1y5FEMSmkB3A.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Chromium 이슈: [1257499](https://crbug.com/1257499#c38)


## 콘솔 스타일링, 포매팅, 필터링 개선 {: #console }

### ANSI 이스케이프 코드를 사용한 적절한 스타일의 로그 메시지 {: #console-styling }

이제 [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code)를 사용하여 콘솔 메시지를 적절히 스타일링할 수 있습니다. 이전에는 DevTools 콘솔에서 지원하는 ANSI escape sequences 는 굉장히 제한적이며, 일부는 깨지기도 하였습니다.

ANSI escape sequences 를 통해 로그 메시지에 색상을 입히는 건 [Node.js](https://nodejs.org/) 개발자에게 보편적이며, [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur) 같은 라이브러리를 사용해 스타일링에 도움을 받기도 합니다.

이번 변경점을 통해 DevTools 를 이용하여 Node.js 애플리케이션을 디버깅할 때 적절히 색상이 부여된 콘솔 메시지를 통해 더 원활하게 디버깅할 수 있습니다.

DevTools를 이용한 콘솔 메시지의 포매팅 및 스타일링에 대한 더 상세한 내용은 [format and style messages in the Console](/docs/devtools/console/format-style) 문서를 살펴보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6Lu7Js1rgSmjV0cnhDlH.png", alt="콘솔 스타일링", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f061ee77a872701a366a604903e639506574520a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22a372d445c3f8cff00c2cfe48cb7373165bcd9d #}

Chromium 이슈: [1282837](https://crbug.com/1282837), [1282076](https://crbug.com/1282076)


### `%s`, `%d`, `%i`, `%f` 형식 지정자 지원 {: #console-format }

이제 **콘솔** 에서 [콘솔 표준](https://console.spec.whatwg.org/) 에 정의된 `%s`, `%d`, `%i`, `%f` 형식 지정자를 지원합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="console 메시지에서 형식 지원자 지원", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ec299d49c6ab2c185df660766b1fb827db87f8a #}

Chromium 이슈: [1277944](https://crbug.com/1277944), [1282076](https://crbug.com/1282076)


### 보다 직관적인 콘솔 그룹 필터 {: #console-filter }

이제 콘솔 메시지를 필터링할 때, 필터에 일치하는 그룹 (또는 조상 그룹)의 제목 또는 필터에 일치하는 메시지 콘텐츠를 포함한 경우에만 콘솔 메시지를 보여줍니다. 이전에는 필터와 관계없이 콘솔 그룹 제목이 노출되었습니다.

추가로 콘솔 메시지를 보여줄 때 그룹 (또는 조상 그룹)도 표시됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="콘솔 그룹 필터", width="800", height="612" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/94734947c48283a56f93430f23b838cef10fd364 #}

Chromium 이슈: [1068788](https://crbug.com/1068788)


## 소스맵 개선 {: #sourcemap }

### 소스맵 파일을 이용한 Chrome extension 디버깅 {: #extension }

이제 소스맵 파일을 사용해 [Chrome extension 디버깅](/docs/extensions/mv3/getstarted/#unpacked) 이 가능합니다. 이전에는 DevTools에서 Chrome extension 디버깅 시에는 인라인 소스맵만 지원했습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="소스맵 파일을 사용한 Chrome extension 디버깅", width="800", height="518" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1e73eb62955de7c4b0920575c7b374d47dab6a65 #}

Chromium 이슈: [212374](https://crbug.com/212374)


### 소스 패널에서 소스 폴더 트리 개선 {: #source-tree }

**소스** 패널의 소스 폴더 트리가 폴더 구조 및 네이밍 (“../”, “./”, 등)을 덜 복잡하게 보여주도록 개선되었습니다. 내부적으로 소스맵의 절대 소스 URL을 정규화한 결과입니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="소스 패널에서 소스 폴더 트리 개선", width="800", height="444" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/68613ab02f6d556a2c5ac68ea08f466a534c6bd9 #}

Chromium 이슈: [1284737](https://crbug.com/1284737)


### 소스 패널에서 워커 소스 파일 표시 {: #worker-sourcemap }

소스 패널에서 [워커](https://web.dev/workers-overview/) (예: 웹 워커, 서비스 워커) 소스 파일 및 연관된 sourceURL이 보입니다. 이전에는 워커 소스 파일이 제대로 제어되지 않았습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="소스 패널에서 워커 소스 파일 표시", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6e877d5e1a3ccca22e866fb2a70330613aeb6964 #}


Chromium 이슈: [1277002](https://crbug.com/1277002)


## Chrome 자동 다크 테마 개선 {: #auto-dark-mode }

[자동 다크 테마 에뮬레이션](/blog/new-in-devtools-96/#auto-dark-mode) UI가 간소화되었습니다. 기존 드롭다운 메뉴에서 체크박스로 전환되었습니다.


그 외에도 [자동 다크 테마](/blog/auto-dark-theme/) 가 활성화되면 **Emulate prefers-color-scheme** 드롭다운 메뉴가 비활성화되고 **prefers-color-scheme: dark** 가 자동으로 지정됩니다.


Android Chrome 96에서 [자동 다크 테마](/blog/auto-dark-theme/) 를 [시험적 기능](/blog/origin-trials/) 으로 소개했었습니다. 이 기능을 사용하면 사용자가 운영 체제에서 다크 테마를 선택하면 브라우저가 자동으로 생성된 다크 테마를 라이트 테마 사이트에도 적용합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="자동 다크 테마 에뮬레이션", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8443d2894b6401695ce94657e6afd5ad399eef28 #}

Chromium 이슈: [1243309](https://crbug.com/1243309)


## 터치에 친화적인 컬러 피커와 창 분리 {: #touch-friendly }

터치 스크린 디바이스의 스타일러스 펜이나 손가락을 이용해 DevTools 에서 색상을 선택하거나 [Drawer](/docs/devtools/customize/#drawer) 리사이징이 가능합니다.

아래 예제는 [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) 기기의 터치 스크린을 사용한 캡쳐입니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aA3Oann2z26Yty9sgNB2.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f60936b29519e0cf387cd0a133d43885c6eb183d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22bb84d657aa69f6f7d5067605c2c133a5714172 #}

Chromium 이슈: [1284245](https://crbug.com/1284245), [1284995](https://crbug.com/1284995)



## 기타 하이라이트 {: #misc }

이번 릴리스에서 주목할만한 수정 사항들입니다:

- **쿠키** 창에서 [edit cookies](/docs/devtools/storage/cookies/#edit) 이슈를 해결하였습니다. ([1290196](https://crbug.com/1290196))
- [Command menu](/docs/devtools/command-menu/) 에서 `Shift` + `Tab` 을 사용해 이전 커맨드를 선택할 수 있습니다. ([1278743](https://crbug.com/1278743))
- [이슈](/docs/devtools/issues/) 탭에서 [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) 이슈가 노출됩니다. ([1272445](https://crbug.com/1272445)).
- [이슈](/docs/devtools/issues/) 탭에서 [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) 이슈가 노출됩니다. ([1219359](https://crbug.com/1219359)).
- **소스** 및 **콘솔** 패널에서 `Shift` + `Delete` 및 `Page up` / `Page down` 동작을 수정하였습니다. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662))
- **소스** 패널에서 브레이크포인트를 제거하면 브레이크포인트 편집 다이얼로그를 닫습니다. ([922513](https://crbug.com/922513))
- DevTools에서 [라이트 / 다크 테마 선택](/docs/devtools/customize/dark-theme/) 시에 다시 불러올 필요가 없어졌습니다. ([1278738](https://crbug.com/1278738))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
