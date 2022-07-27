---
layout: layouts/doc-post.njk
title: 신뢰 토큰
subhead: 신뢰 토큰은 패시브 추적 없이 사기를 방지하고 실제 사람과 봇을 구별하는 데 도움을 주는 새로운 API입니다.
description: Trust Tokens API를 사용하면 사용자를 식별하거나 두 컨텍스트 간의 ID를 연결하지 않고도 한 컨텍스트의 사용자 신뢰를 다른 컨텍스트로 전달할 수 있습니다. 이 API를 통해 출처에서 신뢰된 사용자에게 암호화 토큰을 발급할 수 있습니다. 토큰은 사용자의 브라우저에 의해 저장됩니다. 그러면 브라우저는 다른 컨텍스트에서 토큰을 사용하여 사용자의 신뢰성을 평가할 수 있습니다.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## 구현 현황

- [최초 평가판](https://web.dev/origin-trials/) Chrome 84 ~ 94
- [평가판에 등록](/origintrials/#/view_trial/2479231594867458049)
- [데모](https://trust-token-demo.glitch.me/)
- [Chrome DevTools 통합](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token)
- [Chrome 플랫폼 현황](https://www.chromestatus.com/feature/5078049450098688)

## 신뢰 토큰이란 무엇입니까?

{% YouTube id='bXB1Iwq6Eq4' %}

신뢰 토큰을 사용하면 사용자의 진위성에 대한 신뢰를 한 컨텍스트에서 다른 컨텍스트로 전달하여 사이트에서 패시브 추적 없이 사기를 방지하고 실제 사람과 봇을 구별할 수 있도록 합니다.

- **발행자** 웹사이트는 예를 들어 지속적인 계정 사용, 거래 완료 또는 수용 가능한 [reCAPTCHA 점수](https://developers.google.com/recaptcha) 획득 등을 통해 신뢰를 보여주는 사용자의 웹 브라우저에 토큰을 발행할 수 있습니다.
- **회수자** 웹사이트는 사용자에게 회수자가 신뢰하는 발행자 토큰이 있는지 확인한 다음 필요에 따라 토큰을 회수하여 사용자가 가짜가 아님을 확인할 수 있습니다.

신뢰 토큰은 암호화되므로 개인을 식별하거나 신뢰할 수 있는 인스턴스와 신뢰할 수 없는 인스턴스를 연결하여 사용자 ID를 알아낼 수 없습니다.

{% Aside 'caution' %} 신뢰 토큰은 reCAPTCHA 또는 사용자가 자신이 주장하는 사람이 맞는지 여부를 결정하는 기타 메커니즘을 대체하지 않습니다.

신뢰 토큰은 사용자에 대한 신뢰를 **구축**하는 것이 아니라 사용자에 대한 신뢰를 **전달**하는 방법입니다. {% endAside %}

## 신뢰 토큰이 필요한 이유는 무엇입니까?

웹에서는 사람을 가장하는 봇이나 실제 사람이나 서비스를 사취하는 악의적인 제3자가 아니라 사용자가 자신이 주장하는 사람이 맞다는 것을 보여주는 신뢰 신호를 수립하고 전달할 방법이 필요합니다. 사기 방지는 광고주, 광고 제공업체 및 [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/)에게 특히 중요합니다.

불행히도, 예를 들어 사이트와의 상호 작용이 실제 사람에 의한 것인지 확인하기 위해 신뢰성을 판정하고 전파하는 기존의 많은 메커니즘은 핑거프린팅에도 사용할 수 있는 기술을 활용합니다. 신뢰를 전달하는 메커니즘은 개인정보를 보호하여 개별 사용자에 대한 추적 없이 신뢰가 사이트 전체에 전파될 수 있도록 해야 합니다.

Trust Tokens API를 사용하면 웹사이트에서 신뢰하는 사용자에게 암호화 토큰을 발행할 수 있으며 나중에 다른 곳에서 이 토큰을 사용할 수 있습니다. 토큰은 사용자의 브라우저에 안전하게 저장되며 사용자의 진위를 확인하기 위해 다른 컨텍스트에서 사용할 수 있습니다. 이를 통해 사용자를 식별하거나 사이트 간에 ID를 연결하지 않고 한 웹사이트(예: 소셜 미디어 사이트 또는 이메일 서비스)에서 사용자의 신뢰를 다른 웹사이트(예: 게시자 또는 온라인 상점)로 전달할 수 있습니다.

{% Aside 'key-term' %} [핑거프린팅](https://w3c.github.io/fingerprinting-guidance/#passive)을 사용하면 사이트에서 장치, 운영 체제 및 브라우저 설정(예: 언어 기본 설정, [사용자 에이전트](https://developer.mozilla.org/docs/Web/API/NavigatorID/userAgent) 및 사용 가능한 글꼴) 또는 장치 상태 변경에 대한 데이터를 가져와 개별 사용자를 식별하고 추적할 수 있습니다. 이 작업은 요청 헤더를 확인하여 서버에서, 또는 JavaScript를 사용하여 클라이언트에서 수행할 수 있습니다.

핑거프린팅은 사용자가 인식하지 못하고 제어할 수 없는 메커니즘을 사용합니다. 지문 데이터를 결합하여 개인을 식별하는 방법을 알아보려면 [Panopticlick](https://panopticlick.eff.org/) 및 [amiunique.org](https://amiunique.org/)와 같은 사이트를 참조하세요. {% endAside %}

## 신뢰 토큰은 어떻게 작동합니까?

이 예에서 게시자 웹사이트는 광고를 표시하기 전에 사용자가 봇이 아니라 실제 사람인지 확인하려고 합니다.

1. 사용자가 웹사이트(**발급자**)를 방문하여 구매, 이메일 계정 사용 또는 reCAPTCHA의 성공적 완료와 같이 사이트에서 사용자가 실제 사람이라고 믿도록 하는 작업을 수행합니다.
2. 발급자 사이트는 Trust Tokens JavaScript API를 사용하여 사용자 브라우저에 대한 신뢰 토큰 요청을 트리거합니다.
3. 발급자 사이트는 토큰 데이터로 응답합니다.
4. 사용자의 브라우저는 신뢰 토큰에 대한 데이터를 안전하게 저장합니다.
5. 사용자가 다른 웹사이트(예: 뉴스 게시자)를 방문하고, 이 웹사이트에서 사용자가 실제 사람인지 확인하려는 합니다(예: 광고를 표시할 때).
6. 이 사이트는 Trust Tokens API를 사용하여 사용자의 브라우저에 사이트가 신뢰하는 발급자에 대해 저장된 신뢰 토큰이 있는지 확인합니다.
7. 사용자가 이전에 방문한 발행자에 대한 신뢰 토큰이 있습니다.
8. 게시자 사이트는 신뢰 토큰을 회수하기 위해 발급자에게 요청을 보냅니다.
9. 발급자 사이트가 회수 기록으로 응답합니다.
10. 게시자 사이트는 발급자가 사용자를 실제 사람인 것으로 신뢰한다는 것을 보여주는 회수 기록을 포함하여 광고 플랫폼에 요청을 보냅니다.
11. 광고 플랫폼은 광고를 표시하는 데 필요한 데이터를 제공합니다.
12. 게시자 사이트에서 광고를 표시됩니다.
13. 광고 조회 노출이 계산됩니다.

{% Aside %} 이 예제의 JavaScript 호출에 대한 자세한 내용은 [Sample API 사용](https://web.dev/trust-tokens/#sample-api-usage)을 참조하세요. {% endAside %}

---

## 참여 및 피드백 공유

- **최초 평가판**: 등록 후, [Chrome 최초 평가판](/origintrials/#/view_trial/2479231594867458049)에 참여하세요.
- **데모**: 신뢰 토큰 [발행 및 회수](https://trust-token-demo.glitch.me/)를 사용해 보세요.
- **GitHub**: [제안](https://github.com/WICG/trust-token-api)을 읽고 [질문을 제기하고 토론에 참여하세요](https://github.com/WICG/trust-token-api/issues).
- **W3C**: [웹 광고 개선 비즈니스 그룹](https://www.w3.org/community/web-adv/participants)에서 업계 사용 사례에 대해 논의하세요.
- **IETF**: IETF [Privacy Pass 작업 그룹](https://datatracker.ietf.org/wg/privacypass/about/)에서 기본 프로토콜에 대한 기술적 의견을 제공하세요.
- **개발자 지원**: [개인정보 보호 샌드박스 개발자 지원 저장소](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)에서 질문을 하고 토론에 참여하세요.

## 더 많은 리소스 찾아보기

- [Trust Token API 기술 설명자](https://github.com/dvorak42/trust-token-api)
- [신뢰 토큰 시작하기](https://web.dev/trust-tokens/): 웹 개발자를 위한 개요
- [Chrome의 최초 평가판 시작하기](https://web.dev/origin-trials)
- [개인정보 보호 샌드박스 자세히 알아보기](https://web.dev/digging-into-the-privacy-sandbox)
