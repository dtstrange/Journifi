
$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyDJeCMZnykLSEpaZy27wRZMA-XewrY9NAI",
        authDomain: "places-1509504215350.firebaseapp.com",
        databaseURL: "https://places-1509504215350.firebaseio.com",
        projectId: "places-1509504215350",
        storageBucket: "places-1509504215350.appspot.com",
        messagingSenderId: "506073607799"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#locate").on("click", function() {
        axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDxqJutbSvsf280kK98GODy0fkmj9zRG0E ")

            .then(function(response) {
                // console.log(response);
                var location = response.data.location;

                database.ref().set({
                    location: location
                    

                });
            }); //end .then

        database.ref().on("value", function(snapshot) {
            var lat = snapshot.val().location.lat;
            var lng = snapshot.val().location.lng;

            $("#latLongInput").val(lat + "," + lng);

            $("#locationinput").val(lat + ", " + lng); //change to different input space (currently being inputted in location input)

            console.log("lat: " + lat);
            console.log("lng: " + lng);
        }); //end snapshot

    }); //end on click
});//end document.ready
