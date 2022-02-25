---
layout: 'layouts/doc-post.njk'
title: 迁移指南 (Chrome 92)：Conversion Measurement API 到 Attribution Reporting API
subhead: Conversion Measurement API 在 Chrome 92 中发生变化。
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} 如果您在迁移过程中遇到问题或需要支持，请加入[邮寄名单](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)并提出您的问题。{% endAside %}

## 有哪些变化？

随着 [API 提案](https://github.com/WICG/conversion-measurement-api)在 2021 年前几个月的变化，Chrome 中的 API 实现也在不断发展。下面是具体的变化：

- API 名称和功能策略名称。
- HTML 特性名称和 `.well-known` 网址。
- 报告的格式。报告现在在请求正文中作为 JSON 发送。
- 报告的内容：`credit` 以及本应为 0 信用的报告已被移除。

Chrome 92 中保持不变的是一组支持的功能：仅用于点击的事件级报告。**期待这方面的更新**。在此变化之后，其他更新和功能将在未来的 Chrome 版本中发布。

{% Aside %} 要接收有关此 API 的源站试用和即将推出的功能的动态，请订阅[邮寄名单](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev)。{% endAside %}

## 这些更改何时生效？

这些更改从 2021 年 7 月 20 日达到稳定版的 [Chrome 92](https://chromestatus.com/features/schedule) 开始生效。Chrome 92 测试版于 2021 年 6 月 3 日发布。

## 您应该做什么？

{% Aside %} 未来版本中的 API 会有更多更改。它们将使用 Chrome 92 中采用的新命名方式。{% endAside %}

如果您正在运行源站试用或为此 API 实现了演示，您有两个选项：

- **选项 1（推荐）**：现在或在接下来的几周内迁移您的代码，最好在 2021 年 7 月中旬之前完成。这样，您的代码库将为未来的更改做好准备，并将继续适用于较新的 Chrome 客户端。
- **选项 2**：等待未来 Chrome 版本中发布更多更新和功能，然后一次性进行所有必要的代码更改。

## 迁移

### 示例迁移

您可以在此[拉取请求（草案）](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files)中看到一个小型演示应用的迁移示例。

### 更新您的功能策略代码

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">旧代码</th>
<th style="text-align: left;">新代码</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### 更新您的功能检测代码

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">旧代码</th>
<th style="text-align: left;">新代码</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### 更新 HTML 特性

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">旧代码</th>
<th style="text-align: left;">新代码</th>
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

### 更新 `window.open()` 实参

可以为 `window.open()` 启动的导航注册归因来源。如果您使用 `window.open()` 来注册归因来源，请更新这些调用。

您的新代码应如下所示（此重命名方式遵循 [HTML 特性重命名](#update-the-html-attributes)）：

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### 更新您的注册调用网址和形参

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">旧代码</th>
<th style="text-align: left;">新代码</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### 更新您的报告端点代码

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">旧代码</th>
<th style="text-align: left;">新代码</th>
</tr></thead>
<tbody><tr>
<td>期望来自浏览器的请求</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution</td> </tr> <tr> <td>Incoming reports</td> <td>Sent as URL parameters.</td> <td>Sent as JSON in the request body.<br> <br> The report data is included <strong>in the request body as a JSON object</strong> with the following keys:<br> <code>source_event_id</code>：以前的 <code>impression-data</code>，在归因来源上设置的 64 位事件 ID。<br> <code>trigger_data</code>：以前的 <code>conversion-data</code>，特性触发器重定向中设置的 3 位数据。<br><br> ⚠️ <code>credit</code> 已被移除。</td>
</tr></tbody>
</table>
