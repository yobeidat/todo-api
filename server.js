var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('Todo API Root');
});

app.get('/todos',function(req,res){
	var queryParams = req.query;
	var filteredTodos = todos;
	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos,{completed:true});
	}else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos,{completed:false});
	}
	res.json(filteredTodos);
});

app.get('/todos/:id',function(req,res){
	var todoitem = parseInt(req.params.id,10);
	var matchedtodo = _.findWhere(todos,{id:todoitem});
	 if(matchedtodo)
	 {
	 	res.json(matchedtodo);
	 }else{
	 	res.status(404).send();
	 }
});

app.post('/todos',function(req,res){
	var body = _.pick(req.body,"description","completed");
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		res.status(404).send();
	}
	body.id = todoNextId++;
	body.description = body.description.trim();
	todos.push(body);
	res.json(body);
});

app.delete('/todos/:id',function(req,res){
	var todoitem = parseInt(req.params.id,10);
	var matchedtodo = _.findWhere(todos,{id:todoitem});
	 if(matchedtodo)
	 {
	 	todos = _.without(todos,matchedtodo);
	 	res.json(matchedtodo);
	 }else{
	 	res.status(404).json({"error":"no todo found with that id"});
	 }
});

app.put('/todos/:id',function(req,res){
	var body = _.pick(req.body,"description","completed");
	var todoitem = parseInt(req.params.id,10);
	var matchedtodo = _.findWhere(todos,{id:todoitem});
	var validAttributes = {};
	if(!matchedtodo)
	{
	 	return res.status(404).json({"error":"no todo found with that id"});	 	
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')){
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description;
	} else if(body.hasOwnProperty('description')){
		return res.status(400).send();
	}
	
	_.extend(matchedtodo,validAttributes);
	res.json(matchedtodo);
});

app.listen(PORT,function(){
	console.log('server listening to port:'+PORT);
});