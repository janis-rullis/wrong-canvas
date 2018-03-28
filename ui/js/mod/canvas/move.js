// sets x, y pos for specific canva
function CanvasMove() {}

CanvasMove.prototype.Init = function () {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.x = 0;
	this.y = 20;
	this.canMove = false;
	var canvasMove = this;

	// format for keeping touch with current class
	this.canvas.onmousedown = function (e) {
		canvasMove.Start(e);
	}
	this.canvas.onmouseup = function (e) {
		canvasMove.Stop(e);
	};
}

// start
CanvasMove.prototype.Start = function (e) {
	//if (e.pageX < x + textLength + canvas.offsetLeft && e.pageX > x - textLength + canvas.offsetLeft && e.pageY < y + 15 + canvas.offsetTop &&
	//	e.pageY > y -15 + canvas.offsetTop){
	this.x = e.pageX - this.canvas.offsetLeft;
	this.y = e.pageY - this.canvas.offsetTop;
	this.canMove = true;
	var canvasMove = this;
	this.canvas.onmousemove = function (e) {
		canvasMove.OnMove(e);
	}
//}
}
// action on mouse move
CanvasMove.prototype.OnMove = function (e) {
	if (this.canMove) {
		this.x = e.pageX - this.canvas.offsetLeft;
		this.y = e.pageY - this.canvas.offsetTop;
	}
}

// stop
CanvasMove.prototype.Stop = function () {
	this.canMove = false;
	this.canvas.onmousemove = null;
}