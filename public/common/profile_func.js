function openPopUp() {
    $("#edit-popup").css("visibility", "visible");
}


function closePopUp() {
    $("#edit-popup").css("visibility", "hidden");
}


function openEditDelete(postID) {
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


function updateButtonColor(button) {
    $(".profile-options p").css("color", "#A9A5B6"); 
    button.css("color", "#BBA7FF"); 
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
        openPopUp();
    })
    
    $("#close-btn, #save-btn").click(function() {
        closePopUp();
    })

    $(".three-dots img").click(function() {
        let postID = $(this).closest('.post').find('.edit-delete-post').attr('post-id');
        openEditDelete(postID);
        //alert("button clicked on "+ postID);
    });  

    $(".edit").click(function() {
        let postID = $(this).closest('.edit-delete-post').attr('post-id');
        editPost(postID);
        //alert("edit button clicked on "+ postID);
    });

    $(".delete").click(function() {
        let postID = $(this).closest('.edit-delete-post').attr('post-id');
        deletePost(postID);
        //alert("delete button clicked on "+ postID);
    });
});

// for error in log-in/sign-up
function showError() {
    /*
    var errorMessage = document.querySelector(".error-message");
    errorMessage.innerHTML = error
    errorMessage.style.visibility = "visible";
    */
   $("#error-message").css("visibility", "visible");
}
  