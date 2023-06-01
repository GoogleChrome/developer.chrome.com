---
layout: layouts/doc-post.njk
title: フィードバック レポート   - 2023 年第 1 四半期
subhead: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2023 年第 1 四半期の四半期レポートです。
description: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2023 年第 1 四半期の四半期レポートです。
date: 2023-04-27
authors:
  - robertyang
---

<!-- noop -->

CMA へのコミットメントの一環として、Google は、プライバシー サンドボックスの提案に対する関係者のエンゲージメントプロセスに関する四半期レポートを公開することに同意しました（[コミットメント](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)の第 12 段落および 17(c)(ii) を参照）。これらのプライバシーサンドボックスに関するフィードバック要約レポートは、[フィードバックの概要](/docs/privacy-sandbox/feedback/)に記載されているさまざまなソースから Chrome が受け取ったフィードバックを集計して生成されます。これには、GitHub のイシュー、[privacysandbox.com](https://privacysandbox.com/) で利用できるフィードバックフォーム、業界関係者との会議、およびウェブ標準フォーラムが含まれますが、それに限定されていません。Chrome は、エコシステムから受け取ったフィードバックを歓迎し、それから学んだことを設計の決定に統合する方法を積極的に模索しています。

フィードバックのテーマは、API ごとに発生率によってランク付けされます。これは、特定のテーマに関して Chrome チームが受け取ったフィードバックの量を集計し、量の多い順に整理することによって行われます。一般的なフィードバックのテーマは、公開会議（W3C、PatCG、IETF）、直接的なフィードバック、GitHub、および Google の内部チームや公開フォームを通じて浮上したよくある質問からの議論のトピックを確認することによって特定されました。

より具体的には、ウェブ標準化団体の会議の議事録がレビューされ、直接的なフィードバックについては、1 対 1 で行われた Google の関係者会議の記録、個々のエンジニアが受け取ったメール、API メーリングリスト、公開フィードバックフォームが考慮されました。次に、Google はこれらのさまざまなアウトリーチ活動に関与するチーム間で調整を行い、各 API に関連して出現したテーマの相対的な発生率を判断しました。

フィードバックに対する Chrome の対応の説明は、公開されている FAQ、関係者によって提起されたイシューに対する実際の対応、およびこの公開報告の目的に特化した立場の決定に基づいて作成されました。開発とテストの現在の焦点を反映して、特に Topics、FLEDGE、および Attribution Reporting API に関する質問とフィードバックが寄せられました。

現在のレポート期間の終了後に受け取ったフィードバックには、考慮された Chrome の対応がまだ含まれていない可能性があります。

{% Details %} {% DetailsSummary %}

**頭字語の用語集**

{% endDetailsSummary %}

<dl>
<dt>CHIPS</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/chips/">独立してパーティション化された状態を持つ Cookie</a></p></dd>
<dt>DSP</dt>    <dd>デマンドサイド プラットフォーム</dd>
<dt>FedCM</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/fedcm/">Federated Credential Management</a></p></dd>
<dt>FPS</dt>    <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/first-party-sets/">First-Party Sets</a></p></dd>
<dt>IAB</dt>    <dd><p data-md-type="paragraph"><a href="https://www.iab.com/">インタラクティブ広告協会</a></p></dd>
<dt>IDP</dt>    <dd>アイデンティティプロバイダー</dd>
<dt>IETF</dt>   <dd><p data-md-type="paragraph"><a href="https://www.ietf.org/">インターネットエンジニアリングタスクフォース</a></p></dd>
<dt>IP</dt>     <dd>インターネットプロトコルアドレス</dd>
<dt>openRTB</dt>
<dd><p data-md-type="paragraph"><a href="https://iabtechlab.com/standards/openrtb/#:~:text=OpenRTB%20is%20the%20communication%20protocol,in%20the%20digital%20advertising%20industry.">リアルタイム入札</a></p></dd>
<dt>OT</dt>     <dd><p data-md-type="paragraph"><a href="/docs/web-platform/origin-trials/">オリジントライアル</a></p></dd>
<dt>PatCG</dt>  <dd><p data-md-type="paragraph"><a href="https://www.w3.org/community/patcg/">プライベート広告技術コミュニティグループ</a></p></dd>
<dt>RP</dt>    <dd>証明書利用者</dd>
<dt>SSP</dt>    <dd>サプライサイドプラットフォーム</dd>
<dt>TEE</dt>    <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/glossary/#tee">信頼できる実行環境</a></p></dd>
<dt>UA</dt>     <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">ユーザーエージェント文字列</a></p></dd>
<dt>UA-CH</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">User-Agent Client Hints</a></p></dd>
<dt>W3C</dt>    <dd><p data-md-type="paragraph"><a href="https://www.w3.org/">ワールドワイドウェブコンソーシアム</a></p></dd>
<dt>WIPB</dt>   <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/gnatcatcher/">Willful IP Blindness</a></p></dd>
</dl>

{% endDetails %}

## 一般的なフィードバック、API/テクノロジーの指定なし

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">テストとトライアル</td>
      <td style="vertical-align: top;">テスト開始までにプライバシー サンドボックス API が完了していない場合に CMA の評価を通知するためのテストの関連性</td>
      <td style="vertical-align: top;">プライバシー サンドボックス API の開発は急速に進んでいます。これらはすでにオリジンテストでテストできるように公開されており、この夏には 100% のトラフィックに対して一般利用できるようになる予定です。<br><br>また、2026 年以前には影響を受けない特定の機能（FLEDGE イベントレベルレポート、iframe を使用した FLEDGE レンダリングなど）のタイムラインを明確にしました。<br><br>私たちは、エコシステムが API をテストし、サードパーティ Cookie が廃止になった後にテスターが依存すると予想するものに基づいて CMA にフィードバックを提供することを推奨します。これは、サードパーティ Cookie の廃止による影響の可能性を評価する際に役立ちます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ユーザーコントロール</td>
      <td style="vertical-align: top;">プライバシーサンドボックス API のユーザーコントロールへの影響に関するエコシステムへの明確なガイダンス</td>
      <td style="vertical-align: top;">エコシステムがどのようなユーザーコントロールを使用できるかについて、法的なアドバイスを提供することはできません。同時に Chrome は、プライバシーサンドボックス テクノロジーを改善するための継続的な取り組みの一環として、更新されたプライバシーサンドボックス（「拡張広告プライバシー」）ユーザーコントロールをごく一部のユーザーに表示する実験を行っています。アップデートには、より明確で利便的な言語とレイアウトが含まれています。Chrome がこれらの改良点を評価し、より多くのユーザーに対象を拡大するかどうかを決定すれば、より多くの情報をエコシステムと共有できるようになります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">データ漏洩</td>
      <td style="vertical-align: top;">ブラウザが侵害された場合に、Google やその他のパーティにファーストパーティのデータが漏洩するリスク</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md">FLEDGE の Explainer</a> では、あるアドテックのデータが同一のアドテックと（ワークレットまたは信頼できるサーバーのいずれかで）共有されるか、そのアドテックによって明示的に共有される場合（バイヤーがセラーに希望する広告 URL を示す場合など）にのみ共有されることが明確に示されています。唯一の例外は、k-匿名性チェックはグローバルな集中サーバーによって実行する必要があることです。これは、私たちが引き続き多大なリソースを投入し続けている分野です。プライバシーについての私たちの考え方については、<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md">K-anonymity の Explainer</a> をご覧ください。<br><br>さらに、k-匿名性サーバーの設計で採用されているアドテック保護がどのように機能するかについて、より詳しい情報を提供することに前向きな姿勢を取っています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">追加のディスカッションフォーラム</td>
      <td style="vertical-align: top;">技術系以外のエコシステム関係者がフィードバックを共有するためのフォーラムを追加することを要求する W3C へのリクエスト</td>
      <td style="vertical-align: top;">
<a href="https://docs.google.com/forms/d/e/1FAIpQLSePSeywmcwuxLFsttajiv7NOhND1WoYtKgNJYxw_AGR8LR1Dg/viewform">プライバシーサンドボックスのフィードバックフォーム</a>は、技術的および非技術的な一般的なコメントと具体的なコメントに使用できます。<br> <a href="https://www.w3.org/community/web-adv">Improving Web Advertising Business Group</a> は、週次会議と <a href="https://github.com/w3c/web-advertising/issues">GitHub リポジトリ</a>を介したディスカッション用のフォーラムです。<br> developer.chrome.com のプライバシーサンドボックス<a href="https://developer.chrome.com/en/docs/privacy-sandbox/feedback/#proposals">フィードバック</a>ページでは、フィードバックの提供とディスカッションへの参加に関するその他の仕組みについて説明されています。Chrome では、質問やコンテンツの共有を促進するための公開オフィスアワーなどのイベントも引き続き開催しています。さらに、Chrome はこの四半期、十数件の業界イベントを主催または参加しました。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">タイムラインの明確化</td>
      <td style="vertical-align: top;">2023 年第 3 四半期の一般提供に関する正確な日付の明確化</td>
      <td style="vertical-align: top;">
<a href="http://privacysandbox.com/">PrivacySandbox.com</a> で公開されているタイムラインによれば、一般提供は Chrome バージョン 115 のリリースとともに展開を開始することを目標としています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">reCAPTCHA</td>
      <td style="vertical-align: top;">reCATPCHA のスパム検出ユースケースに対するサンドボックス API の影響</td>
      <td style="vertical-align: top;">プライバシーサンドボックスの提案がウェブの安全性や不正行為に重大な影響を与えないように、reCAPTCHA から定期的にフィードバックを受け取っています。同社はサードパーティ Cookie の廃止に備えた調整計画を独自に策定しているため、この質問は reCAPTCHA が回答するのが最も適切と言えます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Chrome 拡張機能</td>
      <td style="vertical-align: top;">Anti Covert Tracking（ACT）対策などのプライバシーサンドボックス テクノロジーは Chrome 拡張機能に適用されますか？</td>
      <td style="vertical-align: top;">ACT が Chrome 拡張機能に適用されるかどうかについての発表は行っていません。ただし、テクノロジーがユーザーに関する情報を秘密裏に収集すのであれば、これは当社のプライバシー原則に一致するものではないと言えます。</td>
    </tr>
  </tbody>
</table>

## 関連するコンテンツと広告の表示

### Topics

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
<tr>
<td style="vertical-align: top;">TAG デザインレビュー</td>
<td style="vertical-align: top;">TAG は Topics の初期デザインレビューをリリースしました。</td>
<td style="vertical-align: top;">私たちは Topics に継続して取り組んでおり、<a href="https://developer.chrome.com/docs/privacy-sandbox/topics/latest/#chromes-commitment-to-topics">最新の更新ページ</a>と<a href="https://github.com/w3ctag/design-reviews/issues/726#issuecomment-1424728951">こちらのイシュー</a>で Topics への取り組みに関する最新情報を共有してきました。私たちは TAG レビューに対しポイントごとに<a href="https://github.com/w3ctag/design-reviews/issues/726#issuecomment-1501975149">回答</a>し、<a href="https://privacysandbox.com/intl/en_us/news/working-together-to-build-a-more-private-internet/">より高いレベルのビジョンをここで</a>共有してきました。Topics API は、広告エコシステムが 2023 年中にテストすべき API コレクションの一部として残されます。テストに関するフィードバックや実装者の経験が、この分野でのクロスブラウザ標準に向けた今後の取り組みに貴重な貢献となることを願っています。私たちは、Topics API がブラウザ間の互換性を備えた合意された標準となる可能性のある移行を容易にする方法について、エコシステムとの連携を継続できることを楽しみにしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Topics へのアプローチ</td>
      <td style="vertical-align: top;">Chrome が Topics API を開発するために必要なオープンアプローチに対するサポート</td>
      <td style="vertical-align: top;">これへの賛同をありがたく思っています。エコシステム全体に価値を提供する Topics API を開発するために業界グループと協力し続けることを楽しみにしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">（2022 年第 3 四半期にも報告）<br>トピック分類が十分に細分化されていない</td>
      <td style="vertical-align: top;">広範なトピック分類には、地域固有のトピックなど、より詳細なトピックが含まれていません。</td>
      <td style="vertical-align: top;">第 1 四半期の更新:<br> <br> 分類法の改善は継続的な取り組みであり、第 2 四半期に Topics API の分類法の更新を発表する予定です。この新しい分類法を構築するために、私たちはエコシステム全体の企業と緊密な連携を図りました。<br>私たちは、エコシステムに最も役立つ分類法に関するフィードバックを積極的に求めています。トピックの数を増やすか、より詳細なトピックを含めるかを評価する際には、1）潜在的なプライバシーへの影響（トピックが増えるとフィンガープリンティングのリスクが生じる可能性がある）、および 2）以前に観察されたトピックを取得する機能（トピックを増やすなどすると、アドテックが過去に選択トピックを見た可能性が低くなる可能性がある）を含むいくつかの考慮事項があります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">（2022 年第 4 四半期にも報告）<br>ファーストパーティシグナルへの影響</td>
      <td style="vertical-align: top;">トピック シグナルは非常に価値がある可能性があり、その結果、他のファースト パーティのインタレスト ベース シグナルの価値が低下してしまいます。</td>
      <td style="vertical-align: top;">私たちはインタレストベース広告がウェブの重要なユースケースであると信じており、Topics はそのユースケースをサポートするように設計されています。一部の大規模なサイト運営者が、Topics によって自社のファーストパーティデータ戦略に悪影響が及ぶを懸念していることを私たちは理解しています。私たちは、Topics がパブリッシャーに与える影響についてのインサイトを提供するエコシステムテストを楽しみにしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">広告関連以外の Topics のユースケース</td>
      <td style="vertical-align: top;">インタレストベース広告の表示以外の目的での Topics の使用</td>
      <td style="vertical-align: top;">Topics は、インターレストベース広告のユースケースに対処するように設計されています。これは、無料でオープンなウェブにとって重要なユースケースであると考えられます。現在、他のユースケースに関するフィードバックを求めており、評価中です。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">デフォルトのオプトインステータス</td>
      <td style="vertical-align: top;">Topics の同意不履行に対する地域的な法規制の影響</td>
      <td style="vertical-align: top;">法的見解についてコメントする立場にありません。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">（2022 年第 3 四半期にも報告）<br>誤って分類されたサイト</td>
      <td style="vertical-align: top;">特定のサイトのトピックが誤って分類された場合の広告ターゲティング</td>
      <td style="vertical-align: top;">第 1 四半期の更新:<br>第 2 四半期に、Topics API の分類子の更新を発表し、それに関するエコシステムとの連携を楽しみにしています。<br>現在のフィードバックに対応し、サイトは、最も人気のあるサイトを含む、人間が精選したオーバーライドリストと、オンデバイス ML モデルを組み合わせて分類されます。Chrome では、トピックの分類に貢献するサイトのオプションを引き続き評価しています。ユーティリティの改善は、プライバシーと悪用のリスクと比較検討する必要があります。たとえば、次のようなリスクがあります。さまざまな（そして潜在的に機密性の高い）意味をトピックにエンコードする方法として自己ラベル付けを使用するサイト、金銭的利益のためにトピックを偽って伝えているサイト、他のユーザーにとっての有用性を鈍らせるためにトピックを攻撃するサイト（たとえば、無意味なノイズでユーザーのトピックをスパムするなど）です。<code>chrome://topics-internals</code> またはこちらの <a href="https://colab.research.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn?usp=sharing">colab</a> で提供されているツールを使用して、一般にこれらのコンポーネントを調べることができます。テストを通じて、時間の経過とともに分類が改善されることを期待しており、誤って分類される可能性のあるサイトの例に関する<a href="https://developer.chrome.com/docs/privacy-sandbox/feedback/#feedback-routes">フィードバックを歓迎</a> しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Topics の分類子</td>
      <td style="vertical-align: top;">デバッグ目的で呼び出し元に「No Topics」が返された場合に、その理由を示す追加情報を返すよう要求します。</td>
      <td style="vertical-align: top;">開発者が Topics API をシステムに統合する際にデバッグツールが役立つことを理解しており、高く評価しています。ただし、追加情報（トピックが返されなかった理由など）を公開することにより、関係者が追加の詳細を意図を超えて明らかにできる情報（ユーザーがシークレットモードを使用している場合、API を無効にしている場合など）を誤って共有してしまえば、ユーザープライバシーを侵害する可能性があります。現時点では追加のデバッグツールを提供する予定はありませんが、どのツールに価値があるかについてのフィードバックをお待ちしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">個人情報検索（PIR）</td>
      <td style="vertical-align: top;">Topics APIに個人情報検索を導入するリクエスト</td>
      <td style="vertical-align: top;">PIR の使用については以前に調査し、<a href="https://github.com/patcg-individual-drafts/topics/issues/142">そのトレードオフをこちらで共有</a>しました。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">入札ストリーム</td>
      <td style="vertical-align: top;">入札ストリームでは、トピックはセラーが定義したオーディエンスとは区別して表示されますか？</td>
      <td style="vertical-align: top;">Topics API は Chrome によって開発されたプライバシーサンドボックスの提案であり、IAB Tech Lab の <a href="https://iabtechlab.com/sda/">Seller-Defined Audiences</a> 提案とは異なります。私たちは、この 2 つが入札ストリーム内で明確に表現されることを期待しています。<a href="https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/extensions/community_extensions/segtax.md">OpenRTB 入札リクエストでトピックがどのように表現されるか</a>についてお読みください。</td>
    </tr>
  </tbody>
</table>

### Protected Audience API（旧 FLEDGE）

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">FLEDGE 機能の可用性</td>
      <td style="vertical-align: top;">Fenced Frame の強制、k-匿名性といった FLEDGE 機能のテストと実装のタイムラインの明確化</td>
      <td style="vertical-align: top;">対象範囲が限定されたさまざまな FLEDGE 機能とそれらのサポート時期に関する<a href="https://developer.chrome.com/docs/privacy-sandbox/fledge-api/feature-status/">ブログ投稿を共有</a>しました。 FLEDGE の開発を継続するにあたり、この発表に関する追加のフィードバックをお待ちしております。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">プロダクトレンダリングに関する制限</td>
      <td style="vertical-align: top;">FLEDGE Fenced Frames の「複数のピースで構成される広告の制限」を緩和するリクエスト</td>
      <td style="vertical-align: top;">
<a href="https://developer.chrome.com/docs/privacy-sandbox/fledge-api/feature-status/">2 月に発表</a>したように、Fenced Frames の使用は少なくとも 2026 年まではオプションのままであり、iframe の動作は urn-iframes によってサポートされます。このテーマについてさらなるディスカッションを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">スケーラビリティに関するイシュー</td>
      <td style="vertical-align: top;">使用量に応じた FLEDGE のパフォーマンス</td>
      <td style="vertical-align: top;">私たちは、実用的な解決策を提案できるよう、フィードバックを積極的にフォローアップし、より多くの状況の理解に努めています。最初のステップは、フィードバックを 2 つのカテゴリに分類することでした。<br><ol>
<li> a) SSP 自体と b) DSP の両方に対する秒間クエリ（QPS）負荷を最適化する SSP 駆動のフィルタリング。</li>
<li> DSP 上の QPS 負荷を最適化するためのインタレスト グループの DailyUpdate ロジック。</li>
</ol>
</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">（2022 年第 3 四半期にも報告）<br>入札ロジックの可視性</td>
      <td style="vertical-align: top;">DSP 入札ロジックが JavaScript で公開されるのではないかという懸念</td>
      <td style="vertical-align: top;">第 1 四半期の更新:<br><br>敵対者が探索的（強制ブラウジング）にサーバーにデータを要求する能力を制限する<a href="https://github.com/WICG/turtledove/issues/442">提案を共有</a>しました。エコシステムの関係者がこの提案に対するフィードバックやサポートを共有することを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">テストの難度</td>
      <td style="vertical-align: top;">小規模な DSP が FLEDGE を適切にテストし、広告主が大規模な DSP でのテストのみに関心を持つリスクを軽減する機能。</td>
      <td style="vertical-align: top;">私たちは小規模な DSP との連携に注力しており、FLEDGE の一般提供に向けて、あらゆる規模の DSP および広告主の間でテストを拡大することを強く推奨しています。私たちは、エコシステム内の他の企業と FLEDGE をテストする際に、どのように最適に支援できるかを知りたいと思っています。また、広告主に小規模な DSP でテストするよう促すためのアイデアや業界の取り組みを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">動的リマーケティング</td>
      <td style="vertical-align: top;">サードパーティ Cookie の廃止後も FLEDGE で動的リマーケティングは可能ですか？</td>
      <td style="vertical-align: top;">私たちはこの質問への回答を検討しており、動的リマーケティングをどのように使用する予定であるかについて、エコシステム関係者にさらなるインサイトの共有を求めています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">不正と悪用</td>
      <td style="vertical-align: top;">エコシステムがリスクを軽減し、バッドアクターや悪意のあるバイヤーが自らを望ましいオーディエンスとして位置づけられないようにするには？</td>
      <td style="vertical-align: top;">詐欺や不正行為に関してエコシステム関係者とさらに連携することを楽しみにしており、この分野でのより多くのフィードバックをお待ちしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ユーザー設定</td>
      <td style="vertical-align: top;">ユーザー設定を保存して、広告の選択に使用するプロセス</td>
      <td style="vertical-align: top;">特定の広告については、関連するアドテックが、表示されるクリエイティブや選択方法を制御するのに最適な立場にあります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">定量テストの提案</td>
      <td style="vertical-align: top;">定量テストを公平に行うには、サードパーティ Cookie を使用しないトラフィック、または FLEDGE のみを使用する SSP を使用したトラフィックでテストを実施する必要がありますか？サードパーティ Cookie からのシグナルが混合するのを回避するにはどうすればよいですか？</td>
      <td style="vertical-align: top;">このフィードバックに感謝しています。CMA と協力して、サードパーティ Cookie の廃止とプライバシーサンドボックス提案の導入がエコシステムに与える影響について、信頼できる全体像を提供する実験を計画しています。CMA の定量テスト提案に関する追加のフィードバックは、CMA と直接共有することをお勧めします。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">より明確なドキュメント</td>
      <td style="vertical-align: top;">オークションの構成に関するより明確なドキュメントのリクエスト</td>
      <td style="vertical-align: top;">今後数週間以内に、FLEDGE オークションレポートに関する概要を追加したブログ記事を共有したいと考えています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">並列化</td>
      <td style="vertical-align: top;">入札およびオークション（B&amp;A）サービスは並列化をサポートしますか？</td>
      <td style="vertical-align: top;">入札/オークションサーバーを使用するアドテックは、結果を並行して提供できるサーバーを複数起動できます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">悪用の緩和</td>
      <td style="vertical-align: top;">プライベートステートトークンを使用する FLEDGE k-匿名性サーバーは、ユーザーのプライバシーを十分に確保できますか？</td>
      <td style="vertical-align: top;">k-匿名性の動機は、マイクロターゲティングではなく、FLEDGE がイベントレベルのレポートを可能にする中間段階で何らかのバックストップを設けることに重点を置いています。私たちはさらに多くの意見を共有しており、<a href="https://github.com/WICG/turtledove/issues/484">追加のフィードバックを歓迎します</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ES モジュールの競合</td>
      <td style="vertical-align: top;">ES モジュールと競合するため、グローバル関数としての <code>generateBid</code> を削除するリクエスト</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/turtledove/issues/444">このリクエストについて協議中</a>であり、追加のフィードバックを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">コンポーネントオークション</td>
      <td style="vertical-align: top;">オークションのデザインをサイト運営者がより細かく制御できるようにするリクエスト</td>
      <td style="vertical-align: top;">入札とオークションは、Chrome オンデバイスと同様に、コンポーネントオークションをサポートする予定です。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">B&amp;A のタイムライン</td>
      <td style="vertical-align: top;">B&amp;A サーバーのテストに関心のあるアドテック向けのタイムラインの明確化</td>
      <td style="vertical-align: top;">CMA との調整を経て、B&amp;A の Explainer を更新し、Chrome-B&amp;A テストのさまざまなフェーズのタイムラインの明確な定義を含めるように<a href="https://github.com/privacysandbox/fledge-docs/blob/main/bidding_auction_services_api.md#timeline">タイムラインセクションを更新しました</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">タイムアウト制御スキーム</td>
      <td style="vertical-align: top;">現在 FLEDGE で利用できるタイムアウト制御スキームの強化</td>
      <td style="vertical-align: top;">これは興味深い提案です。これを検討すべき提案のキューに追加し、開発状況について報告します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クリエイティブ ビッドストリーム</td>
      <td style="vertical-align: top;">クリエイティブに基づいてレビューし、落札入札をフィルタリングする機能</td>
      <td style="vertical-align: top;">これは興味深い提案です。これを検討すべき提案のキューに追加し、開発状況について報告します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;"><code>reportWin</code></td>
      <td style="vertical-align: top;">
