var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require("./routes/user"); //new addition
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

var app = express();
//app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret:'sameRandomValue',
	cookie:{maxAge: 1000 * 60 },
	resave: true,
    saveUninitialized: true
}));

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'login.html'));	
});
app.get('/ui/style.css', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
  
app.get('/ui/dog.jpeg', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'dog.jpeg'));
});
app.get('/ui/elephant.jpeg', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'elephant.jpeg'));
});
//Implementation of /signup
app.get('/signup',function(req,res){
	res.sendFile(path.join(__dirname, 'ui', 'registration.html'))
});
//console.log("calling app.use(user)");

app.use("/user", user);

//Implementation of /logout
app.get('/logout', function (req, res){
	delete req.session.auth;
	res.send('Logged out');
});

//Implementation of /dummy
app.get('/dummy', function(req, res){
	if( req.session && req.session.auth && req.session.auth.email){
		//res.send('Your are logged in: '+ req.session.auth.email.toString());
		res.sendFile(path.join(__dirname, 'ui', 'index.html'));
	}
	else{
		//res.send('You are not logged in');
		res.sendFile(path.join(__dirname, 'ui', 'login.html'));
	}
});

app.listen(PORT, (req, res) => {
    console.log("Server listening on port " + PORT);
});
