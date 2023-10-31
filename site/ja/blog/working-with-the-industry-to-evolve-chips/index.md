---
layout: layouts/blog-post.njk
title: CHIPS の進化に向けた業界との共同作業
subhead: Chrome チームが CHIPS の実装で直面した 2 つの課題と、コミュニティからのフィードバックが提案デザインの進化にどのように重要な役割を果たしたかを探ります。
description: Chrome チームが CHIPS の実装で直面した 2 つの課題と、コミュニティからのフィードバックが提案デザインの進化にどのように重要な役割を果たしたかを探ります。
date: 2023-02-28
authors:
  - mihajlija
  - jney
hero: image/udVScdcCFAdRjZwFdLk2jWAFQyr1/Rr2cBdWZprYKZQrJI8cw.png
alt: CHIPS の進化に向けた業界との共同作業。
---

[Cookies having Independent Partitioned State（CHIPS）](/docs/privacy-sandbox/chips/)は、開発者がトップレベル サイトごとに個別の Cookie ジャーを使用して、Cookie を「パーティション化された」ストレージにオプトインできるようにするプライバシー サンドボックス テクノロジーです。<br> CHIPS のユースケースの例には、サードパーティのチャット ウィジェット、マップの埋め込み、サブリソース CDN の負荷分散、ヘッドレス CMS プロバイダーなど、単一のトップレベル サイトでのユーザーのアクティビティを対象とするセッションまたは永続的な状態の概念がクロスサイト サブリソースに必要となるシナリオが含まれます。

CHIPS は、オープンな Web 標準になることを目標に開発されています。これは PrivacyCG で議論されており、Chrome チームは 7 か月に渡るオリジン トライアルの期間中に有益なフィードバックを集めています。開発では、主要関係者との協力を通じてそのフィードバックを調査し、ウェブエコシステムにより良いサービスを提供するようにデザインを更新しました。

では、Chrome チームが CHIPS を実装する際に直面した 2 つの課題と、提案のデザインを進化させる上でコミュニティからのフィードバックがどれほど重要な役割を果たしたかについて探ってみましょう。

## host- プレフィックスと `Domain` 禁止要件の削除

適切なセキュリティ実践を促進するために、CHIPS の設計では、Cookie の設定と送信には安全なプロトコルのみを使用し、パーティション化された Cookie に `Secure` を設定することが要求されています。

最初の提案では、これらの要件のほかに、パーティション化された Cookie の `Domain` 属性を許可していませんでした。Cookie で `Domain` を省略すると、パーティション内の異なるサードパーティ サブドメイン間で Cookie を共有できなくなっていました。

