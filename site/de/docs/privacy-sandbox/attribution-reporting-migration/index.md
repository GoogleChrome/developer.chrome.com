---
layout: layouts/doc-post.njk
title: 'Migrationsleitfaden (Chrome 92): Vom Conversion Measurement API zum Attribution Reporting API'
subhead: In Chrome 92 werden am Conversion Measurement API Änderungen vollzogen.
date: 2021-06-22
updated: 2021-06-22
authors:
  - maudn
---

{% Aside %} Wenn Sie Fragen haben oder während Ihrer Migration Unterstützung benötigen, tragen Sie sich in die [Mailingliste ein](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) und stellen Sie Ihre Frage. {% endAside %}

## Was ändert sich?

Nach den Änderungen am [API-Vorschlag](https://github.com/WICG/conversion-measurement-api) in den ersten Monaten des Jahres 2021 entwickelt sich die API-Implementierung in Chrome nun weiter. Folgendes ändert sich:

- Der API-Name und der Feature-Policy-Name.
- Die Namen der HTML-Attribute und `.well-known`-URLs.
- Das Berichtsformat. Berichte werden jetzt als JSON im Body der Anfrage gesendet.
- Der Inhalt der Berichte: Die `credit`-Angabe, sowie Berichte die einen Credit von 0 hätten, wurden entfernt.

Was in Chrome 92 unverändert bleibt, ist die Auswahl unterstützter Funktionen: Berichte auf Ereignisebene (nur für Klicks). **Erwarten Sie hierzu in Zukunft weitere Neuigkeiten**. Nach dieser Änderung werden in zukünftigen Chrome-Versionen weitere Updates und Funktionen veröffentlicht.

{% Aside %} Um Updates zur Origin-Trial für dieses API und kommende Funktionen zu erhalten, tragen Sie sich in die [Mailingliste](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) ein. {% endAside %}

## Wann treten diese Änderungen in Kraft?

Diese Änderungen traten am 20. Juli 2021 mit der Veröffentlichung der stabilen Version von [Chrome 92](https://chromestatus.com/features/schedule) in Kraft. Die Betaversion von Chrome 92 wurde am 3. Juni 2021 veröffentlicht.

## Was sollte man tun?

{% Aside %} Es wird in zukünftigen Versionen weitere Änderungen an dem API geben. Bei diesen Änderung werden die neuen Bezeichnungen verwendet, die in Chrome 92 eingeführt wurden. {% endAside %}

Wenn Sie eine Origin-Trial ausführen oder eine Demo für dieses API implementiert haben, haben Sie zwei Möglichkeiten:

- **Option 1 (empfohlen)**: Migrieren Sie Ihren Code jetzt oder in den folgenden Wochen, idealerweise vor Mitte Juli 2021. Auf diese Weise ist Ihre Codebasis für zukünftige Änderungen bereit und wird auch mit neueren Chrome-Clients funktionieren.
- **Option 2**: Warten Sie, bis weitere Updates und Funktionen in zukünftigen Chrome-Versionen veröffentlicht werden, und nehmen Sie alle erforderlichen Codeänderungen auf einmal vor.

## Migrieren Sie

### Beispiel für eine Migration

In dieser [Pull-Anfrage (Entwurf)](https://github.com/GoogleChromeLabs/trust-safety-demo/pull/4/files) sehen Sie ein entsprechendes Beispiel für eine kleine Demo-App.

### Aktualisieren Sie den Code Ihrer Feature-Policy

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy-Code</th>
<th style="text-align: left;">Neuer Code</th>
</tr></thead>
<tbody><tr>
<td><code>allow='conversion-measurement'</code></td>
<td><code>allow='attribution-reporting'</code></td>
</tr></tbody>
</table>

### Aktualisieren Sie Ihren Funktionserkennungs-Code

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy-Code</th>
<th style="text-align: left;">Neuer Code</th>
</tr></thead>
<tbody><tr>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('conversion-measurement')</code></td>
<td><code>document.featurePolicy.features()&lt;br&gt;.includes('attribution-reporting')</code></td>
</tr></tbody>
</table>

### Aktualisieren Sie die HTML-Attribute

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th style="text-align: left;">Legacy-Code</th>
<th style="text-align: left;">Neuer Code</th>
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

### Aktualisieren Sie die `window.open()`-Argumente

Es kann für mit `window.open()` initiierte Navigationsaktionen eine Attributionsquelle registriert werden. Aktualisieren Sie diese Aufrufe, wenn Sie `window.open()` zum Registrieren von Attributionsquellen verwenden.

Ihr neuer Code sollte wie folgt aussehen (die Angaben berücksichtigen die [Umbenennung der HTML-Attribute](#update-the-html-attributes)):

```javascript
window.open(
  'https://dest.example',
  '_blank',
  'attributionsourceeventid=1234,attributiondestination=https://dest.example,attributionreportto=https://reporter.example,attributionexpiry=604800000'
);
```

### Aktualisieren Sie die URL und den Parameter Ihres Registrierungsaufrufs

<table class="simple width-full fixed-table with-heading-tint w-table--top-align">
<thead><tr>
<th style="text-align: left;">Legacy-Code</th>
<th style="text-align: left;">Neuer Code</th>
</tr></thead>
<tbody><tr>
<td><code>.well-known/register-conversion?conversion-data={DATA}</code></td>
<td><code>.well-known/attribution-reporting/trigger-attribution?trigger-data={DATA}</code></td>
</tr></tbody>
</table>

### Aktualisieren Sie den Code Ihres Berichtendpunkts

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
<th></th>
<th style="text-align: left;">Legacy-Code</th>
<th style="text-align: left;">Neuer Code</th>
</tr></thead>
<tbody><tr>
<td>Vom Browser zu erwartende Anfragen</td>
<td><code>.well-known/register-conversion?impression-data=&amp;conversion-data={DATA}&amp;attribution-credit=100</code></td>
<td>
<code>.well-known/attribution-reporting/trigger-attribution&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Ankommende Berichte&lt;/td&gt; &lt;td&gt;Als URL-Parameter gesendet.&lt;/td&gt; &lt;td&gt;Als JSON im Body der Anfrage gesendet.&lt;br&gt; &lt;br&gt; Die Daten des Berichts sind &lt;strong&gt;im Anfrage-Body als JSON-Objekt &lt;/strong&gt; mit den folgenden Schlüsseln enthalten:&lt;br&gt; &lt;code&gt;source_event_id</code>:&lt;br&gt; &lt;code&gt;source_event_id: vorher <code>impression-data</code>, die 64-Bit-Ereignis-ID, die für die Attributionsquelle festgelegt wurde.<br> <code>trigger_data</code>: früher <code>conversion-data</code>, der 3-Bit-Datensatz in der Attributions-Trigger-Weiterleitung.<br><br> ⚠️ <code>credit</code> wurde entfernt.</td>
</tr></tbody>
</table>
