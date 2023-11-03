---
layout: "layouts/doc-post.njk"
title: "Manage user feedback"
date: 2021-08-17
updated: 2023-03-27
description: >
  Follow-up on reviews and provide user support in the Chrome Web Store.
---

This guide covers how to manage user feedback on the Chrome Web Store. Learn how to reply to
reviews, check ratings, and provide user support. Whether you choose to use the built-in tools or
set up a dedicated support site, we'll show you the steps to improve your user engagement and handle
feedback efficiently.

## Reply to user reviews

Ratings and reviews help people decide whether or not to try out an extension. Not only do they
leave a positive impression, but can also increase your ranking on the Chrome Web Store.

Users can leave comments in the **Reviews** section of your store item, under the item's overview. You can also post replies here
to those reviews. Each user can only rate an extension once, but they can update their rating or
review at any time. You can also edit your reply at any time to provide the user with updates.

<figure>
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/UAwuiEvk4BJHFzyPkhcl.png", alt="User review section in the store listing", width="600", height="382", class='screenshot' %}
   <figcaption>
      User review section in the store listing
   </figcaption>
</figure>

{% Aside %}

Users will not be notified when you reply to a review, but other users will see that
you are committed to solving issues as they arise.

{% endAside %}

Users are more likely to improve their reviews if you respond and address their concerns promptly. To
receive email notifications when users post reviews or update existing reviews, you can enable Item
Reviews in the **Account settings** of the Developer Dashboard.

   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8KGlMCKpiVVBRVqPAkXF.png", alt="Enable reviews notifications", width="600", height="212" %}

{% Aside %}
It's important to know that you cannot remove user comments from your listing, even if you believe they are unfair. However, we encourage you to respond to user feedback in the comments to show that you are addressing their concerns. You may also report fake reviews via the [One Support Form][cws-support]. 
{% endAside %}

### The Rating tab

The **Rating tab** in the developer dashboard provides an overview of your extension’s ratings,
including the total number of reviews and ratings over time.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/HXJU5d5hEtHNNgj7aehv.png", alt="Dashboard Ratings tab", width="600", height="408" %}

{% Aside %}

You can give users a direct link to the review page of your
store item by adding `/reviews` at the end of your item’s URL:
`https://chrome.google.com/webstore/detail/{your-item-id}/reviews`

{% endAside %}

## Provide user support

To ensure the best user experience and build a great extension it's important to collect, evaluate,
and follow up on bug reports and feature requests. Users will be able to seek support by scrolling
down to the **Support** section of your store item, under the **Privacy** section. You can respond
to user feedback in two ways:

- By using the built-in [Support hub](#the-support-hub), or
- By directing users to a dedicated support site.

<figure>
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/rIOTquMOHdz8XgaOMruK.png", alt="Support section in the store listing", width="800", height="271", class='screenshot' %}
   <figcaption>
      Support section in the store listing
   </figcaption>
</figure>

### The support hub {: #user-support-tab }

The Chrome Web Store provides a support hub, where users can leave questions, suggestions, and issues they are facing. To use the support hub, you need to enable it first by going to the **Account** management page and turning on the **Visibility** under the **Item support** section.

<figure>
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/i9AT9btb0qcJBr1ngXM5.png", alt="Visibility toggle under Item support section", width="214", height="123" %}
   <figcaption>
      Visibility toggle under Item support section
   </figcaption>
</figure>

In the **User Support** tab of the developer dashboard you can view, respond and manage user feedback. Use the **Type**
dropdown to filter user input by
feature request, bug report or question. You can assign a status to each request, and can respond to each inquiry. Each ticket includes the extension
version, browser type and operating system to help you reproduce bugs
more efficiently.

<figure>
   {% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/JDKcMpp4YsssaiTK8god.png", alt="User Support tab in the developer dashboard item", width="800", height="309", class='screenshot' %}
   <figcaption>
      User Support tab in the developer dashboard item
   </figcaption>
</figure>

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

Make sure you **turn off** the [Item support][support-tab] Visibility in the dashboard Account settings to disable the support hub.

{% endAside %}

[cws-review]: /docs/webstore/review-process/
[cws-support]: https://support.google.com/chrome_webstore/contact/one_stop_support
[dev-dashboard]: https://chrome.google.com/webstore/devconsole
[dev-policies]: /docs/webstore/program-policies
[enforcement]: /docs/webstore/review-process/#enforcement
[support-tab]: #user-support-tab
[troubleshooting]: /docs/webstore/troubleshooting/
[whats-new]: /docs/extensions/whatsnew/
[analytics]: /docs/webstore/google-analytics/
