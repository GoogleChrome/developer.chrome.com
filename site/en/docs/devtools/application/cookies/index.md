---
layout: "layouts/doc-post.njk"
title: "View, add, edit, and delete cookies"
authors:
  - kaycebasques
  - sofiayem
date: 2015-04-13
updated: 2023-03-16
description: "Learn how to view, add, edit, and delete a page's HTTP cookies using Chrome DevTools."
tags:
  - cookies
---

[HTTP Cookies][1] are mainly used to manage user sessions, store user personalization preferences,
and track user behavior. They are also the cause of all of those annoying "this page uses cookies"
consent forms that you see across the web. This guide teaches you how to view, add, edit, and delete a
page's cookies with Chrome DevTools.

## Open the Cookies pane {: #open }

1.  [Open Chrome DevTools][2].
1.  Open **Application** > **Storage** > **Cookies** and select an origin.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3Z0YXsThDJtTmS8Z3z33.png", alt="The Cookies pane.", width="800", height="411" %}

## Fields {: #fields }

The **Cookies** table contains the following fields:

- **Name**. The cookie's name.
- **Value**. The cookie's value.
- **Domain**. The hosts that are allowed to receive the cookie.
- **Path**. The URL that must exist in the requested URL in order to send the `Cookie` header.
- **Expires / Max-Age**. The cookie's expiration date or maximum age.
  For [session cookies][6] this value is always `Session`.
- **Size**. The cookie's size, in bytes.
- **HttpOnly**. If true, this field indicates that the cookie should only be used over HTTP, and
  JavaScript modification is not allowed.
- **Secure**. If true, this field indicates that the cookie can only be sent to the server over a
  secure, HTTPS connection.
- **SameSite**. Contains `Strict` or `Lax` if the cookie is using the experimental `SameSite`
  attribute.
- **Partition Key**. For [cookies with independent partition state](/docs/privacy-sandbox/chips/), the partition key is the site of the top-level URL the browser was visiting at the start of the request to the endpoint that set the cookie.
- **Priority**. Contains `Low`, `Medium` (default), or `High` if using deprecated [cookie
  Priority][10] attribute.

To view a cookie's value, select it in the table. To see the value without percent-encoding, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Show URL-decoded**.

## Filter cookies {: #filter }

Use the **Filter** text box to filter cookies by **Name** or **Value**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/GjLhR30VavG3SLYLAesv.png", alt="Filtering out any cookies that don't contain 'id'.", width="800", height="380" %}

Filtering by other fields is not supported. Filter is case-insensitive.

## Add a cookie {: #add-cookie }

To add an arbitrary cookie:

1. Double-click an empty row in the table.
1. Enter a **Name** and **Value** and press <kbd>Enter</kbd>.

{% Video src="video/NJdAV9UgKuN8AhoaPBquL7giZQo1/Q9Gj9s3fU8yJU8U8UfBK.mp4", autoplay="false", muted="true", loop="false", controls="true", class="screenshot" %}

DevTools populates other required fields automatically. You can edit them as described next.

## Edit a cookie {: #edit }

All the fields are editable except **Size** that updates automatically.

Double-click a field to edit it.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/YqXUSqxkehuVCTNeSp7i.png", alt="Setting the name of a cookie to 'DEVTOOLS!'", width="800", height="424" %}

DevTools highlights cookies with invalid [field](#fields) values in red.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/UGLmEZHAzssqmpk28IgO.png", alt="A cookie with an invalid in Partition Key value.", width="800", height="424" %}

To filter out valid cookies, check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Only show cookies with an issue** in the top action bar.

## Delete cookies {: #delete }

To delete a cookie, select it and click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/w9Vbnqf9cVz7YeqMkAi0.svg", alt="Delete selected.", width="24", height="24" %} **Delete selected** in the top action bar.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/G1jzKCU0oMOxxB03i1q9.png", alt="Deleting a selected cookie.", width="800", height="424" %}

Click {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MadqZsIZpo1sj3qQ3GsZ.svg", alt="Clear.", width="24", height="24" %} **Clear all** to delete all cookies.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/fptz4uhHm8YevOpm4SGK.png", alt="Clearing all cookies.", width="800", height="424" %}

[1]: https://developer.mozilla.org/docs/Web/HTTP/Cookies
[2]: /docs/devtools/open
[3]: /docs/privacy-sandbox/first-party-sets/
[6]: https://developer.mozilla.org/docs/Web/HTTP/Cookies#define_the_lifetime_of_a_cookie
[10]: https://bugs.chromium.org/p/chromium/issues/detail?id=232693
