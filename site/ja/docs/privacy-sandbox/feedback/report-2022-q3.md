---
layout: layouts/doc-post.njk
title: Feedback Report   - 2022 Q3
subhead: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 3 四半期の四半期レポートです。
description: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 3 四半期の四半期レポートです。
date: '2022-10-27'
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
<dt>IAB</dt>    <dd><p data-md-type="paragraph"><a href="https://www.iab.com/">インタラクティブ広告協会</a></p></dd>
<dt>openRTB</dt>
<dd><p data-md-type="paragraph"><a href="https://iabtechlab.com/standards/openrtb/#:~:text=OpenRTB%20is%20the%20communication%20protocol,in%20the%20digital%20advertising%20industry.">Real-time bidding</a></p></dd>
<dt>CHIPS</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/chips/">独立してパーティション化された状態を持つ Cookie</a></p></dd>
<dt>FPS</dt>    <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/first-party-sets/">First-Party Sets</a></p></dd>
<dt>FedCM</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/fedcm/">Federated Credential Management</a></p></dd>
<dt>IDP</dt>    <dd>Identity Provider</dd>
</dl>

{% endDetails %}

## 一般的なフィードバック、API/テクノロジーの指定なし

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>さまざまなタイプの関係者にとっての有用性</p>
</td>
   <td>プライバシーサンドボックステクノロジーが大規模なデベロッパーに有利であり、ニッチ（小規模な）サイトが一般的な（大規模な）サイトよりも多くの貢献をしているという懸念。</td>
   <td>
<em>Q3 Update:</em><p>Google は CMA に対し、プライバシー サンドボックスの提案を、Google 自身のビジネスを自己優先することによって競争を歪めない方法で設計および実装し、規模に関係なくデジタル広告における競争およびサイト運営者と広告主への影響を考慮に入れることを約束しました。私たちは、私たちの仕事がこれらのコミットメントに準拠していることを確認するために、CMA と緊密に協力し続けています。</p>
<p>プライバシー サンドボックスのテストが進むにつれて、私たちが評価する重要な質問の 1 つは、新しいテクノロジーがさまざまな種類の関係者に対してどのように機能するかということです。この点で、<a href="/docs/privacy-sandbox/feedback/">フィードバック</a>は非常に重要な役割を果たします。特に、技術設計をさらに改善するのに役立つ具体的で実用的なフィードバックが重要です。</p>
<p> We have worked with the CMA to develop our approach to quantitative testing, and are supportive of the CMA publishing a note on experiment design to provide more information to market participants and an opportunity to comment on the proposed approaches.    </p>
</td>
  </tr>
  <tr>
   <td>(Also reported in Q2) <p> Documentation requests    </p>
</td>
   <td>Requests for more resources detailing how to manage testing, analysis, and implementation     </td>
   <td>
<em>Q3 Update:</em><p>開発者が現在の資料を参考してくれたことに感謝しており、新しいテクノロジーががどのように機能するかを開発者が理解できるように、今後数週間または数か月にわたってより多くの資料を提供することに引き続き取り組んでいます。</p>
<p>また、ベストプラクティスとデモを共有するための公開デベロッパーオフィスアワーセッションや、ライブディスカッション/質疑応答を可能にするプロダクトリーダーやエンジニアリングリーダーとの Q&amp;A セッションも開催しました。</p>
</td>
  </tr>
  <tr>
   <td>Cross-browser support    </td>
   <td>プライバシー サンドボックス API を採用している他のブラウザベンダー。</td>
   <td>Apple、Mozilla、Microsoft などの他のブラウザベンダーは、プライバシーの原則とブラウザベースのアプローチが議論されている公開フォーラムに積極的に参加しています。私たちは、最近の W3C 年次 TPAC 会議や進行中の W3C PATCG フォーラムなど、収束の兆しが見られるフォーラムでの協力的な議論に励まされています。</td>
  </tr>
  <tr>
   <td>Platform differences    </td>
   <td>移行に必要なリソースを削減するために、ウェブと Android の機能セットを可能な限り調整するようリクエストします。</td>
   <td>業界全体で混乱や分断が生じるのを避けるために、Chrome と Android でアプローチを調整するために懸命に取り組んでいます。私たちのアプローチの違いは主に、開発者がすでに考慮しているウェブとモバイルアプリ プラットフォーム間の必要な技術的な違いによるものです。</td>
  </tr>
  <tr>
   <td>Resources to test Privacy Sandbox APIs    </td>
   <td>現在の経済的な逆風を考慮すると、<p>プライバシーサンドボックス API をテストするのに十分なリソースを割り当てられることが困難</p>
</td>
   <td>Google は、複雑さを軽減し、API の採用を支援するために、テスターが利用できるドキュメントとサポートを継続的に改善しています。これらの取り組みには、API 固有のメーリング リスト、公開オフィスアワー、<a href="/">developers.chrome.com</a> での継続的な更新が含まれます。</td>
  </tr>
  <tr>
   <td>サンドボックス API のオプトアウトのシグナル</td>
   <td>「ユーザーがサンドボックス API をオプトアウトしました」という、アドテックとウェブサイトが使用できるシグナルを提供するというリクエスト</td>
   <td>「サードパーティ Cookie をオフにする」などのユーザーの選択にウェブサイトが反応して、ユーザーに設定を変更するよう圧力をかけ、変更しない限りウェブサイトへのアクセスをブロックするなどの事例を過去に数多く見てきました。オプトアウトシグナルは、フィンガープリンティングの追加シグナルとして使用することも考えられます。現時点では、Google はオプトアウト シグナルを提供する予定はありません。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>より明確なタイムライン</p>
</td>
   <td>Clearer, more detailed release schedules     </td>
   <td>
<em>Q3 Update:</em><p>以下の「フィードバックに応じた変更」セクションで説明されているように、Google は 7 月にプライバシー サンドボックスのタイムラインを更新し、予備テストとフィードバックを行う時間と、サードパーティ Cookie が廃止される前にプライバシーサンドボックス API が完全に公開されてからテストする時間を市場に追加提供しました。</p>
</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>サードパーティ Cookie の廃止スケジュール</p>
</td>
   <td>Requests to avoid further delay for 3rd party cookie deprecation    </td>
   <td>
<em>Q3 Update:</em><p>7 月、Chrome は、技術の複雑さとエコシステムに対するそれらの重要性を考慮し、責任を持って行動するという私たちのコミットメントを反映して、サードパーティの Cookie の廃止に関する最新のタイムラインを発表しました。規制当局や業界からのフィードバックは、この変更の前に考慮されており、すべての関係者との緊密な協力を続けています。</p>
</td>
  </tr>
  <tr>
   <td>First-party cookies    </td>
   <td>ファーストパーティ Cookie の制限も提案されていますか？その場合、長期的な安定性、予測不可能な今後のブラウザの変更によるリスク、およびそれによるエンジニアリングの取り組みが無駄になるという懸念があります。</td>
   <td>We have not considered any first-party cookie restrictions. The Privacy Sandbox’s focus is on deprecating third-party cookies.    </td>
  </tr>
</table>

## 関連するコンテンツと広告の表示

### Topics

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>さまざまなタイプの関係者にとっての有用性</p>
</td>
   <td>トラフィックのレベルやコンテンツの専門性によっては、サイトにとっての有用性について懸念が提起されています。</td>
   <td>
