---
layout: "layouts/doc-post.njk"
title: "Emulate and Test Other Browsers"
date: 2015-04-13
#updated: YYYY-MM-DD
description: "Your job doesn't end with ensuring your site runs great across Chrome and Android. Even though Device Mode can simulate a range of other devices like iPhones, we encourage you to check out other browsers solutions for emulation."
---

Your job doesn't end with ensuring your site runs great across Chrome and Android. Even though
Device Mode can simulate a range of other devices like iPhones, we encourage you to check out other
browsers solutions for emulation.

## Summary {: #summary }

- When you don't have a particular device, or want to do a spot check on something, the best option
  is to emulate the device right inside your browser.
- Device emulators and simulators let you mimic your development site on a range of devices from
  your workstation.
- Cloud-based emulators let you automate unit tests for your site across different platforms.

## Browser emulators {: #browser_emulators }

Browser emulators are great for testing a site's responsiveness, but they don't emulate differences
in API, CSS support, and certain behaviors that you'd see on a mobile browser. Test your site on
browsers running on real devices to be certain everything behaves as expected.

### Firefox' Responsive Design View {: #firefox_responsive_design_view }

Firefox has a [responsive design view][1] that encourages you to stop thinking in terms of specific
devices and instead explore how your design changes at common screen sizes or your own size by
dragging the edges.

### Edge's F12 Emulation {: #edges_f12_emulation }

To emulate Windows Phones, use Microsoft Edge's [built-in emulation][2].

Since Edge does not ship with legacy compatibility, use [IE 11's Emulation][3] to simulate how your
page would look in older versions of Internet Explorer.

## Device emulators and simulators {: #device_emulators_and_simulators }

Device simulators and emulators simulate not just the browser environment but the entire device.
They're useful to test things that require OS integration, for example form input with virtual
keyboards.

### Android Emulator {: #android_emulator }

{% Img src="image/admin/4dZEPJ7KfytAZofgy4iR.png", alt="Android Emulator Stock Browser", width="800", height="1443" %}

Stock Browser in Android Emulator

At the moment, there is no way to install Chrome on an Android emulator. However, you can use the
Android Browser, the Chromium Content Shell and Firefox for Android which we'll cover later in this
guide. Chromium Content Shell uses the same Chrome rendering engine, but comes without any of the
browser specific features.

The Android emulator comes with the Android SDK which you need to [download from here][4]. Then
follow the instructions to [setup a virtual device][5] and [start the emulator][6].

Once your emulator is booted, click on the Browser icon and you'll be able to test your site on the
old Stock Browser for Android.

#### Chromium Content Shell on Android {: #chromium_content_shell_on_android }

{% Img src="image/admin/IhUyOkDJ1RxZFh7zDucB.png", alt="Android Emulator Content Shell", width="800", height="1443" %}

Android Emulator Content Shell

To install the Chromium Content Shell for Android, leave your emulator running and run the following
commands at a command prompt:

```bash
git clone https://github.com/PaulKinlan/chromium-android-installer.git
chmod u+x ./chromium-android-installer/\*.sh
./chromium-android-installer/install-chromeandroid.sh
```

Now you can test your site with the Chromium Content Shell.

#### Firefox on Android {: #firefox_on_android }

{% Img src="image/admin/rY90fx78bamE1SiV6AFB.png", alt="Firefox Icon on Android Emulator", width="800", height="1443" %}

Firefox Icon on Android Emulator

Similar to Chromium's Content Shell, you can get an APK to install Firefox onto the emulator.

Download the right .apk file from
[https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/][7].

From here, you can install the file onto an open emulator or connected Android device with the
following command:

```bash
adb install &lt;path to APK&gt;/fennec-XX.X.XX.android-arm.apk
```

### iOS Simulator {: #ios_simulator }

The iOS simulator for Mac OS X comes with Xcode, which you can [install from the App Store][8].

When you're done, learn how to work with the simulator through [Apple's documentation][9].

{% Aside %}

**Note:** To avoid having to open Xcode every time you want to use the iOS Simulator, open it, then
right click the iOS Simulator icon in your dock and select `Keep in Dock`. Now just click this icon
whenever you need it.

{% endAside %}

### Modern.IE {: #modernie }

{% Img src="image/admin/zl5ezXOKAlPeqU2IRbwY.png", alt="Modern IE VM", width="800", height="582" %}

Modern IE VM

Modern.IE Virtual Machines let you access different versions of IE on your computer via VirtualBox
(or VMWare). Choose a virtual machine on the [download page here][10].

## Cloud-based emulators and simulators {: #cloud-based_emulators_and_simulators }

If you can't use the emulators and don't have access to real devices, then cloud-based emulators are
the next best thing. A big advantage of cloud-based emulators over real devices and local emulators
is that you can automate unit tests for your site across different platforms.

- [BrowserStack (commercial)][11] is the easiest to use for manual testing. You select an operating
  system, select your browser version and device type, select a URL to browse, and it spins up a
  hosted virtual machine that you can interact with. You can also fire up multiple emulators in the
  same screen, letting you test how your app looks and feels across multiple devices at the same
  time.
- [SauceLabs (commercial)][12] allows you to run unit tests inside of an emulator, which can be
  really useful for scripting a flow through your site and watch the video recording of this
  afterwards on various devices. You can also do manual testing with your site.
- [Device Anywhere (commercial)][13] doesn't use emulators but real devices which you can control
  remotely. This is very useful in the event where you need to reproduce a problem on a specific
  device and can't see the bug on any of the options in the previous guides.

[1]: https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode
[2]: https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/emulation
[3]:
  https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn255001(v=vs.85)
[4]: https://developer.android.com/studio
[5]: https://developer.android.com/studio/run/managing-avds
[6]: https://developer.android.com/studio/run/emulator
[7]: https://ftp.mozilla.org/pub/mozilla.org/mobile/releases/latest/
[8]: https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12
[9]: https://help.apple.com/simulator/mac/current/#/
[10]: https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/
[11]: https://www.browserstack.com/automate
[12]: https://saucelabs.com/
[13]: https://www.sigos.com/app-experience/
