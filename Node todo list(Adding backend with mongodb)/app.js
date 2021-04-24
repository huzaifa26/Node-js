const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
// const { equal } = require('node:assert');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true,useUnifiedTopology: true});

const itemSchema={
	name: String,
	date: String
};

const Item=mongoose.model("Item",itemSchema);

var d = new Date();
var n = d.getFullYear();
var m = d.getDate();
var dbDate=m + " " + n;
var ddate= dbDate.toString();


app.get('/', function(req,res){
	// console.log("database date: " + dbDate);

	const array=["not included in days","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	let date= new Date();
	day=date.getDay();
	day=array[day];

	Item.find({date:{$eq:ddate}},function(err, todoItems){
		var itemss = todoItems;
			res.render('index', {date: day, items:itemss});
		// console.log("nameeeeeeee:"+ todoItems);

	});	
});


app.post('/',function(req,res){
	let newItem = req.body.todo;

	const item = new Item({
		name: newItem,
		date: dbDate
	});
	item.save();
	res.redirect("/");	
});

app.post("/delete",(req,res)=>{
	var user_id=req.body.checkBox;
	Item.findByIdAndRemove(user_id, (err, docs) => {
		if (err){
			console.log(err);
		}
		else{
			console.log("Removed User : ", docs);
			res.redirect("/");
		}
	});
});



app.listen(3000, function(){
    console.log("server is running on port 3000");
});