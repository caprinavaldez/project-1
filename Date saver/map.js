$(document).ready(function(){
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

	$("#download-button").on('click', function(event){
		event.preventDefault();

		var userInput = $("#last_name").val().trim();
		console.log(userInput);

		database.ref().push({
			location: userInput
		});

		location = $("#last_name").val("");

	})
})