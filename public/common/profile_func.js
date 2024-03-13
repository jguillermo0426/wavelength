$(document).ready(function () {
    $("#posts-btn").click(function(){
        $("#recent-posts-area").css("display", "block");
        $("#recent-comments-area").css("display", "none");
    });

    $("#comments-btn").click(function(){
        $("#recent-posts-area").css("display", "none");
        $("#recent-comments-area").css("display", "block");
    });

    
});
  