オリジン トライアル中、Chrome チームはパートナーやその他の関係者から、[Domain 禁止要件により、サブドメインを持つサイトで CHIPS を実装するのが難しくなったとの報告](https://github.com/privacycg/CHIPS/issues/30)を受けました。たとえば、`shop.example.com` と `pay.example.com` では、パーティション化された  Cookie ジャーの共有が困難になります。他には、[埋め込みのコンテキストでの認証フローが困難になったというケース](https://github.com/privacycg/CHIPS/issues/39)もありました。

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/P8OeJqoGqjW8oZLTWmr5.png", alt="pay.example.com と shop.example.com サイトを示す図", width="800", height="224" %}

Chrome チームではこのフィードバックを評価し、Domain 禁止要件を削除してもプライバシーの問題は発生しないが、使いやすさが向上すると結論付けました。それに応じて、CHIPS プロダクトチームは [GitHub](https://github.com/privacycg/CHIPS/issues/43) でディスカッションを開始し、この要件の削除についてさらに多くのフィードバックを求めました。CHIPS をテストしていたいくつかの企業から、自社のユースケースにおけるこの変更の重要性についての回答と公式コメントをいただきました。

Chrome はこのフィードバックを W3C の Privacy Community Group に提出し、提案の更新を提示しました。Firefox と Edge は変更を承認し、Safari は何の懸念も提起しなかったため、翌日、Chrome チームは [Blink-Dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY/m/ppK4kDbqAwAJ?utm_medium=email&utm_source=footer) を更新し、[CHIPS Github リポジトリ](https://github.com/privacycg/CHIPS/issues/47)でこの要件を削除する計画を提示しました。

CHIPS チームは当初、悪意のあるサブドメインや侵害されたサブドメインからサイトがクロスサイト Cookie を受信しないことを保証し、Domain Cookie をチャンネルとして使用してサブドメイン間でデータ漏洩の可能性を軽減するために、この要件を提案しました。

この提案によってセキュリティ上のメリットがさらにもたらされましたが、一部の現在のアプリケーション アーキテクチャがサブドメイン間で Cookie を共有することに依存しているため、CHIPS の採用には課題があることを [Tableau が強調](https://github.com/privacycg/CHIPS/issues/30)しました。

Chrome がこの変更を行った後、現在 Salesforce が所有するビジュアル分析プラットフォームを提供する Tableau は次のように [述べています](https://github.com/privacycg/CHIPS/issues/30#issuecomment-1104225686)。

{% Blockquote 'Lee Graber, Software Engineering Architect, Tableau' %} この命名変更の削除により、 `SameSite=None` 属性を追加し、より「既知の」数量を追加するという以前の変更と要件がより一致するようになります。Google がフィードバックを聞き入れ、潜在的な影響を検討し、より簡単な移行をサポートするために変更してくれたことに感謝します。 {% endBlockquote %}

このプロセスを通じて、CHIPS は、ユーザーのプライバシーを保護しながら、関係者にとってより簡単に実装できるようになりました。

## 静的から動的への Cookie 制限の移行

CHIPS の実装におけるもう 1 つの課題は、静的 Cookie の制限でした。<br> Cookie のメモリ フットプリントが大きくなるのを防ぐために、最初の設計では、サイトごと、パーティションごとに 10 個の Cookie の数値制限が提案されていました。

Akamai は、顧客のコンテンツ（customer.cdn.xyz など）をホストするためのトップレベル ドメインを提供する CDN などのサービスには、提案されているパーティション化された Cookie の制限では不十分である可能性があるという[公開フィードバック](https://github.com/privacycg/CHIPS/issues/48)を提出しました。たとえば、customer1.cdn.xyz と customer2.cdn.xyz の両方はサードパーティコンテンツを配信し、それぞれが独自の Cookie を複数設定できます。このような複数の顧客サイトが別のウェブサイトに埋め込まれている場合、パーティションあたり 10 個の Cookie 数制限に達する可能性があります。

Chrome チームは、他のフォーラム、パートナー ミーティング、W3C ディスカッションから同様のフィードバックを受け取ったことから、これらのユースケースで Cookie の制限がもたらす課題を解決する最善の方法を検討しました。

<figure>{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/cLVE4czgWDZPY9lz1IcH.png", alt="単一のドメインがクライアントマシン上に持つ SameSite=None Cookie の最大数を示す図", width="800", height="457" %} <figcaption>単一のドメインがクライアントのマシン上に持つ SameSite=None Cookie の最大数を示す図</figcaption></figure>

コミュニティのフィードバックを取り込む方法を検討した後、Chrome は [TPAC 2022](https://drive.google.com/file/d/1wSUfOb7BIjtmsO6TdxyBMmw3RUQqCtGa/view) で最新のアイデアを発表し、CHIPS が *静的*な 10 個の Cookie 制限からメモリに基づく _動的_ な 10 kb の制限に移行することを提案しました。分析では、この変更によってウェブ上のユースケースの 99% がカバーされるはずであり、主要な用途を維持したまま、Chrome が達成しようとしていたプライバシー原則（サイト間で共有されるユーザーに関する過度の情報を制限する）を支持するだろうということが分かりました。

他のブラウザ ベンダーは、PrivacyCG で CHIPS がクロスブラウザ サポートを維持するために重要な、最新のソリューションに同意したと[述べています](https://github.com/privacycg/CHIPS/issues/48#issuecomment-1271611177)。

その結果、Chrome は新しい制限を[採用](https://github.com/chromium/chromium/commit/8be338400e94964708796d2be6afe071233c0f6f)し、そのソリューションを CHIPS 設計に組み込むこととなりました。

## 業界との連携

ウェブ上のプライバシーを改善する取り組みでは、CHIPS の開発を通じて多くのパートナーから意見を聞き、協力し合うことが不可欠です。

{% Blockquote 'Martin Meyer, Senior Architect at Akamai Technologies' %} Akamai は、Google などの他の業界リーダーといくつかの面で協力関係を築いています。CHIPS プログラムについて提供したフィードバックは些細なことのように思えるかもしれませんが、この変更は、最終的な目標を達成しながら、優れたユースケースへの悪影響を最小限に抑えるのに大いに役立ちます。各組織が独自の方法でインターネットをより高速かつ安全にするために取り組んでいますが、共に協力することでインターネット全体をさらに良いものに作り上げることが可能です。 {% endBlockquote %}

CHIPS は、プライバシー サンドボックスのテクノロジーを改善するには、エコシステムからのフィードバックが不可欠であることを示しました。GitHub でのオープンなウェブに関する対話、W3C ミーティング、および Chrome チームとの継続的なエンゲージメントが、現在 Chrome 安定版で展開されている変更に直接貢献しました。Chrome チームでは、さまざまな提案についてもこのようなフィードバックをお待ちしております。このフィードバックは、テクノロジーの開発方法とウェブ上での展開方法に大きく貢献します。
