$(document).ready(function(){
		var geocoder = new google.maps.Geocoder();
		var location;

		currentPos={
    		latitude:'28.6100',
    		longitude:'77.2300'
		};

		if (navigator.geolocation){
  			navigator.geolocation.getCurrentPosition(showPosition);
		}
		function showPosition(position){ 
    		currentPos.latitude=position.coords.latitude;
    		currentPos.longitude=position.coords.longitude;
	    }
	    function geocodePosition(pos) {
	    	geocoder.geocode({
	            latLng: pos
	        }, function(responses) {
	            if (responses && responses.length > 0) {
	                location = responses[0].formatted_address;
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
	        
	        var latLng = new google.maps.LatLng(currentPos.latitude, currentPos.longitude);
	              
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
	        // console.log('Drag ended');
	        // console.log([marker.getPosition().lat(),marker.getPosition().lng()].join(', '));
	        geocodePosition(marker.getPosition());
	      });
	}

	// Onload handler to fire off the app.
	google.maps.event.addDomListener(window, 'load', initialize);
	
	$('*[name=date]').appendDtpicker({"dateFormat": "YYYY-MM-DD hh:mm"});

	$('#submit').on('click',function(){
		if($('#input-task').val().length===0){
			$('#input-task').css({ "border": '#FF0000 1px solid'});
			console.log("error");
			return;
		}
		// console.log("Task : ",$('#input-task').val());
		// console.log(location);
		// console.log("Date: ",moment($('#input-targetDate').val())._d);
		$.ajax({
				type: 'POST',
				url: '/add',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('task', $('#input-task').val());
					xhr.setRequestHeader('targetdate', $('#input-targetDate').val());
					xhr.setRequestHeader('location', location);
				},
				error: function() {
					console.log('Cannot add to the to-do db');
				},
				success: function(data) {
					console.log('Added successfully',data);
					$('#input-task').val('');
				}
		});
	});
	$('#update').on('click',function(){
		var selected = [];
		$('#checkbox-todo input:checked').each(function() {
    		selected.push($(this).attr('value'));
    		$('#'+$(this).attr('value')).remove();
		});
		console.log(selected);
		$.ajax({
				data: {data: selected},
				type: 'POST',
				url: '/delete',
				error: function() {
					console.log('Cannot delete to the to-do db');
				},
				success: function(data) {
					console.log('Deleted successfully',data);
				}
		});
	});
});