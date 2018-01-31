var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/resetPassword?" + collectTokens(),
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    }
};

function collectTokens(){
    var token = window.location.href.split("?");
    return token[token.length-1];
};

function reset(){
    if($('#rePassword').val() == "" || $('#password').val() == ""){
        Materialize.toast('Please enter a password', 4000);
    }
    else if($('#password').val().length < 8){
        Materialize.toast('Password must have eight characters', 4000);
    }
    else if($('#password').val() == $('#rePassword').val()){
        settings.data = { password : $('#password').val() };

        $.ajax(settings).done(function (response) {
            console.log(response);

            Materialize.toast('Password changed', 4000);

            setTimeout(()=>{ window.location.replace("./login.html") }, 4000);
        }).fail(function() { Materialize.toast('Something went wrong :(', 4000); });
    }
    else
    {
        Materialize.toast('Both passwords must coincide', 4000);
    }
}
