
$(document).ready(function() {

    $("#searchbutton").on("click", function() {
        event.preventDefault();
        //grab values of inputs from by targeting ids of input and throw it in the empty variables made above.
        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";
        var city = $("#locationinput").val().trim().replace(/\s+/g, '+');
        var latLong = $("#latLongInput").val().trim();
        var startDate = new Date($("#startdateinput").val());
        var startDateISO = startDate.toISOString().split('.')[0] + "Z";
        var endDate =  new Date($("#enddateinput").val());
        var endDateISO = endDate.toISOString().split('.')[0] + "Z";
        var category = "music";
        //add sort Sorting order of the search result. Allowable values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 'relevance,asc', 'relevance,desc'

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?" + 
            "classificationName=" + category +
            "&city=" + city +
            "&latlong=" + latLong +
            "&radius=50" + 
            "&startDateTime=" + startDateISO +
            "&endDateTime=" + endDateISO +
            "&sort=date,asc" + 
            "&apikey=" + APIKey;

        // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=&apikey=" + APIKey;
        
        console.log("start date: " + startDateISO);
        console.log("end date: " + endDateISO)

        console.log(queryURL);
        
        $.ajax({
            type: "GET",
            url: queryURL,
            async: true,
            dataType: "json",
            success: function(json) {
                console.log(json);
                //events is an array -- write loop to pull from array

                var eventsResults = json._embedded.events;

                console.log(eventsResults);

                for (var i = 0; i < eventsResults.length; i++) {

                    var eventsDiv = $("<div>");

                    var eventsName = $("<p>").html(`${eventsResults[i].name}`);
                    var eventsVenue = $("<p>").html(`${eventsResults[i]._embedded.venues[0].name}`)
                    var eventsDate = $("<p>").html(eventsResults[i].dates.start.dateTime);
                    var eventsImg = $("<img>").attr("src", eventsResults[i].images[3].url);
                    var eventsURL = $("<button class='btn btn-default btnClass'>").html(`<a href ="${eventsResults[i].url}" target="_blank">More Info</a>`);
                    var hr = $('<hr />');

                    $(eventsImg).addClass("imgClass");
                    $(eventsDate).addClass("dateClass");


                    eventsDiv.append(eventsName, eventsVenue, eventsImg, eventsDate, eventsURL, hr);
                    console.log(eventsResults[i].name);
                    console.log(eventsResults[i].dates.start);
                    $("#eventsDescription").append(eventsDiv);

                } // for loop end





            },
            error: function(xhr, status, err) {
                
            }
        });//AJAX END


    });
});