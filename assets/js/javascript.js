
// Begin TicketMaster API data -- need to connect input from index2 to the queryURL below -- let's talk about that on Mon/Tue -- What is being input?

$(document).ready(function() {

        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=san+diego&apikey=" + APIKey;

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

                    var eventsName = $("<p>").html(`<h2>${eventsResults[i].name}</h2>`);
                    var eventsVenue = $("<p>").html(`<h4>${eventsResults[i]._embedded.venues[0].name}</h4>`)
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

                }





            },
            error: function(xhr, status, err) {
                // This time, we do not end up here!
            }
        });



    });