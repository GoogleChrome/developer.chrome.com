---
layout: "layouts/blog-post.njk"
title: "Новинки DevTools (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
    "New Recorder panel, refresh device list in Device Mode, and more."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/zyfE9fWgQljD1K5nVKwi.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

<!-- start: translation instructions -->
<!-- + 1. Remove the "draft: true" tag above when submitting PR -->
<!-- + 2. Provide translations under each of the English commented original content, do not delete English comment -->
<!-- + 3. Translate the "description" tag above -->
<!-- + 4. Translate all the <img> alt text -->
<!-- + 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

*Переводы предоставлены [Alena Batitskaya](https://twitter.com/ABatickaya). Редактор — [Maxim Salnikov](https://twitter.com/webmaxru).*

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

<!-- ## Preview feature: New Recorder panel {: #recorder } -->
## Ранний доступ: новая вкладка Recorder  {: #recorder }

<!-- Use the new **Recorder** panel to record, replay and measure user flows.  -->
Используйте новую вкладку **Recorder**, чтобы записать, воспроизвести или измерить
пользовательские сценарии.

<!-- [Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording.  -->
[Откройте вкладку **Recorder**](/docs/devtools/recorder/#open). Следуйте инструкциям на
экране, чтобы начать новую запись.

<!-- For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel. -->
Например, вы можете записать процесс заказа кофе с помощью этого [демо приложения
](https://coffee-cart.netlify.app/). После выбора кофе и ввода платёжных данных вы можете
закончить запись, воспроизвести её сначала или кликнуть на кнопку **Measure performance** для просмотра пользовательских данных во вкладке **Производительность** (Performance).

<!-- Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial! -->
Обратитесь к [документации](/docs/devtools/recorder/) по вкладке **Recorder**, чтобы узнать больше из пошагового руководства.

<!-- The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. -->
Вкладка **Recorder** находится в раннем доступе. Наша команда все ещё активно работает над ней, и мы ждем [ваши отзывы](https://goo.gle/recorder-feedback) для дальнейших улучшений.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Вкладка Recorder", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Задача в трекере Chromium: [1257499](https://crbug.com/1257499)


<!-- ## Refresh device list in Device Mode {: #device } -->
## Обновлён список устройств в панели инструментов устройства (Device Mode) {: #device }

<!-- [Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions. -->
[При выборе устройства](/docs/devtools/device-mode#viewport) теперь вы увидите больше современных
моделей в списке. Выберите устройство для симуляции размеров его экрана.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="Обновлён список устройств в панели инструментов устройства", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Задача в трекере Chromium: [1223525](https://crbug.com/1223525)


<!-- ## Autocomplete with Edit as HTML {: #code-completion } -->
## Автодополнение в режиме Редактировать как HTML (Edit as HTML)  {: #code-completion }

<!-- The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for. -->
Интерфейс функции **Редактировать как HTML** (Edit as HTML) теперь поддерживает автодополнение и
подсветку синтаксиса. Во вкладке **Элементы** (Elements) кликните правой кнопкой мыши на элементе и
выберите **Редактировать как HTML** (Edit as HTML). Начните печатать свойство DOM (`id`, `aria` и
т.д.) и автодополнение поможет вам найти нужное название свойства.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="Автодополнение в режиме Редактировать как HTML", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Задача в трекере Chromium: [1215072](https://crbug.com/1215072)


<!-- ## Improved code debugging experience {: #debugging } -->
## Улучшен процесс отладки кода {: #debugging }

<!-- Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript. -->
В вывод ошибки в Консоли (Console) добавлены номера колонок. Простой доступ к номеру колонки
критичен для отладки кода, особенно в случае с минифицированным JavaScript.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="Номера колонок добавлены в вывод ошибки", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Задача в трекере Chromium: [1073064](https://crbug.com/1073064)


<!-- ## [Experimental] Syncing DevTools settings across devices {: #sync } -->
## [Эксперимент] Синхронизация настроек DevTools между устройствами {: #sync }

<!-- Your DevTools settings are now synced across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**.  -->
Ваши настройки DevTools теперь синхронизируются между устройствами, когда вы включаете синхронизацию
профиля Chrome. Вы можете изменить настройки синхронизации зайдя в **Настройки** (Settings) >
**Синхронизация** (Sync)  > **Включить синхронизацию настроек** (Enable settings sync).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="Настройки
синхронизации DevTools", width="800", height="654" %}

<!-- This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again. Learn more about the sync feature in [DevTools customization](/docs/devtools/customize/). -->
Эта функция облегчает работу на разных устройствах. Например, следующие настройки внешнего вида
могут быть синхронизированы, так что ваш пользовательский опыт на разных устройствах будет консистентным без необходимости
настраивать эти параметры заново.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="Настройки внешнего вида", width="800", height="584" %}

<!-- This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, please share with us [here](https://crbug.com/1245541). -->
В данный момент это экспериментальная функция, наша команда все ещё активно работает над ней.
Ждем ваши отзывы [здесь](https://crbug.com/1245541).

Задача в трекере Chromium: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
