---
layout: layouts/doc-post.njk
title: 프라이버시 샌드박스란 무엇입니까?
subhead: 프라이버시 샌드박스는 타사 쿠키 또는 기타 추적 메커니즘 없이 교차 사이트 사용 사례를 충족시켜주는 일련의 제안입니다.
description: "내용, 참여 방법 및 용도."
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## 개인정보 보호 샌드박스가 필요한 이유는 무엇입니까?

개인정보 보호 샌드박스 이니셔티브에는 두 가지 핵심 목표가 있습니다.

- 사이트 전체에서 사용자를 추적할 수 없게 하고 사용자가 알지 못하는 사이트 간 추적을 방지하면서 웹 사용 사례와 비즈니스 모델을 지원하는 대체 솔루션을 개발합니다.
- 새로운 솔루션이 정착되면 타사 쿠키에 대한 지원을 단계적으로 중단합니다.

## 개인정보 보호 샌드박스 제안이란 무엇입니까?

Chrome 및 기타 생태계 관련자들이 지금까지 30개 이상의 제안을 제공했으며 [W3C 그룹의 공개 리소스](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this)에서 찾을 수 있습니다. 이러한 제안은 다양한 사용 사례와 요구 사항을 포괄합니다.

Chrome 팀에서 개발한 주요 제안은 다음과 같습니다.

### 관련 콘텐츠 및 광고

