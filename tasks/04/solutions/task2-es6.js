var fs = require('fs');
var promisify = require('es6-promisify');
var _readFile = promisify(fs.readFile);
var _writeFile = promisify(fs.writeFile);
var text1;

function wait(time) {
  return new Promise(res => setTimeout(res, time));
}

wait(1000)
  .then(() => _writeFile('hello.txt', 'text of file I', 'utf8'))
  .then(() => wait(1000))
  .then(() => _writeFile('hello2.txt', 'text of file II', 'utf8'))
  .then(() => wait(1000))
  .then(() => _readFile('hello.txt'))
  .then((txt) => text1 = txt)
  .then(() => wait(1000))
  .then(() => _readFile('hello2.txt'))
  .then((text2) => _writeFile('result.txt', `${text1} ${text2}`, 'utf8'))
  .catch((err) => console.log(err));