class: middle, center

# Какво е V8?

---

class: middle, center
### V8 is a Javascript engine designed by Google

Преди v8 повечето JS engine-и бяха просто интерпретатори и не бяха бързи.

---
class: middle, center

#Защо е проблем да се направи бърз JS enigine?

---

### JS е много динамичен език

* Обектите са хеш таблици и няма нищо статично по тях.

* Можем да добавяме и махаме свойства към обектите когато си искаме.

* Имаме Prototype Chains, които можем да модифицираме в run time.

* Можем да променяме контекста (call, apply, bind).

---
### Когато говорим за големи уеб приложения са ни необходими

* Бързо да достъпваме свойствата на обектите.

* Бързи function calls.

* И мн добър memory management.

---
### Тези 3 неща се решават от V8 чрез:

* Hidden classes.

* Inline caching or polymorphic inline cache (used with the JIT compiler)

С тези две неща Google постигат бързо достъпване на свойства на обектите и бързи function calls

* Generational Garbage Collector (memory pools holding objects of different ages)

С това се постига добър memory management
---
### Hidden classes
<img src="../html/img/hidden_classes.png" height="500px">

---
### Какво ще стане тук?
```javascript
var p1 = {
    x: 2,
    y: 5
};

var p2 = {
    x: 2,
    y: 5
};

var p3 = {
    y: 5,
    x: 7
}
```
---
### Arrays
* Скритите класове на масивите следят типовете на елементите
* Ако един масив е пълен с doubles той се upgrade-ва (unboxed) към fast double
* Невнимателно манипулиране на масивите може да причини оптимизационни проблеми (unboxing - boxing)

```javascript 
var a = new Array();
a[0] = 77;   // Allocates
a[1] = 88;
a[2] = 0.5;   // Allocates, converts
a[3] = true; // Allocates, converts

var a = [77, 88, 0.5, true]; //Is better
```
---
### Arrays

* Не пре-алокирайте големи масиви (>=100K елементи).

* Ако знаем колко елемента ще се съдържат в масива е хубаво да пре-алокираме.

* Не е хубаво да трием елементи. (Отнася се и за обекти).

* За масиви с различни типове трябва да използваме Array literal.
---
class: middle, center

##### Обектните литерали, които имат една и съща структура също използват едни и същи скрити класове.

* За това е хубаво когато правим нови обекти да слагаме в тях всички property-та, които те ще съдържат.
---
###Какво прави v8?

* v8 компилира Javascript директно до машинни инструкции (unoptimized native code) преди изпълнението му.
(Няма никакво интерпретиране и bytecode)

* Функциите не се компилират докато не бъдат извикани, което е хубаво защото виртуалната машина не губи време за големи библиотеки

* След компилирането се пуска profiler, който избира "hot" функции, които да бъдат оптимизирани от Crankshaft (optimization compiler)

---
class: middle, centeri
###Какво е NodeJS?
---
class: middle, center
####Open-source, cross-platform runtime environment for developing <del>server-side web</del> applications.

<img src='../html/img/node.gif'>

* libuv - high performance, cross-platform evented I/O library

* js/c++ - Node екосистемата npm (node package manager) е най-голямата open-source екосистема от библиотеки в света.

---
###Малко история
* Node e създаден 2009 от Ryan Dahl и други програмисти от Joyent. 

* 2011 година излиза npm 

* 2012 Ryan Dahl се оттегля от проекта 

* 2014 поради вътрешен конфликт излиза форк на node с името io.js 

* 2015 node and io.js merge

---
###Runtime

* v8 event loop се грижи за javascript и C++ модулите, които работят в main thread-а.

* Ако нещо работи извън main thread-а libev и libuv го обработват в thread pool. libuv прави връзката с main thread-а.

<img src='../html/img/io_callback.png'>
---
###Конвенции

```javascript

var callback = function(err, data) {
    //DO STUFF    
};

saveData(myData, callback);

```

* callback функцията е винаги последният аргумент, който се подава на асинхронната функция.

* Първата стойност, която се подава на callback функцията е винаги error.
---
###Modules

```javascript

var fs = require('fs'); //default module
var myModule = require('../app_modules/myModule'); //custom module

myModule.foo(); // > this is foo!
```
Някои други default модули са:

* http
* crypto
* os
* path

Тук може да откриете всички: https://nodejs.org/api/

---
###Как да пишем собствени модули:

```javascript

module.exports = {
    foo: function() {
        return 'this is foo!';
    },
    bar: function() {
        return 'this is bar';
    }
};

```

```javascript

module.exports.foo = function() {
    return 'this is foo!';
};

module.exports.bar = function() {
    return 'this is bar!';
};
```
---
###NPM

