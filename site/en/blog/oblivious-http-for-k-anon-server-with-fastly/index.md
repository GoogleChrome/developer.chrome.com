---
layout: 'layouts/blog-post.njk'
title: Partnering with Fastly—Oblivious HTTP relay for FLEDGE's 𝑘-anonymity server
subtitle: >
  We are improving Chrome’s privacy measures by partnering with Fastly to implement the 𝑘-anonymity server for FLEDGE. With data being relayed through an OHTTP relay in this implementation, Google servers do not receive the IP addresses of end users. The 𝑘-anonymity server is an incremental step towards the full implementation of FLEDGE.
description:
  We are improving Chrome’s privacy measures by partnering with Fastly to implement the 𝑘-anonymity server for FLEDGE. With data being relayed through an OHTTP relay in this implementation, Google servers do not receive the IP addresses of end users. The 𝑘-anonymity server is an incremental step towards the full implementation of FLEDGE.
authors:
  - pjl
thumbnail: 'image/udVScdcCFAdRjZwFdLk2jWAFQyr1/abKfeo2FNt2HFX46in1l.jpg'
alt: >
  Image for blog post. 
date: 2023-03-15
---

[FLEDGE is a Privacy Sandbox proposal](/docs/privacy-sandbox/fledge/) to serve remarketing and custom audience use cases, designed with the intent of preventing third-parties from tracking user browsing behavior across sites. The browser will provide protection against microtargeting, by only rendering an ad if the same rendering URL is being shown to a sufficiently large number of people. We will require a crowd of 50 users per creative within the past 7 days before the ad can be rendered. This also helps protect users from cross-site tracking by preventing reporting rendered URLs that don't meet the minimum threshold.  

This protection is referred to as 𝑘-anonymity, and is enabled by a centralized server operated by Google that maintains global counts. Once a creative meets the minimum threshold, it is cleared to be rendered to users. You can check out [our explainer](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md) for further details on the 𝑘-threshold, and how the 𝑘-anonymity service is designed within FLEDGE.

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/c7P1fh4VtUCFU5QNNrdY.png", alt="A diagram showing that multiple sites in Chrome send requests to the 𝑘-anonymity server to serve FLEDGE ads.", width="800", height="450" %}
  <figcaption>
	  When sites request FLEDGE ads, Google's 𝑘-anonymity server ensures ads can only be shown if they pass the 𝑘-anonymity threshold. When requests for the ads are made to the advertising company, the IP address is visible to them.
  </figcaption>
</figure>

While the 𝑘-anonymity service provides a key privacy protection, it also could expose sensitive user data to this centralized server, such as IP address and the browser's User-Agent string. This is why we are improving Chrome’s privacy measures by [partnering with Fastly](https://www.fastly.com/blog/enabling-privacy-on-the-internet-with-oblivious-http), an edge cloud platform that provides content delivery, edge compute, security, and observability services, to operate an [Oblivious HTTP relay (OHTTP relay)](https://github.com/WICG/turtledove/blob/main/FLEDGE_k_anonymity_server.md#oblivious-http) as part of FLEDGE’s 𝑘-anonymity server. 

With data being relayed through an OHTTP relay, Google 𝑘-anonymity servers do not receive the IP addresses of end users. The 𝑘-anonymity server is an incremental step towards the full implementation of FLEDGE. Note that this doesn't impact IP addresses exposed to publisher origins through usual browsing behavior. 

{% Aside %}  
With [Oblivious HTTP (OHTTP)](https://ietf-wg-ohai.github.io/oblivious-http/draft-ietf-ohai-ohttp.html#name-introduction), a client can make multiple requests to a server without the server being able to use the properties of the requests to identify them as originating from the same client. It not only hides the client's IP address from the server, but also prevents TLS sessions from being used to correlate multiple requests from the same client.  
{% endAside %}

To implement OHTTP, we partnered with Fastly to operate a relay resource on our behalf. The user's Chrome browser will send an encrypted payload in the body of an HTTP `POST` message for the 𝑘-anonymity server to this relay. The browser encrypts the message using keys that it fetches directly from the 𝑘-anonymity server on the Google domain. The relay will forward the request to a gateway that will run on Google servers. The relay therefore doesn't see the content of the request but is aware of the user's IP address. Conversely, the 𝑘-anonymity server (and gateway) are unaware of the user's identity but can see the content of the request. 

{% Aside %}  
No action is required from developers or users, but we wanted to share some infrastructure that we're putting in place to improve user privacy across the entire FLEDGE process.  
{% endAside %} 

Google intends to operate the 𝑘-anonymity server on behalf of all Chrome users who are using FLEDGE. 𝑘-anonymity checks apply to all third-party ad tech and Google's own advertising services. The user is the person that benefits from 𝑘-anonymity, and the browser is the software that can choose to implement and enforce it.

<figure>
{% Img src="image/udVScdcCFAdRjZwFdLk2jWAFQyr1/pGB4JTgbiG1VNO2oO524.png", alt="A diagram showing that multiple sites in Chrome send requests to the 𝑘-anonymity server to serve FLEDGE ads with the OHTTP relay in between.", width="800", height="450" %}
  <figcaption>
	  When sites request FLEDGE ads, Google's 𝑘-anonymity server ensures ads can only be shown if they pass the 𝑘-anonymity threshold. Fastly's relay protects user privacy by implementing OHTTP to hide the IP addresses.
  </figcaption>
</figure>

The privacy-preserving properties of FLEDGE apply equally to Google and the broader ecosystem. This server will be called from Chrome, with support for Android expected later in 2023.

<em>Photo by <a href="https://unsplash.com/fr/@ianjbattaglia?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ian Battaglia</a> on <a href="https://unsplash.com/photos/9drS5E_Rguc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></em>