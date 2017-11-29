$(document).ready(function(){

//map js
	$('#map').hide();
	$("#jokeSpace").hide();
	$('#jokeButton').hide();

	$("#download-button").on("click", function(event){
		
		event.preventDefault();

		$('#maps').hide();
		$("#jokeSpace").show();
		$('#jokeButton').show();


		var userInput = $("#location").val().trim();
		console.log("User Input: " + userInput);

		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userInput; 
		$('#map').show().attr('src', queryURL);

	})

//joke js
	$("button").on("click",function(){
		var randomJoke = $(this).data("search");

		console.log(randomJoke);

		var queryURL = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke"
		console.log(queryURL);

		$.ajax({url:queryURL,method:"GET"})
			.done(function(response){
				console.log(response);

				$("#jokeSpace").html("<p>Joke: "+response.setup+"</p>"+"<p>Punchline: "+response.punchline+"</p>");
		})
	})

})