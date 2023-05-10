---  
layout: "layouts/blog-post.njk"  
title: "Shared autofill across iframes: an initial proposal"
authors:  
  - dmengelt  
  - samdutton  
date: 2023-05-10  
description: "Some forms have fields in iframes, which causes problems for browser autofill. With
shared-autofill, the parent frame can designate the trustworthiness of cross-origin iframes, to
support a better autofill experience for the user."  
subhead: "Some forms have fields in iframes, which causes problems for browser autofill. With
shared-autofill, the parent frame can designate the trustworthiness of cross-origin iframes, to
support a better autofill experience for the user."  
hero: "image/80mq7dk16vVEg8BBhsVe42n6zn82/TSGLgf8YkrnkeAa7MQGR.png"  
thumbnail: "image/80mq7dk16vVEg8BBhsVe42n6zn82/Vojwa1YAHqVbadv5f5xI.png"  
alt: "Photo of dozens of colorful picture frames."  
---

A proposal to allow autofill into a cross-origin iframe is available for testing. With this feature,
a parent frame can designate the frames whose fields should be autofillable. This is particularly
useful for payment forms, where it is very common for sensitive fields (for
[PCI DSS](https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Supporting%20Document/PCI_DSS-QRG-v4_0.pdf)
compliance) to be loaded from a third-party origin such as a payment service provider (PSP).

In the following example, the cardholder name and expiration date are in the top-level page (or main
frame), but the credit card number and verification code are in iframes from a PSP.

```html
<!-- Top-level document URL: https://merchant.com/... -->
<form>
  Cardholder name:    <input id="name">
  Credit card number: <iframe src="https://psp.com/..."><input id="num"></iframe>
  Expiration date:    <input id="exp">
  CVC:                <iframe src="https://psp.com/..."><input id="cvc"></iframe>
</form>
```

The following diagram represents the structure of the form:

{% Img src="image/80mq7dk16vVEg8BBhsVe42n6zn82/Du9ie9yEfUwciL25TOz7.png", alt="Tree diagram showing how different fields are in different frames in a payment form", width="800", height="362" %}

For merchants, this design combines security and flexibility:

-  The cross-origin iframes isolate the sensitive payment data from the merchant's
    infrastructure, which helps with
    [PCI DSS](https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Supporting%20Document/PCI_DSS-QRG-v4_0.pdf)
    compliance.
-  Form fields in different frames can be arranged and styled to match the merchant website's
    look and feel. 

From the browser perspective, this means there are common and legitimate use cases for multi-frame
forms, which raises questions about the security model for forms. For users, multi-frame forms can
lead to a poor autofill experience, like the following example:

{% Video src="video/80mq7dk16vVEg8BBhsVe42n6zn82/92KrdGAvChT0kKXhpxp9.mov", width="800", height="634", controls="true" %}

The same-origin policy is a solid baseline for autofilling across frames, but does not provide
sufficient granularity for the browser to differentiate between trusted and untrusted frames for
autofill.

To allow a better autofill experience while maintaining the safety of user data, the Chrome team is
working on a proposal allowing autofill into a cross-origin iframe. If the form is changed to use
shared-autofill, Chrome successfully fills the credit card number cross-origin:

```html
<!-- Top-level document URL: https://merchant.com/... -->
<form>
  Cardholder name:    <input id="name">
  Credit card number: <iframe src="https://psp.com/..." allow="shared-autofill"><input id="num"></iframe>
  Expiration date:    <input id="exp">
  CVC:                <iframe src="https://psp.com/..." allow="shared-autofill"><input id="cvc"></iframe>
</form>
```

This can result in a better autofill experience for the user:

{% Video src="video/80mq7dk16vVEg8BBhsVe42n6zn82/kKtdEP8mn8dZVBgSrKzp.mov", width="800", height="634", controls="true" %}

## Try shared-autofill locally

{% Aside 'caution' %}
This proposal is being made available for testing and feedback behind a flag, but is subject to
change and may not be implemented in its current form for general availability.
{% endAside %}

You can test shared-autofill for a single user in Chrome 93.0.4577.0 and above on desktop and mobile
by [setting flags from the command line](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

```shell
--flag-switches-begin --enable-features=AutofillAcrossIframes,AutofillSharedAutofill
```

## Detect feature support

Use the following code to detect whether the `shared-autofill` property is available:

```javascript
if (document.featurePolicy && document.featurePolicy
      .features().includes('shared-autofill')) {
  console.log('shared-autofill available!');
}
```

## What's next?

Shared-autofill is an initial proposal to add an autofill feature to the [permissions
policy](https://w3c.github.io/webappsec-permissions-policy/). The Chrome team is currently working
with other browser vendors to get the proposal reviewed. Further proposals on how to increase the
user experience for autofill across iframes are also in discussion.

We'll continue to provide updates as we make progress with this proposal. In the meantime, if you
have a checkout page where the sensitive &lt;input&gt; fields (credit card number, cvc) are embedded from
a third-party provider, [reach out to us](mailto:payments-autofill-feedback@google.com). We would
love to hear if shared-autofill across iframes could potentially improve your users' autofill
experience during the checkout process.

## Find out more

-  [Current proposal](https://github.com/schwering/shared-autofill)
-  [W3C TAG review](https://github.com/w3ctag/design-reviews/issues/831)
-  [Payment form example used in this post](https://github.com/dmengelt/gpay-web-tester/blob/main/cc-autofill.html)
-  [What are Chrome flags?](/docs/web-platform/chrome-flags/)

<hr>

Photo by <a
href="https://unsplash.com/@jruscello?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jessica
Ruscello</a> on <a
href="https://unsplash.com/photos/-GUyf8ZCTHM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.