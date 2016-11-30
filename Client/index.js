var map;
function updateMap() {
	var lat = parseInt(document.getElementById("Lat").value);
	var long = parseInt(document.getElementById("Long").value);
	if(lat > 80 || lat < -80){
		alert("Invalid input. Please change the value for latitude.");
	}
	else{
		map.setCenter(new google.maps.LatLng(lat,long));
		//map.setZoom(4);
		// There are issues with some value when setting the location.
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
