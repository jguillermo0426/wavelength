var postsData = [
    {
        cover: "https://i.scdn.co/image/ab67616d0000b273b64001fa6292caefc7605550", 
        trackName: "The Perfect Red Velvet",
        artist: "Red Velvet",
        rating: 5, 
        user: "kiwidoms", 
        reviewDate: "January 26, 2024",
        tag1: "Album",
        tag2: "K-Pop",
        tag3: "Contemporary R&B",
        title: "Cool Arbum!",
        likes: 10,
        dislikes: 10,
        comments: 10,
        postText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus elit lectus, at bibendum enim varius nec. Aenean dui erat, dictum eu vestibulum viverra, ullamcorper at nunc. Curabitur sit amet pellentesque sem. Cras imperdiet venenatis nunc in vehicula. Fusce vestibulum lacinia rutrum. Etiam faucibus porta dolor, in molestie erat aliquet in. Etiam cursus commodo convallis. Vestibulum nec quam felis. Phasellus id interdum velit. Fusce non finibus turpis. Sed interdum eros condimentum aliquet auctor. Pellentesque blandit ut est sed lobortis. Nam hendrerit aliquet mauris eget porttitor. Donec semper eu nulla at dictum.",
        
    },
    {
        cover: "https://upload.wikimedia.org/wikipedia/en/5/51/Stray_Kids_-_Rock-Star.png", 
        trackName: "Rock-Star",
        artist: "Stray Kids",
        rating: 5, 
        user: "crimson", 
        reviewDate: "January 30, 2024",
        tag1: "Album",
        tag2: "K-Pop",
        tag3: "Rock",
        title: "Just feel the rock!",
        likes: 100,
        dislikes: 10,
        comments: 5,
        postText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus elit lectus, at bibendum enim varius nec. Aenean dui erat, dictum eu vestibulum viverra, ullamcorper at nunc. Curabitur sit amet pellentesque sem. Cras imperdiet venenatis nunc in vehicula. Fusce vestibulum lacinia rutrum. Etiam faucibus porta dolor, in molestie erat aliquet in. Etiam cursus commodo convallis. Vestibulum nec quam felis. Phasellus id interdum velit. Fusce non finibus turpis. Sed interdum eros condimentum aliquet auctor. Pellentesque blandit ut est sed lobortis. Nam hendrerit aliquet mauris eget porttitor. Donec semper eu nulla at dictum.",
        
    },
    {
        cover: "https://i.scdn.co/image/ab67616d0000b273adbc64e70fdf990fb432c14a", 
        trackName: "Habit",
        artist: "SEKAI NO OWARI",
        rating: 4, 
        user: "crimson", 
        reviewDate: "January 30, 2024",
        tag1: "Album",
        tag2: "J-Pop",
        tag3: "Indie",
        title: "The title track was cool.",
        likes: 5,
        dislikes: 16,
        comments: 30,
        postText: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer finibus elit lectus, at bibendum enim varius nec. Aenean dui erat, dictum eu vestibulum viverra, ullamcorper at nunc. Curabitur sit amet pellentesque sem. Cras imperdiet venenatis nunc in vehicula. Fusce vestibulum lacinia rutrum. Etiam faucibus porta dolor, in molestie erat aliquet in. Etiam cursus commodo convallis. Vestibulum nec quam felis. Phasellus id interdum velit. Fusce non finibus turpis. Sed interdum eros condimentum aliquet auctor. Pellentesque blandit ut est sed lobortis. Nam hendrerit aliquet mauris eget porttitor. Donec semper eu nulla at dictum.",
        
    }
];

var logoBar = document.getElementById('logo-bar');

var userBar = document.getElementById('user-bar');

logoBar.style.cursor = 'pointer';

var likeDislikeArray = [];
var postInfo = [];

logoBar.addEventListener('click', function() {
    window.location.href = '../html/home.html';
});


function createPost(postData) {
    const postArea = document.getElementById("post-area");

    const postDiv = document.createElement('div');
    postDiv.className = "post";

    var ratings = [];


    for (let i = 0; i < postData.rating; i++) {
        ratings.push('../svg/star.svg');
    }
    for (let i = 0; i < 5 - postData.rating; i++) {
        ratings.push('../svg/star-empty.svg');
    }

    postDiv.innerHTML = `
      <div class="post-header">
        <a></a>
        <img class="cover" src="${postData.cover}">
        <div class="post-titles">
          <p class="song-album-title">${postData.trackName}</p>
          <p class="artist">${postData.artist}</p>
          <div class="rating">
            <img src=${ratings[0]}>
            <img src=${ratings[1]}>
            <img src=${ratings[2]}>
            <img src=${ratings[3]}>
            <img src=${ratings[4]}>
          </div>
          <p class="user-reviewed">reviewed by <a href="home.html" class="user">${postData.user}</a> on <span class="date">${postData.reviewDate}</span></p>
            <div class="tags-area">
              <div class="tag">
                <p>${postData.tag1}</p>
            </div>
            <div class="tag">
                <p>${postData.tag2}</p>
            </div>
            <div class="tag">
                <p>${postData.tag3}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="post-body">
        <p class="post-title">${postData.title}</p>
        <p class="post-text">${postData.postText} <a href="#" class="see-more"> See more...</a></p>
      </div>

      <div class="post-footer">
        <div id="likes-bar" class="react-bar">
            <input type="image" class="like" src="../svg/thumbs-up-stroke.svg">
            <p id="like-counter" class="counter">${postData.likes}</p>
        </div>

        <div id="dislikes-bar" class="react-bar">
            <input type="image" class="dislike" src="../svg/thumbs-up-stroke.svg">
            <p id="dislike-counter" class="counter">${postData.dislikes}</p>
        </div>

        <div id="comments-bar" class="react-bar">
            <input type="image" class="comment" src="../svg/comment.svg">
            <p id="comment-counter" class="counter">${postData.comments}</p>
        </div>
      </div>
    `;

    postArea.appendChild(postDiv);
}

