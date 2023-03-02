---
layout: 'layouts/doc-post.njk'
title: 'Aggregation Service'
subhead: >
  Deploy and manage this service to produce summary reports for the
  Attribution Reporting API or the Private Aggregation API.
description: >
  Deploy and manage this service to produce summary reports for the
  Attribution Reporting API or the Private Aggregation API.
date: 2022-11-29
authors:
  - alexandrawhite
---

Deploy and manage an Aggregation Service to process aggregatable
reports from the
[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) or
the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) to
create a [summary report](/docs/privacy-sandbox/summary-report/).

## Implementation status

* The [Aggregation Service proposal](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md)
  is available for discussion.
* The [Aggregation Service can be tested](#test) with the
  Attribution Reporting API and the Private Aggegration API for FLEDGE and Shared Storage.

The proposal outlines
[key terms](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#key-terms),
useful for understanding the Aggregation Service.

## Secure data processing

The Aggregation Service decrypts and combines the collected data from the aggregatable reports, [adds noise](#noise-scale), and returns the final summary report. This service runs in a trusted execution environment (TEE), which is deployed on a cloud service that supports necessary security measures to protect this data.

{% Aside %}
A [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment)
is a special configuration of computer hardware and software that allows
external parties to verify the exact versions of software running on the
computer. TEEs allow external parties to verify that the software does exactly
what the software manufacturer claims it does—nothing more or less.
{% endAside %}

The TEE's code is the only place in the Aggregation Service which has access to
raw reports&mdash;this code will be auditable by security researchers, privacy
advocates, and ad techs. To confirm that the TEE is running the exact approved
software and that data remains secured, a coordinator performs attestation.

<figure>
{% Img
  src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png",
  alt="Aggregatable reports are collected, batched, and send to the TEE to be transformed into a final summary report.",
  width="800", height="457"
%}
<figcaption>
  <p>Aggregatable reports are collected, batched, and send to the Aggregation Service, running on a TEE. The Aggregation Service environment is owned and operated by the same party collecting the data.</p>
</figure>

### Coordinator attestation of the TEE {: #coordinator }

The _coordinator_ is an entity responsible for key management and aggregatable
report accounting.

A coordinator has several responsibilities: 

* Maintain a list of authorized binary images. These images are
  [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
  of the Aggregation Service software builds, which Google will periodically
  release. This will be reproducible so that any party can verify the images
  are identical to the Aggregation Service builds.
* Operate a key management system. Encryption keys are required for the Chrome
  on a user's device to encrypt aggregatable reports. Decryption keys are
  necessary for proving the Aggregation Service code matches the binary images.
* Track the aggregatable reports to prevent reuse in aggregation for summary
  reports, as reuse may reveal personal identifying information (PII).

{% Aside %}
If you are testing the Aggregation Service, see the [Coordinator Service
Additional Terms of Service](/docs/privacy-sandbox/aggregation-service/tos/).
{% endAside %}

## Noise and scaling {: #noise-scale}

To protect user privacy, the Aggregation Service applies an
[additive noise mechanism](https://en.wikipedia.org/wiki/Additive_noise_mechanisms)
to the raw data from aggregatable reports. This means that a certain amount of
statistical noise is added to each aggregate value before its release in a
summary report. 

While you are not in direct control of the ways noise is added, you can
influence the impact of noise on its measurement data.

<figure>
{% Img
  src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/qJ182Vhszwsgf1PVLEpT.png",
  alt="Noise is constant, regardless of the aggregated value.",
  width="600", height="462"
%}
</figure>

The noise value is randomly drawn from a
[Laplace probability distribution](https://en.wikipedia.org/wiki/Laplace_distribution),
and the distribution is the same regardless of the amount of data collected in
aggregatable reports. The more data you collect, the less impact the noise will
have on the summary report results. You can multiply the aggregatable report
data by a scaling factor to reduce the impact of noise.

To understand how noise is added, your controls, and the impact on your
reports, refer to the
[Contribution section of the Attribution Reporting strategy guide](https://docs.google.com/document/d/1bU0a_njpDcRd9vDR0AJjwJjrf3Or8vAzyfuK8JZDEfo/edit#heading=h.683u7t2q1xk2). 

## Generate summary reports

Summary report generation is dependent on your API usage. Learn more about
generating summary reports for the
[Private Aggregation API](/docs/privacy-sandbox/summary-reports#private-aggregation) 
and the [Attribution Reporting API](/docs/privacy-sandbox/summary-reports#attribution-reporting).

## Test the Aggregation Service {: #test}

We recommend reading the corresponding experiment and participate guide for the API you're testing:

* [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/)
* [Private Aggregation API](/docs/privacy-sandbox/private-aggregation-experiment/)

### Local testing

We've created a local testing tool to process aggregatable reports for Attribution Reporting and the Private Aggregation API. [Read the instructions](https://github.com/privacysandbox/aggregation-service/blob/main/README.md).

To use this tool, install a Java Runtime Environment.

### Test on AWS

To test the Aggregation Service on AWS, [register for the origin trial](/origintrials/#/view_trial/771241436187197441) and complete the
[onboarding form](https://forms.gle/EHoecersGKhpcLPNA).
Once submitted, we'll contact you to verify your information and send the remaining instructions.

To test on AWS, install [Terraform](https://www.terraform.io/) and the latest
[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

[Read the instructions](https://github.com/privacysandbox/aggregation-service/blob/main/README.md#test-on-aws-with-support-for-encrypted-reports).

## Engage and share feedback

The Aggregation Service is a key piece of the Privacy Sandbox measurement proposals. Like other Privacy Sandbox proposals, this is documented and discussed publicly on GitHub.
  
* **Github**: Read the [proposal](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md), [raise questions and participate in the discussion](https://github.com/WICG/attribution-reporting-api/issues). Also take a look at the [Aggregation Service implementation](https://github.com/privacysandbox/aggregation-service) and provide [feedback on the implementation](https://github.com/privacysandbox/aggregation-service/issues).
* **Developer support**: Ask questions and join discussions on the [Privacy Sandbox Developer Support repo](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support).
