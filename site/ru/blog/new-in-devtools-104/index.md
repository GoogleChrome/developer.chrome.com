---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 104)"
authors:
  - jecelynyeen
date: 2022-07-13
updated: 2022-07-13
description: "Перезапуск фрейма во время отладки, опции замедленного воспроизведения во вкладке Recorder и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nrvdoioHbk8RMg8RiFpd.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-104
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='4RXWfw7Xg_Y' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->

<!-- ## Restart frame during debugging {: #restart-frame } -->
## Перезапуск фрейма во время отладки {: #restart-frame }

<!-- The **Restart frame** feature is back! You can re-run the preceding code when paused somewhere in a function. Previously, this feature was deprecated and removed in Chrome 92 due to stability issues.  -->
Функция **Перезапустить фрейм** (Restart frame) вернулась! Вы можете повторно выполнить предшествующий код до места остановки в функции. Эта функция была удалена в Chrome 92 из-за проблем со стабильностью.

<!-- In this [example](https://jec.fish/), the debugger initially paused at the breakpoint (line 343) near the end of the `toggleColorScheme` function. To restart the debugging from the beginning of the `toggleColorScheme` function, expand the **Call stack** section in the **Debugger** pane, right click on `toggleColorScheme` and select **Restart frame**.  -->
В этом [примере](https://jec.fish) отладчик изначально остановился на точке останова (строка 343) ближе к концу функции `toggleColorScheme`. Чтобы перезапустить отладку с начала функции `toggleColorScheme`, разверните раздел **Стек вызовов** (Call stack) в панели **Отладчик** (Debugger), нажмите правой клавишей мыши на `toggleColorScheme` и выберите **Перезапустить фрейм** (Restart frame).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uBcTkuIaoHHTgJCiGNED.png", alt="Перезапуск фрейма во время отладки", width="800", height="499" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f6749f5cbbfc7d3c89cb2b6b3557d0ff33536ad #}

Задача в трекере Chromium: [1303521](https://crbug.com/1303521)


<!-- ## Slow replay options in the Recorder panel {: #recorder } -->
## Опции замедленного воспроизведения во вкладке Recorder {: #recorder }

<!-- You can now replay user flows at a slower speed — slow, very slow, and extremely slow. These options let you better observe each step replay on screen. -->
Теперь вы можете воспроизводить пользовательские сценарии на более низкой скорости: медленно (slow), очень медленно (very slow) и чрезвычайно медленно (extremely slow). Эти опции позволят вам лучше рассмотреть каждый воспроизводимый шаг.

<!-- [Open](/docs/devtools/recorder/#open) the **Recorder** panel and [start a new recording](/docs/devtools/recorder/#record). Once the recording is done, click on the **Replay** dropdown button. Select a speed to start a replay. -->
[Откройте](/docs/devtools/recorder/#open) вкладку **Recorder** и [начните новую запись](/docs/devtools/recorder/#record). Когда закончите запись, нажмите на выпадающий список **Replay**. Выберите подходящую скорость воспроизведения.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yLIIMlaew0EWfEYdDbXJ.png", alt="Опции замедленного воспроизведения во вкладке Recorder", width="800", height="486" %}

Задача в трекере Chromium: [1306756](https://crbug.com/1306756)


<!-- ## Build an extension for the Recorder panel {: #recorder-extension } -->
## Создание расширений для вкладки Recorder {: #recorder-extension }

<!-- You can now build or install a Chrome extension to export replay scripts in your favorite format. See [Recorder extension API](/docs/extensions/reference/devtools_recorder/) documentation to learn how to build one. -->
Теперь вы можете создать или установить расширение Chrome, чтобы экспортировать сценарии воспроизведения в удобном для вас формате. Обратитесь к документации по [Recorder extension API](/docs/extensions/reference/devtools_recorder/), чтобы узнать как разработать собственное решение.

<!-- To install a demo extension, follow [these steps](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards) outlined in the documentation.  -->
Чтобы установить тестовое расширение, следуйте шагам, описанным в [документации](https://github.com/puppeteer/replay#create-a-chrome-extension-for-recorder-available-from-chrome-104-onwards).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xRO1d79tBe0ILcBoD0oh.png", alt="Пользовательское расширение для вкладки Recorder", width="800", height="486" %}

Задача в трекере Chromium: [1325751](https://crbug.com/1325751)


<!-- ## Group files by Authored / Deployed in the Sources panel {: #authored-deployed } -->
## Группировка по Авторским (Authored) и Развёрнутым (Deployed) файлам во вкладке Источники (Sources) {: #authored-deployed }

<!-- Enable the new **Group files by Authored / Deployed** option to organize your files in the Sources panel. When developing web applications with frameworks (for example, React, Angular), it can be difficult to navigate the source files due to the minified files generated by the build tools (for example, Webpack, Vite).  -->
Включите новую опцию **Group files by Authored / Deployed**, чтобы упорядочить файлы во вкладке Источники (Sources). При разработке приложения с использованием фреймворков (например, React, Angular) бывает сложно ориентироваться в минифицированных исходных файлах, которые генерируются инструментами сборки (например, Webpack, Vite).

<!-- With this checkbox, you can group files into 2 categories for quicker file search: -->
С этим чекбоксом вы можете группировать файлы по двум категориям для ускорения поиска:

<!-- - **Authored**. Similar to the source files you view in your IDE. DevTools generates these files based on source maps (provided by your build tools).  -->
- **Авторские** (Authored). Похожие на исходные файлы, которые вы просматриваете в своей IDE. DevTools формирует эти файлы на основе карт исходников (предоставляемых вашими инструментами сборки).
<!-- - **Deployed**. The actual files that the browser reads. Usually these files are minified. -->
- **Развёрнутые** (Deployed). Реальные файлы, которые читаются браузером. Обычно такие файлы минифицированы.

<!-- Try it yourself with this [React demo](https://reactjs.org/)! -->
Попробуйте сами с этим [демо React-приложением](https://reactjs.org/)!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5E1qbkl0Gx1REx7FdqEr.png", alt="Группировка по Авторским (Authored) и Развёрнутым (Deployed) файлам во вкладке Источники (Sources)", width="800", height="521" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6bc65d0595702fc826ca87e2cfe519a134b62d90 #}

Задача в трекере Chromium: [960909](https://crbug.com/960909)


<!-- ## New User Timings track in the Performance insights panel {: #performance } -->
## Новый трек User Timings во вкладке Performance insights {: #performance }

<!-- Visualize `performance.measure()` marks in your recording with the new **User Timings** track in the **Performance insights** panel. -->
Визуализируйте метки `performance.measure()` в вашей записи с новым треком **User Timings** во вкладке **Performance insights**.

<!-- For example, this [web page](https://jec.fish/demo/perf-measure) uses the [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) method to calculate the elapsed time of text loading. -->
Например, на [этой странице](https://jec.fish/demo/perf-measure) используется метод [`performance.measure()`](https://web.dev/usertiming/#calculating-measurements-with-measure()) для подсчёта времени, затраченного на загрузку текста.

<!-- When you start [measuring the page load](/docs/devtools/performance-insights/#record), the **User Timings** track shows in the recording. Click on the timings item to view its details on the side pane. -->
Когда вы запускаете [измерение загрузки страницы](/docs/devtools/performance-insights/#record), трек **User Timings** отображается в записи. Кликните на элемент хронометража, чтообы увидеть подробности о нём в боковой панели.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/nxPCp6UaiGWJCWWx4Laa.png", alt="Трек User Timings во вкладке Performance insights", width="800", height="499" %}

Задача в трекере Chromium: [1322808](https://crbug.com/1322808)


<!-- ## Reveal assigned slot of an element {: #slot } -->
## Отображение элемента с назначенным слотом {: #slot }

<!-- Slotted elements in the **Elements** panel have a new `slot` badge. When debugging layout issues, use this feature to identify the element which affects the node's layout quicker.  -->
Элемент, у которого есть дочерние элементы-слоты, во вкладке **Элементы** (Elements) теперь обозначается значком `slot`. При отладке проблем раскладки используйте эту функцию, чтобы быстрее определить элементы, влияющие на раскладку узлов.

<!-- This [example](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) contains cards with a few named slots. Inspect the `person-occupation` slot of a card, click the `slot` badge next to it to reveal its assigned slot. -->
Этот [пример](https://mdn.github.io/web-components-examples/slotted-pseudo-element/) содержит карточки с несколькими именованными слотами. Проинспектируйте слот `person-occupation` в карточке, нажмите на значок `slot`, чтобы отобразить назначенный ему элеменет-слот.

<!-- [Learn](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) how to use [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) and [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) elements to create a flexible template that can then be used to populate the shadow DOM of a web component. -->
[Изучите](https://developer.mozilla.org/docs/Web/Web_Components/Using_templates_and_slots) как использовать элементы [<template>](https://developer.mozilla.org/docs/Web/HTML/Element/template) и [<slot>](https://developer.mozilla.org/docs/Web/HTML/Element/slot) для создания гибкого шаблона, который затем может быть использован в теневом DOM веб-компонента.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7uQGHp9WoMCG1RIAkgIF.png", alt="Отображение элемента с назначенным слотом", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/164e238dabefc08018318a981131eedf2e81736b #}

Задача в трекере Chromium: [1018906](https://crbug.com/1018906)


<!-- ## Simulate hardware concurrency for Performance recordings {: #simulate } -->
## Симуляция аппаратного параллелизма при записи Производительности (Performance) {: #simulate }

<!-- The new **Hardware concurrency** setting in the **Performance** panel allows developers to configure the value reported by `navigator.hardwareConcurrency`. -->
Новая настройка **Аппаратный параллелизм** (Hardware concurrency) во вкладке **Производительность** (Performance) позволяет разработчикам настраивать значение, сообщаемое `navigator.hardwareConcurrency`.

<!-- Some applications use `navigator.hardwareConcurrency` to control the degree of parallelism of their application, for example, to control Emscripten pthread pool size. With this feature, developers can test their application performance with different core counts. -->
Некоторые приложения используют `navigator.hardwareConcurrency`, чтобы контролировать степень параллелизма. Например, чтобы контролировать размер пула Emscripten pthread. С помощью этой функции разработчики могут тестировать производительность своих приложений с разным количеством ядер.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PyykGRv29FZbBKJAwWOW.png", alt="Симуляция аппаратного параллелизма при записи Производительности (Performance)", width="800", height="536" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b26de259d74a45e700d989ad9178c5e3a8b73145 #}

Задача в трекере Chromium: [1297439](https://crbug.com/1297439)


<!-- ## Preview non-color value when autocompleting CSS variables {: #css-var } -->
## Предпросмотр нецветовых значений при автодополнении переменных CSS {: #css-var }

<!-- When autocompleting CSS variables, DevTools now populates the non-color variable with a meaningful value so that you can preview what kind of change the value will have on the node. -->
Когда CSS-переменная автоматически дополняется, DevTools теперь заполняет «нецветовую» переменную осмысленным значением, чтобы вы могли предварительно просмотреть, как изменится значение на узле.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/V4slwNtX9HwLPdAyr8JF.png", alt="Предпросмотр нецветовых значений при автодополнении переменных CSS", width="800", height="431" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/977cc58cb5654a2b68142ef8ac1b3f9ac2822694 #}

Задача в трекере Chromium: [1285091](https://crbug.com/1285091)


<!-- ## Identify blocking frames in the Back/forward cache pane {: #bfcache } -->
## Определение блокирующего фрейма на панели Возвратного кэша (Back/forward cache) {: #bfcache }

<!-- The [Back/forward cache](/docs/devtools/application/back-forward-cache/) pane in the **Application** panel has new **frames** section to help you identify blocking frames that may be preventing the page from being eligible for bfcache. -->
Панель [Возвратный кэш (Back/forward cache)](/docs/devtools/application/back-forward-cache/) во вкладке **Приложение** (Application) теперь содержит раздел **Фреймы** (frames). Это поможет определить блокирующие фреймы, которые могут препятствовать доступу страницы к возвратному кэшу.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UaRYEoYYoXhjSIn9seYK.png", alt="Определение блокирующего фрейма на панели Возвратного кэша (Back/forward cache)", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/897799b24fff0639d483111dd2d957288ba2bd06 #}

Задача в трекере Chromium: [1288158](https://crbug.com/1288158)


<!-- ## Improved autocomplete suggestions for JavaScript objects {: #autocomplete } -->
## Улучшены подсказки автодополнения для объектов JavaScript {: #autocomplete }

<!-- The the autocompletion for JavaScript object properties now display based on this order: -->
Подсказки автодополнения для свойств объектов JavaScript теперь отображаются в следующем порядке:

<!-- 1. Own enumerable properties
2. Own non-enumerable properties
3. Inherited enumerable properties
4. Inherited non-enumerable properties -->
1. Собственные перечисляемые свойства;
1. Собственные неперечисляемые свойства;
1. Наследуемые перечисляемые свойства;
1. Наследуемые неперечисляемые свойства.

<!-- Previously, developers found it harder to find relevant properties because the suggestion only favored own properties over inherited properties, and all inherited properties were given equal priority. -->
Ранее разработчики отмечали, что бывает сложно найти релевантное свойство, потому что в подсказках предпочтение отдавалось только собственным свойствам в ущерб наследуемым свойствам, и всем наследуемым свойствам назначался одинаковый приоритет.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IvFTcOWrBOTTMRHqn8u4.png", alt="Улучшены подсказки автодополнения для объектов JavaScript", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/cee5205ae93c95b1dce49e220b9ebfa8c998d5a6 #}

Задача в трекере Chromium: [1299241](https://crbug.com/1299241)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Улучшение карт источников {: #sourcemaps }

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Внесено несколько исправлений в карты источников, чтобы улучшить опыт отладки:

<!-- - Breakpoints now work in inline `<script>` with sourceURL annotations. -->
- Точки останова теперь работают во встроенных `<script>` с аннотациями sourceURL.
<!-- - The debugger now resolves block scoped variables in the **Scope** view with source maps. -->
- Отладчик теперь вычисляет переменные с блочной областью видимости в представлении **Scope** с помощью карт исходников.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gv9cGnDMF7OVlXPWntII.png", alt="Вычисленная перемення с блочной областью видимости", width="800", height="532" %}
<!-- - The debugger now resolves variables in arrow functions in the **Scope** view with source maps. -->
- Отладчик теперь вычисляет переменные в стрелочных функциях в представлении **Scope** с помощью карт исходников.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CZk0xjwMQAqknkW5G4Xf.png", alt="Вычисленная перемення стрелочной функции", width="800", height="479" %}

Задачи в трекере Chromium: [1329113](https://crbug.com/1329113), [1322115](https://crbug.com/1322115)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Fixed the **Auto-completion** setting for the **Sources** panel. Previously, the auto-complete always on even the setting is disabled. ([1323286](https://crbug.com/1323286)) -->
- Исправлена работа настройки **Автодополнение** (Auto-completion) во вкладке **Источники** (Sources). Ранее автодополнение срабатывало всегда, даже если соответствующая настройка была выключена. ([1323286](https://crbug.com/1323286))
<!-- - Updated the **Manifest** tab in the **Application** panel to parse the latest color scheme format. ([1318305](https://crbug.com/1318305)) -->
- Исправлена вкладка **Манифест** (Manifest) во вкладке **Приложение** (Application), теперь на ней отображается последний формат цветовой схемы. ([1318305](https://crbug.com/1318305))
<!-- - Improved the suggestions for the `<script async>` rendering blocking issues in the **Performance insights** panel. Previously,  DevTools suggested to `add async attribute to the script tag` even though the script is already marked as async. ([1334096](https://crbug.com/1334096)) -->
- Улучшены предложения по проблемам блокировки рендеринга `<script async>` во вкладке **Performance insights**. Ранее в DevTools выводилось предложение `add async attribute to the script tag`, даже когда скрипт уже был помечен как асинхронный. ([1334096](https://crbug.com/1334096))
<!-- - The **Performance insights** panel now detects iframes as potential causes for layout shifts. You can view the iframe details in the **Details** pane. ([1328873](https://crbug.com/1328873)) -->
- Вкладка **Performance insights** теперь определяет iframe-ы как потенциальную причину скачков раскладки. Вы можете просматривать детали iframe-ов в панели **Details**. ([1328873](https://crbug.com/1328873))
<!-- - When [open file](/docs/devtools/resources/#open) in the **Command menu**, the authored files (files generated by source maps) are now ranked higher so they appear above similarly named deployed scripts. ([1312929](https://crbug.com/1312929))  -->
- При [открытии файлов](/docs/devtools/resources/#open) в **Command menu** авторские файлы (файлы, сгенерированные на основе карт источников) теперь находятся в списке выше, чем развёрнутые файлы с аналогичными именами. ([1312929](https://crbug.com/1312929))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
