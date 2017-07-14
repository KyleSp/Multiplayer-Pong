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

const PLR_VELOCITY = 3;

//classes

class Player {
	constructor(isLeft, isControlled) {
		this.isLeft = isLeft;
		this.isControlled = isControlled;
		
		this.sizeX = PLR_SIZE_X;
		this.sizeY = PLR_SIZE_Y;
		
		console.log("isControlled: " + isControlled);
		
		if (isLeft) {
			this.locX = PLR_LEFT_LOC_X;
		} else {
			this.locX = PLR_RIGHT_LOC_X;
		}
		
		this.locY = HEIGHT / 2 - this.sizeY / 2;
		
		//get movements from server
		if (!this.isControlled) {
			console.log("not controlled");
			if (this.isLeft) {
				console.log("is left");
				//get left's movement
				console.log("get left");
				socket.on("leftMovement", function(left) {
					console.log("socket get left: " + left);
					this.locY = left;
					leftLocY = left;
					console.log("locY: " + this.locY);
				});
			} else {
				console.log("is right");
				//get right's movement
				console.log("get right");
				socket.on("rightMovement", function(right) {
					console.log("socket get right: " + right);
					this.locY = right;
					rightLocY = right;
					console.log("locY: " + this.locY);
				});
			}
		} else {
			console.log("controlled");
		}
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
				
				//output to server
				if (this.isLeft) {
					//output left's movement
					socket.emit("leftMovement", this.locY);
				} else {
					//output right's movement
					socket.emit("rightMovement", this.locY);
				}
			}
		}
		/*
		else {
			//get movements from server
			if (this.isLeft) {
				//get left's movement
				//console.log("get left");
				socket.on("leftMovement", function(left) {
					this.locY = left;
				});
				//this.locY = parseInt(leftMovement.textContent);
			} else {
				//get right's movement
				//console.log("get right");
				socket.on("rightMovement", function(right) {
					this.locY = right;
				});
				//this.locY = parseInt(rightMovement.textContent);
			}
		}
		*/
	}
}

class Ball {
	constructor() {
		
	}
}

//global variables
var plrNum;
var plrNum2 = 0;

socket.on("player", function(num) {
	plrNum = num;
});

var upPressed = false;
var downPressed = false;

var leftLocY = HEIGHT / 2 - PLR_SIZE_Y / 2;
var rightLocY = HEIGHT / 2 - PLR_SIZE_Y / 2;

//run game loop
var gameIntervalID = setInterval(game, 10);

//functions

function game() {
	//assign players correctly
	if (plrNum > 0 && plrNum2 == 0) {
		console.log("assign players correctly");
		plrNum2 = plrNum;
		
		console.log("player left:");
		plrLeft = new Player(true, plrNum == 1);
		console.log("player right:");
		plrRight = new Player(false, plrNum == 2);
	}
	
	if (plrNum2 != 0) {
		//update
		plrLeft.movement();
		plrRight.movement();
		
		if (!plrLeft.isControlled) {
			plrLeft.locY = leftLocY;
		}
		
		if (!plrRight.isControlled) {
			plrRight.locY = rightLocY;
		}
		
		console.log(plrLeft.locY + "\t" + plrRight.locY);
		
		//draw
		draw();
	}
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