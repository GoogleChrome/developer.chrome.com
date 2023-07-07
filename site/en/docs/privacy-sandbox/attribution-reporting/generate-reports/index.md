---
layout: 'layouts/doc-post.njk'
title: 'Generate summary reports'
subhead: >
  Hi.... 
description: >
  Hi....
date: 2022-08-09
updated: 2023-07-12
authors:
  - alexandrawhite
---

## Summary report generation

To generate summary reports, you'll use the
[Aggregation Service](https://github.com/google/trusted-execution-aggregation-service)
(operated by the ad tech) to process the aggregatable reports. The Aggregation
Service adds noise to protect user privacy and returns the final summary report.

<figure class="screenshot">
	{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/ZBF0uMoXBDww805XVctQ.png", alt="Aggregatable reports are collected, batched, and sent to the ad tech environtment.", width="800", height="464" %}
	<figcaption>
		<strong>Figure 2</strong>. This diagram represents the asynchronous flow
		of data from the collection endpoint, batching reports, through
		processing on the ad tech-owned Aggregation Service.<br /><br />
		After batching the collected aggregatable reports the batch is processed
		by the Aggregation Service. A
		<a href="https://github.com/WICG/attribution-reporting-api/blob/main/AGGREGATION_SERVICE_TEE.md#attestation-and-the-coordinator">coordinator</a>
		gives the decryption keys only to attested versions of the Aggregation
		Service. The Aggregation Service then decrypts the data, aggregates
		it, and add noise before returning the results as a summary report.
	</figcaption>
</figure>

### Batched aggregatable reports

Before the aggregatable reports are processed, they must be batched. A batch
consists of strategically grouped aggregatable reports. Your strategy will most
likely be reflective of a specific time period (such as daily or weekly). This
process can take place on the same server which acts as your reporting endpoint.

Batches should contain many reports to ensure the signal-to-noise ratio is high.

<figure class="screenshot">
  {% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/hjs2hU2e7N51a1CyNvsB.png", alt="Larger time periods lead to less noisy results.", width="614", height="317" %}
	<figcaption>
		<strong>Figure 3</strong>. Compare waiting 1 day and 1 week. In 1
		hour, you'll have a smaller summary value with likely more noisy results.
		In one day, you'll have a larger summary value so it's likely to be less
		noisy.
	</figcaption>
</figure>

Batch periods can change at any time to ensure you capture specific events
where you expect higher volume, such as for an annual sale. The batching period
can be changed without needing to change attribution sources or triggers.

### Aggregation Service

The [Aggregation Service](/docs/privacy-sandbox/aggregation-service/) is responsible for processing aggregatable reports to
generate a summary report. Aggregatable reports are encrypted and can only be
read by the Aggregation Service, which runs on a trusted execution environment
(TEE).

The Aggregation Service requests decryption keys from the [coordinator](/docs/privacy-sandbox/aggregation-service/#coordinator )
to decrypt and aggregate the data. Once decrypted and aggregated, the results
are noised to preserve privacy and returned as a summary report. 

Practitioners can generate aggregatable cleartext reports to
[test the Aggregation Service locally](https://github.com/google/trusted-execution-aggregation-service#set-up-local-testing).
Or, you can [test with encrypted reports on AWS with Nitro Enclaves](https://github.com/google/trusted-execution-aggregation-service/#test-on-aws-with-support-for-encrypted-reports).
