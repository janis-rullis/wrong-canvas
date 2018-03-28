function CanvasTxt() {}

CanvasTxt.prototype.Init = function () {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.ctx.font = "21px Arial";
	this.ctx.fillStyle = 'white';
	this.x = 0;
	// must include text height
	this.y = 10;
	this.w = 320;
	this.h = 320;
}

CanvasTxt.prototype.SetTxt = function (str) {
	//this.strLen = (str.length * 14)/2;
	// use strLen for pointing mouse at the center of text
	this.ctx.fillText(str, this.x, this.y);
}

//clear rectangle
CanvasTxt.prototype.Clear = function () {
	// clears whole rectangle
	this.ctx.clearRect(0, 0, this.w, this.h);
}