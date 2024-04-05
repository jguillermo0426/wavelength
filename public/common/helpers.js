module.exports = {
    ratingStars : function(rating) {
        var ratings = [];
    
        for (let i = 0; i < rating; i++) {
            ratings.push('../common/svg/star.svg');
        }
        for (let i = 0; i < 5 - rating; i++) {
            ratings.push('../common/svg/star-empty.svg');
        }
    
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars = stars + `<img src="${ratings[i]}">`;
        }
    
        return stars;
    },

    increment : function(value) {
        return parseInt(value) + 1;
    },
    
    truncateText: function(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        else {
            return text;
        }
    },

    showSeeMore: function(text, maxLength) {
        let showSeeMore = text.length > maxLength;

        return showSeeMore;
    },

    formatNameToLink: function(class_data){
        return class_data.toLowerCase().replace(/\s/g, "-")
    },

    checkSelectedRating: function(userRating, ratingOption) {
        let selectedRating = userRating == ratingOption;
        return selectedRating;
    },

    sameLoggedProfile: function(loggedUser, profile){
        let sameLoggedProfile = loggedUser == profile;
        return sameLoggedProfile;
    },

    sameCommentId: function(commentID, replyCommentID){
        let sameCommentId = commentID.toString() == replyCommentID.toString();
        return sameCommentId;
    },

    commentsAndRepliesCounter: function(commentCount, replyCount){
        let comments = parseInt(commentCount, 10);
        let replies = parseInt(replyCount, 10);
        if (isNaN(commentCount) || isNaN(replyCount)) {
            return 0; // Or handle it accordingly
        }
        return comments + replies;
    },

    hasCommentsOrReplies: function(commentLength, replyLength){
        return commentLength || replyLength;
    },

    showComment: function (deleted, replyLength){
        return !deleted || replyLength;
    }
}