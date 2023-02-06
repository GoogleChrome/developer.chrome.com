---
layout: 'layouts/blog-post.njk'
title: 'RenderingNG deep-dive: LayoutNG block fragmentation'
description: >
  Block fragmentation in LayoutNG is now complete. Learn how it works and why it is important in this article.
subhead: >
  Block fragmentation in LayoutNG is now complete. Learn how it works and why it is important in this article.
date: 2023-01-03
thumbnail: image/kheDArv5csY6rvQUJDbWRscckLr1/TA8zkJYaP914aSjcGUap.jpg
alt: "Correct and incorrect clipping."
authors:
  - mstensho
tags:
  - rendering
---
{% Aside %}
This post is a part of a series on the Chromium rendering engine. Check out the rest of the series to learn more about [RenderingNG](/articles/renderingng/), the [RenderingNG architecture](/blog/renderingng-architecture/), [key data structures](/blog/renderingng-data-structures/), [VideoNG](/blog/videong/), [LayoutNG](/blog/layoutng/)
and [BlinkNG](/blog/blinkng/).
{% endAside %}

I'm Morten Stenshorne, a layout engineer on the Blink rendering team at Google. I've been involved in browser engine development since the early 2000s, and I've had a lot of fun, such as helping make the [acid2 test](https://en.wikipedia.org/wiki/Acid2#Timeline_of_passing_applications) pass in the Presto engine (Opera 12 and earlier), and reverse-engineering other browsers to fix table layout in Presto. I've also spent more of those years than I'd like to admit on block fragmentation, and, in particular, [multicol](https://www.w3.org/TR/css-multicol-1/) in Presto, WebKit, and Blink. During the past few years at Google I have mainly been focusing on leading the work of adding block fragmentation support to [LayoutNG](/articles/layoutng/). Join me in this deep-dive into the block fragmentation implementation, as it may very well be the last time that I implement block fragmentation. :)

## What is block fragmentation?

