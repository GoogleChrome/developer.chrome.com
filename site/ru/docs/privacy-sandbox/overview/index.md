---
layout: layouts/doc-post.njk
title: Что такое Privacy Sandbox?
subhead: Privacy Sandbox — это серия предложений для обеспечения межсайтового взаимодействия без использования сторонних файлов cookie и других механизмов отслеживания.
description: "Что в нем содержится, как поучаствовать в работе над ним и зачем он нужен."
date: 2021-05-18
updated: 2021-07-29
authors:
  - samdutton
---

{% YouTube id='WnCKlNE52tc' %}

## Зачем нужна инициатива Privacy Sandbox?

Инициатива Privacy Sandbox преследует две основные цели:

- Разработка альтернативных решений для поддержки распространенных в вебе сценариев использования и бизнес-моделей таким образом, чтобы исключить отслеживание пользователей при перемещении между сайтами, а также межсайтовое отслеживание без ведома пользователя.
- Постепенное прекращение поддержки сторонних файлов cookie с переходом на новые решения.

## Что предлагает инициатива Privacy Sandbox?

На сегодняшний день Chrome и другие участники экосистемы внесли более 30 предложений, с которыми можно ознакомиться на <a href="https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo">общедоступных ресурсах групп консорциума W3C</a>. Эти предложения охватывают широкий спектр потребностей и сценариев использования.

Ниже перечислены ключевые предложения, внесенные командой Chrome.

### Релевантный контент и реклама

