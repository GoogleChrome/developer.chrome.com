---
layout: 'layouts/doc-post.njk'
title: 'Guia de migração (Chrome 92): Da Conversion Measurement API para a Attribution Reporting API'
subhead: A API Conversion Measurement (mensuração de conversão) está mudando no Chrome 92.
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} Se você tiver dúvidas ou precisar de suporte durante a migração, inscreva-se na [lista de e-mails](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) e faça sua pergunta. {% endAside %}

## O que está mudando?

Seguindo as mudanças na [proposta da API](https://github.com/WICG/conversion-measurement-api) nos primeiros meses de 2021, a implementação da API no Chrome está evoluindo. Eis o que está mudando:

- O nome da API e o nome da política do recursos.
- Os nomes dos atributos HTML e URLs `.well-known`
- O formato dos relatórios. Os relatórios agora são enviados em formato JSON no corpo da solicitação.
- O conteúdo dos relatórios: o `credit` foi removido, junto com os relatórios que teriam 0 crédito.

O que permanece inalterado no Chrome 92 é o conjunto de recursos suportados: relatórios em nível de evento, apenas para cliques. **Aguarde atualizações nessa área**. Depois dessa mudança, outras atualizações e recursos serão lançados em futuras versões do Chrome.

{% Aside %} Para receber atualizações sobre o ensaio de origem para esta API e os próximos recursos, inscreva-se na [lista de e-mails](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev). {% endAside %}

## Quando essas mudanças entram em vigor?

Essas alterações entram em vigor a partir do [Chrome 92](https://chromestatus.com/features/schedule), estável em 20 de julho de 2021. O Chrome 92 beta foi lançado em 3 de junho de 2021.

## O que você deve fazer?

{% Aside %} Mais mudanças na API virão em versões futuras. Eles usarão a nova nomenclatura adotada no Chrome 92. {% endAside %}

Se você estiver executando um ensaio de origem ou implementou uma demo para esta API, você tem duas opções:

- **Opção 1 (recomendada)**: migre seu código agora ou nas semanas seguintes, de preferência antes de meados de julho de 2021. Dessa forma, sua base de código estará pronta para alterações futuras e continuará funcionando nos clientes Chrome mais recentes.
- **Opção 2**: aguarde o lançamento de mais atualizações e recursos em versões futuras do Chrome e faça todas as alterações de código necessárias de uma só vez.

## Migração

### Exemplo de migração

Você pode ver um exemplo de migração para um pequeno aplicativo de demonstração nesta [solicitação pull (rascunho)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files) .

### Atualize seu código de política de recursos

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código legado</th>
<th style="text-align: left;">Código novo</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Atualize seu código de detecção de recurso

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código legado</th>
<th style="text-align: left;">Código novo</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()>br>.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()>br>.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Atualize os atributos HTML

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Código legado</th>
<th style="text-align: left;">Código novo</th>
</tr></thead>
<tbody>
<tr>
<td><code>conversiondestination</code></td>
<td><code>attributiondestination</code></td>
</tr>
<tr>
<td><code>impressiondata</code></td>
<td><code>attributionsourceeventid</code></td>
</tr>
<tr>
<td><code>impressionexpiry</code></td>
<td><code>attributionexpiry</code></td>
</tr>
<tr>
<td><code>reportingorigin</code></td>
<td><code>attributionreportto</code></td>
</tr>
</tbody>
</table>

### Atualize os argumentos `window.open()`

Uma fonte de atribuição pode ser registrada para navegações iniciadas por `window.open()`. Atualize essas chamadas se você estiver usando `window.open()` para registrar fontes de atribuição.

Seu novo código ficar como mostrado a seguir (essa mudança de nomenclatura está de acordo com [Mudança de nomes de atributos HTML](#update-the-html-attributes)):

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Atualize a URL e parâmetro da sua chamada de registro

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">Código legado</th>
<th style="text-align: left;">Código novo</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### Atualize o código do seu endpoint de relatórios

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">Código legado</th>
<th style="text-align: left;">Código novo</th>
</tr></thead>
<tbody><tr>
<td>Solicitações a serem esperadas do navegador</td>
<td><code>.well-known/register-conversion?impression-data=&conversion-data={DATA}&attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution>/td> >/tr> >tr> >td>Incoming reports>/td> >td>Enviados como parâmetros de URL.>/td> >td>Enviado como JSON no corpo da solicitação.>br> >br> Os dados do relatório estão incluídos >strong>ino corpo da solicitação como um objeto JSON>/strong> com as seguintes chaves:>br> >code>source_event_id</code>: formerly <code>impression-data</code>, ID de evento de 64 bits definido na fonte de atribuição.<br> <code>trigger_data</code> : anteriormente <code>conversion-data</code> , o conjunto de dados de 3 bits no redirecionamento do acionador de atribuição.<br><br> ⚠️ <code>credit</code> foi removido.</td>
</tr></tbody>
</table>
