---
layout: layouts/doc-post.njk
title: フィードバック レポート - 2022 年第 4 四半期
subhead: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 4 四半期の四半期レポートです。
description: プライバシーサンドボックスの提案と Chrome の対応に関して受け取ったエコシステムのフィードバックをまとめた 2022 年第 4 四半期の四半期レポートです。
date: 2023-01-31
authors:
  - anusmitaray
---

CMA へのコミットメントの一環として、Google は、プライバシー サンドボックスの提案に対する関係者のエンゲージメントプロセスに関する四半期レポートを公開することに同意しました（[コミットメント](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)の第 12 段落および 17(c)(ii) を参照）。これらのプライバシーサンドボックスに関するフィードバック要約レポートは、[フィードバックの概要](/docs/privacy-sandbox/feedback/)に記載されているさまざまなソースから Chrome が受け取ったフィードバックを集計して生成されます。これには、GitHub のイシュー、[privacysandbox.com](https://privacysandbox.com/) で利用できるフィードバックフォーム、業界関係者との会議、およびウェブ標準フォーラムが含まれますが、それに限定されていません。Chrome は、エコシステムから受け取ったフィードバックを歓迎し、それから学んだことを設計の決定に統合する方法を積極的に模索しています。

フィードバックのテーマは、API ごとに発生率によってランク付けされます。これは、特定のテーマに関して Chrome チームが受け取ったフィードバックの量を集計し、量の多い順に整理することによって行われます。一般的なフィードバックのテーマは、公開会議（W3C、PatCG、IETF）、直接的なフィードバック、GitHub、および Google の内部チームや公開フォームを通じて浮上したよくある質問からの議論のトピックを確認することによって特定されました。

より具体的には、ウェブ標準化団体の会議の議事録がレビューされ、直接的なフィードバックについては、1 対 1 で行われた Google の関係者会議の記録、個々のエンジニアが受け取ったメール、API メーリングリスト、公開フィードバックフォームが考慮されました。次に、Google はこれらのさまざまなアウトリーチ活動に関与するチーム間で調整を行い、各 API に関連して出現したテーマの相対的な発生率を判断しました。

フィードバックに対する Chrome の対応の説明は、公開されている FAQ、関係者によって提起されたイシューに対する実際の対応、およびこの公開報告の目的に特化した立場の決定に基づいて作成されました。開発とテストの現在の焦点を反映して、特に Topics、Fledge、および Attribution Reporting API に関する質問とフィードバックが寄せられました。

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
<dt>IDP</dt>    <dd>ID プロバイダー</dd>
<dt>IETF</dt>   <dd><p data-md-type="paragraph"><a href="https://www.ietf.org/">インターネット エンジニアリング タスク フォース</a></p></dd>
<dt>IP</dt>     <dd>インターネット プロトコル アドレス</dd>
<dt>openRTB</dt>
<dd><p data-md-type="paragraph"><a href="https://iabtechlab.com/standards/openrtb/#:~:text=OpenRTB%20is%20the%20communication%20protocol,in%20the%20digital%20advertising%20industry.">リアルタイム入札</a></p></dd>
<dt>OT</dt>     <dd><p data-md-type="paragraph"><a href="/blog/origin-trials/">オリジントライアル</a></p></dd>
<dt>PatCG</dt>  <dd><p data-md-type="paragraph"><a href="https://www.w3.org/community/patcg/">プライベート広告技術コミュニティグループ</a></p></dd>
<dt>RP</dt>    <dd>証明書利用者</dd>
<dt>SSP</dt>    <dd>サプライサイド プラットフォーム</dd>
<dt>UA</dt>     <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">ユーザーエージェント文字列</a></p></dd>
<dt>UA-CH</dt>  <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/user-agent/">User-Agent Client Hints</a></p></dd>
<dt>W3C</dt>    <dd><p data-md-type="paragraph"><a href="https://www.w3.org/">ワールド・ワイド・ウェブ・コンソーシアム</a></p></dd>
<dt>WIPB</dt>   <dd><p data-md-type="paragraph"><a href="/docs/privacy-sandbox/gnatcatcher/">Willful IP Blindness</a></p></dd>
</dl>

{% endDetails %}

## 一般的なフィードバック、API/テクノロジーの指定なし

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の対応</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>（Q3 にも報告）<br><br>さまざまなタイプの関係者にとっての有用性</td>
      <td>プライバシーサンドボックステクノロジーが大規模なデベロッパーに有利であり、ニッチ（小規模な）サイトが一般的な（大規模な）サイトよりも多くの貢献をしているという懸念。</td>
      <td>対応は、Q3 から変更ありません。<br><br> <em>「Google は CMA に対し、プライバシー サンドボックスの提案を、Google 自身のビジネスを自己優先することによって競争を歪めない方法で設計および実装し、規模に関係なくデジタル広告の競争およびパブリッシャーと広告主への影響を考慮に入れることを約束しました。引き続き CMA と緊密に連携し、取り組みがこれらのコミットメントに準拠していることを確認します。</em><br><br><em>プライバシー サンドボックスのテストが進むにつれて、評価対象となる重要な質問の 1 つは、新しいテクノロジーがさまざまなタイプの関係者に対してどのように機能するかということです。この点で、フィードバックは重要です。特に、技術設計をさらに改善するのに役立つ具体的で実用的なフィードバックが重要です。</em><br><br><em>CMA と協力して定量的テストへのアプローチを開発しており、市場参加者により多くの情報を提供し、提案されたアプローチについてコメントする機会を提供するために、CMA が実験デザインに関するメモを発行することを支持しています。」</em>
</td>
    </tr>
    <tr>
      <td>（Q3 にも報告）<br>ドキュメントのリクエスト</td>
      <td>テスト、分析、および実装を管理する方法を詳述するリソースのリクエスト</td>
      <td>第 4 四半期の更新:<br><br>開発者が現在の資料を参考してくれたことに感謝しており、新しいテクノロジーががどのように機能するかを開発者が理解できるように、より多くの資料を提供することに引き続き取り組んでいます。過去 1 四半期にわたって、<a href="http://privacysandbox.com">privacysandbox.com</a> に「新機能と更新」セクションを追加し、プライバシー サンドボックスが広告の関連性の促進に今後どのように役立つかについての広範なレビューを公開しました。<br><br>また、ベストプラクティスとデモを共有するための公開デベロッパーオフィスアワーセッションや、ライブディスカッション/質疑応答を可能にするプロダクトリーダーやエンジニアリングリーダーとの Q&amp;A セッションも開催しました。</td>
    </tr>
    <tr>
      <td>Core Web Vitals</td>
      <td>プライバシー サンドボックス API の遅延は、Core Web Vitals にどのように影響しますか？</td>
      <td>遅延を最小限に抑えることは、プライバシーサンドボックス API の重要な設計目標です。現在のところ、API のレイテンシがサイトの Core Web Vitals に与える影響は最小限であると予想されます。これは、API の大部分が Web サイトの最初のレンダリング後に呼び出されるためです。各 API のレイテンシをさらに短縮するために、引き続き監視と改善を行い、継続的なテストとフィードバックをお勧めします。<br><br>リアルタイム入札プロセスの遅延については、「FLEDGE オークションのパフォーマンス」の FLEDGE セクションで説明されています。</td>
    </tr>
    <tr>
      <td>相互運用性</td>
      <td>他の潜在的なソリューションとの相互運用性に関する懸念</td>
      <td>プライバシー サンドボックスの目標は、ウェブエコシステムのニーズをサポートしながら、クロスサイト トラッキングからユーザーを保護することです。これを実現するために、サードパーティ Cookie などのクロスサイト トラッキングを可能にする従来のブラウザ テクノロジーから離れ、特定のユースケースをサポートするために専用に構築された新しいテクノロジーを代わりに提供します。<br><br>プライバシー サンドボックスの提案は、ユーザーのデバイスから出るデータを制限することでプライバシーを改善します。この提案は、ブラウザから収集されたデータを共有またはその他の方法で処理するウェブサイトの機能に技術的な制限を課すものではありません。したがって、これらのテクノロジーは、企業が「データ管理」契約またはその他の類似の契約関係を締結することを妨げるものではありません。同様に、ユーザーが他の手段でデータを共有することに同意する能力を制限するものでもありません。<br><br>明確にするために、Google はプライバシー サンドボックス テクノロジーを、Google の製品やサービスを含むすべてのウェブサイトに同じ方法で適用することを約束しました。Chrome がサードパーティ Cookie のサポートを終了した後、Google がユーザーの同期された Chrome ブラウジング履歴などの他の個人データを使用して、デジタル広告のターゲティングまたは測定のためにユーザーを追跡しないことも、コミットメントで明確にされています。</td>
    </tr>
  </tbody>
</table>

## 関連するコンテンツと広告の表示

### Topics

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Google 検索ランキングへの影響</td>
      <td>ウェブサイトの Topics API サポートが、Google 検索結果のランキングの潜在的なシグナルとして使用されるかどうかについてのお問い合わせ</td>
      <td>ウェブサイトによっては、Topics API をオプトアウトすることを選択する場合があります。プライバシー サンドボックス チームは、ウェブサイトが Topics API を採用するインセンティブとしてページ ランキングを使用するように、検索組織に調整したり要求したりしていません。 Google は CMA に対して、Google 検索が Topics API をオプトアウトするというサイトの決定をランキング シグナルとして使用しないことを確認しました。</td>
    </tr>
    <tr>
      <td>トピックの分類子</td>
      <td>ホスト名に加えて URL とページ コンテンツを追加して、ウェブページのトピックを決定し、さまざまな関係者にとっての有用性を向上させます。</td>
      <td>ユーザーの閲覧履歴は現在、ウェブサイトのホスト名を使用して分類されています。Chrome は、トピック分類でページ レベルのメタデータ（ページ URL やコンテンツのすべてまたは一部のコンポーネントなど）を考慮するためのオプションを引き続き評価しています。有用性の改善においては、プライバシーと悪用のリスクと比較検討する必要があります。<br><br>たとえば、特にメタデータに関しては、次のようなリスクがいくつかあります。<br> - さまざまな（および潜在的に機密性の高い）意味をトピックにエンコードする方法としてサイトがページ レベルのメタデータを変更する。<br> - 金銭的利益のためにトピックを偽ってサイトがページレベルのメタデータを変更する。<br> - クロスサイト トラッキングの方法としてサイトがページ レベルのメタデータを動的に変更する</td>
    </tr>
    <tr>
      <td>（Q3にも報告）<br>自社シグナルへの影響</td>
      <td>トピック シグナルは非常に価値がある可能性があり、その結果、他のファースト パーティのインタレスト ベース シグナルの価値が低下してしまいます。</td>
      <td>対応は、Q3 から変更ありません。<br> <br> <em>「インタレストベースの広告はウェブにとって重要なユースケースであると考えており、トピックはそのユースケースをサポートするように設計されています。［第 3 四半期のレポートで］説明したように、他のエコシステム関係者は、Topics は価値を提供するには十分に有用ではない可能性があるという懸念を表明しています。いずれの場合も、分類法の改善は継続的な取り組みであり、エコシステムのテストとインプットによって分類法が進化することを期待しています。」</em>
</td>
    </tr>
    <tr>
      <td>分類法の更新</td>
      <td>分類リストはどのように更新されますか？</td>
      <td>エコシステムにとって最も有用な<a href="https://github.com/patcg-individual-drafts/topics/issues/3">分類法</a>に関する<a href="https://github.com/patcg-individual-drafts/topics/blob/main/meetings/2023-01-11-minutes.md">フィードバックを積極的に求めています</a>。最初の Topics API 提案に含まれる分類法は、機能テストを可能にするように設計されました。Chrome では、分類法を更新するための複数のアプローチを積極的に検討しています。たとえば、Chrome は各トピックの商業的価値の概念を利用して、将来のインテレーションにどのカテゴリを含めるかを決定する場合があります。</td>
    </tr>
    <tr>
      <td>Topics の地域的な分類子のパフォーマンス</td>
      <td>地域ドメインでの Topics の分類子のパフォーマンスが低い</td>
      <td>分類器の改善は継続的な取り組みです。受け取ったフィードバックに基づいて検討している 1 つの可能性は、トピックの上書きリストを拡張することです。これにより、グローバルなカバレッジが拡大し、精度が向上することが分析で示されています。<br><br>説明すると、Topics API 分類には、（1）上位 10,000 のサイトとそのトピックを含むオーバーライド リスト、（2）ホスト名をトピックに分類するデバイス上の ML モデルの 2 つの関連コンポーネントがあります。オーバーライド リスト（1）を拡張することで、分類器のパフォーマンスが低下している可能性のある地域の分類パフォーマンスを向上させることができます。</td>
    </tr>
    <tr>
      <td>1 週間のエポック</td>
      <td>1 週間のエポックは、短期間で決定を下そうとするユーザーにとって長すぎます。</td>
      <td>エポックの適切な長さについては積極的に検討を進めており、エコシステムにとってより適したエポックに関する<a href="http://github.com/patcg-individual-drafts/topics/issues/119">さらなるフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td>HTTP ヘッダーの取得</td>
      <td>トピックの HTTP ヘッダー取得に関する十分な情報がないことへの懸念</td>
      <td>ヘッダーと fetch() の作業が進行中です。<a href="/docs/privacy-sandbox/topics/#use-a-header-to-access-topics">こちら</a>にも情報を提供しています。また、Explainer に <a href="https://github.com/GoogleChrome/developer.chrome.com/pull/4280">skipObservation 情報を追加</a>しました。</td>
    </tr>
    <tr>
      <td>Topics は、ユーザーではなく、広告主のみを支援することを目的としている</td>
      <td>Topics/プライバシー サンドボックスは、業界に焦点を当てたアプローチのようです。ユーザーにとってのメリットは、業界にとってのメリットほど明確ではありません。</td>
      <td>ユーザーにとってのメリットは、ウェブを自由でオープンな状態に保つインタレスト ベースの広告をトピックがサポートしていることであり、サードパーティ Cookie と比較してプライバシーが<a href="https://github.com/patcg-individual-drafts/topics/blob/main/topics_analysis.pdf">大幅に改善される</a>と考えています。実行可能な代替手段なしにサードパーティ Cookie を削除すると、サイト運営者に悪影響を与える可能性があり、より悪いアプローチにつながる可能性があります。<br>それではプライベート性が低く、透過的ではなく、ユーザーが現実的にリセットしたり制御したりできません。多くの企業が Topics とサンドボックス API を積極的にテストする一方で、私たちはプライバシーを向上させ、ウェブをサポートするためのツールを提供することに取り組んでいます。<br><br><br> W3C テクニカル アーキテクチャ グループは最近、Topics API に関する<a href="https://github.com/w3ctag/design-reviews/issues/726">最初の見解</a>を公開しました。この段階では、Google はこのレビューが Topics API の開発とリリースに何を意味するかについてエコシステムから質問を受けているため、年内に Chrome 安定版で利用できるようにする計画を再確認したいと思います。 Google は、W3C テクニカル アーキテクチャ グループの意見を高く評価していますが、CMA およびエコシステムと協議して Topics を開発およびテストする努力を継続することが最も重要であると考えています。</td>
    </tr>
    <tr>
      <td>データ漏洩</td>
      <td>トピックが無断で他サイトに流出する懸念</td>
      <td>Topics API の設計により、単一のサイト運営者（および少数のサイト運営者グループ）から何らかの方法でデータが漏洩する可能性はほとんどありません。サイト運営者のウェブサイトも Topics API を完全に制御し、アクセス許可ポリシーを介してこの API へのアクセスを禁止できます。</td>
    </tr>
    <tr>
      <td>テスト用の広告主の不足</td>
      <td>サイト運営者は、現在トピックの価値を広告主に示すことができないことに懸念を抱いています。</td>
      <td>2023 年後半には、すべての広告関連 API を統合テストに使用できるようにし、広告主にとっての Topics の価値に関するエコシステム分析を可能にする予定です。テストと結果の公開は、データ、分析、および方法論をレビューする CMA によって管理されます。エコシステムは、Google と CMA にフィードバックを提供することをお勧めします。</td>
    </tr>
    <tr>
      <td>Topics と FLEDGE</td>
      <td>FLEDGE の入札ロジック内での Topics の使用方法に関する詳細情報のリクエスト</td>
      <td>FLEDGE の入札ロジック内でトピックを利用することは<a href="/docs/privacy-sandbox/faq/#can-the-topics-api-be-used-with-the-fledge-api">可能です</a>。統合ガイドも作成中であり、実装に関する追加の詳細が含まれます。</td>
    </tr>
    <tr>
      <td>トピックの呼び出し元のカスタム ランキング</td>
      <td>呼び出し元ごとにランキングを調整できるようにする</td>
      <td>各アドテックのカスタム トピックのランキングまたは価値における課題は、これが、返されるトピックにアドテックが影響を与える仕組み、つまりフィンガープリンティングのベクトルになる可能性があることです。</td>
    </tr>
    <tr>
      <td>トピック呼び出し元の優先リスト</td>
      <td>Topics API が適性に基づいて返すトピックのランク付けされた優先度リストを呼び出し元が提供できるようにする</td>
      <td>現在、<a href="https://github.com/patcg-individual-drafts/topics/issues/42">このアイデアについてさらに議論</a>しており、追加の意見を歓迎しています。</td>
    </tr>
  </tbody>
</table>

### FLEDGE

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Google アド マネージャー</td>
      <td>Google アド マネージャーが FLEDGE オークションの最終決定者であり、Google パブリッシャー タグと Google アド マネージャーを優先するのではないかという懸念。</td>
      <td>FLEDGE では、各サイト運営者が、トップレベルおよびコンポーネントのセラーの選択を含め、オークションの構造を選択できます。コンポーネントオークションの各バイヤーとセラーは、トップレベルのセラーが誰であるかを知っており、入札するかどうかを選択できます。</td>
    </tr>
    <tr>
      <td>FLEDGE をテストするのに十分な参加者がいない</td>
      <td>API の機能を改善し、フィンガープリンティングなどのプライバシーを侵害する代替手段を阻止するなど、より多くの企業に FLEDGE をテストするよう奨励してほしいという要求</td>
      <td>プライバシー サンドボックスは、CMA および ICO のガイダンスと緊密に連携して段階的に進行しており、FLEDGE の機能テストは必要な安定性と機能を実証しています。 Google は、エコシステムがサンドボックス API をテストすることを引き続き奨励しており、最近、サードパーティ Cookie の廃止後、FLEDGE やその他の API が広告業界の重要なユースケースをサポートするのにどのように役立つかを示す「<a href="/docs/privacy-sandbox/maximize-ad-relevance/">広告の関連性の最大化</a>」ドキュメントを公開しました。<br><br>プライバシー サンドボックスの他の部分は、トラッキングをカバーするための軽減策を既にサポートしており（UA-CH、IP 保護、およびバウンス追跡の軽減策を参照）、時間の経過とともに改善され続けます。Google の目標は、FLEDGE を唯一の実行可能なターゲティング ソリューションにすることではなく、業界や規制当局と協力して、Chrome ブラウザで最高のプライバシーを保護する広告テクノロジーを推進することに引き続き取り組んでいます。</td>
    </tr>
    <tr>
      <td>機械学習のユースケース</td>
      <td>オークション入札アルゴリズムをトレーニングするための機械学習のユースケースが、FLEDGE と Attribution Reporting でどのようにサポートされるかに関するガイダンスの増加</td>
      <td>テスト担当者がプライバシー サンドボックス テクノロジーを適用するのに最も有用な方法を見つけだせるように支援することが必要であると認識しています。機械学習への入力としてのプライバシー サンドボックス API のさまざまな側面の使用に特に関連するガイダンスの公開を開始しました。最新の記事「<a href="/docs/privacy-sandbox/maximize-ad-relevance/">広告の関連性の最大化</a>」では、広告業界がこれらのシグナルを機械学習にどのように活用できるかについて説明しており、今後もそのようなガイダンスを公開し続ける予定です。</td>
    </tr>
    <tr>
      <td>FLEDGE キー値 (K/V) サーバーのクエリ</td>
      <td>K/V サーバーがパブリックにクエリ可能であるのはなぜですか？</td>
      <td>K/V サーバーは、FLEDGE オークションにリアルタイムのシグナルを提供することを目的としています。そのため、K/V サーバーは、FLEDGE オークションが実行される場所（ユーザーデバイス上）からアクセスできる必要があり、公開されている必要があります。K/V サーバーに保存された値は、既にキーを持っている当事者のみが取得できます。つまり、アドテックがインタレスト グループ内のブラウザにのみキーを提供し、ランダムに推測できるキーを使用しない場合の場合、オークションを実行するために値を必要とするブラウザのみが値を取得できます。</td>
    </tr>
    <tr>
      <td>日付/時間ターゲティングの方法</td>
      <td>入札ロジック関数での日付オブジェクトのサポート。</td>
      <td>これを行うには複数の方法があります。バイヤーはセラーに現在の日付と時刻を提供するように依頼できます。セラーはこの情報をすべてのバイヤーに簡単に提供できるはずです。バイヤーは、リアルタイムの Key-Value レスポンスで日付と時刻を提供することもできます。最後に、バイヤーは、<a href="https://developers.google.com/authorized-buyers/rtb/fledge-origin-trial#propagate_buyer_contextual_signals_perbuyersignals">per-buyer-signals のコンテキスト レスポンス</a>の一部として日時を提供できます。セラーは、これをバイヤーの generateBid スクリプトに渡すことができます。</td>
    </tr>
    <tr>
      <td>ユーザー設定</td>
      <td>FLEDGE または代替ソリューションを介して提供される場合、広告主によってクリエイティブをブロックすることをユーザーが選択できる機能。</td>
      <td>ユーザーは、Chrome で広告 API をオプトアウトできます。特定の広告については、関連するアドテックが、表示されるクリエイティブや選択方法を制御するのに最適な立場にあります。</td>
    </tr>
    <tr>
      <td>より明確なタイムライン</td>
      <td>Fenced Frame の要求など、FLEDGE でのプライバシー保護の可用性に関する詳細情報のリクエスト。</td>
      <td>第 1 四半期には、より詳細なタイムラインを公開する予定です。</td>
    </tr>
    <tr>
      <td>レポーティングに関する混乱</td>
      <td>FLEDGE レポートが Fenced Frames や Private Aggregation API などの他の API とどのように連携するかについての明確な説明</td>
      <td>今後数週間以内に、Private Aggregation API、FLEDGE、および Fenced Frame 間の相互作用に関する Explainer を公開する予定です。</td>
    </tr>
    <tr>
      <td>リアルタイム入札とFLEDGE</td>
      <td>FLEDGE が標準のリアルタイム入札とどのように統合されるかについてのガイダンス。</td>
      <td>リアルタイム入札を行うアドテックの機能を複雑にする 2 つの主な要因は、イベント レベルのデータへのアクセスと、ARA への統合の容易さです。第 1 四半期には、これらの両方に関する最新情報と Explainer を提供する予定です。</td>
    </tr>
    <tr>
      <td>FLEDGE オークションのパフォーマンス</td>
      <td>FLEDGE オークションのレイテンシが高いというテスターからの報告</td>
      <td>テスターからの結果とユースケースを共有するレポートに感謝しています。<a href="https://github.com/WICG/turtledove/issues/385#issuecomment-1322257943">FLEDGE のパフォーマンスを改善する方法</a>についていくつかの提案を共有しました。<br><br>同時に、開発者が<a href="https://github.com/WICG/turtledove/issues/287">オークションを遅くしている原因をより正確に診断できる</a>ツールをブラウザに追加し、観察された遅延の主な原因に体系的に対処してきました。最近の改善点には、<a href="https://github.com/WICG/turtledove/pull/342">スロー オークションのタイムアウト</a>、<a href="https://github.com/WICG/turtledove/pull/329">高速ビッダー フィルタリング技術</a>、 <a href="https://github.com/WICG/turtledove/issues/310">FLEDGE ワークレットを再利用して初期費用の支払いを回避する</a>方法、<a href="https://github.com/WICG/turtledove/issues/385">コンテキスト広告リクエストを FLEDGE の起動時間およびネットワーク フェッチと並行して実行できるようにする</a>進行中の作業が含まれます。 API を使用した実世界での経験に基づいて、Chrome 開発者と FLEDGE テスターの間で進行中の会話として、レイテンシの最適化が続くことを期待しています。</td>
    </tr>
    <tr>
      <td>インタレスト グループ サイズのメモリ制限</td>
      <td>1 つのインタレスト グループのサイズ制限を 50kB から引き上げるリクエスト。</td>
      <td>リクエストを積極的に検討しており、<a href="https://github.com/WICG/turtledove/issues/402">どの制限値が役立つかについてフィードバックを求めています</a>。</td>
    </tr>
    <tr>
      <td>FLEDGE が提供するデータをファーストパーティ Cookie と組み合わせる</td>
      <td>FLEDGE は、広告主のファースト パーティ データとの統合をサポートしますか？</td>
      <td>FLEDGE は、広告主が既に持っているファースト パーティ データを使用して広告をサポートするために構築されました。ただし、FLEDGE は、広告主が自身のサイト以外のウェブサイトである人のブラウジング行動を学習することをサポートする意図はありません。オフサイトのブラウジング動作をファースト パーティ データに関連付けることは、プライバシー サンドボックスの目標に反します。<br><br>今後数週間のうちに、FLEDGE がファーストパーティ データとの統合をどのようにサポートするかについての詳細を含む統合ガイドを共有する予定です。</td>
    </tr>
    <tr>
      <td>K-匿名値</td>
      <td>「K」から「k-anon」の値はどのように決まり、公開されるのでしょうか？</td>
      <td>「K」値はまだ最終決定中であり、計画が進展するにつれて、より多くの情報が共有される予定です。不明な k 値がどのように FLEDGE の準備と ML モデル トレーニングの範囲設定を妨げる可能性があるかについてさらに学ぶことに関心を置いており、この件に関する<a href="https://github.com/WICG/turtledove/issues">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td>複数の SSP のサポート</td>
      <td>複数の SSP は FLEDGE でどのようにサポートされますか？</td>
      <td>FLEDGE は、この<a href="https://github.com/WICG/turtledove/blob/main/Proposed_First_FLEDGE_OT_Details.md#multi-sellerssp-auctions">提案</a>に記載されているように、マルチセラー オークションをサポートしています。</td>
    </tr>
    <tr>
      <td>入札ロジックの可視化</td>
      <td>DSP 入札ロジックが JavaScript で公開されることへの懸念</td>
      <td>現在の設計では、入札ロジック JavaScript に他のユーザーがアクセスできますが、これが DSP の懸念の原因となる理由について、<a href="https://github.com/WICG/turtledove/issues">より多くのフィードバック</a>をお待ちしております。</td>
    </tr>
    <tr>
      <td>prebid.js</td>
      <td>FLEDGE で prebid.js をサポートする予定はありますか？</td>
      <td>FLEDGE モジュールをサポートするのは、Prebid.js のバージョン 7.14 以降のみです。テストに関心のあるサイト運営者は、FLEDGE モジュールを追加し、Prebid インスタンスをアップグレードする必要があります。</td>
    </tr>
    <tr>
      <td>FLEDGE のユーザー定義関数</td>
      <td>ユーザー定義関数 (UDF) は FLEDGE でどのようにサポートされますか?これらは、API の機能を拡張するためにエンド ユーザーがプログラムできる関数です。</td>
      <td>Explainer は<a href="https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md#support-for-user-defined-functions-udfs">こちら</a>で提供されています。これはまだ具体化されている途中であるため、ユースケースに関する<a href="https://github.com/WICG/turtledove/issues">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td>インタレスト グループ リソースに対する同一オリジン制約の緩和</td>
      <td>特定のアドテックのユースケースを可能にするために、インタレスト グループのリソースに対する同一オリジンの制約を緩和するようにする要求</td>
      <td>FLEDGE の現在の実装では、 <code>biddingLogicUrl</code>、<code>biddingWasmHelperUrl</code>、<code>dailyUpdateUrl</code>、<code>trustedBiddingSignalsUrl</code> は、インタレストグループのオーナーと同じオリジンを持つ必要があります。<br><br><a href="https://github.com/WICG/turtledove/issues/421">こちら</a>で説明されているように、攻撃者による特定のエクスプロイトを防止するために制約が存在します。</td>
    </tr>
    <tr>
      <td>InterestGroup の所有権</td>
      <td>アドテックがサイト間で同じインタレスト グループに対して joinInterestGroup を使用できるかどうかを制限するリクエスト</td>
      <td>オーディエンスがどのように構築されるかではなく、どのように使用されるかに焦点を当てています。考えられるアプローチについては<a href="https://github.com/WICG/turtledove/issues/418">こちら</a>で議論しており、追加の意見を歓迎しています。</td>
    </tr>
    <tr>
      <td>キー値 サーバーキーの有効期限</td>
      <td>対応するインタレストグループの有効期限が切れた後にサーバー キーを削除することに関するディスカッション</td>
      <td>キーの有効期限を処理する方法を検討しており、<a href="https://github.com/privacysandbox/fledge-key-value-service/issues/2">こちら</a>でフィードバックを求めています。</td>
    </tr>
  </tbody>
</table>

## デジタル広告の測定

### Attribution Reporting（およびその他の API）

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>オリジン トライアル トラフィック</td>
      <td>現在のオリジン トライアル トラフィックは、実用性をテストするには不十分です。</td>
      <td>現在のオリジン トライアルは、API が意図したとおりに機能することを確認するために、エコシステム プレイヤーが機能テストを実施することを目的としています。さまざまなプライバシー サンドボックス API の開発が成熟すると、ユーティリティ テストを実行するために大量のトラフィックが必要になることを理解しています。現在のテスト タイムラインでは、2023 年第 3 四半期の一般提供（つまり、ユースケースのテクノロジーが開始され、Chrome トラフィックの 100% で利用可能になるとき）までにこれが行われることを想定しています（<a href="http://privacysandbox.com/timeline">privacysandbox.com で最新のタイムライン</a>をご覧ください）。追加のトラフィックを必要とするユース ケースのテストについて、<a href="https://github.com/WICG/attribution-reporting-api/issues">追加のフィードバック</a>を歓迎しています。</td>
    </tr>
    <tr>
      <td>異なるプライバシー サンドボックス測定 API 間での機能の重複</td>
      <td>たとえば Attribution Reporting API と Private Aggregation API など、プライバシー サンドボックスの間で複数の測定アプローチが重複することで複雑さが増すことへの懸念</td>
      <td>API のさまざまなユースケースを明確にするために、ドキュメントを改善することに取り組んでおり、説明が不足しているエリアに関する<a href="https://github.com/WICG/attribution-reporting-api/issues">追加のフィードバックを歓迎しています</a>。たとえば、Attribution Reporting API は特にコンバージョン測定をサポートすることを目的としていますが、Private Aggregation API と Shared Storage は、より広範なクロスサイト測定のユースケースをサポートすることを目的とした汎用 API です。</td>
    </tr>
    <tr>
      <td>失敗したレポートリクエストの再試行</td>
      <td>レポート リクエストが失敗した場合に何回試行されるかについての明確化。</td>
      <td>
<a href="https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg">これに関するガイダンスを公開</a>しています。要約すると、レポートはブラウザが実行中またはオンラインの場合にのみ送信されます。最初の送信失敗の後、レポートは 5 分後に再試行されます。 2 回目の失敗の後、レポートは 15 分後に再試行されます。その後、レポートは送信されません。</td>
    </tr>
    <tr>
      <td>レポーティングの遅延</td>
      <td>レポートの遅延はどのくらい期待されていますか？</td>
      <td>エコシステムで発生しているレポートの遅延を並行してさらに評価できるようにデータを収集しているため、これらの遅延について、<a href="https://github.com/WICG/attribution-reporting-api/issues">より多くのフィードバック</a>を期待しています。</td>
    </tr>
    <tr>
      <td>ページの事前レンダリング</td>
      <td>ARA 属性はプリレンダリング ページで機能しますか？</td>
      <td>プレレンダリング ページでは、アトリビューションの登録は、アクティベーション（実際のクリックまたは表示が行われる）まで延期されます。これは、`attributionsrc` リクエストの ping を延期することを意味します。</td>
    </tr>
    <tr>
      <td>コンバージョン リフトの測定</td>
      <td>同じドメインで AB テストを使用してコンバージョン リフトを測定する方法</td>
      <td>ウェブサイトは、アトリビューション レポートを介して同じドメインで A/B テストを行い、コンバージョン リフトを測定できます。 Aggregate API を使用して A/B パラメータをキーとしてエンコードし、それらのキー バケットごとにコンバージョン値の概要レポートを受け取ることができます。</td>
    </tr>
    <tr>
      <td>（Q3 にも報告）クロスドメイン コンバージョン</td>
      <td>2 つ以上のリンク先など、クロスドメインのコンバージョンを追跡する方法</td>
      <td>第 4 四半期の更新:<br><br>クロスドメインのコンバージョンを追跡できるようにするランディング ページの宛先制限を削除する<a href="https://github.com/WICG/attribution-reporting-api/issues/590">提案を公開</a>しました。この提案は実装済みです。</td>
    </tr>
    <tr>
      <td>（Q3にも報告）<br>コンバージョン レポートの有効期限設定</td>
      <td>24 時間以内のレポート フィルター/有効期限のサポートのリクエスト</td>
      <td>第 4 四半期の更新:<br><br>レポートの遅延とコンバージョンの有効期限のトレードオフを軽減するために、有効期限とレポート ウィンドウを分離するこの<a href="https://github.com/WICG/attribution-reporting-api/pull/577">プルリクエスト</a>を共有しました。これは現在、M110 でローンチされています。</td>
    </tr>
    <tr>
      <td>不正と悪用</td>
      <td>広告が配信されるサイト運営者のサイトに基づいてデータをスライスおよび集計できるようにするという、広告主やマーケティング担当者からのリクエスト。これにより、潜在的な不正広告行為についてより多くのインサイトを得られる可能性がある</td>
      <td>このフィードバックは<a href="https://github.com/WICG/attribution-reporting-api/issues/583">こちら</a>で活発に議論されており、追加の情報提供を歓迎します。</td>
    </tr>
    <tr>
      <td>（Q3 にも報告）イベント レベル レポートの遅延</td>
      <td>イベント レベル レポートの 2 ～ 30 日の遅延は、特定のユース ケースでは長すぎる場合があります。</td>
      <td>イベント レベルのレポートには、2、7、および 30 日のデフォルトのレポート ウィンドウがあります。これは、「expiry」パラメーターを使用して変更できます。アドテックは、2 日以内に潜在的なレポートを取得するために、有効期限を最低 1 日で構成できます。プライバシー保護メカニズムとして、有効期限の粒度を 1 日に制限しています。より詳細なレポートはタイミング攻撃につながる可能性があるためです。さらに、イベント レベル レポートと集計レポートに独立した「有効期限」パラメータを設定できます。<a href="https://github.com/WICG/attribution-reporting-api/pull/556">こちら</a>を参照してください。さらに、Google 広告は、他のアドテックが Attribution Reporting API を介して取得しない特別なレポート ウィンドウを取得しません。</td>
    </tr>
    <tr>
      <td>同一レポートオリジンの要件</td>
      <td>ソース登録オリジンがコンバージョン登録オリジンと同じであるという要件を削除する要求</td>
      <td>このユースケースを解決するために、HTTP リダイレクトを使用して登録を委任することを提案します。新しいガイダンスに関する<a href="https://github.com/WICG/attribution-reporting-api/issues">追加のフィードバック</a>を歓迎します。</td>
    </tr>
    <tr>
      <td>コンバージョン トラッキング</td>
      <td>広告主が設定した特定の時間の前後にコンバージョンが発生したかどうかを区別する必要がある</td>
      <td>Attribution Reporting API は、ソース アトリビューションの有効期限と優先度の設定をサポートしています。両方を使用することで、技術的には、X 日以内に発生したコンバージョンと、X 日後に発生したコンバージョンを区別することが可能になります。</td>
    </tr>
    <tr>
      <td>ノイズシミュレーション</td>
      <td>コンバージョン数の少ない広告主への影響を理解するために、バケットごとのさまざまな量のコンバージョンをシミュレートできるようにするリクエスト</td>
      <td>
<a href="https://noise-lab.uc.r.appspot.com/?mode=simple">Noise Lab</a> の将来のバージョンで、これをシミュレーションする方法を追加する予定です。追加のフィードバックを歓迎します。</td>
    </tr>
    <tr>
      <td>モバイルでのレポート</td>
      <td>Chrome がモバイルのバックグラウンドで実行されている場合でも、レポートは送信されますか？</td>
      <td>現時点では、モバイルでも、Chrome がバックグラウンドにある場合、レポートは送信されません。これは、API が Android Privacy Sandbox と統合されれば変更される可能性があります。<a href="https://github.com/WICG/attribution-reporting-api/issues/579">こちら</a>を参照してください。Android プライバシー サンドボックスは、CMA が承認したコミットメントの一部ではないことに注意してください。</td>
    </tr>
    <tr>
      <td>データの可用性</td>
      <td>Google がプライバシー サンドボックス API を介してデータに追加でアクセスできるようになるという懸念</td>
      <td>まず、Google 広告は、Attribution Reporting API やその他のプライバシー サンドボックス API からのデータへの優先的なアクセスを受け取りません。この問題は、Google のコミットメントの詳細を含む「相互運用性」の下の一般的なフィードバック セクションでも取り上げられています。<br><br>次に、大規模なサイトと小規模なサイトの違いについて、Google はノイズベースのプライバシー保護が小さなデータ スライスに大きな影響を与える可能性があることを認識しています。ただし、いくつかの緩和策が考えられます。たとえば、長期間にわたる集計などの方法でこの問題を解決できます。とはいえ、非常に小さなデータ スライス（1 回または 2 回の購入など）に基づく結論が広告主にとって意味があるかどうかは不明のままです。オリジン トライアル期間中、Google は、この問題に関するより具体的なフィードバックを提供できるように、さまざまなプライバシーおよびノイズ パラメータを試す機能を利用することをテスターに推奨しました。</td>
    </tr>
  </tbody>
</table>

## 隠されたトラッキングの制限

### User-Agent の情報量削減

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ウェブエコシステムの準備が整うまで、ユーザー エージェントの削減を遅らせる</td>
      <td>今後の User-Agent Reduction の変更に適応するための十分な時間がありません。</td>
      <td>このフィードバックは、「Google と CMA とのやり取り」というセクションの「関係者の懸念」にある<a href="https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#progress-reports">完全なレポート</a>で対応します。</td>
    </tr>
    <tr>
      <td>ウェブエコシステムの準備が整うまで、ユーザー エージェントの削減を遅らせる</td>
      <td>構造化ユーザー エージェント（SUA）が展開されるまで、ユーザー エージェント削減のロールアウトを延期するリクエスト</td>
      <td>Google 広告チームは、2021 年 10 月に OpenRTB に<a href="https://github.com/google/ads-privacy/tree/master/experiments/structured-ua">構造化されたユーザー エージェントの追加</a>（<a href="https://github.com/google/ads-privacy/blob/master/experiments/structured-ua/openrtb.md">仕様</a>を参照）を提案し、この提案は 2022 年 4 月にリリースされた 2.6 仕様の更新に組み込まれました。<br><br> UA-CH と WURFL API を使用して SUA を作成する方法を示した <a href="https://www.scientiamobile.com/using-structured-user-agent-from-real-time-bidding-for-device-detection/">Scientia Mobile のブログ記事</a>で示されているように、SUA が現在展開され、利用可能であることが確認されています。</td>
    </tr>
  </tbody>
</table>

###

### User-Agent Client Hints

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>他の隠されたトラッキング防止技術による UA-CH のテスト</td>
      <td>包括的アプローチで一緒に提案されたすべてのプライバシー サンドボックス API とフィンガープリンティング手法をテストする方法に関するガイダンス</td>
      <td>テスト計画は、残りのサンドボックス提案とは対照的に、フィンガープリンティング防止対策の一部を開発するための非同期タイムラインを反映するために設計されました。これは、一部のフィンガープリント防止対策（プライバシー予算、IP 保護、バウンス トラッキングの緩和など）が完全に開発され、サード パーティ Cookie が廃止された後にのみ一般提供を開始する準備が整うという現実に対応しています。<br><br>これらのフィンガープリンティング防止対策は、定量的なテストには含まれませんが、Standstill の時点で入手可能な事実に基づく定性的な評価の対象となります。</td>
    </tr>
    <tr>
      <td>（Q2にも報告）<br>パフォーマンス</td>
      <td>Critical-CH（最初のページ読み込み時）を介してヒントを取得する際の遅延についての懸念</td>
      <td>以下の専用の UA-CH セクションを参照してください</td>
    </tr>
    <tr>
      <td>不十分なフィードバック</td>
      <td>UA-CH の変更に関するエコシステムからのフィードバックは不十分であり、エコシステムからの認識不足に関する懸念につながる可能性があります。</td>
      <td>混乱を最小限に抑える慎重な展開を確実にするために、計画を積極的に共有してきました。<br><br> User-Agent Reduction と UA-CH API の計画は、2022 年 3 月 18 日に W3C Anti-Fraud Community Group に提示され、2022 年 1 月 20 日に Web Payments Working Group と Web Payments Security Interest Group の両方に提示されました。プレゼンテーション中またはプレゼンテーション後に重大な懸念が提起されました。<br><br> Google は 100 を超えるサイト運営者と積極的に協力してフィードバックを得ています。さらに、Google は Blink-Dev チャネルを使用して、エコシステムの関係者からのフィードバックに基づいて、ユーザー エージェント削減のロールアウトを公に伝えています。</td>
    </tr>
    <tr>
      <td>タイミング</td>
      <td>ロールアウトのタイミングと業界の準備状況に関する懸念</td>
      <td>以下の専用の UA-CH セクションを参照してください</td>
    </tr>
    <tr>
      <td>Chrome プラットフォームのステータス</td>
      <td>UA-CH の<a href="https://chromestatus.com/feature/5995832180473856">chromestatus ページの</a>更新を要求</td>
      <td>chromestatus エントリは 12 月 19 日に「混合シグナル」に更新されました。</td>
    </tr>
  </tbody>
</table>

### IP 保護（旧 Gnatcatcher）

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>オプトインまたはオプトアウト</td>
      <td>IP アドレスのプライバシーはオプトインまたはオプトアウトですか？</td>
      <td>すべてのユーザーに IP 保護を提供することを目標としています。その目標を念頭に置いて、現在、IP 保護のユーザー選択オプションを評価しています。</td>
    </tr>
    <tr>
      <td>ファーストパーティ データの IP アドレスのユースケース</td>
      <td>IP アドレスを使用して、IP 保護後のファースト パーティ ドメイン全体のユーザー ジャーニーをつなぎ合わせることができますか？</td>
      <td>以前に<a href="https://github.com/spanicker/ip-blindness#introduction">公開された</a>ように、IP 保護は最初はサード パーティのコンテキストでのトラッキングに焦点が当てられます。つまり、ファースト パーティのドメインへの影響はありません。</td>
    </tr>
    <tr>
      <td>アドテックのユースケース</td>
      <td>企業は IP 保護を使用してどのように不正防止対策を設定できますか？</td>
      <td>今日のウェブにおける詐欺対策のシグナルとしての IP アドレスの重要性を認識しています。CMA へのコミットメント（第 20 項）の一環として、スパム対策および詐欺対策の取り組みを実施するウェブサイトの能力をサポートするための合理的な努力を行わない限り、IP 保護を実装しないと述べています。私たちの最優先事項の 1 つは、IP 保護が不正防止のユースケースと検出機能にどのように影響するかを理解することです。これにより、企業がウェブの安全性を維持するのに役立つプライバシー保護テクノロジーにさらに投資できるようになります。時間の経過とともにシグナルが変化した場合でも、セキュリティおよび詐欺防止企業のニーズをサポートすることを目的とした<a href="https://github.com/spanicker/ip-blindness/issues/15">新しい提案</a>に対する<a href="https://github.com/spanicker/ip-blindness/issues/22">フィードバックと意見</a>をお送りください。</td>
    </tr>
    <tr>
      <td>不正と悪用</td>
      <td>IP 保護にはサービス拒否（DoS）保護が含まれますか？</td>
      <td>ウェブを安全に保ちながらプライバシーを改善することに取り組んでおり、サービス拒否攻撃からの保護は、設計の対象となる重要な不正使用防止のユースケースです。私たちは、IP 保護自体の設計と新しい不正使用防止ソリューションの両方を通じて、DoS 保護への影響を最小限に抑えたいと考えています。IP 保護は基本的にサードパーティの組み込みサービスに重点を置いているため、一部の関係者は、ファーストパーティ サイトの DoS 保護への影響は限定的であるべきだと指摘しています。DoS のユースケース、特にサードパーティの組み込みサービスに対するリスクを評価するために、<a href="https://github.com/spanicker/ip-blindness/issues/14">引き続きパブリック フィードバックを求めています</a>。<br><br>同時に、ユーザーを特定せずにサイトまたはサービスがスパム ユーザーをブロックできるようにする、悪用フィードバックおよびクライアント ブロック メカニズムを調査しています。</td>
    </tr>
    <tr>
      <td>コンテンツフィルタリング</td>
      <td>IP 保護によるコンテンツ フィルタリング</td>
      <td>コンテンツのフィルタリングとユーザー エクスペリエンスのカスタマイズに関しては、企業によってニーズが異なります。このようなユースケースの多くは、現在 IP アドレスに依存していないため、IP 保護の影響を受けません。たとえば、コンテンツを調整してより多くのエンゲージメントを促進しようとしているサイト運営者は、ファースト パーティ Cookie またはサードパーティのパーティション化された Cookie（CHIP）を使用して、ユーザーの興味やサイト運営者との以前のやり取りを理解することがあります。または、適切な広告を適切なユーザーに配信することに重点を置いているアドテックパートナーは、たとえば、FLEDGE と  Topics を組み込んで、サードパーティ Cookie やその他のクロスサイト トラッキング テクノロジーを使用して現在行っているのと同様の広告結果を配信できます。<br><br>また、既存のメカニズムでは不十分なコンテンツ フィルタリングをさらにサポートするために、大まかな地理位置情報などの新しいプライバシー保護機能を IP 保護に組み込むことも検討しています。IP 保護の影響を受ける可能性のあるコンテンツ フィルタリングのユースケースについて、追加のフィードバックをお待ちしております。</td>
    </tr>
    <tr>
      <td>（Q3にも報告）<br>ジオロケーションのユースケース</td>
      <td>IP 保護によって、ジオロケーションに基づくコンテンツのパーソナル化など、正当なジオロケーションのユースケースを機能させなくなる可能性があります。</td>
      <td>第 4 四半期の更新:<br><br> Google は、Chrome が引き続き IP アドレスの正当なユースケースをサポートできるように、関係者と協力して取り組んでいます。IP ジオロケーションの粒度に関するエコシステムのフィードバックを<a href="https://github.com/spanicker/ip-blindness/issues/20">こちら</a>で受け付けています。</td>
    </tr>
  </tbody>
</table>

### プライバシー予算

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>より明確なドキュメント</td>
      <td>プライバシー予算が実装されたときにどのような制限が起きるかを予測できる例の追加</td>
      <td>
<a href="https://github.com/mikewest/privacy-budget">プライバシー予算の提案</a>は現在も活発に議論されており、どのブラウザも実装していません。拡張された可用性の最も早い日付が、プライバシー予算が施行される可能性がある最も早い日付です。これは、2024 年にサードパーティ Cookie が削除されるまでは発生しません。現時点で共有できる追加のドキュメントはありません。<br><br>提案がより確定された時点で、提案に関する追加の詳細を共有します。それまでの間、関係者が提案の開発に役立つ<a href="https://github.com/mikewest/privacy-budget/issues">フィードバックを共有する</a>ことを歓迎します。</td>
    </tr>
  </tbody>
</table>

## サイト間プライバシー境界の強化

### First-Party Sets

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>（Q3 にも報告）ドメイン制限</td>
      <td>関連ドメインの数を増やすリクエスト</td>
      <td>第 4 四半期の更新:<br><br>ローカル テスト用の FPS をリリースしました。これには、GitHub でのモック セットの送信プロセスと、rSA および rSAFor をローカルでテストするためのフラグが含まれます。また、関連するサブセットのユースケースに関する質問に引き続き対応するために、FPS の開発者向けに 2 つの公開ミーティングを開催しました。開発者には、関連するサブセットのドメイン制限がユースケースでの FPS の使いやすさにどのように影響するかについてフィードバックを提供できるよう、FPS 機能をテストすることをお勧めします。<br><br> Google は WICG の電話会議で、Chrome がユーザーのプライバシーのメリットも考慮した使用可能なソリューションを提供することを約束していることを明確にしました。その意味で、ドメイン制限の影響を受ける可能性のある特定のユース ケースに関する<a href="https://github.com/WICG/first-party-sets/issues">コミュニティからのフィードバック</a>をお待ちしております。これにより、チームはユーザーのプライバシーを保護しながらこれらのユース ケースに対処する方法を検討できます。</td>
    </tr>
    <tr>
      <td>悪用緩和対策の詳細についてのリクエスト</td>
      <td>同意していないセットにドメインが追加された場合はどうなりますか？</td>
      <td>2022 年 12 月 2 日に、 <a href="https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md">こちら</a>で First-Party Sets の提出ガイドラインを公開しました。<br><br>提出ガイドラインで説明されているように、一連の変更管理は、所有権の検証を含む GitHub の検証プロセスに従って、これを尊重します。これにより、このリスクが軽減されます。</td>
    </tr>
    <tr>
      <td>不正使用の軽減</td>
      <td>First-Party Sets の形成が悪用される可能性があるという懸念</td>
      <td>サブセット タイプの技術的なチェックを拡張する方法を検討しており、<a href="https://github.com/WICG/first-party-sets/issues/95">ここで</a>コミュニティからの追加の情報を積極的に求めています。</td>
    </tr>
    <tr>
      <td>広告のユースケース</td>
      <td>広告ターゲティングをサポートするために First-Party Sets を使用する必要があるかどうかに関する質問</td>
      <td>First-Party Sets の広告ターゲティングのユース ケースをサポートしようとしているわけではないため、そのようなユース ケースで利用可能な広告 API を使用することをお勧めします。</td>
    </tr>
    <tr>
      <td>（Q3 にも報告）ポリシー</td>
      <td>FPS が「適用されるデータ保護法」に関する CMA コミットメントと一致していないという懸念。これは、FPS が 3 つの制限を想定しているのに対し、GDPR はセット内のサイト数に制限を課していないことに基づいています。</td>
      <td>対応は Q3から変更ありません。<br><br> <em>「Google は、Google 自身のビジネスを自己優先することによって競争を歪めない方法でプライバシー サンドボックスの提案を設計および実装し、デジタル広告、サイト運営者、および広告主における競争への影響、および適用されるデータ保護法に定められていプライバシーの結果およびデータ保護原則の遵守への影響を考慮に入れることを CMA に引き続きコミットしています。表明された懸念は、GDPRとの非互換性を開示するものではありません。私たちは、私たちの仕事がこれらのコミットメントに準拠していることを確認するために、CMAと緊密に協力し続けます。」</em>
</td>
    </tr>
    <tr>
      <td>代替案</td>
      <td><a href="https://github.com/WICG/first-party-sets/pull/86">GDPR Validated Sets</a></td>
      <td>「GDPR Validated Sets」を採用するという提案に関してエコシステムから提供されたフィードバックに加え、Chrome はこの代替提案の次の制限について懸念しています。<br><br><ul><li> 「GDPR Validated Sets」は、GDPR に「準拠する」と主張しています（ただし、それが何を意味するのかは明確ではありません）。対照的に、Google のコミットメントでは、「プライバシーの結果への影響」をより一般的に考慮する必要があります。CMA は、コミットメントを受け入れる決定において、これは「該当するデータ保護法に規定されているデータ保護原則の遵守」を考慮する Google の義務とは異なると指摘しています。これは、CMA が説明しているように、Google がコミットメントに適用される場合と、より一般的に適用される場合の両方で、適用されるデータ保護法に拘束されます。</li></ul>
<br><ul><li>ドメインが複数のセットに表示されることを許可するという提案について、プライバシー上の懸念があります。First-Party Sets は、広範なクロスサイト トラッキングを有効にすることなく、現在サード パーティ Cookie に依存している特定のユース ケースをサポートすることを目的としています。ドメインが複数のセットに参加できるようにすると、他の意味のある制限を導入することなく、First-Party Sets の提案に組み込まれている主要なプライバシー保護が打ち消されます。</li></ul>
<br><ul><li> GDPR Validated Sets は、「共通の使用ポリシーを共有するデータ管理者と処理者のグループとしてセットを定義する」ことも提案しています。これは、セット内のすべての当事者が共通のプライバシー ポリシーを共有する必要があるという、最初の First-Party Sets 提案の要件に似ています。その後、プライバシー ポリシーに基づく要件に関する懸念を提起するエコシステムからの強いフィードバックに基づいて、その要件を削除しました。たとえば、共通のプライバシー ポリシーを維持することは、W3C コミュニティのメンバーによって提起された他の課題の中でも特に、製品や地理的な違いのために<a href="https://www.google.com/url?q=https://github.com/WICG/first-party-sets/issues/48&amp;sa=D&amp;source=docs&amp;ust=1674574967860008&amp;usg=AOvVaw1g-YA8v1Z26oFXE5djsGiC">実行不可能であると、サイト運営者は述べています（</a><a href="https://www.google.com/url?q=https://github.com/WICG/first-party-sets/issues/75&amp;sa=D&amp;source=docs&amp;ust=1674574967859841&amp;usg=AOvVaw3EJFbjV4U9Vbbz4xs2zr2j">1</a>、<a href="https://www.google.com/url?q=https://github.com/WICG/first-party-sets/issues/48&amp;sa=D&amp;source=docs&amp;ust=1674574967860008&amp;usg=AOvVaw1g-YA8v1Z26oFXE5djsGiC"> 2</a>、<a href="https://github.com/WebKit/standards-positions/issues/93#issuecomment-1357694422">3</a>）。私たちは、この提案にも同じ課題が当てはまると考えています。</li></ul>
<br>この代替案が提起されて以来、Chrome は <a href="https://github.com/WICG/first-party-sets">First-Party Sets の提案</a>を更新し、新しいセットを作成するための<a href="https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md">提出ガイドライン</a>を公開しました。</td>
    </tr>
  </tbody>
</table>

### Fenced Frames API

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OT 中の Fenced Frames の制限</td>
      <td>オリジントライアル期間中の Fenced Frames に関する現在の制限は何ですか？</td>
      <td>制限と実装状況に関するドキュメントの作成に取り組んでおり、2023 年第 1 四半期中に共有する予定です。</td>
    </tr>
    <tr>
      <td>1 つの Fenced Frame 内の複数の広告</td>
      <td>1 つのオークションで 1 つの Fenced Frame に複数の広告主を表示するリクエスト</td>
      <td>現在、このリクエストは積極的に開発されていませんが、エコシステム プレーヤーが機能を重要と考える場合は、<a href="https://github.com/WICG/turtledove/issues/306">追加のフィードバック</a>を歓迎します。</td>
    </tr>
    <tr>
      <td>ウェブバンドル</td>
      <td>Fenced Frames を使用したウェブバンドルの要件とサポート予定は？</td>
      <td>これが将来的に要件となるかどうかについての最新情報は現在ありません。変更は事前に発表されますが、サードパーティ Cookie の廃止前に適用されることはありません。現在の状況については、<a href="https://github.com/WICG/turtledove/blob/main/FLEDGE.md#4-browsers-render-the-winning-ad">こちらの Explainer</a> をご覧ください。</td>
    </tr>
  </tbody>
</table>

### Shared Storage API

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>アドテック向けの共有ストレージ</td>
      <td>アドテック向けの共有ストレージの使用ユースケースに関する不確実性</td>
      <td>Shared Storage および Private Aggregation API は、クロスサイト ストレージの測定が必要なさまざまな種類の測定目的に使用できます。<a href="/docs/privacy-sandbox/shared-storage/#who-is-this-for">こちら</a>にいくつかの例を示しています。<br><br>私たちは、DSP および測定ソリューション プロバイダーが広告のユース ケースの主要なインテグレーターになると予測しています。</td>
    </tr>
  </tbody>
</table>

### CHIPS

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>（Q3 にも報告）パーティション化の要件</td>
      <td>ファーストパーティ Cookie の「Partitioned」属性に明示的な動作要件を追加してください。</td>
      <td>第 4 四半期の更新:<br><br> GitHub と PrivacyCG の呼び出しに関する<a href="https://github.com/privacycg/CHIPS/issues/51">議論</a>の後、私たちが調整した動作は、ファースト パーティ Cookie に設定されたパーティション化された Cookie がパーティション キー (A,A) を使用するというもので、"A" は最上位サイトです。この動作は、Explainer と仕様で文書化されます。</td>
    </tr>
    <tr>
      <td>Cookie 管理</td>
      <td>ファーストパーティまたはサードパーティ Cookie を管理するためのツールはありますか？</td>
      <td>Chrome DevTools と <a href="https://www.chromium.org/for-testers/providing-network-details/">NetLog</a> を使用して、サードパーティ Cookie のブロックが有効になっているサイトをテストできます。どちらのツールも、ユーザー構成が原因で Cookie がブロックされた場合にレポーティングします。どのような種類の監査ウェブサイトに興味があるか、フィードバックを歓迎します。</td>
    </tr>
  </tbody>
</table>

### FedCM

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>IdP では、セッションを許可するために RP の知識が必要</td>
      <td>ユーザーが 2 つの異なる RP から Feide IdP にログインしようとしている場合のイシュー</td>
      <td>このイシューの潜在的な解決策については、<a href="https://github.com/fedidcg/FedCM/issues/377">こちら</a>で議論しています。</td>
    </tr>
    <tr>
      <td>相互運用性</td>
      <td>ユーザーと FedCM を使用してログインするウェブサイトとの関係に対する FedCM の影響、およびウェブサイト間の「相互運用性」に関する懸念</td>
      <td>FedCM は、サードパーティ Cookie が Chrome から削除された後も、現在サードパーティ Cookie に依存している ID フェデレーションサービスを引き続きサポートすることを目指しています。 FedCM は、そのようなサービスで利用できるオプションの 1 つにすぎないと考えています。ID プロバイダー（IdP）と証明書利用者（RP）は、ニーズにより適した他のテクノロジーを自由に使用できます。<br><br>ユーザーと RP の関係と「相互運用性」に関する懸念は、FedCM 提案の誤解によるものと思われます。FedCM は、ユーザーがその RP のサイトにサインインすることを選択した後、どの情報を RP とどのような形式で共有するかを IdP に決定させます。 FedCM では、IdP が「ユーザーが認証する [RP] ごとに一意の仮名識別子を作成する」必要はありません。むしろ、FedCM は各 IdP に対して、ユーザーの実際の識別子、その識別子のサイトごとのバージョン、またはこの情報の他のバージョンを共有するかどうかを選択できるようになっています。<br><br>（FedCM 仕様では、<a href="https://fedidcg.github.io/FedCM/#attack-scenarios-by-rp-cross-site-correlation">クロスサイト相関</a>を API に関連するプライバシー リスクとして特定しており、可能性のある軽減策として有向（サイトごと）識別子について説明しています。ただし、有向識別子を使用するかどうかの決定は IdP に委ねられており、ブラウザが管理するものではありません。）<br><br> FedCM は、ID に関するユーザーの選択も既に提供しています。たとえば、ユーザーが同じ IdP を持つ複数の ID（仕事用プロファイルと個人用プロファイルなど）を持っている場合、FedCM はユーザーが RP のサイトへのログインに使用する ID を選択する方法を提供します。さらに、各 RP は、そのサイトでサポートする IdP を独自に決定します。その決定の 1 つの側面は、IdP が依存するメカニズム（FedCM か別のテクノロジーかに関係なく）を考慮することです。繰り返しますが、ブラウザは RP または IdP のこれらの選択を指示しません。</td>
    </tr>
  </tbody>
</table>

## スパムや詐欺への対抗

### Private State Token API

<table>
  <thead>
    <tr>
      <th><strong>フィードバックのテーマ</strong></th>
      <th><strong>要約</strong></th>
      <th><strong>Chrome の返答</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ボットの処理</td>
      <td>プライベート ステート トークンがボットに発行されていることを発行者が発見した場合はどうなりますか？</td>
      <td>ボットに発行されたトークンがエコシステムに長期間留まらないようにするために、発行者は定期的にトークンの署名に使用するキーをローテーションして、発行ロジックが壊れている可能性がある状態で発行された古いトークンを期限切れにし、サイトが更新された発行ロジックで新しいトークンを引き換えるようにする必要があります。</td>
    </tr>
    <tr>
      <td>同一サイトのフォーム送信</td>
      <td>プライベート ステート トークンは、fetch/XMLHttpRequest API からのリクエストではなく、フルページ ナビゲーション（Content-Type: application/x-www-form-urlencoded）を含む同じサイトのフォーム送信に使用できますか？</td>
      <td>これは現在、Private State Tokens の最初のバージョンではサポートされていません。このユース ケースに強い需要がある場合は、エコシステムからの<a href="https://github.com/WICG/trust-token-api/issues">フィードバックを歓迎します</a>。</td>
    </tr>
    <tr>
      <td>サーバー側の検証</td>
      <td>プライベート ステート トークンをサーバー側で検証できるかどうかに関する質問</td>
      <td>トークンは発行者に対して引き換えられ、発行者はトークン自体またはトークンから派生した署名付きの値を含む可能性のある引き換え記録を作成し、サーバーはその引き換え記録を使用してトークンの信頼性を検証できます。引き換え記録をどのように解釈するかについて、さまざまな基準が考え出される予定です。</td>
    </tr>
  </tbody>
</table>
