
var config = {
    "host": function () {
    			if(window.location.href.indexOf( "http://192.168.0.24" ) > -1 || window.location.href.indexOf( "file" ) > -1)
    				return "http://192.168.0.24:3000";
    			else
    				return "http://api.coredumped.es";
			}
};

var URL = {
	"server":"./"
};