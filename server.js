var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: "meet mom for lunch",
	completed: false
},
{
	id: 2,
	description: "Go to market",
	completed: false
},
{
	id: 3,
	description: "feed the cat",
	completed: true
}
];

app.get('/',function(req,res){
	res.send('Todo API Root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});

app.get('/todos/:id',function(req,res){
	var todoitem = parseInt(req.params.id,10);
	var matchedtodo;
	 todos.forEach(function(item){
	 	if(todoitem === item.id)
	 	{
	 		matchedtodo = item;
	 	}
	 });
	 if(matchedtodo)
	 {
	 	res.json(matchedtodo);
	 }else{
	 	res.status(404).send();
	 }
});

app.listen(PORT,function(){
	console.log('server listening to port:'+PORT);
});