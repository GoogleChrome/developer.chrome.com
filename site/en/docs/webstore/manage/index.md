---
layout: "layouts/doc-post.njk"
title: "Manage your Chrome Web Store Item"
date: 2021-08-17
updated: 2023-03-27
description: >
  How to manage an extension or theme ("item") in the Chrome Web Store.
---

This page describes how to manage an extension or theme ("item") that was previously submitted to
the Chrome Web Store.

## About the lifecycle of an item in the Chrome Web Store

All Chrome Web Store items go through an automated [review process][cws-review]. In some instances a manual review
is required, especially when sensitive permissions are requested. For this reason review times
and/or approval times can take longer. Since a Chrome Web Store item goes through several stages,
it's important to keep track of your item's status. See the lifecycle diagram below:

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/yakIoAzWEchO8urosQLs.png", alt="Diagram of lifecycle of a Chrome Web Store item", width="800", height="177" %}

## Check your item's status

The status of your item appears in the [developer dashboard][dev-dashboard] next to each item. The
status can be Published, Pending, Rejected, or Taken Down.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bUbtISU01bab8WyWqonX.png", alt="Developer dashboard
status types", width="800", height="221" %}

To stay informed of your item's status, you can:

-  **Enable email notifications**. There are mandatory emails like take down or rejection
   notifications that are enabled by default. To receive notification when your item is published or
   staged, you can enable email notifications in the Account page.

    {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/FgPIwRl3QEbNowNV1zRn.png", alt="How to enable
    email notifications", width="658", height="219" %}

-  **Check your publisher email**. After enabling email notifications check your inbox often. To
   ensure that CWS emails don't get flagged as Spam, add **chromewebstore-noreply@google.com** to
   your contacts so that you receive all communications in a timely manner.

## Comply with Chrome Web Store policies

To ensure a positive experience for your users follow the [developer program
policies][dev-policies]. These policies may change, so check the [new announcements][whats-new] page
frequently.

If your extension has been determined to violate one or more terms or policies, you will receive an
email notification that contains the violation description and instructions on how to rectify. You
can also find this information in the Status tab of your item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/C4wpnEeMriI9YeDAMDIr.png", alt="The Chrome Web Store
Status Tab", width="700", height="276" %}

If you have been informed about a violation and you do not rectify your item will be taken down. See
[Violation enforcement][enforcement] for more details.

{% Aside %}

To request further clarification on the reasons for the take down or appeal the decision
contact [Chrome Web Store Developer Support][cws-support]. For more examples and instructions on how
you can remedy the problem check the [Troubleshooting guide][troubleshooting].

{% endAside %}

## Improve ratings and reply to user reviews

Ratings and reviews help people decide whether or not to try out an extension. Not only do they
leave a positive impression, but can also increase your ranking on the Chrome Web Store.

Users can leave comments in the **Reviews tab** of your store item; you can also post replies here
to those reviews. Each user can only rate an extension once, but they can update their rating or
review at any time. You can edit your reply at any time to provide the user with updates.

 {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/M09XcAQmPi1dS84EiVQo.png", alt="Store item
reviews tab",
width="600", height="201" %}

{% Aside %}

Users will not be notified when you reply to a review, but other users will see that
you are committed to solving issues as they arise.

{% endAside %}

Users are more likely to improve their review if you respond and address their concerns promptly. To
receive email notifications when users post reviews or update existing reviews, you can enable Item
Reviews in the **Account settings** of the Developer Dashboard.


   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8KGlMCKpiVVBRVqPAkXF.png", alt="Enable reviews notifications", width="600", height="212" %}

The **Rating tab** in the developer dashboard provides an overview of your extension’s ratings,
including the total number of reviews and ratings over time.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/HXJU5d5hEtHNNgj7aehv.png", alt="Dashboard Ratings tab", width="600", height="408" %}

{% Aside %}

You can give users a direct link to the review page of your
store item by adding `/reviews` at the end of your item’s URL:
`https://chrome.google.com/webstore/detail/{your-item-id}/reviews`

{% endAside %}

## Provide user support

To ensure the best user experience and build a great extension it's important to
collect, evaluate, and follow up on user feedback. You can manage your extension's user feedback in
two ways:

- By using the built in CWS User Support tab, or
- By using a dedicated support site.

Users will be able to communicate with you using the **Support** tab of your store item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/OBDYk7n5dBcaqs3z1HtL.png", alt="Store item Support tab", width="800", height="121" %}

### Using the User Support tab {: #user-support-tab }

Having a Support section on your extension's Chrome Web Store page allows users to easily report issues and suggest new features separately from leaving a review. To enable user feedback on your extension, the Visibility option (located in the Support tab area) must be switched on.   
The Support Visibility option switch is located in the Chrome Web Store Developer Dashboard, in the Support Tab section of Account Options.

{% Img src="image/6AZNJBRnkpQUWTKPzig99lQY8jT2/7K825tSAz4wbXJpjGYj2.png", alt="Visibility option", width="800", height="239" %}

In the **User Support** tab of the developer console you can view, respond and manage user feedback. Use the **Type**
dropdown to filter user input by
feature request, bug report or question. You can assign a status to each request, and can respond to each inquiry. Each ticket includes the extension
version, browser type and operating system to help you reproduce bugs
more efficiently.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/VvJFAHdrcMnUivTLm0kK.png", alt="Dashboard User
Support Tab", width="800", height="269" %}

{% Aside %}
Currently, this feature does not provide notifications:

- You will not be notified when a user posts a new request.
- The user will not be notified when you post a response.

{% endAside %}

### Using a dedicated support site {: #dedicated-support-site }

You can set up a dedicated support site for your users, so that the support link goes there instead of the default forum experience. This site can be anything you like, such as:

- A discussion group using Google Groups or some similar service.
- A form-handling site that lets users submit feedback or support tickets.
- A public information site with your product road map or other details.

Once you set up the site, go to the **Store Listing** tab of the developer console and add the link to the **Support URL**
field. Your support link will then take users to your dedicated site.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/7R8GYtBJjjRy1ih20dGd.png", alt="Store Listing Support
URL field", width="514", height="283" %}

{% Aside %}

Make sure you **turn off** the [User Feedback][support-tab] in the dashboard Account settings to disable the default support experience.

{% endAside %}

## Track your store listing performance

Understanding your Chrome Web Store listing metrics can help you evaluate how changes to your store
listing have affected conversion rates. For example, you can identify countries with a high number
of visitors so you can prioritize internationalization of your extension for those countries. You
can also export all the reports described below as CSV files.

### Impressions

The impressions metrics track the number of users that discover your extension while searching or
browsing the Chrome Web Store. An impression occurs when your extension is featured in any
collection or direct visits to your store item.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/Hu4dskyv3lIOuYB0qpv0.png", alt="daily impressions
statistics chart", width="800", height="299" %}

### Daily installs and uninstalls

You can track customer acquisition and churn using these reports:
- Track acquisition using the daily install report.
- Monitor user churn using the daily uninstalls analytics.

These numbers include new and returning
  users. You can configure this data by country, language, operating system, or time period using
  the “filter by” dropdown menus.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/bj6IRC7am3XgQwcfxpnr.png", alt="daily installs
statistics chart", width="800", height="586" %}

### Weekly users

You can monitor weekly user retention for different groups of users, categorized by country,
language, operating system, and item version.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/jOUcBDD8sBcTFCXrGq1s.png", alt="weekly users
statistics chart", width="800", height="342" %}

{% Aside %}

The **Weekly Users** stats only captures installations; it doesn't monitor whether users are active or not.

{% endAside %}

### Google Analytics

To track store item metrics, you can opt in to Google Analytics 4 by clicking **Opt in to Google Analytics** under **Additional metrics** on the **Store listing** tab. After opting in you will receive an email notification.

The Chrome Web Store manages the account for you and makes the data available in Google Analytics. Chrome Web Store grants you access only to non user-level data. For group publishers, all developers within the group, regardless of their role within the group, are granted access to data for items owned by the group.
{% Img src="image/sQ51XsLqKMgSQMCZjIN0B7hlBO02/etCDPbAFMIeOcKvAW4rN.png", alt="Where to opt in to Google Analytics", width="713", height="123" %}

[cws-review]: /docs/webstore/review-process/
[cws-support]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[dev-policies]: /docs/webstore/program-policies
[enforcement]: /docs/webstore/review-process/#enforcement
[support-tab]: #user-support-tab
[troubleshooting]: /docs/webstore/troubleshooting/
[whats-new]: /docs/extensions/whatsnew/