[Block fragmentation](https://www.w3.org/TR/css-break-3/) is about splitting a CSS block-level box (such as a section or paragraph) into multiple fragments when it doesn't fit as a whole inside one fragment container (called a [_fragmentainer_](https://www.w3.org/TR/css-break-3/#fragmentainer). A fragmentainer is not an element, but represents a column in multi-column layout, or a page in paged media. For fragmentation to happen, the content needs to be inside a *fragmentation context*. A fragmentation context is most commonly established by a multi-column container (content will be split into columns), or when printing (content will be split into pages). A long paragraph with many lines may need to be split into multiple fragments, so that the first lines are placed in the first fragment, and the remaining lines are placed in subsequent fragments. 

<figure>
{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/cCaTuW0K4aGvX1HHSH6d.png", alt="A paragraph of text broken into two columns.", width="800", height="576" %}

<figcaption>In this example a paragraph has been split into two columns using multi-column layout. Each column is a fragmentainer, representing a fragment of the fragmented flow.</figcaption>
</figure>


Block fragmentation is analogous to another well-known type of fragmentation: line fragmentation (otherwise known as "line breaking"). Any inline element that consists of more than one word (any text node, any `<a>` element, and so on), and allows line breaks, may be split into multiple fragments. Each fragment is placed into a different line box. A line box is the inline fragmentation equivalent to a _fragmentainer_ for columns and pages.

## What is LayoutNG block fragmentation?

LayoutNGBlockFragmentation is a rewrite of the fragmentation engine for LayoutNG, and after many years of work, the first parts finally shipped in Chrome 102 earlier this year. This fixed long-standing issues that were essentially unfixable in our "legacy" engine. In terms of data structures, it replaces multiple pre-NG data structures with _NG fragments_ represented directly in the [fragment tree](/articles/renderingng-data-structures/#the-immutable-fragment-tree).

For instance, we now support the ['avoid' value for the 'break-before' and 'break-after' CSS properties](https://www.w3.org/TR/css-break-3/#break-between), which allow authors to avoid breaks right after a header. It generally doesn't look good if the last thing that is placed on a page is a header, while the section's content starts on the next page. Instead, it's better to break **before** the header. See the figure below for an example.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/bVIi9gBcMJx1pgEGiuxZ.png", alt="The first example shows a heading at the bottom of the page, the second shows it at the top of the following page with its associated content.", width="800", height="589" %}

Chrome 102 also supports fragmentation overflow, so that monolithic (supposed to be unbreakable) content isn't sliced into multiple columns, and paint effects like shadows and transforms are applied correctly.

## Block fragmentation in LayoutNG is now complete

At the time of writing this, we have completed full block fragmentation support in LayoutNG. Core fragmentation (block containers, including line layout, floats, and out-of-flow positioning) shipped in Chrome 102. Flex and grid fragmentation shipped in Chrome 103, and table fragmentation shipped in Chrome 106. Lastly, [printing](https://bugs.chromium.org/p/chromium/issues/detail?id=1121942) shipped in Chrome 108. Block fragmentation was the last feature that depended on the legacy engine for performing layout. This means that, as of Chrome 108, the legacy engine will no longer be used to perform layout.

In addition to actually laying out the content, LayoutNG data structures support painting and hit-testing, but we still rely on some legacy data structures for JavaScript APIs that read layout information, such as `offsetLeft` and `offsetTop`.

Laying out everything with NG will make it possible to implement and ship new features that only have LayoutNG implementations (and no legacy engine counterpart), such as [CSS container queries](https://www.w3.org/TR/css-contain-3/#container-rule), anchor positioning, [MathML](https://www.w3.org/Math/), and [custom layout (Houdini)](https://www.w3.org/TR/css-layout-api-1/). For container queries, we shipped it a bit in advance, with a warning to developers that printing wasn't yet supported.

We shipped the first part of LayoutNG in 2019, which consisted of regular block container layout, inline layout, floats and out-of-flow positioning, but no support for flex, grid, or tables, and no block fragmentation support at all. We would fall back to using the legacy layout engine for flex, grid, tables, plus anything that involved block fragmentation. That was true even for block, inline, floating and out-of-flow elements within fragmented content—as you can see, upgrading such a complex layout engine in-place is a very delicate dance.

In addition, believe it or not, by mid-2019 the majority of the core functionality of LayoutNG block fragmentation layout was already implemented (behind a flag). So, why did it take so long for it to ship? The short answer is: fragmentation has to coexist correctly with various legacy parts of the system, which cannot be removed or upgraded until all dependencies are upgraded. For the long answer, see the following details.

### Legacy engine interaction

Legacy data structures are still in charge of JavaScript APIs that read layout information, so we need to write back data to the legacy engine in a manner that it understands. This includes updating the legacy multi-column data structures, like [LayoutMultiColumnFlowThread](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/layout_multi_column_flow_thread.h;l=144;drc=237a52e7e2b6d22eb1b5912e134384254d5b8974), correctly. 

### Legacy engine fallback detection and handling

We had to fall back to the legacy layout engine when there was content inside that couldn't yet be handled by LayoutNG block fragmentation. At the time of shipping core LayoutNG block fragmentation (spring 2022), that included flex, grid, tables, and anything that's printed. This was particularly tricky because we needed to detect the need for legacy fallback before creating [objects in the layout tree](/articles/layoutng/#a-30000-foot-view-of-layout-engine-architectures). For example, we needed to detect before we knew if there was a multi-column container ancestor, and before we knew which DOM nodes would become a [formatting context](https://developer.mozilla.org/docs/Web/Guide/CSS/Block_formatting_context) or not. It's a chicken-and-egg problem that doesn't have a perfect solution, but as long as its only misbehavior is false positives (fallback to legacy when there's actually no need), it's ok, because any bugs in that layout behavior are ones Chromium already has, not new ones.

### Pre-paint tree walk

Pre-paint is something we [do after layout](/articles/renderingng-architecture/#rendering-pipeline-structure), but before painting. The main challenge is that we still need to walk the [layout object tree](/articles/layoutng/#a-30000-foot-view-of-layout-engine-architectures), but we have NG fragments now—so how do we deal with that? We walk both the layout object and NG fragment trees at the same time! This is quite complicated, because mapping between the two trees isn't trivial. While the layout object tree structure closely resembles that of the DOM tree, the fragment tree is an **output** of layout, not an input to it. Apart from actually reflecting the effect of any fragmentation including inline fragmentation (line fragments) and block fragmentation (column or page fragments), the fragment tree also has a direct parent-child relationship between a [containing block](https://developer.mozilla.org/docs/Web/CSS/Containing_block) and the DOM descendants that have that fragment as their containing block. For example, in the fragment tree, a fragment generated by an absolutely positioned element is a direct child of its containing block fragment, even if there are other nodes in the ancestry chain between the out-of-flow positioned descendant and its containing block.  
  
It gets even more complicated when there's an out-of-flow positioned element inside fragmentation, because then the out-of-flow fragments become direct children of the [fragmentainer](https://developer.mozilla.org/docs/Glossary/Fragmentainer) (and not a child of what CSS thinks is the containing block). This was unfortunately a problem that had to be solved in order to co-exist with the legacy engine without too much trouble. In the future, we should be able to simplify a lot of this code, because LayoutNG is designed to flexibly support all modern layout modes.

## The problems with the legacy fragmentation engine

The legacy engine, designed in an earlier era of the web, doesn't really have a concept of fragmentation, even if fragmentation technically existed back then as well (in order to support printing). Fragmentation support was just something that got bolted on top (printing) or retrofitted (multi-column).

When laying out fragmentable content, the legacy engine lays out everything into a tall strip whose width is the inline-size of a column or page, and height is as tall as it needs to be to contain its content. This tall strip is not rendered to the page—think of it as rendering to a virtual page that is then rearranged for final display. It's conceptually similar to printing an entire paper newspaper article into one column, and then using scissors to cut it into multiple as a second step. (Back in the day, some newspapers actually used techniques similar to this!)

The legacy engine keeps track of an imaginary page or column boundary in the strip. That lets it nudge content that doesn't fit past the boundary into the next page or column. For example, if only the upper half of a line would fit on what the engine thinks is the current page, it will insert a "pagination strut" to push it down to the position where the engine assumes that the top of the next page is. Then, most of the actual fragmentation work (the "cutting with scissors and placement") takes place after layout during pre-paint and painting, by slicing the tall strip of content into pages or columns (by clipping and translating portions). This made a few things essentially impossible, such as applying transforms and relative positioning **after** fragmentation (which is what the spec requires). Furthermore, while there's some support for table fragmentation in the legacy engine, there's no flex or grid fragmentation support at all.

Here's an illustration of how a three-column layout is represented internally in the legacy engine, before using scissors, placement and glue (we have a specified height, so that only four lines fit, but there's some excess space at the bottom):

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/6pPbkYwDlbboAwLjJti1.png", alt="The internal representation as one column with pagination struts where the content breaks, and the on screen representation as three columns.", width="664", height="411" %}

Because the legacy layout engine doesn't actually fragment content during layout, there are many strange artifacts, such as relative positioning and transforms applying incorrectly, and box-shadows being clipped at column edges.

Here is a simple example with text-shadow:

{% Codepen {
  user: 'web-dot-dev',
  id: 'vYrPdWW',
  height: 300,
  theme: 'dark',
  tab: 'css,html'
} %}

The legacy engine doesn't handle this well:

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/UpVji9ER9KJ1hAze7H1U.png", alt="Clipped text shadows placed into the second column.", width="571", height="41" %}

Do you see how the text-shadow from the line in the first column is clipped, and instead placed at the top of the second column? That's because the legacy layout engine doesn't understand fragmentation!

It should look like this (and this is how it shows with NG):

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/VnQywb4jv3KCzLjoW0vt.png", alt="Two columns of text with the shadows correctly displaying.", width="563", height="41" %}

Next, let's make it a bit more complicated, with transforms and box-shadow. Notice how in the legacy engine, there's incorrect clipping and column bleed. That's because transforms are by spec supposed to be applied as a post-layout, post-fragmentation effect. With LayoutNG fragmentation both work correctly. This increases interop with Firefox, which has had good fragmentation support for some time with most tests in this area also passing there.

{% Codepen {
  user: 'web-dot-dev',
  id: 'gOKEveK',
  height: 400,
  theme: 'dark',
  tab: 'css,html'
} %}

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/TA8zkJYaP914aSjcGUap.jpg", alt="Boxes are incorrectly broken across two columns.", width="800", height="602" %}

The legacy engine also has problems with tall monolithic content. Content is [_monolithic_](https://www.w3.org/TR/css-break-3/#monolithic) if it is not eligible for breaking into multiple fragments. Elements with overflow scrolling are monolithic, because it doesn't make sense to users to scroll in a non-rectangular region. Line boxes and images are other examples of monolithic content. Here's an example:

{% Codepen {
  user: 'web-dot-dev',
  id: 'oNyVEdw',
  height: 300,
  theme: 'dark',
  tab: 'css,html'
} %}

If the piece of monolithic content is too tall to fit inside a column, the legacy engine will brutally slice it (leading to very "interesting" behavior when attempting to scroll the scrollable container):

{% Video src="video/kheDArv5csY6rvQUJDbWRscckLr1/3GKrMI61GIsEMgaNi6vp.mp4", controls="true", autoplay="true" %}

Rather than letting it overflow the first column (as it does with LayoutNG block fragmentation):

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/cJDKnI4BXE46H3gnngX2.png", alt="ALT_TEXT_HERE", width="571", height="212" %}

The legacy engine supports forced breaks. For example, `<div style="break-before:page;">` will insert a page break before the DIV. However, it only has limited support for finding optimal _unforced_ breaks. It does support [`break-inside:avoid`](https://www.w3.org/TR/css-break-3/#break-within) and [orphans and widows](https://www.w3.org/TR/css-break-3/#widows-orphans), but there's no support for avoiding breaks between blocks, if requested via [`break-before:avoid`](https://www.w3.org/TR/css-break-3/#break-between), for example. Consider this example:

{% Codepen {
  user: 'web-dot-dev',
  id: 'WNymMym',
  height: 400,
  theme: 'dark',
  tab: 'css,html'
} %}


{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/0Y1zHf0JNVyIt4VVBa63.png", alt="Text broken into two columns.", width="559", height="113" %}

Here, the `#multicol` element  has room for 5 lines in each column (because it's 100px tall, and the line-height is 20px), so all of `#firstchild` could fit in the first column. However, its sibling `#secondchild` has break-before:avoid, meaning the content wishes a break not to occur between them. Since the value of `widows` is 2, we need to push 2 lines of `#firstchild` to the second column, to honor all the break avoidance requests. Chromium is the first browser engine that fully supports this combination of features.

## How NG fragmentation works

The NG layout engine generally lays out the document by traversing the CSS box tree depth-first. When all the descendants of a node are laid out, the layout of that node can be completed, by producing an [NGPhysicalFragment](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/ng/ng_physical_fragment.h;l=54;drc=2e4d3a01c56738b228fa18b11fc720539d8d32bb) and returning to the parent layout algorithm. That algorithm adds the fragment to its list of child fragments, and, once all children are completed, generates a fragment for itself with all its child fragments inside. By this method it creates a fragment tree for the entire document. This is an over-simplification however: for instance, out-of-flow positioned elements will have to bubble up from where they exist in the DOM tree to their containing block before they can be laid out. I'm ignoring this advanced detail here for the sake of simplicity.

Along with the CSS box itself, LayoutNG provides a constraint space to a layout algorithm. This provides the algorithm with information such as the available space for layout, whether a new formatting context is established, and intermediate margin collapsing results from preceding content. The constraint space also knows the laid-out block-size of the fragmentainer, and the current block offset into it. This indicates where to break.

When block fragmentation is involved, the layout of descendants has to stop at a break. The reasons for breaking include running out of space in the page or column, or a forced break. We then produce fragments for the nodes that we visited, and return all the way up to the fragmentation context root (the multicol container, or, in case of printing, the document root). Then, at the fragmentation context root, we prepare for a new fragmentainer, and descend into the tree again, resuming where we left off before the break.

The crucial data structure for providing the means of resuming layout after a break is called [NGBlockBreakToken](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/ng/ng_block_break_token.h;l=23;drc=efd8f9c31239adeeacb892591cca33726cfae678). It contains all the information needed to resume layout correctly in the next fragmentainer. An NGBlockBreakToken is associated with a node, and it forms an NGBlockBreakToken tree, so that each node that needs to be resumed is represented. An NGBlockBreakToken is attached to the [NGPhysicalBoxFragment](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/ng/ng_physical_box_fragment.h;l=30;drc=b1d9026c8346d992f3e386dbd81e569cd644fea1) generated for nodes that break inside. The break tokens are propagated to the parents, forming a tree of break tokens. If we need to break **before** a node (instead of inside it), no fragment will be produced, but the parent node still needs to create a "break-before" break token for the node, so that we can start laying it out when we get to the same position in the node tree in the next fragmentainer.

Breaks are inserted when we either run out of fragmentainer space (an unforced break), or when a forced break is requested.

There are rules in the specification for optimal unforced breaks, and simply inserting a break exactly where we run out of space isn't always the right thing to do. For example, there are various CSS properties like `break-before` that influence the choice of break location. Therefore, during layout, in order to implement the [unforced breaks](https://www.w3.org/TR/css-break-3/#unforced-breaks.) specification section correctly, we need to keep track of possibly good breakpoints. This record means we can go back and use the last best possible breakpoint found, if we run out of space at a point where we'd violate break avoidance requests (for example, `break-before:avoid` or `orphans:7`). Each possible breakpoint is given a score, ranging from "only do this as a last resort" to "perfect place to break", with some values in between. If a break location scores as "perfect", it means that no breaking rules will be violated if we break there (and if we get this score exactly at the point where we run out of space, there's no need to look back for something better). If the score is "last-resort", the breakpoint isn't even a valid one, but we may still break there if we don't find anything better, to avoid fragmentainer overflow.

Valid breakpoints generally only occur _between_ siblings (line boxes or blocks), and not, for example, between a parent and its first child ([class C breakpoints](https://www.w3.org/TR/css-break-3/#end-block) are an exception, but we don't need to discuss those here). There **is** a valid breakpoint for instance before a block sibling with break-before:avoid, but it's somewhere between "perfect" and "last-resort".

During layout we keep track of the best breakpoint found so far in a structure called [NGEarlyBreak](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/ng/ng_early_break.h;l=19;drc=b8fa54319e902f372603a30005227aaa9e5957b2). An early-break is a possible breakpoint before or inside a block node, or before a line (either a block container line, or a flex line). We may form a chain or path of NGEarlyBreak objects, in case the best breakpoint is somewhere deep inside something we walked past earlier at the time we run out of space. Here's an example:

{% Codepen {
  user: 'web-dot-dev',
  id: 'gOKEvjj',
  height: 400,
  theme: 'dark',
  tab: 'css,html'
} %}

In this case, we run out of space right before `#second`, but it has "break-before:avoid", which gets a break location score of "violating break avoid". At that point we have an NGEarlyBreak chain of "inside `#outer` > inside `#middle` > inside `#inner` > before "line 3"', with "perfect", so we would rather break there. So we need to return and re-run layout from the beginning of #outer (and this time pass the NGEarlyBreak that we found), so that we can break before "line 3" in #inner. (We break before "line 3", so that the remaining 4 lines end up in the next fragmentainer, and in order to honor `widows:4`.)

The algorithm is designed to always break at the best possible breakpoint—as defined in the [spec](https://www.w3.org/TR/css-break-3/#unforced-breaks)—by dropping rules in the correct order, if not all of them can be satisfied. Note that we only have to re-layout at most once per [fragmentation flow](https://www.w3.org/TR/css-break-3/#parallel-flows). By the time we are in the second layout pass, the best break location has already been passed to the layout algorithms, this is the break location that was discovered in the first layout pass, and provided as part of layout output in that round. In the second layout pass, we're **not** laying out until we run out of space—in fact we're not expected to run out of space (that would actually be an error), because we have been provided with a super-sweet (well, as sweet as there was available) place to insert an early break, to avoid violating any breaking rules unnecessarily. So we just lay out to that point, and break.

On that note, sometimes we do need to violate some of the break avoidance requests, if that helps avoid fragmentainer overflow. Example:

{% Codepen {
  user: 'web-dot-dev',
  id: 'yLEwvRL',
  height: 400,
  theme: 'dark',
  tab: 'css,html'
} %}

Here, we run out of space right before `#second`, but it has "break-before:avoid". That's translated to "violating break avoid", just like the last example. We also have an NGEarlyBreak with "violating orphans and widows" (inside `#first` > before "line 2"), which still isn't perfect, but better than "violating break avoid". So we'll break before "line 2", violating the orphans / widows request. The spec deals with this in [4.4. Unforced Breaks](https://www.w3.org/TR/css-break-3/#unforced-breaks), where it defines which breaking rules are ignored first if we don't have enough breakpoints to avoid fragmentainer overflow.

## Summary

The main functional goal with the LayoutNG block fragmentation project was to provide  LayoutNG-architecture-supporting implementation of everything that the legacy engine supports, and as little else as possible, apart from bug fixes. The main exception here is better break avoidance support (`break-before:avoid`, for instance), because this is a core part of the fragmentation engine, so it had to be in there from the start, as adding it later would mean another rewrite.

Now that LayoutNG block fragmentation is finished, we can start working on adding new functionality, such as supporting mixed page sizes when printing, `@page` margin boxes when printing, `box-decoration-break:clone`, and more. And [as with LayoutNG generally](/articles/layoutng/#correctness), we expect the bug rate and maintenance burden of the new system to be substantially lower over time.

Thanks for reading!

## Acknowledgements

- [Una Kravets](mailto:unakravets@google.com) for the nice "handmade screenshot".
- [Chris Harrelson](mailto:chrishtr@google.com) for proofreading, feedback, and suggestions.  
- [Philip Jägenstedt](mailto:foolip@google.com) for feedback and suggestions.  
- [Rachel Andrew](mailto:rachelandrew@google.com) for editing and the first multi-column example figure.