<em>Q3 Update:</em><p>API の有用性は、テストを通じて調査されます。コミットメントの第 17.c.ii 項で義務付けられているように、Google はそのようなテストの結果を CMA と共有する意向です。Chrome では、テスト結果に基づいて分類法やその他のパラメータが進化することを期待しています。分類法またはパラメータの進化は、後方互換性のない変更を必要としない場合があります。さらに、サードパーティ Cookie の廃止後も、フィードバックが引き続き Topics API の進化に影響を与えることを Chrome は期待しています。</p>
</td>
  </tr>
  <tr>
   <td>Privacy/Policy    </td>
   <td>呼び出し元ごとのトピック フィルタリング要件を削除するリクエスト</td>
   <td>プライバシー KOF、プライバシー擁護者、セキュリティ専門家、デジタル著作権グループ、およびエコシステム内の他の人々からのフィードバックに基づいて、Chrome はこの設計を選択し、他の方法ではそのようなアクセス権を持っていた人だけに情報へのアクセス権を付与しました。この理由には、段階的なクロスサイドのデータ漏えいを制限する、透明性と説明可能性を確保する、実装と説明が簡単なアプローチを採用する、フィンガープリンティングのリスクを制限することが含まれますが、これに限定されません。トピックを受け取るサイト運営者およびサード パーティは、自分のサイトでどのような情報を共有するかを自分で決めることができます。サードパーティがこの情報を共有する場合、Chrome では、そのような共有についてユーザーに透明性を持たせ、コントロールを提供することを強くお勧めします。</td>
  </tr>
  <tr>
   <td>Miscategorized sites    </td>
   <td>Sites are miscategorized to the wrong topic, which may result in inaccurate ads targeting.     </td>
   <td>サイトは、最も人気のあるサイトを含む、人間が精選したオーバーライド リストと、オンデバイス ML モデルを組み合わせて分類されます。Chrome では、トピックの分類に貢献するサイトのオプションを引き続き評価しています。ユーティリティの改善は、プライバシーと悪用のリスクと比較検討する必要があります。たとえば、次のようなリスクがあります。<ul>
<li>さまざまな（そして潜在的に機密性の高い）意味をトピックにエンコードする方法として自己ラベル付けを使用するサイト。</li>
<li>金銭的利益のためにトピックを偽って伝えているサイト。</li>
<li>他のユーザーにとっての有用性を鈍らせるためにトピックを攻撃するサイト（たとえば、無意味なノイズでユーザーのトピックをスパムするなど）。</li>
</ul>
<p> chrome://topics-internals またはこの <a href="https://colab.sandbox.google.com/drive/1hIVoz8bRCTpllYvads51MV7YS3zi3prn?usp=sharing">colab</a> を介して利用可能なツールを使用して、一般にこれらのコンポーネントを調べることができます。テストを通じて、時間の経過とともに分類が改善されることを期待しており、誤って分類される可能性のあるサイトの例に関する<a href="/docs/privacy-sandbox/feedback/#feedback-routes">フィードバックを歓迎しています</a>。</p>
</td>
  </tr>
  <tr>
   <td>Access requirements    </td>
   <td>アクセスするためのスクリプトまたは iframe としてのページ上の DOM エンティティに対する現在のトピック要件は、広告エコシステム内のプレーヤーによる望ましくない行動につながる可能性があります。</td>
   <td>
<a href="https://github.com/patcg-individual-drafts/topics/pull/81">Github Explainer の変更</a>をマージしました。 HTTP ヘッダーで Topics をサポートする予定です。</td>
  </tr>
  <tr>
   <td>Topics taxonomy not granular enough    </td>
   <td>Current topics classifications are too broad, and does not include more granular topics, such as regional topics.    </td>
   <td>分類法の改善は継続的な取り組みであり、エコシステムのテストと入力によって分類法が進化することを期待しています。<p>私たちは、エコシステムにとって最も役立つ分類法に関する<a href="https://github.com/patcg-individual-drafts/topics/issues/3">フィードバックを積極的に求めています</a>。トピックの数を増やすか、より詳細なトピックを含めるかを評価する際には、1）潜在的なプライバシーへの影響（たとえば、トピックが増えるとフィンガープリンティングのリスクが発生する可能性があります）、および 2）以前に観察されたトピックを取得する機能（たとえば、トピックがさらに増えると、アドテックが過去に選択したトピックを見た可能性が低くなる可能性があります）。2） をさらに展開して、Google は、ユーティリティとプライバシーの両方を達成することを目標に、既存のフィルタリング要件の範囲内で、以前に観察されたトピックを取得する呼び出し元の能力を最大化しようとしています。</p>
</td>
  </tr>
  <tr>
   <td>Topics limit    </td>
   <td>ウェブサイトごとに 3 つのトピックでは、広告主が広告を配信するには情報が少なすぎます。</td>
   <td>API は、エコシステムからのフィードバック、特にオリジン トライアルのテスト結果の影響を受けながら、引き続き進化しています。Topics は、コンテキストなどの他のシグナルを補完して、訪問者に適した広告を見つけるのに役立つことが期待されていることに注意してください。そのため、トピック以外にも広告主が利用できる情報が増える可能性があります。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>ユーザーコントロールと安全性</p>
</td>
   <td>Certain topics may be proxies for sensitive groups and users need more controls to prevent negative outcomes.    </td>
   <td>
<em>Q3 Update:</em><p>Topics のユーザーコントロールと透明性は、大きく前進しています。ユーザーは、トピックのオプトアウト、割り当てられたトピックの確認、トピックの削除、特定のページでトピックとやり取りしている企業の把握が可能です。さらに、ユーザーは、トピックの派生元であるブラウジング履歴を削除して Topics をクリアすることもできます。これらのコントロールは現在、デバイス レベルで Chrome ブラウザに実装されています。開発者によって提案されたものなど、より高度なユーザー コントロールに関する継続的な議論を歓迎します。ただし、発生した懸念に対処するために、新しい追加が適切に調整されており、断片的な変更が行われないようにする必要があります。</p>
</td>
  </tr>
  <tr>
   <td>Impact on SEO    </td>
   <td>サイト運営者が、Topics をより適切に反映するようにウェブサイトのホスト名を調整すると、SEO に悪影響を与える可能性があります。</td>
   <td>サイトが Topics のためだけにホスト名を変更しないように警告しています。このようにすれば、割り当てられたトピックに影響を与えてしまうのは事実ですが、そうすることによるサイト運営者へのメリットはよくわかっていません。また、サイトが分類モデルを「操作」しようとすると、エコシステム全体のトピックの価値が損なわれることになります。トピックの割り当ても固定されていません。分類法は、テストと入力によって進化し続けると予想されます。このテストに関連して、誤って分類されている可能性のあるサイトの例を含め、<a href="/docs/privacy-sandbox/feedback/#feedback-routes">フィードバックをお寄せください</a>。</td>
  </tr>
  <tr>
   <td>不正と悪用</td>
   <td>表示されるトピックが実際にブラウザによって生成されたものであることをバイヤーが確認できる方法を用意してほしい</td>
   <td>プログラマティック広告オークションでセラーから渡されたトピックをアドテック バイヤーが検証するメカニズムをサポートするという提案に感謝します。エコシステムは<a href="https://github.com/patcg-individual-drafts/topics/issues/86">こちら</a>の活発なディスカッションに参加することをお勧めします。現在、優先度の高いその他の改善に注力していますが、これが将来の設計への重要な追加になる可能性があることを認識しています。</td>
  </tr>
  <tr>
   <td>不正と悪用</td>
   <td>First-Party Sets と同じ種類の公開投稿とレビューを通じて、Topics データの正当なユーザーであるパーティのパブリック レビューを行えるようにする</td>
   <td>私たちはこの提案を高く評価し、公的説明責任がプライバシー サンドボックスの目標を達成するための重要なツールであることに賛同しています。Topics API 呼び出しは本質的にパブリックです。これは、誰でもサイトにアクセスして、JavaScript API に対するドメインの呼び出しを監視できるためです。したがって、個人や組織は、関連するアクティビティを表示し、どのサイトが Topics をどのように使用しているかを評価できます。これは、Topics API 自体の機能の一部としてサイトの「正当性」を評価するアプローチよりも優れていると考えています。</td>
  </tr>
  <tr>
   <td>ファーストパーティシグナルへの影響</td>
   <td>Topics のシグナルは非常に価値がある場合があり、その結果、他のファースト パーティのインタレスト ベース シグナルの価値が低下してしまいます。</td>
   <td>インタレストベースの広告はウェブにとって重要なユースケースであると考えており、トピックはそのユースケースをサポートするように設計されています。前に説明したように、他のエコシステム関係者は、Topics は価値を提供するには十分に有用ではない可能性があるという懸念を表明しています。いずれの場合も、分類法の改善は継続的な取り組みであり、エコシステムのテストとインプットによって分類法が進化することを期待しています。</td>
  </tr>
