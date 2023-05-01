---
title: "The Chromium Chronicle #33: Views AnimationBuilder"
description: >
  Learn how the AnimationBuilder classes can reduce complexity and improve readability for layer animations.
layout: 'layouts/blog-post.njk'
date: 2023-04-13
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  The Chromium Chronicle
tags:
  - chromium-chronicle
---

**Episode 33:** by Allen Bauer in Mountain View, USA (April, 2023)<br>
[Previous episodes](/tags/chromium-chronicle/)

Using layer based animations in Views can improve performance and reduce jankiness, but they’re rather difficult to set up. The [`AnimationBuilder`](https://source.chromium.org/chromium/chromium/src/+/main:ui/views/animation/animation_builder.h;drc=c149c1657efb82884f21a3deea7678e66cfc422a;l=49) classes can vastly reduce complexity and improve readability for layer animations.

Suppose you needed to animate a continuous cross-fade between the following two views, such as in the following image.

{% Img src="image/kheDArv5csY6rvQUJDbWRscckLr1/eb0572NgdLKbSg9axqz7.gif", alt="A button fading between two views.", width="344", height="164" %}

Here is an example of how this could be done using the layer animation APIs directly.

```cpp
auto primary_title_sequence = std::make_unique<LayerAnimationSequence>();
auto working_sequence = std::make_unique<LayerAnimationSequence>();
primary_title_sequence->set_is_repeating(true);
working_sequence->set_is_repeating(true);

primary_title_sequence->AddElement(CreatePauseElement(OPACITY, base::Seconds(2)));
primary_title_sequence->AddElement(CreateOpacityElement(0.0f, base::Seconds(1)));
primary_title_sequence->AddElement(CreatePauseElement(OPACITY, base::Seconds(2)));
primary_title_sequence->AddElement(CreateOpacityElement(1.0f, base::Seconds(1)));

working_sequence->AddElement(CreatePauseElement(OPACITY, base::Seconds(2)));
working_sequence->AddElement(CreateOpacityElement(1.0f, base::Seconds(1)));
working_sequence->AddElement(CreatePauseElement(OPACITY, base::Seconds(2)));
working_sequence->AddElement(CreateOpacityElement(0.0f, base::Seconds(1)));

primary_title_->layer()->GetAnimator()->StartAnimation(primary_title_sequence.release());
working_->layer()->GetAnimator()->StartAnimation(working_sequence.release());
```

The following shows how to create the same effect using `AnimationBuilder`. 
The animation will start upon exiting the scope.

```cpp
AnimationBuilder()
    .Repeatedly()
    .Offset(base::Seconds(2))
    .SetDuration(base::Seconds(1))
    .SetOpacity(primary_title_, 0.0f)
    .SetOpacity(working_, 1.0f)
    .Offset(base::Seconds(2))
    .SetDuration(base::Seconds(1))
    .SetOpacity(primary_title_, 1.0f)
    .SetOpacity(working_, 0.0f);
```

Which code would you rather write or read? More importantly, `AnimationBuilder` adds no extra overhead to the animation as it is intended to simplify the creation of layer-based animations. Give it a try the next time you need to animate something.

For additional help, email [chromium-dev@chromium.org](mailto:chromium-dev@chromium.org).

- [AnimationBuilder documentation](https://chromium.googlesource.com/chromium/src/+/main/docs/ui/animation_builder/animation_builder.md)
- [Learning about Chromium UI](https://source.chromium.org/chromium/chromium/src/+/main:docs/ui/learn/index.md)
