var logoBar = document.getElementById('logo-bar');

var logInButton = document.getElementById('log-in');
var logOutButton = document.getElementById('log-out');

var userBar = document.getElementById('user-bar');

logoBar.style.cursor = 'pointer';

var likeDislikeArray = [];

logoBar.addEventListener('click', function() {
    window.location.href = '../html/home.html';
});


document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();

    highlightSort();

    const posts = document.querySelectorAll('.post');

    posts.forEach((post, i) => {
        const newId = 'post-' + i;
        post.id = newId;
    });

    const postTemplate = document.getElementById('post-0');


    for (var i = 0; i < posts.length; i++) {
        var likeButton = posts[i].querySelector('.like');
        var dislikeButton = posts[i].querySelector('.dislike');
    
        likeButton.id = 'like-' + i;
        dislikeButton.id = 'dislike-' + i;

        var likeDislike = {
            clickedLike: false,
            clickedDislike: false,
            likeAfter: false,
            dislikeAfter: false
        };

        likeDislikeArray.push(likeDislike);
    
        likeButton.setAttribute('onclick', 'likeWrapper(' + i + ')');
        dislikeButton.setAttribute('onclick', 'dislikeWrapper(' + i + ')');
    }

    var createPostBar = document.getElementById('create-post');
    var savedState = localStorage.getItem('createPostState');

    if (savedState) {
        createPostBar.style.display = savedState;
    }
});

function highlightSort() {
    const containers = document.querySelectorAll('.sort-option');

    const recent = document.getElementById('recent');
    recent.querySelector('.text').classList.add('clicked');
    recent.querySelector('.image').classList.add('clicked');

    containers.forEach(container => {
        const image = container.querySelector('.image');
        const paragraph = container.querySelector('.text');

        container.addEventListener('click', function() {
            // Remove 'clicked' class from all paragraphs and images within the same container
            containers.forEach(c => {
                c.querySelector('.text').classList.remove('clicked');
                c.querySelector('.image').classList.remove('clicked');
            });

            // Add 'clicked' class to the clicked paragraph and image within the same container
            paragraph.classList.add('clicked');
            image.classList.add('clicked');
        });
    });
}

function toggleLoginStatus() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var createPostBar = document.getElementById('create-post');
    if (isLoggedIn === 'true') {
        // User is logged in, perform logout
        localStorage.setItem('isLoggedIn', 'false');
        updateLoginStatus();
        createPostBar.style.display = 'none';
    } else {
        // User is logged out, perform login
        localStorage.setItem('isLoggedIn', 'true');
        updateLoginStatus();
        createPostBar.style.display = 'flex';
    }
    localStorage.setItem('createPostState', createPostBar.style.display);
}

function updateLoginStatus() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        userBar.innerHTML = '<a class="profile-picture" href="home.html"><img src="https://i.pinimg.com/736x/ed/42/34/ed4234840e9d633c60a64c956bb6a629.jpg"></a>' + 
                            '<a href="home.html" class="logged-status" id="log-out" onclick="toggleLoginStatus();">log out</a>';
    } else {
        userBar.innerHTML = '<a href="home.html" class="logged-status" id="log-in" class="log-in" onclick="toggleLoginStatus();">log in</a>' + 
                            '<p>|</p>' + 
                            '<a href="home.html" class="logged-status" id="sign-up" class="sign-up">sign up<a>';
    }
}

var posts = document.querySelectorAll(".post-footer");

function likeWrapper(postNumber) {
    like(postNumber, likeDislikeArray);
}

function dislikeWrapper(postNumber) {
    dislike(postNumber, likeDislikeArray);
}

function like(postNumber, likeDislikeArray) {
    if (likeDislikeArray[postNumber].clickedLike == false) {
        likeDislikeArray[postNumber].clickedLike = true;
        likeDislikeArray[postNumber].clickedDislike = false;
        console.log('like 1');
    } else if (likeDislikeArray[postNumber].clickedLike == false || (likeDislikeArray[postNumber].clickedLike == false && likeDislikeArray[postNumber].clickedDislike == true)) {
        likeDislikeArray[postNumber].clickedDislike = false;
        likeDislikeArray[postNumber].clickedLike = true;
        console.log('like 2');
    } else if (likeDislikeArray[postNumber].clickedLike == true) {
        likeDislikeArray[postNumber].clickedLike = false;
        console.log('like 3');
    }

    console.log('clicked like: ' + likeDislikeArray[postNumber].clickedLike);
    updateReactButtons(postNumber, likeDislikeArray);
    disLikeCounter(postNumber, likeDislikeArray);
}

function dislike(postNumber, likeDislikeArray) {
    if (likeDislikeArray[postNumber].clickedDislike == false) {
        likeDislikeArray[postNumber].clickedDislike = true;
        likeDislikeArray[postNumber].clickedLike = false;
    } else if (likeDislikeArray[postNumber].clickedDislike == false || (likeDislikeArray[postNumber].clickedDislike == false && likeDislikeArray[postNumber].clickedLike == true)) {
        likeDislikeArray[postNumber].clickedLike = false;
        likeDislikeArray[postNumber].clickedDislike = true;
    } else if (likeDislikeArray[postNumber].clickedDislike == true) {
        likeDislikeArray[postNumber].clickedDislike = false;
    }

    updateReactButtons(postNumber, likeDislikeArray);
    disLikeCounter(postNumber, likeDislikeArray);
}

function updateReactButtons(postNumber, likeDislikeArray) {
    var like = document.getElementById('like-' + postNumber);
    var dislike = document.getElementById('dislike-' + postNumber);

    if (likeDislikeArray[postNumber].clickedDislike == true) {
        dislike.src = '../svg/thumbs-up.svg';
    }
    else if (likeDislikeArray[postNumber].clickedLike == true) {
        like.src = '../svg/thumbs-up.svg';
    }

    if(likeDislikeArray[postNumber].clickedDislike == false) {
        dislike.src = '../svg/thumbs-up-stroke.svg';
    }
    if(likeDislikeArray[postNumber].clickedLike == false) {
        like.src = '../svg/thumbs-up-stroke.svg';
    }
}

// ewan ko na kung anong gagawin dito HEAHSDFJKHSDKFHJ medj nababaliw na ako sa

function disLikeCounter(postNumber, likeDislikeArray) {
    var likeCounter = document.getElementById('post-' + postNumber).querySelector('#like-counter');
    var likes = parseInt(likeCounter.innerHTML);

    var dislikeCounter = document.getElementById('post-' + postNumber).querySelector('#dislike-counter');
    var dislikes = parseInt(dislikeCounter.innerHTML);

    if (likeDislikeArray[postNumber].clickedLike == true) {
        likes++;
        likeDislikeArray[postNumber].likeAfter = true;
        console.log('1');
    }
    else if (likeDislikeArray[postNumber].clickedDislike == true) {
        dislikes++;
        likeDislikeArray[postNumber].dislikeAfter = true;
        console.log('2');
    }

    if (likeDislikeArray[postNumber].clickedLike == false && likes > 0) {
        if (likeDislikeArray[postNumber].likeAfter == true) {
            likes--;
            likeDislikeArray[postNumber].likeAfter = false;
            console.log('3');
        }
    }
    
    if (likeDislikeArray[postNumber].clickedDislike == false && dislikes > 0) {
        if (likeDislikeArray[postNumber].dislikeAfter == true) {
            dislikes--;
            likeDislikeArray[postNumber].dislikeAfter = false;
            console.log('4');
        }
    }


    likeCounter.innerHTML = likes;
    dislikeCounter.innerHTML = dislikes;
}