</table>

### FLEDGE

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>FLEDGE オークション</td>
   <td>SSP は、FLEDGE オークションに入札するために Google 広告に送信されるデータをどのようにフォーマットできるのか。</td>
   <td>テストに参加している企業は、それぞれのテスト計画に関するドキュメントを公開し、必要に応じて協力することをお勧めします。<p>私たちは CMA と協力して定量的テストへのアプローチを開発してきました。CMA が実験設計に関するメモを発行して、トライアルに参加することを計画している市場参加者により多くの情報を提供し、提案されたアプローチについてコメントする機会を提供することを支持しています。</p>
<p>広告マネージャー チームは、広告マネージャーをアドサーバーとして使用するサイト運営者と FLEDGE をテストすることに関心のあるセラー向けのドキュメントを<a href="https://github.com/google/ads-privacy/tree/master/proposals/fledge-multiple-seller-testing">こちら</a>に投稿しています。</p>
<p> 追加の技術詳細は、<a href="https://developers.google.com/publisher-tag/reference#googletag.config.componentauctionconfig">こちら</a>で説明されています。</p>
</td>
  </tr>
  <tr>
   <td>FLEDGE in nested Fenced Frames    </td>
   <td>Fenced Frames を使用すると、テストの制限を緩和できますが、不確定な未来により制限が加えられてしまいます。タイムラインが不明であることは、エコシステムにとって困難です。</td>
   <td>企業は今すぐ Fenced Frames で FLEDGE をテストできます。より簡単なオンボーディング オプションを提供するために、企業はまず FLEDGE を実装することを選択できます。FLEDGE を実装した後、Fenced Frame を FLEDGE 設計でテストできます。</td>
  </tr>
  <tr>
   <td>データ処理ポリシー</td>
   <td>インタレストグループ / FLEDGE のデータ処理ポリシーとは？</td>
   <td>FLEDGE 設計では、インタレストグループに保存されているすべてのデータ、またはどのインタレストグループにどのような人物がいるかについてのデータがデバイス上に残ります。このデータは Google サーバーに送信されません。<p> Chrome が FLEDGE に対して計画しているプライバシー保護には、Google が運営する k-匿名サーバーとのやり取りが含まれます。このインタラクションは、ユーザーに関する情報の共有を回避し、信頼できる実行環境（TEE）で実行して、広告エコシステム全体で情報の同等性を確保するように慎重に設計されています。</p>
<p> \ Google は CMA に対し、Google 自身のビジネスを自己優先することで競争を歪めない方法でプライバシー サンドボックスの提案を設計および実装し、デジタル広告の競争およびパブリッシャーと広告主への影響を考慮に入れることを約束しました。私たちは、私たちの仕事がこれらのコミットメントに準拠していることを確認するために、CMA と緊密に協力し続けています。</p>
</td>
  </tr>
  <tr>
   <td>Age policies    </td>
   <td>How does Chrome ensure that audiences created by FLEDGE are complying with age restrictions?    </td>
   <td>サイト運営者と広告主は、FLEDGE を使用して作成したオーディエンスが適用法に準拠しているかどうかを評価するのに最適な立場にあります。ユーザーをさらに保護するため、Chrome にサインインしているユーザーのアカウントに関連付けられている年齢が 18 歳未満の場合、テスト期間中であってもプライバシー サンドボックス API は有効になりません。（ログアウトしているユーザーの場合は、Chrome は、ブラウザがユーザーの年齢を推測できるようにするプロファイル シグナルを収集しません）。</td>
  </tr>
  <tr>
   <td>FLEDGE Key/Value サービス</td>
   <td>キーの数や更新頻度など、FLEDGE Key/Value サービスで許可される内容をより明確にしてほしい</td>
   <td>FLEDGE を使用する企業は、RAM に収まる数のキーを持つことができます。詳細については、<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md">こちら</a>の Explainer をご覧ください。<p>データを変更するためのより高速なパスを提供することを検討しており、あらゆる要件に対する提案を歓迎します。</p>
</td>
  </tr>
  <tr>
   <td>Testing    </td>
   <td>Hard to test FLEDGE with Google Ads    </td>
   <td>Refer to Google Ads <a href="https://developers.google.com/authorized-buyers/rtb/fledge-origin-trial">onboarding documentation</a> on how to best participate and test in the origin trial.    </td>
  </tr>
  <tr>
   <td>Bidding and Auction Services API</td>
   <td>Bidding and Auction Services API に対する Google の方向性は？Chrome ブラウザの FLEDGE オンデバイスオークションよりも優先されますか？</td>
   <td>現在の FLEDGE オンデバイス入札設計に引き続き取り組んでいきます。入札とオークションサービスは、デバイスの計算能力またはネットワーク速度が制限される可能性があるユース ケースをサポートするために可能なソリューションを探索するために提案されています。</td>
  </tr>
  <tr>
   <td>Aggregate reporting    </td>
   <td>Request to support aggregate reports based on all signals available to generateBid.    </td>
   <td>We plan to publicly share more on this soon.    </td>
  </tr>
  <tr>
   <td>Contextual Ads    </td>
   <td>FLEDGE でのコンテキスト広告の配信</td>
   <td>このオプションを検討しましたが、この<a href="https://github.com/WICG/turtledove/issues/260">ディスカッション</a>で説明した理由により、現時点ではコンテキスト広告に FLEDGE を使用することはお勧めしません。</td>
  </tr>
  <tr>
   <td>Testing in real world    </td>
   <td>実際のテストのために、FLEDGE をサードパーティ Cookie から分離する方法についてのガイダンス。</td>
   <td>We are investigating ways to provide test populations. <p> We have worked with the CMA to develop our approach to quantitative testing, and are supportive of the CMA publishing a note on experiment design to provide more information for market participants and an opportunity to comment on the proposed approaches.    </p>
</td>
  </tr>
  <tr>
   <td>Testing FLEDGE and Attribution Reporting API    </td>
   <td>FLEDGE で Attribution Reporting API を実装する最良の方法は何ですか？FLEDGE と Attribution を分離するか、一緒にテストすることをお勧めしますか？</td>
   <td>We'll eventually support testing both FLEDGE and Attribution Reporting API as an integrated solution, but we encourage developers to first test Attribution Reporting API independently and then with FLEDGE when the integration is complete.    </td>
  </tr>
  <tr>
   <td>Bid price visibility    </td>
   <td>Request to obfuscate bid prices.    </td>
   <td>「generateBid()」または「scoreAd()」内にブレークポイントを設定すれば、DevTools から入札値にアクセスすることができます。Chrome チームは、FLEDGE に関するこのフィードバックで提起された狭い攻撃ベクトルを検討しました。ただし、Chrome のセキュリティ モデルとプライバシー モデルでは、ユーザーが自分のデバイス上の情報を使ってやりたいことを何でもできると信頼されていると見なされているため、要求に応じて入札データを非表示にする実現的な方法はありません。</td>
  </tr>
  <tr>
   <td>ドキュメントのリクエスト</td>
   <td>Documentation and examples for testing in a live ecosystem.    </td>
   <td>開発者が現在の資料を参考にしてくれたことに監視しており、開発者が新しいテクノロジーがどのように機能するかを引き続き理解できるように、今後数週間または数か月にわたってより多くの資料を提供することに取り組んでいます。<p>また、外部開発者向けの公開オフィス アワーを開催して、Q&amp;A セッションをプロダクトリーダーやエンジニアリングリーダーとの Q&amp;A セッションとともにベスト プラクティスとデモを共有し、ライブ ディスカッション/質疑応答を実施しました。</p>
