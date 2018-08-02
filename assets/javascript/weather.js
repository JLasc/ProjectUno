//open weather api
var APIKey = "166a433c57516f51dfab1f7edaed8413";
// var weatherLocation = "Kittery,Maine";
var userZip = "61568";
var weatherGood;

// Building the URL we need to query the API
var queryURL = `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${userZip}&appid=${APIKey}&cnt=5`;

// AJAX call
$.ajax({
    url: queryURL,
    method: "GET"

}).then(function(response) {

    console.log(queryURL);
    console.log(response);
    getWeatherState(response);       


});

// need definition of "good" weather
var getWeatherState = function(response) {
    
    for (i=0; i <=5; i++) {
        if (response.list[i].temp.day >= 288 &&
            response.list[i].humidity <= 70) {
                weatherGood = true;
                $("#forecast").append(`<img id='day${i}' src='assets/images/30.png'>`)
                    .append(`<p> Day ${i}`);
                console.log("good" + i)
                doStuff(true);
            }

        else {
            weatherGood = false;
            $("#forecast").append(`<img id='day${i}' src='assets/images/1.png'>`)
                    .append(`<p> Day ${i}`);
            console.log("bad" + i)
            doStuff(false);
        }
    }
}

var doStuff = function() {
    console.log("Good weather?: " + weatherGood);
}