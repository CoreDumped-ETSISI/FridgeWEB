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
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())) 
    {  
        settings.data = { email : $('#email').val(),
                      password : $('#password').val()};

        $.ajax(settings).done(function (response) {
            if(document.getElementById("remember-me").checked)
                localStorage.setItem("token",response.token);
            else
                sessionStorage.setItem("token",response.token);

           window.setTimeout(window.location.replace("./index.html"), 1000);
        }).fail(function() { Materialize.toast('Usuario o password incorrectos', 4000); });  
    }
    else{
        Materialize.toast('La dirección de email no es válido', 4000)
    }
}