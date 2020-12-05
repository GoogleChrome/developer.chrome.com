---
api: vpnProvider
---

## Usage

Typical usage of vpnProvider is as follows:

* Create VPN configurations using the [`createConfig`][1] method. A VPN configuration is a persistent entry shown to the user in a native Chrome OS UI. The user can select a VPN configuration from a list and connect to it or disconnect from it.

* Add listeners to the events [`onPlatformMessage`][2], [`onPacketReceived`][3] and [`onConfigRemoved`][4].

* When the user connects to the VPN configuration, [`onPlatformMessage`][2] will be received with the message `"connected"`. We refer to the period between the messages `"connected"` and `"disconnected"` as a VPN session. In this time period, the extension that receives the message is said to own the VPN session.

* Initiate connection to the VPN server and start the VPN client.

* Set the Parameters of the connection using [`setParameters`][5].

* Notify the connection state as `"connected"` using [`notifyConnectionStateChanged`][6].

* When the steps above are completed without errors, a virtual tunnel is created to the network stack of Chrome OS. IP packets can be sent through the tunnel using [`sendPacket`][7] and any packets originating on the Chrome OS device will be received using the event [`onPacketReceived`][3].

* When the user disconnects from the VPN configuration, [`onPlatformMessage`][2] will be fired with the message `"disconnected"`.

* If the VPN configuration is no longer necessary, it can be destroyed using [`destroyConfig`][8].

[1]: #method-createConfig
[2]: #event-onPlatformMessage
[3]: #event-onPacketReceived
[4]: #event-onConfigRemoved
[5]: #method-setParameters
[6]: #method-notifyConnectionStateChanged
[7]: #method-sendPacket
[8]: #method-destroyConfig