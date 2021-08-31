---
layout: layouts/doc-post.njk
title: 'Руководство по миграции (Chrome 92): с Conversion Measurement API на Attribution Reporting API'
subhead: В Chrome 92 Conversion Measurement API изменится.
date: '2021-06-22'
updated: '2021-06-22'
authors:
  - maudn
---

{% Aside %} Если у вас есть вопросы или вам нужна помощь с миграцией, присоединяйтесь к [рассылке](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) и задайте свой вопрос. {% endAside %}

## Что изменится?

В результате изменений, внесенных в [предложение API](https://github.com/WICG/conversion-measurement-api) в начале 2021 года, реализация API в Chrome будет обновлена. Вот что изменится:

- Название API и соответствующей политики функции.
- Названия атрибутов HTML и URL-адресов `.well-known`.
- Формат отчетов. Отчеты теперь отправляются в формате JSON в теле запроса.
- Содержание отчетов: поле `credit` было удалено, а отчеты, в которых оно имело бы нулевое значение, теперь не отправляются.

Неизменным в Chrome 92 остается набор поддерживаемых функций: отчеты на уровне событий, только для кликов. **Ожидайте дальнейших изменений**. В будущих версиях Chrome будут реализованы другие изменения и новые функции.

{% Aside %} Если вы хотите получать новости об испытании Origin Trial для этого API и будущих функций, подпишитесь на [рассылку](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev). {% endAside %}

## Когда изменения вступят в силу?

These changes take effect starting from [Chrome 92](https://chromestatus.com/features/schedule), stable on July 20th 2021. Chrome 92 beta was released on June 3rd 2021.

## What should you do?

{% Aside %} В будущих версиях API появятся другие изменения. Они будут использовать новое именование, принятое в Chrome 92. {% endAside %}

Если вы участвуете в испытании Origin Trial или реализовали демонстрацию для этого API, у вас есть два варианта:

- **Вариант 1 (рекомендуется)**: перенести код сейчас или в ближайшие недели, лучше всего до середины июля 2021 года. В этом случае ваша кодовая база будет готова к будущим изменениям и продолжит работать с новыми версиями Chrome.
- **Вариант 2**: дождаться реализации других изменений и новых функций в будущих версиях Chrome и внести все необходимые изменения сразу.

## Миграция

### Example migration

С примером миграции небольшого демонстрационного приложения можно ознакомиться в этом [pull-запросе (черновике)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files).

### Обновите код политики функций

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Обновите код обнаружения функции

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Обновите HTML-атрибуты

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
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

### Обновие аргументы `window.open()`

Для переходов, инициируемых при помощи `window.open()`, можно регистрировать источник атрибуции. Если вы используете `window.open()` для регистрации источников атрибуции, вам следует обновить такие вызовы.

Новый код должен выглядеть следующим образом (в соответствии с [переименованными HTML-атрибутами](#update-the-html-attributes)):

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Обновите URL-адрес и параметры вызова, используемого для регистрации конверсии

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### Обновите код конечной точки для отправки отчета

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">Legacy code</th>
<th style="text-align: left;">New code</th>
</tr></thead>
<tbody><tr>
<td>Запросы, отправляемые браузером</td>
<td><code>.well-known/register-conversion?impression-data=&amp;conversion-data={DATA}&amp;attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Incoming reports&lt;/td&gt; &lt;td&gt;Sent as URL parameters.&lt;/td&gt; &lt;td&gt;Sent as JSON in the request body.&lt;br&gt; &lt;br&gt; The report data is included &lt;strong&gt;in the request body as a JSON object&lt;/strong&gt; with the following keys:&lt;br&gt; &lt;code&gt;source_event_id</code>: formerly <code>impression-data</code>, the 64-bit event id set on the attribution source.<br> <code>trigger_data</code>: formerly <code>conversion-data</code>, the 3-bit data set in the attribution trigger redirect.<br><br> ⚠️ <code>credit</code> has been removed. </td>
</tr></tbody>
</table>
