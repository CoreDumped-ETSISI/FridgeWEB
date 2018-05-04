var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/login",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    }
};

function logIn(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())) 
    {  
        settings.data = { email : $('#email').val(),
                      password : $('#password').val()};

        $.ajax(settings).done(function (response) {
            if(document.getElementById("remember-me").checked)
                localStorage.setItem("token",response.token);
            else
                sessionStorage.setItem("token",response.token);

           window.setTimeout(window.location.replace("./index.html"), 10);
        }).fail(function (xhr, textStatus, errorThrown) {
            Materialize.toast('Incorrect email or password', 4000); 
        });  
    }
    else{
        Materialize.toast('Please enter a valid email', 4000)
    }
}

$("#password").keyup(function(event) {
	if (event.keyCode === 13) {
        $("#login").click();
    }
});
