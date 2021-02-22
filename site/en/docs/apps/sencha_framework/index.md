---
layout: "layouts/doc-post.njk"
title: "Build Apps with Sencha Ext JS"
date: 2012-10-11
updated: 2017-03-01
description: How to build Chrome Apps with the Sencha Ext JS framework.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

The goal of this doc is to get you started on building Chrome Apps with the [Sencha Ext JS][3]
framework. To achieve this goal, we will dive into a media player app built by Sencha. The [source
code][4] and [API Documentation][5] are available on GitHub.

This app discovers a user's available media servers, including media devices connected to the pc and
software that manages media over the network. Users can browse media, play over the network, or save
offline.

Here are the key things you must do to build a media player app using Sencha Ext JS:

- Create manifest, `manifest.json`.
- Create [event page][6], `background.js`.
- [Sandbox][7] app's logic.
- Communicate between Chrome App and sandboxed files.
- Discover media servers.
- Explore and play media.
- Save media offline.

## Create manifest {: #first }

All Chrome Apps require a [manifest file][8] which contains the information Chrome needs to launch
apps. As indicated in the manifest, the media player app is "offline_enabled"; media assets can be
saved locally, accessed and played regardless of connectivity.

The "sandbox" field is used to sandbox the app's main logic in a unique origin. All sandboxed
content is exempt from the Chrome App [Content Security Policy][9], but cannot directly access the
Chrome App APIs. The manifest also includes the "socket" permission; the media player app uses the
[socket API][10] to connect to a media server over the network.

```json
{
    "name": "Video Player",
    "description": "Features network media discovery and playlist management",
    "version": "1.0.0",
    "manifest_version": 2,
    "offline_enabled": true,
    "app": {
        "background": {
            "scripts": [
                "background.js"
            ]
        }
    },
    ...

    "sandbox": {
        "pages": ["sandbox.html"]
    },
    "permissions": [
        "experimental",
        "http://*/*",
        "unlimitedStorage",
        {
            "socket": [
                "tcp-connect",
                "udp-send-to",
                "udp-bind"
            ]
        }
    ]
}
```

## Create event page {: #second }

All Chrome Apps require `background.js` to launch the application. The media player's main page,
`index.html`, opens in a window with the specified dimensions:

```js
chrome.app.runtime.onLaunched.addListener(function(launchData) {
    var opt = {
        width: 1000,
        height: 700
    };

    chrome.app.window.create('index.html', opt, function (win) {
        win.launchData = launchData;
    });

});
```

## Sandbox app's logic {: #three }

Chrome Apps run in a controlled environment that enforces a strict [Content Security Policy
(CSP)][11]. The media player app needs some higher privileges to render the Ext JS components. To
comply with CSP and execute the app logic, the app's main page, `index.html`, creates an iframe that
acts as a sandbox environment:

```html
<iframe id="sandbox-frame" sandbox="allow-scripts" src="sandbox.html"></iframe>
```

The iframe points to [sandbox.html][12] which includes the files required for the Ext JS
application:

```html
<html>
<head>
    <link rel="stylesheet" type="text/css" href="resources/css/app.css" />'
    <script src="sdk/ext-all-dev.js"></script>'
    <script src="lib/ext/data/PostMessage.js"></script>'
    <script src="lib/ChromeProxy.js"></script>'
    <script src="app.js"></script>
</head>
<body></body>
</html>
```

The [app.js][13] script executes all the Ext JS code and renders the media player views. Since this
script is sandboxed, it cannot directly access the Chrome App APIs. Communication between `app.js`
and non-sandboxed files is done using the [HTML5 Post Message API][14].

## Communicate between files {: #four }

In order for the media player app to access Chrome App APIs, like query the network for media
servers, `app.js` posts messages to [index.js][15]. Unlike the sandboxed `app.js`, `index.js` can
directly access the Chrome App APIs.

`index.js` creates the iframe:

```js
var iframe = document.getElementById('sandbox-frame');

iframeWindow = iframe.contentWindow;
```

And listens for messages from the sandboxed files:

```js
window.addEventListener('message', function(e) {
    var data= e.data,
        key = data.key;

    console.log('[index.js] Post Message received with key ' + key);

    switch (key) {
        case 'extension-baseurl':
            extensionBaseUrl(data);
            break;

        case 'upnp-discover':
            upnpDiscover(data);
            break;

        case 'upnp-browse':
            upnpBrowse(data);
            break;

        case 'play-media':
            playMedia(data);
            break;

        case 'download-media':
            downloadMedia(data);
            break;

        case 'cancel-download':
            cancelDownload(data);
            break;

        default:
            console.log('[index.js] unidentified key for Post Message: "' + key + '"');
    }
}, false);
```

