---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 93)"
authors:
  - jecelynyeen
date: 2021-08-19
updated: 2021-08-19
description:
  "Редактируемые выражения от контейнера, предварительный просмотр веб-бандлов, улучшенная обработка строк в консоли и многое другое."
hero: 'iimage/dPDCek3EhZgLQPGtEG3y0fTn4v82/lF3ZTjr5zftuNIMofL6g.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-93
---

**Переводы предоставлены [Alena Batitskaya](https://github.com/solarrust).**

{% Aside %} Заинтересованы в улучшении DevTools? Зарегистрируйтесь и примите
участие в [исследовании пользовательского опыта
здесь](https://google.qualtrics.com/jfe/form/SV_9YbKj35IGoGsDBj?reserved=1&utm_source=Website%20feature&Q_Language=en&utm_medium=own_web&utm_campaign=Q4&productTag=chrm&campaignDate=November2020&referral_code=UXFm430458).

{% endAside %}


## Редактируемые выражения от контейнера в панели Styles {: #container-queries }

Теперь вы можете просматривать и редактировать [выражения от
контейнера](https://web.dev/new-responsive/#responsive-to-the-container) в
панели **Styles**.


Выражения от контейнера обеспечивают более динамичный подход к адаптивному
дизайну. Директива `@container` работает аналогично медиавыражению с `@media`.
Однако вместо того, чтобы запрашивать информацию о вьюпорте браузера
`@container` запрашивает информацию у родительского контейнера, соответствующего
определённым критериям.


В панели **Elements** кликните на DOM-элемент с директивой `@container` и в
панели **Styles** DevTools отобразиться информация о `@container`. Кликните на
директиву чтобы изменить размеры. В панели **Styles** также отобразится
информация о соответствующем контейнере. Если навести курсор, то
элемент-контейнер подсветится на странице и можно будет проверить его размеры.
Кликните на строку чтобы выбрать элемент-контейнер.

Выражения от контейнеров пока экспериментальные. Пожалуйста, включите флаг
`#enable-container-queries` по адресу `chrome://flags` чтобы протестировать её.

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


## Предварительный просмотр веб-бандлов в панели Network {: #web-bundle }

[Веб-бандлы](https://web.dev/web-bundles/) это способ объединения одного или
нескольких HTTP-ресурсов в один файл. Теперь вы можете просмортеть содержимое
веб-бандла на вкладке **Network**.

Веб-бандлы пока экспериментальные. Пожалуйста, включите флаг
`#enable-experimental-web-platform-features` по адресу `chrome://flags` чтобы
протестировать её.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PEv1mNA14K18t5P3N6Yj.png",
alt="просмотр веб-бандлов", width="800", height="492" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/e7672c40f2febc80786632c188b6029b2f2ac7b7
#}

Задача в трекере Chromium: [1182537](https://crbug.com/1182537) 


## Отладка Attribution Reporting API {: #attribution-reporting }

Ошибки, связанные с Attribution Reporting API, теперь видны во вкладке
**Issues**.

[Attribution
Reporting](https://developer.chrome.com/docs/privacy-sandbox/attribution-reporting/)
это новое API, которое поможет без всяких межсайтовых идетификаторов понять,
когда действия пользователя (например, клик или просмотр рекламы) приводят к
конверсии.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png",
alt="Ошибки, связанные с Attribution Reporting API, во вкладке Issues",
width="800", height="501" %}

Задача в трекере Chromium: [1190735](https://crbug.com/1190735)


## Улучшенная обработка строк в консоли {: #string }

Новое контекстное меню во вкладке **Console** позволит скопировать любую строку
как текст, JavaScript-литерал или JSON-литерал.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O5uMSgkHrQ2mQDSjmg3A.png",
alt="Новое контекстное меню в консоли", width="800", height="477" %}

В 90 версии Chrome обновились DevTools и теперь во вкладке **Console** [строки
всегда форматируются как валидные
JSON-литералы](/blog/new-in-devtools-90/#double-quotes). Мы получили фидбэк от
разработчиков, что это изменение слегка сбивает с толку. Некоторые посчитали,
что экранирование слишком громосткое и затрудняет чтение вывода. 

Во вкладке **Console** строки теперь форматируются как валидные
JavaScript-литералы, а вам предоставляется выбор из 3 опций копирования строки.
Опция **Copy as JavaScript literal** экранирует спецсимволы и обернёт строку в
одинарные, двойные кавычки или бэктики в зависимости от содержимого. Опция
**Copy string contents** напротив, скопирует всё содержимое строки без изменений
(включая переносы и спецсимволы) в буфер обмена. И наконец опция **Copy as JSON
literal** при копировании в буфер обмена отформатирует строку так, чтобы она
стала валидным JSON-литералом.

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/9242d13569e9fe67ac01e75d28fa2b6e6bf310d2
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/5715a7b9800532d8b28e2c9fa2d3c1e220ba54a8
#} {#
https://chromium.googlesource.com/devtools/devtools-frontend/+/29236e333a856ae5a952fe4182545b1e2bde5539
#}

Задача в трекере Chromium: [1208389](https://crbug.com/1208389)


## Улучшенная отладка CORS {: #cors }

Связанные с CORS ошибки TypeErrors во вкладке **Console** теперь связаны с
вкладками Network и Issues.

Кликните на две новые иконки рядом с текстом ошибки CORS чтобы увидеть сетевой
запрос или прочитать расширенное сообщение об ошибке и понять варианты решения
на вкладке Issues. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VzoUggSoM0FnkDlIFPhq.png",
alt="Иконки рядом с текстом ошибки CORS", width="800", height="485" %}

Задача в трекере Chromium: [1213393](https://crbug.com/1213393)


## Lighthouse 8.1 {: #lighthouse }

Панель **Lighthouse** теперь работает под управлением Lighthouse 8.1. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/wENi9RXYMxdhm3zI4NVu.png",
alt="Lighthouse", width="800", height="628" %}

Если ваш сайт предоставляет карты кода, то нажмите на кнопку **View Treemap**.
Вы увидите разбивку отправленного JavaScript-кода с возможностью фильтрации по
размеру и охвату при загрузке.

В отчёт включён новый фильтр метрик (фильтр **Show audits relevant to** на
скриншоте). Выберите конкретную метрику, чтобы увидеть относящиеся только к ней
возможности и диагностику.

Метрика **Performance Category** претерпела ряд изменений для согласования с
другими инструментами и лучшего отражения состояния сети.

Загляните в [заметки к
релизу](https://github.com/GoogleChrome/lighthouse/releases) за полным списком
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

В настоящее время в Chrome OS (CrOS), приложениях Chrome и Android, в которых
есть возможность «создания заметки», могут быть выбраны в качестве прилолжения
для заметок в настройках стилуса (показываются если устройство на CrOS
используется со стилусом). Когда приложение помечено как возможное для создания
заметок, то оно может быть вырбрано в выпадающем меню по кнопке «Создать
заметку». Добавление поля `new-note-url` в манифесте приложения является частью
усилий по добавлению аналогичных функций в веб-приложения.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2Cwggroar7pNesfAQi4K.png",
alt="new-note-url в панели Manifest", width="800", height="477" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/51f8aaf568db256f3390c37393d294c82017565e
#}

Задача в трекере Chromium: [1185678](https://crbug.com/1185678)


## Правка перечисления CSS-селекторов {: #matching-selectors }

Поправлено отображение перечисления CSS-селекторов в DevTools. Оно работало
неправильно в прошлой версии.

Селекторы, разделённые запятой, в панели **Styles** окрашиваются в разные цвета
в зависимости от соответствия выбранной DOM-ноде:

- Часть селектора, не соответствующая ноде, окрашена в светло-серый цвет.
- Часть селектора, соответствующая ноде, окрашена в чёрный цвет.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/O7CoHBrKA9cVKci1SM0M.png",
alt="Перечисления CSS-селекторов", width="800", height="477" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/123eac3c8ceeb2e788aa4756d3104db0265f9ad3
#}

Задача в трекере Chromium: [1219153](https://crbug.com/1219153)


## Форматирование JSON-ответов во вкладке Network {: #pretty-print-json }

Теперь вы можете отформатировать JSON-ответы во вкладке **Network**.

Откройте ответ в формате JSON во вкладке **Network** и нажмите на иконку `{}`
чтобы отформатировать его.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/x2NKXwJPzjycjeD7cLH6.png", alt="
Форматирование JSON-ответов во вкладке Network", width="800", height="523" %}

{#
https://chromium.googlesource.com/devtools/devtools-frontend/+/250c88b4d02da283cd0a96204b1592f59fda2fcb
#}

Баг в трекере Chromium: [998674](https://crbug.com/998674) 
