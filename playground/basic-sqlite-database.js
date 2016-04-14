var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todos = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then(function() {
	console.log('Everything is synced');
	Todos.create({
		description: 'walking the dog',
		completed: false
	}).then(function(todo) {
		return Todos.create({
			description: 'clean the office',
		});
	}).then(function() {
		return Todos.findById(1);
	}).then(function(todo) {
		if (true) {
			console.log(todo.toJSON());
		} else {
			console.log('no to do found');
		}
	});
});