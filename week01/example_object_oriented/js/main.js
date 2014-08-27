var canvas = document.getElementById('myCanvas'),
	world = canvas.getContext('2d');

var cWidth = 1000,
	cHeight = 1000;

canvas.setAttribute('width', cWidth);
canvas.setAttribute('height', cHeight);

world.fillStyle = '#99ccff';
// draw background
world.fillRect(0,0,canvas.width,canvas.height);

var elves = [], goblins = [];

var Elf = function(name, size, atkRange) {
	// Elf is a green rectangle that moves, has different colors depending on
	this.name = name || 'Johnny';
	this.size = size || 10;
	this.hp = 100;
	this.atkRange = atkRange || 10;
	this.pos = {
		x: random(0,100),
		y: random(0,100)
	};
	this.vel = {
		x: random(0, 5),
		y: random(0, 5)
	};

	this.render = function() {
		world.fillStyle = '#009966';
		world.fillRect(this.pos.x, this.pos.y, this.size, this.size);
		world.fillStyle = '#ff3300';
		world.fillRect(this.pos.x - 10, this.pos.y + 15, 30 * this.hp/100, 3);
		return this;
	};

	this.update = function() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		this.vel.x += 0.01;
		this.vel.y += 0.005;
	};

	this.remove = function() { // remove from the canvas
		var index = elves.indexOf(this);
	};

	return this;
};

var Goblin = function(size, speed) {
	// Goblin is a triangle that moves swiftly. Poor them they can't attack
};

var init = function() {
	// create 10 elves
	for(var i = 0; i < 10; i++) {
		elves[i] = new Elf();
	}
	loop();
};

var loop = function() {
	setInterval(function() {
		world.clearRect(0 ,0, canvas.width, canvas.height);
		world.fillStyle = 'lightblue';
		world.fillRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < elves.length; i++) {
			elves[i].update();
			elves[i].render();
		}
	}, 1000/60);
};

// Utility
function random(min, max) {
	return (~~(Math.random()*max) + min);
}

init();