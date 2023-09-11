---
layout: layouts/blog-post.njk
title: Related Website Sets   - Chrome 117 で First-Party Sets の名前を変更
description: Related Website Sets（RWS）は、First-Party Sets の新しい名前です。セットをさらに柔軟に定義できるように改善されています。
date: 2023-08-31
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png
alt: プライバシーサンドボックスのロゴ
tags:
  - privacy
authors:
  - helencho
---

2024 年に開始されるサードパーティ Cookie の廃止に向け、Chrome 安定版では多数のプライバシーサンドボックス API が正式版（GA）へと強化されています。これらの API の中には、重要なクロスサイト Cookie のユースケースを保持する [CHIPS](/docs/privacy-sandbox/chips/) や、現在 [First-Party Sets（FPS）](/docs/privacy-sandbox/first-party-sets/)として知られている API も含まれています。この記事では、FPS の用途をさらによく反映して名前が変更された Related Website Sets（RWS）を紹介し、重要なユースケースと関連サブセットドメイン制限に関するアップデートについて説明します。

## 重要なユーザージャーニーの保持

RWS は、Chrome がデフォルトでサードパーティ Cookie へのアクセスを制限し始めた際にユーザー向けの機能が停止するのを最小限に抑えるように設計されています。プライバシーサンドボックスのプライバシーの目標を支持しながら、中断を最小限に抑えてユーザーがウェブを閲覧できるようにすることが目標です。この均衡を取るために、RWS はウェブサイトの機能に関連する特定のユースケースをターゲットとしています。

