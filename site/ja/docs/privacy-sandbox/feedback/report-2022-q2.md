---
layout: layouts/doc-post.njk
title: Feedback Report   - 2022 Q2
subhead: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 2 四半期の四半期レポートです。
description: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 2 四半期の四半期レポートです。
date: '2022-07-27'
authors:
  - rowan_m
---

CMA へのコミットメントの一環として、Google は、プライバシー サンドボックスの提案に対する関係者のエンゲージメントプロセスに関する四半期レポートを公開することに同意しました（[コミットメント](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)の第 12 段落および 17(c)(ii) を参照）。これらのプライバシーサンドボックスに関するフィードバック要約レポートは、[フィードバックの概要](/docs/privacy-sandbox/feedback/)に記載されているさまざまなソースから Chrome が受け取ったフィードバックを集計して生成されます。これには、GitHub のイシュー、[privacysandbox.com](https://privacysandbox.com/) で利用できるフィードバックフォーム、業界関係者との会議、およびウェブ標準フォーラムが含まれますが、それに限定されていません。Chrome は、エコシステムから受け取ったフィードバックを歓迎し、それから学んだことを設計の決定に統合する方法を積極的に模索しています。

フィードバックのテーマは、API ごとに発生率によってランク付けされます。これは、特定のテーマに関して Chrome チームが受け取ったフィードバックの量を集計し、量の多い順に整理することによって行われます。一般的なフィードバックのテーマは、公開会議（W3C、PatCG、IETF）、直接的なフィードバック、GitHub、および Google の内部チームや公開フォームを通じて浮上したよくある質問からの議論のトピックを確認することによって特定されました。

より具体的には、ウェブ標準化団体の会議の議事録がレビューされ、直接的なフィードバックについては、1 対 1 で行われた Google の関係者会議の記録、個々のエンジニアが受け取ったメール、API メーリングリスト、公開フィードバックフォームが考慮されました。次に、Google はこれらのさまざまなアウトリーチ活動に関与するチーム間で調整を行い、各 API に関連して出現したテーマの相対的な発生率を判断しました。

フィードバックに対する Chrome の対応の説明は、公開されている FAQ、関係者によって提起されたイシューに対する実際の対応、およびこの公開報告の目的に特化した立場の決定に基づいて作成されました。開発とテストの現在の焦点を反映して、特に Topics、Fledge、および Attribution Reporting API に関する質問とフィードバックが寄せられました。

現在のレポート期間の終了後に受け取ったフィードバックには、考慮された Chrome の対応がまだ含まれていない可能性があります。

{% Details %} {% DetailsSummary %}

**Glossary of acronyms**

{% endDetailsSummary %}

<dl>
<dt>W3C</dt>    <dd><p data-md-type="paragraph"><a href="https://www.w3.org/">World Wide Web Consortium</a></p></dd>
<dt>PatCG</dt>  <dd><p data-md-type="paragraph"><a href="https://www.w3.org/community/patcg/">プライベート広告技術コミュニティグループ</a></p></dd>
<dt>IETF</dt>   <dd><p data-md-type="paragraph"><a href="https://www.ietf.org/">Internet Engineering Task Force</a></p></dd>
<dt>DSP</dt>    <dd>Demand-side Platform</dd>
<dt>SSP</dt>    <dd>サプライサイド プラットフォーム</dd>
<dt>OT</dt>     <dd><p data-md-type="paragraph"><a href="/blog/origin-trials/">Origin Trial</a></p></dd>
<dt>UA</dt>     <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">User Agent string</a></p></dd>
<dt>UA-CH</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">User-Agent Client Hints</a></p></dd>
<dt>IP</dt>     <dd>Internet Protocol address</dd>
<dt>WIPB</dt>   <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/gnatcatcher/">Willful IP Blindness</a></p></dd>
<dt>IAB</dt>    <dd><p data-md-type="paragraph"><a href="https://www.iab.com/">Interactive Advertising Bureau</a></p></dd>
<dt>openRTB</dt>
<dd><p data-md-type="paragraph"><a href="https://iabtechlab.com/standards/openrtb/#:~:text=OpenRTB%20is%20the%20communication%20protocol,in%20the%20digital%20advertising%20industry.">Real-time bidding</a></p></dd>
<dt>CHIPS</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/chips/">Cookies Having Independent Partitioned State</a></p></dd>
<dt>FPS</dt>    <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/first-party-sets/">First Party Sets</a></p></dd>
<dt>FedCM</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/fedcm/">Federated Credential Management</a></p></dd>
<dt>IDP</dt>    <dd>Identity Provider</dd>
</dl>

{% endDetails %}

## 一般的なフィードバック、API/テクノロジーの指定なし

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Clearer timelines     </td>
   <td>プライバシーサンドボックステクノロジーのより明確で詳細なリリーススケジュール。</td>
   <td>
<a href="http://www.privacysandbox.com">privacysandbox.com</a> でデプロイスケジュールの現行プランを立て、毎月更新しています。これらは、Chrome とウェブ デベロッパーの両方の開発時間と、新しいテクノロジーをテストして採用するために必要な時間について、より広範なエコシステムから受け取ったフィードバックを考慮に入れています。各テクノロジーは、テストからリリース（ローンチ）まで複数のステップを経ており、各ステップのタイミングは、前のステップで学んだことや明らかになったことによって決まります。現時点ではコミットされたリリースはありませんが、<a href="http://www.privacysandbox.com">privacysandbox.com</a> で公開タイムラインを更新する予定です。</td>
  </tr>
  <tr>
   <td>さまざまなタイプの関係者にとっての有用性</td>
   <td>プライバシーサンドボックステクノロジーが大規模なデベロッパーに有利であり、ニッチ（小規模な）サイトが一般的な（大規模な）サイトよりも多くの貢献をしているという懸念。</td>
   <td>一部の開発者は、プライバシーサンドボックステクノロジーの影響について懸念を抱いていることを理解しています。Google は CMA に対して、Google 自身のビジネスを自己優先することによって競争を歪めるような方法でプライバシーサンドボックスの提案を設計または実装しないこと、およびデジタル広告における競争、サイト運営者および広告主への影響、およびプライバシーの結果とユーザー エクスペリエンスへの影響を考慮に入れることを約束しました。作業内容がこれらのコミットメントに準拠していることを確認するために、CMA と緊密に協力し続けています。<p>プライバシーサンドボックスのテストが進むにつれて、Chrome が評価する重要な質問の 1 つは、新しいテクノロジーがさまざまな種類の関係者に対してどのように機能するかということです。この点で、<a href="/docs/privacy-sandbox/feedback/">フィードバック</a>は重要です。特に、技術設計をさらに改善するのに役立つ具体的で実用的なフィードバックが重要です。</p>
</td>
  </tr>
  <tr>
   <td>Third-party cookie deprecation timelines     </td>
   <td>サードパーティ Cookie の廃止がさらに遅れないようにするためのリクエスト</td>
   <td>Chrome でサードパーティ Cookie の廃止を遅滞なく進めることを希望する一部の関係者からの意見や、プライバシーサンドボックステクノロジーのテストと採用にはさらに時間が必要であると考える関係者からの意見を聞いています。テクノロジーの複雑さと、物事を正しく行うことがエコシステムにとって重要であることを考慮して、私たちは責任を持って前進することを約束します。このプロセスには、業界や規制当局からのフィードバックが不可欠です。</td>
  </tr>
  <tr>
   <td>Third-party cookie deprecation timelines     </td>
   <td>サードパーティ Cookie の廃止を遅らせ、API をテストするための時間を増やすように求めるリクエスト。</td>
   <td>Chrome でサードパーティ Cookie の廃止を遅滞なく進めることを希望する一部の関係者からの意見や、プライバシーサンドボックステクノロジーのテストと採用にはさらに時間が必要であると考える関係者からの意見を聞いています。テクノロジーの複雑さと、物事を正しく行うことがエコシステムにとって重要であることを考慮して、私たちは責任を持って前進することを約束します。このプロセスには、業界や規制当局からのフィードバックが不可欠です。</td>
  </tr>
  <tr>
   <td>ドキュメントのリクエスト</td>
   <td>Requests for more resources detailing how to manage testing, analysis and implementation.     </td>
   <td>デベロッパーが現在の資料を参考にしてくれたことに感謝しており、デベロッパーが新しいテクノロジーがどのように機能するかを引き続き理解できるように、今後数週間から数か月にわたって、デベロッパーオフィスアワーや技術文書など、より多くの資料を提供することを約束します。<p>また、プロダクトとエンジニアリングのリーダーとベストプラクティスとデモの共有、Q&amp;A セッションの共有、ライブ ディスカッション/質問を行う一般向けの外部デベロッパーオフィスアワーセッションも開催しました。</p>
</td>
  </tr>
  <tr>
   <td>Industry expertise    </td>
   <td>標準化団体と連携している Chrome チームには、プライバシーとユーティリティの適切なバランスをとるために必要な広告エコシステムの専門知識が不足している。</td>
   <td>私たちには大きな責任があることを認識しており、これを正しく行うために具体的なフィードバックに依存しています。また、プライバシーと有効性の両方が重要であり必要な設計基準であると考えています。ウェブのプライバシーサンドボックスに取り組んでいるチーム全体において、広告エコシステムでの勤務経験年数は合計数百年にもなります。</td>
  </tr>
</table>

## Show Relevant Content &amp; Ads

### Topics

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>さまざまなタイプの関係者にとっての有用性</td>
   <td>トラフィックのレベルやコンテンツの専門性に応じて、サイトが生み出す価値とその価値の分布についての懸念。</td>
   <td>API の有用性は、テストを通じて調査されます。 Chrome では、テスト結果に基づいて分類法やその他のパラメータが進化することを期待しています。分類法またはパラメータの進化は、後方互換性のない変更を必要としない場合があります。さらに、サードパーティ Cookie の廃止後も、フィードバックが引き続き Topics API の進化に影響を与えることを Chrome は期待しています。</td>
  </tr>
  <tr>
   <td>Taxonomy     </td>
   <td>業界の関係者は、分類法に影響を与えられる発言権を持ちたいと考えている。</td>
   <td>Chrome は、分類法に関する意見に対してオープンな状態を維持しています。Chrome は、分類法を修正するためのガバナンスモデルに関するフィードバックと、分類法の開発と長期的な維持において他の業界団体がより積極的な役割を果たす方法についての議論に非常に関心があります。</td>
  </tr>
  <tr>
   <td>Not enough browsing history    </td>
   <td>ユーザーが直近の週に十分な閲覧履歴がなく、5 つのトピックを作成できない場合、呼び出し元が前の週に見たトピックを表示する提案</td>
   <td>現在の設計では、ランダムに選択されています。過去のトピックとの相関関係を調査し、これを組み込む可能性があるかどうかを検討しますが、相関関係には考慮が必要なプライバシー上の不利な懸念事項がある可能性があります。</td>
  </tr>
  <tr>
   <td>サイト運営者に代わって Topics を呼び出す</td>
   <td>サードパーティのサービスプロバイダーは Topics をサイト運営者と共有できますか？</td>
   <td>はい、それが私たちが期待する Topics の使用方法です。</td>
  </tr>
  <tr>
   <td>Potential attack vectors    </td>
   <td>ノイズを含むトピックの特定</td>
   <td>エコシステムの多くからのフィードバックに基づいて、Chrome はトピックをフィルタリングし、ノイズを導入することを選択しました。これらの決定は、プライバシーを念頭に置いて行われたものです。つまり、情報へのアクセスを、そのような情報にアクセスできなかった人に制限し、ユーザーにもっともらしい否認を導入するためです。これらの決定には、<a href="https://github.com/patcg-individual-drafts/topics/issues/75">こちらで</a>概説されている攻撃ベクトルなどの欠点があることを認識しています。ただし、私たちの評価では、プライバシーのメリットが潜在的なリスクを上回っています。この決定に関する公開ディスカッションを歓迎します。</td>
  </tr>
  <tr>
   <td>Origin Trial eligibility     </td>
   <td>ユーザーにオリジントライアルの資格があるかどうかを検出する方法はありますか？</td>
   <td>ユーザーが有効なトライアルトークンを提供するウェブページにアクセスしていて、そのブラウザがトライアルを利用できるグループに含まれている場合でも、ブラウザの設定やその他の要因により、ユーザーがオリジントライアルの機能を利用できない場合があります。<p>そのため、オリジントライアルの機能を使用する前に、その機能が利用可能かどうかを確認するために、常に<a href="https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection">機能検出</a>を使用する必要があります。</p>
</td>
  </tr>
  <tr>
   <td>Performance impacts    </td>
   <td>Topics に関するオーバーヘッドと遅延の問題</td>
   <td>高価で遅い x-origin iframe を回避するためのアプローチと、トピックを取得してもブラウジング状態が変わらないように Topics API のもつれを解く提案について、<a href="https://github.com/patcg-individual-drafts/topics/issues/7">フィードバックを求めています</a>。</td>
  </tr>
  <tr>
   <td>Topics API の機能の分割</td>
   <td>API の 3 つの異なる側面をより詳細に制御する機能を提供</td>
   <td>ユースケースを理解し、GitHub 内でこれを解決する可能な方法を提案しました。現在、機能を構築するかどうかについて、エコシステムからのさらなるフィードバックを待っています。進行中のディスカッションは<a href="https://github.com/patcg-individual-drafts/topics/issues/54#issuecomment-1135104487">こちら</a>をご覧ください。</td>
  </tr>
  <tr>
   <td>分類器のタイムラインとドキュメント</td>
   <td>デベロッパーは、分類器に関する詳細情報を要求しています。</td>
   <td>分類器に関する詳細情報は<a href="/docs/privacy-sandbox/topics/#where-can-i-find-the-current-classifier-model">こちら</a>で公開しています。<p><a href="https://github.com/patcg-individual-drafts/topics/issues/64#issuecomment-1137392271">こちら</a>にもあります。</p>
<p>また<a href="https://github.com/patcg-individual-drafts/topics/issues/79">こちら</a>もご覧ください。</p>
</td>
  </tr>
  <tr>
   <td>User controls and safety    </td>
   <td>Certain topics may be proxies for sensitive groups and users need more controls to prevent negative outcomes.    </td>
   <td>トピックは、ユーザーの制御と透明性にとって重要な前進を表しています。ユーザーは、トピックをオプトアウトしたり、割り当てられたトピックを確認したり、トピックを削除したり、特定のページでトピックとやり取りしている企業を把握したりできます。さらに、ユーザーは閲覧履歴を削除することでトピックに影響を与えることもできます。デベロッパーによって提案されたものなど、より高度なユーザーコントロールに関する継続的なディスカッションを歓迎します。ただし、このバグで提起された懸念については、実際にリスクが取り除かれていることを確認する必要があります（たとえば、トピック「語学学習」のみを削除し、閲覧履歴からトピックを生成したウェブサイトを削除しても、ユーザーを完全に保護することはできません）。</td>
  </tr>
  <tr>
   <td>Use of topics on sites with prebid.js    </td>
   <td>prebid.js を使用するウェブサイトで Topics API を使用できますか？</td>
   <td>簡単には「できます」と答えられます。詳細は <a href="/docs/privacy-sandbox/faq/#can-topics-api-be-used-with-on-websites-with-prebidjs">FAQ</a> に掲載されています。</td>
  </tr>
  <tr>
   <td>推奨ウィジェットでの Topics API の使用</td>
   <td>推奨ウィジェット（例: Outbrain）で Topics API を使用できますか？</td>
   <td>API が呼び出された後に取得されたトピックのユースケースは制限されていません（各デベロッパーのデータ ポリシーによって異なります）。</td>
  </tr>
  <tr>
   <td>プライバシー / ポリシー</td>
   <td>一部のサードパーティが呼び出し元とトピックを共有する場合、呼び出し元ごとにレスポンスをフィルタリングする目的に関する質問。</td>
   <td>エコシステム内の多くのユーザーからのフィードバックに基づいて、Chrome はこの設計を選択して、他の方法ではそのような情報にアクセスできなかった人だけが情報にアクセスできるように制限しました。もちろん、トピックを受け取るサイト運営者やサード パーティは、サイトでどの情報を共有するかを自分で決めることができます。この種の共有を行う場合、Chrome は、そのような共有についてユーザーに透明性を持たせ、制御を提供することを強く推奨します。</td>
  </tr>
  <tr>
   <td>Noisy signals    </td>
   <td>5% の確率でランダムなトピックを配信すると、ノイズや誤った信号が過度に多くなる可能性があります。</td>
   <td>ノイズはユーザーのプライバシーを保護するための重要な方法であり、ノイズレベルとトピックの有用性の比率はテストを通じて調査される予定です。</td>
  </tr>
</table>

### FLEDGE

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>テストの調整</td>
   <td>Testing for performance and revenue impact    </td>
   <td>FLEDGE のパフォーマンスと、オリジントライアルおよび一般公開中のエコシステムテストをどのようにサポートするかについては、公開の WICG ミーティングで<a href="https://github.com/WICG/turtledove/blob/main/meetings/2022-06-22-FLEDGE-call-minutes.md">活発に議論</a>されています。</td>
  </tr>
  <tr>
   <td>FLEDGE の信頼できるサーバー</td>
   <td>信頼できるサーバーはいつテストできるようになりますか？</td>
   <td>We appreciate this feedback and are actively working on a more detailed plan that we can share for use of trusted servers in FLEDGE.    </td>
  </tr>
  <tr>
   <td>Protocol standardization    </td>
   <td>SSP と DSP の間でデータを渡すための共通プロトコル（インタレストグループの共通ラベルなど）はありますか？</td>
   <td>仕様の標準化の可能性について、DSP、SSP、およびより広範な広告エコシステムからのフィードバックを歓迎します。現時点での初期テストの目的で、テストパートナーと直接協力することをお勧めします。パートナーはさまざまなアプローチを試している最中です。また、広告業界の組織に対しても、メンバー企業に役立つ場合に備えて、標準化の作成に参加することを推奨し、今後も協力する予定です。</td>
  </tr>
  <tr>
   <td>フリークエンシーキャップ</td>
   <td>キャンペーンと広告グループ内のユーザーごとのフリークエンシーコントロール。</td>
   <td>FLEDGE は、オンデバイスオークションやコンテキスト/ブランディング キャンペーンのフリークエンシーキャップもサポートします。共有ストレージとサイト固有の上限を使用して、追加のフリークエンシーキャップを制御することもできます。</td>
  </tr>
  <tr>
   <td>FLEDGE impact on performance    </td>
   <td>Computationally-intensive bidders in the FLEDGE auction    </td>
   <td>Chrome は、サイトのパフォーマンスへの潜在的な影響についてデベロッパーと活発に議論しています。Chrome は、テスト中に詳細を学ぶ機会を歓迎しています。</td>
  </tr>
  <tr>
   <td>Testing FLEDGE with other features    </td>
   <td>Attribution Reporting API と FLEDGE からのイベントレベルのレポートはどのように組み合わされますか？</td>
   <td>これは、最近の WICG/conversion-measurement-api 呼び出しで議論されており、詳細な議事録へのリンクは<a href="https://github.com/WICG/conversion-measurement-api/blob/main/meetings/2022-04-04-minutes.md">こちら</a>にあります。<p>会議の要約は、<a href="https://github.com/WICG/turtledove/blob/main/Fenced_Frames_Ads_Reporting.md">Fenced Frames Ad Reporting</a> の現在の設計により、Fenced Frame 内で生成された ID をコンテキスト情報に関連付けることができるということです。したがって、Fenced Frame 内で生成されたイベントレベルのレポートは、サーバー上の同じコンテキスト情報に結合できます（1 つではなく 2 つのサーバー側結合を使用）。</p>
</td>
  </tr>
  <tr>
   <td>Impression counting    </td>
   <td>買い手と売り手の間でどのインプレッションカウント法を使用すべきか、または使用できるか</td>
   <td>FLEDGE API は、オークション中の売り手と買い手の間の手法の調整を既にサポートしています。現在の設計がエコシステムで機能しない理由についてのフィードバックを受けずに、代替の実装に関する提案を受け取っています。</td>
  </tr>
  <tr>
   <td>Displaying Multiple Ads     </td>
   <td>特定の Fenced Frame において 1 つのオークションで複数の広告を表示できるかどうか</td>
   <td>これは現在、コンポーネント広告を介して可能です（コンポーネント オークションと混同しないでください）。これを行うには、すべての広告が同じインタレストグループに属している必要があります。</td>
  </tr>
  <tr>
   <td>「Seller Defined Audiences（SDA）」仕様と FLEDGE</td>
   <td>FLEDGE は、買い手が広告リクエストで SDA からプロファイルを作成できないようにするための仕組みになる可能性がありますか?</td>
   <td>FLEDGE は、サイト運営者が訪問者の属する SDA を既に知っていて、同じサイトをターゲティングしている場合に関係のない情報漏えいを回避するように設計されています。 FLEDGE に組み込まれているすべての保護の範囲内で SDA での購入をサポートすることが重要である場合、解決策の 1 つに、売り手が SDA ラベルをオンデバイスオークションに渡し、バイサイドのアドテックが独自のインタレストグループを作成する方法が挙げられます。「オーディエンス X を購入したい」という入札ロジックです。</td>
  </tr>
  <tr>
   <td>Support for currencies besides USD    </td>
   <td>米ドル（USD）以外の通貨で FLEDGE をテストするためのサポート</td>
   <td>この呼びかけに感謝し、機能リクエストのバックログ内に他の通貨をサポートしたビルドを追加しました。これがすぐに利用可能になることを願っています。</td>
  </tr>
  <tr>
   <td>ネガティブインタレストグループ ターゲティングのサポート</td>
   <td>An API to support negative IG targeting: showing ads only if a user does not belong to an IG.    </td>
   <td>サポートする必要のあるいくつかの提案されたオプションを含み、<a href="https://github.com/WICG/turtledove/issues/319">GitHub イシュー</a>でディスカッションを進行しています。</td>
  </tr>
  <tr>
   <td>Multiple SSPs in FLEDGE    </td>
   <td>FLEDGE でマルチレベルオークションを実装する際に Google が優先されるリスク</td>
   <td>FLEDGE での複数の SSP のサポートは、公正で公平な競技場を提供するために追加されました。Google はコミットメントの下で、自社の広告製品やサービスを優先することで競争を歪めるような方法でプライバシーサンドボックスの提案を設計、開発、または実装しないことを約束しています。Google はこれを真剣に受け止めており、テクノロジーの特定の側面について関係者が抱く可能性のある懸念について、非常にオープンに話し合っています。情報までに、Chrome はコンポーネントのオークションの仕組みを<a href="https://github.com/WICG/turtledove/pull/251">こちら</a>で公開しています。</td>
  </tr>
</table>

## Measuring Digital Ads

### Attribution Reporting（およびその他の API）

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Multi-touch attribution    </td>
   <td>サイト運営者はマルチタッチ アトリビューションのサポートをリクエストしています</td>
   <td>マルチタッチ アトリビューションの現在の方法では、さまざまなウェブサイトでのユーザーのインプレッション（したがってID）を決定論的に結び付ける必要があります。その結果、現在の形でのこの機能は、クロスサイト トラッキングなしで主要な広告のユースケースをサポートすることを目的としたプライバシーサンドボックスの目標と一致しません。場合によっては、個々のユーザーを追跡しなくても、クレジット割り当ての概算が可能です（たとえば、重み付けされ、ランダム化された優先順位を使用することが考えられます）。</td>
  </tr>
  <tr>
   <td>ノイズの生成</td>
   <td>Questions regarding the levels of noise within the reports    </td>
   <td>最初の実験では、デベロッパーが独自のイプシロン値を設定できるため、ノイズのレベルに基づいてレポートがどのように変化するかを体験できます。現在、デベロッパーは epsilon=64 までのイプシロン値を選択できます。これは特に、デベロッパーが API をテストし、適切なイプシロン値に関するフィードバックを提供しやすくするために行われました。<p>また、そのようなフィードバックを<a href="https://github.com/WICG/attribution-reporting-api/issues/485">公にリクエスト</a>しています。</p>
</td>
  </tr>
  <tr>
   <td>テストの調整</td>
   <td>ローカル テストツールを OT に使用できますか？</td>
   <td>はい、OT 期間中はローカル テストツールを使用できます。ローカル テストツールは、サードパーティ Cookie が利用できる限り、デバッグレポートで使用できます。</td>
  </tr>
  <tr>
   <td>クエリのエルゴノミクス</td>
   <td>Enable querying aggregate of keys    </td>
   <td>これにより、明らかなプライバシーコストがほとんどまたはまったくなく、API のエルゴノミクスが改善されるように思われることに同意しています。私たちは提案を行い、支持する価値があるという幅広いコンセンサスがあるかどうかを確認する意向です。</td>
  </tr>
  <tr>
   <td>Less accurate data for small sites    </td>
   <td>Smaller sites or campaigns may receive less accurate data.    </td>
   <td>Chrome は、ノイズに基づくプライバシー保護が小さなデータスライスに大きな影響を与えることを認識しています。ただし、長期間にわたる集計などの方法でこの問題を解決できる可能性があります。また、非常に小さなデータスライス（1 回または 2 回の購入など）に基づく結論が広告主にとって意味があるかどうかも不明です。オリジントライアル中、Chrome ではテスターがこのイシューについてより具体的なフィードバックを提供できるように、さまざまなプライバシーおよびノイズパラメータを試す機能を利用することをお勧めします。</td>
  </tr>
</table>

## 隠されたトラッキングの制限

### User Agent Reduction

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Bot protection    </td>
   <td>UA-R impact to bot protection    </td>
   <td>We appreciate this feedback and are in the process of gathering information on bot protection approaches to inform our future designs.    </td>
  </tr>
  <tr>
   <td>デプロイの依存関係</td>
   <td>構造化ユーザー エージェント（SUA）デプロイの依存関係への対応</td>
   <td>バージョン 101 以降の Chrome ユーザーの 100% に対してマイナーバージョンのバージョン削減とも呼ばれる「フェーズ 4」をロールアウトしました。<a href="https://www.chromium.org/updates/ua-reduction/#updates">こちらで更新</a>をご覧ください。</td>
  </tr>
</table>

### User-Agent Client Hints

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Enumerating all supported hints    </td>
   <td>Interest in having a programmatic way to know all supported hints for a browser.    </td>
   <td>このフィードバックに感謝し、機能リクエストを評価中です。これが一般的な使用例であるかどうかを理解することに関心を寄せています。</td>
  </tr>
  <tr>
   <td>Flexibility of UA-CH vs. User-Agent header    </td>
   <td>UA-CH is overly prescriptive when compared to the flexibility the User-Agent header offers, as defined by rfc7231.    </td>
   <td>Chrome は、最終的なクロスブラウザの相互運用性とユーザーのプライバシー保護（高エントロピー識別子の恣意的な追加を防ぐことによる）の両方の観点から、UA-CH ヘッダーの規範的な性質を UA 文字列の柔軟性に対する重要な改善と見なしています。<p>他にもこの懸念を抱いている人がおり、フィードバックの提供を希望している場合に備えて、問題は未解決のままとなっています。</p>
</td>
  </tr>
  <tr>
   <td>UA-CH: Anti-Fraud / Anti-Abuse concerns    </td>
   <td>UA-CH によって失われる可能性がある特定の機能: クリックリダイレクトトラッカー、および不正なクリック。</td>
   <td>The team is investigating these potential issues with anti-fraud and measurement stakeholders.     </td>
  </tr>
  <tr>
   <td>Performance    </td>
   <td>Critical-CH（最初のページ読み込み時）を介してヒントを取得する際の遅延について懸念があります。</td>
   <td>Chrome is investigating ways to improve performance.    </td>
  </tr>
</table>

### Gnatcatcher（作業中）

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>遅延の問題</td>
   <td>余分なホップを追加すると、遅延に影響を与える可能性があります</td>
   <td>2 ホッププロキシを検討しており、ユーザーのプライバシーと遅延の間の適切なバランスを見つける方法を模索しています。フィードバックをお待ちしております。W3C フォーラムでのさらなるディスカッションをお待ちしております。</td>
  </tr>
  <tr>
   <td>Fraud and bot protection     </td>
   <td>Impacts to fraud and bot protection, including in less developed countries     </td>
   <td>IP アドレスのプロキシ化など、有意義な方法でユーザーのプライバシーを改善する方法を模索しているため、安全性は重要な要件です。評判の良い企業と提携する 2 ホッププロキシは、検証可能なユーザープライバシーを提供します。また、ユーザーの信頼を伝えるのに役立つ新しいシグナルのアイデアも検討しています。</td>
  </tr>
  <tr>
   <td>Compliance with local privacy laws    </td>
   <td>Country-level geo data reporting makes compliance with more granular local regimes difficult    </td>
   <td>提案された<a href="https://github.com/spanicker/ip-blindness/blob/master/proposed_willful_ip_blindness_principles.md">原則</a>を公開しています。これには、ウェブサイトが地域の要件に準拠し続けることを可能にするための潜在的なアプローチが含まれています。</td>
  </tr>
</table>

## サイト間プライバシー境界の強化

### First-Party Sets

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>さまざまなタイプの関係者にとっての有用性</td>
   <td>小規模サイト運営者と大規模サイト運営者の FPS の影響</td>
   <td>プライバシー サンドボックスの主な目標は、現在の慣行をクロスサイトトラッキングの仕組みに依存しないソリューションに置き換えることで、ユーザーのプライバシーを改善することです。これらのソリューションが、さまざまな種類や規模の関係者にとって可能な限り広く役立つようにしたいと考えています。これらのソリューションをどのように改善できるかについて、具体的で実用的な意見を歓迎します。また、コミュニティでのディスカッションとテストにより、ソリューションが進化し続けることを期待しています。</td>
  </tr>
  <tr>
   <td>Improving privacy    </td>
   <td>同じセット内のサイトが多すぎると、サードパーティ Cookie と同様の結果になる可能性があります</td>
   <td>このフィードバックに感謝し、適切な制限が何であるかを評価しています。また、ユーザーとデベロッパーの両方に、そのような制限に達したときに理解できるような処理またはシグナルを提供しようとしています。共有する具体的な提案はまだありませんが、近々共有したいと考えています。</td>
  </tr>
  <tr>
   <td>FPS のエコシステムサポート</td>
   <td>Collection of support and concerns for continuing to develop FPS outside of Privacy CG    </td>
   <td>While we would have preferred that the First-Party Sets proposal remain in the PrivacyCG, we look forward to continuing to pursue the proposal in the WICG. We were also encouraged by the numerous statements of support for continued discussion of First-Party Sets and the use cases it is intended to address. Google remains committed to finding solutions that allows the web to continue to grow and thrive in a way that protects and respects user privacy.    </td>
  </tr>
  <tr>
   <td>Browser interoperability    </td>
   <td>Implementation by other browsers     </td>
   <td>ブラウザの相互運用性がデベロッパーにとって重要であることを認識しており、引き続き他のブラウザと協力して FPS の標準化を追求していきます。</td>
  </tr>
  <tr>
   <td>Common privacy policy requirement    </td>
   <td>It is infeasible to maintain a common privacy policy across all products, and jurisdictions that need to be part of the same set.    </td>
   <td>Chrome はまだポリシー要件を定義している段階にあります。このフィードバックを心に留めておきます。</td>
  </tr>
</table>

### Fenced Frames API

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>ドキュメントのリクエスト</td>
   <td>Differences with sandboxed iframes    </td>
   <td>フィードバックと提案をお待ちしております。これについては GitHub で現在議論が行われており、リクエストを完全に評価できるようにするために、リクエストの最終明確を行いたいと考えています。公開ディスカッションは<a href="https://github.com/WICG/fenced-frame/issues/38">こちら</a>からご覧いただけます。</td>
  </tr>
  <tr>
   <td>Cross-API Capabilities     </td>
   <td>Fenced Frame での Attribution Reporting のデフォルトサポート</td>
   <td>Attribution Reporting API を Fenced Frame の「opaque-ads mode（不透明広告モード）」でデフォルトで許可する提案について、<a href="https://github.com/WICG/fenced-frame/issues/37">フィードバックを募集</a>しています。これが価値があると考えるデベロッパーには、ディスカッションに参加することをお勧めします。</td>
  </tr>
</table>

### Shared Storage API

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Data limits    </td>
   <td>パーティションごとに保存できるデータ量に制限はありますか？</td>
   <td>はい、制限があります。詳細については、 <a href="https://github.com/WICG/shared-storage/issues/30#issuecomment-1170681187">GitHub のイシュー</a>を参照してください。ストレージクォータが必要になります。現在の提案では、エントリあたりのサイズの上限を 4 KB にすることです。キーと値の両方をそれぞれ 1024 char16_t 文字に制限し、オリジンあたりのエントリ上限を 10,000 エントリに制限し、オリジンの容量がいっぱいである場合に追加のエントリがコミットされないようにする仕組みを備えています。<a href="https://github.com/WICG/shared-storage/issues/30#issuecomment-1170681187">こちら</a>で提案されている特定の制限に関するフィードバックを積極的に求めています。</td>
  </tr>
  <tr>
   <td>User transparency    </td>
   <td>データソースとデータの使用に関するユーザーの透明性</td>
   <td>このフィードバックに感謝しており、これは検討する価値のある有望なアプローチだと考えています。特に、ユーザーに十分な透明性を提供する方法でこれを行うことが可能かどうかを評価しています。</td>
  </tr>
</table>

### CHIPS

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Adoption impediments    </td>
   <td>CHIPS はホスト名にバインドする必要がありますか？（ドメインなしの要件）</td>
   <td>この要件により複雑さが増し、CHIPS の採用の障害になるという OT 参加者からのフィードバックに基づいて、OT からこの要件を削除します。<p>この要件については、標準のインキュベーションの一環として、プライバシーコミュニティグループにおいて<a href="https://github.com/privacycg/CHIPS/issues/43">こちら</a>で議論する予定です。</p>
</td>
  </tr>
  <tr>
   <td>Ads use cases for CHIPS     </td>
   <td>CHIPS を単一のサイトでの広告のユースケースに使用できますか？</td>
   <td>1 つのサイト内でのユーザートラッキングは、許可されたユースケースです。このユースケースを強調するために、<a href="/docs/privacy-sandbox/chips/#use-cases">デベロッパー向けの記事</a>を更新しました。</td>
  </tr>
  <tr>
   <td>Authenticated embeds    </td>
   <td>サインオン状態は CHIPS で保持されますか？</td>
   <td>サインイン状態は現在保持されていませんが、CHIPS の意図したユースケースではありません。認証された埋め込みのユースケースを認識しており、解決策を模索しています。</td>
  </tr>
  <tr>
   <td>テストの調整</td>
   <td>パーティショニングをテストするために必要な追加のユーザーアクションはありますか？</td>
   <td>OT トークンが有効であり、アクセスしたページのヘッダーに存在する限り、追加のユーザーアクションを必要とせずに、ユーザーが機能を使用できるはずです。</td>
  </tr>
  <tr>
   <td>Browser compatibility    </td>
   <td>他のブラウザがパーティション化された Cookie 属性をどのように処理しているかを理解することへの関心。</td>
   <td>Chrome は、W3C などの公の標準化グループ内で引き続き取り組み、さまざまなブラウザで機能する設計と実装を特定しています。</td>
  </tr>
</table>

### Web Identity API, fka FedCM

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Potential attack vectors    </td>
   <td>Potential attack vectors via link decoration and timing attacks     </td>
   <td>積極的に一般からの意見を集め、<a href="https://github.com/fedidcg/FedCM/issues/230">このイシュー</a>に対処する方法を調査しています。</td>
  </tr>
  <tr>
   <td>UX to allow for multiple IDPs     </td>
   <td>Only one IDP can be presented at a time     </td>
   <td>複数の IDP をサポートすることに信念を抱いており、サポートするためのアプローチに積極的に取り組んでいます。</td>
  </tr>
  <tr>
   <td>Expressivity    </td>
   <td>ブラウザは連携 ID フローの一部をレンダリングするため、IDP がユーザーに提示したいすべてのニュアンスを把握するのは難しいという懸念があります。</td>
   <td>Chrome では、ブランディングのカスタマイズ（ロゴ、色など）や文字列のカスタマイズ（「ログイン」ではなく「この記事にアクセス」など）を検討しています。<p>Chrome はトレードオフを認識しており、エコシステムと協力して、可能な限り多くの領域をカバーし、可能な限り表現力を高めるようにします。</p>
</td>
  </tr>
  <tr>
   <td>Applicability and Interoperability    </td>
   <td>他のブラウザが FedCM を採用または実装しないという懸念。</td>
   <td>Chrome は他のブラウザベンダーとも協力して、FedID コミュニティグループで連携の共通ソリューションを見つけています。</td>
  </tr>
  <tr>
   <td>サインアップフローでの個人データ要件の削除の提案</td>
   <td>（1）メール、写真、名前が共有されることを通知せずに、選択している IdP をユーザーに示す UX は、よりプライバシーフレンドリーになります。<p>（2）ユースケースのサインアップは、ユーザーエクスペリエンスと IdP からのクレームの選択においてまばらです</p>
</td>
   <td>これに同意しており、よりユーザーとプライバシーに配慮した方法でフィードバックを実装する方法を検討しています。</td>
  </tr>
  <tr>
   <td>IdP とのユーザーインタラクション</td>
   <td>リスクのしきい値を超える場合に、ユーザーと IdP の間で直接対話する必要がある</td>
   <td>We are actively investigating this feedback.    </td>
  </tr>
</table>

### ネットワーク状態のパーティショニング

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Performance     </td>
   <td>ネットワーク状態をパーティション化すると、リソースを集中的に使用する CDN への接続が増加する可能性があります</td>
   <td>考えられるさまざまなキーイングスキームの測定など、ネットワーク状態のパーティショニングのパフォーマンス特性を調査中です。パフォーマンス、セキュリティ、およびプライバシーのトレードオフについてまだ決定を下しておらず、さらにデータを収集する必要があります。</td>
  </tr>
</table>

## スパムや詐欺への対抗

### Trust Tokens API

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Regulatory feedback    </td>
   <td>長期的な実行可能性に関する規制当局からの明確なシグナルなしに、トラスト トークンに時間とリソースを投資することへの懸念</td>
   <td>私たちの目標は、エコシステムに役立つテクノロジーを構築し、業界や規制当局からのフィードバックをプロセスに不可欠なものにすることです。プライバシーサンドボックスを開発し、デベロッパーがトラスト トークンを含む提案を利用できるようにするため、世界中の規制当局と引き続き協議します。すべての新しいテクノロジーと同様に、企業は規制要件の独自の評価に基づいて決定を下す必要があります。</td>
  </tr>
  <tr>
   <td>公開のタイミング</td>
   <td>トラスト トークンはいつ一般公開されますか？</td>
   <td>
<a href="https://www.privacysandbox.com/intl/en_us/">privacysandbox.com</a> の公開タイムラインで、現時点での出荷の推定時期を提供しています。GA への配信日が最終決定され次第、Chrome のリリースプロセスを通じて公開し、ウェブサイトのタイムラインを更新します。</td>
  </tr>
  <tr>
   <td>トラスト トークンとその他</td>
   <td>プライベートアクセストークンなど、標準化が進行中の他のトークンを考えると、トラスト トークンはどのような役割を果たしますか？</td>
   <td>標準化のディスカッションに取り組んでおり、各テクノロジーが提供するさまざまなユースケースを可能にしながら、他の取り組みと可能な限り一致させることを目標としています。たとえば、トラスト トークンとプライベートアクセストークンはどちらもプライバシーパスプロトコルに依存しています。</td>
  </tr>
  <tr>
   <td>Data limits    </td>
   <td>Max 2 Issuers for token redemption per page potentially limiting    </td>
   <td>We are looking for long term options where we can safely allow companies to redeem tokens without risking more user entropy, <a href="https://github.com/WICG/trust-token-api/issues/4#issuecomment-1152541757">perhaps by partitioning access to token redemptions</a>.    </td>
  </tr>
  <tr>
   <td>Access restrictions    </td>
   <td>承認された（および検証済み/スプーフィングされていないリファラー）オリジンのみが、トークンの存在を確認して引き換えることができる必要があります</td>
   <td>We are exploring approaches for who can see and redeem tokens.    </td>
  </tr>
  <tr>
   <td>Device support    </td>
   <td>Javascript ランタイムの依存関係により、特定のデバイスでの使用が制限されます。TT のサポートを拡張して、他の種類のデバイスで動作するようにすることはできますか？</td>
   <td>これは、将来の開発のために検討できるものであり、W3C フォーラムでデベロッパーからのフィードバックをさらにお聞きしたいトピックです。また、HTTP ヘッダーによってトリガーされるトークンの引き換えについて議論する<a href="https://github.com/WICG/trust-token-api/issues/89">未解決のイシュー</a>もあるため、フィードバックをお待ちしています。</td>
  </tr>
  <tr>
   <td>Use cases    </td>
   <td>トラスト トークンの適切な使用例が不明です。使用目的が明確ではありません</td>
   <td>不正対策分野でのイノベーションを促進することを目標としており、各企業がトラスト トークンを使用して独自の技術を採用している可能性があることを理解したいと考えています。ただし、実験や採用を検討しているパートナーの出発点として、ドキュメントを拡張してより多くの例を含める予定です。</td>
  </tr>
  <tr>
   <td>トラスト トークンの適用範囲</td>
   <td>この「トラスト トークンの引き換え」機能ポリシーを削除すると、トラスト トークンの適用範囲が大幅に拡大します。</td>
   <td>This is in consideration as we collect feedback from the OT and make decisions about next steps.    </td>
  </tr>
  <tr>
   <td>Issuer trust    </td>
   <td>トラスト トークンを発行したウェブサイトを信頼する必要があるのはなぜですか？</td>
   <td>発行者になるためのガイドラインはありません。誰でもなることができます。サイト運営者は、信頼できる発行者とのみ連携することが期待されます。さらに、広告エコシステムの他の正当なアクターは、最終的に、疑わしい発行者または不明な発行者に関連するトラフィックに割引を適用（または購入を停止）します。</td>
  </tr>
  <tr>
   <td>3P embedded services    </td>
   <td>サードパーティの組み込みサービスはトラスト トークンを引き換えたり要求したりできますか？</td>
   <td>Yes, a 3P embedded service can issue and redeem Trust Tokens.    </td>
  </tr>
  <tr>
   <td>発行者のエコシステム</td>
   <td>信頼のシグナルを他社と共有できれば、より大きな効用が得られます</td>
   <td>トラスト トークンは、低レベルのプリミティブとして設計されており、協力する発行者/引き換え者が信頼/評判シグナルを共有するために使用できます。</td>
  </tr>
  <tr>
   <td>メンテナンスのオーバーヘッド</td>
   <td>トラスト トークンの動作の基礎となる暗号化実装は  BoringSSL にあります。Google が唯一の管理者です。ライブラリの維持管理はどのように行われますか？</td>
   <td>トラスト トークンは、他のライブラリにも実装されている標準化された暗号演算（<a href="https://datatracker.ietf.org/doc/draft-ietf-privacypass-protocol/">プライバシーパスプロトコル</a>を参照）に依存しています。デベロッパーは、選択したライブラリでこれらの演算のサポートを要求/開発/維持することをお勧めします。</td>
  </tr>
  <tr>
   <td>メンテナンスのオーバーヘッド</td>
   <td>プロトコルバージョンがサポートされる期間が明確ではありません</td>
   <td>We are looking into developing and documenting more specifics on the expected support timeframes for protocol versions.    </td>
  </tr>
  <tr>
   <td>Issuer Limits    </td>
   <td>チェーンのさらに下にいる場合、トラスト トークンを実行する機会が生じない可能性があります</td>
   <td>より多くの組織がトラスト トークンを使用し始めるにつれて、このようなタイプのタイミング ダイナミクスがますます現れる可能性があり、潜在的な解決策を調査しています。前述のように、私たちは企業がユーザーエントロピーを増やすリスクを冒さずに安全にトークンを引き換えることができる長期的なオプションを探しています。これにより、ページ上の場所や読み込み順序の重要性が最小限に抑えられます。</td>
  </tr>
</table>

### インキュベーション中の新しい不正対策ソリューション

<table>
  <tr>
   <td>
<strong>Feedback Theme</strong><p><strong>（発生率順）</strong>
   </p>
</td>
   <td>
<strong>Questions and Concerns Summary</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>デバイスの整合性認証シグナル</td>
   <td>プラットフォームによって証明され、ウェブで利用できるようになったデバイスの整合性シグナルの追求に対する一般的な強力なサポート</td>
   <td>今後もフィードバックを収集し、設計とイテレーションの公開を通じて提案を進めていきます。</td>
  </tr>
  <tr>
   <td>デバイスの整合性認証シグナル</td>
   <td>新しいシグナルを通じてどれだけのユーザーエントロピーを伝達することができるか、および特定のユースケース（ユーザーが銀行にログインするなど）がより高いエントロピーシグナルを正当化できるかどうかについての質問。</td>
   <td>We lean towards providing high value signals with as little user entropy as possible to preserve user privacy.      </td>
  </tr>
  <tr>
   <td>デバイスの整合性認証シグナル</td>
   <td>このシグナルによって、古いデバイスまたはオープンソースまたは変更が適用されたプラットフォームへのアクセスが制限されますか？</td>
   <td>新しいシグナルは、ユニバーサルアクセスを開発の重要な原則として考慮する必要があります。これらは、インキュベーションを継続する際に、事前に対処する重要な問題です。</td>
  </tr>
  <tr>
   <td>デバイスの整合性認証シグナル</td>
   <td>There was some concern if new signals cause security and anti-fraud companies to overly rely on the browser and platforms <p>    </p>
</td>
   <td>新しいシグナルは、ブラウザからの「信頼」を示すものではなく、補足データとして表示する必要があります。セキュリティ企業は、独自のデータ、モデル、意思決定エンジンに依存し続け、デバイスの認証を追加の入力として使用することが予想されます。新しいシグナルがあれば、エコシステム全体での検出作業が改善され、不正行為の実行がより困難になると願っています。</td>
  </tr>
  <tr>
   <td>Cookie の経過時間シグナル</td>
   <td>Interesting concept but likely requires more investigation into applicable use cases.    </td>
   <td>関心のレベルに応じて、Chrome はこの概念についてさらに構想を練り、将来のエコシステムフィードバック用の Explainer に仕上げる可能性があります。</td>
  </tr>
  <tr>
   <td>Trusted Servers for Anti-fraud     </td>
   <td>Interesting concept but likely requires more investigation into applicable use cases.    </td>
   <td>関心のレベルに応じて、Chrome はこの概念についてさらに構想を練り、将来のエコシステムフィードバック用の Explainer に仕上げる可能性があります。</td>
  </tr>
</table>
