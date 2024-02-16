var postsData = [
    {
        cover: "https://i.scdn.co/image/ab67616d0000b273b64001fa6292caefc7605550", 
        trackName: "The Perfect Red Velvet",
        artist: "Red Velvet",
        trackLink: "home.html",
        artistLink: "artistpage_redvelvet.html",
        rating: 5, 
        user: "hannipham", 
        userLink: "profile-hanni.html",
        reviewDate: "January 26, 2024",
        tag1: "Album",
        tag2: "K-Pop",
        tag3: "Contemporary R&B",
        title: "SUCH A BOP",
        likes: 2,
        dislikes: 3,
        comments: 3,
        postText: `Omg Reveluvs, did y'all snag "The Perfect Red Velvet" yet?! This album is NO JOKE. Like, I wasn't even a hardcore stan before, but this album SLAPS so hard.
        <br>
        <br>         
        First off, the whole vibe is SOOO cohesive. It's like dark, sultry Red Velvet on a whole new level, and honestly, I'm here for it. Every song feels like it belongs, you know? No skips, just straight bops from start to finish.`,
    },
    {
        cover: "https://i.scdn.co/image/ab67616d0000b27374c732f8aa0e0ccbb3d17d96", 
        trackName: "Bewitched",
        artist: "Laufey",
        trackLink: "albumpage_bewitched.html",
        artistLink: "artistpage_laufey.html",
        rating: 5, 
        user: "laufey", 
        userLink: "profile-pastebored.html",
        reviewDate: "February 14, 2024",
        tag1: "Album",
        tag2: "K-Pop",
        tag3: "Contemporary R&B",
        title: "I'm left bewitched...",
        likes: 69,
        dislikes: 3,
        comments: 3,
        postText: `Laufey's second album, "Bewitched," is like stumbling into a whimsical forest of sound. From the get-go, the opening track "Dreamer" is a cozy enchantment, with Laufey's voice casting a spell that's hard to shake off.
        <br>
        <br>         
        The title track, "Bewitched," ties it all together. It's a haunting melody, a bit mysterious, and it leaves you with that magical feeling, like you just finished a good book or a fantastic movie.
        <br>
        <br>
        Laufey's debut is a delightful journey that effortlessly weaves through different genres. It's a bit like finding a hidden gem in a vintage store - unique, charming, and totally worth sharing with your music-loving friends. "Bewitched" is a solid introduction to Laufey's enchanting world, and it's a ride you won't want to miss. `,
    }
];

var userData = [
    {
        profilePicture: "https://i.pinimg.com/736x/ed/42/34/ed4234840e9d633c60a64c956bb6a629.jpg",
        username: "hannipham",
        postsLiked: [],
        postsDisliked: [],
        password: "hanni2009",
        profileLink: "profile-hanni.html"
    },
    {
        profilePicture: "https://qph.cf2.quoracdn.net/main-qimg-468531bd9031bbc43980b8db0ea5fa75-lq",
        username: "kiwidoms",
        postsLiked: [],
        postsDisliked: [],
        password: "wiwidoms04",
        profileLink: "home.html"
    },
    {
        profilePicture: "https://qph.cf2.quoracdn.net/main-qimg-468531bd9031bbc43980b8db0ea5fa75-lq",
        username: "pastebored",
        postsLiked: [],
        postsDisliked: [],
        password: "superpass",
        profileLink: "profile-pastebored.html"
    }
];

var likeDislikeArray = [];
var postInfo = [];

var logoBar = document.getElementById('logo-bar');

logoBar.style.cursor = 'pointer';

logoBar.addEventListener('click', function() {
    window.location.href = '../html/home.html';
});

var userBar = document.getElementById('user-bar');