- [**FLoC**](/docs/privacy-sandbox/floc): подбор рекламы и контента по интересам с сохранением конфиденциальности: «релевантная реклама».
- [**FLEDGE**](/docs/privacy-sandbox/fledge): подбор рекламы для ремаркетинга. Развитие технологии [TURTLEDOVE](https://github.com/WICG/turtledove).

### Измерение и атрибуция

- [**Отчеты по атрибуции**](/docs/privacy-sandbox/attribution-reporting): корреляция кликов по объявлениям и просмотров объявлений с конверсиями. Ранее известно как Event Conversion Measurement API. Поддерживает два типа отчетов: на уровне событий и сводные.

### Защита собственных ресурсов

- [**Изменения в работе файлов cookie с атрибутом SameSite**](https://web.dev/samesite-cookies-explained/): защита сайтов путем явной пометки межсайтовых файлов cookie.
- [**Наборы собственных доменов**](/docs/privacy-sandbox/first-party-sets): позволяют связанным доменным именам, имеющим общего владельца, объявлять принадлежность к одному и тому же источнику.

### Обнаружение мошенничества

- [**Токены доверия**](/docs/privacy-sandbox/trust-tokens): позволяют передавать доверие к пользователю из одного контекста в другой, чтобы эффективнее препятствовать мошенничеству и отличать ботов от людей.

### Ограничение сбора данных

- [**Бюджет конфиденциальности**](https://www.youtube.com/watch?v=0STgfjSA6T8): механизм, дающий сайтам возможность получать информацию об используемом браузере или устройстве, но при этом позволяющий браузеру ограничивать общий объем доступной сайту информации, чтобы не дать ему идентифицировать пользователя.
- [**User-Agent Client Hints**](https://web.dev/user-agent-client-hints/): строка [User-Agent](https://developer.mozilla.org/docs/Web/HTTP/Headers/User-Agent) (UA)—одна из важных пассивных поверхностей [фингерпринтинга](https://w3c.github.io/fingerprinting-guidance/#passive) и вдобавок ее сложно анализировать. С помощью Client Hints (клиентских подсказок) разработчики могут активно запрашивать только ту информацию об устройстве или настройках пользователя, которая им необходима, вместо того чтобы извлекать эти данные из строки User-Agent.
- [**Gnatcatcher**](https://github.com/bslassey/ip-blindness): позволяет ограничить возможность идентификации конкретных пользователей по IP-адресу. Предложение состоит из двух частей: [<strong data-md="">добровольный отказ от обработки IP-адресов</strong>](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) позволяет сайтам сообщать браузеру, что они не идентифицируют пользователей по IP-адресу, в то время как <a href="https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md"><strong>Near-path NAT</strong></a> позволяет группам пользователей направлять свой трафик через один и тот же анонимизирующий сервер, фактически скрывая свои IP-адреса от владельцев сайтов. Gnatcatcher также предоставляет сайтам возможность получать доступ к IP-адресам в легитимных целях, таких как предотвращение злоупотребления, при условии прохождения сертификации и аудита.

### Идентификация

- [**WebID**](https://github.com/WICG/WebID): поддержка федеративной идентификации (возможности входа на сайт через сторонний сервис) без необходимости предоставлять почтовый адрес или иную личную информацию пользователя как стороннему сервису, так и сайту, если пользователь явно не дает на это согласие. WebID предоставляет возможность федеративной авторизации без использования переадресации, всплывающих окон и сторонних файлов cookie, позволяющих идентифицировать пользователей и отслеживать их перемещение между сайтами.

## Кто участвует в работе над Privacy Sandbox?

По состоянию на начало 2021 года:

- Поступило более 30 предложений от Chrome и других участников Privacy Sandbox.
- К группам консорциума W3C присоединилось более 400 участников, желающих внести свой вклад, включая [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants) и [Privacy Community Group](https://www.w3.org/community/privacycg/participants).
- Было опубликовано пять реализаций API для тестирования в Chrome.

## Когда API будут реализованы?

На странице [статуса реализации](/docs/privacy-sandbox/status/) на данном сайте содержится информация о ходе реализации отдельных API.

---

## Участвуйте и делитесь отзывами

- **GitHub**: ознакомьтесь с описанием предложения на GitHub и оставьте свои вопросы или комментарии на вкладке Issues в репозитории с описанием. <br>[Ссылки на описания](#explainers) приведены ниже.
- **W3C**: обсудите сценарии использования и поделитесь своим мнением как представитель отрасли в группах <a href="https://www.w3.org/community/web-adv/">Improving Web Advertising Business Group</a>, [Privacy Community Group](https://www.w3.org/community/privacycg/participants) и [Web Incubator Community Group](https://github.com/WICG) консорциума W3C.
- **Поддержка разработчиков**: задавайте вопросы и участвуйте в обсуждениях в <a href="https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support">репозитории поддержки разработчиков Privacy Sandbox</a>.

## Дополнительная информация

### Описания предложений Privacy Sandbox {: #explainers }

Описания предложений API нуждаются в отзывах. Особенно важны отзывы, содержащие еще не описанные сценарии использования и варианты их решения, позволяющие повысить уровень конфиденциальности. Вы можете оставить комментарии или задать вопросы во вкладке Issues каждого репозитория с описанием.

- [Бюджет конфиденциальности](https://github.com/bslassey/privacy-budget)
- [Токены доверия](https://github.com/dvorak42/trust-token-api)
- [Наборы собственных доменов](https://github.com/privacycg/first-party-sets)
- [Gnatcatcher](https://github.com/bslassey/ip-blindness)
- [API сводных отчетов](https://github.com/csharrison/aggregate-reporting-api)
- [Отчеты по атрибуции](https://github.com/csharrison/conversion-measurement-api)
- [FLoC](https://github.com/jkarlin/floc)
- [FLEDGE](https://github.com/michaelkleber/turtledove)

### Статьи и видео для веб-разработчиков

- [Погружение в Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
- [Объяснение SameSite—атрибута файлов cookie](https://web.dev/samesite-cookies-explained/)
- [Знакомство с токенами доверия](https://web.dev/trust-tokens)
- [Более конфиденциальный способ измерения конверсий рекламы](https://web.dev/conversion-measurement/)
- [Что такое FLoC?](https://web.dev/floc/)
- [Знакомьтесь: бюджет конфиденциальности](https://www.youtube.com/watch?v=0STgfjSA6T8)

### Принципы и концепции, на которых основаны предложения

- [Потенциальная модель конфиденциальности для Интернета](https://github.com/michaelkleber/privacy-model): описание главных принципов, лежащих в основе API.
- [Privacy Sandbox](https://www.chromium.org/Home/chromium-privacy/privacy-sandbox)
- Обзор Privacy Sandbox: [Создание более конфиденциального Интернета](https://www.blog.google/products/chrome/building-a-more-private-web/)
- Блог Google AI: [Федеративное обучение: совместное машинное обучение без централизованных обучающих данных](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
- [Будущее сторонних файлов cookie](https://blog.chromium.org/2019/10/developers-get-ready-for-new.html)
