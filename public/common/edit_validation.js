function validateComment() {
  var x = document.forms["update-comment"]["commentText"].value;
  if (x == "") {
    alert("Please enter a comment before saving");
    return false;
  }
}

function validateReply() {
  var x = document.forms["update-reply"]["replyText"].value;
  if (x == "") {
    alert("Please enter a comment before saving");
    return false;
  }
}

function validatePost() {
  var x = document.forms["update-post"]["postText"].value;
  var y = document.forms["update-post"]["title"].value;
  if (x == "") {
    alert("Please write a review before submitting");
    return false;
  }
  if (y == "") {
    alert("Please provide a title before submitting");
    return false;
  }
}