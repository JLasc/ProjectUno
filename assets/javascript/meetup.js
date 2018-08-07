$("#clearBtn").on("click", function() {

    $("#search-results").empty() 
});

function formClear () {
    $("#searchInput").val("");
    $("#zipInput").val("");
}

$("#meetupBtn").on("click", function() {
    event.preventDefault();
    
//meetup api
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cryptic-headland-94862.herokuapp.com/' + options.url;
    }
});

var meetupKey = "421f4e447d7a4c403e52346147257a50";
var searchInput = $("#searchInput").val().trim();
var zipInput = $("#zipInput").val().trim();
var radiusInput = $("#userRadius").val().trim();

var meetupURL = `https://api.meetup.com/find/groups?sign=true&key=${meetupKey}&zip${zipInput}&upcoming_events=true&page=20&text=${searchInput}&radius=${radiusInput}`;



$.ajax({
    url: meetupURL,
    method: "GET"

}).then(function(response) {
    console.log(response)

    $("#search-results").empty()

    for (var i = 0; i < response.length; i++){

        contentCard = 
        `   <div class="col s12 m7">
            <h4 class="header">${response[i].name}</h4>
            <div class="card horizontal">
            <div class="card-image">
                <img src="${response[i].meta_category.photo.highres_link}">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                </b><span class="badge blue"> <b>Members: </b>${response[i].members}</span><br>
                <b>Created: </b>${moment(response[i].created).format('MMMM Do YYYY, h:mm:ss a')}<br>
                <b>Status: </b>${response[i].status}<br>
                <b>Location: </b>${response[i].localized_location}<br>
                <b>Next Event: </b>${moment(response[i].next_event.time).format('MMMM Do YYYY, h:mm:ss a')}<br>
                <div class="card-action">
                <a href="${response[i].link}" target="_blank">Join this event</a>
                <a href="#" id="meetup-task">Create Task</a>
                </div>
            </div>
            </div>
            </div>
        `
        $("#search-results").append(contentCard)
    

    
    };
});

$(document).on("click","#meetup-task", function(){
    $("#title").attr("value", "Meetup Event")
    $("#title-to-do").addClass("active")
});


formClear()




});

