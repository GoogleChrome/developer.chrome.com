---
layout: "layouts/doc-post.njk"
title: "Build user trust"
date: 2021-08-17
updated: 2023-03-27
description: >
  How to provide support and build trust with users in the Chrome Web Store.
---

This page describes how to TBD follow ("item") that was previously submitted to
the Chrome Web Store.

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

Users are more likely to improve their reviews if you respond and address their concerns promptly. To
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


[cws-review]: /docs/webstore/review-process/
[cws-support]: https://support.google.com/chrome_webstore/contact/dev_account_transfer
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[dev-policies]: /docs/webstore/program-policies
[enforcement]: /docs/webstore/review-process/#enforcement
[support-tab]: #user-support-tab
[troubleshooting]: /docs/webstore/troubleshooting/
[whats-new]: /docs/extensions/whatsnew/
[analytics]: /docs/webstore/google-analytics/
