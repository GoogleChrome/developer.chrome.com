---
layout: 'layouts/blog-post.njk'
title: "Новинки DevTools (Chrome 110)"
authors:
  - jecelynyeen
date: 2023-02-13
description: 'Очистка вкладки Производительность при перезагрузке, просмотр и подсветка кода в пользовательском сценарии в Регистраторе и другое.'
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kb5RVelVxuIzFDViu9BH.png'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-110
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}
{% YouTube id='CrSmjooOEiE' %}

<!-- Translation instructions:
  +1. Remove the "draft: true" tag above when submitting PR
  +2. Provide translations under each of the English commented original content
  +3. Translate the "description" tag above
  +4. Translate all the <img> alt text
  5. Update the sites/ru/_partials/devtools/whats-new.md file -->


<!-- ## Clearing Performance Panel on reload {: #perf } -->
## Очистка вкладки Производительность при перезагрузке {: #perf }

<!-- The **Performance** panel now clears both the screenshot and trace when you click the **Start profiling and reload page** button. -->
Во вкладке **Производительность** (Performance) теперь очищаются как скриншоты так и трассировки при клике на кнопку **Начать профилирование и обновить страницу** (Start profiling and reload page).

<!-- Previously, the **Performance** panel displayed a timeline with screenshots from previous recordings. This made it difficult to see when the actual measurement started. The panel now always navigates to the `about:blank` page first to guarantee that the recording begins with a blank trace. This aligns with the **Performance Insights** panel which already did the same. -->
Ранее на вкладке **Производительность** (Performance) отображался таймлайн со скриншотами предыдущих записей. Это затрудняло определение начала нового измерения. Вкладка теперь всегда сначала переходит на страницу `about:blank`, чтобы гарантировать, что запись начнётся с пустой отметки. Это совпадает со вкладкой **Статистика производительности** (Performance Insights), которая уже имела такое поведение.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JVXCt6hKIxMtf0tCLWwh.png", alt="Очистка вкладки Производительность при перезагрузке.", width="800", height="548" %}


