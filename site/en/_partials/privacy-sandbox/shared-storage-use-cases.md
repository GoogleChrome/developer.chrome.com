## Other use cases

Explore other Shared Storage use cases and code samples:

### Generate reports with Private Aggregation

* [**Unique reach measurement**](/docs/privacy-sandbox/shared-storage/unique-reach): 
  Many content producers and advertisers often want to know how many unique
  people saw their content. You can use Shared Storage to report on the first
  time a user saw your ad, embedded video, publication, and prevent duplicative
  counting of that same user on a different site, giving you an aggregated
  noisy report of your approximate unique reach. 
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

### URL selection

* [**Frequency control**](/docs/privacy-sandbox/shared-storage/frequency-control):
  run a worklet script to select a URL from a provided list, based on the
  stored data, and then render that URL in a fenced frame. This has many
  possible uses, such as selecting new content when a frequency cap is reached.
* [**A/B testing**](/docs/privacy-sandbox/shared-storage/ab-testing):
  You can assign a user to an experiment group, then store that group in Shared Storage to be accessed cross-site. 
* [**Creative rotation**](/docs/privacy-sandbox/shared-storage/creative-rotation):
  You can store the creative rotation mode, and other metadata, to rotate the
  creatives across different sites. 
* [**Known customer for payment provider**](/docs/privacy-sandbox/shared-storage/known-customer):
  You can store whether the user has registered on your site into shared
  storage, then render a different element based on that stored status.

These are only some of the possible use cases for Shared Storage. We'll
continue to add examples as we
[receive feedback](/docs/privacy-sandbox/shared-storage/#engage-and-share-feedback)
and discover new use cases.
