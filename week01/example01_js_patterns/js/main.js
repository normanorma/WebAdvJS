console.log('main.js loaded');
var app = app || {};

// invoke now
app.main = (function() {

	var projects = [];
	// 0. create references for DOM elems
	var elems = {};
	elems.inputField = document.getElementById('inputField');
	elems.inputBtn = document.getElementById('inputBtn');
	elems.projectsContainer = document.getElementById('projectsContainer');
	// hidden text
	elems.noProject = document.getElementById('noProject');
	// 1. attach event listener so that we can add a project
	var attachedEvents = function() {
		elems.inputBtn.addEventListener('click', function() {
			var input = elems.inputField.value;
			if(input.length > 0) {
				var item = new Model(input, 0, 'projects');
				if(item.store()) {
					// if stored, render it in view
					new View(item).init();
				}
			} else {
				alert('please enter some title');
			}
		});
	};

	// 2. Bootstrapping the database if there's not any
	var initialRender = function() {
		// init localStorage
		projects = JSON.parse(localStorage.getItem('projects'));
		console.log(projects);
		if(projects === null || projects.length === 0) { // if db not exist
			// create it
			localStorage.setItem('projects', '[]');
			// unhide the hidden text
			console.log('no projects');
			elems.noProject.classList.remove('hidden');
		} else {
			// render it
			for(var i=0; i<projects.length;i++) {
				// iterate, create and append item
				new View(projects[i]).render();
				// console.log(item.create());
			}
		}
	};

	// 1. implementing Model
	var Model = function(title, progress, collection) {
		this.entry = {
			title: title,
			progress: 0
		};
		this.store = function() { // save new entity to localStorage
			// check project duplication
			var isTitleExist = function(title) {
				var items = JSON.parse(localStorage.getItem('projects'));
				for(var i = 0; i < items.length; i++) {
					if(items[i].title === title) {
						return true;
					}
				}
				return false;
			};
			if(isTitleExist(this.entry.title)) {
				// project already exists
				alert('please change your project title');
				return false;
			} else {
				// DB is happy because it doesn't have this project
				// we are going to store it!
				projects = JSON.parse(localStorage.getItem(collection));
				projects.push(this.entry);
				localStorage.setItem(collection, JSON.stringify(projects));
				console.log('project added');
				// reset input field
				elems.inputField.value = '';
				return true;
			}
		};
		this.remove = function() { // remove an entity from localStorage

		};
		this.progress = function() { // change the progess (0.0 - 1.0)

		};
		return this;
	};

	// 2. implement view (data rendering) (one data per View)
	var View = function(model) {
		// even if only one view is created, remove no-project placeholder
		elems.noProject.remove();
		// indexing model in projects
		console.log(model);
		var index = projects.indexOf(model);
		var that = this;
		this.render = function() {
			this.item = document.createElement('li');
			this.title = document.createElement('span');
			this.progress = document.createElement('span');
			this.removeBtn = document.createElement('a');
			// this.progress = document.createElement('input');
			// add something to it
			this.title.innerText = projects[index].entry.title;
			this.title.classList.add('projectTitle');
			this.progress.innerText = projects[index].progress*100 + '%';
			this.progress.classList.add('projectProgressBar');
			this.removeBtn.innerText = '[remove]';
			this.removeBtn.setAttribute('href', '#');
			this.removeBtn.classList.add('removeBtn');

			this.item.appendChild(this.title);
			this.item.appendChild(this.progress);
			this.item.appendChild(this.removeBtn);
			// jQuery prepend
			elems.projectsContainer.insertBefore(this.item, elems.projectsContainer.firstChild);
			return this;
		};
		this.remove = function() {
			// remove it by index
			console.log('removing', this);
			elems.projectsContainer.removeChild(this.item);
			return this;
		};
		this.changeProgress = function() {
			return this;
		};
		this.attachedEvents = function() {
			this.removeBtn.addEventListener('click', this.remove);
		};
		this.init = function() {
			this.render();
			this.attachedEvents();
		};
	};

	// 9. initialize function, kicking off the awesomeness

	var init =  function() {
		console.log('App init');
		initialRender();
		attachedEvents();
	};
	return {
		init: init,
		projects: function() {
			return projects;
		}
	};
})();
// $(document).ready();
window.addEventListener('DOMContentLoaded', app.main.init);