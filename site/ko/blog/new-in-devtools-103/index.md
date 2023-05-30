---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 103)"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "더블 클릭 & 우 클릭 이벤트 기록하기, Lighthouse에서 유저 플로우를 측정하기 위한 새로운 옵션 등"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/OqmQlfas0Os0GOkL5tzm.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [최원영](https://www.linkedin.com/in/toruchoi) 님과 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

## Recorder 패널에서 더블 클릭 & 우 클릭 이벤트 캡쳐하기 {: #recorder }

**Recorder** 패널에서 더블 클릭 & 우 클릭 이벤트를 캡쳐할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Recorder 패널에서 더블 클릭 & 우 클릭 이벤트 캡쳐하기", width="800", height="572" %}

다음 [예제](https://jec.fish/demo/dbl-right-click) 에서, [recording](/docs/devtools/recorder/#record) 을 시작하고 아래 스텝을 따라해보세요:

- 카드를 더블 클릭하면 확대됩니다.
- 카드를 우클릭하고 컨텍스트 메뉴에서 동작을 선택하세요.

**Recorder** 가 어떻게 이러한 이벤트를 캡쳐하는지 이해하려면, 다음 단계로 확장하세요:

- **더블 클릭** 은 `type: doubleClick` 으로 캡쳐됩니다.
- **우 클릭** 이벤트는 `type: click` 으로 캡쳐되지만 `button` 속성은 `secondary` 로 설정됩니다. 일반적인 마우스 클릭의 `button` 값은 `primary` 입니다.

Chromium issues: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


## Lighthouse 패널에서 새로 출시된 timespan과 snapshot 모드 {: #lighthouse }

이제 **Lighthouse** 에서 페이지 로딩 이상의 웹사이트 성능을 측정할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Lighthouse 패널에서 새로 출시된 timespan과 snapshot 모드", width="800", height="507" %}

**Lighthouse** 패널은 이제 유저 플로우 측정을 위해 3가지 모드를 지원합니다.

- [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) 리포트는 단일 페이지 로딩을 측정합니다. Navigation은 가장 보편적인 보고 형태입니다. 이전 버전의 모든 Lighthouse 리포트는 navigation 리포트입니다.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) 리포트는 일반적으로 유저 인터렉션을 포함한 임의의 기간을 분석합니다.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) 리포트는 일반적으로 유저가 인터렉션한 후 특정 상태의 페이지를 분석합니다. 

