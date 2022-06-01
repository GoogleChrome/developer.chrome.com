---
layout: 'layouts/doc-post.njk'
title: 'Gnatcatcher'
subhead: >
  クロスサイトの隠されたトラッキングを防ぐため、個々のユーザーの IP アドレスを常に隠します。
description: >
  クロスサイトの隠されたトラッキングを防ぐため、個々のユーザーの IP アドレスを常に隠します。
date: 2022-03-04
authors:
  - alexandrawhite
---

## 実装状況

この文書では、隠されたトラッキングを防ぐための新しい提案として、Gnatcatcher の概要について説明します。

*  [Gnatcatcher の提案](https://github.com/bslassey/ip-blindness)が[公開ディスカッション](https://github.com/bslassey/ip-blindness/issues)されました。
*  この提案はどのブラウザーにも実装されていません。
*  [プライバシーサンドボックスタイムライン](https://privacysandbox.com/open-web/#the-privacy-sandbox-timeline) は、Gnatcatcher およびその他のプライバシーサンドボックス 提案の実装タイミングを示します。

## この提案が必要な理由

IP アドレスは、クライアントに一意の識別子を提供するために作成されます。 これにより、トラフィックをインターネット経由でルーティングできます。 IP アドレスは 一定期間にわたって安定しているため、ファーストパーティ全体でユーザーを識別できます。

Gnatcatcher、つまりグローバルネットワークアドレス変換と Audited および Trusted CDN または HTTP-Proxy Elimination Reidentification の組み合わせは、IP Blindness に対して提案された ソリューションです。 この提案は、[Willful IP Blindness](https://github.com/bslassey/ip-blindness/blob/master/willful_ip_blindness.md) と [Near-Path NAT](https://github.com/bslassey/ip-blindness/blob/master/near_path_nat.md) (またはプロキシ関連ソリューション) (Willful IP Blindness に参加していない接続の場合) という他の 2 つの提案と組み合わせることを提言しています。

つまり、デフォルトでは IP アドレスは隠されます。 サイトは、IP アドレスを悪用せずに直接接続を使用していること を証明できる場合があります。

### Willful IP Blindness とは何か

Willful IP Blindness の目的は、クロスサイトトラッキング目的で IP アドレスを使用していないことを表明するメカニズムを HTTP アプリケーションに提供することです。  
また、この提案では、このメカニズムは、ボット、DoS、および迷惑メールを検出する目的での IP アドレスの使用といった、 通常のサーバー運用を考慮すべきであると規定されています。

Willful IP Blindness は、ホスティングプロバイダーの負荷を軽減するために、コンテンツ配信ネットワーク (CDN) またはリバースプロキシによって、サービスとして提供される可能性があります。

### Near-Path Nat とは何か

Near-Path Nat (ネットワークアドレス変換) は、ユーザーのグループが同じサーバー経由でトラフィックを送信できるようにして、すべてのトラフィックが同じ IP アドレスのプールから発信されているように見せることを提案します。  この提案では、IP アドレスのプライバシーを保証するためにサーバー側の変更は必要ないことが提言されています。このため、 サイトとユーザーにとっては導入が大幅に容易になります。

{% Aside 'key-term' %}
_ネットワークアドレス変換_ は、1 つの一意の IP アドレス でコンピューターのグループを表せるプロセスです。
{% endAside %}

ブラウザーは、Multiplexed Application Substrate over QUIC Encryption (MASQUE) を使用して、IP privatizing server (IPPS) 経由で HTTP トラフィックを転送します。 サーバーによって認識される HTTP トラフィックの IP アドレスは、ブラウザーの IP アドレス ではなく IPPS の IP アドレスです。 IPPS に対してトラフィックの内容を隠すために、ブラウザーはエンドツーエンドの暗号化を使用します。

## Gnatcatcher の機能の仕組み

Gnatcatcher は、Near-Path NAT と Willful IP Blindness の両方の使用を提案しています。 Near-Path NAT (または別のプロキシソリューション) は、ベースラインのデフォルトとして の宛先サーバーからの IP アドレスを使用します。

悪用を防止するために追加の制御が必要な Web サービスプロバイダーのサブセットがあります。 これらのプロバイダーは、クライアントが直接接続できるように、Willful IP Blindness の準拠を証明するように選択できます。 その準拠は、監査と認証（Certification）によってに保証される可能性があります。

### Willful IP Blindness が施行される方法

Willful IP Blindness の施行では、複数の選択肢が考慮されます。 1 つの可能性は、IP アドレスにアクセスするための評価と証明のために、独立したサードパーティの コーディネーターを要求することです。

Gnatcatcher の施行はまだ[検討中](https://github.com/bslassey/ip-blindness/issues)です。

## Gnatcatcher が公開される時期

調整された提供の最も早い日が、Gnatcatcher が公開され、オプションとしてサイトで使用できる最も早い日です。 これは 2023 年以降になる予定です。

現時点では、Gnatcatcher は提案であり、どのブラウザーにも実装されていません。

## 貢献とフィードバックの共有

Gnatcatcher の提案は現在も検討中であるため、今後変更される可能性があります。 この API を試して、フィードバックがある場合は、ぜひお聞かせください。

*  **GitHub**: [提案](https://github.com/bslassey/ip-blindness)を読んで、 [質問を挙げ、ディスカッションに参加](https://github.com/bslassey/ip-blindness/issues)する。
*  **開発者サポート**: [プライバシーサンドボックス開発者サポートリポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)で質問を挙げ、ディスカッションに参加する。
