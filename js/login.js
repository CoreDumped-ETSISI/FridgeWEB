(function($){
    $(function(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": config.host + "/login",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "email": "test@test.com",
                "password": "12345678"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response.token);
            localStorage.setItem("token",response.token);
            console.log('Bearer ' + localStorage.getItem("token"));
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space