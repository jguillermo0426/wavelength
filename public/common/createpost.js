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

        const newTag = value.split(',').pop().trim(); // extract new tag

        const tag = document.createElement('span');
        const tagContent = document.createTextNode(newTag);
        tag.setAttribute('class', 'tag');
        tag.appendChild(tagContent);

        const close = document.createElement('span');
        close.setAttribute('class', 'remove-tag');
        close.innerHTML = '&#10006;'; // X
        close.onclick = () => removeTag(tag, newTag); // when user clicks remove, the tag is also removed in the input field

        tag.appendChild(close);
        tagContainer.appendChild(tag);
        tags.push(newTag);

        tagInput.focus();
    };

    const removeTag = (tagElement, tagText) => {
        tagElement.remove(); // remove tag in the tag container
        const index = tags.indexOf(tagText);
        if (index !== -1) {
            tags.splice(index, 1); // remove tag from array
        }
        updateInputValue(); // uupdate
    };

    const updateInputValue = () => {
        tagInput.value = tags.join(', ') + ', ';
    };

    const submitForm = (e) => {
        e.preventDefault();
        createTag(tags);
    };

    // Separate comma
    tagInput.addEventListener('keyup', (e) => {
        const { key } = e;
        if (key === ',') {
            createTag(tagInput.value.substring(0, tagInput.value.length - 1));
        }
    });

    form.addEventListener('submit', submitForm);

    $(".bold").click(function() {
        var text = document.getElementById("postText");
        var t = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);

        if (t) {
            var newContents = document.createElement('span');
            newContents.textContent = text;
            text.value = text.value.replace(t, `**${t}**`);
        }
    });

    $(".italics").click(function() {
        var text = document.getElementById("postText");
        var t = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);

        if (t) {
            var newContents = document.createElement('span');
            newContents.textContent = text;
            text.value = text.value.replace(t, `*${t}*`);
        }
    });

    $(".underline").click(function() {
        var text = document.getElementById("postText");
        var t = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);

        if (t) {
            var newContents = document.createElement('span');
            newContents.textContent = text;
            text.value = text.value.replace(t, `__${t}__`);
        }
    });

    $(".strikethrough").click(function() {
        var text = document.getElementById("postText");
        var t = text.value.substr(text.selectionStart,text.selectionEnd-text.selectionStart);

        if (t) {
            var newContents = document.createElement('span');
            newContents.textContent = text;
            text.value = text.value.replace(t, `~~${t}~~`);
        }
    });
});
