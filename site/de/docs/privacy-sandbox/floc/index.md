---
layout: layouts/doc-post.njk
title: FLoC
subhead: |2-

  Erlauben Sie Websites, Ihre Interessen zu erraten, ohne Sie eindeutig identifizieren zu können.
description: FLoC macht interessenbezogene Werbung auf eine Weise möglich, bei der die Privatsphäre geschützt wird. Während ein Benutzer sich im Internet bewegt, wird dessen Browser basierend auf dem Browserverlauf zusammen mit tausenden Weiteren Besuchern einer sogenannten „Interessenkohorte“ zugeordnet. Dies geschieht, ohne dass der individuelle Browserverlauf mit dem Browserhersteller oder irgendeiner anderen Stelle geteilt wird.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

## Implementierungsstatus

- Die ursprüngliche [Origin-Trial](https://web.dev/origin-trials) wurde bereits abgeschlossen.
- [Demo](https://floc.glitch.me/) der ersten Version (Origin-Trial wurde bereits geschlossen).
- [Experimentierabsicht](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs) in [Blink](https://www.chromium.org/blink).

## Warum brauchen wir FLoC?

Viele Menschen sorgen sich über die Auswirkungen maßgeschneiderter Werbung auf den Datenschutz. Diese Werbung basiert derzeit auf Techniken wie Tracking-Cookies und Geräte-Fingerprinting, die Ihren Browserverlauf über Websites hinweg an Werbetreibende oder Werbeplattformen weitergeben können. Der FLoC-Vorschlag zielt darauf ab, die Auswahl von Werbeanzeigen auf eine Weise zu treffen, die die Privatsphäre besser schützt.

## Worum handelt es sich bei dem FLoC-Vorschlag?

FLoC bietet einen Mechanismus zum Schutz der Privatsphäre für die interessenbasierte Auswahl von Werbeanzeigen und anderen Inhalten.

Wenn sich ein Benutzer im Internet bewegt, nutzt sein Browser den FLoC-Algorithmus, um seine zugehörige „Interessenkohorte“ zu ermitteln, zu der Tausende von Browsern mit einem ähnlichen aktuellen Browserverlauf gehören. Der Browser berechnet seine Kohorte regelmäßig auf dem Benutzergerät neu, ohne individuelle Browserdaten mit dem Browseranbieter oder anderen Personen zu teilen.

Werbetreibende (Websites, die für Werbung bezahlen) können Code auf ihren eigenen Websites einfügen, um Kohortendaten zu sammeln und sie den von ihnen genutzten Adtech-Plattformen (Unternehmen, die Software und Tools zur Bereitstellung von Werbung anbieten) bereitzustellen. Beispielsweise könnte eine Adtech-Plattform von einem Online-Schuhgeschäft erfahren, dass Browser der Kohorten 1101 und 1354 offenbar an der vom Shop angebotenen Wanderausrüstung interessiert sind. Von anderen Werbetreibenden könnte die Adtech-Plattform auch von anderen Interessen dieser Kohorten erfahren.

Anschließend kann die Werbeplattform diese Daten verwenden, um relevante Anzeigen auf einer von einem Browser aus dieser Kohorte besuchten Seite mit Werbeplätzen anzuzeigen, z. B. auf einer Nachrichtenwebsite.

## Wofür kann FLoC verwendet werden?

- Um Personen, deren Browser Teil einer Kohorte ist, welche die Website eines Werbetreibenden häufig besucht oder Interesse an relevanten Themen zeigt, Werbeanzeigen anzuzeigen.
- Verwenden Sie Machine-Learning-Modelle, um die Wahrscheinlichkeit einer Conversion eines Nutzers basierend auf seiner Kohorte vorherzusagen und damit das Gebotsverhalten bei Auktionen für Werbeanzeigen zu beeinflussen.
- Empfehlen Sie Benutzern Inhalte. Angenommen, eine Nachrichtenseite stellt fest, dass ihre Sport-Podcast-Seite bei Besuchern der Kohorten 1234 und 14159 besonders beliebt geworden ist. Sie können diese Inhalte nun anderen Besuchern dieser Kohorten empfehlen.

## Wie funktioniert FLoC?

„[Was ist FLoC?](https://web.dev/floc/#how-does-floc-work)“ bietet eine einfache Schritt-für-Schritt-Erklärung für die Funktionsweise von FLoC.

Das folgende Diagramm zeigt ein Beispiel für die verschiedenen Rollen bei der Auswahl und Bereitstellung einer relevanten Anzeige mittels FLoC.

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/oH6SuZegrVJMbkTsl9mq.png", alt="Diagramm, das Schritt für Schritt die verschiedenen beteiligten Rollen bei der Auswahl und Zustellung einer relevanten Anzeige mithilfe von FLoC zeigt: FLoC-Dienst, Browser, Werbetreibende, Betreiber (um Kohorten zu überwachen), Adtech, Betreiber (um Werbeanzeigen anzuzeigen)", width="800", height="359" %}

---

## Beteiligen Sie sich und geben Sie Feedback ab

- **GitHub**: Lesen Sie den [Vorschlag](https://github.com/WICG/floc), stellen Sie [Fragen und verfolgen Sie die Diskussion](https://github.com/WICG/floc/issues).
- **W3C**: Diskutieren Sie industrielle Anwendungsfälle in der [Arbeitsgruppe zur Verbesserung von Internetwerbung](https://www.w3.org/community/web-adv/participants).
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

- [Was ist FLoC?](https://www.web.dev)
- [Technische Erläuterung zum FLoC-API](https://github.com/WICG/floc)
- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)
