---
layout: 'layouts/doc-post.njk'
title: "Step 5: Add Images From the Web"
date: 2014-10-17
updated: 2018-05-14
description: How to add images to your Chrome App using XHR and ObjectURL.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

{% Aside %}

**Want to start fresh from here?** Find the previous step's code in the [reference code zip][3]
under **_cheat_code > solution_for_step4_**.

{% endAside %}

In this step, you will learn:

- How to load resources from outside your app and add them to the DOM through XHR and ObjectURLs.

_Estimated time to complete this step: 20 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][4].

## How CSP affects the use of external resources {: #csp-compliance }

The Chrome Apps platform forces your app to be fully compliant with Content Security Policies (CSP).
You can't directly load DOM resources like images, fonts, and CSS from outside of your Chrome App
package.

If you want to show an external image in your app, you need to request it via [XMLHttpRequest][5],
transform it into a [Blob][6], and create an [ObjectURL][7]. This `ObjectURL` can be added to the
DOM because it refers to an in-memory item in the context of the app.

## Show thumbnail images for todo items {: #show-images }

Let's change our app to look for image URLs in a todo item. If the URL looks like an image (for
example, ends with .png, .jpg, .svg, or .gif), apply the process mentioned above in order to show an
image thumbnail next to the URL.

### Update permissions {: #update-permissions }

In a Chrome App, you can make XMLHttpRequest calls to any URL as long as you specify its domain in
the manifest. Since you won't know beforehand what image URL the user will type, ask permission to
make requests to `"<all_urls>"`.

In **_manifest.json_**, request the "<all_urls>" permission:

```json
"permissions": ["storage", "alarms", "notifications",
                "webview", "<all_urls>"],
```

### Create and clear ObjectURLs {: #object-urls }

In **_controller.js_**, add a `_createObjectURL()` method to create ObjectURLs from a Blob:

```js
Controller.prototype._createObjectURL = function(blob) {
  var objURL = URL.createObjectURL(blob);
  this.objectURLs = this.objectURLs || [];
  this.objectURLs.push(objURL);
  return objURL;
};
```

ObjectURLs hold memory, so when you no longer need the ObjectURL, you should revoke them. Add this
`_clearObjectURL()` method to _controller.js_ to handle that:

```js
Controller.prototype._clearObjectURL = function() {
  if (this.objectURLs) {
    this.objectURLs.forEach(function(objURL) {
      URL.revokeObjectURL(objURL);
    });
    this.objectURLs = null;
  }
};
```

### Make a XHR request {: #xhr }

Add a `_requestRemoteImageAndAppend()` method to execute a XMLHttpRequest on a given image URL:

```js
Controller.prototype._requestRemoteImageAndAppend = function(imageUrl, element) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', imageUrl);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var img = document.createElement('img');
    img.setAttribute('data-src', imageUrl);
    img.className = 'icon';
    var objURL = this._createObjectURL(xhr.response);
    img.setAttribute('src', objURL);
    element.appendChild(img);
  }.bind(this);
  xhr.send();
};
```

On XHR load, this method creates an `ObjectURL` from the XHR's response, and adds an `<img>` element
with this `ObjectURL` to the DOM.

### Parse for image URLs in todo items {: #parse-urls }

Now add a `_parseForImageURLs()` method that finds all links not yet processed and checks them for
images. For each URL that looks like an image, execute `_requestRemoteImageAndAppend()`:

```js
Controller.prototype._parseForImageURLs = function () {
  // remove old blobs to avoid memory leak:
  this._clearObjectURL();
  var links = this.$todoList.querySelectorAll('a[data-src]:not(.thumbnail)');
  var re = /\.(png|jpg|jpeg|svg|gif)$/;
  for (var i = 0; i<links.length; i++) {
    var url = links[i].getAttribute('data-src');
    if (re.test(url)) {
      links[i].classList.add('thumbnail');
      this._requestRemoteImageAndAppend(url, links[i]);
    }
  }
};
```

### Render thumbnails in the todo list {: #render-thumbnails }

Now call `_parseForImageURLs()` from `showAll()`, `showActive()`, and `showCompleted()`:

```js/7,17,27
/**
 * An event to fire on load. Will get all items and display them in the
 * todo-list
 */
Controller.prototype.showAll = function () {
  this.model.read(function (data) {
    this.$todoList.innerHTML = this._parseForURLs(this.view.show(data));
    this._parseForImageURLs();
  }.bind(this));
};

/**
 * Renders all active tasks
 */
Controller.prototype.showActive = function () {
  this.model.read({ completed: 0 }, function (data) {
    this.$todoList.innerHTML = this._parseForURLs(this.view.show(data));
    this._parseForImageURLs();
  }.bind(this));
};

/**
 * Renders all completed tasks
 */
Controller.prototype.showCompleted = function () {
  this.model.read({ completed: 1 }, function (data) {
    this.$todoList.innerHTML = this._parseForURLs(this.view.show(data));
    this._parseForImageURLs();
  }.bind(this));
};
```

Do the same for `editItem()`:

```js/7
Controller.prototype.editItem = function (id, label) {
  ...
  var onSaveHandler = function () {
    ...
    if (value.length && !discarding) {
      ...
      label.innerHTML = this._parseForURLs(value);
      this._parseForImageURLs();
    } else if (value.length === 0) {
  ...
}
```

### Constrain the displayed image dimensions {: #css }

Finally, in **_bower_components/todomvc-common/base.css_**, add a CSS rule to limit the size of the
image:

```css
.thumbnail img[data-src] {
  max-width: 100px;
  max-height: 28px;
}
```

## Launch your finished Todo app {: #launch }

You are done Step 5! Reload your app and add a todo item with a URL to an image hosted online. Some
URLs you could use: **http://goo.gl/nqHMF#.jpg** or **http://goo.gl/HPBGR#.png**.

{% Aside %}

**Tip**: For real-world situations, when you need to control offline cache and dozens of
simultaneous resource downloads, we have created [a helper library][8] to handle some common use
cases.

{% endAside %}

## For more information {: #recap }

For more detailed information about some of the APIs introduced in this step, refer to:

- [Content Security Policy][9] [↑][10]
- [Declare Permissions][11] [↑][12]

Ready to continue onto the next step? Go to [Step 6 - Export todos to the filesystem »][13]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/mangini/io13-codelab/archive/master.zip
[4]: #launch
[5]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[7]: https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL
[8]: https://github.com/GoogleChrome/apps-resource-loader#readme
[9]: /apps/contentSecurityPolicy "Read 'Content Security Policy' in the Chrome developer docs"
[10]:
  #csp-compliance
  "This feature mentioned in 'Learn how CSP affects the use of external web resources'"
[11]: /apps/declare_permissions "Read 'Declare Permissions' in the Chrome developer docs"
[12]: #update-permissions "This feature mentioned in 'Update permissions'"
[13]: ../app_codelab_filesystem
