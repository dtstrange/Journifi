$(document).ready(function(){
	$("#locate").on("click", function(){
		axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDxqJutbSvsf280kK98GODy0fkmj9zRG0E ")
	
		.then(function(response){
			console.log(response)
		})
	});
 });