/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// if ($input === "" || $input === null) {

// }

$(document).ready(function () {

  $("#create-tweet-form").submit((event) => {
    event.preventDefault();
    const $form = $(this);
    const $input = $form.find("textarea");
    const formData = $input.serialize()

    if ($input.val().length === 0) {
      alert("You need to input some text");
    } else if ($input.val().length > 140) {
      alert("Your text has to be less than 140");
    } else {
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
  }

  const renderTweets = function (tweets) {
    const tweetElms = tweets.reverse().map(createTweetElement);
    $(".article-wrapper").append(tweetElms);


    // for(let tweet = tweets.length; tweet = 0; tweet--)

    // let tweet = $.each(tweets, function(index, value) {
    //   value = createTweetElement(tweets[index])
    //   $(".article-wrapper").append(value);        
    //   // console.log(value); // each tweet html
    // });
    // return tweet;
  }

  const createTweetElement = function (tweet) {
    // $("#tweeted-since").html(timeago.format(new Date()));
    const timeline = timeago.format(tweet['created_at']);
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
    <span id="tweeted-since" class="tweeted-since-posted">${timeline}</span>
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

