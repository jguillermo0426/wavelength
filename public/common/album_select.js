$("document").ready(function() {
    var clicked = false;
    $(".hover-cover").click(function(){
        if (clicked == false) {
            $(".search-album").css("display", "flex");
            clicked = true;
        }
        else {
            $(".search-album").css("display", "none");
            clicked = false;
        }
    }); 

    $(".search-button").click(function(){
        var link = $("#track-name").val();

        $.post(
            'getAlbumData',
            {url: link},
            function(data, status){
              if(status === 'success'){
                console.log(data.cover);
                console.log(data.artist);
                $(".cover").prop("src", data.cover);
                $(".artist").html(data.artist);
                $(".song-album-title").html(data.name);
            }
        });
    });
});