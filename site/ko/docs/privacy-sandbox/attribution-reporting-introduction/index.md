---
layout: 'layouts/doc-post.njk'
title: 기여 보고(전환 측정) 소개
subhead: Attribution Reporting API 소개 및 이를 이해하기 위한 주요 개념
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %} 이 API는 제안이며 시간이 지남에 따라 확장됩니다. 이 블로그 게시물은 현재 상태를 설명하며 API가 발전함에 따라 업데이트됩니다. {% endAside %}

업데이트:

- 2021년 초: 집계 보고서 및 조회 연결 측정이 제안에 추가되었습니다.
- 2021년 초: API의 이름이 "Attribution Reporting API"로 변경되었습니다.

{% Aside 'caution' %}

- 이 게시물은 광고 사용 사례에 중점을 두고 있지만 Attribution Reporting API는 광고와 관련이 없는 사용 사례도 제공할 수 있습니다.
- 이 API의 광고 사용 사례는 광고 클릭 또는 조회를 전환으로 연결하는 데 중점을 둡니다(전환 측정). {% endAside %}

## 소개

Attribution Reporting API를 사용하면 **광고 클릭 또는 조회**가 판매 또는 가입과 같이 광고주 사이트에서 **전환**으로 이어지는 경우를 측정할 수 있습니다. 이 API는 사이트 전체에서 개별 사용자를 식별하는 데 사용할 수 있는 타사 쿠키나 메커니즘에 의존하지 않습니다.

