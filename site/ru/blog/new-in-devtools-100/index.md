---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 100)"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "Просмотр и изменение директивы @supports, переименование и кастомизация селектора записи и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PgcbQvQp0AenWOoJagsi.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-100
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='DAD72grzDDc' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Chrome 100  {: #m100 } -->
## Chrome 100  {: #m100 }

<!-- Here’s to the 100th Chrome version! Chrome DevTools will continue to provide reliable tools for developers to build on the web. Take a moment to click around in the **What’s New** tab to celebrate the milestones. -->
А вот и сотая версия Chrome! И Chrome DevTools продолжает предоставлять надежные инструменты для веб-разработки. Найдите пару минут, чтобы просмотреть вкладку **Что нового** и отметить успехи.

<!-- As usual, you can watch the latest [What’s New in DevTools video](https://goo.gle/devtools-youtube) by clicking on the image. -->
Как всегда, вы можете просмотреть новое [видео What’s New in DevTools](https://goo.gle/devtools-youtube), кликнув на картинку.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/u8sn7ubuxjJoyPgbfNJs.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}


<!-- ## View and edit @supports at rules in the Styles pane {: #supports } -->
## Просмотр и изменение директивы @supports в панели Стилей (Styles) {: #supports }

<!-- You can now view and edit the CSS `@supports` at-rules in the **Styles** pane. These changes make it easier to experiment with the at-rules in real time. -->
Теперь вы можете просматривать и изменять CSS-директиву `@supports` в панели **Стили** (Styles). Это облегчит экспериментирование с директивами в режиме реального времени.

<!-- Open this [demo page](https://jec.fish/demo/at-support), [inspect](/docs/devtools/dom/#inspect) the `<div class=”box”>` element, view the `@supports` at-rules in the **Styles** pane. Click on the rule’s declaration to edit it.  -->
Откройте [страницу с демо](https://jec.fish/demo/at-support), [проинспектируйте](/docs/devtools/dom/#inspect) элемент `<div class=”box”>`, найдите директиву `@supports` в панели **Стили** (Styles). Кликните на объявление правила, чтобы изменить его.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vnokX5Hswmbvlb5weusO.png", alt="Просмотр и изменение директив @supports", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5c17e46caa5be1d8c769146baecc91e0d740f7fd #}

Задачи в трекере Chromium: [1222574](https://crbug.com/1222574), [1222573](https://crbug.com/1222573)


<!-- ## Recorder panel improvements {: #recorder } -->
## Улучшения вкладки Recorder {: #recorder }

<!-- ### Support common selectors by default {: #selector } -->
### Дефолтная поддержка распространённых селекторов {: #selector }

<!-- When determining an unique selector during recording, the [Recorder](/docs/devtools/recorder/) panel now automatically prefers elements with the following attributes: -->
При определении уникальных селекторов во время записи на вкладке [Recorder](/docs/devtools/recorder/) предпочтение теперь отдаётся элементам со следующими атрибутами:

- data-testid
- data-test
- data-qa
- data-cy
- data-test-id
- data-qa-id
- data-testing

<!-- The attributes above are common selectors used in test automation.  -->
Атрибуты, приведённые выше, часто используются в автоматическом тестировании.

<!-- For example, [start a new recording](/docs/devtools/recorder/#record) with this [demo page](https://jec.fish/demo/recorder). Fill in an email address and observe the selector value. -->
Например, [начните новую запись](/docs/devtools/recorder/#record) на этой [демо-странице](https://jec.fish/demo/recorder). Введите адрес электронной почты и обратите внимание на значение селектора.

<!-- Since the email element has `data-testid` defined, it’s used as the selector automatically instead of the `id` or `class` attributes. -->
Поскольку у поля ввода имейла есть атрибут `data-testid`, он автоматически используется в качестве селектора вместо атрибутов `id` или `class`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4diI81kpscXznWLrB6a9.png", alt="Поддержка распространённых дефолтных селекторов", width="800", height="585" %}


<!-- ### Customize the recording’s selector {: #customize-selector } -->
### Кастомизация селектора записи {: #customize-selector }

<!-- You can customize the selector of a recording if you are not using the [common selectors](/docs/devtools/recorder/#selector). -->
Вы можете настраивать список селекторов для записи, если вы не используете [распространённые селекторы](/docs/devtools/recorder/#selector).

<!-- For example, this [demo page](https://jec.fish/demo/recorder) uses the `data-automate` attribute as the selector. [start a new recording](/docs/devtools/recorder/#record) and enter the `data-automate` as the selector attribute. Fill in an email address and observe the selector value (`[data-automate=email-address]`). -->
Например, на этой [демо-странице](https://jec.fish/demo/recorder) используется атрибут `data-automate` в качестве селектора. [Начните новую запись](/docs/devtools/recorder/#record) и введите `data-automate` как атрибут селектора. Введите адрес электронной почты и обратите внимание на значение селектора (`[data-automate=email-address]`).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2PPPt9tOC2ZEz1l9F9AK.png", alt="Кастомизация селектора записи", width="800", height="524" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/X8r52vWEu6aC8QHFuknp.png", alt="Результат выбора кастомного селектора", width="800", height="579" %}


<!-- ### Rename a recording {: #recorder-rename } -->
### Переименование записи {: #recorder-rename }

<!-- You can now rename a recording in the [Recorder](/docs/devtools/recorder/) panel with the edit button (pencil icon) next to the recording’s title. -->
Теперь вы можете переименовать запись на вкладке [Recorder](/docs/devtools/recorder/), нажав на кнопку редактирования (иконка карандаша) рядом с названием записи.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Pn9Xsrq9lnStmtjpe0jt.png", alt="Переименование записи", width="800", height="502" %}


<!-- ## Preview class/function properties on hover {: #properties } -->
## Предпросмотр свойств класса/функции при наведении курсора {: #properties }

<!-- You can now hover over a class or function in the **Sources** panel during debugging to preview its properties. Previously, it only showed the function name and a link to its location in the source code. -->
Теперь во время отладки вы можете навести курсор во вкладке **Источники** (Sources) на класс или функцию, чтобы посмотреть их свойства. Раньше показывалось только имя функции и ссылка на её расположение в исходном коде.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/BZzL6QMheyd31VGqhA8W.png", alt="Предпросмотр свойств класса/функции по наведению курсора", width="800", height="502" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a585b3883ad39f2f83fa5ab9c7731270d3a2974 ​#}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/96fb7872ce01eb3fde267e39987a82ce3d3f3e21 #}

Задача в трекере Chromium: [1049947](https://crbug.com/1049947)


<!-- ## Partially presented frames in the Performance panel {: #perf } -->
## Частично представленные фреймы во вкладке Производительность (Performance) {: #perf }

<!-- Performance recording now displays a new frame category "Partially presented frames" in the **Frames** timeline.  -->
На записи производительности на временной шкале **Фреймы** (Frames) теперь отображается новая категория фреймов – «Частичный показ фрейма».

<!-- Previously, the **Frames** timeline visualizes any frames with delayed main-thread work as "dropped frames". However, there are cases where some frames may still produce visual updates (e.g. scrolling) driven by the compositor thread. -->
Раньше на временной шкале **Фреймы** (Frames) любые фреймы с отложенной работой по основному потоку отображались как «отмененные фреймы». Однако есть случаи, когда некоторые фреймы могут продолжать производить визуальные обновления (например, при скролле), управляемые потоком компоновки.

<!-- This leads to user confusion because the screenshots of these “Dropped frames” are still reflecting visual updates.  -->
Это может запутать разработчика, поскольку скриншоты таких «отмененных фреймов» по прежнему отображают визуальные изменения.

<!-- The new "Partially presented frames" aims to indicate more intuitively that although some content is not presented timely in the frame, but the issue is not so severe as to block visual updates altogether. -->
Новый тип «Частичный показ фрейма» нужен, чтобы показать более интуитивно, что хотя некоторое содержимое не представлено во фрейме своевременно, проблема не настолько серьезна, чтобы полностью блокировать визуальные обновления.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/QcqjnFhMz1Bxd5dkmduj.png", alt="Частичный показ фрейма во вкладке Производительность (Performance)", width="800", height="531" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a06c2e7c1abeb92be9cfc6b3bf9d6edf6d742e01 #}

Задача в трекере Chromium: [1261130](https://crbug.com/1261130)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Updated iPhone user agent strings for [emulated devices](/docs/devtools/device-mode/#device). All iPhone versions after 5 have a user-agent string with iPhone OS 13_2_3. ([1289553](https://crbug.com/1289553)) -->
- Обновили строки юзер агента для [режима эмуляции](/docs/devtools/device-mode/#device). Все iPhone версии 5 и выше теперь показывают строку iPhone OS 13_2_3 в качестве юзер агента. ([1289553](https://crbug.com/1289553))
<!-- - You can now save [snippet](/docs/devtools/javascript/snippets/) as a JavaScript file directly. Previously, you needed to append `.js` file extension manually. ([1137218](https://crbug.com/1137218)) -->
- Теперь вы можете сохранить [сниппет](/docs/devtools/javascript/snippets/) как JavaScript файл. Раньше нужно было вручную добавлять файлу расширение `.js`. ([1137218](https://crbug.com/1137218))
<!-- - The **Sources** panel now correctly displays scope variable names when debugging with source map. Previously, the **Sources** panel displays minified scope variable names despite sourcemap being provided. ([1294682](https://crbug.com/1294682))  -->
- На вкладке **Источники** (Sources) теперь корректно отображаются имена переменных области видимости при отладке с картой источников. Ранее на панели **Источники** (Sources) отображались минифицированные имена переменных области видимости, несмотря на предоставленную карту источников. ([1294682](https://crbug.com/1294682))
<!-- - The **Sources** panel now restores scroll position correctly on page load. Previously, the position was not restored correctly causing inconvenience in debugging. ([1294422](https://crbug.com/1294422))  -->
- Вкладка **Источники** (Sources) теперь корректно восстанавливает положение прокрутки при загрузке страницы. Ранее положение восстанавливалось некорректно, что вызывало неудобства при отладке. ([1294422](https://crbug.com/1294422))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
