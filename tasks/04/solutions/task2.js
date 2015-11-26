var fs = require('fs');

//In this solution we can create a function promisify which takes a function as an argument 
//and retuns a promise but I will stick to the more generic way.
//PS. On github there are modules that provide this functionality.

//Because we dont have an async operation here the better solution is to return a resolved Promise 
//instead of creating a new promise like readFile and writeFile and resolve it inside.
function getRandomString(data) {
    data = data || {}; //if data is undefined or null assign an empry object
    data.string = Math.random().toString(36).substring(7);
    return Promise.resolve(data);
}

function handleError(err) {
    console.log(err);
}

function wait1000(data) {
    return new Promise(function(resolve, reject){
        console.log('simulating async operation...');

        //Its always a good idea to name our functions for debuging purposes.
        //This way in the stack trace we can see the function name instad of anonymous function.
        setTimeout(function asyncOperation(){
            resolve(data);
        }, 1000);
    });
}

//I will curry the writeFile and readFile Functions so I can pass the necessary paths when I chain the promises.
function writeFile(path) {
    return function writeFilePromise(data) {
        return new Promise(function(resolve, reject){
            fs.writeFile(path, data.string, function(err){
                if(err) return reject(err);
                resolve(data);
            });
        });
    };
}

function concatContents(data){
    if(!data.contents) throw new Error('File contents not found!');
    data.string = data.contents.join('');
    return Promise.resolve(data);
}

//We will store the contents of the files in an array - contents.
function readFile(path) {
    return function readFilePromise(data) {
        return new Promise(function(resolve, reject) {
            fs.readFile(path, function(err, content) {
                if(err) return reject(err);
                data = data || {};
                if(!data.contents) data.contents = [];
                data.contents.push(content);
                resolve(data);
            });
        });
    };
}

function doStuff() {
    var processPath = process.cwd();
    var FILE1_PATH = processPath + '/file1';
    var FILE2_PATH = processPath + '/file2'; 
    var FILE3_PATH = processPath + '/file3';
    var data = {
        string : '',
        contents: []
    };

    wait1000(data)
        .then(getRandomString) //Then expects a function as arguments .then(onFulfilled, onRejected).
        .then(writeFile(FILE1_PATH)) //Because readFile and writeFile are curried we can pass an argument.
        .then(wait1000)
        .then(getRandomString)
        .then(writeFile(FILE2_PATH))
        .then(wait1000)
        .then(readFile(FILE1_PATH))
        .then(wait1000)
        .then(readFile(FILE2_PATH))
        .then(wait1000)
        .then(concatContents)
        .then(writeFile(FILE3_PATH))
        .catch(handleError) //handleError will catch an error from any of the above functions.
        .then(function finalMessage(data) {
            console.log('Thats much better...');
        });
}

doStuff();