이 제안은 공개적으로 인큐베이션되고 있습니다. 제안 및 토론이 [WICG GitHub 저장소](https://github.com/WICG/conversion-measurement-api)에서 제공됩니다.

{% Aside %} 이 API는 타사 쿠키 또는 기타 사이트 간 추적 메커니즘 없이 타사 사용 사례를 충족하기 위한 일련의 제안인 개인정보 보호 샌드박스의 일부입니다. [개인정보 보호 샌드박스 제안](https://developers.chrome.com/docs/privacy-sandbox)을 참조하세요. {% endAside %}

## 이 API가 필요한 이유는 무엇입니까?

오늘날 광고 전환 측정은 종종 [타사 쿠키](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies)에 의존합니다. 브라우저는 타사 쿠키에 대한 액세스를 제한하고 있는데, 타사 쿠키는 사이트 전체에서 사용자를 추적하고 사용자 개인정보를 유출하는 데 사용될 수 있기 때문입니다. 이 API는 타사 쿠키 없이 개인정보를 보호하는 방식으로 이러한 측정을 가능하게 합니다.

## 누가 이 API에 대해 알아야 합니까?

- [수요측 플랫폼](https://en.wikipedia.org/wiki/Demand-side_platform)(DSP) 또는 [데이터 관리 플랫폼](https://en.wikipedia.org/wiki/Data_management_platform)(DMP)과 같은 애드테크 플랫폼에서 현재 타사 쿠키에 의존하는 기능을 지원하기 위해 이 API를 사용할 수 있습니다.
- 광고 또는 전환 측정을 위해 맞춤 코드에 의존하는 광고주와 게시자는 이 API를 사용하여 기존 기술을 대체할 수 있습니다.
- 전환 측정을 위해 애드테크 플랫폼에 의존하는 광고주와 게시자는 API를 직접 사용할 필요가 없지만 이 API를 통합할 수 있는 애드테크 플랫폼으로 작업하는 경우 API를 이해하는 것이 좋을 수 있습니다.

## Chrome DevTools로 API 오류 디버그

[Chrome 93부터 사용 가능합니다](/blog/new-in-devtools-93/#attribution-reporting) . Attribution Reporting API 오류는 이제 [문제 탭](/docs/devtools) 아래 [DevTools](/docs/devtools/issues/) 에서 보고됩니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="문제 탭의 속성 보고 API 오류", width="800", height="501" %}

## 참여

{% Aside %} **여러분의 참여가 필요합니다!** 이 API는 다양한 전환 측정과 최적화 사용 사례를 지원해야 할 수 있습니다. 이러한 사용 사례를 지원하는 솔루션이 공개적으로 논의되도록 하려면 생태계의 피드백이 매우 중요합니다. {% endAside %}

참여하려면 토론에 참여하고 API를 사용해 보세요. 두 가지를 모두 해주시면 가장 좋지만 API를 사용해 보았는지 여부에 관계없이 토론에 참여할 수 있습니다.

### 토론에 참여

- [격주 미팅에 참여하세요](https://github.com/WICG/conversion-measurement-api/issues/80)(2주에 한 번). 이 미팅에서 참가자는 API 설계 제안과 API가 다양한 측정 사용 사례를 지원할 수 있는 방식에 대해 논의합니다. 언제든지 다음 미팅 의제에 [주제를 추가](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit)할 수 있습니다. 누구나 이 토론에 참여할 수 있습니다. [WICG에 참여](https://www.w3.org/community/wicg/)하기만 하면 됩니다.
- 질문을 하거나 기능을 제안하거나 사용 사례에 대해 토론하려면 [이슈를 개설](https://github.com/WICG/conversion-measurement-api/issues/new)하세요. 이슈를 공식 제출하는 방법을 잘 모르겠으면 [이 이슈](https://github.com/WICG/conversion-measurement-api/issues/147) 및 [이 이슈](https://github.com/WICG/conversion-measurement-api/issues/68)와 같은 예를 참조하세요. [기존 이슈](https://github.com/WICG/conversion-measurement-api/issues)의 대화에 참여할 수도 있습니다.

### API 사용해보기

{% Aside 'caution' %}

Chrome에서 API를 실험하는 경우 **현재** 구현된 모든 기능에 액세스할 수 있습니다. [저장소](https://github.com/WICG/conversion-measurement-api/) 및 [미팅](https://github.com/WICG/conversion-measurement-api/issues/80)에서 논의된 모든 기능이 Chrome 최초 평가판에서 구현되는 것은 아닙니다. [현황](#status)에서 현재 기능 상태를 참조하세요. 또한, 실험에 사용할 수 있는 기능은 궁극적으로 API에서 지원할 기능의 일부이며 API가 공개적으로 인큐베이션되고 생태계 피드백이 수렴됨에 따라 변경될 수 있습니다.

{% endAside %}

#### 로컬에서 또는 데모로 실험

1. API를 브라우저에서 로컬로 활성화하려면 `#enable-experimental-web-platform-features` 플래그를 적용합니다. Chrome 플래그는 브라우저에 특정 실험 기능을 활성화하도록 지시하는 토글입니다. 이 플래그를 적용하려면 Chrome의 검색 창에 `chrome://flags/#enable-experimental-web-platform-features`를 붙여넣고 **Enable(사용)**을 클릭합니다.
2. 로컬에서 [데모](#demo)를 실행하거나 [라이브 데모](#demo)를 시도합니다.
3. [데모 코드를 분기](#demo)하여 사용자 지정하거나 처음부터 자체 데모를 빌드합니다.

#### 배포된 사이트에서 최종 사용자를 대상으로 실험

1. 사용 가능한 경우 [최초 평가판](/blog/origin-trials/)에 등록하여 최종 사용자용 API를 사용합니다. 최초 평가판을 사용하면 제한된 시간 동안 사용해 볼 수 있는 기능을 구축하기 위해 실험적 기능에 액세스할 수 있습니다. [제3자 최초 평가판](/blog/third-party-origin-trials/)을 통해 광고 제공 및 측정 제공자와 같은 제3의 행위자가 여러 사이트에서 API를 테스트할 수 있습니다. **이 API에 대해 현재 사용 가능한 최초 평가판을 보려면 [현황](#status)으로 이동하세요**. 향후 최초 평가판에 대한 정보를 얻으려면 [개발자를 위한 Attribution Reporting 메일링 리스트에](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)에 가입하세요.

2. API를 사이트 및 시스템에 통합합니다.

{% Aside %} 구현 관련 질문이 있는 경우 [개발자를 위한 Attribution Reporting 메일링 리스트](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)에 가입하여 질문하세요.

사용 사례에 대한 일반적인 기술 질문이 있는 경우 [개인정보 보호 샌드박스 개발 지원 저장소](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)에서 이슈를 개설하세요. {% endAside %}

## 데모

몇 가지 데모를 시도해 볼 수 있습니다.

- 이벤트 수준 보고서, 클릭만:

    - [라이브 데모](https://goo.gle/sppi-devrel-eventlevel)
    - 필요에 따라 [분기하고 사용자 지정](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize)할 수 있는 이 데모의 [소스 코드](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting)

## 사용 사례 및 기능

{% Aside %}

이 API는 진행 중인 작업이며 생태계에서 수렴하는 피드백 및 의견에 따라 앞으로 더 발전할 것입니다.

이 API가 지원하는 모든 기능은 제안입니다. 이러한 각 제안은 초기 브라우저 구현이 준비된 제안을 포함하여 **토론과 피드백에 열려 있습니다.**

이 API는 공개적으로 이큐베이션 및 개발 중입니다. 토론에 [참여해 보세요.](#participate)

{% endAside %}

이 API를 사용하면 사이트에서 다음과 같은 경우 전환을 측정할 수 있습니다.

- 광고 **클릭수** 및 **조회수**
- 타사 애드테크 제공자를 이용하는 게시자 사이트의 광고와 같은 **타사** iframe의 광고
- 소셜 네트워크 또는 검색 엔진 결과 페이지의 광고, 또는 자체 광고를 게재하는 게시자와 같은 **자사** 컨텍스트의 광고

유연한 **기여 모델**이 지원됩니다. [현황](#status)에서 자세한 내용을 참조하세요.

이 API는 광고주 또는 제3자 애드테크 제공자에게 보낼 수 있는 두 가지 유형의 보고서를 통해 다양한 형태의 통찰력을 제공합니다. 이 두 가지 유형의 보고서는 상호 보완적이며 동시에 사용할 수 있습니다.

**이벤트 수준 보고서**는 광고 클릭 또는 조회를 대략적인 전환 데이터와 연결합니다.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png", alt="이벤트 수준 보고서", width="400", height="180" %}<figcaption>이벤트 수준 보고서 예시: <code>news.example</code>에서 클릭 ID 200400600(<code>news.example</code>에서 사용자 ID Bob_Doe에 연결됨)은 <code>shop.example</code>에서 구매로 연결됩니다. </figcaption></figure>

이벤트 수준 보고서는 다음에 적합합니다.

- **최적화** 사용 사례. 이벤트 수준 보고서는 *"투자 수익을 어떻게 개선할 수 있습니까?"*와 같은 질문에 답하는 데 도움을 줍니다. 특히 보고서에서 광고 측의 고유 ID를 사용할 수 있으므로 광고 게재 위치를 최적화하는 데 사용할 수 있습니다. 이벤트 수준 보고서는 머신러닝 모델에 대한 훈련 데이터를 제공할 수 있습니다.
- 전환에 대한 정보가 거의 필요하지 않은 **대략적인 보고** 사용 사례. 현재 제한은 클릭수의 경우 전환 데이터 중 3비트(즉, 전환에 8개의 범주 중 하나를 할당할 수 있음), 조회수의 경우 1비트입니다. 따라서 특정 가격 또는 전환 시간과 같은 세분화된 전환 측 데이터의 인코딩은 이벤트 수준 보고서에서 지원되지 않습니다.
- **사기 탐지** 사용 사례. 일부 보고서의 데이터는 스팸 또는 유효하지 않은 활동을 식별하는 데 사용할 수 있는 패턴을 이해함으로써 광고 사기를 탐지하고 분석하는 데 유용할 수 있습니다.

반면에 **집계 보고서**는 클릭/조회 데이터와 전환 데이터를 결합하기 위한 보다 상세한 전환 데이터와 유연성을 제공합니다.

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="집계 보고서", width="400", height="180"%}   <figcaption>집계 보고서로부터 얻을 수 있는 통찰력의 예: <code>news.example</code>의 캠페인 ID 1234567은 <code>shoes.example</code>에서 518개의 전환, 그리고 $38174의 총 지출로 이어졌습니다. 전환의 절반은 미국 NYC의 사용자로부터 나왔습니다.</figcaption></figure>

집계 보고서는 **보고** 사용 사례에 가장 적합하며, *"내 투자 수익은 얼마입니까?"*와 같은 질문에 답하는 데 도움이 됩니다.<br> **최적화** 사용 사례에 대한 집계 보고서의 사용(예: 전환 데이터가 너무 대략적이어서 이벤트 수준 보고서에서 지원되지 않는 구매 가치에 최적화)은 활발히 연구가 진행 중인 영역입니다. [열린 질문](#open-questions)을 참조하세요.

{% Details %} {% DetailsSummary 'h3' %} 두 가지 유형의 보고서가 필요한 이유는 무엇입니까? {% endDetailsSummary %}

이벤트 수준 보고서는 사용자 개인 정보를 보호하기 위해 대략적인 전환 데이터만 제공합니다.

그러나 이 대략적인 데이터는 캠페인 효과를 측정하기에 충분하지 않을 수 있습니다. 마케터는 구매 가치, 전환한 사용자의 집계된 광고주 측 인구 통계, 구매한 제품의 범주, 전환된 사용자가 최초 고객인지 또는 반복 고객인지 여부, 장바구니 내용과 같은 전환에 대한 상세 정보를 알아야 할 수 있습니다.

이것이 집계 보고서가 설계된 이유입니다. {% endDetails %}

이 API에서 제안하는 다른 기능으로 [앱-웹 기여](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md)(앱에서 광고를 보거나 클릭하고 웹에서 전환) 및 [기기 간 기여](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md)(모바일에서 광고를 보거나 클릭하고 데스크톱에서 전환)가 있습니다.

{% Aside %} 타사 쿠키가 없는 향후 환경에서 이 API는 엔드 투 엔드 사용 사례를 포괄하기 위해 다른 개인정보 보호 광고 API와 결합될 것입니다.

- 리마케팅: [FLEDGE 참조](/docs/privacy-sandbox/fledge/)
- 관심 기반 광고 선택: [FLoC 참조](/docs/privacy-sandbox/floc/)

{% endAside %}

## 상태

**🕙 최종 업데이트: 2021년 8월**

현황:

- `🤿 Under exploration`: 이 아이디어는 초기 논의 단계에 있습니다.
- `🥚 Proposal`: 초기 디자인이 준비되었으며 공개 인큐베이션 중입니다.
- `🏗️ Under development (BROWSER_NAME)`: 이 기능은 BROWSER_NAME에서 구현 중입니다.
- `🧪 Experiment (BROWSER_NAME)`: BROWSER_NAME에서 실험이 가능합니다. Chrome에서는 실험을 최초 평가판이라고 합니다.
- `🚀 Stable (BROWSER_NAME)`: 이 기능은 BROWSER_NAME에서 기본적으로 제공됩니다.

{% Aside %} [현재 최초 평가판](/origintrials/#/view_trial/3411476717733150721) (Chrome 실험 🧪) {% endAside %}

{% Aside 'caution' %} 다수의 최초 평가판(실험)이 실행됩니다. 각 라운드는 생태계 피드백을 기반으로 API를 개선하고 조정하는 데 이용됩니다. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">제안</th>
    <th style="text-align: left;">현황</th>
</tr></thead>
<tbody>
    <tr>
    <td>클릭에 대한 이벤트 수준 보고서<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">설명자</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>조회수에 대한 이벤트 수준 보고서<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">설명자</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>클릭 및 조회수에 대한 집계 보고서<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">설명자</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>전환 과정: 기기 간<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">설명자</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>전환 과정: 앱-웹<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">설명자</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>기여 모델: 마지막 클릭<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">설명자</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>기여 모델: 우선순위 기반<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">설명자</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>기여 모델: 유연함</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %} {% DetailsSummary 'h3' %} 기여 모델 정보 {% endDetailsSummary %}

우선순위 기반 모델을 사용하면 브라우저가 우선순위를 각 기여 소스와 연결할 수 있습니다. 다음과 같은 용도로 사용할 수 있습니다.

- 클릭 또는 조회가 전환의 가장 가능성 있는 원인인지 결정합니다(클릭이 일반적으로 사용자 관심을 나타내는 더 직접적인 신호로 간주됨).
- `attributionsourcepriority`를 시간에 상대적으로 설정하여 **첫 번째 접촉** **기여** 모델을 수립합니다.
- 무작위로 균일하게 우선순위를 선택하여 (확률적으로) **선형 기여** 모델을 수립합니다.

향후 다른 기여 모델이 지원될 수 있습니다. 집계 보고서에서 [worklet 기반 체계](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration)를 통해 여러 이전 기여 소스에 대해 부분 크레딧을 지정하는 것을 포함하여 보다 유연한 기여 옵션을 이용할 수 있습니다.

{% endDetails %}

## 브라우저 지원

- Firefox와 Edge는 [신호를 공유하지 않습니다](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit은 [부정적](https://chromestatus.com/feature/6412002824028160)이며 [비공개 클릭 측정](https://developer.apple.com/videos/play/wwdc2021/10033/)이라고 하는 광고 전환을 측정하는 다른 API를 제안했습니다.

두 API는 서로 다르지만 Chrome과 WebKit은 개발자 경험을 단순화하기 위해 공개적으로 협력하고 있습니다(예: [보고서의 특성 이름과 JSON 구조](https://github.com/privacycg/private-click-measurement/issues/30)를 서로 일치시킴).

{% Details %} {% DetailsSummary 'h3' %} Chrome에서 제안한 API와 WebKit에서 제안한 API의 차이점 {% endDetailsSummary %} Chrome에서 제안하는 Attribution Reporting API의 기능은 Safari/WebKit에서 제안하는 Private Click Measurement API의 기능과 다릅니다. Chrome에서 제안한 Attribution Reporting API에서 가장 주목할만한 점은 다음과 같습니다.

- 조회 연결 측정이 지원됩니다.
- 이벤트 수준 보고서를 제공할 수 있습니다.
- 자사 컨텍스트의 광고 링크(예: 소셜 네트워크 또는 검색 엔진 결과 페이지의 광고 또는 자체 광고를 게재하는 게시자) **및** 타사 iframe의 광고 링크(예: 타사 애드테크 제공자를 이용하는 게시자 사이트의 광고)가 지원됩니다.
- 애드테크 플랫폼과 같은 타사는 게시자 및 광고주를 대신하여 보고서를 받을 수 있습니다.

{% endDetails %}

## 작동 방식

### 이벤트 수준 보고서

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png", alt="이벤트 수준 보고서", width="800", height="521" %}   <figcaption>이벤트 수준 보고서는 다음과 같이 생성됩니다: 브라우저는 클릭 또는 조회수("기여 소스 이벤트")를 애드테크에서 정의한 전환 데이터("기여 트리거 데이터")와 일치시킵니다. 나중에 브라우저는 결과 보고서를 미리 정의된 엔드포인트로 보냅니다. 이 때 약간의 지연과 노이즈를 도입합니다.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} 자세한 작동 방식: 이벤트 수준 보고서 {% endDetailsSummary %} 광고 링크는 광고 전환과 관련된 특성으로 구성할 수 있습니다:

- 클릭 ID 또는 캠페인 ID와 같이 게시자 측의 광고 클릭(또는 조회)에 첨부할 사용자 지정 데이터
- 이 광고에 대한 전환이 예상되는 사이트
- 성공적인 전환을 알려야 하는, 즉 보고서를 수신해야 하는 보고 엔드포인트
- 이 광고에 대해 더 이상 전환을 계산할 수 없는 마감 날짜

참고: [`window.open()`에 의해 시작된](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations), 또는 조회의 경우 [JavaScript API](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript)를 통해 시작된 탐색의 특성 소스를 등록할 수도 있습니다.

사용자가 특별히 구성된 광고를 클릭하거나 볼 때 브라우저(사용자의 로컬 장치)는 지정된 특성 구성 데이터와 함께 이 이벤트를 기록합니다.

나중에 사용자는 광고주의 웹사이트를 방문하여 광고주 또는 애드테크 제공자가 구매와 같이 전환으로 분류하는 작업을 수행합니다. 이 경우 광고주 또는 애드테크 제공자는 기여를 트리거합니다. 즉, 특정 값 `trigger-data`로 전환을 기록하도록 브라우저에 요청하고 광고 클릭(또는 조회) 및 전환 이벤트가 사용자 브라우저에 의해 일치됩니다.

브라우저는 최종적으로 광고 측에 지정된 엔드포인트로 보고서가 전송되도록 예약합니다. 이 보고서에는 다음이 포함됩니다.

- 이 전환으로 이어진 광고 클릭 또는 조회에 연결된 사용자 지정 광고 측 데이터
- 약간의 노이즈를 포함한 사용자 지정 전환 측 데이터

특정 광고 클릭(또는 조회)에 대해 여러 전환이 등록된 경우, 해당 보고서가 전송되도록 예약됩니다. 보고서는 조회수의 경우 1개, 클릭수의 경우 최대 3개까지 보낼 수 있습니다.

보고서는 전환 후 수일, 때로는 몇 주 후에 브라우저에서 전송됩니다.

{% endDetails %}

### 집계 보고서

<figure> {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %}   <figcaption>집계 보고서는 다음과 같이 생성됩니다: 브라우저는 상세한 클릭 또는 조회수("기여 소스 이벤트")를 애드테크에서 정의한 상세한 전환 데이터("기여 트리거 데이터")와 일치시킵니다. 집계 보고서를 계산하는 데 사용할 목적으로 브라우저에서 보낼 기여를 정의하기 위해 worklet에서 애드테크 정의 코드가 실행됩니다. 집계 서비스는 애드테크에 대한 집계 보고서를 비공개로 계산하는 역할을 담당합니다.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} 자세한 작동 방식: 집계 보고서 {% endDetailsSummary %}

광고 링크는 광고 전환과 관련된 특성으로 구성할 수 있습니다.

사용자가 특별히 구성된 광고를 클릭하거나 볼 때 브라우저(사용자의 로컬 장치)는 지정된 특성 구성 데이터와 함께 이 이벤트를 기록합니다.

그런 다음 애드테크에서 정의한 코드가 worklet 내에서 실행되어 기여, 즉 광고 측 데이터와 전환 측 데이터의 결합을 정의합니다.

이러한 기여(원시 보고서)는 애드테크 서버에 암호화된 상태로 보내지고, 다시 [비공개](#privacy) 방식으로 집계 보고서를 계산하는 집계 서비스로 전송됩니다.

집계 보고서는 이벤트 수준 보고서와 같은 정도로 지연되지 않습니다.

{% endDetails %}

## 개인정보 보호

### 개요

Bob이라는 사람을 예로 들어 보겠습니다. Bob은 `news.com`에서 뉴스를 읽는 동안 광고를 봅니다. 일주일 후 Bob은 `shoes.example`에서 신발을 샀습니다.

현재 이 전환은 **사이트 간 식별자**로 사용되는 타사 쿠키에 의해 추적됩니다. 타사 쿠키를 사용하여 애드테크 회사는 `news.example` **및** `shoes.example`에서 Bob의 활동에 대한 많은 세부 정보에 액세스하고 이러한 정보를 병합하여 Bob에 대한 자세한 프로파일을 만들 수 있습니다. 애드테크 회사는 Bob의 위치, 브라우징 습관 및 `news.com`에서 주로 읽는 기사**뿐만 아니라** `shoes.com`에서 구매, 활동 및 신용카드 정보를 알아낼 수 있습니다. 이 사이트 간 결합은 광고 전환을 측정하는 데 유용합니다. 그러나 사용자 개인정보 보호가 침해되는데, 이 경우 Bob의 활동이 여러 사이트에서 매우 상세하게 추적됩니다.

반면에 Attribution Reporting API를 사용하면 광고 회사가 **사이트 전반에서 개인의 활동을 추적하지 않고도** 전환에 대한 통찰력을 얻을 수 있습니다. 사이트 전반에 걸쳐 소량의 정보가 결합되며, 이 정보는 전환을 측정하기에는 충분하지만 전체 사이트에서 Bob의 활동을 상세하게 추적하기에는 불충분합니다. `news.example`과 `shoes.example`에서 Bob의 활동은 별개로 유지됩니다.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="다이어그램: 오늘의 웹(결합된 ID)과 내일의 웹(분할된 ID)이 나란히 놓여진 보기", width="800", height="314" %}

### 자세한 설명

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png", alt="ALT_TEXT_HERE", width="800", height="1237" %}   <figcaption>타사 쿠키와 달리 Attribution Reporting API는 사이트별 ID 분할을 유지하기 위해 사이트 간 식별자 없이 통찰력을 제공합니다.<br> 이벤트 수준 보고서는 광고 측 식별자를 소량의 전환 측 데이터에만 연결합니다. 따라서 이는 전환에 대한 사이트 간 정보를 제공하지만 전환 측 정보는 사이트 간에 사용자 ID를 결합하기에 너무 대략적입니다.<br> 집계 보고서는 상세한 통찰력을 제공하지만 집계된 수준을 넘지 않습니다. 차등 개인정보 보호 기술, 비공개 계산 및 암호화로 인해 집계 보고서를 사용하여 사이트 전체에서 개별 사용자의 활동을 추적할 수 없습니다.<br>속도 제한과 같은 추가적인 개인정보 보호가 이벤트 수준 및 집계 보고서 모두에 적용됩니다.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} 자세한 설명: 이벤트 수준 보고서 및 개인정보 보호 {% endDetailsSummary %}

이벤트 수준 보고서는 다음 개인정보 보호 메커니즘에 따라 사이트 전체에서 사용자를 추적하지 않으면서 전환 통찰력을 제공합니다.

- 사이트 간 식별자가 사용되지 않으며 상세한 사이트 간 브라우징 활동이 장치를 벗어나지 않습니다. 이벤트 수준 보고서는 광고 측(`news.example`)의 64비트 정보를 전환 측(`shop.example`)의 1비트 또는 3비트 정보와만 연결합니다. 64비트는 **개별 사용자 식별자에 매핑하기에 충분한 정보이지만 이 64비트는 매우 적은 사이트 간 정보**(식별자를 유지하기에 충분하지 않은 1비트 또는 3비트)와만 연결될 수 있습니다. 참고: 광고 측 64비트는 새로운 정보가 아닙니다. 오늘날 사용자 ID는 이미 광고 측에서 얻어낼 수 있습니다. `news.example` 또는 `adtech.example`은 이미 `news.example`에서 특정 사용자의 활동을 알고 있습니다.

- 악용 및 사이트 간 추적을 방지하기 위해 추가 보호가 적용됩니다.

    - 보고서가 **지연**되어 전송됩니다.
    - 전환 데이터에 **노이즈 도입**: 일정 비율(Chrome에서는 5%)로 실제 전환 데이터가 임의의 값으로 대체됩니다.
    - 기여 전환 보고서의 수는 클릭 또는 조회별로 제한됩니다.

{% Aside %} 개인정보를 보호하는 방식으로 실제 전환 수를 복구할 수 있습니다. [예제 스크립트](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py)를 참조하세요. {% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3' %} 자세한 설명: 집계 보고서 및 개인정보 보호 {% endDetailsSummary %}

집계 보고서는 상세한 클릭 또는 조회 이벤트를 상세한 전환 데이터와 연결합니다. 그러나 다음과 같은 개인정보 보호 메커니즘에 따라 사이트 전체에서 사용자를 추적하지 않고 전환 통찰력을 제공합니다.

- 사이트 간 식별자가 사용되지 않습니다.

- 각 기여는 결과적인 집계 보고서에 여러 기여를 할 수 있으며 특정 사용자는 특정 클릭(또는 조회) 및 전환에 대해 여러 기여를 트리거할 수 있습니다. 그러나 주어진 기간 동안 사용자가 할 수 있는 기여는 제한적입니다.

- 데이터는 많은 이벤트(많은 사용자) 수준까지 집계되며 개별 이벤트는 정확하게 관찰할 수 없습니다. 출력 데이터를 사이트 간에 사용자 ID를 연결하는 데 사용할 수 없도록 [차등 개인정보 보호](https://en.wikipedia.org/wiki/Differential_privacy)가 사용됩니다. 집계된 데이터를 드릴다운할 때 세부 수준이 증가하면 해당 데이터의 상대적 노이즈도 증가합니다. 이로 인해 상대적 오류가 더 커지므로 개별 이벤트(또는 사용자)를 정확하게 관찰할 수 없게 됩니다. 반면에 많은 이벤트와 사용자를 집계하는 데이터 조각들은 더 정확하여 유용성을 유지합니다.

- 상세한 클릭 또는 조회 이벤트와 상세한 전환 데이터를 연결하는 원시 보고서는 암호화되어 애드테크 회사에서 읽을 수 없습니다. 그런 다음 신뢰할 수 있는 서버를 통해 비공개 방식으로 이러한 보고서로부터 집계 데이터가 계산됩니다. 몇 가지 계산 방식이 고려되고 있습니다.

    - 보안 다자간 연산(MPC). 여러 서버에 걸쳐 신뢰가 분산됩니다. 각 서버는 자체적으로 의미가 없는 데이터 조각을 하나씩 받습니다. 각 헬퍼가 계산을 실행하면 이러한 헬퍼의 출력이 결합되어 의미 있는 전체 정보를 형성합니다.
    - 단일 서버 계산. 하나의 헬퍼 서버가 출력을 계산합니다. 이 옵션은 덜 안전하고 덜 비공개적입니다. 그러나 설정하기가 더 쉽기 때문에 더 다양한 생태계 참여자들이 이 API를 실험하고 피드백을 제공할 수 있습니다. **이 옵션은 장기적인 솔루션이 아닙니다**. 생태계 피드백을 통합하고 API가 성숙해짐에 따라 충분히 공지하고 마이그레이션 기간이 지나면 이 옵션을 폐기하고 더 안전한 접근 방식인 MPC 또는 보안 단일 서버로 가게 될 것입니다.
    - 보안 단일 서버 계산. 단일 서버이지만 기밀 컴퓨팅 속성을 갖습니다(MPC와 유사하지만 동일하지는 않음).
    - 장기적으로 서버는 보안 다자간 연산(보안 단일 서버 또는 보안 다자간)으로만 데이터를 처리해야 합니다.

- 악용 및 사이트 간 추적을 방지하기 위해 추가 보호가 적용됩니다.

    - 보고서가 무작위로 지연되어 전송됩니다.
    - 데이터의 서로 다른 조각에 대한 쿼리 속도가 제한됩니다.

{% endDetails %}

## 사이트 및 사용자 제어

- 사용자는 `chrome://settings/privacySandbox`의 사용자 설정을 통해 선택 해제할 수 있습니다.
- 기본적으로 이 기능은 최상위 컨텍스트에서 활성화됩니다. [권한 정책](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)을 통해 하위 iframe에서 Attribution Reporting API를 활성화해야 하기 때문에 임의의 제3자가 게시자 모르게 API를 사용할 수 없습니다.

## 열린 질문

많은 질문이 열려 있으며 API가 공개적으로 인큐베이션됨에 따라 해결될 것입니다. 이러한 토론에 많은 분들이 [참여](#participate)해 주시기 바랍니다. 주요 토론 주제는 다음과 같습니다.

- 개인정보 보호와 유용성을 유지하기에 적절한 노이즈의 양은 얼마나 됩니까?
- 사용자 지정 기여 모델을 어떻게 지원합니까?
- 구매 가치와 같이 특정 수준의 세부 정보가 있는 전환 측 데이터를 최적화하는 방법은 무엇입니까?
- 신뢰할 수 있는 서버인지 무엇으로 평가하나요? 평가 중인 솔루션 중 하나는 정기적인 오픈 소스 감사를 실행하는 것입니다. [토론에 참여하세요](https://github.com/WICG/conversion-measurement-api/issues/116).
- 예를 들어 더 많은 보고 엔드포인트에 대한 위임 지원과 같이 더 많은 보고 유연성을 제공하는 방법은 무엇입니까? [토론에 참여하세요](https://github.com/WICG/conversion-measurement-api/issues/96).
- 예를 들어 익명의 자격 증명을 사용한 인증 등 사기를 방지하는 방법은 무엇입니까? [토론에 참여하세요](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- 광고 이외의 사용 사례에 이 API를 사용하려는 경우: 누락된 사항, API를 어떻게 개선할 수 있습니까? [이슈 개설](https://github.com/WICG/conversion-measurement-api/issues)
- 구현자는 개인정보 보호 설정을 어떻게 사용자 지정할 수 있습니까? [토론에 참여하세요](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %} 이 API는 **개인정보 보호와 유용성**을 달성하기 위해 여러 가지 개인 정보 기술을 결합합니다. 이를 위해 이 API에서는 3비트(또는 조회의 경우 1비트) 데이터 제한 및 기타 개인정보 보호 메커니즘이 사용됩니다. 이 부분은 변경될 수 있습니다. 애드테크 회사가 강력한 개인정보 보호를 달성하면서 해당 사용 사례에 더 유용한 데이터를 얻을 수 있는 방법이 있다면 이 API는 그에 따라 진화하게 될 것입니다. {% endAside %}
