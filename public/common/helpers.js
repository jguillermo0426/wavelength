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
    }
}