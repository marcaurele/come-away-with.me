$('.carousel').carousel({
	interval: 6500
});

$('#article img, .img-colorbox img').each(function(){
	var imgUrl = $(this).attr('src');
	$(this).wrap('<a class="gallery" href="'+imgUrl+'"/>');
});

$('.article-row a.index-thumb, .img-colorbox a.index-thumb').colorbox({
	maxWidth:'100%',
	maxHeight:'100%'
});

$('#article a.gallery, .img-colorbox a.gallery').colorbox({
	rel:'maingallery',
	maxWidth:'100%',
	maxHeight:'100%',
	current:'Image {current} of {total}',
	title: function(){
		var alt = $(this).find('img').attr('alt');
		return alt;
	}
});

// JS for the minicard page
$(document).ready(function(){
	$('#minicardform').each(function(){
		if (document.location.href.indexOf('error') > 0) {
    		$('#minicardformerror').show();
		}
	});
});

// JS for the google maps of the GPS tracker
$(document).ready(function() {

	// Must wait until all scripts are loaded.
	$('#map').each(function(){

		var mapOptions = {
			center: new google.maps.LatLng(46.520024, 6.633588), /* Lausanne */
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.TERRAIN,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: true
			}
		};

		// Generate map point for the last one
		if (typeof spot_message != 'undefined') {
			latitude = spot_message.response.feedMessageResponse.messages.message.latitude;
			longitude = spot_message.response.feedMessageResponse.messages.message.longitude;
			unixTime = spot_message.response.feedMessageResponse.messages.message.unixTime;
			
			mapPoint = new google.maps.LatLng(latitude, longitude);
			mapOptions.center = mapPoint;

			var d = new Date(parseInt(unixTime) * 1000);
			var contentPopup = "<h5 style='width:300px'><i class='icon-bullhorn'></i> Our last position / Notre derni&egrave;re position</h5><p class='text-info'><i class='icon-time'></i> " + d.toLocaleString() + "</p>";
			var infowindow = new google.maps.InfoWindow({
				content: contentPopup
			});
			
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			var marker = new google.maps.Marker({
				position: mapPoint,
				map: map
			});
			
			infowindow.open(map,marker);
			/*
			// Generate the route for the last X points
			var trailCoordinates = [
			new google.maps.LatLng(-33.82056,-58.87893),
			new google.maps.LatLng(-33.92532,-58.91833),
			new google.maps.LatLng(-34.04311,-58.98566),
			new google.maps.LatLng(-34.12460,-59.02380),
			new google.maps.LatLng(-34.18202,-58.95325),
			new google.maps.LatLng(-34.42156,-58.71933),
			new google.maps.LatLng(-34.47821,-58.65273),
			new google.maps.LatLng(-34.52336,-58.51111),
			new google.maps.LatLng(-34.65430,-58.34842),
			new google.maps.LatLng(latitude,longitude)
			];
			var trailLine = new google.maps.Polyline({
				path: trailCoordinates,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			trailLine.setMap(map);*/
			
		} else if (typeof spot_message_list != 'undefined') {

			latest_point = {};
			latest_point.latitude = spot_message_list[0].fields.latitude;
			latest_point.longitude = spot_message_list[0].fields.longitude;
			latest_point.unixTime = spot_message_list[0].fields.unix_time;
			
			mapPoint = new google.maps.LatLng(latest_point.latitude, latest_point.longitude);
			mapOptions.center = mapPoint;

			var d = new Date(parseInt(latest_point.unixTime) * 1000);
			var contentPopup = "<h5 style='width:300px'><i class='icon-bullhorn'></i> Our last position / Notre derni&egrave;re position</h5><p class='text-info'><i class='icon-time'></i> " + d.toLocaleString() + "</p>";
			var infowindow = new google.maps.InfoWindow({
				content: contentPopup
			});
			
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			var marker = new google.maps.Marker({
				position: mapPoint,
				map: map
			});
			
			infowindow.open(map,marker);

			// Create the path of the latest points, to be improved with different colors
			var trailCoordinates = [];
			for(i=0;i<spot_message_list.length;i++) {
				trailCoordinates[i] = new google.maps.LatLng(spot_message_list[i].fields.latitude,spot_message_list[i].fields.longitude);
			}
			var trailLine = new google.maps.Polyline({
				path: trailCoordinates,
				strokeColor: "#FF0000",
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			trailLine.setMap(map);
			
		} else {
			// Set default location otherwise
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		}
		
	});
});