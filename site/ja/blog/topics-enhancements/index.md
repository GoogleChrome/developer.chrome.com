---
layout: layouts/blog-post.njk
title: Enhancements to the Topics API
description: |2

  Updates to the Topics taxonomy and filtering mechanisms, along with speed improvements and enhanced user controls.
subhead: |2

  Updates to the Topics taxonomy and filtering mechanisms, along with speed improvements and enhanced user controls.
date: '2023-06-15'
thumbnail: image/80mq7dk16vVEg8BBhsVe42n6zn82/s3iDQJUgLZV25YbtYxs1.png
alt: |2

  Topics API enhancements
authors:
  - leeronisrael
tags:
  - privacy
---

インタレストベース広告の提案である Topics API を 1 年以上前に[発表](https://blog.google/products/chrome/get-know-new-topics-api-privacy-sandbox/)しました。Topics は、ウェブサイトがブラウザのフィンガープリントといった隠されたトラッキング技術に頼ることなく、プライバシーを保護した方法で関連性の高い広告を配信できるように設計されています。Topics では、データの削減、データのノイズ除去、機密性の高いトピックの除外、オンデバイスでのデータ処理など、ユーザーのプライバシーを保護するためにいくつかの技術が利用されています。Topics はユーザーのプライバシーに関し、これらの変更を組み合わせることで、サード パーティ Cookie よりも大幅な[前進](https://arxiv.org/abs/2304.07210)です。

Topics を初めて提供した当時、明らかに初期の提案であったため、改善に役立つ意見をエコシステムに求めました。発表以来、提供された提案に注意深く耳を傾けてきました。本日、Topics API の最新の改善の一部を共有できることを嬉しく思っています。これらの変更により、ユーザーのプライバシーを損なうことなく、Topics がデジタル広告業界にとってさらに役立つものになると私たちは信じています。

## Taxonomy

Alongside the initial Topics API announcement, we proposed a taxonomy designed for testing. The taxonomy is the list of available topics that may be returned by the API. We repeatedly received [feedback](https://github.com/patcg-individual-drafts/topics/issues/3) that the testing taxonomy did not represent topics the advertising industry cared most about, so today we're announcing an [improved taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md).

When crafting this new taxonomy, we saw deep engagement from companies across the ecosystem, like Raptive (formerly CafeMedia) and Criteo. It removes categories we've heard are less useful, in favor of categories that better match advertiser interests, while maintaining our commitment to exclude potentially sensitive topics. We have added 280 commercially focused categories, like "Athletic Apparel", "Mattresses", and "Luxury Travel," while removing 160 categories including topics like "Civil Engineering" and "Equestrian" which don't add much commercial value for ad selection on most sites. The new taxonomy has 469 topics, compared to 349 for the previous version. We chose to limit the taxonomy's size, to protect against re-identification risk.

We expect the taxonomy to evolve over time, and for governance of the taxonomy to eventually transition to an external party representing stakeholders from across the industry. We encourage the ecosystem to review the [latest taxonomy](https://github.com/patcg-individual-drafts/topics/blob/main/taxonomy_v2.md) and provide feedback on the changes.

{% Aside %}

*We're delighted to be working with Google Chrome on improving the Topics API and making it even more relevant for advertisers and publishers. The new taxonomy should deliver substantial additional value to API callers.*

— Patrick McCann, SVP Research, Raptive (formerly CafeMedia)

{% endAside %}

## Per-caller filtering

One of many privacy-preserving features of Topics is the per-caller filtering requirement. This feature ensures that callers can only receive topics that they've observed the user visit in the past, rather than provide the topics to any caller regardless of their level of interaction with the user. For example, if a caller observes a user visit a site about news, but not shopping, that caller cannot learn that the user is interested in shopping.

Consider the topic "Boots," which is fully expressed as "/Shopping/Apparel/Footwear/Boots." "Shopping" and "Apparel" are ancestors of "Boots." Chrome has [updated](https://github.com/patcg-individual-drafts/topics/pull/143/files) the definition of "observation" to include all ancestors of a given topic. Previously, in order for a caller to observe "Shopping" or  "Apparel" a caller must have observed a user visit a page with that topic. With this change, if "Boots" is observed, then all ancestors (such as "Shopping" and "Apparel") of that topic are recorded as observed as well.

This change increases the likelihood sites will receive topics information, without impacting the API's privacy since the topic's ancestors were already known to the caller.

## User controls

Topics を使用すると、ユーザーは、サード パーティ Cookie などのトラッキングメカニズムと比較して、より直観的かつアクセスしやすい方法で広告をパーソナライズするためにクロスサイト データがどのように使用されるかを表示および制御できます。実際、Google が実施した[ユーザー調査](https://research.google/pubs/pub52194/)の参加者は、Topics のユーザーコントロールを導入すると、現在のサード パーティ Cookie コントロールと比較してプライバシー エクスペリエンスとコントロール感が大幅に向上したと報告しています。

Today we're announcing our plans to give users even greater control over which topics are associated with them. Specifically, users will be able to proactively block topics. This means users will be able to curate the set of available topics they are interested in by removing selected topics. This change, coming by early next year, will give users even more control over their privacy and make the Topics API even more user-friendly.

## Speed improvements

最初の Topics の提案では、開発者は Topics の JavaScript API を呼び出すクロスオリジン iframe を作成する必要がありました。この要件が開発者とユーザーに悪影響、つまり、遅延の導入によってデジタル広告オークションに課題をもたらし、潜在的にウェブページの速度を低下させ、オープン Web でのユーザー エクスペリエンスを低下させる可能性があるという[フィードバック](https://github.com/patcg-individual-drafts/topics/issues/7)を受け取りました。

昨年、Fetch および（一時的に）XHR 経由で開始されたリクエストにおけるヘッダー経由の Topics のサポートを[発表しました](https://github.com/patcg-individual-drafts/topics/pull/81)。そして最近、iframe のリクエストヘッダーのサポートを拡張する予定であると[発表しました](https://github.com/patcg-individual-drafts/topics/pull/147)。これらの変更により、Topics のパフォーマンスが向上し、開発者とユーザーに対する潜在的な悪影響が制限されます。

## What's next?

We are excited about these updates to the Topics API and believe that they not only will make it more effective for advertisers and keep ads relevant for people, but still preserve privacy. Per-caller filtering updates and speed improvements are already available in Chrome 114. Taxonomy updates will be available in Q3 2023. User controls updates will be available by early next year. We are committed to continuing to listen to ecosystem feedback as we build new, more private technologies for the web.
