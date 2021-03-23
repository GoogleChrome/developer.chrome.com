---
layout: "layouts/doc-post.njk"
title: "Remote debug Android devices"
authors:
  - kaycebasques
date: 2015-04-13
#updated: YYYY-MM-DD
description:
  "Remote debug live content on an Android device from a Windows, Mac, or Linux computer."
---

Remote debug live content on an Android device from your Windows, Mac, or Linux computer. This
tutorial teaches you how to:

- Set up your Android device for remote debugging, and discover it from your development machine.
- Inspect and debug live content on your Android device from your development machine.
- Screencast content from your Android device onto a DevTools instance on your development machine.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/NIeeTMc8eH6hDiA3IX0Y.png", alt="Remote debugging diagram", width="800", height="317" %}

**Figure 1**. Remote Debugging lets you inspect a page running on an Android device from your
development machine.

## Step 1: Discover your Android device {: #discover }

The workflow below works for most users. See [Troubleshooting: DevTools is not detecting the Android
device][1] for more help.

1.  Open the **Developer Options** screen on your Android. See [Configure On-Device Developer
    Options][2].
2.  Select **Enable USB Debugging**.
3.  On your development machine, open Chrome.
4.  Go to `chrome://inspect#devices`.
5.  Make sure that the **Discover USB devices** checkbox is enabled.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/4P4G0Hmt3CbDkqMoTOiY.png", alt="The Discover USB Devices checkbox is enabled.", width="800", height="587" %}

    **Figure 2**. The **Discover USB Devices** checkbox is enabled

6.  Connect your Android device directly to your development machine using a USB cable. The first
    time you do this, you usually see that DevTools has detected an offline device. If you see the
    model name of your Android device, then DevTools has successfully established the connection to
    your device. Continue to [Step 2][3].

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/7Iy1yVH62Xz40tbiwgRg.png", alt="The Remote Target has successfully detected an offline device that is pending authorization.", width="800", height="587" %}

    **Figure 3**. The **Remote Target** has successfully detected an offline device that is pending
    authorization

7.  If your device is showing up as **Offline**, accept the **Allow USB Debugging** permission
    prompt on your Android device.

### Troubleshooting: DevTools is not detecting the Android device {: #troubleshooting }

Make sure that your hardware is set up correctly:

- If you're using a USB hub, try connecting your Android device directly to your development machine
  instead.
- Try unplugging the USB cable between your Android device and development machine, and then
  plugging it back in. Do it while your Android and development machine screens are unlocked.
- Make sure that your USB cable works. You should be able to inspect files on your Android device
  from your development machine.

Make sure that your software is set up correctly:

- If your development machine is running Windows, try manually installing the USB drivers for your
  Android device. See [Install OEM USB Drivers][4].
- Some combinations of Windows and Android devices (especially Samsung) require extra set up. See
  [Chrome DevTools Devices does not detect device when plugged in][5].

If you don't see the **Allow USB Debugging** prompt on your Android device try:

- Disconnecting and then re-connecting the USB cable while DevTools is in focus on your development
  machine and your Android homescreen is showing. In other words, sometimes the prompt doesn't show
  up when your Android or development machine screens are locked.
- Updating the display settings for your Android device and development machine so that they never
  go to sleep.
- Setting Android's USB mode to PTP. See [Galaxy S4 does not show Authorize USB debugging dialog
  box][6].
- Select **Revoke USB Debugging Authorizations** from the **Developer Options** screen on your
  Android device to reset it to a fresh state.

If you find a solution that is not mentioned in this section or in [Chrome DevTools Devices does not
detect device when plugged in][7], please add an answer to that Stack Overflow question, or [open an
issue in the webfundamentals repository][8]!

## Step 2: Debug content on your Android device from your development machine {: #debug }

1.  Open Chrome on your Android device.
2.  In the **`chrome://inspect/#devices`**, you see your Android device's model name, followed by
    its serial number. Below that, you can see the version of Chrome that's running on the device,
    with the version number in parentheses. Each open Chrome tab gets its own section. You can
    interact with that tab from this section. If there are any apps using WebView, you see a section
    for each of those apps, too. In **Figure 5** there are no tabs or WebViews open.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/y1pMOU5sSvCLPct4J480.png", alt="A connected remote device.", width="800", height="587" %}

    **Figure 4**. A connected remote device

3.  In the **Open tab with url** text box, enter a URL and then click **Open**. The page opens in a
    new tab on your Android device.
4.  Click **Inspect** next to the URL that you just opened. A new DevTools instance opens. The
    version of Chrome running on your Android device determines the version of DevTools that opens
    on your development machine. So, if your Android device is running a very old version of Chrome,
    the DevTools instance may look very different than what you're used to.

### More actions: pause, focus, reload, or close a tab {: #more-actions }

Below the URL you can find a menu to pause, focus, reload or close a tab.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/JaZPnZlDhAywdFkn8vNm.png", alt="The menu for pausing, reloading, focusing, or closing a tab.", width="800", height="255" %}

**Figure 5**. The menu for pausing, reloading, focusing, or closing a tab

### Inspect elements {: #inspect }

Go to the **Elements** panel of your DevTools instance, and hover over an element to highlight it in
the viewport of your Android device.

You can also tap an element on your Android device screen to select it in the **Elements** panel.
Click **Select Element** {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/y9AaD4jeSmPRG4sQSylM.png", alt="Select Element", width="42", height="40" %} on your
DevTools instance, and then tap the element on your Android device screen. Note that **Select
Element** is disabled after the first touch, so you need to re-enable it every time you want to use
this feature.

### Screencast your Android screen to your development machine {: #screencast }

Click **Toggle Screencast**
{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/A5AtRECWSgsdtMZkI6g5.png", alt="Toggle Screencast", width="44", height="44" %} to view
the content of your Android device in your DevTools instance.

You can interact with the screencast in multiple ways:

- Clicks are translated into taps, firing proper touch events on the device.
- Keystrokes on your computer are sent to the device.
- To simulate a pinch gesture, hold Shift while dragging.
- To scroll, use your trackpad or mouse wheel, or fling with your mouse pointer.

Some notes on screencasts:

- Screencasts only display page content. Transparent portions of the screencast represent device
  interfaces, such as the Chrome address bar, the Android status bar, or the Android keyboard.
- Screencasts negatively affect frame rates. Disable screencasting while measuring scrolls or
  animations to get a more accurate picture of your page's performance.
- If your Android device screen locks, the content of your screencast disappears. Unlock your
  Android device screen to automatically resume the screencast.

[1]: #troubleshooting
[2]: https://developer.android.com/studio/debug/dev-options.html
[3]: #debug
[4]: https://developer.android.com/tools/extras/oem-usb.html
[5]: https://stackoverflow.com/questions/21925992
[6]: https://android.stackexchange.com/questions/101933
[7]: https://stackoverflow.com/questions/21925992
[8]: https://github.com/google/webfundamentals/issues/new?title=%5BRemote%20Debugging%5D
