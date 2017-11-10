$(document).ready(function(){
	var location = $("#locationinput").val().trim();
	
	$("#searchbutton").on("click", function(){
		axios.post("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&rankby=distance&keyword=" + search + "&key=AIzaSyBgHkFJFFsLISxT4sXowPFvluN9d9rEbZM")
	});
});//end document.ready 