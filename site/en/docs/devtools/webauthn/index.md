---
layout: "layouts/doc-post.njk"
title: "WebAuthn: Emulate authenticators"
authors:
  - fawazm
  - jecelynyeen
  - sofiayem
date: 2020-09-28
updated: 2022-06-21
description: "Emulate Authenticators and Debug WebAuthn in Chrome DevTools."
tags:
  - emulate
  - test
---

Use the **WebAuthn** tab in Chrome DevTools to create and interact with software-based virtual
authenticators.

## Open the WebAuthn tab {: #open_the_webauthn_tab }

1.  Visit a page that uses WebAuthn, such as our [demo page][1]
    (please login to access the page).
2.  [Open DevTools][2].
3.  Click **More Options** {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="6", height="26" %} > **More
    tools** > **WebAuthn** to open the WebAuthn tab.

{% Img src="image/admin/K3S8QGWK7tTtQtZ4sIwP.png", alt="WebAuthn tab", width="800", height="503" %}

## Enable the virtual authenticator environment {: #enable_the_virtual_authenticator_environment }

1.  On the WebAuthn tab, click to enable the checkbox **Enable virtual authenticator environment**.
2.  Once enabled, the **New authenticator** section appears.

{% Img src="image/admin/hH3rbmSUw2abQmL0KDvT.png", alt="Enable virtual authenticator environment", width="800", height="503" %}

## Add a virtual authenticator {: #add_a_virtual_authenticator }

To add a new virtual authenticator:

1. In the **New authenticator** section, configure the following options:

   1. [**Protocol**][3]: `ctap2` (Client to Authenticator Protocol) or `u2f` (Universal 2nd Factor)
   1. [**Transport**][4]:   `usb`, `nfc`, `ble`, or `internal`
   1. [**Supports resident keys**][5]
   1. [**Supports user verification**][6]
   1. [**Supports large blob**][7], available only for `ctap2` protocol with resident keys support

   For example:

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Z46FfRxuw4HP0yYxUpY6.png", alt="Adding a new virtual authenticator.", width="800", height="637" %}

2. Click the **Add** button.
3. You can now see a section with your newly-created authenticator.
    {% Img src="image/admin/zdunt7WWgIHS3ttasw2O.png", alt="Authenticator", width="800", height="503" %}

The **Authenticator** section includes a **Credentials** table. The table is empty until a
credential is registered to the authenticator.

{% Img src="image/admin/3xYbc4RWWACU2gMubH42.png", alt="No credentials", width="800", height="503" %}

### Register a new credential {: #register_a_new_credential }

To register a new credential, you need to have a web page that uses WebAuthn, for example, our [demo
page][1].

1.  On the demo page, click **Register new credential**.
2.  A new credential is now added to the **Credentials** table in the WebAuthn tab.

{% Img src="image/admin/LCi3w3BXzGG3HPAnropc.png", alt="View credentials", width="800", height="503" %}

On the demo page, you can click the **Authenticate** button multiple times. Observe the
**Credentials** table. The **Sign Count** of the credential will increase accordingly.

### Export and remove credentials {: #export_and_remove_credentials }

You can export or remove a credential by clicking the **Export** or **Remove** buttons.

{% Img src="image/admin/odTT7BuyuD9ZYYnF1kiI.png", alt="Export or remove a credential", width="800", height="503" %}

## Rename an authenticator {: #rename_an_authenticator }

1.  To rename an authenticator, click the **Edit** button next to the authenticator's name.
2.  Edit the name, then click **Enter** to save the changes.

{% Img src="image/admin/fcc5NnOYG6vfXm0sLswp.png", alt="Rename an authenticator", width="800", height="503" %}

## Activate an authenticator {: #set_the_active_authenticator }

A newly created authenticator is set to active automatically. DevTools supports only one active
virtual authenticator at any point of time.

To deactivate authentication, remove the currently active authenticator.

To activate an authenticator, select its **Active** radio button.

{% Img src="image/admin/tcffTvPxti2Jl0BBRiVw.png", alt="Set active authenticator", width="800", height="503" %}

## Remove a virtual authenticator {: #remove_a_virtual_authenticator }

To remove a virtual authenticator, click its **Remove** button.

{% Img src="image/admin/QfQ84aImd5DkQNnT8VlI.png", alt="Remove authenticator", width="800", height="503" %}

[1]: https://try-webauthn.appspot.com
[2]: /docs/devtools/open/
[3]: https://w3c.github.io/webauthn/
[4]: https://w3c.github.io/webauthn/#dom-publickeycredentialdescriptor-transports
[5]: https://w3c.github.io/webauthn/#dom-authenticatorselectioncriteria-requireresidentkey
[6]: https://w3c.github.io/webauthn/#enumdef-userverificationrequirement
[7]: https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html#sctn-largeBlobKey-extension