</td>
  </tr>
  <tr>
   <td>Private Aggregation API</td>
   <td>Private Aggregation API に関する詳細をリクエスト</td>
   <td>現時点で共有できる最新情報については、<a href="https://github.com/patcg-individual-drafts/private-aggregation-api#turtledovefledge-reporting">公開 Explainer</a> て提供されています。この API が開発され、ユース ケースが定義されるにつれて、より多くのドキュメントが提供される予定です。</td>
  </tr>
  <tr>
   <td>Data latency    </td>
   <td>FLEDGE Key/Value サーバーのデータ取得はリアルタイムですか？</td>
   <td>A small amount of staleness on the order of minutes, not hours may be expected before updated data can be returned by the server for queries, as explained <a href="https://github.com/WICG/turtledove/issues/290#issue-1207077195">in an open GitHub Issue</a>. We are also looking for <a href="https://github.com/WICG/turtledove/issues/290#issue-1207077195">developer feedback</a>.<a href="https://github.com/WICG/turtledove/issues/290#issue-1207077195"> </a>    </td>
  </tr>
  <tr>
   <td>Bidding and Auction services    </td>
   <td>入札およびオークション（B&amp;A）サービスを使用する場合、入札価格は他のユーザーに非表示になっていますか？</td>
   <td>B&amp;A サーバー側アプローチの場合、入札リクエストは SSP オークション サービスから DSP オークション サービスに直接行われるため、個々の入札価格はユーザーには表示されず、ブラウザでは使用できなくなります。<p>ただし、落札価格は引き続きブラウザに表示されます (入札価格を難読化する要求については、上記で詳しく説明しています)。</p>
</td>
  </tr>
  <tr>
   <td>Bidding and Auction services    </td>
   <td>入札とオークション サービスの負荷をどのように分散できますか？</td>
   <td>We currently don't have any guidance on load balancing, but it is an important concern from the perspectives of both performance and privacy. We will provide more details in the future.    </td>
  </tr>
  <tr>
   <td>FLEDGE limits    </td>
   <td>joinAdInterestGroup の期間上限を 30 日から 90 日に増やすリクエスト</td>
   <td>30 日間のデータ保持期間は、アトリビューション レポートの 30 日間の制限やトピックの 3 週間の振り返りなど、他のプライバシー サンドボックス広告 API と一致していると感じています。この時間枠は、アドテックのニーズとユーザーのプライバシーへの期待の両方に対応しています。<p>ただし、この問題については引き続き<a href="https://github.com/WICG/turtledove/issues/337">こちら</a>で議論するため、さらなるフィードバックをお待ちしております。</p>
</td>
  </tr>
  <tr>
   <td>FLEDGE の共有ストレージ</td>
   <td>FLEDGE で Shared Storage API を利用することはできますか？</td>
   <td>今後、FLEDGE で Shared Storage API をサポートする予定であり、今後のオリジントライアルでこれを利用できるように取り組んでいます。</td>
  </tr>
  <tr>
   <td>クリック数によるフリークエンシー制御</td>
   <td>FLEDGE でクリック数（獲得数ではない）でフリークエンシー キャップを設定することはできますか？</td>
   <td>FLEDGE は、Fenced Frame が navigator.leaveAdInterestGroup() (パラメーターなし) を呼び出して、広告が表示される原因となったインタレスト グループから脱退できることを指定します。この呼び出しは、クリックが最初に受信されたときに行われ、フリークエンシー キャップの形態として、今後の入札を防ぐことができます。現在、このソリューションは、複数回クリックした後のキャッピングには機能しません。</td>
  </tr>
  <tr>
   <td>ネストされた Fenced Frame の FLEDGE</td>
   <td>Unable to report clicks via Fenced Frame Ads Reporting, if they happen on a nested Fenced Frame.    </td>
   <td>このイシューを解決するための提案を<a href="https://docs.google.com/document/d/1nRkV8BEsU_JzGgq4-fXTVCeLWNxA_2Pdz2NCVpUD_W0/edit">こちら</a>に公開しました。</td>
  </tr>
  <tr>
   <td>Measurement    </td>
   <td>Need guidance on how to collect latency data on bidders in a FLEDGE auction.    </td>
   <td>We are working to publish a performance measurement doc soon.    </td>
  </tr>
  <tr>
   <td>レポーティング</td>
   <td>FLEDGE のレポートはどのように処理されますか？</td>
   <td>落札、オークション結果、イベント（クリックなど）に関する FLEDGE レポートは、reportResult() などの FLEDGE API を介して利用できます。広告コンバージョンのレポートでは、Attribution Reporting API との統合は FLEDGE から独立していますが、可能なアプローチについてエコシステムとの継続的な議論があります。<p> Private Aggregation API を使用して、分離された実行環境内からオークション結果を報告することもできます。 <a href="https://github.com/patcg-individual-drafts/private-aggregation-api#turtledovefledge-reporting">こちら</a>の Explainer をご覧ください。</p>
</td>
  </tr>
  <tr>
   <td>インタレストグループのサイズ</td>
   <td>アドテックがインタレスト グループのサイズ（グループ内のユーザー数）を確認する方法はありますか？</td>
   <td>インタレスト グループのメンバーシップは、ブラウザによってユーザーのデバイスに保存され、ブラウザ ベンダーや他の誰とも共有されません。<p>ただし、インタレストグループの所有者は、理論的には navigator.joininterestgroup(...) へのすべての呼び出しをトラッキングできます。この呼び出しをトラッキングしても、IG の正確なサイズは保証されませんが（ユーザーはいつでもグループを脱退できるため）、上限とサイズの概算を所有者に提供します。</p>
</td>
  </tr>
  <tr>
   <td>Performance    </td>
   <td>Bidding JS/WebAssembly コードはオークションごとにコンパイルされますか？</td>
   <td>Bidding JS/WebAssembly コードは、オークションごとに 1 回コンパイルされます。</td>
  </tr>
  <tr>
   <td>Performance    </td>
   <td>biddingDurationMsec の範囲は何ですか？</td>
   <td>biddingDurationMsec には、スクリプトのコンパイル時間が含まれます。ダウンロード時間、wasm コンパイル時間、ネットワーク時間は含まれません。JS コンパイルの前に Key/Value サーバーなどから時間をフェッチします。</td>
  </tr>
  <tr>
   <td>Customization    </td>
   <td>ユーザー向けにカスタマイズされるように adComponent を更新することは可能ですか？</td>
   <td>呼び出し元が joinInterestGroup を呼び出したとき、または Chrome が DailyUpdateURL を呼び出したときにインタレスト グループが更新されると、adComponent が更新されます。これにより、呼び出し元は、現在のサイトからのユーザーの知識に基づいて、または k-匿名情報に基づいて、それぞれ adComponent を更新できます。製品レベルの turtledove の元の提案は<a href="https://github.com/WICG/turtledove/blob/main/PRODUCT_LEVEL.md">こちら</a>にあります。これには、推奨ユース ケースのコア メトリクスへの影響に関する RTB House による分析が含まれています。</td>
  </tr>
  <tr>
   <td>インタレストグループ</td>
   <td>インタレストグループの所有者が条件付きで特定のユーザーを削除することはできますか？</td>
   <td>インタレスト グループのメンバーシップはユーザーのブラウザにのみ保存され、ユーザー側でのみ削除できます（サイト データを消去するなど）。<p>ただし、ユーザーがインタレストグループの所有者の管理下にあるページに戻った場合、インタレストグループの所有者は （いくつかの条件付きロジックを使用して）navigator.leaveAdInterestGroup() を呼び出すことができます。</p>
