var xhr = new XMLHttpRequest();
var map;
var colors = {1: "#A93226", 2:"#2980B9", 3:"#1ABC9C", 4:"#117A65", 5:"#884EA0",6:"#52BE80",7:"#EB984E",8:"#2E4053"};
function updateMap() {
   //map.setMapOnAll(null);
	var lat = parseInt(document.getElementById("Lat").value);
	var long = parseInt(document.getElementById("Long").value);
	if(isNaN(lat) || isNaN(long)){
		alert("Invalid input. Please change the input values.");
	}
	else{
		if(lat > 80 || lat < -80){
			alert("Invalid input. Please change the value for latitude.");
		}
		else{
			map.setCenter(new google.maps.LatLng(lat,long));
			var southwest = new google.maps.LatLng(lat-10,long-10);
			var northeast = new google.maps.LatLng(lat+10,long+10);
			var bounds = new google.maps.LatLngBounds(southwest,northeast);
			map.fitBounds(bounds);
			var storms = getStormsByYear(lat,long);
		}
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

function getStormsByYear(lat,long){
	var year = document.getElementById("Year").value;
	if(parseInt(year) < 1945 || parseInt(year) > 2015){
		alert("The year is invalid. Please enter another year.");
	}
	else{
		if(isNaN(parseInt(year))){
			alert("The year is invalid. Please enter another year");
		}
		else{
			year = year.replace(/\s+/g, '');
			//var request = "https://typhoon.herokuapp.com/proxy/get/location/";
			var request = "http://127.0.0.1:5000/get/location/";
			request += "lowLat" + "/" + (lat-10).toString() + "/";
			request += "HighLat" + "/" + (lat+10).toString() + "/";
			request += "lowLong" + "/" + (long-10).toString() + "/";
			request += "highLong" + "/" + (long+10).toString() + "/";
			request += "year" + "/" + year;
			xhr.open('GET', request, true);
			xhr.send();
		}
	}
}
xhr.onreadystatechange = function() {
    var results = [];
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var data = xhr.responseText;
	}
	if(data){
		data = data.split("],[");
	//results.push(JSON.parse(data[0]));
		for(i = 0;i < data.length; i++ ){
       		data[i] = data[i].replace('[','');
       		data[i] = data[i].replace('[','');
       		data[i] = data[i].replace(']','');
       		data[i] = data[i].replace(']','');
			results.push(JSON.parse(data[i]));
		}
	}
//	results.push(JSON.parse(data[data.length - 1]));
	for(i = 0; i < results.length;i++){
      console.log(results[i].LonEW / 10);
      drawPoint(results[i].LatNS / 10, results[i].LonEW / 10, results[i].STORMNAME, results[i].YYYYMMDDHH);

	}
}

function drawPoint(startLat,startLong, name, startDate){
   var information = 'startDate:' + startDate;
   var startLatLng = new google.maps.LatLng(startLat,startLong);
   var marker = new google.maps.Marker({
      position: startLatLng,
      map: map,
      label: name

   });
   var infoWindow = new google.maps.InfoWindow({
   content: information
});
   marker.addListener('click', function(){
      infoWindow.open(map,marker);

   });

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