<code>reportWin</code> 関数の落札者以外に、別のインタレストグループ所有者からの最高スコア入札に関する追加情報を提供する提案</td>
      <td style="vertical-align: top;">これは興味深い提案です。集計レポートに追加のシグナルを追加することを検討します。<a href="http://github.com/WICG/turtledove/issues/462">こちらで追加のフィードバックを歓迎します</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">イベントの種類</td>
      <td style="vertical-align: top;">FLEDGE と統合した場合の測定 API 全体におけるイベントタイプの標準化</td>
      <td style="vertical-align: top;">これは興味深い提案です。これを検討すべき提案のキューに追加し、開発状況について報告します。FLEDGE 以外のプライバシーサンドボックス API に影響を与える可能性があるため、この分野における広範な取り組みとの調整が必要になります。<a href="https://github.com/WICG/turtledove/issues/451">追加のフィードバックもこちらでお待ちしております</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">イベントレベルレポートの長期的なソリューション</td>
      <td style="vertical-align: top;">サードパーティ Cookie の廃止後も、<code>highestScoringOtherBid</code> などの特定のデータを利用可能に維持することへの関心</td>
      <td style="vertical-align: top;">
<a href="https://developer.chrome.com/docs/privacy-sandbox/fledge-api/feature-status/">2 月のブログ記事</a>で説明したように、イベントレベルのオークション落札レポートは「少なくとも 2026 年まで」サポートされます。現時点で共有できる詳細はありませんが、サードパーティ Cookie の廃止後も特定のデータを利用可能な状態にしておくことが重要である理由についての追加のフィードバックを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">インタレストグループの制限</td>
      <td style="vertical-align: top;">オリジンが単一のブラウザを追加できるインタレストグループの数の制限は？</td>
      <td style="vertical-align: top;">Chrome では、オーナーあたり最大 1,000 個のインタレストグループ、および最大 1,000 個のインタレストグループオーナーを許可しています。これらはガードレールとしての役割を果たしており、通常の操作では到達しないように設計されています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">イベントレベルのシグナル</td>
      <td style="vertical-align: top;">機械学習トレーニングで使用できる、<code>generateBid</code> および <code>reportWin</code> のイベントレベルのシグナルを用意することへの賛同</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/turtledove/issues/435#issuecomment-1453921534">ブラウザ設計のシグナルとアドテック定義のシグナルに関する決定はこちら</a>で共有しました。追加のフィードバックを歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">入札スクリプト</td>
      <td style="vertical-align: top;">入札スクリプトへの URL にユーザー ID を含める。</td>
      <td style="vertical-align: top;">FLEDGE には、インタレストグループのオーナー、入札スクリプト URL、およびレンダリングされたクリエイティブのタプルが k-匿名である必要があるという広告表示の追加要件があるため、これは不可能です。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">K-匿名性の実施</td>
      <td style="vertical-align: top;">k-匿名性は (componentAd, size) ペアに適用されますか？</td>
      <td style="vertical-align: top;">はい、そうなります。 <a href="https://github.com/WICG/turtledove/issues/312">Turtledove/issues/312</a> を参照してください。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">入札およびオークション サービスの要件</td>
      <td style="vertical-align: top;">B&amp;A サービスは、オンデバイスの FLEDGE やその他の B&amp;A サービスを使用するものと統合する参加者をどのようにサポートしますか？</td>
      <td style="vertical-align: top;">デザインを最終調整中であり、<a href="https://github.com/privacysandbox/fledge-docs/issues">こちらで追加のフィードバックを歓迎しています</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ポストビューアトリビューション</td>
      <td style="vertical-align: top;">ポストビューアトリビューションはサポートされますか？</td>
      <td style="vertical-align: top;">現在、ビューアビリティに関する標準的な定義はなく、クリエイティブ自体に依存してビューイベントをマークしています。<a href="https://github.com/WICG/turtledove/issues/452">Turtledove/issues/452</a> をご覧ください。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">類似ターゲティング</td>
      <td style="vertical-align: top;">プライバシーサンドボックスは「類似ターゲティング」をサポートできますか？</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/turtledove/issues/26">こちらでユースケースについて</a>議論しており、追加の意見を歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">リアルタイム監視 API</td>
      <td style="vertical-align: top;">リアルタイム FLEDGE 監視アプローチの提案</td>
      <td style="vertical-align: top;">この提案について議論しており、<a href="https://github.com/WICG/turtledove/issues/430">こちらで追加の意見を歓迎</a>しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">FLEDGE レポート</td>
      <td style="vertical-align: top;">過剰または過小レポートを防ぐために、<code>reportWin</code>と <code>reportResult</code> はランダムな順にする必要があります。</td>
      <td style="vertical-align: top;">
