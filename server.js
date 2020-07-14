
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const router = express.Router();
//var session = require('express-session');
var user = require("./routes/user"); //new addition
const InitiateMongoServer = require("./config/db");


InitiateMongoServer();

var app = express();
//app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

console.log("calling app.use(user)");
app.use("/user", user);



/*
//
const User = require("./model/User");
app.post("/signup", (req, res) => {
	var myData = new User(req.body);
	console.log(req.body);
	console.log(req.body.username);
	console.log(req.body.password);
	console.log(req.body.email);
	console.log(myData);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
*/
app.listen(PORT, (req, res) => {
    console.log("Server listening on port " + PORT);
});
