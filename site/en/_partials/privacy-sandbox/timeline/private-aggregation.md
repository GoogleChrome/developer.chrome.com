{% Aside 'update' %}
The Private Aggregation API will contain the following breaking changes in the M115 Beta and Stable releases:
1. The `sendHistogramReport()` function is renamed to `contributeToHistogram()`.
2. The `reportContributionForEvent()` function is renamed to `contributeToHistogramOnEvent()`.
3. `enableDebugMode()`’s `debug_key` parameter is renamed to `debugKey`.
4. The reporting endpoint is renamed from `/.well-known/private-aggregation/report-fledge` to `/.well-known/private-aggregation/report-protected-audience`.
5. The `api` property value of the aggregatable report payload is renamed from `fledge` to `protected-audience`. 

You must update your code to ensure that the Private Aggregation API continues to work with the Protected Audience API. Users in an outdated Chrome instance will still send their report to the legacy endpoint, so you should ensure backward compatibility to collect all reports. We recommend using feature detection with `if ('contributeToHistogram' in privateAggregation))`.

These changes will be possible for testing from the week of Monday, May 22nd in Canary and Dev channels. 
{% endAside %}

* The [Private Aggregation API](https://github.com/patcg-individual-drafts/private-aggregation-api/) has entered [public discussion](https://github.com/patcg-individual-drafts/private-aggregation-api/issues).
* The Private Aggregation API is available for testing in the [Privacy Sandbox Unified Origin Trial](/docs/privacy-sandbox/unified-origin-trial/).
  * New function names
    * The `contributeToHistogram()` function is available in Chrome Canary, Dev, Beta, and Stable M115+
    * The `contributeToHistogramOnEvent()` function is available in Chrome Canary, Dev, Beta, and Stable M115+
  * Legacy function names 
    * The following function names will be deprecated in M115
    * The `sendHistogramReport()` function is available in 
      * Chrome Canary, Dev, and Beta M107+
      * Chrome Stable M112+
    * The `reportContributionForEvent()` function is available in
      * Chrome Canary and Dev M113+
  * Supplying a context ID via Shared Storage for report verification is available in
    * Chrome Canary, Dev, Beta, and Stable M114+
  * See the [Privacy Sandbox origin trial](/docs/privacy-sandbox/unified-origin-trial/#status) page to see the latest traffic allocation
* See the [Chrome platform status page](https://chromestatus.com/feature/5743412790689792) page to see the API’s current stage.
