---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 95)"
authors:
  - jecelynyeen
date: 2021-09-20
updated: 2021-09-20
description:
    "Новый инструмент выбора единиц измерения длины в CSS, скрытие задач во вкладке Проблемы (Issues),
    улучшение отображения свойств и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2cApOUqd99Nqvzgzs678.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-95
---

<!-- start: translation instructions -->
<!-- Remove the "draft: true" tag above when submitting PR -->
<!-- Provide translations under each of the English commented original content -->
<!-- Remember to translate the "description" tag above -->
<!-- Remember to translate all the <img> alt text -->
<!-- end: translation instructions -->

*Переводы предоставлены [Alena Batitskaya](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id="T_Ppg7ghrWM" %}

<!-- ## New CSS length authoring tools {: #length } -->
## Новый инструмент выбора единиц измерения длины в CSS {: #length }

<!-- DevTools added an easier yet flexible way to update lengths in CSS! -->
В DevTools добавлен простой и удобный способ изменения единиц измерения длины в CSS!

<!-- In the **Styles** pane, look for any CSS property with length (e.g. `height`, `padding`). -->
В панели **Стили** (Styles) найдите любое свойство с единицей измерения длины (например, `height`,
`padding`).

<!-- Hover over the unit type, and notice the unit type is underlined. Click on it to select a unit type from the dropdown. -->
Наведите курсор на значение и заметьте, что единица измерения подчёркнута. Кликните по ней
, чтобы выбрать единицу измерения из выпадающего меню.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/vWiU9o1DxsOpWXM0SrBa.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

<!-- Hover over the unit value, and your mouse pointer is changed to horizontal cursor. Drag horizontally to increase or decrease the value. To adjust the value by 10, hold the <kbd>Shift</kbd> key when dragging. -->
Наведите мышку на числовое значение, и ваш курсор изменится на горизонтальные стрелки.
Перетащите курсор горизонтально, чтобы увеличить или уменьшить числовое значение. Чтобы изменить
значение десятками, зажмите клавишу  <kbd>Shift</kbd> при перетаскивании.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/nbvRDPyARJmdTeB9ajOq.mp4", autoplay="true", muted="true", loop="true",class="screenshot" %}

<!-- You can still edit the unit value as text — just click on the value and start editing. -->
Вы по-прежнему можете менять значение как текст — просто нажмите на значение и начните редактирование.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/hBk2t2DCX7aI5yBX4J8h.mp4", autoplay="true", muted="true", loop="true", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/20932ec7ffa980023548e6f9d010ba11d0a3eab7 #}

Задачи в трекере Chromium: [1126178](https://crbug.com/1126178), [1172993](https://crbug.com/1172993)


<!-- ## Hide issues in the Issues tab {: #hide-issues } -->
## Скрытие задач во вкладке Проблемы (Issues) {: #hide-issues }

<!-- You can now hide specific issues in the Issues tab to focus only on those issues that matter to you. -->
Теперь вы можете скрыть определенные проблемы во вкладке Проблемы (Issues), чтобы сосредоточиться только на важных для вас проблемах.

<!-- In the [Issues tab](/docs/devtools/issues/), hover over on an issue you would like to hide. Click on **More options**  &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; > **Hide issues like this**. -->
Во [вкладке Проблемы (Issues)](/docs/devtools/issues/) наведите курсор на проблему, которую вы хотите скрыть.  Кликните на 
**Больше опций** (More options) &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="Троеточие, меню Больше опций (More
options)", width="4",
height="20" %} &nbsp;  > **Скрыть такие проблемы** (Hide issues like this).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Uw3mxGGK5CNoUflHgS7p.png", alt="Меню hide issues", width="800", height="488" %}

<!-- All hidden issues will be added under the **Hidden issues** pane. Expand the pane. You can unhide all hidden issues or a selected one.  -->
Все скрытые проблемы будут добавлены в панель **Скрытые проблемы** (Hidden issues).  Разверните панель. Вы можете
сделать вновь видимыми все скрытые проблемы или только выбранную.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/dnPfPGkxpkcSZRIHqGDA.png", alt="Панель скрытых проблем", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f7a70504f3ad5a63b5f5b83411ff5f6cc31a765 #}

