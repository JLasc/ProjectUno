var APIKey = "166a433c57516f51dfab1f7edaed8413";

// Building the URL we need to query the API
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Eliot,Maine&appid=" + APIKey;

// AJAX call
$.ajax({
    url: queryURL,
    method: "GET"

}).then(function(response) {

    console.log(queryURL);
    console.log(response);

       

});

// need definition of "good" weather