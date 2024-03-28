
function openPopUp(){
  let popUp = document.getElementById("edit-popup");
  popUp.style.visibility = 'visible';
}

function closePopUp(){
  let popUp = document.getElementById("edit-popup");
  popUp.style.visibility = 'hidden';
}

function openEditDelete(postID) {
  let editDelete = document.getElementById(postID);
  editDelete.style.visibility = 'visible';
  editDelete.style.left = pageX + 'px';
  editDelete.style.top = pageY + 'px';
}

function deletePost(postID) {
  let deletePost = document.getElementById(postID);
  deletePost.style.visibility = 'hidden';
}

function editPost(postID) {
  let editPost = document.getElementById(postID);
  editPost.style.visibility = 'hidden';
  window.location.href = '../html/editpost.html';
}
