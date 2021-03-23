const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items=["Skipping", "Working"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res){

	const array=["not included in days","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	let date= new Date();
	date=date.getDay();
	date=array[date];

	res.render('index', {date: date, items: items});	
});


app.post('/',function(req,res){
	var item= req.body.todo;
	items.push(item);
	res.redirect("/");	
});



app.listen(3000, function(){
    console.log("server is running on port 3000");
});