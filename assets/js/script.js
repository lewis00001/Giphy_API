$(document).ready(function () {

    var gSearch = {
        // gPhrase is the word/phrase that gets added to the query for search resutls
        // wordFit is what gets displayed on the button - just for looks ;)
        s: [{
                gPhrase: "mice",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "sunset",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "winter",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "dance",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: false
            },
            {
                gPhrase: "space",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: true
            },
            {
                gPhrase: "loops",
                wordFit: function () {
                    let tName = truncateButtonText(this.gPhrase);
                    return tName;
                },
                isFav: true
            },
            {
                gPhrase: "food",
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
        let sizeLimit = 11;
        if (phrase.length > sizeLimit) {
            trunc = phrase.slice(0, sizeLimit);
            return trunc + "<span class='ellipsis'>...</span>";
        } else {
            trunc = phrase;
            return trunc;
        }
    }

    // add search to favorites
    $(document).on("click", ".unselected-star", function (e) {
        let sWord = $(this).siblings().attr("value");
        for (let i = 0; i < gSearch.s.length; i++) {
            if (gSearch.s[i].gPhrase === sWord) {
                gSearch.s[i].isFav = true;
            }
        }
        displayButtons();
    });

    // remove search from favorites
    $(document).on("click", ".selected-star", function (e) {
        let sWord = $(this).siblings().attr("value");
        for (let i = 0; i < gSearch.s.length; i++) {
            if (gSearch.s[i].gPhrase === sWord) {
                gSearch.s[i].isFav = false;
            }
        }
        displayButtons();
    });

    // (X) remove from page 
    $(document).on("click", ".remove", function (e) {
        let sWord = $(this).prev().attr("value");
        for (let i = 0; i < gSearch.s.length; i++) {
            if (gSearch.s[i].gPhrase === sWord) {
                gSearch.s.splice(i, 1);
            }
        }
        displayButtons();
    });

    // new search item obj constructor of awesomeness
    function SearchedItem(searchEntered) {
        this.gPhrase = searchEntered;
        this.wordFit = function () {
            let tName = truncateButtonText(this.gPhrase);
            return tName;
        };
        this.isFav = false;
    };

    // add search as a new obj to the gSearch.s array
    function processSearch() {
        let userSearch = $(".search-box").val().trim();
        // produce search results
        runApiCall(userSearch);
        let uSearch = new SearchedItem(userSearch);
        // add new search to gSearch.s array
        gSearch.s.push(uSearch);
        // reset search box text to placeholder
        $(".search-box").val("");
        displayButtons();
    }

    // listen for enterkey - run search if text is entered
    $(document).on("keydown", function (event) {
        let primed = $(".search-box").val().trim();
        if (event.keyCode === 13 && primed !== "") {
            processSearch();
        }
    });

    // listen for the search button click
    $(document).on("click", "#search-button", function () {
        processSearch();
    });

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
        $(".favorites-output").html("");
        $(".searches-output").html("");
        for (let i = 0; i < gSearch.s.length; i++) {
            if (gSearch.s[i].isFav === true) {
                $(".favorites-output").append(
                    "<div class='button-gif-search'>" +
                    "<span class='fas fa-star selected-star y tooltip'>" +
                    "<p class='tooltip-text-right'>Remove Favorite</p>" +
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
        runApiCall(query);
    });

    // runs the api query and outputs the images
    function runApiCall(_query) {
        // default values
        let _numR = 10; // number of search results wanted
        let _rate = ""; // content rating
        // gather search setting data
        let ratingVal = $("input[type='radio'][name='rating']:checked").val();
        if (ratingVal !== undefined) {
            _rate = ratingVal;
        }
        let numResultsVal = parseInt($("input[type='radio'][name='numResults']:checked").val());
        if (numResultsVal > 0) {
            _numR = numResultsVal;
        }
        // Giphy API call //
        var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" +
            _query + "&api_key=UWUhUuxLMhfVzD4ejhAOsyERRnPpl10l&limit=" +
            _numR + "&rating=" +
            _rate + "";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // add images to the page
            let rArray = response.data;
            console.log(response.data[0]);
            console.log(queryURL);
            for (let i = 0; i < rArray.length; i++) {
                var gifDiv = $("<div>").addClass("f-left gif-margin gif-div");
                var img = $("<img class='toggle-gif'>");
                img.attr("src", rArray[i].images.fixed_height_still.url);
                img.attr("data-still", rArray[i].images.fixed_height_still.url);
                img.attr("data-animate", rArray[i].images.fixed_height.url);
                img.attr("data-state", "still");
                gifDiv.append(img);
                $(".gif-display").prepend(gifDiv);
            }
        });
    }

    // listens for clicks on gifs to toggle animation or still
    $(document).on("click", ".toggle-gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});