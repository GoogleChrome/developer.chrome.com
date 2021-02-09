---
layout: 'layouts/doc-post.njk'
title: "Step 2: Import an Existing Web App"
date: 2014-10-17
updated: 2016-12-16
description: How to adapt an existing web app for the Chrome Apps platform.
---

{% Aside 'caution' %}

**Important:** Chrome will be removing support for Chrome Apps on all platforms. Chrome browser and
the Chrome Web Store will continue to support extensions. [**Read the announcement**][1] and learn
more about [**migrating your app**][2].

{% endAside %}

{% Aside %}

**Want to start fresh from here?** Find the previous step's code in the [reference code zip][3]
under **_cheat_code > solution_for_step1_**.

{% endAside %}

In this step, you will learn:

- How to adapt an existing web application for the Chrome Apps platform.
- How to make your app scripts Content Security Policy (CSP) compliant.
- How to implement local storage using the [chrome.storage.local][4].

_Estimated time to complete this step: 20 minutes._  
To preview what you will complete in this step, [jump down to the bottom of this page ↓][5].

## Import an existing Todo app {: #todomvc }

As a starting point, import the [vanilla JavaScript version][6] of [TodoMVC][7], a common benchmark
app, into your project.

We've included a version of the TodoMVC app in the [reference code zip][8] in the **_todomvc_**
folder. Copy all files (including folders) from _todomvc_ into your project folder.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Yfv4O1dCRrqr6XNtTBta.png",
       alt="Copy todomvc folder into codelab folder", height="515", width="800" %}

You will be asked to replace _index.html_. Go ahead and accept.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/EhTkBXH06XN95xjOreut.png", alt="Replace index.html", height="124", width="420" %}

You should now have the following file structure in your application folder:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/vSqNPowp4gvcBThfKYE0.png", alt="New project folder", height="144", width="593" %}

The files highlighted in blue are from the _todomvc_ folder.

Reload your app now (**right-click > Reload App**). You should see the basic UI but you won't be
able to add todos.

## Make scripts Content Security Policy (CSP) compliant {: #csp-compliance }

Open the DevTools Console (**right-click > Inspect Element**, then select the **Console** tab). You
will see an error about refusing to execute an inline script:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/eM7GRjvPtb2BJPDVfTLF.png",
       alt="Todo app with CSP console log error", height="574", width="724" %}

Let's fix this error by making the app [Content Security Policy][9] compliant. One of the most
common CSP non-compliances is caused by inline JavaScript. Examples of inline JavaScript include
event handlers as DOM attributes (e.g. `<button onclick=''>`) and `<script>` tags with content
inside the HTML.

The solution is simple: move the inline content to a new file.

1\. Near the bottom of **_index.html_**, remove the inline JavaScript and instead include
_js/bootstrap.js_:

```js/5/1-4
<script src="bower_components/director/build/director.js"></script>
<script>
  // Bootstrap app data
  window.app = {};
</script>
<script src="js/bootstrap.js"></script>
<script src="js/helpers.js"></script>
<script src="js/store.js"></script>
```

2\. Create a file in the **_js_** folder named **_bootstrap.js_**. Move the previously inline code
to be in this file:

```js
// Bootstrap app data
window.app = {};
```

You'll still have a non-working Todo app if you reload the app now but you're getting closer.

## Convert localStorage to chrome.storage.local {: #convert-storage }

If you open the DevTools Console now, the previous error should be gone. There is a new error,
however, about `window.localStorage` not being available:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/TLhaB5KDe0e80De4kC88.png",
       alt="Todo app with localStorage console log error", height="589", width="723" %}

Chrome Apps do not support [`localStorage`][10] as `localStorage` is synchronous. Synchronous access
to blocking resources (I/O) in a single-threaded runtime could make your app unresponsive.

Chrome Apps have an equivalent API that can store objects asynchronously. This will help avoid the
sometimes costly object->string->object serialization process.

To address the error message in our app, you need to convert `localStorage` to
[chrome.storage.local][11].

### Update app permissions {: #update-permissions }

In order to use `chrome.storage.local`, you need to request the `storage` permission. In
**_manifest.json_**, add `"storage"` to the `permissions` array:

```json
"permissions": ["storage"],
```

### Learn about local.storage.set() and local.storage.get() {: #get-and-set }

To save and retrieve todo items, you need to know about the `set()` and `get()` methods of the
`chrome.storage` API.

The [set()][12] method accepts an object of key-value pairs as its first parameter. An optional
callback function is the second parameter. For example:

```js
chrome.storage.local.set({secretMessage:'Psst!',timeSet:Date.now()}, function() {
  console.log("Secret message saved");
});
```

