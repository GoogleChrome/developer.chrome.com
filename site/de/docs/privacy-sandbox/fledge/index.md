---
layout: layouts/doc-post.njk
title: FLEDGE
subhead: Eine Lösung für Remarketing-Anwendungsfälle, die so konzipiert wurde, dass sie nicht von Dritten dazu genutzt werden kann, das Surfverhalten der Benutzer über verschiedene Websites hinweg zu verfolgen.
description: FLEDGE ist eine Remarketing-Lösung, sie wurde jedoch so konzipiert, dass sie es Dritten nicht ermöglicht, das Surfverhalten von Benutzern über verschiedene Websites hinweg zu verfolgen. Das API ermöglicht vom Browser durchgeführte „Auktionen“ auf dem Gerät, um relevante Anzeigen auszuwählen, die von Websites bereitgestellt werden, die der Benutzer zuvor besucht hat.
date: 2021-05-18
updated: 2021-09-29
authors:
  - samdutton
---

{% Aside %} FLEDGE kann in aktuellen Versionen von Chrome und Chrome Canary getestet werden, wenn die folgenden Flags aktiviert werden:

`--enable-features=InterestGroupStorage,AdInterestGroupAPI,Fledge`

- Dies ist die sich in der Entwicklung befindende Version von FLEDGE für frühe Tests, daher sollte sie nicht als vollständig oder als beispielhaft für die endgültige Implementierung verstanden werden. Fortschritte und Status werden in den regelmäßigen WICG-Treffen besprochen. Das [Sitzungsprotokoll](https://github.com/WICG/turtledove/blob/main/meetings/2021-05-12-FLEDGE-call-minutes.md#agenda) der WICG-Telefonkonferenz vom 12.05.2021 enthält Details dazu, was in der aktuellen Implementierung unterstützt wird und was nicht.
- [Chromium mit Flags ausführen](https://www.chromium.org/developers/how-tos/run-chromium-with-flags) erklärt, wie Sie Flags setzen können, wenn Chrome und andere Chromium-basierte Browser über die Befehlszeile ausgeführt werden. {% endAside %}

{% YouTube id='HkvmYKqnytw' %}

## Implementierungsstatus

FLEDGE ist das erste in Chromium implementierte Experiment aus der Vorschlagsreihe der [TURTLEDOVE](https://github.com/WICG/turtledove)-Familie.

- Der [API-Vorschlag](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) wird derzeit von der [WICG](https://www.w3.org/community/wicg/) und entsprechenden Interessengruppen erörtert.
- [Prototyping-Absicht](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) in [Blink](https://www.chromium.org/blink).

## Warum brauchen wir FLEDGE?

Das Verstehen der Nutzerinteressen kann die Auswahl von Werbung ermöglichen, die relevanter ist als solche, die lediglich auf dem Website-Inhalt (Kontext-Targeting) oder auf Informationen basiert, die der Nutzer der Website, auf der die Werbung erscheint, bereitgestellt hat (Erstanbieterdaten-Targeting). Traditionell haben Werbeplattformen die Interessen von Nutzern kennengelernt, indem sie ihr Verhalten über verschiedene Websites hinweg nachverfolgt haben. Wir brauchen eine Möglichkeit, Nutzern relevante Anzeigen ohne solchem Cross-Site-Tracking zu präsentieren.

FLEDGE ist eine Remarketing-Lösung, sie wurde jedoch so konzipiert, dass sie es Dritten nicht ermöglichen kann, das Surfverhalten von Benutzern nachzuverfolgen. Das API ermöglicht vom Browser durchgeführte „Auktionen“ auf dem Gerät des Benutzers, um relevante auf vorher besuchten Websites basierende Anzeigen auszuwählen.

Mit FLEDGE:

- Speichert der Browser des Benutzers, und nicht der Werbetreibende oder die Werbetechnologie-Plattform, die vom Werbetreibenden definierten Interessengruppen ab, mit denen der Browser des Benutzers in Verbindung steht.
- Kombiniert der Browser des Benutzers Interessengruppendaten mit Daten von Anzeigenkäufern bzw. -anbietern und Geschäftslogik, um eine „Auktion“ zur Auswahl einer Anzeige durchzuführen. Diese Anzeigenauktion findet lokal auf dem Gerät des Nutzers statt, anstatt Daten an Dritte weiterzugeben.
- Können Anzeigen für eine Interessengruppe ausgewählt werden, ein Werbetreibender kann jedoch Interessengruppendaten nicht mit anderen Informationen über den Benutzer kombinieren, insbesondere nicht mit der Identität einer Person oder den von ihr besuchten Seiten. Ein Werbetreibender kann nicht in Erfahrung bringen, welche Seiten ein Nutzer sich auf der Website eines Betreibers ansieht.
- Websites und die von diesen Websites verwendeten Werbenetzwerke können nichts über die Werbeinteressen oder Interessengruppen ihrer Besucher in Erfahrung bringen – die Anzeigenauswahl erfolgt im Browser des Benutzers.

Mit anderen Worten, FLEDGE hält Ihre Interessen und Surfaktivitäten privat. Wenn Sie beispielsweise einen Online-Shop für Schuhe besuchen, ein Interesse an Laufschuhen zeigen und anschließend eine Nachrichten-Website besuchen, auf der Anzeigen geschaltet werden, dann erfährt der Werbetreibende (der Online-Shop) nicht, welche Seiten Sie auf der Nachrichten-Website aufrufen und der Betreiber (die Nachrichtenwebsite) erfährt nichts von Ihrem Interesse an Laufschuhen.

## Wie funktioniert FLEDGE?

Wenn ein Benutzer eine Website besucht, die für ihre Produkte oder Dienstleistungen werben möchte (einen Werbetreibenden), kann die Website den Browser des Benutzers bitten, den Benutzer für einen bestimmten Zeitraum (z. B. 30 Tage) mit bestimmten Interessengruppen zu verknüpfen.

Die Interessengruppe kann für die Website des Werbetreibenden eindeutig sein, sodass sie als Remarketing-Liste fungiert. Alternativ können mehrere Websites vereinbaren, Benutzer einer übereinstimmenden Interessengruppe zuzuordnen, beispielsweise wenn die Websites eine Partnerschaft eingehen oder zum selben Werbenetzwerk gehören. Der Browser des Nutzers ruft regelmäßig die für bestimmte Interessengruppen bestimmten Anzeigen ab. Zusammen mit diesen wird Code übertragen, der Anweisungen von Werbetreibenden dafür bereitstellt, wann eine mit einer dieser Interessengruppen verknüpfte Anzeige zum Bieten in einer geräteinternen Auktion in Frage kommt, beispielsweise nur für Inventar mit Anzeigen im oberen Seitenbereich. Wenn der Nutzer eine Betreiber-Site besucht, die so konfiguriert ist, dass sie mithilfe des FLEDGE-APIs Anzeigen entgegennimmt und Anzeigen aus einem Werbenetzwerk anzeigt, das auch von einer vorher besuchten Site eines Werbetreibenden genutzt wird, dann fordert der auf der Seite eingebundene Code des Werbenetzwerks den Browser zur Ausführung „Auktion“-Codes auf, um eine Anzeige auszuwählen. Die „gewinnende“ Anzeige wird anschließend angezeigt.

1. Eine Benutzerin besucht eine Seite auf einer Website, die für ihre Produkte werben möchte, beispielsweise ein Online-Shop.
2. Die Website des Werbetreibenden (oder die von ihr verwendete Werbetechnologie) fordert den Browser des Nutzers auf, einer „Interessengruppe“ für Werbung beizutreten, indem sie joinAdInterestGroup() aufruft, wobei Daten, einschließlich von für die Benutzerin (basierend auf ihrem Surfverhalten) relevanten Anzeigen, der Hostname der Werbeplattform sowie URLs zum Zugriff auf Auktionslogik und -signale.
3. Der Benutzer besucht eine Website, beispielsweise die eines Nachrichtenverlags, die Anzeigen anzeigt und so konfiguriert ist, Anzeigen zu akzeptieren, die mit FLEDGE ausgewählt wurden.
4. Der Browser der Nutzerin hält eine „Auktion“ ab, um eine Anzeige für bestimmtes Inventar (Werbeflächen) auszuwählen, das von FLEDGE ausgewählte Anzeigen entgegennehmen kann. Der „Verkäufer“ bei dieser Auktion kann dabei die Website selbst oder ein in ihrem Namen handelnder Dritter sein, beispielsweise eine angebotsseitige Plattform. Die „Käufer“ sind Dritte, die auf das Anzeigeninventar der Website bieten, wie z. B. nachfrageseitige Plattformen, die im Auftrag von Werbetreibenden handeln. Der Verkäufer in dieser Anzeigenauktion hat drei Aufgaben:<br> • Auszuwählen, welche Käufer teilnehmen können.<br> • Basierend auf den Preisen und anhand der Metadaten auszuwählen, welches Gebot am attraktivsten ist.<br> • Das Auktionsergebnis bekannt zu geben.<br>
5. Der Verkäufer initiiert die Anzeigenauktion durch Aufrufen von runAdAuction() mit Daten wie dem Hostnamen des Verkäufers, Signalen von Käufern und Verkäufer sowie einer URL für die Auktionsentscheidungslogik.
6. Die Auktion liefert Daten über die gewinnende Anzeige. Auf die Daten kann von der Betreiber-Site nicht zugegriffen werden, außer um die Anzeige in einem begrenzten Frame zu rendern.
7. Die Anzeige wird angezeigt.

---

## Beteiligen Sie sich und geben Sie Feedback ab

- **GitHub**: Lesen Sie den [Vorschlag](https://github.com/WICG/turtledove/blob/master/FLEDGE.md), stellen Sie [Fragen und verfolgen Sie die Diskussion](https://github.com/WICG/turtledove/issues).
- **W3C**: Diskutieren Sie industrielle Anwendungsfälle in der [Arbeitsgruppe zur Verbesserung von Internetwerbung](https://www.w3.org/community/web-adv/participants).
- **Entwickler-Support**: Stellen Sie im [Privacy-Sandbox-Entwickler-Support-Repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) Fragen und beteiligen Sie sich an Diskussionen.

## Erfahren Sie mehr

- [Technische Erläuterung FLEDGE-API](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)
- [Mehr über die Privacy Sandbox erfahren](https://web.dev/digging-into-the-privacy-sandbox)
