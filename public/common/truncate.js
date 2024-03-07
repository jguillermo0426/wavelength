$(document).ready(function(){
    $.get('/', function(data, status) {
        let $wrapper = $(".post-text");
        let $div = $(".post-body");
        let ogHeight = $wrapper[0].offsetHeight;
        console.log(ogHeight);

        if ($wrapper[0].scrollHeight > 190) {
            $wrapper.css('max-height', '5em');
            $wrapper.css('margin-bottom', '30px');
            $(".see-more").css('display', 'flex');
        }
    });
});


