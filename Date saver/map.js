$(document).ready(function(){

	$('#map').hide();

	$("#download-button").on("click", function(event){
		
		event.preventDefault();

		$('#maps').hide();

		var userInput = $("#location").val().trim();
		console.log("User Input: " + userInput);

		var queryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAJECaqqnTXASdBgV2knhhTF9XVV_DfqYM&q=" + userInput; 
		$('#map').show().attr('src', queryURL);

	})

})