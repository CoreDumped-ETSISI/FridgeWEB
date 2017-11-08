
var config = {
    "host": function () {
    			if(window.location.href == "http://fridgeweb.coredumped.es/login.html")
    				return "http://api.coredumped.es";
    			else
    				return "http://192.168.0.24:3000";
			}
    //"host":"http://api.coredumped.es"
    };

var URL = {
	"server":"./"
};