---
layout: 'layouts/doc-post.njk'
title: First-Party Sets
subhead: Permitir que nomes de domínio relacionados pertencentes e operados pela mesma entidade se declarem pertencentes à mesma fonte primária.
description: Os First-Party Sets permitem que nomes de domínio relacionados e pertencentes e operados pela mesma entidade se declarem pertencentes à mesma fonte primária.
date: 2021-05-18
updated: 2021-08-12
authors:
  - samdutton
---

<!--lint disable no-smart-quotes-->

## Status de implementação

- [Em ensaio de origem](https://web.dev/origin-trials/) no Chrome 89 a 93.
- [Cadastre-se para o ensaio de origem](/origintrials/#/view_trial/988540118207823873).
- [Status da plataforma Chrome](https://chromestatus.com/feature/5640066519007232).
- [Projetos Chromium](https://www.chromium.org/updates/first-party-sets) .

## Por que precisamos de First-Party Sets?

{% YouTube id='cNJ8mZ-J3F8' %}

As páginas da Web são compostas por conteúdo de várias [origens](/docs/privacy-sandbox/glossary#origin). Parte do conteúdo é de fonte primária e vem do site de nível superior que o usuário está visitando. Outros conteúdos podem vir de terceiros, como anúncios, mídia incorporada ou recursos compartilhados, como bibliotecas JavaScript de [CDNs](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/). Terceiros também podem querer correlacionar a atividade do usuário em diferentes sites usando mecanismos como [cookies](/docs/privacy-sandbox/glossary#origin).

Os navegadores estão propondo modelos de privacidade que restringem o acesso à identidade do usuário num contexto entre sites (cross-site). No entanto, muitas organizações têm sites relacionados com diferentes nomes de domínio, como domínios para diferentes países (`example.com` e `example.co.uk`, por exemplo). Deve ser possível permitir que nomes de domínio relacionados com uma relação apropriada, talvez que sejam parte de uma propriedade comum, se declarem como pertencentes à mesma fonte primária, de modo que os navegadores tratem esses domínios como fontes primárias em situações em que fontes primárias e a fontes terceiras sejam tratadas de maneira diferente.

Qualquer solução também precisaria evitar o abuso do sistema. Por exemplo, não deve ser possível declarar organizações que incluem sites não relacionados com proprietários diferentes, a fim de obter privilégios das fontes primárias.

## Como funcionam os First-Party Sets?

Um site pode declarar que é membro (ou proprietário) de um conjunto de domínios da web servindo um arquivo de manifesto que define seu relacionamento com os outros domínios: um arquivo JSON em um endereço `.well-known/first-party-set`

Suponha que `a.example` , `b.example` e `c.example` desejam formar um First-Party Set que seja propriedade de `a.example`. Os sites serviriam então aos seguintes recursos:

```json
// https://a.example/.well-known/first-party-set
{
  "owner": "a.example",
  "members": ["b.example", "c.example"],
  ...
}

// https://b.example/.well-known/first-party-set
{
	"owner": "a.example"
}

// https://c.example/.well-known/first-party-set
{
	"owner": "a.example"
}
```

O domínio proprietário hospeda um arquivo de manifesto que lista seus domínios membros. Um navegador pode pedir a um site membro para especificar seu proprietário e, em seguida, verificar o manifesto do proprietário para verificar o relacionamento.

Espera-se que as políticas do navegador evitem abusos ou uso indevido. Por exemplo, os First-Party Sets não devem permitir a troca de informações do usuário em sites não relacionados ou o agrupamento de sites que não sejam de propriedade da mesma entidade. Uma maneira possível de um site se registrar seria enviar seu grupo de domínios proposto a um rastreador público (como um repositório GitHub dedicado) junto com as informações necessárias para atender à política do navegador. A verificação do controle do proprietário sobre os domínios membros também pode exigir que um desafio seja servido numa URL `.well-known` em cada um dos domínios do conjunto.

A proposta complementar aos First-Party Sets é o atributo de cookie `SameParty`. Especificar o atributo `SameParty` num cookie instrui o navegador a incluir o cookie quando seu contexto fizer parte do mesmo First-Party Set que o contexto de nível superior.

Por exemplo, para o First-Party Set descrito acima, a.example pode definir o seguinte cookie:

`Set-Cookie: session=123; Secure; SameSite=Lax; SameParty`

Isso significa que quando um visitante em b.example ou c.example faz uma solicitação para a.example, o cookie `session` é incluído nessa solicitação.

---

## Envolva-se e compartilhe feedback

- **Ensaio de origem**: cadastre-se e participe do [ensaio de origem](/origintrials/#/view_trial/988540118207823873) do Chrome.
- **GitHub**: Leia a [proposta](https://github.com/privacycg/first-party-sets), [levante questões e acompanhe a discussão](https://github.com/privacycg/first-party-sets/issues) .
- **Suporte ao desenvolvedor**: faça perguntas e participe de discussões no [repositório Privacy Sandbox Developer Support](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) .

## Saiba mais

- [Explicação técnica dos First-Party Sets](https://github.com/privacycg/first-party-sets)
- [Status da plataforma Chrome](https://chromestatus.com/feature/5640066519007232).
- [Projetos Chromium](https://www.chromium.org/updates/first-party-sets) .
