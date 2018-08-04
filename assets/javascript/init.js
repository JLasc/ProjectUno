(function($){
  $(function(){
    $('select').formSelect();
    $('.timepicker').timepicker();
    $('.datepicker').datepicker();
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.modal').modal();
    var tabInstanse = $('.tabs').tabs();

    $('#navSignUpButton').on('click', function(){
      tabInstanse.tabs('select','signUp');
    })

    $('#navLoginButton').on('click', function(){
      tabInstanse.tabs('select','login');
    })

  }); // end of document ready
})(jQuery); // end of jQuery name space