- [ccTLD のユースケース](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets)は、公開トラッカーに記録されている[ログイン例](https://issuetracker.google.com/268390722)などの破損に対処します。このようなケースは、通常ヒューリスティックベースの例外によってエコシステムで対処されます（[参照 1](#ref-1) を参照）。
- [サービスドメインのユースケース](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets)は、機密性を伴う機能（認証フローのサポートなど）をユーザー向けのドメインから分離する開発者の一般的な実践に対処します。このようなケースは、ターゲット[例外](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/browser/extensions/webcompat/data/shims.js#686)によってエコシステムで対処されます（[参照 2](#ref-2) を参照）。
- [関連ドメインのユースケース](https://github.com/WICG/first-party-sets/tree/main#defining-a-set-through-use-case-based-subsets)は、重要なユーザージャーニーに関するサードパーティ Cookie アクセスが必要となるドメインのタイプにより高い柔軟性を提供します（[参照 3](#ref-3) を参照）。ccTLD とサービスドメインのユースケースでは、ドメインの特徴に基づいて乱用を最小限に抑えるための厳しい技術チェックが採用されますが、関連ドメインでは、ドメイン数制限が使用されます。この詳細については、次のセクションをお読みください。

## 関連ドメインの制限が 5 ドメインに増加

Chrome は以前、Associated Subset（と 1 プライマリードメイン）に対して 3 ドメインの数制限を提案しました。これは、蔓延するトラッキングの乱用を防止することを目的に提案されたものでしたが、様々なユースケースに対応するにはこの数が少なすぎるというウェブ標準参加団体からのフィードバックを聞きいれることとしました。

他の主要ブラウザが提供する最も比較可能な実装に最も一致するように、関連ドメインの数制限を 5 に引き上げることに決定ｓｈしました（[参照 4](#ref-4) を参照）。これは、Chrome 117 より適用されます。

RWS は広告ソリューションとしての機能を意図としていないため、広告ユースケースに役立つように RWS を改善する方法についてのフィードバックは考慮されていません。広告ユースケースにおいては、開発者は Topics、Protected Audience、および Attribution Reporting API の使用を詳しく調べ、それらに関するフィードバックを適宜提供してください。

## 5 関連ドメインの枠を超えた拡張ユースケースのオプション

ユーザーに影響する、この制限でサポートされないエクスペリエンスについて、Chrome は、Storage Access API（SAA）という他のブラウザが採用した標準も利用する[ユーザープロンプトフローに取り組んでいます](https://github.com/cfredric/chrome-storage-access-api)。5 関連ドメイン以上の数が必要なユースケースについては、RWS 以外のコンテキストで SAA がどのようにサポートできるかを評価するように開発者に勧めています。[この機能](https://groups.google.com/a/chromium.org/g/blink-dev/c/JHf7CWXDZUc/m/Dy2EElgvAgAJ)については、別途 Blink のリリースプロセスに従っています。Blink は Chrome 117 よりデスクトップ版 Chrome で公開される予定です。

## 次のステップ

これまでこの API の形成に貢献していただいたエコシステムからのフィードバックに感謝しています。開発者が構築するウェブサイトのエンドユーザーエクスペリエンスを維持するための予測可能性、制御性、および主体性を提供する方法として RWS に取り組んできました。RWS をリリースするに当たり、開発者がそれを採用して使用する要するを目の当たりにし、感激しています。[提出プロセス](https://github.com/GoogleChrome/first-party-sets/blob/main/FPS-Submission_Guidelines.md)は現在公開中であり、提出を支援するための出発点としては [RWS JSON ジェネレーターツール](https://goo.gle/rws-json-generator)を使用するのが最適です。

進捗は、[Intent to Ship スレッド](https://groups.google.com/a/chromium.org/g/blink-dev/c/7_6JDIfE1as/m/wModmpcaAgAJ)で追跡できます。また、実装ガイドについては、[こちらの資料](/docs/privacy-sandbox/first-party-sets-integration/)をご覧ください。

{% Details %}

{% DetailsSummary %}

リファレンス

{% endDetailsSummary %}

1. <a id="ref-1"></a>ブラウザ間で、これらのクロスサイト Cookie のユースケースは必要であるという一般的な合意がありますが、それぞれに異なる方法で有効にされます。[Firefox](https://developer.mozilla.org/docs/Web/Privacy/Storage_Access_Policy#automatic_storage_access_upon_interaction)（[コード](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/dom/base/Document.cpp#16328)）と [Safari](https://webkit.org/blog/8311/intelligent-tracking-prevention-2-0/#:~:text=Temporary%20Compatibility%20Fix%3A%20Automatic%20Storage%20Access%20for%20Popups)（[コード](https://searchfox.org/wubkat/rev/5b368793a8c0a3d99c6991fcd3ef96e3dbd2cf2a/Source/WebKit/NetworkProcess/Classifier/ResourceLoadStatisticsDatabaseStore.cpp#1266)）はいずれもポップアップヒューリスティックの実装によって、[Nintendo ログインフロー](https://issuetracker.google.com/268390722)などで観察された破損に対処しています。
2. <a id="ref-2"></a>また、ブラウザが例外をハードコーディングしてユーザーの中断を最小限に抑えた例も複数あります。Firefox は [Microsoft Teams と login.microsoftonline.us の間のリダイレクトフローでのストレージアクセス](https://searchfox.org/mozilla-central/rev/3002762e41363de8ee9ca80196d55e79651bcb6b/browser/extensions/webcompat/data/shims.js#686)を許可しています。
3. <a id="ref-3"></a>Firefox は、ユーザーが instagram.com でログインすると [facebook.com に代わって requestStorageAccessForOrigin を呼び出す「shim」](https://searchfox.org/mozilla-central/source/browser/extensions/webcompat/shims/instagram.js)を提供しています。サイトのグループ化の例は、複数のドメインに対してストレージアクセスのプロンプトをグループ化する Safari の[ハードコーディングされた例外](https://github.com/WebKit/WebKit/blob/a2db53cd97dc8136ac5c2a22d4cd2b53d0d717d6/Source/WebCore/platform/network/NetworkStorageSession.cpp#L395)でも見られます。
4. <a id="ref-4"></a>Firefox は、ユーザーが過去にアクセスしたことのある[サードパーティサイトが発行する最初の 5 つの requestStorageAccess 呼び出しを自動許可](https://developer.mozilla.org/docs/Web/API/Storage_Access_API#:~:text=Firefox%20only%20prompts%20users%20after%20an%20origin%20has%20requested%20storage%20access%20on%20more%20than%20a%20threshold%20number%20of%20sites)（[コード](https://searchfox.org/mozilla-central/rev/c615dc4db129ece5cce6c96eb8cab8c5a3e26ac3/modules/libpref/init/StaticPrefList.yaml#4035)）します。 Chrome では、同一サイトのプライマリードメインのほかに、関連サブセットにリストされている最初の 5 ドメインに、RWS を介して自動付与されたサードパーティ Cookie アクセスが与えられます。

{% endDetails %}
