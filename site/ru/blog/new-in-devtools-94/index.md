---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 94)"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "Пользуйтесь DevTools на своём языке, новые устройства Nest Hub, новый бэдж для выражений от контейнера и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/J1jlUVBQQDw1mTOIODyt.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

<!-- lint disable no-dash-spaces -->

*Переводы предоставлены [Alena Batitskaya](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% include 'partials/devtools/ru/banner.md' %}


## Пользуйтесь DevTools на своём языке {: #localized }

В Chrome DevTools теперь поддерживается более 80 языков! Выберите свой язык для более комфортной работы.

Откройте [Settings](/docs/devtools/customize/#settings), затем выберите предпочитаемый язык в выпадающем меню **Preferences** > **Language** и перезапустите DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="Изменение языка в Settings > Preferences", width="800", height="494" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Задача в трекере Chromium: [1163928](https://crbug.com/1163928)


## Новые устройства Nest в списке девайсов {: #nest-hub }

Теперь вы можете симулировать разрешения экранов устройств Nest Hub и Nest Hub Max в [режиме симуляции](/docs/devtools/device-mode/).

Кликните иконку [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, выберите Nest Hub или Nest Hub Max в списке девайсов.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub в режиме симуляции", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Задача в трекере Chromium: [1223525](https://crbug.com/1223525)


## Испытания источника при детальном просмотре фрейма {: #origin-trials }

Теперь вы можете получить информацию об [испытаниях источника](/blog/origin-trials/) сайта в окне детального просмотра в панели Application.

[Испытания источника](/blog/origin-trials/) дают вам доступ к новым экспериментальным фичам для создания функциональности, которую ваши пользователи могут опробовать раньше, чем функция станет доступной для всех.

Откройте страницу с испытаниями источника (например, [демо-страницу](https://mediastreamtrack.glitch.me)). В панели **Application** прокрутите вниз до секции **Frames** и выберите верхний фрейм.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Испытания источника при детальном просмотре фрейма", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Задача в трекере Chromium: [607555](https://crbug.com/607555)

## Новый бэдж для выражений от контейнера {: #container-queries }

Новый бедж **container** появляется рядом с элементов-контейнером (родительский элемент, соответствующий условию директивы `@container`). Кликните на бэдж, чтобы увидеть наложение выбранного контейнера и всех его потомков на странице.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="бэдж для выражения от контейнера", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Задача в трекере Chromium: [1146422](https://crbug.com/1146422)


## Новый чекбокс для инвертирования фильтров в панели Network {: #invert-network-filter }

Используйте новый чекбокс **Invert**, чтобы инвертировать фильтры в панели Network.

Например, вы можете написать "status-code: 404" чтобы отфильтровать сетевые запросы со статусом 404. Включите чекбокс **Invert** и инвертируйте фильтр — в результатах будут показаны сетевые запросы, чей статус не 404.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Инверсия фильтров в сетевых запросах", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Задача в трекере Chromium: [1054464](https://crbug.com/1054464)


## Грядущее упразднение боковой панели в консоли {: #deprecated }

Боковая колонка в Console будет убрана, а фильтры переедут в панель инструментов. Есть возражения или мнение по этому вопросу? Выскажетесь в [трекере задач](https://crbug.com/1232937).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Сообщение об упразднении боковой панели в Console", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Задача в трекере Chromium: [1232937](https://crbug.com/1232937)


## Отображение необработанных заголовков `Set-Cookie` на вкладке Issues и в панели Network {: #raw-cookies }

DevTools теперь отображает необработанные заголовки `Set-Cookie` на вкладке **Issues**.

Раньше DevTools не показывали неправильно сформированные куки (с неправильным заголовком `Set-Cookie`) в панели Network. С новым фильтром `response-header-set-cookie`, который был добавлен в панели **Network**, пользователи могут отфильтровывать запросы с необработанными заголовками `Set-Cookie`. DevTools свяжут необработанные заголовки `Set-Cookie` во вкладке **Issues** с панелью **Network**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Необработанный заголовок 'Set-Cookie' во вкладке Issues tab и в панели Network", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Задача в трекере Chromium: [1179186](https://crbug.com/1179186)


## Последовательное отображение нативных аксессоров как собственных свойств в консоли {: #native-accessors }

Во вкладке **Console** теперь отображаются нативные аксессоры в виде собственных свойств объекта.

Например, если посмотреть на объявление `new Int8Array([1, 2, 3])` в **Console**, то нативные аксессоры `length`, `byteOffset` не отобразятся в превью. В свежем обновлении нативные аксессоры будут видны в превью и значения будут показаны при просмотре в развёрнутом виде.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Последовательное отображение нативных аксессоров как собственных свойств в консоли", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Задача в трекере Chromiums: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Правильная трассировка стека ошибок для встроенных скриптов с #sourceURL {: #inline-script }

DevTools теперь выполняет встроенные скрипты с `#sourceURL` и показывает правильную трассировку стека ошибок для отладки.

Раньше DevTools показывали неправильное местоположение для встроенных скриптов с `#sourceURL`, ориентируясь относительно всего документа, а не открывающего тега `<script>`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Правильная трассировка стека ошибок для встроенных скриптов с #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Задача в трекере Chromiums: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## Изменение формата цвета во вкладке Computed {: #color-unit }

Теперь вы можете изменить формат цвета у любого элемента прямо из вкладки Computed, зажав <kbd>Shift</kbd> и кликнув на превью цвета.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+клик на превью цвета для изменения формата", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Задача в трекере Chromium: [1226371](https://crbug.com/1226371)

## Кастомные всплывающие подсказки заменены на нативные HTML-подсказки {: #tooltip }

DevTools теперь поддерживает нативные HTML-подсказки во всех компонентах. В DevTools долгое время использовалась кастомная реализация всплывающих подсказок из-за невозможности стилизовать стандартные HTML-подсказки.

К сожалению, поддержка кастомных всплывающих подсказок очень сложно и мы регулярно сталкивались со разными багами.

Взвесив все преимущества кастомной реализации мы пришли к выводу, что для DevTools достаточно нативных HTML-подсказок. Их использование позволяет избежать множества проблем для наших пользователей.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="всплывающая подсказка в DevTools", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Задача в трекере Chromium: [1223391](https://crbug.com/1223391)


## [Эксперимент] Скрытие задач на вкладке Issues {: #hide-issues }

{% Aside %}
Чтобы включить эту экспериментальную возможность, перейдите в **Settings** > **Experiments** и включите чекбокс **Enable hide issues menu**.
{% endAside %}

Включите эксперимент **hide issues menu** чтобы скрывать задачи во вкладке **Issues**. Это способ сосредоточиться только на важных для вас задачах.

На вкладке **Issue** наведите курсор на задачу, кликните на иконку меню  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; справа и выберите **Hide issues like this** чтобы скрыть её.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Экспериментальное меню для скрытия задач", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Задача в трекере Chromium: [1175722](https://crbug.com/1175722)

{% include 'partials/devtools/ru/reach-out.md' %}
{% include 'partials/devtools/ru/whats-new.md' %}
