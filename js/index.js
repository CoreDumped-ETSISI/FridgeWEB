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
    for (var i = 0; i < response.length; i++) {
        $("#products").append('<div class="col s12 m6 xl4" onclick="addToChart(\'' + i + '\')">' +
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
            '</div>');
    }

    productList = JSON.parse(JSON.stringify(response));
});

function addToChart(id) {
    chart.push(productList[id]);
}

function loadChart() {
    $("#chartList").empty();


    for (var i = 0; i < chart.length; i++) {
        $("#chartList").append('<li class="chartElement"><a href="#!" class="valign-wrapper"><img class="responsive-img" src="' + chart[i].image
            + '" style="width: 15%; margin-right: 1em;"><span>' + chart[i].name + '</span><i class="material-icons right" onclick="eraseChartElement(\'' + i + '\')">clear</i></a></li>');
    }
}

function eraseChartElement(index) {
    chart.splice(index, 1);
    loadChart();
}