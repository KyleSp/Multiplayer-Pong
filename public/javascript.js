/*
	Made by Kyle Spurlock
*/

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

//constants

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PLR_SIZE_X = 50;
const PLR_SIZE_Y = 100;

const PLR_GAP = 50;

const PLR_LEFT_LOC_X = PLR_GAP;
const PLR_RIGHT_LOC_X = WIDTH - (PLR_SIZE_X + PLR_GAP);

//classes

class Player {
	constructor(isLeft) {
		this.sizeX = PLR_SIZE_X;
		this.sizeY = PLR_SIZE_Y;
		
		if (isLeft) {
			this.locX = PLR_LEFT_LOC_X;
		} else {
			this.locX = PLR_RIGHT_LOC_X;
		}
		
		this.locY = HEIGHT / 2 - this.sizeY;
	}
	
	movement() {
		
	}
}

class Ball {
	constructor() {
		
	}
}

//global variables
var plrLeft = new Player(true);
var plrRight = new Player(false);

//run game loop
var intervalID = setInterval(game, 10);

//functions

function game() {
	//update
	//plrLeft.movement();
	//plrRight.movement();
	
	//draw
	draw();
}

function draw() {
	//clear screen
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	//left paddle
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(plrLeft.locX, plrLeft.locY, plrLeft.sizeX, plrLeft.sizeY);
	
	//right paddle
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(plrRight.locX, plrRight.locY, plrRight.sizeX, plrRight.sizeY);
	
	
}