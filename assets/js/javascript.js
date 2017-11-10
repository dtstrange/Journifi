$(document).ready(function() {

    $("#searchbutton").on("click", function() {
        $("#eventsDescription").empty();

        event.preventDefault();

        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";
        var city = $("#locationinput").val().trim().replace(/\s+/g, '+');
        var latLong = $("#latLongInput").val().trim();
        var startDate = new Date($("#startdateinput").val());
        var startDateISO = startDate.toISOString().split('.')[0] + "Z";
        var endDate = new Date($("#enddateinput").val());
        var endDateISO = endDate.toISOString().split('.')[0] + "Z";
        var category = "music"; // comedy, music, sports, arts&theater

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?" +
            "classificationName=" + category +
            "&city=" + city +
            "&latlong=" + latLong +
            "&radius=50" +
            "&size=50" + 
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

                var eventsResults = json._embedded.events;

                console.log(eventsResults);

                for (var i = 0; i < eventsResults.length; i++) {

                    var eventsDiv = $('<div class="results-div col-sm-4 col-md-2">');

                    var eventsName = $("<p id='event'>").html(`${eventsResults[i].name}`);
                    var eventsVenue = $("<p>").html(`${eventsResults[i]._embedded.venues[0].name}`)
                    var eventsDate = eventsResults[i].dates.start.dateTime;
                    var eventsDateFormat = $("<p>").html(moment(eventsDate).format('MMMM Do, YYYY h:mm a'));
                    var eventsImg = $('<img class="img-responsive">').attr("src", eventsResults[i].images[3].url);
                    var eventsURL = $("<button class='btn btn-default btnClass'>").html(`<a href ="${eventsResults[i].url}" target="_blank">More Info</a>`);

                    $(eventsImg).addClass("imgClass");
                    $(eventsDate).addClass("dateClass");

                    eventsDiv.append(eventsName, eventsVenue, eventsImg, eventsDateFormat, eventsURL, hr);

                    console.log(eventsResults[i].name);
                    console.log(eventsResults[i].dates.start);
                    $("#eventsDescription").append(eventsDiv);
                }

            },
            error: function(xhr, status, err) {

            }
        }); //AJAX END

    });
});