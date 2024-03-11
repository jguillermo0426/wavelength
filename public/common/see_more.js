$(document).ready(function(){
    $.get('/', function(data, status) {
        let $wrapper = $(".post-text");
        let $seeMore = $(".see-more");
        
        if($wrapper.text > 500) {
            $seeMore.css('color', 'blue');
        }
    });
});


