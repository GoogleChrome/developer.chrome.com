---
layout: 'layouts/blog-post.njk'
title: Is Project Fugu "done"?
subtitle: >
  Now that the Project Fugu team has implemented the basic building blocks for creating advanced web
  app experiences, a natural question that arises is whether the project is "done". Spoiler alert:
  no!
description:
  This article focuses on the shifted focus of the Project Fugu team from implementing new
  capabilities to refining and improving the existing ones.
authors:
  - thomassteiner
date: 2022-09-07
# updated: 2022-09-07
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/8FZcBmFowbDKWxpkOytx.jpg
alt: Blowfish swarm swimming in the ocean.
tags:
  - capabilities
---

With one of the Project Fugu team's objectives being to make it possible for developers to do
anything on the web that platform-specific apps can, the team has been incredibly busy with adding
missing features web developers needed to "close this app gap". If you don't believe me, just look
at the ["Shipped" section](https://fugu-tracker.web.app/#shipped) on the Fugu API tracker. Here are
all the 55(!) shipped at the time of this writing APIs in order of least recently to most recently
shipped:

<div class="table-wrapper scrollbar">
  <table>
    <thead>
      <tr>
        <th>API name</th>
        <th>Shipped in</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><a href="https://crbug.com/419413">Web Bluetooth API</a></td><td>Chrome 56</td></tr>
      <tr><td><a href="https://crbug.com/492204">WebUSB API</a></td><td>Chrome 61</td></tr>
      <tr><td><a href="https://crbug.com/668389">Web Share Target</a></td><td>Chrome 71</td></tr>
      <tr><td><a href="https://crbug.com/903010">Web Share API Level 2</a></td><td>Chrome 75</td></tr>
      <tr><td><a href="https://crbug.com/150835">Async Clipboard: Read and Write Images</a></td><td>Chrome 76</td></tr>
      <tr><td><a href="https://crbug.com/885313">Web Share Target Level 2</a></td><td>Chrome 76</td></tr>
      <tr><td><a href="https://crbug.com/634330">Enter Key Hint</a></td><td>Chrome 77</td></tr>
      <tr><td><a href="https://crbug.com/897276">Expand Storage Quota</a></td><td>Chrome 78</td></tr>
      <tr><td><a href="https://crbug.com/895854">Get Installed Related Apps API</a></td><td>Chrome 80</td></tr>
      <tr><td><a href="https://crbug.com/925297">Periodic Background Sync</a></td><td>Chrome 80</td></tr>
      <tr><td><a href="https://crbug.com/1007151">desktop-pwas: Support "minimal-ui" display mode</a></td><td>Chrome 80</td></tr>
      <tr><td><a href="https://crbug.com/897298">Compression codecs</a></td><td>Chrome 80</td></tr>
      <tr><td><a href="https://crbug.com/860467">Contacts API</a></td><td>Chrome 80</td></tr>
      <tr><td><a href="https://crbug.com/719176">Badging API</a></td><td>Chrome 81</td></tr>
      <tr><td><a href="https://crbug.com/937720">Allow the Badging API to be used from a service worker via Push</a></td><td>Chrome 81</td></tr>
      <tr><td><a href="https://crbug.com/659138">Barcode Detection API</a></td><td>Chrome 83</td></tr>
      <tr><td><a href="https://crbug.com/973844">Content Indexing API</a></td><td>Chrome 84</td></tr>
      <tr><td><a href="https://crbug.com/670299">WebOTP</a></td><td>Chrome 84</td></tr>
      <tr><td><a href="https://crbug.com/257511">Screen Wake Lock API</a></td><td>Chrome 84</td></tr>
      <tr><td><a href="https://crbug.com/894838">Streams API: transferable streams</a></td><td>Chrome 85</td></tr>
      <tr><td><a href="https://crbug.com/955497">App shortcuts</a></td><td>Chrome 85</td></tr>
      <tr><td><a href="https://crbug.com/853326">File System Access</a></td><td>Chrome 86</td></tr>
      <tr><td><a href="https://crbug.com/931839">text/html support for async clipboard api</a></td><td>Chrome 86</td></tr>
      <tr><td><a href="https://crbug.com/934063">Pan/Tilt support for Camera</a></td><td>Chrome 87</td></tr>
      <tr><td><a href="https://crbug.com/1136480">FUGU Implement capture of system and application audio output to headphones and speakers </a></td><td>Chrome 88</td></tr>
      <tr><td><a href="https://crbug.com/982379">PointerLock unadjustedMovement</a></td><td>Chrome 88</td></tr>
      <tr><td><a href="https://crbug.com/895776">Create a Photo/Video picker similar to the Photo Picker on Android</a></td><td>Chrome 88</td></tr>
      <tr><td><a href="https://crbug.com/1035527">Web Share (navigator.share) integration with Windows 10</a></td><td>Chrome 88</td></tr>
      <tr><td><a href="https://crbug.com/520391">Web NFC</a></td><td>Chrome 89</td></tr>
      <tr><td><a href="https://crbug.com/890096">WebHID (Human Interface Device)</a></td><td>Chrome 89</td></tr>
      <tr><td><a href="https://crbug.com/884928">Web Serial API</a></td><td>Chrome 89</td></tr>
      <tr><td><a href="https://crbug.com/770595">Web Share on Desktop</a></td><td>Chrome 89</td></tr>
      <tr><td><a href="https://crbug.com/1207667">Handwriting Recognition API</a></td><td>Chrome 90</td></tr>
      <tr><td><a href="https://crbug.com/1141849">Managed configuration for Web Applications</a></td><td>Chrome 91</td></tr>
      <tr><td><a href="https://crbug.com/897302">Run PWA on OS Login</a></td><td>Chrome 91</td></tr>
      <tr><td><a href="https://crbug.com/897297">WebCodecs</a></td><td>Chrome 93</td></tr>
      <tr><td><a href="https://crbug.com/878979">Idle Detection</a></td><td>Chrome 94</td></tr>
      <tr><td><a href="https://crbug.com/897309">EyeDropper API</a></td><td>Chrome 95</td></tr>
      <tr><td><a href="https://crbug.com/1069293">App Icon Shortcut menu for PWAs on macOS and Linux</a></td><td>Chrome 96</td></tr>
      <tr><td><a href="https://crbug.com/1019239">URL Protocol Handler Registration for PWAs </a></td><td>Chrome 96</td></tr>
      <tr><td><a href="https://crbug.com/1011392">WebTransport</a></td><td>Chrome 97</td></tr>
      <tr><td><a href="https://crbug.com/698793">Clipboard: Pasting retina-images loses pHYs metadata.</a></td><td>Chrome 98</td></tr>
      <tr><td><a href="https://crbug.com/957043">PWA should be able to be uninstalled the same way a "real app" can</a></td><td>Chrome 99</td></tr>
      <tr><td><a href="https://crbug.com/1275576">Web NFC: NDEFReader makeReadOnly()</a></td><td>Chrome 100</td></tr>
      <tr><td><a href="https://crbug.com/897300">Multi-Screen Window Placement</a></td><td>Chrome 100</td></tr>
      <tr><td><a href="https://crbug.com/1279822">HIDDevice forget()</a></td><td>Chrome 100</td></tr>
      <tr><td><a href="https://crbug.com/1299351">USBDevice forget()</a></td><td>Chrome 101</td></tr>
      <tr><td><a href="https://crbug.com/1274922">Web USB sameObject behavior</a></td><td>Chrome 101</td></tr>
      <tr><td><a href="https://crbug.com/937121">Window Controls Overlay for Installed Desktop Web Apps</a></td><td>Chrome 102</td></tr>
      <tr><td><a href="https://crbug.com/829689">File Handling</a></td><td>Chrome 102</td></tr>
      <tr><td><a href="https://crbug.com/1310149">chrome.management API can no longer interact with PWA apps</a></td><td>Chrome 102</td></tr>
      <tr><td><a href="https://crbug.com/1312010">SerialPort forget()</a></td><td>Chrome 103</td></tr>
      <tr><td><a href="https://crbug.com/535764">Local Font Access</a></td><td>Chrome 103</td></tr>
      <tr><td><a href="https://crbug.com/1327857">Fugu Request: Dynamic App Shortcuts (Shortcuts v2)</a></td><td>Chrome 104</td></tr>
      <tr><td><a href="https://crbug.com/106449">Web Custom formats for Async Clipboard API</a></td><td>Chrome 104</td></tr>
</tbody>
    <caption>
      All shipped Fugu APIs so far.
    </caption>
  </table>
</div>
