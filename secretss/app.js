//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const mongoose=require('mongoose');
const encrypt = require("mongoose-encryption");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/authentication", {useNewUrlParser:true, useUnifiedTopology:true});

const userSchema= new mongoose.Schema({
        email: String,
        password: String
    });

userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields:["password"]});

const User=mongoose.model("User", userSchema);

app.get("/",(req,res)=>{
    res.render("home");
});


app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;

    User.findOne({email: username},(err, userFound)=>{
        if(err){
            console.log(err);
        }else{
            if(userFound){
                if(userFound.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});


app.get("/register",(req,res)=>{
      res.render('register');
});

app.post("/register",(req,res)=>{
    const newUser= new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err)=>{
        if(err){
            console.log(err);
        } else{
            res.render("secrets");
        }
    });
});

app.listen(3000, ()=>{console.log("server started at 3000")});