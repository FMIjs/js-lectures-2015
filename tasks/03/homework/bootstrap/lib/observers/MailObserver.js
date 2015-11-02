/* global require, module */

var Observer = require('./Observer'),
    // more information about the API at
    // http://www.nodemailer.com/docs/usage-example
    mail = require('nodemailer').mail;

function MailObserver(config) {
  'use strict';
  this.config = config;
}

MailObserver.prototype = Object.create(Observer.prototype);

MailObserver.prototype.update = function (title, data) {
  'use strict';
  // Implement the method
};

module.exports = MailObserver;

