---
layout: 'layouts/blog-post.njk'
title: Introduction to JavaScript Source Maps
authors:
  - ryanseddon
date: 2012-03-21
#updated: 2013-10-29
is_outdated: true
new_available_content_url: https://web.dev/source-maps/
---

{% Aside 'warning' %}
[Source map specification](https://bit.ly/sourcemap) has been updated and this article is no longer up to date. Refer to [What are source maps?](https://web.dev/source-maps) for the latest information.
{% endAside %}

Have you ever wished you could keep your client-side code readable and more importantly debuggable even after you've combined and minified it, without impacting performance? Well now you can through the magic of [source maps](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&amp;pli=1&amp;pli=1).

Source maps are a way to map a combined/minified file back to an unbuilt state. When you build for production, along with minifying and combining your JavaScript files, you generate a source map which holds information about your original files. When you query a certain line and column number in your generated JavaScript you can do a lookup in the source map which returns the original location. Developer tools (currently WebKit nightly builds, Google Chrome, or Firefox 23+) can parse the source map automatically and make it appear as though you're running unminified and uncombined files.

{% Aside 'codelab' %}
Demo: [Get original location](http://www.thecssninja.com/demo/source_mapping/).
{% endAside %}

The demo allows you to right click anywhere in the textarea containing the generated source. Select "Get original location" will query the source map by passing in the generated line and column number, and return the position in the original code. Make sure your console is open so you can see the output.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/qhQfTJG9LNTum6qH5lDT.png", alt="Example of the Mozilla JavaScript source map library in action.", width="609", height="155" %}
</figure>

## Real world

Before you view the following real world implementation of Source Maps make sure you've enabled the source maps feature in either Chrome Canary or WebKit nightly by clicking the settings cog in the dev tools panel and checking the "Enable source maps" option.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/EVrHHO6vHUsmYUlO2lWX.png", alt="How to enable source maps in WebKit dev tools.", width="609", height="232" %}
</figure>

Firefox 23+ has source maps enabled by default in the built in dev tools.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/zBVmQq2jpigsAanmtWA2.png", alt="How to enable source maps in Firefox dev tools.", width="609", height="224" %}
</figure>

## Why should I care about source maps?

Right now source mapping is only working between uncompressed/combined JavaScript to compressed/uncombined JavaScript, but the future is looking bright with talks of compiled-to-JavaScript languages such as CoffeeScript and even the possibility of adding support for CSS preprocessors like SASS or LESS.

In the future we could easily use almost any language as though it were supported natively in the browser with source maps:

- CoffeeScript
- ECMAScript 6 and beyond
- SASS/LESS and others
- Pretty much any language that compiles to JavaScript

Take a look at this screencast of CoffeeScript being debugged in an experimental build of the Firefox console:

{% YouTube id="2aQw1dSIYko", startTime="625" %}

The Google Web Toolkit (GWT) has recently added [support for Source Maps](http://code.google.com/p/google-web-toolkit/wiki/SourceMaps).
Ray Cromwell of the GWT team did an awesome screencast showing source map support in action.

{% YouTube id="-xJl22Kvgjg" %}

Another example I've put together uses Google's [Traceur](http://code.google.com/p/traceur-compiler/) library which allows you to write ES6 (ECMAScript 6 or Next) and compile it to ES3 compatible code. The Traceur compiler also generates a source map. Take a look at this [demo](http://www.thecssninja.com/demo/source_mapping/ES6/) of ES6 traits and classes being used like they're supported natively in the browser, thanks to the source map.

The textarea in the demo also allows you to write ES6 which will be compiled on the fly and generate a source map plus the equivalent ES3 code.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JAzGjkmTopkHZXIoTzyf.png", alt="Traceur ES6 debugging using source maps.", width="609", height="263" %}
</figure>

[Demo: Write ES6, debug it, view source mapping in action](http://www.thecssninja.com/demo/source_mapping/ES6/)

## How does the source map work?

The only JavaScript compiler/minifier that has support, at the moment, for source map generation is the Closure compiler. (I'll explain how to use it later.) Once you've combined and minified your JavaScript, alongside it will exist a source map file.

Currently, the Closure compiler doesn't add the special comment at the end that is required to signify to a browsers dev tools that a source map is available:


```js
//# sourceMappingURL=/path/to/file.js.map
```

This enables developer tools to map calls back to their location in original source files. Previously the comment pragma was `//@` but due to some issues with that and IE conditional compilation comments the [decision was made](https://groups.google.com/forum/#!topic/mozilla.dev.js-sourcemap/4uo7Z5nTfUY) to change it to `//#`. Currently Chrome Canary, WebKit Nightly and Firefox 24+ support the new comment pragma. This syntax change also affects sourceURL.

If you don't like the idea of the weird comment you can alternatively set a special header on your compiled JavaScript file:

```http
X-SourceMap: /path/to/file.js.map
```

Like the comment this will tell your source map consumer where to look for the source map associated with a JavaScript file. This header also gets around the issue of referencing source maps in languages that don't support single-line comments.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/LimbFjACuedF8bsTI7jZ.png", alt="WebKit Devtools example of source maps on and source maps off.", width="609", height="160" %}
</figure>

The source map file will only be downloaded if you have source maps enabled and your dev tools open. You'll also need to upload your original files so the dev tools can reference and display them when necessary.

## How do I generate a source map?

You'll need to use the [Closure compiler](https://developers.google.com/closure/compiler/) to minify, concat and generate a source map for your JavaScript files. The command is as follows:

```shell
java -jar compiler.jar \
--js script.js \
--create_source_map ./script-min.js.map \
--source_map_format=V3 \
--js_output_file script-min.js
```

The two important command flags are `--create_source_map` and `--source_map_format`. This is required as the default version is V2 and we only want to work with V3.

## The anatomy of a source map

To better understand a source map, we'll take a small example of a source map file that would be generated by the Closure compiler and dive into more detail on how the "mappings" section works. The following example is a slight variation from the [V3 spec](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&amp;pli=1&amp;pli=1) example.

```json
{
    version : 3,
    file: "out.js",
    sourceRoot : "",
    sources: ["foo.js", "bar.js"],
    names: ["src", "maps", "are", "fun"],
    mappings: "AAgBC,SAAQ,CAAEA"
}
```

Above you can see that a source map is an object literal containing lots of juicy info:

- Version number that the source map is based off
- The file name of the generated code (Your minifed/combined production file)
- sourceRoot allows you to prepend the sources with a folder structure - this is also a space saving technique
- sources contains all the file names that were combined
- names contains all variable/method names that appear throughout your code.
- Lastly the mappings property is where the magic happens using Base64 VLQ values. The real space saving is done here.

## Base64 VLQ and keeping the source map small

Originally, the source map spec had a very verbose output of all the mappings and resulted in the source map being about 10 times the size of the generated code. Version two reduced that by around 50% and version three reduced it again by another 50%, so for a 133kB file you end up with a ~300kB source map.

So how did they reduce the size while still maintaining the complex mappings?

[VLQ](http://en.wikipedia.org/wiki/Variable-length_quantity) (Variable Length Quantity) is used along with encoding the value into a Base64 value. The mappings property is a super big string. Within this string are semicolons (;) that represent a line number within the generated file. Within each line there are commas (,) that represent each segment within that line. Each of these segments is either 1, 4 or 5 in variable length fields. Some may appear longer but these contain continuation bits. Each segment builds upon the previous, which helps reduce the file size as each bit is relative to its previous segments.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/s9OBEzuUo3o5HLyKsnc7.png", alt="Breakdown of a segment within the source map JSON file.", width="609", height="300" %}
</figure>

As mentioned above, each segment can be 1, 4 or 5 in variable length. This diagram is considered a variable length of four with one continuation bit (g). We'll break down this segment and show you how the source map works out the original location.

The values shown above are purely the Base64 decoded values, there is some more processing to get their true values. Each segment usually works out five things:

- Generated column
- Original file this appeared in
- Original line number
- Original column
- And, if available, original name

Not every segment has a name, method name or argument, so segments throughout will switch between four and five variable length. The g value in the segment diagram above is what's called a continuation bit this allows for further optimisation in the Base64 VLQ decoding stage. A continuation bit allows you to build on a segment value so you can store big numbers without having to store a big number, a very clever space saving technique that has its roots in the midi format.

The above diagram `AAgBC` once processed further would return 0, 0, 32, 16, 1 - the 32 being the continuation bit that helps build the following value of 16. B purely decoded in Base64 is 1. So the important values that are used are 0, 0, 16, 1. This then lets us know that line 1 (lines are kept count by the semi colons) column 0 of the generated file maps to file 0 (array of files 0 is foo.js), line 16 at column 1.

To show how the segments get decoded I will be referencing Mozilla's [Source Map JavaScript library](https://github.com/mozilla/source-map/). You can also look at the WebKit dev tools [source mapping code](http://code.google.com/codesearch#OAMlx_jo-ck/src/third_party/WebKit/Source/WebCore/inspector/front-end/CompilerSourceMapping.js), also written in JavaScript.

To properly understand how we get the value 16 from B, we need to have a basic understanding of bitwise operators and how the spec works for source mapping. The preceding digit, g, gets flagged as a continuation bit by comparing the digit (32) and the [VLQ_CONTINUATION_BIT](https://github.com/mozilla/source-map/blob/master/lib/source-map/base64-vlq.js#L32)</a> (binary 100000 or 32) by using the bitwise AND (&) operator.

```js
32 & 32 = 32
// or
100000
|
|
V
100000
```

This returns a 1 in each bit position where both have it appear. So a Base64 decoded value of `33 & 32` would return 32 as they only share the 32 bit location as you can see in the above diagram. This then increases the the bit [shift value](https://github.com/mozilla/source-map/blob/master/lib/source-map/base64-vlq.js#L52) by 5 for each preceding continuation bit. In the above case its only shifted by 5 once, so left shifting 1 (B) by 5.

```js
1 << 5 // 32

// Shift the bit by 5 spots
______
|    |
V    V
100001 = 100000 = 32
```

That value is then converted from a VLQ signed value by right shifting the number (32) one spot.

```js
32 >> 1 // 16
//or
100000
|
 |
 V
010000 = 16
```

So there we have it: that is how you turn 1 into 16. This may seem an over complicated process, but once the numbers start getting bigger it makes more sense.

## Potential XSSI issues

The spec mentions cross site script inclusion issues that could arise from the consumption of a source map. To mitigate this, it's recommended that you prepend the first line of your source map with "`)]}`" to deliberately invalidate JavaScript so a syntax error will be thrown. The WebKit dev tools can handle this already.

```js
if (response.slice(0, 3) === ")]}") {
    response = response.substring(response.indexOf('\n'));
}
```

As shown above, the first three characters are sliced to check if they match the syntax error in the spec and if so removes all characters leading up to the first new line entity (\n).

## `sourceURL` and `displayName` in action: Eval and anonymous functions

While not part of the source map spec the following two conventions allow you to make development much easier when working with evals and anonymous functions.

The first helper looks very similar to the `//# sourceMappingURL` property and is actually mentioned in the source map V3 spec. By including the following special comment in your code, which will be evaled, you can name evals so they appear as more logical names in your dev tools. Check out a simple demo using the CoffeeScript compiler:

[Demo: See `eval()`'d code show as a script via sourceURL](http://www.thecssninja.com/demo/source_mapping/compile.html)

```js
//# sourceURL=sqrt.coffee
```

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/8WMTQjFcwINKbglRhyZ3.png", alt="What sourceURL special comment looks like in dev tools", width="609", height="298" %}
</figure>

The other helper allows you to name anonymous functions by using the `displayName` property available on the current context of the anonymous function. Profile the [following demo](http://www.thecssninja.com/demo/source_mapping/displayName.html) to see the `displayName` property in action.

{% Aside 'codelab' %}
[Demo: Named anon functions via displayName (Webkit Nightly only)](http://www.thecssninja.com/demo/source_mapping/displayName.html)
{% endAside %}

```js
btns[0].addEventListener("click", function(e) {
    var fn = function() {
        console.log("You clicked button number: 1");
    };

    fn.displayName = "Anonymous function of button 1";

    return fn();
}, false);
```

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/SIuBvK0nTE33cm3yYChS.png", alt="Showing the displayName property in action.", width="611", height="149" %}
</figure>

When profiling your code within the dev tools the `displayName` property will be shown rather than something like `(anonymous)`. However displayName is pretty much dead in the water and won't be making it into Chrome. But all hope isn't lost and a much better proposal has been suggested called [debugName](http://code.google.com/p/chromium/issues/detail?id=116220).

As of writing the eval naming is only available in Firefox and WebKit browsers. The `displayName` property is only in WebKit nightlies.

## Let's rally together

Currently there is very lengthy discussion on [source map support](https://github.com/jashkenas/coffee-script/issues/558) being added to CoffeeScript. Go check out the issue and add your support for getting source map generation added to the CoffeeScript compiler. This will be a huge win for CoffeeScript and its devoted followers.

UglifyJS also has a [source map issue](https://github.com/mishoo/UglifyJS/issues/315) you should take a look at too.

Lot's of [tools](https://github.com/ryanseddon/source-map/wiki/Source-maps%3A-languages,-tools-and-other-info) generate source maps, including the coffeescript compiler. I consider this a moot point now.

The more tools available to us that can generate a source maps the better off we'll be, so go forth and ask or add source map support to your favourite open source project.

## It's not perfect

One thing source maps doesn't cater for right now is watch expressions. The problem is that trying to inspect an argument or variable name within the current execution context won't return anything as it doesn't really exist. This would require some sort of reverse mapping to lookup the real name of the argument/variable you wish to inspect compared to the actual argument/variable name in your compiled JavaScript.

This of course is a solvable problem and with more attention on source maps we can start seeing some amazing features and better stability.

## Issues

Recently [jQuery 1.9](http://blog.jquery.com/2013/01/15/jquery-1-9-final-jquery-2-0-beta-migrate-final-released/) added support for source maps when served off of offical CDNs. It also pointed a [peculiar bug](http://bugs.jquery.com/ticket/13274#comment:6) when IE conditional compilation comments (//@cc_on) are used before jQuery loads. There has since been a [commit](https://github.com/jquery/jquery/commit/487b703521e63188102c73e8ce6ce203d28f260b) to mitigate this by wrapping the sourceMappingURL in a multi-line comment. Lesson to be learned don't use conditional comment.

This has since [been addressed](https://groups.google.com/forum/#!topic/mozilla.dev.js-sourcemap/4uo7Z5nTfUY) with the changing of the syntax to `//#`.

## Tools and resource

Here's some further resources and tools you should check out:

- Nick Fitzgerald has a fork of [UglifyJS](https://github.com/fitzgen/UglifyJS/tree/source-maps) with source map support
- Paul Irish has a handy little [demo](http://dl.dropbox.com/u/39519/sourcemapapp/index.html) showing off source maps
- Check out the WebKit changeset of when this [dropped](http://trac.webkit.org/changeset/103541)
- The changeset also included a [layout test](http://trac.webkit.org/export/105549/trunk/LayoutTests/http/tests/inspector/compiler-source-mapping-debug.html) which got this whole article started
- Mozilla has a [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=670002) you should follow on the status of source maps in the built-in console
- Conrad Irwin has written a super useful [source map gem](https://github.com/ConradIrwin/ruby-source_map) for all you Ruby users
- Some further reading on [eval naming](http://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/) and the [displayName property](http://www.alertdebugging.com/2009/04/29/building-a-better-javascript-profiler-with-webkit/)
- You can check out the [Closure Compilers source](http://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/SourceMapGeneratorV3.java) for creating source maps
- There are some screenshots and talk of support for [GWT source maps](https://plus.google.com/110412141990454266397/posts/iqXo5AyHkyd)

Source maps are a very powerful utility in a developer's tool set. It's super useful to be able to keep your web app lean but easily debuggable. It's also a very powerful learning tool for newer developers to see how experienced devs structure and write their apps without having to wade through unreadable minified code.

What are you waiting for? Start generating source maps for all projects now!
