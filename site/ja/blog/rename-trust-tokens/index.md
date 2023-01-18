---
layout: layouts/blog-post.njk
title: トラストトークンの名前がプライベートステートトークンに変更
subhead: >
  Trust Token API は、プライバシーとユーティリティの利点をより適切に表現する Private State Token API に名前が変更されます。
description: >
  Trust Token API は、プライバシーとユーティリティの利点をより適切に表現する Private State Token API に名前が変更されます。
authors:
  - anusmitaray
date: 2022-10-19
---

{% Aside %} プライベートステートトークン（旧トラストトークン）の[オリジントライアル](/origintrials/#/view_trial/2479231594867458049)は終了しました。

API ステータスの更新は、このページと [Chrome Platform Status](https://www.chromestatus.com/feature/5078049450098688) で提供されます。 {% endAside %}

## 名前の変更

トラストトークンとして表現されているものは、[プライベートステートトークン](/docs/privacy-sandbox/trust-tokens/)と呼ばれるようになりました。

プライベートステートトークンを使用すると、ユーザーの真正性に対する信頼を、あるコンテキストから別のコンテキストに伝達できるようになり、サイトが詐欺に対抗し、パッシブトラッキングなしでボットと実際の人間を区別できるようになります。

## 名前変更の理由

「Trust Token API」という名前は元々、API を使用することで、ウェブサイトがユーザーに対する信頼のレベルを示すトークンを発行できることを表現するために選択されました。発行されたトークンは、他のウェブサイトでのアクティビティと引き換えることができます。それから時が経ち、API がブラウザによって決定される信頼のシグナルを提供するという誤解を招くような命名だというフィードバックを受け取りました。「トラスト」という言葉はサイトごとに異なる意味を持ち、トークンを発行するウェブサイトが信頼のシグナルを決定します。

プライバシーとユーティリティの利点をよりよく表現するために、Trust Token API の名前を Private State Token API に変更します。

この API は、組織がプライバシーを保護する方法で、あるコンテキスト（トークンの発行）から別のコンテキスト（トークンの償還）に情報を伝達できるようにするための少量のストレージを提供します。トークンは、暗号[ブラインド署名](https://en.wikipedia.org/wiki/Blind_signature)などの技術を使用してユーザーの ID を保護できるように設計されています。

## 貢献とフィードバックの共有

- **デモ**: トラストトークンのオリジントライアルは終了したため、[デモ](https://trust-token-demo.glitch.me/)は機能しませんが、トラストトークンの発行と引き換えのコードを引き続き表示できます。
- **GitHub**: [提案](https://github.com/WICG/trust-token-api)を読み、[質問を投稿したり、ディスカッションを閲覧](https://github.com/WICG/trust-token-api/issues)したりできます。
- **W3C**: [Antifraud Community Group](https://www.w3.org/community/antifraud/) で業界のユースケースについて議論できます。
