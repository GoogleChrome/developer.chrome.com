---
layout: 'layouts/blog-post.njk'
title: Request additional migration time with the third-party cookie deprecation trial
description: >
  Chrome plans to disable third-party cookies for 1% of users starting in early Q1 2024 with the eventual goal of ramping up to 100% starting in Q3 2024, subject to resolving any competition concerns with the UK’s Competition and Markets Authority (CMA). For an easier transition through the deprecation process we are offering a third-party deprecation trial which allows embedded sites and services to request additional time to migrate away from third-party cookie dependencies for non-advertising use cases.
subtitle: >
  Chrome plans to disable third-party cookies for 1% of users starting in early Q1 2024 with the eventual goal of ramping up to 100% starting in Q3 2024, subject to resolving any competition concerns with the UK’s Competition and Markets Authority (CMA). For an easier transition through the deprecation process we are offering a third-party deprecation trial which allows embedded sites and services to request additional time to migrate away from third-party cookie dependencies for non-advertising use cases.
date: 2023-11-20
hero: 'image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/vQzXC7K0CTQ3ZMFiDVIN.jpg'
alt: >
  Request additional migration time with the third-party cookie deprecation trial
authors:
  - taofiksulaiman
  - benkelly
  - rowan_m
tags:
  - privacy
  - cookie-countdown
---

{% Aside 'update' %}
The start of registration for this deprecation trial has been moved to the week of December 4, 2023. This article originally stated that the registration would start the week of November 27, 2023.
{% endAside %}