</td>
  </tr>
  <tr>
   <td>Performance    </td>
   <td>generateBid のパフォーマンスを測定するにはどうすればよいですか？</td>
   <td>Compile and execute time can be measured with biddingDurationMsec. Download time can be measured with chrome://net-export. In recent versions of Chrome, compile and execute time will show up in the DevTools Performance tab.    </td>
  </tr>
  <tr>
   <td>インタレストグループの更新頻度</td>
   <td>ブラウザからインタレスト グループが更新される頻度はどれくらいですか？</td>
   <td>過去 24 時間更新されていないインタレストグループについては、navigator.updateAdInterestGroups() が呼び出されたとき、またはオークションに参加する機会があったときに、Chrome が更新を試みます。詳細については、<a href="https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#interest-group-updating">こちら</a>の Explainer をご覧ください。</td>
  </tr>
  <tr>
   <td>Aggregation Service Providers    </td>
   <td>アグリゲーションサービスで他のクラウド プロバイダーがサポートされるのはいつですか？</td>
   <td>現在、特定の時間に関する更新はありませんが、更新され次第、さらに共有します。現在、アグリゲーションサービスのセキュリティ要件を満たしているのは AWS だけです。</td>
  </tr>
  <tr>
   <td>FLEDGE Testing Timeline    </td>
   <td>FLEDGE は BYOS でどのくらいの期間テストされますか？BYOS モデルから TEE ベースのモデルに切り替えるのに十分な時間はありますか？</td>
   <td>エコシステムがテストするのに十分な時間を確保するために、サードパーティ Cookie が廃止されるまで、TEE の使用を要求することはないと考えています。この移行が行われる前に、開発者がテストと採用を開始するように十分な通知を行います。現在、これ以上の更新はありませんが、更新が行われたらさらに共有します。最新情報は<a href="/blog/open-sourcing-fledge-key-value-service/">こちら</a>でご確認ください。</td>
  </tr>
  <tr>
   <td>Data size limit    </td>
   <td>wasm の入札機能のデータサイズ制限は？</td>
   <td>
<a href="https://github.com/WICG/turtledove/issues/228">こちら</a>で説明されているように、インタレスト グループの更新によってインタレスト グループが 50kb を超えることはできないという要件がありますが、wasm のデータ サイズ制限はまだ定義されていないため、このトピックに関する情報をお待ちしております。</td>
  </tr>
  <tr>
   <td>Auction signals    </td>
   <td>オークションシグナルの標準化されたデータ構造はありますか？</td>
   <td>This is not defined yet, but we are open to feedback.    </td>
  </tr>
  <tr>
   <td>アドテックサーバーのクエリ</td>
   <td>K/V サーバーからアドテック サーバー データをリアルタイムでクエリすることは可能ですか？</td>
   <td>いいえ、K/V サーバーは、ユーザー データの漏えいを避けるために「ネットワーク、ディスク アクセス、タイマー、またはログ記録なし」を強制する信頼モデルで実行されます。詳細については、<a href="https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md">こちら</a>の信頼モデルの説明をご覧ください。</td>
  </tr>
  <tr>
   <td>Frequency of updating adComponents    </td>
   <td>ユーザーの閲覧履歴による adComponents フィールド（現在は IG 設定のみ）の更新は現在不可能です。</td>
   <td>プライバシー サンドボックスは、クロスサイト トラッキングなしでウェブエコシステムのニーズをサポートすることを目的としています。つまり、ブラウジング履歴へのアクセスを防止します。Topics などの代替手段を使用することをお勧めします。</td>
  </tr>
  <tr>
   <td>Auction results    </td>
   <td>アドテックがオークションの落札率を知る方法はありますか？</td>
   <td>オークションの結果は、セラーと落札したバイヤーがそれぞれ提供するオークション コードで reportResult() 関数と reportWin() 関数を呼び出すことによって報告されるため、それぞれにオークション結果に関するログとレポートを実行する機会があります。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>ネガティブ インタレスト グループ ターゲティングのサポート</p>
</td>
   <td>ユーザーがインタレスト グループに属していない場合にのみ広告を表示するネガティブ インタレスト グループ ターゲティングをサポートする API</td>
   <td>
<em>Q3 Update</em>: <p> We have shared a new<a href="https://github.com/WICG/turtledove/issues/208#issuecomment-1238690890"> proposal </a>and are seeking feedback.    </p>
</td>
  </tr>
</table>

## Measuring Digital Ads

### Attribution Reporting（およびその他の API）

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>OT requirements    </td>
   <td>Remove Permission-Policy restrictions during / for the OT only.    </td>
   <td>テスト中に<a href="https://groups.google.com/u/0/a/chromium.org/g/attribution-reporting-api-dev/c/uFmCrdaUjqw">発表されたアクセス許可ポリシーの変更</a>を参照してください。この変更によって対処される根本的な関係者の懸念は、DSP がより多くのクロスオリジン iframe で API をテストできるようにすることです。当初、DSP はサイト運営者/SSP と調整して、クロスオリジン iframe で API をテストするために適切なアクセス許可ポリシーが設定されていることを確認する必要がありましたが、この変更により、DSP はデフォルトで API を呼び出すことができ、SSP/サイト運営者はオリジントライアル中に必要に応じて API を無効にします。</td>
  </tr>
  <tr>
   <td>Noise    </td>
   <td>Feedback that the level of noise is too high and it is impacting the usefulness of the reporting.    </td>
   <td>We <a href="/docs/privacy-sandbox/feedback/#feedback-routes">welcome feedback</a> regarding noise, which we will use to determine how to set certain noise related parameters. We are also looking to publish more resources, tools, and other docs to help testers with this.    </td>
  </tr>
  <tr>
   <td>Cross-domain conversions    </td>
   <td>2 つ以上のリンク先など、クロスドメインのコンバージョンを追跡するにはどうすればよいですか？</td>
   <td>この質問については、<a href="https://github.com/WICG/attribution-reporting-api/issues/549">現在議論中であり、フィードバックを求めています</a>。</td>
  </tr>
  <tr>
   <td>Debugging requirements    </td>
   <td>要約レポートの展開/テスト時に、開発者が残りのプライバシー予算を確認できるようにするリクエスト</td>
   <td>You can track this<a href="https://bugs.chromium.org/p/chromium/issues/detail?id=1354635"> feature request here</a>.     </td>
  </tr>
  <tr>
   <td>API usage policies    </td>
   <td>Feedback suggesting policies for who can use a given API based on restrictions for things like fingerprinting    </td>
   <td>これは非常に興味深いアイデアであり、他のブラウザプロバイダーとより広範なウェブエコシステムの両方とさらに協力したいと考えています。</td>
  </tr>
  <tr>
   <td>Expiry setting in conversion report    </td>
   <td>Request to support report filter / expiry for less than 24 hours.    </td>
   <td>時間レベルの有効期限は、ユーザーが広告主のサイトにアクセスした時間を正確に知ることができるため、プライバシー上の懸念の原因となります。日レベルの有効期限により、アドテックは、ユーザーがサイトにアクセスした時間を特定せずに、無効なインプレッションを除外できます。</td>
  </tr>
  <tr>
   <td>OT token expiration    </td>
   <td>運用上のオーバーヘッドを削減するために、既存の OT トークンの有効期間を延長することをリクエストします。</td>
   <td>トークンを更新する必要があることは認識しており、開発者が簡単に更新できるように取り組んでいます。追加の通知を提供する予定です。</td>
  </tr>
  <tr>
   <td>リージョンサポート</td>
   <td>現在、アグリゲーションサービスはすべてのリージョンをサポートしているわけではありません。</td>
   <td>This is a current limitation for beta. We expect to support additional regions as testing progresses, but there isn’t yet a clear timeline for this.    </td>
  </tr>
  <tr>
   <td>イベントレベルレポートの遅延</td>
   <td>The delay of 2-30 days in event level reporting may be too long for certain use cases.    </td>
   <td>イベント レベルのレポートが有効期限を介して送信されるタイミングをアドテックが制御できるようにするための提案を<a href="https://github.com/WICG/attribution-reporting-api/issues/522">こちら</a>に共有しました。デフォルトは 30 日ですが、これより短く設定することもできます。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>マルチタッチ アトリビューション</p>
