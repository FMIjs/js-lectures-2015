/* global module, require */

var Observer = require('./Observer'),
    // use fs.writeFileSync(fileName, content)
    fs = require('fs');

function LogObserver(config) {
  'use strict';
  this.config = config;
}

LogObserver.prototype = Object.create(Observer.prototype);

LogObserver.prototype.update = function (title, data) {
  'use strict';
  // Implement the method
};

module.exports = LogObserver;

