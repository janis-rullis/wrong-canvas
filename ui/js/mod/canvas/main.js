function CanvasMain() {}

CanvasMain.prototype.Init = function () {
	this.intervalSec = 0.1;
	this.w = this.h = '320';
	this.canvas = document.getElementById("canvas");
	this.img = document.getElementById("fbUsrImg");
	this.canvas.style.backgroundImage = "url('" + this.img.src + "')";
	this.ctx = this.canvas.getContext("2d");
	this.txtBox = document.getElementById("canvasTxt");
	this.InitTxt();
}

// init movable text
CanvasMain.prototype.InitTxt = function () {
	// init canvas move sensor 
	this.move = new CanvasMove();
	this.move.Init();

	// init canvas text
	this.txt = new CanvasTxt();
	this.txt.Init();
}

CanvasMain.prototype.GetTxt = function () {
	return this.txtBox.value;
}

CanvasMain.prototype.SetTxtPos = function () {
	// get x, y from CanvasMove class
	this.txt.x = this.move.x;
	this.txt.y = this.move.y;
}

CanvasMain.prototype.SetTxt = function () {
	this.SetTxtPos();

	// draw text at new pos
	this.txt.SetTxt(this.GetTxt());
}

// draw text
CanvasMain.prototype.ClearAndSetTxt = function () {
	this.txt.Clear();
	this.SetTxtPos();
	this.txt.SetTxt(this.GetTxt());
}

// set text drawing interval
CanvasMain.prototype.SetTxtInterval = function (sec) {
	var ms = sec * 1000;
	this.setTxtInterval = setInterval(function () {
		canvasMain.ClearAndSetTxt();
	}, ms);
}

// set or cancel text drawing interval aka moving
CanvasMain.prototype.CanMoveTxt = function (status) {
	// can move
	if (status) {
		// set text drawing interval
		this.SetTxtInterval(this.intervalSec);
	} else {
		clearInterval(this.setTxtInterval);
	}
}

CanvasMain.prototype.AllowMove = function (type) {
	// allow moving
	if (type) {

		// forbbid moving
	} else {

	}
}

CanvasMain.prototype.SaveCanvas = function () {
	// freeze text
	this.CanMoveTxt(false);

	// set bg img
	this.AddBgImg();

	// overlay the text
	this.SetTxt();
	
	// unfreeze text.
	this.CanMoveTxt(true);
}

CanvasMain.prototype.AddBgImg = function () {
	this.ctx.drawImage(this.img, 0, 0);
}

CanvasMain.prototype.Save = function () {
	this.SaveCanvas();

	var obj = {};
	obj.base64 = this.canvas.toDataURL();
	obj.msg = this.GetTxt();
	$.ajax({
		url: 'image.php', type: "POST", data: JSON.stringify(obj), contentType: "application/json", dataType: 'json'
	}).done(function (response) {
		
		// Add it to the image list.
		imagesMain.Add([response.data]);
	}).fail(function (xhr) {
		var response = JSON.parse(xhr.responseText);
		var error = response.message + "\nStatus: " + xhr.status + ' ' + xhr.statusText;
		console.error(error);
		alert(error);
	})
}

CanvasMain.prototype.Download = function (link) {
	this.SaveCanvas();

	link.href = this.canvas.toDataURL();
	link.download = 'jr-canvas.png';
}
