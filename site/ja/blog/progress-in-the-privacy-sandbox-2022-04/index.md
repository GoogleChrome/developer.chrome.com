---
title: プライバシーサンドボックスの進捗状況（2022 年 3 月～4 月）
description: >
  オリジントライアルで利用可能な多数の API を含む更新: プライバシーサンドボックスの関連性と測定の複合トライアルの一環としての分割した Cookie の CHIPS と アトリビューション レポート、FLEDGE、および Topics。
layout: 'layouts/blog-post.njk'
date: 2022-05-17
authors:
  - rowan_m
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/DrSOB8w3wN26K2O8nfy9.png'
alt: >
  プライバシーサンドボックスのロゴ
tags:
  - progress-in-the-privacy-sandbox
  - privacy
---

今年最初の「**[プライバシーサンドボックスの進捗状況](/tags/progress-in-the-privacy-sandbox/)**」へようこそ。Chrome におけるサードパーティ Cookie の段階的廃止とよりプライベートなウェブに向けた取り組みについて、2022 年 3 月と 4 月のマイルストーンの達成状況をお知らせします。 各エディションでは、[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)の更新の概要を、プロジェクト全体の最新情報とともに提供しています。


## プライバシーサンドボックスの関連性と測定のオリジントライアル

引き続き、初期の開発者フィードバックとそのフィードバックに基づいて提案を発展させる能力を最優先事項としています。 **アトリビューション レポート、FLEDGE、および Topics を合わせた複合オリジントライアル**を開始することで、実際の環境でこれらの API に関する初期フィードバックを得られるようにしました。