</td>
   <td>クロスデバイスやクロスアプリなどのマルチタッチ アトリビューションの許可</td>
   <td>
<em>Q3 Update: </em><p>マルチタッチ アトリビューションの現在の方法では、さまざまなウェブサイトでのユーザーのインプレッション（したがってID）を決定論的に結び付ける必要があります。その結果、現在の形でのこの機能は、クロスサイト トラッキングなしで主要な広告のユースケースをサポートすることを目的としたプライバシーサンドボックスの目標と一致しません。</p>
</td>
  </tr>
  <tr>
   <td>FLEDGE &amp; Attribution Reporting integration timeline    </td>
   <td>FLEDGE とアトリビューション レポート API の統合のタイムラインは？</td>
   <td>現在、共有できる更新はありませんが、特定のタイムラインにコミットできるようになったら、さらに情報を公開します。</td>
  </tr>
  <tr>
   <td>Multiple Trigger Types    </td>
   <td>Request for more flexibility in trigger registration.     </td>
   <td>アドテックがイベント レベルの集計可能なレポートをより柔軟に制御できるようにするアグリゲート API の重複排除システムを<a href="https://github.com/WICG/attribution-reporting-api/pull/527">提案</a>しました。</td>
  </tr>
  <tr>
   <td>Measurement    </td>
   <td>広告枠がうまく機能しているかどうかの測定データを受信するリクエスト</td>
   <td>We appreciate the feedback and are seeking additional clarity on the use case(s) for this request.     </td>
  </tr>
  <tr>
   <td>Conversion expiry    </td>
   <td>Request to support conversion expiry on trigger tag instead of just the source tag.    </td>
   <td>We appreciate the feedback and are seeking additional clarity on the use case(s) for this request.    </td>
  </tr>
  <tr>
   <td>Batch reporting    </td>
   <td>Request for additional measurement in batch reporting.    </td>
   <td>We appreciate the feedback as we continue to think about the impact on aggregation service. We are interested in hearing how ad tech are thinking about batching reports and their expected frequency as well as any feedback on how batching strategy changes throughout the year.     </td>
  </tr>
  <tr>
   <td>Epsilon    </td>
   <td>イプシロンの値はいつ決定されますか？</td>
   <td>イプシロンの値とそれを GA に実装する方法を最終決定するために、エコシステムのテスターと積極的に協力しています。この値は、値の決定につながった議論とともに公開されます。フィードバックがある場合は、この GH <a href="https://github.com/WICG/attribution-reporting-api/issues/485">イシュー</a>に投稿してください。</td>
  </tr>
</table>

## 隠されたトラッキングの制限

### User-Agent の情報量削減

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>デプロイの依存関係</td>
   <td>構造化ユーザー エージェント（SUA）デプロイの依存関係への対応</td>
   <td>バージョン 101 以降の Chrome ユーザーの 100% に対してマイナーバージョン削減とも呼ばれる「フェーズ 4」をロールアウトしました。<a href="https://www.chromium.org/updates/ua-reduction/#updates">こちら</a>で更新をご覧ください。</td>
  </tr>
  <tr>
   <td>Testing    </td>
   <td>メタからの User-Agent Reduction オリジントライアルの延長をリクエストします。</td>
   <td>
<a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/jjGeFtHhak4/m/oZTrYykHAwAJ">オリジントライアルを延長</a>し、より大規模なサイトに対応するためにトラフィック制限を削除する<a href="https://groups.google.com/a/chromium.org/g/blink-dev/c/R0xKm1B7qoQ/m/EVTLoZDyBAAJ">許可を取得</a>しました。トラフィック制限の緩和は、大小を問わずすべてのサイトに適用されます。</td>
  </tr>
</table>

### User-Agent Client Hints

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>不正防止/悪用防止に関する懸念</p>
</td>
   <td>Certain features that might be lost via UA-CH: Click redirect tracker, and fraudulent clicks.    </td>
   <td>
<em>第 3 四半期の更新</em>:<p>企業から、不正防止パイプラインに悪影響が見られなかったという肯定的なフィードバックを受け取りました（結果は<a href="https://github.com/WICG/ua-client-hints/issues/315">こちら</a>と<a href="https://github.com/WICG/ua-client-hints/issues/314">こちら</a>）。</p>
<p>チームは、不正防止および測定の関係者とともに、これらの潜在的なイシューを調査し続けています。</p>
</td>
  </tr>
  <tr>
   <td>Permission-Policy    </td>
   <td>アクセス許可ポリシーはキャッシュされますか？</td>
   <td>
<a href="https://github.com/WICG/client-hints-infrastructure/issues/105#issuecomment-1100117730">この Github イシューで説明</a>されているように、アクセス許可ポリシーはキャッシュされません。</td>
  </tr>
</table>

### Gnatcatcher（作業中）

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Geolocation use cases    </td>
   <td>Gnatcatcher は、ジオロケーションに基づくコンテンツのパーソナル化など、正当なジオロケーションのユースケースを今後機能させなくなる可能性があります。</td>
   <td>We are working with stakeholders to ensure that Chrome continues to support legitimate use-cases of IP addresses.    </td>
  </tr>
</table>

## サイト間プライバシー境界の強化

