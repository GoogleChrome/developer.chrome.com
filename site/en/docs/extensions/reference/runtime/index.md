---
api: runtime
---
The runtime API provides methods to support a number of areas:

<dl>
<dt>Message passing</dt>
<dd><ul>
<li>connect runtime.connect(extensionId: string, connectInfo: object): Port</li>
<li>connectNative runtime.connectNative(application: string): Port</li>
<li>sendMessage runtime.sendMessage(extensionId?: string, message: any, options: object, 
responseCallback: function)</li>
<li>sendNativeMessage runtime.sendNativeMessage(application: string, message: object, 
responseCallback: function)</li>
</ul></dd>

<dt>Accessing extension and platform metadata</dt>
<dd><ul>
<li>getBackgroundPage runtime.getBackgroundPage(callback: function)</li>
<li>getManifest runtime.getManifest(): object</li>
<li>getPackageDirectoryEntry runtime.getPackageDirectoryEntry(callback: function)</li>
<li>getPlatformInfo runtime.getPlatformInfo(callback: function)</li>
</ul></dd>

<dt>Managing extension execution and lifecycle</dt>
<dd><ul>
<li>reload runtime.reload()</li>
<li>requestUpdateCheck runtime.requestUpdateCheck(callback: function)</li>
<li>restart runtime.restart()</li>
<li>restartAfterDelay runtime.restartAfterDelay(seconds: number, callback: function)</li>
<li>setUninstallURL runtime.setUninstallURL(url: string, callback: function)</li>
<li>openOptionsPage runtime.openOptionsPage(callback: function)</li>
</ul></dd>

<dt>Helper utilities</dt>
<dd><ul>
<li>getURL runtime.getURL(path: string): string</li>
</ul></dd>

</dl>


## Manifest

There are no permissions or other manifest requirements for the runtime API.



