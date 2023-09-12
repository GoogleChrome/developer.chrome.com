---
layout: 'layouts/doc-post.njk'
title: 'Attribution Reporting: experiment and participate'
date: 2022-03-31
updated: 2022-12-15
authors:
  - maudn
  - alexandrawhite
---

Read [Attribution Reporting](/docs/privacy-sandbox/attribution-reporting/) to
see the use cases and key concepts for this API and check the most recent [updates](/docs/privacy-sandbox/attribution-reporting-updates/).

Learn why we plan to [ship the Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/chrome-shipping)
in the first half of 2023.

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
4. Experiment with [summary
   reports](/docs/privacy-sandbox/summary-reports).
   *  Ad techs can generate summary reports with the [aggregation service](/docs/privacy-sandbox/aggregation-service). Set up
      [local testing](https://github.com/google/trusted-execution-aggregation-service/#set-up-local-testing)
      or [test in production with Amazon Web Services](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports) (AWS) :
        *  Create or have an [AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) available.
        *  [Register](/origintrials/#/view_trial/771241436187197441) for the
	      Privacy Sandbox Relevance and Measurement origin trial (OT).
        *  Complete the aggregation service
	      [onboarding form](https://forms.gle/EHoecersGKhpcLPNA). After you've
		submitted this form, we'll send a verification email and instructions.
   *  Refer to the [strategy and tips for summary reports](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit?usp=sharing).

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

{% Partial 'privacy-sandbox/ar-join-discussion-long.njk' %}

{% Partial 'privacy-sandbox/ar-get-updates.njk' %}
