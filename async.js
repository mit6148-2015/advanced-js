/*
  I. Synchronous vs. Asynchronous

  The wait function in most programming languages is fairly straightforward. You tell it
  how long to wait, and

  What we're interested in is what happens while we are waiting.

  Here we have a (very hacky) _synchronous_ wait function. Synchronous basically means that
  our operations are "synchronized" or executed in some serial order. So in this case, we
  print "hello", then wait 5000 ms, then print "world". There is a guarantee that nothing
  comes in to interrupt this sequence of instructions. But what this also means is that while
  we're waiting, we can't do any other work.

  Javascript's built-in timeout function is _asynchronous_. At a high level, this means that
  it frees up the execution to do something else. When the setTimeout delay has been reached,
  Javascript goes back to execute the "callback function".

  More precisely, the guarantee that Javascript gives us is this: the callback function will
  be executed after AT LEAST the specified delay.

  But when does it actually run? Read on to learn a bit more about what actually goes on
  with asynchronous calls.
*/

// A synchronous "wait" function
// This does _not_ give up the thread
// So while we're waiting, we do nothing!
var wait = function(time) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < time);
};

console.log("hello");
wait(5000);
console.log("world");

// This behaves the same as above
setTimeout(function() {
  console.log("world!");
}, 3000);
console.log("hello");

// Or does it?
// What's the output of this?
console.log("one");
setTimeout(function() {
  console.log("two");
}, 3000);
wait(5000);
console.log("three");

// OUTPUT IS one (5 second gap), then "three", then "two" (immediately following one another)
// what?!?!?!?!?

// What does "asynchronous" or "giving up the thread" mean?
// Let's talk about Javascript concurrency.

/*
  II. Javascript concurrency

  Javascript is single threaded. What this means at a high level is: there is only one thread
  of execution; everything that happens must happen in this thread. All code that runs gets
  loaded into this thread, etc.

  IMPORTANT POINT #1:
  Furthermore, Javascript guarantees that the current "thing" that is being executed will run
  to completion before something else starts being executed. I'm using "thing" loosely here --
  just loosely referring to the current sequence of code that is being executed.

  This is in contrast to other languages you might have encountered such as Java. In 6.005,
  you might remember creating threads -- either Thread objects or Runnable interfaces -- when
  making your GUI. Why did you do that? Well, some things, such as accessing databases or
  performing some computations, take up the entire thread in Java. Without more than one
  thread, the act of waiting for a database or performing an expensive computation would cause
  everything else to become unresponsive. In this case, the Java VM took care of ensuring
  that all threads were able to get CPU time.

  In fact, all of Node happens in a single thread! Even with multiple simultaneous requests,
  only one thread is processing all of them. How do we ensure that this does not slow down
  everything?

  In web programming, some operations are considered "expensive". The classic
  example is waiting for a response from a database, which is much slower than executing
  most other server code! We would be very sad if we could do nothing while waiting for
  the database in Node to respond to some request. So what we do is: we fire off the DB
  request, and then move on. When the DB responds, we will put it in some queue, and deal
  with it when we can (more on this in Tuesday's lecture).

  IMPORTANT POINT #2:
  The setTimeout function works very much the same way. Let's look at the code we had again:

    console.log("one");         (1)
    setTimeout(function() {     (2)
      console.log("two");
    }, 3000);
    wait(5000);                 (3)
    console.log("three");       (4)

  What happens here?
  (1) We log "one" to the console.
  (2) We run setTimeout, which says "Do this in no less than 3000 ms". So we have a guarantee
  from Javascript that our log of "two" will not occur within 3000 ms. But there is no
  guarantee about how long it will actually take!
  (3) We wait 5000 ms SYNCHRONOUSLY. Even though the 3000 ms from the previous has already
  expired, we haven't run our current sequence of code to completion yet! (see IMPORTANT
  POINT #1). So we must continue.
  (4) The wait(5000) completes, and we immediately log "three" to the console. Only at this
  point are we done with the sequence of code, and then we are able to handle the setTimeout
  callback.
*/

// 1. What's the output?
console.log("one");
wait(1000);
console.log("two");
wait(1000);
console.log("three");
wait(1000);
console.log("done");

// 2. What's the output?
console.log("one");
setTimeout(function() {
  console.log("two");
}, 1000);
setTimeout(function() {
  console.log("three");
}, 2000);
console.log("done");

// 3. What's the output?
console.log("one");
setTimeout(function() {
  console.log("two");
}, 1000);
wait(3000);
console.log("three");
console.log("done");

// 4. What's the output?
console.log("one");
setTimeout(function() {
  wait(5000);
  console.log("two");
}, 1000);
setTimeout(function() {
  console.log("three");
}, 2000);
console.log("done");

// 5. What's the output?
console.log("one");
setTimeout(function() {
  console.log("two");
}, 1000);
wait(5000);
setTimeout(function() {
  console.log("three");
}, 0);
console.log("done");

/*
  III. Queues and the event loop

  What exactly happens when we call setTimeout? We need to talk about event loops and queueing.

  Javascript in the browser consists of a few parts: the browser runtime, the event loop,
  an event queue.

  When we register any callback, whether it's setTimeout, a click handler, a database
  callback, etc., we register it with the browser runtime. We tell the browser runtime
  "when the user clicks this element, run this function", or "when 3000 ms has passed,
  run this function". What do we mean my "run this function"? Do we run it immediately?

  No! We place the function in the event queue. When the current sequence of code is done
  executing, Javascript will look into the queue to figure out what to run next. This constant
  loop is called the "event loop".

  In light of the event loop, let's look at our examples again.

  (see recording for explanations w/ event loop)

  Fib example: show soln and wrong behavior.
*/













