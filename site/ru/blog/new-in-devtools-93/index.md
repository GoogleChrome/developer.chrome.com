---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-08-19
updated: 2021-08-19
description:
  "Редактируемые выражения от контейнера, предварительный просмотр веб-бандлов, улучшенная обработка строк в консоли и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/lF3ZTjr5zftuNIMofL6g.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

<!-- lint disable no-dash-spaces -->

*Переводы предоставлены [Alena Batitskaya](https://github.com/solarrust). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id="1VaPAnUGRz8" %}

## Редактируемые выражения от контейнера в панели Styles {: #container-queries }

Теперь вы можете просматривать и редактировать [выражения от
контейнера](https://web.dev/new-responsive/#responsive-to-the-container) в
панели **Styles**.


Выражения от контейнера обеспечивают более динамичный подход к адаптивному
дизайну. Директива `@container` работает аналогично медиавыражению с `@media`.
Однако вместо того, чтобы запрашивать информацию о вьюпорте браузера,
`@container` запрашивает информацию у родительского контейнера, соответствующего
определённым критериям.


В панели **Elements** кликните на DOM-элемент с директивой `@container`, и в
панели **Styles** DevTools отобразится информация о `@container`. Кликните на
директиву, чтобы изменить размеры. В панели **Styles** также отобразится
информация о соответствующем контейнере. Наведите на него курсор, чтобы подсветить элемент-контейнер на странице и проверить его размеры.
Кликните на строку, чтобы выбрать элемент-контейнер.

Выражения от контейнеров пока на стадии эксперимента. Пожалуйста, включите флаг
`#enable-container-queries` по ссылке `chrome://flags`, чтобы включить эту функциональность.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3NzGBpukHQfUZUKUpUgf.png",
alt="Редактируемые выражения от контейнера в панели Styles", width="800",
height="554" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/46cdd9cd019f088e1134abe84dbc7d53ac60585a
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/a7e1eac63bee3728b41ae440f2ec250559e9c667
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/ef157dab2ccf321941548a51d350f9383a78d283
#}

Задача в трекере Chromium: [1146422](https://crbug.com/1146422)


## Предварительный просмотр веб-бандлов во вкладке Network {: #web-bundle }

[Веб-бандлы](https://web.dev/web-bundles/) — это способ инкапсуляции одного или
нескольких HTTP-ресурсов в один файл. Теперь вы можете просмотреть содержимое
веб-бандла во вкладке **Network**.

Веб-бандлы пока на стадии эксперимента. Пожалуйста, включите флаг
`#enable-experimental-web-platform-features` по ссылке `chrome://flags` чтобы
включить эту функциональность.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png",
alt="Просмотр веб-бандлов", width="800", height="492" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7
#}

Задача в трекере Chromium: [1182537](https://crbug.com/1182537)


## Отладка Attribution Reporting API {: #attribution-reporting }

Ошибки, связанные с Attribution Reporting API, теперь отображаются во вкладке
**Issues**.

[Attribution
Reporting](/docs/privacy-sandbox/attribution-reporting/)
это новый API, который поможет вам понять,
когда действия пользователя (например, клик или просмотр рекламы) приводят к
конверсии, без использования межсайтовых идентификаторов.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png",
alt="Ошибки, связанные с Attribution Reporting API, во вкладке Issues",
width="800", height="501" %}

Задача в трекере Chromium: [1190735](https://crbug.com/1190735)


## Улучшенная работа со строками в консоли {: #string }

Новое контекстное меню во вкладке **Console** позволяет скопировать любую строку
в виде содержимого, литерала JavaScript или литерала JSON.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png",
alt="Новое контекстное меню в консоли", width="800", height="477" %}

Начиная с версии Chrome 90, DevTools обновил **Console**, чтобы [строки
всегда форматировались как валидные
литералы JSON](/blog/new-in-devtools-90/#double-quotes). Мы получили отзывы от разработчиков, что это изменение может запутатать. Некоторые считают,
что экранирование избыточно и делает вывод нечитаемым.

**Console** теперь форматирует выходные строки как валидные
литералы JavaScript и, кроме того, предоставляет вам 3 варианта копирования строки.
Опция **Copy as JavaScript literal** будет экранировать спецсимволы и заключать строку в
одинарные кавычки, двойные кавычки или обратные кавычки в зависимости от содержимого строки. Опция
**Copy string contents**, напротив, скопирует всё содержимое строки без изменений
(включая переносы и спецсимволы) в буфер обмена. Опция **Copy as JSON
literal** форматирует строку как валидный литерал JSON и копирует её в буфер обмена.

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539
#}

Задача в трекере Chromium: [1208389](https://crbug.com/1208389)


## Улучшенная отладка CORS {: #cors }

TypeErrors, связанные с CORS, во вкладке **Console** теперь связаны с
вкладками Network и Issues.

Используйте две новые иконки рядом с сообщением об ошибке, связанной с CORS, чтобы просмотреть сетевой
запрос или более подробно изучить сообщение об ошибке и получить потенциальные варианты решения
во вкладке Issues.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png",
alt="Иконки рядом с текстом ошибки CORS", width="800", height="485" %}

Задача в трекере Chromium: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }

Панель **Lighthouse** теперь работает под управлением Lighthouse 8.1.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png",
alt="Lighthouse", width="800", height="628" %}

Если ваш сайт предоставляет Lighthouse исходные карты, то найдите кнопку **View Treemap**,
чтобы увидеть разбивку вашего отправленного кода JavaScript с возможностью фильтрации по
размеру и охвату при загрузке.

Отчёт также включает новый фильтр метрик (см. раздел **Show audits relevant to** на
снимке экрана). Выберите метрику, чтобы сосредоточиться на возможностях и диагностике, наиболее релевантных для улучшения именно этой метрики.

Метрика **Performance Category** претерпела ряд изменений для согласования с
другими инструментами оценки производительности и лучшего отражения состояния сети.

Ознакомьтесь с [заметками к
релизу](https://github.com/GoogleChrome/lighthouse/releases) для просмотра полного списка
изменений.

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/62b16561e433f4aa1645826923222699ac4bad38
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/16d96a25f24c934ef4dcbbc7b827015abdd228a1
#}

Задача в трекере Chromium: [772558](https://crbug.com/772558)


## Отображение `new_note_url` в панели Manifest {: #new-note-url }

В панели Manifest теперь отображается
[`new_note_url`](https://wicg.github.io/manifest-incubations/index.html#dfn-note_taking).

В настоящее время в ChromeOS (CrOS) приложения Chrome и Android, в которых
есть возможность создания заметок, могут быть выбраны в качестве приложения
для создания заметок в настройках стилуса (отображаются, если устройство CrOS
используется со стилусом). Если приложение помечено таким образом,
его можно запустить по кнопке «Создать
заметку». Добавление поля `new-note-url` в манифесте приложения является частью
работы по добавлению аналогичных функций в веб-приложения.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png",
alt="new-note-url в панели Manifest", width="800", height="477" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e
#}

Задача в трекере Chromium: [1185678](https://crbug.com/1185678)


## Исправление соответствия селекторам CSS {: #matching-selectors }

DevTools исправил отображение соответствия селекторам CSS, в прошлой версии это не работало.

Разделённые запятыми селекторы CSS в панели **Styles** окрашиваются по разному
в зависимости от того, соответствуют ли они выбранному узлу DOM:

- Часть селектора, не соответствующая узлу, окрашена в светло-серый цвет.
- Часть селектора, соответствующая узлу, окрашена в чёрный цвет.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png",
alt="Перечисления CSS-селекторов", width="800", height="477" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3
#}

Задача в трекере Chromium: [1219153](https://crbug.com/1219153)


## Форматирование ответов JSON во вкладке Network {: #pretty-print-json }

Теперь вы можете отформатировать ответы JSON во вкладке **Network**.

Откройте ответ JSON во вкладке **Network** и нажмите на значок `{}`,
чтобы его отформатировать.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt="
Форматирование JSON-ответов во вкладке Network", width="800", height="523" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb
#}

Задача в трекере Chromium: [998674](https://crbug.com/998674)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
