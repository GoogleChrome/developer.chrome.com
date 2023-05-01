---
layout: layouts/blog-post.njk
title: "Fastly との提携 — FLEDGE の \U0001D458-匿名性サーバーに Oblivious HTTP リレーを使用"
subtitle: "Fastly との提携を通じて FLEDGE の \U0001D458 匿名性サーバーを実装することで、Chrome のプライバシー対策を改善しています。この実装ではデータが OHTTP リレーを介して中継されるため、Google サーバーはエンドユーザーの IP アドレスを受信しません。\U0001D458-匿名性サーバーは、FLEDGE の完全な実装に向けた段階的なステップです。"
description: "Fastly との提携を通じて FLEDGE の \U0001D458 匿名性サーバーを実装することで、Chrome のプライバシー対策を改善しています。この実装ではデータが OHTTP リレーを介して中継されるため、Google サーバーはエンドユーザーの IP アドレスを受信しません。\U0001D458-匿名性サーバーは、FLEDGE の完全な実装に向けた段階的なステップです。"
authors:
  - pjl
thumbnail: image/udVScdcCFAdRjZwFdLk2jWAFQyr1/abKfeo2FNt2HFX46in1l.jpg
alt: ブログ投稿用の画像。
date: 2023-03-15
---

[FLEDGE はプライバシーサンドボックスの提案](/docs/privacy-sandbox/fledge/)で、リマーケティングとカスタムオーディエンスのユースケースに対応し、サードパーティがサイト全体でユーザーの閲覧行動をトラッキングできないようにすることを目的として設計されています。ブラウザは、同じレンダリング URL が十分に多くの人々に表示されている場合にのみ広告をレンダリングすることにより、マイクロターゲティングから保護します。広告をレンダリングするには、過去 7 日間にクリエイティブごとに 50 人のユーザーが必要です。これは、レンダリングされた URL が最小しきい値を満たしていないことを報告しないようにすることで、クロスサイトトラッキングからユーザーを保護するのにも役立ちます。

この保護は 𝑘-匿名性 と呼ばれ、グローバル カウントを維持する Google 運営の集中サーバーによって実現されています。クリエイティブが最小しきい値に達すると、ユーザーへのレンダリングがクリアされます。𝑘-しきい値の詳細と、𝑘-匿名性サービスが FLEDGE 内でどのように設計されているかについては、[Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md) をご覧ください。

<figure>{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/c7P1fh4VtUCFU5QNNrdY.png", alt="Chrome の複数のサイトが 𝑘-匿名性サーバーにリクエストを送信して FLEDGE 広告を配信している図。", width="800", height="450" %} <figcaption> サイトが FLEDGE 広告をリクエストすると、Google の 𝑘-匿名性サーバーは、𝑘-匿名性のしきい値を超えた場合にのみ広告を表示できるようにします。広告会社に広告のリクエストが行われると、IP アドレスが表示されます。</figcaption></figure>

𝑘-匿名性サービスは重要なプライバシー保護を提供しますが、IP アドレスやブラウザのユーザーエージェント文字列などの機密ユーザーデータをこの集中サーバーに公開する可能性もあります。このため、コンテンツ配信、エッジ コンピューティング、セキュリティ、オブザーバビリティサービスを提供するエッジクラウドプラットフォームの [Fastly と提携](https://www.fastly.com/blog/enabling-privacy-on-the-internet-with-oblivious-http)し、[Oblivious HTTP リレー（OHTTP リレー）](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md#oblivious-http)を FLEDGE の 𝑘 匿名性サーバーの一部として運用することで、Chrome のプライバシー対策の改善に取り組んでいます。

データは OHTTP リレーを介してリレーされるため、Google の 𝑘 匿名性サーバーはエンドユーザーの IP アドレスを受け取ることがありません。𝑘-匿名性サーバーは、FLEDGE の完全な実装に向けた段階的なステップです。これは、通常の閲覧動作を通じてサイト運営者のオリジンに公開されている IP アドレスには影響しないことに注意してください。

{% Aside %}<br> [Oblivious HTTP（OHTTP）](https://ietf-wg-ohai.github.io/oblivious-http/draft-ietf-ohai-ohttp.html#name-introduction)を使用すると、クライアントが複数のリクエストを送信しても、サーバーがリクエストのプロパティを使用してそれらが同じクライアントから発信されたものとして識別することができません。クライアントの IP アドレスをサーバーから隠すだけでなく、TLS セッションを使用して同じクライアントからの複数のリクエストが関連付けられるのを防ぎます。<br> {% endAside %}

OHTTP を実装するために、Google は Google の代わりにリソースのリレーを運営する Fastly と提携しました。ユーザーの Chrome ブラウザはこのリレーに、𝑘-匿名性サーバーの HTTP `POST` メッセージの本文で暗号化されたペイロードを送信します。メッセージの暗号化には、Google ドメインの 𝑘 匿名性サーバーから直接取得したキーが使用されます。リクエストは、リレーから Google サーバーで実行されるゲートウェイに転送されます。したがって、リレーはリクエストのコンテンツを認識せずにユーザーの IP アドレスを認識し、逆に、𝑘-匿名性サーバー（およびゲートウェイ）はユーザーのアイデンティティを認識せずにリクエストのコンテンツを見ることができます。

{% Aside %}<br>開発者やユーザー側で何らかの操作が必要となるわけではありませんが、FLEDGE プロセス全体でユーザーのプライバシーを改善するために配備しているインフラストラクチャについて説明したいと思いました。<br> {% endAside %}

Google は、FLEDGE を使用しているすべての Chrome ユーザーに代わって 𝑘-匿名性サーバーを運用する予定です。𝑘-匿名性チェックは、すべてのサードパーティアドテックと Google 独自の広告サービスに適用されます。𝑘-匿名性の恩恵を受けるのはユーザーであり、ブラウザはそれを実装し実施することを選択できるソフトウェアです。

<figure>{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/pGB4JTgbiG1VNO2oO524.png", alt="Chrome の複数のサイトが 𝑘-匿名性サーバーにリクエストを送信し、間に OHTTP リレーを介して FLEDGE 広告を配信している図。", width="800", height="450" %} <figcaption> サイトが FLEDGE 広告をリクエストすると、Google の 𝑘-匿名性サーバーは、𝑘-匿名性のしきい値を超えた場合にのみ広告を表示できるようにします。Fastly のリレーは、OHTTP を実装して IP アドレスを非表示にすることで、ユーザーのプライバシーを保護します。</figcaption></figure>

FLEDGE のプライバシー保護プロパティは、Google とより広範なエコシステムに等しく適用されます。このサーバーは Chrome から呼び出されます。Android のサポートは 2023 年後半に予定されています。

<em>写真提供: <a href="https://unsplash.com/photos/9drS5E_Rguc?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ian Battaglia</a>（<a href="https://unsplash.com/fr/@ianjbattaglia?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>）</em>