Chrome 101 をはじめとする Chrome Beta チャネルのごく一部のユーザーを対象に開始しています。 私たちの目的は、最初に[インフラストラクチャのセットアップ、開発者エクスペリエンス、およびユーザーインターフェース](https://blog.chromium.org/2022/03/what-to-expect-from-ps-testing.html)のテストに焦点を当て、このトライアルをより多くのユーザーに拡大する前に調整やイテレーションを行うことにあります。

これらの API のいずれかを統合することを考えている場合は、**[今すぐオリジントライアルに登録](/origintrials/#/view_trial/771241436187197441)** しましょう。 **[参加方法やテスト方法、多様なデモ、およびトライアルに関するフィードバックの提供先に関するの詳しい説明](/blog/privacy-sandbox-unified-origin-trial/)** を用意しています。

この早期段階を焦点としているため、エクスペリエンスの改善や問題の修正に合わせて、**コードが定期的に変更**されます。 この基盤を検証し、実験のスケールを拡大するにつれ、提案に関するこのブログの連載記事、blink-dev メーリングリストの投稿、および各開発者メーリングリストで情報を発信します。


## フィードバック

ウェブエコシステム全体のさまざまな関係者から得られるフィードバックは、プライバシーサンドボックスイニシアチブ全体にとって非常に重要です。 既存の公開チャネルの概要は、**専用の[フィードバックセクション](/docs/privacy-sandbox/feedback/)** で説明されています。このチャネルではディスカッションのフォローやそれへの参加が可能で、Chrome チームにいつでも直接連絡できるフィードバックフォームも用意されています。

また、チームに直接質問できる一連の **[オフィスアワーセッション](/blog/privacy-sandbox-office-hours-1/)** を開始しました。 初回セッションは、一般的なオリジントライアルのセットアップをトピックに実施されました。今後のトピックについては近日発表する予定です。 このセッションは、ユーザーが機能を構築している開発者と直接対話し、開発者がユーザーのイシューを知ることのできる機会を提供しています。


## クロスサイトプライバシーの境界の強化

サードパーティ Cookie は、クロスサイトトラッキングを可能にする重要なメカニズムです。 このメカニズムの段階的廃止を実現することは大きなマイルストーンではありますが、他の形態のクロスサイトストレージやコミュニケーションについても解決する必要があります。


### Cookie

Cookie 関連の提案が進展するにつれて、自社サイトの `SameSite=None` または **クロスサイト Cookie** を監査し、サイトに実施する必要のあるアクションを計画する必要があります。


#### CHIPS

[CHIPS（独立して分割された状態を持つ Cookie）](/docs/privacy-sandbox/chips/)を使用すると、トップレベルサイトごとに個別のクッキージャーを用意し、Cookie を「パーティション化された」ストレージにオプトインすることができます。 [CHIPS オリジントライアルは公開中](/origintrials/#/view_trial/1239615797433729025)で、[開発者向けの指示書](/blog/chips-origin-trial/)が提供されているため、独自の本番サイトで `Partitioned` 属性を使った Cookie をテストできます。


#### Cookie に関するその他の更新

Cookie の一般仕様と機能のクリーンアップと改善も引き続き行っています。 [Cookie に関する RFC が更新され、Cookie に 400 日間の明示的な制限が提供](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-the-expires-attribute-2)されるようになりました。この制限は、`Expires` または `Max-Age` 属性のいずれかによって適用されます。 Chrome 104 での実装を目標に、[I2P](https://groups.google.com/a/chromium.org/g/blink-dev/c/Pm7Or-u27js) と [I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/tZ52DF6uoBU) を送信済みです。 既存の Cookie には影響しませんが、新しい Cookie にこの制限を超える有効期限を設定すると、今後は 400 日間で期限切れとなる上限が適用されます。 これより長く存続する Cookie が必要な場合は、定期的に新しい有効期限で Cookie を再設定する必要があります。


### Federated Credentials Management

[Federated Credentials Management API](https://github.com/fedidcg/FedCM) は、既存の ID プロバイダーのユースケースに基づいて構築されており、新規および既存の ID 連携のユースケースをサードパーティの Cookie を使用せずに続行することができます。 最初の [FedCM のオリジントライアル](/origintrials/#/view_trial/3977804370874990593)が登録可能になりました。[API の概要とデモを提供する新しいセクション](/docs/privacy-sandbox/fedcm/)を追加した[トライアルの開発者ドキュメント](/blog/fedcm-origin-trial/)が用意されています。


### ネットワークの状態分割

[ネットワークの状態の分割](https://github.com/MattMenke2/Explainer---Partition-Network-State)は、[HTTP キャッシュ分割](https://developers.google.com/web/updates/2020/10/http-cache-partitioning)に実装されたパターンを継続しています。キャッシュ用のきめ細かいコンテナを作成することで実現するため、クロスサイトでの情報の漏洩が防止されます。 分割が定義される場所のダブルキーイング（トップフレームサイト）とトリプルキーイング（トップフレームサイトとフレームサイト）のパフォーマンスの影響をよりよく理解できるように I2E を送信しました。

ここでは開発者のアクションは必要ありません。また、Chrome Stable トラフィックの 1% でのみ実行されるため、実験による潜在的な影響は 最小限と言えます。


## 隠されたトラッキングの防止

明示的なクロスサイトトラッキングに使用されるオプションを減らすため、ユーザーのフィンガープリントまたは隠されたトラッキングを可能にする情報を公開するウェブプラットフォームの領域にも対処する必要があります。


### User-Agent 文字列の削減と User-Agent Client Hints

[Chrome の ユーザーエージェント文字列で受動的に利用できる情報を段階的に減らし、その情報を積極的に要求する必要のあるサイトに代替の User-Agent Client Hints（UA-CH）を提供します。](/docs/privacy-sandbox/user-agent/) Chrome 101 では、ビルドバージョンまたはマイナーバージョンをゼロに置き換えることで、最初の削減フェーズを開始しています。

{% Compare 'worse', 'old' %} <span style="font-family: monospace">Mozilla/5.0 (Linux、Android 12、Pixel 6) AppleWebKit/537.36（KHTML、Gecko など）Chrome/101.<span  style="background: #ef9a9a">0.4638.16</span> Mobile Safari/537.36</span> {% endCompare %}

{% Compare 'better', 'new' %} <span style="font-family: monospace">Mozilla/5.0（Linux、Android 12、Pixel 6）AppleWebKit/537.36（KHTML、Gecko など）Chrome/100.<span style="background: #a5d6a7">0.0.0</span> Mobile Safari/537.36</span> {% endCompare %}


**注意:** イシューを監視しながら、この変更を段階的に展開しています。そのため、101 個のインスタンスすべてで番号を縮減した文字列がすぐに表示されることはありませんが、時間の経過とともに多くのトラフィックに反映されると見込んでいます。

また、本番トラフィックに対して提案の最終フォーマットをテストしたいユーザーが、ユーザーエージェント文字列の完全削減に早期オプトインできるように、[オリジントライアルを拡大するための I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/6x6WH2Odzfo) も送信しました。 [オリジントライアルサイトで今すぐ登録](/origintrials/#/view_trial/-7123568710593282047)できます。 また、移行の準備にさらに時間が必要なユーザーには、[完全なユーザーエージェント文字列を保持するためのデプリケーション トライアル](/origintrials/#/view_trial/2608710084154359809)も引き続き提供しています。

User-Agent Client Hints においても、[GREASE の動作を更新する I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/zdFNms0Nxqg)の更新が提供されています。 つまり、Chrome が現在、クライアントがフォーマットを正しく解析できるようにするための特殊文字を含むブランド「`Not A;Brand`」を送信している場合、Chrome のリリース間で値が変化するため、堅牢な解析が引き続き促進されることを期待できます。


### Fenced Frames

Fenced Frame（`<fencedframe>`）は、埋め込みコンテンツ用に提案されている HTML 要素で、iframe に似ています。 ただし、Fenced Frame は、埋め込みコンテキストとの 通信を制限して、フレームが埋め込みコンテキストと共有せずにクロスサイトデータにアクセスできるようにする点で、iframe とは異なります。 たとえば、FLEDGE では、Fenced Frame 内に広告を表示することを意図しています。

[新しい開発者概要の内容](/docs/privacy-sandbox/fenced-frame/)をお読みください。また、Chrome 102 Beta より、より広範なプライバシーサンドボックスの関連性と測定のオリジントライアルの一環として [Fenced Frames を利用できるようにする I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/y6G3cvKXjlg)を送信しました。


## 関連するコンテンツと広告の表示

サードパーティ Cookie の段階的廃止に向けて、サイトが依存していた主要なユースケースを有効にし、クロスサイトトラッキングを有効にしなくてもコンテンツで収入を得続けられるようにする API を導入しています。


### Topics

[Topics API](/docs/privacy-sandbox/topics/) は、クロスサイトトラッキングを使用せずに、インタレストベース広告を可能にする提案です。 プライバシーサンドボックスの関連性と測定のオリジントライアルの一環として [Topics を含める I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs) を送信しました。 また、オリジントライアル中には、[Topics のテストとフィードバックの提供に関する新しい開発者ガイド](/docs/privacy-sandbox/topics-experiment/)もご利用いただけます。

これは早期のテスト段階であるため、コード内にイシューが見つかるたびに、それらを積極的に調査して対処しています。 Topics では、クラッシュするバグが発見されたため、オリジントライアル内で API を一時的に無効にし、ユーザーエクスペリエンスに過大な影響を与えることなく、修正をロールアウトしています。


### FLEDGE

[FLEDGE](/docs/privacy-sandbox/fledge/) は、個人の識別子に依存することなく、以前にアクセスしたサイトまたは製品を利用できる広告を実行することで、リマーケティングとカスタムオーディエンスのユースケースを実現します。 より広範なプライバシーサンドボックスの関連性と測定のオリジントライアルの一環として有効にするために、[FLEDGE の I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg) をもう一度送信しました。 同様に、これに対応する[実験用の開発者ドキュメントも提供](/docs/privacy-sandbox/fledge-experiment/)されています。


## デジタル広告の測定

クロスサイトトラッキングを使用せずに広告を表示するためのコンパニオンとして、これらの広告の有効性を測定できるようにするためのプライバシー保護メカニズムが必要です。


### Attribution Reporting API

**[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/)** は、広告のクリックや閲覧といった、別のサイトでのコンバージョンにつながるイベントを、クロスサイトトラッキングを有効にせずに測定できる機能を有効にします。 これについても、プライバシーサンドボックスの関連性と測定のオリジントライアルの一環としてテストを拡張し続けるための、[アトリビューション レポート の I2E](https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y) を送信しました。

オリジントライアルの初期段階では、[デバッグ](/docs/privacy-sandbox/attribution-reporting-changes-january-2022/#debugging)など、開発者のエクスペリエンスと統合に関するフィードバックに焦点を当てていますが、これは、イベントレベルレポートと要約レポート全体のエンドツーエンドテストを網羅するように拡張されます。


## 記事に関するフィードバック

これらの更新を継続的に公開し、プライバシーサンドボックス全体をさらに進展させられるように、開発者であるユーザーが必要とする情報やサポートが確実に提供されるようにしたいと考えています。 この連載において何か改善できることがございましたら、[@ChromiumDev Twitter](https://twitter.com/ChromiumDev) にお知らせください。 皆さんのご意見をフォーマットの継続的な改善に活用させていただきます。