<code>reportResult()</code> からのセラーのシグナルが <code>reportWin()</code> に含められるように、先にセラーが <code>reportResult()</code> を実行してからバイヤーが <code>reportWin()</code> を実行する必要があります。詳細については、<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md">Explainer</a> をご覧ください。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">カスタム Key-Value（K/V）サーバー</td>
      <td style="vertical-align: top;">カスタム K/V サーバーは将来サポートされますか？</td>
      <td style="vertical-align: top;">
<a href="http://github.com/privacysandbox/fledge-key-value-service/issues/6">こちらでこの質問について議論</a>しており、追加の意見があれば歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">トップレベルのオークション</td>
      <td style="vertical-align: top;">トップレベルオークションの仕組みを実行するには誰かが広告サーバーである必要がありますか？</td>
      <td style="vertical-align: top;">FLEDGE API は、どのパーティがそれを呼び出す必要があるかを指定しません。FLEDGE の設計にはそのような意味での要件はありません。FLEDGE オークション（マルチセラーオークションを含む）は誰でも実行できます。<a href="/docs/privacy-sandbox/feedback/report-2022-q4">2022 年第 4 四半期レポート</a>で述べたように、FLEDGE では、各サイト運営者が、トップレベルおよびコンポーネントセラーの選択を含め、オークションの構造を選択することができます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">API のスコープ</td>
      <td style="vertical-align: top;">FLEDGE はファーストパーティ データを操作することを意図していますか？</td>
      <td style="vertical-align: top;">2023 年第 2 四半期に、ファーストパーティ データが実際に FLEDGE で 1）インタレストグループのメンバーシップを決定するロジックとして使用することと、2）その後の入札ロジック生成で使用するユーザー入札シグナルとしてフィードすることの両方に使用できること説明するコンテンツを公開する予定です。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クロスドメイン インタレストグループ</td>
      <td style="vertical-align: top;">クロスドメイン インタレストグループを作成する可能性</td>
      <td style="vertical-align: top;">ブラウザをインタレストグループに追加するときに入手可能な情報は、そのオーディエンスに通知するために使用できます。サードパーティ Cookie が段階的に廃止されると、インタレストグループの作成を通知するためのクロスサイト データの公開が制限されます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クライアントサイド入札ロジック</td>
      <td style="vertical-align: top;">既存のサーバーサイド入札ロジックをクライアントサイドに移植する</td>
      <td style="vertical-align: top;">移植プロセスにおいてどの領域が困難であるか、または現在不足している領域についてさらに詳しく知りたいと考えています。<a href="https://github.com/WICG/turtledove/issues">追加のフィードバックやインサイトを歓迎しています</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">K/V サーバーの値</td>
      <td style="vertical-align: top;">K/V サーバーの値は文字列型である必要がありますか？</td>
      <td style="vertical-align: top;">値は文字列である必要がありますが、オブジェクトを JSON またはプロトコル バッファーに保存し、文字列にシリアル化することができます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">広告主のブロックリスト</td>
      <td style="vertical-align: top;">バイヤーに広告主のブロックリストを提供するにはどのシグナルが適切でしょうか？</td>
      <td style="vertical-align: top;">
