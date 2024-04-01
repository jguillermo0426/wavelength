
$(document).ready(function() {
  const MAX_TAGS = 3;

  const tagInput = document.querySelector('#input');
  
  const form = document.forms[0];
  const tagContainer = document.querySelector('.tag-container');
  const tags = [];
  
  const createTag = (tagValue) => {
      const value = tagValue.trim();
    
      if (tags.length >= MAX_TAGS) {
        alert(`Maximum ${MAX_TAGS} tags only.`);
        return;
    }
      const tag = document.createElement('span');
      const tagContent = document.createTextNode(value);
      tag.setAttribute('class', 'tag');
      tag.appendChild(tagContent);
  
      const close = document.createElement('span');
      close.setAttribute('class', 'remove-tag');
      close.innerHTML = '&#10006;'; // X
      close.onclick = removeTag;
  
      tag.appendChild(close);
      tagContainer.appendChild(tag);
      tags.push(tag);
  
      tagInput.value = '';
      tagInput.focus();
  };
  
  const removeTag = (e) => {
      const item = e.target.textContent;
      e.target.parentElement.remove();
      tags.splice(tags.indexOf(item), 1);
  };
  
  const submitForm = (e) => {
      e.preventDefault();
      createTag(tagInput.value);
  };
  
  // separate comma
  tagInput.addEventListener('keyup', (e) => {
      const { key } = e;
      if (key === ',') {
          createTag(tagInput.value.substring(0, tagInput.value.length - 1));
      }
  });
  
  form.addEventListener('submit', submitForm);

    // $("#submit").click(function(event) {
    //   event.preventDefault();
    //   window.location.href = "/";
    // });
});