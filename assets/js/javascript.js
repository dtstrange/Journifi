$(document).ready(function() {

    var category = "";
    var instructions = "<p id='instructions' class='text-center'>Now choose your location and date on the top menu and click Search!<p>";


    $(".imgcontainer").on("click", function() {


        category = this.id;
        console.log(this.id)
        // JD: add if-else to modify the id of arts&theater since you can't have an id that includes a special character
        if (this.id === 'arts') {
            category = 'arts&theater'
        } else {
            category = this.id
        }

        console.log(category);
    });

    $("#sports").on("click", function() {
        $("#eventsDescription").empty();
        $("#eventsDescription").addClass("text-center");

        var bigtext = $("<p>");
        var image = $("<img>");
        bigtext.append("SPORTS");
        bigtext.attr("class","bigtext");
        $("#eventsDescription").append(bigtext);
        image.attr("src","./assets/images/sports.png");
        image.attr("style", "width: 200px");
        image.attr("style", "height: 200px");
        $("#eventsDescription").append(instructions);
        $("#eventsDescription").append(image); 
    });


    $("#music").on("click", function() {
        $("#eventsDescription").empty();
        $("#eventsDescription").addClass("text-center");

        var bigtext = $("<p>");
        var image = $("<img>");
        bigtext.append("MUSIC");
        bigtext.attr("class","bigtext");
        $("#eventsDescription").append(bigtext);
        image.attr("src","./assets/images/music.png");
        image.attr("style", "width: 200px");
        image.attr("style", "height: 200px");
        $("#eventsDescription").append(instructions);
        $("#eventsDescription").append(image);    
    });


    $("#family").on("click", function() {
        $("#eventsDescription").empty();
        $("#eventsDescription").addClass("text-center");

        var bigtext = $("<p>");
        var image = $("<img>");
        bigtext.append("FAMILY");
        bigtext.attr("class","bigtext");
        $("#eventsDescription").append(bigtext);
        image.attr("src","./assets/images/family.png");
        image.attr("style", "width: 200px");
        image.attr("style", "height: 200px");
        $("#eventsDescription").append(instructions);
        $("#eventsDescription").append(image);    
    });


    $("#arts").on("click", function() {
        $("#eventsDescription").empty();
        $("#eventsDescription").addClass("text-center");

        var bigtext = $("<p>");
        var image = $("<img>");
        bigtext.append("ARTS & THEATER");
        bigtext.attr("class","bigtext");
        $("#eventsDescription").append(bigtext);
        image.attr("src","./assets/images/arts&theater.png");
        image.attr("style", "width: 200px");
        image.attr("style", "height: 200px");
        $("#eventsDescription").append(instructions);
        $("#eventsDescription").append(image);
    });

    $("#searchbutton").on("click", function() {
        $("#eventsDescription").empty();

        event.preventDefault();

        var APIKey = "1UbeVqHP9VHYsr7uCAJm0yDYCd8AS6Nr";
        var city = $("#locationinput").val().trim().replace(/\s+/g, '+');
        // JD: adding back latLong
        var latLong = $("#latLongInput").val().trim();
        var startDate = new Date($("#startdateinput").val());
        var startDateISO = startDate.toISOString().split('.')[0] + "Z";
        var endDate = new Date($("#enddateinput").val());
        var endDateISO = endDate.toISOString().split('.')[0] + "Z";

        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?" +
            "classificationName=" + category +
            "&city=" + city +
            // JD: adding back latLong to insert to queryURL
            "&latlong=" + latLong +
            "&radius=50" +
            "&size=60" + 
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

                    var columnPanel = $("<div>");
                    var eventsDiv = $('<div>');
                    eventsDiv.attr("class", "panel panel-default");
                    var headingDiv = $("<div>");
                    headingDiv.attr("class", "panel-heading");
                    var bodyDiv = $("<div>");
                    bodyDiv.attr("class", "panel-body");
                    var eventsName = $("<p class='panel-title' id='event'>").html(`${eventsResults[i].name}`);
                    var eventsVenue = $("<p>").html(`${eventsResults[i]._embedded.venues[0].name}`)
                    var eventsDate = eventsResults[i].dates.start.dateTime;
                    var eventsDateFormat = $("<p>").html(moment(eventsDate).format('MMMM Do, YYYY h:mm a'));
                    // JD: adding center-block to the img class to center the img
                    var eventsImg = $('<img class="img-responsive center-block">').attr("src", eventsResults[i].images[3].url);
                    var eventsURL = $("<button class='btn btn-default btnClass'>").html(`<a href ="${eventsResults[i].url}" target="_blank">More Info</a>`);

                    $(eventsImg).addClass("imgClass");
                    $(eventsDate).addClass("dateClass");


                    bodyDiv.append(eventsVenue, eventsDateFormat, eventsImg, "<br>", eventsURL);

                    headingDiv.append(eventsName);
                    eventsDiv.append(headingDiv, bodyDiv);
                    columnPanel.append(eventsDiv);
                    columnPanel.attr("class","col-md-4");
                    console.log(eventsResults[i].name);
                    console.log(eventsResults[i].dates.start);
                    $("#eventsDescription").append(columnPanel);
                    
                
                }

            },
            error: function(xhr, status, err) {

            }
        }); //AJAX END

    });
});