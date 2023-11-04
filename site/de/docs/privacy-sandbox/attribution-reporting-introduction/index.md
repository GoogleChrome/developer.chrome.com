---
layout: layouts/doc-post.njk
title: Einführung in die Attributionsberichterstattung (Conversion-Messung)
subhead: Einführung und Schlüsselkonzepte zum Verständnis des Attribution Reporting APIs.
date: 2021-08-09
updated: 2021-08-09
authors:
  - maudn
---

{% Aside %}<br> Dieses API hat den Status eines Vorschlags und wird im Laufe der Zeit erweitert werden. Dieser Blogbeitrag beschreibt den aktuellen Stand und wird im Zuge der Entwicklung des API aktualisiert. {% endAside %}

Aktualisierungen:

- Anfang 2021: aggregierte Berichte und View-through-Messungen wurden dem Vorschlag hinzugefügt.
- Anfang 2021: Das API wurde in „Attribution Reporting API“ umbenannt.

{% Aside 'caution' %}

- Dieser Beitrag konzentriert sich auf Werbeanwendungsfälle, aber das Attribution Reporting API kann auch Anwendungsmöglichkeiten außerhalb des Werbebereichs haben.
- Die Werbeanwendungsmöglichkeiten für dieses API konzentrieren sich auf die Verknüpfung von Anzeigenklicks oder -aufrufen mit Conversions (Conversion-Messung).<br> {% endAside %}

## Einführung

Mit dem Attribution Reporting API lässt sich messen, wann ein **Klick oder die Ansicht** einer Werbeanzeige zu einer **Conversion** auf der Website eines Werbetreibenden führt, z. B. zu einem Verkauf oder einer Registrierung. Das API setzt dabei nicht auf Drittanbieter-Cookies oder Mechanismen, die verwendet werden können, um einzelne Benutzer über verschiedene Websites hin zu identifizieren.

