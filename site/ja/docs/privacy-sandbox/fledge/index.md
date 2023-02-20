---
layout: layouts/doc-post.njk
title: FLEDGE
subhead: クロスサイトサードパーティトラッキングを使わずにリマーケティングとカスタムオーディエンスにサービスを提供するオンデバイス広告オークション。
description: サードパーティがサイト間でユーザーのブラウジング行動を追跡できないように過去にアクセスしたウェブサイトから関連する広告を選択するように設計された、オンデバイス広告オークションの提案。
date: 2022-01-27
updated: 2022-08-23
authors:
  - samdutton
  - kevinkiklee
---

{% YouTube id='HkvmYKqnytw' %}

## この記事の対象者

この記事では、FLEDGE の基本を取り上げ、いくつかの基本的な概念について説明しますが、技術的な詳細についてはあまり触れません。

- **広告やアドテック**の仕事をしている方なら、 [FLEDGE の仕組み](#overview)の概要がわかります。
- **開発者またはソフトウェアエンジニア**の場合は、[FLEDGE API 開発者ガイド](/docs/privacy-sandbox/fledge-api)で提案に関するより詳細な技術的説明、[Intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI) ではブラウザでの FLEDGE のステータスに関する最新の議論をお読みいただけます。
- [FLEDGE デモ](/docs/privacy-sandbox/fledge-api#demo)では、FLEDGE の基本的なデプロイをウォークスルー形式で説明しています。

{% Aside %} FLEDGE ドキュメント全体で使用される用語については、[用語集](/docs/privacy-sandbox/glossary/)を参照してください。 {% endAside %}

[貢献とフィードバックの共有](#engage)方法は、この記事の最後に説明されています。

## FLEDGE とは {: #what}

FLEDGE は、リマーケティングおよびカスタム オーディエンスのユースケースに対応するための[プライバシーサンドボックス](/docs/privacy-sandbox/glossary/#remarketing)の提案であり、サードパーティがサイトを跨いでユーザーのブラウジング行動を追跡できないように設計されています。

このAPIにより、ブラウザによるオンデバイスのオークションが可能になり、ユーザーが以前に訪問したウェブサイトから関連性の高い広告を選択できます。

FLEDGE は、 [TURTLEDOVE](https://github.com/WICG/turtledove) ファミリーの提案の中で Chromium に実装された最初の実験です。 [プライバシーサンドボックスのタイムライン](https://privacysandbox.com/timeline)には、FLEDGE とその他のプライバシーサンドボックス提案の実装時期に関する情報が提供されています。

### 一分で説明する FLEDGE {: #overview}

FLEDGE の詳細な概要については、[FLEDGE API 開発者ガイド](/docs/privacy-sandbox/fledge-api/)を参照してください。

<figure class="w-figure">
  {% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png", alt="FLEDGE ライフサイクルの各ステージの概要",
  width="800", height="366" %}
  <figcaption class="w-figcaption">
    FLEDGE のライフサイクル: <a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/zXKEk8OymLJp6KpOwwbk.png?auto=format&amp;w=1600" title="クリックすると、画像の拡大版が表示されます" target="_blank">拡大表示</a>。
  </figcaption>
</figure>

FLEDGE では、「[インタレストグループ](#interest-group-detail)」を使用することで、サイトがユーザーに関連する広告を表示できるようになっています。

たとえば、製品の広告を掲載するウェブサイトにユーザーがアクセスすると、インタレストグループの[オーナー](#interest-group-detail)（サイトに働きかける[デマンドサイドプラットフォーム（DSP）](/docs/privacy-sandbox/glossary/#dsp)など）は、ユーザーのブラウザにインタレストグループのメンバーシップを追加するように要求できます。グループオーナー（この例では DSP）は、`navigator.joinAdInterestGroup()` という JavaScript 関数を呼び出してこれを行います。呼び出しが成功すると、ブラウザは次の内容を記録します。

- インタレストグループの**名前**: 「custom-bikes」など。
- インタレストグループの**オーナー**:「https://dsp.example」など。
- インタレストグループの**構成情報**: グループのオーナーがオンライン広告オークションでの入札に招待された場合に、ブラウザが入札コード、広告コード、およびリアルタイムデータにアクセスできるようにします。 この情報は、インタレストグループのオーナーが後で更新することが可能です。

{% Aside %}

インタレストグループには他にもユースケースがあります。[オーナーと種類の例](#interest-group-types)をご覧ください。

{% endAside %}

後で、ユーザーが広告スペースを販売するサイトにアクセスすると、広告スペースのセラー（ほとんどの場合、サイトの [SSP](/docs/privacy-sandbox/glossary/#ssp) またはサイト自体）は FLEDGE を使用して広告オークションを実行し、ユーザーに表示する最も適切な広告を選択できます。セラーが `navigator.runAdAuction()` 関数を呼び出すと、この関数によって、入札に招待されたインタレストグループのオーナーのリストが提供されます。

入札コードは、ブラウザがメンバーであり、オーナーが入札に招待されているインタレストグループに対してのみ実行されます。

入札コードは、インタレストグループの構成情報で指定された URL から取得されます。このコードには、インタレストグループに関するデータとセラーからの情報と、ページとブラウザからのコンテキストデータが渡されます。

各入札者はバイヤーとも呼ばれます。

ブラウザが関数を呼び出して広告オークションを実行すると、各バイヤーのコードは、[FLEDGE の Key/Value サービス](#key-value-service-detail)によって提供されるリアルタイムデータを利用して入札を生成します。次に、セラーはこれらの入札とバイヤーが所有するリアルタイム データを受け取り、各入札をスコアリングします。最高スコアの入札がオークションを落札します。

落札した広告は [Fenced Frame](/docs/privacy-sandbox/fenced-frame) に表示されます。広告クリエイティブの URL は入札で指定され、オリジンは、インタレストグループの設定によって提供されるリストのいずれかと一致する必要があります。

セラーはオークションの結果を報告でき（`reportResult()`）、バイヤーは落札を報告できます（`reportWin()`）。

[FLEDGE オークションの結果レポートを生成する](/docs/privacy-sandbox/fledge-api/reports/)方法をご覧ください。

## FLEDGE が必要である理由 {: #why}

ユーザーの関心を理解すれば、単にサイトのコンテンツに基づいて広告を選択したり（コンテキストターゲティング）、広告が表示されるサイトにユーザーが提供した情報を使用したり（ファーストパーティ データターゲティング）するよりも、より関連性の高い広告を作成できます。

従来、広告プラットフォームはサイト間でユーザーの行動を追跡することで、ユーザーの興味を学習してきましたが、 コンテンツパブリッシャーがクロスサイトトラッキングなしで広告収入を得られるようにするには、ブラウザに、広告プラットフォームが関連性のある広告を選択できるようにする方法が必要となります。

FLEDGE の実験は、ユーザーが興味を持っている物事に関する情報がそのユーザーのブラウザ（広告主やアドテクプラットフォーム上ではなく、ユーザーのデバイス上）に保持される状態に Web プラットフォームを近づけることを目的としています。

{% Aside 'warning' %}

この記事で説明されているすべての機能が、現在 Chrome でテストされている FLEDGE API のバージョンに（一部または完全に）実装されているわけではありません。[FLEDGE API 開発者ガイド](/docs/privacy-sandbox/fledge-api#try-fledge)では、[機能フラグ](https://www.chromium.org/developers/how-tos/run-chromium-with-flags)を使用してコマンドラインから実行される Chrome で現在どの FLEDGE 機能をテストできるかについて説明されています。

FLEDGE の機能は、徐々に追加される予定です。[オリジントライアル](/docs/privacy-sandbox/unified-origin-trial/)が有効である間、実装済みの機能とまだ進行中の機能のリストを定期的に更新していきます。

{% endAside %}

## FLEDGE を試すには {: #try-fledge}

- [FLEDGE API 開発者ガイド](/docs/privacy-sandbox/fledge-api#try-fledge)では、プライバシーサンドボックスの関連性と測定に関するオリジントライアルに参加する方法と、Chrome のフラグを設定して単一ユーザー向けに FLEDGE を試す方法について説明しています。

- [fledge-demo.glitch.me](https://fledge-demo.glitch.me/) には、広告主とサイト運営者サイトにまたがる基本的な FLEDGE デプロイメントのウォークスルーが提供されています。

- [FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように動作するかを説明し、FLEDGE のデバッグに Chrome DevTools を使用する方法を示しています。

{% YouTube id='znDD0gkdJyM' %}

### 利用可能なブラウザ構成 {: #user-controls}

ユーザーは、`chrome://settings/privacySandbox` のトップレベルの設定を有効または無効にすることで、Chrome のプライバシーサンドボックストライアルへの参加を調整できます。初期テスト中は、プライバシーサンドボックスの設定で FLEDGE をオプトアウトすることができます。

Chrome では、ユーザーがアクセスしたウェブサイト間で、自分が追加されているインタレストグループのリストを表示および管理できるようにすることを予定しています。プライバシーサンドボックスのテクノロジー自体と同様に、ユーザー設定は、ユーザー、規制当局などからのフィードバックによって進化する可能性があります。

FLEDGE の提案が進むにつれて、[テストとフィードバックに基づいて](/docs/privacy-sandbox/proposal-lifecycle/#testing)、Chrome で利用可能な設定を更新し続けます。将来的には、FLEDGE と関連データを管理するためのより詳細な設定を提供する予定です。

API 呼び出し元は、ユーザーがシークレットモードで閲覧している場合はグループメンバーシップにアクセスできません。また、ユーザーがサイトデータを消去するとメンバーシップは削除されます。

{: #opt-out-site}

### FLEDGE をオプトアウトできますか？ {: #opt-out}

サイトオーナーまたは個人ユーザーとして [FLEDGE API へのアクセスをブロックする](/docs/privacy-sandbox/fledge-api/opt-out)方法をご覧ください。

{: #glossary}

## 重要な概念

FLEDGE 用語の詳細をお探しですか？[プライバシーサンドボックスの用語集](/docs/privacy-sandbox/glossary/)をご覧ください。

{: #interest-group-detail}

{% Details %}

{% DetailsSummary %}

### インタレストグループとは

{% endDetailsSummary %}

FLEDGE インタレストグループは、共通する関心を持つユーザーのグループを表すもので、[リマーケティング](/docs/privacy-sandbox/glossary/#remarketing)リストに対応しています。

各 FLEDGE インタレストグループにはオーナーがいます。 オーナーの種類が異なれば、ユースケースが異なるさまざまな種類のインタレストグループが作成されます。

オーナーはユーザーのブラウザに対し、JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出して、インタレストグループに関連する広告に関するデータと入札に使用される JavaScript の URL などの情報を提供することで、インタレストグループのメンバーシップを追加するように要求します。 インタレストグループデータ（広告など）の更新は可能で、インタレストグループは最大 30 日間有効にできます。

{% Aside %}

インタレストグループはブラウザに保存され、FLEDGE のブラウザ内オークションで入札できますが、プログラムで「読み取る」ことはできません。つまり、クロスサイト ID が公開されるため、`navigator.getAdInterestGroups()` はありません。

{% endAside %}

{: #interest-group-types}

以下の表は、FLEDGE インタレストグループとオーナーのさまざまな種類の例を示しています。

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
        <td style="vertical-align: top;">サイト運営者は、ファーストパーティデータを使用して、広告主がサイト閲覧者に関連のある広告を購入できるようにすることができます。 サイト運営者が所有するインタレストグループは、これらのユーザーが他のサイトを閲覧している場合であっても、サイト運営者に同じことをさせることができます。           サイト運営者は、オーディエンスの特定のセグメントに広告を表示する機能に対して課金することが可能です。</td>
      </tr>
      <tr>
        <td style="vertical-align: top;">アドテク</td>
        <td style="vertical-align: top;"><a href="#dsp" title="DSP の用語集エントリ">DSP</a></td>
        <td style="vertical-align: top;">商品カテゴリ</td>
        <td style="vertical-align: top;">サイクリング用品に興味を示した人たち。</td>
        <td style="vertical-align: top;">アドテク企業は、あるカテゴリのアイテムの市場にいると信じているユーザーのインタレストグループを作成し、管理することができます。 このインタレストグループは、そのカテゴリ（とアドテク会社と連携しているユーザー）で商品を販売するサイトで、商品を宣伝するために使用されます。</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

{% endDetails %}

{: #buyer-detail}

{% Details %}

{% DetailsSummary %}

### バイヤーとは

{% endDetailsSummary %}

FLEDGE では、[インタレストグループ](#interest-group-detail)を所有し、広告オークションに入札する当事者を指します。

たとえば、以下が該当します。

- **[広告主](#advertiser)**: 広告主自体を代表します。
- **[デマンドサイドプラットフォーム](#dsp)**（DSP）: 広告主を代表します。
- **[インタレストグループオーナー](#interest-group-detail)**: 複数の広告主のために使用されます。

バイヤーには 3 つのジョブがあります。

- オークションに参加するかどうかを選択すること
- 広告を選択して入札単価を計算すること
- オークションの結果を報告すること

これらの任務は、FLEDGE 広告オークション中に実行される、バイヤーが提供するコードによるプログラムで実行されます。

バイヤーがユーザーのブラウザに対して、それが属しているグループにインタレストグループを追加するように要求する際（JavaScript 関数 `navigator.joinadInterestGroup()` を呼び出す）、バイヤーはブラウザに以下を提供します。

- [セラー](/docs/privacy-sandbox/glossary/#seller)が[広告オークション](/docs/privacy-sandbox/glossary/#ad-auction)を実施する際に使用する入札コードの URL。
- 場合によっては、インタレストグループの[広告クリエイティブ](/docs/privacy-sandbox/glossary/#creative)の URL。（広告の URL は、後で更新によって追加される可能性があります。）
- オークション中に入札コードがリアルタイム データを取得できるようにするための、クエリ対象のデータ [Key](#key-value) のリストとバイヤーの [Key/Value サービス](#key-value-service-detail)の URL。

バイヤーのコードには、オークションの結果を報告する `reportWin()` 関数を含めることもできます。

{% endDetails %}

{: #seller-detail}

{% Details %}

{% DetailsSummary %}

### 広告オークションの実行者

{% endDetailsSummary %}

広告スペースを販売するためにオークションを開催する可能性のある当事者は複数存在します。

たとえば、以下が該当します。

- **コンテンツパブリッシャー**: それ自体を代表し、自社サイトで広告コンテンツをホストします。
- **[サプライサイドプラットフォーム](#ssp)**（SSP）: サイト運営者と連携し、他のサービスを提供します。
- **サードパーティスクリプト**: サイト運営者を代表し、広告オークションへの参加を可能にします。

FLEDGE では、広告スペースの[セラー](/docs/privacy-sandbox/glossary/#seller)に次の 3 つのジョブがあります。

- サイト運営者のルールを強制すること: どのバイヤーとどの入札が適格か。
- オークションロジックの実行: JavaScript を[ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行して、各入札の望ましさのスコアを計算します。
- オークションの結果を報告すること

これらのジョブは、JavaScript 関数の `navigator.runadAuction()` を呼び出して広告 オークションを開始したときに、セラーが指定したコードによるプログラムで実行されます。

{% endDetails %}

{: #ad-auction}

{% Details %}

{% DetailsSummary %}

### FLEDGE 広告オークションの仕組み

{% endDetailsSummary %}

{: #auction-diagram}

以下の図は、FLEDGE の<a href="https://wd.imgix.net/image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png?auto=format&w=1600" title="クリックすると、画像の拡大版が表示されます" target="_blank">広告オークション</a>の各ステージの概要を示しています（<a>拡大表示</a>）。

<figure class="w-figure">   
{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/M8lyXt6JbwFncB16mTb0.png", alt="FLEDGE 広告オークションの 6 つのステージ", width="800", height="481" %}
</figure>

<br>

FLEDGE では、広告オークションは、広告を選択するためにブラウザがユーザーのデバイス上で実行する小さな JavaScript プログラムの集合体を指します。プライバシーを保護する目的で、セラーとバイヤーからのすべての広告オークションコードは、外部と通信できない分離された JavaScript [ワークレット](/docs/privacy-sandbox/glossary/#worklet)で実行されます。

セラー（サイト運営者またはサプライサイドプラットフォーム）は、広告スペースを販売するサイト（ニュースサイトなど）で FLEDGE 広告オークションを開始します。セラーは、オークションに参加するバイヤーを選択し、販売するスペースを示し、広告の追加基準を提供します。各バイヤーは、インタレストグループのオーナーです。

セラーは、各バイヤーの値、広告クリエイティブの URL、およびバイヤーごとに返されたその他のデータを含む、入札をスコアリングするためのコードをブラウザに提供します。オークション中、バイヤーからの入札コードとセラーからの入札スコアリング コードは、[Key/Value サービス](#key-value-service-detail)からデータを受け取ることができます。広告が選択されて表示されると（プライバシーを保護する [Fenced Frame](/docs/privacy-sandbox/fenced-frame/) に表示）、セラーと落札者はオークション結果を報告できます。

1. ユーザーが広告を表示するサイトにアクセスします。

2. セラーのコードがオークションを開始します。セラーは、どの広告スペースを販売するか、誰が入札できるか、それらの入札のスコアリング方法を指定します。

3. 招待されたバイヤーのコードが実行され、入札、関連する広告クリエイティブの URL、およびその他のデータが生成されます。入札スクリプトは、バイヤーの [Key/Value サービス](#key-value-service-detail)から、残りの広告キャンペーン予算などのリアルタイムデータをクエリできます。

4. セラーのコードが各入札をスコアリングし、落札者を選択します。このロジックは、入札値と他のデータを使用して入札の望ましさを返し、コンテキスト広告の落札者に勝てない広告を拒否します。セラーは、リアルタイムデータに独自の [Key/Value サービス](#key-value-service-detail)を使用できます。オークションが始まる前に、セラーは利用可能な広告スロットに最適なコンテキスト広告を見つけます。

5. 落札した広告は opaque 値として返され、Fenced Frame<br> に表示されます。セラーとサイト運営者のいずれもこの値を閲覧できなくなります。

6. オークションは、セラーと落札したバイヤーに報告されます。
    {% Aside %}
    セラーの `reportResult()` とバイヤーの `reportWin()` には、`sendReportTo()` の呼び出しを含めることができます。これは、[非公開集計](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#5-event-level-reporting-for-now)で集計レポートが利用可能になるまで、[一時的](/docs/privacy-sandbox/private-aggregation)に利用できます。

    落札できなかったバイヤーのレポートメカニズムは[ディスカッション中](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#53-losing-bidder-reporting)です
    {% endAside %}

{% endDetails %}

{: #key-value-service-detail}

{% Details %}

{% DetailsSummary %}

### FLEDGE Key/Value サービス とは？

{% endDetailsSummary %}

FLEDGE Key/Value サービスを使用すると、アドテックはバイヤーが入札を行ったときにリアルタイムデータをクエリし、セラーはプライバシーを保護しながら広告をスコアリングできます。FLEDGE Key/Value サービスは、[FLEDGE サービス](/blog/fledge-service-overview/)の 1 つです。

Key/Value サービスはアドテック独自のクラウド インフラストラクチャに展開され、サービスは[信頼できる実行環境](/docs/privacy-sandbox/glossary/#trusted-execution-environment)で実行されます。Key/Value サービスへのリクエストは、イベントレベルのログを記録したり、その他の副作用を引き起こしたりすることはありません。Key/Value サービスは、アドテックが Key/Value サービス内で独自のカスタムロジックを実行できるようにする[ユーザー定義関数（UDF）](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_trust_model.md#support-for-user-defined-functions-udfs)もサポートします。

{: #key-value}

バイヤーまたはセラーは、「キー」のリストを提供して、FLEDGE Key/Value サービスから必要なデータを指定します。Key/Value サービスは、各キーの値で応答します。

[FLEDGE Key/Value サービス コード](https://github.com/privacysandbox/fledge-key-value-service)が Privacy Sandbox GitHub リポジトリで利用できるようになりました。このサービスは、Chrome および Android の開発者が使用できます。

FLEDGE Key/Value サービスの詳細については、[API の Explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_Key_Value_Server_API.md) および[信頼できるモデルの Explainer](https://github.com/privacysandbox/fledge-docs/blob/main/key_value_service_trust_model.md) をご覧ください。

{% endDetails %}

{% Details %}

{% DetailsSummary %}

### オークションへのリアルタイムデータの組み込み方法

{% endDetailsSummary %}

広告オークションの[バイヤー](#buyer-detail)または[セラー](#seller-detail)は、リアルタイムデータにアクセスする必要がある場合があります。 入札者が広告キャンペーンの残りの予算を計算したい場合や、セラーがサイト運営者のポリシーに対して広告クリエイティブをチェックする必要がある場合などです。

FLEDGE のプライバシー要件を満たすために、広告オークション中に必要なリアルタイムデータは [Key/Value サービス](#key-value-service-detail)によって提供されます。各バイヤーが `navigator.joinAdInterestGroup()` を呼び出すと、バイヤーは Key/Value サービスの URL を指定し、オークション中にサービスに対してクエリされるキーを指定します。同様に、セラーが `navigator.runAdAuction()` を呼び出して広告オークションを実行すると、セラーは Key/Value サービスの URL を提供します。セラーの Key/Value サービスは、クリエイティブのレンダリング URL でクエリされます。

初期テストでは、 [「Bring Your Own Server」](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#3-buyers-provide-ads-and-bidding-functions-byos-for-now)モデルが使用されます。長期的には、アドテックはリアルタイムデータを取得するために、[信頼できる実行環境](https://github.com/privacysandbox/fledge-docs/blob/main/trusted_services_overview.md#trusted-execution-environment)で実行されるオープンソースの FLEDGE Key/Value サービスを使用する必要があります。

エコシステムがテストするのに十分な時間を確保するために、サードパーティの Cookie が廃止されるまでは、オープンソースの Key/Value サービスまたは TEE の使用が必要になるとは考えていません。この移行が行われる前に、開発者がテストと採用を開始できるのに十分な通知を行う予定です。

{% endDetails %}

{: #engage}

## 詳細について

FLEDGE の詳細な概要については、[FLEDGE API 開発者ガイド](/docs/privacy-sandbox/fledge-api/)を参照してください。

### 開発者

FLEDGE の使用を開始する準備ができている場合は、[実験を読んで参加](/docs/privacy-sandbox/fledge-experiment/)してください。

[API 開発者ガイド](/docs/privacy-sandbox/fledge-api)を作成し、FLEDGE の基本的なデプロイをウォークスルー形式で説明する [FLEDGE デモ](https://fledge-demo.glitch.me)を作成しました。[FLEDGE デモ動画](https://www.youtube.com/watch?v=znDD0gkdJyM&list=PLNYkxOF6rcICntazGfSVKSj5EwuR9w5Nv)では、デモコードがどのように機能するか、また Chrome DevTools で FLEDGE をデバッグする方法を説明しています。

## 貢献とフィードバックの共有

- **GitHub**: [提案](https://github.com/WICG/turtledove/blob/master/FLEDGE.md)を読み、[質問を投稿したり、ディスカッションに参加したり](https://github.com/WICG/turtledove/issues)できます。
- **W3C**: [Web 広告事業の改善グループ](https://www.w3.org/community/web-adv/participants)で、業界ユースケースについて議論できます。
- **開発者サポート**: [プライバシーサンドボックス開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で、質問を投稿したり、ディスカッションに参加したりできます。
