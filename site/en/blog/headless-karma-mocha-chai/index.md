---
layout: 'layouts/blog-post.njk'
title:  Automated testing with Headless Chrome
description: >
    Automated testing with Headless Chrome
authors:
  - ericbidelman
date: 2017-06-13
updated: 2018-08-05
---

If you want to run automated tests using Headless Chrome, look no further! This article will get you
all set up using Karma as a runner and Mocha+Chai for authoring tests.

**What are these things?**

Karma, Mocha, Chai, Headless Chrome, oh my!

[Karma](https://karma-runner.github.io) is a testing harness that works with
any of the most popular testing frameworks ([Jasmine](https://jasmine.github.io/), [Mocha](https://mochajs.org/), [QUnit](https://qunitjs.com/)).

[Chai](http://chaijs.com/) is an assertion library that works with Node and in the browser.
We need the latter.

[Headless Chrome](/blog/headless-chrome) is a way to run
the Chrome browser in a headless environment without the full browser UI. One of
the benefits of using Headless Chrome (as opposed to testing directly in Node)
is that your JavaScript tests will be executed in the same environment as users
of your site. Headless Chrome gives you a real browser context without the
memory overhead of running a full version of Chrome.

## Setup

### Installation

Install Karma, the relevant, plugins, and the test runners using `yarn`:

```shell
yarn add --dev karma karma-chrome-launcher karma-mocha karma-chai
yarn add --dev mocha chai
```

or use `npm`:

```shell
npm i --save-dev karma karma-chrome-launcher karma-mocha karma-chai
npm i --save-dev mocha chai
```

I'm using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) in this post, but
if you're not a fan, choose your favorite assertion library that works in the browser.


### Configure Karma

Create a `karma.conf.js` file that uses the `ChromeHeadless` launcher.

**karma.conf.js**

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.js'],
    reporters: ['progress'],
    port: 9876,  // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
```

{% Aside %}
Run `./node_modules/karma/bin/karma init karma.conf.js` to generate the Karma configuration file.
{% endAside %}


## Write a test

Create a test in `/test/test.js`.

**/test/test.js**

```javascript
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

## Run your tests

Add a `test` script in `package.json` that runs Karma with our settings.

**package.json**

```json
"scripts": {
  "test": "karma start --single-run --browsers ChromeHeadless karma.conf.js"
}
```

When you run your tests (`yarn test`), Headless Chrome should fire up and output
the results to the terminal:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/3ETo5lj0gEodW5aXRcsK.png", alt="Output from Karma.", width="800", height="115" %}
</figure>

## Creating your own Headless Chrome launcher

The `ChromeHeadless` launcher is great because it works out of the box for
testing on Headless Chrome. It includes the appropriate Chrome flags for you and
launches a remote debugging version of Chrome on port `9222`.

However, sometimes you may want to pass custom flags to Chrome or change the
remote debugging port the launcher uses. To do that, create a `customLaunchers`
field that extends the base `ChromeHeadless` launcher:

**karma.conf.js**

```javascript
module.exports = function(config) {
  ...

  config.set({
    browsers: ['Chrome', 'ChromeHeadless', 'MyHeadlessChrome'],

    customLaunchers: {
      MyHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    },
  }
};
```

## Running it all on Travis CI

Configuring Karma to run your tests in Headless Chrome is the hard part.
Continuous integration in Travis is just a few lines away!

To run your tests in Travis, use `dist: trusty` and install the Chrome stable addon:

**.travis.yml**

```yaml
language: node_js
node_js:
  - "7"
dist: trusty # needs Ubuntu Trusty
# Note: if you switch to sudo: false, you'll need to launch Chrome with --no-sandbox.
# See https://github.com/travis-ci/travis-ci/issues/8836
sudo: required
addons:
  chrome: stable # have Travis install Chrome stable.
cache:
  yarn: true
  directories:
    - node_modules
install:
  - yarn
script:
  - yarn test
```


{% Aside %}
Check out the [example repo](https://github.com/ebidel/headless-karma-travis) for reference.
{% endAside %}

