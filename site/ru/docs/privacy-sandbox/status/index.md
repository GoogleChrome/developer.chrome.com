---
layout: 'layouts/doc-post.njk'
title: Текущее состояние
subhead: Статус реализации API-интерфейсов Privacy Sandbox.
description: Статус реализации API-интерфейсов Privacy Sandbox. Последнее обновление—18.05.2021.
date: 2021-05-18
updated: 2021-08-18
authors:
  - samdutton
---

{% Aside 'caution' %} Для каждого API может быть несколько отдельных периодов испытаний Origin Trial. {% endAside %}

## Отчеты по атрибуции

*Старое название—«Измерение конверсии».*

- [Текущее испытание origin trial](https://web.dev/origin-trials/): с Chrome 86 [теперь расширено](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev/c/ZKf9T8sRqAM) до Chrome 93.
- [Регистрация для участия в испытании Origin Trial](/origintrials/#/view_trial/3411476717733150721).
- [Демонстрация](https://goo.gle/demo-event-level-conversion-measurement-api).
- [Статус платформы Chrome](https://www.chromestatus.com/features/6412002824028160).
- [Статус Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=conversion%20measurement).
- [GitHub](https://github.com/WICG/conversion-measurement-api/): задавайте вопросы и участвуйте в обсуждении API в разделе [Issues](https://github.com/WICG/conversion-measurement-api/issues).

### Статус: подробности

См. раздел [Статус](/docs/privacy-sandbox/attribution-reporting-introduction/#status).

### Все ресурсы

- [Отчеты по атрибуции (измерение конверсии)](/docs/privacy-sandbox/attribution-reporting)
- [Введение в отчеты по атрибуции (измерение конверсии)](/docs/privacy-sandbox/attribution-reporting-introduction)
- [Технические описания API](https://github.com/WICG/conversion-measurement-api/)
- (⚠️ устарело) [Более конфиденциальный способ измерения конверсии рекламы](https://web.dev/conversion-measurement/): обзор первой версии этого API для веб-разработчиков
- (⚠️ устарело) [Более конфиденциальный способ измерения конверсии рекламы-видео](https://www.youtube.com/watch?v=jcDfOoWwZcM): демонстрация первой версии этого API для веб-разработчиков (только клики)
- (⚠️ устарело) [Использование Event Conversion Measurement API](https://web.dev/using-conversion-measurement/): как экспериментировать с первой версией этого API для веб-разработчиков
- [Погружение в Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)

## Токены доверия

- [Текущее испытание origin trial](https://web.dev/origin-trials/): с Chrome 84 [теперь расширено](https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/Jfh5-ZWpAQAJ) до Chrome 94.
- [Регистрация для участия в испытании Origin Trial](/origintrials/#/view_trial/2479231594867458049).
- [Демонстрация](https://trust-token-demo.glitch.me/).
- [Статус платформы Chrome](https://www.chromestatus.com/feature/5078049450098688).
- [Статус Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=trust%tokens).
- [GitHub](https://github.com/WICG/trust-token-api): задавайте вопросы и участвуйте в обсуждении API в разделе [Issues](https://github.com/WICG/trust-token-api/issues).
- [Интеграция с Chrome DevTools](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- Дополнительная информация: [Начало работы с токенами доверия](https://web.dev/trust-tokens/)

## Наборы собственных доменов

- [Текущее испытание Origin Trial](https://web.dev/origin-trials/): Chrome с 89 по 93.
- [Регистрация для участия в испытании Origin Trial](/origintrials/#/view_trial/988540118207823873).
- [Статус платформы Chrome](https://chromestatus.com/feature/5640066519007232).
- [Статус Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=first-party%20sets).
- [Предложение API](https://github.com/privacycg/first-party-sets): задавайте вопросы и участвуйте в обсуждении API в разделе [Issues](hhttps://github.com/privacycg/first-party-sets/issues).
- Дополнительная информация: [Проекты Chromium: наборы собственных доменов](https://www.chromium.org/updates/first-party-sets).

## FLoC

- Первоначальное испытание [origin trial](https://web.dev/origin-trials) закрыто. Новости см. в обсуждении [Intent to Experiment](https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs).
- [Демоверсия](https://floc.glitch.me/) первоначальной версии (испытание origin trial закрыто).
- [Статус Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=floc).
- [Предложение API](https://github.com/WICG/floc) в настоящий момент обсуждается с [WICG](https://www.w3.org/community/wicg/) и другими заинтересованными группами.
- [GitHub](https://github.com/WICG/floc): задавайте вопросы и участвуйте в обсуждении API в разделе [Issues](https://github.com/WICG/floc/issues).
- [Статус платформы Chrome](https://www.chromestatus.com/features/5710139774468096).
- Дополнительная информация: [Что такое FLoC?](https://web.dev/floc/)

## FLEDGE

Дальнейшее развитие [TURTLEDOVE](https://github.com/WICG/turtledove).

- [Обсуждение Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI/m/LqT59250CAAJ).
- [Статус Blink](https://groups.google.com/a/chromium.org/g/blink-dev/search?q=fledge).
- [Предложение API](https://github.com/WICG/turtledove/blob/main/FLEDGE.md) в настоящий момент обсуждается с [WICG](https://www.w3.org/community/wicg/) и другими заинтересованными группами.
- [GitHub](https://github.com/WICG/turtledove/blob/main/FLEDGE.md): задавайте вопросы и участвуйте в обсуждении API в [разделе Issues проекта TURTLEDOVE](https://github.com/WICG/turtledove/issues).

<br>

---

## Дополнительная информация

### Blink, Chromium и Chrome

- [График выхода версий Chrome](https://www.chromestatus.com/features/schedule)
- [Процесс выпуска новых функций в Chromium](https://www.chromium.org/blink/launching-features)
- [Intent to explain: развенчание мифов о процессе выпуска Blink](https://www.youtube.com/watch?time_continue=291&v=y3EZx_b-7tk)
- [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/): статус реализации и обсуждение функций Blink—движка рендеринга, используемого в Chromium.
- [Поиск по коду Chromium](https://source.chromium.org/).

### Испытания Origin Trial

- [Знакомство с испытаниями Chrome Origin Trial](https://web.dev/origin-trials/)
- [Что такое сторонние испытания Origin Trial?](https://web.dev/third-party-origin-trials)
- [Знакомство с испытаниями Chrome Origin Trial](/blog/origin-trial-troubleshooting/)
- [Руководство по испытаниям Origin Trial для веб-разработчиков](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
- [Зачем нужны испытания Origin Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)
- [Проведение испытаний Origin Trial](https://www.chromium.org/blink/origin-trials/running-an-origin-trial)
