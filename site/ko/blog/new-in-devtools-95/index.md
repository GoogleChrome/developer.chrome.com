---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 95)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
  "새 CSS 길이 작성 도구, 문제 탭에서 문제 숨기기 기능, 속성 표시 방법 개선 및 다른 새로운 기능들."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/j60zqojAh4GHLDEeiqJU.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

*이 게시글의 번역에는 [조은](https://developers.google.com/community/experts/directory/profile/profile-eun-cho)님이 참여하였으며, [이지웅](https://bit.ly/JiwoongLeePortfolio)님과 [최원영](https://www.linkedin.com/in/toruchoi)님, 그리고 [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

## 새 CSS 길이 작성 도구 {: #length }

DevTools 에 CSS 길이를 더 쉽고 유연하게 변경할 수 있는 방법이 추가되었습니다.

**스타일** 영역에서, `height` 나 `padding` 과 같은 길이를 포함한 CSS 속성을 살펴보세요.

단위 유형 위로 마우스를 가져가면 단위 유형에 밑줄이 표시됩니다. 단위 유형을 클릭하여 드롭다운에서 단위 유형을 선택합니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

단위 값에 마우스를 가져가면 마우스 포인터가 좌우 화살표 커서로 바뀝니다. 커서를 좌우로 드래그해서 값을 늘리거나 줄일 수 있습니다.
값을 10 단위로 조정하고 싶다면 <kbd>Shift</kbd> 키를 누른채로 드래그하세요.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

단위 값을 텍스트로도 변경할 수 있습니다. 값을 클릭하고 변경하세요.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Chromium issues: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


## 문제 탭에서 문제 숨기기 {: #hide-issues }

문제 탭에서 특정 문제를 숨김으로써 중요한 문제에만 집중할 수 있습니다.

[문제 탭](/docs/devtools/issues/) 에서 숨기려는 문제 위로 마우스를 가져갑니다. **더보기** 에 있는 &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="더보기", width="4", height="20" %} &nbsp; > **비슷한 문제 숨기기** 를 클릭하세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="비슷한 문제 숨기기 메뉴", width="800", height="488" %}

모든 숨겨진 문제들은 **숨겨진 문제** 영역 아래에 추가됩니다. 영역을 펼쳐 보세요. 모든 숨겨진 문제를 한 번에 숨김 해제하거나, 개별로 숨김 해제할 수 있습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="숨겨진 문제 영역", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Chromium issue: [1175722](https://crbug.com/1175722)


## 속성 표시 개선 {: #properties }

DevTools 에서 속성을 표시하는 방식을 개선했습니다.

- **콘솔**, **소스** 패널 및 **속성** 영역에서 해당 객체가 보유한 속성은 굵게 표시하고 최상단에서 보여줍니다.
- **속성** 영역에서 속성을 1차원으로 보여 줍니다.

예를 들어, 아래 코드 조각을 살펴보면 `user` 와 `sccess` 라는 속성을 가지고, 상속받은 속성인 `search` 의 값을 변경한 `link` 라는 [`URL`](https://developer.mozilla.org/docs/Web/API/URL) 객체를 만들었습니다.

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

**콘솔** 에서 `link` 를 로깅해보세요. 객체의 자체 속성은 굵게 표시되고 첫번째로 노출됩니다.
이러한 변경을 통해 커스텀 속성을 더 쉽게 찾을 수 있습니다.
특히 상속되는 속성이 많은 [Web APIs](https://developer.mozilla.org/docs/Web/API) (예: `URL`)에서 유용합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="자체 속성은 굵게 표시되고, 첫번째로 노출됩니다.", width="800", height="561" %}

위의 변경사항 외에도, **속성** 영역의 속성도 1차원화 되었습니다.
이를 통해 DOM 속성 디버깅 경험을 개선하였으며, 특히 [Web components](https://www.webcomponents.org/introduction) 에서 유용합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="속성 플래튼", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Chromium issues: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


## Lighthouse 8.4 {: #lighthouse }

Lighthouse 패널이 이제 Lighthouse 8.4로 업데이트 되었습니다. 
이제 Lighthouse에서 [Largest Containful Paint (LCP)](https://web.dev/lcp) 요소가 레이지 로딩된 이미지인지 감지하고
해당 요소에서 `loading` 속성을 제거할 것을 권장합니다.

전체 변경사항은 [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) (영문) 를 참고하세요.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="Lighthouse 보고서에서 레이지 로딩된 LCP 측정", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Chromium issue: [772558](https://crbug.com/772558)


## 소스 패널에서 스니펫 정렬 {: #snippets }

**소스** 패널 안에 있는 **스니펫** 영역의 [스니펫](/docs/devtools/javascript/snippets/) 들은 이제 알파벳 순으로 정렬됩니다. 

커맨드를 통해 더 빠르게 스니펫 기능을 실행할 수 있습니다. [tip](https://youtu.be/NOal2gTzftI?t=176) (영문) 영상을 참고하세요!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="소스 패널에서 스니펫 정렬", width="800", height="475" %}

Chromium issue: [1243976](https://crbug.com/1243976)


## 번역된 릴리즈 정보와 번역 오류 제보를 위한 링크들 {: #localized }

새로운 기능 탭에서 총 6개 언어 ([러시아어](/ru/blog/new-in-devtools-95), [중국어](/zh/blog/new-in-devtools-95), [스페인어](/es/blog/new-in-devtools-95), [일본어](/ja/blog/new-in-devtools-95), [포르투갈어](/pt/blog/new-in-devtools-95), [한국어](/ko/blog/new-in-devtools-95)) 로 번역된 DevTools 릴리즈 노트를 클릭하여 읽을 수 있습니다.

Chrome 94 부터 DevTools 에서 [선호하는 언어를 설정](/ko/blog/new-in-devtools-94/#localized) 할 수 있습니다.
번역 관련 문제를 발견하였다면, **더 보기** > **도움말** > **번역 문제 신고** 를 통해 [번역 문제를 제보](https://goo.gle/devtools-translate) 하여 더 나은 번역을 만들기 위해 도와주세요.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="번역된 릴리스 정보로 이동하는 링크 및 번역 관련 버그 제보", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Chromium issues: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481) 


## DevTools 커맨드 메뉴 UI 개선 {: #command-menu }

[커맨드 메뉴](/docs/devtools/command-menu/#open) 에서 파일을 찾기 어려웠던 경험을 해보신 적이 있으셨나요?
좋은 소식이 있습니다. 이제 **커맨드 메뉴** UI가 개선되었습니다!

**커맨드 메뉴** 를 열고, Windows, Linux 에서는 <kbd>Control</kbd>+<kbd>P</kbd>, MacOS 에서는 <kbd>Command</kbd>+<kbd>P</kbd> 단축키를 사용하여 파일을 찾을 수 있습니다.

**커맨드 메뉴** UI 개선 작업은 계속 진행되고 있습니다. 업데이트를 계속 지켜봐주세요!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="커맨드 메뉴", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Chromium issue: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
