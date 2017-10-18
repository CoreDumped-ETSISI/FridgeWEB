var settings = {
    "async": true,
    "crossDomain": true,
    "url": config.host + "/availableProductList",
    "method": "GET",
    "headers": {}
};

var chart = [];
var productList;


$.ajax(settings).done(function (response) {
  	for (var i = 0; i < response.length ; i++) {
   		$("#products").append(	'<div class="col s12 m6 xl4" onclick="addToChart(\'' + i + '\')">' +
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

   	loadChart();
});

function addToChart(id){
	$("#empty").empty();

	chart.push(productList[id]);
	createChartElement(productList[id], (chart.length-1));
	
	reloadChartCost();
}

function loadChart() {
    $("#chartList").empty();

	if(chart.length == 0){
		listIsEmpty();
	}
	else {
		for (var i = 0; i < chart.length; i++) {
			createChartElement(chart[i], i);
		}
	}

	reloadChartCost();
}

function eraseChartElement(index){
	chart.splice(index,1);
	loadChart();
}

function createChartElement(product, i){
	$("#chartList").append('<li class="chartElement valign-wrapper"><img class="responsive-img" src="' + product.image 
		+ '" style="width: 15%; margin-left: 5%; object-fit: contain;"><span style="width: 65%; padding-left: 1em;">' + product.name 
		+ '</span><i class="material-icons" onclick="eraseChartElement(\'' + i 
		+ '\')" style="cursor: pointer;">clear</i></li>');
}

function reloadChartCost(){
	var total = 0;

	$("#total").empty();

	for (var i = 0; i < chart.length ; i++) {
		total += chart[i].price;
	}

	$("#total").append((Math.round(total*100)/100) + ' €');
}

function listIsEmpty(){
	$("#chartList").append('<span id="empty" style="width: 100%; text-align: center;">No hay elementos en el carrito T-T</span>');
}