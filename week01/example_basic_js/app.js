// Install Node.js

// Sublime Text
/*

	Install package manager
	https://sublime.wbond.net/installation#st2
	
	Node.js console
	http://www.wikihow.com/Create-a-Javascript-Console-in-Sublime-Text
	Cmd + B

	http://www.henriquebarroso.com/my-top-10sublime-2-plugins/

*/

// void
var myVoid = ''; // is a string
var anotherVoid = undefined;
var alsoVoid = null;

// boolean
var myBool = true; // ≠ 'true'

// String
var myString = 'Hello World.'; // or "Hello World"
var anotherString = 'I\'m gonna watch the Guradian of the Galaxy.';
var complexString = '\\\'\\\'\\\'/\'/\'/';
// console.log('now that', complexString);
// Working with String

// int
var myInt = 123;
var anotherInt = '274924';
// Working with Int
// int -> string
// string -> int

// float
var myFloat = 0.0002240204;
var anotherFloat = '0.1300034';

// Array, a pandora box
var myArray = []; //
var anotherArray = ['string', 123, myBool, alsoVoid, myString, '', {name: 'Apon', lastname: 'Blah'}, ['look!', ['I am', ['inside']]]];
// console.log(anotherArray.length);
// working with Array
// Iterating an array
for(var i = 0; i < anotherArray; i++) {

}
// push an item into an array
myArray.push('Royal Spaghetti');
myArray.push(myFloat);

// remove an item
myArray.splice(2, 1); // removing index = (2), third item, removing (1) item
var index = anotherArray.indexOf('string'); // return value = index
// combining aboves
myArray.splice(index, 1); // removing 'string'


// Object, another pandora box || key: value or property: value
var myObject = {};
	myObject.width = 100;
	myObject.height = 200;
var alsoObject = {
	width: 100,
	height: 200
};
// Working with Object
// JSON.parse();
// JSON.stringify();
for(var k in alsoObject) {

}

// function
var plusAWithB = function(a, b) {
	console.log(a+b);
	// return comes last
	return a+b;
};
// or (not recommend)
function ThisIsAlsoAFunction() {

}

// immediately invoked function
(function() {
	// something here
})();

// or
!function() {
	console.log('I am taking off');
}();


// JS class (high-level object)
// A blueprint of a thing
var dot = function(radius, color, speed, someOtherAttribute) {
	this.radius = radius;
	this.color = color;
	this.speed = speed;
	this.someOtherAttribute = someOtherAttribute;
	// also behavior
	this.move = function() {
		// MOVE you dothead!
	};

	// return itself
	return dot;
};

// Maths
// Math.random()
// Math.floor()
// Math.round()

var rand = function(min, max) {
	var val;
	val = Math.floor((Math.random()*max) + min);
	// or
	// var = ~~((Math.random()*max) + min);
	return val;
};

// Time
// Looping a function every x millisec
// var interval = setInterval(function() {
// 	console.log('every one second');
// }, 1000);

setTimeout(function() {
	console.log('firing in one second');
}, 1000);

// UNIX timestamp
var now = new Date();
console.log(now.getTime());

// Checkout moment.js

// homework, a G-Shock style timer.
// Create a class-object that simulate a simple #second# timer. (Look at your phone's timer, for instance)
// A timer should have 3 behaviors; start, pause, reset
// It should work in browser terminal. No interface required.

var GshockTimer = function() {
	this.counter = 0;
	this.timer = null;
	this.start = function() {
		this.timer = setInterval(function() {
			this.counter++;
			console.log(this.counter);
		}, 1000);
	};
	this.pause = function() {

	};
	this.reset = function() {
		clearInterval(this.timer);
	};
	return this;
};

// Interact with DOM (Document Object Model)

// window

// document.getElementById()
// document.querySelector()
// document.querySelectorAll()
// .remove()
// .appendChild()
// .insertBeforeChild()
// .style.display = 'none'
// .classList = 'button active'
// .classList.add()
// .classList.remove()
// .classList.toggle()

// Event
// .addEventListener