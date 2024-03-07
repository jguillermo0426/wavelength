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