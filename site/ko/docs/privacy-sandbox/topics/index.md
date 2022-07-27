---
layout: 'layouts/doc-post.njk'
title: 'Topics API'
subhead: >
  Enable interest-based advertising, without having to resort to tracking the sites a user visits.
description: >
 A proposal for a mechanism to enable interest-based advertising without having to resort to tracking the sites a user visits.
date: 2022-02-14
updated: 2022-02-14
authors:
  - samdutton
---

## 구현 상태

이 문서에서는 관심 기반 광고를 위한 새로운 제안, Topics API를 간략히 설명합니다. 

-  [Topics API 제안](https://github.com/jkarlin/topics)은 [공개
   토론](https://github.com/jkarlin/topics/issues) 단계입니다. 
-  이 제안에 관한 의견을 들려주세요. 의견이 있으시다면 [주제 설명 저장소](https://github.com/jkarlin/topics)에 이슈를 올리거나  [웹 광고
   개선 비즈니스 그룹](https://www.w3.org/community/web-adv/participants)에서 토론에 참여하세요. 이 설명에는 더 상세히 정의할 필요가
   있는 [미해결 질문](https://github.com/jkarlin/topics/issues)이 여러 개 나와 있습니다.
-  Topics API는 아직 어떤 브라우저에도 구현되지 않았습니다.
-  [개인 정보 보호 샌드박스 타임라인](http://privacysandbox.com/timeline)에서 Topics API 및 다른 개인 정보 보호 샌드박스 제안의
   구현 시점을 확인할 수 있습니다.

## 이 API가 필요한 이유는 무엇인가요?

Topics API는 사용자가 방문한 사이트를 추적하지 않고도 관심 기반의 광고를 노출할 수 있도록 하는 메커니즘을 [개인 정보 보호
샌드박스](/docs/privacy-sandbox/overview/)에서 구현하기 위한 제안입니다.

{% Aside %}

**관심 기반 광고(IBA)**는 일종의 개인 맞춤 광고로서, 사용자가 최근 방문한 사이트에서 사용자의 관심분야를 추론하고 이를 바탕으로 광고를 선택합니다. IBA는
사용자가 방문 중인 페이지의 콘텐츠와 일치하는 광고를 노출하는 것이 목적인 문맥 광고와는 다릅니다.   
광고주는 IBA를 통해 잠재고객에게 도달할 수 있으며, 문맥 광고만으로는 사이트 방문에서 수익을 창출하기 어려운 웹사이트의 경우 IBA로 수익을 얻을 수 있습니다. 또한
IBA는 현재 페이지의 문맥 정보를 보완해 주므로 방문자에게 알맞은 광고를 찾는 데 도움이 됩니다.  

{% endAside %}

Topics API는 사용자의 최근 탐색 활동을 기반으로 사용자가 현재 관심을 보일 만한 주제를 제시하는 방법입니다. 이러한 주제로 문맥 정보를 보완하여 적절한 광고를 선택할 수
있습니다.  
Topics API는 다음 3가지 중요 작업을 실행합니다.

-  웹사이트 호스트 이름을 관심분야의 주제에 매핑합니다. 예를 들어 요가 웹사이트는 '피트니스' 관련 웹사이트로 분류할 수 있습니다. 
-  사용자의 최근 탐색 활동을 기반으로 해당 사용자에게 맞는 주요 주제를 산출합니다. 
-  현재 사용자가 관심을 가질 만한 주제를 알려주는 JavaScript API를 제공하여 적절한 광고를 선택하는 데 도움을 줍니다. 

Topics API는 인식 가능한 상위 주제를 토대로 구성되어 있기 때문에 효과적인 사용자 제어 기능을 제공할 수 있습니다. Chrome에서는 사용자에게 개별 주제를 삭제하고
브라우저에 저장된 주제를 표시하는 옵션을 제공할 예정입니다. 

## 주제는 어떻게 선별 및 선택되나요?

주제는[분류](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)에서 선택됩니다. 분류란  '컨트리 음악', '메이크업 및
화장품', '채식 요리'와 같은 항목의 목록입니다. 처음에는 테스트 삼아 Chrome에서 이러한 주제를 선별합니다. 하지만 주제 분류를 신뢰할 수 있는 생태계 기여자가 관리하는
리소스로 만드는 것이 궁극적인 목표입니다. 분류에서는 적은 수의 주제를 제공해야 합니다. 그래야 여러 브라우저가 각 주제와 연결될 수 있기 때문입니다. 현재 제안된 주제 개수는
350개 정도지만, 최종적으로는 수백 개에서 수천 개 사이가 될 것으로 예상하고 있습니다. 민감한 카테고리를 피하기 위해 이러한 주제는 공개되어야 하며, 사람이 직접 선별하고
업데이트해야 합니다. Chrome 테스트용으로 제안된 최초의 분류는 인종, 성적 지향 등
[흔히 민감한 것으로 간주되는 카테고리를 제외](#sensitive-topics)하기
위해 사람이 선별했습니다.  
  
Topics API는
[머신러닝](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)을
사용하여 호스트 이름에서 주제를 추론할 것을 제안합니다. 처음에는 브라우저 공급업체나 신뢰할 수 있는 서드 파티가 이 분류 모델의 교육을 진행하며, 이때 사람이 선별한 호스트
이름과 주제를 사용하게 됩니다. 모델은 브라우저를 통해 배포되므로 누구나 공개적으로 개발하고 자유롭게 사용할 수 있습니다. 사용자 기기에 있는 브라우저는 배포된 모델을 사용해
사용자가 최근 방문한 사이트의 [호스트 이름](https://web.dev/same-site-same-origin/#origin)을 토대로 특정 사용자에게 가장 인기를 얻을 만한
주제를 산출할 수 있습니다.   
아래 다이어그램은 광고 기술 플랫폼에서 적절한 광고를 선택하는 데 Topics API를 사용하는 방법을 간단한 예를 통해 보여줍니다. 이 예에서는 사용자의 브라우저에 이미 웹사이트
호스트 이름을 주제에 매핑하는 모델이 있다고 가정합니다.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

Topics API 수명 주기:
[큰 버전으로 보기](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Topics API는 어떻게 작동하나요?

{% Aside %}

Topics API 제안은 개발자 생태계에서 의견을 수렴하고 조치를 취하기 위한 [초기 토론
단계](/docs/privacy-sandbox/cds21-update/#discussion)에 있습니다.
API 디자인은 최종 결정된 것이 아니며, 아래의 세부정보는 토론이 진행됨에 따라 변경될 수 있습니다.  

{% endAside %}

Topics API와 같이 관심 기반 광고를 지원하는 메커니즘에서는 제공하는 관심 주제를 최신 상태로 유지해야 합니다.  

{: #epoch}

Topics API 제안을 사용하면 브라우저에서 _에포크_ 라는 기간 동안 사용자의 탐색 활동을 기반으로 사용자를 위한 주제를 추론하며, 현재 권장되는 에포크는 1주일입니다. 각
에포크의 주제는 해당 기간 동안 사용자가 가장 많이 살펴본 5개의 주제 중에서 임의로 선정됩니다. 개인 정보 보호를 강화하는 한편 모든 주제가 표시되도록 하기 위해, 분류에서 선택
가능한 모든 주제 중 특정 주제가 무작위로 선택될 확률은 5%로 되어 있습니다.  
Topics JavaScript API는 `document.browsingTopics()`라는 메서드 1개를 사용합니다. 이 메서드는 최근 3개의 에포크에서 하나씩 최대
3개의 주제가 무작위 순서로 배치된 배열을 반환합니다.   
주제 설명에서는 `document.browsingTopics()`에 의해 반환되는 배열에 포함된 각각의 주제 객체가 다음 3가지 속성을 포함하게 된다고 설명합니다.

-  `id`: 분류에 포함된 주제의 ID
-  `taxonomyVersion`: 브라우저에서 현재 사용 중인 주제 집합
-  `classifierVersion`: 호스트 이름에서 사이트 주제를 추론하는 데 사용되는 머신러닝 분류기

{% Aside %}

Topics API의 디자인은 표준화 절차의 첫 번째 단계에 불과한 [설명](https://github.com/jkarlin/topics) 단계에서 현재 토론 중이며 아직
최종 결정이 내려지지 않았습니다.   
이 도움말에 설명된 매개변수 및 API 세부정보(예: 분류 크기, 매주 산출되는 주제 수, 호출당 반환되는 주제 수)는 개발자 생태계의 의견을 반영하고 API 개발을
반복하는 과정에서 변경될 수 있습니다.

{% endAside %}

{: #observed-topics}

### 관찰한 주제만 수신하는 API 호출자

Topics API의 설계 목표는 현재 서드 파티 쿠키를 사용할 때보다 더 많은 개체에 정보를 공유하지 않고도 관심 기반 광고를 지원하는 것입니다. Topics API는 제한된
기간 내에 이미 주제를 관찰한 API 호출자에만 주제를 반환할 수 있다고 제안합니다.  

{: #caller}

{% Aside 'key-term' %}

Topics API **호출자**는 `document.browsingTopics()` 자바스크립트 메서드를 _호출_ 하는 개체이며, 메서드에서 반환하는 주제를 사용하여
관련 광고를 선택하도록 돕습니다.   
일반적으로 `document.browsingTopics()` 호출은 광고 기술 플랫폼과 같은 서드 파티 사이트에 포함된 코드에서 발생합니다. 브라우저는 현재 문서가 있는
사이트의 호출자를 확인합니다. 따라서 페이지에서 서드 파티인 경우 본인의 사이트가 소유한 iframe에서 API를 호출해야 합니다.  
`document.browsingTopics()`가 하나 이상의 주제를 반환하려면 주제가 관찰된 사이트에 있는 코드와 동일한 오리진의 코드에서 호출되어야 합니다.

{% endAside %}

Topics API와 사용자의 주제가 매핑된 사이트의 코드에서 API 호출자가 `document.browsingTopics()` 메서드를 호출한 경우 해당 주제를 _관찰_ 했다고
말할 수 있습니다. 예: 

1. Topics API는 `knitting.example`이라는 호스트 이름을 '섬유/직물 미술' 등의 주제에 매핑합니다.
1. `adtech.example`의 코드가 `knitting.example` 페이지에 포함되어 있습니다.
1. 사용자가 `knitting.example`에 방문합니다.
1. `adtech.example` 코드가 `document.browsingTopics()`를 호출합니다.
1. 브라우저에서 knitting.example로 추론한 주제 중 하나는 '섬유/직물 미술'입니다.
1. `adtech.example`이 사용자의 주제로 '섬유/직물 미술'을 관찰했다고 말할 수 있습니다.

API의 `document.browsingTopics()` 메서드는 최근
[에포크](#epoch) 3회
내에서 호출자가 관찰한 주제만 제공합니다. 이는 API로 대체하는 기술(서드 파티 쿠키 포함)을 사용할 때보다 더 많은 개체에 사용자 정보가 공유되지 않도록 하는 데 도움이
됩니다.   
`document.browsingTopics()` 에서 반환하는 주제의 수는
[API 호출자](#caller) 가
이미 관찰한 주제의 수와 사용자가 이용할 수 있는 주제의 수(예: 데이터가 몇 주간 축적되었는지)에 따라 달라집니다. 주제 0–3개를 반환할 수 있습니다.

### Topics JavaScript API는 어떤 모습으로 실행되나요?

아래의 코드는 API 사용의 기본적인 예시입니다(간단히 보여주기 위해 오류 처리 없음).  

{% Aside 'warning' %}

이 코드 스니펫은 Topics JavaScript API가 어떤 모습으로 실행되는지 보여주기 위한 목적으로만 제공됩니다. API 설계는 변경될 수 있으며 현재 이 코드는
어떤 브라우저에서도 작동하지 않습니다.  

{% endAside %}

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

### Topics API는 호출자가 볼 특정 주제를 어떻게 결정하나요?

API 호출자는 최근에 관찰한 주제만 수신하며 사용자의 주제는 에포크마다 한 번씩 새로고침됩니다. 즉, API는 정해진 호출자가 특정 주제를 수신할 수 있는 롤링 시간을
제공합니다.  
아래 표는 한 에포크 동안 사용자의 가상 방문 기록 예시(비현실적으로 적음)를 보여주며 여기에서 방문한 사이트와 연결된 주제, 각 사이트에 표시된 API
[호출자](#caller)(사이트에
포함된 자바스크립트 코드에서 `document.browsingTopics()`를 호출하는 개체)를 보여줍니다.

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>사이트</strong></th>
<th style="text-align: left;"><strong>주제</strong></th>
<th style="text-align: left;"><strong>사이트의 API 호출자</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>yoga.example</td>
<td>피트니스</td>
<td>adtech1.example adtech2.example</td>
</tr>
<tr>
<td>knitting.example</td>
<td>공예</td>
<td>adtech1.example</td>
</tr>
<tr>
<td>hiking-holiday.example</td>
<td>피트니스, <br>
여행 및 이동 수단</td>
<td>adtech2.example</td>
</tr>
<tr>
<td>diy-clothing.example</td>
<td>공예, 패션 및 스타일</td>
<td>[없음]</td>
</tr>
</tbody>
</table>

에포크 종료 시(현재 1주일로 제안됨) Topics API가 일주일 동안 브라우저의 상위 주제를 생성합니다.

-  adtech1.example은 yoga.example과 knitting.example 모두에서 '피트니스' 및 '공예'를 관찰했으므로 '피트니스' 및 '공예' 주제를
   수신할 수 있습니다. 
-  adtech1.example은 '여행 및 이동 수단' 주제와 관련되어 있으며 최근에 사용자가 방문한 사이트에 존재하지 않았으므로 이 사용자의 주제로 '여행 및 이동
   수단'을 수신할 수 없습니다.
-  adtech2.example은 '피트니스' 및 '여행 및 이동 수단' 주제를 관찰했으나 '공예' 주제는 관찰하지 않았습니다.

사용자가 '패션' 주제가 있는 diy-clothing.example을 방문했지만, 이 사이트에서 Topics API를 호출하지 않았습니다. 그럼 이때 API는 호출자에게 '패션'
주제를 반환하지 않습니다.  
2주 차에 사용자가 다른 사이트를 방문합니다.

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>사이트</strong></th>
<th style="text-align: left;"><strong>주제</strong></th>
<th style="text-align: left;"><strong>사이트의 API 호출자</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>sewing.example</td>
<td>공예</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

또한 adtech2.example의 코드가 diy-clothing.example에 추가되어 있습니다.

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>사이트</strong></th>
<th style="text-align: left;"><strong>주제</strong></th>
<th style="text-align: left;"><strong>사이트의 API 호출자</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>diy-clothing.example</td>
<td>공예, 패션 및 스타일</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

adtech2.example은 1주 차에 '피트니스', '여행 및 이동 수단'을 수신했으며 이제 '공예', '패션 및 스타일' 주제도 수신할 수 있게 되나 다음 에포크인 3주 차가
되어야 합니다. 즉, 서드 파티가 쿠키를 사용할 때보다 사용자의 과거 정보(이 경우 패션에 대한 관심)를 더 자세히 알 수 없습니다.  
사용자가 adtech2.example의 코드가 포함되어 있으며 주제가 '피트니스', '여행 및 이동 수단'인 사이트를 방문하지 않을 경우 2주 후 '피트니스', '여행 및 이동
수단'이 adtech2.example의 대상 주제 목록에서 삭제될 수 있습니다.

### API는 사이트의 주제를 어떻게 추론하나요?

Topics API 제안 설명서에 따르면 웹사이트 [호스트 이름](https://web.dev/same-site-same-origin/#origin)을 0개 이상의 주제에 매핑하는
[분류기 모델](https://github.com/jkarlin/topics#:~:text=classifier)에서 주제가 파생됩니다.   
추가 정보(예: 전체 URL 또는 페이지 콘텐츠)를 분석하면 보다 관련성 높은 광고를 게재할 수 있지만 개인 정보 보호에 부정적인 영향을 줄 수 있습니다.   
호스트 이름을 주제에 매핑하는 분류기 모델은 공개적으로 사용 가능하며, 제안 설명서에 따르면 브라우저 개발자 도구를 통해 사이트의 주제를 볼 수 있어야 합니다. 매핑 모델은
주기적으로 업데이트되며, 빈도는 아직 결정되지 않았습니다.

### 사용자의 상위 주제 5개는 어떻게 선정되나요?

API는 에포크당 하나씩 최대 3개의 주제를 반환합니다. 3개가 반환되면 여기에는 현재 에포크의 주제 한 개와 이전 에포크의 주제 2개가 포함됩니다. 

1. 각 에포크가 끝나면 브라우저가 다음 기준을 충족하는 페이지 목록을 컴파일합니다. 
   1. 에포크 동안 사용자가 방문한 페이지
   1. `document.browsingTopics()`를 호출하는 코드가 포함된 페이지 
   1. API가 사용 설정됨(예: 사용자가 또는 [응답
      헤더](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)로 차단하지 않음)

1. 사용자 기기의 브라우저가 Topics API에서 제공하는 분류기 모델을 사용하여 각 페이지의 호스트 이름을 주제 목록에 매핑합니다.
1. 브라우저에 주제 목록이 누적됩니다.
1. 브라우저가 빈도별로 상위 주제 5개 목록을 생성합니다.

그런 다음  `document.browsingTopics()` 메서드가 에포크마다 상위 5개 중에서 주제를 무작위로 반환합니다.  이때 전체 주제 분류에서 무작위로 선택될 가능성은
5%입니다.  
Chrome에서 사용자는 개별 주제를 삭제하거나 방문 기록을 삭제하여 API에서 반환되는 주제의 수를 줄일 수 있습니다. 사용자는 API를 선택 해제할 수도
있습니다([사용자의 선택 해제](#opt-out)
참고).

## Topics API는 FLoC에 관한 우려를 어떻게 해소하나요?

2021년 [FLoC](https://github.com/WICG/floc) 오리진 트라이얼이 진행된 후 광고 기술 및 웹 생태계의 참여자로부터 다양한 의견을 받았습니다. 특히
FLoC 동질 집단이 디지털 지문 수집 경로로서 사용자를 식별하거나 사용자가 민감한 카테고리와 연결되어 있음을 알아내는 데 사용될 수 있다는 우려가 있었습니다. 사용자가 이해하기
쉽도록 FLoC를 더 투명하게 공개해야 한다는 요청도 있었습니다.   
Topics API는 이러한 의견을 염두에 두고 설계되었으며, 관심 기반 광고를 지원하는 다른 방법을 모색합니다. 투명성을 개선하고, 개인 정보 보호를 강화하고, 민감한 카테고리에
관한 접근 방식을 달리했습니다.

### 디지털 지문 감소

Topics API는 Topics API 한 가지만 사용하는 여러 사이트에서 상당히 많은 수의 사용자를 재식별하기 어렵게 만드는 여러 메커니즘을 제안합니다. 

-  주제 분류는 대략적이므로(최초로 분류되는 주제의 개수가 총 350개 정도) 각 주제에 많은 사용자가 포함될 가능성이 큽니다. 다만, 이는 특정 브라우저의 총사용자 수에
   따라 달라집니다. 반환되는 주제 중 5%가 무작위로 선택되므로 주제당 최소 사용자 수가 보장됩니다.
-  주제는 사용자의 상위 주제 5개 중에서 무작위로 반환됩니다.
-  제공되는 주제 중 5%가 무작위입니다(모든 주제 중에서 선택됨).
-  사용자가 같은 사이트를 자주 방문하는 경우(예: 매주) 사이트에서 실행되는 코드가 매주 최대 1개의 새로운 주제만 학습할 수 있습니다.
-  하나의 에포크 동안 여러 사이트는 특정 사용자의 고유한 주제를 수신합니다. 하나의 사이트에서 사용자의 반환된 주제가 다른 사이트에서 또 반환될 가능성은 20%에
   불과하므로 동일한 사용자인지 판단하기가 더 어렵습니다.
-  사용자의 주제는 매주 1회 업데이트되므로 정보가 공유될 비율이 제한됩니다. 
-  최근에 동일한 사용자의
   [특정 주제를 관찰한](#observed-topics)
   API 호출자에만 동일한 주제가 반환됩니다. 이 모델은 특정 개체가 직접 관찰하지 않은 사용자 관심분야 정보를 알아내거나 공유할 가능성을 제한하는 데 도움이 됩니다. 

{: #sensitive-topics}

### 민감한 주제

주제 [분류](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md)는 민감한 카테고리의 내용을 피하고자 사람이 공개적으로
선별합니다.   
또한 사이트와 사용자 모두 Topics API 사용을
[선택 해제](#opt-out)할
수 있습니다. 

{% Aside %}

Topics API 제안 설명서에는 다음과 같이 나와 있습니다.  '서드 파티 쿠키는 사용자가 방문한 URL, 방문한 페이지에 있는 콘텐츠 등 사용자에 관한 모든 정보를 추적하는 데 사용될 수 있으며 여기에는 민감한 자료가 아무런 제한 없이 포함될 수 있습니다. 반면 Topics API는 사람이 선별한 주제 분류로 제한됩니다. 그러나 이렇게 분류된 주제와 통계적으로 상관관계가 있는 항목이 포함되지 않는다고 보장할 수는 없습니다. 하지만 서드 파티 쿠키와 Topics를 비교해 보면 Topics가 쿠키보다 확실히 개선된 것을 보입니다.'

{% endAside %}


### 사용자 제어 및 투명성

사용자는 Topics API의 목적, 사용자에 관해 다루어지는 정보, API가 사용되는 시점을 파악하고 API를 사용 또는 사용 중지하는 제어 기능을 사용할 수 있어야 합니다.  
Topics API의 사람이 읽을 수 있는 분류 체계를 통해 사용자는 브라우저에서 추천하는 주제에 관해 알아보고 주제를 제어할 수 있습니다. 사용자는 광고로 표시되기를 원하지 않는
특정 주제를 삭제하고, API 관련 정보와 API를 사용 또는 사용 중지하는 방법을 안내하는 UX도 확인할 수 있습니다. Chrome은
chrome://settings/privacySandbox에서 Topics API에 관한 정보와 설정을 제공합니다. 또한 시크릿 모드에서는 API 호출자에 주제가 전송되지 않으며,
방문 기록을 삭제하면 주제도 삭제됩니다. 

{: #opt-out}


### 사이트의 선택 해제

Topics API를 호출하는 코드가 있는 사이트만 주제 빈도 계산에 사용할 수 있는 방문 기록에 포함되며 API 호출자는
[직접 관찰한 주제만 수신합니다](#observed-topics).
따라서 사이트 또는 삽입된 서비스가 API 호출에 필요한 조치를 취하지 않으면 주제 빈도 계산에 해당 사이트가 반영되지 않습니다.  
Topics 설명서에 따르면 사이트에서 다음의
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) 헤더를
사용해 사이트 방문자의 주제 계산을 차단할 수도 있습니다.  
```text  
Permissions-Policy: browsing-topics=()
````

{% Aside %}

FLoC의 기존 Permissions-Policy interest-cohort=()도 주제 계산을 차단합니다.

{% endAside %}

### 사용자의 선택 해제

Topics API [제안 설명서](https://github.com/jkarlin/topics#:~:text=empty)에 따르면 다음과 같은 경우 반환되는 주제 목록이 비어
있을 수 있습니다.

-  사용자가 브라우저 설정(chrome://settings/privacySandbox)에서 Topics API를 선택 해제했습니다.
-  사용자가 브라우저 설정(chrome://settings/privacySandbox)을 통해 주제를 삭제하거나 [쿠키를
   삭제했습니다](https://support.google.com/accounts/answer/32050).
-  브라우저가 시크릿 모드입니다.

Topics API 설명서에서 [개인 정보 보호 목표에 관한 자세한
내용](https://github.com/jkarlin/topics#:~:text=privacy%20goals)과 API로 목표를 달성하는 방법을 확인할 수 있습니다.

---

## 참여 및 의견 공유

-  **GitHub**: [제안 설명서](https://github.com/jkarlin/topics)를 읽고 [제안에 관한 문제
   저장소](https://github.com/jkarlin/topics/issues)에 질문을 게시하고 토론을 살펴보세요.
-  **W3C**: [웹 광고 개선 비즈니스 그룹](https://www.w3.org/community/web-adv/participants)에서 업계 사용 사례 토론에
   참여하세요.
-  **Topics API 공지:
   **[groups.google.com/a/chromium.org/g/topics-api-annnamce](https://groups.google.com/a/chromium.org/g/topics-api-annnounce)에서
   메일링 리스트에 등록하거나 리스트를 확인하세요.
-  **개인 정보 보호 샌드박스 개발자 지원**:   
   [개인 정보 보호 샌드박스 개발자 지원 저장소](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)에 질문을
   게시하고 토론에 참여하세요.

## 자세히 알아보기

-  [Topics API 기술 설명서](https://github.com/jkarlin/topics)
-  [개인 정보 보호 샌드박스 살펴보기](https://web.dev/digging-into-the-privacy-sandbox)  
  
