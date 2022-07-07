---
layout: 'layouts/blog-post.njk'
title: Signed Exchanges launched for Desktop sites 
description: >
  Announcing Signed Exchanges Support for Chromium Browser on Desktop along with other recent feature launches.
date: 2022-07-08
authors:
  - twifkak
---

[Signed Exchanges (SXG)](https://web.dev/signed-exchanges/) is a delivery mechanism that can help speed up your site and improve [Largest Contentful Paint (LCP)](https://web.dev/lcp/) by enabling privacy-preserving cross-origin prefetch. At [I/O 2022](https://www.youtube.com/watch?v=bxc-Gc8KmF4), the SXG working group at Google previewed plans to add new SXG features and support site navigations on additional surfaces. Today, we are announcing the first set of these features, with more to come over the next few months:

- Support for Desktop site navigations 
- Google Search support for SXG from Top Stories & News 
- Support for server side personalization 

Read on to learn more about these features and how you can leverage them to improve the user experience on your site.

## Support for Desktop Navigations

With this release, Signed Exchanges will now be available for Desktop cross-origin navigations on Chromium browsers. This builds on the existing support for Android mobile and means that now, you can use SXG to also cache and prefetch the desktop version of your site. 

We estimate<sup><a href="#footnote-1">1</a></sup> that this release will, on average, double SXG's coverage of your site's visits, enabling improved loading and performance for more users. Today on mobile, this speed improvement is between 300 and 400 ms of LCP reduction on average for navigations from Google Search.

### How can you leverage this feature

Enabling Signed Exchanges for the Desktop version of your site does not require any additional work on your part. This feature is already supported on both Cloudflare's easy-to-use [Automatic Signed Exchanges tool](https://support.cloudflare.com/hc/articles/4411075595661-Automatic-Signed-Exchanges-SXGs-Beta) and the [open source SXG tool-kit](https://web.dev/signed-exchanges/#tooling).

<div class="table-wrapper scrollbar">
  <table></table>
    <tr>
      <th>
        <strong>Existing SXG Mobile Adopters:</strong>
      </th>
      <td>
        SXG will automatically begin applying to your desktop navigations.
      </td>
    </tr>
    <tr>
      <th><strong>New Adopters:</strong></th>
      <td>
        When enabled, SXG is available for both Desktop and Android Mobile navigations, by default.<br><br>
        Visit the SXG <a href="https://web.dev/signed-exchanges/#tooling" rel="noopener">blog post</a> to learn how you can enable it for your site.</td>
    </tr>
  </table>
</div>

You can opt out of this if you want using the supported-media meta tag. Learn more [here](https://github.com/google/webpackager/blob/main/docs/supported_media.md).

{% Aside %}
**Learn more about the impact of Signed Exchanges**

Several global brands and sites have already benefited from Signed Exchanges. Let's look at a few case studies for current SXG adopters on Android mobile:

Cloudflare, a leading Content Distribution Network, ran an experiment to measure the impact of Signed Exchanges for its customers of the 500 sites they tested:

- **85%** saw an **improvement in LCP**.
- **98%** observed reduced **Time to First Byte (TTFB)**.
- Median **20% improvement across these metrics**.

[RebelMouse](https://www.rebelmouse.com/signed-exchange?utm_medium=post&utm_source=google&utm_campaign=signed-exchange-co-marketing&utm_content=signed-exchange), a prominent Content Management System, recorded an improvement in business and performance metrics for their customers including:

- **41% LCP improvement** for Narcity.
- **27% increase in sessions per user** for Paper Magazine.
- **21% decrease in loading time** for MLT Blog.
{% endAside %}

## Google Search Support for Top Stories 

Google Search is an early adopter of Signed Exchanges' privacy-preserving cross-origin prefetch, which to-date has been available for site navigations from Search's Web Page Results. Starting in July 2022, Search is expanding this support to also include navigations from Top Stories. Note that while SXG does not impact ranking or selection criteria on Search, it does have the ability to improve your site's [Core Web Vitals](https://web.dev/vitals/), LCP in specific.

This feature requires no additional work on your part to enable and will be available automatically to both existing and new adopters.

<figure>
  {% Img src="image/jL3OLOhcWUQDnR4XjewLBx4e3PC3/sHE5Z6rwHCq11ieNC3Q0.png", alt="A screenshot of Google Search's top stories widget for the search term 'gaming news'.", width="514", height="436" %}
</figure>

## Support for server-side personalization

Signed Exchanges uses a cache to prefetch and serve content that has been cryptographically signed by the origin. Cached content can be sent to multiple different users or to the same user multiple times. In the past, this has meant that SXG has not been compatible with sites that use server side personalization&mdash;that is, different HTML for logged in users. 

**Today, we're adding "Dynamic SXG"**&mdash;a new feature that allows you to selectively enable SXG for visits from cookieless users only on Chromium. Logged in navigations, with server-side personalization, will continue to serve non-SXG versions of your site. 

This is especially impactful for sites that dynamically compute a unique web page for each logged-in user and hence often tend to have higher [TTFB](https://web.dev/ttfb/) and LCP stemming from database lookups. ‘Dynamic SXG' gives you the option and flexibility to leverage SXG to speed-up visits to your site for certain users without impacting your ability to provide a personalized experience to others.

### How can you enable this feature

Enabling Dynamic SXG requires you to add a `Vary: Cookie` annotation to the HTTP header of pages that contain server-side personalization. Here are some examples of how to do this, based on your server:

- [Apache](https://httpd.apache.org/docs/current/mod/mod_headers.html#Header): `Header add Vary Cookie`
- [nginx](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header): `add_header Vary Cookie`
- [Express](http://expressjs.com/en/4x/api.html#res.append): `res.append('Vary', 'Cookie')`

Note that Signed Exchanges continues to be compatible with any client-side personalization (such as lazy-loading, for example) you use to load elements such as a login widget, shopping cart, personalized news feed, etc.

## Whats next

The SXG working group at Google is continuing to invest in adding new features, capabilities and surfaces to Signed Exchanges, based on the community's interest and feedback. We have some exciting upcoming features planned over the next few months&mdash;keep a lookout on the Chrome Developers Blog to learn more.

## Footnotes

<a name="footnote-1"></a>
\[1\]: This is an estimate based on historical data for Signed Exchanges visits on Chromium Browsers on Mobile. Actual numbers will likely vary by site.
