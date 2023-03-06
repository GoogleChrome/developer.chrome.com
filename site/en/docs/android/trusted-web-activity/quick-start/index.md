---
layout: "layouts/doc-post.njk"
title: Quick Start Guide
seoTitle: Trusted Web Activities Quick Start Guide
date: 2019-08-28
updated: 2020-12-08
description: A guide to get started building a basic, bare-bones Trusted Web Activity.
authors:
  - peconn
---

Trusted Web Activities can be a bit tricky to set up, especially if all you want to do is
display your website.
This guide will take you through creating a basic project that uses Trusted Web Activities,
covering all the gotchas.

By the end of this guide, you will:

* Have used [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) to build an application
that uses a Trusted Web Activity and passes verification.
* Understand when your signing keys are used.
* Be able to determine the signature your Android Application is being built with.
* Know how to create a basic [Digital Asset Links](/digital-asset-links/v1/getting-started) file.

To follow this guide you'll need:

* [Node.js](https://nodejs.org/en/) 10 or above installed on the development computer.
* An Android phone or emulator connected and set up for development
([Enable USB debugging](https://developer.android.com/studio/debug/dev-options.html#enable) if
you're using a physical phone).
* A browser that supports Trusted Web Activity on your development phone.
  Chrome 72 or later will work. Support in other browsers is on its way.
* A website you'd like to view in the Trusted Web Activity.

A Trusted Web Activity lets your Android App launch a full screen Browser Tab without
any browser UI.
This capability is restricted to websites that you own, and you prove this by setting
up Digital Asset Links. We'll talk [more about them later](#creating-your-asset-link-file).


When you launch a Trusted Web Activity, the browser will check that the Digital Asset Links check
out, this is called **verification**.
If verification fails, the browser will fall back to displaying your website as a
[Custom Tab](/docs/android/custom-tabs/).

## Install and configure Bubblewrap {: #install-and-configure-bubblewrap }

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) is a set of libraries and a command
line tool (CLI) for Node.js that helps developers generate, build and run Progressive Web Apps
inside Android applications, using Trusted Web Activity.

The CLI can be installed with the following command:

```shell
npm i -g @bubblewrap/cli
```

### Setting up the Environment

When running Bubblewrap for the first time, it will offer to automatically download and install the
required external dependencies. We recommend allowing the tool do do this, as it guarantees that
the dependencies are configured correctly. Check the [Bubblewrap documentation][1] to use an
existing Java Development Kit (JDK) or Android command line tools installation.

## Initialize and build project {: initialize-and-build}

Initializing an Android project that wraps a PWA is done by running the init command:

```shell
bubblewrap init --manifest=https://my-twa.com/manifest.json
```

Bubblewrap will read the [Web Manifest](https://developer.mozilla.org/docs/Web/Manifest),
ask developers to confirm values to be used in the Android project, and generate the project using
those values. Once the project has been generated, generate an APK by running:

```shell
bubblewrap build
```

## Run {: #build-and-run }

The build step will output a file called `app-release-signed.apk`. This file can be installed on a
development device for testing or uploaded to the Play Store for release.

Bubblewrap provides a command to install and test the application on a local device. With the
development device connected to the computer run:

```shell
bubblewrap install
```

Alternatively, the [adb](https://developer.android.com/studio/command-line/adb#move) tool can be
used.

```shell
adb install app-release-signed.apk
```

Note: the `adb` command-line tool is located inside the Android command-line tools in
`android_sdk/platform-tools/`.

The application should now be available on the device launcher. When opening the application you'll
notice that your website is launched as a Custom Tab, not a Trusted Web Activity, this is
because we haven't set up our Digital Asset Links validation yet, but first...

### Graphical User Interface (GUI) alternatives for Bubblewrap

[PWA Builder](https://www.pwabuilder.com/) provides a GUI interface that uses the Bubblewrap
library to power the generation of Trusted Web Activity projects. Find more instructions on how to
use PWA Builder to create an Android App that opens your PWA in
[this blog post](https://www.davrous.com/2020/02/07/publishing-your-pwa-in-the-play-store-in-a-couple-of-minutes-using-pwa-builder/).

### A note on signing keys {: #a-note-on-signing-keys }

Digital Asset Links take into account the key that an APK has been signed with and a common cause for verification failing is to use the wrong signature. (Remember, failing verification means you'll launch your website as a Custom Tab with browser UI at the top of the page.) When Bubblewrap builds the application, an APK will be created with a key setup during the `init` step. However, when you publish your app in Google Play, another key may be created for you, depending on how you choose to handle signing keys. Learn more on [signing keys and how they relate to Bubblewrap and Google Play](/docs/android/trusted-web-activity/android-for-web-devs#upload-vs-signing-key).

## Setting up your asset link file {: #creating-your-asset-link-file }

Digital Asset Links consist essentially of a file on your website that points to your app and some
metadata in your app that points to your website.

{% YouTube
  id='3bAQPnxLd4c'
%}

After creating your `assetlinks.json` file, upload it to your website at `.well-known/assetlinks.json` relative to the root) so that your app can be verified properly by the browser. Check out a [deep dive on Digital Asset Links](/docs/android/trusted-web-activity/android-for-web-devs#digital-asset-links) for more information on how it relates to your signing key.

## Checking your browser {: #checking-your-browser }

A Trusted Web Activity will try to adhere to the user's default choice of browser.
If the user's default browser supports Trusted Web Activities, it will be launched.
Failing that, if any installed browser supports Trusted Web Activities, it will be chosen.
Finally, the default behavior is to fall back to a Custom Tabs mode.

This means that if you're debugging something to do with Trusted Web Activities, you should
make sure you're using the browser you think that you are.
You can use the following command to check which browser is being used:

```shell
> adb logcat -v brief | grep -e TWAProviderPicker
D/TWAProviderPicker(17168): Found TWA provider, finishing search: com.google.android.apps.chrome
```

## Next Steps {: #next-steps }

Hopefully, if you've followed this guide, you'll have a working Trusted Web Activity and have enough
knowledge to debug what's going on when verification fails.
If not, have a look at more [Android concepts for web developers](/docs/android/trusted-web-activity/android-for-web-devs) or file a GitHub issue against
[these docs](https://github.com/google/WebFundamentals/issues).

For your next steps, I'd recommend you start off by
[creating an icon for your app](https://developer.android.com/studio/write/image-asset-studio#launcher).
With that done, you can consider deploying your app to the Play Store.

[1]: https://github.com/GoogleChromeLabs/bubblewrap/blob/main/packages/cli/README.md
