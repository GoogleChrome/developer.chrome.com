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

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}


## Пользуйтесь DevTools на своём языке {: #localized }

Chrome DevTools теперь поддерживает более 80 языков, позволяя вам работать на предпочитаемом вами языке!

Откройте [Settings](/docs/devtools/customize/#settings), выберите предпочитаемый язык в выпадающем меню **Preferences** > **Language** и перезапустите DevTools.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/G3UUsRPIa890102AE5eG.png", alt="Изменение языка в Settings > Preferences", width="800", height="519" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Задача в трекере Chromium: [1163928](https://crbug.com/1163928)


## Новые устройства Nest Hub в списке девайсов {: #nest-hub }

Теперь вы можете симулировать разрешения экранов устройств Nest Hub и Nest Hub Max в [режиме устройств](/docs/devtools/device-mode/).

Кликните на иконку [Toggle Device Toolbar](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="Toggle Device Toolbar", width="20", height="22" %} &nbsp;, выберите Nest Hub или Nest Hub Max в списке устройств.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="Nest Hub в режиме симуляции", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Задача в трекере Chromium: [1223525](https://crbug.com/1223525)


## Информация об origin trials в свойствах фрейма {: #origin-trials }

Вы можете получить информацию об [origin trials](/blog/origin-trials/) сайта в детальном представлении фрейма вкладки Application.

[Origin trials](/blog/origin-trials/) дают вам доступ к новой или экспериментальной функции Chrome для добавления функциональности, которую ваши пользователи могут опробовать в течение ограниченного времени, прежде чем эта функция станет доступна для всех.

Откройте страницу с origin trials (например, [демо-страницу](https://mediastreamtrack.glitch.me)). Во вкладке **Application** прокрутите вниз до секции **Frames** и выберите верхний фрейм.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Origin trials в панели свойств фрейма", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Задача в трекере Chromium: [607555](https://crbug.com/607555)

## Новый значок для выражений от контейнера {: #container-queries }

Новый значок **container** добавляется рядом с элементами-контейнерами (элементы-предки, соответствующие критериям условий директивы `@container`). Кликните на значок, чтобы переключить отображение наложения выбранного контейнера и всех его запрашивающих потомков на странице.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="Значок для выражения от контейнера", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Задача в трекере Chromium: [1146422](https://crbug.com/1146422)


## Новый чекбокс для инвертирования фильтров сети {: #invert-network-filter }

Используйте новый чекбокс **Invert**, чтобы инвертировать фильтры во вкладке Network.

Например, вы можете написать "status-code: 404", чтобы показать только сетевые запросы со статусом 404. Установите флажок **Invert**,  чтобы  инвертировать фильтр (показать все сетевые запросы, не имеющие статуса 404).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="Инвертирование фильтра сетевых запросов", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Задача в трекере Chromium: [1054464](https://crbug.com/1054464)


## Предстоящее упразднение боковой колонки Console {: #deprecated }

Боковая колонка Console будет убрана в пользу перемещения интерфейса фильтра в панель инструментов. У Вас есть вопросы или отзывы? Дайте нам знать через эту [задачу в трекере](https://crbug.com/1232937).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="Сообщение о предстоящем удалении боковой колонки в панели Console", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Задача в трекере Chromium: [1232937](https://crbug.com/1232937)


## Отображение необработанных заголовков `Set-Cookie` во вкладках Issues и Network {: #raw-cookies }

DevTools теперь отображает необработанные заголовки `Set-Cookie` во вкладке **Issues**.

Раньше DevTools не показывали неправильно сформированные куки (с неправильным заголовком `Set-Cookie`) в панели Network. С добавлением нового фильтра `response-header-set-cookie` в панели **Network**, пользователи могут отфильтровывать запросы с необработанным заголовком `Set-Cookie`. DevTools будет ссылаться с необработанных заголовков `Set-Cookie` во вкладке **Issues** на вкладку **Network**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="Необработанный заголовок 'Set-Cookie' во вкладке Issues и в панели Network", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Задача в трекере Chromium: [1179186](https://crbug.com/1179186)


## Последовательное отображение нативных аксессоров как собственных свойств в консоли {: #native-accessors }

**Console** теперь последовательно отображает нативные аксессоры в виде собственных свойств объекта.

Например, при оценке выражения `new Int8Array([1, 2, 3])` в **Console**, такие нативные аксессоры как `length`, `byteOffset` не отображались в превью. В последнем обновлении нативные аксессоры показываются в превью и значения подсчитываются при раскрытии.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Последовательное отображение нативных аксессоров как собственных свойств в консоли", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Задача в трекере Chromiums: [1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Правильная трассировка стека ошибок для встроенных скриптов с #sourceURL {: #inline-script }

DevTools теперь выполняет встроенные скрипты с `#sourceURL` и показывает правильные трассировки стека ошибок для отладки.

Ранее DevTools отображал неправильное местоположение встроенных скриптов с `#sourceURL`, относительно окружающего документа, а не открывающего тега `<script>`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Правильная трассировка стека ошибок для встроенных скриптов с #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Задача в трекере Chromiums: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## Изменение формата цвета в панели Computed {: #color-unit }

Теперь вы можете изменить формат цвета любого элемента в панели Computed, удерживая <kbd>Shift</kbd> и кликнув на превью цвета.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="Shift+клик на превью цвета для изменения формата", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Задача в трекере Chromium: [1226371](https://crbug.com/1226371)

## Замена кастомных всплывающих подсказок на нативные HTML-подсказки {: #tooltip }

DevTools теперь применяет нативные HTML-подсказки во всех компонентах. В DevTools долгое время использовалась кастомная реализация всплывающих подсказок, из-за отсутствия стилизации нативной.

К сожалению, поддержка кастомной реализации всплывающей подсказки является сложной задачей, и мы регулярно сталкивались с нетривиальными проблемами.

Повторно взвесив преимущества кастомных реализаций, мы обнаружили, что нативных всплывающих подсказок HTML достаточно для DevTools, а их использование предотвращает множество проблем для наших пользователей.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="Всплывающая подсказка в DevTools", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Задача в трекере Chromium: [1223391](https://crbug.com/1223391)


## [Эксперимент] Скрытие задач во вкладке Issues {: #hide-issues }

{% Aside %}
Чтобы включить эксперимент, установите флажок **Enable hide issues menu** в разделе **Settings** > **Experiments**.
{% endAside %}

Включите эксперимент **hide issues menu**, чтобы скрыть проблемы во вкладке **Issues**. Это способ сосредоточиться только на важных для вас проблемах.

Во вкладке **Issues** наведите курсор на проблему, кликните на иконку меню  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; справа и выберите **Hide issues like this**, чтобы скрыть её.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Экспериментальное меню для скрытия задач", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Задача в трекере Chromium: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
