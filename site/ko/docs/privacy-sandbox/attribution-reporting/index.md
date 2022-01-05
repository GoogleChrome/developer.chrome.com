---
layout: 'layouts/doc-post.njk'
title: 기여 보고
subhead: '사이트 간 식별자를 사용하지 않고 사용자 동작(예: 광고 클릭 또는 조회)이 전환으로 이어지는 시점을 측정합니다.'
description: 'Attribution Reporting API를 사용하면 사이트 간 식별자를 사용하지 않고도 사용자 동작(예: 광고 클릭 또는 조회)이 전환으로 이어지는 시점을 측정할 수 있습니다.'
date: 2021-05-18
updated: 2021-08-24
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} Attribution Reporting API는 이전에 Conversion Measurement API로 불렸습니다. {% endAside %}

## 구현 현황

[현황](/docs/privacy-sandbox/attribution-reporting-introduction/#status)을 참조하세요.

## 용어 사전

{% Aside %}

 전체 [개인정보 보호 샌드박스 용어집](/docs/privacy-sandbox/glossary/)을 참조할 수 있습니다.

{% endAside %}

- **애드테크 플랫폼**: 브랜드 또는 대행사가 디지털 광고를 타겟팅, 전달 및 분석할 수 있도록 하는 소프트웨어 및 도구를 제공하는 회사입니다.
- **광고주**: 광고 비용을 지불하는 회사입니다.
- **게시자**: 웹사이트에 광고를 게시하는 회사입니다.
- **클릭 후 전환**: 광고 클릭에 의해 이루어진 전환입니다.
- **조회 후 전환**: 광고 노출에 의해 이루어진 전환입니다(사용자가 광고와 상호 작용하지 않으면 나중에 전환).

## 이 API에 대해 알아야 할 대상: 애드테크 플랫폼, 광고주 및 게시자

- [수요측 플랫폼](https://en.wikipedia.org/wiki/Demand-side_platform)(DSP) 또는 [데이터 관리 플랫폼](https://en.wikipedia.org/wiki/Data_management_platform)(DMP)과 같은 애드테크 플랫폼에서 현재 타사 쿠키에 의존하는 기능을 지원하기 위해 이 API를 사용할 수 있습니다.
- 광고 또는 전환 측정을 위해 맞춤 코드에 의존하는 광고주와 게시자는 이 API를 사용하여 기존 기술을 대체할 수 있습니다.
- 전환 측정을 위해 애드테크 플랫폼에 의존하는 광고주와 게시자는 API를 직접 사용할 필요가 없지만 이 API를 통합할 수 있는 애드테크 플랫폼으로 작업하는 경우 API를 이해하는 것이 좋을 수 있습니다.

{% Aside %} 광고와 관련이 없는 사용 사례가 있을 수 있습니다.  [참여](#engage)하여 사용 사례를 공유하세요! {% endAside %}

## 이 API가 필요한 이유는 무엇입니까? {: #why-is-this-api-needed }

오늘날 광고 전환 측정은 종종 [타사 쿠키](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies)에 의존합니다. 브라우저는 타사 쿠키에 대한 액세스를 제한하고 있는데, 타사 쿠키는 사이트 전체에서 사용자를 추적하고 사용자 개인정보를 유출하는 데 사용될 수 있기 때문입니다. 이 API는 타사 쿠키 없이 개인정보를 보호하는 방식으로 이러한 측정을 가능하게 합니다.

## Attribution Reporting API는 어떤 방식으로 작동하며 어떤 기능을 합니까?

{% Aside %} 이 API는 공개적으로 인큐베이션 및 개발 중이며 앞으로 변경될 수 있습니다. 여러분의 피드백을 환영합니다. [참여 방법](#engage)을 참조하세요. {% endAside %}

Attribution Reporting API를 사용하면 함께 연결된 두 이벤트, 즉 사용자가 광고를 보거나 클릭하는 것과 같은 게시자 웹사이트의 이벤트와 이후 광고주 사이트에서 전환을 측정할 수 있습니다.

이 API는 클릭 후 전환 기여 측정(현재 [최초 평가판](https://web.dev/conversion-measurement/#browser-support) 상태인 이 API의 첫 구현에서 사용 가능) 및 조회 후 전환 기여 측정([공개 설명자 참조](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting.md))을 지원합니다.

API는 다양한 사용 사례에 사용할 수 있는 두 가지 유형의 기여 보고서를 제공합니다.

- **이벤트 수준 보고서**는 특정 광고 클릭 또는 조회수(광고 측)를 전환 측 데이터와 연결합니다. 사이트 간에 사용자 ID가 결합되는 것을 방지하여 사용자 개인정보를 보호하기 위해 전환 측 데이터는 매우 제한적이며 데이터에 '노이즈'가 도입됩니다(즉, 매우 적은 일부분에만 무작위 데이터가 전송됨). 추가적인 개인정보 보호 조치로서 보고서가 시차를 두고 전송됩니다.
- **집계 보고서**는 광고 측의 특정 이벤트와 연결되지 않습니다. 이러한 보고서는 이벤트 수준 보고서보다 풍부하고 충실도가 높은 전환 데이터를 제공합니다. 암호화, 신뢰 분배 및 차등적 개인정보 보호 등 다양한 개인정보 보호 기술을 결합하여 사이트 간에 ID 결합 위험을 줄입니다. 두 보고서 유형을 동시에 사용할 수 있으며 서로 상호 보완적입니다. 이 API에서 설계된 다른 기능으로 [기기 간 기여 보고](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) 및 [앱-웹 기여 보고](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)가 있습니다.

## 참여 및 피드백 공유 {: #engage }

- **최초 평가판**: [첫 최초 평가판(클릭만)에 등록하거나](/origintrials/#/view_trial/3411476717733150721), 또는 [첫 데모(클릭만)를 참조하세요](https://goo.gle/demo-event-level-conversion-measurement-api).
- 더 많은 기능을 제공하고 Chrome에서 실험해 볼 수 있는(최초 평가판) 이 API의 다음 구현 내용을 계속해서 확인하려면 [개발자 메일링 리스트](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)에 등록하세요.
- **GitHub**: [제안](https://github.com/WICG/conversion-measurement-api/)을 읽고 [질문을 제기하고 토론에 참여하세요](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C**: [웹 광고 개선 비즈니스 그룹](https://www.w3.org/community/web-adv/participants)에서 업계 사용 사례에 대해 논의하고 [개인정보 보호 커뮤니티 그룹](https://www.w3.org/community/privacycg/)에 참여하여 WebKit/Safari API에 대한 토론을 벌이세요.
- **개발자 지원**: [개인정보 보호 샌드박스 개발자 지원 저장소](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)에서 질문을 하고 토론에 참여하세요.

## 더 많은 리소스 찾아보기

- [기여 보고(전환 측정) 소개](/docs/privacy-sandbox/attribution-reporting-introduction)
- [API 기술 설명자](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ 사용되지 않음) [광고 전환을 측정하는 보다 안전한 방법](https://web.dev/conversion-measurement/): 웹 개발자를 위한 이 API의 첫 버전의 개요
- (⚠️ 사용되지 않음) [광고 전환을 측정하는 보다 안전한 방법 - 비디오](https://www.youtube.com/watch?v=jcDfOoWwZcM): 이 API 첫 버전의 데모(클릭만)
- (⚠️ 사용되지 않음) [이벤트 전환 측정 API 사용](https://web.dev/using-conversion-measurement/): 웹 개발자가 이 API의 첫 버전으로 실험하는 방법
- [개인정보 보호 샌드박스 자세히 알아보기](https://web.dev/digging-into-the-privacy-sandbox)
- [Chrome DevTools로 API 디버그](/blog/new-in-devtools-93/#attribution-reporting)