### First-Party Sets

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Policy    </td>
   <td>Concern that FPS is not consistent with the CMA commitments’ provisions regarding "Applicable Data Protection Legislation," on the basis that GDPR does not impose a limit on the number of sites in a set while FPS envisages a limit of 3.    </td>
   <td>Google は、Google 自身のビジネスを自己優先することによって競争を歪めない方法でプライバシー サンドボックスの提案を設計および実装し、デジタル広告、サイト運営者、および広告主における競争への影響、および適用されるデータ保護法に定められていプライバシーの結果およびデータ保護原則の遵守への影響を考慮に入れることを CMA に約束しました。表明された懸念は、GDPRとの非互換性を開示するものではありません。Googleは、この仕事がこれらのコミットメントに準拠していることを確認するために、CMAと緊密に協力し続けます。</td>
  </tr>
  <tr>
   <td>ドキュメント</td>
   <td>例の追加と既存の Explainer の更新</td>
   <td>Explainer の例はレビュー中であり、必要に応じて明確にするか削除します。</td>
  </tr>
  <tr>
   <td>環境設定の共有</td>
   <td>同じパーティ セット全体で環境設定を設定する提案。</td>
   <td>フィードバックを求めており、<a href="https://github.com/WICG/first-party-sets/issues/111">こちら</a>でそのアイデアについて積極的に議論しています。</td>
  </tr>
  <tr>
   <td>実施</td>
   <td>透過的な実施プロセスには、バッドアクターによる悪用のリスクがあります。</td>
   <td>フィードバックに感謝します。GitHub およびその他のフォーラムで関係者と積極的に対話して、このリスクを評価し、潜在的な軽減策を特定しています（<a href="https://github.com/WICG/first-party-sets/issues/101">このイシュー</a>で提起された点を考慮し、<a href="https://github.com/WICG/first-party-sets/issues/95">このイシュー</a>で提起された提案を組み込むことを検討しています）。</td>
  </tr>
  <tr>
   <td>共通オーナーシップ</td>
   <td>共通オーナーシップの機械可読宣言の提案。</td>
   <td>この<a href="http://github.com/WICG/first-party-sets/issues/110">提案</a>に対するご意見をお待ちしています。</td>
  </tr>
  <tr>
   <td>Subdomains ownerships    </td>
   <td>異なるデータ管理者、異なるプライバシー ポリシー、または異なるエンティティによって運営されている異なるサブドメインは、同じ First-Party Sets の一部である必要がありますか？</td>
   <td>Based on feedback, we plan to remove the common eTLD use case.     </td>
  </tr>
  <tr>
   <td>悪用の緩和</td>
   <td>悪用緩和対策の詳細についてのリクエスト</td>
   <td>The management of the process is under consideration and more details will be shared in the coming months.    </td>
  </tr>
  <tr>
   <td>Potential attack vector    </td>
   <td>簡単に見つけられるページの欺瞞的な関連セットを使用して、独立を偽って表示する他のページに誘導できる可能性がある</td>
   <td>積極的に一般からの意見を集め、<a href="http://github.com/WICG/first-party-sets/issues/101">このイシュー</a>に対処する方法を調査しています。</td>
  </tr>
  <tr>
   <td>セットの検証</td>
   <td>Validating the set via consented common policies.    </td>
   <td>ウェブ標準コミュニティやより広範なエコシステムのさまざまなメンバーから、<a href="http://github.com/WICG/first-party-sets/issues/108">これは実現不可能であると指摘</a>されています。</td>
  </tr>
  <tr>
   <td>Domain limit    </td>
   <td>Request for expanding the number of associated domains.    </td>
   <td>FPS でのドメイン制限について積極的に議論しており、ユース ケースに必要な関連ドメインの数について、コミュニティからのフィードバックをお待ちしております。</td>
  </tr>
  <tr>
   <td>サブセット サービスの操作</td>
   <td>サービスと関連するサブセットの操作に関する懸念。</td>
   <td>We appreciate the feedback and will look into making this more explicit in the future specs.    </td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>プライバシーの向上</p>
</td>
   <td>同じセット内のサイトが多すぎると、サードパーティ Cookie と同様の結果になる可能性があります</td>
   <td>
<em>Q3 Update:</em><p>最新の提案では、「関連付けられた」サブセットに対して 3 つのドメインの制限が提案されています（ccTLD とサービス ドメインは含まれません）。Chrome はエコシステムと積極的に連携して、この制限が適切かどうかを判断しています。</p>
</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>一般的なプライバシー ポリシー要件</p>
</td>
   <td>It is infeasible to maintain a common privacy policy across all products, and jurisdictions that need to be part of the same set.    </td>
   <td>
<em>Q3 Update:</em><p>共通のプライバシー ポリシーは、同じセットの一部である必要はなくなりました。</p>
</td>
  </tr>
</table>

### Fenced Frames API

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>なぜ iframe の属性ではなく新しい要素なのですか？</td>
   <td>Question regarding proposal Frenced Frame instead of existing iFrame proposals.    </td>
   <td>フィードバックを歓迎しています。<a href="https://github.com/WICG/fenced-frame/issues/50">こちら</a>で議論されているように、現状を収束させる方法についてのアイデアをお待ちしています。</td>
  </tr>
  <tr>
   <td>Fenced Frames 内の交差オブザーバー</td>
   <td>Questions regarding the viewability of information inside a Fenced Frame.    </td>
   <td>これについては活発な議論が行われており、<a href="https://docs.google.com/document/d/1qUzcup_BX9LNlv2Bw4QxWJaTo7nbwQEkPiLKfYbYsP0/edit">このドキュメント</a>と <a href="https://github.com/WICG/turtledove/issues/264">GitHub</a> ではコメント期間にあります。サポート方法をよりよく理解するために、パートナーからのユースケースの共有をお待ちしています。</td>
  </tr>
  <tr>
   <td>動画とネイティブ広告枠のサポート</td>
   <td>Fenced Frames は動画とネイティブ広告枠をサポートしていますか？</td>
   <td>動画再生機能に関しては、Fenced Frame は iframe と変わらないため、どの公開ドキュメントでも明示的には言及されていません。動画広告に問題が見られる場合は、さらに調査するために<a href="https://github.com/WICG/fenced-frame/issues">フィードバックを送信</a>してください。</td>
  </tr>
  <tr>
   <td>ウェブバンドル</td>
   <td>Fenced Frame x FLEDGE では、ウェブバンドルによる広告配信/レンダリングは将来必須になりますか？</td>
   <td>長期的には、Fenced Frames で広告コンテンツをレンダリングするためのウェブバンドルをサポートすることを目標としていますが、FLEDGE の現在の実装はこれをサポートしていないため、renderUrl から取得した HTML リソースをレンダリングする必要があります。</td>
  </tr>
  <tr>
   <td>アセットの寸法</td>
   <td>適切なサイズのクリエイティブで応答できるように、render_url がスロットの高さと幅のマクロをサポートすることを要求</td>
   <td>これについては、<a href="https://github.com/WICG/turtledove/issues/311#issuecomment-1252229234">こちら</a>で活発に議論されています。</td>
  </tr>
</table>

### Shared Storage API

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>FLEDGE 統合</td>
   <td>共有ストレージと FLEDGE はどのように統合されますか？</td>
   <td>現在はこれを追求していませんが、プライバシー保護を確実に維持できるのであれば、このアイデアを検討したいと考えています。関係者には、この提案が共有ストレージの <a href="https://github.com/WICG/shared-storage/issues">github リポジトリ</a>または FLEDGE の <a href="https://github.com/WICG/turtledove/issues">github リポジトリ</a>に、サポートできる可能性のあるユース ケースの提案を提出することをお勧めしています。</td>
  </tr>
  <tr>
   <td>Data retention    </td>
   <td>共有ストレージをクリアすると、有用性が減少します。保持期間の延長または個々のキー/値を削除する機能は、代替手段として検討されていますか？</td>
   <td>ユーザーのプライバシーと有用性のトレードオフのバランスを常に考えています。調整に関するフィードバックをお待ちしております。パートナーが共有ストレージをテストする際に、<a href="https://github.com/WICG/shared-storage/issues">より多くのフィードバックと詳細を提供する</a>ことをお勧めします。</td>
  </tr>
  <tr>
   <td>否定的なシグナル</td>
   <td>Negative signal from Mozilla regarding the Shared Storage proposal.    </td>
   <td>この提案を慎重に検討してくれた Mozilla に感謝します。近いうちにフィードバックに対応する予定です。</td>
  </tr>
</table>

### CHIPS

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>Partitioned の要件</td>
   <td>ファーストパーティ Cookie の「Partitioned」属性に明示的な動作要件の追加</td>
   <td>これについては、PrivacyCG コールで議論し、 <a href="http://github.com/privacycg/CHIPS/issues/51">GitHub イシュー</a>をメモとともにフォローアップしました。ブラウザ、開発者、プライバシー コミュニティと協力して、動作を調整し、それを指定する作業を続けています。</td>
  </tr>
  <tr>
   <td>認証済みの埋め込み</td>
   <td>様々なパーティション化によって認証済みの埋め込みに影響があるため、CHIPS は 現在の SSO サインインフローに影響を与える可能性があります。</td>
   <td>認証済みの埋め込みのユースケースを認識しており、解決策を模索しています。</td>
  </tr>
  <tr>
   <td>Cookie のパーティション制限</td>
   <td>現在の 10 個の Cookie 制限では、特定のユース ケースに対応できない可能性があるという懸念</td>
   <td>We’re moving away from a limit on the number of cookies to a 12kb memory limit. Doing so allows us to address concerns on the cookie limit while ensuring performance and browser memory footprint is not adversely impacted.    </td>
  </tr>
  <tr>
   <td>オリジントライアルのタイムライン</td>
   <td>ホスト名の境界要件の削除に従って、OT を延長してほしい</td>
   <td>We have extended the origin trial deadline following feedback from the ecosystem.    </td>
  </tr>
  <tr>
   <td>Testing limitations in Chrome    </td>
   <td>Chrome の現在の制限により、Firefox で CHIPS をテストできる可能性</td>
   <td>Firefox の実装はほぼ異なります。Chrome は Cookie の制限が低く、CHIPS はオプトイン メカニズムですが、Firefox はデフォルトでパーティション化されています。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>認証済みの埋め込み</p>
