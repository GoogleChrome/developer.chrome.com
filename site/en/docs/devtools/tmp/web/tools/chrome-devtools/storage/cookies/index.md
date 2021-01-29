---
layout: "layouts/doc-post.njk"
title: "View, Edit, And Delete Cookies With Chrome DevTools"
authors:
  - kaycebasques
date: 2015-04-13
updated: 2020-07-10
description: "Learn how to view, edit, and delete a page&#39;s HTTP cookies using Chrome DevTools."
---

[HTTP Cookies][1] are mainly used to manage user sessions, store user personalization preferences,
and track user behavior. They are also the cause of all of those annoying "this page uses cookies"
consent forms that you see across the web. This guide teaches you how to view, edit, and delete a
page's cookies with Chrome DevTools.

## Open the Cookies pane {: #open }

1.  [Open Chrome DevTools][2].
2.  Click the **Application** tab to open the **Application** panel. The **Manifest** pane will
    probably open.

    ![The Manifest pane](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane

3.  Under **Storage** expand **Cookies**, then select an origin.

    ![The Cookies pane](/web/tools/chrome-devtools/storage/imgs/cookies.png)

    **Figure 2**. The Cookies pane

## Fields {: #fields }

The **Cookies** table contains the following fields:

- **Name**. The cookie's name.
- **Value**. The cookie's value.
- **Domain**. The hosts that are allowed to receive the cookie. See [Scope of cookies][3].
- **Path**. The URL that must exist in the requested URL in order to send the `Cookie` header. See
  [Scope of cookies][4].
- **Expires / Max-Age**. The cookie's expiration date or maximum age. See [Permanent cookies][5].
  For [session cookies][6] this value is always `Session`.
- **Size**. The cookie's size, in bytes.
- **HTTP**. If true, this field indicates that the cookie should only be used over HTTP, and
  JavaScript modification is not allowed. See [HttpOnly cookies][7].
- **Secure**. If true, this field indicates that the cookie can only be sent to the server over a
  secure, HTTPS connection. See [Secure cookies][8].
- **SameSite**. Contains `strict` or `lax` if the cookie is using the experimental [SameSite][9]
  attribute.
- **Priority**. Contains `low`, `medium` (default), or `high` if using depreciated [cookie
  Priority][10] attribute.

## Filter cookies {: #filter }

Use the **Filter** text box to filter cookies by **Name** or **Value**. Filtering by other fields is
not supported.

![Filtering out any cookies that don't contain the text 'NID'](/web/tools/chrome-devtools/storage/imgs/filtercookies.png)

**Figure 3**. Filtering out any cookies that don't contain the text `NID`

## Edit a cookie {: #edit }

The **Name**, **Value**, **Domain**, **Path**, and **Expires / Max-Age** fields are editable.
Double-click a field to edit it.

![Setting the name of a cookie to 'DEVTOOL!'](/web/tools/chrome-devtools/storage/imgs/editcookie.png)

**Figure 4**. Setting the name of a cookie to `DEVTOOLS!`

## Delete cookies {: #delete }

Select a cookie and then click **Delete Selected**
![Delete Selected](/web/tools/chrome-devtools/images/shared/delete.png) to delete that one cookie.

![Deleting a selected cookie](/web/tools/chrome-devtools/storage/imgs/deletecookie.png)

**Figure 5**. Deleting a selected cookie

Click **Clear All** ![Clear All](/web/tools/chrome-devtools/images/shared/clear.png) to delete all
cookies.

![Clearing all cookies](/web/tools/chrome-devtools/storage/imgs/clearallcookies.png)

**Figure 6**. Clearing all cookies

[1]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[2]: /web/tools/chrome-devtools/open
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Scope_of_cookies
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Scope_of_cookies
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Permanent_cookies
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Session_cookies
[7]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies
[8]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies
[9]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies
[10]: https://bugs.chromium.org/p/chromium/issues/detail?id=232693
