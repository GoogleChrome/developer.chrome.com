---
layout: "layouts/doc-post.njk"
title: "Using eval in Chrome extensions"
date: 2012-09-18
updated: 2023-02-06
description: How to use eval() in a Chrome Extension.
---


Chrome's extension system enforces a fairly strict default [**Content Security Policy (CSP)**][1].
The policy restrictions are straightforward: script must be moved out-of-line into separate
JavaScript files, inline event handlers must be converted to use `addEventListener`, and `eval()` is
disabled.

We recognize, however, that a variety of libraries use `eval()` and `eval`\-like constructs such as
`new Function()` for performance optimization and ease of expression. Templating libraries are
especially prone to this style of implementation. While some (like [Angular.js][3]) support CSP out
of the box, many popular frameworks haven't yet updated to a mechanism that is compatible with
extensions' `eval`\-less world. Removing support for that functionality has therefore proven [more
problematic than expected][4] for developers.

This document introduces sandboxing as a safe mechanism to include these libraries in your projects
without compromising on security.

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

## Creating and using a sandbox {: #creating_and_using }

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
it can be addressed by the extension's code. Here, sandbox.html has been loaded into
an extension page via an `iframe`. The page's javascript file contains code that sends a message 
into the sandbox whenever the browser action is clicked by finding the `iframe`
on the page, and executing the `postMessage` method on its `contentWindow`. The message is an object
containing three properties: `context`, `templateName`, and `command`. We'll dive in to `context` and `command` in a moment.

{% Label %}service-worker.js:{% endLabel %}

```js
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: 'mainpage.html'
  });
  console.log('Opened a tab with a sandboxed page!');
});
```

{% Label %}extension-page.js:{% endLabel %}

```js
let counter = 0;
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reset').addEventListener('click', function () {
    counter = 0;
    document.querySelector('#result').innerHTML = '';
  });

  document.getElementById('sendMessage').addEventListener('click', function () {
    counter++;
    let message = {
      command: 'render',
      templateName: 'sample-template-' + counter,
      context: { counter: counter }
    };
    document.getElementById('theFrame').contentWindow.postMessage(message, '*');
  });
```

{% Aside %}For general information about <code>postMessage()</code>, look at the <a href="https://developer.mozilla.org/en/DOM/window.postMessage"><code>postMessage()</code> documentation on MDN </a>. It's quite complete and worth reading. In particular, note that data can only be passed back and forth if it's serializable. Functions, for instance, are not serializable.{% endAside %}

### Do something dangerous {: #do_something }

When `sandbox.html` is loaded, it loads the Handlebars library, and creates and compiles an inline
template in the way Handlebars suggests:

{% Label %}extension-page.html:{% endLabel %}

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="mainpage.js"></script>
    <link href="styles/main.css" rel="stylesheet" />
  </head>
  <body>
    <div id="buttons">
      <button id="sendMessage">Click me</button>
      <button id="reset">Reset counter</button>
    </div>

    <div id="result"></div>

    <iframe id="theFrame" src="sandbox.html" style="display: none"></iframe>
  </body>
</html>
```
{% Label %}sandbox.html:{% endLabel %}

```html
   <script id="sample-template-1" type="text/x-handlebars-template">
      <div class='entry'>
        <h1>Hello</h1>
        <p>This is a Handlebar template compiled inside a hidden sandboxed
          iframe.</p>
        <p>The counter parameter from postMessage() (outer frame) is:
          {{counter}}</p>
      </div>
    </script>

    <script id="sample-template-2" type="text/x-handlebars-template">
      <div class='entry'>
        <h1>Welcome back</h1>
        <p>This is another Handlebar template compiled inside a hidden sandboxed
          iframe.</p>
        <p>The counter parameter from postMessage() (outer frame) is:
          {{counter}}</p>
      </div>
    </script>
```

This doesn't fail! Even though `Handlebars.compile` ends up using `new Function`, things work
exactly as expected, and we end up with a compiled template in `templates['hello']`.

### Pass the result back {: #pass_result }

We'll make this template available for use by setting up a message listener that accepts commands
from the extension page. We'll use the `command` passed in to determine what ought to be done (you could
imagine doing more than simply rendering; perhaps creating templates? Perhaps managing them in some
way?), and the `context` will be passed into the template directly for rendering. The rendered HTML
will be passed back to the extension page so the extension can do something useful with it later on:

```html
 <script>
      const templatesElements = document.querySelectorAll(
        "script[type='text/x-handlebars-template']"
      );
      let templates = {},
        source,
        name;

      // precompile all templates in this page
      for (let i = 0; i < templatesElements.length; i++) {
        source = templatesElements[i].innerHTML;
        name = templatesElements[i].id;
        templates[name] = Handlebars.compile(source);
      }

      // Set up message event handler:
      window.addEventListener('message', function (event) {
        const command = event.data.command;
        const template = templates[event.data.templateName];
        let result = 'invalid request';

       // if we don't know the templateName requested, return an error message
        if (template) {
          switch (command) {
            case 'render':
              result = template(event.data.context);
              break;
            // you could even do dynamic compilation, by accepting a command
            // to compile a new template instead of using static ones, for example:
            // case 'new':
            //   template = Handlebars.compile(event.data.templateSource);
            //   result = template(event.data.context);
            //   break;
              }
        } else {
            result = 'Unknown template: ' + event.data.templateName;
        }
        event.source.postMessage({ result: result }, event.origin);
      });
    </script>
```

Back in the extension page, we'll receive this message, and do something interesting with the `html`
data we've been passed. In this case, we'll just echo it out via a [Desktop Notification][13], but
it's entirely possible to use this HTML safely as part of the extension's UI. Inserting it via
`innerHTML` doesn't pose a significant security risk as we trust the content which has been rendered
within the sandbox.

This mechanism makes templating straightforward, but it of course isn't limited to templating. Any
code that doesn't work out of the box under a strict Content Security Policy can be sandboxed; in
fact, it's often useful to sandbox components of your extensions that _would_ run correctly in order
to restrict each piece of your program to the smallest set of privileges necessary for it to
properly execute. The [Writing Secure Web Apps and Chrome Extensions][14] presentation from Google
I/O 2012 gives some good examples of these technique in action, and is worth 56 minutes of your
time.

[1]: /docs/extensions/mv3/manifest/content_security_policy/#default-policy
[2]: /docs/extensions/mv3/contentSecurityPolicy
[3]: https://angularjs.org/
[4]: https://crbug.com/107538
[5]: https://www.whatwg.org/specs/web-apps/current-work/multipage/origin-0.html#sandboxed-origin-browsing-context-flag
[6]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/sandbox/sandbox
[7]: https://handlebarsjs.com
[8]: /docs/extensions/examples/howto/sandbox/sandbox.html
[9]: /docs/extensions/mv3/event_pages
[10]: /docs/extensions/examples/howto/sandbox/eventpage.html
[11]: /docs/extensions/examples/howto/sandbox/eventpage.js
[12]: https://developer.mozilla.org/en/DOM/window.postMessage
[13]: /docs/extensions/mv3/desktop_notifications
[14]: https://www.youtube.com/watch?v=GBxv8SaX0gg
