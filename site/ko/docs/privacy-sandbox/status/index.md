---
layout: 'layouts/doc-post.njk'
title: 준비가 되었나요?
subhead: Privacy Sandbox API의 구현 상태
description: Privacy Sandbox API의 구현 상태입니다. 최종 업데이트 2021-05-18.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} 각 API에 대해 여러 개의 개별적인 최초 평가 기간이 있을 수 있습니다. {% endAside %}

## 기여 보고

*이전에는 전환 측정이라고 했습니다.*

- [현재 최초 평가판](https://web.dev/origin-trials/): Chrome 86에서 [이제 Chrome 93으로 확장](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM)되었습니다.
- [최초 평가판에 등록](/origintrials/#/view_trial/3411476717733150721)
- [데모](https://goo.gle/demo-event-level-conversion-measurement-api)
- [Chrome 플랫폼 현황](https://www.chromestatus.com/features/6412002824028160)
- [Blink 상태](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement)
- [GitHub](https://github.com/WICG/conversion-measurement-api/): API 질문 및 토론에 대한 [이슈](https://github.com/WICG/conversion-measurement-api/issues)를 참조하세요.

### 상태: 세부 정보

[현황](/docs/privacy-sandbox/attribution-reporting-introduction/#status)을 참조하세요.

### 모든 리소스

- [기여 보고(전환 측정)](/docs/privacy-sandbox/attribution-reporting)
- [기여 보고(전환 측정) 소개](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API 기술 설명자](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ 사용되지 않음) [광고 전환을 측정하는 보다 안전한 방법](https://web.dev/conversion-measurement/): 웹 개발자를 위한 이 API의 첫 버전의 개요
- (⚠️ 사용되지 않음) [광고 전환을 측정하는 보다 안전한 방법 - 비디오](https://www.youtube.com/watch?v=jcDfOoWwZcM): 이 API 첫 버전의 데모(클릭만)
- (⚠️ 사용되지 않음) [이벤트 전환 측정 API 사용](https://web.dev/using-conversion-measurement/): 웹 개발자가 이 API의 첫 버전으로 실험하는 방법
- [개인정보 보호 샌드박스 자세히 알아보기](https://web.dev/digging-into-the-privacy-sandbox)

## 신뢰 토큰

- [현재 최초 평가판](https://web.dev/origin-trials/): Chrome 84에서 [이제 Chrome 94로 확장](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ)되었습니다.
- [최초 평가판에 등록](/origintrials/#/view_trial/2479231594867458049)
- [데모](https://trust-token-demo.glitch.me/)
- [Chrome 플랫폼 현황](https://www.chromestatus.com/feature/5078049450098688)
- [Blink 상태](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens)
- [GitHub](https://github.com/WICG/trust-token-api): API 질문 및 토론에 대한 [이슈](https://github.com/WICG/trust-token-api/issues)를 참조하세요.
- [Chrome DevTools 통합](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)
- 자세히 알아보기: [신뢰 토큰 시작하기](https://web.dev/trust-tokens/)

## 자사 세트

- [현재 최초 평가판](https://web.dev/origin-trials/) Chrome 89 ~ 93
- [최초 평가판에 등록](/origintrials/#/view_trial/988540118207823873)
- [Chrome 플랫폼 현황](https://chromestatus.com/feature/5640066519007232)
- [Blink 상태](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets)
- [API 제안](https://github.com/privacycg/first-party-sets): API 질문 및 토론에 대한 [이슈](hhttps://github.com/privacycg/first-party-sets/issues)를 참조하세요.
- 자세히 알아보기: [Chromium 프로젝트: 자사 세트](https://www.chromium.org/updates/first-party-sets)

## FLOC

- 초기 [최초 평가](https://web.dev/origin-trials)가 현재 종료되었습니다. 업데이트된 내용은 [실험 의도](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs)를 참조하세요.
- 초기 버전의 [데모](https://floc.glitch.me/)(최초 평가판은 현재 종료됨)
- [Blink 상태](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc)
- [API 제안](https://github.com/WICG/floc)이 [WICG](https://www.w3.org/community/wicg/) 및 이익 단체에서 논의 중
- [GitHub](https://github.com/WICG/floc): API 질문 및 토론에 대한 [이슈](https://github.com/WICG/floc/issues)를 참조하세요.
- [Chrome 플랫폼 현황](https://www.chromestatus.com/features/5710139774468096)
- 자세히 알아보기: [FLoC란 무엇입니까?](https://web.dev/floc/)

## FLEDGE

[TURTLEDOVE](https://github.com/WICG/turtledove)의 후속 개념입니다.

- [프로토타입 의도](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ)
- [Blink 상태](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge)
- [API 제안](https://github.com/WICG/turtledove/blob/main/FLEDGE.md)이 [WICG](https://www.w3.org/community/wicg/) 및 이익 단체에서 논의 중
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): API 질문 및 토론에 대해서는 [TURTLEDOVE 이슈](https://github.com/WICG/turtledove/issues)를 참조하세요.

<br>

---

## 더 많은 리소스 찾아보기

### Blink, Chromium 및 Chrome

- [Chrome 출시 일정](https://www.chromestatus.com/features/schedule)
- [Chromium에서 새 기능을 출시하기 위한 프로세스](https://www.chromium.org/blink/launching-features)
- [설명 의도: Blink 배송 프로세스의 이해](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): Chromium에서 사용하는 렌더링 엔진인 Blink의 기능 구현 현황과 토론
- [Chromium 코드 검색](https://source.chromium.org/)

### 최초 평가판

- [Chrome의 최초 평가판 시작하기](https://web.dev/origin-trials/)
- [타사 최초 평가판이란 무엇입니까?](https://web.dev/third-party-origin-trials)
- [Chrome 최초 평가판 문제 해결](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [웹 개발자를 위한 최초 평가판 가이드](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [최초 평가판 설명자](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [최초 평가판 실행](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
