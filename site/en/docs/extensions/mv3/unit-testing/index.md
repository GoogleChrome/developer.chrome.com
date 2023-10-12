---
layout: "layouts/doc-post.njk"
title: "Unit testing Chrome Extensions"
seoTitle: "Unit testing Chrome Extensions"
date: 2023-10-12
description: How to write unit tests for extensions.
---

[Unit testing][unit-testing] allows small sections of code to be tested in isolation from the rest
of your extension, and outside of the browser. For example, you could write a unit test to ensure
that a helper method correctly writes a value to storage.

Code written without using extension APIs can be tested as normal, using a framework such as
[Jest][jest]. To make code easier to test this way, consider using techniques such as
[dependency injection][dependency-injection] which can help to remove dependencies on the chrome
namespace in your lower level implementation.

If you need to test code which includes extension APIs, consider using mocks.

## Example: Using mocks with Jest {: #using-mocks }

Create a `jest.config.js` file, which declares a setup file that will run before all tests:

{% Label %}jest.config.js:{% endLabel %}

```js
module.exports = {
  setupFiles: ['<rootDir>/mock-extension-apis.js']
};
```

In `mock-extension-apis.js`, add implementations for the specific functions you expect to call:

{% Label %}mock-extension-apis.js:{% endLabel %}

```js
global.chrome = {
  tabs: {
    query: async () => { throw new Error("Unimplemented.") };
  }
};
```

Then, use `jest.spy` to mock a return value in a test:

```js
test("getActiveTabId returns active tab ID", async () => {
  jest.spyOn(chrome.tabs, "query").mockResolvedValue([{
    id: 3,
    active: true,
    currentWindow: true
  }]);
  expect(await getActiveTabId()).toBe(3);
});
```

## Next steps {: #continue }

To ensure your extension functions as expected, we recommend adding [end-to-end tests][end-to-end]. See [Testing Chrome Extensions with Puppeteer][pupeteer-tutorial] for a complete tutorial.

[unit-testing]: https://wikipedia.org/wiki/Unit_testing
[jest]: https://jestjs.io/
[dependency-injection]: https://wikipedia.org/wiki/Dependency_injection
[pupeteer-tutorial]: /docs/extensions/mv3/tut_puppeteer-testing/
[end-to-end]: /docs/extensions/mv3/end-to-end-testing/

