/* global document,
location, XMLHttpRequest, JSON */

(function () {

  'use strict';

  function $(id) {
    return document.getElementById(id);
  }

  function postArticle(title, content) {
    var xhr = new XMLHttpRequest(),
        post = { title: title, content: content };
    xhr.open('post', location.protocol + '//' + location.host + '/post', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(post));
  }

  $('send-btn').onclick = function () {
    postArticle($('title').value, $('content').value);
  };
}());
