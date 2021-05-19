
$(document).ready(function () {
  console.log("hello");
  // --- our code goes here ---
  $("#tweet-textarea").keyup(function () {
    console.log("yes!");
  });
});


$(document).ready(function () {
  var maxLength = 140;
  $("#tweet-textarea-counter").keyup(function() {
    var initialLength = $(this).val().length;
    var textLength = maxLength-initialLength;
    $('#remaining-chars').text(textLength); 
    (textLength < 0) ? $('#remaining-chars').css("color", "red") : $('#remaining-chars').css("color", "black");
    // if (textLength < 0) {
    //   $('#remaining-chars').css("color", "red");
    // } else {
    //   $('#remaining-chars').css("color", "black");
    // }
  });
  // $(document).ready(function() {
  //   $("#tweet-textarea").keyup(function() {    
  //     let characterCount = $(this).val().length,
  //         current_count = $('#current_count'),
  //         maximum_count = $('#maximum_count'),
  //         count = $('#text-count');    
  //         current_count.text(characterCount);        
  // });
  // });
  console.log(timeago.format(new Date())); //timeago

});


