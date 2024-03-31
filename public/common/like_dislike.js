$('document').ready(function() {
    var posts = $("#post-area").children(".post");
    //console.log(posts);
    for (let i = 0; i < posts.length; i++) {
        var postId = $(posts[i]).attr('id');
        console.log(postId);
        var id = postId.replace("post_", "");        
        
        $.post(
            'like-dislike',
            {postId: id, type: 'load'},
            function(data, status) {
                if (status === 'success') {
                    var unliked = $(posts[i]).children('.post-footer').children('#likes-bar').children('#no-like');
                    var liked = $(posts[i]).children('.post-footer').children('#likes-bar').children('#with-like');

                    if (data.output === 'nouser') {
                        console.log("user is not logged in");
                    }
                    else {
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
                    }
                }
            }
        );
    }
    

    $(".likes-bar").click(function() {
        var post = $(this).parent().parent().attr('id');
        var id = post.replace("post_", "");
        var likeCounter = $(this).children('#like-counter');
        var unliked = $(this).children('#no-like');
        var liked = $(this).children('#with-like');
        //console.log(liked);
        $.post(
            'like-dislike',
            {postId: id, type: 'clicked'},
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
                }
        });
    });
});