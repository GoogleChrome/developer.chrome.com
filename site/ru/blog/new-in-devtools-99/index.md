---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 99)"
authors:
  - jecelynyeen
date: 2022-02-21
updated: 2022-02-21
description:
  "Троттлинг запросов WebSocket, новая панель Reporting API, стилизация консоли и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qQf01GakdRgMhlnFD4B2.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-99
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='zFVWeOKZBHs' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Throttling WebSocket requests {: #websocket } -->
## Троттлинг запросов WebSocket {: #websocket }

<!-- The **Network** panel now supports throttling web socket requests. Previously, the network throttling didn't work on web socket requests. -->
Вкладка **Сеть** (Network) теперь поддерживает троттлинг запросов для веб-сокетов. Раньше замедление сети не работало для веб-сокетов.

<!-- Open the **Network** panel, click on a web socket request and open the **Messages** tab to observe the message transfers. Select **Slow 3G** to throttle the speed.  -->
Откройте вкладку **Сеть** (Network), кликните на веб-сокет запрос и откройте вкладку **Сообщения** (Messages) чтобы наблюдать за передачей сообщений. Выберите **Медленная 3G-сеть** (Slow 3G) чтобы замедлить скорость.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ZHJibovD0IRQ7KrWb0aD.png", alt="Троттлинг запросов WebSocket", width="800", height="540" %}

Задача в трекере Chromium: [423246](https://crbug.com/423246)


<!-- ## New Reporting API pane in the Application panel {: #reporting-api } -->
## Новая панель Reporting API во вкладке Приложение (Application) {: #reporting-api }

<!-- Use the new **Reporting API** pane to monitor the reports generated on your page and their status. -->
Используйте новую панель **Reporting API**, чтобы отслеживать созданные на вашей страницы отчёты и их статус.

<!-- The [Reporting API](https://web.dev/reporting-api/) is designed to help you monitor security violations of your page, deprecated API calls, and more.  -->
[Reporting API](https://web.dev/reporting-api/) помогает отслеживать нарушения безопасности на вашем сайте, устаревшие запросы API и многое другое.

<!-- Open a page which uses the Reporting API (e.g. [demo page](https://reporting-api-demo.glitch.me/)). In the **Application** panel, scroll down to the **Background services** section and select the **Reporting API** pane.  -->
Откроейте страницу, которая использует Reporting API (например, [демо страница](https://reporting-api-demo.glitch.me/)). Во вкладке **Приложение** (Application) проскрольте до раздела **Фоновые службы** (Background services) и выберите панель **Reporting API**.

<!-- The **Reports** section shows you a list of reports generated on your page and their status. Click on it to view the report’s details. -->
В разделе **Reports** отображается список сгенерированных на вашей странице отчётов и их статус. Кликните на один из них, чтобы посмотреть детали.

<!-- The **Endpoints** section gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header.  -->
Раздел **Endpoints** даёт представление о всех конечных точках, настроенных в заголовке `Reporting-Endpoints`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Панель Reporting API", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/668bc7a4bc6bea854e8fc21f0e0ca3953ff5e95a #}

Задача в трекере Chromium: [1205856](https://crbug.com/1205856)


<!-- ## Support wait until element is visible/clickable in the Recorder panel {: #recorder } -->
## Поддержка ожидания момента, когда элемент становится видимым/кликабельным во вкладке Recorder {: #recorder }

<!-- When replaying a user flow recording, the **Recorder** panel will now wait until the element is visible or clickable in the viewport or try to automatically scroll the element into the viewport before replaying the step. Previously, the replay would fail immediately. -->
При воспроизведении записи пользовательского сценария вкладка **Recorder** теперь будет ждать пока элемент станет видимым или кликабельным в области просмотра или попробует автоматически проскроллить элемент в область видимости перед воспроизведением шага. Раньше воспроизведение моментально прерывалось с ошибкой.

<!-- Here is an example of an off-screen menu positioned outside of the viewport and slide in when activated. The user flow is to toggle the menu, and click on the menu item. Previously, the replay would fail at the last step, because the menu item is still sliding in and not visible in the viewport yet. It’s fixed now. -->
Вот пример закадрового меню, расположенного за пределами окна просмотра, которое выдвигается при активации. В сценарии пользователь активирует меню и кликает на один из пунктов. Раньше воспроизведение завершалось неудачей в последнем шаге, потому что пункт меню все еще выдвигался и находился вне области видимости. Теперь всё исправлено.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qf8f2x1u1y5FEMSmkB3A.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499#c38)


<!-- ## Better console styling, formatting and filtering {: #console } -->
## Улучшенный внешний вид, форматирование и фильтрация в консоли {: #console }

<!-- ### Properly style log messages with ANSI escape code {: #console-styling }  -->
### Правильная стилизация сообщений в логах с использованием ANSI {: #console-styling }

<!-- You can now use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) to properly style console messages. Previously, DevTools console had very limited (and partly broken) support for ANSI escape sequences. -->
Теперь вы можете использовать [управляющие символы ANSI](https://ru.wikipedia.org/wiki/Управляющие_последовательности_ANSI) для стилизации сообщений в логах. Раньше консоль DevTools имела очень ограниченную (и частично нарушенную) поддержку управляющих символов ANSI.

<!-- It is common for [Node.js](https://nodejs.org/) developers to colorize log messages via ANSI escape sequences, often with the help of some styling libraries like [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur), etc.  -->
Это обычное явление для разработчиков на [Node.js](https://nodejs.org/) расскрашивать сообщения в логах при помощи ANSI, часто с использованием библиотек типа [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur) и подобных.

<!-- With these changes, you can now debug your Node.js applications seamlessly using DevTools, with proper colorized console messages. Open this [demo](https://stackblitz.com/edit/node-colors-test) to view it yourself! -->
Благодаря этим изменениям вы теперь можете беспрепятственно отлаживать приложения Node.js с помощью DevTools , с соответствующим цветовым оформлением сообщений в консоли. Откройте [демонстрацию] (https://stackblitz.com/edit/node-colors-test), чтобы просмотреть!

<!-- To learn more about formatting & styling console messages with DevTools, go to [format and style messages in the Console](/docs/devtools/console/format-style) documentation. -->
Узнайте больше о форматировании и стилизации сообщений в консоли при помощи DevTools в [документации](/docs/devtools/console/format-style).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/6Lu7Js1rgSmjV0cnhDlH.png", alt="Стилизация консоли", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f061ee77a872701a366a604903e639506574520a #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22a372d445c3f8cff00c2cfe48cb7373165bcd9d #}

Задачи в трекере Chromiums: [1282837](https://crbug.com/1282837), [1282076](https://crbug.com/1282076)


<!-- ### Properly support `%s`, `%d`, `%i` and `%f` format specifiers {: #console-format } -->
### Правильная поддержка спецификаторов формата `%s`, `%d`, `%i` and `%f` {: #console-format }

<!-- The **Console** now properly performs the `%s`, `%d`, `%i`, and `%f` type conversions as specified in the [Console Standard](https://console.spec.whatwg.org/). Previously, the conversation result was inconsistent. -->
**Консоль** (Console) теперь правильно выполняет преобразование типов `%s`, `%d`, `%i` и `%f` согласно [стандартам консоли](https://console.spec.whatwg.org/). Раньше результаты преобразования были непоследовательными.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eQPTyQMmyjOUQ6WD4n6N.png", alt="Поддержка спецификаторов формата в сообщениях в консоли", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ec299d49c6ab2c185df660766b1fb827db87f8a #}

Задачи в трекере Chromiums: [1277944](https://crbug.com/1277944), [1282076](https://crbug.com/1282076)


<!-- ### More intuitive console group filter {: #console-filter } -->
### Более интуитивный фильтр групп в консоли  {: #console-filter }

<!-- When filtering the console message, a console message is now shown if its message content matches the filter or the title of the group (or the ancestor group) matches the filter. Previously, the console group title would show despite the filter. -->
При фильтрации сообщений в консоли теперь сообщение показывается если его контент соответствует фильтру или если заголовок группы (или группы-предка) соответствует фильтру. Ранее заголовок группы показывался, несмотря на фильтр.

<!-- In addition, if a console message is shown, the group (or the ancestor group) it belongs to is now shown as well.  -->
Кроме того, при отображении сообщения консоли теперь отображается и группа (или группа-предок), к которой оно принадлежит.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/7iE7r79DI3cQxObhiZUh.png", alt="Фильтр группы в консоли", width="800", height="612" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/94734947c48283a56f93430f23b838cef10fd364 #}

Задача в трекере Chromium: [1068788](https://crbug.com/1068788)


<!-- ## Source maps improvements {: #sourcemap } -->
## Улучшение карты источников {: #sourcemap }

<!-- ### Debug Chrome extension with source map files {: #extension } -->
### Отладка расширений Chrome с помощью карта источников {: #extension }

<!-- You can now [debug Chrome extension](/docs/extensions/mv3/getstarted/#unpacked) with source map files. Previously, DevTools only supported inline sourcemap for Chrome extension debugging. -->
Теперь вы можете [отлаживать расширения для Chrome](/docs/extensions/mv3/getstarted/#unpacked) с использованием карта источников. Ранее DevTools поддерживал только встроенную карту источников для отладки расширений Chrome.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lnRa954ROl0MSSExlBl7.png", alt="Отладка расширений Chrome с помощью карта источников", width="800", height="518" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1e73eb62955de7c4b0920575c7b374d47dab6a65 #}

Задача в трекере Chromium: [212374](https://crbug.com/212374)


<!-- ### Improved source folder tree in the Sources panel {: #source-tree } -->
### Улучшено дерево папок источников во вкладке Источники (Sources) {: #source-tree }

<!-- The source folder tree in the **Sources** panel is now improved with less clutter in the folder structures and naming (e.g. “../”, “./”, etc). Under the hood, this is the result of normalizing the absolute source URLs in the source maps. -->
Дерево папок источников во вкладке **Источники** (Sources) теперь улучшено, с меньшим беспорядком в структуре папок и именовании (например, "../", "./" и т.д.). Под капотом это результат нормализации абсолютных URL-адресов источников в картах источников.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Wl1pPVfQ51NaCtpp3KuY.png", alt="Улучшенное дерево папок источников во вкладке Источники", width="800", height="444" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/68613ab02f6d556a2c5ac68ea08f466a534c6bd9 #}

Задача в трекере Chromium: [1284737](https://crbug.com/1284737)


<!-- ### Display worker source files in the Sources panel {: #worker-sourcemap } -->
### Отображение исходных файлов воркеров во вкладке Источники (Sources) {: #worker-sourcemap }

<!-- [Worker](https://web.dev/workers-overview/) (e.g. web worker, service worker) source files with relative SourceURL are now displayed in the **Source** panel. Previously, worker source files were not handled correctly. -->
Исходные файлы [воркера](https://web.dev/workers-overview/) (веб-воркера, сервис-воркера) с относительным SourceURL теперь отображаются во вкладке **Источники** (Sources). Ранее исходные файлы воркеров обрабатывались неправильно.


{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/apH5n92bqYWINMQn5VXa.png", alt="Исходный файл сервис-вордекра во вкладке Источники", width="800", height="509" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6e877d5e1a3ccca22e866fb2a70330613aeb6964 #}

Задача в трекере Chromium: [1277002](https://crbug.com/1277002)


<!-- ## Chrome’s Auto Dark Theme updates {: #auto-dark-mode } -->
## Обновление автоматической тёмной темы Chrome {: #auto-dark-mode }

<!-- The [Auto Dark Theme emulation](/blog/new-in-devtools-96/#auto-dark-mode) UI is now simplified. It is a checkbox now, it was a dropdown previously. -->
UI [эмуляции автоматической тёмной темы](/blog/new-in-devtools-96/#auto-dark-mode) теперь упрощён. Сейчас это чекбокс, раньше это был выпадающий список.

<!-- Apart from that, when the [Auto Dark Theme](/blog/auto-dark-theme/) is enabled, the **Emulate prefers-color-scheme** dropdown will be disabled and set to **prefers-color-scheme: dark** automatically. -->
Кроме того, если [автоматическая тёмная тема](/blog/auto-dark-theme/) активирована, выпадающий список **Эмулировать медиафункцию prefers-color-scheme** становится неактивным и устанавливает значение **prefers-color-scheme: dark** автоматически.


<!-- Chrome 96 introduces an [Origin Trial](/blog/origin-trials/) for [Auto Dark Theme](/blog/auto-dark-theme/) on Android. With this feature, the browser applies an automatically generated dark theme to light themed sites, when the user has opted into dark themes in the Operating System. -->
Chrome 96 анонсировал [ранний доступ](/blog/origin-trials/) для [автоматической тёмной темы](/blog/auto-dark-theme/) на Android. С помощью этой функции браузер применяет автоматически созданную тёмную тему к сайтам со светлой темой, если пользователь выбрал тёмную тему в операционной системе.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eqfY1jZI8kY7BknnuAom.png", alt="Эмуляция автоматической тёмной темы", width="800", height="476" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8443d2894b6401695ce94657e6afd5ad399eef28 #}

Задача в трекере Chromium: [1243309](https://crbug.com/1243309)


<!-- ## Touch-friendly color-picker and split pane {: #touch-friendly } -->
## Удобные сенсорные палитра цветов и разделитель панелей {: #touch-friendly }

<!-- You can now select color, and resize the [Drawer](/docs/devtools/customize/#drawer) in DevTools with fingers or stylus on touchscreen devices. -->
Теперь вы можете выбрать цвет или изменить размер [Drawer](/docs/devtools/customize/#drawer) в DevTools при помощи пальцев или стилуса на устройствах с сенсорным экраном.

<!-- Here is an example captured with the [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/) device touchscreen. -->
Вот пример, записанный на сенсорном экране [Google Pixelbook](https://www.google.com/chromebook/device/google-pixelbook/).

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/aA3Oann2z26Yty9sgNB2.mp4", class="screenshot", autoplay=true, controls=true, loop=true, muted=true %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f60936b29519e0cf387cd0a133d43885c6eb183d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/22bb84d657aa69f6f7d5067605c2c133a5714172 #}

Задачи в трекере Chromiums: [1284245](https://crbug.com/1284245), [1284995](https://crbug.com/1284995)


<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Fixed the [edit cookies](/docs/devtools/storage/cookies/#edit) issue in the **Cookies** pane. ([1290196](https://crbug.com/1290196)) -->
- Исправлены неполадки с [редактированием cookies](/docs/devtools/storage/cookies/#edit) в панели **Файлы cookie** (Cookies). ([1290196](https://crbug.com/1290196))
<!-- - Use `Shift` + `Tab` to select the previous command in the [Command menu](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743)) -->
- Использование `Shift` + `Tab` для выбора предыдущей команды в [Командном меню (Command menu)](/docs/devtools/command-menu/). ([1278743](https://crbug.com/1278743))
<!-- - Report [CORS preflight request](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) issues in the [Issues](/docs/devtools/issues/) tab. ([1272445](https://crbug.com/1272445)). -->
- Вывод сообщений о проблемах с [предварительным запросом CORS](https://web.dev/cross-origin-resource-sharing/#preflight-requests-for-complex-http-calls) во вкладке [Проблемы (Issues)](/docs/devtools/issues/). ([1272445](https://crbug.com/1272445))
<!-- - Report [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) issues in the [Issues](/docs/devtools/issues/) tab. ([1219359](https://crbug.com/1219359)). -->
- Вывод сообщений о проблемах с [User-Agent Client Hints](https://web.dev/user-agent-client-hints/) во вкладке [Проблемы (Issues)](/docs/devtools/issues/). ([1219359](https://crbug.com/1219359))
<!-- - Fixed `Shift` + `Delete` and `Page up` / `Page down` behaviors in the **Sources** and **Console** panel. ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662)) -->
- Исправлено поведение `Shift` + `Delete` и `Page up` / `Page down` во вкладках **Источники** (Sources) и **Консоль** (Console). ([1278461](https://crbug.com/1278461), [1285662](https://crbug.com/1285662))
<!-- - Close the breakpoint edit dialog on breakpoint removal in the **Sources** panel. (922513)  -->
- Закрытие диалога редактирования точки останова при удалении точки останова во вкладке **Источники** (Sources). ([922513](https://bugs.chromium.org/p/chromium/issues/detail?id=922513))
<!-- - No reload required when [switching light/dark theme](/docs/devtools/customize/dark-theme/) in DevTools. ([1278738](https://crbug.com/1278738)) -->
- Больше не нужна перезагрузка при [переключении светлой/тёмной темы](/docs/devtools/customize/dark-theme/) в DevTools. ([1278738](https://crbug.com/1278738))


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
