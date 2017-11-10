$(document).on("submit", "#event-location", function(data) {
	// select the data from the form
	$("#event-location").empty()
	// compile a url search to the api
	var location = // jquery function selecting text input field
	var compiledUrl = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + location + "&token=XIEHEGJIL4AIJWBFGTRC"
	$.ajax({
		url: compiledUrl,
		method: "GET"
	}).done(function(response) {
		//promise,when im done with api request create an unordered list of all the objects coming back
	}) 
	// in the returned response, format the information into a list.

})