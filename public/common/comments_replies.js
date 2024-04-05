$('document').ready(function() {

    var postTitle = $(".song-album-title").children('a').text();
    var postId = $(".post").attr('id');
    var id = postId.replace("post_", ""); 
    
    $("#comment").submit(function(event) {
        event.preventDefault();

        var commentText = $(".commentText").val();

        $.post(
            '/create-comment',
            {postId: id, commentText: commentText},
            function(data, status) {
                console.log(status);

                if (data.action === "redirect") {
                    window.location.href = `/${postTitle}-${id}`;
                }
            }
        );
    });

    var replies = document.getElementsByClassName("reply");
    
    for (let i = 0; i < replies.length; i++) {
        $(replies[i]).submit(function(event) {
            event.preventDefault();
            
            var replyText = $(this).children('.comment-area').children(".replyText").val();
            var commentId = $(this).parent().parent().parent().parent().attr("id");
            var cId = commentId.replace("comment_", "");

            $.post(
                '/create-reply',
                {postId: id, replyText: replyText, commentId: cId},
                function(data, status) {
                    console.log(status);
    
                    if (data.action === "redirect") {
                        window.location.href = `/${postTitle}-${id}`;
                    }
                }
            );
        });
    }
});