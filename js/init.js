(function($){
  $(function(){

    $('.button-collapse').sideNav();

    var list = [];

    var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "http://api.coredumped.es/availableProductList",
	  "method": "GET",
	  "headers": {}
	}

	$.ajax(settings).done(function (response) {
	  	for (var i = 0; i < response.length ; i++) {
    		$("#products").append(	'<div class="col s12 m6 xl4">' +
						          		'<div class="row" style="padding: 0.5em 0.5em 0em 0.5em">' +
							          		'<div class="card-panel" style="display: inline-block">' +
								            	'<div class="col s4" style="background-color: blue">' +
									              '<br>' +
									              '<img class="responsive-img" src="' + response[i].image + '">' +
									            '</div>' +
									            '<div class="col s8">' +
									              '<p style="text-align: center; font-size: 0.9em">' + response[i].name + '</p>' +
									              '<p style="text-align: left; font-size: 1.2em; margin-left: 1em">' + response[i].price + ' €</p>' +
									            '</div>' +
								        	'</div>' +
						        	  	'</div>' +
						        	'</div>')
    	}

    	console.log(response);

	});
  }); // end of document ready
})(jQuery); // end of jQuery name space