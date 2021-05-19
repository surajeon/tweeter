/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#tweeted-since").html(timeago.format(new Date()));

  const $tweet = $(`<article class="tweet">Hello world</article>`);
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
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
    /* Your code for creating the tweet element */
    return $tweet;
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
    
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  renderTweets(data);

});

