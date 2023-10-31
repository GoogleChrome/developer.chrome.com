---
layout: 'layouts/blog-post.njk'
title: 'Новинки DevTools (Chrome 107)'
authors:
  - jecelynyeen
date: 2022-09-20
description: 'Кастомизация сочетаний клавиш, Подсветка объектов C/C++ в Инспекторе памяти и другое.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/P1WaG2na1EJG8CXQpesJ.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-107
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='1uwv6HbR8HU' %}

<!-- Translation instructions:
  + 1. Remove the "draft: true" tag above when submitting PR
  + 2. Provide translations under each of the English commented original content
  + 3. Translate the "description" tag above
  + 4. Translate all the <img> alt text
  5. Update the whats-new.md file -->

<!-- Content starts here -->

<!-- ## Customize keyboard shortcuts in DevTools {: #shortcuts } -->
## Кастомизация сочетаний клавиш в DevTools {: #shortcuts }

<!-- You can now customize keyboard shortcuts for your favorite commands in DevTools. -->
Теперь вы можете кастомизировать горячие клавиши для ваших любимых команд в DevTools.

<!-- Go to **Settings** > **Shortcuts**, hover over a command and click the **Edit** button (pen icon) to customize the keyboard shortcut. You can create chords (a.k.a multi-key press shortcuts) as well.  -->
Перейдите в **Настройки** (Settings) > **Сочетания клавиш** (Shortcuts), наведите курсор на команду и нажмите кнопку **Редактировать** (иконка карандаша), чтобы задать своё сочетание клавиш. Также вы можете задавать команды, состоящие из нескольких клавиш.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/973EfWpxwGOdEF1nN1vv.png", alt="Кастомизация сочетаний клавиш в DevTools", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d061128ff63a97ab2c6c0d2b5e655e6fcbed829c #}