<code>auctionSignals</code> または <code>perBuyerSignals</code> のいずれかが適切です。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">入札単位</td>
      <td style="vertical-align: top;">CPI や CPM などのさまざまな入札単位のサポート</td>
      <td style="vertical-align: top;">現在の設計を考慮すると、なぜこれが必要なのかをさらに詳しく知りたいので、<a href="https://github.com/WICG/turtledove/issues">追加のフィードバック</a>をお待ちしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">オークションロジック</td>
      <td style="vertical-align: top;">オークションの落札者を決めるのはブラウザですか、それとも広告サーバーですか？</td>
      <td style="vertical-align: top;">落札者の選択はすべてサンドボックス内で実行され、すべての決定はセラーのコードによって行われます。ブラウザは単に、バイヤーとセラーのコードが実行される密閉されたプライベート環境を提供するにすぎません。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">アクセス許可ポリシー</td>
      <td style="vertical-align: top;">現在の FLEDGE アクセス許可ポリシーは、オリジントライアルが終了した後も引き続き適用されますか？</td>
      <td style="vertical-align: top;">オリジントライアルの場合、両方の機能の現在のデフォルトの許可リストは一時的なものであり、変更される予定です。変更の実施が開始される前に、アドテックが変更にどれくらいの準備期間を必要とするかを知りたいと考えています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">シグナルサイズの制約</td>
      <td style="vertical-align: top;">Trusted Bidding Signals リクエストは、同じ <code>trustedBiddingSignalsUrl</code> を持つ複数のインタレストグループにわたって結合されます。そのため、2MB のサイズ制限が制約となります。</td>
      <td style="vertical-align: top;">この制約は、デバイス上のリソースが過剰に使用されるのを防ぐために、オンデバイスの呼び出し元に対して存在します。B&amp;A サーバーからの呼び出しには、<a href="https://github.com/WICG/turtledove/issues/492">より緩やかな制約</a>が適用されます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">シグナルの報告</td>
      <td style="vertical-align: top;">追加のシグナル script-errors を追加して、インタレストグループのオーナーごと、および <code>computeBid</code> または <code>reportWin</code> / <code>reportResult</code> ごとのクライアント側エラーの数を取得できるようにします。</td>
      <td style="vertical-align: top;">私たちはこの提案に対する潜在的なプライバシーの懸念を考慮しており、これが必要な理由について、エコシステム関係者からのさらなるインサイトの共有を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">K-Anon ウィンドウサイズ</td>
      <td style="vertical-align: top;">K-Anon ウィンドウ サイズを現在の 7 日間の制限から増やす。</td>
      <td style="vertical-align: top;">これは検討中であり、現在エコシステムからの<a href="https://github.com/WICG/turtledove/issues">追加の意見</a>をお待ちしています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">デバイスのパフォーマンス</td>
      <td style="vertical-align: top;">ユーザーが多数のインタレストグループに属している場合、FLEDGE はデバイスのパフォーマンスをどのように処理しますか？</td>
      <td style="vertical-align: top;">FLEDGE は、SSP と DSP にわたっていくつかのタイムアウト、優先順位付け、および制限のオプションを提供します。これにより、デバイスが多数のインタレストグループに含まれている場合に、デバイスのパフォーマンスがオークションへの参加を制限する理由の 1 つになる可能性がある状況で、アドテックがきめ細かい制御を行うことができます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">B&amp;A サービスのテスト</td>
      <td style="vertical-align: top;">デバッグに利用できるログを増やすために、テスト段階で独自のサーバーを使用するというエコシステム関係者へのリクエスト</td>
      <td style="vertical-align: top;">B&amp;A を使用すると、ユーザーは承認されたクラウドプロバイダーからサーバーを起動して拡張できます。ユーザーのプライバシーを維持するために、実行は信頼できる実行環境（TEE）内で行われるように強制されます。B&amp;A TEE のデバッグに関する Explainer を近々リリースする予定であり、それをサポートする機能を開発中です。このトピックに関する<a href="https://github.com/privacysandbox/fledge-docs/issues">追加のフィードバックを求めています</a>。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">規制要件</td>
      <td style="vertical-align: top;">FLEDGE はさまざまな国のクラウドプロバイダーと協力して、現地の規制要件への準拠をサポートしますか？</td>
      <td style="vertical-align: top;">他のクラウドプロバイダーに関する提案を常に受け付けていますが、現時点では、サードパーティ Cookie の廃止が施行された場合には、少なくとも GCP と AWS をサポートする予定です。詳細については、<a href="https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#cloud-platform">こちらの Explainer</a> をご覧ください。</td>
    </tr>
  </tbody>