</td>
   <td>サインオン状態は CHIPS で保持されますか？</td>
   <td>
<em>Q3 Update:</em><p>サインイン状態は現在保持されていませんが、CHIPS の意図したユースケースではありません。認証された埋め込みのユースケースを認識しており、解決策を模索しています。</p>
</td>
  </tr>
</table>

### FedCM

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>潜在的な攻撃ベクトル</p>
</td>
   <td>リンクデコレーションとタイミング攻撃による潜在的な攻撃ベクトル。</td>
   <td>
<em>Q3 Update:</em><p>Mozilla と協力して、タイミング攻撃の問題に対処する方法について共通の理解に達しました。詳細は<a href="https://fedidcg.github.io/FedCM/#the-idp-sign-in-status-api">こちら</a>をご覧ください。現在、このアーキテクチャ変更のプロトタイプを作成しており、今後数四半期で実験を行う予定です。</p>
</td>
  </tr>
  <tr>
   <td>Identity providers    </td>
   <td>Account chooser: single identity provider. Request to allow multiple identity providers.    </td>
   <td>複数の ID プロバイダーを許可する方法について、ブラウザベンダーおよび FedID CG と協力し、試してみる価値のある定式化に到達しました。提案の説明は<a href="https://github.com/fedidcg/FedCM/pull/351">こちら</a>にあります。今後数四半期でプロトタイプを開発し、実験を行う予定です。</td>
  </tr>
  <tr>
   <td>連携に関する既知の問題</td>
   <td>連携がサード パーティ Cookie の廃止によって問題に遭遇する可能性があるケースを挙げてください</td>
   <td>FedID CG には、連携が<a href="https://github.com/fedidcg/use-case-library/wiki/Primitives-by-Use-Case">ここ</a>と<a href="https://github.com/fedidcg/use-case-library/wiki/Third-party-cookie-mitigations">ここ</a>で壊れるケースを列挙した作業項目があります。また、破損をウェブプラットフォーム API にマップするための意思決定マトリックスも<a href="https://github.com/fedidcg/use-case-library/wiki/User-Flow-Decision-Trees">こちら</a>に用意しています。</td>
  </tr>
  <tr>
   <td>Nounce parameter    </td>
   <td>Nounce パラメーターはサインイン フローに影響しますか？</td>
   <td>This could be considered cross-site tracking, but we are still gathering input and analyzing how to treat such cases.     </td>
  </tr>
  <tr>
   <td>User consent    </td>
   <td>オリジンごとに異なる証明書利用者（RP）とユーザーの同意のリンク</td>
   <td>この仕様では、同じドメイン内のオリジンが Cookie を共有する方法を制御できません。この仕様では、IDP オリジンから RP オリジンへの idtoken を許可していますが、ユーザーのサインイン状態を、その単一のオリジンにロックされた Cookie に保存するか、同じドメイン内で同じオリジンと共有される Cookie に保存するかは、RP が選択します。</td>
  </tr>
  <tr>
   <td>IDP アカウント<p>移植性</p>
</td>
   <td>User option to migrate IDPs if they choose when transferring between two IDPs.    </td>
   <td>That seems like something that the user would need to do directly in the sign up page of their new IDP of choice, not via the FedCM API.    </td>
  </tr>
  <tr>
   <td>Account deletion    </td>
   <td>IDP のアカウント削除による IDP 取り消し</td>
   <td>この<a href="http://github.com/fedidcg/FedCM/issues/313">機能リクエストは意見を受け付けており</a>、調査中です。</td>
  </tr>
  <tr>
   <td>UI に関するクレーム</td>
   <td>ブラウザ固有のインターフェイスの側面に関するクレーム。</td>
   <td>これに対処するには、<a href="https://github.com/fedidcg/FedCM/pull/337">プルリクエスト</a>を参照してください。</td>
  </tr>
  <tr>
   <td>IDP リファーラルチェック</td>
   <td>IDP が RP のリファラーをチェックする。</td>
   <td>Added mandatory IDP referrer check to spec. See <a href="https://github.com/fedidcg/FedCM/pull/338">pull request</a>.    </td>
  </tr>
  <tr>
   <td>サインインのフロー</td>
   <td>RP 設定に基づいてカスタマイズされるサインインフローに関するリクエスト</td>
   <td>このアイデアを歓迎しており、<a href="https://github.com/fedidcg/FedCM/issues/348">積極的に議論</a>しています。</td>
  </tr>
</table>

## スパムや詐欺への対抗

### Trust Tokens API

<table>
  <tr>
   <td>
<strong>Feedback Theme </strong>
   </td>
   <td>
<strong>要約</strong>
   </td>
   <td>
<strong>Chrome の返答</strong>
   </td>
  </tr>
  <tr>
   <td>不正と悪用</td>
   <td>ボットが発行者を騙してトークンを与えていないこと、ボットが実際のユーザーに発行されたトークンを乗っ取っていないこと、およびボットが悪意のあるトークンを発行するのを防ぐためのツールは？</td>
   <td>ボットは発行者からトークンを取得できる可能性がありますが、発行者は、トークンを発行する頻度に制限を設け、トークンを発行し、悪意のあるアクターがトークンを回避しようとするときに発行ロジックを更新するための堅牢な方法を用意することが推奨されます。ウェブサイトはより堅牢な発行者に依存することを優先するため、トークンを発行するのに十分に堅牢なロジックがない発行者のエコシステムでの信頼は、低くなる可能性があります。</td>
  </tr>
  <tr>
   <td>不正と悪用</td>
   <td>トラスト トークンの引き換え者が、特定のエンティティからのトラスト トークンのみを受け入れるように指定できる方法はありますか？</td>
   <td>はい、あります。Explainer の<a href="https://github.com/WICG/trust-token-api#trust-token-redemption">トラストトークンの引き換え</a>セクションでは、これがどのように機能するかについて説明しています。<a href="https://github.com/WICG/trust-token-api#trust-token-redemption"> </a>
</td>
  </tr>
  <tr>
   <td>不正と悪用</td>
   <td>トラスト トークンの発行者が引き換え者のリストを定義して、他の人がトークンを引き換えられないようにする方法はありますか？</td>
   <td>Not at present, but the team is investigating this use case.    </td>
  </tr>
  <tr>
   <td>Timeline    </td>
   <td>Trust Token API はいつ一般提供されますか？</td>
   <td>タイムラインにコミットできるようになり次第、さらに情報を公開します。</td>
  </tr>
  <tr>
   <td>（Q2 にも報告）<p>メンテナンスのオーバーヘッド</p>
</td>
   <td>プロトコルバージョンがサポートされる期間が明確ではありません。</td>
   <td>
<em>Q3 Update:</em><p>バージョン間の移行に猶予が与えられるように、複数の同時バージョンをサポートするための API の追加サポートが追加されているところですが、サポート/非推奨の時期はまだ検討中です。</p>
</td>
  </tr>
</table>
