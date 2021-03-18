---
api: enterprise.platformKeys
---

{% Aside %}

**Note:** This API is only for **[extensions pre-installed by policy][1]**.

{% endAside %}

## Usage

Typical usage of this API to enroll a client certificate follows these steps:

- Get all available tokens using **[enterprise.platformKeys.getTokens][2]**.

- Find the Token with `id` equal `"user"`. Use this Token subsequently.

- Generate a key pair using the `generateKey` Token method (defined in SubtleCrypto). This will return handle to the key.

- Export the public key using the `exportKey` Token method (defined in SubtleCrypto).

- Create the signature of the certification request's data using the `sign` Token method (defined in SubtleCrypto).

- Complete the certification request and send it to the certification authority.

- If a certificate is received, import it using **[enterprise.platformKeys.importCertificate][3]**

Here's an example that shows the major API interaction except the building and sending of the certification request:

```js
function getUserToken(callback) {
  chrome.enterprise.platformKeys.getTokens(function(tokens) {
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].id == "user") {
        callback(tokens[i]);
        return;
      }
    }
    callback(undefined);
  });
}

function generateAndSign(userToken) {
  var data = new Uint8Array([0, 5, 1, 2, 3, 4, 5, 6]);
  var algorithm = {
    name: "RSASSA-PKCS1-v1_5",
    // RsaHashedKeyGenParams
    modulusLength: 2048,
    publicExponent:
        new Uint8Array([0x01, 0x00, 0x01]),  // Equivalent to 65537
    hash: {
      name: "SHA-256",
    }
  };
  var cachedKeyPair;
  userToken.subtleCrypto.generateKey(algorithm, false, ["sign"])
    .then(function(keyPair) {
            cachedKeyPair = keyPair;
            return userToken.subtleCrypto.exportKey("spki", keyPair.publicKey);
          },
          console.log.bind(console))
    .then(function(publicKeySpki) {
            // Build the Certification Request using the public key.
            return userToken.subtleCrypto.sign(
                {name : "RSASSA-PKCS1-v1_5"}, cachedKeyPair.privateKey, data);
          },
          console.log.bind(console))
    .then(function(signature) {
              // Complete the Certification Request with |signature|.
              // Send out the request to the CA, calling back
              // onClientCertificateReceived.
          },
          console.log.bind(console));
}

function onClientCertificateReceived(userToken, certificate) {
  chrome.enterprise.platformKeys.importCertificate(userToken.id, certificate);
}

getUserToken(generateAndSign);
```

[1]: https://support.google.com/chrome/a/answer/1375694?hl=en
[2]: /docs/extensions/enterprise_platformKeys#method-getTokens
[3]: /docs/extensions/enterprise_platformKeys#method-importCertificate
