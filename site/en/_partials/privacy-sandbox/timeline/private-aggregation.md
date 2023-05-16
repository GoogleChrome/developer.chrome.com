{% Aside 'update' %}
To reflect the [Protected Audience name change](https://privacysandbox.com/intl/en_us/news/protected-audience-api-our-new-name-for-fledge), the Private Aggregation API will contain the following breaking changes in the M115 Stable release:
1. The reporting endpoint is changed from `/.well-known/private-aggregation/report-fledge` to `/.well-known/private-aggregation/report-protected-audience`
2. The `api` property value of the aggregatable report payload is changed from `fledge` to `protected-audience`

You must update your code to ensure that the Private Aggregation API continues to work with the Protected Audience API. Users in an outdated Chrome instance will still send their report to the legacy endpoint, so you should ensure backward compatibility to collect all reports. 

The new endpoint and `api` property value will be available for testing on Monday, May 22nd in M115 Canary and Dev channels.
{% endAside %}

* The [Private Aggregation API](https://github.com/patcg-individual-drafts/private-aggregation-api/) has entered [public discussion](https://github.com/patcg-individual-drafts/private-aggregation-api/issues).
* The Private Aggregation API is available for testing in the [Privacy Sandbox Unified Origin Trial](/docs/privacy-sandbox/unified-origin-trial/).
  * The `sendHistogramReport()` function is available in 
    * Chrome Canary, Dev, and Beta M107+
    * Chrome Stable M112+
  * The `reportContributionForEvent()` function is available in
    * Chrome Canary and Dev M113+
  * Supplying a context ID via Shared Storage for report verification is available in
    * Chrome Canary, Dev, Beta, and Stable M114+
  * See the [Privacy Sandbox origin trial](/docs/privacy-sandbox/unified-origin-trial/#status) page to see the latest traffic allocation
* See the [Chrome platform status page](https://chromestatus.com/feature/5743412790689792) page to see the API’s current stage.
