---
layout: "layouts/doc-post.njk"
title: "Using eval in Chrome extensions"
date: 2012-09-18
updated: 2014-05-22
description: How to use eval() in a Chrome Extension.
---

{% include 'partials/extensions/mv2-legacy-page.md' %}

Chrome's extension system enforces a fairly strict default [**Content Security Policy (CSP)**][1].
The policy restrictions are straightforward: script must be moved out-of-line into separate
JavaScript files, inline event handlers must be converted to use `addEventListener`, and `eval()` is
disabled. Chrome Apps have an [even more strict policy][2], and we're quite happy with the security
properties these policies provide.

We recognize, however, that a variety of libraries use `eval()` and `eval`\-like constructs such as
`new Function()` for performance optimization and ease of expression. Templating libraries are
especially prone to this style of implementation. While some (like [Angular.js][3]) support CSP out
of the box, many popular frameworks haven't yet updated to a mechanism that is compatible with
extensions' `eval`\-less world. Removing support for that functionality has therefore proven [more
problematic than expected][4] for developers.

This document introduces sandboxing as a safe mechanism to include these libraries in your projects
without compromising on security. For brevity, we'll be using the term _extensions_ throughout, but
the concept applies equally to applications.

## Why sandbox? {: #why_sandbox }

`eval` is dangerous inside an extension because the code it executes has access to everything in the
extension's high-permission environment. A slew of powerful `chrome.*` APIs are available that could
severely impact a user's security and privacy; simple data exfiltration is the least of our worries.
The solution on offer is a sandbox in which `eval` can execute code without access either to the
extension's data or the extension's high-value APIs. No data, no APIs, no problem.

We accomplish this by listing specific HTML files inside the extension package as being sandboxed.
Whenever a sandboxed page is loaded, it will be moved to a [unique origin][5], and will be denied
access to `chrome.*` APIs. If we load this sandboxed page into our extension via an `iframe`, we can
pass it messages, let it act upon those messages in some way, and wait for it to pass us back a
result. This simple messaging mechanism gives us everything we need to safely include `eval`\-driven
code in our extension's workflow.

## Creating and using a sandbox. {: #creating_and_using }

If you'd like to dive straight into code, please grab the [sandboxing sample extension and take
off][6]. It's a working example of a tiny messaging API built on top of the [Handlebars][7]
templating library, and it should give you everything you need to get going. For those of you who'd
like a little more explanation, let's walk through that sample together here.

### List files in manifest {: #list_files }

Each file that ought to be run inside a sandbox must be listed in the extension manifest by adding a
`sandbox` property. This is a critical step, and it's easy to forget, so please double check that
your sandboxed file is listed in the manifest. In this sample, we're sandboxing the file cleverly
named "sandbox.html". The manifest entry looks like this:

```json
{
  ...,
  "sandbox": {
     "pages": ["sandbox.html"]
  },
  ...
}
```

### Load the sandboxed file {: #load_file }

In order to do something interesting with the sandboxed file, we need to load it in a context where
it can be addressed by the extension's code. Here, [sandbox.html][8] has been loaded into the
extension's [Event Page][9] ([eventpage.html][10]) via an `iframe`. [eventpage.js][11] contains code
that sends a message into the sandbox whenever the browser action is clicked by finding the `iframe`
on the page, and executing the `postMessage` method on its `contentWindow`. The message is an object
containing two properties: `context` and `command`. We'll dive into both in a moment.

```js
chrome.browserAction.onClicked.addListener(function() {
 var iframe = document.getElementById('theFrame');
 var message = {
   command: 'render',
   context: {thing: 'world'}
 };
 iframe.contentWindow.postMessage(message, '*');
});
```

<div class="aside aside--note">For general information about the <code>postMessage</code> API, take a look at the <a href="https://developer.mozilla.org/en/DOM/window.postMessage"><code>postMessage</code> documentation on MDN </a>. It's quite complete and worth reading. In particular, note that data can only be passed back and forth if it's serializable. Functions, for instance, are not.</div>

### Do something dangerous {: #do_something }

When `sandbox.html` is loaded, it loads the Handlebars library, and creates and compiles an inline
template in the way Handlebars suggests:

```html
<script src="handlebars-1.0.0.beta.6.js"></script>
<script id="hello-world-template" type="text/x-handlebars-template">
  <div class="entry">
    <h1>Hello, {{thing}}!</h1>
  </div>
</script>
<script>
  var templates = [];
  var source = document.getElementById('hello-world-template').innerHTML;
  templates['hello'] = Handlebars.compile(source);
</script>
```

This doesn't fail! Even though `Handlebars.compile` ends up using `new Function`, things work
exactly as expected, and we end up with a compiled template in `templates['hello']`.

### Pass the result back {: #pass_result }

We'll make this template available for use by setting up a message listener that accepts commands
from the Event Page. We'll use the `command` passed in to determine what ought to be done (you could
imagine doing more than simply rendering; perhaps creating templates? Perhaps managing them in some
way?), and the `context` will be passed into the template directly for rendering. The rendered HTML
will be passed back to the Event Page so the extension can do something useful with it later on:

```html
<script>
  window.addEventListener('message', function(event) {
    var command = event.data.command;
    var name = event.data.name || 'hello';
    switch(command) {
      case 'render':
        event.source.postMessage({
          name: name,
          html: templates[name](event.data.context)
        }, event.origin);
        break;

      // case 'somethingElse':
      //   ...
    }
  });
</script>
```

Back in the Event Page, we'll receive this message, and do something interesting with the `html`
data we've been passed. In this case, we'll just echo it out via a [Desktop Notification][13], but
it's entirely possible to use this HTML safely as part of the extension's UI. Inserting it via
`innerHTML` doesn't pose a significant security risk, as even a complete compromise of the sandboxed
code through some clever attack would be unable to inject dangerous script or plugin content into
the high-permission extension context.

This mechanism makes templating straightforward, but it of course isn't limited to templating. Any
code that doesn't work out of the box under a strict Content Security Policy can be sandboxed; in
fact, it's often useful to sandbox components of your extensions that _would_ run correctly in order
to restrict each piece of your program to the smallest set of privileges necessary for it to
properly execute. The [Writing Secure Web Apps and Chrome Extensions][14] presentation from Google
I/O 2012 gives some good examples of these technique in action, and is worth 56 minutes of your
time.

[1]: /docs/extensions/mv2/contentSecurityPolicy
[2]: /docs/extensions/mv2/contentSecurityPolicy
[3]: http://angularjs.org/
[4]: http://crbug.com/107538
[5]:
  http://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#sandboxed-origin-browsing-context-flag
[6]: /docs/extensions/mv2/samples#sandboxed-frame
[7]: http://handlebarsjs.com
[8]: /docs/extensions/examples/howto/sandbox/sandbox.html
[9]: /docs/apps/event_pages
[10]: /docs/extensions/examples/howto/sandbox/eventpage.html
[11]: /docs/extensions/examples/howto/sandbox/eventpage.js
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
[13]: /docs/extensions/mv2/desktop_notifications
[14]: http://www.youtube.com/watch?v=GBxv8SaX0gg
