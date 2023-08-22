---
# Required
layout: 'layouts/blog-post.njk'
title: Debugging speculation rules
description: |
 Learn all about the Chrome DevTools features to debug speculation rules used to prefetch and prerender future page navigations.
authors:
  - tunetheweb
date: 2023-08-22
#updated: 2023-08-22
hero: image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/ALZTuy3IA4jUdOpjjm2j.jpg
alt: A picture of developer hunched over a computer screen with code on it
tags:
  - performance
  - devtools
  - chrome-117
---

Speculation rules can be used to prefetch and prerender next page navigations as detailed in [the previous blog post](/blog/prerender-pages/). This can allow for much quicker—or even instant—page loads greatly improving [Core Web Vitals](https://web.dev/vitals/) for these additional page navigations.

Debugging speculation rules can be tricky. This is particularly true for prerendered pages, as these pages are rendered in a separate renderer—kind of like a hidden background tab that replaces the current tab when activated. Therefore the usual DevTools options cannot always be used to debug issues.

The Chrome team has been working hard to enhance DevTools support for speculation rules debugging. In this post, you'll see all the various ways of using these tools to understand a page's speculation rules, why they may not be working, and when developers can use the more familiar DevTools options (and when not).

## Explanation of "pre-" terms

There's a lot of "pre-" terms that are easily confused, so let's start with an explanation of these:

- **Prefetch**: fetching a resource or document in advance to improve performance for when that is needed. This post covers prefetching documents using the Speculation Rules API, rather than the, similar, but older `<link rel="prefetch">` option often used for prefetching subresources.
- **Prerender**: this goes a step beyond prefetching and actually renders the whole page as if the user had navigated to it, but keeps it in a hidden background renderer process ready to be used when the user actually navigates there. Again, this document is concerned with the newer Speculation Rules API version of this, than the older `<link rel="prerender">` option, which [no longer does a full prerender](/blog/nostate-prefetch/).
- **Navigational preloading**: the collective term for the new prefetch and prerender options triggered by speculation rules.
- **Preloading**: an overloaded term that can refer to a number of technologies and processes including `<link rel="preload">`, the [Preload Scanner](https://web.dev/preload-scanner/), and [Service Worker navigation preloads](https://web.dev/navigation-preload/). These items will not be covered here, but the term is included to clearly differentiate those from the "navigational preloading" term above.

For more details see [this preloading tech landscape](https://docs.google.com/document/d/1FNLyXW0Q5Fi5-kEOtjfOdmtoDxRtUR_wX4dl5Fz9c7o/edit) document.

## Speculation rules for `prefetch`

Speculation rules can be used to prefetch the next navigation document. For example, when inserting the following JSON into a page, `next.html` and `next2.html` will be prefetched:

```html
<script type="speculationrules">
  {
    "prefetch": [
      {
        "source": "list",
        "urls": ["next.html", "next2.html"]
      }
    ]
  }
</script>
```

{% Aside 'important' %}
  Prefetch speculation rules only prefetch the document, and not the subresources. This uses fewer resources than a full prerender of a potential next navigation, but also means the subresources need to be fetched and rendered upon navigation.
{% endAside %}

Speculation rules are used for navigation prefetches and have some advantages over the older `<link rel="prefetch" href="next.html" as="document">` syntax, such as a more expressive API and the results being stored in memory cache rather than the HTTP disk cache.

### Debugging `prefetch` speculation rules

Prefetches triggered by speculation rules can be seen in the **Network** panel in the same way as other fetches:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/k0SqZ4VcyVAnUq4y5lvC.png", alt="Network panel in Chrome DevTools showing prefetched documents", width="800", height="571" %}
</figure>

The two requests highlighted in red are the prefetched resources, as can be seen by the **Type** column. These are fetched at `Lowest` priority as they are for future navigations and Chrome prioritizes the current page's resources.

Clicking on one of the rows also shows the `Sec-Purpose: prefetch` HTTP header, which is how these requests can be identified on the server side:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/ox90RIbGNpYXn05A1e37.png", alt="Chrome DevTools prefetch headers with Sec-Purpose set to prefetch", width="800", height="686" %}
</figure>

### Debugging `prefetch` with the Preloading panes

A new **Preloading** section has been added in the **Application** panel of Chrome DevTools to help aid with debugging issues with speculation rules:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/2HuCiXo0UN2FfchwaPtg.png", alt="Chrome DevTools Speculation Rules pane showing prefetch rule", width="800", height="587" %}
</figure>

{% Aside 'important' %}
  The **Preloading** panes are for working with speculation rules prefetching and prerendering (collectively known as "preloading"). These panes cannot be used to debug subresource _preloading_ using `<link rel="preload">` and subresource _prefetching_ using `<link rel="prefetch">`.
{% endAside %}

There are three panes available in this section:

- **Speculation Rules** which lists all the rule sets found on the current page.
- **Preloads** which lists all the prefetched and prerendered URLs from the rule sets.
- **This Page** which lists the prerendered status of the current page.

The **Speculation Rules** pane is shown above and we can see this example page has one set of speculation rules for prefetching 3 pages. Two of those prefetches succeeded and one failed. The icon besides the **Rule set** can be clicked to take you to the source of the rule set in the **Elements** panel. Alternatively, the **Status** link can be clicked to take you to the **Preloads** pane filtered to that ruleset.

The **Preloads** pane lists all the target URLs, along with the action (prefetch or prerender), which rule set they came from (as there may be multiple on a page) and the status of each preload:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/m5cy4LilaIbGF7vthZl5.png", alt="Chrome DevTools Preloads pane showing prefetched URLs along with their status", width="800", height="593" %}
</figure>

Above the URLs, a drop down can be used to show URLs from all the rule sets, or only URLs from a particular rule set. Below that are listed all the URLs. Clicking on a URL gives you more detailed information.

In this screenshot we can see the failure reason for the `next3.html `page (which does not exist and therefore returns a 404 which is a non-2xx HTTP status code).

The final pane, **This Page**, shows a **Preloading status** to show whether a prefetch or prerender was used for this page or not.

For a prefetched page, when that page is navigated to, you should see a successful message:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/z54tJ1S5O64GYsJghGBe.png", alt="Chrome DevTools This Page pane showing a successful prefetch", width="800", height="309" %}
</figure>

#### Unmatched preloads

When a navigation happens from a page with speculation rules, that does not result in a preload, an additional section of the pane will show more details of why the URL did not match any of the preloaded URLs, which is useful for spotting typos in your speculation rules.

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/suepp8Pn5xNr9oNYeEkX.png", alt="Chrome DevTools This Page pane, showing how the current URL did not match any of the URLs in the previous page's speculation rules", width="800", height="364" %}
</figure>

For example, here we navigated to next4.html, but only next.html, next2.html, or next3.html are prefetches so we can see this doesn't quite match any of those three rules.

{% Aside %}
  As this feedback is primarily intended for debugging speculation rules, this URL matching can look a little confusing when navigating to a completely different page that is not included in speculation rules and is not expected to be preloaded:

  <figure>
    {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/u8qawIQeCNv8KFsoDxaO.png", alt="Chrome DevTools showing an unmatched URL in the This Page Preloading pane", width="800", height="364" %}
  </figure>

  The Chrome team is [continuing to iterate on this feature](https://bugs.chromium.org/p/chromium/issues/detail?id=1473861) to improve the user interface in these cases.
{% endAside %}

The **Preloading** panes are very useful for debugging the speculation rules themselves, and finding any syntax errors in the JSON.

As for the prefetches themselves, the **Network** panel is likely a more familiar place for many developers. For the prefetch failure example, you can see the 404 for the prefetch in the **Network** panel:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/kHIghY1mr64PNnvowgrR.png", alt="Chrome DevTools Network panel showing a failed prefetch", width="800", height="296" %}
</figure>

However, the **Preloading** panes become much more useful for prerendering speculation rules, which are covered next.

## Speculation rules for `prerender`

Prerender speculation rules, follow the same syntax as prefetch speculation rules. For example:

```html
<script type="speculationrules">
  {
    "prerender": [
      {
        "source": "list",
        "urls": ["next.html", "next2.html"]
      }
    ]
  }
</script>
```

These trigger a full load and render of the page (subject to certain restrictions), which can provide an instant loading experience, but with extra resource costs.

Unlike prefetches however, these are not available to be seen in the **Network** panel as these are fetched and rendered in a separate rendering process in Chrome. This makes the **Preloading** panes more important to debug prerender speculation rules.

### Debugging `prerender` with the Preloading panes

The same **Preloading** section introduced above, can be used for prerender speculation rules as demonstrated with a similar demo page, that attempts to prerender, instead of prefetching the three pages:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/9mlMrC7ekXP67BWozsaD.png", alt="Chrome DevTools Preloading panes for a page with prerender speculation rules", width="800", height="436" %}
</figure>

Here we see again, one of the 3 preloads failed to prerender and developers can get the details per URL in the **Preloads** pane, by clicking on the **2 Ready, 1 Failure** link.

We are currently experimenting with [document speculation rules](https://github.com/WICG/nav-speculation/blob/main/chrome-2023q1-experiment-overview.md#automatic-link-finding) (available as [an origin trial](/origintrials/#/view_trial/705939241590325249)), which, rather than listing a specific set of URLs, allows the browser to pick these up from same origin links on the page:

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "document",
      "where": {
        "and": [
          {"href_matches": "/*\\?*#*"},
          {"not": { "href_matches": "/not-safe-to-prerender/*\\?*#*"}}
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
```

The above example selects all same origin links (including those with URL params or fragments—that is what the `\\?*#*` part means), except those beginning with `/not-safe-to-prerender `as prerender candidates.

It also sets the prerender `eagerness` to `moderate` which means the navigations are prerendered when the link is hovered, or clicked.

There are similar rules like this on [developer.chrome.com](/) itself, and using the new **Preloading** section on this site shows the usefulness of the **Preloading** section as all the eligible URLs the browser found on the page are listed:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/w9iL4IYKM1gXL1S5lIap.png", alt="Chrome DevTools Preloads pane with a number of Not triggered URLs", width="800", height="528" %}
</figure>

The `Status` is `Not triggered` as the prerender process for these has not started. However, as we hover over the links we see the status change as each URL is prerendered:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/srL61CA90M1IB2u9IYFH.png", alt="Chrome DevTools Preloads pane with prerendered pages triggered", width="800", height="528" %}
</figure>

Chrome currently [limits a page to 10 prerenders](https://bugs.chromium.org/p/chromium/issues/detail?id=1464021) so after hovering over the 11th link we see the failure reason for that, and any subsequent URLs:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/hNWZE6yNtYWtjfkffUjL.png", alt="Chrome DevTools Preloads pane with failed preloads showing", width="800", height="465" %}
</figure>

### Debugging `prerender` with the other DevTools panels

Unlike prefetches, pages that have been prerendered will not show up in the current rendering processes in DevTools panels like the **Network** panel, because they are rendered in their own behind-the-scenes renderer.

However, it is now possible to switch the renderer used by the DevTools panels with the drop down menu in the top right drop down, or by selecting a URL in the top part of the panel and selecting **Inspect**:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/Pxu2F91J3FTk7090DrvD.png", alt="Chrome DevTools now allows you to switch renderers that information is displayed for", width="800", height="599" %}
</figure>

This drop down (and the value selected) is shared across all the other panels too, such as the **Networks** panel, where you can see the page being requested is the prerendered one:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/YZwZCcZ0a6sJtmafEdS6.png", alt="Chrome DevTools Network panel showing the network requests for the prerendered page", width="800", height="465" %}
</figure>

Looking at the HTTP headers for these resources we can see they will all be set with the `Sec-Purpose: prefetch;prerender` header:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/sChO1hRSxqB8o4n2v7Ya.png", alt="Chrome DevTools Network panel showing Sec-Purpose header for a prerendered page", width="800", height="487" %}
</figure>

Or the **Elements** panel, where you can see the page contents, like in below screenshot where we see the H1 is for the prerendered page:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/wTF5aocvUFFnnZnMRomH.png", alt="Chrome DevTools Elements panel for the prerendered page", width="800", height="465" %}
</figure>

Or the Console pane, where you can see console logs emitted by the prerendered page:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/u1QnilcFwOmbjmgQWQEe.png", alt="Chrome DevTools Console panel showing the console output from a prerendered page", width="800", height="226" %}
</figure>

It's even possible to see the **Preload** pane for a prerendered frame to see if it had speculation rules:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/rBbT9ZOTqKWtZ5G3rxeJ.png", alt="Chrome DevTools Preloads pane for a preloaded page 🤯", width="800", height="487" %}
</figure>

Note that speculation rules themselves are not actioned until the prerendered page is activated and so will always be in the `Not triggered` status.

The render frame drop down is available for all the frames but is less useful for the Performance panel and the Lighthouse panels as any traces in those will still be based on the current page, rather than the hidden background page.

{% Aside 'warning' %}
  Cross-renderer performance tracing by clicking on a prerendered link in the middle of a performance trace is not currently supported and will not succeed leaving the trace in a "Loading profile..." state.
{% endAside %}

### Debugging speculation rules on the prerendered page

The previous sections discuss how to debug prerendered pages on the page which initiates the prerendering. However, it's also possible for the prerendered pages themselves to provide debug information, either by making analytics calls or logging to the console (which is viewable as described above).

Additionally once a prerendered page is activated, by the user navigating to it, the **This Page** pane will show this status, and whether it was successfully prerendered or not. With an explanation as to why it could not be prerendered if that was the case:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/qb4W4spJ1k7sahsxU8aH.png", alt="Chrome DevTools Preloading This Page pane showing both a successful and failed prerendered page", width="800", height="472" %}
</figure>

Additionally, [like for prefetches](#unmatched-preloads), when navigating from a page with speculation rules that did not match the current page, the This Page pane, will attempt to show you why the URLs did not match those covered on the previous page's speculation rules:

<figure>
  {% Img src="image/W3z1f5ZkBJSgL1V1IfloTIctbIF3/ZfJXbAYqt2BMvmDyvlmy.png", alt="Chrome DevTools This Page pane showing the URL mismatch of the current URL and those covered by the previous page", width="800", height="400" %}
</figure>

## Conclusion

In this post we have shown the various ways developers can debug prefetch and prerender speculation rules. The team is continuing to work on tooling for speculation rules, and we would love to hear suggestions from the developers as to what other ways would be helpful for debugging this exciting new API. We encourage developers to raise an issue on the [Chrome issue tracker](https://bugs.chromium.org/p/chromium/issues/entry?template=Defect&components=Internals-Preload) for any feature requests or bugs spotted.

## Acknowledgements

_Hero image by [Nubelson Fernandes](https://unsplash.com/@nublson) on [Unsplash](https://unsplash.com/photos/CO6r5hbt1jg)._
