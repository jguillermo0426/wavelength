$(document).ready(function() {
    var image = $("#recent-img");
    var text = $("#recent-text");

    image.attr("src", "../common/svg/recent-selected.svg");
    text.css('color', "#BBA7FF");

    var posts = $("#post-area").children();

    posts.sort(function (a, b) {
        let a_date = ($(a).find("#time-reviewed").text());
        let b_date = ($(b).find("#time-reviewed").text());
        return b_date - a_date;
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
            let a_date = new Date($(a).find(".date").text());
            let b_date = new Date($(b).find(".date").text());
            return b_date.getTime() - a_date.getTime();
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
            return parseInt($(b).find("#like-counter").text()) - parseInt($(a).find("#like-counter").text());
        }).appendTo($("#post-area"));
    });

    console.log(posts);
    var loaded = 0;

    var unloadedPosts = posts.slice(16, posts.length);
    console.log(unloadedPosts);
    for (let i = 0; i < unloadedPosts.length; i++) {
        $(unloadedPosts[i]).css("display", "none");
    }
    
    $(".load-more").click(function(){
        loaded += 15;
        loadedPosts = unloadedPosts.slice(0, loaded);
        for (let i = 0; i < unloadedPosts.length; i++) {
            $(loadedPosts[i]).css("display", "flex");
        }
    });
});