Задачи в трекере Chromium: [1335274](https://crbug.com/1335274), [174309](https://crbug.com/174309)


<!-- ## Toggle light and dark themes with keyboard shortcut {: #toggle-themes } -->
## Переключение между светлой и тёмной темами по сочетанию клавиш {: #toggle-themes }

<!-- Configure a keyboard shortcut to toggle [light and dark themes](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme) conveniently. By default, the action doesn’t map to any keyboard shortcut. -->
Настройте сочетания клавиш для удобного переключения между [светлой и тёмной темами](/docs/devtools/rendering/emulate-css/#emulate-css-media-feature-prefers-color-scheme). По умолчанию для этого действия не настроено сочетание клавиш.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7oGdE2eRsgwokWXW9XvA.png", alt="Переключение между светлой и тёмной темами по сочетанию клавиш", width="800", height="576" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4853b34457f43e41ae9cebc7dfc97c0b734f463a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Задачи в трекере Chromium: [1280398](https://crbug.com/1280398), [1226363](https://crbug.com/1226363)


<!-- ## Highlight C/C++ objects in the Memory Inspector {: #memory } -->
## Подсветка объектов C/C++ в Инспекторе памяти (Memory Inspector) {: #memory }

<!-- The [Memory Inspector](/docs/devtools/memory-inspector/) highlights all the bytes of a C/C++ memory object. -->
[Инспектор памяти](/docs/devtools/memory-inspector/) подсвечивает все байты объекта памяти C/C++.

<!-- Recognizing an object’s bytes among the surrounding WebAssembly memory was a pain point. You have to know the object’s size and count bytes from the object’s start. -->
Распознавание байтов объекта в окружении памяти WebAssembly — нетривиальная задача. Вам нужно знать размер объекта и считать байты от его начала.

<!-- With this feature,  it helps you tell them apart from the surrounding memory. See [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/) to learn more about the changes. -->
Эта функция поможет вам отличить их от окружающей памяти. Читайте [Extending the Memory Inspector for C/C++ debugging](/blog/memory-inspector-extended-cpp/), чтобы узнать о других изменениях.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zqOv2zJTc8ucoeDmQiTo.png", alt="Подсветка объектов C/C++ в Инспекторе памяти.", width="800", height="527" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d5f3befb47eaaa373d697b42dec6f179baf9d42c #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c4e6bdb4321cbc0b783647e855a616096beaabfd #}

Задача в трекере Chromium: [1336568](https://crbug.com/1336568)


<!-- ## Support full initiator information for HAR import {: #har } -->
## Поддержка полной информации об инициаторе для импорта HAR {: #har }

<!-- Full **Initiator** information is available now for [HAR import](/docs/devtools/network/reference/#save-as-har). Previously, the **Network** panel only shows partial initiator information during import. -->
Полная информация об **Инициаторе** (Initiator) теперь доступна для [импорта HAR](/docs/devtools/network/reference/#save-as-har). Ранее во вкладке **Сеть** (Network) показывалась только частичная информация об инициаторе при импорте.

<!-- The initiator information helps developers to trace the origin of a network request and identify network-related issues.  -->
Информация об инициаторе помогает разработчикам отследить происхождение сетевого запроса и выявить проблемы, связанные с сетью.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/cthh3ZrpDwo4LJiaY4Uo.png", alt="Поддержка полной информации об инициаторе для импорта HAR", width="800", height="376" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3a659b0711f52a2e200395b85f16ed9f266d1571 #}

Задача в трекере Chromium: [1343185](https://crbug.com/1343185)


<!-- ## Start DOM search after pressing `Enter` {: #search-type } -->
## Начало поиска по DOM по нажатию по <kbd>Enter</kbd> {: #search-type }

<!-- You can now disable the **Search as you type** setting to always start DOM search after pressing <kbd>Enter</kbd>.  -->
Теперь вы можете отключить настройку **Поиск при вводе запроса** (Search as you type), чтобы всегда начинать поиск по DOM только после нажатия на <kbd>Enter</kbd>.

<!-- In the **Elements** panel, toggle the search bar with <kbd>Control</kbd> or <kbd>Command</kbd> + <kbd>F</kbd>. As you type a query in the search textbox, the DOM tree will jump to the first matching element and highlight it by default.  -->
Вызовите строку поиска во вкладке **Элементы** (Elements) при помощи <kbd>Control</kbd> или <kbd>Command</kbd> + <kbd>F</kbd>.

<!-- For users, especially testers who always work with lengthy search queries, this behavior is not ideal. The DOM tree might jump multiple times as you type in a lengthy search query (e.g. `//div[@id="example"]`). This behavior creates unnecessary motion. -->
Для пользователей, особенно инженеров по тестированию, которые всегда работают с длинными поисковыми запросами, такое поведение далеко от идеала. Дерево DOM может прыгать много раз, пока вы набираете длинный поисковый запрос (например, `//div[@id="example"]`). Такое поведение создает ненужные скачки.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KgTTYf8XaKkHQ2udJc33.png", alt="Поиск по DOM", width="800", height="505" %}

<!-- Go to **Settings** > **Preferences**, disable **Search as you type**. With this change, the search will start only after you press <kbd>Enter</kbd>. -->
Перейдите в **Настройки** (Settings) > **Параметры** (Preferences) и отключите **Поиск при вводе запроса** (Search as you type). После этих изменений поиск будет происходить только после того, как вы нажмёте на <kbd>Enter</kbd>.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/HBLiQ5e60g5urU8UT5J7.png", alt="Настройка Поиск при вводе запроса", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b4643a4703b4a26945d1446eedc907ac81373e23 #}

Задача в трекере Chromium: [1344526](https://crbug.com/1344526)


<!-- ## Display `start` and `end` icons for `align-content` CSS flexbox properties {: #flexbox } -->
## Отображение иконок `start` и `end` для свойства флексбокса `align-content` {: #flexbox }

<!-- In the **Styles** pane, edit the `align-content` properties in a CSS class with `display: flex` or `display: inline-flex`. The `start` and `end` show in the auto-complete dropdown with icons. -->
Во вкладке **Стили** (Styles) отредактируйте свойство `align-content` у элемента с `display: flex` или `display: inline-flex`. Значения `start` и `end` будут отображаться с иконками в выпадающем меню автодополнения.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/fo10I2mt6bQ357itnYhl.png", alt="Свойство флексбокса align-content", width="800", height="424" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ce2b426818106768d4e6d907cc1f4cd3b9636ca6 #}

Задача в трекере Chromium: [1139945](https://crbug.com/1139945)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- - Display correct message counts in the **Console** sidebar. Previously, the counts didn't refresh when clearing console messages. ([1343311](https://crbug.com/1343311)) -->
- Отображение правильного счётчика сообщений в боковой панели **Консоли** (Console). Ранее счётчик не сбрасывался, когда очищались сообщения в консоли. ([1343311](https://crbug.com/1343311))

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5dd8494912fa43dfe998c9764ceb1e1763784617 #}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
