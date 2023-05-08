---
layout: "layouts/blog-post.njk"
title: "O que há de novo no DevTools (Chrome 97)"
authors:
  - jecelynyeen
date: 2021-11-29
updated: 2021-11-29
description:
  "Novo painel de Gravação, atualização da lista de dispositivos no Modo de dispositivo e muito mais."
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o2HysHCoa9Jl9TMnA01o.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-97
---

<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content, do not delete English comment -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

*Tradução realizada por [Alvaro Camillo Neto](https://www.linkedin.com/in/alvarocamillont/). Revisão por [Lucas Santos](https://lsantos.dev)*

{% Partial 'devtools/banner.md' %}

{% YouTube id='cGotLGL1-Ko' %}

<!-- ## Preview feature: New Recorder panel {: #recorder } -->
## Prévia de funcionalidade: Novo painel de Gravação {: #recorder } 
<!-- Use the new **Recorder** panel to record, replay and measure user flows.  -->
Use o novo painel **Gravação** para registrar, reproduzir e medir os fluxos do usuário.
<!-- [Open the **Recorder** panel](/docs/devtools/recorder/#open). Follow the instructions on screen to start a new recording.  -->
[Abra o painel **Gravação**](/docs/devtools/recorder/#open). Siga as instruções na tela para iniciar uma nova gravação.
<!-- For example, you can record the coffee checkout process with this [coffee ordering demo](https://coffee-cart.netlify.app/) application. After adding a coffee and filling out payment details, you can end the recording, replay the process or click on the **Measure performance** button to measure the user flow in the **Performance** panel. -->
Por exemplo, vamos usar o aplicativo [demonstração de pedido de café](https://coffee-cart.netlify.app/), você pode registrar o processo de checkout do café. Depois de adicionar um café e preencher os detalhes do pagamento, você pode encerrar a gravação, repetir o processo ou clicar no botão **Medir desempenho** para medir o fluxo do usuário no painel **Desempenho**.
<!-- Go to the **Recorder** panel [documentation](/docs/devtools/recorder/) to learn more with the step-by-step tutorial! -->
Veja na  [documentação](/docs/devtools/recorder/) do painel **Gravação**  para aprender mais com o tutorial passo a passo!
<!-- The **Recorder** panel is a preview feature. Our team is still actively working on it and we are looking for your [feedback](https://goo.gle/recorder-feedback) for further enhancements. -->
O painel **Gravação** é uma prévia de funcionalidade. Nossa equipe ainda está trabalhando ativamente nisso e queremos ler seus [comentários](https://goo.gle/recorder-feedback) para mais melhorias.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/3EpVa15PtbhFwwszqyWF.png", alt="Painel de Gravação", width="800", height="540" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ef26abc89035075bbdb08f1b26c1b8fd942ffc04 #}

Issue Relacionada: [1257499](https://crbug.com/1257499)


<!-- ## Refresh device list in Device Mode {: #device } -->
## Atualização da lista de dispositivos no modo de Dispositivo {: #device }
<!-- [Enabling the Device Toolbar](/docs/devtools/device-mode#viewport), more modern devices are now added in the device list. Select a device to simulate its dimensions. -->
[Habilitando a barra de ferramentas de dispositivos](/docs/devtools/device-mode#viewport), dispositivos mais modernos foram adicionados à lista de dispositivos. Selecione um dispositivo para simular suas dimensões.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Trx5NqE9RrqpWiN24iZ0.png", alt="Atualização da lista de dispositivos no modo de Dispositivo", width="800", height="547" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ede4c59ac39f8281b3e372fa2e8f162c1a2a7ea2 #}

Issue Relacionada: [1223525](https://crbug.com/1223525)


<!-- ## Autocomplete with Edit as HTML {: #code-completion } -->
## Preenchimento automático do Editar como HTML {: #code-completion } 
<!-- The **Edit as HTML** UI now supports autocomplete and syntax highlights. In the **Elements** panel, right click on an element, and select  **Edit as HTML**. Try typing a DOM property (e.g. `id`, `aria`), the autocomplete should help you find the property name you're looking for. -->
A interface de usuário **Editar como HTML** agora oferece suporte para preenchimento automático e destaques de sintaxe. No painel **Elementos**, clique com o botão direito em um elemento e selecione **Editar como HTML**. Tente digitar uma propriedade DOM (por exemplo, `id`,`aria`), o preenchimento automático deve ajudá-lo a encontrar o nome da propriedade que você está procurando.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yWnmpCQXpsRjWbbRQ9Pi.png", alt="Preenchimento automático do Editar como HTML", width="800", height="472" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f467de3e756f998b0e9dd222ce286cb2b7cbaca0 #}

Issue Relacionada: [1215072](https://crbug.com/1215072)


<!-- ## Improved code debugging experience {: #debugging } -->
## Melhoria na experiência de Debug {: #debugging }
<!-- Column numbers are now included in the output error in the Console. Having easy access to the column number is essential for debugging especially with minified JavaScript. -->
Os números das colunas agora estão incluídos na saída de erro no console. Ter acesso fácil ao número da coluna é essencial para depuração, especialmente com JavaScript minificado.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mKAUxO94rwvBI9oyeiIB.png", alt="Número da coluna na saída de erro", width="800", height="553" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/277ee38b0701e6e5b36c9626d109b62b0361ced6 #}

Issue Relacionada: [1073064](https://crbug.com/1073064)

## [Experimental] Sincronizando as configurações do DevTools entre dispositivos {: #sync }
<!-- Your DevTools settings are now sync across devices by default when you turn on Chrome profile sync. You can change the DevTools sync settings via **Settings** > **Sync** > **Enable settings sync**. -->
Suas configurações do DevTools agora são sincronizadas entre os dispositivos por padrão quando você ativa a sincronização do perfil do Chrome. Você pode alterar as configurações de sincronização do DevTools em **Configurações**> **Sincronizar**> **Ativar sincronização de configurações**.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/yhIipqtEvDuy6ygB677t.png", alt="Sincronização de perfil do Chrome", width="300", height="434" %}

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LUwFNTDyP22L1euSGg73.png", alt="Configurações de sincronização do DevTools", width="800", height="654" %}

<!-- This new setting makes it easier for you to work across devices. For example, the following appearance settings are synced so you have a consistent experience across devices and don’t need to re-define the same settings again.  -->
Esta nova configuração torna mais fácil para você trabalhar em vários dispositivos. Por exemplo, as configurações de aparência a seguir são sincronizadas para que você tenha uma experiência consistente em todos os dispositivos e não precise redefinir as mesmas configurações novamente.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/t8SQuZ4mE2xiLVxaZz11.png", alt="Configurações de aparência", width="800", height="584" %}

<!-- However, not all the settings are sync. For example, the **dock** settings isn’t sync because developers have different dock preferences when debugging on different sites.  -->
No entanto, nem todas as configurações são sincronizadas. Por exemplo, as configurações de **dock** não são sincronizadas porque os desenvolvedores têm preferências de dock diferentes ao depurar em sites diferentes.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/jWv8rwkF4q6SwTQbSNpp.png", alt="dock", width="426", height="134" %}

<!-- This feature is experimental at the moment, the team is still actively working on it. If you have any feedback, please share with us [here](https://crbug.com/1245541) -->
Este recurso é experimental no momento, a equipe ainda está trabalhando ativamente nele. Se você tiver algum feedback, compartilhe conosco [aqui](https://crbug.com/1245541)

Issue Relacionada: [1245541](https://crbug.com/1245541)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