</table>

## デジタル広告の測定

### アトリビューション レポート（およびその他の API）

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">ノイズ影響データ解析</td>
      <td style="vertical-align: top;">ノイズの影響に関するデータ解析の実行方法に関するガイダンス</td>
      <td style="vertical-align: top;">アドテックのデータに対するノイズの影響を変更するために使用できる、ノイズと設計上の決定に関する<a href="https://developer.chrome.com/docs/privacy-sandbox/summary-reports/design-decisions/">追加のドキュメント</a>を共有しました。<br><br><a href="https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit">より詳細なガイド</a>も提供されています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Null レポート</td>
      <td style="vertical-align: top;">null レポートの実装を明確にする</td>
      <td style="vertical-align: top;">現在、null レポートを実装するための提案に取り組んでおり、近日詳細を共有する予定です。null レポートを実装すると、<a href="https://github.com/WICG/attribution-reporting-api/issues/738">プライバシーを損なうことなくレポートの遅延を減らす</a>ことができます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ノイズレベル</td>
      <td style="vertical-align: top;">アトリビューションウィンドウの長さに基づいてノイズレベルを調整する</td>
      <td style="vertical-align: top;">この提案を歓迎しており、仕様に追加することを検討しています。<a href="https://github.com/WICG/attribution-reporting-api/issues/734">追加のフィードバックをこちら</a>でお待ちしております。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">トリガーデータサイズ</td>
      <td style="vertical-align: top;">トリガーデータのサイズが 3 ビットに制限されているのはなぜですか？</td>
      <td style="vertical-align: top;">ユーザーに関するクロスサイト/コンテキスト情報の量が確実に制限されるように、サイズは 3 ビットと 8 つの個別の値に制限されています。イベントレベルレポートの現在のパラメータ化が意味があるかどうかについて、エコシステム関係者からの<a href="https://github.com/WICG/attribution-reporting-api/issues/694">フィードバックの提出</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">イベントレベルレポートのトリガー</td>
      <td style="vertical-align: top;">デデュープリケーション（重複排除）キー内での優先順位付けを可能にする</td>
      <td style="vertical-align: top;">この問題の<a href="https://github.com/WICG/attribution-reporting-api/issues/700">解決策を模索中</a>です。追加の意見を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">デバッグサポート</td>
      <td style="vertical-align: top;">サードパーティ Cookie 廃止後のデバッグの明確化</td>
      <td style="vertical-align: top;">サードパーティ Cookie 廃止後のデバッグをサポートしたいと考えており、オプションを検討中です。<a href="https://github.com/WICG/attribution-reporting-api/issues/705">さらなるフィードバックやアイデア</a>を求めています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クリックスルーコンバージョンの代替手段</td>
      <td style="vertical-align: top;">クリックスルーコンバージョンの代替手段に関するさらなるガイダンスのリクエスト</td>
      <td style="vertical-align: top;">該当するコンバージョン測定のユースケースに、耐久性のあるプライベート測定システムとして Attribution Reporting API を使用することをエコシステムに推奨します。他の代替手段も存在し、アドテックプロバイダーは、希望するプライバシーとユーティリティのニーズに基づいて適切なソリューションを決定する必要があります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">請求のユースケース</td>
      <td style="vertical-align: top;">アトリビューションレポートがコンバージョンベースの請求のユースケースをサポートする範囲を明確にする</td>
      <td style="vertical-align: top;">請求における Attribution Reporting API の範囲を明確にするために、公開に向けて取り組んでいます。Attribution Reporting API は当初、CPA 請求を直接サポートする方法でスコープ設定されていませんでした。CPC および CPM 請求をサポートしています。これは、ほとんどのアドテックが使用する請求構造です。<br>これは、追加のエコシステムに関するフィードバックがあれば、将来的にサポートされる可能性があります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ユースケースのサポート</td>
      <td style="vertical-align: top;">測定 API のユースケースのドキュメント</td>
      <td style="vertical-align: top;">すべてのプライバシーサンドボックスのレポート面に関するドキュメントを明確にすることに取り組んでいます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クリックの品質</td>
      <td style="vertical-align: top;">広告の意図的なクリックと意図的でないクリックを区別するためのシグナルを追加するリクエスト</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/attribution-reporting-api/issues/693">このリクエストについて議論中</a>であり、追加の意見を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">測定ソリューション</td>
      <td style="vertical-align: top;">複数の DSP にわたる測定ソリューションのサポート</td>
      <td style="vertical-align: top;">Attribution Reporting API は、測定プロバイダーが複数の DSP 間の重複を排除するために使用できます。さらに、<code>attributionsrc</code> での URL リストのサポートを<a href="https://github.com/WICG/attribution-reporting-api/issues/718">提案しています</a>。これにより、DSP が測定プロバイダーの Attribution Reporting API リクエストをサポートしやすくなります。上記の提案に関する追加のフィードバックをお待ちしております。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">イベントレベルレポート</td>
      <td style="vertical-align: top;">レポートが直接送信されるまでの日数を指定できるようするリクエスト</td>
      <td style="vertical-align: top;">このリクエストは、すでに、アドテックが現在入手可能な情報を使用して計算できるようになっています。このリクエストに関する他のエコシステムからのフィードバックはまだ聞いていませんが、フィードバックは歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;"><code>source_registration_time</code></td>
      <td style="vertical-align: top;">イベントレベルのアトリビューションレポートに <code>source_registration_time</code> を追加する</td>
      <td style="vertical-align: top;">このリクエストを検討しており、エコシステムの関係者がそれが便利な機能であると考えるかどうかについての追加のフィードバックを歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">シークレットモード</td>
      <td style="vertical-align: top;">ユーザーがシークレットモードを使用している場合でも測定ソリューションは利用できますか？</td>
      <td style="vertical-align: top;">いいえ。ユーザーがシークレットモードを使用している場合、測定ソリューションは利用できません。シークレットモードでは、サードパーティ Cookie がデフォルトでオフになっています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">データクリーンルーム</td>
      <td style="vertical-align: top;">測定 API はクリーンルームと互換性がありますか？</td>
      <td style="vertical-align: top;">典型的なデータクリーンルームは、さまざまなソースからの個人識別データがデータベースにアップロードされ、その基礎となるデータの結合に基づいて分析を実行する環境です。プライバシーサンドボックス API の 2 つの測定フレームワークは、イベントレベルレポートと要約レポートです。イベントレベルレポートには、データクリーンルームで使用できるアドテック提供のイベント ID が含まれていますが、関連するコンバージョン側の情報は限られており、ノイズが多くなります。暗号化された集計可能なレポートをクリーンルームで直接使用することはできませんが、集計サービスによって提供される概要結果は、実行する分析への入力として、または補足情報として使用できます。</td>
    </tr>
  </tbody>
