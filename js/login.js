var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host + "/login",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    }
};

function logIn(){
    settings.data = { email : $('#email').val(),
                      password : $('#password').val()};

    $.ajax(settings).done(function (response) {
        if(document.getElementById("remember-me").checked)
            localStorage.setItem("token",response.token);
        else
            sessionStorage.setItem("token",response.token);

       //window.location.replace("./index.html");
    }).fail(function() { Materialize.toast('Usuario o password incorrectos', 4000); console.log(window.location.href); });
}