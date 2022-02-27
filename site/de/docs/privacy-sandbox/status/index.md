---
layout: layouts/doc-post.njk
title: Ist es schon fertig?
subhead: Implementierungsstatus des Privacy-Sandbox-APIs.
description: Implementierungsstatus des Privacy-Sandbox-APIs. Zuletzt aktualisiert am 18.05.2021.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} Für jedes API kann es mehrere separate Origin-Trial-Zeiträume geben. {% endAside %}

## Attributionsberichterstattung

*Früher bekannt als Conversion-Messung.*

- [Aktuelle Origin-Trial](https://web.dev/origin-trials/): seit Chrome 86, [jetzt ausgeweitet](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) bis auf Chrome 93.
- [Registrieren Sie sich für die Origin-Trial](/origintrials/#/view_trial/3411476717733150721).
- [Demo](https://goo.gle/demo-event-level-conversion-measurement-api).
- [Chrome-Plattformstatus](https://www.chromestatus.com/features/6412002824028160).
- [Blink-Status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement).
- [GitHub](https://github.com/WICG/conversion-measurement-api/): siehe [Probleme](https://github.com/WICG/conversion-measurement-api/issues) für Fragen und Diskussionen zum API

### Status: Details

Siehe [Status](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### Alle Ressourcen

- [Attributionsberichte (Konversionsmessung)](/docs/privacy-sandbox/attribution-reporting)
- [Einführung in Attributionsberichte (Konversionsmessung)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Technische API-Erklärer](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ veraltet) [Eine datenschutzfreundlichere Methode zur Messung von Werbekonversionen](https://web.dev/conversion-measurement/): Überblick über die erste Iteration dieses APIs für Webentwickler
- (⚠️ veraltet) [Eine datenschutzfreundlichere Methode zur Messung von Werbekonversionen – Video](https://www.youtube.com/watch?v=jcDfOoWwZcM): Demo der ersten Iteration dieses APIs (nur Klicks)
- (⚠️ veraltet) [Verwenden des Event Conversion Measurement APIs](https://web.dev/using-conversion-measurement/): Wie experimentiert man mit der ersten Iteration dieses APIs für Webentwickler
- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)

## Vertrauenstoken (Trust Tokens)

- [Aktuelle Origin-Trial](https://web.dev/origin-trials/): seit Chrome 84, [jetzt ausgeweitet](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) bis auf Chrome 94.
- [Registrieren Sie sich für die Origin-Trial](/origintrials/#/view_trial/2479231594867458049).
- [Demo](https://trust-token-demo.glitch.me/).
- [Chrome-Plattformstatus](https://www.chromestatus.com/feature/5078049450098688).
- [Blink-Status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens).
- [GitHub](https://github.com/WICG/trust-token-api): siehe [Issues](https://github.com/WICG/trust-token-api/issues) für Fragen und Diskussionen zum API
- [Chrome-Entwicklertools-Integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- Erfahren Sie mehr: [Erste Schritte mit Vertrauenstoken](https://web.dev/trust-tokens/)

## Erstanbieter-Sets

- [Aktuelle Origin-Trial](https://web.dev/origin-trials/): Chrome 89 bis 93.
- [Registrieren Sie sich für die Origin-Trial](/origintrials/#/view_trial/988540118207823873).
- [Chrome-Plattformstatus](https://chromestatus.com/feature/5640066519007232).
- [Blink-Status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets).
- [GitHub](https://github.com/privacycg/first-party-sets): siehe [Issues](hhttps://github.com/privacycg/first-party-sets/issues) für Fragen und Diskussionen zum API
- Weitere Informationen: [The Chromium Projects: Erstanbieter-Sets](https://www.chromium.org/updates/first-party-sets).

## FLoC

- Die jetzt bereits abgeschlossene ursprüngliche [Origin-Trial](https://web.dev/origin-trials). Updates finden Sie unter [Experimentierabsicht.](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs)
- [Demo](https://floc.glitch.me/) der Erstversion (Origin-Trial jetzt geschlossen).
- [Blink-Status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- [Der API-Vorschlag](https://github.com/WICG/floc) wird derzeit von der [WICG](https://www.w3.org/community/wicg/) und Interessengruppen erörtert.
- [GitHub](https://github.com/WICG/floc): siehe [Issues](https://github.com/WICG/floc/issues) für Fragen und Diskussionen zum API
- [Chrome-Plattformstatus](https://www.chromestatus.com/features/5710139774468096).
- Erfahren Sie mehr: [Was ist FLoC?](https://web.dev/floc/)

## FLEDGE

Nachfolger von [TURTLEDOVE](https://github.com/WICG/turtledove).

- [Absicht zum Prototyping](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [Blink-Status](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge).
- Der [API-Vorschlag](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) wird derzeit von der [WICG](https://www.w3.org/community/wicg/) und Interessengruppen erörtert.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): siehe [TURTLEDOVE Issues](https://github.com/WICG/turtledove/issues) für Fragen und Diskussionen zum API.

<br>

---

## Erfahren Sie mehr

### Blink, Chromium und Chrome

- [Chrome-Veröffentlichungszeitplan](https://www.chromestatus.com/features/schedule)
- [Prozess zum Veröffentlichen neuer Funktionen in Chromium](https://www.chromium.org/blink/launching-features)
- [Erklärungsabsicht: Entmystifizierungs Blinks Auslieferungsprozesses](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): Implementierungsstatus und Diskussion der Funktionen in Blink, des von Chromium verwendeten Rendering-Engines.
- [Chromium-Code-Suche](https://source.chromium.org/).

### Origin-Trials

- [Erste Schritte für Origin-Trials mit Chrome](https://web.dev/origin-trials/)
- [Was sind von Dritten durchgeführte Origin-Trials?](https://web.dev/third-party-origin-trials)
- [Fehlerbehebung bei mit Chrome durchgeführten Origin-Trials](/blog/origin-trial-troubleshooting/)
- [Origin-Trial-Ratgeber für Webentwickler](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Erläuterung zu Origin-Trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Durchführen einer Origin-Trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
