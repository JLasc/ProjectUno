// AJAX call

//meetup api

$("#meetupBtn").on("click", function() {
    event.preventDefault();

jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

var meetupKey = "421f4e447d7a4c403e52346147257a50";
var meetupURL = `https://api.meetup.com/find/groups?category=10&sign=true&key=${meetupKey}&zip=03064&radius=1&event`;


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
            <h2 class="header">${response[i].name}</h2>
            <div class="card horizontal">
            <div class="card-image">
                <img src="${response[i].key_photo.highres_link}">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                ${response[i].description}
                ${response[i].state}
                ${response[i].localized_location}
                <div class="card-action">
                <a href="#">This is a link</a>
                </div>
            </div>
            </div>
            </div>
        `
        $("#search-results").append(contentCard)
    };

        

    


})

});