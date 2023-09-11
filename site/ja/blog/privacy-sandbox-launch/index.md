---
layout: layouts/blog-post.njk
title: プライバシーサンドボックス広告関連 API のリリース
authors:
  - rowan_m
  - anusmitaray
description:
  Chrome 115 でプライバシーサンドボックス広告関連 API を段階的に有効にするための計画とタイムライン、オリジントライアルの終了、および登録に関する更新情報。
subhead:
  Chrome 115 でプライバシーサンドボックス広告関連 API を段階的に有効にするための計画とタイムライン、オリジントライアルの終了、および登録に関する更新情報。
date: 2023-07-20
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png
alt:
  プライバシーサンドボックス広告関連 API のリリース
tags:
  - privacy
---

5 月に、Chrome 115 における[プライバシーサンドボックス広告関連 API のリリース計画](/blog/shipping-privacy-sandbox/)を発表しましたが、遂にその時期がやってきました。Chrome 115 は安定版としてリリースされ、今後数日のうちに、API の段階的な有効化が開始されます。

この記事では、今回のリリースに関わる次の内容について確認します。

- **リリース内容:**  広告関連 API のリリースプロセス: Topics、Protected Audience、アトリビューション レポート、プライベート集計、共有ストレージ、および Fenced Frames。
- **API の段階的有効化:** API は、イシューを監視しながら、8 月中旬までに 99% の可用性を得ることを目標に、115 マイルストーンに沿って段階的に有効化されます。
- **総合オリジントライアルの終了:** プライバシーサンドボックス広告関連オリジントライアルは 2023 年 9 月 20 日に終了し、同時に一般提供への移行を開始します。
- **ユーザーコントロールの更新:** ユーザーは、API を管理するための広告プライバシーコントロールを利用できるようになります。
- **登録:** 広告関連 API を使用する開発者に必須の登録プロセスが更新されています。
- **Chrome を使用したテストモード:** 開発者がサードパーティ Cookie データを使用せずに API を使用できるオプションに関する詳細が更新されます。

## リリース内容

