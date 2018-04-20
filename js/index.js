var cart = [];

var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/product/inStock",
    "method": "GET",
    "headers": {}
};

var userData = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/user",
    "method": "GET",
    "headers": {Authorization : 'Bearer ' + getToken()}
};

function getToken(){
	if(localStorage.getItem('token'))
		return localStorage.getItem('token')
	else
		return sessionStorage.getItem('token')
}

var purchaseSettings = {
    "async": true,
    "crossDomain": true,
    "url": config.host() + "/purchase/save",
    "method": "POST",
    "headers": {Authorization : 'Bearer ' + getToken()},
    "data" : {}
};

var user;
var total = 0;

function redirectTo(cad){
	window.location.replace(cad);
}

function checkToken(){
	if(!getToken())
		redirectTo(URL.server + "login.html");
}

function getProfile(){
	$.ajax(userData).done(function (data, statustext, xhr) {
		if(xhr == 401)
		{
			setTimeout(()=>{ redirectTo(URL.server + "login.html"); }, 4000);
		}
		user = data;

		loadProfileData();
	}).fail(function () {
			Materialize.toast('Algo ha ido mal. Intentelo de nuevo', 4000, 'red');
	});
}

function getUser(){
	$.ajax(userData).done(function (data, statustext, xhr) {
		user = data;

		updateBalance();
	}).fail(function () {
			Materialize.toast('Algo ha ido mal. Intentelo de nuevo', 4000, 'red');
	});
}

function loadProfileData(){
	cleanAndAppend("#photo", '<img class="responsive-img circle" src="' + user.avatarImage + '">');
	cleanAndAppend(".name", user.displayName);
	cleanAndAppend(".email", user.email)
}

function cleanAndAppend(where, what){
	$(where).empty();
	$(where).append(what);
}

var productList;

function updateBalance(){
	cleanAndAppend("#saldo", (Math.round(user.balance*100)/100) + ' €');
}

function purchase(){
	if((Math.round(total*100)/100) > (Math.round(user.balance*100)/100)){
		Materialize.toast('No tienes saldo suficiente para efectuar la compra', 4000, 'orange');
	}
	else if(cart.length > 0){
		var itemChain = "";

		for(var i = 0; i < cart.length-1; i++)
			itemChain = itemChain + cart[i]._id + ",";

		itemChain = itemChain + cart[cart.length-1]._id;

		purchaseSettings.data = { productList : itemChain};

		$.ajax(purchaseSettings).done(function (data, statustext, xhr) {
			if(xhr.status == 200)
			{
				Materialize.toast('Su compra se ha realizado correctamente', 4000, 'green');
				eraseCart();
				refreshProductList();
				updateBalance();
			}
			else
			{
				Materialize.toast('Algo ha ido mal. Intentelo de nuevo', 4000, 'red');
			}
		}).fail(function () {
			Materialize.toast('Algo ha ido mal. Intentelo de nuevo', 4000, 'red');
		});
	}
}

function refreshFridge(){
	$("#products").empty();

	var funcion;
	
  	for (var i = 0; i < productList.length ; i++) {
  		if(productList[i].stock > 0)
   			funcion = ' onclick="addToCart(\'' + i + '\')"';
   		else 
   			funcion = "";

   		$("#products").append(	'<div class="col s12 m6 xl4"' + funcion + '><div class="row linea-producto">' +
						          		'<div class="card-panel waves-effect waves-green panel-producto">' +
							            	'<div class="col s4" style="padding: 0em 0em 1em 1em;">' +
								              '<br/>' +
								              '<img class="responsive-img imagen-producto" src="' + productList[i].image + '">' +
								            '</div>' +
								            '<div class="col s8">' +
								              '<div class="titulo-producto">' + productList[i].name + '</div>' +
								              '<div class="precio-producto" >' + productList[i].price + 
								              	' €</div>' +
								              '<div class="stock-producto">Stock: ' + productList[i].stock + '</div>' +
								            '</div>' +
							        	'</div>' +
					        	  	'</div>' +
					        	'</div>');
   	}
}

refreshProductList();
getProfile();

function refreshProductList() {
	$.ajax(settings).done(function (data, statustext, xhr) {
		if(xhr == 401)
		{
			redirectTo(URL.server + "login.html");
		}
		getUser();

	   	productList = JSON.parse(JSON.stringify(data));

	   	refreshFridge();

	   	loadCart();
	}).fail(function () {
			Materialize.toast('Algo ha ido mal. Intentelo de nuevo', 4000, 'red');
	});
}

function addToCart(id){
	$("#empty").empty();

	productList[id].stock--;

	cart.push(productList[id]);	
	createCartElement(productList[id], (cart.length-1));
	
	reloadCartCost();
	refreshFridge();
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
	var sentinel = false;
	var i = 0;

	while( i < productList.length && !sentinel ){
		if(productList[i]._id == cart[index]._id){
			sentinel = true;

			cart.splice(index,1);

			productList[i].stock++;
		}

		i++;
	}

	refreshFridge();
	loadCart();
}

function createCartElement(product, i){
	$("#cartList").append('<li class="cartElement valign-wrapper"><img class="responsive-img" src="' + product.image 
		+ '" style="width: 15%; margin-left: 5%; object-fit: contain;"><span style="width: 65%; padding-left: 1em;">' + product.name 
		+ '</span><i class="material-icons" onclick="eraseCartElement(\'' + i + '\')" style="cursor: pointer;">clear</i></li>');
}

function reloadCartCost(){
	total = 0;

	$("#total").empty();

	for (var i = 0; i < cart.length ; i++) {
		total += cart[i].price;
	}

	$("#total").append((Math.round(total*100)/100) + ' €');
}

function listIsEmpty(){
	$("#cartList").append('<span id="empty" style="width: 100%; color:#aaa;">No hay productos en el carrito :(</span>');
}

function eraseCart(){
	while(cart.length > 0)
		eraseCartElement(0);
}

function deleteCredentials(){
	localStorage.clear();
	sessionStorage.clear();
	redirectTo(URL.server + "login.html");
}
