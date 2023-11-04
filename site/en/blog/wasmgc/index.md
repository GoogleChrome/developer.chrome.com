---
layout: 'layouts/blog-post.njk'
title: WebAssembly Garbage Collection (WasmGC) now enabled by default in Chrome
description: >
  There are two types of programming languages: garbage-collected programming languages and programming languages that require manual memory management. This article explains how thanks to WebAssembly Garbage Collection, short WasmGC, garbage-collected languages can be ported to WebAssembly.
authors:
  - thomassteiner
date: 2023-10-31
# updated: 2023-10-31
hero: image/8WbTDNrhLsU0El80frMBGE4eMCD3/gc5UyHFm1C4tPAQC6D1o.png
alt: Pictogram of a person throwing something in a trash can.
tags:
  - wasm
---

There are two types of programming languages: garbage-collected programming languages and programming languages that require manual memory management. Examples of the former, among many more, are Kotlin, PHP, or Java. Examples of the latter are C, C++, or Rust. As a general rule, higher-level programming languages are more likely to have garbage collection as a standard feature. In this blog post, the focus is on such garbage-collected programming languages and how they can be compiled to WebAssembly (Wasm). But what is garbage collection (often referred to as GC) to begin with?

{% BrowserCompat 'webassembly.garbage-collection' %}

