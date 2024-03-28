$(document).ready(function() {
    var image = $("#recent-img");
    var text = $("#recent-text");

    image.attr("src", "../common/svg/recent-selected.svg");
    text.css('color', "#BBA7FF");

    var posts = $("#post-area").children();

    var sortedPosts = posts.sort(function (a, b) {
        return parseInt($(b).find("#like-counter").text()) - parseInt($(a).find("#like-counter").text());
    }).appendTo($("#post-area"));



    $("#recent").click(function() {
        var popularImage = $("#popular-img");
        var popularText = $("#popular-text");
        var recentImage = $("#recent-img");
        var recentText = $("#recent-text");

        recentImage.attr("src", "../common/svg/recent-selected.svg");
        recentText.css('color', "#BBA7FF");
        popularImage.attr("src", "../common/svg/popular.svg");
        popularText.css('color', "#F4EBEB");

        var posts = $("#post-area").children();

        posts.sort(function (a, b) {
            return parseInt($(b).find("#like-counter").text()) - parseInt($(a).find("#like-counter").text());
        }).appendTo($("#post-area"));
    });

    $("#popular").click(function() {
        var popularImage = $("#popular-img");
        var popularText = $("#popular-text");
        var recentImage = $("#recent-img");
        var recentText = $("#recent-text");

        recentImage.attr("src", "../common/svg/recent.svg");
        recentText.css('color', "#F4EBEB");
        popularImage.attr("src", "../common/svg/popular-selected.svg");
        popularText.css('color', "#BBA7FF");

        var posts = $("#post-area").children();

        posts.sort(function (a, b) {
            let a_date = new Date($(a).find(".date").text());
            let b_date = new Date($(b).find(".date").text());
            return b_date.getTime() - a_date.getTime();
        }).appendTo($("#post-area"));
    });
});
