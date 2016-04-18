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

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todos.belongsTo(User);
User.hasMany(Todos);

sequelize.sync({
	//force: true
}).then(function() {
	console.log('Everything is synced');
	User.findById(1).then(function(user) {
		user.getTodos({
			where:{
				completed:false
			}
		}).then(function(todos) {
			todos.forEach(function(todo) {
				console.log(todo.toJSON());
			});
		});
	});
	/*
	User.create({
		email: 'test@test'
	}).then(function() {
		return Todos.create({
			description: 'clear'
		});
	}).then(function(todo) {
		User.findById(1).then(function(user) {
			user.addTodos(todo);
		});
	});
*/
});