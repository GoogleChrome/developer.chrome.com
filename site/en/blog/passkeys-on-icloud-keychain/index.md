---
layout: 'layouts/blog-post.njk'
title: Chrome starts supporting passkeys on iCloud Keychain on macOS
description: >
  Chrome on macOS starts supporting passkeys on iCloud Keychain. This lets users create passkeys on iCloud Keychain and synchronize them across Apple devices.
subhead: >
  Chrome on macOS starts supporting passkeys on iCloud Keychain.
date: 2023-09-28
authors:
  - agektmr
tags:
  - identity
  - passkeys
  - webauthn
hero: 'image/YLflGBAPWecgtKJLqCJHSzHqe2J2/szxkH65QmEUz9ZMh0Zgb.jpg'
alt: >
  A woman holding four apples.
---

Passkeys are a safer and more user friendly alternative to passwords. They
enable users to sign in to apps and websites by unlocking their device
screen–with a biometric sensor (such as a fingerprint or facial recognition),
PIN, or a pattern. With passkeys, users no longer need to remember and manage
passwords. Passkeys are already supported in Chrome across [many operating
systems](https://developers.google.com/identity/passkeys/supported-environments).

Passkeys that are created on Android (as [discoverable
credentials](https://www.w3.org/TR/webauthn-2/#discoverable-credential)) can be
stored in the [Google Password Manager](https://passwords.google/), encrypted
using the device's PIN or pattern and synchronized across Android devices where
the user is signed in with the same Google account. On another Android device,
the user can decrypt the passkey by entering the original device's PIN or
pattern and use the synced passkey to authenticate with the corresponding
websites and apps.

On macOS, passkeys created on Chrome have been only stored locally to the user's
[Chrome profile](https://support.google.com/chrome/a/answer/9025411) and haven't
been synchronized even when they were discoverable credentials. Chrome's passkey
synchronization support plan is described in [Google's
documentation](https://developers.google.com/identity/passkeys/supported-environments),
and there we stated that we were planning to support storing passkeys in iCloud
Keychain on macOS so that passkeys can be synchronized across the Apple
ecosystem.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/z6MiKx76ZC0xQm4lVipE.png", alt="Chrome's passkey dialog to create a new passkey. The passkey will be saved to Chrome profile locally.", width="800", height="602" %}
  <figcaption>Chrome's passkey dialog to create a new passkey. The passkey will be saved to Chrome profile locally.</figcaption>
</figure>

In line with that plan, starting with Chrome 118, on macOS 13.5 or later, users
will have the option to save passkeys in, and use passkeys from, iCloud
Keychain.

## How iCloud Keychain is supported in Chrome

There are no changes required from developers to align their passkey
implementation with iCloud Keychain. The API behaviors on Safari and Chrome with
iCloud Keychain are identical. Users on Chrome 118 and later on macOS 13.5 or
later will see the following changes:

### Registration

When creating a new passkey, macOS's system user verification dialog appears.
This dialog is the same as Safari's.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/H0sK4DYpiX0TBQ6zqKLy.png", alt="macOS's system user verification dialog that asks for Touch ID to create a new passkey.", width="800", height="563" %}
  <figcaption>macOS's system user verification dialog that asks for Touch ID to create a new passkey.</figcaption>
</figure>

The UI varies depending on the supported user verification method on the device
such as Apple Watch, Touch ID or a system password. When the user verifies their
identity, a new passkey is created and saved to iCloud Keychain.

iCloud Keychain synchronizes the saved passkey to other Apple devices that run
macOS, iOS or iPadOS where the user is signed in using the same iCloud account,
so that they can use the passkey to sign in to the websites and apps.

Passkeys stored in iCloud Keychain are available to different browsers as well.
For example, a passkey created on Safari can be available in Chrome on macOS and
vice versa.

### Authentication

Users can also sign in to your website using the passkey stored in iCloud Keychain.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/wY36r97a8mkKTHUheiRe.png", alt="macOS's system user verification dialog that asks for Touch ID to sign in with a passkey saved to iCloud Keychain.", width="800", height="554" %}
  <figcaption>macOS's system user verification dialog that asks for Touch ID to sign in with a passkey saved to iCloud Keychain.</figcaption>
</figure>

Note that passkeys stored to Chrome profile previously continue to be available,
but ones stored to iCloud Keychain are prioritized. If only a passkey from
Chrome profile is available, it will be used to authenticate the user.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/FWFHutWv84m8EYJtyCTa.png", alt="Chrome's passkey dialog to sign in with a passkey saved to Chrome profile.", width="800", height="602" %}
  <figcaption>Chrome's passkey dialog to sign in with a passkey saved to Chrome profile.</figcaption>
</figure>

If authentication is requested using form autofill (Conditional UI), passkeys
from iCloud Keychain are listed as part of the autofill suggestions if the user
has granted Chrome the necessary permission. If there are passkeys stored in the
Chrome profile, they are suggested too.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/MHCnKhNhwHM8x6eqrtsT.png", alt="Form autofill suggests passkeys from both iCloud Keychain and the Chrome profile.", width="800", height="535" %}
  <figcaption>Form autofill suggests passkeys from both iCloud Keychain and the Chrome profile.</figcaption>
</figure>

## Saving passkeys to Chrome profile

Even with iCloud Keychain support, users can choose to save passkeys to their
Chrome profile by default .

1.  In Chrome, visit `chrome://password-manager/settings`
2.  Turn off the **Use passkeys across your Apple devices** toggle to explicitly
    store passkeys to the Chrome profile by default.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/QYeEKKTyg3TLXxpy41ow.png", alt="The user can choose to store passkeys to Chrome profile (only available locally and will not sync).", width="800", height="122" %}
  <figcaption>The user can choose to store passkeys to Chrome profile (only available locally and will not sync).</figcaption>
</figure>

Users can also cancel the macOS's user verification dialog and choose iCloud
Keychain or Chrome profile to save a new passkey.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/XSJAYPiUuUJUbfNJ8XHs.png", alt="If the user cancels the dialog, Chrome asks to choose how to create a passkey.", width="800", height="780" %}
  <figcaption>If the user cancels the dialog, Chrome asks to choose how to create a passkey.</figcaption>
</figure>

{% Aside %}

On macOS 13.4 or earlier, all passkeys created on Chrome on macOS are stored to
the [Chrome profile](https://support.google.com/chrome/a/answer/9025411) locally
by default and they are not synchronized across devices. The stored passkeys are
visible to the user from `chrome://settings/passkeys`.

Even on macOS 13.5 or later, passkeys are stored to Chrome profile if the user
is not signed into iCloud Drive.

{% endAside %}

## Distinguishing the origin of a passkey

Again, there are no changes required from developers to align their passkey
implementation with iCloud Keychain. The API behavior between Chrome profile and
iCloud Keychain are already identical.

However, relying parties can distinguish the origin of a passkey whether it's
created on iCloud Keychain or on Chrome profile if they wish, by looking at the
[AAGUID](https://www.w3.org/TR/webauthn/#aaguid) (an identifier indicating the
type of the authenticator) in [the credential's authenticator
data](https://www.w3.org/TR/webauthn-3/#sctn-attestation).

The AAGUID of a passkey created in the Chrome profile is:
`adce0002-35bc-c60a-648b-0b25f1f05503`. Ones in iCloud Keychain are:
`00000000-0000-0000-0000-000000000000` as of September 2023. You can find known
AAGUIDs in a crowd sourced repository at
[https://github.com/passkeydeveloper/passkey-authenticator-aaguids](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

## iCloud Keychain activation

If a user tries to use iCloud Keychain passkeys but is not signed into iCloud,
or does not have iCloud Keychain syncing enabled, they are directed to System
Settings.

<figure>
  {% Img src="image/YLflGBAPWecgtKJLqCJHSzHqe2J2/1Gj5VCqfoLza5K3zRXDq.png", alt="A dialog shown when iCloud Keychain is not enabled on the user's macOS.", width="800", height="649" %}
  <figcaption>A dialog shown when iCloud Keychain is not enabled on the user's macOS.</figcaption>
</figure>

Also, users must grant Chrome permission to use iCloud Keychain on macOS the
first time that they try.

## Learn more

* [Passwordless login with passkeys | Authentication | Google for
  Developers](https://developers.google.com/identity/passkeys/)
* [Create a passkey for passwordless logins](https://web.dev/passkey-registration/)
* [Sign in with a passkey through form
  autofill](https://web.dev/passkey-form-autofill/)
* [Implement passkeys with form autofill in a web
  app](https://developers.google.com/codelabs/passkey-form-autofill#0)
