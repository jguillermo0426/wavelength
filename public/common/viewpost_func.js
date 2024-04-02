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

  $("#cancel-delete-btn").click(function() {
    window.history.back();
  });

  $("#confirm-delete-btn").click(function() {
      window.history.back();
  });
});