Chrome plans to [disable third-party cookies for 1% of users starting in early Q1 2024](/docs/privacy-sandbox/chrome-testing/) with the eventual goal of ramping up to [100% starting in Q3 2024](/docs/privacy-sandbox/third-party-cookie-phase-out/), subject to resolving any competition concerns with the UK’s Competition and Markets Authority (CMA). For an easier transition through the deprecation process, we are offering a third-party [deprecation trial](/docs/web-platform/origin-trials/#deprecation-trials) which allows embedded sites and services to request additional time to migrate away from third-party cookie dependencies for non-advertising use cases. 

{% Aside %}

**[Third-party origin trials](https://goo.gle/ot-3p)** enable providers of embedded content or services to access a trial feature across multiple sites, by using JavaScript to provide a trial token. To request a third-party token when registering, enable the "Third-party matching" option on the origin trial's registration page. A third-party token must be provided by using JavaScript to write an origin trial meta tag, not in HTML code or an HTTP header.

**[Deprecation trials](https://goo.gle/ot-dt)** enable a deprecated feature to be temporarily re-enabled. Participation in this deprecation trial allows third-party cookies to be temporarily re-enabled.

{% endAside %}

Registration for this deprecation trial is intended to start the week of December 4, 2023. The deprecation trial will officially start in January 2024 and end on December 27, 2024. Developers are expected to make necessary changes and plans by this trial end date.


## Deprecation trials

Deprecation trials are a standard option that Chrome provides to allow sites to register for additional time to migrate away from the legacy functionality being removed. A deprecation trial is a type of [origin trial](/docs/web-platform/origin-trials/) that allows a feature to be temporarily re-enabled.

This trial is for the embeds and services that set third-party cookies and that meet our below outlined eligibility criteria. In other words, if your embed or service is the third party, then you can register for the deprecation trial to temporarily re-enable your third-party cookies in all contexts where your embed or service is included. The trial only applies to the registered embedded origin and not the entire top level site domain that users visit.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/VTCCVa8JEzmhv4vXEc22.png", alt="A third-party/cross-site iframe example showing an embedded page from https://embed.example/iframe.html on https://top.example and a third-party/cross-site script example showing a script from https://third-party.example/script.js included on https://top.example", width="800", height="359" %}

Top-level sites that use third parties that rely on cookies **do not** need to sign up for this deprecation trial. You should audit the third-party cookies used within your site and contact your third-party providers to ensure they are prepared for the deprecation.


## Eligibility criteria and review process

This deprecation trial differs from previous trials with the introduction of a review and approval process for participation. This is to strike a balance between improving privacy for people on the web, while still enabling the services they depend on to request extra time to migrate if necessary.

The principles guiding this deprecation trial are: 

* **Preserving user-critical functionality:** This deprecation trial is intended for third-party providers that demonstrate functional breakage in user journeys.
* **Limiting user tracking:** The deprecation trial is not intended to support cross-site tracking for advertising purposes, and as such third-party embeds and services used for advertising are not eligible.

The ineligibility of advertising use cases will also help to ensure the deprecation trial does not interfere with the [industry testing planned for the start of 2024 as described by the Competition and Markets Authority](https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes#industry-testing). This includes advertising-related domains that are also used for non-advertising purposes.

Chrome will initially work with [Disconnect.me](https://disconnect.me/), an industry leader in internet privacy, and implement Disconnect's tracker protection lists to identify the scripts and domains categorized as advertising. Disconnect is already used by other browsers for similar purposes on the web.

We will apply the following process for registration requests:

* If the third-party origin matches a known advertising domain, including if the origin matches an entry on the Disconnect [advertising list](https://github.com/disconnectme/disconnect-tracking-protection/blob/master/services.json#L1535C11-L1535C11), then the **registration request will be rejected**. In general, entries on the list will match all subdomains below the specified origin.  Some entries, however, include a path element.  These more specific entries will match the given origin, but not subdomains.
* Steps to reproduce a broken user-facing experience must be provided. In particular, this should be an experience for the user operating the device where the cookie is stored, and not a user performing later analysis of data. If we cannot validate a broken user experience then the **registration request will be rejected**.
* Otherwise the **registration request will be approved**.

We plan to offer an appeals process if the registering origin believes more information could clarify a review decision. The registrant can request an appeal by reapplying on the OT console. The intent of appeals is for requests that were rejected due to missing the requested information (known breakage bug and/or breakage repro steps) and/or if the registering origin believes more information could satisfy these requirements to clarify a review decision. 


## Apply for the deprecation trial

{% Aside %}

Before applying, you must report the functionality that will be broken by the third-party cookie deprecation, at [goo.gle/report-3pc-broken](https://goo.gle/report-3pc-broken).

{% endAside %}

Include reproduction steps that our team can use to verify the functional breakage. Alternatively if it’s easier and/or your functionality is gated by login or similar, you can provide a link to a recording of the steps to reproduce the problem, using [Chrome DevTools Recorder](/docs/devtools/recorder/).



1. Starting the week of December 4, 2023 navigate to the "3PCD Deprecation Trial" via the [list of Active Trials on the Chrome Origin Trials page](/origintrials/#/trials/active) and click "Register".
2. For "Web Origin", provide the origin which serves your embedded page or scripts.
3. The "Third-party matching" option will depend on how you need to provide the token. The options are explained in more detail in [Add the trial token](#add-the-trial-token).
    * If you are providing the token via HTTP header or meta tag on your own embedded pages, **do not check** "Third-party matching".
    * If you are injecting the token via JavaScript into a different site, you **must check** "Third-party matching".
    * If you need to do both, you will need to make separate registrations.
4. If you host cross-site content across multiple subdomains, then check the "match all subdomains" option.
    * Tokens will match multiple subdomains similarly to wildcard matching, e.g. `*.<domain>`. Request a token for `example.com` and it can be provided on `a.example.com`, `b.example.com`. Third-party cookie access will still only be re-enabled for the specific origins that provide the token, not all the subdomains. See [What cookies are enabled when subdomain matching is enabled?](#what-cookies-are-enabled-when-subdomain-matching-is-enabled).
    * If you host cross-site content across separate origins that are not under the same domain, you will need to make separate registrations for each origin.
5. Acknowledge all conditions included in ‘Disclosure and Acknowledgement’ by checking all boxes.
6. Submit the request.
7. We require additional information to process your request. You will receive an email notification with an auto-generated ticket asking for the following:
    * The number of subdomains tied to your requested origin
    * The bug ID or link for the associated third-party breakage repo bugs that you previously reported to [goo.gle/report-3pc-broken](https://goo.gle/report-3pc-broken).
    * Any additional information/context about the breakage/use case that you would like us to consider. (In cases of an appeal for a denied trial request, explain why/how your origin meets the outlined criteria for this trial).

Once submitted, we will review your request and notify you when review is complete or if additional information is needed, and whether your request is either approved or denied. You will also receive the status and rationale for the result. If approved, you can proceed to provide the trial token as needed. If denied, you can follow the guidance in the request ticket. 


## Add the trial token

Refer to [Get started with origin trials](/docs/web-platform/origin-trials/), [Third-party origin trials](/docs/web-platform/third-party-origin-trials/), and [Troubleshoot Chrome origin trials](/docs/web-platform/origin-trial-troubleshooting/) for more details.

You should include the trial token in all page responses where you want to set or send cookies in a cross-site context.

{% Aside %}

If your embedded resource is a third-party iframe, then you can provide a token using an [HTTP origin-trial header](#provide-the-token-via-http-header), an [HTML `<meta>` tag](#provide-the-token-via-meta-tag), or via [JavaScript](#inject-the-token-via-javascript). If your embedded resource is a third-party script, follow the steps outlined in [Inject the token via JavaScript](#inject-the-token-via-javascript). If your embedded resource is neither of those — for example, it's just a pixel loaded via an `<img>` tag — then neither of these techniques will work, and you will need to ask the embedding first party to include a `<meta>` tag with your token on your behalf.

{% endAside %}

### Provide the token via HTTP header

If you need to re-enable third-party cookies for a page embedded within a cross-site iframe, you can include the `Origin-Trial` HTTP header in the page response:

```text
Origin-Trial: TOKEN_GOES_HERE
```

This corresponds to **not enabling** "Third-party matching" in your deprecation trial registration as you are providing the token in your own responses.

That page response can set a cookie. Subsequent requests to that same origin, such as sub-resources in that page or navigations from that page will include the site's cross-site cookies and may also set cookies.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/fCvvi7tkodM97Yrnl98X.png", alt="Diagram reiterating the token being provided on the page response.", width="800", height="266" %}

If you need cross-site cookies to be on the very first request to your origin in the session, then you can also use `Critical-Origin-Trial` header passing the trial name:

```text
Critical-Origin-Trial: Tpcd
```

This will cause the browser to retry the request with third-party cookies enabled.

The deprecation trial is provided as a persistent trial, which means that once the token has been received by the browser, the trial behavior will be applied until an iframe is loaded without a trial token present. It is recommended to send the trial token on each iframe load consistently.


### Provide the token via meta tag

Within a page, you can use a meta tag in the document `<head>`:

```html
<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
```

The meta tag will enable cross-site cookies for subsequent requests or JavaScript in the page, but you will need to use the HTTP header if you require existing cookies to be sent on the initial request.


### Inject the token via JavaScript

If you need to enable third-party cookies for your origin before or without serving your own page request, for example, if cookies are required on a cross-site image request, or you intend to create an iframe via JavaScript, then you can inject the token into the top-level site using JavaScript:

```javascript
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = 'TOKEN_GOES_HERE';
document.head.append(otMeta);
```

To allow this, you **must enable** "Third-party matching" in your deprecation trial registration as you are injecting the token for your origin (the third-party) into a different site.

A token with third-party matching enabled may be injected on any origin, including your own, and it will work.

{% Img src="image/VWw0b3pM7jdugTkwI6Y81n6f5Yc2/wCQ28n65A6tQSq0bzUWk.png", alt="Diagram reiterating that the third-party script injects the token in the parent page.", width="800", height="266" %}

A persistent trial will still be disabled if an iframe is loaded without the trial token. You must consistently provide the trial token on all iframes loaded even if the trial was enabled via a third-party script load originally.


### Validate your token

Open DevTools and navigate to the Application tab. Expand the Frames tree in the left-hand navigation. Selecting any frame will show an Origin Trials section if any tokens have been provided. If you are injecting the token into the top-level site, you will see this on the "top" entry. Otherwise you should select the frame that corresponds to your embedded page.

In the Origin Trials section, if you have provided a token you should see an entry for "Tpcd". If this has successfully enabled the feature, you will see a green "Enabled" status. Otherwise you will see a red error status and you can expand the entry to see the problem.

Only one valid token is needed to activate the deprecation trial. If you have registered for both first-party and third-party matching, it is not an issue if you provide both tokens within the page. For example, if you have a single page that may be embedded in different ways, then you do not need to dynamically choose a token, you can simply provide both and the trial will be enabled in either context.


### What cookies are enabled?

The deprecation trial only enables third-party cookies for the **origin** registered for the trial. After activation third-party cookies will be present on iframe and subresource requests to that origin. Third-party cookies will also be available via `document.cookie` in iframes with that origin as well.

{% Aside %}

Learn about the difference between sites and origins in [Understanding "same-site" and "same-origin"](https://web.dev/articles/same-site-same-origin)

{% endAside %}

Cookie `Domain` attributes are not considered here. Only the request URL origin is considered. Once a request is determined to have third-party cookies all such cookies will be attached as normal even if the domain of a cookie is more permissive.

For example, if `https://one.test.example` is registered and its token is provided in an `https://one.test.example` iframe:

* `https://one.test.example/image.jpg` will receive cookies set from `https://one.test.example`
*  `https://one.test.example/image.jpg` will receive cookies set from other origins with `Domain=.test.example`
* `https://test.example/image.jpg` or `https://two.test.example/image.jpg` requests will **not** receive third-party cookies because they are **not** same-origin.


### What cookies are enabled when subdomain matching is enabled?

The "match all subdomains" option allows a single token to be used on the registration origin or any origin with a more specific subdomain. A token for `https://test.example` with subdomain matching can be used to activate the trial via `https://test.example`, `https://one.test.example`, or `https//two.test.example` iframes and third-party script loads.

In addition, when subdomain matching is enabled, third-party cookies will also be available on requests and in iframes associated with corresponding subdomains. For example, if `https://test.example` uses subdomain matching, subresource requests like `https://cdn.one.test.example/image.jpg` will receive third-party cookies.

Trial deactivation does not take subdomain matching into account. To deactivate the trial an iframe exactly matching the origin in the registration must be loaded without a token. So a registration for `https://test.example` with subdomain matching can only be disabled by an `https://test.example` iframe without a token. This may change in the future, so we recommend providing a token on **all** subframe iframes when you want to enable the trial and removing tokens from **all** iframes when you want to deactivate the trial.


## Frequently Asked Questions

1. What if I have questions about the [Disconnect.me](http://disconnect.me) list?
    * Contact Disconnect at [support@disconnect.me](mailto:support@disconnect.me) as we do not manage the Disconnect list. For more information, see their [tracker protection page](https://disconnect.me/trackerprotection). 
2. Can I register for the deprecation trial if my domain is used for both advertising and non-advertising purposes?
    * Third-party embeds and services used for advertising are not eligible for the deprecation trial, for the reasons explained in this blog previously. This includes advertising-related domains that are also used for non-advertising purposes. For more information, see the [Eligibility criteria and review process](#eligibility-criteria-and-review-process) section.
3. Will sites be able to see which one of their partners have enrolled in the deprecation trial? Will they be able to limit the registration across their partners?
    * Yes, sites can see which embeds and services are relying on a deprecation trial token via the application panel in Chrome Devtools. See [Troubleshoot Chrome origin trials](/docs/web-platform/origin-trial-troubleshooting/) for more information.
    * Top level sites won’t be able to limit registration across their partners or the embeds and services on their page. Contact the partner if that is desired.
4. How is this trial different from other trials such as the User-Agent reduction origin trial?
    * The main way this deprecation trial is different is the new registration process that involves meeting the participation criteria and the new UI/pages in the OT console.
    * The second way this is different is that it is exclusively for third-party embedded sites to resolve the maximum amount of web compatibility issues across a number of sites/service clients.
5. Will there be a first-party deprecation trial for third-party cookie deprecation that top level sites can enroll in to enable 3PCs for their entire site?
    * At the moment we are focusing on third-party embeds and services. We recommend first-party sites continue [making changes to their sites directly to fix the breakage](/blog/cookie-countdown-2023oct/) and encourage their embedded third parties to sign up for this deprecation trial.
6. How long will it take to review my deprecation trial application?  Where can I check on the status of my application?
    * Response times may vary; you are encouraged to begin the registration process as soon as possible to ensure you will be ready ahead of 1% third-party cookie deprecation in early Q1. If you have not received any response within 1-2 weeks of submitting your registration, please contact [3pc-deprecationtrial@google.com](mailto:3pc-deprecationtrial@google.com).
    * Bug thread for open conversation, decision status and rationale.
7. Our deprecation trial registration has been approved, and we've deployed a trial token as recommended. However, the deprecation trial isn't working as expected. What should we do?
    * [Troubleshoot Chrome origin trials](https://goo.gle/ot-ts) provides a checklist for troubleshooting origin trials. In particular, for this deprecation trial, make sure you have registered for the correct origin, opted for a third-party token if necessary, and correctly provided the token via an HTTP header, meta tag or (for a third-party token) using JavaScript. You can learn more about third-party origin trials at [Third-party origin trials](https://goo.gle/ot-3p), and there is a deprecation trial demo at [Chrome origin trial demo: Token injected by third-party script](https://ot-3p.glitch.me). If you continue to experience problems, contact [origin-trials-support@google.com](mailto:origin-trials-support@google.com).
