const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true,useUnifiedTopology: true});

const itemSchema={
	name: String
};

const Item=mongoose.model("Item",itemSchema);

app.get('/', function(req,res){

	const array=["not included in days","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	let date= new Date();
	date=date.getDay();
	date=array[date];

	Item.find({},function(err, todoItems){
		res.render('index', {date: date, items:todoItems});
		console.log("namee:"+ todoItems.name);
	});

	// res.render('index', {date: date});	
});


app.post('/',function(req,res){
	let newItem = req.body.todo;
	console.log(newItem);

	const item = new Item({
		name: newItem
	});
	item.save();
	res.redirect("/");	
});



app.listen(3000, function(){
    console.log("server is running on port 3000");
});