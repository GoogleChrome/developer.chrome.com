---
layout: layouts/doc-post.njk
title: バウンストラッキング対策
subhead: >
  コンテキストをまたいで人を認識するバウンス トラッキングの機能を抑制または排除します。
description: >
  コンテキストをまたいで人を認識するバウンス トラッキングの機能を抑制または排除します。
date: 2022-10-04
authors:
  - anusmitaray
---

## 実装ステータス {: #status}

このドキュメントでは、[バウンストラッキング対策に関する新しい提案](https://github.com/wanderview/bounce-tracking-mitigations)の概要を説明します。

- [バウンス トラッキング対策の提案](https://github.com/wanderview/bounce-tracking-mitigations/blob/main/explainer.md)が[公開ディスカッション](https://github.com/wanderview/bounce-tracking-mitigations/issues)に進みました。
- この提案は[どのブラウザにも実装されていません](https://chromestatus.com/feature/5705149616488448?context=myfeatures)。
- [プライバシーサンドボックスのタイムライン](http://privacysandbox.com/timeline)には、バウンストラッキング対策やその他のプライバシーサンドボックスの提案の実装タイミングに関する情報が提供されています。

## この提案が必要とされる理由 {: #proposal-reason}

ブラウザベンダーは現在、ウェブからサードパーティ Cookie を積極的に排除していますが、その結果、一部のプラットフォームトラッカーがバウンストラッキングを導入するようになりました。

{% Aside 'key-term' %} *バウンストラッキング*は、ブラウザのトラッキング防止設定を回避する技法です。これにより、サードパーティベンダーがファーストパーティ Cookie を設定し、読み取ることができるようになります。 {% endAside %}

バウンストラッキング対策には以下の目的があります。

- [コンテキストをまたいで人を認識する](https://w3ctag.github.io/privacy-principles/#hl-recognition-cross-context)バウンス トラッキングの機能を抑制または排除します。
- ブラウザポリシーまたはユーザー設定のいずれかが原因でサードパーティ Cookie が無効になっている場合に、ステートフルバウンスがサードパーティ Cookie をシミュレートしないようにします。
- ステートフルリダイレクトを使用して実装されている、ユーザーに重要なユースケースのサポートを維持します。
- ブロックリストに依存する他のプライバシー対策では適切に対処できない可能性がある短命のドメインの影響を軽減します。
- 影響を受けるウェブサイトの判定に、拒否リストまたは許可リストの使用は避けます。

## バウンストラッキング対策の仕組み {: #how-it-works}

この提案は、以下のユースケースでバウンストラッキングに対処します。

- **サードパーティ Cookie のシミュレーション**: サードパーティトラッカーへのリダイレクトを使用して Cookie をバイパスするブラウザ設定を作成するサイト。この問題を軽減するために、ブラウザはトラッカーのドメインストレージを消去することができます。
- **発出リダイレクト**: すべての発出リンクをトラッカードメインを介してリダイレクトするサイト。この問題を軽減するために、ブラウザはトラッカーのドメインストレージを消去することができます。

### 範囲外のユースケース

範囲外のリダイレクトフローには、ID 連携認証、SSO、および決済が含まれます。これは、こういったフローはバウンストラッキングのシナリオに似ているものの、直接的なユーザー操作を伴うものであるためです。[詳細については、Explainer を参照](https://github.com/wanderview/bounce-tracking-mitigations/blob/main/explainer.md)してください。

- **ID 連携認証**: [ID 連携認証](/docs/privacy-sandbox/fedcm/)は、ユーザーがウェブで **ID プロバイダーでログイン**（Facebook、GitHub、Google など）ボタンをクリックすると発生します。
- **シングル サインオン**: サイトでシングル サインオン（SSO）が使用されている場合、ユーザーは、ID プロバイダーで 1 回ログインしておけば、他のサイトへのすべてのアクセスでも自動的にログインされることを期待しています。
- **決済**: 今日のウェブではさまざまな決済フローが使用されており、この提案ではそれらが機能し続けることを目指しています。

## バウンストラッキング対策の適用方法 {: #enforcement}

この提案には、追加の API はありません。代わりに、ブラウザの動作が変更されます。

大まかに言えば、以下の両方の条件が当てはまる場合、ブラウザがサイト（eTLD+1）のストレージを自動的に削除することが提案されています。

- ブラウザが、リダイレクトバウンス中に状態が保存されたと認識した場合。
- ブラウザが、ユーザーがサイト（eTLD+1）でサポートされているユースケースを実行しているという信号を受けていない場合。

これらの定義を明確にすることが、バウンストラッキング対策の取り組みにおいて重要となります。

バウンストラッキング対策の実施については、まだ[議論中](https://github.com/wanderview/bounce-tracking-mitigations/issues)です。

### セキュリティに関する考慮事項

[この提案には、バウンストラッキング対策の Explainer で概説されているセキュリティ上の考慮事項](https://github.com/wanderview/bounce-tracking-mitigations/blob/main/explainer.md#privacy-and-security-considerations)がいくつかあります。

## バウンス トラッキング対策の公開時期 {: #availability}

この提案は、主に、サードパーティ Cookie が無効になっている場合にのみ効果が現れます。サードパーティ Cookie を使用すれば、バウンストラッキングとほぼ同じ結果を得ることができるため、サードパーティ Cookie が有効になっているときにこれらの対策を有効にすることは目指していません。

## 貢献とフィードバックの共有 {: #feedback}

バウンストラッキング対策の提案は現在も検討中であるため、今後変更される可能性があります。フィードバックがある場合は、ぜひお聞かせください。

- **GitHub**: [提案](https://github.com/wanderview/bounce-tracking-mitigations)を読み、[質問を投稿したり、ディスカッションに参加](https://github.com/wanderview/bounce-tracking-mitigations/issues)したりできます。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
