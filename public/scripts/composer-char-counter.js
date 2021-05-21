$(document).ready(function () {
  var maxLength = 140;
  $("#tweet-textarea-counter").on("input",(function() {
    var initialLength = $(this).val().length;
    var textLength = maxLength-initialLength;
    $('#remaining-chars').text(textLength); 
    (textLength < 0) ? $('#remaining-chars').css("color", "red") : $('#remaining-chars').css("color", "black");
  }));
  console.log(timeago.format(new Date()));
});


