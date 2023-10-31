---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 101)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "유저 플로우를 JSON 파일로 내보내고 불러오기, hwb() 컬러 포맷 지원, 스타일 창에서 cascade 레이어 보기 등"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LS1IRAAIO7A8Qu3ZLM2a.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi)님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}

## 녹화된 유저 플로우를 JSON 파일로 내보내고 불러오기 {: #recorder }

이제 [Recorder](/docs/devtools/recorder) 패널에서 유저 플로우를 JSON 파일로 내보내거나 불러올 수 있습니다. 이 기능은 유저 플로우를 더 쉽게 공유할 수 있게 하고 버그 리포팅에 유용하게 쓰일 수 있습니다.

에를 들어, 다음 [JSON 파일](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json) 을 다운로드 받아보세요. import 버튼을 사용해 파일을 불러온 뒤 [유저 플로우를 다시 재생](/docs/devtools/recorder/#replay) 할 수 있습니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

그 외에도 녹화물을 내보낼 수도 있습니다. [유저 플로우를 녹화](/docs/devtools/recorder/#record) 한 뒤에 export 버튼을 클릭하세요. 다음과 같은 3가지 옵션이 있습니다:

- **JSON 파일로 내보내기**. 녹화본을 JSON 파일로 다운로드합니다.
- **@puppeteer/replay 스크립트로 내보내기**. 녹화본을 [Puppeteer 다시보기](https://github.com/puppeteer/replay) 스크립트로 다운로드합니다. 
- **Puppeteer 스크립트로 내보내기** . 녹화본을 [Puppeteer](https://pptr.dev/) 스크립트로 다운로드합니다.

이러한 옵션들 사이의 차이점에 대해 더 자세히 알고자 한다면 [문서](/docs/devtools/recorder/#export-flows) 를 참고하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Recorder 패널의 export 옵션", width="800", height="556" %}

Chromium issue: [1257499](https://crbug.com/1257499)


## 스타일 창에서 cascade 레이어 보기 {: #layer }

[Cascade 레이어](/blog/cascade-layers/) 를 사용하면 스타일별 충돌을 방지하기 위해 CSS 파일을 보다 명시적으로 제어할 수 있습니다. 이 기능은 대규모 코드베이스, 디자인 시스템, 애플리케이션 내부의 써드 파티 스타일을 관리할 때 특히 유용합니다.

다음 [예제](https://jec.fish/demo/cascade-layer) 에서는 `page`, `component`, `base` 라는 3가지 cascade 레이어가 정의되어 있습니다. **스타일** 창에서 각 레이어와 스타일을 볼 수 있습니다.

레이어 이름을 클릭하고 레이어 순서를 살펴보세요. `page` 레이어가 가장 높은 특정성을 가지고 있어 `box` 의 배경색은 초록색으로 정의됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="스타일 창에서 cascade 레이어 보기", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Chromium issue: [1240596](https://crbug.com/1240596)


## hwb() 색상 함수 지원 {: #hwb }

DevTools에서 [HWB 색상 포맷](https://drafts.csswg.org/css-color/#the-hwb-notation) 을 보고 수정할 수 있습니다.

**스타일** 창에서 **Shift** 키를 누른 상태로 색상 프리뷰를 클릭하여 색상 포맷을 변경할 수 있습니다. HWB 색상 포맷이 추가되어있습니다.

혹은 [컬러 피커](/docs/devtools/css/reference/#color-picker) 를 사용하여 HWB 색상 포맷을 변경할 수도 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="hwb() 색상 함수", width="800", height="508" %}


## private 속성 표시 개선 {: #private-props }

DevTools에서 private 접근자를 적절하게 평가하고 표시합니다. 이전에는 **콘솔** 이나 **소스** 패널에서 private 접근자로 클래스를 확장할 수 없었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="콘솔 상의 private 속성", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Chromium issues: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


## 기타 하이라이트 {: #misc }

이번 릴리스에서 주목할만한 수정 사항들입니다:

- [뒤로/앞으로 캐쉬(혹은 bfcache)](/blog/new-in-devtools-98/#bfcache) 에서 블락된 [bfcache](https://web.dev/bfcache/) 익스텐션 ID를 표시합니다. ( [1284548](https://crbug.com/1284548))
- 유사 배열 객체, CSS 클래스 이름, `map.get` 과 HTML 태그에 대한 자동 완성 지원이 수정되었습니다. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
- 단어를 더블 클릭하거나 자동 완성을 취소할 때 잘못된 하이라이트를 수정하였습니다. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
- **소스** 패널에서 주석 키보드 단축키를 수정하였습니다. ([1296535](https://crbug.com/1296535))
- **소스** 패널에서 **Alt** (Options) 키를 사용해 여러 곳을 선택하는 기능을 다시 지원합니다. ([1304070](https://crbug.com/1304070))

 
## [실험실 기능] Lighthouse 패널의 새로운 시간 범위 (timespan) 및 스냅샷 (snapshot) 모드 {: #lighthouse }

{% Aside %}
이 실험을 활성화하려면, **설정** > **실험** 에서 **Use Lighthouse panel with timespan and snapshot modes** 체크박스를 활성화해야 합니다.
{% endAside %}

기존 **navigation** 모드와 별개로 **Lighthouse** 패널에서 유저 플로우를 측정하기 위한 **timespan**, **snapshot** 모드를 추가로 지원합니다.

예를 들어, **timespan** 보고서를 유저 인터렉션을 측정하기 위해 사용할 수 있습니다. [데모](https://coffee-cart.netlify.app/) 페이지를 열어 **Timespan** 모드를 선택한 뒤 **Start timespan** 을 클릭하세요. 페이지에서 커피를 선택한 뒤 timespan을 종료하세요. 보고서를 읽어보면 인터렉션으로 인해 발생한 [총 차단 시간](https://web.dev/tbt/)과 [누적 레이아웃 이동](https://web.dev/cls/) 을 찾을 수 있습니다.

각 모드에는 고유한 사용 사례, 이점, 제한 사항이 있습니다. 더 상세한 정보는 [Lighthouse 문서](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) 를 살펴보세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Lighthouse 패널에서 Timespan 과 snapshot 모드 지원", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Chromium issue: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
