$(document).ready(function () {

    var animalsArray = ["Capybara", "Wolf", "Lion", "Dogs", "Axolotl"];

    function renderButtons() {
        $("#buttonsContainer").empty();
        for (var i = 0; i < animalsArray.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif");
            gifButton.attr("data-name", animalsArray[i]);
            gifButton.text(animalsArray[i]);
            $("#buttonsContainer").append(gifButton);
        }
    }
    function addNewButton() {
        $("#addGif").on("click", function () {
            var gif = $("#gif-input").val().trim();
            if (gif == "") {
                return false;
            }
            animalsArray.push(gif);
            renderButtons();
            return false;
        });
    }

    function displayGifs() {
        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=11Avn5uGy8dzXQWA8TMOlr1Bec0ViLvV&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                $("#gifsContainer").empty();
                var results = response.data;
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifDiv.append(gifImage);
                    $("#gifsContainer").prepend(gifDiv);
                }
            });
    }

    renderButtons();
    addNewButton();

    $(document).on("click", ".gif", displayGifs);

});