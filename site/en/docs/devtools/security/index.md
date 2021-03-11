---
layout: "layouts/doc-post.njk"
title: "Understand security issues"
authors:
  - kaycebasques
date: 2015-12-21
#updated: YYYY-MM-DD
description: "Use the Security Panel to make sure that a page is fully protected by HTTPS."
---

Use the **Security** Panel in Chrome DevTools to make sure HTTPS is properly implemented on a page.
See [Why HTTPS Matters][1] to learn why every website should be protected with HTTPS, even sites
that don't handle sensitive user data.

## Open the Security panel {: #open }

The **Security** panel is the main place in DevTools for inspecting the security of a page.

1.  [Open DevTools][2].
2.  Click the **Security** tab to open the **Security** panel.

    {% Img src="image/admin/WnYbcLXh2TCkhoVh9Jub.png", alt="The Security panel", width="800", height="566" %}

    **Figure 1**. The Security panel

## Common problems {: #problems }

### Non-secure main origins {: #main }

When the main origin of a page is not secure, the **Security Overview** says **This page is not
secure**.

{% Img src="image/admin/37YwtqHGHTituFBvm74p.png", alt="A non-secure page", width="800", height="530" %}

**Figure 2**. A non-secure page

This problem occurs when the URL that you visited was requested over HTTP. To make it secure you
need to request it over HTTPS. For example, if you look at the URL in your address bar, it probably
looks similar to `http://example.com`. To make it secure the URL should be `https://example.com`.

If you've already got HTTPS set up on your server, all you need to do to fix this problem is
configure your server to redirect all HTTP requests to HTTPS.

If you don't have HTTPS set up on your server, [Let's Encrypt][3] provides a free and
relatively-easy way to start the process. Or, you might consider hosting your site on a CDN. Most
major CDNs host sites on HTTPS by default now.

**Tip** The [Redirect HTTP Traffic To HTTPS][4] audit in [Lighthouse][5] can help automate the
process of making sure that all HTTP requests are redirected to HTTPS.

### Mixed content {: #mixed }

[Mixed content][6] means that the main origin of a page is secure, but the page requested resources
from non-secure origins. Mixed content pages are only partially protected because the HTTP content
is accessible to sniffers and vulnerable to man-in-the-middle attacks.

{% Img src="image/admin/T1250jd5mFG2827izkwI.png", alt="Mixed content", width="800", height="589" %}

**Figure 3**. Mixed content

In **Figure 3** above, clicking **View 1 request in Network panel** opens the **Network** panel and
applies the `mixed-content:displayed` filter so that the **Network Log** only shows non-secure
resources.

{% Img src="image/admin/Eh7KosTILZPJZ85kdzgM.png", alt="Mixed resources in the Network Log", width="800", height="514" %}

**Figure 4**. Mixed resources in the Network Log

## View details {: #details }

### View main origin certificate {: #certificate }

From the **Security Overview** click **View certificate** to quickly inspect the main origin's
certificate.

{% Img src="image/admin/Zxh7Ko5oWlqjC88zjpHk.png", alt="A main origin certificate", width="800", height="566" %}

**Figure 5**. A main origin certificate

### View origin details {: #origindetails }

Click one of the entries in the left-hand nav to view the origin's details. From the details page
you can view connection and certificate information. Certificate transparency information is also
shown when available.

{% Img src="image/admin/Vh0PItXao7jFNl65mYFU.png", alt="Main origin details", width="800", height="848" %}

**Figure 6**. Main origin details

[1]: https://web.dev/why-https
[2]: /docs/devtools/open
[3]: https://letsencrypt.org/
[4]: https://web.dev/redirects-http/
[5]: https://developers.google.com/web/tools/lighthouse
[6]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
