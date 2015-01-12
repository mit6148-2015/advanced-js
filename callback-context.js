/*
  I. Objects and callback functions
*/

var f = function() {
  console.log("hello!");
};
// What is setTimeout(f, 3000)?

var Person = function(name) {
  this.name = name;
};
Person.prototype.greet = function() {
  console.log("Hi, I'm " + this.name);
};

var p = new Person("charles");

// What are these?
setTimeout(p.greet, 3000);
setTimeout(function() {
  p.greet();
}, 6000);

// Let's figure out what is bound to "this"
Person.prototype.printThis = function() {
  console.log(this);
};

// What are these?
setTimeout(p.printThis, 3000);
setTimeout(function() {
  p.printThis();
}, 6000);

// You can also use the bind function; it will keep "this" to be what you pass in
setTimeout(p.greet.bind(p), 9000);
setTimeout(p.printThis.bind(p), 9000);

/*
  II. Same functionality with a closure
*/

var Person = function(name) {
  var self = Object.create(Person.prototype);
  self.greet = function() {
    console.log("Hi, I'm " + name);
  };
  return self;
};

var p = Person("charles");

setTimeout(p.greet, 3000);
