$(document).ready(function() {
  //open weather api
  var APIKey = "166a433c57516f51dfab1f7edaed8413"; // user-specific API key issued by OpenWeather.org
  var userZip = "03801"; // hardcoded to Portsmouth, NH
  var weatherState; // string variable of possible weather types; can be expanded if desired

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

  // define the weather state
  var getWeatherState = function(response) {
    var weatherDay; // placeholder for weather definition

    for (i = 0; i < response.list.length; i++) {
      if (i == 0) {
        weatherDay = "Today"; // hardcode assignment of 'today' label for first element in response array
      } else {
        weatherDay = getDay(response.list[i].dt); // else get 'day' label from iterating through the if loop below
      }

      if (
        response.list[i].weather[0].id >= 200 && // if id range indicates thunderstorms...
        response.list[i].weather[0].id <= 232
      ) {
        weatherState = "thunderstorms";

        console.log(response.list[i].dt);
        console.log("Weather State: " + weatherState);
        doCase(weatherState, weatherDay); // call switch function, pass state & day label
      } else if (
        response.list[i].weather[0].id >= 300 &&
        response.list[i].weather[0].id <= 531
      ) {
        weatherState = "rain";

        console.log(response.list[i].dt);
        console.log("Weather State: " + weatherState);
        doCase(weatherState, weatherDay);
      } else if (
        response.list[i].weather[0].id >= 801 &&
        response.list[i].weather[0].id <= 804
      ) {
        weatherState = "clouds";

        console.log(response.list[i].dt);
        console.log("Weather State: " + weatherState);
        doCase(weatherState, weatherDay);
      } else if (response.list[i].weather[0].id == 800) {
        weatherState = "clear";

        console.log(response.list[i].dt);
        console.log("Weather State: " + weatherState);
        doCase(weatherState, weatherDay);
      } else {
        weatherState = "error"; // either no error code or code doesn't match ranges specified previously...
        doCase(weatherState, weatherDay);
      }
    }
  };

  var getDay = function(responseDate) {
    // convert UNIX time from response array to new date usable by moment.js
    var currentDate = new Date(responseDate * 1000);
    console.log("Current Date: " + currentDate);

    // get DAY from currentDate
    var currentDay = moment(currentDate).format("dddd");
    console.log("Current Day: " + currentDay);

    return currentDay;
  };

  var doCase = function(weatherState, currentDay) {
    
    switch (weatherState) {
      case "clear":
        $("#forecast").append(
          `<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/32.png'><p>${currentDay}</div>`
        );
        break;

      case "cloudy":
        $("#forecast").append(
          `<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/30.png'><p>${currentDay}</div>`
        );
        break;

      case "rain":
        $("#forecast").append(
          `<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/9.png'><p>${currentDay}</div>`
        );
        break;

      case "thunderstorms":
        $("#forecast").append(
          `<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/0.png'><p>${currentDay}</div>`
        );
        break;

      case "error":
        $("#forecast").append(
          `<div class='weatherToday' id='day${i}'><img id='day${i}' class = 'icons' src='assets/images/44.png'><p>Error!</div>`
        );
    }
  };
});
