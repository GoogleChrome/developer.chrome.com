---
layout: "layouts/doc-post.njk"
title: "Emulate Authenticators and Debug WebAuthn in Chrome DevTools"
authors:
  - fawazm
,  - jecelynyeen
date: 2020-09-28
updated: 2020-09-29
description: "Emulate Authenticators and Debug WebAuthn in Chrome DevTools."
---

Use the **WebAuthn** tab in Chrome DevTools to create and interact with software-based virtual
authenticators.

## Open the WebAuthn tab {: #open_the_webauthn_tab }

1.  Visit a page that uses WebAuthn, such as our demo page here - [webauthndemo.appspot.com/][1]
    (please login to access the page).
2.  [Open DevTools][2].
3.  Click **More Options** ![More](/web/tools/chrome-devtools/images/shared/more.png) > **More
    tools** > **WebAuthn** to open the WebAuthn tab.

![WebAuthn tab](/web/tools/chrome-devtools/webauthn/images/01-webauthn-tab.png)

## Enable the virtual authenticator environment {: #enable_the_virtual_authenticator_environment }

1.  On the WebAuthn tab, click to enable the checkbox **Enable virtual authenticator environment**.
2.  Once enabled, you will see a new section **New authenticator**.

![Enable virtual authenticator environment](/web/tools/chrome-devtools/webauthn/images/02-enable-virtual-auth.png)

## Add a virtual authenticator {: #add_a_virtual_authenticator }

1.  On the **New authenticator** section, configure the options.
2.  Click on the **Add** button.
3.  You can now see a new section of your newly-created authenticator.
    ![Authenticator](/web/tools/chrome-devtools/webauthn/images/03-authenticor.png)

The **Authenticator** section includes a **Credentials** table. The table is empty until a
credential is registered to the authenticator.

![No credentials](/web/tools/chrome-devtools/webauthn/images/03-no-cred.png)

### Register a new credential {: #register_a_new_credential }

To register a new credential, you need to have a web page that uses WebAuthn, for example our demo
page here - [webauthndemo.appspot.com/][3].

1.  On the demo page, click on **Register new credential** to register a new credential.
2.  A new credential is now added to the **Credentials** table in the WebAuthn tab.

![View credentials](/web/tools/chrome-devtools/webauthn/images/03-view-cred.png)

On the demo page, you can click the **Authenticate** button multiple times. Observe the
**Credentials** table. The **Sign Count** of the credential will increase accordingly.

### Export and remove credentials {: #export_and_remove_credentials }

You can export or remove a credential by clicking the **Export** or **Remove** button.

![Export or remove a credential](/web/tools/chrome-devtools/webauthn/images/03-export-remove.png)

## Rename an authenticator {: #rename_an_authenticator }

1.  To rename an authenticator, click the **Edit** button beside the authenticator name.
2.  Edit the name, then click **Enter** to save the changes.

![Rename an authenticator](/web/tools/chrome-devtools/webauthn/images/04-rename.png)

## Set the active authenticator {: #set_the_active_authenticator }

A newly created authenticator will be set active automatically. DevTools supports **only one active
virtual authenticator** at any point of time.

Removing the currently active authenticator results in no authenticator being active.

To set an authenticator as the active authenticator, select the **Active** radio button of an
authenticator.

![Set active authenticator](/web/tools/chrome-devtools/webauthn/images/05-set-active.png)

## Remove a virtual authenticator {: #remove_a_virtual_authenticator }

To remove a virtual authenticator, click the **Remove** button of the authenticator.

![Remove authenticator](/web/tools/chrome-devtools/webauthn/images/06-remove-authenticor.png)

[1]: https://webauthndemo.appspot.com/
[2]: /chrome-devtools/open
[3]: https://webauthndemo.appspot.com/
