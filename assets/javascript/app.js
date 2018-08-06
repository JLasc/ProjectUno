$(document).ready(function () {
  var url = window.location.href;
  var two = url.split("/");
  var three = two[two.length - 1];

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

  var database = firebase.database();
  var auth = firebase.auth();

  var uid = "";

  //firebase user stuff
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
      $('.navAccountButton').html(user.displayName);
      getTasks(user.uid);
    }
    if (user && three == "index.html") {
      window.location.href = "./account.html";
    }
  });

  //meetup api
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cryptic-headland-94862.herokuapp.com/' + options.url;
    }

  });

  var meetupKey = "421f4e447d7a4c403e52346147257a50";
  var userZip = $("#userZip").val();
  var meetupURL = `https://api.meetup.com/find/groups?category=10&sign=true&key=${meetupKey}&zip=${userZip}&radius=1&event`;

  // AJAX call

  $.ajax({
    url: meetupURL,
    method: "GET"

  }).then(function (response) {

    console.log(response[0].name);
    console.log(response[0].description);
    console.log(response[0].city);
    console.log(response[0].next_event);
  })

  $('#signUpButton').on("click", function () {
    var email = $("#signUpEmail").val();
    var password = $("#signUpPassword").val();
    var fullName = $("#first_name").val() + " " + $("#last_name").val();
    var confirm = $("#confirmPassword").val();
    if (password != confirm) {
      M.toast({ html: "Passwords don't match!" });
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: fullName
          })
        })
        .then(() => {
          window.location.href = "./account.html";
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          M.toast({ html: errorMessage });
        });
    }
  });

  $('#loginButton').on("click", function () {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      window.location.href = "./account.html"
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      M.toast({ html: errorMessage });
    });
  })

  $('.navLogoutButton').on("click", function () {
    firebase.auth().signOut().then(function () {
      window.location.href = "./index.html"
    })
  });

  $("#addtask").on("click", function (event) {
    event.preventDefault();
    var title = $("#title").val().trim();
    var date = $("#date").val().trim();
    var time = $("#time").val().trim();
    var tasks = $("#todo").val();
    var local = $("#local").val().trim();
    var details = $("#textarea1").val();

    database.ref("/tasks").push({
      title: title,
      date: date,
      time: time,
      tasks: tasks,
      local: local,
      details: details,
      uid: uid
    });
    $("#title").val("");
    $("#date").val("");
    $("#time").val("");
    $("#todo").val("");
    $("#local").val("");
    $("#textarea1").val("");
  });

  $("#home-btn").on("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  function getTasks(uid) {
    database.ref("/tasks").orderByChild("uid").equalTo(uid).on("value", function (snapshot) {
      $(".collapsible").empty();
      snapshot.forEach(element => {
        var id = element.key;
        $(".collapsible").prepend(
          "<li><div class='collapsible-header'><i class='material-icons'>filter_drama</i>" +
          element.val().title + "<span class='badge' data=" + id + ">X</span></div><div class='collapsible-body'><p>" +
          element.val().details + "</div></li>");
      });
    });
  }
  $(document).on('click', '.badge', function () {
    key = $(this).attr('data')
    database.ref('/tasks').child(key).remove();
  });

  $(document).on('click', '.navAccountButton', function () {
    user = firebase.auth().currentUser;
    var firstName = user.displayName.split(" ")[0];
    var lastName = user.displayName.split(" ")[1];
    var email = user.email;
    $('#change_last_name').val(lastName);
    $('#change_first_name').val(firstName);
    $('#changeEmail').val(email);
  });
});       
