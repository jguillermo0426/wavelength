
$(document).ready(function() {
    $("#signup-form").submit(function(){
        $.post('signup', 
        { username: $('#username').val(), password: $('#password').val(), confirmpassword: $('#confirmpassword').val() }, 
        function(data, status){
            if(status === 'success'){
                //const password = pass;
                //const confirmPassword = confirmpass;
                
                //let textContent = $("<div></div>").text(data.message);
                $("#error-message").css("visibility", "visible");
                $("#error-message").text(data.message);
            }
        });
    });
});
/** 
$(document).ready(function() {
    $('#signup-form').submit(function(e) {
      e.preventDefault();

      const username = $('#username').val();
      const password = $('#password').val();
      const confirmPassword = $('#confirmpassword').val();

      $.ajax({
        url: '/signup',
        method: 'POST',
        dataType: 'json',
        data: { username, password, confirmPassword },
        success: function(data) {
          // Handle successful signup
          console.log(data.message);
          // Redirect to login page or show success message
        },
        error: function(err) {
            $('#error-message').css("visibility", "visible");
            $('#error-message').text(err.responseJSON.message);
        }
      });
    });
  });*/

