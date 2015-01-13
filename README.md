### 6.148 IAP 2015 - Advanced Javascript

These notes contain more than what we talked about in the actual lecture. In general, they're structured so that you can paste code into a Javascript interpreter (e.g. Chrome debugger) to see the results of a block of code.

The order used in lecture was:
(1) prototype-demo.js: demonstrated the prototype chain, attaching values to "this", and attaching functions to the prototype
(2) closure-demo.js: demonstrated first-class functions and closures; created a counter with private state as a closure
(3) button-bad.html: open the file in a browser and notice the buttons do not behave as expected; discuss how the looping variable (i) is shared among the click handlers. Solution is in button-good.html and shows how to avoid the situation by creating a closure for every iteration of the loop
(4) callback-context.js: skipped in lecture; demonstrates the changing of scope for the "this" variable and the use of the .bind() function
(5) async.js: explain the differences between the synchronous and asynchronous models; the Javascript single-threaded execution model; lots of setTimeout examples, and an introduction to the event queue and loop
(6) fib-event.html: an application of the ideas of the previous section to an example of heavy computation. The goal is to print "computing fib(n)..." to the browser BEFORE beginning the computation, so that there is a delay between printing "computing fib(n)..." and showing the actual result of the computation. Then there is a 5 second delay before beginning the next line. The fib(n) function is extremely inefficient and blocks the thread. Discuss how the rendering using jQuery's append function happens in its own thread and the computation thread doesn't "give up" the thread until it's completely done, so the rendering thread cannot make progress. The solution is in fib-soln.html; use setTimeout with a delay of 0 to allow the rendering thread to catch up before performing computation. A common incorrect solution is given in fib-wrong.html; note that the first call to append does not appear to happen until the computation has finished.
