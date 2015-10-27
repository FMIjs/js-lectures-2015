/* global module */

function Observable() {
  'use strict';
  this.observers = [];
}

Observable.prototype.addObserver = function (ob) {
  'use strict';
  this.observers.push(ob);
};

Observable.prototype.removeObserver = function (ob) {
  'use strict';
  this.observers.splice(this.observers.indexOf(ob), 1);
};

Observable.prototype.update = function () {
  'use strict';
  var args = arguments;
  this.observers.forEach(function (ob) {
    ob.update.apply(ob, args);
  });
};

module.exports = Observable;

