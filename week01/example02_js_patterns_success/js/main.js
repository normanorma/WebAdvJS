/*

1. Design an app

localStorage <-> projects array 
	-> {title: 'CCLab',
		progress: 40
		}			
-> Model
	-> (Property) title, progress
	-> (Controller) Store, Remove, Change progress (0-100)
	* Model with not deal with View, doesn't know about view
-> View
	-> Create View from Projects array
	-> (Controller == Listener) Remove, Change progress 
	* View will read from Model, it doesn't contain its own data
	
	localStorage cannot store DOMElem, Object methods
	Everything will be store to projects array first, then over to localStorage
	Referencing each item in array via indexOf();
*/

// we will not wrap anything so it's easier to debug.

// DOM element references
var $$ = { // use $$ for selector
		iptFld: document.getElementById('inputField'),
		iptBtn: document.getElementById('inputBtn'),
		projCont: document.getElementById('projectsContainer'),
		projTpl: document.getElementById('projectTemplate'),
		noProj: document.getElementById('noProject')
	},
	projects = [],
	dbConnect = function() {
		// check if localStorage API is avail.
		if (localStorage) {
			console.log('yes, there is localStorage API');
			// check if localStorage has never been created before in this webpage.
			if (localStorage === null || localStorage.length === 0) { // if not
				// then create it!
				console.info('creating db');
				localStorage.setItem('projects', '[]');
				// and parse it to projects array
				projects = jParse(localStorage.getItem('projects'));
			} else { // DB is here
				// just parse it to projects array
				console.info('DB is here');
				projects = jParse(localStorage.getItem('projects'));
			}
		} else {
			alert('XXX no localStorage, update your browser now XXX');
		}
	},
	initialRender = function() {
		// the app is intact, render what we have first
		// for looping
		var l = projects.length;
		for (var i = 0; i < l; i++) {
			var item = new Model(projects[i].objId, projects[i].title, projects[i].progress, projects);
			new View(item).init();
		}
	},
	bindEvents = function() {
		// listening for input button
		$$.iptBtn.addEventListener('click', function() {
			var input = $$.iptFld.value; // or $('#inputField').val()
			if (input.length > 2) { // project name less than 3 letter doesn't make sense
				var item = new Model(undefined, input, 0, projects).save();
				new View(item).init();
				// clear input
				$$.iptFld.value = '';
			} else {
				alert('This is not acceptable');
			}
		});
	},
	init = function() {
		dbConnect();
		initialRender();
		bindEvents(); // must come after rendering
	};

window.addEventListener('DOMContentLoaded', init);

// Model Object ////////////////////////////////////////////////////////////
// is a blueprint for one data entry

var Model = function(id, input, progress, collection) {
	this.id = id || randomId();
	this.title = input;
	this.progress = progress;

	// object methods
	this.save = function() {
		// save to projects to db
		collection.push({
			objId: this.id,
			title: this.title,
			progress: this.progress
		});
		var array = jString(collection);
		localStorage.setItem('projects', array);
		return this;
	};
	this.changeProgress = function(val, callback) {
		this.progress = val;
		console.log(findIndexOf(this.id, collection));
		collection[findIndexOf(this.id, collection)].progress = this.progress;
		localStorage.setItem('projects', jString(projects));
		callback();
	};
	this.remove = function(callback) {
		console.log('removing', this.title);
		collection = collection.splice(findIndexOf(this.id, collection), 1);
		// update localStorage
		localStorage.setItem('projects', jString(projects));
		callback();
	};
	// this.save = function() {
	// };
	return this;
};

// End of Model ////////////////////////////////////////////////////////////

// View Object ////////////////////////////////////////////////////////////

var View = function(model) {
	this.model = model;
	var that = this;
	// object methods
	this.render = function() {
		// and finally append it to screen!
		console.info('rendering view');
		// whenever we got here, meaning we already have some data
		// no need to for heads-up message
		$$.noProj.classList.add('hidden');
		// let's clone our template
		this.item = $$.projTpl.cloneNode(true); // arg deep allows to clone every children of the cloned node.
		this.item.querySelectorAll('span')[0].innerText = this.model.title;
		console.log('View tells: ' + this.model.progress);
		this.item.querySelectorAll('span')[1].innerText = this.model.progress;
		this.item.querySelector('input').setAttribute('value', this.model.progress);
		this.item.classList.remove('hidden');
		// finally add it to projectContainer
		$$.projCont.insertBefore(this.item, $$.projCont.firstChild);
		return this;
	};
	this.bindEvents = function() {
		// listeners
		// listen for remove btn
		this.item.querySelector('a').addEventListener('click', function() {
			that.remove(); // that's why we use that
		});
		// listen for slider
		this.item.querySelector('input').addEventListener('change', function(ev) {
			// console.log(ev);
			that.changeProgress(ev.srcElement.value);
		});
	};
	this.changeProgress = function(val) {
		// change model
		model.changeProgress(val, function() {
			that.item.querySelectorAll('span')[1].innerText = val;
		});
	};
	this.remove = function() {
		// remove from database via our Model object
		model.remove(function() {
			// callback
			// console.log(this);
			that.item.remove();
		});
		// check if projects length == 0
		if (projects.length === 0) {
			$$.noProj.classList.remove('hidden');
		}
	};
	this.init = function() {
		this.render();
		this.bindEvents();
	};
};

// End of View ////////////////////////////////////////////////////////////

// Utilities
function jString(el) {
	return JSON.stringify(el);
}

function jParse(el) {
	return JSON.parse(el);
}

function randomId() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
function findIndexOf(objId, array) {
	var i = 0, l = array.length;
	for(i; i < l; i++) {
		// console.log(array[i].objId);
		// console.log(objId);
		if(array[i].objId === objId) {
			return i;
		}
	}
}