{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0a301d29d165f17a6eceb1adf91bff0c1c2e07eb #}

Задачи в трекере Chromium: [1101268](https://crbug.com/1101268), [1382044](https://crbug.com/1382044)


<!-- ## Recorder updates {: #recorder } -->
## Обновления Регистратора (Recorder) {: #recorder }

<!-- ### View and highlight the code of your user flow in the Recorder {: #recorder-code } -->
### Просмотр и подсветка кода в пользовательском сценарии в Регистраторе {: #recorder-code }

<!-- The **Recorder** now offers split code view, making it easier to view your user flow code. To access the code view, open a user flow and click **Show Code**.  -->
**Регистратор** (Recorder) теперь предлагает опцию раздельного просмотра кода, что облегчает просмотр кода пользовательского сценария. Чтобы просмотреть код, нажмите кнопку **Показать код** (Show Code).

<!-- The  **Recorder**  highlights the corresponding code as you hover over each step on the left, making it easy to track your flow. You can change the code format using the dropdown, which lets you switch between formats such as [Nightwatch Test](https://bit.ly/nightwatch-recorder) script. -->
**Регистратор** (Recorder) подсвечивает соответствующий код при наведении курсора на отдельные шаги слева, что облегчает отслуживание пути. Вы можете поменять формат кода в выпадающем меню, что позволяет переключаться между форматами, как скрипты для [Nightwatch Test](https://bit.ly/nightwatch-recorder). 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZxNNmun9Yfqs97JCAn7C.png", alt="Просмотр кода в Регистраторе.", width="800", height="542" %}

Задача в трекере Chromium: [1385489](https://crbug.com/1385489)


<!-- ### Customize selector types of a recording {: #recorder-selector } -->
### Настройка типов селекторов записи {: #recorder-selector }

<!-- You can create recordings that capture only the selector types that matter to you. With the new option to customize selector types when creating a new recording, you can include or exclude selectors such as XPath, ensuring you capture only the selectors you want in your user flows. -->
Вы можете создавать записи, в которых отслеживаются только нужные вам типы селекторов. С новой опцией настройки типов селекторов при создании новой записи вы можете выбрать или исключить селекторы типа XPath, что обеспечит запись только желаемых селекторов.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/5t2TOY9VA2Uq08Dq2ZhM.png", alt="Новая опция настройки типов селекторов.", width="800", height="645" %}

Задача в трекере Chromium: [1384431](https://crbug.com/1384431)


<!-- ### Edit user flow while recording {: #recorder-edit } -->
### Редактирование пользовательского сценария во время записи {: #recorder-edit }

<!-- The **Recorder** now allows editing during recording, providing you with the flexibility to make changes in real-time. You no longer need to end the recording to make adjustments. -->
**Регистратор** (Recorder) теперь допускает редакторирование во время записи, предоставляя вам возможность вносить изменения в режиме реального времени. Вам больше не нужно завершать запись для внесения изменений.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1a2S1lizzJ5acRMgjtwH.png", alt="Редактирование пользовательского сценария во время записи.", width="800", height="619" %}

Задача в трекере Chromium: [1381971](https://crbug.com/1381971)


<!-- ## Automatic in-place pretty print {: #pretty-print } -->
## Автоматическое красивое форматирование внутри файла {: #pretty-print }

<!-- The **Sources** panel now automatically pretty prints minified source files in place. You can click on the **pretty print** button `{ }` to undo it. -->
Во вкладке **Источники** (Sources) минифицированные файлы теперь автоматически форматируются. Вы можете нажать на кнопку автоформатирования `{ }`, чтобы отменить это.

<!-- Previously, the **Sources** panel showed minified content by default. To format the content, you had to click the pretty print button manually. On top of that, the pretty-printed content wasn’t displayed in the same tab, but in another `::formatted` tab. -->
Ранее на вкладке **Источники** (Sources) по умолчанию отображался минифицированный контент. Чтобы отформатировать контент, нужно было нажать кнопку автоформатирования вручную. Кроме того, ранее форматированный контент отображался не в том же файле, а на новой вкладке `::formatted`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/twp21SJIisjYpnCWRbWi.png", alt="Показан минифицированный файл до и после автоформатирования.", width="800", height="501" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3ae70742a7fce9657d8fcd578a182635e619cad5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0b9c42efb6065c8a697eaf3acd656cb87e3d4f54 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b6bddcbabb2d977b620758ac20785675053a4db9  #}

Задачи в трекере Chromium: [1383453](https://crbug.com/1383453), [1382752](https://crbug.com/1382752), [1382397](https://crbug.com/1382397) 


<!-- ## Better syntax highlight and inline preview for Vue, SCSS and more {: #highlight } -->
## Улучшенная подсветка синтаксиса и встроенный предварительный просмотр для Vue, SCSS и других {: #highlight }

<!-- The **Sources** panel enhanced the syntax highlighting for several widely-used file formats, enabling you to read code more easily and recognize its structure, including Vue, JSX, Dart, LESS, SCSS, SASS, and inline CSS. -->
Во вкладке **Источники** (Sources) улучшена подсветка синтаксиса для нескольких широко используемых форматов файлов, включая Vue, JSX, Dart, LESS, SCSS, SASS и инлайн CSS. Это позволяет легче читать код и распознавать структуру.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/92SB2J5N6ImqJlOY3tIB.png", alt="Подсветка синтаксиса для Vue.", width="800", height="550" %}

<!-- In addition, DevTools also improved the inline preview for Vue, inline HTML, and TSX. Hover over a variable to preview its value.  -->
Кроме того, в DevTools улучшен встроенный предварительный просмотр для Vue, инлайн HTML и TSX. Наведите курсор на переменную, чтобы просмотреть её значение.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/uLxVoWz3yyxYvOkgCq7t.png", alt="Встроенный предварительный просмотр для Vue.", width="800", height="700" %}

<!-- Apart from that, DevTools now shows the sourcemap of a stylesheet in the **Sources** panel. For instance, when you open a SCSS file, you can access the related CSS file by clicking on the sourcemap link. -->
Кроме того, DevTools теперь показывает карту источников стилей во вкладке **Источники** (Sources). Например, при открытии файла SCSS вы можете получить доступ к соответствующему файлу CSS, щелкнув ссылку на карту источников.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bK6TMGR8c6285bUlrIbx.png", alt="Ссылка на карту источников для SASS.", width="800", height="745" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c9af6b86b85bf23f9ed07d68b2d58b45910426de #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4f330a0d5cef6e74b5b73f258e55cc0960769bca #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9ec6a8092e7b45fc403d571982d1b214181d9695 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5a02aca17849514b1e2bc828f78aedece5161dfa #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c0928e31ba0ed2e81456f0109d323dd09768cfe1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/992cc762b6790a7bd1a0d5c12ed0169270ac7dd0 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f2bc726458c3d6507be9a4b56845b789c7ce653e #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b77b77646c6257ab80893f5d1b5d9607a969c0e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f1ab763383c7641644f7fd4f88c49465a70ed01 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/11bdafdbbd9bd153aea84b1fe03db4dff89d3aa9 #}

Задачи в трекере Chromium: [1385374](https://crbug.com/1385374), [1385632](https://crbug.com/1385632), [1385281](https://crbug.com/1385281), [1385269](https://crbug.com/1385269), [1383892](https://crbug.com/1383892), [1361862](https://crbug.com/1361862), [1383451](https://crbug.com/1383451), [1392106](https://crbug.com/1392106), [1149734](https://crbug.com/1149734)


<!-- ## Ergonomic and consistent Autocomplete in the Console {: #console } -->
## Эргономичное и единообразное автодополнения в Консоли (Console) {: #console }

<!-- DevTools enhances the autocompletion experience by implementing the following changes: -->
DevTools улучшил работу автодополнения, внедрив следующие изменения:

<!-- - `Tab` is always used for autocompletion. -->
- `Tab` всегда используется для автодополнения.
<!-- - The behavior of `Arrow right` and `Enter` varies based on context. -->
- Поведение `Стрелка вправо` и `Enter` варьируется в зависимости от контекста.
<!-- - The autocompletion experience is consistent across text editors, in the **Console**, **Sources**, and **Elements** panels  -->
- Поведение автодополнения одинаковое во всех текстовых редакторах во вкладках **Консоль** (Console), **Источники** (Sources) и **Элементы** (Elements).

<!-- For example, here is what happens when you type `cons` in the **Console**: -->
Например, вот что происходит когда вы начинаете печатать `cons` в **Консоли** (Console):

<!-- - The **Console** displays a list of autocomplete suggestions, with a subtle dotted border around the top option indicating that navigation has not yet begun. -->
- **Консоль** (Console) показывает список предложений автодополнения, с тонкой пунктирной рамкой вокруг верхней опции, указывая на то, что навигация по списку ещё не началась.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kSTUPmkQK3HzE7BElmAK.png", alt="Рамка из точек вокруг первой опции автодополнения.", width="800", height="580" %}

<!-- - The **Console** executes the line when you press `Enter`. Previously, it would automatically complete the line with the top suggestion. To auto-complete, press either `Tab` or `Arrow Right`. -->
- При нажатии `Enter` выполняется напечатанная строка. Ранее нажатие на `Enter` приводило к подстановке первого предложения из списка автодополнения. Для автодополнения нажмите `Tab` или `Стрелку вправо`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7SZ8AM51vI7WEIovjUDX.png", alt="Выполнение строки по Enter.", width="800", height="549" %}

<!-- - The **Console** highlights the selected option as you navigate through the suggestion list using the `Arrow up` and `Arrow down` shortcuts. -->
- **Консоль** (Console) подсвечивает выбранную опцию во время навигации по списку при помощи клавиш `Стрелка вниз` и `Стрелка вверх`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XxjZu5GrFnPEUZhoQN0i.png", alt="Подсветка при навигации по списку.", width="800", height="580" %}

<!-- - To auto-complete with the selected option during navigation, use the keyboard keys `Tab`, `Enter`, or `Arrow Right`. -->
- Чтобы подставить выбранную опцию автодополнения используйте клавиши `Tab`, `Enter`, или `Стрелка вправо`.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YU89q0lRFsocpdXS6ZMO.png", alt="Автодополнение опцией, выбранной при навигации.", width="800", height="360" %}

<!-- - When editing in the middle of code, for example, when the cursor is between `n` and `s`, use `Tab` for autocompletion, `Enter` to execute the line, and `Arrow Right` to move the cursor forward. -->
- Когда при редактировании курсор находится в тексте, например, между буквами `n` и `s`, используйте `Tab` для автодополнения, `Enter` для выполенняи строки и `Стрелка вправо` чтобы переместить курсор вперёд.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4jiMQ2btaT4MX7Y3VqgH.png", alt="Редактирование внутри строки.", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/00103b19eec2ba086c608b79ff34b696fe07bb62 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/89f259ddb6c36f486108e0dc9ccb4d4125a04917 #}

Задачи в трекере Chromium: [1399436](https://crbug.com/1399436), [1276960](https://crbug.com/1276960)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот ещё несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - A regression issue in DevTools, where it failed to stop at the `debugger` statement in inline scripts, has been resolved. ([1385374](https://crbug.com/1385374)) -->
- Устранена регрессивная проблема, когда DevTools не останавливался на операторе `debugger` во встроенных скриптах. ([1385374](https://crbug.com/1385374))
<!-- - A new **Console** setting that allows you to expand or collapse `console.trace()` messages by default. Toggle the settings via **Settings** > **Preferences** >  **Expand console.trace() messages by default**. ([1139616](https://crbug.com/1139616)) -->
- Новая настройка в **Консоли** (Console), которая позволяет по умолчанию скрывать или разворачивать сообщения `console.trace()`. Опция доступна в **Настройки** (Settings) > **Параметры** (Preferences) > **Разворачивать сообщения `console.trace()` по умолчанию** (Expand console.trace() messages by default). ([1139616](https://crbug.com/1139616))
<!-- - The [Snippets](/docs/devtools/javascript/snippets/) pane in the **Sources** panel supports enhanced autocomplete, similar to the **Console**. ([772949](https://crbug.com/772949))  -->
- Панель [Фрагменты (Snippets)](/docs/devtools/javascript/snippets/) во вкладке **Источники** (Sources) теперь поддерживает улучшенное автодополнение, по примеру **Консоли** (Console). ([772949](https://crbug.com/772949))
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/thkb1CYO0yYiGHll7Yp8.png", alt="Автодополнение в Фрагментах.", width="800", height="417" %}


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
