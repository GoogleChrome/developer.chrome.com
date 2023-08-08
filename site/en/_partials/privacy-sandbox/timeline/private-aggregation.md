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

* The [Private Aggregation API](https://github.com/patcg-individual-drafts/private-aggregation-api/) is now [moving to general availability](/blog/privacy-sandbox-launch/).
* New function names
  * The `contributeToHistogram()` function is available in Chrome Canary, Dev, Beta, and Stable M115+
  * The `contributeToHistogramOnEvent()` function is available in Chrome Canary, Dev, Beta, and Stable M115+
* Legacy function names 
  * The following function names will be deprecated in M115
* See the [Chrome platform status page](https://chromestatus.com/feature/5743412790689792) page to see the API’s current stage.
