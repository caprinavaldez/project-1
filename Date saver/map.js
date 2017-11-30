$(document).ready(function(){

	$("#map").hide();
	$("#jokeSpace").hide();
	$('#jokeButton').hide();
	$('.cardShow').hide();

	$("#download-button").on("click", function(event){

		event.preventDefault();

		$('#picture').hide();
		$('#jokeButton').show();
		$('.cardShow').show();

		var userInput = $("#location").val().trim().toUpperCase();
		console.log("User Input: " + userInput);
		
		//show map
		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userInput; 
		$('#map').show().attr('src', queryURL);

		getFood();

		database.ref().push({
			userInput: userInput,
			dateAdded: firebase.database.ServerValue.TIMESTAMP			
		});
	});

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

	  database.ref().orderByChild('dateAdded').limitToLast(3).on('child_added', function(snapshot) {

	  	var userInput = snapshot.val().userInput;
	  	console.log("Firebase: " + userInput);

	  	$("#firebase").prepend(userInput + " | ");

	  });

	//joke js
	$("#jokeButton").on("click",function(){
		var randomJoke = $(this).data("search");
		console.log(randomJoke);

		var queryURL = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke"
		console.log(queryURL);

		$.ajax({url:queryURL,method:"GET"})
		.done(function(response){
			console.log(response);

			$("#jokeSpace").html("<p>Joke: "+response.setup+"</p>"+"<p>Punchline: "+response.punchline+"</p>");
		});

		$("#jokeSpace").show();
	});

	//restaurants js
	function getFood(){
		
		$('.foodResponse').html("");
		
		var cityName = $('#location').val().trim();
		console.log(cityName);
		
		var apiCall = 'https://developers.zomato.com/api/v2.1/search?entity_id=484&entity_type=city&q=' + cityName+ '&count=4&sort=rating'; 

		$.ajax({
			type: "GET",
			url: apiCall,
			headers: {
				"user-key": "fd9d28b4d8120ec5f127e18a9d9a620e"
			}
		}).done((data) => {
			console.log(data);

	 	foodCallBack(data)
		});

		function foodCallBack(foodData){

			var restaurantList = foodData.restaurants;

			for (i = 0; i < restaurantList.length; i++) {
				var foodRating = foodData.restaurants[i].restaurant.user_rating.aggregate_rating;
				var foodName = foodData.restaurants[i].restaurant.name;
				var foodCost = foodData.restaurants[i].restaurant.average_cost_for_two;
				var foodTopic = foodData.restaurants[i].restaurant.cuisines;
				var foodURL = foodData.restaurants[i].restaurant.url;
				console.log("Rating: " + foodRating);
				console.log("Name: " + foodName);
				console.log("Cost for Two: " + foodCost);
				console.log("Topic: " + foodTopic);
				console.log("URL: " + foodURL);

	    	};

		    $('#foodTitle').append(foodData.restaurants[0].restaurant.name);
		    $('#resLink').attr('href', foodData.restaurants[0].restaurant.url);

		    $('#foodTitle1').append(foodData.restaurants[1].restaurant.name);
		    $('#resLink1').attr('href', foodData.restaurants[1].restaurant.url);

		    $('#foodTitle2').append(foodData.restaurants[2].restaurant.name);
		    $('#resLink2').attr('href', foodData.restaurants[2].restaurant.url);

		    $('#foodTitle3').append(foodData.restaurants[3].restaurant.name);
		    $('#resLink3').attr('href', foodData.restaurants[3].restaurant.url);

		}
	}

})