The [get()][13] method accepts an optional first parameter for the datastore keys you wish to
retreive. A single key can be passed as a string; multiple keys can be arranged into an array of
strings or a dictionary object.

The second parameter, which is required, is a callback function. In the returned object, use the
keys requested in the first parameter to access the stored values. For example:

```js
chrome.storage.local.get(['secretMessage','timeSet'], function(data) {
  console.log("The secret message:", data.secretMessage, "saved at:", data.timeSet);
});
```

If you want to `get()` everything that is currently in `chrome.storage.local`, omit the first
parameter:

```js
chrome.storage.local.get(function(data) {
  console.log(data);
});
```

Unlike `localStorage`, you won't be able to inspect locally stored items using the DevTools
Resources panel. You can, however, interact with `chrome.storage` from the JavaScript Console like
so:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/rHYyJEoDVKnSbjAegQ4g.png",
       alt="Use the Console to debug chrome.storage", height="410", width="658" %}

### Preview required API changes {: #preview-changes }

Most of the remaining steps in converting the Todo app are small changes to the API calls. Changing
all the places where `localStorage` is currently being used, though time-consuming and error-prone,
is required.

{% Aside %}

To maximize your fun with this codelab, it'll be best if you overwrite your **_store.js_**,
**_controller.js_**, and **_model.js_** with the ones from **_cheat_code/solution_for_step_2_** in
the reference code zip.

Once you've done that, continue reading as we'll go over each of the changes individually.

{% endAside %}

The key differences between `localStorage` and `chrome.storage` come from the async nature of
`chrome.storage`:

- Instead of writing to `localStorage` using simple assignment, you need to use
  `chrome.storage.local.set()` with optional callbacks.

  ```js
  var data = { todos: [] };
  localStorage[dbName] = JSON.stringify(data);
  ```

  versus

  ```js
  var storage = {};
  storage[dbName] = { todos: [] };
  chrome.storage.local.set( storage, function() {
    // optional callback
  });
  ```

- Instead of accessing `localStorage[myStorageName]` directly, you need to use
  `chrome.storage.local.get(myStorageName,function(storage){...})` and then parse the returned
  `storage` object in the callback function.

  ```js
  var todos = JSON.parse(localStorage[dbName]).todos;
  ```

  versus

  ```js
  chrome.storage.local.get(dbName, function(storage) {
    var todos = storage[dbName].todos;
  });
  ```

- The function `.bind(this)` is used on all callbacks to ensure `this` refers to the `this` of the
  `Store` prototype. (More info on bound functions can be found on the MDN docs:
  [Function.prototype.bind()][14].)

  ```js
  function Store() {
    this.scope = 'inside Store';
    chrome.storage.local.set( {}, function() {
      console.log(this.scope); // outputs: 'undefined'
    });
  }
  new Store();
  ```

  versus

  ```js/4
  function Store() {
    this.scope = 'inside Store';
    chrome.storage.local.set( {}, function() {
      console.log(this.scope); // outputs: 'inside Store'
    }.bind(this));
  }
  new Store();
  ```

Keep these key differences in mind as we cover retrieving, saving, and removing todo items in the
following sections.

### Retrieve todo items {: #retrieve-items }

Let's update the Todo app in order to retrieve todo items:

1\. The `Store` constructor method takes care of initializing the Todo app with all the existing
todo items from the datastore. The method first checks if the datastore exists. If it doesn't, it'll
create an empty array of `todos` and save it to the datastore so there are no runtime read errors.

In **_js/store.js_**, convert the use of `localStorage` in the constructor method to instead use
`chrome.storage.local`:

```js/15-26/8-14
function Store(name, callback) {
  var data;
  var dbName;

  callback = callback || function () {};

  dbName = this._dbName = name;

  if (!localStorage[dbName]) {
    data = {
      todos: []
    };
    localStorage[dbName] = JSON.stringify(data);
  }
  callback.call(this, JSON.parse(localStorage[dbName]));

  chrome.storage.local.get(dbName, function(storage) {
    if ( dbName in storage ) {
      callback.call(this, storage[dbName].todos);
    } else {
      storage = {};
      storage[dbName] = { todos: [] };
      chrome.storage.local.set( storage, function() {
        callback.call(this, storage[dbName].todos);
      }.bind(this));
    }
  }.bind(this));
}
```

2\. The `find()` method is used when reading todos from the Model. The returned results change based
on whether you are filtering by "All", "Active", or "Completed".

Convert `find()` to use `chrome.storage.local`:

