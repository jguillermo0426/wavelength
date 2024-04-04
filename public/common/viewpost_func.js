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

function openEditDeleteReply(replyID) {
  $(".edit-delete-reply").css({'visibility': 'hidden',});
  $(".edit-delete-reply[reply-id='" + replyID + "']").css("visibility", "visible");
}

function editComment(commentID) {
  let editComment = $('[comment-id="' + commentID + '"]');
  editComment.css("visibility", "hidden");
}

function editReply(replyID) {
  let editReply = $('[reply-id="' + replyID + '"]');
  editReply.css("visibility", "hidden");
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
  });

  $(".three-dots-comment").click(function() {
      let commentID = $(this).closest('.recent-comment').find('.edit-delete-comment').attr('comment-id');
      openEditDeleteComment(commentID);
  }); 

  $(".three-dots-comment-main").click(function() {
    let commentID = $(this).closest('.comment-container').find('.edit-delete-comment').attr('comment-id');
    openEditDeleteComment(commentID);
    //alert("button clicked on " + commentID);
  }); 
    
  $(".three-dots-reply").click(function() {
    let replyID = $(this).closest('.reply-container').find('.edit-delete-reply').attr('reply-id');
    openEditDeleteReply(replyID);
    //alert("button clicked on " + replyID);
  }); 

  $(".edit-reply").click(function() {
      let replyID = $(this).closest('.edit-delete-reply').attr('reply-id');
      editReply(replyID);
  });

  $(".delete-reply").click(function() {
      let replyID = $(this).closest('.edit-delete-reply').attr('reply-id');
      deleteReply(replyID);
  });

  $(document).click(function(event) {
    if (!$(event.target).closest('.three-dots-post, .edit-delete-post, .three-dots-comment, .edit-delete-comment, .three-dots-reply, .edit-delete-reply').length) {
        $('.edit-delete-post, .edit-delete-comment, .edit-delete-reply').css('visibility', 'hidden');
    }
  });

});


