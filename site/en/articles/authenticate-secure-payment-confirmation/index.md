---
layout: 'layouts/blog-post.njk'
title: Authenticate with Secure Payment Confirmation
description: >
   Implement authentication protocols for SPC, to validate customer transactions.
authors:
  - agektmr
date: 2022-05-27
tags:
  - payments
  - webauthn
  - chrome-stable
  - spc
---

Merchants can use Secure Payment Confirmation (SPC) as part of a strong customer authentication (SCA) process for a given credit card or bank account. WebAuthn performs the authentication (frequently through biometrics). WebAuthn must be registered in advance, which you can learn about in [Register a Secure Payment Confirmation](/articles/register-secure-payment-confirmation).

{% Video src="video/YLflGBAPWecgtKJLqCJHSzHqe2J2/Ifnl5iGvDFs20BdoUTRo.mov", autoplay=true, loop=true %}

## How a typical implementation works

The most common use for SPC is when a customer makes a purchase on a merchant's
site, and the credit card issuer or bank requires payer authentication.

<figure class="screenshot">
{% Img src="image/VbsHyyQopiec0718rMq2kTE1hke2/dArhbZxZhQokGLfwL0Dg.svg", alt="Authentication workflow.", width="788", height="517" %}
</figure>

Let's walk through the authentication flow:

1. A customer provides their payment credentials (such as credit card
   information) to the merchant.
