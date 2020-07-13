
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const router = express.Router();
//var session = require('express-session');
//const user = require("./routes/user"); //new addition
//const InitiateMongoServer = require("./config/db");


//InitiateMongoServer();
/*
const PORT = process.env.PORT || 3000;
var app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "API Working" });
  });
  


function hash(input, salt){
	var hashed = crypto.pbkdf2Sync(input,salt,10000, 512,'sha512');
	return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res){
	var hashedString = hash(req.params.input, 'a-random-string');
	res.send(hashedString);

	//algo - md5
	//password - "tree1234"
	//password + salt = tree1234a-random-string
	//tree1234a-random-string -> <hash>, <hash> ... 10000
});

 app.post('/create-user', function(req,res){
 	//username password
 	//JSON format data will come
 	//{'username':'mohit', 'password': 'mohit20'}
 	var username = req.body.username;
 	var password = req.body.password;
   	var email = req.body.email;
 	var salt = crypto.randomBytes(128).toString('hex');
 	var dbString = hash(password,salt);
 	//double quotes for user as it is keyword in postgres
 	pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function (err,result){
 		if(err)		{
 			res.status(500).send(err.toString());
 		} else {
 			res.send('User successfully created : ' + username);
 		}
 	});
 });
//app.use("/user", user);
var User = mongoose.model("User", nameSchema);
app.post("/addname", (req, res) => {
	var myData = new User(req.body);
	console.log(req.body);
	console.log(myData);
	myData.save()
	.then(item => {
	res.send("item saved to database");
	})
	.catch(err => {
	res.status(400).send("unable to save to database");
	});
   });


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/dog.jpeg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dog.jpeg'));
});
*/

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80
/*
var port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});*/

//var port = 3000;

//var bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


var app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  });

var nameSchema = new mongoose.Schema({
    username: String,
	password: String,
	email: String
});

var User = mongoose.model("User", nameSchema);



app.post("/addname", (req, res) => {
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

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
