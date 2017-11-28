$(document).ready(function(){

	$('#map').hide();

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

		$('#maps').hide();

		var userInput = $("#location").val().trim();
		console.log("User Input: " + userInput);

		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userInput; 
		$('#map').show().attr('src', queryURL);

	})

})