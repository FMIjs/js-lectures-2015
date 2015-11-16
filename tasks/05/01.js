'use strict';

var Writable = require('stream').Writable;


class FileReader extends Writable {
  constructor() {
    super();
    this.buffer = [];
    console.log(this);
  }

  _write()
}


let fr = new FileReader();
console.log(fr);
