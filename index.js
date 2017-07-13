/*
	Made by Kyle Spurlock
*/

//SERVER

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var numPlayers = 0;
var leftMovement = 550 / 2 - 100 / 2;
var rightMovement = 550 / 2 - 100 / 2;

app.use("/static", express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	
	++numPlayers;
	
	app.get("/", function(req, res){
		res.sendFile(__dirname + "/index.html");
	});
	
	io.emit("player", numPlayers);
	
	socket.on("disconnect", function() {
		--numPlayers;
		console.log("user disconnected");
	});
	
	socket.on("rightMovement", function(value) {
		//console.log("right movement update");
		rightMovement = value;
		io.emit("rightMovement", value);
	});
	
	socket.on("leftMovement", function(value) {
		//console.log("left movement update");
		leftMovement = value;
		io.emit("leftMovement", value);
	});
	
	/*
	socket.on("chat message", function(msg) {
		console.log("message: " + msg);
		io.emit("chat message", msg);
	});
	*/
})

/*
setInterval(function() {
	io.emit("leftMovement", leftMovement);
	io.emit("rightMovement", rightMovement);
}, 10);
*/

/*
io.on("leftMovement", function(value) {
	console.log("update left");
	leftMovement = value;
});

io.on("rightMovement", function(value) {
	console.log("update right");
	rightMovement = value;
});
*/

http.listen(3000, function() {
	console.log("listening on *:3000");
});

//app.listen(3000);

/*
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
	//res.sendFile(__dirname + "/javascript.js");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	
	socket.on("disconnect", function() {
		console.log("user disconnected");
	});
	
	//socket.on("chat message", function(msg) {
	//	console.log("message: " + msg);
	//	io.emit("chat message", msg);
	//});
})

http.listen(3000, function() {
	console.log("listening on *:3000");
});
*/