var fs = require('fs');

function getRandomString() {
    return Math.random().toString(36).substring(7);
}

function handleError(err) {
    console.log(err);
}

function wait1000(err, callback) {
    if(err) return handleError(err);
    console.log('simulating async operation...');
    setTimeout(function(){
        callback(null);
    }, 1000);
}

function writeFile(err, data, callback) {
    if(err) return handleError(err);
    fs.writeFile(data.path, data.string, callback);
}

function readFile(err, data, callback) {
    if(err) return handleError(err);
    fs.readFile(data.path, callback);
}

function doStuff(){
    var processPath = process.cwd();
    var FILE1_PATH = processPath + '/file1';
    var FILE2_PATH = processPath + '/file2';
    var FILE3_PATH = processPath + '/file3';

    wait1000(null, function() {
        var randString = getRandomString();
        writeFile(null, { path: FILE1_PATH, string: randString } , function(err) {
            wait1000(err, function(err) {
                randString = getRandomString();
                writeFile(err, { path: FILE2_PATH, string: randString }, function(err) {
                    wait1000(err, function(err) {
                        readFile(err, { path: FILE1_PATH }, function(err, content1) {
                            wait1000(err, function(err){
                                readFile(err, { path: FILE2_PATH }, function(err, content2) {
                                    wait1000(err, function(err) {
                                        writeFile(err, { path: FILE3_PATH, string: content1 + content2 }, function(err) {
                                            if(err) return handleError(err);
                                            console.log('This is so ugly ... ');
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

doStuff();