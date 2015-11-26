### Continuation Passing

```javascript
fs.readFile(inputFile, function(err, data) {
    if (err) return res.status(500).send(err);
    process1(data, function(err, data) {
        if (err) return res.status(500).send(err);
        process2(data, function(err, data) {
            if (err) return res.status(500).send(err);
            process3(data, function(err, data) {
                if (err) return res.status(500).send(err);
                    fs.writeFile(outputFile, data, function(err) {
                        if (err) return res.status(500).send(err);
                        res.status(200).send('processed successfully using callback hell');
                    });
            });
        });
    });
});
```
---
###Named Continuation Passing

```javascript
fs.readFile(inputFile, onReadFile);

function onReadFile(err, data) {
    if (err) return res.status(500).send(err)
    process1(data, onProcess1)
}  

function onProcess1(err, data) {
    if (err) return res.status(500).send(err)
    process2(data, onProcess2)
}  

function onProcess2(err, data) {
    if (err) return res.status(500).send(err)
    process3(data, onProcess3)
}  

function onProcess3(err, data) {
    if (err) return res.status(500).send(err)
    fs.writeFile(outputFile, data, onWriteFile)
}

function onWriteFile(err) {
    if (err) return res.status(500).send(err)
    res.status(200).send('processed successfully using callback hell')
}
```
---

#Promises ES2015 (ES6)

---
###Какво са promises?
Promise е обект който се използва за отлагане. 

Той представлява операция, която все още не е завършила, но се очаква да завърши.

```javascript
new Promise(executor);
new Promise(function(resolve, reject) { ... });
```

Този конструктор взима като аргумент функция с два аргумента: resolve, reject.
 
Тези два аргумента са функции като едната се използва когато искаме да си изпълним обешанието, а другата когато искаме да го отхвърлим.

Като използваме обещания постигаме синхронност на асинхронните операции.

---

###States

Всяко обещание има 3 състояния:

    - pending (initial state)
    - fulfilled 
    - rejected
<img src='../html/img/promise_states_simple.jpg'>
---
###Example

```javascript
 function httpGet(url) {
    return new Promise(
        function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.status === 200) {
                    // Success
                    resolve(this.response);
                } else {
                    // Something went wrong (404 etc.)
                    reject(new Error(this.statusText));
                }
            }
            request.onerror = function () {
                reject(new Error(
                    'XMLHttpRequest Error: '+this.statusText));
            };
            request.open('GET', url);
            request.send();    
        });
    }

```

---

###Example
```javascript
 httpGet('http://example.com/file.txt')
    .then(
        function (value) {
            console.log('Contents: ' + value);
        },
        function (reason) {
            console.error('Something went wrong', reason);
        });
```
---
###Chaining (using then)

```javascript

asyncFunc()
    .then(function (value1) {
        return 123;
    })
    .then(function (value2) {
        console.log(value2); // 123
    });
```
---

### Error handling

```javascript

asyncFunc1()
    .then(asyncFunc2)
    .then(asyncFunc3)
    .catch(function (reason) {
        // Something went wrong above
    });
```
---
###Composition (map via Promise.all)

```javascript
var fileUrls = [
    'http://example.com/file1.txt',
    'http://example.com/file2.txt'
];
var promisedTexts = fileUrls.map(httpGet);

Promise.all(promisedTexts)
    .then(function (texts) {
        texts.forEach(function (text) {
            console.log(text);
        });
    })
    .catch(function (reason) {
        // Receives first rejection among the promises
    });
```
---
###Workflow
<img src='../html/img/promises.png'>
---

#Итериране на обекти

В ES5 нямаме много възможности да използваме някакви операции върху обекти и за това използвахме
библиотеки като lodash и underscore.

За радост в ES2015 това не е така. Вече имаме Iterators.

---

#Какво е Iterator?

---

Iterator е design pattern, който ни дава начин да достъпваме последователно елементи на някакъв контейнер (обект).

Това значи, че можем да използваме един и същ интерфейс за итериране независимо от репрезентацията на обекта.
<br><br>
<br><br>
<br><br>
<br><br>
В езици като C#, Java за да можем за инерираме по обект трябва да наследяваме някакъв интерфейс или да extend-нем някакъв клас, но в JS не е така. 

В JS за да бъдеш итератор трябва да изглеждаш като такъв! Това означава, че можем да използваме итератори
върху всеки един обект.

---
###Какво трябва да направим за да можем да итерираме по даден обект?

За да можем да итерираме по обект, той или някой от обектите от прототипната му верига трябва да има свойството Symbol.iterator

[Symbol.iterator] е функция без аргументи, която връща обект, който има имплементиран метод - next

next трябва да е функция, която не взима аргументи и връща обект с две свойства: done(boolean) и value