document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();

    for (let i = 0; i < postsData.length; i++) {
        createPost(postsData[i]);
    }

    highlightSort();
    sortPostsRecent();

    

    const postArea = document.getElementById("feed");
    var loadMore = document.createElement('p');
    loadMore.innerHTML = `<p class="load-more">Load more posts</p>`
    postArea.appendChild(loadMore);

    const posts = document.querySelectorAll('.post');

    posts.forEach((post, i) => {
        const newId = 'post-' + i;
        post.id = newId;
    });

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



        var likeCounter = document.getElementById('post-' + i).querySelector('#like-counter');
        var likes = parseInt(likeCounter.innerHTML);

        var dislikeCounter = document.getElementById('post-' + i).querySelector('#dislike-counter');
        var dislikes = parseInt(dislikeCounter.innerHTML);

        var reacts = {
            likeCount: likes,
            dislikeCount: dislikes,
            date: '1970-01-01'
        };

        likeDislikeArray.push(likeDislike);
        reacts.date = getPostDate(i);
        postInfo.push(reacts);
    
        likeButton.setAttribute('onclick', 'likeWrapper(' + i + ')');
        dislikeButton.setAttribute('onclick', 'dislikeWrapper(' + i + ')');
    }

    var createPostBar = document.getElementById('create-post');
    var savedState = localStorage.getItem('createPostState');

    if (savedState) {
        createPostBar.style.display = savedState;
    }
});

function getPostDate(dateString) {
    var dateObject = new Date(dateString);
    return dateObject;
}

function sortPostsRecent() {
    var postArea = document.getElementById('post-area');

    var post = postArea.querySelectorAll('.post');
    var postSorted = [];
    for (i = 0; i < post.length; i++) {
        postSorted.push(post.item(i));
    }

    postSorted.sort(function(a, b) {
        var compA = getPostDate(a.querySelector(".date").innerHTML);
        var compB = getPostDate(b.querySelector(".date").innerHTML);
        return (compA < compB) ? 1 : (compA > compB) ? -1 : 0;
    });
    for (i = 0; i < postSorted.length; i++) {
        postArea.appendChild(postSorted[i]);
        console.log(postSorted[i]);
    }
}

function sortPostsPopular() {
    var postArea = document.getElementById('post-area');

    var post = postArea.querySelectorAll('.post');
    var postSorted = [];
    for (i = 0; i < post.length; i++) {
        postSorted.push(post.item(i));
    }
    postSorted.sort(function(a, b) {
        var compA = parseInt(a.querySelector('#like-counter').innerHTML);
        var compB = parseInt(b.querySelector('#like-counter').innerHTML);
        console.log('compA: ' + compA);
        console.log('compB: ' + compB);

        if (compA < compB) {
            console.log(1);
            return 1;
        }
        else if (compA > compB) {
            console.log(-1);
            return -1;
        }
        else {
            console.log(0);
            return 0;
        }
    });
    for (i = 0; i < postSorted.length; i++) {
        postArea.appendChild(postSorted[i]);
        console.log(postSorted[i]);
    }
}

function highlightSort() {
    const containers = document.querySelectorAll('.sort-option');

    const recent = document.getElementById('recent');
    recent.querySelector('.text').classList.add('clicked');
    recent.querySelector('.image').classList.add('clicked');

    containers.forEach(container => {
        const image = container.querySelector('.image');
        const paragraph = container.querySelector('.text');

        container.addEventListener('click', function() {
            
            containers.forEach(c => {
                c.querySelector('.text').classList.remove('clicked');
                c.querySelector('.image').classList.remove('clicked');
            });

            paragraph.classList.add('clicked');
            image.classList.add('clicked');
        });
    });
}

const popular = document.getElementById('popular');

popular.addEventListener('click', function() {
    sortPostsPopular();
});

const recent = document.getElementById('recent');

recent.addEventListener('click', function() {
    sortPostsRecent();
});

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