In the following example, `app.js` sends a message to `index.js` requesting the key
'extension-baseurl':

```js
Ext.data.PostMessage.request({
    key: 'extension-baseurl',
    success: function(data) {
        //...
    }
});
```

`index.js` receives the request, assigns the result, and replies by sending the Base URL back:

```js
function extensionBaseUrl(data) {
    data.result = chrome.extension.getURL('/');
    iframeWindow.postMessage(data, '*');
}
```

## Discover media servers {: #five }

There's a lot that goes into discovering media servers. At a high level, the discovery workflow is
initiated by a user action to search for available media servers. The [MediaServer controller][16]
posts a message to `index.js`; `index.js` listens for this message and when received, calls
[Upnp.js][17].

The `Upnp library` uses the Chrome App [socket API][18] to connect the media player app with any
discovered media servers and receive media data from the media server. `Upnp.js` also uses
[soapclient.js][19] to parse the media server data. The remainder of this section describes this
workflow in more detail.

### Post message {: #post }

When a user clicks the Media Servers button in the center of the media player app, `MediaServers.js`
calls `discoverServers()`. This function first checks for any outstanding discovery requests, and if
true, aborts them so the new request can be initiated. Next, the controller posts a message to
`index.js` with a key upnp-discovery, and two callback listeners:

```js
me.activeDiscoverRequest = Ext.data.PostMessage.request({
    key: 'upnp-discover',
    success: function(data) {
        var items = [];
        delete me.activeDiscoverRequest;

        if (serversGraph.isDestroyed) {
            return;
        }

        mainBtn.isLoading = false;
        mainBtn.removeCls('pop-in');
        mainBtn.setIconCls('ico-server');
        mainBtn.setText('Media Servers');

        //add servers
        Ext.each(data, function(server) {
            var icon,
                urlBase = server.urlBase;

            if (urlBase) {
                if (urlBase.substr(urlBase.length-1, 1) === '/'){
                        urlBase = urlBase.substr(0, urlBase.length-1);
                }
            }

            if (server.icons && server.icons.length) {
                if (server.icons[1]) {
                    icon = server.icons[1].url;
                }
                else {
                    icon = server.icons[0].url;
                }

                icon = urlBase + icon;
            }

            items.push({
                itemId: server.id,
                text: server.friendlyName,
                icon: icon,
                data: server
            });
        });

        ...
    },
    failure: function() {
        delete me.activeDiscoverRequest;

        if (serversGraph.isDestroyed) {
            return;
        }

        mainBtn.isLoading = false;
        mainBtn.removeCls('pop-in');
        mainBtn.setIconCls('ico-error');
        mainBtn.setText('Error...click to retry');
    }
});
```

### Call upnpDiscover() {: #call }

`index.js` listens for the 'upnp-discover' message from `app.js` and responds by calling
`upnpDiscover()`. When a media server is discovered, `index.js` extracts the media server domain
from the parameters, saves the server locally, formats the media server data, and pushes the data to
the `MediaServer` controller.

### Parse media server data {: #parse }

When `Upnp.js` discovers a new media server, it then retrieves a description of the device and sends
a Soaprequest to browse and parse the media server data; `soapclient.js` parses the media elements
by tag name into a document.

### Connect to media server {: #connect }

`Upnp.js` connects to discovered media servers and receives media data using the Chrome App socket
API:

```js
socket.create("udp", {}, function(info) {
    var socketId = info.socketId;

    //bind locally
    socket.bind(socketId, "0.0.0.0", 0, function(info) {

        //pack upnp message
        var message = String.toBuffer(UPNP_MESSAGE);

        //broadcast to upnp
        socket.sendTo(socketId, message, UPNP_ADDRESS, UPNP_PORT, function(info) {

            // Wait 1 second
            setTimeout(function() {

                //receive
                socket.recvFrom(socketId, function(info) {

                    //unpack message
                    var data        = String.fromBuffer(info.data),
                        servers     = [],
                        locationReg = /^location:/i;

                    //extract location info
                    if (data) {
                        data = data.split("\r\n");

                        data.forEach(function(value) {
                            if (locationReg.test(value)){
                                servers.push(value.replace(locationReg, "").trim());
                            }
                        });
                    }

                    //success
                    callback(servers);
                });

            }, 1000);
        });
    });
});
```

## Explore and play media {: #six }

The [MediaExplorer controller][20] lists all the media files inside a media server folder and is
responsible for updating the breadcrumb navigation in the media player app window. When a user
selects a media file, the controller posts a message to `index.js` with the 'play-media' key:

