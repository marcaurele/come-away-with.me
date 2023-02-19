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


		var map = L.map('map_canvas').setView([46.520024, 6.633588], 2);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
		if (typeof spot_message_list != 'undefined') {

			latest_point = {};
			latest_point.latitude = spot_message_list[0].fields.latitude;
			latest_point.longitude = spot_message_list[0].fields.longitude;
			latest_point.unixTime = spot_message_list[0].fields.unix_time;
			
			var marker = L.marker([latest_point.latitude, latest_point.longitude]).addTo(map);

			var d = new Date(parseInt(latest_point.unixTime) * 1000);
			var contentPopup = "<h5 style='width:300px'><i class='icon-bullhorn'></i> Our last position / Notre derni&egrave;re position</h5><p class='text-info'><i class='icon-time'></i> " + d.toLocaleString() + "</p>";
			marker.bindPopup(contentPopup).openPopup();

			// Create the path of the latest points, to be improved with different colors
			var trailCoordinates = [];
			for(i=0;i<spot_message_list.length;i++) {
				trailCoordinates.push([spot_message_list[i].fields.latitude,spot_message_list[i].fields.longitude]);
			}
			var polyline = L.polyline(trailCoordinates, {color: 'red'});
			polyline.addTo(map);
		}
		
	});
});