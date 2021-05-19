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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    let $tweet = $(".tweet").append(tweets);
  }

  const createTweetElement = function (tweet) {
    return `
    <article class="tweet">
      <header>
        <img src="/images/profile-hex.png">
        <span>${tweet.user.handle}</span>
      </header>
      <div class="tweeted-text">
        <p>Hello World!</p>
      </div>
      <footer class="tweet-footer">
        <span id="tweeted-since" class="tweeted-since-posted">10 days ago</span>
        <ul class="footer-icons">
          <li><a href="#"><i class="fas fa-flag"></i></a></li>
          <li><a href="#"><i class="fas fa-retweet"></i></a></li>
          <li><a href="#"><i class="fas fa-heart"></i></a></li>
        </ul>
      </footer>
    </article>
    `
    /* Your code for creating the tweet element */
    // return $tweet;
  }
  
  renderTweets(data);

});

