/*
  I. Objects and Prototypes

  Javascript has "Prototype-based inheritance", in contrast to other languages like Java.
  This means that each object has a "prototype", which is itself an object.

  To lookup fields, we follow the prototype chain. The value of an object's field is equal
  to the value of the field in the first object for which the field is defined in the
  prototype chain.
*/
var objA = {};
// what is objA.field1?

objA.field1 = "abc";

var objB = {};
// what is objB.field1?

objB = Object.create(objA);
// what is objB.field1?

// what is objB.__proto__?
// We establish a prototype chain:
// objB --> objA --> Object {}

// What is objB.field1?
// The field field1 is undefined for objB, so Javascript goes down the prototype chain
// objB's prototype is objA. And objA.field1 is defined, so objB.field1 returns that value

objA.field2 = "def";
// What is objB.field2?

objA = {"field3": "3", "field4": "4"};
// What fields can objA access?
// What fields can objB access?

// Why? -- we assign a new object to the reference objA, but the object that was objB's
// prototype does not change!

/*
  II. Constructors

  We show how to do "classic" Object Oriented Programming in Javascript.
  Of particular interest is how the "new" keyword handles prototypes.
  http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
*/

// (a) A "constructor function"
// Take a name, return a generic object with a "greeting" field
var Person = function(name) {
  var greeting = "Hi, I'm " + name;
  return {"greeting": greeting};
};
var p = Person("charles");
// what is p instanceof Person?

// (b) Use of the "this" keyword
// "Object-oriented" design
// Recall: functions are Objects.
var Person = function(name) {
  this.name = name;
  this.greeting = "Hi, I'm " + name;
  this.greet = function() {
    return this.greeting;
  };
};

// Recall that functions are objects! So Person is an object with a prototype,
// namely, Person.prototype, which is empty.

// Note the use of new
var p = new Person("charles");

// What does new Person("charles") do?
// 1. Create an empty object
// 2. Set the prototype of the new object to be what Person.prototype references.
// 3. Execute the constructor function where the created object replaces "this"
// 4. Return the object.

// So what is p.Proto?
// Now what is p instanceof Person?

// (c) We can define methods on the constructor's prototype.
var Person = function(name) {
  this.name = name;
};
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

// What's the difference between this and part (b)?
// Memory usage. "Private" variables.
