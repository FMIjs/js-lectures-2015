var util = require('util');

//Resource for writable stream: https://nodejs.org/api/stream.html#stream_class_stream_writable
var WritableStream = require('stream').Writable;

function FileReader() {
    WritableStream.call(this);
    this.lastDone = null;
    this.lastLine = null;
    this.buffer = [];
    this.hasFinished = false;
    var self = this;

    //Add callback to the finish event and when its called set the property hasFinished to true.
    //We can use self._writableState.finished instad of doing this but we have to know about it.
    this.on('finish', function() {
        self.hasFinished = true;
    });
}

util.inherits(FileReader, WritableStream);

FileReader.prototype.fetchLine = function() {
    var self = this;

    //If stream's not finished and we don't have a nextLine we must let some data to be written to the stream
    //and try to fetch the line again. We use setTimeout because if we use process.nextTick the callback
    //will be executed before the _write is called (its executed before any I/O operations)
    //Resource:
    //https://nodejs.org/api/process.html#process_process_nexttick_callback_arg
    setTimeout(function() {
        var nextLine = self.buffer[0];
        self.buffer = self.buffer.slice(1); //create new array without the first element
        if(!nextLine) {
            if(!self.hasFinished) {
                //if there is a done callback and stream is not closed 
                //then exec done so data can be written into the stream
                if(self.lastDone && !self.hasFinished) self.lastDone();
                self.fetchLine();
            } else {
                //If stream is closed then send null
                self.emit('next-line', null);
            }
            return; //Don't execute line 46
        }
        self.emit('next-line', nextLine); 
    }, 0);
};

FileReader.prototype._write = function(chunk, encoding, done) {
    var chunkString = chunk.toString();

    //Check if lastLine is set. If so append it to the current result.
    if(this.lastLine) {
        chunkString = this.lastLine + chunkString;
        this.lastLine = null;
    }

    var chunkLines = chunkString.split('\n'); //Split the lines

    //If the last symbol is not a \n we don't have the full line so we must save the
    //last element and append next chunkString to it
    if(chunkString.slice(chunkString.length - 1) !== '\n' && this.hasFinished) {
        this.lastLine = chunkLines.pop();
    }
    this.buffer = this.buffer.concat(chunkLines);

    //Keep a reference to the done call so we can execute the function later when the
    //buffer array is empty
    this.lastDone = done;
};

module.exports = FileReader;
