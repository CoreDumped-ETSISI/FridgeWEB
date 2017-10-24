var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host + "/availableProductList",
    "method": "GET",
    "headers": {}
};

var cart = [];
var productList;


$.ajax(settings).done(function (response) {
	$("#products").empty();
	
  	for (var i = 0; i < response.length ; i++) {
   		$("#products").append(	'<div class="col s12 m6 xl4" onclick="addToCart(\'' + i + '\')">' +
					          		'<div class="row" style="padding: 0.5em 0.5em 0em 0.5em; margin: 0px;">' +
						          		'<div class="card-panel waves-effect waves-green" style="display: inline-block; margin: 0px; width: 100%;">' +
							            	'<div class="col s4">' +
								              '<br>' +
								              '<img class="responsive-img" src="' + response[i].image + '">' +
								            '</div>' +
								            '<div class="col s8">' +
								              '<p style="text-align: center; font-size: 0.9em">' + response[i].name + '</p>' +
								              '<p style="text-align: left; font-size: 1.2em; margin-left: 1em">' + response[i].price + ' €</p>' +
								            '</div>' +
							        	'</div>' +
					        	  	'</div>' +
					        	'</div>');
   	}

   	productList = JSON.parse(JSON.stringify(response));

   	loadCart();
});

function addToCart(id){
	$("#empty").empty();

	cart.push(productList[id]);
	createCartElement(productList[id], (cart.length-1));
	
	reloadCartCost();
}

function loadCart() {
    $("#cartList").empty();

	if(cart.length == 0){
		listIsEmpty();
	}
	else {
		for (var i = 0; i < cart.length; i++) {
			createCartElement(cart[i], i);
		}
	}

	reloadCartCost();
}

function eraseCartElement(index){
	cart.splice(index,1);
	loadCart();
}

function createCartElement(product, i){
	$("#cartList").append('<li class="cartElement valign-wrapper"><img class="responsive-img" src="' + product.image 
		+ '" style="width: 15%; margin-left: 5%; object-fit: contain;"><span style="width: 65%; padding-left: 1em;">' + product.name 
		+ '</span><i class="material-icons" onclick="eraseCartElement(\'' + i 
		+ '\')" style="cursor: pointer;">clear</i></li>');
}

function reloadCartCost(){
	var total = 0;

	$("#total").empty();

	for (var i = 0; i < cart.length ; i++) {
		total += cart[i].price;
	}

	$("#total").append((Math.round(total*100)/100) + ' €');
}

function listIsEmpty(){
	$("#cartList").append('<span id="empty" style="width: 100%; text-align: center;">No hay elementos en el carrito T-T</span>');
}