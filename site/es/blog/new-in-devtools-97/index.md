---
layout: "layouts/blog-post.njk"
title: "Qué hay de nuevo en DevTools (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
  "Nuevo panel de Grabadora, actualización de la lista de dispositivos en el Modo Dispositivo y más."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ATL8kMR7STaYz2IsKQJh.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

*Gracias [Miguel Ángel](https://midu.dev) por la traducción y [Carlos Caballero](https://carloscaballero.io) por la revisión.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

<!-- ## Preview feature: New Recorder panel {: #recorder } -->
## Función en vista previa: Nuevo panel de Grabadora {: #recorder }

<!-- Use the new **Recorder** panel to record, replay and measure user flows.  -->
Use el nuevo panel de **Grabadora** para grabar, reproducir y medir flujos de usuario.

<!-- [Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording.  -->
[Abra el panel de **Grabadora**](/docs/devtools/recorder/#open). Siga las instrucciones en la pantalla para iniciar una nueva grabación.

<!-- For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel. -->
Por ejemplo, puede grabar el proceso de compra de café con esta [demo de compra de café](https://coffee-cart.netlify.app/). Después de añadir un café y rellenar los detalles de pago, puede finalizar la grabación, reproducir el proceso o hacer clic en el botón **Medir rendimiento** para medir el flujo de usuario en el panel **Rendimiento**.

<!-- Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial! -->
¡Vaya a la [documentación](/docs/devtools/recorder/) del panel de **Grabadora** para aprender más con el tutorial paso a paso!

<!-- The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. -->
La **Grabadora** es una función de vista previa. Nuestro equipo está trabajando activamente en ella y estamos buscando su [opinión](https://goo.gle/recorder-feedback) para mejoras.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Panel de Grabadora", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Refresh device list in Device Mode {: #device } -->
## Actualización de la lista de dispositivos en el Modo Dispositivo {: #device }

<!-- [Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions. -->
[Habilitar la barra de herramientas de dispositivo](/docs/devtools/device-mode#viewport), más dispositivos modernos se han añadido en la lista de dispositivos. Seleccione un dispositivo para simular sus dimensiones.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="Actualización de la lista de dispositivos en el Modo Dispositivo", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Chromium issue: [1223525](https://crbug.com/1223525)


<!-- ## Autocomplete with Edit as HTML {: #code-completion } -->
## Autocompletado con Editar como HTML {: #code-completion }

<!-- The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for. -->
La UI de **Editar como HTML** ahora soporta autocompletado y resaltado de sintaxis. En el panel **Elementos**, haga clic derecho en un elemento y seleccione **Editar como HTML**. Intente escribir una propiedad DOM (por ejemplo, `id` o `aria`), el autocompletado le ayudará a encontrar el nombre de la propiedad que está buscando.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="Autocompletado con Editar como HTML", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Chromium issue: [1215072](https://crbug.com/1215072)


<!-- ## Improved code debugging experience {: #debugging } -->
## Mejorada la experiencia de depuración de código {: #debugging }

<!-- Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript. -->
Los números de las columnas ahora se incluyen en el error de salida en la Consola. Tener acceso fácil a los números de columnas es esencial para depurar especialmente con JavaScript minimizado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="El número de columna en el error de salida", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Chromium issue: [1073064](https://crbug.com/1073064)


<!-- ## [Experimental] Syncing DevTools settings across devices {: #sync } -->
## [Experimental] Sincronización de configuraciones de DevTools entre dispositivos {: #sync }

<!-- Your DevTools settings are now synced across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**.  -->
Sus ajustes en DevTools son ahora sincronizados entre dispositivos por defecto cuando activa la sincronización del perfil de Chrome. Puede cambiar las preferencias de sincronización de Devtools a través de **Preferencias** > **Sincronización** > **Activar sincronización de ajustes**.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="Sincronización de ajustes DevTools", width="800", height="654" %}

<!-- This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again. Learn more about the sync feature in [DevTools customization](/docs/devtools/customize/). -->
Esta nueva opción hace más fácil trabajar entre dispositivos. Por ejemplo, los siguientes ajustes de apariencia son sincronizados de forma que tiene una experiencia consistente entre dispositivos y no necesita re-definir los mismos ajustes otra vez. Aprenda más sobre la función de sincronización en [personalización DevTools](/docs/devtools/customize/).

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="Ajustes de apariencia", width="800", height="584" %}

<!-- This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, ple-ase share with us [here](https://crbug.com/1245541). -->
Esta nueva función es experimental en este momento, el equipo está activamente trabajando en ella. Si tiene alguna sugerencia, por favor compártala con nosotros [aquí](https://crbug.com/1245541).

Chromium issue: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
