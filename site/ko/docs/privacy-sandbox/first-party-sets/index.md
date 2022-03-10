---
layout: 'layouts/doc-post.njk'
title: 자사 세트
subhead: 동일한 엔터티가 소유하고 운영하는 관련 도메인 이름이 동일한 자사에 속하는 것으로 선언할 수 있습니다.
description: 자사 세트를 사용하면 동일한 엔터티가 소유하고 운영하는 관련 도메인 이름이 동일한 자사에 속하는 것으로 선언할 수 있습니다.
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## 구현 현황

- [최초 평가판](https://web.dev/origin-trials/) Chrome 89 ~ 93
- [최초 평가판에 등록](/origintrials/#/view_trial/988540118207823873)
- [Chrome 플랫폼 현황](https://chromestatus.com/feature/5640066519007232)
- [Chromium 프로젝트](https://www.chromium.org/updates/first-party-sets)

## 자사 세트가 필요한 이유는 무엇입니까?

{% YouTube id='cNJ8mZ-J3F8' %}

웹페이지는 여러 [출처](/docs/privacy-sandbox/glossary#origin)의 콘텐츠로 구성됩니다. 일부 콘텐츠는 자사이며 사용자가 방문하는 최상위 사이트에서 가져옵니다. 다른 콘텐츠는 광고, 포함된 미디어 또는 [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/)의 JavaScript 라이브러리와 같은 공유 리소스 등의 타사에서 제공될 수 있습니다. 타사는 [쿠키](/docs/privacy-sandbox/glossary#origin)와 같은 메커니즘을 사용하여 여러 사이트에서 사용자 활동의 상관 관계를 파악하려고 할 수도 있습니다.

브라우저는 사이트 간 컨텍스트 내에서 사용자 ID에 대한 액세스를 제한하는 개인정보 보호 모델을 제안하고 있습니다. 그러나 많은 조직에는 여러 국가의 도메인(예: `example.com` 및 `example.co.uk`)과 같이 도메인 이름이 서로 다른 관련 사이트가 있습니다. 적절한 관계(일반적으로 공통된 소유권)를 가진 관련 도메인 이름이 자신을 동일한 자사에 속하는 것으로 선언하도록 허용할 수 있어야 합니다. 그래야 브라우저가 자사와 타사가 다르게 취급되는 상황에서 해당 도메인을 자사로 취급할 수 있을 것입니다.

어떤 솔루션이든 시스템 악용을 방지해야 합니다. 예를 들어, 소유자가 다른 관련이 없는 사이트를 포함한 조직은 선언할 수 없게 하여 자사 권한이 주어지지 않게 해야 합니다.

## 자사 세트는 어떻게 작동합니까?

웹사이트는 다른 도메인과의 관계를 정의하는 매니페스트 파일, 즉 JSON 파일을 `.well-known/first-party-set` 주소에 제공하여 웹 도메인 세트의 구성원(또는 소유자)임을 선언할 수 있습니다.

`a.example`, `b.example` 및 `c.example`이 `a.example`이 소유한 자사 세트를 구성하려 한다고 가정하겠습니다. 그러면 이들 사이트는 다음 리소스를 제공합니다.

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
	"owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
	"owner": "a.example"
}
```

소유자 도메인은 해당 구성원 도메인을 나열하는 매니페스트 파일을 호스팅합니다. 브라우저는 구성원 웹사이트에 소유자를 지정하도록 요청한 다음 소유자의 매니페스트를 확인하여 관계를 확인할 수 있습니다.

브라우저 정책은 남용이나 악용을 방지해야 합니다. 예를 들어, 자사 세트는 관련되지 않은 사이트 간에 사용자 정보를 교환하거나 동일한 엔터티가 소유하지 않은 사이트를 그룹화하지 않아야 합니다. 사이트를 등록하는 한 가지 가능한 방법은 사이트에서 브라우저 정책을 충족하는 데 필요한 정보와 함께 제안된 도메인 그룹을 공개 추적기(예: 전용 GitHub 저장소)에 제출하는 것입니다. 또한, 구성원 도메인에 대한 소유자의 통제권을 확인하려면 세트에 있는 각 도메인에서 `.well-known` URL에 챌린지를 제공해야 할 수 있습니다.

자사 세트에 대한 보완적 제안은 `SameParty` 쿠키 특성입니다. `SameParty` 특성을 지정하면 해당 컨텍스트가 최상위 컨텍스트와 동일한 자사 세트의 일부일 때 쿠키를 포함하도록 브라우저에 지시합니다.

예를 들어 위에서 설명한 자사 세트의 경우 a.example은 다음 쿠키를 설정할 수 있습니다.

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

즉, b.example 또는 c.example의 방문자가 a.example에 요청을 하면 해당 요청에 `session` 쿠키가 포함됩니다.

---

## 참여 및 피드백 공유

- **최초 평가판**: 등록 후, [Chrome 최초 평가판](/origintrials/#/view_trial/988540118207823873)에 참여하세요.
- **GitHub**: [제안](https://github.com/privacycg/first-party-sets)을 읽고 [질문을 제기하고 토론에 참여하세요](https://github.com/privacycg/first-party-sets/issues).
- **개발자 지원**: [개인정보 보호 샌드박스 개발자 지원 저장소](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)에서 질문을 하고 토론에 참여하세요.

## 더 많은 리소스 찾아보기

- [자사 세트 기술 설명자](https://github.com/privacycg/first-party-sets)
- [Chrome 플랫폼 현황](https://chromestatus.com/feature/5640066519007232)
- [Chromium 프로젝트](https://www.chromium.org/updates/first-party-sets)
