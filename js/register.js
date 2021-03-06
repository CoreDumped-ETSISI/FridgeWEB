var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/signUp",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    }
};

function register(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())) 
    {
        if($('#displayName').val() == ""){
            Materialize.toast('Please enter an user name', 4000);
        }
        else if($('#rePassword').val() == "" || $('#password').val() == ""){
            Materialize.toast('Please enter a password', 4000);
        }
        else if($('#password').val().length < 8){
            Materialize.toast('Password must have eight characters', 4000);
        }
        else if($('#password').val() == $('#rePassword').val()){
            settings.data = { email : $('#email').val(),
                              displayName : $('#displayName').val(),
                              password : $('#password').val(),
                              avatarImage : $('#avatar').val()};

            $.ajax(settings).done(function (response) {
                console.log(response);

                Materialize.toast('Register done. Enjoy your meals :3', 4000);

                setTimeout(()=>{ window.location.replace("./login.html") }, 4000);
            }).fail(function (xhr, textStatus, errorThrown) {
                toLogin(xhr.status);
                Materialize.toast('Something went wrong :(', 4000); 
            });
        }
        else
        {
            Materialize.toast('Both passwords must coincide', 4000);
        }
    }
    else{
        Materialize.toast('Please enter a valid email', 4000)
    }
}