[前回の記事](/blog/shipping-privacy-sandbox/)では、Chrome 115 でリリースされる広告関連 API のリストを照会しました。[通常のプロセス](/docs/privacy-sandbox/proposal-lifecycle/)の一環として、各機能の blink-dev メーリングリストに "Intent to Ship"（I2S）メッセージを送信しました。I2S メッセージには、115 リリースに特化した API 機能の詳細、提案に関するエンジニアリングディスカッション、および重要な、[Blink API オーナーからの](https://www.chromium.org/blink/guidelines/api-owners/#:~:text=The%20Blink%20API%20owners%20oversee,APIs%20to%20Chromium%2Dbased%20browsers.)機能のリリースに関する承認（LGTM）が含まれます。

{% Aside %}

[Attribution Reporting API](https://groups.google.com/a/chromium.org/g/blink-dev/c/2Rmj5V6FSaY)、[Protected Audience](https://groups.google.com/a/chromium.org/g/blink-dev/c/igFixT5n7Bs)、[Topics API](https://groups.google.com/a/chromium.org/g/blink-dev/c/PN_aE-X-f9U)、[Private Aggregation API](https://groups.google.com/a/chromium.org/g/blink-dev/c/8cKaLstq2QQ)、[Shared Storage API](https://groups.google.com/a/chromium.org/g/blink-dev/c/dZ0NRwh7cvs)、および [Fenced Frames](https://groups.google.com/a/chromium.org/g/blink-dev/c/tpw8wW0VenQ) の I2S メッセージをご覧ください。

{% endAside %}

ウェブプラットフォーム API と共に、アトリビューション レポートとプライベート集計の[集計サービス](/docs/privacy-sandbox/aggregation-service)も一般公開となります。また、[First-Party Sets](/docs/privacy-sandbox/first-party-sets/)（[I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/7_6JDIfE1as)）と[プライベートステートトークン](/docs/privacy-sandbox/trust-tokens/)（[I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/vKCYxKqw8k0/m/ohKLGrM5AQAJ)）を段階的に有効化するプロセスも開始されており、[ストレージ パーティション](/docs/privacy-sandbox/storage-partitioning/)（[I2S](https://groups.google.com/a/chromium.org/g/blink-dev/c/24hK6DKJnqY/m/ChL2WWx5CgAJ)）もリリースされる予定です。

## API の段階的有効化

いかなる潜在的なイシューも監視して対応できるように、前回の一部のプライバシーサンドボックス機能と同様に、ブラウザインスタンスの割合を増やしながら、広告関連 API を段階的に有効化していきます。このプロセスを、2023 年 7 月 18 日の 115 安定版リリースから数日後に開始することを目標としているため、7 月 24 日の週にはほぼ開始される可能性があります。その後 1 週間かけて、API の提供を約 35% のブラウザに拡大する意向です。[統合オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/#status)と同様に、この拡大には、すべての API が有効化されたメインのグループと API のサブセットが有効化された小規模の隔離されたグループが含まれます。API の潜在的なイシューを特定するには、隔離されたグループを使用するのが近道です。

{% Aside %}

ユーザーは、バージョンアップデートまたは API の増分アップデートが適用される前に、Chrome を再起動する必要があります。つまり、ターゲットとするレベルに達するには、拡大までにさらに時間がかかることになります。示されているすべての割合はおおよその数であり、レベルを調整してイシューに対応する可能性もあるため、開発者はこの期間が変動することも予期しておくことをお勧めします。Chrome ブラウザの全体的な割合も個々のサイトのトラフィックの割合に一致しない可能性もあるため、この数値を期待されるトラフィックの指標として捉えることをお勧めします。

{% endAside %}

次に、8 月の始めに、提供を約 60% のブラウザに増やすことを考えています。これにも実験グループが含まれたままになるため、API ごとに異なるレベルの提供状況が確認される可能性があります。すべてがうまくいった場合、8 月中旬の 116 安定版リリースの頃までには約 99% のブラウザまで最終拡大が適用されます。この時点で、個々の実験グループもマージされ、潜在的なイシューの検出を補助するために、すべての API を有効にしていない隔離された小規模のグループのみが維持されるようになります。このレベルを維持して監視を続け、Chrome 対応テストモードの準備を開始する予定です。

{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/oPELU4sAmYTdAsahyFQy.png", alt="Chrome 安定版におけるバージョンごとのおおよその提供率。", width="800", height="339" %}

このタイムラインは、過程での監視結果によって変更される可能性があります。これまでと同様に、各ステージを通過するたびにこちらでドキュメントを更新し、blink-dev スレッドに更新情報を投稿します。

## 登録

Chrome と Android でプライバシーサンドボックス広告関連 API にアクセスするには、開発者は[登録とアテステーションプロセス](https://goo.gle/privacy-sandbox-enroll)を完了する必要があります。これは間もなく API にアクセスするための必須要件となる予定ですので、できるだけ早期にプロセスを開始することをお勧めします。<br> ローカルでテストする場合には、Chrome 116 から Chrome フラグと CLI スイッチによるオーバーライドを開発者に提供しています。

- フラグ: `chrome://flags/#privacy-sandbox-enrollment-overrides`
- CLI: `--privacy-sandbox-enrollment-overrides=https://example.com,https://example.co.uk,...`

## 統合オリジントライアルの終了

[プライバシーサンドボックス広告関連のオリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)では、サイトは、広告関連 API で統一された実験を実行できます。オリジントライアルで有効になっているのと同じグループから API の拡大を開始し、既存のデータを継続できるようにしています。トークンとオリジントライアルは 2023 年 9 月 20 日まで有効となりますが、7 月末にはそれらを提供する必要はなくなります。また全体的なトラフィックの増加を開始するに当たり、今週は、安定版より前のチャンネル（ベータ、カナリアなど）におけるオリジントライアルトークンの要件の削除を開始する予定です。ただし、円滑に移行できるように、失効日前に API への登録を済ませておくことをお勧めします。オリジントライアルの終了が近づくにつれ、ガイダンスと手順の追加により[ドキュメント](/docs/privacy-sandbox/unified-origin-trial/)を更新します。

## ユーザーコントロールの更新

プライバシーサンドボックスコントロールのトライアルバージョンに代わる更新済みの広告プライバシーコントロールを徐々にロールアウトしています。8 月中旬の完了を目標に、API と同じようなタイミングで新しい UX を有効化しています。<br> 開発者は、`chrome://flags/#privacy-sandbox-settings-4` でフラグを有効にすることで、テスト用に新しい設定を有効化できます。以下の表には、関連する Chrome 設定とそれが制御する API を示しています。

<table>
  <thead>
    <tr>
      <th>
<br><strong>Chrome の設定</strong>
</th>
      <th>
<br><strong>設定の場所</strong>
</th>
      <th>
<br><strong>プライバシーサンドボックス API</strong>
</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
<br> 広告トピック</td>
      <td>
<p></p>
<pre>chrome://settings/adPrivacy/interests
</pre>
</td>
      <td>
<br> Topics</td>
    </tr>
    <tr>
      <td>
<br> サイトが提案する広告</td>
      <td>
<p></p>
<pre>chrome://settings/adPrivacy/sites
</pre>
</td>
      <td>
<br> Protected Audience</td>
    </tr>
    <tr>
      <td>
<br> 広告の測定</td>
      <td>
<p></p>
<pre>chrome://settings/adPrivacy/measurement
</pre>
</td>
      <td>
<br> Attribution Reporting</td>
    </tr>
  </tbody>
</table>

## Chrome が提供するテストモード

[Chrome が提供するテストモード](/docs/privacy-sandbox/chrome-testing/)については、初期の情報を以前に提供済みであり、こちらでは [developer support GitHub リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing)に寄せられたフィードバックへの対応も行っています。8 月中旬には技術的な詳細をさらに共有することを検討しています。それ以降は、開発者向けのオフィスアワーセッションを開催し、GitHub のテストモードイシューへの対応作業を引き続き行います。<br> 以下のイシューに関するフィードバックをお寄せください。

- [テストにはモード A とモード B のいずれか、または両方を使用していますか？](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/112)
- [Chrome が提供するテストのラベルサイズの選択](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/113)
- [Chrome が提供するテストでのクライアントヒントの使用](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/114)

その他の質問やディスカッションについては、[新しいイシューを提出](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues)することもできます。

{% Aside %}

英国の [Competition and Markets Authority](https://www.gov.uk/government/organisations/competition-and-markets-authority)（CMA）は、タイムライン、テスト方法、および次のステップに関する関連情報を記載した[プライバシーサンドボックス API のテストに関するガイダンス](https://assets.publishing.service.gov.uk/media/649d6a5f45b6a2000c3d455f/20230629_CMA_industry_testing_update_B.pdf)を公開しました。

{% endAside %}

進行中の[プライバシーサンドボックスのタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline)では、これらの API のリリースも重要なマイルストーンとなっています。このマイルストーンより、オリジントライアルでサイトがテストしている段階から、本番環境でこれらの API を統合する段階への移行が開始されることになります。API の有効化のフェーズを経て、2023 年の第 4 四半期でのラベルを使ったオプトインテスト、2024 年第 1 四半期のサードパーティ Cookie の1% 廃止、2024 年第 3 四半期のサードパーティ Cookie の完全撤廃に至るまで、更新情報を案内し続ける予定です。弊社は廃止の拡大に対するさらなる対応を行う前に、コミットメントに従って CMA と緊密に連携作業を進めていく予定です。
