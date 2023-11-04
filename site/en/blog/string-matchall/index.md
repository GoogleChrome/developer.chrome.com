---
layout: 'layouts/blog-post.njk'
title:  Better match results with String.prototype.matchAll()
description: >
    Chrome 73 introduces the String.prototype.matchAll() method. It behaves similarly to match(), but offers a simple way to iterate over matches, especially when you need access to capture groups.
authors:
  - joemedley
date: 2019-02-07
updated: 2019-05-26
---

Chrome 73 introduces the `String.prototype.matchAll()` method. It behaves
similarly to `match()`, but returns an iterator with all regular expression
matches in a global or sticky regular expression. This offers a simple way to
iterate over matches, especially when you need access to capture groups.

## What's wrong with match()?

The short answer is nothing, unless you're trying to return global matches with
capturing groups. Here's a programming puzzle for you. Consider the following
code:

```js
const regex = /t(e)(st(\d?))/g;
const string = 'test1test2';
const results = string.match(regex);
console.log(results);
// → ['test1', 'test2']
```

Run this in a console and notice that it returns an array containing the
strings `'test1'` and `'test2'`. If I remove the g flag from the regular
expression what I get has all of my capturing groups, but I only get the first
match. It looks like this:

```js
['test1', 'e', 'st1', '2', index: 0, input: 'test1test2', groups: undefined]
```

This string contains a second possible match beginning with `'test2'` but I don't
have it. Now here's the puzzle: how do I get all of the capturing groups for
each match? The [explainer for the String.prototype.matchAll()
proposal](https://github.com/tc39/proposal-string-matchall)
shows two possible approaches. I won't describe them because hopefully you
won't need them much longer.

## String.prototype.matchAll()

What would the explainer examples look like with `matchAll()`? Have a look.

```js
const regex = /t(e)(st(\d?))/g;
const string = 'test1test2';
const matches = string.matchAll(regex);
for (const match of matches) {
  console.log(match);
}
```

There are a few things to note about this. Unlike `match()` which returns an
array on a global search, `matchAll()` returns an iterator that works
beautifully with `for...of` loops. The iterator produces an array for
each match, including the capturing groups with a few extras. If you print
these to the console they'll look like this:

```js
['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', groups: undefined]
['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', groups: undefined]
```

You may notice that the value for each match is an array in exactly the same
format as returned by `match()` for non-global regular expressions.

## Bonus material

This is mainly for people who are new to regular expressions or who aren't
experts at it. You may have noticed the results of both match() and matchAll()
(for each iteration) are arrays with some additional named properties. While
preparing this article, I noticed that these properties have some documentation
deficiencies on MDN (which
  [I've fixed](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/match#Return_value)).
  Here's a quick description.


`index`
: The index of the first result in the original string. In the above example `test2` starts at position 5 hence `index` has the value 5.

`input`
: The complete string that `matchAll()` was run against. In my example, that was `'test1test2'`.

`groups`
: Contains the results of any [named capturing groups](https://mathiasbynens.be/notes/es-regexp-proposals#named-capture-groups) specified in your regular expression.

## Conclusion

If I've missed anything please let me know in the comments below. You can read more about recent changes to JavaScript [in previous
updates](https://developers.google.com/web/updates/tags/javascript) or on [the V8 website](https://v8.dev/).