```js/8-15/5,7,16
Store.prototype.find = function (query, callback) {
  if (!callback) {
    return;
  }

  var todos = JSON.parse(localStorage[this._dbName]).todos;

  callback.call(this, todos.filter(function (todo) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var todos = storage[this._dbName].todos.filter(function (todo) {
      for (var q in query) {
         return query[q] === todo[q];
      }
      });
    callback.call(this, todos);
  }.bind(this));
  }));
};
```

3\. Similiar to `find()`, `findAll()` gets all todos from the Model. Convert `findAll()` to use
`chrome.storage.local`:

```js/3-6/2
Store.prototype.findAll = function (callback) {
  callback = callback || function () {};
  callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
  chrome.storage.local.get(this._dbName, function(storage) {
    var todos = storage[this._dbName] && storage[this._dbName].todos || [];
    callback.call(this, todos);
  }.bind(this));
};
```

### Save todos items {: #save-items }

The current `save()` method presents a challenge. It depends on two async operations (get and set)
that operate on the whole monolithic JSON storage every time. Any batch updates on more than one
todo item, like "mark all todos as completed", will result in a data hazard known as
[Read-After-Write][15]. This issue wouldn't happen if we were using a more appropriate data storage,
like IndexedDB, but we are trying to minimize the conversion effort for this codelab.

There are several ways to fix it so we will use this opportunity to slightly refactor `save()` by
taking an array of todo IDs to be updated all at once:

1\. To start off, wrap everything already inside `save()` with a `chrome.storage.local.get()`
callback:

```js/1-9
Store.prototype.save = function (id, updateData, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = JSON.parse(localStorage[this._dbName]);
    // ...
    if (typeof id !== 'object') {
      // ...
    }else {
      // ...
    }
  }.bind(this));
};
```

2\. Convert all the `localStorage` instances with `chrome.storage.local`:

```js/3,14-18,29-31/2,12-13,27-28
Store.prototype.save = function (id, updateData, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = JSON.parse(localStorage[this._dbName]);
    var data = storage[this._dbName];
    var todos = data.todos;

    callback = callback || function () {};

    // If an ID was actually given, find the item and update each property
    if ( typeof id !== 'object' ) {
      // ...

      localStorage[this._dbName] = JSON.stringify(data);
      callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
      chrome.storage.local.set(storage, function() {
        chrome.storage.local.get(this._dbName, function(storage) {
          callback.call(this, storage[this._dbName].todos);
        }.bind(this));
      }.bind(this));
    } else {
      callback = updateData;

      updateData = id;

      // Generate an ID
      updateData.id = new Date().getTime();

      localStorage[this._dbName] = JSON.stringify(data);
      callback.call(this, [updateData]);
      chrome.storage.local.set(storage, function() {
        callback.call(this, [updateData]);
      }.bind(this));
    }
  }.bind(this));
};
```

3\. Then update the logic to operate on an array instead of a single item:

```js/8-18,33
Store.prototype.save = function (id, updateData, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = storage[this._dbName];
    var todos = data.todos;

    callback = callback || function () {};

    // If an ID was actually given, find the item and update each property
    if ( typeof id !== 'object' || Array.isArray(id) ) {
      var ids = [].concat( id );
      ids.forEach(function(id) {
        for (var i = 0; i < todos.length; i++) {
          if (todos[i].id == id) {
            for (var x in updateData) {
              todos[i][x] = updateData[x];
            }
          }
        }
      });

      chrome.storage.local.set(storage, function() {
        chrome.storage.local.get(this._dbName, function(storage) {
          callback.call(this, storage[this._dbName].todos);
        }.bind(this));
      }.bind(this));
    } else {
      callback = updateData;

      updateData = id;

      // Generate an ID
      updateData.id = new Date().getTime();

      todos.push(updateData);
      chrome.storage.local.set(storage, function() {
        callback.call(this, [updateData]);
      }.bind(this));
    }
  }.bind(this));
};
```

### Mark todo items as complete {: #complete-items }

