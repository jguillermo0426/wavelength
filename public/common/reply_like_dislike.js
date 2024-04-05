$('document').ready(function() {
    var reply = $(".reply-div").children(".reply-feed"); 

    for (let i = 0; i < reply.length; i++) {
        var replyId = $(reply[i]).attr('id');
        var id = replyId.replace("reply_", ""); 
        $.post(
            '/reply-like-dislike',
            { replyId: id, type: 'load' }, 
            function(data, status) {
                console.log(status);
                if (status === 'success') {
                    var unliked = $(reply[i]).children('.reply-container').children('#text').children('.post-footer').children('.likes-bar-reply').children('#no-like');
                    var liked = $(reply[i]).children('.reply-container').children('#text').children('.post-footer').children('.likes-bar-reply').children('#with-like');

                    var undisliked = $(reply[i]).children('.reply-container').children('#text').children('.post-footer').children('.dislikes-bar-reply').children('#no-like');
                    var disliked = $(reply[i]).children('.reply-container').children('#text').children('.post-footer').children('.dislikes-bar-reply').children('#with-like');

                    if (data.output === 'nouser') {
                        console.log("user is not logged in");
                    } else {
                        console.log(data.id, data.liked, data.disliked);
                        if (data.liked === false) {
                            console.log('liked');
                            unliked.css("display", "none");
                            liked.css("display", "block");
                        } else if (data.liked === true) {
                            console.log('unliked');
                            liked.css("display", "none");
                            unliked.css("display", "block");
                        }

                        if (data.disliked === false) {
                            console.log('disliked');
                            undisliked.css("display", "none");
                            disliked.css("display", "block");
                        } else if (data.disliked === true) {
                            console.log('undisliked');
                            disliked.css("display", "none");
                            undisliked.css("display", "block");
                        }
                    }
                }
            }
        );
    }

    $(".likes-bar-reply").click(function() {
        var reply = $(this).parent().parent().parent().parent().attr('id');
        var id = reply.replace("reply_", ""); // Changed from "post_" to "comment_"

        var dislikesBar = $(this).parent().children(".dislikes-bar-reply");

        console.log(dislikesBar);

        var likeCounter = $(this).children('#like-counter');
        var dislikeCounter = $(dislikesBar).children("#dislike-counter");

        var unliked = $(this).children('#no-like');
        var liked = $(this).children('#with-like');

        var undisliked = $(dislikesBar).children('#no-like');
        var disliked = $(dislikesBar).children('#with-like');

        $.post(
            'reply-like-dislike',
            { replyId: id, type: 'clicked', click: 'like' }, // Changed from "postId" to "commentId"
            function(data, status) {
                console.log("worked");
                if (status === "success") {
                    if (data.liked === true) {
                        console.log('liked');
                        var likes = data.likes + 1;
                        likeCounter.html(likes);
                        unliked.css("display", "none");
                        liked.css("display", "block");
                    } else if (data.liked === false) {
                        console.log('unliked');
                        var likes = data.likes - 1;
                        likeCounter.html(likes);
                        liked.css("display", "none");
                        unliked.css("display", "block");
                    }

                    if (data.disliked === true && data.match === true) {
                        console.log('undisliked');
                        var dislikes = data.dislikes - 1;
                        dislikeCounter.html(dislikes);
                        disliked.css("display", "none");
                        undisliked.css("display", "block");
                    } else if (data.disliked === false) {
                        console.log('undisliked');
                        var dislikes = data.dislikes - 1;
                        dislikeCounter.html(dislikes);
                        disliked.css("display", "none");
                        undisliked.css("display", "block");
                    }

                    if (data.output === 'nouser') {
                        alert("You must be logged in to interact with posts");
                    }
                }
            });
    });

    $(".dislikes-bar-reply").click(function() {
        var reply = $(this).parent().parent().parent().parent().attr('id');
        var id = reply.replace("reply_", ""); // Changed from "post_" to "comment_"

        var likesbar = $(this).parent().children(".likes-bar-reply");

        var dislikeCounter = $(this).children('#dislike-counter');
        var likeCounter = $(likesbar).children("#like-counter");

        var undisliked = $(this).children('#no-like');
        var disliked = $(this).children('#with-like');

        var unliked = $(likesbar).children('#no-like');
        var liked = $(likesbar).children('#with-like');

        $.post(
            'reply-like-dislike',
            { replyId: id, type: 'clicked', click: 'dislike' }, // Changed from "postId" to "commentId"
            function(data, status) {
                if (status === "success") {
                    console.log(status);
                    if (data.disliked === true) {
                        console.log('disliked');
                        var dislikes = data.dislikes + 1;
                        dislikeCounter.html(dislikes);
                        undisliked.css("display", "none");
                        disliked.css("display", "block");
                    }
                    if (data.disliked === false) {
                        console.log('undisliked');
                        var dislikes = data.dislikes - 1;
                        dislikeCounter.html(dislikes);
                        disliked.css("display", "none");
                        undisliked.css("display", "block");
                    }

                    if (data.liked === true && data.match === true) {
                        console.log('unliked');
                        var likes = data.likes - 1;
                        likeCounter.html(likes);
                        liked.css("display", "none");
                        unliked.css("display", "block");
                    } else if (data.liked === false) {
                        console.log('unliked');
                        var likes = data.likes - 1;
                        likeCounter.html(likes);
                        liked.css("display", "none");
                        unliked.css("display", "block");
                    }

                    if (data.output === 'nouser') {
                        alert("You must be logged in to interact with posts");
                    }
                }
            });

    });
});
