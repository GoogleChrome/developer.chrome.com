---
layout: "layouts/doc-post.njk"
title: "Use your Google Analytics account with the Chrome Web Store"
seoTitle: "Using your Google Analytics account with the Chrome Web Store"
date: 2023-08-02
description: See analytics for your Chrome Web Store listing in addition to the metrics offered in the Developer Dashboard.
---

The Chrome Web Store offers integration with Google Analytics. This allows you to see analytics for
your Chrome Web Store listing in addition to the view offered in the Developer Dashboard.

To track usage of your extension, see [Using Google Analytics 4][extensions-ga4].

## Opt-in to Google Analytics {: #opt-in }

When viewing your item in the [Developer Dashboard][developer-dashboard], find the Additional
metrics section on the Store listing page. Click "Opt in to Google Analytics".

<figure>
  {% Img src="image/wVNVUJS8Z8O04i1tJKSdsp6nkRQ2/AVqhwuRqmI00g7AVkIDc.png", alt="Opt in UI for Google Analytics in Developer Dashboard", width="800", height="161" %}
  <figcaption>Opt in UI for Google Analytics in Developer Dashboard.</figcaption>
</figure>

Then, head to [https://analytics.google.com/][ga]. You should have access to a new property which
has been named with your extension ID.

## Limits {: #limits }

Some limits apply in your Google Analytics property. These include:

- Data retention is set to two months.
- Data de-identification is enabled, which limits access to non aggregated data to prevent tracking
an individual user. For example, data may be withheld if it does not meet system-defined
[thresholds][ga-thresholds].
- Additional users can only be added by syncing with a Group Publisher (see
[below](#group-publisher)).

## Page views {: #page-views }

Each time a user visits your extension listing, you will see a page view for the following URL: `/webstore/detail/ext/free/EXTENSION_ID/EXTENSION_NAME`

## Events {: #events }

The Chrome Web Store also sends a number of events to your property:

- [`page_view`][ga-pageview], [`session_start`][ga-sessionstart], [`first_visit`][ga-firstvisit] and
[`user_engagement`][ga-userengagement]
- `install`: A [custom event][ga-custom-events] sent when a user installs your extension. This is
only sent if a user accepts the permission prompt to complete the install.

## Monitoring ad performance {: #monitor-performance }

### Using UTM parameters {: #utm-params }

A common use case for developers is monitoring advertising performance. In these cases, it is useful
to know which ads led to views of your item’s store listing or which resulted in conversions.

You can use the `utm_source`, `utm_medium`, and `utm_campaign` parameters for this which are all
forwarded to Google Analytics. For example, an ad could direct users to the following URL:

[https://chrome.google.com/webstore/detail/action-api-demo/ljjhjaakmncibonnjpaoglbhcjeolhkk?utm_source=ad&utm_medium=cpc&utm_campaign=summer-ad-campaign](https://chrome.google.com/webstore/detail/action-api-demo/ljjhjaakmncibonnjpaoglbhcjeolhkk?utm_source=ad&utm_medium=cpc&utm_campaign=summer-ad-campaign)

You will see the following for the corresponding `page_view` and `install` events:

- Session source: `ad`
- Session medium: `cpc`
- Session campaign: `summer-ad-campaign`

If this is the first time the user has visited your extension listing the "first user
medium", "first user campaign", and "first user source" fields will also be set.

{% Aside %}
It can take between 24 and 48 hours for data to be finalized. Before then, you may see events
reported with a blank entry for these fields. This will be corrected as the data is finalized.
{% endAside %}

### Connecting to Google Ads or other services {: #connect-other-services }

It is not currently possible to link your Google Analytics property to other services like Google
Ads. We recommend periodically checking the data in Google Analytics to understand ad performance
and make decisions about how to optimize campaigns.

## Tracking conversions {: #track-conversions }

The install event generated when a user installs your extension can be marked as a conversion event.
Go to **Admin**, then **Conversions** and choose **New Conversion Event**. Enter "install" and click **Save**. The
event will now appear as a Conversion across your Google Analytics dashboard.

## Giving other accounts access to Google Analytics {: #grant-access }

### Using a Group Publisher {: #group-publisher }

To give other Google accounts access to your Google Analytics property, set up a
[Group Publisher][group-publisher]. Members of this group will be automatically granted access to
the Google Analytics property. Note that granting access to the linked group means those users can
act on behalf of the publisher account. This means they can access the Developer Dashboard and edit
and publish updates to your extensions. Consequently, access should be shared sparingly.

### With Looker Studio {: #looker-studio }

Alternatively, you can use [Looker Studio][looker-studio] to create a report based on your
Google Analytics data. This can be easily shared with any Google account.

Simple choose "Create" and choose the type of file you would like to create. Use the Google
Analytics connector and add your property under the "Chrome Web Store developer properties" account.

[developer-dashboard]: https://chrome.google.com/webstore/devconsole/
[ga]: https://analytics.google.com/
[ga-thresholds]: https://support.google.com/analytics/answer/9383630
[ga-pageview]: https://support.google.com/analytics/answer/9234069#page_view
[ga-sessionstart]: https://support.google.com/analytics/answer/9234069#session_start
[ga-firstvisit]: https://support.google.com/analytics/answer/9234069#first_visit
[ga-userengagement]: https://support.google.com/analytics/answer/9234069#user_engagement
[ga-custom-events]: https://support.google.com/analytics/answer/12229021
[extensions-ga4]: /docs/extensions/mv3/tut_analytics/
[group-publisher]: /docs/webstore/group-publishers/
[looker-studio]: https://lookerstudio.google.com/
