//open weather api
var APIKey = "166a433c57516f51dfab1f7edaed8413";

var userZip = "03903";
var weatherGood;

// need on-click function for passing zip code --> userZip

// Building the URL we need to query the OpenWeather API
var weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${userZip}&appid=${APIKey}&cnt=5`;

// AJAX call
$.ajax({
    url: weatherURL,
    method: "GET"

}).then(function(response) {

    console.log(weatherURL);
    console.log(response);
    getWeatherState(response);       


});

// need definition of "good" weather
var getWeatherState = function(response) {
    
    for (i=0; i < response.list.length; i++) {
        //convert UNIX time from response array to new date usable by moment.js
        var currentDate = new Date(response.list[i].dt * 1000);
        console.log("Current Date: " + currentDate);

        // get DAY from currentDate
        var currentDay = moment(currentDate).format("dddd");
        console.log("Current Day: " + currentDay);

        if (response.list[i].temp.day >= 288 &&
            response.list[i].humidity <= 70) {
                weatherGood = true;
                console.log(i);
                console.log(response.list[i].dt);
                console.log(currentDay);
                $("#forecast").append(`<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/30.png'><p>${currentDay}</div>`);
                    // .append(``);
                console.log("good" + i)
                doStuff(true);
            }

        else {
            weatherGood = false;            
            $("#forecast").append(`<div class='weatherToday'><img id='day${i}' class = 'icons' src='assets/images/1.png'><p>${currentDay}</div>`);
                    
            console.log(i);
            console.log(response.list[i].dt);
            console.log(currentDay);
            console.log("bad" + i);
            doStuff(false);
        }
    }
}

var doStuff = function() {
    console.log("Good weather?: " + weatherGood);
}