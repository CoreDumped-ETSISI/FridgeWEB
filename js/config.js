
var config = {
    "host": function () {
    			if(window.location.href.indexOf( "http://192.168.0.24:3000" ) > -1)
    				return "http://192.168.0.24:3000";
    			else
    				return "http://api.coredumped.es";
			}
    };

var URL = {
	"server":"./"
};