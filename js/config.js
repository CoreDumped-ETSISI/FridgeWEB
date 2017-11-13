
var config = {
    "host": function () {
    			if(window.location.href.indexOf( "http://fridgeweb.coredumped.es" ) > -1)
    				return "http://api.coredumped.es";
    			else
    				return "http://192.168.0.24:3000";
			}
};

var URL = {
	"server":"./"
};