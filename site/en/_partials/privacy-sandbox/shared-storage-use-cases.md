## Use cases

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.

### Content selection

Select and display different content on different websites in
[fenced frames](/docs/privacy-sandbox/fenced-frame/) based on information
collected in Shared Storage. The output gate for these use cases is URL selection.

* [**Creative rotation**](/docs/privacy-sandbox/shared-storage/creative-rotation):
  Store data, such as creative ID, view counts, and user interaction, to determine which creative users' see across different sites.
* [**A/B testing**](/docs/privacy-sandbox/shared-storage/ab-testing):
  You can assign a user to an experiment group, then store that group in Shared Storage to be accessed cross-site. 
* [**Custom user experiences**](/docs/privacy-sandbox/shared-storage/known-customer):
  Share custom content and calls-to-action based on a user’s registration status or other user states

### Generate summary reports

Collect information with Shared Storage and generated a noisy, aggregated summary report. The output gate for these use cases is the
[Private Aggregation API](/docs/privacy-sandbox/private-aggregation/).

* [**Unique reach measurement**](/docs/privacy-sandbox/shared-storage/unique-reach): 
  Many content producers and advertisers want to know how many unique
  people saw their content. Use Shared Storage to record the first time a user
  saw your ad, embedded video, or publication, and prevent duplicative
  counting of that same user on different sites. You can then use the Private Aggregation API to output a summary report for your reach.
* [**Demographics measurement**](/docs/privacy-sandbox/shared-storage/user-demographics):
  Content producers often want to understand the demographics of their
  audience. You can use Shared Storage to record user demographic data in a
  context where you have it, such as your first-party site, and use aggregated
  reporting to report on it across many other sites, such as embedded content.
* [**K+ frequency measurement**](/docs/privacy-sandbox/shared-storage/k-freq-reach):
  Sometimes described as "effective frequency," there is often a minimum number
  views before a user will recognize or recall certain content (often in the
  context of advertisement views). You can use Shared Storage to build reports
  of unique users that have seen a piece of content at least K number of times.
