$(document).ready(function () {

    var gSearch = {
        // gPhrase is the word/phrase that gets added to the query for search resutls
        // wordFit is what gets displayed on the button - just for looks ;)
        s: [{
                gPhrase: "ToriAmosIsAwesome",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "MrTISsuperAwesome",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "pizza cat",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "crash",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "tool",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: true
            },
            {
                gPhrase: "oopsIdidItAgain",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: true
            },
            {
                gPhrase: "avengers",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: true
            }
        ]
    }

    // ensures the search input will look good on the buttons ;)
    function truncateButtonText(phrase) {
        let trunc = phrase;
        let sizeLimit = 12;
        if (phrase.length > sizeLimit) {
            trunc = phrase.slice(0, sizeLimit);
            return trunc + "<span class='ellipsis'>...</span>";
        } else {
            trunc = phrase;
            return trunc;
        }
    }

    // click open handling for the favorites tab
    $("#fav").on("click", function (e) {
        $(this).toggleClass("fa-minus-circle fa-plus-circle");
        $(".favorites-output").toggleClass("hide unhide");
    });
    // click open event for the searches tab
    $("#search").on("click", function (e) {
        $(this).toggleClass("fa-minus-circle fa-plus-circle");
        $(".searches-output").toggleClass("hide unhide");
    });
    // click open event for the searches tab
    $("#settings").on("click", function (e) {
        $(this).toggleClass("fa-minus-circle fa-plus-circle");
        $(".search-settings").toggleClass("hide unhide");
    });

    // loops through gSearch.s and outputs the array
    function displayButtons() {
        $(".searches-output").html("");
        for (let i = 0; i < gSearch.s.length; i++) {
            if (gSearch.s[i].isFav === true) {
                $(".favorites-output").append(
                    "<div class='button-gif-search'>" +
                    "<span class='fas fa-star selected-star y tooltip'>" +
                    "<p class='tooltip-text-right'>is Favorite</p>" +
                    "</span>" +
                    "<div class='button-text' value='" + gSearch.s[i].gPhrase + "'>" +
                    gSearch.s[i].wordFit() + "</div>" +
                    "<span class='fas fa-times-circle y tooltip remove'>" +
                    "<p class='tooltip-text-left'>Remove</p>" +
                    "</span>" +
                    "</div>");
            } else {
                $(".searches-output").append(
                    "<div class='button-gif-search'>" +
                    "<span class='far fa-star unselected-star tooltip'>" +
                    "<p class='tooltip-text-right'>Add to Favorites</p>" +
                    "</span>" +
                    "<div class='button-text' value='" + gSearch.s[i].gPhrase + "'>" +
                    gSearch.s[i].wordFit() + "</div>" +
                    "<span class='fas fa-times-circle y tooltip remove'>" +
                    "<p class='tooltip-text-left'>Remove</p>" +
                    "</span>" +
                    "</div>");
            }
        }
    }
    displayButtons();

    // listen for which button was clicked
    $(document).on("click", ".button-text", function () {

        // query vars
        let query = $(this).attr("value"); // search key word(s)
        console.log("value is: " + query);
        let numR = 10; // number of search results wanted
        let rate = ""; // content rating

        // gather search setting data
        let ratingVal = $("input[type='radio'][name='rating']:checked").val();
        if (ratingVal !== undefined) {
            rate = ratingVal;
        }
        let numResultsVal = parseInt($("input[type='radio'][name='numResults']:checked").val());
        if (numResultsVal > 0) {
            numR = numResultsVal;
        }

        // Giphy API call //
        var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" +
            query + "&api_key=UWUhUuxLMhfVzD4ejhAOsyERRnPpl10l&limit=" +
            numR + "&rating=" +
            rate + "";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // add images to the page
            let rArray = response.data;
            for (let i = 0; i < rArray.length; i++) {
                var gifDiv = $("<div>").addClass("f-left gif-margin");
                var img = $("<img>");
                img.attr("src", rArray[i].images.fixed_height.url);
                gifDiv.append(img);
                $(".gif-display").prepend(gifDiv);
            }

        });

    });

});