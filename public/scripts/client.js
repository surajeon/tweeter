/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // Event handler for submitting new tweet

  $("#create-tweet-form").on("submit", ((event) => {
    event.preventDefault();
    const $form = $(this);
    const $input = $form.find("textarea");
    const formData = $input.serialize();

    if ($input.val().length === 0) {
      $('.valid-error-message').text("This field cannot be empty.").slideDown(200).delay(2500).fadeOut(100); // slideDown
      console.log("here");
    } else if ($input.val().length > 140) {
      $('.valid-error-message').text("You have reached the maximum number of characters.").slideDown(200).delay(2500).fadeOut(100);
    } else {
      $('.valid-error-message').empty();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
      })
        .then(() => {
          loadTweets();
          $input.val("");
        })
        .catch(err => {
          console.log("ajax error caught");
          console.log(err);
        });
    }
  }));

  // When you click rew arrows on nav, toggles new tweet form.

  $("#nav-new-tweet").click(function() {
    $(".new-tweet #create-tweet-form").toggleClass("active");
  });

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
      .then((result) => {
        $(".article-wrapper").empty(); // empty works on DOM elms
        renderTweets(result);
        console.log("result", result);
      })
      .catch(err => {
        console.log("ajax error caught");
      });
  };

  // Render all tweets in order of most recent

  const renderTweets = function(tweets) {
    const tweetElms = tweets.reverse().map(createTweetElement);
    $(".article-wrapper").append(tweetElms);

    // tweets.forEach((tweet) => {
    //   const $tweet = createTweetElement(tweet);
    //   $(‘#tweets-container’).prepend($tweet); })

    // for(let tweet = tweets.length; tweet = 0; tweet--)

    // let tweet = $.each(tweets, function(index, value) {
    //   value = createTweetElement(tweets[index])
    //   $(".article-wrapper").append(value);
    //   // console.log(value); // each tweet html
    // });
    // return tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to create new tweet

  const createTweetElement = function(tweet) {
    const timeline = timeago.format(tweet['created_at']);
    const $tweet = $(`
    <article class="tweet-container">
      <header class="tweet-header">
        <div class="avatar">
          <img class="avatar-size" src="${tweet.user.avatars}" alt="avatar" />
          <span class="tweet-user-name">${tweet.user.name}</span>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <div class="tweeted-content">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer class="tweet-footer">
        <span id="tweeted-since" class="tweeted-since-posted">${timeline}</span>
        <ul class="footer-icons">
          <li><a href="#"><i class="fas fa-flag"></i></a></li>
          <li><a href="#"><i class="fas fa-retweet"></i></a></li>
          <li><a href="#"><i class="fas fa-heart"></i></a></li>
        </ul>
      </footer>
    </article>    
    `);
    return $tweet;
  };

  // let timeline = $("#tweeted-since").html(timeago.format(new Date()));

  // $(function() {
  //   const $button = $('#load-more-posts');
  //   $button.on('click', function () {
  //     console.log('Button clicked, performing ajax call...');
  //     $.ajax('more-posts.html', { method: 'GET' })
  //     .then(function (morePostsHtml) {
  //       console.log('Success: ', morePostsHtml);
  //       $button.replaceWith(morePostsHtml);
  //     });
  //   });
  // });
  loadTweets();
});

