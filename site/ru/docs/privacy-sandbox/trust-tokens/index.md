---
layout: layouts/doc-post.njk
title: Токены доверия
subhead: |2

  Trust Tokens is a new API to help combat fraud and distinguish bots from real humans, without passive tracking.
description: |2

 "The Trust Tokens API enables trust of a user in one context to be conveyed to another context, without identifying the user or linking identities between the two contexts. The API enables an origin to issue cryptographic tokens to a user it trusts. The tokens are stored by the user's browser. The browser can then use the tokens in other contexts to evaluate the user's authenticity."
date: '2021-05-18'
updated: '2021-08-18'
authors:
  - samdutton
---

## Статус реализации

- [In origin trial](https://web.dev/origin-trials/) Chrome 84 to 94.
- [Регистрация для участия в испытании](https://developer.chrome.com/origintrials/#/view_trial/2479231594867458049).
- [Демонстрация](https://trust-token-demo.glitch.me/).
- [Chrome DevTools integration](https://developers.google.com/web/updates/2021/01/devtools?utm_source=devtools#trust-token).
- [Статус платформы Chrome](https://www.chromestatus.com/feature/5078049450098688).

## Что такое токены доверия?

{% YouTube id='bXB1Iwq6Eq4' %}

Токены доверия позволяют передавать доверие к подлинности пользователя из одного контекста в другой, помогая сайтам бороться с мошенничеством и отличать ботов от реальных людей — без пассивного отслеживания.

- Сайт-**эмитент** может выдавать токены браузеру пользователя, если тот продемонстрирует свою благонадежность: будет в течение длительного периода использовать свою учетную запись, выполнит транзакцию, получит достаточно высокий [балл reCAPTCHA](https://developers.google.com/recaptcha) и т. д.
- Сайт-**получатель** может подтвердить, что пользователь является реальным человеком, проверив наличие у него токенов, выданных эмитентом, которому получатель доверяет, а затем, если это необходимо, воспользоваться токенами.

Токены доверия зашифрованы, поэтому не позволяют идентифицировать человека или связать доверенные и недоверенные сеансы, чтобы установить личность.

{% Aside 'caution' %} Токены доверия — это не замена reCAPTCHA и иных механизмов проверки того, является ли пользователь тем, за кого себя выдает.

Токены доверия — это способ **передать** доверие к пользователю, а не **установить**, заслуживает ли он доверия. {% endAside %}

## Зачем нужны токены доверия?

Интернет нуждается в способах установки и передачи сигналов доверия, показывающих, что пользователь действительно является тем, за кого себя выдает, а не ботом, маскирующимся под человека, или злоумышленником, пытающимся обмануть реального человека или сервис. Защита от мошенничества особенно важна для рекламодателей, поставщиков рекламы и сетей [CDN](https://www.cloudflare.com/en-gb/learning/cdn/what-is-a-cdn/).

Unfortunately, many existing mechanisms to gauge and propagate trustworthiness—to work out if an interaction with a site is from a real human, for example—take advantage of techniques that can also be used for fingerprinting. Mechanisms to convey trust must preserve privacy, enabling trust to be propagated across sites without individual user tracking.

With the Trust Tokens API, a website can issue cryptographic tokens to a user it trusts, which can later be used elsewhere. The tokens are stored securely by the user's browser, and can then be redeemed in other contexts to confirm the user's authenticity. This allows trust of a user on one website (such as a social media site or email service) to be conveyed to another website (such as a publisher or online store) without identifying the user or linking identities across sites.

{% Aside 'key-term' %}<br> [Фингерпринтинг](https://w3c.github.io/fingerprinting-guidance/#passive) позволяет сайтам идентифицировать и отслеживать отдельных пользователей, получая данные об их устройстве, операционной системе и настройках браузера (например, языковых настройках, строке [user-agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) и доступных шрифтах), а также изменениях в состоянии устройства. Это можно делать как на стороне сервера путем проверки заголовков запросов, так и на стороне клиента при помощи JavaScript.

Фингерпринтинг использует механизмы, о которых пользователи не знают и которые не могут контролировать. Сайты, такие как [Panopticlick](https://panopticlick.eff.org/) и [amiunique.org](https://amiunique.org/), показывают, как данные, полученные в результате фингерпринтинга, можно объединить, чтобы идентифицировать вашу личность.<br> {% endAside %}

## Как работают токены доверия?

В этом примере сайт издателя перед показом рекламы хочет проверить, является ли пользователь настоящим человеком, а не ботом.

1. Пользователь заходит на сайт (известный как **эмитент**) и выполняет действия, которыми подтверждает, что он реальный человек: делает покупки, использует электронную почту, успешно проходит тест reCAPTCHA и т. д.
2. The issuer site uses the Trust Tokens JavaScript API to trigger a request for trust tokens for the user's browser.
3. Сайт-эмитент возвращает данные токена.
4. Браузер пользователя безопасно сохраняет данные токена доверия.
5. Пользователь заходит на другой сайт (такой, как новостной портал), который хочет проверить, является ли пользователь настоящим человеком, — например, чтобы показать рекламу.
6. При помощи API токенов доверия сайт проверяет, сохранены ли в браузере пользователя токены доверия от эмитентов, которым сайт доверяет.
7. В браузере обнаруживаются токены доверия от эмитента, сайт которого пользователь уже посещал.
8. Сайт издателя отправляет эмитенту запрос, чтобы использовать токены доверия.
9. Сайт-эмитент отвечает записью об использовании токенов.
10. Сайт издателя отправляет рекламной платформе запрос, в котором указывает запись об использовании токенов, таким образом подтверждая, что эмитент доверяет пользователю и считает его реальным человеком.
11. Рекламная платформа предоставляет данные, необходимые для показа рекламы.
12. Объявление отображается на сайте издателя.
13. Сайт засчитывает показ объявления.

{% Aside %} For more detail about the JavaScript calls in this example, see [Sample API usage](https://web.dev/trust-tokens/#sample-api-usage). {% endAside %}

---

## Участвуйте и делитесь отзывами

- **Испытание Origin Trial**: зарегистрируйтесь и примите участие в [испытании Chrome Origin Trial](https://developer.chrome.com/origintrials/#/view_trial/2479231594867458049).
- **Демонстрация**: попробуйте [генерировать и использовать](https://trust-token-demo.glitch.me/) токены доверия.
- **GitHub**: ознакомьтесь с [текстом предложения](https://github.com/WICG/trust-token-api) и [обсуждением, где можно задать свои вопросы](https://github.com/WICG/trust-token-api/issues).
- **W3C**: обсудите сценарии использования из отрасли в группе [Improving Web Advertising Business Group](https://www.w3.org/community/web-adv/participants).
- **IETF**: предоставьте технические замечания по поводу внутреннего протокола в [рабочей группе IETF Privacy Pass](https://datatracker.ietf.org/wg/privacypass/about/).
- **Поддержка разработчиков**: задавайте вопросы и участвуйте в обсуждениях в [репозитории поддержки разработчиков Privacy Sandbox](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).

## Дополнительная информация

- [Техническое описание API токенов доверия](https://github.com/dvorak42/trust-token-api)
- [Начало работы с токенами доверия](https://web.dev/trust-tokens/): обзор для веб-разработчиков
- [Знакомство с испытаниями Chrome Origin Trial](https://web.dev/origin-trials)
- [Погружение в Privacy Sandbox](https://web.dev/digging-into-the-privacy-sandbox)