</table>

### 集計サービス

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">（2022 年第 4 四半期にも報告）<br>レポートの遅延</td>
      <td style="vertical-align: top;">レポートの遅延はどのくらい期待されていますか？</td>
      <td style="vertical-align: top;">2023 年第 1 四半期の更新:<br><br>パートナーからのフィードバックを受けて、<a href="https://github.com/WICG/attribution-reporting-api/issues/738">遅延を短縮</a>し、<a href="https://github.com/WICG/attribution-reporting-api/issues/724">遅延の影響を軽減する</a>ための提案を共有しました。<br><br>どちらの提案も、WICG のミーティング中にアドテックによって支持されました。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">重複禁止ルール</td>
      <td style="vertical-align: top;">同じ共有 ID を持つ集計可能レポートがすでに処理されている場合、「遅延した集計可能レポート」をどのように処理しますか？</td>
      <td style="vertical-align: top;">
<a href="https://github.com/WICG/attribution-reporting-api/issues/724">集計 API における遅延損失の影響</a>に部分的に対処するために、集計可能なレポートの共有情報と集計サービスの共有 ID の定義に追加のレポート遅延を追加することに関する<a href="https://github.com/WICG/attribution-reporting-api/issues/724">提案を共有</a>しました。この提案に関するご意見をお待ちしております。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">データ処理</td>
      <td style="vertical-align: top;">プライバシーバジェットを使用して、差分プライバシーを尊重しながらデータの複数パスのサポートを有効にするリクエスト</td>
      <td style="vertical-align: top;">このユースケースを実現するために、より柔軟な方法でプライバシー バジェットを消費する可能性について議論しており、<a href="https://github.com/WICG/attribution-reporting-api/issues/732">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">（2022 年第 2 四半期にも報告）クエリの人間工学</td>
      <td style="vertical-align: top;">キーの集計のクエリを有効にする。</td>
      <td style="vertical-align: top;">2023 年第 1 四半期の更新:<br><br>機能リクエストはまだ検討中ですが、現時点では共有できる提案はありません。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">オリジントライアルの制限事項</td>
      <td style="vertical-align: top;">現在オリジントライアルでは適用されていない「重複禁止ルール」など、集計サービスの範囲を明確にする。</td>
      <td style="vertical-align: top;">私たちは、オリジントライアルと GA で利用できるものを明確にするためにドキュメントを更新することを検討しています。</td>
    </tr>
  </tbody>
</table>

### Private Aggregation API

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">プライベート集計のコントリビューションバジェット</td>
      <td style="vertical-align: top;">L1 コントリビューションバジェットは制限が多すぎます。</td>
      <td style="vertical-align: top;">Private Aggregation API への各呼び出しはコントリビューションと呼ばれます。ユーザーのプライバシーを保護するため、個人から集められるコントリビューションの数は制限されています。<br>すべての集計キーにわたるすべての集計可能な値を合計する場合、その合計はコントリビューションバジェット未満である必要があります。<br><br>現在の設計では、過去 24 時間以内の特定のレポート作成元に対するコントリビューションに制限を設定しています（ローリング ウィンドウとして）。それがフィードバックで言及されている L1 コントリビューションバジェットです。開発者には、予想される量に基づいてコントリビューション値を調整することをお勧めします（つまり、値 1 を単に使用するのではありません）。したがって、予算を使い果たさないように、より一般的なイベントには小さい値を使用することが合理的である可能性があります。<br><br>現在、Private Aggregation API の<a href="https://github.com/patcg-individual-drafts/private-aggregation-api/issues/23">コントリビューションバジェット</a>について、数値境界と範囲の両方についてフィードバックを求めています。スコープをオリジンごとからサイトごとに移動し、既存の境界を 10 分のウィンドウに移動し、より大きな日次境界を設定することを検討しています。</td>
    </tr>
  </tbody>
</table>

## 隠されたトラッキングの制限

### ユーザーエージェント削減/User-Agent Client Hints

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">UA-R採用</td>
      <td style="vertical-align: top;">英国の上位 10,000 サイトのうち、HTTP クライアントヒントを送信しているプログラマティック広告使用のサイトはわずか 1% にすぎません。移行していない DSP は、不正防止機能に影響を与える可能性があります。</td>
      <td style="vertical-align: top;">同じデータセットで分析を実行した後、HTML &lt;meta&gt; タグと JavaScript API を介して UA-CH の使用を考慮すると、UA-CH を使用するサイトの数がフィードバックで提供された 1% という数字よりも大幅に多いことがわかりました。これと、エコシステムからのフィードバックを含むその他の事実に基づいて、CMA に情報を提供しつつ、<a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/zVOEHwgyyu4/m/dv1tJQEJAgAJ">公開されたタイムライン</a>に従って、UA 削減のフェーズ 6 の段階的な展開を確信して進めていくことができます。サイトには移行の準備に 2 年近くのリードタイムがあり、準備が整っていないと思われるサイトにはデプリケーショントライアルがまだ利用可能であることに注意してください。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">追加のフォームファクターに関するヒント</td>
      <td style="vertical-align: top;">TV、VR などの追加のフォームファクターを提供するための UA-CH へのリクエスト</td>
      <td style="vertical-align: top;">この提案を歓迎しており、設計に組み込むことを検討しています。<a href="https://github.com/WICG/ua-client-hints/issues/333">追加のフィードバック</a>もお待ちしております。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">自動テスト</td>
      <td style="vertical-align: top;">UAR フェーズ 6 が出荷される前にヘッドレス Chrome の UA-CH バグを解決するリクエスト</td>
      <td style="vertical-align: top;">
