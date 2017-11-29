$(document).ready(function(){

//map js
	$('#map').hide();
	$("#jokeSpace").hide();
	$('#jokeButton').hide();

	$("#download-button").on("click", function(event){
		
		event.preventDefault();

		$('#maps').hide();
		$('#jokeButton').show();


		var userInput = $("#location").val().trim();
		console.log("User Input: " + userInput);

		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userInput; 
		$('#map').show().attr('src', queryURL);

		getFood();

	})

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
		})

		$("#jokeSpace").show();
	})

//food js
    function getFood(){
        $('.foodResponse').html("");
        var cityName = $('#download-button').val();
        console.log(cityName);
        var apiCall = 'https://developers.zomato.com/api/v2.1/search?entity_id=484&entity_type=city&q=' + cityName+ '&count=5&sort=rating' 
        
   $.ajax({
      type: "GET",
      url: apiCall,
      headers: {
        "user-key": "fd9d28b4d8120ec5f127e18a9d9a620e"
      }
    }).done((data) => {
      console.log(data);
 //     $('#toms').append.(data)
 		foodCallBack(data)
    })

    function foodCallBack(foodData){

	var restaurantList = foodData.restaurants;
    
    for (i = 0; i < restaurantList.length; i++) {
    	var foodRating = foodData.restaurants[i].restaurant.user_rating.aggregate_rating;
        var foodName = foodData.restaurants[i].restaurant.name;
        var foodCost = foodData.restaurants[i].restaurant.average_cost_for_two;
        var foodTopic = foodData.restaurants[i].restaurant.cuisines;
        console.log("Rating: " + foodRating);
        console.log("Name: " + foodName);
        console.log("Cost for Two: " + foodCost);
        console.log("Topic: " + foodTopic);

        $('.foodResponse').append("<div>" + "Restaurant: " + foodName + ' Rating: ' + foodRating + " Cost for Two: " + foodCost + " Topic: " + foodTopic);
    	
    	}    
    }

    // foodCallBack();
    }

})