<br><br>
Обекти които имат [Symbol.iterator]

<img src='../html/img/consumers_sources.jpg'>
---
###Пример

```javascript
var someString = "hi";

var iterator = someString[Symbol.iterator]();
 
iterator.next(); // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }

var arr = ['a', 'b', 'c'];
iterator = arr[Symbol.iterator]();
iter.next() //{ value: 'a', done: false }
iter.next() //{ value: 'b', done: false }
iter.next() //{ value: 'c', done: false }
iter.next() //{ value: undefined, done: true }

```
---
###Как да си пишем custom iterables

```javascript
let iterable = {
    [Symbol.iterator]() {
        let step = 0;
        let iterator = {
            next() {
                if (step <= 2) {
                    step++;
                }
                switch (step) {
                    case 1:
                        return { value: 'hello', done: false };
                    case 2:
                        return { value: 'world', done: false };
                    default:
                        return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
};

for (let x of iterable) {
    console.log(x);
}
// Output:
// hello
// world
```
---

for ... of е от ES2015 и работи с Iterator-и
```javascript
for (variable of object) {
  statement
}
```

Някои вътрешни конструкции като spread оператора използват итератори
```javascript 
[...someString] // ["h", "i"]
```
---

#Generators

---

###Какво са генераторите

Генераторите са функциии с множество крайни точки.
 
Чрез ключовата дума yield ние можем да замразим изпълнението на нашата генератор функция след което можем да продължим изпълнението и.

```javascript
function* fibonacci() {
    var a = 0, b = 1, c = 0;

    while(true){
        yield a; //<-- suspend the generator function
        c = a, a = b, b = c + b;
    }
}


var seq = fibonacci(); //<--- call the generator function and to get an iterator object

//След извикване на next получаваме обект { value: 0, done: false };
console.log(seq.next().value); // 0
console.log(seq.next().value); // 1
console.log(seq.next().value); // 1
console.log(seq.next().value); // 2
console.log(seq.next().value); // 3
console.log(seq.next().value); // 5
```
---
<br><br><br>
<br><br><br>
<br><br><br>
<center><h3>Това ли е всичко?  ... Ко? Не!</h3></center>

---

###Можем да пращаме стойности на генеранорите си.
```javascript
function* powerGenerator() {
    var result = Math.pow(yield 'a', yield 'b');
    return result;
}

var g = powerGenerator(); 
console.log(g.next().value);
console.log(g.next(10).value);
console.log(g.next(2).value); // <--- what's the FINAL result?
```
Ако извикаме още един път next получаваме обект 

{ value: undefined, done: true };
---
<br><br><br>
<br><br><br>
<br><br><br>
<center><h3>Можем ли да използваме генератори за работа с асинхронните си функции?</h3></center>
---
#Example
```javascript
sync(function* (resume){
    try{
        var profile = yield _get('/profile', resume);
        console.log('Hello ' + profile.name);
    }catch(err){
        console.log(err);
    }
});

function sync(gen){ //<-- our sync function takes a generator
    var iteratorObj = null;

    function resume(err, result){
        if(err) return iteratorObj.throw(err);
        iteratorObj.next(result);
    }

    iteratorObj = gen(resume);
    iteratorObj.next();
}

```
---
# Може и още по-добре ...
```javascript

function _get(val, callback) {
    setTimeout(function(){
        callback(null, val);
    }, val);
}

function _post(url, data, callback) {
    setTimeout(function(){
        callback(null, url + ': data received');
    }, 1000);
}

sync(function* (resume) {
    try{
        var responses = yield [_get(2000, resume()), _get(300, resume())];
        console.log(responses);
        var resp = yield _post('/myData', responses, resume());
        console.log(resp);
    }
    catch(err){
        console.log(err);
    }
});
```
---
```javascript
function sync(gen) {
    var returnedValues = [], operationCounter = 0, returnedValuesCounter = 0;

    var reset = function(){
        returnedValues = [];
        operationCounter = 0;
        returnedValuesCounter = 0;
    };

    var check = function() {
        if (returnedValuesCounter == operationCounter) { 
            var result = null;
            if (operationCounter == 1) result = returnedValues[0];
            else result = returnedValues;
            reset();
            iterable.next(result);
        }
    };

    var resume = function() {
        var slot = operationCounter++;

        return function(err, returnedValue) {
            if (err) iterable.throw(err);
            returnedValuesCounter++;
            returnedValues[slot] = returnedValue;
            check();
        };
    };

    var iterable = gen(resume);
    iterable.next();
}
```
---

class: middle, center
[Още за генератори](https://strongloop.com/strongblog/how-to-generators-node-js-yield-use-cases/)