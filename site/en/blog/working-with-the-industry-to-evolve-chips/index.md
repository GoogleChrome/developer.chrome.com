---
layout: 'layouts/blog-post.njk'
title: 'Working with the industry to evolve CHIPS'
subhead: >
  Exploring two challenges that the Chrome team faced in implementing CHIPS and how community feedback played a key role in evolving the proposal design.
description: >
  Exploring two challenges that the Chrome team faced in implementing CHIPS and how community feedback played a key role in evolving the proposal design.
date: 2023-02-28
authors:
  - mihajlija
  - jney
hero: 'image/udVScdcCFAdRjZwFdLk2jWAFQyr1/Rr2cBdWZprYKZQrJI8cw.png'
alt: >
  Working with the industry to evolve CHIPS.
---


[Cookies Having Independent Partitioned State (CHIPS)](/docs/privacy-sandbox/chips/) is a Privacy Sandbox technology that allows developers to opt a cookie into "partitioned" storage, with separate cookie jars per top-level site.  
Example use cases for CHIPS include any scenarios where cross-site subresources require some notion of session or persistent state that is scoped to a user's activity on a single top-level site, such as third-party chat widgets,  map embeds, subresource CDN load balancing, headless CMS providers, and more.  

CHIPS is being developed with the goal to become an open web standard. It is under discussion in the PrivacyCG and has had an origin trial for 7 months during which the Chrome team has received helpful feedback. During development the team worked with key stakeholders to explore that feedback, resulting in an updated design that better serves the web ecosystem.   

Let's explore two challenges that the Chrome team faced in implementing CHIPS and how community feedback played a key role in evolving the proposal design.

## Removing the host-prefix and no `Domain` requirement

To encourage good security practices, CHIPS design requires that cookies only be set by and sent over secure protocols and that partitioned cookies must be set with `Secure`.  

Along with these requirements, the initial proposal disallowed the `Domain` attribute on partitioned cookies. Omitting `Domain` on cookies prevented sharing them between different third-party subdomains within a partition.  

During the origin trial, the Chrome team [heard from partners and other stakeholders](https://github.com/privacycg/CHIPS/issues/30) that the no-domain requirement made it difficult for sites with subdomains to implement CHIPS. For example, it would make it harder for `shop.example.com` and `pay.example.com` to share partitioned cookie jars. In other [cases, it made authentication flows difficult in embedded contexts](https://github.com/privacycg/CHIPS/issues/39). 

{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/P8OeJqoGqjW8oZLTWmr5.png", alt="Diagram showing sites pay.example.com and shop.example.com", width="800", height="224" %}  

The Chrome team evaluated this feedback and concluded that removing the no-domain requirement would not create privacy challenges, but it would improve usability. In response, the CHIPS product team opened a discussion on [GitHub](https://github.com/privacycg/CHIPS/issues/43), inviting more feedback about removing this requirement. Several companies that were testing CHIPS responded and commented publicly about the importance of this change for their use case.  

Chrome took the feedback to the W3C's Privacy Community Group and presented the updated proposal–Firefox and Edge approved the change to and Safari didn't raise any concerns. The following day, the Chrome team updated [Blink-Dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY/m/ppK4kDbqAwAJ?utm_medium=email&utm_source=footer) and presented the plan to remove the requirement on the [CHIPS Github repository](https://github.com/privacycg/CHIPS/issues/47).  

The CHIPS team initially proposed this requirement to guarantee that sites do not receive cross-site cookies from any malicious or compromised subdomains, and mitigate the possibility of using Domain cookies as a channel to leak data across subdomains.  

While this provided additional security benefits, [Tableau highlighted](https://github.com/privacycg/CHIPS/issues/30) that it presented challenges for the adoption of CHIPS because some current application architectures rely on sharing cookies between subdomains.

After Chrome made this change, Tableau, the company behind the visual analytics platform now owned by Salesforce, [shared](https://github.com/privacycg/CHIPS/issues/30#issuecomment-1104225686):  

{% Blockquote 'Lee Graber, Software Engineering Architect, Tableau' %}
This removal of the naming change makes the requirement much more inline with the previous changes to add the `SameSite=None` attribute and so a more 'known' quantity. We appreciate Google hearing the feedback, looking through the implications, and making the change to help support easier transitions.
{% endBlockquote %}

Through this process, CHIPS was made easier to implement for stakeholders while preserving privacy for users.

## Moving from a static to dynamic cookie limit

The other challenge in implementing CHIPS was the static cookie limit.   
To prevent a large memory footprint for cookies, the initial design proposed a numeric limit of 10 cookies per-site per-partition.  

Akamai shared [public feedback](https://github.com/privacycg/CHIPS/issues/48) that the proposed limit for partitioned cookies may not be sufficient for services like CDNs that offer top-level domains to host their customers' content (such as customer.cdn.xyz). For example, customer1.cdn.xyz and customer2.cdn.xyz could both deliver third-party content and they could each set several of their own cookies. If multiple customer sites like this are embedded on another website, they may hit the 10 cookies per partition limit.  

The Chrome team heard similar feedback in other forums, across partner meetings and W3C discussions, so they considered the best ways to solve the challenge that the cookie limit presented in these use cases.

<figure>
{% Img src="image/vgdbNJBYHma2o62ZqYmcnkq3j0o1/cLVE4czgWDZPY9lz1IcH.png", alt="Diagram showing the maximum number of SameSite=None cookies a single domain has on clients' machines", width="800", height="457" %}
  <figcaption>Diagram showing the maximum number of SameSite=None cookies a single domain has on clients' machines</figcaption>
</figure>

After considering how to incorporate community feedback, Chrome presented an updated idea at [TPAC 2022](https://drive.google.com/file/d/1wSUfOb7BIjtmsO6TdxyBMmw3RUQqCtGa/view), suggesting that CHIPS move from a _static_ 10 cookie limit to a _dynamic _10 kb limit based on memory. The analysis showed that this change should cover 99% of use cases on the web and would uphold the privacy principles that Chrome was trying to achieve (limiting too much information shared about users cross sites) while still maintaining key uses.  

Other browser vendors [weighed in](https://github.com/privacycg/CHIPS/issues/48#issuecomment-1271611177) saying that they agreed with the updated solution, which was important for ensuring CHIPS maintained cross-browser support in the PrivacyCG.  

As a result, Chrome [adopted](https://github.com/chromium/chromium/commit/8be338400e94964708796d2be6afe071233c0f6f) the new limit and incorporated the solution into the CHIPS design.

## Working with the industry

We've heard from many partners throughout the development of CHIPS and working together has been vital in the effort to improve privacy on the web.

{% Blockquote 'Martin Meyer, Senior Architect at Akamai Technologies' %}
Akamai enjoys a cooperative relationship on several fronts with other industry leaders like Google. The feedback we provided in the case of the CHIPS program may seem like a minor detail, but the change will go a long way to ensuring minimal negative impact to good use cases while still achieving the end goal. Our respective organizations are working to make the internet faster and more secure in our own ways, and the entire internet is better off when we work together.
{% endBlockquote %}

CHIPS has shown that feedback from the ecosystem is essential for improving technologies in the Privacy Sandbox. Open web conversations in GitHub, W3C meetings, and ongoing engagement with the Chrome team directly contributed to changes that have now been rolled out in Chrome stable. The Chrome team is eager to hear this feedback across a range of proposals, and it makes a huge difference for how technologies are developed and rolled out on the web. 
