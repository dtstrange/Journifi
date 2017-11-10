// Begin TicketMaster API data -- need to connect input from index2 to the queryURL below -- let's talk about that on Mon/Tue -- What is being input?

$(document).ready(function() {

    $("#searchbutton").on("click", function() {
        $("#eventsDescription").empty();

        event.preventDefault();
        //grab values of inputs from by targeting ids of input and throw it in the empty variables made above.
        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";
        var city = $("#locationinput").val().trim().replace(/\s+/g, '+');
        console.log(city);
        var sortBy = "date,asc";
        var startDate = new Date($("#startdateinput").val());
        console.log(startDate);
        var startDateISO = startDate.toISOString().split('.')[0] + "Z";
        console.log(startDateISO);
        var endDate = new Date($("#enddateinput").val());
        console.log(endDate);
        var endDateISO = endDate.toISOString().split('.')[0] + "Z";
        console.log(endDateISO);
        //add sort Sorting order of the search result. Allowable values : 'name,asc', 'name,desc', 'date,asc', 'date,desc', 

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?" +
            "&sort=" + sortBy +
            "&city=" + city +
            "&onsaleStartDateTime=" + startDateISO +
            "&onsaleEndDateTime=" + endDateISO +
            // + "&sort=" + sort  <-- need to add sort function later
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

                    var columnPanel = $("<div>");
                    var eventsDiv = $("<div>");
                    eventsDiv.attr("class", "panel panel-default");
                    var headingDiv = $("<div>");
                    headingDiv.attr("class", "panel-heading");
                    var bodyDiv = $("<div>");
                    bodyDiv.attr("class", "panel-body");
                    var eventsName = $("<h3 class='panel-title'>").html(eventsResults[i].name);
                    var eventsVenue = $("<p>").html(eventsResults[i]._embedded.venues[0].name)
                    var eventsDate = $("<p>").html(eventsResults[i].dates.start.dateTime);
                    var eventsImg = $("<img>").attr("src", eventsResults[i].images[3].url);
                    var eventsURL = $("<button class='btn btn-default btnClass'>").html(`<a href ="${eventsResults[i].url}" target="_blank">More Info</a>`);

                    $(eventsImg).addClass("imgClass");
                    $(eventsDate).addClass("dateClass");
                    bodyDiv.append(eventsVenue, eventsDate, eventsImg, "<br>", eventsURL)

                    headingDiv.append(eventsName);
                    eventsDiv.append(headingDiv, bodyDiv);
                    columnPanel.append(eventsDiv);
                    columnPanel.attr("class","col-md-4");
                    console.log(eventsResults[i].name);
                    console.log(eventsResults[i].dates.start);
                    $("#eventsDescription").append(columnPanel);

                } // for loop end



            },
            error: function(xhr, status, err) {
                // This time, we do not end up here!
            }
        });//AJAX END


    });
});