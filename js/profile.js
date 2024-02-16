
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

function closeEditDelete(postID) {
  let editDelete = document.getElementById(postID);
  editDelete.style.visibility = 'hidden';
}
