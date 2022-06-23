---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting: experiment and participate'
date: 2022-03-31
updated: 2022-06-23
authors:
  - maudn
  - alexandrawhite
---

## Learn the essentials

Read [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting) and
check the most recent [updates](/docs/privacy-sandbox/attribution-reporting-updates/).

## Try the API

1. Try the [demo](https://goo.gle/attribution-reporting-demo).
2. Check the [API status](/docs/privacy-sandbox/attribution-reporting/#status) to learn about ways
   you can experiment with the API today.
3. Experiment with the API.
   * (Optional) If you ran an origin trial with this API in 2021, follow the [migration
     guide](https://docs.google.com/document/d/1NY7SScCYcPc9v5wtf_fVAikFxGQTAFvwldhExN1P03Y/edit#)
     to participate in the latest origin trial.
   * To experiment with the API, follow these guides:
     * [What you should know about the Attribution Reporting
       API](https://docs.google.com/document/d/1lvrKd5Vv7SYLMGZb0Fz7bpGNEl0LOx9i1waAHw2sUg8/)
     * [Handbook](https://docs.google.com/document/d/1BXchEk-UMgcr2fpjfXrQ3D8VhTR-COGYS1cwK_nyLfg/):
       Demo, detailed code examples and (local) debugging tips.
4. Experiment with [summary
   reports](/docs/privacy-sandbox/attribution-reporting/summary-reports).
   *  Adtechs can generate summary reports with the aggregation service. Learn
	how to set it up for
	[local testing](https://github.com/google/trusted-execution-aggregation-service/#set-up-local-testing)
	or [test in production with Amazon Web Services](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports) (AWS) :
        *  Create or have an [AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) available.
        *  [Register](/origintrials/#/view_trial/771241436187197441) for the
	      Privacy Sandbox Relevance and Measurement origin trial (OT).
        *  Complete the aggregation service
	      [onboarding form](https://forms.gle/EHoecersGKhpcLPNA). After you've
		submitted this form, we'll send a verification email and instructions.
   *  Refer to the [strategy and tips for summary reports]https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit?usp=sharing).

## Get support

To ask a question about your implementation, about the
[demo](https://goo.gle/attribution-reporting-demo), or about the documentation: 

* [Open a new issue on the privacy-sandbox-dev-support
  repository](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues/new/choose).
  Make sure to select the issue template **Attribution Reporting**.
* Or [join the Attribution Reporting mailing list for
  developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev) and ask
  there.

If you notice any unexpected behavior: 

* [View Chrome
  issues](https://bugs.chromium.org/p/chromium/issues/list?q=component%3AInternals%3EConversionMeasurement)
  reported for the API implementation.
* [Raise a new Chrome issue](https://crbug.com/new).

To ask more general questions on how to cover your use cases with the API, see [Discuss the
API](#discuss-the-api).

## Join the discussion

Everyone is welcome to join the discussion. In particular, if you're
experimenting with the API, your feedback is essential.

### Discuss the API

Like other Privacy Sandbox proposals, this API is documented and discussed publicly on GitHub. 
[Read this proposal](https://github.com/WICG/conversion-measurement-api/).

*  Join the conversation on [existing  issues](https://github.com/WICG/conversion-measurement-api/issues).
*  [Open a new Issue](https://github.com/WICG/conversion-measurement-api/issues/new) to ask
   a question, propose a feature, or discuss a use case. Unsure how to
   formulate your issue? [Review this example](https://github.com/WICG/conversion-measurement-api/issues/147).
*  [Join the bi-weekly meetings](https://github.com/WICG/conversion-measurement-api/issues/80) (every
   second week). Everyone is welcome to join. To participate, first you must
   [join the WICG](https://www.w3.org/community/wicg/). You can actively
   participate or just listen in!

### Discuss related topics

- Discuss industry use cases in the [Private Advertising Technology Community
  Group](https://github.com/patcg) or in the [Improving Web Advertising Business
  Group](https://www.w3.org/community/web-adv/participants).
- Discuss the [WebKit/Safari Measurement
  API](https://github.com/privacycg/private-click-measurement) in the [Privacy Community
  Group](https://www.w3.org/community/privacycg/).

## Get updates

*  To be notified of status changes in the API, join the [mailing list for developers](https://groups.google.com/u/1/a/chromium.org/g/attribution-reporting-api-dev).
*  To closely follow all ongoing discussions on the API, click the **Watch**
   button on the [GitHub proposal](https://github.com/WICG/conversion-measurement-api).
   This requires you to have or [create a GitHub account](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account).
*  To get overall updates on the Privacy Sandbox, subscribe to the RSS feed
   [Progress in the Privacy Sandbox](/tags/progress-in-the-privacy-sandbox/).
