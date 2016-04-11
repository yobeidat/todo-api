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
	res.json(todos);
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

app.listen(PORT,function(){
	console.log('server listening to port:'+PORT);
});