function readFile(filename, callback) {
    setTimeout(function() {
        callback(null, 'File ' + filename + ' contents');
    }, 5000);
}

function* f(maxN) {
    while(maxN < 5) {
        var x = yield readFile('alabala', niakva);
        console.log(x);
        maxN++;
        //return 1000;
    }
}

function niakva(error, result) {
    //console.log(result);
    iter.next(result);
}


var iter = f(1);
console.log(iter.next()); //kick start
//console.log(iter.next(500));