<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1212793">問題とされているバグ</a>は修正されました。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">iOS での UA-CH のサポート</td>
      <td style="vertical-align: top;">広告ユースケースの詳細な UA 情報に依存しているサイトでは、iOS 上の Chrome はサポートされていないと記載されています。</td>
      <td style="vertical-align: top;">Safari 以外の iOS ブラウザ（iOS 上の Chrome を含む）の場合、UA-CH を有効にする前に、WebKit プロジェクトで UA-CH のサポートを追加する必要があります（ネットワーク スタックを制御するため）。</td>
    </tr>
  </tbody>
</table>

### IP 保護（旧 Gnatcatcher）

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">（第 4 四半期にも報告）地理位置情報のユースケース</td>
      <td style="vertical-align: top;">IP 保護によって、ジオロケーションに基づくコンテンツのパーソナル化など、正当なジオロケーションのユースケースを機能させなくなる可能性があります。</td>
      <td style="vertical-align: top;">2022 年第 4 四半期からの変更はありません:<br><br> <em>&nbsp;Google は、Chrome が引き続き IP アドレスの正当なユースケースをサポートできるように、関係者と協力して取り組んでいます。IP ジオロケーションの粒度に関する<a href="https://github.com/spanicker/ip-blindness/issues/20">エコシステムのフィードバック</a>を受け付けています。</em>
</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">規制コンプライアンス</td>
      <td style="vertical-align: top;">地域の人口が 100 万人未満の場合、IP 保護の現在のしきい値が 100 万であるため、ウェブサイトは法規制遵守の目的で IP アドレスを使用できなくなります。</td>
      <td style="vertical-align: top;">関係者と協力して、Chrome が IP アドレスの正当なユースケースを引き続きサポートできるように取り組んでいます。現在、IP 保護に関する規制コンプライアンスについて、エコシステムからフィードバックを求めています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">悪用の緩和</td>
      <td style="vertical-align: top;">パーティは、マスクされていない IP アドレスを他のパーティと共有することで、IP 保護を回避できます。</td>
      <td style="vertical-align: top;">現在の IP 保護提案では、パーティがマスクされていない IP アドレスを他のパーティと共有することを技術的に防止できない可能性があるというリスクを認識しており、この悪用のリスクを回避するための緩和策に取り組んでいます。<br><br>提案のイテレーションを行う中で、より多くのフィードバックと議論を奨励します。具体的には、パーティがマスクされていない IP アドレスを他のパーティと共有する必要があると思われるユースケースを知りたいと考えています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ネットワークのブロック</td>
      <td style="vertical-align: top;">パーティは、IP 保護プロキシを使用してネットワークのブロックを回避できます。</td>
      <td style="vertical-align: top;">このシナリオでは、ブロックを実行するエンティティは IP 保護を無効にする必要があります。私たちは<a href="https://github.com/GoogleChrome/ip-protection/issues/6">この問題に対応して</a>おり、追加のフィードバックを歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">IP 保護提案の影響を受ける IP アドレスブロックリスト</td>
      <td style="vertical-align: top;">多くのアドテック企業は、<a href="https://www.tagtoday.net/fraud">TAG データセンター IP リスト</a>などの IP アドレスの基本ブロックリストを利用して、不正である可能性が高い（または少なくとも収益化できない）広告枠への入札を防止しています。アドテックがトラッカーでもあり、知的財産保護提案の対象となる可能性がある場合、その企業は広告枠を購入する前に広告に対する基本的なチェックを実行できなくなる可能性があります。</td>
      <td style="vertical-align: top;">潜在的な問題と解決策について、知的財産保護提案に関する<a href="https://github.com/GoogleChrome/ip-protection">さらなるフィードバック</a>と議論を奨励します。1 つのオプションは、以前にフラグを立てた IP アドレスから発信されたクライアントをプロキシしないように、同様のリストを IP 保護に適用することです。</td>
    </tr>
  </tbody>
</table>

## サイト間プライバシー境界の強化

### First-Party Sets

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">（第4四半期にも報告）ドメイン制限</td>
      <td style="vertical-align: top;">関連ドメイン数の拡大リクエスト</td>
      <td style="vertical-align: top;">当社の対応は 2022 年第 4 四半期から変わりません。<br><br> <em>「 WICG のミーティングで、Chrome はユーザーのプライバシー上の利益も考慮した使いやすいソリューションを提供することに尽力していることを明確にしました。その意味で、ドメイン制限の影響を受ける可能性のある特定のユースケースについてコミュニティからの<a href="https://github.com/WICG/first-party-sets/issues">フィードバックをお待ちしています</a>。チームはユーザーのプライバシーを保護し続けながら、これらのユースケースに対処する方法を検討できると考えています。</em> 」</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">FPS の提出の代替方法</td>
      <td style="vertical-align: top;">FPS のグローバルリストを送信する代替方法の提案</td>
      <td style="vertical-align: top;">現時点では、Chrome で First-Party Sets（FPS）を出荷する準備を進めており、セットの提出を受け入れるための一元的な GitHub リポジトリをセットアップしています。サードパーティ Cookie の廃止に備えて、FPS が既存のウェブプラットフォームソリューションとのギャップを埋めることを期待しているため、サイト作成者が FPS をどのように活用しているかについて作成者から学べることを期待しています。時間の経過とともにセットのリストが増加し、エコシステムがサードパーティ Cookie 後の世界に適応するにつれて、提案されているような代替の配布スキームを検討できる点までプロセスを成熟させることもできます。現在のプロセスでは、一定の寿命を設定し、時間の経過とともに受信プロセスを進化させることができるようになると予想しています。提出プロセスが成熟したら、このアイデアを再考することができます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">リポのモデレーション</td>
      <td style="vertical-align: top;">悪用を防ぐために、FPS 提出リポジトリのコミュニティモデレーションを制定してください。悪意のある攻撃者によって、バーナーオリジンを使用してセットを提案するプロセスが簡単に圧倒される可能性があり、圧倒的な量のリクエストが本物のセット提案の操作に影響を与える可能性があります。</td>
      <td style="vertical-align: top;">技術的な検証チェックに依存することで、チェックを可能な限り客観的にするよう努めています。これが提出プロセスに対する最もスケーラブルなアプローチであると考えています。この目標に沿って、プロセスがスパム/バーナー送信に対して確実に回復できるようにすることも目指します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">関連するサブセット</td>
      <td style="vertical-align: top;">FPS は、関連サブセットを通じてサードパーティベンダー/SaaS フローのユースケースをサポートできますか？</td>
      <td style="vertical-align: top;">サードパーティベンダー/SaaS フローは、現在 First-Party Sets の範囲内とみなされるユースケースではありません。これらのユースケースでクロスサイト Cookie がどのように使用されるかに関する<a href="https://github.com/WICG/first-party-sets/issues/139">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">FPS + CHIPS の統合</td>
      <td style="vertical-align: top;">A/B テストなどのユースケースをサポートするための FPS + CHIPS 統合のリクエスト</td>
      <td style="vertical-align: top;">現在このユースケースについて議論しており、WICG ミーティングでさらに議論することも検討しており、<a href="https://github.com/WICG/first-party-sets/issues/94#issuecomment-1409929252">ここで追加の意見</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">GDPR</td>
      <td style="vertical-align: top;">GDPR の概念に基づいてモデル化された新しい FPS サブセットの提案</td>
      <td style="vertical-align: top;">この提案については内部的に議論し、受け取った他のフィードバックやプライバシーの目標と照らし合わせて検討しました。現時点でこの提案を推進しない理由を説明する<a href="https://github.com/WICG/first-party-sets/issues/130#issuecomment-1460724506">回答</a>を提供しました。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">メモリ</td>
      <td style="vertical-align: top;">FPS リストが組み込まれた場合にブラウザのメモリ サイズが変化すると予想されます</td>
      <td style="vertical-align: top;">切断トラッキング保護リストなど、ブラウザがメモリへの影響を最小限に抑えてこの種のリストを保存した前例があります。First-Party Sets のリストは各 Chrome クライアントにローカルにコピーされますが、ファイルサイズを引き続き監視し、メモリフットプリントを最適化できると確信しています。</td>
    </tr>
  </tbody>
</table>