Dieser Vorschlag wird in einem offenen Verfahren entwickelt. Der Vorschlag und die zugehörigen Diskussionen sind im [WICG GitHub-Repository](https://github.com/WICG/conversion-measurement-api) zu finden.

{% Aside %}<br> Dieses API ist Teil der Privacy Sandbox, einer Reihe von Vorschlägen mit dem Ziel Anwendungsmöglichkeiten für Drittanbieter zu schaffen, ohne Drittanbieter-Cookies oder andere websiteübergreifende Tracking-Mechanismen zu nutzen. Siehe [Privacy-Sandbox-Vorschläge](/docs/privacy-sandbox).<br> {% endAside %}

## Warum wird dieses API benötigt?

Heutzutage basiert die Messung von auf Anzeigen zurückzuführender Conversions häufig auf [Drittanbieter-Cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies). Browser schränken den Zugriff auf Drittanbieter-Cookies ein, da diese verwendet werden können, um Benutzer über Websites hinweg zu verfolgen und die Privatsphäre der Benutzer beeinträchtigen. Dieses API ermöglicht diese Messungen auf datenschutzwahrende Weise ohne Drittanbieter-Cookies.

## Wer sollte über dieses API Bescheid wissen?

- Adtech-Plattformen wie [nachfrageseitige Plattformen](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) oder [Datenverwaltungsplattformen](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) können dieses API verwenden, um Funktionen zu unterstützen, die derzeit auf Drittanbieter-Cookies angewiesen sind.
- Werbetreibende und Betreiber, die auf benutzerdefinierten Code für Werbung oder Conversion-Messung angewiesen sind, können dieses API verwenden, um bestehende Techniken zu ersetzen.
- Werbetreibende und Betreiber, die sich für die Conversion-Messung auf Adtech-Plattformen verlassen, müssen das API zwar nicht direkt nutzen, haben aber möglicherweise Interesse daran es zu verstehen, wenn sie mit Adtech-Plattformen zusammenarbeiten, die diese API-Integration nutzen.

## Debuggen Sie die API-Fehler mit den Chrome-Entwicklertools

[Erhältlich ab Chrome 93](/blog/new-in-devtools-93/#attribution-reporting). Fehler des Attribution Reporting APIs werden jetzt in den [DevTools](/docs/devtools) unter der [Registerkarte „Issues“](/docs/devtools/issues/) gemeldet.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bkEGVEv5kKc9M6qBUmLz.png", alt="Attribution-Reporting-API-Fehler unter der Registerkarte „Probleme“", width="800", height="501" %}

## Beteiligen Sie sich

{% Aside %}<br> **Ihre Teilnahme ist gefragt!** Dieses API muss höchstwahrscheinlich Unterstützung für eine Vielzahl von Anwendungsmöglichkeiten zur Conversion-Messung und -optimierung bieten. Es ist entscheidend, dieses Ökosystem mit Ideen zu bereichern, um sicherzustellen, dass Lösungen zur Unterstützung aller dieser Anwendungsfälle offen diskutiert werden. {% endAside %}

Beteiligen Sie sich an der Diskussion und testen Sie das API. Beides zu tun wäre optimal, aber Sie können sich gerne auch ohne eigener Erfahrung mit dem API an der Diskussion beteiligen.

### Beteiligen Sie sich an der Diskussion

- [Nehmen Sie an den zweiwöchentlichen Sitzungen](https://github.com/WICG/conversion-measurement-api/issues/80) (jede zweite Woche) teil. In diesen Telefonkonferenzen diskutieren die Teilnehmer Vorschläge zum API-Design und wie das API verschiedene Anwendungsfälle für Messungen unterstützen könnte. Sie können jederzeit [Themen](https://docs.google.com/document/d/1zUSm9nX2nUsCa_fbI96UJoRCEr3eAPwWLU7HmClhIJk/edit) zur Tagesordnung der nächsten Sitzung hinzufügen. Jeder ist herzlich eingeladen, an diesen Diskussionen teilzunehmen. [Treten Sie einfach der WICG bei.](https://www.w3.org/community/wicg/)
- [Eröffnen Sie eine Issue](https://github.com/WICG/conversion-measurement-api/issues/new), um Fragen zu stellen, Funktionen vorzuschlagen oder Anwendungsmöglichkeiten zu diskutieren. Wenn Sie sich nicht sicher sind, wie Sie Ihr Problem formulieren sollen, sehen Sie sich Beispiele wie [diese Issue](https://github.com/WICG/conversion-measurement-api/issues/147) und [diese Issue](https://github.com/WICG/conversion-measurement-api/issues/68) an. Sie können sich auch an der Diskussion zu [bestehenden Problemen](https://github.com/WICG/conversion-measurement-api/issues) beteiligen.

### Probieren Sie das API aus

{% Aside 'caution' %}

Wenn Sie mit dem API in Chrome experimentieren, haben Sie Zugriff auf alle **derzeit** implementierten Funktionen. Nicht alle im [Repository](https://github.com/WICG/conversion-measurement-api/) und in der [Sitzung](https://github.com/WICG/conversion-measurement-api/issues/80) besprochenen Funktionen sind in der Chrome-Origin-Trial implementiert. Informationen über den aktuellen Status einer Funktion finden Sie unter [Status](#status). Die für Experimente verfügbaren Funktionen sind eine Teilmenge dessen, was letztendlich von dem API unterstützt werden wird. Sie sind ständigen Änderungen unterworfen, während das API in diesem öffentlichen Verfahren entwickelt wird und Feedback aus dem Software-Ökosystem gesammelt wird.

{% endAside %}

#### Experimentieren Sie lokal oder mit einer Demo

1. Um das API lokal in Ihrem Browser zu aktivieren, aktivieren Sie das Flag `#enable-experimental-web-platform-features`. Ein Chrome-Flag ist ein Schalter, der Ihrem Browser mitteilt, bestimmte experimentelle Funktionen zu aktivieren. Fügen Sie zur Aktivierung dieses Flags `chrome://flags/#enable-experimental-web-platform-features` in die Suchleiste von Chrome ein und klicken Sie auf **Aktivieren**.
2. Führen Sie die [Demo](#demo) lokal aus (oder probieren Sie die [Live-Demo](#demo) aus).
3. [Erstellen Sie einen Fork des Democodes](#demo) und passen Sie diesen an oder erstellen Sie von Grund auf Ihre eigene Demo.

#### Experimentieren Sie auf einer aufgesetzten Website mit Endbenutzern

1. Aktivieren Sie das API für Endbenutzer, indem Sie sich für eine [Origin-Trial](/blog/origin-trials/) registrieren, falls verfügbar. Eine Origin-Trial gibt Ihnen Zugriff auf eine experimentelle Funktion, um diese für eine begrenzte Zeit ausprobieren zu können. Beachten Sie, dass [Drittanbieter-Origin-Trials](/blog/third-party-origin-trials/) es Dritten wie Werbeanbietern und Werbeanalysediensten ermöglichen, ein API über mehrere Websites zu testen. **Um die derzeit verfügbaren Origin-Trials für dieses API anzuzeigen, navigieren Sie zu [Status](#status)**. Um über zukünftige Origin-Trials informiert zu werden, tragen Sie sich in die [Attributionsberichterstellung-Mailingliste für Entwickler ein](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).

2. Integrieren Sie das API in Ihre Websites und Systeme.

{% Aside %}<br> Wenn Sie Fragen zur Implementierung haben, tragen Sie sich in die [Attributionsberichterstattung-Mailingliste für Entwickler ein](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) und fragen Sie nach.

Wenn Sie allgemeine technische Fragen bezüglich Ihres Anwendungsfalls haben, sollten Sie eine Issue im [Privacy-Sandbox-Entwicklersupport-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) öffnen.<br> {% endAside %}

## Demo

Es stehen Ihnen einige Demos zum Ausprobieren zur Verfügung.

- Berichte auf Ereignisebene (nur Klicks betreffend):

    - [Live-Demo](https://goo.gle/sppi-devrel-eventlevel).
    - [Quellcode](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting) für diese Demo, den Sie nach Bedarf [forken und anpassen](https://github.com/GoogleChromeLabs/trust-safety-demo/tree/main/attribution-reporting#fork-and-customize) können.

## Anwendungsfälle und Funktionen

{% Aside %}

Dieses API befindet sich in stetiger Weiterentwicklung und wird sich im Laufe der Zeit je nach Feedback und Einflüssen des Software-Ökosystems weiterentwickeln.

Alle von diesem API unterstützten Funktionen sind Vorschläge. **Alle Vorschläge werden offen diskutiert und es kann Feedback für sie abgegeben werden**, auch für diejenigen, für die schon eine erste Browserimplementierung vollzogen wurde.

Dieses API wird in einem offenen Verfahren entwickelt. Ziehe in Erwägung, dich [an der Diskussion zu beteiligen](#participate).

{% endAside %}

Dieses API ermöglicht es Websites, Conversions in den folgenden Fällen zu messen:

- Bei **Anzeigenklicks** und **Anzeigenansichten**.
- Für Werbeanzeigen in einem **Drittanbieter-**iframe, z. B. bei Anzeigen eines Adtech-Drittanbieters auf einer Betreiberwebsite.
- Für Anzeigen in einem **Erstanbieter**-Kontext, wie zum Beispiel Anzeigen in einem sozialen Netzwerk, auf der Ergebnisseite einer Suchmaschine oder aber von einem Betreiber selbst geschalteten Anzeigen.

Ein flexibles **Attributionsmodell** wird unterstützt. Siehe Details unter [Status](#status).

Dieses API ermöglicht den Zugang zu unterschiedlichen Erkenntnissen über zwei Typen von Berichten, die an einen Werbetreibenden oder einen Adtech-Drittanbieter gesendet werden können. Diese beiden Berichtstypen können gleichzeitig genutzt werden, da sie sich ergänzen.

**Berichte auf Ereignisebene** verknüpfen einen Anzeigenklick oder eine Anzeigenansicht mit groben Conversion-Daten.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/8PZhfv4UXYxt2vTKRNI2.png", alt="Bericht auf Ereignisebene", width="400", height="180" %}<figcaption>Beispiel eines Berichts auf Ereignisebene: Klick-ID 200400600 auf <code>news.example</code> (angehängt an die Benutzer-ID „Bob_Doe“ auf <code>news.example</code>) hat zu einem Kauf auf <code>shop.example</code> geführt.</figcaption></figure>

Berichte auf Ereignisebene eignen sich für:

- Anwendungsfälle von **Optimierung**. Berichte auf Ereignisebene helfen bei der Beantwortung von Fragen wie *„Wie kann ich meine Return on Investment verbessern?“*. Sie können insbesondere zur Optimierung der Anzeigenplatzierung genutzt werden, da eindeutige IDs auf Anzeigenseite in den Berichten zur Verfügung gestellt werden können. Berichte auf Ereignisebene können Trainingsdaten für Machine-Learning-Modelle bereitstellen.
- Anwendungsfälle **grober Berichterstattung**, bei denen nur sehr wenige Informationen über die Conversion benötigt werden. Die aktuelle Begrenzung für Klicks liegt bei Conversion-Daten mit 3 Bits – das heißt, einer Conversion kann eine von acht Kategorien zugeordnet werden. Für Anzeigenansichten liegt die Begrenzung bei 1 Bit. Die Kodierung detaillierter Conversion-Daten, wie z. B. eines bestimmten Kaufpreises oder einer Conversion-Zeit, wird daher in Berichten auf Ereignisebene nicht unterstützt.
- Anwendungsfälle von **Betrugserkennung**. Die Daten in einigen Berichten können für die Erkennung und Analyse von Werbeanzeigenbetrug hilfreich sein, da Sie Muster erkennen, mit denen Spam oder ungültige Aktivitäten identifiziert werden können.

**Aggregierte Berichte** hingegen bieten detailliertere Conversion-Daten und mehr Flexibilität beim Zusammenführen von Klick-/Ansichtsdaten und Conversion-Daten.

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/TxgT3W5pNEZhWgDSYIY3.png", alt="aggregierter Bericht", width="400", height="180"%}<figcaption>Beispiel für Erkenntnisse aus aggregierten Berichten: Kampagne Nr. 1234567 auf <code>news.example</code> hat zu 518 Conversions auf <code>shoes.example</code> und zu Gesamtausgaben von 38174 $ geführt. Die Hälfte der Conversions stammte von Nutzern in NYC, USA.</figcaption></figure>

Aggregierte Berichte eignen sich am besten für die **Berichterstattung**. Sie helfen bei der Beantwortung von Fragen wie *„Wie hoch ist mein Return on Investment?“*.<br> Die Nutzung aggregierter Berichte für Anwendungsfälle von **Optimierung** – beispielsweise zum Optimieren eines Einkaufswerts, die von Berichten auf Ereignisebene nicht unterstützt wird, weil die Conversion-Daten zu grob sind – ist ein Bereich aktiver Forschung. Siehe [Offene Fragen](#open-questions).

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Warum werden zwei Berichttypen benötigt?<br> {% endDetailsSummary %}

Berichte auf Ereignisebene bieten nur grobe Conversion-Daten, um die Privatsphäre der Benutzer zu wahren.

Diese groben Daten reichen jedoch möglicherweise nicht aus, um die Effektivität von Kampagnen zu messen. Marketingspezialisten müssen möglicherweise weitere Details zu Conversions in Erfahrung bringen, z. B. den Einkaufswert, die vom Werbetreibenden aggregierten demografischen Daten konvertierter Benutzer, Kategorien gekaufter Produkte, Informationen zum Kundenstatus (Erstkunde oder wiederkehrender Kunde), Einkaufswageninhalte etc.

Aus diesem Grund wurden aggregierte Berichte entwickelt.
 {% endDetails %}

Andere in diesem API vorgeschlagene Funktionen sind [App-to-Web-Attribution](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md) (Ansehen oder Klicken einer Anzeige in einer App und konvertieren im Web) und [geräteübergreifende Attribution](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) (Ansehen oder Klicken einer Anzeige auf einem Mobilgerät und konvertieren auf dem Desktop-Computer).

{% Aside %}<br> In einer Zukunft ohne Drittanbieter-Cookies würde dieses API mit anderen datenschutzwahrenden Werbe-APIs kombiniert werden, um Ende-zu-Ende-Anwendungsfälle abdecken zu können:

- Remarketing: siehe [FLEDGE](/docs/privacy-sandbox/fledge/)
- Interessenbasierte Anzeigenauswahl: siehe [FLoC](/docs/privacy-sandbox/floc/)

{% endAside %}

## Status

**🕙 Letzte Aktualisierung: August 2021**

Status:

- `🤿 Wird ergründet`: Diese Idee befindet sich in einer frühen Diskussionsphase.
- `🥚 Vorschlag`: Ein erster Entwurf ist fertig und wird in einem öffentlichen Verfahren weiterentwickelt.
- `🏗️ In der Entwicklung (BROWSER_NAME)`: Die Funktion wird in BROWSER_NAME implementiert.
- `🧪 Experiment (BROWSER_NAME)`: Ein Experiment ist in BROWSER_NAME verfügbar. In Chrome wird ein Experiment als Origin-Trial bezeichnet.
- `🚀 Stable (BROWSER_NAME)` : Die Funktion wird standardmäßig in BROWSER_NAME ausgeliefert.

{% Aside %}<br> [Aktuelle Origin-Trial](/origintrials/#/view_trial/3411476717733150721) (Chrome-Experiment 🧪) {% endAside %}

{% Aside 'caution' %}<br> Es werden mehrere Origin-Trials (Experimente) durchgeführt. Jede Entwicklungsrunde wird verwendet, um das API basierend auf dem Feedback aus dem Software-Ökosystem zu verbessern und anzupassen. {% endAside %}

<table class="simple width-full fixed-table with-heading-tint">
<thead><tr>
    <th style="text-align: left;">Vorschlag</th>
    <th style="text-align: left;">Status</th>
</tr></thead>
<tbody>
    <tr>
    <td>Berichte auf Ereignisebene für Klicks<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md">Erläuterung</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Berichte auf Ereignisebene für Klicks<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md">Erläuterung</a>
</td>
    <td><code>🏗️ In Entwicklung (Chrome)</code></td>
    </tr>
    <tr>
    <td>Aggregierte Berichte für Klicks und Ansichten<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md">Erläuterungen</a>
</td>
    <td><code>🥚 Vorschlag</code></td>
    </tr>
    <tr>
    <td>Conversion Journey: geräteübergreifend<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md">Erläuterung</a>
</td>
    <td><code>🥚 Vorschlag</code></td>
    </tr>
    <tr>
    <td>Conversion Journey: App-to-Web<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md">Erläuterung</a>
</td>
    <td><code>🥚 Vorschlag</code></td>
    </tr>
    <tr>
    <td>Attributionsmodell: letzter Klick<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#multiple-sources-for-the-same-trigger-multi-touch">Erläuterung</a>
</td>
    <td><code>🧪 Experiment (Chrome)</code></td>
    </tr>
    <tr>
    <td>Attributionsmodell: prioritätsbasiert<br> <a href="https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#controlling-which-attribution-source-to-triggerd">Erläuterung</a>
</td>
    <td><code>🏗️ In Entwicklung (Chrome)</code></td>
    </tr>
    <tr>
    <td>Attributionsmodell: flexibel</td>
    <td><code>🤿 Wird ergründet</code></td>
    </tr>
</tbody>
</table>

{% Details %}
 {% DetailsSummary 'h3' %}
 Über Attributionsmodelle
 {% endDetailsSummary %}

Beim prioritätsbasierten Modell kann der Browser jeder Attributionsquelle eine Priorität zuordnen. Dies kann genutzt werden, um:

- Zu entscheiden, ob ein Klick oder eine Ansicht die wahrscheinlichste Ursache für die Conversion war (ein Klick wird normalerweise als klareres Signal des Nutzerinteresses angesehen).
- Ein **First-Touch**-**Attributionsmodell** festzulegen, indem Sie `attributionsourcepriority` relativ zur Zeit einstellen.
- Legen Sie ein (pro­ba­bi­lis­tisches) **lineares Attributionsmodell** fest, indem Sie die Priorität einheitlich als zufällig einstellen.

In Zukunft könnten auch andere Attributionsmodelle unterstützt werden. In aggregierten Berichten würde das [Worklet-basierte Schema](https://github.com/WICG/conversion-measurement-api/blob/main/AGGREGATE.md#attribution-trigger-registration) möglicherweise flexiblere Attributionsoptionen ermöglichen (einschließlich der Angabe zur teilweisen Anerkennung mehrerer vorheriger Attributionsquellen).

{% endDetails %}

## Browser-Unterstützung

- Firefox und Edge [haben keine Signale geteilt](https://chromestatus.com/feature/6412002824028160).
- Von Safari/Webkit ist es [negativ](https://chromestatus.com/feature/6412002824028160) und ein anderes API zur Messung von Anzeigenconversions mit der Bezeichnung [Private Click Measurement](https://developer.apple.com/videos/play/wwdc2021/10033/) wurde vorgeschlagen.

Obwohl sich die beiden APIs unterscheiden, arbeiten Chrome und WebKit in einem offen Verfahren zusammen, um die Entwicklungserfahrung zu vereinfachen, indem sie beispielsweise die Attributnamen und die [JSON-Struktur von Berichten](https://github.com/privacycg/private-click-measurement/issues/30) aneinander anpassen.

{% Details %}<br> {% DetailsSummary 'h3' %}<br> Unterschiede zwischen dem von Chrome vorgeschlagenen API und dem von WebKit vorgeschlagenen API<br> {% endDetailsSummary %}<br> Der Funktionsumfang des von Chrome vorgeschlagenen Attribution Reporting APIs unterscheidet sich von dem des Private Click Measurement APIs von Safari/WebKit.<br> Besonders nennenswert ist, dass mit dem Attribution Reporting API von Chrome:

- View-through-Messung unterstützt wird.
- Berichte auf Ereignisebene bereitgestellt werden können.
- Sowohl Werbelinks in einem Erstanbieterkontext (wie Anzeigen in einem sozialen Netzwerk, auf einer Suchergebnisseite, oder aber von einem Betreiber selbst geschaltete Anzeigen) **als auch** Werbelinks in einem Drittanbieter-iframe (wie Anzeigen auf einer Betreiberwebsite, die Dienste von Adtech-Drittanbietern nutzt) unterstützt werden.
- Dritte wie Adtech-Plattformen Berichte im Namen von Betreibern und Werbetreibenden erhalten können.

{% endDetails %}

## Wie es funktioniert

### Berichte auf Ereignisebene

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/bdnt0qHKdPJJYzxU03Xm.png", alt="Bericht auf Ereignisebene", width="800", height="521" %}<figcaption> Berichte auf Ereignisebene werden wie folgt erstellt: Der Browser gleicht Klicks oder Anzeigenansichten („Attributionsquellereignisse“) mit Conversion-Daten („Attributionsauslöserdaten“) ab, die von einem Adtech-Anbieter definiert wurden. Später sendet der Browser die resultierenden Berichte mit etwas Verzögerung und beigefügtem Rauschen an einen vordefinierten Endpunkt.</figcaption></figure>

{% Details %}<br> {% DetailsSummary 'h3' %}<br> So funktioniert es im Detail: Berichte auf Ereignisebene<br> {% endDetailsSummary %}<br> Werbelinks können mit Attributen konfiguriert werden, die spezifisch für auf Anzeigen zurückzuführende Conversions sind:

- Benutzerdefinierte Daten, die vom Betreiber an einen Anzeigenklick (oder eine Anzeigenansicht) angehängt werden, z. B. eine Klick-ID oder Kampagnen-ID.
- Die Website, für die dank dieser Anzeige eine Conversion erwartet wird.
- Der Berichtsendpunkt, der über erfolgreiche Conversions benachrichtigt werden, also die Berichte erhalten soll.
- Der Stichtag, an dem für diese Anzeige keine Conversions mehr gezählt werden können.

Hinweis: Es ist auch möglich, eine Attributionsquelle für Navigationsaktionen zu registrieren, die durch [`window.open()`](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_clicks.md#registering-attribution-sources-for-windowopen-navigations) oder (Anzeigenansichten betreffend) über ein [JavaScript-API](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md#registering-attribution-sources-with-javascript) initiiert werden.

Wenn der Nutzer auf eine speziell konfigurierte Anzeige klickt oder sie ansieht, protokolliert der Browser auf dem lokalen Gerät des Nutzers dieses Ereignis zusammen mit den angegebenen Attributionskonfigurationsdaten.

Später besucht der Benutzer die Website des Werbetreibenden und führt eine Aktion aus, die der Werbetreibende oder sein Adtech-Anbieter als Conversion einordnet, z. B. einen Kauf. In diesem Fall löst der Werbetreibende oder Adtech-Anbieter eine Attribution aus: Er fordert den Browser auf, eine Conversion mit einem bestimmten `trigger-data`-Wert  zu protokollieren, woraufhin der Anzeigenklick (oder die Anzeigenansicht) sowie das Conversion-Ereignis vom Browser des Nutzers verknüpft werden.

Der Browser plant schließlich, dass ein Bericht an den auf der Anzeigenseite angegebenen Endpunkt gesendet wird. Dieser Bericht enthält:

- Benutzerdefinierte Daten auf der Anzeigenseite, die an den Anzeigenklick oder die Anzeigenansicht angehängt wurden, die zu dieser Conversion geführt hat.
- Conversion-seitige benutzerdefinierte Daten mit etwas Rauschen.

Wenn für einen bestimmten Anzeigenklick (oder eine bestimmte Anzeigenansicht) mehrere Conversions registriert werden, wird eine entsprechende Anzahl von Berichten zum Versand vorbereitet. Für Aneigenansichten kann nur ein Bericht gesendet werden und für Klicks bis zu drei Berichte.

Berichte werden vom Browser mit Verzögerung gesendet. Dies kann manchmal Tage oder erst Wochen nach einer Conversion sein.

{% endDetails %}

### Aggregierte Berichte

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/HAl0ppkoxoGCtttWDk2A.png", alt="ALT_TEXT_HERE", width="800", height="1140" %}<figcaption> Aggregierte Berichte werden wie folgt generiert: Der Browser gleicht detaillierte Klicks oder Anzeigenansichten („Attributionsquellereignisse“) mit detaillierten Conversion-Daten („Attributionsauslöserdaten“) ab, die von einem Adtech-Unternehmen definiert wurden. Vom Adtech-Unternehmen bereitgestellter Code wird in einem Worklet ausgeführt, um Daten zu definieren, die vom Browser zum Berechnen aggregierter Berichte verwendet werden. Für die private Erstellung von aggregierten Berichten für die Adtech-Anbieter sind Aggregationsdienste verantwortlich.</figcaption></figure>

{% Details %}
 {% DetailsSummary 'h3' %}
 So funktioniert es im Detail: aggregierte Berichte
 {% endDetailsSummary %}

Werbelinks können mit speziellen Attributen für auf Anzeigen zurückzuführende Conversions konfiguriert werden.

Wenn der Nutzer auf eine speziell konfigurierte Anzeige klickt oder sie ansieht, protokolliert der Browser auf dem lokalen Gerät des Nutzers dieses Ereignis zusammen mit den angegebenen Attributionskonfigurationsdaten.

Anschließend wird von Adtech-Unternehmen bereitgestellter Code innerhalb eines Worklets ausgeführt, um die bereitgestellten Informationen zu bestimmen, bei denen sich um eine Mischung von anzeigenseitigen und konvertierungsseitigen Daten handelt.

Diese Beiträge (Rohberichte) werden verschlüsselt an einen Adtech-Server gesendet und dann an Aggregationsdienste weitergegeben, die anschließend auf [private](#privacy) Weise aggregierte Berichte berechnen.

Beachten Sie, dass aggregierte Berichte nicht im gleichen Ausmaß verzögert werden wie Berichte auf Ereignisebene.

{% endDetails %}

## Datenschutz

### Überblick

Stellen wir uns eine Person namens Bob vor. Bob sieht während er die Nachrichten auf `news.com` liest eine Anzeige. Eine Woche später kauft Bob Schuhe auf `shoes.example`.

Heute würde diese Conversion von einem als **Cross-Site-Identifier** agierenden Drittanbieter-Cookie verfolgt werden. Mit Drittanbieter-Cookies kann ein Adtech-Unternehmen auf diverse Details zu Bobs Aktivitäten auf `news.example` **und** `shoes.example` zugreifen und diese Informationen zusammenführen, um ein detailliertes Profil von Bob zu erstellen. Ein Adtech-Unternehmen kann am Ende Bobs Standort, Surfgewohnheiten und Lieblingsinhalte auf `news.com`⏤**sowie** Einkäufe, Aktivitäten und Kreditkarteninformationen auf `shoes.com` kennen. Diese websiteübergreifende Verknüpfung ist nützlich, um mit Werbung in Zusammenhang stehende Conversions zu messen. Es stellt jedoch einen Einschnitt in die Privatsphäre der Benutzer dar: Bobs Aktivitäten werden auf allen Websites mit einem hohen Detailgrad nachverfolgt.

Auf der anderen Seite ermöglicht das Attribution Reporting API es Werbeunternehmen jedoch, Einblicke in Konversionen zu gewinnen, **ohne die Aktivitäten einer Person über Websites hinweg zu verfolgen**. Eine kleine Menge an Informationen wird auf allen Websites zusammengeführt – genug, um Konversionen zu messen, aber nicht genug, um Bobs Aktivitäten über alle Sites hinweg im Detail zu verfolgen. Informationen zu Bobs Aktivitäten auf `news.example` und `shoes.example` bleiben voneinander getrennt.

{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/aurePszyAGz9Osu3G0XN.jpg", alt="Diagramm: Seite-an-Seite-Darstellung des heutigen Webs (verbundene Identität) und des zukünftigen Webs (partitionierte Identität)", width="800", height= "314" %}

### Im Detail

<figure>{% Img src="image/O2RNUyVSLubjvENAT3e7JSdqSOx1/UMXwDWt4RSo98PTS0Wvd.png", alt="ALT_TEXT_HERE", width="800", height="1237" %}<figcaption> Im Gegensatz zu Drittanbieter-Cookies kann das Attribution Reporting API auch ohne der Nutzung von Cross-Site-Identifiern Erkenntnisse liefern, um die Identitätspartitionierung zwischen Websites zu bewahren.<br> Berichte auf Ereignisebene verknüpfen anzeigenseitige Kennungen lediglich mit einer kleinen Menge Conversion-seitiger Daten. Sie stellen also websiteübergreifende Informationen zu einer Conversion bereit, die Conversion-seitigen Informationen sind jedoch zu grob, um die Nutzeridentität über Websites hinweg verknüpfen zu können.<br> Aggregierte Berichte bieten detaillierte Einblicke, allerdings nur auf aggregierter Ebene. Dank Techniken der differentiellen Privatsphäre, privater Berechnungen und Kryptografie können aggregierte Berichte nicht genutzt werden, um die Aktivitäten eines einzelnen Benutzers über Websites hinweg zu verfolgen.<br> Sowohl für die Berichte auf Ereignisebene als auch für die aggregierten Berichte gelten zusätzliche Datenschutzmaßnahmen wie z. B. Ratenbeschränkungen.</figcaption></figure>

{% Details %}
 {% DetailsSummary 'h3' %}
 Im Detail: Berichte auf Ereignisebene und Datenschutz {% endDetailsSummary %}

Berichte auf Ereignisebene bieten Einblicke in Conversions, ohne Benutzer dabei über Websites hinweg zu verfolgen, indem sie die folgenden Datenschutzmechanismen befolgen:

- Es werden keine Cross-Site-Identifier verwendet und keine detaillierten Informationen zur Cross-Site-Browsing-Aktivität verlassen das Gerät. Berichte auf Ereignisebene verknüpfen 64-Bit-Informationen auf der Anzeigenseite (`news.example`) mit lediglich 1 oder 3 Bit auf der Conversion-Seite (`shop.example`). 64 Bit **bieten genug Platz, um eine individuelle Benutzerkennung abbilden zu können, diese 64 Bit können jedoch lediglich mit einer geringen Anzahl an Cross-Site-Informationen verknüpft werden:** nämlich 1 oder 3 Bit, die nicht ausreichen, um eine Kennung zu enthalten. Hinweis: Bei 64 Bit auf Anzeigenseite handelt es sich um keine Neuerung. Auf der Anzeigenseite kann bereits heute eine Benutzer-ID vorhanden sein. `news.example` oder `adtech.example` wissen bereits über die Aktivität eines bestimmten Benutzers auf `news.example` Bescheid.

- Es werden zusätzliche Schutzmaßnahmen angewendet, um Missbrauch und Cross-Site-Tracking zu verhindern:

    - Die Berichte werden mit **Verzögerung** gesendet.
    - Die Conversion-Daten sind **verrauscht**: In einer bestimmten Anzahl der Fälle (5 % der Fälle in Chrome) werden die echten Conversion-Daten durch einen zufälligen Wert ersetzt.
    - Die Anzahl der zugeordneten Conversion-Berichte ist pro Klick oder Ansicht begrenzt.

{% Aside %}<br> Es ist möglich, die tatsächliche Conversion-Anzahl auf datenschutzfreundliche Weise wiederherzustellen. Siehe [Beispielskript](https://github.com/WICG/conversion-measurement-api/blob/main/noise_corrector.py). {% endAside %}

{% endDetails %}

{% Details %}
 {% DetailsSummary 'h3' %}
 Im Detail: aggregierte Berichte und Datenschutz {% endDetailsSummary %}

Aggregierte Berichte verknüpfen ein detailliertes Klick- oder Ansichtereignis mit detaillierten Conversion-Daten. Diese Einblicke in Conversions können sie allerdings erhalten, ohne Benutzer über Websites hinweg zu verfolgen, indem sie die folgenden Datenschutzmechanismen nutzen:

- Es werden keine Cross-Site-Identifier verwendet.

- Jede Attribution kann mehrere Beiträge zu einem resultierenden aggregierten Bericht leisten und ein bestimmter Nutzer kann mehrere Attributionen für einen bestimmten Klick (oder eine bestimmte Anzeigenansicht) und eine bestimmte Conversion auslösen. Die Beiträge, die jeder Benutzer in einem bestimmten Zeitfenster leisten kann, sind jedoch begrenzt.

- Die Daten werden auf eine Ebene vieler Ereignisse (viele Benutzer) aggregiert und es können keine einzelnen Ereignisse genau beobachtet werden. [Differentielle Privatsphäre](https://en.wikipedia.org/wiki/Differential_privacy) wird hergestellt, um zu verhindern, dass mit den Ausgabedaten die Benutzeridentität über Websites hinweg verknüpft werden kann, denn beim Analysieren der aggregierten Daten nimmt mit zunehmender Detailstufe auch das relative Rauschen dieser Daten zu. Dies führt zu einem größeren relativen Fehler und stellt sicher, dass keine einzelnen Ereignisse (oder Benutzer) genau beobachtet werden können. Außerdem sind Datenausschnitte, die viele Ereignisse und Benutzer zusammenfassen, genauer, und bewahren die Nützlichkeit.

- Die Rohberichte, die ein detailliertes Klick- oder Ansichtsereignis mit detaillierten Conversion-Daten verknüpfen, sind verschlüsselt und können vom Adtech-Unternehmen nicht gelesen werden. Über einen vertrauenswürdigen Server werden aus diesen Berichten dann auf private Weise aggregierte Daten berechnet. Es werden verschiedene Berechnungsmöglichkeiten für diese Aufgabe in Betracht gezogen:

    - Sichere Mehrparteienberechnung (MPC). Vertrauen wird auf mehrere Server verteilt. Jeder Server erhält ein Stück der Daten, das für sich allein genommen bedeutungslos ist. Nachdem jeder Helfer seine Berechnungen durchgeführt hat, werden die von diesem Helfer ausgegebenen Daten zu einem sinnvollen Ganzen kombiniert.
    - Einzelserver-Berechnung. Ein Hilfsserver berechnet die Ausgabedaten. Diese Option ist weniger sicher und weniger privat. Sie ist jedoch einfacher zu realisieren, was bedeutet, dass es mehr verschiedenen Akteuren des Software-Ökosystems ermöglichen kann, mit diesem API zu experimentieren und Feedback zu geben. **Diese Option ist nicht als langfristige Lösung gedacht**. Sie wird mit ausreichender Vorankündigung und Migrationszeit zugunsten sicherer Alternativen wie MPC oder sicherer Einzelserver ausgemustert, sobald das Feedback der Entwicklergemeinschaft berücksichtigt und integriert wurde und dieses API reif genug ist.
    - Sichere Einzelserver-Berechnung. Ein einzelner Server, der jedoch vertrauliche Berechnungseigenschaften bietet, die MPC ähnlich (aber nicht gleichwertig) sind.
    - Langfristig sollten Server Daten ausschließlich unter Nutzung sicherer Mehrparteienberechnung verarbeiten (sicherer Einzelserver oder sicherer Mehrparteienbetrieb).

- Es werden zusätzliche Schutzmaßnahmen angewendet, um Missbrauch und Cross-Site-Tracking zu verhindern:

    - Berichte werden mit zufällig gewählten Verzögerungen gesendet.
    - Die Datenrate für Anfragen zu verschiedenen Datenausschnitten ist begrenzt.

{% endDetails %}

## Sites und Benutzerkontrolle

- Nutzer können die Funktion über die Nutzereinstellungen unter `chrome://settings/privacySandbox`.
- Standardmäßig ist die Funktion im Kontext der obersten Websiteebene aktiviert. Beliebige Drittanbieter können das API jedoch nicht einfach ohne Wissen des Betreibers verwenden, da das Attribution Reporting API in untergeordneten iframes über eine [Berechtigungsrichtlinie](https://developer.mozilla.org/docs/Web/HTTP/Headers/Feature-Policy) aktiviert werden muss.

## Offene Fragen

Eine Reihe von Fragen sind weiterhin offen und werden in dem transparenten Entwicklungsverfahren des APIs angegangen. Sie werden ermutigt, an diesen Diskussionen [teilzunehmen](#participate). Insbesondere zu den Fragestellungen:

- Was ist die richtige Menge an Rauschen, um die Privatsphäre zu schützen und gleichzeitig die Nützlichkeit zu wahren?
- Wie unterstützt man benutzerdefinierte Attributionsmodelle?
- Wie kann man das Verfahren für Conversion-seitige Daten optimieren, die einen hohen Detaillierungsgrad aufweisen, z. B. für einen Einkaufswert?
- Was gilt als ein vertrauenswürdiger Server? Eine Lösung, die derzeit geprüft wird, ist die Durchführung regelmäßiger Open-Source-Audits. [Beteiligen Sie sich an der Diskussion](https://github.com/WICG/conversion-measurement-api/issues/116).
- Wie kann man mehr Flexibilität bei der Berichterstattung ermöglichen, und beispielsweise die Delegierung an mehrere Berichterstattungsendpunkte unterstützen? [Beteiligen Sie sich an der Diskussion](https://github.com/WICG/conversion-measurement-api/issues/96).
- Wie kann Betrug verhindert werden? Ist dies beispielsweise durch Authentifizierung mit anonymen Zugangsdaten umsetzbar? [Beteiligen Sie sich an der Diskussion](https://github.com/WICG/conversion-measurement-api/labels/anti-fraud%20%2F%20auth).
- Wenn Sie daran denken sollten, dieses API für Anwendungsfälle außerhalb des Werbebereichs zu verwenden: Was fehlt ihm? Wie könnte das API verbessert werden? [Eröffnen Sie eine Issue](https://github.com/WICG/conversion-measurement-api/issues)
- Wie können Implementierer die Datenschutzeinstellungen anpassen? [Beteiligen Sie sich an der Diskussion](https://github.com/WICG/conversion-measurement-api/issues/99).

{% Aside %}<br> Dieses API kombiniert mehrere Datenschutztechniken, um **Datenschutz und Nützlichkeit** zu bieten. Dies bedeutet, dass die Datenbeschränkung von 3 Bit (bzw. 1 Bit für Ansichten) und andere von dem API verwendete Datenschutzmechanismen, beabsichtigt und ein Mittel zum Zweck sind. Sie sind regelmäßigen Änderungen unterworfen. Sobald sich für Adtech-Unternehmen neue Möglichkeiten aufzeigen, nützlichere Daten für ihre Anwendungsfälle zu erhalten und gleichzeitig starke Datenschutzgarantien erreichen zu können, wird sich dieses API entsprechend weiterentwickeln. {% endAside %}
