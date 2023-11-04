---
layout: 'layouts/doc-post.njk'
title: Introdução aos relatórios de atribuição (mensuração de conversão)
subhead: Introdução e conceitos-chave para entender a API Attribution Reporting.
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %} Esta API é uma proposta e se expandirá com o tempo. Este artigo descreve seu estado atual e será atualizado conforme a API for evoluindo. {% endAside %}

Atualizações:

- Início de 2021: relatórios agregados e medição de visualização (view-through) são adicionados à proposta.
- Início de 2021: a API foi renomeada para "Attribution Reporting API" (API de relatórios de atribuição).

{% Aside 'caution' %}

- Este artigo se concentra nos casos de uso relacionados à publicidade, mas a Attribution Reporting API também pode servir casos de uso não relacionados à publicidade.
- Os casos de uso relacionados à publicidade para esta API se concentram em vincular cliques ou visualizações de anúncios a conversões (mensuração de conversão). {% endAside %}

## Introdução

A Attribution Reporting API permite medir quando um **clique ou visualização** em um anúncio leva a uma **conversão** no site de um anunciante, como uma venda ou inscrição. A API não depende de cookies de terceiros ou mecanismos que possam ser usados para identificar usuários individuais entre sites.

Esta proposta está sendo incubada de forma aberta. A proposta e as discussões estão no [repositório GitHub do WICG](https://github.com/WICG/conversion-measurement-api).

{% Aside %} Esta API é parte do Privacy Sandbox, uma série de propostas para satisfazer os casos de uso de terceiros que não usam cookies de terceiros ou outros mecanismos de rastreamento entre sites. Veja [Propostas do Privacy Sandbox](https://developers.chrome.com/docs/privacy-sandbox) . {% endAside %}

## Por que esta API é necessária?

Hoje, a mensuração da conversão de anúncios geralmente depende [de cookies de terceiros](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Os navegadores estão restringindo o acesso a cookies de terceiros porque eles podem ser usados para rastrear usuários em sites e prejudicar a privacidade do usuário. Esta API viabiliza essas medições de uma forma que preserva a privacidade, sem usar cookies de terceiros.

## Quem precisa saber sobre esta API?

- As plataformas Adtech, como [plataformas de demanda](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) ou [plataformas de gerenciamento de dados](https://en.wikipedia.org/wiki/Data_management_platform) (DMP), podem usar esta API para oferecer suporte à funcionalidade que atualmente depende de cookies de terceiros.
- Anunciantes e editores que dependem de código personalizado para publicidade ou medição de conversão podem usar esta API para substituir as técnicas existentes.
- Anunciantes e editores que dependem de plataformas adtech para medição de conversão não precisam usar a API diretamente, mas podem estar interessados em entendê-la se estiverem trabalhando com plataformas adtech que possam integrar a API.

## Depure a API com Chrome DevTools

[Disponível no Chrome 93](/blog/new-in-devtools-93/#attribution-reporting). Os erros da API Attribution Reporting agora são relatados no [DevTools](/docs/devtools) na [aba Issues](/docs/devtools/issues/) .

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Erros da API Attribution Reporting na aba Issues", width="800", height="501" %}

## Participe

{% Aside %} **Sua participação é necessária!** Esta API poderá ter que dar suporte a uma ampla variedade de casos de uso de mensuração e otimização de conversão. Os dados obtidos do ecossistema são vitais para garantir que as soluções para dar suporte a esses casos de uso sejam discutidas abertamente. {% endAside %}

Para se envolver, participe da discussão e experimente a API. O ideal é fazer as duas coisas, mas você pode participar da discussão independentemente de ter experimentado ou não a API.

### Participe da discussão

- [Participe das reuniões quinzenais](https://github.com/WICG/conversion-measurement-api/issues/80) (a cada duas semanas). Nessas chamadas, os participantes discutem as propostas de design da API e como a API poderia oferecer suporte a vários casos de uso de medição. Você pode [acrescentar tópicos](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit) à agenda da próxima reunião a qualquer momento. Todos são bem-vindos a participar dessas discussões - apenas certifique-se de [inscrever-se como participante do WICG](https://www.w3.org/community/wicg/).
- [Registre um issue](https://github.com/WICG/conversion-measurement-api/issues/new) para fazer perguntas, propor recursos ou discutir casos de uso. Se você não tiver certeza de como formular seu issue, veja exemplos como [este issue](https://github.com/WICG/conversion-measurement-api/issues/147) e [este issue](https://github.com/WICG/conversion-measurement-api/issues/68). Você também pode participar da discussão sobre [questões existentes](https://github.com/WICG/conversion-measurement-api/issues).

### Experimente a API

{% Aside 'caution' %}

Se estiver experimentando a API no Chrome, você terá acesso a todos os recursos que estão implementados **atualmente.** Nem todos os recursos discutidos no [repositório](https://github.com/WICG/conversion-measurement-api/) e na [reunião](https://github.com/WICG/conversion-measurement-api/issues/80) foram implementados no ensaio de origem do Chrome. Veja o status atual do de cada recurso em [Status](#status). Os recursos disponíveis para experimentação também são um subconjunto do que acabará por ser suportado pela API e estão sujeitos a alterações à medida que a API é incubada num processo aberto e recebe feedback do ecossistema.

{% endAside %}

#### Experimente localmente ou com uma demo

1. Para habilitar a API localmente em seu navegador, ative a flag `#enable-experimental-web-platform-features`. Uma flag/sinalizador do Chrome é um botão liga/desliga que informa ao seu navegador que ele deve habilitar certas funcionalidades experimentais. Para ativar essa flag, cole `chrome://flags/#enable-experimental-web-platform-features` na barra de pesquisa do Chrome e clique em **Enable**.
2. Execute a [demo](#demo) localmente (ou experimente a [live demo](#demo)).
3. [Copie o código da demo](#demo) e personalize-o ou crie sua própria demonstração do zero.

#### Experimente com usuários finais num site implantado

1. Ative a API para usuários finais registrando-se para um [ensaio de origem](/blog/origin-trials/), se disponível. Um ensaio de origem dá acesso a um recurso experimental, para construir uma funcionalidade que você pode experimentar por um tempo limitado. Observe que [os ensaios de origem](/blog/third-party-origin-trials/) de terceiros possibilitam que atores terceirizados, tais como como servidores de anúncios e provedores de medição, testem uma API entre múltiplos sites. **Para saber quais são os ensaios de origem que estão atualmente disponíveis para esta API, vá para [Status](#status)**. Para ser informado sobre ensaios de origem futuros, participe da  [lista de e-mails sobre Attribution Reporting para desenvolvedores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

2. Integre a API aos seus sites e sistemas.

{% Aside %} Se você tiver dúvidas sobre a implementação, participe da [lista de e-mails de relatórios de atribuição para desenvolvedores](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) e faça perguntas.

Se você tiver dúvidas técnicas gerais sobre seu caso de uso, considere abrir um issue no [repositório de suporte de desenvolvimento do Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support). {% endAside %}

## Demo

Algumas demonstrações estão disponíveis para você experimentar.

- Relatórios em nível de evento, apenas cliques:

    - [Demo em tempo real](https://goo.gle/sppi-devrel-eventlevel).
    - [Código-fonte](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting) para esta demonstração, que você pode [duplicar e personalizar](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize) conforme necessário.

## Casos de uso e recursos

{% Aside %}

Esta API é um trabalho em andamento e irá evoluir com o tempo, dependendo do feedback e informações recebidas do ecossistema.

Todos os recursos suportados por esta API são propostas. **Cada uma dessas propostas está aberta a discussão e feedback**, incluindo aquelas que têm uma implementação inicial do navegador pronta.

Esta API está sendo incubada e desenvolvida de forma aberta. [Considere participar](#participate) da discussão.

{% endAside %}

Esta API permite que os sites avaliem as conversões nos seguintes casos:

- **Cliques** e **visualizações** de anúncios.
- Anúncios num **iframe de terceiros**, como anúncios num site de editor que usa um provedor de adtech de terceiros.
- Anúncios num contexto **primário (first-party)** como anúncios numa rede social, página de resultados de um mecanismo de busca ou um editor que veicula seus próprios anúncios.

Um **modelo de atribuição** flexível é suportado. Veja detalhes em [Status](#status).

Essa API dá acesso a diferentes tipos de insights através de dois tipos de relatórios que podem ser enviados a um anunciante ou a um provedor de adtech terceirizado. Esses dois tipos de relatórios podem ser usados simultaneamente; eles são complementares.

**Os relatórios em nível de evento** associam um clique ou visualização de anúncio a dados de conversão brutos.

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png",   alt="event-level report", width="400", height="180" %}   <figcaption>Exemplo de relatório de nível de evento: Clique ID 200400600 em <code>news.example</code> (anexado ao ID de usuário Bob_Doe em <code>news.example</code>) levou a uma compra no <code>shop.example</code>.</figcaption></figure>

Os relatórios em nível de evento são adequados a:

- Casos de uso de **otimização.** Os relatórios em nível de evento ajudam a responder a perguntas como *"Como posso melhorar meu retorno do investimento?"*. Em particular, eles podem ser usados para otimizar o posicionamento do anúncio, uma vez que um ID exclusivo para o lado do anúncio pode ser disponibilizado nos relatórios. Os relatórios em nível de evento podem fornecer dados de treinamento para modelos de aprendizado de máquina.
- Casos de uso de **relatórios brutos** se necessita de muito pouca informação sobre a conversão. A limitação atual é de 3 bits de dados de conversão para cliques - o que significa que uma conversão pode ser atribuída a uma das oito categorias - e 1 bit para visualizações. A codificação de dados granulares do lado da conversão, como um preço ou tempo de conversão específico, não é, portanto, compatível com relatórios em nível de evento.
- Casos de uso de **detecção de fraude**. Os dados em alguns relatórios podem ser úteis para detecção e análise de fraudes em anúncios, permitindo que você entenda os padrões que podem ser usados para identificar atividades inválidas ou de spam.

**Relatórios agregados**, por outro lado, oferecem dados de conversão mais detalhados e mais flexibilidade para unir dados de clique/visualização com dados de conversão.

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="aggregate   report", width="400", height="180"%}   <figcaption>Exemplo de insights de relatórios agregados: CampaignID 1234567 em <code>news.example</code> levou a 518 conversões em <code>shoes.example</code> e a um gasto total de $38174. Metade das conversões foi de usuários em Nova York, EUA.</figcaption></figure>

Os relatórios agregados são mais adequados para **relatar** casos de uso. Eles ajudam a responder a perguntas como *"Qual é o meu retorno do investimento?"*.<br> O uso de relatórios agregados para **casos de uso de otimização** - por exemplo, para otimizar um valor de compra, que não é suportado por relatórios em nível de evento porque os dados de conversão são muito brutos - é uma área de pesquisa ativa. Veja as [perguntas abertas](#open-questions).

{% Details %} {% DetailsSummary 'h3' %} Por que são necessários dois tipos de relatórios? {% endDetailsSummary %}

Os relatórios em nível de evento oferecem apenas dados de conversão brutos para preservar a privacidade do usuário.

Mas esses dados brutos podem não ser suficientes para medir a eficácia da campanha. Os profissionais de marketing podem precisar saber detalhes sobre as conversões, como o valor da compra, os dados demográficos agregados do lado do anunciante para usuários que converteram, as categorias dos produtos que foram comprados, se os usuários convertidos são clientes novos ou recorrentes, o conteúdo dos carrinhos, etc.

Por esse motivo os relatórios agregados foram criados. {% endDetails %}

Outros recursos propostos nesta API são [a atribuição app-to-web](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (veja ou clique num anúncio dentro de um aplicativo e converta na web) e [atribuição entre dispositivos (cross-device)](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (veja ou clique num anúncio no celular e converta no desktop).

{% Aside %} No futuro, sem cookies de terceiros, esta API seria combinada com outras APIs de anúncios que preservam a privacidade para cobrir casos de uso de ponta a ponta:

- Remarketing: veja [FLEDGE](/docs/privacy-sandbox/fledge/)
- Seleção de anúncios com base em interesses: veja [FLoC](/docs/privacy-sandbox/floc/)

{% endAside %}

## Status

**🕙 Última atualização: agosto de 2021**

Status:

- `🤿 Under exploration` : esta ideia está nos estágios iniciais de discussão.
- `🥚 Proposal` : um projeto inicial está pronto e em incubação pública.
- `🏗️ Under development (BROWSER_NAME)` : o recurso está sendo implementado no BROWSER_NAME.
- `🧪 Experiment (BROWSER_NAME)` : um experimento está disponível em BROWSER_NAME. No Chrome, um experimento é chamado de ensaio de origem.
- `🚀 Stable (BROWSER_NAME)` : o recurso é fornecido por default no BROWSER_NAME.

{% Aside %} [Ensaio de origem atual](/origintrials/#/view_trial/3411476717733150721) (Chrome experiment 🧪) {% endAside %}

{% Aside 'caution' %} Vários testes de origem (experimentos) serão executados. Cada rodada é usada para melhorar e ajustar a API com base no feedback do ecossistema. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">Proposta</th>
    <th style="text-align: left;">Status</th>
</tr></thead>
<tbody>
    <tr>
    <td>Relatórios em nível de evento para cliques<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">Explicação</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Relatórios de nível de evento para visualizações<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">Explicação</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Relatórios agregados para cliques e visualizações<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Explicação</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Jornada de conversão: entre dispositivos (cross-device)<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Explicação</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Jornada de conversão: app-to-web<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Explicação</a>
</td>
    <td><code>🥚 Proposal</code></td>
    </tr>
    <tr>
    <td>Modelo de atribuição: último clique<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">Explicação</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modelo de atribuição: baseado em prioridade<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">Explicação</a>
</td>
    <td><code>🏗️ Under development (Chrome)</code></td>
    </tr>
    <tr>
    <td>Modelo de atribuição: flexível</td>
    <td><code>🤿 Under exploration</code></td>
    </tr>
</tbody>
</table>

{% Details %} {% DetailsSummary 'h3' %} Sobre modelos de atribuição {% endDetailsSummary %}

Com o modelo baseado em prioridade, o navegador pode associar uma prioridade a cada fonte de atribuição. Isto pode ser usado para:

- Decidir se um clique ou visualização foi a causa mais provável da conversão (um clique geralmente é considerado um sinal mais direto do interesse do usuário).
- Definir um **modelo de atribuição de** **primeiro toque** , definindo a `attributionsourcepriority` para que seja relativa ao tempo.
- **Definir um modelo de atribuição linear** (probabilisticamente), escolhendo uniformemente a prioridade de forma aleatória.

Outros modelos de atribuição poderão ser suportados no futuro. Em relatórios agregados, o [esquema baseado em worklet](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration) deve permitir opções de atribuição mais flexíveis, incluindo a especificação de crédito parcial para múltiplas fontes de atribuição anteriores.

{% endDetails %}

## Suporte de navegadores

- Firefox e Edge [não têm compartilhado sinais](https://chromestatus.com/feature/6412002824028160).
- Safari/Webkit é [negativo](https://chromestatus.com/feature/6412002824028160) e propôs uma API diferente para medir as conversões de anúncios, chamada [Private Click Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/).

Embora as duas APIs sejam diferentes, o Chrome e o WebKit estão trabalhando juntos de forma aberta para simplificar a experiência do desenvolvedor, por exemplo, alinhando os nomes dos atributos e a [estrutura JSON para relatórios](https://github.com/privacycg/private-click-measurement/issues/30).

{% Details %} {% DetailsSummary 'h3'%} Diferenças entre a API proposta pelo Chrome e a API proposta pelo WebKit {% endDetailsSummary %} O conjunto de recursos da Attribution Reporting API proposta pelo Chrome é diferente daquele da Private Click Measurement API proposta pelo Safari/WebKit.<br>. Na API de relatórios de atribuição proposta pelo Chrome:

- A mensuração por visualização (view-through) é suportada.
- Relatórios em nível de evento podem ser fornecidos.
- Tanto links de anúncios num contexto primário (como anúncios em rede social, página de resultados de um mecanismo de busca, ou editor veiculando seus próprios anúncios) **como também** links de anúncios num iframe de terceiros (como anúncios em site de editor que usa um provedor adtech de terceiros) são suportados.
- Terceiros, como plataformas adtech, podem receber relatórios em nome de editores e anunciantes.

{% endDetails %}

## Como funciona

### Relatórios de nível de evento

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png",   alt="event-level report", width="800", height="521" %}   <figcaption>Os relatórios de nível de evento são gerados da seguinte maneira: o navegador combina cliques ou visualizações ("eventos de origem de atribuição") com dados de conversão ("dados de disparo de atribuição") definidos por um adtech. Posteriormente, o navegador envia os relatórios resultantes para um endpoint predefinido, com algum atraso e ruído.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3'%} Como funciona em detalhes: relatórios em nível de evento {% endDetailsSummary %} Os links de anúncios podem ser configurados com atributos que são específicos para conversões de anúncios:

- Dados personalizados para anexar a um clique em anúncio (ou visualização) no lado do editor, por exemplo, um ID de clique ou ID de campanha.
- O site para o qual uma conversão é esperada para este anúncio.
- O endpoint de relatório que deve ser notificado sobre conversões bem-sucedidas, ou seja, receber os relatórios.
- A data limite para quando as conversões não poderão mais ser contadas para este anúncio.

Observação: também é possível registrar uma fonte de atribuição para navegações [iniciadas por `window.open()`](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations) ou, para visualizações, por meio de uma [API JavaScript](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript).

Quando o usuário clica ou vê um anúncio especialmente configurado, o navegador - no dispositivo local do usuário - registra esse evento, juntamente com os dados de configuração de atribuição que foram especificados.

Posteriormente, o usuário visita o site do anunciante e executa uma ação que o anunciante ou seu provedor de adtech categoriza como uma conversão, como uma compra. Quando isto acontece, o anunciante ou provedor de adtech aciona uma atribuição: ele pede ao navegador para registrar uma conversão com um determinado valor `trigger-data`, e o clique do anúncio (ou visualização) e o evento de conversão são correspondidos pelo navegador do usuário.

O navegador finalmente programa um relatório a ser enviado ao endpoint especificado no lado do anúncio. Este relatório inclui:

- Dados personalizados do lado do anúncio que foram anexados ao clique no anúncio ou visualização que levou a essa conversão.
- Dados personalizados do lado da conversão, com algum ruído.

Se várias conversões forem registradas para um determinado clique no anúncio (ou visualização), os relatórios correspondentes serão programados para serem enviados. Um único relatório pode ser enviado para visualizações e até três relatórios para cliques.

Os relatórios são enviados pelo navegador depois de um atraso⏤ dias ou, às vezes, semanas depois de uma conversão.

{% endDetails %}

### Relatórios agregados

<figure> {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %}   <figcaption>Os relatórios agregados são gerados da seguinte maneira: o navegador combina cliques ou visualizações detalhadas ("eventos de origem de atribuição") com dados de conversão detalhados ("dados de disparo de atribuição") definidos por um adtech. O código definido pela adtech é executado em um worklet para definir as contribuições que serão enviadas pelo navegador para serem usadas para calcular relatórios agregados. Os serviços de agregação são responsáveis pela computação privada de relatórios agregados para adtech.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} Como funciona em detalhes: relatórios agregados {% endDetailsSummary %}

Os links de anúncios podem ser configurados com atributos específicos para conversões de anúncios.

Quando o usuário clica ou vê um anúncio especialmente configurado, o navegador - no dispositivo local do usuário - registra esse evento, juntamente com os dados de configuração de atribuição que foram especificados.

O código definido pelo adtech é então executado em um worklet para definir as contribuições, a saber, a junção de dados do lado do anúncio e do lado da conversão.

Essas contribuições (relatórios brutos) são enviadas criptografadas para um servidor adtech e, em seguida, para os serviços de agregação que irão computar os relatórios agregados de forma [privativa.](#privacy)

Observe que os relatórios agregados não são atrasados na mesma forma que os relatórios em nível de evento.

{% endDetails %}

## Privacidade

### Visão geral

Vamos supor uma pessoa chamada Bob. Bob vê um anúncio enquanto lê as notícias no `news.com`. Uma semana depois, Bob compra sapatos no site `shoes.example`.

Hoje, essa conversão seria rastreada por um cookie de terceiros usado como **identificador entre sites (cross-site)**. Com os cookies de terceiros, uma empresa de adtech pode acessar um monte de detalhes sobre a atividade de Bob em `news.example` **e** sobre `shoes.example` e juntar essas informações para construir um perfil detalhado de Bob. Uma empresa de adtech pode acabar sabendo até a localização de Bob, seus hábitos de navegação e leituras preferidas em `news.com` ⏤ **, bem como** compras, atividades e informações de cartão de crédito em `shoes.com`. Essa junção entre sites é útil para medir as conversões de anúncios. Mas ela traz dificuldades para a privacidade do usuário: a atividade de Bob é rastreada em sites com um alto nível de detalhes.

Por outro lado, a Attribution Reporting API permite que as empresas de publicidade obtenham insights sobre as conversões **sem rastrear a atividade de um indivíduo nos sites**. Uma pequena quantidade de informações é reunida nos sites - o suficiente para medir as conversões, mas não o suficiente para rastrear a atividade de Bob nos sites em detalhes. Atividade de Bob em `news.example` e sobre `shoes.example` permanece separada.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagrama: visão lado a lado da web de hoje (identidade unida) e da web de amanhã (identidade particionada)", width="800", height="314" %}

### Em detalhes

<figure>   {% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png",   alt="ALT_TEXT_HERE", width="800", height="1237" %}   <figcaption>Ao contrário dos cookies de terceiros, a Attribution Reporting API fornece insights sem identificadores entre sites para preservar o particionamento de identidade por site.<br> Os relatórios em nível de evento vinculam um identificador do lado do anúncio a apenas uma pequena quantidade de dados do lado da conversão. Portanto, eles fornecem informações entre sites sobre uma conversão, mas as informações do lado da conversão são muito brutas para permitir a vinculação da identidade do usuário entre sites.<br> Os relatórios agregados fornecem percepções detalhadas, mas apenas num nível agregado; devido às técnicas de privacidade diferenciadas, computação privada e criptografia, os relatórios agregados não podem ser usados para rastrear a atividade de um usuário individual entre sites.<br> Proteções de privacidade adicionais, como limitações de frequência, são impostas em relatórios de nível de evento e agregados.</figcaption></figure>

{% Details %} {% DetailsSummary 'h3' %} Em detalhes: relatórios em nível de evento e privacidade {% endDetailsSummary %}

Os relatórios em nível de evento fornecem insights de conversão sem rastrear usuários em sites, seguindo os seguintes mecanismos de privacidade:

- Nenhum identificador entre sites é usado e nenhuma atividade de navegação entre sites detalhada deixa o dispositivo. Os relatórios em nível de evento associam 64 bits de informação no lado do anúncio (`news.example`) com apenas 1 bit ou 3 bits no lado da conversão (`shop.example`). 64 bits **são informações suficientes para serem mapeadas para um identificador de usuário individual, mas esses 64 bits só podem ser vinculados com muito pouca informação entre sites:** 1 bit ou 3 bits, que não são suficientes para conter um identificador. Observação: os 64 bits do lado do anúncio não são novidade. Uma ID de usuário já pode estar disponível no lado do anúncio hoje. `news.example` ou `adtech.example` já sabe sobre a atividade de um determinado usuário em `news.example`.

- Proteções adicionais são aplicadas para evitar abuso e rastreamento entre sites:

    - Os relatórios são enviados com **atraso** .
    - Nos dados de conversão são introduzidos **ruídos**: em certa porcentagem do tempo (5% no Chrome), os dados de conversão reais são substituídos por um valor aleatório.
    - O número de relatórios de conversão atribuídos é limitado por clique ou visualização.

{% Aside %} É possível recuperar a verdadeira contagem de conversão de uma forma a preservar a privacidade. Veja o [exemplo de script](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py). {% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary 'h3'%} Em detalhes: relatórios agregados e privacidade {% endDetailsSummary %}

Os relatórios agregados associam um clique detalhado ou evento de visualização com dados de conversão detalhados. No entanto, eles fornecem insights de conversão sem rastrear usuários entre sites, seguindo os seguintes mecanismos de privacidade:

- Nenhum identificador entre sites é usado.

- Cada atribuição poderá fazer múltiplas contribuições para um relatório agregado resultante e um determinado usuário pode acionar múltiplas atribuições para um determinado clique (ou visualização) e conversão. Mas as contribuições que qualquer usuário pode fazer em uma determinada janela de tempo são limitadas.

- Os dados são agregados até o nível de muitos eventos (muitos usuários) e nenhum evento individual pode ser observado com precisão. [A privacidade diferencial](https://en.wikipedia.org/wiki/Differential_privacy) é usada para manter os dados de saída inutilizáveis para vincular a identidade do usuário nos sites: ao pesquisar os dados agregados, conforme o nível de detalhe aumenta, o ruído relativo nesses dados também aumenta. Isto leva a um erro relativo maior e garante que nenhum evento individual (ou usuário) possa ser observado com precisão. Por outro lado, fatias de dados que agregam muitos eventos e usuários são mais precisas para preservar a utilidade.

- Os relatórios brutos que associam um clique detalhado ou evento de visualização com dados de conversão detalhados são criptografados e não podem ser lidos pela empresa de adtech. Os dados agregados são então calculados a partir desses relatórios de forma privativa por meio de um servidor confiável. Algumas opções de computação estão sendo consideradas:

    - Computação multipartes segura (MPC). A confiança é distribuída através de múltiplos servidores. Cada servidor obtém uma fatia dos dados que não faz sentido por si só. Depois que cada auxiliar executar cálculos, a saída desses auxiliares é combinada para formar um todo significativo.
    - Computação em servidor único. Um servidor auxiliar computa a saída. Esta opção é menos segura e oferece menos privacidade. Mas é mais fácil de configurar, o que significa que pode permitir que atores mais diversos do ecossistema experimentem essa API e forneçam feedback. **Esta opção não pretende ser uma solução de longo prazo**. Com aviso e tempo de migração suficientes, ela será descontinuada à medida que o feedback do ecossistema for integrado e à medida que esta API for amadurecendo, em favor das abordagens mais seguras, MPC ou servidor único seguro.
    - Computação segura de servidor único. Um único servidor, mas com propriedades de computação confidenciais semelhantes (mas não equivalentes) ao MPC.
    - No longo prazo, os servidores precisarão processar dados exclusivamente com computação multipartes segura (servidor único seguro ou multipartes seguro).

- Proteções adicionais são aplicadas para evitar abuso e rastreamento entre sites:

    - Os relatórios são enviados com atrasos aleatórios.
    - Consultas em diferentes fatias dos dados são limitadas.

{% endDetails %}

## Sites e controle do usuário

- Os usuários podem desativar o recurso através das configurações do usuário em `chrome://settings/privacySandbox` .
- Por default, o recurso é habilitado em contextos de nível superior. Terceiros arbitrários não podem usar a API sem o conhecimento do editor, porque a API de relatórios de atribuição precisa ser ativada em iframes filhos por meio de uma [política de permissões](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy).

## Questões abertas

Uma série questões permanecem abertas e serão resolvidas à medida que a API for incubada através de um processo aberto. Você está convidado a [participar](#participate) dessas discussões. Em particular:

- Qual é a quantidade certa de ruído para preservar a privacidade e a utilidade?
- Como oferecer suporte a modelos de atribuição personalizados?
- Como otimizar para quaisquer dados do lado da conversão que tenha um determinado nível de detalhe, como um valor de compra?
- O que se qualificará como sendo um servidor confiável? Uma solução que está sendo avaliada é realizar auditorias regulares em código aberto. [Participe da discussão](https://github.com/WICG/conversion-measurement-api/issues/116) .
- Como oferecer mais flexibilidade de relatórios, por exemplo, suportando delegação a mais endpoints de relatórios? [Participe da discussão](https://github.com/WICG/conversion-measurement-api/issues/96).
- Como evitar fraudes, por exemplo, por meio de autenticação usando credenciais anônimas? [Participe da discussão](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- Se você está pensando em usar esta API para casos de uso que não sejam de publicidade: o que está faltando, como a API poderia ser melhorada? [Registre um issue](https://github.com/WICG/conversion-measurement-api/issues)
- Como os implementadores podem personalizar as configurações de privacidade? [Participe da discussão](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %} Esta API combina várias técnicas de privacidade para obter **privacidade e utilidade**. Isto significa que a limitação de dados de 3 bits (ou 1 bit para visualizações) e outros mecanismos de privacidade usados por esta API são um meio para um fim. Eles estão sujeitos a mudanças. Se houver maneiras de as empresas adtech obterem dados mais úteis para seus casos de uso e, ao mesmo tempo, alcançar fortes garantias de privacidade, esta API evoluirá de acordo. {% endAside %}
