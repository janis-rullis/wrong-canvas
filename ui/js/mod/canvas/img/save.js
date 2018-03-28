function CanvasImg(){
	
}

CanvasImg.prototype.Save = function(){
	var dataURL = this.canvas.toDataURL();
	$.ajax({
		type: "POST",
		data: { 
			imgBase64: dataURL
		}
	}).done(function(o) {
		console.log('saved');
	});
}