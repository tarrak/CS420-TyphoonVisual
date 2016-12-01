var squel = require("squel");
var mysql = require("mysql");
var con = mysql.createConnection({
	host: "146.148.34.167",
	user: "root",
	password: ""
});
var map;
var colors = {1: "#A93226", 2:"#2980B9", 3:"#1ABC9C", 4:"#117A65", 5:"#884EA0",6:"#52BE80",7:"#EB984E",8:"#2E4053"};
function updateMap() {
	var lat = parseInt(document.getElementById("Lat").value);
	var long = parseInt(document.getElementById("Long").value);
	if(lat > 80 || lat < -80){
		alert("Invalid input. Please change the value for latitude.");
	}
	else{
		map.setCenter(new google.maps.LatLng(lat,long));
		var southwest = new google.maps.LatLng(lat-10,long-10);
		var northeast = new google.maps.LatLng(lat+10,long+10);
		var bounds = new google.maps.LatLngBounds(southwest,northeast);
		map.fitBounds(bounds);
	}
}

function typhoonMap() {
  var mapCanvas = document.getElementById("googleMap");
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: 1
  }
  map = new google.maps.Map(mapCanvas, mapOptions);
  var lat = 0;
  var long = 0;
}

function getStormsByYear(){
	var year = document.getElementById("Year").value;
	year = year.replace(/\s+/g, '');
	var s = squel.select();

	if(year.toLowerCase() == "all"){

	}
	else{

	}
}

function drawPath(coordinates, stormName, startDate, endDate){
	var information = 'startDate: ' + startDate + 'endDate:' + endDate;
	var typhoonColor = math.floor(math.random() * 8) + 1;
	var LatLng = {lat: coordinates[0].lat, long: coordinates[0].long};
	var marker = new google.maps.Marker({
		postion: LatLng,
		map: map,
		label: stormName
	});
	var infoWindow = new google.maps.InfoWindow({
		content: information
	});
	marker.addListener('click', function(){
		infowindow.open(map,marker);
	});
	var typhoonPath = new google.maps.Polyline({
		path: coordinates,
		geodesic: true,
		strokeColor: colors.typhoonColor,
		strokeOpacity: .5,
		strokeWeight: 2
	});
	var image = 'https://www.iconexperience.com/_img/i_collection_png/512x512/plain/signal_flag_checkered.png';
	var finishMarker = new google.maps.Marker({
		position: {lat: coordinates[coordinates.length - 1].lat, long: coordinates[coordinates.length - 1].long},
		map: map,
		icon: image
	});
	typhoonPath.setMap(map);
}