Задача в трекере Chromium: [1175722](https://crbug.com/1175722)


<!-- ## Improved the display of properties {: #properties } -->
## Улучшенное отображение свойств {: #properties }

<!-- DevTools improve the display of properties by: -->
В DevTools улучшено отображение свойств:

<!-- - Always bold and sort own properties first in the **Console**, **Sources** panel and **Properties** pane. 
- Flatten the properties display in the **Properties** pane. -->
- Собственные свойства всегда выделены жирным шрифтом и находятся вверху списка во вкладках
  **Консоль** (Console), **Источники** (Sources) и в панели **Свойства** (Properties). 
- Свойства отображаются в плоском виде в панели **Свойства** (Properties). 

<!-- For example, the snippet below creates an [`URL`](https://developer.mozilla.org/docs/Web/API/URL) object `link` with 2 own properties: `user` and `access`, and updates the value of an inherited property `search`. -->
Например, сниппет ниже создаёт новый объект [`URL`](https://developer.mozilla.org/docs/Web/API/URL) с
именем `link` с двумя собственными свойствами: `user` и `access`, и обновляет значение наследуемого свойства `search`.

```js
/* example.js */

const link = new URL('https://goo.gle/devtools-blog');

link.user = { id: 1, name: 'Jane Doe' };
link.access = 'admin';
link.search = `?access=${link.access}`;
```

<!-- Try logging `link` in the **Console**. Own properties are now bold and sorted first. These changes make it easier to spot custom properties, especially for [Web APIs](https://developer.mozilla.org/docs/Web/API) (e.g. `URL`) with many inherited properties. -->
Попробуйте вывести `link` в **Консоль** (Console). Собственные свойства отображаются вверху списка и выделены жирным. Эти
изменения облегчают поиск кастомных свойств, особенно для [Web
APIs](https://developer.mozilla.org/docs/Web/API) (например, `URL`) с множеством
унаследованных свойств.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ngjx6YRQsH3Fhl6DUZYl.png", alt="Собственные свойства
выделены жирным и выводятся первыми в списке", width="800", height="561" %}

<!-- Apart from these changes, the properties in the  **Properties** pane are also flattened now for better DOM properties debugging experience, especially for [Web components](https://www.webcomponents.org/introduction).  -->
Кроме этих изменений, свойства в панели **Свойства** (Properties) теперь тоже выводятся в плоской структуре для
улучшения отладки свойств DOM, особенно для [веб-компонентов](https://www.webcomponents.org/introduction).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hIQGKlYkWKJzljHZaaM9.png", alt="Плоская структура свойств", width="800", height="449" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7d0366422cffa5f2837de834f0faa88a925fe701 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a4d7dd0d62baba5718a713b5cd364669a21236b3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

Задачи в трекере Chromium: [1076820](https://crbug.com/1076820), [1119900](https://crbug.com/1119900)


<!-- ## Lighthouse 8.4 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 8.4 во вкладке Lighthouse {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 8.4. Lighthouse will now detect if the [Largest Containful Paint (LCP)](https://web.dev/lcp) element was a lazy-loaded image and recommend removing the `loading` attribute from it. -->
Во вкладке **Lighthouse** теперь запускается Lighthouse 8.4. Lighthouse теперь определяет, является ли 
[Largest Containful Paint (LCP)](https://web.dev/lcp)  изображением с отложенной загрузкой, и показывает
рекомендацию удалить атрибут `loading`.

<!-- Check out the [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/) for more details on the updates. -->
Ознакомьтесь с [What’s new in Lighthouse 8.4](/blog/lighthouse-8-4/), чтобы больше узнать об обновлении.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/u9nepJj3wgpMgoNxSaDZ.png", alt="Уведомление о ленивой
загрузке LCP в отчёте Lighthouse", width="800", height="502", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/649a979e4de2cf38430e46e7198b11ba8a830388 #}

Задача в трекере Chromium: [772558](https://crbug.com/772558)


<!-- ## Sort snippets in the Sources panel {: #snippets } -->
## Сортировка снипетов во вкладке Источники (Sources) {: #snippets }

<!-- The [snippets](/docs/devtools/javascript/snippets/) in the **Snippets** pane under the **Sources** panel are now sorted alphabetically. Previously, it’s not sorted. -->
[Сниппеты](/docs/devtools/javascript/snippets/) в панели **Фрагменты** (Snippets) на вкладке **Источники** (Sources) теперь
отсортированы в алфавитном порядке. Раньше они не сортировались.

<!-- Utilize the snippets feature to run commands quicker. Watch this video for a [tip](https://youtu.be/NOal2gTzftI?t=176)! -->
Используйте функцию сниппетов для более быстрого выполнения команд. Посмотрите это [видео](https://youtu.be/NOal2gTzftI?t=176), чтобы получить подсказку!

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/54ea0986cb59f71242ed62d3dd6405cc65f623a4 #}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/knb78RG6NCETitMbNoyV.png", alt="Сортировка сниппетов на панели Источники", width="800", height="475" %}

Задача в трекере Chromium: [1243976](https://crbug.com/1243976)


<!-- ## New links to translated release notes and report a translation bug {: #localized } -->
## Новые ссылки на переводы обновлений и сообщение об ошибке в переводе {: #localized }

<!-- You can now click to read the DevTools release notes in 6 other languages - [Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95), [Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95), [Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95)  via the What’s new tab.  -->
Теперь вы можете почитать о новинках в DevTools на 6 других языках -
Russian](/ru/blog/new-in-devtools-95), [Chinese](/zh/blog/new-in-devtools-95),
[Spanish](/es/blog/new-in-devtools-95), [Japanese](/ja/blog/new-in-devtools-95),
[Portuguese](/pt/blog/new-in-devtools-95) and [Korean](/ko/blog/new-in-devtools-95) во вкладке Что нового (What’s new).

<!-- Since Chrome 94, you can [set your preferred language](/blog/new-in-devtools-94/#localized) in DevTools. If you found any issues with the translations, help us improve it by [reporting a translation issue](https://goo.gle/devtools-translate) via **More options** > **Help** > **Report a translation bug**.  -->
Начиная с версии 94, в Chrome вы можете [выбрать предпочитаемый
язык](/blog/new-in-devtools-94/#localized) в DevTools. Если вы обнаружили какие-либо ошибки в
переводе, помогите нам улучшить его, [сообщив о проблеме с переводом](https://goo.gle/devtools-translate)
через **Больше опций** (More options) > **Справка** (Help) > **Сообщить об ошибке перевода** (Report a translation bug).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Qrg4Ahf4sYseL2NQZwIl.png", alt="Новые ссылки на переводы обновлений и сообщения об ошибках в переводах", width="800", height="487" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/312e43a6c50bc29f279f9eac2f91b723b36c7ee9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dcd3ae13ebc5d340b2abb07e9dc99cfa74caea35 #}

Задачи в трекере Chromium: [1246245](https://crbug.com/1246245), [1245481](https://crbug.com/1245481) 


<!-- ## Improved UI for DevTools command menu {: #command-menu } -->
## Улучшенный UI для командного меню в DevTools {: #command-menu }

<!-- Did you find it hard to search for a file in the [Command Menu](/docs/devtools/command-menu/#open)? Good news for you, the **Command Menu** user interface is now enhanced!  -->
Вам было сложно искать файлы в [меню Command](/docs/devtools/command-menu/#open)? Хорошие
новости: пользовательский интерфейс **Command Menu** теперь улучшен!

<!-- Open the **Command Menu** to search for a file with keyboard shortcut <kbd>Control</kbd>+<kbd>P</kbd> in Windows and Linux, or <kbd>Command</kbd>+<kbd>P</kbd> in MacOS. -->
Чтобы найти файл, откройте **Command Menu** при помощи шортката <kbd>Control</kbd>+<kbd>P</kbd> на
Windows и Linux или <kbd>Command</kbd>+<kbd>P</kbd> на MacOS.

<!-- The UI improvements of the **Command Menu** is still ongoing, stay tuned for more updates! -->
Улучшения пользовательского интерфейса **Command Menu** все еще продолжаются, следите за обновлениями!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/TJT2ry3vmUW1KoFgSKQP.png", alt="Command Menu", width="800", height="389" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/06f6263ffb5b0a262c9954db532801fef4dbb1e5 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93550d16d92a4835c61dc7906f16694f390e9658 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0ad76a1ccf83a28ed0ded0a55544eef976f7c35b #}

Задача в трекере Chromium: [1201997](https://crbug.com/1201997)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
