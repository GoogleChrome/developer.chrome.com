---
layout: 'layouts/doc-post.njk'
title: '마이그레이션 가이드(Chrome 92): Conversion Measurement API에서 Attribution Reporting API로'
subhead: Conversion Measurement API가 Chrome 92에서 변경됩니다.
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} 마이그레이션하는 동안 질문이 있거나 지원이 필요하면 [메일링 리스트](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)에 가입하고 질문을 보내세요. {% endAside %}

## 무엇이 달라집니까?

2021년 처음 몇 달 동안 [API 제안서](https://github.com/WICG/conversion-measurement-api)가 변경됨에 따라 Chrome에서 API 구현이 진화하고 있습니다. 변경 사항은 다음과 같습니다.

- API 이름 및 기능 정책 이름
- HTML 특성 이름 및 `.well-known` URL
- 보고서 형식. 보고서가 이제 요청 본문에서 JSON으로 전송됩니다.
- 보고서 내용: 0의 크레딧을 갖는 보고서와 함께 `credit`이 제거됩니다.

Chrome 92에서 변경되지 않은 사항은 이벤트 수준 보고서, 클릭 전용 등 지원되는 기능 세트입니다. **이 부분에서 업데이트가 이루어질 것입니다.** 이 변경 후에는 향후 Chrome 버전에서 다른 업데이트 및 기능이 출시될 예정입니다.

{% Aside %} 이 API 및 향후 기능에 대한 최초 평가판의 업데이트 소식을 받으려면 [메일링 목록](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)에 가입하세요. {% endAside %}

## 이러한 변경 사항은 언제 적용됩니까?

이러한 변경 사항은 [Chrome 92](https://chromestatus.com/features/schedule)부터 적용되며 2021년 7월 20일에 안정화 버전으로 전환합니다. Chrome 92 베타는 2021년 6월 3일에 출시되었습니다.

## 사용자는 무엇을 해야 합니까?

{% Aside %} 향후 버전에서는 API에 더 많은 변경이 이루어집니다. Chrome 92에서 채택된 새로운 명명 방법이 사용될 것입니다. {% endAside %}

최초 평가판을 실행 중이거나 이 API에 대한 데모를 구현한 경우 두 가지 옵션이 있습니다.

- **옵션 1(권장)**: 지금 바로, 또는 다음 몇 주 내에(가능하면 2021년 7월 중순 이전) 코드를 마이그레이션합니다. 그러면 코드베이스를 향후 변경에 적절하게 준비하고 새로운 Chrome 클라이언트에서 계속 작동하도록 할 수 있습니다.
- **옵션 2**: 향후 Chrome 버전에서 더 많은 업데이트와 기능이 출시될 때까지 기다렸다가 필요한 모든 코드를 한 번에 변경합니다.

## 마이그레이션

### 마이그레이션 예

이 [풀 리퀘스트(초안)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files)에서 소규모 데모 앱의 마이그레이션 예를 볼 수 있습니다.

### 기능 정책 코드 업데이트

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">레거시 코드</th>
<th style="text-align: left;">새 코드</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### 기능 감지 코드 업데이트

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">레거시 코드</th>
<th style="text-align: left;">새 코드</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### HTML 특성 업데이트

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">레거시 코드</th>
<th style="text-align: left;">새 코드</th>
</tr></thead>
<tbody>
<tr>
<td><code>conversiondestination</code></td>
<td><code>attributiondestination</code></td>
</tr>
<tr>
<td><code>impressiondata</code></td>
<td><code>attributionsourceeventid</code></td>
</tr>
<tr>
<td><code>impressionexpiry</code></td>
<td><code>attributionexpiry</code></td>
</tr>
<tr>
<td><code>reportingorigin</code></td>
<td><code>attributionreportto</code></td>
</tr>
</tbody>
</table>

### `window.open()` 인수 업데이트

`window.open()`에 의해 시작된 탐색에 대해 기여 소스를 등록할 수 있습니다. 기여 소스를 등록하기 위해 `window.open()`을 사용하는 경우 이러한 호출을 업데이트하세요.

새 코드는 다음과 같아야 합니다(이 이름 바꾸기는 [HTML 특성 이름](#update-the-html-attributes) 바꾸기를 따름).

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### 등록 호출 URL 및 매개변수 업데이트

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">레거시 코드</th>
<th style="text-align: left;">새 코드</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### 보고 엔드포인트 코드 업데이트

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">레거시 코드</th>
<th style="text-align: left;">새 코드</th>
</tr></thead>
<tbody><tr>
<td>브라우저에서 예상되는 요청</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution</td> </tr> <tr> <td>Incoming reports</td> <td>Sent as URL parameters.</td> <td>Sent as JSON in the request body.<br> <br> The report data is included <strong>in the request body as a JSON object</strong> with the following keys:<br> <code>source_event_id</code>: 이전에는 <code>impression-data</code>, 기여 소스의 64비트 이벤트 ID 세트.<br> <code>trigger_data</code>: 이전에는 <code>conversion-data</code>, 기여 트리거 리디렉션의 3비트 데이터 세트.<br><br> ⚠️ <code>credit</code>은 제거되었습니다.</td>
</tr></tbody>
</table>