* Когато започнем да правим нов проект започваме с npm init за да си създадем package.json, който съдържа полезна информация за проекта ни.

```javascript
    npm install module_name
```

* При добавяне на нов модул към проекта е хубаво да използвамe npm install module_name --save за да запишем този модул към dependencies в package.json.

* Свалените модули се запазват в папка node_modules, която трябва да добавям в .gitignore за да не я commit-ваме към source control-а. 

* При сваляне на приложението от github посто трябва да напишем npm install или накратко npm i за да се свалят всички dependency-та от package.json.

* Понякога искаме модулите да се свалят глобално, за да можем да ги използваме навсякъде. Тогава използваме npm install module_name -g.

---
###Events 

* Събитията ни дават друг начин, по който можем да пишем асинхронни операции.

```javascript
//Callback example
getUserData(param1, function(err, results) {
    //Do stuff
});



//Event example
var userData = getUserData(param1);

//Subscribe to the data event
userData.on('data', function(data) {
    //Do stuff
});

//Subscribe to the item event
userData.on('item', function(item) {
    //Do stuff
});
```
Тук казваме, че всеки път когато възникне евент с име data, трябва да се изпълни тази функция. Ако искаме да се изпълни само веднъж, използваме once.

---
###Custom Event Emitters (1)

```javascript
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

module.exports.getUserData = function() {
    setTimeout(function(){
        //Publish the item event after at least 5sec
        emitter.emit('item', { id: 123, name: 'ivan' });
    }, 5000);
    return emitter;
};
```

---
###Custom Event Emitters (2)
```javascript
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function CustomEmitter() {
    EventEmitter.call(this);
};

CustomEmitter.prototype.connect = function() {
    var self = this;
    setTimeout(function(){
        self.emit('connected', { name: 'ivan', age: 19 });
    }, 5000);
};

util.inherits(CustomEmitter, EventEmitter);
module.exports = CustomEmitter;
```
```javascript
var CustomEmitter = require('./CustomEmitter');

var cm = new CustomEmitter();

cm.on('connected', function(data) {
    console.log(data);
});

cm.connect();
```
---
###Streams

* Потоците разширяват EventEmitter.

* Те представляват абстракция за менажиране на data flow. (Network traffic, File I/O ...)

* Може да правим 3 типа потоци: Readable, Writable, Transform (Readable and Writable)

* Можем да pipe-ваме Readable потоците към Writable (подобно на unix command pipeing)
---
###Readable Streams

<ul>
    <li>event 'readable' (a chunk of data can be read)</li>
    <li>event 'data' (get chunk of data asap)</li>
    <li>event 'end' (no more data to read)</li>
    <li>event 'error'</li>
    <li>event 'close' (when all resources are closed)</li>
    <li>read([size]) (pull data from internal buffer)</li>
    <li>setEncoding(encoding)</li>
    <li>pause()</li>
    <li>isPaused()</li>
    <li>pipe(WritableStream)</li>
    <li>unpipe()</li>
    <li>unshift() (unshift onto read queue)</li>
</ul>

