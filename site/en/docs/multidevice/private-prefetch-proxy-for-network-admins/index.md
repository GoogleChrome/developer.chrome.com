---
layout: "layouts/doc-post.njk"
title: Private prefetch proxy in Chrome for network administrators
date: 2022-05-11
description: An overview of how to filter content on prefetched navigations.
---

To improve page load times for our users, Chrome will sometimes prefetch links on the Google Search results page, and other participating websites, before the user clicks on them. This feature is described in detail in [this article](/blog/private-prefetch-proxy) from a technical perspective.

This feature relies on a [`CONNECT`](https://tools.ietf.org/html/rfc7231#section-4.3.6) proxy which hides the user's IP address from the website that needs to be prefetched. In turn, this inherently moves the connection establishment out of the network administrators' view.

At the same time, we recognize that network administrators may need to filter content. So, we've designed a mechanism by which network administrators can continue to do so if the user does click a prefetched link.

## Content filtering

To preserve the user's privacy, Chrome will not issue any observable DNS lookups when prefetching links. If the user navigates to a prefetched link, the page resources will be fetched from the local cache without making an observable DNS lookup. One side-effect is that content filtering may not work as intended when the user navigates to a prefetched link.

To allow network administrators to filter content on these prefetched navigations, we designed a signaling mechanism to instruct Chrome to issue a DNS lookup when the user clicks on a prefetched link. This DNS lookup will happen at the same time and in the same manner as if the prefetch had not happened, providing the administrators with the same opportunity to filter content. Chrome will pause loading the prefetched resources from cache until this second DNS lookup succeeds. If it fails, Chrome will not use the prefetched resources, and instead will load the page the usual way. Note that this incurs a performance penalty for the user, given that Chrome has to wait for the DNS lookup to complete.  
   
## Details of the signaling mechanism

For users who haven't disabled [page preloads](https://support.google.com/chrome/answer/114836), Chrome will asynchronously issue a DNS lookup for `dns-tunnel-check.googlezip.net` when Chrome starts or when a network interface change occurs.  
  
Here are the possible outcomes for the `dns-tunnel-check.googlezip.net` check:

- If the response is `NXDOMAIN` or `SERVFAIL`, or if a `NOERROR` response code is returned but contains neither `A` nor `AAAA` records, Chrome will understand that the network administrators need visibility into navigations to prefetched pages (see [Preflight mode](#preflight)).
- If the response is any other value, Chrome will directly use the prefetched resources and will not issue any additional DNS lookups when the user navigates to the prefetched page.

The outcome of this check will hold until Chrome is restarted, or until the network interface changes, which will trigger a new DNS lookup for `dns-tunnel-check.googlezip.net`, with a potentially different outcome.

## Preflight mode {: #preflight }

In this mode, before navigating to a page prefetched via the private prefetch proxy, Chrome will issue a DNS lookup for the relevant domain, and wait until the response comes back:

-  If the response consists of a non-empty set of IP addresses, Chrome will proceed with the navigation, using the prefetched resources.
-  If the response is `REFUSED` (preferred) or `NXDOMAIN`, Chrome will not proceed with the navigation, and will instead show the relevant DNS error page.