$(document).ready(function () {

    $("#fav").on("click", function (e) {
        $(this).toggleClass("fa-minus-circle fa-plus-circle");
        $(".favorites-output").toggleClass("hide unhide");
    });

    $("#search").on("click", function (e) {
        $(this).toggleClass("fa-minus-circle fa-plus-circle");
        $(".searches-output").toggleClass("hide unhide");
    });



});