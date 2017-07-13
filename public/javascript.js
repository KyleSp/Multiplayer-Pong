/*
	Made by Kyle Spurlock
*/

//CLIENT

var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

//constants

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const PLR_SIZE_X = 50;
const PLR_SIZE_Y = 100;

const PLR_GAP = 50;

const PLR_LEFT_LOC_X = PLR_GAP;
const PLR_RIGHT_LOC_X = WIDTH - (PLR_SIZE_X + PLR_GAP);

const PLR_VELOCITY = 1;

//classes

class Player {
	constructor(isLeft, isControlled) {
		this.sizeX = PLR_SIZE_X;
		this.sizeY = PLR_SIZE_Y;
		
		this.isControlled = isControlled;
		
		if (isLeft) {
			this.locX = PLR_LEFT_LOC_X;
		} else {
			this.locX = PLR_RIGHT_LOC_X;
		}
		
		this.locY = HEIGHT / 2 - this.sizeY / 2;
	}
	
	movement() {
		if (this.isControlled) {
			//make movements
			if (!(upPressed && downPressed)) {
				if (upPressed) {
					this.locY -= PLR_VELOCITY;
				} else if (downPressed) {
					this.locY += PLR_VELOCITY;
				}
				
				//output to html
				if (this.isLeft) {
					//output left's movement
					leftMovement.innerHTML = this.locY;
				} else {
					//output right's movement
					rightMovement.innerHTML = this.locY;
				}
			}
		} else {
			/*
			//get movements from server
			if (this.isLeft) {
				//get left's movement
				this.locY = parseInt(leftMovement.textContent);
			} else {
				//get right's movement
				this.locY = parseInt(rightMovement.textContent);
			}
			*/
		}
	}
}

class Ball {
	constructor() {
		
	}
}

//global variables

var plrNum = parseInt(numPlayerText.textContent);
//var plrLeft = new Player(true, plrNum == 1);
var plrLeft = new Player(true, true);
var plrRight = new Player(false, plrNum == 2);

var upPressed = false;
var downPressed = false;

//run game loop
var intervalID = setInterval(game, 10);

//functions

function game() {
	//update
	plrLeft.movement();
	plrRight.movement();
	
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
	
	//console.log("leftX: " + plrLeft.locX);
	//console.log("leftY: " + plrLeft.locY);
	
}

function keyDown(evt) {
	if (evt.keyCode == 37 || evt.keyCode == 65) {
		//left arrow or a
	} else if (evt.keyCode == 38 || evt.keyCode == 87) {
		//up arrow or w
		upPressed = true;
	} else if (evt.keyCode == 39 || evt.keyCode == 68) {
		//right arrow or d
	} else if (evt.keyCode == 40 || evt.keyCode == 83) {
		//down arrow or s
		downPressed = true;
	}
}

function keyUp(evt) {
	if (evt.keyCode == 37 || evt.keyCode == 65) {
		//left arrow or a
	} else if (evt.keyCode == 38 || evt.keyCode == 87 || evt.keyCode == 32) {
		//up arrow or w
		upPressed = false;
	} else if (evt.keyCode == 39 || evt.keyCode == 68) {
		//right arrow or d
	} else if (evt.keyCode == 40 || evt.keyCode == 83) {
		//down arrow or s
		downPressed = false;
	}
}