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

//meetup api
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

var meetupKey = "421f4e447d7a4c403e52346147257a50";
var meetupURL = `https://api.meetup.com/find/groups?category=10&sign=true&key=${meetupKey}&zip=03801&radius=1`;

// AJAX call
$.ajax({
    url: meetupURL,
    method: "GET"

}).then(function(response) {

    console.log(queryURL);
    console.log(response);

});



//firebase user stuff
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email);
    } else {
        console.log("failed");
    }
  });

  $('#signUpButton').on("click",function() {
    var email = $('#signUpEmail').val();
    var password = $('#signUpPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
})

$('#loginButton').on("click",function() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
      });

      $('.addtask').on("submit", function(){
        var title = $('#title').val().trim();
        var date = $('#date').val().trim();
        var time = $('#time').val().trim();
        var tasks = $('#todo').val().trim();
        var local = $('#local').val().trim();
        var details = $('#textarea1').val().trim();
    
        database.ref("/tasks").push({
            title: title,
            date: date,
            time: time,
            tasks: tasks,
            local: local,
            details: details,
            // uid: uid
          });
    
    });
    
    database.ref("/tasks").on("child_added", function(snapshot) {
        $(".collapsible").prepend("<li><div class='collapsible-header'><i class='material-icons'>filter_drama</i>" + snapshot.val().title + "<span class='badge'>X</span></div><div class='collapsible-body'><p>" + snapshot.val().details + "</div></li>"
       
        );
      });







})