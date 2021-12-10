---
layout: layouts/doc-post.njk
title: Privacy-Sandbox-Glossar
subhead: Die Artikel und Dokumentation zur Privacy-Sandbox setzen Kenntnisse bestimmter Konzepte in den Bereichen Datenschutz, Werbung und Webentwicklung voraus. Dieses Glossar erklärt wichtige Begriffe.
description: Einfache Erklärungen der wichtigsten Konzepte.
date: 2021-05-18
updated: 2021-05-18
authors:
  - samdutton
---

{% Aside %} [Lassen Sie uns wissen,](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=) wenn etwas fehlt! {% endAside %}

## Werbeplattform (Adtech) {: #adtech }

Ein Unternehmen, das Dienste zur Bereitstellung von Werbeanzeigen anbietet.

## Werbetreibender {: #advertiser }

Ein Unternehmen, das dafür bezahlt, seine Produkte zu bewerben.

## Attribution {: #attribution }

Identifizierung von Benutzeraktionen, die zu einem Ergebnis beitragen. Beispiel: Korrelation von Anzeigenklicks oder Aufrufen mit [Conversions](#conversion).

## Blink {: #blink }

Die von Chrome verwendete [Rendering-Engine](https://en.wikipedia.org/wiki/Browser_engine), die im Rahmen des [Chromium](#chromium)-Projekts entwickelt wurde.

## Chromium {: #chromium}

Ein Open-Source-Webbrowser-Projekt. Chrome, Microsoft Edge, Opera und andere Browser basieren auf Chromium.

## Klickrate (CTR) {: #ctr }

Der Anteil der Nutzer, die auf eine Anzeige klicken, nachdem sie sie gesehen haben. (Siehe auch [Impression](#impression) .)

## Click-through-Conversion (CTC) {: #ctc }

Eine Conversion, die einer Anzeige zugeordnet wurde, auf die „geklickt“ wurde.

## Conversion

Das Erreichen eines gewünschten Ziels nach einer Aktion eines Benutzers. Zum Beispiel der Kauf eines Produkts oder die Anmeldung für einen Newsletter, nachdem der Benutzer auf eine Anzeige geklickt hat, die auf die Website des Werbetreibenden verweist.

## Cookie

Eine Website kann einen Webbrowser auffordern, eine kleine Textdatei (ein sogenanntes Cookie) auf dem Computer eines Benutzers zu speichern. Cookies können von einer Website verwendet werden, um Daten (oder Verweise auf Daten, die auf den Backend-Servern der Website gespeichert sind) über einen Benutzer zu speichern, während sich dieser im Internet bewegt. Beispiel: Ein Online-Shop kann Einkaufswagendetails abspeichern, auch wenn ein Benutzer nicht angemeldet ist, oder die Website könnte die Surfaktivitäten des Benutzers auf ihrer Website aufzeichnen. Siehe [Erstanbieter-Cookie](#first-party-cookie) und [Drittanbieter-Cookie](#third-party-cookie).

## Differentielle Privatsphäre {: #differential-privacy }

Techniken, die mit dem Ziel des Aufdeckens von Verhaltensmustern den Austausch von Informationen über einen Datensatz ermöglichen, ohne dabei private Informationen über Einzelpersonen oder die Tatsache ob sie überhaupt zum Datensatz gehören preiszugeben.

## Domain

Siehe [Top-Level-Domain](#tld) und [eTLD](#etld).

## eTLD, eTLD+1 {: #etld }

**Effektive Top-Level-Domains** werden durch die [öffentliche Suffixliste](https://publicsuffix.org/list/) definiert. Zum Beispiel:

```text
co.uk
github.io
glitch.me
```

Effektive TLDs machen foo.appspot.com zu einer anderen Site als bar.appspot.com. Die effektive Top-Level-Domain (**eTLD**) ist in diesem Fall appspot.com, und der gesamte **Site-**Name (foo.appspot.com, bar.appspot.com) wird als **eTLD+1 bezeichnet**.

Siehe auch [Top-Level-Domain](#tld).

## Entropie

Ein Maß dafür, wie sehr ein Datenelement die individuelle Identität preisgibt.

Die Datenentropie wird in Bits gemessen. Je mehr bestimmte Daten auf eine Identität schließen lassen, desto höher ist ihr Entropiewert.

Daten können kombiniert werden, um eine Person zu identifizieren, es kann jedoch schwierig sein herauszufinden, ob neue Daten die Entropie beeinflussen. Wenn Sie beispielsweise erfahren, dass eine Person aus Australien stammt, hat sich die Entropie damit nicht verringert, wenn Sie bereits wissen, dass die Person von Kangaroo Island stammt.

## Föderierte Identität (auch bekannt als föderierte Anmeldung)

Eine Drittanbieterplattform, die es einem Benutzer ermöglicht, sich bei einer Website anzumelden, ohne dass die Website einen eigenen Identitätsdienst implementieren muss.

## Fingerprinting {: #fingerprinting }

Techniken zur Identifizierung und Verfolgung des Verhaltens einzelner Benutzer. Das Fingerprinting greift auf Mechanismen zurück, die für Benutzer nicht erkenntlich sind und die sich nicht ihrer Kontrolle unterziehen. Websites wie [Panopticlick](https://panopticlick.eff.org) und [amiunique.org](https://amiunique.org/) demonstrieren, wie Fingerprinting-Daten kombiniert werden können, um Sie als Einzelperson zu identifizieren.

## Fingerprinting-Oberfläche {: #fingerprinting-surface }

Etwas, das (wahrscheinlich in Kombination mit anderen Oberflächen) verwendet werden kann, um einen bestimmten Benutzer oder ein bestimmtes Gerät zu identifizieren. Beispielsweise bieten die JavaScript-Methode `navigator.userAgent()` sowie der `User-Agent`-HTTP-Anfrageheader Oberflächen für Fingerprinting.

## Erstanbieter {: #first-party }

Ressourcen von der Website, die Sie gerade besuchen. Die Seite, die Sie gerade lesen, befindet sich beispielsweise auf der Site developer.chrome.com und enthält die von dieser Site angeforderte Ressourcen. Anfragen nach diesen Erstanbieter-Ressourcen werden als „Erstanbieteranfragen“ bezeichnet, und [Cookies](#cookie) von developer.chrome.com, die während Ihres Besuchs auf dieser Webseite gespeichert werden, werden [Erstanbieter-Cookies](#first-party-cookie) genannt. Siehe auch [Drittanbieter](#third-party).

## Erstanbieter-Cookie {: #first-party-cookie }

[Cookie](#cookie), das von einer Website gespeichert wird, während sich ein Benutzer auf ebendieser befindet. Beispiel: Ein Online-Shop kann einen Browser auffordern, ein Cookie zu speichern, um die Warenkorbdetails eines nicht eingeloggten Benutzers zu speichern. Siehe auch [Drittanbieter-Cookies](#third-party-cookie) .

## Impression {: #impression }

- Aufruf einer Anzeige. (Siehe auch [Klickrate](#ctr).)
- Eine Anzeigenfläche: ein leeres Rechteck auf einer Webseite, in dem eine Anzeige geschaltet werden kann. Anzeigenflächen gehören zum [Inventar](#inventory).

## Inventar {: #inventar}

Die auf Sites verfügbaren Anzeigenflächen: leere Rechtecke, in denen Anzeigen angezeigt werden können.

## k-Anonymität

Ein Maß für die Anonymität innerhalb eines Datensatzes. Wenn Sie einen Anonymitätsgrad von *k* aufweisen, können Sie nicht von den *k-1* anderen Personen im Datensatz unterschieden werden. Mit anderen Worten: Die Informationen von *k*-Personen stimmen in diesem Fall überein (Ihre eingeschlossen).

## Nonce

Willkürliche Zahl, die nur einmalig in der kryptografischen Kommunikation verwendet wird.

## Origin

Die Origin (der Ausgangspunkt) einer Anfrage, einschließlich Schema und Servername, jedoch ohne Pfadinformationen. Zum Beispiel: `https://developer.chrome.com`

## Origin-Trials {: #origin-trial}

Origin-Trials bieten Zugriff auf neue oder experimentelle Funktionen und machen es möglich bestimmte Funktionalität temporär für einige Benutzer bereitzustellen, bevor sie für alle verfügbar gemacht wird. Wenn Chrome eine Origin-Trial für eine Funktion anbietet, kann ein [Ausgangspunkt](#origin) (eine Origin) für die Trial registriert werden, um die Funktion für alle Benutzer dieses Ausgangspunktes zu aktivieren, ohne dass Benutzer Flags umschalten oder zu einem alternativen Chrome-Build wechseln müssen (obwohl sie möglicherweise upgraden müssen). Origin-Trials ermöglichen es Entwicklern, Demos und Prototypen mit neuen Funktionen zu erstellen. Diese Trials helfen den Chrome-Ingenieuren unter anderem zu verstehen, wie neue Funktionen verwendet werden und wie sie mit anderen Webtechnologien interagieren können. Weitere Informationen: [Erste Schritte mit den Origin-Trials von Chrome](https://web.dev/origin-trials/).

## Passive Oberfläche {: #passive-surface }

Einige Fingerprinting-Oberflächen, wie z. B. User-Agent-Strings, IP-Adressen und Accept-Language-Header, sind für jede Website verfügbar, unabhängig davon, ob diese danach fragen oder nicht. Das bedeutet, dass passive Oberflächen leicht das Datenschutzbudget einer Website verbrauchen können.

Die Privacy-Sandbox-Initiative schlägt vor, passive Oberflächen durch aktive Methoden zum Anfragen entsprechender Informationen zu ersetzen, beispielsweise die einmalige Verwendung von Client-Hinweisen (Client Hints) zur Abfrage der Benutzersprache, anstatt für alle Antworten an den Server einen Accept-Language-Header zu verwenden.

## Betreiber

Im Privacy-Sandbox-Kontext eine Website, die Werbung anzeigt.

## Reichweite

Die Gesamtzahl der Personen, die eine Anzeige sehen (oder die eine Webseite besuchen, auf der die Anzeige angezeigt wird).

## Remarketing

Das Erreichen von Personen, die Ihre Website zuvor besucht haben, auf anderen Websites. Ein Online-Shop könnte beispielsweise Anzeigen für einen Spielzeugverkauf für Personen schalten, die sich zuvor Spielzeug auf dessen Website angesehen haben.

## Site

Siehe [Top-Level-Domain](#tld) und [eTLD](#etld).

## Oberfläche

Siehe [Fingerprinting-Oberfläche](#fingerprinting-surface) und [passive Oberfläche](#passive-surface).

## Drittanbieter {: #third-party }

Ressourcen, die von einer Domain bereitgestellt werden, die sich von der von Ihnen besuchten Website unterscheidet. Beispielsweise kann eine Website foo.com Analysecode von google-analytics.com (per JavaScript), Schriftarten von use.typekit.net (über ein Link-Element) und ein Video von vimeo.com (in einem iframe) verwenden. Siehe auch [Erstanbieter](#first-party).

## Drittanbieter-Cookie {: #third-party-cookie}

[Cookie](#cookie), das von einem Drittanbieterdienst gespeichert wird. Beispielsweise kann eine Video-Website eine Schaltfläche für **„Später ansehen“** in ihrem eingebetteten Player enthalten, damit ein Benutzer seiner Wunschliste ein Video hinzufügen kann, ohne dass er gezwungen ist, direkt zur Video-Website zu navigieren. Siehe auch [Erstanbieter-Cookie](#first-party-cookie).

## Top-Level-Domain (TLD) {: #tld }

Top-Level-Domains wie .com und .org werden in der [Root-Zone-Datenbank](https://www.iana.org/domains/root/db) aufgelistet.

Beachten Sie, dass einige „Sites“ eigentlich nur Subdomains sind. Beispielsweise sind translate.google.com und maps.google.com nur Subdomains von google.com (das die [eTLD + 1](#etld) ist).

## .well-known

Es kann sinnvoll sein, Weiterleitungen zu einer Website über standardisierte URLs einzurichten. Passwort-Manager können es Benutzern beispielsweise erleichtern, Passwörter zu aktualisieren, wenn eine Webseite eine Weiterleitung von `/.well-known/change-password` auf die entsprechende Seite zum Ändern des Passworts bietet. Darüber hinaus kann es hilfreich sein, Richtlinien oder andere Informationen zu einem Host *vor* dem Senden einer Anfrage anzufordern. Beispielsweise teilt robots.txt Webcrawlern mit, welche Seiten sie besuchen und welche sie ignorieren sollen. IETF [RFC8615](https://tools.ietf.org/html/rfc8615) skizziert einen standardisierten Weg, um websiteweite Metadaten an Standardspeicherorten in einem „/.well-known/“-Unterverzeichnis zugänglich zu machen. Eine Liste dieser finden Sie unter [iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml).
