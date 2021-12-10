---
layout: layouts/doc-post.njk
title: 'Guide de migration (Chrome 92) : de l''API Conversion Measurement vers l''API Attribution Reporting'
subhead: "L'API Conversion Measurement évolue dans Chrome 92."
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} Si vous avez des questions ou besoin d'aide pendant votre migration, rejoignez la [liste de diffusion](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) et posez votre question. {% endAside %}

## Qu'est-ce qui change ?

Suite aux modifications apportées à la [proposition d'API](https://github.com/WICG/conversion-measurement-api) au cours des premiers mois de 2021, l'implémentation de l'API dans Chrome évolue. Voici ce qui change :

- Le nom de l'API et le nom de la stratégie de fonctionnalité.
- Les noms d'attribut HTML et les URL `.well-known`.
- Le format des rapports : les rapports sont désormais envoyés au format JSON dans le corps de la requête.
- Le contenu des rapports : `credit` a été supprimé, ainsi que les rapports qui auraient eu 0 crédit.

Ce qui reste inchangé dans Chrome 92, c'est l'ensemble des fonctionnalités prises en charge : les rapports basés sur les événements, pour les clics uniquement. **Attendez-vous à des mises à jour à ce sujet**. Après ce changement, d'autres mises à jour et fonctionnalités seront publiées dans les futures versions de Chrome.

{% Aside %} Pour recevoir des mises à jour concernant la phase d'évaluation pour cette API et les fonctionnalités à venir, abonnez-vous à la [liste de diffusion](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev). {% endAside %}

## Quand ces changements prennent-ils effet ?

Ces changements prennent effet à partir de [Chrome 92](https://chromestatus.com/features/schedule), stable le 20 juillet 2021. La version bêta de Chrome 92 est sortie le 3 juin 2021.

## Que devez-vous faire ?

{% Aside %} D'autres changements seront apportés à l'API dans les futures versions. Ils utiliseront la nouvelle dénomination adoptée dans Chrome 92. {% endAside %}

Si vous exécutez une phase d'évaluation ou avez implémenté une démo pour cette API, vous avez deux options :

- **Option 1 (recommandée)** : migrez votre code maintenant ou dans les semaines suivantes, idéalement avant la mi-juillet 2021. De cette façon, votre base de code sera prête pour les modifications futures et continuera à fonctionner pour les nouveaux clients Chrome.
- **Option 2** : attendez que d'autres mises à jour et fonctionnalités soient publiées dans les futures versions de Chrome et apportez toutes les modifications de code nécessaires en même temps.

## Migration

### Exemple de migration

Vous pouvez voir un exemple de migration pour une petite application de démonstration dans cette [requête d'extraction (brouillon)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files).

### Mettre à jour votre code de stratégie de fonctionnalité

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Code hérité</th>
<th style="text-align: left;">Nouveau code</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Mettre à jour votre code de détection de fonctionnalité

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Code hérité</th>
<th style="text-align: left;">Nouveau code</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Mettre à jour les attributs HTML

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Code hérité</th>
<th style="text-align: left;">Nouveau code</th>
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

### Mettre à jour les arguments `window.open()`

Une source d'attribution peut être enregistrée pour les navigations initiées par `window.open()`. Mettez à jour ces appels si vous utilisez `window.open()` pour enregistrer les sources d'attribution.

Votre nouveau code devrait ressembler à ceci (ce nouveau nom suit le [renommage des attributs HTML](#update-the-html-attributes)) :

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Mettre à jour l'URL et le paramètre d'appel d'inscription

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">Code hérité</th>
<th style="text-align: left;">Nouveau code</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### Mettre à jour votre code de point de terminaison de génération de rapports

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">Code hérité</th>
<th style="text-align: left;">Nouveau code</th>
</tr></thead>
<tbody><tr>
<td>Requêtes à attendre du navigateur</td>
<td><code>.well-known/register-conversion?impression-data=&amp;conversion-data={DATA}&amp;attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Incoming reports&lt;/td&gt; &lt;td&gt;Sent as URL parameters.&lt;/td&gt; &lt;td&gt;Sent as JSON in the request body.&lt;br&gt; &lt;br&gt; The report data is included &lt;strong&gt;in the request body as a JSON object&lt;/strong&gt; with the following keys:&lt;br&gt; &lt;code&gt;source_event_id</code> : anciennement <code>impression-data</code>, l'ID d'événement 64 bits défini sur la source d'attribution.<br> <code>trigger_data</code> : anciennement <code>conversion-data</code>, l'ensemble de données 3 bits dans la redirection du déclencheur d'attribution.<br><br> ⚠️ <code>credit</code> a été supprimé.</td>
</tr></tbody>
</table>
