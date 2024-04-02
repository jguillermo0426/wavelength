function openEditProfilePopUp() {
    $("#edit-popup").css("visibility", "visible");
}


function closeEditProfilePopUp() {
    $("#edit-popup").css("visibility", "hidden");
}

function updateButtonColor(button) {
    $(".profile-options p").css("color", "#A9A5B6"); 
    button.css("color", "#BBA7FF"); 
}


function openEditDeletePost(postID) {
    $(".edit-delete-post").css({'visibility': 'hidden',});
    $(".edit-delete-post[post-id='" + postID + "']").css("visibility", "visible");
}


function deletePost(postID) {
    let deletePost = $('[post-id="' + postID + '"]');
    deletePost.css("visibility", "hidden");
}


function editPost(postID) {
    let editPost = $('[post-id="' + postID + '"]');
    editPost.css("visibility", "hidden");
}


function openEditDeleteComment(commentID) {
    $(".edit-delete-comment").css({'visibility': 'hidden',});
    $(".edit-delete-comment[comment-id='" + commentID + "']").css("visibility", "visible");
}


$(document).ready(function() {
    
    $("#posts-btn").click(function(){
        $("#recent-posts-area").css("display", "block");
        $("#recent-comments-area").css("display", "none");
        $("#likes-area").css("display", "none");

        updateButtonColor($(this));
    });

    $("#comments-btn").click(function(){
        $("#recent-posts-area").css("display", "none");
        $("#recent-comments-area").css("display", "block");
        $("#likes-area").css("display", "none");

        updateButtonColor($(this));
    });

    $("#likes-btn").click(function(){
        $("#recent-posts-area").css("display", "none");
        $("#recent-comments-area").css("display", "none");
        $("#likes-area").css("display", "block");

        updateButtonColor($(this));
    });

    $(".edit-profile").click(function() {
        openEditProfilePopUp();
    })
    
    $("#close-btn, #save-btn").click(function() {
        closeEditProfilePopUp();
    })

    $(".three-dots-post").click(function() {
        let postID = $(this).closest('.post').find('.edit-delete-post').attr('post-id');
        openEditDeletePost(postID);
        //alert("button clicked on "+ postID);
    });  

    $(".edit-post").click(function() {
        let postID = $(this).closest('.edit-delete-post').attr('post-id');
        editPost(postID);
    });

    $(".delete-post").click(function() {
        let postID = $(this).closest('.edit-delete-post').attr('post-id');
        deletePost(postID);
        //alert("delete button clicked on "+ postID);
    });

    $(".three-dots-comment").click(function() {
        let commentID = $(this).closest('.recent-comment').find('.edit-delete-comment').attr('comment-id');
        openEditDeleteComment(commentID);
        //alert("button clicked on " + commentID);
    }); 
});


  