### Fenced Frames API

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">Fenced Frames の制限事項</td>
      <td style="vertical-align: top;">Fenced Frames によって課せられる制限を明確にする</td>
      <td style="vertical-align: top;">3 月に、Fenced Frames の機能に関する情報を提供する <a href="https://developer.chrome.com/en/docs/privacy-sandbox/fenced-frame/">Explainer</a> を更新しました。<a href="https://github.com/WICG/fenced-frame/issues">追加のフィードバック</a>を歓迎します。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">情報へのアクセス拡大</td>
      <td style="vertical-align: top;">隣接フレーム周辺の情報へのアクセスを拡大するリクエスト</td>
      <td style="vertical-align: top;">これがエコシステムからの要件である理由をさらに理解することを目指しており、<a href="https://github.com/WICG/fenced-frame/issues">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Fenced Frames と iframe</td>
      <td style="vertical-align: top;">Fenced Frames と iframe の間の機能の同等性に関する質問</td>
      <td style="vertical-align: top;">利用可能なプライバシーサンドボックス API とレポートはすべて、iframe と Fenced Frames で同様に利用できるようになります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">Fenced Frames のサイズ変更</td>
      <td style="vertical-align: top;">フレーム サイズの変更を制限すると、特定のユースケースに影響します。</td>
      <td style="vertical-align: top;">私たちは、この制限によって影響を受けるユースケースの種類についてさらに詳しく知ることに興味があり、<a href="https://github.com/WICG/fenced-frame/issues">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
  </tbody>
</table>

### Shared Storage API

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">サードパーティのワークレット</td>
      <td style="vertical-align: top;">サードパーティは、送信元ごとにパーティション化された共有ストレージに書き込むことができますか？それともサードパーティの測定のために他のワークレットを呼び出しますか？</td>
      <td style="vertical-align: top;">コードが実行される閲覧コンテキストのオリジンによって、データが誰の共有ストレージに書き込まれるかが決まります。サードパーティのコードがページに追加されると、サードパーティのコードを独自の閲覧コンテキストを持つ iframe として埋め込むことができます。これにより、サードパーティのコードは独自のオリジンに書き込むことができます。サードパーティのコードは、iframe の代わりにスクリプトとして埋め込むこともできます。こうすると、閲覧コンテキストは切り替わらないため、サードパーティはエンベッダーの共有ストレージに書き込むことができます。その共有ストレージのオーナーのみがその共有ストレージから読み取ることができることに注意してください。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">重複排除</td>
      <td style="vertical-align: top;">Chrome エコシステム外のインタラクションでは重複排除は不可能です。</td>
      <td style="vertical-align: top;">共有ストレージは、Chrome ブラウザベースの独自のリーチ出力を Chrome 内で提供することを目的としています。私たちは、アドテックと協力して、これらの成果をより広範なリーチモデルの一部としてどのように使用できるかを理解することに興味を持っています。出力自体はインタラクションの一部のみを説明するものである可能性があると理解しており、アドテックと協力して、その上に重ねられる追加のモデリング手法を検討することに関心を寄せています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">コンバージョン ルックバック ウィンドウ</td>
      <td style="vertical-align: top;">時間の経過に伴うコンバージョンの変化を確認するために、コンバージョン率のルックバック ウィンドウを設定するようリクエストします。</td>
      <td style="vertical-align: top;">これは、共有ストレージを使用してクライアント側でさまざまなコンバージョンパスを処理することによって実装できます。これにより、安全でパーティション化されていないブラウザストレージ上で高度な分析に対する柔軟性がさらに高まります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">アイテムの有効期限</td>
      <td style="vertical-align: top;">有効期限を 90 日に延長するリクエスト</td>
      <td style="vertical-align: top;">データ保持ポリシーは<a href="https://github.com/WICG/shared-storage#data-retention-policy">2022 年 11 月に更新</a>され、最後の書き込みから 30 日後に各キーがクリアされると記載されています。新しいポリシーがエコシステムにとって機能するかどうかを理解するために、追加のフィードバックを歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">クリエイティブローテーション</td>
      <td style="vertical-align: top;">クリエイティブ ローテーションのユースケースは、オークション後の実際のアクションを反映しません。</td>
      <td style="vertical-align: top;">
<a href="https://developer.chrome.com/docs/privacy-sandbox/shared-storage/creative-rotation/">クリエイティブローテーションのドキュメント</a>が正確であるかどうかについて、より多くのバイサイドアドテック企業からの意見を聞きたいと考えています。</td>
    </tr>
  </tbody>
</table>

### CHIPS

今四半期に受け取ったフィードバックはありません。

### FedCM

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">ID アサーションエンドポイント</td>
      <td style="vertical-align: top;">ID アサーション エンドポイントへの任意のリクエストを明示的に許可する。</td>
      <td style="vertical-align: top;">ユーザーに不快感を与えずにクロスオリジン認証リクエストをサイレントに実行できるウェブサイトの機能を制限するために、この<a href="https://github.com/fedidcg/FedCM/pull/436">プルリクエスト</a>に関して <a href="https://github.com/fedidcg/FedCM/pull/436">Mozilla と協力</a>してきました。今後も引き続きレビューを続け、他のフィードバックにも対応していきます。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">ID の事前入力</td>
      <td style="vertical-align: top;">FedCM を使用して、FedCM リストの ID プロバイダーをサインインフォームに事前に入力することはできますか？</td>
      <td style="vertical-align: top;">このユースケースの懸念は、ユーザーと関与していないサイトがユーザーが最後に使用した IDP を照会できる場合に、情報漏洩につながる可能性があることです。私たちは<a href="https://github.com/fedidcg/FedCM/issues/451">この問題についてさらに議論</a>しており、追加のフィードバックを歓迎しています。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">状況に応じたアカウントの選択</td>
      <td style="vertical-align: top;">アカウント選択 UI にコンテキストシグナルを追加する提案</td>
      <td style="vertical-align: top;">この提案について検討しており、<a href="https://github.com/fedidcg/FedCM/issues/450">さらなる議論</a>を歓迎しています。</td>
    </tr>
  </tbody>
</table>

## スパムや詐欺への対抗

### Private State Token API（およびその他の API）

<table>
  <thead>
    <tr>
      <th>フィードバックのテーマ</th>
      <th>要約</th>
      <th>Chrome の返答</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align: top;">能力収集調査</td>
      <td style="vertical-align: top;">第 1 四半期の初めに、さまざまな不正対策のユースケースに必要な機能に関する調査結果の収集を完了し、一般に共有しました（<a href="https://github.com/antifraudcg/meetings/blob/main/2023/02-17.md">議事録</a>、<a href="https://docs.google.com/presentation/d/1DbhXWYk4j_T-uWXNk32rN2MmPCW9-wbiNa1MixHbfLU/edit?resourcekey=0-pN297jTBYTqIFNBvOD0SKA#slide=id.g20c3e14f6f9_0_0">結果</a>）</td>
      <td style="vertical-align: top;">不正防止機能のための専用のプライバシー保護 API に関する新しい提案やプロトタイプを開発する際に、このフィードバックを組み込む予定です。十分なニーズがあり、ユーザーのプライバシーを保護しながら、その機能をウェブに導入するために構築できる既存のテクノロジーがある場合には、開発を優先する予定です。たとえば、デバイスとブートの整合性は高く評価されており、多くのプラットフォームにはデバイスの整合性の評価を安全に共有する既存の API があるため、コミュニティグループ内で<a href="https://github.com/antifraudcg/proposals/issues/8">調査を進める</a>上で適した候補となります。</td>
    </tr>
    <tr>
      <td style="vertical-align: top;">PST の Intent to Ship に関するフィードバック</td>
      <td style="vertical-align: top;">Intent to Ship の一環として、古いバージョンのプライバシー パスを使用していることを前提に作業を進めることに懸念がありました。また、仕様が特定のセクションで不明確であり、ブラウザの互換性を容易にするために改善する必要があるというフィードバックも受け取りました。</td>
      <td style="vertical-align: top;">GA に出荷する前に、提案された仕様変更の多くと、いくつかの API 変更を実装する予定です。このフィードバックは第 1 四半期の終わりに届いたので、具体的な詳細とリリース計画の更新については <a href="https://github.com/WICG/trust-token-api/issues">GitHub のイシュー</a>をフォローアップ中です（このフィードバックレポートの公開時点で進行中）。<br><br> API へのより大きな変更については、検討することに前向きですが、一般公開まで進めて、より多くの開発者から実践的なフィードバックを得ることが最善の方法であると考えています。私たちはこの議論を継続し、ブラウザの標準化を追求していきたいと考えています。新しい標準が出現した場合には、その標準を採用し、慎重に移行するための計画の策定を検討します。</td>
    </tr>
  </tbody>
</table>
