---
api: certificateProvider
---

## Usage

Typical usage of this API to expose client certificates to Chrome OS follows these steps:

* The Extension registers for the events [onCertificatesUpdateRequested][1] and [onSignatureRequested][3].
* The Extension calls [setCertificates][2] to provide the initial list of certificates after the initialization.
* The Extension monitors the changes in the list of available certificates and calls [setCertificates][2] to notify the browser about every such change.
* During a TLS handshake, the browser receives a client certificate request. With an [onCertificatesUpdateRequested][1] event, the browser asks the Extension to report all certificates that it currently provides.
* The Extension reports back with the currently available certificates, using the [setCertificates][2] method.
* The browser matches all available certificates with the client certificate request from the remote host. The matches are presented to the user in a selection dialog.
* The user can select a certificate and thereby approve the authentication or abort the authentication.

![Certificate selection dialog](certificate_provider_selection_dialog.png)

* If the user aborts the authentication or no certificate matched the request, the TLS client authentication is aborted.
* Otherwise, if the user approves the authentication with a certificate provided by this Extension, the browser requests the Extension to sign the data to continue the TLS handshake. The request is sent as a [onSignatureRequested][3] event.
* This event contains input data, declares which algorithm has to be used to generate the signature, and refers to one of the certificates that were reported by this Extension. The Extension must create a signature for the given data using the private key associated with the referenced certificate. Creating the signature might require prepending a DigestInfo and padding the result before the actual signing.
* The Extension sends back the signature to the browser using the [reportSignature](#method-reportSignature) method. If the signature couldn't be calculated, the method has to be called without signature.
* If the signature was provided, the browser completes the TLS handshake.

The actual sequence of steps can be different. For example, the user will not be asked to select a certificate if the enterprise policy to automatically select a certificate is used (see [AutoSelectCertificateForUrls](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=AutoSelectCertificateForUrls) and [Chrome policies for users](https://support.google.com/chrome/a/answer/2657289?hl=en#AutoSelectCertificateForUrls)).

In the Extension, this can look similar to the following snippet:

```js
function collectAvailableCertificates() {
  // Return all certificates that this Extension can currently provide.
  // For example:
  return [{
    certificateChain: [new Uint8Array(...)],
    supportedAlgorithms: ['RSASSA_PKCS1_v1_5_SHA256']
  }];
}

// The Extension calls this function every time the currently available list of
// certificates changes, and also once after the Extension's initialization.
function onAvailableCertificatesChanged() {
  chrome.certificateProvider.setCertificates({
    clientCertificates: collectAvailableCertificates()
  });
}

function handleCertificatesUpdateRequest(request) {
  // Report the currently available certificates as a response to the request
  // event. This is important for supporting the case when the Extension is
  // unable to detect the changes proactively.
  chrome.certificateProvider.setCertificates({
    certificatesRequestId: request.certificatesRequestId,
    clientCertificates: collectAvailableCertificates()
  });
}

// Returns a private key handle for the given DER-encoded certificate.
// |certificate| is an ArrayBuffer.
function getPrivateKeyHandle(certificate) {...}

// Digests and signs |input| with the given private key. |input| is an
// ArrayBuffer. |algorithm| is an Algorithm.
// Returns the signature as ArrayBuffer.
function signUnhashedData(privateKey, input, algorithm) {...}

function handleSignatureRequest(request) {
  // Look up the handle to the private key of |request.certificate|.
  const key = getPrivateKeyHandle(request.certificate);
  if (!key) {
    // Handle if the key isn't available.
    console.error('Key for requested certificate no available.');

    // Abort the request by reporting the error to the API.
    chrome.certificateProvider.reportSignature({
      signRequestId: request.signRequestId,
      error: 'GENERAL_ERROR'
    });
    return;
  }

  const signature = signUnhashedData(key, request.input, request.algorithm);
  chrome.certificateProvider.reportSignature({
    signRequestId: request.signRequestId,
    signature: signature
  });
}

chrome.certificateProvider.onCertificatesUpdateRequested.addListener(
    handleCertificatesUpdateRequest);
chrome.certificateProvider.onSignatureRequested.addListener(
    handleSignatureRequest);
```

[1]: #event-onCertificatesUpdateRequested
[2]: #method-setCertificates
[3]: #event-onSignatureRequested