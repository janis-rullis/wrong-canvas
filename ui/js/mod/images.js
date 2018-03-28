function Images() {}

// Load images from JSON and add to the list.
Images.prototype.Load = function () {
	$.ajax({
		url: 'image.php', type: "GET", dataType: 'json'
	}).done(function (response) {
		imagesMain.Add(response.data);
	}).fail(function (xhr) {
		var response = JSON.parse(xhr.responseText);
		var error = response.message + "\nStatus: " + xhr.status + ' ' + xhr.statusText;
		console.error(error);
		alert(error);
	});
}

// Add image to the list. 
// images: [{filename:"123.png", path:"res/image/upload/123.png"},{filename:"456.png", path:"res/image/upload/456.png"}]
Images.prototype.Add = function (images) {
	if (typeof images === 'object' && images.length) {

		var list = document.getElementById('images');
		for (var i = 0; i < images.length; i++) {
			var image = document.createElement("img");
			image.src = images[i].path;
			image.alt = images[i].filename;
			list.appendChild(image);
		}
	}

}