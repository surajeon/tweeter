/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#tweeted-since").html(timeago.format(new Date()));

  $("#create-tweet-form").submit((event) => {
    event.preventDefault();
    const $form = $(this);
    const $input = $form.find("textarea");
    const formData = $input.serialize()
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
    })
    .then(() => {
      loadTweets()
    })
    .catch(err => {
      console.log("ajax error caught");
      console.log(err);
    });

  });

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })    
    .then((result) => {
      $(".article-wrapper").empty();
      renderTweets(result);
      console.log("result", result);
    })
    .catch(err => {
      console.log("ajax error caught");
    });
  }  

  const renderTweets = function (tweets) {
    const tweetElms = tweets.map(createTweetElement);
    $(".article-wrapper").append(tweetElms);

    // let tweet = $.each(tweets, function(index, value) {
    //   value = createTweetElement(tweets[index])
    //   $(".article-wrapper").append(value);        
    //   // console.log(value); // each tweet html
    // });
    // return tweet;
  }

  const createTweetElement = function (tweet) {
    const $tweet = $(`
    <article class="tweet-container">
    <header class = "tweet-header">
    <img src="/images/profile-hex.png">
    <span>${tweet.user.handle}</span>
    </header>
    <div class="tweeted-text">
    <p>${tweet.content.text}</p>
    </div>
    <footer class="tweet-footer">
    <span id="tweeted-since" class="tweeted-since-posted">${tweet.created_at}</span>
    <ul class="footer-icons">
    <li><a href="#"><i class="fas fa-flag"></i></a></li>
    <li><a href="#"><i class="fas fa-retweet"></i></a></li>
    <li><a href="#"><i class="fas fa-heart"></i></a></li>
    </ul>
    </footer>
    </article>
    `)

    return $tweet;
  }
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
  loadTweets()
});

