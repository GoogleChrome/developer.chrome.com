---
layout: layouts/doc-post.njk
title: 共有ストレージを使用する
subhead: 共有ストレージのユースケースとコード サンプルを検証します。
description: 共有ストレージのユースケースとコード サンプルを検証します。
date: 2022-06-28
updated: 2022-07-14
authors:
  - alexandrawhite
  - kevinkiklee
---

共有ストレージの提案は、考えられる多くのユースケースをサポートする汎用のクロスサイト ストレージ API を作成することを目的としています。このドキュメントには、作業を開始するのに役立つコード サンプルが含まれています。

Chrome 104 では、以下の機能をテストできます。

- [**URL の選択**](#url-selection): ワークレットスクリプトを実行して、保存されたデータに基づいて、提供されたリストから URL を選択し、それを Fenced Frame にレンダリングできます。これには、フリークエンシーキャップに達したときに新しい広告を選択するなど、多数の潜在的な使用方法があります。
- [**A/B テスト**](#ab-testing): ユーザーを実験グループに割り当てたら、そのグループを共有ストレージに保存して、サイト間でアクセスできるようにすることができます。
- [**クリエイティブ ローテーション**](#creative-rotation): クリエイティブ ローテーション モードとその他のメタデータを保存して、異なるサイト間でクリエイティブをローテーションできます。
- [**決済プロバイダーの既知の顧客**](#known-customer): ユーザーがサイトに登録したかどうかを共有ストレージに保存し、その保存されたステータスに基づいて別の要素をレンダリングできます。

以下のユースケースは、Chrome ベータ版ではテストできませんが、今後サポートされる予定です。

- [**クロスサイトデータのノイズ付き集計**](#aggregated-data): ワークレットスクリプトを実行して、プライバシーサンドボックスの提案である [Private Aggergation API](https://github.com/alexmturner/private-aggregation-api)（現時点では草案です）でデータを送信できるようになります。これにより、プライバシーを保護したレポートが返されます。

これらは、共有ストレージのユースケースの一部にすぎません。[フィードバックを受け取り](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)、新しいユースケースが見つかるたびに、例を追加し続けます。

## 共有ストレージ API を試す

`chrome://flags/#privacy-sandbox-ads-apis` で**プライバシーサンドボックス広告 API 実験**フラグを有効にすると、Fenced Frames を使用した共有ストレージ API を Chrome 104（バージョン 104.0.5086.0 以降）でテストできます。

{% Img src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/CWfgCMJQ5cYPOfjttF3k.png", alt="これらの API を使用するには、プライバシー サンドボックス広告 API の実験を有効に設定してください", width="744", height="124" %}

### デモを使用する

デモは [goo.gle/shared-storage-demo](http://goo.gle/shared-storage-demo) でアクセスできます。また、コードは [GitHub](https://github.com/GoogleChromeLabs/shared-storage-demo) で入手できます。

このデモは、さまざまなサイト運営者間で情報を保存したい広告主/DSP の観点から構成されています。広告主を靴会社、サイト運営者をニュース会社と考えてください。デモでは、ユースケースごとに、同じ広告主コードが**サイト運営者 A** と**サイト運営者 B** の両方で実行されます。両方のサイト運営者にアクセスして、2 つのサイト間でデータがどのように共有されているかを確認します。

デモには、フリークエンシーキャップ、クリエイティブ ローテーション、既知の顧客、および A/B テストのユース ケースが含まれています。

## コードサンプルを試す

{% Aside %}

以下のコードサンプルは、特定のユースケースで API を使用する方法を示すために作成されています。これらは本番環境での使用を意図したものではありません。

{% endAside %}

### URL 選択 {: #url-selection }

不透明な URL を選択して作成するには、ワークレットモジュールを登録して、共有ストレージデータを読み取ります。ワークレットクラスは、最大 8 つの URL のリストを受け取り、選択した URL のインデックスを返します。

クライアントが `sharedStorage.runURLSelectionOperation()` を呼び出すと、ワークレットが実行され、[Fenced Frame](/docs/privacy-sandbox/fenced-frame/) にレンダリングされる不透明な URL が返されます。

広告主のフリークエンシーキャップ（一定期間内に 1 つの広告でユーザーが表示できる最大回数）に基づいて広告を表示するとします。フリークエンシーキャップの値は共有ストレージに保存されます。共有ストレージワークレットは、共有ストレージの値を読み取り、ビューが追加されるたびに値を減らします。使用可能なインプレッションが残っている（ユーザーがフリークエンシーキャップに達していない）場合は広告が返されます（index `1`）が、残っていない場合は、デフォルトの URL が返されます（index `0`）。

この例では以下が使用されています。

- `frequency-cap.js`: 広告主の iframe を介して読み込まれ、共有ストレージワークレットを読み込み、返された不透明なソースを Fenced Frame にレンダリングします。
- `frequency-cap-worklet.js`: フリークエンシーキャップのカウント値を読み取って、広告クリエイティブに対して返される URL を決定する共有ストレージワークレットです。

**[frequency-cap.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/frequency-cap.js)**

```javascript
// 最初の URL は、フリークエンシーキャップに達したときにレンダリングされるデフォルトの広告です
const AD_URLS = [
  { url: `https://localhost:4437/ads/default-ad.html` },
  { url: `https://localhost:4437/ads/example-ad.html` },
];

async function injectAd() {
  // ワークレットモジュールを読み込みます
  await window.sharedStorage.worklet.addModule('frequency-cap-worklet.js');

  // 初期フリークエンシーキャップを 5 に設定します
  window.sharedStorage.set('frequency-cap-count', 5, {
    ignoreIfPresent: true,
  });

  // 共有ストレージのフリークエンシーキャップに応じて広告を選択する URL 選択演算を実行します
  const opaqueURL = await window.sharedStorage.selectURL('frequency-cap', AD_URLS);

  // 不透明な URL を Fenced Frame にレンダリングします
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[frequency-cap-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/frequency-cap-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // 共有ストレージの現在のフリークエンシーキャップを読み取ります
    const count = parseInt(await this.sharedStorage.get('frequency-cap-count'));

    // count が 0 の場合、フリークエンシーキャップに達しています
    if (count === 0) {
      console.log('frequency cap has been reached, and the default ad will be rendered');
      return 0;
    }

    // 共有ストレージに新しいフリークエンシーキャップを設定します
    await this.sharedStorage.set('frequency-cap-count', count - 1);
    return 1;
  }
}

// 演算を 'frequency-cap' として登録します
register('frequency-cap', SelectURLOperation);
```

### A/B テスト {: #ab-testing }

実験が望ましい効果をもたらすかどうかを確認するには、複数のサイトで A/B テストを実行できます。広告主は、ユーザーが割り当てられているグループに基づいて、異なる広告を表示することを選択できます。グループの割り当ては共有ストレージに保存されます。

この例では以下が使用されています。

- `ab-testing.js`: コントロールと 2 つのテスト広告をマッピングする広告 iframe に埋め込む必要があります。スクリプトは、実験用の共有ストレージワークレットを呼び出します。
- `ab-testing-worklet.js`: ユーザーが割り当てられているグループを返し、表示される広告を決定する共有ストレージワークレットです。

**[ab-testing.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/ab-testing.js)**

```javascript
// 実験グループを URL にマッピングします
const EXPERIMENT_MAP = [
  {
    group: 'control',
    url: `https://advertiser.example/ads/default-ad.html`,
  },
  {
    group: 'experiment-a',
    url: `https://advertiser.example/ads/experiment-ad-a.html`,
  },
  {
    group: 'experiment-b',
    url: `https://advertiser.example/ads/experiment-ad-b.html`,
  },
];

// 初期の実験用にランダムなグループを選択します
function getRandomExperiment() {
  const randomIndex = Math.floor(Math.random() * EXPERIMENT_MAP.length);
  return EXPERIMENT_MAP[randomIndex].group;
}

async function injectAd() {
  // ワークレットモジュールを読み込みます
  await window.sharedStorage.worklet.addModule('ab-testing-worklet.js');

  // ストレージの初期値をランダムな実験グループに設定します
  window.sharedStorage.set('ab-testing-group', getRandomExperiment(), {
    ignoreIfPresent: true,
  });

  const urls = EXPERIMENT_MAP.map(({ url }) => ({ url }));
  const groups = EXPERIMENT_MAP.map(({ group }) => group);

  // 共有ストレージの実験グループに応じて広告を選択する URL 選択演算を実行します
  const opaqueURL = await window.sharedStorage.selectURL('ab-testing', urls, { data: groups });

  // 不透明な URL を Fenced Frame にレンダリングします
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[ab-testing-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/ab-testing-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // 共有ストレージからユーザーのグループを読み取ります
    const experimentGroup = await this.sharedStorage.get('ab-testing-group');

    // グループのインデックスを返します
    return data.indexOf(experimentGroup);
  }
}

register('ab-testing', SelectURLOperation);
```

### クリエイティブ ローテーション {: #creative-rotation }

広告主は、広告キャンペーンにさまざまな戦略を適用し、クリエイティブをローテーションして広告の効果を高めたい場合があります。共有ストレージを使用して、異なるサイト間で順次ローテーションや均等分散ローテーションなどのさまざまなローテーション戦略を実行できます。

この例では以下が使用されています。

- `creative-rotation.js`: 広告 iframe に埋め込まれています。このスクリプトは、最も重要な広告（広告の重み）を設定し、ワークレットを呼び出してどの広告を表示するかを決定します。
- `creative-rotation-worklet.js`: 広告クリエイティブの加重配分を決定し、それを表示すべきかを返す共有ストレージワークレットです。

**[creative-rotation.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/creative-rotation.js)**

```javascript
// 広告の URL、ローテーションの確率重み、およびクリックスルー率による広告の構成。
const DEMO_AD_CONFIG = [
  {
    url: 'https://advertiser.example/ads/ad-1.html',
    weight: 0.7,
  },
  {
    url: 'https://advertiser.example/ads/ad-2.html',
    weight: 0.2,
  },
  {
    url: 'https://advertiser.example/ads/ad-3.html',
    weight: 0.1,
  },
];

// モードを sequential に設定し、開始インデックスを 0 に設定します。
async function seedStorage() {
  await window.sharedStorage.set('creative-rotation-mode', 'sequential', {
    ignoreIfPresent: true,
  });

  await window.sharedStorage.set('creative-rotation-index', 0, {
    ignoreIfPresent: true,
  });
}

async function injectAd() {
  // ワークレットモジュールを読み込みます
  await window.sharedStorage.worklet.addModule('creative-rotation-worklet.js');

  // 最初にデモ用に、ストレージを sequential に設定します
  seedStorage();

  // レンダリングされる次の広告を決定する URL 選択演算を実行します
  const urls = DEMO_AD_CONFIG.map(({ url }) => ({ url }));
  const opaqueURL = await window.sharedStorage.selectURL('creative-rotation', urls, { data: DEMO_AD_CONFIG });

  // 不透明な URL を Fenced Frame にレンダリングします
  document.getElementById('ad-slot').src = opaqueURL;
}

injectAd();
```

**[creative-rotation-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/creative-rotation-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls, data) {
    // 共有ストレージからローテーションモードを読み取ります
    const rotationMode = await this.sharedStorage.get('creative-rotation-mode');

    // ローテーションに使用する乱数を生成します
    const randomNumber = Math.random();

    let index;

    switch (rotationMode) {
      /**
       * 順次ローテーション
       * - クリエイティブを順にローテーションします
       * - 例: A -> B -> C -> A ...
       */
      case 'sequential':
        const currentIndex = await this.sharedStorage.get('creative-rotation-index');
        index = parseInt(currentIndex, 10);
        const nextIndex = (index + 1) % urls.length;

        await this.sharedStorage.set('creative-rotation-index', nextIndex);
        break;

      /**
       * 重み付きローテーション
       * - 重み付き確率でクリエイティブをローテーションします
       * - 例: A=70% / B=20% / C=10%
       */
      case 'weighted-distribution':
        // 重みの累積和が乱数を超える最初の URL を
        // 求めます。配列は重みの降順で
        // 並べ替えられます。
        let weightSum = 0;
        const { url } = data
          .sort((a, b) => b.weight - a.weight)
          .find(({ weight }) => {
            weightSum += weight;
            return weightSum > randomNumber;
          });

        index = urls.indexOf(url);
        break;

      default:
        index = 0;
    }

    return index;
  }
}

register('creative-rotation', SelectURLOperation);
```

### 既知の顧客 {: #known-customer }

ユーザーが別のサイトで表示されたかどうかに基づいて、別の要素をレンダリングすることができます。たとえば、決済プロバイダーは、ユーザーが決済プロバイダーのサイトに登録したかどうかに基づいて、［登録］または［今すぐ購入］ボタンをレンダリングする必要がある場合があります。共有ストレージを使用して、ユーザーのステータスを設定できます。

この例では以下が使用されています。

- `known-customer.js`: 広告 iframe に埋め込まれています。このスクリプトは、サイトに［登録］または［今すぐ購入］のどちらのボタンを表示するかのオプションを設定します。
- `known-customer-worklet.js`: ユーザーが既知かどうかを判断する共有ストレージワークレットです。ユーザーが既知の場合、情報が返されます。ユーザーが不明な場合は、その情報が返されて［登録］ボタンが表示され、ユーザーは将来的に既知としてマークされます。

**[known-customer.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer.js)**

```javascript
// 「登録」ボタンの最初の URL は不明なユーザーに対してレンダリングされます。
const AD_URLS = [
  { url: `https://${advertiserUrl}/ads/register-button.html` },
  { url: `https://${advertiserUrl}/ads/buy-now-button.html` },
];

async function injectAd() {
  // ワークレットモジュールを読み込みます
  await window.sharedStorage.worklet.addModule('known-customer-worklet.js');

  // 初期ステータスを不明に設定します（'0' は不明、'1' は既知）
  window.sharedStorage.set('known-customer', 0, {
    ignoreIfPresent: true,
  });

  // ユーザーのステータスに応じてボタンを選択する URL 選択演算を実行します
  const opaqueURL = await window.sharedStorage.selectURL('known-customer', AD_URLS);

  // 不透明な URL を Fenced Frame にレンダリングします
  document.getElementById('button-slot').src = opaqueURL;
}

injectAd();
```

**[known-customer-worklet.js](https://github.com/GoogleChromeLabs/shared-storage-demo/blob/main/sites/advertiser/known-customer-worklet.js)**

```javascript
class SelectURLOperation {
  async run(urls) {
    const knownCustomer = await this.sharedStorage.get('known-customer');

    // '0' は不明、'1' は既知
    return parseInt(knownCustomer);
  }
}

register('known-customer', SelectURLOperation);
```

### クロスサイト データ集計（広告キャンペーンのリーチ） {: #aggregated-data }

{% Aside %}

この提案されたユースケースは、今はまだ利用できない集計サービスに依存しています。準備が整い次第、このドキュメントを更新します。

{% endAside %}

ユーザーに関するデータを集計することでユーザーのプライバシーを保護しながら、そのデータをサイト全体のリーチを測定する集計サービスに送信することもできます。

たとえば、ある消費財会社は、複数のサイトで認知度向上キャンペーンを実施して、広告を見る人の数を最大化しています。同社は、リーチ、つまり広告を見たユニークユーザー数を知りたいと考えています。この例では、サイト運営者は次の 2 つのファイルを作成します。

- `ad-iframe.js`: iframe に埋め込む必要があります。iframe は共有ストレージワークレットを呼び出し、広告キャンペーン ID を含むレポートを送信します。
- `reach-worklet.js`: 集計対象のリーチレポートを送信する共有ストレージワークレットです。

**ad-iframe.js**

```javascript
await window.sharedStorage.worklet.addModule("reach.js");
await window.sharedStorage.runOperation("send-reach-report", {
  data: {
     "campaign-id": "1234"
  }
});
```

**reach-worklet.js**

```javascript
class SendReachReportOperation {
  async function run(data) {
    const report_sent_for_campaign = "report-sent-" + data["campaign-id"];

    // このキャンペーンで以前にレポートが送信されていない
	 // ユーザーのリーチのみを計算します。
    // 現在のサイト以外のサイトで、このキャンペーンで以前に
    // レポートをトリガーしたことのあるユーザーはスキップされます。
    if (await this.sharedStorage.get(report_sent_for_campaign) === "yes") {
      return;  // レポートを送信しない。
    }

    // ユーザーエージェントはある遅延後にレポートをデフォルトの
	 // エンドポイントに送信します。
    privateAggregation.sendHistogramReport({
      bucket: data["campaign-id"];
      value: 128,  // 事前決定済みの固定値。「Private Aggregation API の Explainer: 値のスケーリング」をご覧ください。
      });

    await this.sharedStorage.set(report_sent_for_campaign, "yes");
  }
}
registerOperation("send-reach-report", SendReachReportOperation);
```

### ユーザーの同意ステータス {: #user-content-status }

アドテック企業は、多くの場合、追跡する必要があるクロスサイトの同意ステータスを持っています。たとえば、アドテック企業は、GDPR などの規制に関連するアドテックの条件やサービス、またはポリシーにユーザーが同意したかどうかを保存する必要がある場合があります。

このユースケースでは、主に以下の 2 つの理由から共有ストレージは推奨されません。

1. ユーザーがプライバシーサンドボックス API の使用をオプトアウトすると、組織は共有ストレージをまったく使用できなくなるため。
2. 現在の出力ゲートでは、オリジントライアルの後で k-匿名性または追加のノイズが必要になるため。これは、同意ステータスがすべてのケースで 100% 正確に表されない可能性がゼロではないことを意味します。

## エンゲージメントとフィードバックの共有

共有ストレージの提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

- **GitHub**: [提案](https://github.com/pythagoraskitty/shared-storage)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/pythagoraskitty/shared-storage/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