{% Aside %}
The present article covers the concepts behind WasmGC in high level. For an in-depth article on the topic, read [A new way to bring garbage collected programming languages efficiently to WebAssembly](https://v8.dev/blog/wasm-gc-porting) on the V8 blog.
{% endAside %}

## Garbage collection

In simplified terms, the idea of garbage collection is the attempt to reclaim memory which was allocated by the program, but that is no longer referenced. Such memory is called garbage. There are many strategies for implementing garbage collection. One of them is [reference counting](https://en.wikipedia.org/wiki/Reference_counting) where the objective is to count the number of references to objects in memory. When there are no more references to an object, it can be marked as no longer used and thus ready for garbage collection. [PHP](https://www.php.net/)'s garbage collector [uses  reference counting](https://www.php.net/manual/en/features.gc.refcounting-basics.php), and using the [Xdebug](https://xdebug.org/) extension's [`xdebug_debug_zval()`](https://xdebug.org/docs/all_functions#xdebug_debug_zval) function allows you to peek under its hood. Consider the following PHP program.

```php
<?php
  $a= (string) rand();
  $c = $b = $a;
  $b = 42;
  unset($c);
  $a = null;
?>
```

The program assigns a random number casted to a string to a new variable called `a`. It then creates two new variables, `b` and `c`, and assigns them the value of `a`. After that, it reassigns `b` to the number `42`, and then unsets `c`. Finally, it sets the value of `a` to `null`. Annotating each step of the program with `xdebug_debug_zval()`, you can see the garbage collector's reference counter at work.

```php
<?php
  $a= (string) rand();
  $c = $b = $a;
  xdebug_debug_zval('a');
  $b = 42;
  xdebug_debug_zval('a');
  unset($c);
  xdebug_debug_zval('a');
  $a = null;
  xdebug_debug_zval('a');
?>
```

The above example will output the following logs, where you see how the number of references to the value of the variable `a` decreases after each step, which makes sense given the code sequence. (Your random number will be different of course.)

```bash
a:
(refcount=3, is_ref=0)string '419796578' (length=9)
a:
(refcount=2, is_ref=0)string '419796578' (length=9)
a:
(refcount=1, is_ref=0)string '419796578' (length=9)
a:
(refcount=0, is_ref=0)null

```

{% Aside %}
Reference counting is used in PHP, but most modern browsers now don't use reference-counting for garbage collection.
{% endAside %}

There are other challenges with garbage collection, like [detecting cycles](https://www.php.net/manual/en/features.gc.collecting-cycles.php), but for this article, having a basic level of understanding of reference counting is enough.

## Programming languages are implemented in other programming languages

It may feel like inception, but programming languages are implemented in other programming languages. For example, the PHP runtime is primarily implemented in C. You can check out the [PHP source code on GitHub](https://github.com/php/php-src/). PHP's garbage collection code is mainly located in the file [`zend_gc.c`](https://github.com/php/php-src/blob/master/Zend/zend_gc.c). Most developers will install PHP via the package manager of their operating system. But developers can also [build PHP from the source code](https://github.com/php/php-src/tree/master#building-php-source-code). For example, in a Linux environment, the steps `./buildconf && ./configure && make` would build PHP for the Linux runtime. But this also means that the PHP runtime can be compiled for other runtimes, like, you guessed it, Wasm.

## Traditional methods of porting languages to the Wasm runtime

Independently from the platform PHP is running on, PHP scripts are compiled into the same bytecode and run by the [Zend Engine](https://en.wikipedia.org/wiki/Zend_Engine). The Zend Engine is a compiler and runtime environment for the PHP scripting language. It consists of the Zend Virtual Machine (VM), which is composed of the Zend Compiler and the Zend Executor. Languages like PHP that are implemented in other high-level languages like C commonly have optimizations that target specific architectures, such as Intel or ARM, and require a different backend for each architecture. In this context, Wasm represents a new architecture. If the VM has architecture-specific code, like just-in-time (JIT) or ahead-of-time (AOT) compilation, then the developer also implements a backend for JIT/AOT for the new architecture. This approach makes a lot of sense because often the main part of the codebase can just be recompiled for each new architecture.

Given how low-level Wasm is, it is natural to try the same approach there: Recompile the main VM code with its parser, library support, garbage collection, and optimizer to Wasm, and implement a JIT or AOT backend for Wasm if needed. This has been possible since the Wasm MVP, and it works well in practice in many cases. In fact, [PHP compiled to Wasm](https://github.com/WordPress/wordpress-playground/blob/trunk/packages/php-wasm/compile/build.js) is what powers the [WordPress Playground](https://playground.wordpress.net/). Learn more about the project in the article [Build in-browser WordPress experiences with WordPress Playground and WebAssembly](https://web.dev/wordpress-playground/).

However, PHP Wasm runs in the browser in the context of the host language JavaScript. In Chrome, [JavaScript and Wasm are run in V8](https://v8.dev/docs/wasm-compilation-pipeline), Google's open source JavaScript engine that implements ECMAScript as specified in [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/). And, [V8 already has a garbage collector](https://chromium.googlesource.com/v8/v8.git/+/refs/heads/main/src/heap/cppgc/). This means developers making use of, for example, PHP compiled to Wasm, end up shipping a garbage collector implementation of the ported language (PHP) to the browser that already has a garbage collector, which is as wasteful as it sounds. This is where WasmGC comes in.

The other problem of the old approach of letting Wasm modules build their own GC on top of Wasm's linear memory is that there's then no interaction between Wasm's own garbage collector and the built-on-top garbage collector of the compiled-to-Wasm language, which tends to cause problems like memory leaks and inefficient collection attempts. Letting Wasm modules reuse the existing built-in GC avoids these issues.

## Porting programming languages to new runtimes with WasmGC

WasmGC is a [proposal](https://github.com/WebAssembly/gc/blob/main/proposals/gc/Overview.md) of the [WebAssembly Community Group](https://www.w3.org/community/webassembly/). The current Wasm MVP implementation is only capable of dealing with numbers, that is, integers and floats, in linear memory, and with the [reference types](https://github.com/WebAssembly/reference-types/blob/master/proposals/reference-types/Overview.md) proposal being shipped, Wasm can additionally hold on to external references. WasmGC now adds struct and array heap types, which means support for non-linear memory allocation. Each WasmGC object has a fixed type and structure, which makes it easy for VMs to generate efficient code to access their fields without the risk of [deoptimizations](https://web.dev/speed-v8/#de-optimization) that dynamic languages like JavaScript have. This proposal thereby adds efficient support for high-level managed languages to WebAssembly, via struct and array heap types that enable language compilers targeting Wasm to integrate with a garbage collector in the host VM. In simplified terms, this means that with WasmGC, porting a programming language to Wasm means the programming language's garbage collector no longer needs to be part of the port, but instead the existing garbage collector can be used.

To verify the real-world impact of this improvement, Chrome's Wasm team has compiled versions of the [Fannkuch benchmark](https://benchmarksgame-team.pages.debian.net/benchmarksgame/description/fannkuchredux.html) (which allocates data structures as it works) from [C](https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/fannkuchredux-gcc-5.html), [Rust](https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/fannkuchredux-rust-2.html), and [Java](https://benchmarksgame-team.pages.debian.net/benchmarksgame/program/fannkuchredux-java-2.html). The C and Rust binaries could be anywhere from _6.1 K_ to _9.6 K_ depending on the various compiler flags, while the Java version is much smaller at only _2.3 K_! C and Rust do not include a garbage collector, but they do still bundle `malloc/free` to manage memory, and the reason Java is smaller here is because it doesn't need to bundle any memory management code at all. This is just one specific example, but it shows that WasmGC binaries have the potential of being very small, and this is even before any significant work on optimizing for size.

## Seeing a WasmGC-ported programming language in action

### Kotlin Wasm

One of the first programming languages that has been ported to Wasm thanks to WasmGC is [Kotlin](https://kotlinlang.org/) in the form of [Kotlin/Wasm](https://kotl.in/wasmgc). The [demo](https://kotlin-wasm-hello-world.glitch.me/), with [source code](https://github.com/Kotlin/kotlin-wasm-examples/tree/main/browser-example) courtesy of the Kotlin team, is shown in the following listing.

```kotlin
import kotlinx.browser.document
import kotlinx.dom.appendText
import org.w3c.dom.HTMLDivElement

fun main() {
    (document.getElementById("warning") as HTMLDivElement).style.display = "none"
    document.body?.appendText("Hello, ${greet()}!")
}

fun greet() = "world"
```

{% Glitch id="kotlin-wasm-hello-world", height="600" %}

{% Aside %}
To see the demo, you need to set the browser flags as per the instructions on the screen.
{% endAside %}

Now you may be wondering what the point is, since the Kotlin code above basically consists of the [JavaScript OM APIs converted to Kotlin](https://kotlinlang.org/api/latest/jvm/stdlib/org.w3c.dom/). It starts to make more sense in combination with [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/), which allows developers to build upon the UI they may already have created for their Android Kotlin apps. Check out an early exploration of this with the [Kotlin/Wasm image viewer](https://kotlin-wasm-image-viewer.glitch.me/) demo and explore its [source code](https://github.com/Kotlin/kotlin-wasm-examples/tree/main/compose-imageviewer), likewise courtesy of the Kotlin team.

{% Glitch id="kotlin-wasm-image-viewer", height="900" %}

{% Aside 'warning' %}
In this early experimental stage, the [Kotlin/Wasm image viewer](https://kotlin-wasm-image-viewer.glitch.me/) demo is fully rendered onto a `canvas` with no meaningful DOM tree that could be used to create an [accessibility tree](https://developer.mozilla.org/docs/Glossary/Accessibility_tree). This means it's completely inaccessible to non-sighted users and breaks important browser features like find on page, translation, text selection, extensions, zooming, and link to text fragment.
{% endAside %}

### Dart and Flutter

The Dart and Flutter teams at Google are also preparing support for WasmGC. The Dart-to-Wasm compilation work is almost complete, and the team is working on tooling support for delivering Flutter web applications compiled to WebAssembly. You can read about the current state of the work in the [Flutter documentation](https://flutter.dev/wasm). The following demo is the [Flutter WasmGC Preview](https://flutterweb-wasm.web.app/).

<iframe style="width: 100%; height: 800px" src="https://flutterweb-wasm.web.app/"></iframe>

{% Aside 'warning' %}
The [Flutter WasmGC Preview](https://flutterweb-wasm.web.app/) demo is fully rendered onto a `canvas`. This means it breaks important browser features like find on page, translation, text selection, extensions, and link to text fragment.
{% endAside %}

## Learn more about WasmGC

This blog post has barely scratched the surface and mostly provided a high-level overview of WasmGC. To learn more about the feature, check out these links:

- [A new way to bring garbage collected programming languages efficiently to WebAssembly](https://v8.dev/blog/wasm-gc-porting)
- [WasmGC Overview](https://github.com/WebAssembly/gc/blob/main/proposals/gc/Overview.md)
- [WasmGC MVP](https://github.com/WebAssembly/gc/blob/main/proposals/gc/MVP.md)
- [WasmGC post-MVP](https://github.com/WebAssembly/gc/blob/main/proposals/gc/Post-MVP.md)

## Acknowledgements

Hero image by [Gary Chan](https://unsplash.com/@gary_at_unsplash) on [Unsplash](https://unsplash.com/photos/YzSZN3qvHeo). This article was reviewed by [Matthias Liedtke](https://github.com/Liedtke), [Adam Klein](https://github.com/ajklein), [Joshua Bell](https://github.com/inexorabletash), [Alon Zakai](https://github.com/kripken), [Jakob Kummerow](https://github.com/jakobkummerow), [Clemens Backes](https://github.com/backes), [Emanuel Ziegler](https://github.com/ecmziegler), and [Rachel Andrew](https://rachelandrew.co.uk/).