Now that app is operating on arrays, you need to change how the app handles a user clicking on the
**Clear completed (#)** button:

1\. In **_controller.js_**, update `toggleAll()` to call `toggleComplete()` only once with an array
of todos instead of marking a todo as completed one by one. Also delete the call to `_filter()`
since you'll be adjusting the `toggleComplete` `_filter()`.

```js/7,10,12/9,15
Controller.prototype.toggleAll = function (e) {
  var completed = e.target.checked ? 1 : 0;
  var query = 0;
  if (completed === 0) {
    query = 1;
  }
  this.model.read({ completed: query }, function (data) {
    var ids = [];
    data.forEach(function (item) {
      this.toggleComplete(item.id, e.target, true);
      ids.push(item.id);
    }.bind(this));
    this.toggleComplete(ids, e.target, false);
  }.bind(this));

  this._filter();
};
```

2\. Now update `toggleComplete()` to accept both a single todo or an array of todos. This includes
moving `filter()` to be inside the `update()`, instead of outside.

```js
Controller.prototype.toggleComplete = function (ids, checkbox, silent) {
  var completed = checkbox.checked ? 1 : 0;
  this.model.update(ids, { completed: completed }, function () {
    if ( ids.constructor != Array ) {
      ids = [ ids ];
    }
    ids.forEach( function(id) {
      var listItem = $$('[data-id="' + id + '"]');
      
      if (!listItem) {
        return;
      }
      
      listItem.className = completed ? 'completed' : '';
      
      // In case it was toggled from an event and not by clicking the checkbox
      listItem.querySelector('input').checked = completed;
    });

    if (!silent) {
      this._filter();
    }

  }.bind(this));
};
```

### Count todo items {: #count-items }

After switching to async storage, there is a minor bug that shows up when getting the number of
todos. You'll need to wrap the count operation in a callback function:

1\. In **_model.js_**, update `getCount()` to accept a callback:

```js/0,15/17
  Model.prototype.getCount = function (callback) {
  var todos = {
    active: 0,
    completed: 0,
    total: 0
  };
  this.storage.findAll(function (data) {
    data.each(function (todo) {
      if (todo.completed === 1) {
        todos.completed++;
      } else {
        todos.active++;
      }
      todos.total++;
    });
    if (callback) callback(todos);
  });
  return todos;
};
```

2\. Back in **_controller.js_**, update `_updateCount()` to use the async `getCount()` you edited in
the previous step:

```js/2-11/1
Controller.prototype._updateCount = function () {
  var todos = this.model.getCount();
  this.model.getCount(function(todos) {
    this.$todoItemCounter.innerHTML = this.view.itemCounter(todos.active);

    this.$clearCompleted.innerHTML = this.view.clearCompletedButton(todos.completed);
    this.$clearCompleted.style.display = todos.completed > 0 ? 'block' : 'none';

    this.$toggleAll.checked = todos.completed === todos.total;

    this._toggleFrame(todos);
  }.bind(this));

};
```

You are almost there! If you reload the app now, you will be able to insert new todos without any
console errors.

### Remove todos items {: #remove-items }

Now that the app can save todo items, you're close to being done! You still get errors when you
attempt to _remove_ todo items:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/PryPGnyoZVeKoHrtGT9x.png",
       alt="Todo app with localStorage console log error", height="726", width="678" %}

1\. In **_store.js_**, convert all the `localStorage` instances to use `chrome.storage.local`:

a) To start off, wrap everything already inside `remove()` with a `get()` callback:

```js
Store.prototype.remove = function (id, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = JSON.parse(localStorage[this._dbName]);
    var todos = data.todos;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
        break;
      }
    }

    localStorage[this._dbName] = JSON.stringify(data);
    callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
  }.bind(this));
};
```

b) Then convert the contents within the `get()` callback:

```js/3,15-17/2,13-14
Store.prototype.remove = function (id, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = JSON.parse(localStorage[this._dbName]);
    var data = storage[this._dbName];
    var todos = data.todos;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        todos.splice(i, 1);
        break;
      }
    }

    localStorage[this._dbName] = JSON.stringify(data);
    callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    chrome.storage.local.set(storage, function() {
      callback.call(this, todos);
    }.bind(this));
  }.bind(this));
};
```

2\. The same Read-After-Write data hazard issue previously present in the `save()` method is also
present when removing items so you will need to update a few more places to allow for batch
operations on a list of todo IDs.

a) Still in _store.js_, update `remove()`:

```js/5-13
Store.prototype.remove = function (id, callback) {
  chrome.storage.local.get(this._dbName, function(storage) {
    var data = storage[this._dbName];
    var todos = data.todos;

    var ids = [].concat(id);
    ids.forEach( function(id) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
          todos.splice(i, 1);
          break;
        }
      }
    });

    chrome.storage.local.set(storage, function() {
      callback.call(this, todos);
    }.bind(this));
  }.bind(this));
};
```

b) In **_controller.js_**, change `removeCompletedItems()` to make it call `removeItem()` on all IDs
at once:

```js/2,5,7/4
Controller.prototype.removeCompletedItems = function () {
  this.model.read({ completed: 1 }, function (data) {
    var ids = [];
    data.forEach(function (item) {
      this.removeItem(item.id);
      ids.push(item.id);
    }.bind(this));
    this.removeItem(ids);
  }.bind(this));

  this._filter();
};
```

