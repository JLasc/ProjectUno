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