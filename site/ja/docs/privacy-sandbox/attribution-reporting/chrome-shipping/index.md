---
layout: layouts/doc-post.njk
title: Chrome が Attribution Reporting API の出荷を計画している理由
description: Web Incubator Community Group で開発段階にある API を 2023 年前半に出荷する予定である理由を説明します。
date: 2022-12-15
authors:
  - csharrison
  - cilvento
  - maudn
---

Attribution Reporting API は、ユーザーのプライバシーを強化しながら、[Attribution Reporting のユースケース](/docs/privacy-sandbox/attribution-reporting/#use-cases-and-features)をサポートするための Chrome の提案です。これは、同じ問題の解決に取り組む多くの提案（[1](https://github.com/patcg-individual-drafts/ipa)、[2](https://github.com/privacycg/private-click-measurement)、[3](https://github.com/WICG/privacy-preserving-ads/blob/main/MaskedLARK.md)、[4](https://github.com/WICG/privacy-preserving-ads/blob/main/Bucketization.md) など）の 1 つです。

この記事では、[Web Incubator Community Group](https://github.com/WICG/attribution-reporting-api) でまだ開発中の Attribution Reporting API を 2023 年前半に出荷する計画について説明します。Chrome は、関連する W3C プロセスへの参加に全力で取り組んでおり、Chrome チームは  [Private Advertising Technology Community Group](https://www.w3.org/community/patcg/)（PATCG）において、多くのブラウザ エンジンで広く受け入れられるソリューションを特定することに取り組んでいます。API を並行して出荷することで、この重要なユースケースをテストして改善することが可能となります。

**Attribution Reporting API が提供するユースケースは、サード パーティ Cookie を段階的に廃止する前に、エコシステムのニーズを効果的にサポートするために重要です。**

私たちは、ウェブエコシステムの繁栄にはアトリビューション レポートのユースケースが不可欠であると信じています。また、ウェブ上のユーザーのプライバシーを向上するには、Chrome からサード パーティ Cookie を削除することが不可欠であると考えています。

エコシステムのニーズに応え、ユーザーのプライバシーをより良く保護するには、この API を出荷し、サード パーティ Cookie を段階的に廃止する前にテストと調整を可能にする必要があると考えています。この立場は、プライバシー サンドボックスと Chrome によるサード パーティ Cookie の削除に関する英国の競争市場庁（CMA）に対する Google の[取り組み](https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf)と一致しています。

**Attribution Reporting API の出荷により、開発者は新しいテクノロジーに適応し、標準プロセスに情報を提供する実際のエクスペリエンスを提供できると同時に、ユーザーのプライバシーを向上させることができます。**

標準はウェブが機能するために不可欠ですが、確立するには時間と合意が必要です。ウェブがクロスサイトトラッキングから遠ざかるため、開発する新しいテクノロジーがエコシステムのニーズを効果的にサポートできるようにする必要があります。

これには、Attribution Reporting API を広く利用できるようにする必要があります。これにより、開発者は標準化プロセスが進行している間に新しいテクノロジーを採用し、テストの結果を評価する機会が得られます。私たちは、この採用とテストの結果が標準設定プロセスに反映され、PATCG の参加者が、基礎となるユースケースを満たす相互運用可能な標準について、より多くの情報に基づいた合意に達することができると信じています。

Attribution Reporting API を出荷することで、ウェブプラットフォームにおける今後の測定の基礎を築くという点で具体的なメリットが得られます。

- 研究: API を運用することで、Chrome や他のブラウザ ベンダーは将来の相互運用可能な API を設計するために必要な重要なインサイトを得ることができます。私たちは、将来の標準を改善するために、初期のインサイトを PATCG などに提供します。
- 開発パラダイムのシフト: Attribution Reporting API に移行する開発者は、特定の API に関係なく、将来のプライバシー保護測定の鍵となる可能性のある、ノイズの追加などの新しい技術概念を強化することになります。開発者はまた、他のシステムをノイズを含むデータに適応させ始めるでしょう。私たちは開発者に、転移可能と思われるノイズや概念に対処するために必要なドキュメントとサポートを提供するために最善を尽くす意向です。

これらのメリットはすべて、サード パーティ Cookie の段階的廃止に伴うユーザープライバシーの根本的な改善に追加されるものです。これには、上記で説明した理由から、アトリビューション レポートのユースケースをサポートする API を最初に提供する必要があると考えられます。

**Chrome は、相互運用可能な代替技術に慎重に移行します。**

Chrome は、サード パーティ Cookie の廃止後のエコシステムをサポートするために、このユースケースに効果的でプライバシーを強化する API を提供することに取り組んでいます。短期的には、これには Attribution Reporting API の出荷が必要になると考えられます。

ただし、一部のブラウザが Chrome の提案に対して肯定的なシグナルを表明していないことは認識しています。私たちの長期的な目標は、ブラウザが広くサポートする相互運用可能な標準であり、そのようなソリューションを特定するために積極的に取り組んでいます。

Attribution Reporting API の出荷後に、別の標準において相互的な合意に達した場合、エコシステムとの協力を通じて、新しい API への慎重な移行をサポートします。その時点で、Attribution Reporting API の廃止を検討する可能性があります。そのため、開発者やその他の関係者が代替 API を評価し、移行パスをできるだけ簡単にするための十分な時間を確保できるように、Attribution Reporting API とその代替 API が Chrome で並行して提供される状態が長期間続く可能性があります。

## 貢献とフィードバックの共有

API の改善は継続的に行われており、開発者のフィードバックに応じてすでにいくつかの変更が加えられています（[1](https://github.com/WICG/attribution-reporting-api/issues/521)、[2](https://github.com/WICG/attribution-reporting-api/issues/522)、[3](https://github.com/WICG/attribution-reporting-api/issues/347)、[4](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/41)、[5](https://github.com/WICG/attribution-reporting-api/issues/590) など）。さらにフィードバックを歓迎し、今後もコミュニティと緊密に連携していきたいと考えています。

- **GitHub**: [Attribution Reporting API の提案](https://github.com/WICG/attribution-reporting-api)を読み、[質問の投稿やディスカッションの閲覧](https://github.com/WICG/attribution-reporting-api)が可能です。
- **開発者サポート**: [Privacy Sandbox Developer Support リポジトリ](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support)では、質問したり、ディスカッションに参加したりできます。
