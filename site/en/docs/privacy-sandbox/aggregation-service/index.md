---
layout: 'layouts/doc-post.njk'
title: 'Aggregation service'
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

Deploy and manage an aggregation service to process aggregatable
reports from the
[Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting/) or
the [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/) to
create a [summary report](/docs/privacy-sandbox/summary-report/).

{% Aside %}
At this time, the aggregation service and its local testing tool only process
aggregatable reports for the Attribution Reporting API. This will be updated to
support the Private Aggregation API soon.
{% endAside %}

## Implementation status

* The [Aggregation Service proposal](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md)
  has entered public discussion.
* The aggregation service can be tested for the
  [Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/).
  It is still in development for use with the
  [Private Aggregation API](/docs/privacy-sandbox/private-aggregation/).

The proposal outlines
[key terms](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#key-terms),
useful for understanding the aggregation service.

## Secure data processing

The aggregation service decrypts and combines the collected data from the aggregatable reports, [adds noise](#noise-scale), and returns the final summary report. This service runs in a trusted execution environment (TEE), which is deployed on a cloud service that supports necessary security measures to protect this data.

{% Aside %}
A [Trusted Execution Environment](https://en.wikipedia.org/wiki/Trusted_execution_environment)
is a special configuration of computer hardware and software that allows
external parties to verify the exact versions of software running on the
computer. TEEs allow external parties to verify that the software does exactly
what the software manufacturer claims it does—nothing more or less.
{% endAside %}

The TEE's code is the only place in the aggregation service which has access to
raw reports&mdash;this code will be auditable by security researchers, privacy
advocates, and adtechs. To confirm that the TEE is running the exact approved
software and that data remains secured, a coordinator performs attestation.

<figure>
{% Img
  src="image/hVf1flv5Jdag8OQKYqOcJgWUvtz1/b1avI43zUaKT2UAdGOo1.png",
  alt="Aggregatable reports are collected, batched, and send to the TEE to be transformed into a final summary report.",
  width="800", height="457"
%}
<figcaption>
  <p>Aggregatable reports are collected, batched, and send to the aggregation service, running on a TEE. The aggregation service environment is owned and operated by the same party collecting the data.</p>
</figure>

### Coordinator attestation of the TEE {: #coordinator }

The _coordinator_ is an entity responsible for key management and aggregatable
report accounting.

A coordinator has several responsibilities: 

* Maintain a list of authorized binary images. These images are
  [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
  of the aggregation service software builds, which Google will periodically
  release. This will be reproducible so that any party can verify the images
  are identical to the aggregation service builds.
* Operate a key management system. Encryption keys are required for the Chrome
  on a user's device to encrypt aggregatable reports. Decryption keys are
  necessary for proving the aggregation service code matches the binary images.
* Track the aggregatable reports to prevent reuse in aggregation for summary
  reports, as reuse may reveal personal identifying information (PII).

## Noise and scaling {: #noise-scale}

To protect user privacy, the aggregation service applies an
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

## Engage with this API

We want to engage in conversations with you to ensure we build an API that works for everyone. Like other Privacy Sandbox proposals, the aggregation service is [documented and discussed publicly](https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md).

* You can [experiment with the Attribution Reporting API](/docs/privacy-sandbox/attribution-reporting-experiment/).
* The Private Aggregation API is available for testing in Chrome M107+ Canary and Dev, but the aggregation service is still in development.
