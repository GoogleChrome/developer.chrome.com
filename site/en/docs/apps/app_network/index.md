---
layout: "layouts/doc-post.njk"
title: "Network Communications"
date: 2012-09-17
updated: 2014-11-13
description: How to use TCP and UDP in your Chrome App.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

Chrome Apps can act as a network client for TCP and UDP connections. This doc shows you how to use
TCP and UDP to send and receive data over the network. For more information, see the [Sockets
UDP][3], [Sockets TCP][4] and [Sockets TCP Server][5] APIs.

{% Aside %}

**Note:** The previous version of the networking APIs ([socket][6]) has been deprecated.

{% endAside %}

{% Aside %}

**API Samples:** Want to play with the code? Check out the [telnet][7] and [udp][8] samples.

{% endAside %}

## Manifest requirements {: #manifest }

For Chrome Apps that use TCP or UDP, add the [sockets][9] entry to the manifest and specify the IP
end point permission rules. For example:

```json
"sockets": {
    "udp": {
      "send": ["host-pattern1", ...],
      "bind": ["host-pattern2", ...],
      ...
    },
    "tcp" : {
      "connect": ["host-pattern1", ...],
      ...
    },
    "tcpServer" : {
      "listen": ["host-pattern1", ...],
      ...
    }
  }
```

The syntax of socket "host-pattern" entries follows these rules:

```text
<host-pattern> := <host> | ':' <port> | <host> ':' <port>
<host> := '*' | '*.' <anychar except '/' and '*'>+
<port> := '*' | <port number between 1 and 65535>)
```

See [Sockets Manifest Key][10] for detailed description of the syntax.

Examples of socket manifest entries:

- `{ "tcp": { "connect" : "*:23" } }`–connecting on port 23 of any hosts
- `{ "tcp": { "connect" : ["*:23", "*:80"] } }`–connecting on port 23 or 80 of any hosts
- `{ "tcp": { "connect" : "www.example.com:23" } }`–connecting port 23 of _www.example.com_
- `{ "tcp": { "connect" : "" } }`–connecting any ports of any hosts
- `{ "udp": { "send" : ":99" } }`–sending UDP packet to port 99 of any hosts
- `{ "udp": { "bind" : ":8899" } }`–binding local port 8899 to receive UDP packets
- `{ "tcpServer": { "listen" : ":8080" } }`–TCP listening on local port 8080

## Using TCP {: #tcp }

Chrome Apps can make connections to any service that supports TCP.

### Connecting to a socket {: #connecting }

Here's a sample showing how to connect ([sockets.tcp.connect][11]) to a socket:

```js
chrome.sockets.tcp.create({}, function(createInfo) {
  chrome.sockets.tcp.connect(createInfo.socketId,
    IP, PORT, onConnectedCallback);
});
```

Keep a handle to the `socketId` so that you can later received and send data
([sockets.tcp.send][12]) to this socket.

### Receiving from and sending to a socket {: #reading }

Receiving from ([sockets.tcp.onReceive][13]) and sending to a socket uses ArrayBuffer objects. To
learn about ArrayBuffers, check out the overview, [JavaScript typed arrays][14], and the tutorial,
[How to convert ArrayBuffer to and from String][15].

```js
chrome.sockets.tcp.send(socketId, arrayBuffer, onSentCallback);
```

```js
chrome.sockets.tcp.onReceive.addListener(function(info) {
  if (info.socketId != socketId)
    return;
  // info.data is an arrayBuffer.
});
```

### Disconnecting from a socket {: #disconnecting }

Here's how to disconnect ([sockets.tcp.disconnect][16]):

```js
chrome.sockets.tcp.disconnect(socketId);
```

## Using UDP {: #udp }

Chrome Apps can make connections to any service that supports UDP.

### Sending data {: #sending }

Here's a sample showing how to send data ([sockets.udp.send][17]) over the network using UDP:

```js
// Create the Socket
chrome.sockets.udp.create({}, function(socketInfo) {
  // The socket is created, now we can send some data
  var socketId = socketInfo.socketId;
  chrome.sockets.udp.send(socketId, arrayBuffer,
    '127.0.0.1', 1337, function(sendInfo) {
      console.log("sent " + sendInfo.bytesSent);
  });
});
```