2. The merchant asks the payment credential's corresponding issuer or bank
   (relying party or RP) if the payer needs a separate authentication. This
   exchange might happen, for example, with
   [EMV® 3-D Secure](https://www.emvco.com/emv-technologies/3d-secure/).
   *  If the RP wishes the merchant to use SPC, and if the user has previously
      registered, the RP responds with a list of credential IDs registered by
      the payer and a challenge.
   *  If an authentication is not needed, the merchant can continue to
      complete the transaction.
3. If an authentication is needed, the merchant [determines whether the browser supports SPC](#feature-detection).
   *  If the browser does not support SPC, proceed with the existing
      authentication flow.
4. The merchant invokes SPC. The browser displays a confirmation dialog.
   *  If there are no credential IDs passed from the RP, fall back to the
      existing authentication flow.  
      After a successful authentication, **consider using [SPC registration](/articles/register-secure-payment-confirmation)
	to streamline future authentications**.
5. The user confirms and authenticates the amount and the destination of the
   payment by unlocking the device.
6. The merchant receives a credential from the authentication.
7. The RP receives the credential from the merchant and verifies its
   authenticity.
8. The RP sends the verification results to the merchant.
9. The merchant shows the user a message to indicate if the payment was
   successful or unsuccessful.

{% Aside 'gotchas' %}
To quickly support an initial SPC experiment, this API was designed atop
existing implementations of the Payment Request and Payment Handler APIs.
There is now general agreement to explore a design of SPC independent of
Payment Request. We expect (without a concrete timeline) that SPC will move
away from its payment request origins.

For developers, this should improve feature detection, invocation, and other
aspects of the API.
{% endAside %}

## Feature detection

To detect whether SPC is supported on the browser, you can send a fake call to
[`canMakePayment()`](https://web.dev/how-payment-request-api-works/#check-whether-the-payment-method-is-available).

Copy and paste the following code to feature detect SPC on a merchant's website.

```javascript
const isSecurePaymentConfirmationSupported = async () => {
  if (!'PaymentRequest' in window) {
    return [false, 'Payment Request API is not supported'];
  }

  try {
    // The data below is the minimum required to create the request and
    // check if a payment can be made.
    const supportedInstruments = [
      {
        supportedMethods: "secure-payment-confirmation",
        data: {
          // RP's hostname as its ID
          rpId: 'rp.example',
          // A dummy credential ID
          credentialIds: [new Uint8Array(1)],
          // A dummy challenge
          challenge: new Uint8Array(1),
          instrument: {
            // Non-empty display name string
            displayName: ' ',
            // Transparent-black pixel.
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
          },
          // A dummy merchant origin
          payeeOrigin: 'https://non-existent.example',
        }
      }
    ];

    const details = {
      // Dummy shopping details
      total: {label: 'Total', amount: {currency: 'USD', value: '0'}},
    };

    const request = new PaymentRequest(supportedInstruments, details);
    const canMakePayment = await request.canMakePayment();
    return [canMakePayment, canMakePayment ? '' : 'SPC is not available'];
  } catch (error) {
    console.error(error);
    return [false, error.message];
  }
};

isSecurePaymentConfirmationSupported().then(result => {
  const [isSecurePaymentConfirmationSupported, reason] = result;
  if (isSecurePaymentConfirmationSupported) {
    // Display the payment button that invokes SPC.
  } else {
    // Fallback to the legacy authentication method.
  }
});
```

## Authenticate the user

To authenticate the user, invoke the `PaymentRequest.show()` method with
`secure-payment-confirmation` and WebAuthn parameters: 

*  [`PublicKeyCredentialRequestOptions`](https://w3c.github.io/webauthn/#dictdef-publickeycredentialrequestoptions)
*  Other [payment specific parameters](https://w3c.github.io/secure-payment-confirmation/#sctn-securepaymentconfirmationrequest-dictionary) on the merchant's platform.

Here's the parameters you should provide to the payment method's `data` property,  [`SecurePaymentConfirmationRequest`](https://w3c.github.io/secure-payment-confirmation/#sctn-securepaymentconfirmationrequest-dictionary).

<div class="table-wrapper scrollbar">
  <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>rpId</code></td>
        <td>The hostname of the RP origin as RP ID.</td>
      </tr>
      <tr>
        <td><code>challenge</code></td>
        <td>A random challenge that prevents replay attacks.</td>
      </tr>
      <tr>
        <td><code>credentialIds</code></td>
        <td>An array of credential IDs. In WebAuthn's authentication, <code>allowCredentials</code> property accepts an array of <a href="https://w3c.github.io/webauthn/#dictionary-credential-descriptor"><code>PublicKeyCredentialDescriptor</code></a> objects, but in SPC, you only pass a list of credential IDs.</td>
      </tr>
      <tr>
        <td><code>payeeName</code> (optional)</td>
        <td>Name of the payee.</td>
      </tr>
      <tr>
        <td><code>payeeOrigin</code></td>
        <td>The origin of the payee. In the above mentioned scenario, it's the merchant's origin.</td>
      </tr>
      <tr>
        <td><code>instrument</code></td>
        <td>A string for <code>displayName</code> and a URL for <code>icon</code> that points to an image resource. An optional boolean (defaults to <code>true</code>) for <code>iconMustBeShown</code> that specifies an icon must be successfully fetched and shown for the request to succeed.</td>
      </tr>
      <tr>
        <td><code>timeout</code></td>
        <td>Timeout to sign the transaction in milliseconds</td>
      </tr>
      <tr>
        <td><code>extensions</code></td>
        <td>Extensions added to WebAuthn call. You don't have to specify the "payment" extension yourself.</td>
      </tr>
    </tbody>
  </table>
</div>

Check out this example code:

```javascript
// After confirming SPC is available on this browser via a feature detection,
// fetch the request options cross-origin from the RP server.
const options = fetchFromServer('https://rp.example/spc-auth-request');
const { credentialIds, challenge } = options;

const request = new PaymentRequest([{
  // Specify `secure-payment-confirmation` as payment method.
  supportedMethods: "secure-payment-confirmation",
  data: {
    // The RP ID
    rpId: 'rp.example',

    // List of credential IDs obtained from the RP server.
    credentialIds,

    // The challenge is also obtained from the RP server.
    challenge,

    // A display name and an icon that represent the payment instrument.
    instrument: {
      displayName: "Fancy Card ****1234",
      icon: "https://rp.example/card-art.png",
      iconMustBeShown: false
    },

    // The origin of the payee (merchant)
    payeeOrigin: "https://merchant.example",

    // The number of milliseconds to timeout.
    timeout: 360000,  // 6 minutes
  }
}], {
  // Payment details.
  total: {
    label: "Total",
    amount: {
      currency: "USD",
      value: "5.00",
    },
  },
});

try {
  const response = await request.show();

  // response.details is a PublicKeyCredential, with a clientDataJSON that
  // contains the transaction data for verification by the issuing bank.
  // Make sure to serialize the binary part of the credential before
  // transferring to the server.
  const result = fetchFromServer('https://rp.example/spc-auth-response', response.details);
  if (result.success) {
    await response.complete('success');
  } else {
    await response.complete('fail');
  }
} catch (err) {
  // SPC cannot be used; merchant should fallback to traditional flows
  console.error(err);
}
```

The `.show()` function results in a
[`PaymentResponse`](https://w3c.github.io/payment-request/#dom-paymentresponse)
object except the `details` contains a public key credential with a
`clientDataJSON` that contains the transaction data
([`payment`](https://w3c.github.io/secure-payment-confirmation/#sctn-collectedclientpaymentdata-dictionary))
for verification by the RP.

The resulting credential must be transferred cross-origin to the RP and
verified.

## How the RP verifies the transaction

Verifying the transaction data at the RP server is the most important step in
the payment process.

To verify the transaction data, the RP can follow WebAuthn's [authentication
assertion verification process](https://www.w3.org/TR/webauthn-3/#sctn-verifying-assertion).
In addition, they need to
[verify the `payment`](https://w3c.github.io/secure-payment-confirmation/#sctn-verifying-assertion).

An example payload of the `clientDataJSON`:

```json
{
  "type":"payment.get",
  "challenge":"SAxYy64IvwWpoqpr8JV1CVLHDNLKXlxbtPv4Xg3cnoc",
  "origin":"https://spc-merchant.glitch.me",
  "crossOrigin":false,
  "payment":{
    "rp":"spc-rp.glitch.me",
    "topOrigin":"https://spc-merchant.glitch.me",
    "payeeOrigin":"https://spc-merchant.glitch.me",
    "total":{
      "value":"15.00",
      "currency":"USD"
    },
    "instrument":{
      "icon":"https://cdn.glitch.me/94838ffe-241b-4a67-a9e0-290bfe34c351%2Fbank.png?v=1639111444422",
      "displayName":"Fancy Card 825809751248"
    }
  }
}
```

{% Aside 'caution' %}
The `type` property uses `payment.get` instead of `public-key`. This
may require some tweaking to [the existing WebAuthn
libraries](https://github.com/herrjemand/awesome-webauthn/blob/main/README.md#server-libs),
if you choose to use one of them.
{% endAside %}

*  The `rp` matches the RP's origin.
*  The `topOrigin` matches the top-level origin that the RP expects (the
   merchant's origin in the example above).
*  The `payeeOrigin` matches the origin of the payee that should have been
   displayed to the user.
*  The `total` matches the transaction amount that should have been displayed
   to the user.
*  The `instrument` matches the payment instrument details that should have
   been displayed to the user.

```javascript
const clientData = base64url.decode(response.clientDataJSON);
const clientDataJSON = JSON.parse(clientData);

if (!clientDataJSON.payment) {
  throw 'The credential does not contain payment payload.';
}

const payment = clientDataJSON.payment;
if (payment.rp !== expectedRPID ||
    payment.topOrigin !== expectedOrigin ||
    payment.payeeOrigin !== expectedOrigin ||
    payment.total.value !== '15.00' ||
    payment.total.currency !== 'USD') {
  throw 'Malformed payment information.';
}
```

After all the verification criteria have been passed, the RP can tell the
merchant that the transaction is successful.

## Next steps

* Read the overview of [Secure Payment Confirmation](/articles/secure-payment-confirmation)
* Learn about [registration with Secure Payment Confirmation](/articles/register-secure-payment-confirmation)
