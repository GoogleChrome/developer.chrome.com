---
layout: 'layouts/blog-post.njk'
title: Security panel debuts in Chrome DevTools 
description: >
   Learn all about the new Security Panel in Chrome DevTools.
authors:
  - pbakaus
date: 2015-12-13
updated: 2020-07-24
---


{% YouTube id="iP75a1Y9saY" %}


The Chrome Security team has been [hard at work](https://www.chromium.org/Home/chromium-security/marking-http-as-non-secure) (rewatch the video above for a great overview) to realize a future without HTTP, a future where you and your users can be reasonably sure that whatever data you’re sending to the web stays between you and the site you’re looking at. And to to make it even easier to jump ship and join the glorious HTTPS future, we’ve made Security a core feature in DevTools.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/bKwTDkuTju8kFjsP2JMx.png", alt="The new security panel.", width="800", height="421" %}
</figure>

The new Security panel introduced in Chrome 48 makes it a lot easier to see any issues you have with certificates and mixed content. You can head to it directly in DevTools or by clicking on the URL bar’s lock icon,  then the "Details" link.

## Addressing the problems with “Connection Info”

Our current solution for those of you who want data about page security is a click onto the little lock icon next to the URL, then parsing the info available on the “Connection” tab.

Unfortunately, this tab had several problems:

 - It’s too complicated for most users
 - But too basic for most developers
 - and makes it unclear what causes a lock icon “downgrade”

## Overview: explain lock icon and surface mixed content

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/soYSNZjJqJ2twy4dLnKQ.png", alt="Overview tab.", width="800", height="426" %}
</figure>


The **lock icon** represents the security state of the page, so knowing when and why it appears is extremely important. The overview screen in the new security panel explains the important parts that contribute to a secure page:

 - **Identity** (certificate)
 - **Connection** (protocol, cipher suite)
 - **Subresources**

You’ll now know at a glance why your site does or does not get the little green badge of awesomeness.

Have **mixed content** appear out of nowhere? No worries. We show it directly on the overview, and a click brings you to a filtered view of the Network Panel, so you can quickly look at the offending requests:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/zF1GzTwRR7JI3nd8mvJK.png", alt="Mixed content.", width="800", height="347" %}
</figure>

## Origin view: connection type and certificate details

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/4x1RCoY25wxrFK7FnDDd.png", alt="Connection tab.", width="800", height="487" %}
</figure>

If you need information about a specific TLS connection, the **Origin view** will help. Reload the page and you’ll see every individual origin for all resources appear in the left hand navigation.

From here, you can find out everything about the **certificate** used and the **connection type**. In addition, it gives you the handy ability to drill down further to inspect all resources coming from that origin via the Network Panel.

- - -

Give the new Security panel a try and and let us know what you think on [Twitter](https://twitter.com/ChromeDevTools) or via [bug/feature ticket](https://crbug.com/new)!
