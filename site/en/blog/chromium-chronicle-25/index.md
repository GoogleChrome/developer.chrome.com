---
title: "The Chromium Chronicle #25: Thread Safety Annotations"
description: >
  Learn how Clang's static analysis framework takes over the toil of thread-safety proofs.
layout: 'layouts/blog-post.njk'
date: 2021-10-04
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 25:** by Victor Costan in SFO (October, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

In C++, ruling out the possibility of data races comes down to a small thread-safety correctness proof for every data member access.
These proofs add up to a lot of mental toil, especially when reviewing or refactoring code.
**Clang's static analysis framework takes over the toil of thread-safety proofs**.

## Add `GUARDED_BY_CONTEXT()` to data members in thread-unsafe classes

Most Chrome classes are thread-unsafe, and should be used on a single sequence.
Add annotations to all data members that are not thread-safe.
Unnecessary annotations are safe, but missing annotations are a risk of data races.

```cpp
#include "base/sequence_checker.h"  // for SEQUENCE_CHECKER()
#include "base/thread_annotations.h"  // for GUARDED_BY_CONTEXT()

class Cache {
  // Methods here.
 private:
  SEQUENCE_CHECKER(sequence_checker_);
  base::flat_map<std::string, std::string> data_ GUARDED_BY_CONTEXT(sequence_checker_);
};
```

## Clang enforces sequence checks

In return for annotating the data members,
Clang ensures that any method that accesses the data performs a sequence safety check before doing so.
As code is moved around in refactorings,
Clang continues enforcing the `GUARDED_BY_CONTEXT()` annotation.

```cpp
void Cache::Set(base::StringPiece key, base::StringPiece value) {
  DCHECK_CALLED_ON_VALID_SEQUENCE(sequence_checker_);  // Clang warns without this.
  data_.emplace(key, value);
}
```

## Add `GUARDED_BY()` to data members in thread-safe classes that use mutexes

Some classes in Chrome must use locks for thread safety.
In these cases, annotate all data members that are not thread-safe.
Each annotation points to a mutex that must be held while accessing the data member.

```cpp
#include "base/thread_annotations.h"  // for GUARDED_BY()

class ThreadSafeCache {
  // Methods here.
  private:
    base::Lock lock_;
    base::flat_map<std::string, std::string> data_ GUARDED_BY(lock_);
};
```

## Clang enforces lock acquisitions

Hang back and let the compiler ensure that each `base::AutoLock` is correctly scoped,
and that lock `Acquire()` and `Release()` calls are paired correctly.

```cpp
void ThreadSafeCache::Set(base::StringPiece key, base::StringPiece value) {
  base::AutoLock auto_lock(lock_);  // Clang warns without this.
  data_.emplace(key, value);
}
```

- [Threading and Tasks in Chrome](https://chromium.googlesource.com/chromium/src.git/+/refs/heads/main/docs/threading_and_tasks.md)
- [Clang Thread Safety Analysis](https://clang.llvm.org/docs/ThreadSafetyAnalysis.html): Learn about other Clang annotations for more complex scenarios.
