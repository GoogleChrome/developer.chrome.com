---
layout: "layouts/blog-post.njk"
title: Yo Polymer – A Whirlwind Tour Of Web Component Tooling
description: >
  A whirlwind tour of Web Components, Polymer and front-end tooling for them.
authors:
  - addyosmani
date: 2014-01-19
updated: 2018-12-24
---


{% YouTube id="booRxAJblwM" %}


[Web Components](https://www.w3.org/TR/components-intro/) are going to change everything you think you know about building for the web. For the first time, the web will have low level APIs allowing us to not only create our own HTML tags but also encapsulate logic and CSS. No more global stylesheet soup or boilerplate code! It’s a brave new world where everything is an element.

In my talk from [DotJS](https://www.dotjs.io/), I walk through what Web Components have to offer and how to build them using modern tooling. I’ll show you [Yeoman](https://yeoman.io/), a workflow of tools to streamline creating web-apps using [Polymer](https://www.polymer-project.org/), a library of polyfills and sugar for developing apps using Web Components in modern browsers today.



## Create custom elements & install elements created by others

**In this talk you will learn:**

* About the four different specs composing Web Components: [Custom Elements](https://polymer-library.polymer-project.org/3.0/docs/devguide/custom-elements), [Templates](https://polymer-library.polymer-project.org/3.0/docs/devguide/dom-template), [Shadow DOM](https://polymer-library.polymer-project.org/3.0/docs/devguide/shadow-dom) and [HTML imports](http://robdodson.me/exploring-html-imports/).
* How to define your own custom elements and install elements created by others using [Bower](https://bower.io/)
* Spend less time writing JavaScript and more time constructing pages
* Use modern front-end tooling ([Yeoman](https://yeoman.io/)) to scaffold an application using Polymer with [generator-polymer](//github.com/yeoman/generator-polymer)
* How Polymer super changes creating web components.

For example, to install Polymer's Web Component polyfills and the library itself, you can run this one liner:

```shell
bower install --save Polymer/platform Polymer/polymer
```

This adds a `bower_components` folder and adds the above packages. `--save` adds them to your app's bower.json file.

Later, if you wanted to install Polymer's accordion element you could run:

```shell
bower install --save Polymer/polymer-ui-accordion
```

and then import it into your application:

```html
<link rel="import" href="bower_components/polymer-ui-accordion/polymer-ui-accordion.html">
```


To save time, scaffolding out a new Polymer app with all the dependencies you need, boilerplate code and tooling for optimizing your app can be done with Yeoman with this other one liner:

```shell
yo polymer
```

## Bonus walkthrough

I also recorded a 30 minute bonus walkthrough of the Polymer Jukebox app I show in the talk.

{% YouTube id="Yd6Q4Wwvpd0" %}


**Covered in the bonus video:**

* What the “everything is an element” mantra means
* How to use Bower to install Polymer’s Platform polyfills and elements
* Scaffolding our Jukebox app with the Yeoman generator and sub-generators
* Understanding the platform features scaffolded out via boilerplate
* How I functionally ported over an [Angular](https://github.com/jgthms/juketube) app over to Polymer.

We also make use of Yeoman sub-generators for scaffolding our new Polymer elements. e.g to create the boilerplate for an element `foo` we run:

```shell
yo polymer:element foo
```

which will prompt us for whether we would like the element automatically imported, whether a constructor is required and for a few other preferences.

The latest sources for the app shown in both talks are now up on [GitHub](https://github.com/addyosmani/yt-jukebox). I’ve refactored it a little further to be more organized and a little more easy to read.

Preview of the app:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/TwfPgyrGfAOSNE3YQoZI.png", alt="Yo Polymer app preview", width="800", height="539" %}
</figure>

## Further reading

In summary, Polymer is a JavaScript library that enables Web Components now in modern web browsers as we wait for them to be implemented natively. Modern tooling can help improve your workflow using them and you might enjoy trying out Yeoman and Bower when developing your own tags.

A few other articles that are worth checking out on the subject:

* [Building WebApps With Yeoman and Polymer](https://www.html5rocks.com/tutorials/webcomponents/yeoman/)
* [Concatenating Web Components With Vulcanize](http://www.polymer-project.org/articles/concatenating-web-components.html)
* [Chrome Dev Summit: Polymer declarative, encapsulated, reusable components](/blog/chrome-dev-summit-polymer-declarative-encapsulated-reusable-components)
* [The Landscape Of Development Automation](/blog/the-landscape-of-front-end-development-automation-slides/)
* [Web Components: the future of web development](http://html5-demos.appspot.com/static/cds2013/index.html#26)
* [Building Apps With The Yeoman Workflow](https://code.tutsplus.com/tutorials/building-apps-with-the-yeoman-workflow--net-33254)


