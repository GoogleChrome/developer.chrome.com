---
layout: "layouts/doc-post.njk"
title: "Chrome 33 Hosting Changes"
date: 2014-03-04
updated: 2018-06-12
description: Details about the hosting changes for Chrome Extensions that started in version 33 of Chrome.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

As a follow-up to our blog post on [protecting Windows users from malicious extensions][1], we're
enforcing the following changes starting in Chrome 33 Beta and stable channels for Windows:

- Users can only install extensions hosted in the Chrome Web store, except for installs via
  [enterprise policy][2] or [developer mode][3].
- Extensions that were previously installed, but not hosted on the Chrome Web Store will be
  [hard-disabled][4] (i.e the user cannot enable these extensions again), except for installs via
  [enterprise policy][5] or [developer mode][6].

## What's the rationale for this measure? {: #rationale }

See [Protecting Windows users from malicious extensions][7].

## For extensions that are currently hosted outside the Chrome Web Store, what should be done and by when? {: #externally_hosted }

If your extensions are currently hosted outside the Chrome Web Store, you should migrate them to the
Chrome Web Store as soon as possible. The above changes are already effective on Chrome 33 Beta for
Windows and will be effective on Chrome 33 stable for Windows (around end of Feb 2014). Once you
migrate your extensions to the Chrome Web Store, there will be no impact to your users, who will
still be able to use your extension as if nothing changed. If you're migrating your extensions to
the Chrome Web Store, start testing with Chrome 33 right away.

## What will happen if I migrate the extension to the Chrome Web Store sometime in the future? Will I lose all my users? {: #migration }

Users will have their off-store extensions hard-disabled once the enforcement rolls out in Chrome 33
stable/beta for Windows. However, if the extension is migrated to the Chrome Web Store after the
rollout, users would be able to manually to enable the migrated extension from extensions settings
page (chrome://extensions) or from the Chrome Web Store listing.

## What if I want to restrict access to certain users or prevent my extension from being listed on the Chrome Web Store? {: #access_restriction }

You can restrict access to your extension by limiting its visibility to Trusted Tester or by
unlisting the extension from the Chrome Web Store.

## Which operating systems and Chrome channels are affected by this change? {: #effective_changes }

The changes are effective only for Windows stable and beta channels starting with Chrome 33.

## Will this affect my ability to develop my extensions on Windows? {: #unpacked }

No. You can still load unpacked extensions in [developer mode][8] on Windows. Also, you can continue
to develop extensions on Chrome Dev channel/Canary, where these changes are not effective.

## How can I distribute my extension if I cannot upload it to the Chrome Web Store for policy reasons? {: #policies }

These changes are effective only on Windows stable and beta channel. Users who want to get
extensions that are not hosted on the Chrome Web Store can do so on [Chrome dev/canary channels in
Windows][9] or on all Chrome channels in other operating systems.

## Why couldn't this problem be solved by having a setting/option to load extensions that are not hosted in the Chrome Web Store? {: #sandboxing }

Unlike modern mobile operating systems, Windows does not sandbox applications. Hence we wouldn't be
able to differentiate between a user opting in to this setting versus a malicious native app
overriding the user's setting.

## What are the supported deployment options for extensions after this change? {: #deployment }

Apart from users installing extensions from the Chrome Web Store, the following deployment options
will be supported:

- For OSX and Linux, extensions can be installed via a [preferences JSON file][10].
- For Windows, extensions can be installed via the [Windows registry][11]. In the Windows registry,
  ensure that the update_url registry key points to the following URL:
  [https://clients2.google.com/service/update2/crx][12]. Local .crx installs via the path registry
  key are deprecated. Note that this deployment option works only for Chrome Web Store hosted
  extensions, and update_url cannot point to any other host other than
  [https://clients2.google.com/service/update2/crx][13].
- For Enterprises, we'll continue to support [group policy][14] to install extensions, irrespective
  of where the extensions are hosted. Note that the user's machine has to join a domain for GPO
  policy pushes to be effective.

## Are there any other considerations to be aware of for extensions that depend on a native application binary? {: #other_considerations }

Previously when off-store extensions were supported, it was possible to have the third party
application binaries and the sideloaded extension be updated in lockstep. However, extensions hosted
on the Chrome Web Store are updated via the Chrome update mechanism which developers do not control.
Extension developers should be careful about updating extensions that have a dependency on the
native application binary (for example, extensions using [native messaging][15] or legacy extensions
using [NPAPI][16]).

## What will users see when their off-store extension is disabled as a result of this rollout? {: #disabled_extension }

They will get a notification that says: "Suspicious Extensions Disabled" with a link to the
following [support article][17].

## Why do I see a bubble about "Disable developer mode extensions" when loading an unpacked extension in Windows stable/beta channels? {: #diable_developer_mode }

We do not want the developer mode to be used as an attack vector for spreading malicious extensions.
Hence we're informing users about developer mode extensions on Windows stable/beta channels and
giving them an option to disable these extensions.

[1]: http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html
[2]: https://support.google.com/chrome/a/answer/188453
[3]: /extensions/getstarted#unpacked
[4]: https://support.google.com/chrome/answer/2811969
[5]: https://support.google.com/chrome/a/answer/188453
[6]: /extensions/getstarted#unpacked
[7]: http://blog.chromium.org/2013/11/protecting-windows-users-from-malicious.html
[8]: /extensions/getstarted#unpacked
[9]: http://www.chromium.org/getting-involved/dev-channel
[10]: /extensions/external_extensions#preferences
[11]: /extensions/external_extensions#registry
[12]: https://clients2.google.com/service/update2/crx
[13]: https://clients2.google.com/service/update2/crx
[14]: https://support.google.com/chrome/a/answer/188453?hl=en
[15]: /docs/extensions/mv2/messaging#native-messaging
[16]: /extensions/npapi
[17]: https://support.google.com/chrome/answer/2811969
