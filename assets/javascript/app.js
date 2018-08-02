
$(document).ready(function () {

    var url = window.location.href;
    var two = url.split('/');
    var three = two[two.length - 1]

    //firebase user stuff
    firebase.auth().onAuthStateChanged(function (user) {
        if (user && three == "index.html") {
            window.location.href = './account.html';
        } 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZUrHNo6XXPn1AGm4JT-2w9I9mGANvIO4",
    authDomain: "projectuno-1532993271750.firebaseapp.com",
    databaseURL: "https://projectuno-1532993271750.firebaseio.com",
    projectId: "projectuno-1532993271750",
    storageBucket: "projectuno-1532993271750.appspot.com",
    messagingSenderId: "1055512071549"
  };
  firebase.initializeApp(config);


//open weather api
var APIKey = "166a433c57516f51dfab1f7edaed8413";
var weatherLocation = "Kittery,Maine"
var weatherGood;

// Building the URL we need to query the API
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&appid=${APIKey}`;

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
    if (response.main.temp >= 288 &&
        response.main.humidity <= 70) {
            weatherGood = true;
            doStuff(true);
        }

    else {
        weatherGood = false;
        doStuff(false);
    }
}

var doStuff = function() {
    console.log("Good weather?: " + weatherGood);
}

//meetup api
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


var meetupKey = "421f4e447d7a4c403e52346147257a50";
var userZip = $("#userZip").val();
var meetupURL = `https://api.meetup.com/find/groups?category=10&sign=true&key=${meetupKey}&zip=${userZip}&radius=1&event`;

// AJAX call

$.ajax({
    url: meetupURL,
    method: "GET"

}).then(function(response) {

    console.log(queryURL);
    console.log(response[0].name);
    console.log(response[0].description);
    console.log(response[0].city);
    console.log(response[0].next_event);
})

  $('#signUpButton').on("click",function() {
    var email = $('#signUpEmail').val();
    var password = $('#signUpPassword').val();

    var fullName = $('#first_name').val() + " " + $('#last_name').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
        user.updateProfile({
            displayName: fullName
        })
    }).then(()=>{
            window.location.href = "./account.html";
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

    });

    $('#signUpButton').on("click", function () {
        var email = $('#signUpEmail').val();
        var password = $('#signUpPassword').val();
        var fullName = $('#first_name').val() + " " + $('#last_name').val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({
                    displayName: fullName
                })
            }).then(() => {
                window.location.href = "./account.html";
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    })

    $('#loginButton').on("click", function () {
        var email = $('#email').val();
        var password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
            window.location.href = "./account"
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    })

    $('#navLogoutButton').on("click", function () {
        firebase.auth().signOut().then(function() {
            window.location.href = "./index.html";
          }, function(error) {
            // An error happened.
          });
    })
})