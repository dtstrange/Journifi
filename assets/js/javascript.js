$(document).ready(function() {

    $("#searchbutton").on("click", function() {
        event.preventDefault();

        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";
        var city = $("#locationinput").val().trim().replace(/\s+/g, '+');
        var latLong = $("#latLongInput").val().trim();
        var startDate = new Date($("#startdateinput").val());
        var startDateISO = startDate.toISOString().split('.')[0] + "Z";
        var endDate = new Date($("#enddateinput").val());
        var endDateISO = endDate.toISOString().split('.')[0] + "Z";
        var category = "music";


        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?" +
            "classificationName=" + category +
            "&city=" + city +
            "&latlong=" + latLong +
            "&radius=50" +
            "&startDateTime=" + startDateISO +
            "&endDateTime=" + endDateISO +
            "&sort=date,asc" +
            "&apikey=" + APIKey;


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

                    var eventsName = $("<p id='event'>").html(`${eventsResults[i].name}`);
                    var eventsVenue = $("<p>").html(`${eventsResults[i]._embedded.venues[0].name}`)
                    var eventsDate = eventsResults[i].dates.start.dateTime;
                    var eventsDateFormat = $("<p>").html(moment(eventsDate).format('MMMM Do, YYYY h:mm a'));
                    var eventsImg = $("<img>").attr("src", eventsResults[i].images[3].url);
                    var eventsURL = $("<button class='btn btn-default btnClass'>").html(`<a href ="${eventsResults[i].url}" target="_blank">More Info</a>`);
                    var hr = $('<hr />');


                    $(eventsImg).addClass("imgClass");
                    $(eventsDate).addClass("dateClass");


                    eventsDiv.append(eventsName, eventsVenue, eventsImg, eventsDateFormat, eventsURL, hr);
                    console.log(eventsResults[i].name);
                    console.log(eventsResults[i].dates.start);
                    $("#eventsDescription").append(eventsDiv);

                } // for loop end


            },
            error: function(xhr, status, err) {

            }
        }); //AJAX END


    });
});