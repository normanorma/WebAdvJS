var fs = require('fs');

var someClass = function() {
    this.x = 10;
};

someClass.prototype.y = 20;

var groovyObject = new someClass();

console.log(groovyObject.x + groovyObject.y);
fs.writeFile('Hello.txt', 'hello', function() {
	console.log('hello');
});