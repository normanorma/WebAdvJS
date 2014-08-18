var canvas = document.getElementById('myCanvas'),
	world = canvas.getContext('2d');

canvas.setAttribute('width', 500);
canvas.setAttribute('height', 500);

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

	this.spawn = function() {
		world.fillStyle = '#009966';
		world.fillRect(this.pos.x, this.pos.y, this.size, this.size);
		world.fillStyle = '#ff3300';
		world.fillRect(this.pos.x - 10, this.pos.y + 15, 30 * this.hp/100, 3);
		return this;
	};
	return this;
};

var Goblin = function(size, speed) {
	// Goblin is a triangle that moves swiftly. Poor them they can't attack
};

var init = function() {
	// create 10 elves

};

// Utility
function random(min, max) {
	return (~~(Math.random()*max) + min);
}