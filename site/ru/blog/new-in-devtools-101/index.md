---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 101)"
authors:
  - jecelynyeen
date: 2022-04-12
updated: 2022-04-12
description: "Импорт и экспорт записей действий пользователя в виде JSON файла, поддержка функции цвета hwb(), просмотр каскадных слоёв во вкладке Стили и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/gKKxxweE6MsOJQpQnmiP.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-101
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='u9GRAliBrM8' %}
<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Import and export recorded user flows as a JSON file  {: #recorder } -->
## Импорт и экспорт записей действий пользователя в виде JSON файла  {: #recorder }

<!-- The [Recorder](/docs/devtools/recorder) panel now supports importing and exporting user flow recordings as a JSON file. This addition makes it easier to share user flows and can be useful for bug reporting. -->
Вкладка [Recorder](/docs/devtools/recorder) теперь поддерживает импорт и экспорт записей действий пользователя в виде файла JSON. Это дополнение облегчает обмен записями и может быть полезно для отчёта об ошибках.

<!-- For example, download this [JSON file](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). You can import it with the import button and [replay the user flow](/docs/devtools/recorder/#replay). -->
Например, загрузите этот [файл JSON](https://storage.googleapis.com/web-dev-uploads/file/dPDCek3EhZgLQPGtEG3y0fTn4v82/vzQbv2rUfTz2DEmx06Gv.json). Вы можете импортировать его при помощи кнопки импорта и [воспроизвести запись](/docs/devtools/recorder/#replay).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Jy7NEDZs6XJb90EWqETj.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

<!-- Apart from that, you can export the recording as well. After [recording a user flow](/docs/devtools/recorder/#record), click on the export button. There are 3 export options: -->
Кроме того, вы также можете экспортировать запись. После [записи пользовательских действий](/docs/devtools/recorder/#record) нажмите на кнопку экспорта. Доступно 3 варианта экспорта:

<!-- - **Export as a JSON file**. Download the recording as a JSON file. -->
- **Export as a JSON file**. Загрузить запись в виде файла JSON.
<!-- - **Export as a @puppeteer/replay script**. Download the recording as a [Puppeteer Replay](https://github.com/puppeteer/replay) script.  -->
- **Export as a @puppeteer/replay script**. Загрузить запись как скрипт для [Puppeteer Replay](https://github.com/puppeteer/replay).
<!-- - **Export as a Puppeteer script** . Download the recording as [Puppeteer](https://pptr.dev/) script. -->
- **Export as a Puppeteer script**. Загрузить запись как скрипт для [Puppeteer](https://pptr.dev/).

<!-- Consult [the documentation](/docs/devtools/recorder) to learn more about the differences between these options. -->
Обратитесь к [документации](/docs/devtools/recorder/#export-flows), чтобы узнать больше о различиях между опциями.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mcbKR5hpCNXUmdGp4UDP.png", alt="Варианты экспорта во вкладке Recorder", width="800", height="556" %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## View cascade layers in the Styles pane {: #layer } -->
## Просмотр каскадных слоёв в панели Стили (Styles) {: #layer }

<!-- [Cascade layers](/blog/cascade-layers/) enable more explicit control of your CSS files to prevent style-specificity conflicts. This is particularly useful for large codebases, design systems, and when managing third party styles in applications. -->
[Каскадные слои](/blog/cascade-layers/) позволяют более точно контролировать файлы CSS для предотвращения конфликтов, связанных со специфичностью стилей. Это особенно полезно для большой кодовой базы, дизайн-систем и для управления стилями сторонних приложений.

<!-- In this [example](https://jec.fish/demo/cascade-layer), there are 3 cascade layers defined: `page`, `component` and `base`. In the **Styles** pane, you can view each layer and its styles. -->
В этом [примере](https://jec.fish/demo/cascade-layer) определено 3 каскадных слоя: `page`, `component` и `base`. В панели **Стили** (Styles) вы можете просмотреть каждый слой и его стили.

<!-- Click on the layer name to view the layer order. The `page` layer has the highest specificity, therefore the `box` background is green.  -->
Кликните на имя слоя, чтобы просмотреть порядок слоёв. Слой `page` имеет наибольшую специфичность, поэтому фон блока `box` зелёный.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/A0yHsGUcqVCIO3fzKhEz.png", alt="Просмотр каскадных слоёв в панели Стили", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/52f5be82ff6ba59343ba65ab7d8e215e46d44d3b #}

Задача в трекере Chromium: [1240596](https://crbug.com/1240596)


<!-- ## Support for the hwb() color function {: #hwb } -->
## Поддержка функции цвета hwb() {: #hwb }

<!-- You can now view and edit [HWB color format](https://drafts.csswg.org/css-color/#the-hwb-notation) in DevTools. -->
Теперь вы можете просматривать и редактировать [цвет в формате HWB](https://drafts.csswg.org/css-color/#the-hwb-notation) в DevTools.

<!-- In the **Styles** pane, hold the **Shift** key and click on any color preview to change the color format. The HWB color format is added. -->
На панели **Стили** (Styles) зажмите клавишу **Shift** и кликните на любой превью цвета, чтобы изменить формат. Добавлен формат цвета HWB.

<!-- Alternatively, you can change the color format to HWB in the [color picker](/docs/devtools/css/reference/#color-picker). -->
Кроме того, вы можете изменить формат цвета на HWB в [палитре цветов](/docs/devtools/css/reference/#color-picker).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jW7PXLu6Q5myiKLrsoD3.png", alt="Функции цвета hwb()", width="800", height="508" %}


<!-- ## Improved the display of private properties {: #private-props } -->
## Улучшено отображение приватных свойств {: #private-props }

<!-- DevTools now properly evaluates and displays private accessors. Previously, you couldn't expand classes with private accessors in the **Console** and the **Sources** panel. -->
DevTools теперь правильно оценивает и отображает приватные ключи объектов. Ранее вы не могли разворачивать классы с приватными ключами во вкладках **Консоль** (Console) и **Источники** (Sources).


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LKir8oYFgNvRZSXMhXa7.png", alt="Приватные свойства в Консоли", width="800", height="498" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/78b2ae5c5baa825c88917098ef57b595d3c94aa0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/fdc72aa79313d8ec9e7a04461588bcc27aae1535 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3d369648ae956e799f7337e798bf3453f1c4c440 #}

Задачи в трекере Chromium: [1296855](https://crbug.com/1296855), [https://crbug.com/1303407](1303407)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - The [Back/forward cache](/blog/new-in-devtools-98/#bfcache) now displays the extension ID which blocked [bfcache](https://web.dev/bfcache/) when present.( [1284548](https://crbug.com/1284548)) -->
- [Возвратный кэш](/blog/new-in-devtools-98/#bfcache) теперь показывает ID расширения, которое блокирует [bfcache](https://web.dev/bfcache/) при наличии. ([1284548](https://crbug.com/1284548))
<!-- - Fixed autocompletion support for array-like objects, CSS class names, `map.get` and HTML tags. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983)) -->
- Исправлена поддержка автодополнения объектов типа массив, имён CSS-классов, `map.get` и HTML-тегов. ([1297101](https://crbug.com/1297101), [1297491](https://crbug.com/1297491), [1293807](https://crbug.com/1293807), [1296983](https://crbug.com/1296983))
<!-- - Fixed incorrect highlights when double-clicking on words and undoing autocomplete. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667)) -->
- Исправлена неправильная подсветка при двойном клике на слова и отмене автодополнения. ([1298437](https://crbug.com/1298437), [1298667](https://crbug.com/1298667))
<!-- - Fixed comment keyboard shortcut in the **Sources** panel. ([1296535](https://crbug.com/1296535)) -->
- Исправлена поддержка горячих клавиш для комментирования во вкладке **Источники** (Sources). ([1296535](https://crbug.com/1296535))
<!-- - Re-enable support for using **Alt** (Options) key for multi selection in the **Sources** panel. ([1304070](https://crbug.com/1304070)) -->
- Вновь включена поддержка клавиш **Alt** (Options) для множественного выбора во вкладке **Источники** (Sources). ([1304070](https://crbug.com/1304070))

 
<!-- ## [Experimental] New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## [Эксперимент] Новые режимы временного промежутка и сводки во вкладке Lighthouse {: #lighthouse }

{% Aside %}
<!-- To enable the experiment, enable the **Use Lighthouse panel with timespan and snapshot modes** checkbox under **Settings** > **Experiments**. -->
Чтобы включить эту экспериментальную функцию, поставьте галочку в чекбоксе рядом с пунктом **Use Lighthouse panel with timespan and snapshot modes** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- Apart from the existing **navigation** mode, the **Lighthouse** panel now support two more modes on measuring user flows - **timespan** and **snapshot**. -->
Помимо существующего режима **навигации**, вкладка **Lighthouse** теперь поддерживает еще два режима измерения пользовательских потоков — **timespan** и **сводка**.

<!-- For example, you can use the **timespan** reports to analyze user interactions. Open this [demo](https://coffee-cart.netlify.app/) page. Select the **Timespan** mode and click on **Start timespan**. On the page, click on a coffee and end the timespan. Read the report to find out the [Total Blocking Time](https://web.dev/tbt/) and [Cumulative Layout Shift](https://web.dev/cls/) that were caused by the interaction. -->
Например, вы можете использовать отчёты в режиме **timespan** для анализа пользовательских действий. Откройте эту [демо-страницу](https://coffee-cart.netlify.app/). Выберите режим **Timespan** и нажмите **Start timespan**. Кликните на кофе на странице и завершите запись. Прочитайте отчёт, чтобы узнать [Total Blocking Time](https://web.dev/tbt/) и [Cumulative Layout Shift](https://web.dev/cls/) обусловленные взаимодействием.

<!-- Each mode has its own unique use cases, benefits, and limitations. Please refer to the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) for more information. -->
Каждый режим имеет свои уникальные сценарии использования, преимущества и ограничения. Пожалуйста, обратитесь к [документации по Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) для получения дополнительной информации.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/loe3f6KaR9UdYe57oQ7r.png", alt="Новые режимы временного промежутка и сводки во вкладке Lighthouse", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4d17e989f0f5bad0f9d4d5badff16fd6da09ae33 #}

Задача в трекере Chromium: [772558](https://crbug.com/772558)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}