---
### Writable Streams
<div style='display: inline-block;'>
    <ul> 
        <li>event 'finish'</li>
        <li>event 'drain' (begin writing more data after read returned false)</li>
        <li>event 'error'</li>
        <li>event 'pipe'</li>
        <li>event 'unpipe'</li>
        <li>write(chunk)</li>
        <li>cork() (force buffering of all writes)</li>
        <li>uncork() (flush all buffered data since cork call)</li>
        <li>end() (call this when we don't need more data)</li>
        <li>setDefaultEncoding(encoding)</li>
    </ul>
 </div>
---
###Example (1)
```javascript
var request = require('request');
var arr = [];

var rs = request('http://www.google.com/');
rs.on('data', function(chunk) {
    arr.push(chunk);
});

rs.on('end', function() {
    var result = arr.toString();
    result = result.replace(/div/g,'span');
    var newBuffer = new Buffer(result);

    //Send new buffer somewhere ... 

    console.log(result);
});
```
---
###Example (2)

```javascript
var fs = require('fs');
var file = [];

var readStream = fs.createReadStream('path/to/file');

readStream.on('data', function(chunk) {
    file.push(chunk); //chunk is a buffer
});

readStream.on('end', function() {
   console.log(file.toString());  
});

var writeStream = fs.createWriteStream('path/to/otherfile');

readStream.pipe(writeStream);
```
---
### Example (3)

```javascript
var fs = require('fs');

var writeStream = fs.createWriteStream('./test.txt');

writeStream.on('finish', function() {
    console.log('all done ...');
});

writeStream.write('Hello');
writeStream.write(' ');
writeStream.write('World!');

writeStream.end();
```
---

### Example (4)
```javascript
var fs = require('fs');
var zlib = require('zlib');
var request = require('request');

var writeStream = fs.createWriteStream('path/to/file');
//zlib.createGzip() is a Transform stream
request('http://google.com/').pipe(zlib.createGzip()).pipe(writeStream); 
```
---
### Custom Streams

```javascript
var stream = require('stream');
var util = require('util');

function EchoStream () {
    stream.Writable.call(this);
};

util.inherits(EchoStream, stream.Writable);

EchoStream.prototype._write = function (chunk, encoding, done) {
    console.log(chunk.toString());
    done();
}

var myStream = new EchoStream();
process.stdin.pipe(myStream);
```
* Потоците обикновенно работят с buffers.
* ObjectMode: true ни позволява да работим с JS обекти, вместо с буфери.
* Ако ни трябва Readable или Transform stream трябва съответно да реализираме _read или _transform методи вместо _write

---
##### Transform Stream Example
```javascript
var stream = require('stream');
var fs = require('fs');
var liner = new stream.Transform( { objectMode: true } );
 
liner._transform = function (chunk, encoding, done) {
     var data = chunk.toString();
     if (this._lastLineData) data = this._lastLineData + data;
 
     var lines = data.split('\n');
     this._lastLineData = lines.pop();
 
     lines.forEach(this.push.bind(this));
     done();
};
 
liner._flush = function (done) {
     if (this._lastLineData) this.push(this._lastLineData);
     this._lastLineData = null;
     done();
};
 
var source = fs.createReadStream('path/to/file');
source.pipe(liner);

liner.on('readable', function () {
     var line = null;
     while((line = liner.read())){
             console.log(line);
     }
});
```
---
### Readable Stream Example

```javascript
var util = require('util');
var Readable = require('stream').Readable;

var MyStream = function(options) {
  Readable.call(this, options); // pass through the options to the Readable constructor
  this.counter = 1000;
};

util.inherits(MyStream, Readable); // inherit the prototype methods

MyStream.prototype._read = function(n) {
  this.push('foobar');
  if (this.counter-- === 0) { // stop the stream
    this.push(null);
  }
};

var mystream = new MyStream();
mystream.pipe(process.stdout);
```

---
class: middle, center
[More about Streams](https://github.com/substack/stream-handbook)
---
### Buffers
Когато четем от файлове или работим с мрежата ние получаваме сурова (raw) памет, която е извън v8 heap-а. Buffer-ът представлява mapping (handle) между тази памет и JS Array.
v8 няма контрол върху тази памет, за това този mapping, който се създава, позволява на libuv да деалокира суровата памет след като Garbage Collector-а (GC) премахне нашия buffer.

Buffer-ите могат да бъдат гадни! 

Нека си представим, че pre-alloc-ираме голямо парче памет (fs.readFile без encoding) и след това разбием тази памет на малки парчета към конкретни JS обекти. Какво ще се случи с нашата памет, ако без да искаме оставим референции към някои от тези обекти? 

Използването на slice в Node върху буфери не е добра идея, защото може да доведе до memory leaks. Slice не прави копие на array, а създава пойнтъри към паметта, която държи array-я.
За това е по-добре е да си създадем изцяло нов Buffer.

Да разгледаме също какво се случва в Stream Example(1).
---
### Process

* process обектът е достъпен навсякъде в нашето node приложение и разширява Event Emitter.

* има полезни референции към:
    - process.stdin, process.stdout, process.stderr (Streams)

    - process.argv, process.pid, process.title, process.cwd() и др (Attrbutes)

    - process.abort(), process.kill(pid) (methods)

    - 'exit', 'error' + POSIX signal events (events)

---
### Using Node as a client

Вече разгледахме request, а сега нека видим http
```javascript 
   var http = request('http');
    var options = {
        host: 'www.google.com',
        port: 80,
        path: '/',
        method: 'GET'
    };

   var req = http.request(options, function(resp){
        console.log(resp.statusCode);
        resp.pipe(process.stdout);
    });
   //req is a WritableStream
   //resp is a ReadableStream

   req.end(); //close the writable stream

//We can use get instead 
   http.get('www.google.com', function(res){
       res.pipe(process.stdout);
    });
```

---
### Using Node as web server Example(1)

```javascript
var http = require('http');
var server = http.createServer(function(req, res){
    //req and res are streams
    //process request    
});

server.listen(8081, function() {
    console.log('Server is listening on 8081 ...');
});
```
---
```javascript
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8888;

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));
```