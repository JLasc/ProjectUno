// AJAX call

//meetup api

$("#meetupBtn").on("click", function() {
    event.preventDefault();

//meetup api
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

var meetupKey = "421f4e447d7a4c403e52346147257a50";
var searchInput = $("#searchInput").val().trim();
var zipInput = $("#zipInput").val().trim();
var meetupURL = `https://api.meetup.com/find/groups?sign=true&key=${meetupKey}&zip=${zipInput}&page=6&text=${searchInput}&radius=5`;


$.ajax({
    url: meetupURL,
    method: "GET"

}).then(function(response) {
    console.log(response)
    console.log(response[0].name);
    console.log(response[0].description);
    console.log(response[0].city);
    console.log(response[0].next_event);
    console.log(response.length)



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
                </b><span class="badge blue"> <b>Members: </b>${response[i].members}</span>
                <b>Next Event: </b>${response[i].next_event.name}<br>
                <b>Time: </b>${moment(response[i].next_event.time).format('MMMM Do YYYY, h:mm:ss a')}<br>
                <b>Location: </b>${response[i].localized_location}
                <div class="card-action">
                <a href="${response[i].link}">Join this event</a>
                </div>
            </div>
            </div>
            </div>
        `
        $("#search-results").append(contentCard)
    };

        

    


})

});