예를 들어, 다음 [데모 페이지](https://coffee-cart.netlify.app/) 에서 카트에 아이템을 넣는 과정의 성능을 측정해본다고 해봅시다. **Timespan** 모드를 선택하고 **Start timespan** 를 클릭하세요. 스크롤한 뒤 몇 개 아이템을 카트에 넣어봅시다. 끝나고 나면, **End timespan** 을 클릭하여 유저 인터렉션에 대한 Lighthouse 리포트를 생성할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Timespan 모드", width="800", height="549" %}

[Lighthouse의 유저 플로우](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) 를 통해 각 모드에 대한 훌륭한 유즈 케이스, 혜택, 그리고 한계점을 알 수 있습니다.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Chromium issue: [1291284](https://crbug.com/1291284)


## Performance Insights 업데이트 {: #performance }

### Performance Insights 패널에서 zoom 컨트롤 개선 {: #zoom }

DevTools 는 이제 재생 헤드 위치가 아닌 마우스 커서를 기반으로 줌됩니다. 커서 기반 줌을 사용하면 트랙 내 어디에나 마우스를 옮겨 원하는 곳으로 [줌 인](/docs/devtools/performance-insights/#navigate) 할 수 있습니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

[Performance Insights](/docs/devtools/performance-insights/) 에서 패널을 통해 실천 가능한 인사이트를 얻고 웹사이트의 성능의 최적화 방법을 배울 수 있습니다.

Chromium issue: [1313382](https://crbug.com/1313382)


### 성능 레코딩 삭제 확인 {: #delete }

DevTools에서 [성능 레코딩을 삭제](/docs/devtools/performance-insights/#delete) 하기 전에 확인창을 노출합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="성능 레코딩 삭제 확인", width="800", height="549" %}

Chromium issue: [1318087](https://crbug.com/1318087)


## 요소 패널에서 창 재배치하기 {: #reorder-pane }

설정에 따라 **요소** 패널에서 창을 재배치할 수 있습니다.

예를 들어, DevTools가 좁은 스크린에서 열렸을 때 [Accessibility](/docs/devtools/accessibility/reference/#pane) 창은 **더 보기** 버튼 아래로 사라집니다. 만약 자주 접근성 이슈를 디버깅한다면, 더 쉽게 접근하기 위해 창을 전면으로 드래그할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="요소 패널에서 창 재배치하기", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Chromium issue: [1146146](https://crbug.com/1146146)


## 브라우저 밖의 색상 선택하기 {: #color }

DevTools 에서 브라우저 밖의 색상을 선택할 수 있게 지원합니다. 이전에는 브라우저 내 색상만 선택할 수 있었습니다.

**Styles** 창에서 아무 색상 프리뷰를 클릭하여 컬러 피커를 여세요. 스포이드를 사용하여 어디서나 색상을 선택할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="브라우저 밖의 색상 선택하기", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Chromium issue: [1245191](https://crbug.com/1245191)


## 디버깅 중 인라인 값 미리보기 개선 {: #inline-preview }

디버거에서 인라인 값 미리보기를 정확하게 보여줍니다.

다음 예제에서, `double` 함수는 입력 인자로 `a` 와 변수인 `x` 를 가지고 있습니다. `return` 라인에 브레이크포인트를 걸고 코드를 실행해보세요. 인라인 미리보기에서 `a` 와 `x` 값을 정확하게 보여줍니다. 이전에는 디버거가 인라인 미리보기에서 `x` 값을 보여주지 않았습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="디버깅 중 인라인 값 미리보기 개선", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Chromium issue: [1316340](https://crbug.com/1316340) 


## 가상 인증자를 위한 대용량 Blob 지원 {: #webauthn }

가상 인증자를 지원하기 위해 [WebAuthn](/docs/devtools/webauthn/) 탭에 새로 **Supports large blob** 체크박스가 추가되었습니다.

이 체크박스는 비활성화 상태가 기본입니다. 레지던트 키를 지원하는 `ctap2` 프로토콜을 사용한 인증자만 지원하고 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt=" 가상 인증자를 위한 대용량 Blob 지원", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Chromium issue: [1321803](https://crbug.com/1321803) 


## 소스 패널에서 새로운 키보드 단축키 지원 {: #shortcuts }

**소스** 패널에서 키보드 단축키를 두가지 더 지원합니다.

- 좌측 **navigation** 사이드바 토글하기 <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- 우측 **navigation** 사이드바 토글하기 <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="소스 패널에서 새로운 키보드 단축키 지원", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Chromium issues: [1226363](https://crbug.com/1226363)


## 소스맵 개선 {: #sourcemaps }
 
 이전에는 개발자가 다음과 같은 상황에서 불규칙한 오류를 겪었습니다.
 
- [Codepen](https://codepen.io/) 예제를 디버깅할 때
- [Codepen](https://codepen.io/) 예제에서 성능 이슈의 소스 위치를 특정할 때
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 가 활성화되어있을 때 **Component** 탭의 부재

디버깅 경험의 전반을 개선하기 위해 소스맵을 일부 수정하였습니다.
 
- 인라인 스크립트 및 소스 위치에 대한 위치에 오프셋 간의 올바른 매칭
- 프레임의 텍스트 위치에 대한 대체 정보 사용
- 프레임의 URL로 상대 url을 적절하게 해결  
 
{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Chromium issues: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)  

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