- [**FLoC**](/docs/privacy-sandbox/floc): 개인정보를 보호하는 관심 기반 광고와 콘텐츠 선택: "관련 광고"
- [**FLEDGE**](/docs/privacy-sandbox/fledge): 리마케팅을 위한 광고 선택. [TURTLEDOVE](https://github.com/WICG/turtledove)의 후속 개념

### 측정 및 기여

- [**기여 보고**](/docs/privacy-sandbox/attribution-reporting): 광고 클릭 또는 광고 조회를 전환과 상호 관련시킵니다. 이전에는 이것을 Event Conversion Measurement API라고 불렀습니다. 이벤트 수준 및 집계의 두 가지 유형의 보고서가 지원됩니다.

### 자사 보호

- [**SameSite 쿠키 변경**](https://web.dev/samesite-cookies-explained/): 사이트 간 쿠키를 명시적으로 표시하여 사이트를 보호합니다.
- [**자사 세트**](/docs/privacy-sandbox/first-party-sets): 동일한 엔터티가 소유한 관련 도메인 이름이 자신을 동일한 자사에 속하는 것으로 선언할 수 있게 합니다.

### 사기 감지

- [**신뢰 토큰**](/docs/privacy-sandbox/trust-tokens): 사기를 방지하고 봇을 사람과 구분하기 위해 한 컨텍스트에서 다른 컨텍스트로 사용자에 대한 신뢰를 전달합니다.

### 데이터 수집 제한

- [**개인정보 보호 예산**](https://www.youtube.com/watch?v=0STgfjSA6T8): 웹사이트가 사용자의 브라우저 또는 장치에 대한 정보를 얻을 수 있도록 허용하지만 사이트가 액세스할 수 있는 총 정보량에 대한 할당량을 브라우저에서 설정할 수 있도록 하여 사용자를 식별하지 못하게 합니다.
- [**사용자-에이전트 클라이언트 힌트**](https://web.dev/user-agent-client-hints/): [사용자-에이전트](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent)(UA) 문자열은 중요한 패시브 [핑거프린팅](https://w3c.github.io/fingerprinting-guidance/#passive) 표면이며 처리가 까다롭습니다. 클라이언트 힌트를 사용하면 개발자가 사용자-에이전트 문자열에서 데이터 구문을 분석할 필요 없이 사용자의 장치 또는 조건에 대해 필요한 정보만 능동적으로 요청할 수 있습니다.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): 사용자의 IP 주소에 액세스하여 개별 사용자를 식별할 가능성을 제한합니다. 제안에는 두 부분이 있습니다: [<strong data-md="">의도적 IP 가림</strong>](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md)은 웹사이트가 브라우저에 사용자와 IP 주소를 연결하지 않음을 알릴 수 있는 방법을 제공하고, [**근접 경로 NAT**](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md)는 사용자 그룹이 동일한 비공개 처리 서버를 통해 트래픽을 보낼 수 있게 하여 사이트 호스트로부터 해당 IP 주소를 효과적으로 숨길 수 있는 방법입니다. Gnatcatcher는 또한 남용 방지와 같은 합법적인 목적으로 IP 주소에 액세스해야 하는 사이트가 인증 및 감사를 통해 그렇게 할 수 있도록 합니다.

### 신원

- [**WebID**](https://github.com/WICG/WebID): 사용자가 명시적으로 동의하지 않는 한 사용자의 이메일 주소나 기타 식별 정보를 타사 서비스 또는 웹사이트와 공유하지 않고 페더레이션 ID(사용자가 타사 서비스를 통해 웹사이트에 로그인할 수 있는 경우)를 지원합니다. WebID를 사용하면 사이트 전체에서 사용자를 식별하고 추적하는 데 사용될 수 있는 리디렉션, 팝업 또는 타사 쿠키를 사용하지 않고 페더레이션 로그인이 가능합니다.

## 누가 개인정보 보호 샌드박스 작업을 수행하고 있습니까?

2021년 초 현황:

- Chrome 및 기타 업체에서 30개 이상의 개인정보 보호 샌드박스 제안을 제공
- [웹 광고 개선 비즈니스 그룹](https://www.w3.org/community/web-adv/participants) 및 [개인정보 보호 커뮤니티 그룹](https://www.w3.org/community/privacycg/participants)을 포함하여 W3C 그룹에 참여한 400명 이상의 참가자들이 의견 제공
- Chrome에서 5가지 API 구현을 테스트해볼 수 있음

## API는 언제 구현됩니까?

이 사이트의 [구현 현황](/docs/privacy-sandbox/status/) 페이지에 개별 API에 대한 진행 상황 업데이트가 제공됩니다.

---

## 참여 및 피드백 공유

- **GitHub**: GitHub에서 제안에 대한 설명자를 읽고 설명자의 이슈 탭에서 질문이나 의견을 올리세요.<br> [설명자 링크](#explainers)는 아래에 제공됩니다.
- **W3C**: W3C [웹 광고 개선 비즈니스 그룹](https://www.w3.org/community/web-adv/), [개인정보 보호 커뮤니티 그룹](https://www.w3.org/community/privacycg/participants) 및 [웹 인큐베이터 커뮤니티 그룹](https://github.com/WICG)에서 사용 사례를 논의하고 업계 피드백을 공유할 수 있습니다.
- **개발자 지원**: <a href="https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support">개인정보 보호 샌드박스 개발자 지원 저장소</a>에서 질문을 하고 토론에 참여하세요.

## 더 많은 리소스 찾아보기

### 개인정보 보호 샌드박스 제안 설명자 {: #explainers }

API 제안 설명자에는 특히 누락된 사용 사례와 목표 달성을 위한 보다 안전한 방법을 제안하는 피드백이 필요합니다. 각 설명자의 이슈 탭에서 의견을 작성하거나 질문할 수 있습니다.

- [개인정보 보호 예산](https://github.com/bslassey/privacy-budget)
- [신뢰 토큰](https://github.com/dvorak42/trust-token-api)
- [자사 세트](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [집계 보고 API](https://github.com/csharrison/aggregate-reporting-api)
- [기여 보고](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### 웹 개발자를 위한 기사와 비디오

- [개인정보 보호 샌드박스 자세히 알아보기](https://web.dev/digging-into-the-privacy-sandbox)
- [SameSite 쿠키 설명](https://web.dev/samesite-cookies-explained/)
- [신뢰 토큰 시작하기](https://web.dev/trust-tokens)
- [광고 전환을 측정하는 보다 안전한 방법](https://web.dev/conversion-measurement/)
- [FLoC란 무엇입니까?](https://web.dev/floc/)
- [개인정보 보호 예산 소개](https://www.youtube.com/watch?v=0STgfjSA6T8)

### 제안의 원칙과 개념

- [웹을 위한 잠재적 개인정보 보호 모델](https://github.com/michaelkleber/privacy-model)은 API의 기본이 되는 핵심 원칙을 설명합니다.
- [개인정보 보호 샌드박스](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- 개인정보 보호 샌드박스 개요: [더 안전한 웹 구축](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Google AI 블로그: [페더레이션 학습: 중앙 집중식 학습이 없는 협력적 머신러닝 학습](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [타사 쿠키의 미래](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
