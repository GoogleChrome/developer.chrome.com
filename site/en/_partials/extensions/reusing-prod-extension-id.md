## Keeping a consistent extension ID {: #keep-consistent-id }

Preserving a single ID is essential during development. To keep a consistent ID, follow these steps:

### Upload extension to the developer dashboard {: #upload_to_dashboard }

Package the extension directory into a `.zip` file and upload it to the [Chrome Developer
Dashboard](https://chrome.google.com/webstore/developer/dashboard) without publishing it:

1.  On the Developer Dashboard, click **Add new item**.
2.  Click **Browse files**, select the extension's zip file, and upload it.
3.  Go to the **Package** tab and click **View public key**.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8j12N4AyvHyjCZaFghv8.png", 
alt="Developer Dashboard Package tab", width="296", height="121", class="screenshot" %}

When the popup is open, follow these steps:

1. Copy the code in between `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`.
2. Remove the newlines in order to make it a single line of text.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/iOF372HS2DNkv5gLc1AA.png", alt="Public key popup",
width="500", height="233", class="screenshot" %}

Add the code to the `manifest.json` under the [`"key"`]([/docs/extensions/mv3/manifest/key/) field.
This way the extension will use the same ID.

```json
{ // manifest.json 
  "manifest_version": 3,
...
  "key": "ThisKeyIsGoingToBeVeryLong/go8GGC2u3UD9WI3MkmBgyiDPP2OreImEQhPvwpliioUMJmERZK3zPAx72z8MDvGp7Fx7ZlzuZpL4yyp4zXBI+MUhFGoqEh32oYnm4qkS4JpjWva5Ktn4YpAWxd4pSCVs8I4MZms20+yx5OlnlmWQEwQiiIwPPwG1e1jRw0Ak5duPpE3uysVGZXkGhC5FyOFM+oVXwc1kMqrrKnQiMJ3lgh59LjkX4z1cDNX3MomyUMJ+I+DaWC2VdHggB74BNANSd+zkPQeNKg3o7FetlDJya1bk8ofdNBARxHFMBtMXu/ONfCT3Q2kCY9gZDRktmNRiHG/1cXhkIcN1RWrbsCkwIDAQAB",
}
```

### Compare IDs {: #extension_management }

Open the Extensions Management page at `chrome://extensions`, ensure **Developer mode** is enabled,
and upload the unpackaged extension directory. Compare the extension ID on the extensions management
page to the Item ID in the Developer Dashboard. They should match.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/AGorME3hdXd2YeKot5Nc.png", alt="The ID of the
extension match", width="356", height="352", class="screenshot" %}

