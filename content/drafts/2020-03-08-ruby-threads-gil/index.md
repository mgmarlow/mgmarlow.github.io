---
path: '/ruby-threads-gil'
title: 'Ruby Threads and the GIL'
date: '2020-03-08'
---

Concurrency is a great way to improve the performance of
web applications, particularly those that often communicate
to other services via HTTP. However, misuse of threads in
can actually lead to worse performance, particularly in the
case of Ruby.

Like many techniques in software development, every
abstraction comes with a cost. In this article, I'll explore
how Ruby threads can lead to performance bottlenecks and
how they are impacted by the design of the default Ruby
interpreter, [MRI](https://en.wikipedia.org/wiki/Ruby_MRI).

## Concurrency in Ruby

Ruby's concurrency model is centered around the use
of the `Thread` object. New threads are spun up trivially
by instantiating `Thread` and passing in a block:

```rb
Thread.new { puts "I'm a thread" }
```

This creates a new thread separate from the main thread's
execution context. However, this thread doesn't actually do
anything until the thread is explicitly finished, often by
the use of the `#join` or `#value` methods.

```rb
puts "in the main thread"
thr = Thread.new { puts "I'm in a separate thread!" }
puts "still in the main thread"
thr.join

# Outputs:
#
# in the main thread
# still in the main thread
# I'm a thread!
```

Unlike threads in other languages like C#, Ruby threads
will never execute in the background or separate from the
main thread. Instead, when `#join` is called, the Ruby
interpreter must pause the execution of the main thread,
switch to the requested thread, finish the requested work,
and then switch back to the main thread.

This structure of concurrency is known as GIL, or
[Global Interpreter Lock](https://en.wikipedia.org/wiki/Global_interpreter_lock).
It's a deliberate design decision baked into MRI, or the
"Matz Ruby Interpreter"--the default interpreter for Ruby.
The GIL ensures that only one thread can execute Ruby code
at any time, despite any additional threads or processes
available for execution on the machine.

GIL has advantages from the programmer-perspective,
making it easier to reason about thread-safety. However,
it also limits the number of applications that Ruby threads
can be used. Alternative Ruby interpreters provide non-GIL
implementations, for example
[JRuby](https://www.jruby.org/) or
[Rubinius](https://github.com/rubinius/rubinius/).

## When should I use threads?
