/*
	Made by Kyle Spurlock
*/

//SERVER

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const WIDTH = 600;
const HEIGHT = 550;

const PLR_SIZE_X = 50;
const PLR_SIZE_Y = 100;
const PLR_GAP = 50;
const PLR_LEFT_LOC_X = PLR_GAP;
const PLR_RIGHT_LOC_X = WIDTH - (PLR_SIZE_X + PLR_GAP);

const BALL_RADIUS = 20;
const BALL_SPEED = 3;

var numPlayers = 0;
var leftMovement = HEIGHT / 2 - PLR_SIZE_Y / 2;
var rightMovement = HEIGHT / 2 - PLR_SIZE_Y / 2;

var ballLocX = BALL_RADIUS + WIDTH / 2;
var ballLocY = BALL_RADIUS + HEIGHT / 2;

var thetaDeg = calcRand(0, 359);
var thetaRad = thetaDeg * (180 / Math.PI);
var ballVelX = BALL_SPEED * Math.cos(thetaRad);
var ballVelY = BALL_SPEED * Math.sin(thetaRad);

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
	
	//output to clients
	io.emit("player", numPlayers);
	
	//input from clients to server
	socket.on("disconnect", function() {
		--numPlayers;
		console.log("user disconnected");
	});
	
	socket.on("rightMovement", function(value) {
		rightMovement = value;
		
		//output back to clients
		io.emit("rightMovement", value);
	});
	
	socket.on("leftMovement", function(value) {
		leftMovement = value;
		
		//output back to clients
		io.emit("leftMovement", value);
	});
})

//update ball movement and output to clients
setInterval(function() {
	if (numPlayers == 2) {
		ballLocX += ballVelX;
		ballLocY += ballVelY;
		//console.log("ball loc x: " + ballLocX);
		//console.log("ball loc y: " + ballLocY);
		
		//handle collision with top and bottom walls
		if (ballLocY <= BALL_RADIUS) {
			ballLocY = BALL_RADIUS;
			ballVelY = -ballVelY;
		} else if (ballLocY >= HEIGHT - BALL_RADIUS) {
			ballLocY = HEIGHT - BALL_RADIUS;
			ballVelY = -ballVelY;
		}
		
		//handle collision with left and right walls
		if (ballLocX <= BALL_RADIUS || ballLocX >= WIDTH - BALL_RADIUS) {
			//reset position
			ballLocX = BALL_RADIUS + WIDTH / 2;
			ballLocY = BALL_RADIUS + HEIGHT / 2;
			
			//reset velocity
			thetaDeg = calcRand(0, 359);
			thetaRad = thetaDeg * (180 / Math.PI);
			ballVelX = BALL_SPEED * Math.cos(thetaRad);
			ballVelY = BALL_SPEED * Math.sin(thetaRad);
			
			//add point to winner
			//TODO
		}
		
		//handle collision with players
		var leftPlrL = PLR_LEFT_LOC_X;
		var leftPlrR = PLR_LEFT_LOC_X + PLR_SIZE_X;
		var leftPlrT = leftMovement;
		var leftPlrB = leftMovement + PLR_SIZE_Y;
		
		if (ballLocX - BALL_RADIUS <= leftPlrR && ballLocX >= leftPlrL && ballLocY + BALL_RADIUS >= leftPlrT && ballLocY + BALL_RADIUS <= leftPlrB) {
			ballVelX = -ballVelX;
		}
		
		var rightPlrL = PLR_RIGHT_LOC_X;
		var rightPlrR = PLR_RIGHT_LOC_X + PLR_SIZE_X;
		var rightPlrT = rightMovement;
		var rightPlrB = rightMovement + PLR_SIZE_Y;
		
		if (ballLocX + BALL_RADIUS >= rightPlrL && ballLocX <= rightPlrR && ballLocY + BALL_RADIUS >= rightPlrT && ballLocY + BALL_RADIUS <= rightPlrB) {
			ballVelX = -ballVelX;
		}
		
		io.emit("ballLocX", ballLocX);
		io.emit("ballLocY", ballLocY);
	}
}, 10);


http.listen(3000, function() {
	console.log("listening on *:3000");
});

function calcRand(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}