function createPost(postData, idNumber) {
    const postDiv = document.createElement('div');
    postDiv.className = "post";

    var ratings = [];


    for (let i = 0; i < postData.rating; i++) {
        ratings.push('../svg/star.svg');
    }
    for (let i = 0; i < 5 - postData.rating; i++) {
        ratings.push('../svg/star-empty.svg');
    }

    postDiv.id = "post-" + idNumber;
    postDiv.innerHTML = `
      <div class="post-header">
        <a></a>
        <img class="cover" src="${postData.cover}">
        <div class="post-titles">
          <p class="song-album-title"><a href="${postData.trackLink}">${postData.trackName}</a></p>
          <p class="artist"><a href="${postData.artistLink}">${postData.artist}</a></p>
          <div class="rating">
            <img src=${ratings[0]}>
            <img src=${ratings[1]}>
            <img src=${ratings[2]}>
            <img src=${ratings[3]}>
            <img src=${ratings[4]}>
          </div>
          <p class="user-reviewed">reviewed by <a href="${postData.userLink}" class="user">${postData.user}</a> on <span class="date">${postData.reviewDate}</span></p>
            <div class="tags-area">
              <div class="tag" onclick="tagClick('${postData.tag1}')">
                <p>${postData.tag1}</p>
            </div>
            <div class="tag" onclick="tagClick('${postData.tag2}')">
                <p>${postData.tag2}</p>
            </div>
            <div class="tag" onclick="tagClick('${postData.tag3}')">
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

    return postDiv;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

var postsArray = [];
var filteredPosts = [];
var isFiltered = false;

function assignId() {
    for (let i = 0; i < postsData.length; i++) {
        var postDiv = createPost(postsData[i], i);

        var likeButton = postDiv.querySelector('.like');
        var dislikeButton = postDiv.querySelector('.dislike');

        likeButton.id = 'like-' + i;
        dislikeButton.id = 'dislike-' + i;

        var likeDislike = {
            clickedLike: false,
            clickedDislike: false,
            likeAfter: false,
            dislikeAfter: false
        };

        var likes = parseInt(postsData[i].likes);

        var dislikes = parseInt(postsData[i].dislikes);

        var reacts = {
            likeCount: likes,
            dislikeCount: dislikes,
            date: '1970-01-01'
        };

        likeDislikeArray.push(likeDislike);
        reacts.date = getPostDate(postsData[i].reviewDate);
        postInfo.push(reacts);
        
        likeButton.setAttribute('onclick', 'likeWrapper(' + i + ')');
        dislikeButton.setAttribute('onclick', 'dislikeWrapper(' + i + ')');

        postsArray.push(postDiv);
    }
}

function loadPosts(loadedPosts, array) {
    const postArea = document.getElementById("post-area");
    removeAllChildNodes(postArea);

    for (let i = 0; i < loadedPosts; i++) {
        postArea.appendChild(array[i]);
    }
}

var loadedPosts = 15;

var userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));

document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus(JSON.parse(localStorage.getItem("userLoggedIn")));
    assignId();

    highlightSort();

    sortPostsRecent();

    if (postsData.length < 15) {
        loadedPosts = postsData.length;
    }
    loadPosts(loadedPosts, postsArray);

    
    var createPostBar = document.getElementById('create-post');
    var savedState = localStorage.getItem('createPostState');

    if (savedState) {
        createPostBar.style.display = savedState;
    }

    const feed = document.getElementById("feed");
    var loadMore = document.createElement('button');
    loadMore.className = "load-more";
    loadMore.innerHTML = `<span>Load more posts</span> 
                            <span>+</span>`;
    feed.appendChild(loadMore);
    
    loadMore.addEventListener('click', function() {
        var array = postsArray;

        if (isFiltered) {
            array = filteredPosts;
        }

        if (array.length - loadedPosts < 15) {
            loadedPosts = loadedPosts + (array.length - loadedPosts);
        }
        else {
            loadedPosts += 15;
        }
        loadPosts(loadedPosts, array);
    });
});

function getProfilePicture(username) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === username) {
            console.log(userData[i].profilePicture);
            return userData[i].profilePicture;
        }
    }

    return null;
}

function getPostDate(dateString) {
    var dateObject = new Date(dateString);
    return dateObject;
}

var sorted = "recent";

function sortPostsRecent() {
    var array = postsArray;

    if (isFiltered) {
        array = filteredPosts;
    }

    array.sort(function(a, b) {
        var compA = getPostDate(a.querySelector(".date").innerHTML);
        var compB = getPostDate(b.querySelector(".date").innerHTML);

        if (compA < compB) {
            return 1;
        }
        else if (compA > compB) {
            return -1;
        }
        else {
            return 0;
        }
    });

    if (array.length < 15) {
        loadedPosts = array.length;
    }
    else {
        loadedPosts = 15;
    }
    loadPosts(loadedPosts, array);
}

function sortPostsPopular() {
    var array = postsArray;

    if (isFiltered) {
        array = filteredPosts;
    }

    array.sort(function(a, b) {
        var compA = parseInt(a.querySelector('#like-counter').innerHTML);
        var compB = parseInt(b.querySelector('#like-counter').innerHTML);

        if (compA < compB) {
            return 1;
        }
        else if (compA > compB) {
            return -1;
        }
        else {
            return 0;
        }
    });

    if (array.length < 15) {
        loadedPosts = array.length;
    }
    else {
        loadedPosts = 15;
    }
    loadPosts(loadedPosts, array);
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
    sorted = "popular";
    sortPostsPopular();
});

const recent = document.getElementById('recent');

recent.addEventListener('click', function() {
    sorted = "recent";
    sortPostsRecent();
});

function logOut() {
    localStorage.setItem("isLoggedIn", false);
}

function updateLoginStatus(user) {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    var createPostBar = document.getElementById('create-post');

    if (isLoggedIn === 'true') {
        createPostBar.querySelector("#profile-picture-post").src = JSON.parse(localStorage.getItem("profilePicture"));
        userBar.innerHTML = `<div class='profile-pic-holder'> 
                                <a class="profile-picture" href="${JSON.parse(localStorage.getItem("userLoggedIn")).profileLink}"><img src="${JSON.parse(localStorage.getItem("profilePicture"))}"></a>
                             </div>
                             <a href="home.html" class="logged-status" id="log-out" onclick="logOut();">log out</a>`;
        createPostBar.style.display = 'flex';

    } else {
        userBar.innerHTML = `<a href="login.html" class="logged-status" id="log-in" class="log-in"">log in</a>
                            <p>|</p>
                            <a href="signup.html" class="logged-status" id="sign-up" class="sign-up">sign up<a>`;
        createPostBar.style.display = 'none';
    }
}

var posts = document.querySelectorAll(".post-footer");

function closeLoginPopup() {
    let popUp = document.getElementById("login-popup");
    popUp.style.display = 'none';
}

function likeWrapper(postNumber) {
    let popUp = document.getElementById("login-popup");

    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        popUp.style.display = 'none';
        like(postNumber, likeDislikeArray);
    }
    else {
        popUp.style.display = 'block';
        console.log("You need to log in");
    }
}

function dislikeWrapper(postNumber) {
    let popUp = document.getElementById("login-popup");
    
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        popUp.style.display = 'none';
        dislike(postNumber, likeDislikeArray);
    }
    else {
        popUp.style.display = 'block';
        console.log("You need to log in");
    }
}

function like(postNumber, likeDislikeArray) {

    var postId = "post-" + postNumber;

    var postIndex = postsArray.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
        console.error("Post not found");
        return;
    }

    if (likeDislikeArray[postNumber].clickedLike == false) {
        likeDislikeArray[postNumber].clickedLike = true;
        likeDislikeArray[postNumber].clickedDislike = false;

        var indexD = userLoggedIn.postsDisliked.findIndex(post => post.id === postId);
        var indexL = userLoggedIn.postsLiked.findIndex(post => post.id === postId);

        if (indexD !== -1) {
            userLoggedIn.postsDisliked.splice(indexD, 1);
        }

        if (indexL === -1) {
            userLoggedIn.postsLiked.push(postsArray[postIndex]);
        }

        console.log('like 1');
    } else if (likeDislikeArray[postNumber].clickedLike == false || (likeDislikeArray[postNumber].clickedLike == false && likeDislikeArray[postNumber].clickedDislike == true)) {
        likeDislikeArray[postNumber].clickedDislike = false;
        likeDislikeArray[postNumber].clickedLike = true;

        var indexD = userLoggedIn.postsDisliked.findIndex(post => post.id === postId);
        var indexL = userLoggedIn.postsLiked.findIndex(post => post.id === postId);

        if (indexD !== -1) {
            userLoggedIn.postsDisliked.splice(indexD, 1);
        }

        if (indexL === -1) {
            userLoggedIn.postsLiked.push(postsArray[postIndex]);
        }

        console.log('like 2');
    } else if (likeDislikeArray[postNumber].clickedLike == true) {
        likeDislikeArray[postNumber].clickedLike = false;

        var indexL = userLoggedIn.postsLiked.findIndex(post => post.id === postId);

        if (indexL !== -1) {
            userLoggedIn.postsLiked.splice(indexL, 1);
        }

        console.log('like 3');
    }

    console.log('clicked like: ' + likeDislikeArray[postNumber].clickedLike);
    updateReactButtons(postNumber);
    disLikeCounter(postNumber, likeDislikeArray);

    console.log(userLoggedIn.postsLiked);
    console.log(userLoggedIn.postsDisliked);
}


function dislike(postNumber, likeDislikeArray) {
    var postId = "post-" + postNumber;

    var postIndex = postsArray.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
        console.error("Post not found");
        return;
    }

    if (likeDislikeArray[postNumber].clickedDislike == false) {
        likeDislikeArray[postNumber].clickedDislike = true;
        likeDislikeArray[postNumber].clickedLike = false;

        var indexD = userLoggedIn.postsDisliked.findIndex(post => post.id === postId);
        var indexL = userLoggedIn.postsLiked.findIndex(post => post.id === postId);

        if (indexL !== -1) {
            userLoggedIn.postsLiked.splice(indexD, 1);
        }

        if (indexD === -1) {
            userLoggedIn.postsDisliked.push(postsArray[postIndex]);
        }

    } else if (likeDislikeArray[postNumber].clickedDislike == false || (likeDislikeArray[postNumber].clickedDislike == false && likeDislikeArray[postNumber].clickedLike == true)) {
        likeDislikeArray[postNumber].clickedLike = false;
        likeDislikeArray[postNumber].clickedDislike = true;

        var indexD = userLoggedIn.postsDisliked.findIndex(post => post.id === postId);
        var indexL = userLoggedIn.postsLiked.findIndex(post => post.id === postId);

        if (indexL !== -1) {
            userLoggedIn.postsLiked.splice(indexD, 1);
        }

        if (indexD === -1) {
            userLoggedIn.postsDisliked.push(postsArray[postIndex]);
        }

    } else if (likeDislikeArray[postNumber].clickedDislike == true) {
        likeDislikeArray[postNumber].clickedDislike = false;

        var indexD = userLoggedIn.postsDisliked.findIndex(post => post.id === postId);

        if (indexD !== -1) {
            userLoggedIn.postsDisliked.splice(indexD, 1);
        }
    }

    updateReactButtons(postNumber);
    disLikeCounter(postNumber, likeDislikeArray);

    console.log(userLoggedIn.postsLiked);
    console.log(userLoggedIn.postsDisliked);
}

function updateReactButtons(postNumber) {
    var postId = "post-" + postNumber;

    var like = document.getElementById('like-' + postNumber);
    var dislike = document.getElementById('dislike-' + postNumber);

    var index = postsArray.findIndex(post => post.id === postId);   

    if (userLoggedIn.postsDisliked.includes(postsArray[index])) {
        dislike.src = '../svg/thumbs-up.svg';
    }
    else if (userLoggedIn.postsLiked.includes(postsArray[index])) {
        like.src = '../svg/thumbs-up.svg';
    }
    
    if (!(userLoggedIn.postsDisliked.includes(postsArray[index]))) {
        dislike.src = '../svg/thumbs-up-stroke.svg';
    }
    
    if (!(userLoggedIn.postsLiked.includes(postsArray[index]))) {
        like.src = '../svg/thumbs-up-stroke.svg';
    }

}



function disLikeCounter(postNumber, likeDislikeArray) {
    var likeCounter = document.getElementById('post-' + postNumber).querySelector('#like-counter');
    var likes = parseInt(postsData[postNumber].likes);

    var dislikeCounter = document.getElementById('post-' + postNumber).querySelector('#dislike-counter');
    var dislikes = parseInt(postsData[postNumber].dislikes);

    var postId = "post-" + postNumber;
    var index = postsArray.findIndex(post => post.id === postId); 

    if (userLoggedIn.postsLiked.includes(postsArray[index])) {
        likes++;
        likeDislikeArray[postNumber].likeAfter = true;
        console.log('1');
    }
    else if (userLoggedIn.postsDisliked.includes(postsArray[index])) {
        dislikes++;
        likeDislikeArray[postNumber].dislikeAfter = true;
        console.log('2');
    }

    if (!(userLoggedIn.postsLiked.includes(postsArray[index])) && likes > 0) {
        if (likeDislikeArray[postNumber].likeAfter == true) {
            likes--;
            likeDislikeArray[postNumber].likeAfter = false;
            console.log('3');
        }
    }
    
    if (!(userLoggedIn.postsDisliked.includes(postsArray[index])) && dislikes > 0) {
        if (likeDislikeArray[postNumber].dislikeAfter == true) {
            dislikes--;
            likeDislikeArray[postNumber].dislikeAfter = false;
            console.log('4');
        }
    }


    postsData[postNumber].likes = likes;
    postsData[postNumber].dislikes = dislikes;
    

    likeCounter.innerHTML = likes;
    dislikeCounter.innerHTML = dislikes;

    localStorage.setItem('userData', JSON.stringify(userData));
    var d = JSON.parse(localStorage.getItem('userData'));

    console.log(d[0].postsLiked);
}


function checkRegister() {
    var errorMessage = document.querySelector(".error-message");
    var takenUser = false;
    const username = document.forms["main-form"]["username"].value;
    const password = document.forms["main-form"]["password"].value;
    const confPassword = document.forms["main-form"]["confirm-password"].value;

    let users = JSON.parse(localStorage.getItem("users")) || userData;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            takenUser = true;
        }
    }

    if (username.length < 3) {
        errorMessage.innerHTML = "Username must be more than 3 characters."
        errorMessage.style.visibility = "visible";
        return false;
    }
    else if (takenUser == true) {
        errorMessage.innerHTML = "Username is already taken."
        errorMessage.style.visibility = "visible";
        return false;
    }
    else if (password.localeCompare(confPassword) != 0) {
        errorMessage.innerHTML = "Passwords do not match."
        errorMessage.style.visibility = "visible";
        return false;
    }

    var user = {
        profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        username: username,
        postsLiked: [],
        postsDisliked: [],
        password: password
    };

    userData.push(user);

    localStorage.setItem("users", JSON.stringify(userData));

    errorMessage.style.visibility = "hidden";
    return true;
}

function checkLogin() {
    var errorMessage = document.querySelector(".error-message");
    const username = document.forms["login-form"]["username"].value;
    const password = document.forms["login-form"]["password"].value;

    var userExists = false;
    var userIndex = -1;

    let users = JSON.parse(localStorage.getItem("users")) || userData;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
            userExists = true;
            userIndex = i;
        }
    }

    if (userExists != true) {
        errorMessage.innerHTML = "Username does not exist."
        errorMessage.style.visibility = "visible";
        return false;
    }
    else if (users[userIndex].password != password) {
        errorMessage.innerHTML = "Password is incorrect."
        errorMessage.style.visibility = "visible";
        return false;
    }

    localStorage.setItem("userLoggedIn", JSON.stringify(users[userIndex]));
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("profilePicture", JSON.stringify(users[userIndex].profilePicture));

    errorMessage.style.visibility = "hidden";
    return true;
}

function search() {
    var input = document.getElementById("search");
    var filter = input.value.toLowerCase().trim();

    const postArea = document.getElementById("post-area");
    removeAllChildNodes(postArea);
    filteredPosts.length = 0;

    if (postsData.length < 15) {
        loadedPosts = postsData.length;
    }
    else {
        loadedPosts = 15;
    }

    if (filter === "") {
        isFiltered = false;
        if (sorted === "recent") {
            sortPostsRecent();
        }
        else if (sorted === "popular") {
            sortPostsPopular();
        }

        loadPosts(loadedPosts, postsArray);
    }
    else {
        isFiltered = true;

        for (let i = 0; i < postsArray.length; i++) {
            var trackName = postsArray[i].querySelector(".song-album-title").innerText;
            var artistName = postsArray[i].querySelector(".artist").innerText;
            var postTitle = postsArray[i].querySelector(".post-title").innerText;
            var postBody = postsArray[i].querySelector(".post-text").innerText;

            if (trackName.toLowerCase().includes(filter) || artistName.toLowerCase().includes(filter) || postTitle.toLowerCase().includes(filter) || postBody.toLowerCase().includes(filter)) {
                console.log(filter, trackName.toLowerCase(), artistName.toLowerCase());
                filteredPosts.push(postsArray[i]);
            }
        }
    
        if (filteredPosts.length < 15) {
            loadedPosts = filteredPosts.length;
        }
        else {
            loadedPosts = 15;
        }
    
        loadPosts(loadedPosts, filteredPosts);
    }
}

function tagClick(filterTag) {
    const tag = document.createElement('div');
    tag.className = "tag";
    tag.onclick = function() {
        tagUnclick(tag);
    };
    tag.innerHTML = `
        <p>${filterTag}</p>
    `;
    const filteredTags = document.getElementById("filtered-tags");
    filteredTags.style.display = "flex";
    
    var tags = filteredTags.querySelectorAll(".tag");

    if (tags.length == 5) {
        return;
    }

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].innerText === filterTag) {
            return;
        }
    }

    filteredTags.appendChild(tag);
}

function tagUnclick(tag) {
    const filteredTags = document.getElementById("filtered-tags");
    filteredTags.style.display = "flex";

    filteredTags.removeChild(tag);
}