```js
onFileDblClick: function(explorer, record) {
    var serverPanel, node,
        type    = record.get('type'),
        url     = record.get('url'),
        name    = record.get('name'),
        serverId= record.get('serverId');

    if (type === 'audio' || type === 'video') {
        Ext.data.PostMessage.request({
            key     : 'play-media',
            params  : {
                url: url,
                name: name,
                type: type
            }
        });
    }
},
```

`index.js` listens for this post message and responds by calling `playMedia()`:

```js
function playMedia(data) {
    var type        = data.params.type,
        url         = data.params.url,
        playerCt    = document.getElementById('player-ct'),
        audioBody   = document.getElementById('audio-body'),
        videoBody   = document.getElementById('video-body'),
        mediaEl     = playerCt.getElementsByTagName(type)[0],
        mediaBody   = type === 'video' ? videoBody : audioBody,
        isLocal     = false;

    //save data
    filePlaying = {
        url : url,
        type: type,
        name: data.params.name
    };

    //hide body els
    audioBody.style.display = 'none';
    videoBody.style.display = 'none';

    var animEnd = function(e) {

        //show body el
        mediaBody.style.display = '';

        //play media
        mediaEl.play();

        //clear listeners
        playerCt.removeEventListener( 'transitionend', animEnd, false );
        animEnd = null;
    };

    //load media
    mediaEl.src = url;
    mediaEl.load();

    //animate in player
    playerCt.addEventListener( 'transitionend', animEnd, false );
    playerCt.style.transform = "translateY(0)";

    //reply postmessage
    data.result = true;
    sendMessage(data);
}
```

## Save media offline {: #seven }

Most of the hard work to save media offline is done by the [filer.js library][21]. You can read more
this library in [Introducing filer.js][22].

The process kicks off when a user selects one or more files and initiates the 'Take offline' action.
The [MediaExplorer controller][23] posts a message to `index.js` with a key 'download-media';
`index.js` listens for this message and calls the `downloadMedia()` function to initiate the
download process:

```js
function downloadMedia(data) {
        DownloadProcess.run(data.params.files, function() {
            data.result = true;
            sendMessage(data);
        });
    }
```

The `DownloadProcess` utility method creates an xhr request to get data from the media server and
waits for completion status. This initiates the onload callback which checks the received content
and saves the data locally using the `filer.js` function:

```js
filer.write(
    saveUrl,
    {
        data: Util.arrayBufferToBlob(fileArrayBuf),
        type: contentType
    },
    function(fileEntry, fileWriter) {

        console.log('file saved!');

        //increment downloaded
        me.completedFiles++;

        //if reached the end, finalize the process
        if (me.completedFiles === me.totalFiles) {

            sendMessage({
                key             : 'download-progresss',
                totalFiles      : me.totalFiles,
                completedFiles  : me.completedFiles
            });

            me.completedFiles = me.totalFiles = me.percentage = me.downloadedFiles = 0;
            delete me.percentages;

            //reload local
            loadLocalFiles(callback);
        }
    },
    function(e) {
        console.log(e);
    }
);
```

When the download process is finished, `MediaExplorer` updates the media file list and the media
player tree panel.

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: http://www.sencha.com/products/extjs
[4]: https://github.com/GoogleChrome/sencha-video-player-app
[5]: http://senchaprosvcs.github.com/GooglePlayer/docs/output/#!/api
[6]: app_lifecycle#eventpage
[7]: app_external#sandboxing
[8]: manifest
[9]: contentSecurityPolicy
[10]: socket
[11]: contentSecurityPolicy
[12]: https://github.com/GoogleChrome/sencha-video-player-app/blob/master/sandbox.html
[13]: http://senchaprosvcs.github.com/GooglePlayer/docs/output/source/app.html#VP-Application
[14]: https://developer.mozilla.org/en-US/docs/DOM/window.postMessage
[15]: https://github.com/GoogleChrome/sencha-video-player-app/blob/master/index.js
[16]:
  https://github.com/GoogleChrome/sencha-video-player-app/blob/master/app/controller/MediaServers.js
[17]: https://github.com/GoogleChrome/sencha-video-player-app/blob/master/lib/Upnp.js
[18]: app_network
[19]: https://github.com/GoogleChrome/sencha-video-player-app/blob/master/lib/soapclient.js
[20]:
  https://github.com/GoogleChrome/sencha-video-player-app/blob/master/app/controller/MediaExplorer.js
[21]: https://github.com/GoogleChrome/sencha-video-player-app/blob/master/lib/filer.js
[22]: http://ericbidelman.tumblr.com/post/14866798359/introducing-filer-js
[23]:
  https://github.com/GoogleChrome/sencha-video-player-app/blob/master/app/controller/MediaExplorer.js