### Receiving data {: #receiving }

This example is very similar to the 'Sending data' example, except we setup an event handler for
receiving data.

```js
var socketId;

// Handle the "onReceive" event.
var onReceive = function(info) {
  if (info.socketId !== socketId)
    return;
  console.log(info.data);
};

// Create the Socket
chrome.sockets.udp.create({}, function(socketInfo) {
  socketId = socketInfo.socketId;
  // Setup event handler and bind socket.
  chrome.sockets.udp.onReceive.addListener(onReceive);
  chrome.sockets.udp.bind(socketId,
    "0.0.0.0", 0, function(result) {
      if (result < 0) {
        console.log("Error binding socket.");
        return;
      }
      chrome.sockets.udp.send(socketId, arrayBuffer,
        '127.0.0.1', 1337, function(sendInfo) {
          console.log("sent " + sendInfo.bytesSent);
      });
  });
});
```

## Using TCP Server {: #tcpServer }

Chrome Apps can act as TCP servers using the [sockets.tcpServer][18] API.

### Creating a TCP server socket {: #creating-server }

Create a TCP server socket with [sockets.tcpServer.create][19].

```js
chrome.sockets.tcpServer.create({}, function(createInfo) {
  listenAndAccept(createInfo.socketId);
});
```

### Accepting client connections {: #accepting }

Here's a sample showing how to accept connections ([sockets.tcpServer.listen][20]) on a TCP server
socket:

```js
function listenAndAccept(socketId) {
  chrome.sockets.tcpServer.listen(socketId,
    IP, PORT, function(resultCode) {
      onListenCallback(socketId, resultCode)
  });
}
```

Keep a handle to the `socketId` so that you can later accept new connections
([sockets.tcpServer.onAccept][21]) .

```js
var serverSocketId;
function onListenCallback(socketId, resultCode) {
  if (resultCode < 0) {
    console.log("Error listening:" +
      chrome.runtime.lastError.message);
    return;
  }
  serverSocketId = socketId;
  chrome.sockets.tcpServer.onAccept.addListener(onAccept)
}
```

When a new connection is established, `onAccept` is invoked with the `clientSocketId` of the new TCP
connection. The client socket ID must be used with the [sockets.tcp][22] API. The socket of the new
connection is paused by default. Un-pause it with [sockets.tcp.setPaused][23] to start receiving
data.

```js
function onAccept(info) {
  if (info.socketId != serverSocketId)
    return;

  // A new TCP connection has been established.
  chrome.sockets.tcp.send(info.clientSocketId, data,
    function(resultCode) {
      console.log("Data sent to new TCP client connection.")
  });
  // Start receiving data.
  chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
    if (recvInfo.socketId != info.clientSocketId)
      return;
    // recvInfo.data is an arrayBuffer.
  });
  chrome.sockets.tcp.setPaused(false);
}
```

### Stop accepting client connections {: #stop-accepting }

Call [sockets.tcp.disconnect][24] on the server socket ID to stop accepting new connections.

```js
chrome.sockets.tcpServer.onAccept.removeListener(onAccept);
chrome.sockets.tcpServer.disconnect(serverSocketId);
```

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: sockets_udp
[4]: sockets_tcp
[5]: sockets_tcp_server
[6]: /apps/socket
[7]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/telnet
[8]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/udp
[9]: manifest/sockets
[10]: manifest/sockets
[11]: /apps/sockets.tcp#method-connect
[12]: /apps/sockets.tcp#method-send
[13]: /apps/sockets.tcp#event-onReceive
[14]: https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays
[15]: http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
[16]: /apps/sockets.tcp#method-disconnect
[17]: /apps/sockets.udp#method-send
[18]: /apps/sockets.tcpServer
[19]: /apps/sockets.tcpServer#method-create
[20]: /apps/sockets.tcpServer#method-listen
[21]: /apps/sockets.tcpServer#event-onAccept
[22]: /apps/sockets.tcp
[23]: /apps/sockets.tcp#method-setPaused
[24]: /apps/sockets.tcp#method-disconnect
