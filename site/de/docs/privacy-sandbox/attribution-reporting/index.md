---
layout: layouts/doc-post.njk
title: Attributionsberichterstattung
subhead: Messen Sie, wann eine Nutzeraktion (z. B. ein Klick oder die Ansicht einer Anzeige) zu einer Conversion führt, ohne dass Sie dabei Cross-Site-Identifier verwenden.
description: Das API zur Attributionsberichterstattung ermöglicht es, ohne Verwendung von Cross-Site-Identifiern zu messen, wann eine Nutzeraktion (z. B. ein Klick oder die Ansicht einer Anzeige) zu einer Conversion führt.
date: 2021-05-18
updated: 2021-09-10
authors:
  - maudn
  - samdutton
---

{% Aside 'caution' %} Das Attribution Reporting API war früher als „Conversion Measurement API“ bekannt. {% endAside %}

{% YouTube id='UGA74CIcom8' %}

## Implementierungsstatus

Siehe [Status](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

## Glossar

{% Aside %}

Sie können auch das vollständige [Privacy-Sandbox-Glossar](/docs/privacy-sandbox/glossary/) einsehen.

{% endAside %}

- **Adtech-Plattformen**: Unternehmen, die Software und Tools bereitstellen, die es Marken oder Agenturen ermöglichen, ihre digitale Werbung gezielt zu veröffentlichen und zu analysieren.
- **Werbetreibende**: Unternehmen, die für Werbung bezahlen.
- **Betreiber**: Unternehmen, die Anzeigen auf ihren Websites schalten.
- **Click-through-Conversion**: Conversion, die einem Anzeigenklick zugeordnet wird.
- **View-through-Conversion**: Conversion, die einer Anzeigenimpression zugeschrieben wird (wenn der Nutzer nicht mit der Anzeige interagiert, jedoch später konvertiert).

## Wer über dieses API Bescheid wissen sollte: Adtech-Plattformen, Werbetreibende und Betreiber

- Adtech-Plattformen wie [nachfrageseitige Plattformen](https://en.wikipedia.org/wiki/Demand-side_platform) (DSP) oder [Datenverwaltungsplattformen](https://en.wikipedia.org/wiki/Data_management_platform) (DMP) können dieses API verwenden, um Funktionen zu unterstützen, die derzeit auf Cookies von Drittanbietern angewiesen sind.
- Werbetreibende und Betreiber, die auf benutzerdefinierten Code für Werbung oder Conversion-Messung angewiesen sind, können dieses API verwenden, um bestehende Techniken zu ersetzen.
- Werbetreibende und Betreiber, die sich für die Conversion-Messung auf Adtech-Plattformen verlassen, müssen das API zwar nicht direkt nutzen, haben aber möglicherweise Interesse daran, es zu verstehen, wenn sie mit Adtech-Plattformen zusammenarbeiten, die diese API-Integration nutzen.

{% Aside %} Möglicherweise gibt es Anwendungsmöglichkeiten außerhalb des Werbekontexts. [Machen Sie mit](#engage) und teilen Sie Informationen dazu, wie Sie das API verwenden! {% endAside %}

## Warum wird dieses API benötigt? {: #why-is-this-api-needed }

Heutzutage wird bei Werbung für die Conversion-Messung häufig auf [Drittanbieter-Cookies](https://developer.mozilla.org/docs/Web/HTTP/Cookies#Third-party_cookies) gesetzt. Browser werden den Zugriff auf Drittanbieter-Cookies jedoch einschränken, da diese verwendet werden können, um Benutzer über Websites hinweg zu verfolgen und so ihre Privatsphäre beeinträchtigen. Dieses API ermöglicht solche Messungen auf datenschutzwahrende Weise ohne Cookies von Drittanbietern.

## Wie funktioniert das Attribution Reporting API und welche Funktionen bietet es?

{% Aside %} Dieses API wird in einem offenen Verfahren entwickelt. Es ist unterliegt ständigen Änderungen. Ihr Feedback ist dabei willkommen. Finden Sie heraus, [wie Sie daran mitwirken können](#engage). {% endAside %}

Das Attribution Reporting API ermöglicht die Messung zweier miteinander verknüpfter Ereignisse: einem Ereignis auf einer Betreiberwebsite (beispielsweise eine Anzeigenansicht oder ein Anzeigenklick) mit einer anschließenden Conversion auf einer Betreiberwebsite.

Dieses API unterstützt die Messung der Click-through-Conversion-Attribution (verfügbar in der ersten Implementierung dieses, sich derzeit in einer [Origin-Trial](https://web.dev/conversion-measurement/#browser-support) befindenden APIs) sowie die View-through-Attributionsmessung ([siehe öffentliche Erläuterung](https://github.com/WICG/conversion-measurement-api/blob/main/event_attribution_reporting_views.md)).

Das API bietet zwei Arten von Attributionsberichten, die sich für verschiedene Anwendungsfälle anbieten:

- **Berichte auf Ereignisebene** verknüpfen einen bestimmten Anzeigenklick oder eine bestimmte Anzeigenansicht (festgestellt auf der Betreiberseite) mit Conversion-seitigen Daten. Die Conversion-seitigen Daten sind sehr begrenzt und werden „verrauscht“ (was bedeutet, dass in einem kleinen Prozentsatz der Fälle zufällige Daten gesendet werden), um zu verhindern das Besucher über Websites hinweg identifizierbar werden und so die Privatsphäre der Benutzer zu schützen. Als zusätzlicher Datenschutz werden Berichte nicht sofort gesendet.
- **Zusammengefasste Berichte** (Aggregate reports) sind nicht an ein bestimmtes Ereignis auf der Anzeigenseite gebunden. Diese Berichte bieten umfangreichere und genauere Conversion-Daten als Berichte auf Ereignisebene. Eine Kombination von Datenschutztechniken aus den Bereichen Kryptografie, Vertrauensverteilung und differentielle Privatsphäre tragen dazu bei, das Risiko einer Identitätsverknüpfung über Websites hinweg zu verringern. Beide Berichtsarten können gleichzeitig genutzt werden. Sie ergänzen sich. Zu den weiteren in diesem API vorhandenen Funktionen gehören [geräteübergreifende Attributionsberichterstattung](https://github.com/WICG/conversion-measurement-api/blob/main/cross_device.md) und [App-to-Web-Attributionsberichterstattung](https://github.com/WICG/conversion-measurement-api/blob/main/app_to_web.md).

## Beteiligen Sie sich und geben Sie Feedback ab {: #engage }

- **Origin-Trial**: [Registrieren Sie sich für die erste Origin-Trial (nur Klick-Conversions)](/origintrials/#/view_trial/3411476717733150721) oder [sehen Sie sich die erste Demo an (nur Klick-Conversions)](https://goo.gle/demo-event-level-conversion-measurement-api).
- Tragen Sie sich in die [Mailingliste für Entwickler ein](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev), um bezüglich neuer Implementierungen und Funktionen dieses APIs, das in Chrome (Origin-Trial) zur Verfügung steht, auf dem Laufenden zu bleiben.
- **GitHub**: Lesen Sie den [Vorschlag](https://github.com/WICG/conversion-measurement-api/), [stellen Sie Fragen und verfolgen Sie die Diskussion](https://github.com/WICG/conversion-measurement-api/issues).
- **W3C**: Diskutieren Sie in der [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) industrielle Anwendungsfälle und treten Sie für Diskussionen rund um das WebKit/Safari-API der [Privacy Community Group](https://www.w3.org/community/privacycg/) bei.
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

- [Einführung in die Attributionsberichterstattung (Conversion-Messung)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Technische Erläuterungen zum API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ veraltet) [Eine datenschutzfreundlichere Methode zur Messung von Conversions, die auf Anzeigen zurückzuführen sind](https://web.dev/conversion-measurement/): Überblick über die erste Iteration dieses APIs für Webentwickler
- (⚠️ veraltet) [Eine datenschutzfreundlichere Methode zur Messung von auf Anzeigen zurückzuführender Conversions – Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): Demo der ersten Iteration dieses APIs (nur Klicks)
- (⚠️ veraltet) [Verwenden des Event Conversion Measurement APIs](https://web.dev/using-conversion-measurement/): Wie man mit der ersten Iteration dieses APIs für Webentwickler experimentieren kann
- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)
- Debuggen Sie das API mit den Chrome-Entwicklertools
