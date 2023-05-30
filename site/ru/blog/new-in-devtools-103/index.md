---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 103)"
authors:
  - jecelynyeen
date: 2022-06-14
updated: 2022-06-14
description: "Запись событий двойного клика и клика правой кнопкой мыши, новые опции для записи пользовательского потока в Lighthouse и многое другое."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/8mwEVUbzEuE8Xut2AZrU.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-103
---

*Переводы предоставлены [Alena Batitskaia](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='LyMts4yfQu8' %}

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Capture double-click and right-click events in the Recorder panel {: #recorder } -->
## Запись событий двойного клика и клика правой кнопкой мыши во вкладке Recorder {: #recorder }

<!-- The **Recorder** panel can now capture double-click and right-click events. -->
На вкладке **Recorder** теперь записываются события двойного клика и клика правой кнопкой мыши.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/qsleBCUrr2twMujW0R94.png", alt="Запись событий двойного клика и клика правой кнопкой мыши во вкладке Recorder", width="800", height="572" %}

<!-- In this [example](https://jec.fish/demo/dbl-right-click), start a [recording](/docs/devtools/recorder/#record) and try to perform the following steps:  -->
На этой [тестовой странице](https://jec.fish/demo/dbl-right-click) начните [запись](/docs/devtools/recorder/#record) и выполните следующие действия:

<!-- - Double-click the card to enlarge it
- Right-click the card and select an action from the context menu -->
- Дважды кликните по карточке, чтобы увеличить её
- Кликните правой кнопкой мыши и выберите один из пунктов контекстного меню

<!-- To understand how **Recorder** captured these events, expand the steps: -->
Чтобы понять, как **Recorder** зафиксировал эти события, разверните шаги:

<!-- - **Double-click** is captured as `type: doubleClick`.
- **Right-click** event is captured as `type: click` but with the `button` property is set to `secondary`. The `button` value of a normal mouse click is `primary`. -->
- **Двойной клик** записался как `type: doubleClick`.
- Событие **клика правой кнопкой мыши** записалось как `type: click`, но со значением `secondary` у свойства `button`.

Задачи в трекере Chromium: [1300839](https://crbug.com/1300839), [1322879](https://crbug.com/1322879), [1299701](https://crbug.com/1299701), [1323688](https://crbug.com/1323688)


<!-- ## New timespan and snapshot mode in the Lighthouse panel {: #lighthouse } -->
## Новые режимы: Анализ временного диапазона и Сводка во вкладке Lighthouse {: #lighthouse }

<!-- You can now use **Lighthouse** to measure your website’s performance beyond page load. -->
Теперь вы можете использовать **Lighthouse** для измерения производительности вашего сайта не только при загрузке страницы.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3GGcCxlOGrnXLMfp0t9y.png", alt="Новые режимы: Анализ временного диапазона и Сводка во вкладке Lighthouse", width="800", height="507" %}

<!-- The **Lighthouse** panel now supports 3 modes of user flow measurement:  -->
Вкладка **Lighthouse** теперь поддерживает 3 режима измерения пользовательского потока:

<!-- - [Navigation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) reports analyze a single page load. Navigation is the most common report type. All Lighthouse reports before the current version are navigation reports.
- [Timespans](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) reports analyze an arbitrary time period, typically containing user interactions.
- [Snapshots](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) reports analyze the page in a particular state, typically after the user has interacted with it. -->
- В режиме [Навигация (Navigation)](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#navigation) анализируется загрузка одной страницы. Навигация — самый распространенный тип отчета. Все отчеты Lighthouse до текущей версии являются навигационными отчетами.
- В режиме [Анализа временного диапазона (Timespans)](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#timespan) анализируется произвольный отрезок времени, обычно содержащий взаимодействия с пользователем.
- В режиме [Сводка (Snapshots)](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md#snapshot) анализируется страница в определенном состоянии, обычно после того, как пользователь повзаимодействовал с ней.

<!-- For example, let’s measure the performance of adding items to cart on this [demo page](https://coffee-cart.netlify.app/). Select the **Timespan** mode and click **Start timespan**. Scroll and add a few items to the cart. Once you are done, click on **End timespan** to generate a Lighthouse report of the user interactions. -->
Для примера, двайте измерим производительность во время добавления товаров в корзину на этой [демо-странице](https://coffee-cart.netlify.app/). Выберите режим **Анализ временного диапазона** (Timespan) и нажмите **Запустить анализ временного диапазона** (Start timespan). Прокрутите страницу и добавьте несколько товаров в корзину. Когда вы будете готовы, нажмите **Остановить анализ временного диапазона** (End timespan), чтобы Lighthouse сгенерировал отчёт о действиях пользователя.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/pq9Vg8xOUzplWAlXGJEa.png", alt="Режим Анализ временного диапазона (Timespan)", width="800", height="549" %}

<!-- See [User flows in Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md) to learn about the unique use cases, benefits, and limitations of each mode.  -->
Почитайте документацию про [Пользовательские потоки в Lighthouse](https://github.com/GoogleChrome/lighthouse/blob/master/docs/user-flows.md), чтобы узнать об уникальных случаях использования, преимуществах и ограничениях каждого режима.

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/70d4a90431dc6c881209f605411ce0bd2272d6d1 #}

Задача в трекере Chromium: [1291284](https://crbug.com/1291284)


<!-- ## Performance Insights updates {: #performance } -->
## Улучшение Performance Insights {: #performance }

<!-- ### Improved zoom control in the Performance Insights panel {: #zoom } -->
### Улучшено управление масштабированием во вкладке Performance Insights {: #zoom }

<!-- DevTools will now zoom in based on your mouse cursor rather than the playhead position.With the latest cursor-based zoom, you can move your mouse to anywhere in the track, and [zoom in](/docs/devtools/performance-insights/#navigate) to the desired area right away.  -->
Теперь DevTools увеличивает масштаб, основываясь на положении курсора мыши, а не на положении точки воспроизведения. С новой версией масштабирования на основе курсора вы можете подвести мышь к любой точке трека и [увеличить](/docs/devtools/performance-insights/#navigate) до нужной области сразу же.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/U8d1PjOFZuGkyOXHQ5Z8.mp4", autoplay=true, loop=true, class="screenshot" %}

<!-- See [Performance Insights](/docs/devtools/performance-insights/) to learn how to get actionable insights and improve your website’s performance with the panel. -->
Почитайте документацию по [Performance Insights](/docs/devtools/performance-insights/), чтобы узнать, как получить полезные сведения и улучшить показатели вашего сайта с помощью этой вкладки.

Задача в трекере Chromium: [1313382](https://crbug.com/1313382)


<!-- ### Confirm to delete a performance recording {: #delete } -->
### Подтверждение удаления записи производительности {: #delete }

<!-- DevTools now shows a confirmation dialog before [deleting a performance recording](/docs/devtools/performance-insights/#delete). -->
DevTools теперь показывает диалог подтверждения перед [удалением записи производительности](/docs/devtools/performance-insights/#delete).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/DaoCroAA60WmMLpuVU9P.png", alt="Подтверждение удаления записи производительности", width="800", height="549" %}

Задача в трекере Chromium: [1318087](https://crbug.com/1318087)


<!-- ## Reorder panes in the Elements panel {: #reorder-pane } -->
## Изменение порядка панелей во вкладке Элементы (Elements) {: #reorder-pane }

<!-- You can now reorder panes in the **Elements** panel based on your preference. -->
Теперь вы можете менять порядок панелей во вкладке **Элементы** (Elements) так, как вам будет удобнее.

<!-- For example, when you open DevTools on a narrow screen, the [Accessibility](/docs/devtools/accessibility/reference/#pane) pane is hidden under the **Show more** button. If you frequently debug accessibility issues, you can now drag the pane to the front for easier access. -->
Например, когда вы открываете DevTools на узком экране, панель [Специальные возможности (Accessibility)](/docs/devtools/accessibility/reference/#pane) прячется за кнопкой **Ещё** (Show more). Если вы регулярно занимаетесь отладкой задач по доступности, то теперь вы можете перетащить эту панель в начало для упрощения доступа.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hcaQzMTxecNyw4RY0PMX.png", alt="Изменение порядка панелей во вкладке Элементы (Elements)", width="800", height="616" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/10d76932286c4b001eb4c4a13d8bf401f4ee46a7 #}

Задача в трекере Chromium: [1146146](https://crbug.com/1146146)


<!-- ## Picking a color outside of the browser {: #color } -->
## Выбор цвета вне браузера {: #color }

<!-- DevTools now supports picking a color outside of the browser. Previously, you could only pick a color within the browser. -->
DevTools теперь поддерживают возможность выбрать цвет за пределами браузера. До этого вы могли выбирать цвет только в пределах окна браузера.

<!-- In the **Styles** pane, click on any color preview to open a color picker. Use the eyedropper to pick color from anywhere. -->
Во вкладке **Стили** (Styles) кликните на любое превью цвета, чтобы открыть палитру цветов. Используйте пипетку, чтобы выбрать цвет из любого места.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JAp1UdPCnWNduuNadLVz.png", alt="Выбор цвета вне браузера", width="800", height="450", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend.git/+/bbb56c21faaa6c68493a351e3f3e213acb5b76fa #}

Задача в трекере Chromium: [1245191](https://crbug.com/1245191)


<!-- ## Improved inline value preview during debugging {: #inline-preview } -->
## Улучшен предварительный просмотр значений в строке при отладке {: #inline-preview }

<!-- The debugger now shows the inline values preview correctly. -->
Отладчик теперь корректно показывает предварительное значение в строке.

<!-- In this example, the `double` function has an input parameter  `a` and a variable `x`. Put a breakpoint at the `return` line and run the code. The inline preview shows values `a` and `x` correctly. Previously, the debugger did not show the value `x` in the inline preview. -->
В примере ниже у функции `double` есть аргумент `a` и переменная `x`. Установите брейкпоинт на строку с `return` и запустите код. Превью правильно покажет значения `a` и `x`. Ранее отладчик не показывал превью значения переменной `x`.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XMHyRsyK24fWLK7o72K7.png", alt="Улучшен предварительный просмотр значений в строке при отладке", width="800", height="534" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/8e1a99324bde8d093e32ede5c8d1bf50110fac66 #}

Задача в трекере Chromium: [1316340](https://crbug.com/1316340)


<!-- ## Support large blobs for virtual authenticators {: #webauthn } -->
## Поддержка больших объектов BLOB для виртуальных аутентификаторов {: #webauthn }

<!-- The [WebAuthn](/docs/devtools/webauthn/) tab now has the new **Supports large blob** checkbox for virtual authenticators. -->
Во вкладке [WebAuthn](/docs/devtools/webauthn/) теперь есть чекбокс **Поддержка больших объектов BLOB** (Supports large blob) для виртуальных аутентификаторов.

<!-- This checkbox is disabled by default. You can enable it only for the authenticators with `ctap2` protocol that support resident keys. -->

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/m58oDW2ZwCMxX6zoUoJM.png", alt="Поддержка больших объектов BLOB для виртуальных аутентификаторов", width="800", height="601" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/519350816e99a82142712b2e5b6781984a77e39c #}

Задача в трекере Chromium: [1321803](https://crbug.com/1321803)


<!-- ## New keyboard shortcuts in the Sources panel {: #shortcuts } -->
## Новые сочетания клавиш во вкладке Источники (Sources) {: #shortcuts }

<!-- Two new keyboard shortcuts are now available in the  **Sources** panel: -->
Два новых сочетания клавиш во вкладке **Источники** (Sources):

<!-- - Toggle **navigation** sidebar (left) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Toggle **debugger** sidebar (right) with <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd> -->
- Открыть или закрыть боковую панель **навигация** (navigation) (слева) при помощи <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>
- Открыть или закрыть боковую панель **отладчик** (debugger) (справа) при помощи <kbd>Control / Command</kbd> + <kbd>Shift</kbd> + <kbd>H</kbd>

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/1PacYBEm9DoSeW7iai8M.png", alt="Новые сочетания клавиш во вкладке Источники (Sources)", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/029ac9db0b7e7d08945bcf7a16b407bde50183a1 #}

Задачи в трекере Chromium: [1226363](https://crbug.com/1226363)


<!-- ## Source maps improvements {: #sourcemaps } -->
## Улучшения карты исходников {: #sourcemaps }

<!-- Previously, developers experience random failure during: -->
Ранее разработчики могли сталкиваться со случайными сбоями при следующих действиях:

<!-- - Debugging with [Codepen](https://codepen.io/) example
- Identifying source location of performance issues in a [Codepen](https://codepen.io/) example
- Missing **Component** tab when [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is enabled -->
- Отладка кода примера, опубликованного на [Codepen](https://codepen.io/)
- Определение источника проблем с производительностью в примере, опубликованном на [Codepen](https://codepen.io/)
- Отсутствие вкладки **Компонент** (Component) при включении [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

<!-- Here are a few fixes on source maps to improve the overall debugging experience: -->
Вот несколько исправлений в картах исходников для улучшения отладки:

<!-- - Correct mapping between location and offset for inline scripts and source location
- Use fallback information for frame’s text location
- Properly resolve relative urls with frame's URL   -->
- Корректное сопоставление нахождения и смещения для инлайновых скриптов и исходников
- Использование фолбэк-информации для нахождения текста во фрейме
- Правильное преобразование относительных адресов в URL фрейма

{# https://chromium.googlesource.com/v8/v8/+/d821a6a373ecf086a2ef0d233ace7f3431e47732 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9d3d33e0bde8357d58a3c4981dd016e9b9c553f3 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/04a58f2837c1ec9e78bd722bbe81e9cd7ab38727 #}

Задачи в трекере Chromium: [1319828](https://crbug.com/1319828), [1318635](https://crbug.com/1318635), [1305475](https://crbug.com/1305475)


{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
