---
layout: 'layouts/doc-post.njk'
title: 'A API Topics'
subhead: >
  Enable interest-based advertising, without having to resort to tracking the sites a user visits.
description: >
 A proposal for a mechanism to enable interest-based advertising without having to resort to tracking the sites a user visits.
date: 2022-02-14
updated: 2022-02-14
authors:
  - samdutton
---

## Status da implementação

Este documento descreve uma nova proposta de publicidade com base em interesses: a API Topics. 

-  A [proposta da API Topics](https://github.com/jkarlin/topics) agora está em [discussão
   pública](https://github.com/jkarlin/topics/issues) (links em inglês). 
-  Esta proposta precisa de feedback. Se você quiser fazer comentários, crie um problema no
   [Repositório de explicação da API Topics](https://github.com/jkarlin/topics) ou participe das
   discussões de 
   [Melhorias no grupo de empresas de publicidade na Web](https://www.w3.org/community/web-adv/participants).
   O repositório de explicação tem várias [perguntas em
   aberto](https://github.com/jkarlin/topics/issues) que ainda precisam de uma definição (links em
   inglês).
-  A API ainda não foi implementada em nenhum navegador.
-  [O cronograma do Sandbox de privacidade](http://privacysandbox.com/timeline) mostra quando a
   implementação da API Topics vai ser feita e outras propostas do Sandbox de privacidade.

## Por que precisamos dessa API?

A API Topics é uma proposta do [Sandbox de
privacidade](/docs/privacy-sandbox/overview/) que tem como objetivo fornecer um
mecanismo de publicidade com base em interesses sem precisar monitorar os sites visitados por um
usuário.    

{% Aside %}

A **publicidade com base em interesses (IBA)** é uma forma de publicidade personalizada em que
um anúncio é selecionado para um usuário de acordo com os interesses dele, inferidos dos sites
que ele visitou recentemente. Ela é diferente da publicidade contextual, que tem como objetivo
corresponder anúncios com o conteúdo na página que o usuário está acessando.   
A IBA pode ajudar os anunciantes a alcançar clientes em potencial e financiar sites que não
geram receita facilmente com visitas apenas usando publicidade contextual. A IBA também pode
complementar as informações contextuais da página atual a fim de ajudar a encontrar um anúncio
adequado para o visitante.  

{% endAside %}

A API Topics propõe uma forma de oferecer temas que possam ser do interesse dos usuários, com base
na atividade de navegação recente deles. Esses temas podem complementar informações contextuais para
ajudar a selecionar anúncios adequados.  
A API Topics tem três tarefas principais:

-  Mapear nomes do host de sites de acordo com temas de interesse. Por exemplo, um site de ioga
   pode ser classificado como relacionado a "Condicionamento físico". 
-  Calcular os principais temas acessados por um usuário com base na atividade de navegação
   recente dele. 
-  Fornecer uma API JavaScript para oferecer temas relacionados interesse atual do usuário e
   permitir a seleção de anúncios adequados. 

A API Topics pode facilitar controles robustos do usuário, já que foi criada com base em temas
reconhecíveis e de alto nível. O Chrome planeja oferecer aos usuários a opção de remover temas
individuais e mostrar ao usuário os temas armazenados no navegador. 

## Como os temas vão ser selecionados?

Os temas vão ser selecionados de acordo com uma
[taxonomia](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) (link em inglês): uma lista
de itens como  "Música country", "Maquiagem e cosméticos" ou "Culinária vegetariana". Inicialmente,
esses temas seriam selecionados pelo Chrome para testes, mas o objetivo é tornar a taxonomia dos
temas um recurso mantido por colaboradores confiáveis do ecossistema. A taxonomia precisa fornecer
um conjunto de poucos temas para que muitos navegadores possam ser associados a cada tema.
Atualmente, a proposta é que o número seja em torno de 350, embora se espere que o número final de
temas esteja entre a casa das centenas e dos milhares. Para evitar categorias sensíveis, esses temas
precisam ser públicos, selecionados por pessoas e atualizados. A taxonomia inicial proposta para ser
testada pelo Chrome foi selecionada por pessoas
[para excluir categorias consideradas sensíveis](#sensitive-topics),
como etnia ou orientação sexual.  
  
A API Topics propõe o uso
do[aprendizado de máquina](https://royalsociety.org/topics-policy/projects/machine-learning/what-is-machine-learning-infographic/)
(link em inglês) para inferir temas usando nomes do host. No início, o modelo do classificador
precisaria ser treinado pelo fornecedor do navegador ou por um terceiro confiável usando nomes do
host e temas selecionados por pessoas. O modelo seria distribuído com o navegador, para que seja
desenvolvido abertamente e disponibilizado sem custos financeiros. No dispositivo do usuário, o
navegador poderia usar o modelo para calcular os temas mais relevantes de um usuário com base nos
[nomes do host](https://web.dev/same-site-same-origin/#origin) dos sites visitados recentemente.   
O diagrama abaixo descreve um exemplo simplificado que mostra como a API Topics pode ajudar uma
plataforma de adtech a selecionar um anúncio adequado. Neste exemplo, presumimos que o navegador do
usuário já tenha um modelo de mapeamento dos nomes do host dos sites para os temas.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png",
  alt="Diagram showing the stages in the Topics API lifecycle, from a user visiting websites to an ad
  being displayed.", width="800", height="275" %}

Ciclo de vida da API Topics:
[ver uma versão maior](https://wd.imgix.net/image/80mq7dk16vVEg8BBhsVe42n6zn82/u9e1VvzblNVHCfyk1hRY.png?auto=format&w=1600)

## Como a API Topics funciona?

{% Aside %}

A proposta da API Topics está na
[fase de discussão inicial](/docs/privacy-sandbox/cds21-update/#discussion)
para coletar feedback e agir de acordo com o ecossistema.   
O design da API não é definitivo, e os detalhes abaixo podem mudar à medida que as discussões
progredirem.  

{% endAside %}

Um mecanismo que facilita a publicidade com base em interesses, como a API Topics, precisa garantir
que os temas sejam relevantes.  

{: #epoch}

Com a proposta da API Topics, o navegador infere temas para o usuário com base na atividade de
navegação durante um período conhecido como _época_, a proposta atual é que seja de uma semana. O
tema para cada época seria selecionado aleatoriamente entre os cinco principais temas do usuário no
período. Para aumentar ainda mais a privacidade e garantir que todos os temas sejam representados,
há uma chance de 5% dele ser selecionado aleatoriamente entre todos os temas possíveis na taxonomia.  
A API Topics JavaScript tem um método: `document.browsingTopics()` que retorna uma matriz de até
três temas, um para cada uma das três épocas mais recentes, em ordem aleatória.   
A explicações da API Topics propõe que cada objeto de tema na matriz retornada por
`document.browsingTopics()` tenha três propriedades:

-  `id`: o ID do tema na taxonomia
-  `taxonomyVersion`: o conjunto de temas atualmente usado pelo navegador
-  `classifierVersion`: o classificador de aprendizado de máquina usado para inferir temas dos
   nomes do host de sites  

{% Aside %}

No momento, o design da API Topics está em discussão como uma
[explicação](https://github.com/jkarlin/topics) (link em inglês), que é apenas o primeiro passo
no processo de padronização. A API não está finalizada.   
Os parâmetros descritos neste artigo e os detalhes da API, como tamanho da taxonomia, número de
temas calculados por semana e número de temas retornados por chamada, estão sujeitos a mudanças
à medida que o feedback do ecossistema é incorporado e a iteração da API é feita.

{% endAside %}

{: #observed-topics}

### Os autores das chamadas da API só recebem temas observados

Um objetivo do design da API Topics é ativar a publicidade com base em interesses sem compartilhar
informações com mais entidades do que o atualmente possível usando cookies de terceiros. A API
Topics propõe que os temas só possam ser retornados a autores de chamadas que já tenham sido
observados dentro de um período limitado.  

{: #caller}

{% Aside 'key-term' %}

Na API Topics,**um autor da chamada** é a entidade que _chama_ o método JavaScript
`document.browsingTopics()` e usa os temas retornados pelo método para selecionar anúncios
relevantes.   

Normalmente, uma chamada para `document.browsingTopics()` é feita em códigos incluídos em um
site de terceiros, como uma plataforma de adtech. O navegador determina o autor da chamada com
base no site do documento atual. Por isso, se você é um terceiro em uma página, chame a API de
um iframe que pertença ao seu site.  

Para que o método  `document.browsingTopics()` retorne um ou mais temas, ele precisa ser chamado
no código da mesma origem do código que estava em um site onde os temas foram observados.  

{% endAside %}

É possível dizer que um autor da chamada da API _observou_ um tema para um usuário se ele chamou o
método `document.browsingTopics()` no código incluído em um site que a API Topics mapeou para o
tema. Por exemplo: 

1. A API Topics mapeia o nome do host do site `tricotando.example` para temas como "Tecidos e
   Artes Têxteis".
1. O código de `adtech.example` está incluído nas páginas de `tricotando.example`.
1. Um usuário acessa o site `tricotando.example`.
1. O código de  `adtech.example` chama o método  `document.browsingTopics(). `
1. Um dos temas que o navegador inferiu para tricotando.example é "Tecidos e Artes Têxteis".
1. O `adtech.example` observou o tema "Tecidos e Artes Têxteis" para esse usuário.

O método `document.browsingTopics()` da API fornece apenas temas que já foram observados pelo autor
da chamada nas três
[épocas](#epoch)
mais recentes. Isso impede que as informações sobre o usuário sejam compartilhadas com mais
entidades do que as tecnologias que a API substitui, incluindo cookies de terceiros.   
O número de temas retornados pelo método `document.browsingTopics()` depende do número de temas que
o
[autor da chamada da API](#caller)
observou anteriormente e o número de temas disponíveis para o usuário, como o número de semanas com
dados acumulados. O método pode retornar de zero a três temas.

### Como a API Topics JavaScript vai ser?

O código abaixo mostra um exemplo básico do possível uso da API. Para simplificar, não há
processamento de erros.  

{% Aside 'warning' %}

Este snippet de código é fornecido apenas para mostrar a aparência da API Topics JavaScript. O
design da API está sujeito a mudanças, e o código não funciona em nenhum navegador no momento.  

{% endAside %}

```javascript
// Get the array of top topics for this user.
const topics = await document.browsingTopics();

// Request an ad creative.
const response = await fetch('https://ads.example/get-creative', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(topics)
})

// Get the JSON from the response.
const creative = await response.json();

// Display ad.
```

### Como a API Topics decide que autores de chamadas podem ver quais temas?

Os autores das chamadas de API só recebem temas observados recentemente, e os temas de um usuário
são atualizados uma vez a cada época. Isso significa que a API fornece uma janela contínua em que um
autor da chamada pode receber certos temas.  
A tabela abaixo descreve um exemplo, embora pouco realista, de um histórico de navegação hipotético
de um usuário durante uma única época, mostrando os temas associados aos sites visitados e os
[autores de chamada](#caller)
da API em cada site, ou seja, as entidades que chamam o método `document.browsingTopics()` no código
JavaScript incluído no site..

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Site</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Autores da chamada da API no site</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>ioga.example</td>
<td>Condicionamento físico</td>
<td>adtech1.example adtech2.example</td>
</tr>
<tr>
<td>tricotando.example</td>
<td>Artesanato</td>
<td>adtech1.example</td>
</tr>
<tr>
<td>viagem-caminhada.example</td>
<td>Condicionamento físico e<br>
Viagens e transporte</td>
<td>adtech2.example</td>
</tr>
<tr>
<td>façavocêmesmo-roupas.example</td>
<td>Artesanato, moda e estilo</td>
<td>[nenhum]</td>
</tr>
</tbody>
</table>

No final da época, atualmente proposta para ser de uma semana, a API Topics gera os principais temas
do navegador para a semana.

-  adtech1.example agora é qualificado para receber os temas "Condicionamento físico" e
   "Artesanato" porque os observou em ioga.example e também em tricotando.example. 
-  adtech1.example não está qualificado para receber o tema "Viagens e transporte" deste usuário
   porque não está presente nos sites visitados recentemente associados a esse tema.
-  adtech2.example observou os temas "Condicionamento físico" e "Viagens e transporte", mas não
   "Artesanato".

O usuário visitou o site façavocêmesmo-roupas.example, que pertence ao tema "moda", mas não houve
chamadas à API Topics naquele site. Neste ponto, isso significa que o tema "moda" não seria
retornado pela API para nenhum autor da chamada.  
Na segunda semana, o usuário visita outro site:

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Site</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Autores da chamada da API no site</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>costurando.example</td>
<td>Artesanato</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

Além disso, o código de adtech2.example é adicionado ao site façavocêmesmo-roupas.example:

<table>
<thead>
<tr>
<th style="text-align: left;"><strong>Site</strong></th>
<th style="text-align: left;"><strong>Temas</strong></th>
<th style="text-align: left;"><strong>Autores da chamada da API no site</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>façavocêmesmo-roupas.example</td>
<td>Artesanato, moda e estilo</td>
<td>adtech2.example</td>
</tr>
</tbody>
</table>

Assim como "Condicionamento físico" e "Viagens e transporte" na primeira semana, isso significa que
adtech2.example agora pode receber os temas "Artesanato" e "Moda e estilo", mas não até a época
seguinte, na terceira semana. Isso garante que terceiros não possam saber mais sobre o passado de um
usuário do que conseguiriam usando cookies, como nesse caso, saber sobre um interesse em moda.  
Depois de mais duas semanas, "Condicionamento físico" e "Viagens e transporte" podem sair da lista
de temas qualificados de adtech2.example, se o usuário não acessar sites com esses temas que incluem
código de adtech2.example.

### Como a API infere temas para um site?

A explicação da API Topics propõe que os temas sejam derivados de um [modelo de
classificador](https://github.com/jkarlin/topics#:~:text=classifier) (link em inglês) que mapeia os
[nomes do host](https://web.dev/same-site-same-origin/#origin) de sites para zero ou mais temas.   
A análise de outras informações, como URLs completos ou conteúdos da página, pode permitir anúncios
mais relevantes, mas também reduzir a privacidade.   
O modelo de classificador do mapeamento de nomes do host para temas seria disponibilizado
publicamente, e a explicação propõe que é possível ver os temas de um site usando ferramentas para
desenvolvedores do navegador. O modelo de mapeamento seria atualizado periodicamente. Porém, a
frequência ainda está sob consideração.

### Como os cinco principais temas do usuário são selecionados?

A API retorna um tema para cada período, até um máximo de três. Se três temas forem retornados, eles
incluem temas da época atual e das duas anteriores. 

1. No final de cada período, o navegador compila uma lista de páginas que atendem a estes
   critérios: 
   1. A página foi visitada pelo usuário durante a época.
   1. A página inclui um código que chama o método `document.browsingTopics()` 
   1. A API está ativada e não foi bloqueada pelo usuário ou por um
      [cabeçalho de resposta](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy)
      (link em inglês).

1. O navegador no dispositivo do usuário usa o modelo de classificador fornecido pela API Topics
   a fim de mapear o nome do host de cada página para uma lista de temas.
1. O navegador acrescenta temas à lista.
1. O navegador gera uma lista dos cinco temas principais de acordo com a frequência.

O método  `document.browsingTopics()` retorna um tema aleatório entre os cinco principais  para cada
período, com uma chance de que 5% deles sejam escolhidos aleatoriamente da taxonomia completa dos
temas.  
No Chrome, os usuários também vão poder remover temas individuais ou limpar o histórico de navegação
para reduzir o número de temas retornados pela API. Os usuários também podem desativar a API:
consulte
[Desativação por parte do usuário](#opt-out).

## Como a API Topics aborda questões relacionadas ao FLoC?

O teste de origem do [FLoC](https://github.com/WICG/floc) (link em inglês) em 2021 recebeu um
feedback variado de colaboradores do ecossistema da Web e de adtech. Em especial, havia receios de
que as coortes do FLoC fossem usadas como uma superfície de técnicas de impressão digital para
identificar usuários ou pudessem revelar a associação de um usuário a uma categoria sensível. Também
houve pedidos para tornar o FLoC mais transparente e compreensível para os usuários.   
A API Topics foi criada pensando nesse feedback, para explorar outras maneiras de apoiar a
publicidade com base em interesses, com maior transparência, maior garantia de privacidade e uma
abordagem diferente para categorias sensíveis.

### Reduzir as técnicas de impressão digital

A API Topics propõe vários mecanismos para ajudar a garantir que seja difícil reidentificar um
número significativo de usuários em sites que usam apenas a API Topics: 

-  A taxonomia da API Topics oferece um conjunto de temas abrangentes. A primeira taxonomia tem
   cerca de 350, o que significa que cada tema provavelmente vai ter um grande número de usuários,
   dependendo do número total de usuários do navegador. Na verdade, há um número mínimo garantido
   de usuários por tema, porque 5% das vezes o tema retornado é aleatório.
-  Os temas são retornados aleatoriamente dos cinco principais do usuário.
-  5% das vezes, um tema aleatório (escolhido do conjunto completo de temas) é fornecido.
-  Se um usuário acessa com frequência o mesmo site (por exemplo, toda semana), o código
   executado no site só pode aprender, no máximo, um novo tema por semana.
-  Sites diferentes recebem temas distintos para um mesmo usuário na mesma época. Há uma chance
   de apenas um em cinco de que o tema retornado para um usuário em um site corresponda ao tema
   retornado em outro. Com isso, fica mais difícil determinar se eles são do mesmo usuário.
-  Os temas são atualizados para um usuário uma vez por semana, o que limita a taxa de
   compartilhamento das informações. 
-  Um tema é retornado apenas para um autor da chamada da API que
   [observou esse tema](#observed-topics)
   para o mesmo usuário recentemente. Esse modelo ajuda a limitar o potencial que as entidades têm
   para descobrir (ou compartilhar) informações sobre os interesses dos usuários que não foram
   observados em primeira mão. 

{: #sensitive-topics}

### Temas sensíveis

A [taxonomia](https://github.com/jkarlin/topics/blob/main/taxonomy_v1.md) (link em inglês) da API
Topics vai ser pública e selecionada por pessoas para evitar categorias sensíveis.   
Além disso, tanto sites quanto usuários podem
[desativar](#opt-out)
a API Topics. .

{% Aside %}

Como a explicação da proposta da API Topics descreve (em inglês):  "Os cookies de terceiros podem ser usados para monitorar qualquer coisa sobre um usuário, desde os URLs exatos que ele visitou até o conteúdo das páginas. Isso pode incluir material sensível ilimitado. Por outro lado, a API Topics está restrita a uma taxonomia selecionada de temas. Isso não quer dizer que outras coisas não possam ser correlacionadas estatisticamente com os temas da taxonomia. Isso é possível. No entanto, ao comparar as duas abordagens, a API Topics parece ser uma grande melhoria em relação aos cookies."

{% endAside %}


### Transparência e controles do usuário

Os usuários precisam ser capazes de entender a finalidade da API Topics, reconhecer o que está sendo
dito sobre eles, saber quando a API está em uso e receber controles para a ativar ou desativar.  
A taxonomia legível da API permite que as pessoas aprendam e controlem os temas que podem ser
sugeridos pelo navegador. Os usuários podem remover temas sobre os quais não querem ver anúncios, e
pode haver uma UX para informar o usuário sobre a API e como a ativar ou desativar. O Chrome oferece
informações e configurações da API Topics em chrome://settings/privacySandbox. Além disso, os temas
não ficam disponíveis para autores de chamadas da API no modo de navegação anônima, e os temas são
excluídos quando o histórico de navegação é limpo. .

{: #opt-out}


### Desativar o site

Apenas os sites que incluem o código que chama a API Topics seriam incluídos no histórico de
navegação qualificado para cálculos de frequência de temas, e os autores das chamadas da API
[recebem apenas os temas observados](#observed-topics)
Ou seja, os sites não se qualificam para cálculos de frequência de temas sem o site ou um serviço
integrado para chamar a API.  
A explicação da API Topics também propõe que os sites possam bloquear o cálculo de temas para os
visitantes com este cabeçalho
[Permissions-Policy](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) (link
em inglês):  

```text  
Permissions-Policy: browsing-topics=()
````

{% Aside %}

A Permissions-Policy atual `interest-cohort=()` do FLoC também impede o cálculo de temas.

{% endAside %}

### Desativação por parte do usuário

A explicação da API Topics [propõe](https://github.com/jkarlin/topics#:~:text=empty) (em inglês) que
a lista de temas retornados esteja vazia se:

-  O usuário desativar a API Topics nas configurações do navegador em
   chrome://settings/privacySandbox.
-  O usuário limpou os temas (nas configurações do navegador em chrome://settings/privacySandbox)
   ou [os cookies](https://support.google.com/accounts/answer/32050).
-  O navegador está no modo de navegação anônima.

A explicação fornece
[mais detalhes sobre as metas de privacidade](https://github.com/jkarlin/topics#:~:text=privacy%20goals)
(em inglês) e mostra como a API tenta as alcançar.

---

## Engajamento e como compartilhar feedback

-  **GitHub**: leia a [explicação da proposta](https://github.com/jkarlin/topics), faça
   perguntas e acompanhe a discussão em [problemas no repositório da
   proposta](https://github.com/jkarlin/topics/issues).
-  **W3C**: fale sobre os casos de uso do setor na página de
   [Melhorias no grupo de empresas de publicidade na Web](https://www.w3.org/community/web-adv/participants)
   (link em inglês).
-  **Comunicados sobre a API Topics**: participe ou veja a lista de e-mails em [groups.google.com/a/chromium.org/g/topics-api-annnounce](https://groups.google.com/a/chromium.org/g/topics-api-annnounce)
-  **Suporte para desenvolvedores do Sandbox de privacidade**: faça perguntas e participe das
discussões no   
   [Repositório de suporte ao desenvolvedor do Sandbox de privacidade](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)
   (link em inglês).

## Saiba mais

-  [Explicação técnica da API Topics](https://github.com/jkarlin/topics) (em inglês)
-  [Explorar o Sandbox de privacidade](https://web.dev/digging-into-the-privacy-sandbox) (em
   inglês)  
  
