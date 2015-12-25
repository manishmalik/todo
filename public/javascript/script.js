$(document).ready(function(){
		var geocoder = new google.maps.Geocoder();

	            function geocodePosition(pos) {
	              geocoder.geocode({
	                latLng: pos
	            }, function(responses) {
	                if (responses && responses.length > 0) {
	                  console.log(responses[0].formatted_address);
	              } else {
	                  updateMarkerAddress('Cannot determine address at this location.');
	              }
	          });
	          }

	          // function updateMarkerStatus(str) {
	          //     document.getElementById('markerStatus').innerHTML = str;
	          // }

	          // function updateMarkerPosition(latLng) {
	          //     document.getElementById('info').innerHTML = [
	          //     latLng.lat(),
	          //     latLng.lng()
	          //     ].join(', ');
	          // }

	          // function updateMarkerAddress(str) {
	          //     document.getElementById('address').innerHTML = str;
	          // }

	          function initialize() {
	        
	              var latLng = new google.maps.LatLng(28.6100, 77.2300);
	              
	              var map = new google.maps.Map(document.getElementById('map'), {
	                zoom: 12,
	                center: latLng,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
	            });
	              var marker = new google.maps.Marker({
	                position: latLng,
	                title: 'Current',
	                map: map,
	                draggable: true
	            });
	               
	      // // Update current position info.
	      // updateMarkerPosition(latLng);
	            geocodePosition(latLng);
	      
	      // Add dragging event listeners.
	    //   google.maps.event.addListener(marker, 'dragstart', function() {
	    //     updateMarkerAddress('Dragging...');
	    // });
	      
	    //   google.maps.event.addListener(marker, 'drag', function() {
	    //     updateMarkerStatus('Dragging...');
	    //     updateMarkerPosition(marker.getPosition());
	    // });
	      
	      google.maps.event.addListener(marker, 'dragend', function() {
	        console.log('Drag ended');
	        console.log([marker.getPosition().lat(),marker.getPosition().lng()].join(', '));
	        geocodePosition(marker.getPosition());
	    });
	}

	// Onload handler to fire off the app.
	google.maps.event.addDomListener(window, 'load', initialize);
	
	$('*[name=date]').appendDtpicker();

	console.log("Welcome Script!");
});