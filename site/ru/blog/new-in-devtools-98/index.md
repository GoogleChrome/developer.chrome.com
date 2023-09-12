---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 98)"
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description:
  "Дерево доступности на всю страницу, явное отображение изменений на вкладке Изменения и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Csl4vzzRO3Ei1ryeK4wc.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

*Переводы предоставлены [Alena Batitskaya](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->
## Ранний доступ: дерево доступности на всю страницу (Full-page accessibility tree) {: #a11y-tree }

<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->
Новая функция **Дерево доступности на всю страницу** (Full-page accessibility tree) облегчает обзор полностраничного [дерева доступности](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) и помогает лучше понять, как ваш веб-контент работает со вспомогательными технологиями. 


<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->
Во вкладке **Элементы** (Elements) откройте панель **Специальные возможности** (Accessibility) и поставьте галочку в чекбоксе **Дерево доступности на всю страницу** (Full-page accessibility tree). После этого перезагрузите DevTools, и вы увидите новую кнопку во вкладке **Элементы** (Elements).

<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->
Вы можете нажать на нее, чтобы включить режим **Дерево доступности на всю страницу**. Вы можете развернуть отдельные узлы или посмотреть подробности в панели **Специальные возможности** (Accessibility).

<!-- Select a node and toggle back to the DOM tree view. The corresponding DOM node is selected now. This is a great way to understand the mapping between the DOM node and its accessibility tree node. This works for DOM tree ⬌ Accessibility tree view too! -->
Выберите узел и переключитесь обратно в представление дерева DOM. Теперь выбран соответствующий узел DOM. Это отличный способ понять, как отображается узел DOM в дереве доступности. Это работает и для дерева DOM ⬌ Представление дерева доступности!

<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->
Раньше дерево доступности было доступно в панели **Специальные возможности** (Accessibility). Область обзора была ограниченной, можно было исследовать только один элемент и его потомков.

<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->
Наша команда все еще активно работает над этой новой функцией. Мы ждем [ваши отзывы](https://goo.gle/devtools-a11y-tree-feedback) для дальнейших улучшений.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="Дерево доступности на всю страницу", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Задача в трекере Chromium: [887173](https://crbug.com/887173)


<!-- ## More precise changes in the Changes tab {: #changes }  -->
## Явное отображение изменений на вкладке Изменения (Changes) {: #changes } 

<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->
Изменения кода на вкладке **Изменения** (Changes) автоматически форматируются. 

<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->
Раньше было сложно отследить фактические изменения в минифицированных файлах, поскольку весь код отображался в одну строку. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Вкладка Изменения", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Задачи в трекере Chromium: [1238818](https://crbug.com/1238818), [1268754](https://crbug.com/1268754) , [1086491](https://crbug.com/1086491)


<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->
## Устанавливайте более длительный тайм-аут для записи поведения пользователя {: #recorder-timeout }

<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->
Теперь вы можете настроить параметр **Timeout** во вкладке [Recorder](/docs/devtools/recorder/) для всех шагов или конкретного шага. Это особенно полезно для страниц с медленными сетевыми запросами и длительной анимацией.

<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->
Например, мы [записали поведение пользователя](/docs/devtools/recorder/#record) на этой [демо-странице](https://jec.fish/demo/pup-slow-result) при загрузке и клике на пункт меню. Однако загрузка пунктов меню происходит медленно (6 секунд). Воспроизведение [replay](/docs/devtools/recorder/#replay) этой записи не удалось, поскольку она превышает 5 секунд (тайм-аут по умолчанию).

<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->
Мы можем использовать новую настройку **Timeout** чтобы исправить это. Откройте детали шага, в котором мы нажимаем на пункт меню. [Редактируйте шаг](/docs/devtools/recorder/#edit-steps), нажав кнопку **Add timeout** и установите значение **6000** миллисекунд (равно 6 секундам).

<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->
По желанию вы можете настроить **Timeout** для всех шагов в меню **Replay settings**. Раскройте настройки **Replay settings** и измените значение **Timeout**. 
 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="Настройка тайм-аута для записи поведения пользователя", width="800", height="530" %}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->
## Убедитесь, что ваши страницы кешируются с помощью вкладки Возвратный кеш (Back/forward cache) {: #bfcache }

<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->
[Возвратный кеш (или bfcache)](https://web.dev/bfcache/) это оптимизация браузера, которая обеспечивает мгновенную навигацию назад и вперед. 

<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->
Новая вкладка **Возвратный кеш** (Back/forward cache) поможет протестировать ваши страницы, чтобы убедиться, что они оптимизированы для возвратного кеша, или выявить проблемы, которые этому препятствуют.

<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->
Чтобы протестировать конкретную страницу, перейдите на неё в Chrome и затем в DevTools откройте **Приложение** (Application) > **Возвратный кеш** (Back-forward Cache). Далее, нажмите кнопку **Test back/forward cache**, и DevTools попытается произвести переход на предыдущую страницу и обратно, чтобы проверить, может ли страница быть восстановлена из кеша.

<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->
Для веб-разработчиков очень важно знать, как оптимизировать страницы для возвратного кеша во всех браузерах, поскольку это значительно улучшит качество просмотра для пользователей. Особенно для тех, у кого медленные сети или устройства. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="Вкладка Возвратный кеш", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Задача в трекере Chromium: [1110752](https://crbug.com/1110752)


<!-- ## New Properties pane filter {: #properties } -->
## Новый фильтр в панели Свойства (Properties) {: #properties }

<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->
Если вы хотите сфокусироваться на конкретном свойстве в панели **Свойства** (Properties), вы теперь можете ввести название нужного свойства или его значение в новом текстовом поле **Фильтр** (Filter).

<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** checkbox to view all properties.  -->
По умолчанию свойства, чьи значения равны `null` или `undefined`, не отображаются. Поставьте галочку в чекбоксе **Показывать все** (Show all), чтобы увидеть все свойства. 

<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->
Эти нововведения позволят вам быстрее добраться до объектов, которые вам интересны, и тем самым повысить вашу продуктивность!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="Фильтр во вкладке Свойства", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}  
  
Задача в трекере Chromium: [1269674](https://crbug.com/1269674)


<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->
## Эмулируйте CSS-медиафункцию forced-colors {: #forced-colors }

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->
Медиафункция [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) в CSS используется для определения того, активировал ли пользовательский агент режим принудительного выбора цветов в браузере (например, режим высокой контрастности в Windows). В этом режиме к странице применяется ограниченная пользовательская палитра.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->
Откройте пункт [Выполнить команду](/docs/devtools/command-menu/), выполните команду **Показать "Отрисовка"** (Show Rendering) и затем установите значение  **Эмулировать медиафункцию CSS forced-colors** (Emulate CSS media feature forced-colors) в выпадающем меню.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="CSS-медиафункция forced-colors", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Задача в трекере Chromium: [1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->
## Показ линейки при наведении курсора мыши {: #show-rulers }

<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->
Теперь вы можете открыть пункт [Выполнить команду](/docs/devtools/command-menu/) и запустить команду **Показывать линейки при наведении курсора мыши** (Show rulers on hover). Линейки на странице облегчают измерение ширины и высоты элемента.

<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->
Ранее линейки на странице можно было включить только с помощью чекбокса **Настройки** (Settings) > **Показывать линейки**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Показ линейки при наведении курсора мыши", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a932e35aa5521826c8beea #}

Задача в трекере Chromium: [1270562](https://crbug.com/1270562)


<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->
## Поддержка значений `row-reverse` и `column-reverse` в редакторе флексбоксов {: #flexbox-editor }

<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->
В [редактор флексбоксов](/blog/new-in-devtools-90/#flexbox) добавлены две новые кнопки для поддержки значений `row-reverse` и `column-reverse` в свойстве `flex-direction`. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Редактор флексбоксов", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Задача в трекере Chromium: [1263866](https://crbug.com/1263866)


<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->
## Новые сочетания клавиш для повторения запроса XHR и расширения всех результатов поиска {: #shortcuts }

<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->
### Шорткаты для повторения запроса XHR в панели Сеть (Network) {: #replay-xhr }

<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->
Выберите XHR-запрос во вкладке **Сеть** (Network) и нажмите **R** на клавиатуре, чтобы повторить запрос XHR. Ранее вы могли воспроизвести XHR только через контекстное меню (правый клик мыши > **Повторить запрос XHR**)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="Повторение запроса XHR", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Задача в трекере Chromium: [1050021](https://crbug.com/1050021)

 
<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->
### Шорткат для расширение всех результатов поиска {: #toggle-search-result }

<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->
На вкладке **Поиск** (Search) добавлено новое сочетание клавищ, позволяющее разворачивать и сворачивать все результаты поиска. Ранее результаты поиска можно было разворачивать и сворачивать, щелкая только по одному файлу за раз.

<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->
Откройте вкладку, нажав последовательно **Esc** > **три точки** > **Поиск** (Search). Введите искомую строку (например, function) и нажмите **Enter**, чтобы увидеть список с результатами поиска. Переместите фокус на результаты поиска и нажмите следующее сочетания клавиш, чтобы развернуть/свернуть результаты поиска:

- **Windows / Linux** - `Ctrl` + `Shift` + `{` или `}`
- **MacOS** - `Cmd` + `Options` + `{` или `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->
Перейдите на страницу с [сочетаниями клавиш](/docs/devtools/shortcuts/), чтобы получить полную информацию о шорткатах в Chrome DevTools.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cbd6c9453ca55edb0f155068830b1ad69c5136e #}

Задача в трекере Chromium: [1255073](https://crbug.com/1255073)


<!-- ## Lighthouse 9 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse 9 во вкладке Lighthouse {: #lighthouse }

<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->
Во вкладке **Lighthouse** теперь запускается Lighthouse 9. Lighthouse теперь перечисляет все элементы, имеющие одинаковый идентификатор.

<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->
Неуникальный идентификатор элемента — распространенная проблема доступности. Например, id, на который ссылается атрибут `aria-labelledby`, используется на [нескольких элементах] (https://web.dev/duplicate-id-aria/). 

<!-- Check out the [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->
Перейдите на страницу [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) для получения более подробной информации об обновлении.

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="Аудит пункта 'Все фокусируемые элементы должны иметь уникальный `id`' в Lighthouse показывает два элемента с одинаковым `id`.", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Задача в трекере Chromium: [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## Улучшенная вкладка Источники (Sources) {: #sources }

<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->
Множество улучшений стабильности в панели **Источники** за счёт перехода на [CodeMirror 6](https://codemirror.net/6/). Вот несколько заметных улучшений:

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->
- Значительно ускорилось открытие больших файлов (например, WASM, JavaScript)
- Больше никакой случайной прокрутки при пошаговом выполнении кода
- Улучшены предложения автозаполнения для редактируемых источников (например, сниппеты, локальное переопределение) 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Задача в трекере Chromium: [1241848](https://crbug.com/1241848) 

<!-- ## Miscellaneous highlights {: #misc } -->
## Другие важные моменты {: #misc }

<!-- These are some noteworthy fixes in this release: -->
Вот несколько заслуживающих внимания исправлений в этом выпуске:

<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It’s now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972)) 
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->
- Правильное отображение графика водопада сетевых запросов. Ранее стили был некорректны. ([1275501](https://crbug.com/1275501))
- Выделение кода было неисправно при поиске в документах с очень длинными строками во вкладке **Источники** (Sources). Теперь это исправлено. ([1275496](https://crbug.com/1275496))
- Больше не дублируется вкладка **Полезная нагрузка** (Payload) в сетевых запросах. ([1273972](https://crbug.com/1273972)) 
- Исправлено отсутствие деталей сдвига макета в разделе **Сводка** (Summary) во вкладке **Производительность** (Performance). ([1259606](https://crbug.com/1259606))
- Поддержка произвольных символов (например, `,`, `.`) в запросах поиска на вкладке **Сеть**. ([1267196](https://crbug.com/1267196))


<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->
### [Эксперимент] Эндпоинты во вкладке Reporting API {: #reporting-api }

<!-- {% Aside %} -->
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
<!-- {% endAside %} -->
{% Aside %}
Чтобы включить эту экспериментальную функцию поставьте голочку в чекбоксе рядом с пунктом **Enable Reporting API panel in the Application panel** в **Настройки** (Settings) > **Эксперименты** (Experiments).
{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->
Экспериментальная панель **Reporting API** была представлена в [Chrome 96](/blog/new-in-devtools-96/#reporting-api), чтобы помочь вам отслеживать созданные на странице отчеты и их статус.

<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->
Секция **Endpoints** теперь доступна. Она показывает все эндпоинты, настроенные в заголовке `Reporting-Endpoints`.

<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->
Научитесь пользоваться [Reporting API](https://web.dev/reporting-api/) для отслеживания проблем безопасности, устаревших вызовов API и т.д.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Панель Reporting API", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #} 

Задача в трекере Chromium: [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
