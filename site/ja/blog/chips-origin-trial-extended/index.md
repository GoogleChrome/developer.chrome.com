---
layout: layouts/blog-post.njk
title: Cookies Having Independent State（CHIPS）オリジントライルの延長
description: CHIPS は、トップレベルサイトごとにパーティション化されたサードパーティ Cookie の使用にオプトインする仕組みを導入するプライバシーサンドボックスの提案です。Chrome 100 で開始されたオリジントライアルは、2022 年 8 月 30 日に予定されている Chrome 105 のリリースまで利用できるようになりました。
subhead: オリジン トライアルは、2022 年 8 月 30 日に予定されている Chrome 105 のリリースまで利用できるようになりました。
date: 2022-05-26
authors:
  - mihajlija
tags:
  - privacy
  - origin-trials
  - cookies
---

[CHIPS](/docs/privacy-sandbox/chips/) は、新しい Cookie 属性の `Partitioned` を使用してサードパーティの Cookie をトップレベルサイトごとにパーティション化することにオプトインする仕組みを導入するプライバシーサンドボックスの提案です。

この実験は 2022 年 3 月 29 日に Chrome 100 で開始され、2022 年 6 月 14 日までの実施を予定していました。

開発者が機能をテストし、より多くのフィードバックを収集するための時間をさらに与えるために、この実験期間は、Chrome 105 がリリースされる 2022 年 8 月 30 日まで、[Chrome 104 の全期間に延長](https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY)されました。

バージョン 103 以降、Chrome には、HTTP Cookie の代替となる CHIPS オリジントライアルの設計が含まれます。これにより、オプトインの仕組みが有効になるため、大規模な組織での導入がさらに容易になります。

新しい設計では、オリジントライアルに登録するために `Accept-CH: Sec-CH-Partitioned-Cookies` ヘッダーを送信する必要がなくなります。サイトは、`Partitioned` 属性を持つ `Set-Cookie` ヘッダーを含むレスポンスを送信する際に、CHIPS オリジントライアル トークンを含む `Origin-Trial` のみを送信する必要があります。

オリジントライアルに登録して実験を開始するには、[CHIPS オリジントライアルの手順](/blog/chips-origin-trial/)をご覧ください。
