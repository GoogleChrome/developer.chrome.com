---
layout: "layouts/doc-post.njk"
title: "View, edit, and delete cookies"
authors:
  - kaycebasques
date: 2015-04-13
#updated: YYYY-MM-DD
description: "Learn how to view, edit, and delete a page's HTTP cookies using Chrome DevTools."
---

[HTTP Cookies][1] are mainly used to manage user sessions, store user personalization preferences,
and track user behavior. They are also the cause of all of those annoying "this page uses cookies"
consent forms that you see across the web. This guide teaches you how to view, edit, and delete a
page's cookies with Chrome DevTools.

## Open the Cookies pane {: #open }

1.  [Open Chrome DevTools][2].
2.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane will
    probably open.

    {% Img src="image/admin/VdjVnm7S9Pbg4THMrlc0.png", alt="The Manifest pane", width="800", height="619" %}

    **Figure 1**. The Manifest pane

3.  Under **Storage** expand **Cookies**, then select an origin.

    {% Img src="image/admin/Yl2rWrOQvnBHkZwjUzOi.png", alt="The Cookies pane", width="800", height="445" %}

    **Figure 2**. The Cookies pane

## Fields {: #fields }

The **Cookies** table contains the following fields:

- **Name**. The cookie's name.
- **Value**. The cookie's value.
- **Domain**. The hosts that are allowed to receive the cookie.
- **Path**. The URL that must exist in the requested URL in order to send the `Cookie` header.
- **Expires / Max-Age**. The cookie's expiration date or maximum age.
  For [session cookies][6] this value is always `Session`.
- **Size**. The cookie's size, in bytes.
- **HTTP**. If true, this field indicates that the cookie should only be used over HTTP, and
  JavaScript modification is not allowed.
- **Secure**. If true, this field indicates that the cookie can only be sent to the server over a
  secure, HTTPS connection.
- **SameSite**. Contains `strict` or `lax` if the cookie is using the experimental `SameSite`
  attribute.
- **Priority**. Contains `low`, `medium` (default), or `high` if using depreciated [cookie
  Priority][10] attribute.

## Filter cookies {: #filter }

Use the **Filter** text box to filter cookies by **Name** or **Value**. Filtering by other fields is
not supported.

{% Img src="image/admin/uqHAFnsQgjLFqg5Fcu6S.png", alt="Filtering out any cookies that don't contain the text 'NID'", width="800", height="401" %}

**Figure 3**. Filtering out any cookies that don't contain the text `NID`

## Edit a cookie {: #edit }

The **Name**, **Value**, **Domain**, **Path**, and **Expires / Max-Age** fields are editable.
Double-click a field to edit it.

{% Img src="image/admin/uUZg7B7jgE41Vaz4pYxx.png", alt="Setting the name of a cookie to 'DEVTOOL!'", width="800", height="445" %}

**Figure 4**. Setting the name of a cookie to `DEVTOOLS!`

## Delete cookies {: #delete }

Select a cookie and then click **Delete Selected**
{% Img src="image/admin/frAwfK150YtdxHAOVccj.png", alt="Delete Selected", width="20", height="20" %} to delete that one cookie.

{% Img src="image/admin/SRIEc7haLwu49I4A94yg.png", alt="Deleting a selected cookie", width="800", height="401" %}

**Figure 5**. Deleting a selected cookie

Click **Clear All** {% Img src="image/admin/tQ74nCvbca93aX5voHXy.png", alt="Clear All", width="26", height="26" %} to delete all
cookies.

{% Img src="image/admin/YKnko46qX5nMMn3V26Sn.png", alt="Clearing all cookies", width="800", height="401" %}

**Figure 6**. Clearing all cookies

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[2]: /docs/devtools/open
[10]: https://bugs.chromium.org/p/chromium/issues/detail?id=232693
