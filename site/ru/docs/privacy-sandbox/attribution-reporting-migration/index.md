---
layout: 'layouts/doc-post.njk'
title: 'Руководство по миграции (Chrome 92): с Conversion Measurement API на Attribution Reporting API'
subhead: В Chrome 92 Conversion Measurement API изменится.
date: 2021-06-22
updated: 2021-06-22
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

Изменения вступят в силу начиная с [Chrome 92](https://chromestatus.com/features/schedule), стабильная версия выйдет 20 июля 2021 года. Бета-версия Chrome 92 вышла 3 июня 2021 года.

## Что вы должны сделать?

{% Aside %} В будущих версиях API появятся другие изменения. Они будут использовать новое именование, принятое в Chrome 92. {% endAside %}

Если вы участвуете в испытании Origin Trial или реализовали демонстрацию для этого API, у вас есть два варианта:

- **Вариант 1 (рекомендуется)**: перенести код сейчас или в ближайшие недели, лучше всего до середины июля 2021 года. В этом случае ваша кодовая база будет готова к будущим изменениям и продолжит работать с новыми версиями Chrome.
- **Вариант 2**: дождаться реализации других изменений и новых функций в будущих версиях Chrome и внести все необходимые изменения сразу.

## Миграция

### Пример миграции

С примером миграции небольшого демонстрационного приложения можно ознакомиться в этом [pull-запросе (черновике)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files).

### Обновите код политики функций

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Устаревший код</th>
<th style="text-align: left;">Новый код</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Обновите код обнаружения функции

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Устаревший код</th>
<th style="text-align: left;">Новый код</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()<br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()<br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Обновите HTML-атрибуты

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Устаревший код</th>
<th style="text-align: left;">Новый код</th>
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
<th style="text-align: left;">Устаревший код</th>
<th style="text-align: left;">Новый код</th>
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
<th style="text-align: left;">Устаревший код</th>
<th style="text-align: left;">Новый код</th>
</tr></thead>
<tbody><tr>
<td>Запросы, отправляемые браузером</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution</td> </tr> <tr> <td>Входящие отчеты</td> <td> Передаются в виде параметров URL-адреса.</td> <td>Se Передаются в формате JSON в теле запроса.<br> <br> Данные отчета передаются <strong>в теле запроса в виде JSON-объекта</strong> со следующими элементами:<br> <code>source_event_id</code>: ранее <code>impression-data</code>, 64-битный идентификатор события, задаваемый источником атрибуции.<br> <code>trigger_data</code>: ранее <code>conversion-data</code>, 3-битное число, задаваемое в рамках переадресации, активирующей атрибуцию.<br><br> ⚠️ <code>credit</code> больше не используется.</td>
</tr></tbody>
</table>
