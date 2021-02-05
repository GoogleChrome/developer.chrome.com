---
title: "The Chromium Chronicle #1: Task Scheduling Best Practices"
description: >
  The Chrome team is proud to introduce the Chromium Chronicle, a monthly
  series geared specifically to Chromium developers - the developers who
  build the browser. This month, we take a look at task scheduling best
  practices.
layout: 'layouts/blog-post.njk'
date: 2019-04-16
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

The Chrome team is proud to introduce the Chromium Chronicle, a monthly
series geared specifically to Chromium developers, developers who build the
browser.

The Chromium Chronicle will primarily focus on spreading technical knowledge
and best practices to write, build, and test Chrome. Our plan is to feature
topics that are relevant and useful to Chromium developers, such as code
health, helpful tools, unit testing, accessibility and much more! Each article
will be written and edited by Chrome engineers.

We are excited about this new series, and hope you are too! Ready to dive in?
Take a look at our first episode below!

## Task Scheduling Best Practices

**Episode 1:** by Gabriel Charette in Montréal, PQ (April, 2019)<br>
[Previous episodes](/tags/chromium-chronicle/)

Chrome code that needs in-process asynchronous execution typically posts tasks
to sequences. Sequences are chrome-managed "virtual threads" and are
[preferred to creating your own thread][prefer-sequences]. How does an object
know which sequence to post to?

{% Compare 'worse' %}

The old paradigm is to receive a SequencedTaskRunner from the creator:

```cpp/0
Foo::Foo(scoped_refptr<base::SequencedTaskRunner> backend_task_runner)
    : backend_task_runner_(std::move(backend_task_runner)) {}
```

{% endCompare %}

{% Compare 'better' %}

The preferred paradigm is to create an independent SequencedTaskRunner:

```cpp/2-3
Foo::Foo()
    : backend_task_runner_(
          base::CreateSequencedTaskRunnerWithTraits({
              base::MayBlock(), base::TaskPriority::BEST_EFFORT})) {}
```

{% endCompare %}

This is easier to read and write as all the information is local and there's
no risk of inter-dependency with unrelated tasks.

This paradigm is also better when it comes to testing. Instead of injecting
task runners manually, tests can **instantiate a controlled task environment**
to manage Foo's tasks:

```cpp/4
class FooTest : public testing::Test {
 public
  (...)
 protected:
  base::test::TaskEnvironment task_environment_;
  Foo foo_;
};
```

Having **TaskEnvironment first in the fixture** naturally ensures it
manages the task environment throughout Foo's lifetime. The TaskEnvironment
will capture Foo's request-on-construction to create a SequencedTaskRunner and
will manage its tasks under each FooTest.

To test the result of asynchronous execution, **use the
`RunLoop::Run()+QuitClosure()` paradigm**:

```cpp
TEST_F(FooTest, TestAsyncWork) {
  RunLoop run_loop;
  foo_.BeginAsyncWork(run_loop.QuitClosure());
  run_loop.Run();
  EXPECT_TRUE(foo_.work_done());
}
```

This is preferred to RunUntilIdle(), which can be flaky if the asynchronous
workload involves a task outside of the TaskEnvironment's purview,
e.g. a system event, so use [`RunUntilIdle()` with care][run-until-idle-w-care].

{% Aside %}
Pro-tip: Use TaskEnvironment's `MOCK_TIME` mode to reliably test delayed
tasks.
{% endAside %}

**Want to learn more?** Read our documentation on [threading and tasks][threading-and-tasks]
or get involved in the [migration to TaskEnvironment][task-env]!

[prefer-sequences]: https://chromium.googlesource.com/chromium/src/+/lkgr/docs/threading_and_tasks.md#Prefer-Sequences-to-Threads
[threading-and-tasks]: https://chromium.googlesource.com/chromium/src/+/master/docs/threading_and_tasks.md
[task-env]: https://docs.google.com/document/d/1QabRo8c7D9LsYY3cEcaPQbOCLo8Tu-6VLykYXyl3Pkk/edit
[run-until-idle-w-care]: https://cs.chromium.org/chromium/src/base/test/task_environment.h?type=cs&q="void+RunUntilIdle()"+WARNING+case:yes&sq=package:chromium&g=0
