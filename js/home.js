var logoBar = document.getElementById('logo-bar');

var logInButton = document.getElementById('log-in');
var logOutButton = document.getElementById('log-out');

var userBar = document.getElementById('user-bar');

logoBar.style.cursor = 'pointer';

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
    
        likeButton.setAttribute('onclick', 'like(' + i + ')');
        dislikeButton.setAttribute('onclick', 'dislike(' + i + ')');
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
    
    if (isLoggedIn === 'true') {
        // User is logged in, perform logout
        localStorage.setItem('isLoggedIn', 'false');
        updateLoginStatus();
    } else {
        // User is logged out, perform login
        localStorage.setItem('isLoggedIn', 'true');
        updateLoginStatus();
    }
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

var clickedLike = false;
var clickedDislike = false;

var likeCount = 0;
var dislikeCount = 0;

function like(postNumber) {
    if (clickedLike == false) {
        clickedLike = true;
        clickedDislike = false;
        likeCount++;
        dislikeCount = 0;
    }

    else if (clickedLike == false || (clickedLike == false && clickedDislike == true)) {
        clickedDislike = false;
        clickedLike = true;
        likeCount++;
        dislikeCount = 0;
    }

    else if (clickedLike == true) {
        clickedLike = false;
        likeCount++;
        dislikeCount = 0;
    }
    
    updateReactButtons(postNumber);
    disLikeCounter(postNumber);
}

function dislike(postNumber) {
    if (clickedDislike == false) {
        clickedDislike = true;
        clickedLike = false;
        dislikeCount++;
        likeCount = 0;
    }

    else if (clickedDislike == false || (clickedDislike == false && clickedLike == true)) {
        clickedLike = false;
        clickedDislike = true;
        dislikeCount++;
        likeCount = 0;
    }

    else if (clickedDislike == true) {
        clickedDislike = false;
        dislikeCount++;
        likeCount = 0;
    }

    updateReactButtons(postNumber);
    disLikeCounter(postNumber);
}

function updateReactButtons(postNumber) {
    var like = document.getElementById('like-' + postNumber);
    var dislike = document.getElementById('dislike-' + postNumber);

    if (clickedDislike == true) {
        dislike.src = '../svg/thumbs-up.svg';
    }
    else if (clickedLike == true) {
        like.src = '../svg/thumbs-up.svg';
    }

    if(clickedDislike == false) {
        dislike.src = '../svg/thumbs-up-stroke.svg';
    }
    if(clickedLike == false) {
        like.src = '../svg/thumbs-up-stroke.svg';
    }
}

function disLikeCounter(postNumber) {
    var likeCounter = document.getElementById('post-' + postNumber).querySelector('#like-counter');
    var likes = parseInt(likeCounter.innerHTML);

    var dislikeCounter = document.getElementById('post-' + postNumber).querySelector('#dislike-counter');
    var dislikes = parseInt(dislikeCounter.innerHTML);

    if (clickedLike == true) {
        likes += 1;
        console.log('clicked like');
    }
    else if (clickedLike == false && likeCount > 0 && likes > 0) {
        likes -= 1; 
        console.log('unclicked like 1');
    }
    else if (clickedLike == false && clickedDislike == true && likes > 0) {
        if (likeCount == 0 && dislikeCount > 0) { 
            likes = likes;
            console.log('unclicked like 2');
        }
        else {
            likes -= 1;
            console.log('unclicked like 3');
        }
    }
    
    if (clickedDislike == true) {
        dislikes += 1;
        console.log('clicked dislike');
    }
    else if (clickedDislike == false && dislikeCount > 0 && dislikes > 0) {
        dislikes -= 1;
        console.log('unclicked dislike 1');
    }
    else if (clickedDislike == false && clickedLike == true && dislikes > 0) {
        if (dislikeCount == 0 && likeCount > 0) {
            dislikes = dislikes;
            console.log('unclicked dislike 2');
        }
        else {
            dislikes -= 1;
            console.log('unclicked dislike 3');
        }
    }
    

    console.log(likeCount);
    console.log(dislikeCount);

    likeCounter.innerHTML = likes;
    dislikeCounter.innerHTML = dislikes;
}