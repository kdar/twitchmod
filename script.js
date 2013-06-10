// ==UserScript==
// @author      Kevin Darlington (http://outroot.com)
// @name        twitchmod
// @namespace   twitchmod
// @description A userscript for twitch.tv to do things like save chat URLs, history, etc...
// @include     http://www.twitch.tv/*
// @include     http://*.twitch.tv/*
// @exclude     http://www.twitch.tv/*/popout
// @exclude     http://www.twitch.tv/
// @exclude     http://www.twitch.tv/directory/*
// @grant       none
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var list = null;
  var seenUrls = {};

  var html = [
    '<div id="twitchmod"><ul></ul><a id="twitchmod_handle"></a></div>'
  ].join('');

  var css = [
    '#twitchmod {',    
      'z-index: 5444333 !important;',
      'position: absolute;',
      'top: 0;',
      'right: 0;',
      'color: white;',    
      'width: 319px;',
    '}',
    '#twitchmod ul {',
      'height: 0px;',
      'overflow-x: hidden;',
      'overflow-y: auto;',
      'list-style: none;',
      'padding: 0px;',
      'background: none repeat scroll 0 0 rgba(0, 0, 0, 0.85);',
      'box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;',
      'border-radius: 5px 5px 5px 5px;',
    '}',
    '.twitchmod_url a {',     
      'color: white !important;',
    '}',
    '.twitchmod_url a:visited {',     
      'color: #6441A5 !important;',
    '}',
    '#twitchmod_handle {',
      'display: block;',
      'height: 7px;',
      'width: 319px;',
      'background: none repeat scroll 0 0 rgba(0, 255, 0, 0.55);',
      'border-radius: 5px 5px 5px 5px;',
    '}',
  ''].join('');

  // should return >= 5 for readability
  // http://bgrins.github.com/TinyColor/
  function lumdiff(rgb1, rgb2) {
    var L1 = 0.2126 * Math.pow(rgb1.r / 255, 2.2) + 0.7152 * Math.pow(rgb1.g / 255, 2.2) + 0.0722 * Math.pow(rgb1.b / 255, 2.2);
    var L2 = 0.2126 * Math.pow(rgb2.r / 255, 2.2) + 0.7152 * Math.pow(rgb2.g / 255, 2.2) + 0.0722 * Math.pow(rgb2.b / 255, 2.2);

    if (L1 > L2) {
      return (L1 + 0.05) / (L2 + 0.05);
    } else {
      return (L2 + 0.05) / (L1 + 0.05);
    }
  }

  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  function onChat(e) {
    var target = jQ(e.target);
    var urls = target.find("span.chat_line a");
    if (urls.length > 0) {
      var nick = target.find("a.nick").outerHTML();
      jQ(urls).each(function(index, url) {
        var plainUrl = jQ(url).text();
        if (!(plainUrl in seenUrls)) { 
          list.prepend([
            '<li>', nick, ': <span class="twitchmod_url">', jQ(url).outerHTML(), '</span></li>',
          ].join(''));

          seenUrls[plainUrl] = true;
        }
      });
    }
  };

  jQ.fn.outerHTML = function() {
    return jQ('<div>').append(this.eq(0).clone()).html();
  };

  var interval = setInterval(function() {
    if (jQ("#chat_line_list").is(":visible")) {
      jQ("#chat_line_list").bind('DOMNodeInserted', onChat);
      clearInterval(interval);
    }
  }, 100);

  list = jQ(html).appendTo("body").find("ul");
  addGlobalStyle(css);

  var toggleState = true;
  jQ('#twitchmod_handle').click(function() {
    if (toggleState) {
      jQ('#twitchmod ul').animate({
        height: '300px',
        padding: '8px',
      }, 500);
      toggleState = false;
    } else {      
      jQ('#twitchmod ul').animate({
        height: '0',
        padding: '0',
      }, 500);
      toggleState = true;
    }
  });
};

// load jQuery and execute the main function
addJQuery(main);

