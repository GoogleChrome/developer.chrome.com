---
layout: layouts/doc-post.njk
title: Chrome-facilitated testing
subhead: |2

  Test your sites with third-party cookies disabled.
description: |2

  Test your sites with third-party cookies disabled.
date: '2023-05-18'
authors:
  - alexandrawhite
  - rowan_m
---

広告関連 API の[一般提供](/blog/shipping-privacy-sandbox/)を準備する中で、サードパーティ Cookie のない世界でサイトがどのように動作するかを有意義にプレビューできるように、Chrome を利用したテストを提供する予定です。これにより、より効果的な API テストを実行できるようになり、エコシステム内でサードパーティ Cookie の段階的廃止への対応に確信をもてるようになります。

We have worked with the CMA to ensure these testing modes align with the testing framework (and timeline) for third parties laid out in its note on *[Quantitative testing of Google's Privacy Sandbox technologies](https://assets.publishing.service.gov.uk/media/6363b00de90e0705a8c3544d/CMA_Experiments_note.pdf)*. As a result, the CMA anticipates that the results from testing in these modes can be used in its assessment of the Privacy Sandbox.

We plan to have two modes of Chrome-facilitated testing:

- **Mode A**: Ad techs can receive control and experiment labels on a portion of traffic and use these to conduct testing and experiments.
- **Mode B**: Chrome globally disables third-party cookies for some portion of all Chrome users.

These details are not final, and we'll publish further implementation guidance as we progress in Q3 2023. The current proposals are as follows.

## Mode A: Opt-in testing {: #mode-a }

アドテックは、Chrome トラフィックの一部について実験ラベルを受け取ることができます。アドテックは、他のアドテックと連携して、たとえば、一貫した実験グループに対してサードパーティ Cookie を使用せずに [Protected Audience](/docs/privacy-sandbox/fledge/) オークションを実行することを選択できます。アドテックは、これらのラベルを独自の実験やテストに使用することもできます。

Chrome will not modify the state of third-party cookies for users in Mode A. Chrome only provides the labels, as to ensure that ad techs can experiment with consistent control and experiment groups. This means that a publisher's site could still receive third-party cookie data for the publisher's own usage, even if their ad tech partners are participating in the experiment.

We expect this to allow for meaningful experimentation, where all involved sites and services can coordinate to ensure third-party cookies are not used at any point within the process. We anticipate providing labels for up to 10% of Chrome browsers via a new request header and low-entropy client hint. We encourage anyone interested in testing to provide [feedback](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues) from the ecosystem on the method for accessing labels and the granularity of labels.

We plan to make the opt-in testing mode available starting in Q4 2023, and we'll continue this mode until third-party cookie deprecation.

## Mode B: 1% third-party cookie deprecation {: #mode-b }

Chrome will deprecate third-party cookies for up to 1% of browsers. There is no opt-in for this mode, as it will be applied globally. There is, of course, the possibility that some site features may be impacted if the site hasn't yet adopted an alternative solution, such as [CHIPS](/docs/privacy-sandbox/chips/) or [First-Party Sets](/docs/privacy-sandbox/first-party-sets/).

{% Aside %}

If you rely on third-party cookie data for site functionality, read our [guide to prepare for third-party cookie phase-out](/docs/privacy-sandbox/third-party-cookie-phase-out/) to understand if CHIPS or First-Party Sets can address your needs. We've launched a [public issue tracker](https://goo.gle/report-3pc-broken), where you can report site issues resulting from third-party cookie deprecation.

{% endAside %}

We're working on mitigations to detect, address, and proactively alert site owners of issues that impact user experience during this phase.

さらに、プライバシーサンドボックスの広告関連 API が無効になっているモード B 内のトラフィックのごく一部を提供する予定です。First-Party Sets、CHIPS、FedCM などの他の API は無効になりません。この組み合わせは、サードパーティ Cookie を使用しないパフォーマンスのベースラインを確立するのに役立つと予想されており、このサブセットのテストに充てるトラフィックの適切な部分に関する[フィードバック](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/labels/chrome-testing)を求めています。

We plan to deprecate 1% of third party cookies in Q1 2024, and we'll work closely with the CMA before taking further steps to expand deprecation.

## Engage and share feedback

Feedback from a diverse set of stakeholders across the web ecosystem is critical to the Privacy Sandbox initiative. The dedicated [feedback section](/docs/privacy-sandbox/feedback/) provides an overview of the existing public channels, where you can follow or contribute to discussion, along with a feedback form to ensure you can always reach the Chrome team directly.

If you're a developer, you can ask questions and join discussions in the [Privacy Sandbox Developer Support repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) on GitHub.
