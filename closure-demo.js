/*
  I. Variable scoping
  Variables in Javascript preceded by "var" have function scope, not block scope!
*/

z = 5;  // global
var f = function(x) {
  var y = 3;  // local to the function. x is local to the function as well.
  return x + y + z;
};

/*
  II. First-class functions
  Recall that functions are just like another variable. So we can return them!
*/

// In this case, outsideFunc is like "function creator"
var outsideFunc = function() {
  return function(x) {
    return x + 3;
  };
};

// What is outsideFunc? What is outsideFunc()? outsideFunc()(3)?

// One common pattern:
var insideFunc = (function() {
  return function(x) {
    return x + 3;
  };
})();

// What is insideFunc? insideFunc(3)?

/*
  III. Our first closure
  Inside functions gain access to variables declared in outside functions.
  Even _after_ the execution of the outside function, we have access to variables scoped
  within the outside function, but only in the context of the closure
*/
var outsideFuncClosure = function(x) {
  return function() {
    return x + 3;
  };
};

// What is outsideFuncClosure(3)?
// What is outsideFuncClosure(3)()?
// Do we have access to x here?
// But we have access to x + 3???

/*
  IV. Using closures to simulate private state
  We can also simulate
*/
var Counter = function() {
  var count = 0;
  return function() {
    return ++count;
  };
};
var c = Counter();
// What is c()?

var Counter = function(start) {
  var count = start;
  var self = {};
  self.inc = function() {
    return ++count;
  };
  self.dec = function() {
    return --count;
  };
  self.get = function() {
    return count;
  };
  return self;
};
var c = Counter(3);

// Note how now the Counter function basically acts as a constructor
// What is c instanceof Counter?

var Counter = function(start) {
  var count = start;
  var self = Object.create(Counter.prototype);
  self.inc = function() {
    return ++count;
  };
  self.dec = function() {
    return --count;
  };
  self.get = function() {
    return count;
  };
  return self;
};
var c = Counter(3);
// Now what is c instanceof Counter?