c) Finally, still in _controller.js_, change the `removeItem()` to support removing multiple items
from the DOM at once, and move the `_filter()` call to be inside the callback:

```js/2-6/8
Controller.prototype.removeItem = function (id) {
  this.model.remove(id, function () {
    var ids = [].concat(id);
    ids.forEach( function(id) {
      this.$todoList.removeChild($$('[data-id="' + id + '"]'));
    }.bind(this));
    this._filter();
  }.bind(this));
  this._filter();
};
```

### Drop all todo items {: #drop-items }

There is one more method in _store.js_ using `localStorage`:

```js
Store.prototype.drop = function (callback) {
  localStorage[this._dbName] = JSON.stringify({todos: []});
  callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
};
```

This method is not being called in the current app so, if you want an extra challenge, try
implementing it on your own. Hint: Have a look at [`chrome.storage.local.clear()`][16].

## Launch your finished Todo app {: #launch }

You are done Step 2! Reload your app and you should now have a fully working Chrome packaged version
of TodoMVC.

{% Aside %}

**Troubleshooting**  
Remember to always check the DevTools Console to see if there are any error messages.

{% endAside %}

## For more information {: #recap }

For more detailed information about some of the APIs introduced in this step, refer to:

- [Content Security Policy][17] [↑][18]
- [Declare Permissions][19] [↑][20]
- [chrome.storage][21] [↑][22]
- [chrome.storage.local.get()][23] [↑][24]
- [chrome.storage.local.set()][25] [↑][26]
- [chrome.storage.local.remove()][27] [↑][28]
- [chrome.storage.local.clear()][29] [↑][30]

Ready to continue onto the next step? Go to [Step 3 - Add alarms and notifications »][31]

[1]: https://blog.chromium.org/2020/01/moving-forward-from-chrome-apps.html
[2]: /apps/migration
[3]: https://github.com/mangini/io13-codelab/archive/master.zip
[4]: /docs/extensions/reference/storage "Read 'chrome.storage.local' in the Chrome developer docs"
[5]: #launch
[6]: http://todomvc.com/vanilla-examples/vanillajs/
[7]: http://todomvc.com/
[8]: https://github.com/mangini/io13-codelab/archive/master.zip
[9]: /apps/contentSecurityPolicy
[10]: http://dev.w3.org/html5/webstorage/#the-localstorage-attribute
[11]: /docs/extensions/reference/storage "Read 'chrome.storage.local' in the Chrome developer docs"
[12]:
  /docs/extensions/reference/storage#method-StorageArea-set
  "Read 'chrome.storage.local.set()' in the Chrome developer docs"
[13]:
  /docs/extensions/reference/storage#method-StorageArea-get
  "Read 'chrome.storage.local.get()' in the Chrome developer docs"
[14]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[15]: http://en.wikipedia.org/wiki/Hazard_(computer_architecture)#Read_After_Write_.28RAW.29
[16]: /docs/extensions/reference/storage#method-StorageArea-remove
[17]: /apps/contentSecurityPolicy "Read 'Content Security Policy' in the Chrome developer docs"
[18]:
  #csp-compliance
  "This feature mentioned in 'Make scripts Content Security Policy (CSP) compliant'"
[19]: /apps/declare_permissions "Read 'Declare Permissions' in the Chrome developer docs"
[20]: #update-permissions "This feature mentioned in 'Update app permissions'"
[21]: /docs/extensions/reference/storage "Read 'chrome.storage' in the Chrome developer docs"
[22]:
  #get-and-set
  "This feature mentioned in 'Learn about local.storage.set() and local.storage.get()'"
[23]:
  /docs/extensions/reference/storage#method-StorageArea-get
  "Read 'chrome.storage.local.get()' in the Chrome developer docs"
[24]: #retrieve-items "This feature mentioned in 'Retrieve todos items'"
[25]:
  /docs/extensions/reference/storage#method-StorageArea-set
  "Read 'chrome.storage.local.set()' in the Chrome developer docs"
[26]: #save-items "This feature mentioned in 'Save todos items'"
[27]:
  /docs/extensions/reference/storage#method-StorageArea-remove
  "Read 'chrome.storage.local.remove()' in the Chrome developer docs"
[28]: #remove-items "This feature mentioned in 'Remove todos items'"
[29]:
  /docs/extensions/reference/storage#method-StorageArea-remove
  "Read 'chrome.storage.local.clear()' in the Chrome developer docs"
[30]: #remove-items "This feature mentioned in 'Drop all todo items'"
[31]: ../app_codelab_alarms
