---
layout: layouts/doc-post.njk
title: Protected Audience API
subhead: クロスサイト サードパーティ トラッキングを使わずにリマーケティングとカスタム オーディエンスにサービスを提供するオンデバイス広告オークション。
description: サードパーティがサイト間でユーザーのブラウジング行動を追跡できないようにユーザーが過去にアクセスしたウェブサイトから関連する広告を選択するように設計された、オンデバイス広告オークションの API。
date: 2022-01-27
updated: 2022-09-18
authors:
  - samdutton
  - kevinkiklee
---

{% Partial 'privacy-sandbox/protected-audience-rename-banner.njk' %}

{% YouTube id='HkvmYKqnytw' %}

## この記事の対象者

この記事では、Protected Audience API の基本を取り上げ、いくつかの基礎的な概念については説明していますが、技術的な詳細についてはあまり触れません。

- **広告またはアドテック業界**の方は、[Protected Audience の仕組み](#overview)の概要を理解できます。
- **開発者またはソフトウェア エンジニア**の方には、[Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api)で API に関する技術的な詳細がさらに詳しく説明されています。[保留中の Protected Audience 機能の最新ステータス](/docs/privacy-sandbox/protected-audience-api/feature-status/)をご覧ください。

Protected Audience のドキュメント全体で使用される用語については、[用語集](/docs/privacy-sandbox/glossary/)を参照してください。この記事の最後に、[フィードバックに参加して共有する](#engage)方法が説明されています。

## Protected Audience API とは？ {: #what}

Protected Audience API は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するための[プライバシー サンドボックス](/docs/privacy-sandbox/overview)テクノロジーであり、サードパーティがサイトを跨いでユーザーのブラウジング行動を追跡できないように設計されています。

FLEDGE を使用すると、ブラウザによるオンデバイス オークションが可能になり、ユーザーが過去にアクセスしたウェブサイトから関連する広告を選択できます。

Protected Audience API は、[TURTLEDOVE](https://github.com/WICG/turtledove) ファミリの提案内で Chromium に実装された最初の実験です。Protected Audience と TURTLEDOVE の違いは主に、広告の買い手と売り手のオンデバイスの役割の分離に関係します。以下のセクションでは、Protected Audience API がどのように機能するかについて説明します。

### 1 分でわかる Protected Audience API {: #overview}

Protected Audience API の詳細な概要については、 [Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)をご覧ください。

<figure class="w-figure">{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png", alt="Protected Audience API ライフサイクルの各ステージの概要", width="800", height="366" %} <figcaption class="w-figcaption"> Protected Audience API のライフサイクル: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png?auto=format&amp;w=1600" title="クリックすると画像の拡大版が表示されます" target="_blank">拡大版を表示</a>。 </figcaption></figure>

Protected Audience API は、[インタレスト グループ](#interest-group-detail)を使用して、サイトがユーザーに関連する広告を表示できるようにします。

たとえば、製品の広告を掲載するウェブサイトにユーザーがアクセスすると、インタレスト グループの[オーナー](#interest-group-detail)（[デマンドサイド プラットフォーム（DSP）](/docs/privacy-sandbox/glossary/#dsp)など）は、ユーザーのブラウザにインタレスト グループのメンバーシップを追加するよう要求できます。リクエストが成功すると、ブラウザは次の内容を記録します。

- インタレスト グループの**名前**: 「custom-bikes」など。
- インタレスト グループの**オーナー**:「https://dsp.example」など。
- インタレスト グループのオーナーが広告オークションでの入札に招待されている場合に、ブラウザが入札コード、広告コード、およびリアルタイム データにアクセスできるようにするためのインタレスト グループの**構成情報**。

{% Aside %}

インタレスト グループのユースケースには他にもあります。[オーナーとタイプの例](#interest-group-types)をご覧ください。

{% endAside %}

後で、ユーザーが広告スペースを販売するサイトにアクセスすると、広告スペースの売り手（[セルサイド プロバイダー（SSP）](/docs/privacy-sandbox/glossary/#ssp) またはサイト自体）は Protected Audience を使用して広告オークションを実行し、ユーザーに表示する最も適切な広告を選択できます。売り手が `navigator.runAdAuction()` 関数を呼び出すと、この関数によって、入札に招待されたインタレスト グループのオーナーのリストが提供されます。

入札を提供できるのは、ブラウザーがメンバーとなっており、オーナーが入札に招待されているインタレスト グループのみです。

入札コードは、インタレス トグループの構成情報で指定された URL から取得されます。このコードには、インタレスト グループに関するデータと売り手からの情報と、ページとブラウザからのコンテキストデータが含まれています。

入札を行う各インタレストグループは「買い手」と呼ばれます。

ブラウザが関数を呼び出して広告オークションを実行すると、各買い手のコードは、[Protected Audience の Key/Value サービス](#key-value-service-detail)によって提供されるリアルタイム データを利用して入札を生成します。次に、売り手はこれらの入札と買い手が所有するリアルタイム データを受け取り、各入札をスコアリングします。最高スコアの入札がオークションを落札します。

落札した広告は [Fenced Frame](/docs/privacy-sandbox/fenced-frame) に表示されます。広告クリエイティブの URL は入札で指定され、オリジンは、インタレスト グループの設定によって提供されるリストのいずれかと一致する必要があります。

売り手はオークションの結果を報告でき（`reportResult()`）、買い手は落札を報告できます（`reportWin()`）。

[Protected Audience のオークション レポート](/docs/privacy-sandbox/protected-audience-api/reports/)について詳細をご覧ください。

## Protected Audience API が必要な理由 {: #why}

ユーザーの関心を理解すれば、単にサイトのコンテンツに基づいて広告を選択したり（コンテキスト ターゲティング）、広告が表示されるサイトにユーザーが提供した情報を使用したり（ファーストパーティ データ ターゲティング）するよりも、より関連性の高い広告を提供できます。

従来、広告プラットフォームはサイト間でのユーザーの行動を追跡することでユーザーの興味を学習してきました。ブラウザには、広告プラットフォームが関連性の高い広告を選択できるようにする方法が必要です。これにより、コンテンツのサイト運営者はサイト間のトラッキングを行わずに広告収入を得ることができます。

Protected Audience API は、広告主やアドテック プラットフォームではなく、ユーザーのデバイス上のブラウザがそのユーザーの興味に関する情報を保持している状態にウェブ プラットフォームを近づけることを目指しています。

{% Aside 'caution' %}

現在 Chrome でテストできる機能を理解するには、[開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)と[保留中の Protected Audience 機能のステータス](/docs/privacy-sandbox/protected-audience-api/feature-status/)をお読みください。

Protected Audience の機能は、徐々に追加される予定です。実装済みの機能と現在開発中の機能のリストを定期的に更新していきます。

{% endAside %}

## Protected Audience API を試すには？ {: #try-fledge}

- [Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api)では、API の使用方法とローカルでのテスト方法について説明しています。

- [protected-audience-demo.web.app](https://protected-audience-demo.web.app/) は、広告主サイトとサイト運営者サイトにわたる基本的な Protected Audience 導入のチュートリアルを提供しています。Protected Audience のデモ動画では、このコードがどのように機能するかを説明し、デバッグに Chrome DevTools を使用する方法を確認できます。

{% YouTube id='znDD0gkdJyM' %}

### 利用可能なブラウザ構成 {: #user-controls}

ユーザーは、`chrome://settings/privacySandbox` のトップレベルの設定を有効または無効にすることで、Chrome のプライバシー サンドボックス トライアルへの参加を調整できます。初期テスト中は、プライバシー サンドボックスの設定で Protected Audience API をオプトアウトすることができます。

Chrome では、ユーザーがアクセスしたウェブサイト間で、自分が追加されているインタレスト グループのリストを表示および管理できるようにすることを予定しています。プライバシー サンドボックスのテクノロジー自体と同様に、ユーザー設定は、ユーザー、規制当局などからのフィードバックによって進化する可能性があります。

Protected Audience API の開発が進むにつれて、[テストとフィードバックに基づいて](/docs/privacy-sandbox/proposal-lifecycle/#testing) Chrome で利用可能な設定を更新します。将来的には、Protected Audience と関連データを管理するためのより詳細な設定を提供する予定です。

API 呼び出し元は、ユーザーがシークレットモードで閲覧している場合はグループ メンバーシップにアクセスできません。また、ユーザーがサイトデータを消去するとメンバーシップは削除されます。

{: #opt-out-site}

### Protected Audience API をオプトアウトできますか？ {: #opt-out}

サイト所有者または個人ユーザーとして、[Protected Audience API へのアクセスをブロックする](/docs/privacy-sandbox/protected-audience-api/opt-out)方法を詳しくご覧ください。

## 重要な概念

Protected Audience の用語の解説をお探しですか？[プライバシー サンドボックスの用語集](/docs/privacy-sandbox/glossary/)をご覧ください。

{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}

### インタレスト グループとは

{% endDetailsSummary %}

Protected Audience API インタレスト グループは、共通する関心を持つユーザーのグループを表すもので、[リマーケティング](/docs/privacy-sandbox/glossary/#remarketing)リストに対応しています。

すべての Protected Audience API インタレスト グループにはオーナーが存在します。オーナーの種類によって、ユースケースの異なる様々なタイプのインタレスト グループを作成できます。

オーナーはユーザーのブラウザに対し、JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出して、インタレスト グループに関連する広告に関するデータと入札に使用される JavaScript の URL などの情報を提供することで、インタレスト グループのメンバーシップを追加するように要求します。 インタレスト グループデータ（広告など）の更新は可能で、インタレスト グループは最大 30 日間有効にできます。

{% Aside %}

インタレスト グループはブラウザに保存され、Protected Audience API のブラウザ内オークションで入札できますが、プログラムで「読み取る」ことはできません。つまり、クロスサイト ID を公開してしまう navigator.getAdInterestGroups() などはありません。

{% endAside %}

{: #interest-group-types}

以下の表では、Protected Audience API のさまざまなタイプのインタレスト グループとオーナーの例を示しています。

<div class="w-table-wrapper">
  <table class="w-table--top-align">
    <thead>
      <tr>
        <th style="text-align: left; vertical-align: top;">オーナー</th>
        <th style="text-align: left; vertical-align: top;">例</th>
        <th style="text-align: left; vertical-align: top;">関心の対象</th>
        <th style="text-align: left; vertical-align: top;">例</th>
        <th style="text-align: left; vertical-align: top;">ユースケース</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="vertical-align: top;">広告主</td>
        <td style="vertical-align: top;">自転車メーカー</td>
        <td style="vertical-align: top;">製品</td>
        <td style="vertical-align: top;">特定のカテゴリの自転車の製品ページを閲覧した人。</td>
        <td style="vertical-align: top;">以前にそのブランドと対話したことのあるユーザーへの<a href="#remarketing" title="Glossary entry for remarketing">リマーケティング</a>。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">サイト運営者</td>
        <td style="vertical-align: top;">ニュースサイト</td>
        <td style="vertical-align: top;">コンテンツ</td>
        <td style="vertical-align: top;">サイクリングについて読んだ人。</td>
        <td style="vertical-align: top;">サイト運営者は、ファーストパーティ データを使用して、広告主がサイト閲覧者に関連のある広告を購入できるようにすることができます。 サイト運営者が所有するインタレスト グループは、これらのユーザーが他のサイトを閲覧している場合であっても、サイト運営者に同じことをさせることができます。           サイト運営者は、オーディエンスの特定のセグメントに広告を表示する機能に対して課金することが可能です。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">アドテク</td>
        <td style="vertical-align: top;"><a href="#dsp" title="DSP の用語集エントリ">DSP</a></td>
        <td style="vertical-align: top;">商品カテゴリ</td>
        <td style="vertical-align: top;">サイクリング用品に興味を示した人たち。</td>
        <td style="vertical-align: top;">アドテク企業は、あるカテゴリのアイテムの市場にいると信じているユーザーのインタレスト グループを作成し、管理することができます。 このインタレスト グループは、そのカテゴリ（とアドテク会社と連携しているユーザー）で商品を販売するサイトで、商品を宣伝するために使用されます。</td>
      </tr>
    </tbody>
  </table>
</div>

{: #interest-group-limits}

Chrome では、オーナーあたり最大 1,000 個のインタレスト グループ、および最大 1,000 個のインタレスト グループオーナーを許可しています。これらはガードレールとしての役割を果たしており、通常の操作では到達することはありません。

{% endDetails %}

{: #buyer-detail}

{% Details %}

{% DetailsSummary %}

### 買い手とは

{% endDetailsSummary %}

Protected Audience API の買い手は、[インタレスト グループ](#interest-group-detail)を所有し、広告オークションに入札する者を指します。

たとえば、以下が該当します。

- **[広告主](#advertiser)**: 広告主自体を代表します。
- **[デマンドサイド プラットフォーム](/docs/privacy-sandbox/glossary/#dsp)**（DSP）: 広告主に代わって機能します。
- **[インタレスト グループ オーナー](#interest-group-detail)**: 複数の広告主のために使用されます。

買い手には 3 つのジョブがあります。

- オークションに参加するかどうかを選択すること
- 広告を選択して入札単価を計算すること
- オークションの結果を報告すること

これらのジョブは、Protected Audience API 広告オークション中に実行される買い手提供のコードによるプログラムで実行されます。

買い手がユーザーのブラウザに対して、それが属しているグループにインタレスト グループを追加するように要求する際（JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出す）、買い手はブラウザに以下を提供します。

- [売り手](/docs/privacy-sandbox/glossary/#seller)が[広告オークション](/docs/privacy-sandbox/glossary/#ad-auction)を実施する際に使用する入札コードの URL。
- 場合によっては、インタレスト グループの[広告クリエイティブ](/docs/privacy-sandbox/glossary/#creative)の URL。（広告の URL は、後で更新によって追加される可能性があります。）
- オークション中に入札コードがリアルタイム データを取得できるようにするための、クエリ対象のデータ [Key](#key-value) のリストと買い手の [Key/Value サービス](#key-value-service-detail)の URL。

買い手のコードには、オークションの結果を報告する `reportWin()` 関数を含めることもできます。

{% endDetails %}

{: #seller-detail}

{% Details %}

{% DetailsSummary %}

### 広告オークションの実行者

{% endDetailsSummary %}

広告スペースを販売するためにオークションを開催する可能性のある当事者は複数存在します。

たとえば、以下が該当します。

- **コンテンツ パブリッシャー**: それ自体を代表し、自社サイトで広告コンテンツをホストします。
- **[サプライサイド プラットフォーム](#ssp)**（SSP）: サイト運営者と連携し、他のサービスを提供します。
- **サードパーティ スクリプト**: サイト運営者を代表し、広告オークションへの参加を可能にします。

Protected Audience API では、[売り手](/docs/privacy-sandbox/glossary/#seller)には次の 3 つのジョブがあります。

- サイト運営者ルールの実施: どの買い手とどの入札が対象であるか。
- オークション ロジックの実行: JavaScript を[ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行して、各入札の望ましさのスコアを計算します。
- オークションの結果を報告すること

これらのジョブは、売り手が JavaScript 関数 `navigator.runAdAuction()` を呼び出して広告オークションを開始するときに提供するプログラムで実行されます。

{% endDetails %}

{: #ad-auction}

{% Details %}

{% DetailsSummary %}

### Protected Audience API の仕組み

{% endDetailsSummary %}

{: #auction-diagram}

以下の図は、Protected Audience API の広告オークションの各段階の概要を示しています: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&amp;w=1600" title="クリックすると画像の拡大版が表示されます" target="_blank">拡大版を表示</a>。

<figure class="w-figure">    {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="Protected Audience API 広告オークションの 6 つのステージ", width="800", height="481" %}</figure>

<br>

Protected Audience API の広告オークションは、広告を選択するためにブラウザがユーザーのデバイス上で実行する小さな JavaScript プログラムの集合体を指します。プライバシーを保護する目的で、売り手と買い手からのすべての広告オークション コードは、外部と通信できない分離された JavaScript [ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行されます。

売り手（サイト運営者またはサプライサイド プラットフォーム）は、広告スペースを販売するサイト（ニュースサイトなど）で Protected Audience 広告オークションを開始します。売り手は、オークションに参加する買い手を選択し、販売するスペースを示し、広告の追加基準を提供します。各買い手は、インタレスト グループのオーナーです。

売り手は、各買い手の値、広告クリエイティブの URL、および買い手ごとに返されたその他のデータを含む、入札をスコアリングするためのコードをブラウザに提供します。オークション中、買い手からの入札コードと売り手からの入札スコアリング コードは、[Key/Value サービス](/docs/privacy-sandbox/glossary/#creative)からデータを受け取ることができます。広告が選択されて表示されると（プライバシーを保護する [Fenced Frame](#key-value-service-detail) に表示）、売り手と落札者はオークション結果を報告できます。

1. ユーザーが広告を表示するサイトにアクセスします。

2. 売り手のコードがオークションを開始します。売り手は、どの広告スペースを販売するか、誰が入札できるか、それらの入札のスコアリング方法を指定します。

3. 招待された買い手のコードが実行され、入札、関連する広告クリエイティブの URL、およびその他のデータが生成されます。入札スクリプトは、買い手の [Key/Value サービス](#key-value-service-detail)から、残りの広告キャンペーン予算などのリアルタイム データをクエリできます。

4. 売り手のコードが各入札をスコアリングし、落札者を選択します。このロジックは、入札値と他のデータを使用して入札の望ましさを返し、コンテキスト広告の落札者に勝てない広告を拒否します。売り手は、リアルタイム データに独自の [Key/Value サービス](#key-value-service-detail)を使用できます。オークションが始まる前に、売り手は利用可能な広告スロットに最適なコンテキスト広告を見つけます。

5. オークションの構成で `resolveToConfig` フラグが設定されている場合、落札した広告は Fenced Frame 構成オブジェクトとして返されます。この構成は、Fenced Frame が広告クリエイティブにアクセスするために使用されるため、売り手とサイト運営者のいずれもクリエイティブの URL を確認することはできません。`resolveToConfig` フラグが `false` に設定されている場合、または渡されていない場合、落札した広告は、iframe で広告をレンダリングするために使用できる不透明な [URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) として返されます。Fenced Frame 構成オブジェクトは、M114 以降で利用可能です。

6. オークションは、売り手と落札した買い手に報告されます。
{% Aside %} 売り手の `reportResult()` と買い手の `reportWin()` には、`sendReportTo()` の呼び出しを含めることができます。これは、[非公開集計](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)で集計レポートが利用可能になるまで、[一時的](/docs/privacy-sandbox/private-aggregation)に利用できます。
落札できなかった買い手のレポート メカニズムは[ディスカッション中](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting)です
{% endAside %}

{% endDetails %}

{: #key-value-service-detail}

{% Details %}

{% DetailsSummary %}

### Protected Audience API Key/Value サービス とは

{% endDetailsSummary %}

Protected Audience API の Key/Value サービスを使用すると、アドテックは買い手が入札を行ったときにリアルタイム データをクエリし、売り手はプライバシーを保護しながら広告をスコアリングできます。Protected Audience API Key/Value サービスなどについて、[Protected Audience API サービス](/blog/fledge-service-overview/)をご覧ください。

Key/Value サービスはアドテック独自のクラウド インフラストラクチャに展開され、サービスは[信頼できる実行環境](/docs/privacy-sandbox/glossary/#trusted-execution-environment)で実行されます。Key/Value サービスへのリクエストは、イベントレベルのログを記録したり、その他の副作用を引き起こしたりすることはありません。Key/Value サービスは、アドテックが Key/Value サービス内で独自のカスタム ロジックを実行できるようにする[ユーザー定義関数（UDF）](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs)もサポートします。

{: #key-value}

買い手または売り手は、「キー」のリストを提供して、Protected Audience API Key/Value サービスから必要なデータを指定します。Key/Value サービスは、各キーの値で応答します。

[Protected Audience API Key/Value サービス コード](https://github.com/privacysandbox/fledge-key-value-service)が Privacy Sandbox GitHub リポジトリで利用できるようになりました。このサービスは、Chrome および Android の開発者が使用できます。

Protected Audience API Key/Value サービスの詳細については、[API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) および[信頼できるモデルの Explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md) をご覧ください。

{% endDetails %}

{% Details %}

{% DetailsSummary %}

### オークションへのリアルタイム データの組み込み

{% endDetailsSummary %}

広告オークションの[買い手](#buyer-detail)または[売り手](#seller-detail)はリアルタイム データにアクセスする必要がある場合があります。たとえば、買い手が広告キャンペーンの残りの予算を計算したい場合や、売り手が広告クリエイティブをサイト運営者のポリシーに照らしてチェックする必要がある場合があります。

Protected Audience API のプライバシー要件を満たすために、広告オークション中に必要なリアルタイム データは [Key/Value サービス](#key-value-service-detail)によって提供されます。各買い手が `navigator.joinAdInterestGroup()` を呼び出すと、買い手は Key/Value サービスの URL を指定し、オークション中にサービスに対してクエリされるキーを指定します。同様に、売り手が `navigator.runAdAuction()` を呼び出して広告オークションを実行すると、売り手は Key/Value サービスの URL を提供します。売り手の Key/Value サービスは、クリエイティブのレンダリング URL でクエリされます。

初期テストでは、 [「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルが使用されます。長期的には、アドテックはリアルタイム データを取得するために、[信頼できる実行環境](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)で実行されるオープンソースの Protected Audience API Key/Value サービスを使用する必要があります。

エコシステムがテストするのに十分な時間を確保するために、サードパーティの Cookie が廃止されるまでは、オープンソースの Key/Value サービスまたは信頼できる実行環境の使用が必要になるとは考えていません。この移行が行われる前に、開発者がテストと採用を開始できるのに十分な通知を行う予定です。

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Protected Audience オークションにおけるファーストパーティ データの使用

{% endDetailsSummary %}

ファーストパーティ データは、サイトが所有するユーザーのデータです。たとえば、ユーザーが広告主またはサイト運営者のサイトで好みの色を指定した場合、その色はファーストパーティ データとみなされます。

Protected Audience オークションでは、広告主は自社のファーストパーティ データを使用して[広告のインタレスト グループのメンバーシップ](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#11-joining-interest-groups)を決定したり、データを [`userBiddingSignals`](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#12-interest-group-attributes) としてインタレスト グループに渡したりできます。広告主のファーストパーティ データは、入札生成ステップ中に買い手のみが利用でき、売り手は利用できません。

たとえば、広告主がユーザーの好きな色を知っている場合、ユーザーがインタレスト グループに追加されるときに、その値をインタレスト グループの設定に `userBiddingSignals` として設定できます。

```js
const interestGroup = {
  owner: 'https://example-buyer.com',
  name: 'running-shoes',
  userBiddingSignals: {
    favoriteColor: 'blue' // First-party data
  },
  // ...other interest group settings
};

navigator.joinAdInterestGroup(interestGroup, 3600);
```

サイト運営者は、オークションの開始時に[オークション構成](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#21-initiating-an-on-device-auction)にシグナルを設定することでファーストパーティ データを渡すこともでき、ファーストパーティ データを誰が受け取るかを制御できます。サイト運営者がファーストパーティ データを `auctionSignals` として渡すと、買い手と売り手の両方がそのデータを利用できるようになります。データが `sellerSignals` として渡された場合は売り手のみが利用でき、`perBuyerSignals` として渡された場合は指定された買い手のみが利用できます。サイト運営者は、ファーストパーティ データをコンポーネント オークションに渡すこともできます。サイト運営者とオークション参加者は、どのようなファーストパーティ データを共有する必要があるか、またデータをどのようにフォーマットする必要があるかについて、事前に合意する必要があります。

次の例は、サイト運営者からさまざまなオークション参加者にファーストパーティ データを渡す方法を示しています。

```js
const auctionConfig = {
  seller: 'https://example-seller.com',
  auctionSignals: {
    favoriteColor: 'blue', // Both buyer and seller will receive this signal
  },
  sellerSignals: {
    favoriteIceCreamFlavor: 'chocolate', // Only the seller will receive this signal
  },
  perBuyerSignals: {
    'https://example-buyer.com': {
      favoriteDrink: 'tea', // Only a specific buyer will receive this signal
    },
  },
  // The same pattern applies to the component auction
  componentAuctions: [{
    seller: 'https://example-component-seller.com',
    auctionSignals: { ... },
    sellerSignals: { ... },
    perBuyerSignals { ... }
  }],
  // ...other auction settings
};

navigator.runAdAuction(auctionConfig);
```

{% endDetails %}

{: #engage}

## 詳細について

Protected Audience API の詳細な概要については、[Protected Audience API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api/)をご覧ください。

### 開発者

Protected Audience API の使用を開始する準備ができている場合は、[実験と参加](/docs/privacy-sandbox/protected-audience-experiment/)をお読みください。

[API 開発者ガイド](/docs/privacy-sandbox/protected-audience-api)を作成し、Protected Audience API の基本的なデプロイをウォークスルー形式で説明する [Protected Audience API デモ](https://protected-audience-demo.web.app/)を作成しました。[Protected Audience API デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように機能するか、また Chrome DevTools で Protected Audience API をデバッグする方法を説明しています。

## 貢献とフィードバックの共有

- **GitHub**: [Explainer](https://github.com/WICG/turtledove/blob/master/FLEDGE.md) を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/turtledove/issues)したりできます。
- **お知らせ**: [Protected Audience API メーリングリスト](https://groups.google.com/u/0/a/chromium.org/g/fledge-api-announce)に参加するか、過去のお知らせを見ることができます。
- **W3C**: [Web 広告事業の改善グループ](https://www.w3.org/community/web-adv/participants)で、業界ユースケースについて議論できます。
- **開発者向けサポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したできます。
- **現在の実装**: Chrome で現在テストできる実装に関する質問については、[Chromium バグの報告](https://bugs.chromium.org/p/chromium/issues/list?q=fledge)をご利用ください。
