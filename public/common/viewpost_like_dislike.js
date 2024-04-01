$('document').ready(function() {
    var post = $(".post");
    var postId = $(post).attr('id');
    var id = postId.replace("post_", "");   

    $.post(
        '/like-dislike',
        {postId: id, type: 'load'},
        function(data, status) {
            if (status === 'success') {
                var unliked = $(post).children('.post-footer').children('#likes-bar').children('#no-like');
                var liked = $(post).children('.post-footer').children('#likes-bar').children('#with-like');

                var undisliked = $(post).children('.post-footer').children('#dislikes-bar').children('#no-like');
                var disliked = $(post).children('.post-footer').children('#dislikes-bar').children('#with-like');

                if (data.output === 'nouser') {
                    console.log("user is not logged in");
                }
                else {
                    console.log(data.id, data.liked, data.disliked);
                    if (data.liked === false) {
                        console.log('liked');
                        unliked.css("display", "none");
                        liked.css("display", "block");
                    }
                    else if (data.liked === true) {
                        console.log('unliked');
                        liked.css("display", "none");
                        unliked.css("display", "block");
                    }

                    if (data.disliked === false) {
                        console.log('disliked');
                        undisliked.css("display", "none");
                        disliked.css("display", "block");
                    }
                    else if (data.disliked === true) {
                        console.log('undisliked');
                        disliked.css("display", "none");
                        undisliked.css("display", "block");
                    }
                }
            }
        }
    );

    $(".likes-bar").click(function() {
        var post = $(this).parent().parent().attr('id');
        var id = post.replace("post_", "");

        var dislikesBar = $(this).parent().children("#dislikes-bar");

        var likeCounter = $(this).children('#like-counter');
        var dislikeCounter = $(dislikesBar).children("#dislike-counter");

        var unliked = $(this).children('#no-like');
        var liked = $(this).children('#with-like');

        var undisliked = $(dislikesBar).children('#no-like');
        var disliked = $(dislikesBar).children('#with-like');

        $.post(
            'like-dislike',
            {postId: id, type: 'clicked', click: 'like'},
            function(data, status){
                if (status === "success") {
                    if (data.liked === true) {
                        console.log('liked');
                        var likes = data.likes + 1;
                        likeCounter.html(likes);
                        unliked.css("display", "none");
                        liked.css("display", "block");
                    }
                    else if (data.liked === false) {
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
                    }
                    else if (data.disliked === false) {
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

    $(".dislikes-bar").click(function() {
        var post = $(this).parent().parent().attr('id');
        var id = post.replace("post_", "");

        var likesbar = $(this).parent().children("#likes-bar");

        var dislikeCounter = $(this).children('#dislike-counter');
        var likeCounter = $(likesbar).children("#like-counter");

        var undisliked = $(this).children('#no-like');
        var disliked = $(this).children('#with-like');

        var unliked = $(likesbar).children('#no-like');
        var liked = $(likesbar).children('#with-like');


        $.post(
            'like-dislike',
            {postId: id, type: 'clicked', click: 'dislike'},
            function(data, status){
                if (status === "success") {
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
                    }
                    else if (data.liked === false) {
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