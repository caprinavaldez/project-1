$(document).ready(function(){

	// $('#map').hide();

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyDZWrLDyGkCd42-ATvbmoSldvqx44YsgnM",
		authDomain: "date-saver.firebaseapp.com",
		databaseURL: "https://date-saver.firebaseio.com",
		projectId: "date-saver",
		storageBucket: "date-saver.appspot.com",
		messagingSenderId: "169298127003"
	};
  
	firebase.initializeApp(config);

	var database = firebase.database();

	$("#download-button").on("click", function(event){
		
		event.preventDefault();

		var userInput = $("#location").val().trim();
		console.log("User Input: " + userInput);

		database.ref().set({
			location: userInput
		});

		location = $("#location").val("");

	})

	database.ref().on("value", function(snapshot) {
		console.log("userInput Database: " + snapshot.val().location);
			
		// $('#maps').hide();
		// $('#map').show();

		var userLocation = $(this);
		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userLocation; 

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);

			var locationMap = $("<iframe>")
				.attr("width='600' height='450'")
				.attr("frameborder='0' style='border:0'")
				.replace("src=" + queryURL);
			
			$('#maps').replaceHTML(locationMap)
		})		
	})

})