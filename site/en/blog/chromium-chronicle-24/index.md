---
title: "The Chromium Chronicle #24: StrongAlias, IdType, and TokenType"
description: >
  The same type may sometimes represent values from incompatible domains, which can cause bugs.
  Fortunately, Chromium's //base makes it easy to introduce explicit, distinct types.
layout: 'layouts/blog-post.njk'
date: 2021-08-26
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 24:** by Łukasz Anforowicz in Bellevue, WA (August, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Can you spot the bug in the code below?  Would you see
[the](https://chromium.googlesource.com/chromium/src/+/94fe07eb3484daee0f7b091aaee3f8511c7a34fa)
[bug](https://chromium.googlesource.com/chromium/src/+/7761de92d068807a1ea2632c90506fdc3b8a2c9d)
in a code review,
when looking only at the callsite?

```cpp
Token CreateToken(int command_data, int buffer_id);
...
auto token = CreateToken(GetCommandBufferId(), GetCommandData());
```

The same type may sometimes represent values from incompatible domains.
This usually happens for non-specific data types like integers or strings.
The example above illustrates how this can cause bugs.
Fortunately, Chromium's `//base` makes it easy to introduce explicit, distinct types:

```cpp
#include "base/types/strong_alias.h"

// The first template argument of StrongAlias is a "tag" type.
// The "tag" type is used to distinguish between different
// StrongAlias types.
using CommandData = base::StrongAlias<class CommandDataTag, int>;
using CommandBufferId = base::StrongAlias<class CommandBufferIdTag, int>;

Token CreateToken(CommandData command_data, CommandBufferId buffer_id);
```

Separate types improve readability.
Additionally, `StrongAlias` catches type mix-ups at compile time:

```cpp
test.cc:456:16: error: no matching function for call to 'CreateToken'
  auto token = CreateToken(GetCommandBufferId(), GetCommandData());
               ^~~~~~~~~~~
test.cc:123:7: note: candidate function not viable: no known conversion from
'StrongAlias<class CommandBufferIdTag, [...]>' to
'StrongAlias<class CommandDataTag, [...]>' for 1st argument
Token CreateToken(CommandData command_data, CommandBufferId buffer_id);
      ^
```

The compiler sees that the types are incompatible,
because they have a different "tag" type.
`StrongAlias` accepts any type as the "tag" type.
The example shows that the "tag" type doesn't even need a type definition anywhere—an
in-place forward declaration of a non-existent class works fine.

In the future, instead of a non-specific type (for example, a bool, an int, a string),
consider these alternatives:

- Use `base::IdType32<TagType>` instead of using `int32_t` as an identifier.
- Use `base::TokenType<TagType>` instead of a non-specific `base::UnguessableToken`.
- Use an enum class instead of a bool
(for example, `kForReload`, `kNotForReload` instead of `true`, `false`).
- Replace other non-specific types with `base::StrongAlias<TagType, SomeWrappedType>`.
