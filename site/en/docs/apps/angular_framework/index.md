---
layout: "layouts/doc-post.njk"
title: "Build Apps with AngularJS"
date: 2012-11-16
updated: 2017-03-01
description: A guide on building Chrome Apps with AngularJS.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

This guide gets you started building Chrome Apps with the [AngularJS][3] MVC framework. To
illustrate Angular in action, we'll be referencing an actual app built using the framework, the
Google Drive Uploader. The [source code][4] is available on GitHub.

## About the app {: #first }

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/UbxLa9XoyBXX4BgqNqeJ.png", alt="Google Drive Uploader", height="680", width="580" %}

The Google Drive Uploader allows users to quickly view and interact with files stored in their
Google Drive account as well as upload new files using the [HTML Drag and Drop APIs][5]. It's a
great example of building an app which talks to one of [Google's APIs][6]; in this case, the Google
Drive API.

{% Aside %}

**Note:** You can also build apps which talk to 3rd party APIs/services that are OAuth2-enabled. See
[non-Google Account authentication][7].

{% endAside %}

The Uploader uses OAuth2 to access the user's data. The [chrome.identity API][8] handles fetching an
OAuth token for the logged-in user, so the hard work is done for us! Once we have a long-lived
access token, the apps uses the [Google Drive API][9] to access the user's data.

Key features this app uses:

- AngularJS's autodetection for [CSP][10]
- Render a list of files fetched from the [Google Drive API][11]
- [HTML5 Filesystem API][12] to store file icons offline
- [HTML5 Drag and Drop][13] for importing/uploading new files from the desktop
- XHR2 to load images, cross-domain
- [chrome.identity API][14] for OAuth authorization
- Chromeless frames to define the app's own navbar look and feel

## Creating the manifest {: #second }

All Chrome Apps require a `manifest.json` file which contains the information Chrome needs to launch
the app. The manifest contains relevant metadata and lists any special permissions the app needs to
run.

A stripped down version of the Uploader's manifest looks like this:

```json
{
  "name": "Google Drive Uploader",
  "version": "0.0.1",
  "manifest_version": 2,
  "oauth2": {
    "client_id": "665859454684.apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/drive"
    ]
  },
 ...
  "permissions": [
    "https://docs.google.com/feeds/",
    "https://docs.googleusercontent.com/",
    "https://spreadsheets.google.com/feeds/",
    "https://ssl.gstatic.com/",
    "https://www.googleapis.com/"
  ]
}
```

The most important parts of this manifest are the "oauth2" and "permissions" sections.

The "oauth2" section defines the required parameters by OAuth2 to do its magic. To create a
"client_id", follow the instructions in [Get your client id][15]. The "scopes" list the
authorization scopes that the OAuth token will be valid for (for example, the APIs the app wants to
access).

The "permissions" section includes URLs that the app will access via XHR2. The URL prefixes are
required in order for Chrome to know which cross-domain requests to allow.

## Creating the event page {: #three }

All Chrome Apps require a background script/page to launch the app and respond to system events.

In its [background.js][16] script, Drive Uploader opens a 500x600px window to the main page. It also
specifies a minimum height and width for the window so the content doesn't become too crunched:

```js
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('../main.html', {
    id: "GDriveExample",
    bounds: {
      width: 500,
      height: 600
    },
    minWidth: 500,
    minHeight: 600,
    frame: 'none'
  });
});
```

The window is created as a chromeless window (frame: 'none'). By default, windows render with the
OS's default close/expand/minimize bar:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ZCIALlecZwMUv7LW77hO.png", alt="Google Drive Uploader with no frame", height="75", width="508" %}

The Uploader uses `frame: 'none'` to render the window as a "blank slate" and creates a custom close
button in `main.html`:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/IDJ8RCDPcatsI60AQEni.png", alt="Google Drive Uploader with custom frame", height="50", width="504" %}

The entire navigational area is wrapped in a <nav> (see next section). To declutter the app a bit,
the custom close button is hidden until the user interacts with this the area:

```html
<style>
nav:hover #close-button {
  opacity: 1;
}

#close-button {
  float: right;
  padding: 0 5px 2px 5px;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
</style>
```

```html
<button class="btn" id="close-button" title="Close">x</button>
```

In [app.js][17], this button is hooked up to `window.close()`.

## Designing the app the Angular way {: #four }

Angular is an MVC framework, so we need to define the app in such a way that a model, view, and
controller logically fall out of it. Luckily, this is trivial when using Angular.

The View is the easiest, so let's start there.

### Creating the view {: #view }

[main.html][18] is the "V" in MVC; where we define HTML templates to render data into. In Angular,
templates are simple blocks of HTML with some special sauce.

Ultimately we want to display the user's list of files. For that, a simple <ul> list makes sense.
The Angular bits are highlighted in bold:

```html
<ul>
  <li data-ng-repeat="doc in docs">
    <img data-ng-src="{{doc.icon}}"> <a href="{{doc.alternateLink}}">{{doc.title}}</a>
{{doc.size}}
    <span class="date">{{doc.updatedDate}}</span>
  </li>
</ul>
```

This reads exactly as it looks: stamp out an <li> for every doc in our data model "docs". Each item
contains a file icon, link to open the file on the web, and last updatedDate.

{% Aside %}

**Note:** To make the template valid HTML, we're using `data-*` attributes for Angular's
[ngRepeat][19] iterator, but you don't have to. You could easily write the repeater as
`<li ng-repeat="doc in docs">`.

{% endAside %}

Next, we need to tell Angular which controller will oversee this template's rendering. For that, we
use the [ngController][20] directive to tell the `DocsController` to have reign over the template
<body>:

```html
<body data-ng-controller="DocsController">
<section id="main">
  <ul>
    <li data-ng-repeat="doc in docs">
      <img data-ng-src="{{doc.icon}}"> <a href="{{doc.alternateLink}}">{{doc.title}}</a> {{doc.size}}
      <span class="date">{{doc.updatedDate}}</span>
    </li>
  </ul>
</section>
</body>
```

Keep in mind, what you don't see here is us hooking up event listeners or properties for data
binding. Angular is doing that heavy lifting for us!

The last step is to make Angular light up our templates. The typical way to do that is include the
[ngApp][21] directive all the way up on <html>:

```html
<html data-ng-app="gDriveApp">
```

You could also scope the app down to a smaller portion of the page if you wanted to. We only have
one controller in this app, but if we were to add more later, putting [ngApp][22] on the topmost
element makes the entire page Angular-ready.

The final product for `main.html` looks something like this:

```html
<html data-ng-app="gDriveApp">
<head>
  …

  <base target="_blank">
</head>
<body data-ng-controller="DocsController">
<section id="main">
  <nav>
    <h2>Google Drive Uploader</h2>
    <button class="btn" data-ng-click="fetchDocs()">Refresh</button>
    <button class="btn" id="close-button" title="Close"></button>
  </nav>
  <ul>
    <li data-ng-repeat="doc in docs">
      <img data-ng-src="{{doc.icon}}"> <a href="{{doc.alternateLink}}">{{doc.title}}</a>  {{doc.size}}
      <span class="date">{{doc.updatedDate}}</span>
    </li>
  </ul>
</section>
```

### A word on Content Security Policy {: #csp }

Unlike many other JS MVC frameworks, Angular v1.1.0+ requires no tweaks to work within a strict
[CSP][23]. It just works, out of the box!

However, if you're using an older version of Angular between v1.0.1 and v1.1.0, you'll need tell
Angular to run in a "content security mode". This is done by including the [ngCsp][24] directive
alongside [ngApp][25]:

```html
<html data-ng-app data-ng-csp>
```

### Handling authorization {: #authorization }

The data model isn't generated by the app itself. Instead, it's populated from an external API (the
Google Drive API). Thus, there's a bit of work necessary in order to populate the app's data.

Before we can make an API request, we need to fetch an OAuth token for the user's Google Account.
For that, we've created a method to wrap the call to `chrome.identity.getAuthToken()` and store the
`accessToken`, which we can reuse for future calls to the Drive API.

```js
GDocs.prototype.auth = function(opt_callback) {
  try {
    chrome.identity.getAuthToken({interactive: false}, function(token) {
      if (token) {
        this.accessToken = token;
        opt_callback && opt_callback();
      }
    }.bind(this));
  } catch(e) {
    console.log(e);
  }
};
```

{% Aside %}

**Note:** Passing the optional callback gives us the flexibility of knowing when the OAuth token is
ready.

{% endAside %}

{% Aside %}

**Note:** To simplify things a bit, we've created a library, [gdocs.js][26] to handle API tasks.

{% endAside %}

Once we have the token, it's time to make requests against the Drive API and populate the model.

### Skeleton controller {: #skeleton }

The "model" for the Uploader is a simple array (called docs) of objects that will get rendered as
those <li>s in the template:

```js
var gDriveApp = angular.module('gDriveApp', []);

gDriveApp.factory('gdocs', function() {
  var gdocs = new GDocs();
  return gdocs;
});

function DocsController($scope, $http, gdocs) {
  $scope.docs = [];

  $scope.fetchDocs = function() {
     ...
  };

  // Invoke on ctor call. Fetch docs after we have the oauth token.
  gdocs.auth(function() {
    $scope.fetchDocs();
  });

}
```

Notice that `gdocs.auth()` is called as part of the DocsController constructor. When Angular's
internals create the controller, we're insured to have a fresh OAuth token waiting for the user.

## Fetching data {: #five }

Template laid out. Controller scaffolded. OAuth token in hand. Now what?

It's time to define the main controller method, `fetchDocs()`. It's the workhorse of the controller,
responsible for requesting the user's files and filing the docs array with data from API responses.

```js
$scope.fetchDocs = function() {
  $scope.docs = []; // First, clear out any old results

  // Response handler that doesn't cache file icons.
  var successCallback = function(resp, status, headers, config) {
    var docs = [];
    var totalEntries = resp.feed.entry.length;

    resp.feed.entry.forEach(function(entry, i) {
      var doc = {
        title: entry.title.$t,
        updatedDate: Util.formatDate(entry.updated.$t),
        updatedDateFull: entry.updated.$t,
        icon: gdocs.getLink(entry.link,
                            'http://schemas.google.com/docs/2007#icon').href,
        alternateLink: gdocs.getLink(entry.link, 'alternate').href,
        size: entry.docs$size ? '( ' + entry.docs$size.$t + ' bytes)' : null
      };

      $scope.docs.push(doc);

      // Only sort when last entry is seen.
      if (totalEntries - 1 == i) {
        $scope.docs.sort(Util.sortByDate);
      }
    });
  };

  var config = {
    params: {'alt': 'json'},
    headers: {
      'Authorization': 'Bearer ' + gdocs.accessToken,
      'GData-Version': '3.0'
    }
  };

  $http.get(gdocs.DOCLIST_FEED, config).success(successCallback);
};
```

`fetchDocs()` uses Angular's `$http` service to retrieve the main feed over XHR. The oauth access
token is included in the `Authorization` header along with other custom headers and parameters.

The `successCallback` processes the API response and creates a new doc object for each entry in the
feed.

If you run `fetchDocs()` right now, everything works and the list of files shows up:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/qF2CspUxWPlHgeukJOkp.png", alt="Fetched list of files in Google Drive Uploader", height="680", width="580" %}

Woot!

Wait,...we're missing those neat file icons. What gives? A quick check of the console shows a bunch
of CSP-related errors:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/F7b9iaRTKc8cTHN9OEOE.png", alt="CSP errors in developer console", height="71", width="800" %}

The reason is that we're trying to set the icons `img.src` to external URLs. This violates CSP. For
example: `https://ssl.gstatic.com/docs/doclist/images/icon_10_document_list.png`. To fix this, we
need to pull in these remote assets locally to the app.

### Importing remote image assets {: #import }

For CSP to stop yelling at us, we use XHR2 to "import" the file icons as Blobs, then set the
`img.src` to a `blob: URL` created by the app.

Here's the updated `successCallback` with the added XHR code:

```js
var successCallback = function(resp, status, headers, config) {
  var docs = [];
  var totalEntries = resp.feed.entry.length;

  resp.feed.entry.forEach(function(entry, i) {
    var doc = {
      ...
    };

    $http.get(doc.icon, {responseType: 'blob'}).success(function(blob) {
      console.log('Fetched icon via XHR');

      blob.name = doc.iconFilename; // Add icon filename to blob.

      writeFile(blob); // Write is async, but that's ok.

      doc.icon = window.URL.createObjectURL(blob);

      $scope.docs.push(doc);

      // Only sort when last entry is seen.
      if (totalEntries - 1 == i) {
        $scope.docs.sort(Util.sortByDate);
      }
    });
  });
};
```

Now that CSP is happy with us again, we get nice file icons:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GP49lYVzl4rPNt868wtn.png", alt="Google Drive Uploader with file icons", height="680", width="580" %}

## Going offline: caching external resources {: #six }

The obvious optimization that needs to be made: not make 100s of XHR requests for each file icon on
every call to `fetchDocs()`. Verify this in the Developer Tools console by pressing the "Refresh"
button several times. Every time, n images are fetched:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/YJgMcn00xGOFjNvWz9K1.png", alt="Console log 65: Fetched icon via XHR", height="19", width="180" %}

Let's modify `successCallback` to add a caching layer. The additions are highlighted in bold:

```js
$scope.fetchDocs = function() {
  ...

  // Response handler that caches file icons in the filesystem API.
  var successCallbackWithFsCaching = function(resp, status, headers, config) {
    var docs = [];
    var totalEntries = resp.feed.entry.length;

    resp.feed.entry.forEach(function(entry, i) {
      var doc = {
        ...
      };

      // 'https://ssl.gstatic.com/doc_icon_128.png' -> 'doc_icon_128.png'
      doc.iconFilename = doc.icon.substring(doc.icon.lastIndexOf('/') + 1);

      // If file exists, it we'll get back a FileEntry for the filesystem URL.
      // Otherwise, the error callback will fire and we need to XHR it in and
      // write it to the FS.
      var fsURL = fs.root.toURL() + FOLDERNAME + '/' + doc.iconFilename;
      window.webkitResolveLocalFileSystemURL(fsURL, function(entry) {
        doc.icon = entry.toURL(); // should be === to fsURL, but whatevs.

        $scope.docs.push(doc); // add doc to model.

        // Only want to sort and call $apply() when we have all entries.
        if (totalEntries - 1 == i) {
          $scope.docs.sort(Util.sortByDate);
          $scope.$apply(function($scope) {}); // Inform angular that we made changes.
        }

      }, function(e) {
        // Error: file doesn't exist yet. XHR it in and write it to the FS.

        $http.get(doc.icon, {responseType: 'blob'}).success(function(blob) {
          console.log('Fetched icon via XHR');

          blob.name = doc.iconFilename; // Add icon filename to blob.

          writeFile(blob); // Write is async, but that's ok.

          doc.icon = window.URL.createObjectURL(blob);

          $scope.docs.push(doc);

          // Only sort when last entry is seen.
          if (totalEntries - 1 == i) {
            $scope.docs.sort(Util.sortByDate);
          }
        });

      });
    });
  };

  var config = {
    ...
  };

  $http.get(gdocs.DOCLIST_FEED, config).success(successCallbackWithFsCaching);
};
```

Notice that in the `webkitResolveLocalFileSystemURL()` callback we're calling `$scope.$apply()` when
the last entry is seen. Normally calling `$apply()` isn't necessary. Angular detects changes to data
models automagically. However in our case, we have an addition layer of asynchronous callback that
Angular isn't aware of. We must explicitly tell Angular when our model has been updated.

On first run, the icons won't be in the HTML5 Filesystem and the calls to
`window.webkitResolveLocalFileSystemURL()` will result in its error callback being invoked. For that
case, we can reuse the technique from before and fetch the images. The only difference this time is
that each blob is written to the filesystem (see [writeFile()][27]). The console verifies this
behavior:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/tS8fAphl6h2v9706ndyV.png", alt="Console log 100: Write completed", height="42", width="800" %}

Upon next run (or press of the "Refresh" button), the URL passed to
`webkitResolveLocalFileSystemURL()` exists because the file has been previously cached. The app sets
the `doc.icon` to the file's `filesystem: URL` and avoids making the costly XHR for the icon.

## Drag and drop uploading {: #seven }

An uploader app is false advertising if it can't upload files!

[app.js][28] handles this feature by implementing a small library around HTML5 Drag and Drop called
`DnDFileController`. It gives the ability to drag in files from the desktop and have them uploaded
to Google Drive.

Simply adding this to the gdocs service does the job:

```js
gDriveApp.factory('gdocs', function() {
  var gdocs = new GDocs();

  var dnd = new DnDFileController('body', function(files) {
    var $scope = angular.element(this).scope();
    Util.toArray(files).forEach(function(file, i) {
      gdocs.upload(file, function() {
        $scope.fetchDocs();
      });
    });
  });

  return gdocs;
});
```

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://angularjs.org/
[4]: https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/gdrive
[5]: https://www.html5rocks.com/en/tutorials/dnd/basics/
[6]: https://developers.google.com/apis-explorer/#p/
[7]: /docs/extensions/reference/app_identity#non
[8]: /docs/extensions/reference/identity
[9]: https://developers.google.com/drive/get-started
[10]: /docs/extensions/reference/contentSecurityPolicy
[11]: https://developers.google.com/drive/get-started
[12]: http://www.html5rocks.com/en/tutorials/file/filesystem/
[13]: http://www.html5rocks.com/en/tutorials/dnd/basics/
[14]: /docs/extensions/reference/app_identity
[15]: /docs/extensions/reference/app_identity#client_id
[16]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/js/background.js
[17]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/js/app.js
[18]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/main.html
[19]: https://docs.angularjs.org/api/ng.directive:ngRepeat
[20]: https://docs.angularjs.org/api/ng.directive:ngController
[21]: https://docs.angularjs.org/api/ng.directive:ngApp
[22]: https://docs.angularjs.org/api/ng.directive:ngApp
[23]: /docs/extensions/reference/contentSecurityPolicy
[24]: http://docs.angularjs.org/api/ng.directive:ngCsp
[25]: http://docs.angularjs.org/api/ng.directive:ngApp
[26]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/js/gdocs.js
[27]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/js/app.js#L27
[28]: https://github.com/GoogleChrome/chrome-app-samples/blob/master/samples/gdrive/js/app.js#L52
