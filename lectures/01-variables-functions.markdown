# Variables, functions, linting

---
## Книжки

* JavaScript - The Good Parts /David Crockford/

---

# Променливи

```javascript
    > a = 5 // BAD
    5
    > b = 7; // BAD
    7
    > var c = 43 // meeeeeeeh... aaaalmost
    undefined
    > var d = 42; // GOOD
    undefined
```

---

# Оценяване

```javascript
    > var a = 20
    undefined
    > a
    20
    > var b = '20'
    undefined
    > a == b
    true
    > a === b
    false
```

* Познатото ни двойно равно (==) ще сравно стойността обръщайки типовете до подходящ (според вируталната машина) тип
* Ето защо проверката за еквивалентност по тип и стойност в JS се прави с === (тройно равно)
* Макар и незначителна тази разлика може да доведе до неочаквани и най-често неприятни резултати

---

# Типове „неща“
## Числа

```javascript
    > var lowBoundary = 9000;
    undefined
    > typeof lowBoundary
    'number'
    > var pi = 3.14;
    undefined
    > typeof pi
    'number'
```
* Всичко има тип
* `undefined` е ключова дума в езика
* За да проверим дали нещо е дефинирано или не... :

```javascript
    > typeof notDefinedVar === 'undefined'
    true
```

може и така:

```javascript
    > notDefinedVar === undefined
    true
```

---

# Типове „неща“
## Низове

```javascript
    > var name = 'Pen\ncho';
```

Съвсем същото като

```javascript
    > var name = "Pen\ncho";
```

---

# Типове „неща“
## Списъци

```javascript
    > var team = ['Joro', 'Minko', 'Evgeni'];
    undefined
    > team.length
    3
    > team[0]
    'Joro'
    > team[1]
    'Minko'
    > team[-1]
    undefined
```
* Списъците както всичко друго - са обекти.
* Можем да ги създадем с new или директно с `[]` (квадратни скоби)
* Добавянето на елементи НЕ предполага явно 'разщиряване на размера'
* Списъците са динамични и се оразмеряват според броя елементи

---
# Типове „неща“
## Обекти

```javascript
    > var panda = {name: 'Стамат', age: 12, cuteness: 9000.001 };
    undefined
    > panda
    { name: 'Стамат',
      age: 12,
      cuteness: 9000.001 }
    > panda.name
    'Стамат'
    > panda.weight = 30
    30
    > panda.class
    undefined
    > panda['cuteness']
    9000.001
```

* Обект/асоциативен списък са едно и също в javascript се оказва
че всички атрибути на даден обект са обект на autovivification ...
* ...в момента на първото присвояване на стойност!!!
* ...но ако не е било присвоено нищо на даден атрибут, първото му
прочитане връща undefined
* т.е. -> при добавяне на атрибут се самосъздава елемента без да е нужно
неговото експлицитно (по някакъв начин) предефиниране.

---
# Функции

```javascript
    function sayHi(name) {
      console.log('Hello, ' + name);
    }
```

```javascript
    function sumTwoThings(a, b) {
      return a + b;
    };
```

```javascript
    function sumAllTheThings () {
      var result = arguments[0];
      for(var i = 1; i < arguments.length; ++i) {
        result += arguments[i];
      }

      return result;
    }
```

* Дефиницията на функциите е като в C и Java
* Но в JavaScript дефиниция на функция води до
създаване на екземпляр на обект от типа `Function`
* т.е. всичи функции са обекти, но за това повече после...

```javascript
    var sumTwoThings = function (a, b) {
      return a + b;
    };
```

# Асинхронни функции
```javascript
    setTimeout(function () {
      console.log('Hello There');
    }, 1000);
```

* Ще се изпълни след хиляда мили секунди


```javascript
    for (var i = 0; i < 5; i++) {
      setTimeout(function () {
        console.log(i);
      }, 1000);
    }
    > 5
    5
    5
    5
    5
```

* Иска да изпечата **i**, но докато е минала една секунда цикълът отдавна е стигнал вече до 5
* Асинхронна операция (не е в нормалния поток на изпълнение)
* Изпълнява се от Event Loop модела на Javascript
---
## `for` е кофти

* Не, няма смисъл да спорим
* Повече по този въпрос после
* Има няколко други механизъма за итериране, които са в духа на JavaScript

***

 * vim - [syntastic](https://github.com/scrooloose/syntastic)
 * emacs - [flycheck](http://www.emacswiki.org/emacs/Flycheck)
 * sublime text - [sublime-jslint](http://opensourcehacker.com/2012/04/12/jslint-integration-for-sublime-text-2/)
 * atom - [atom-jslint](https://atom.io/packages/atom-jshint)
 * ако не сте си писали редактора сами най-вероятно има разумен начин да подкарате linter с него.

---

# По-подробно за списъци

## Методи

```javascript
    > Object.getOwnPropertyNames(Object.getPrototypeOf(a))
    [ 'length',
      'constructor',
      'toString',
      'toLocaleString',
      'join',
      'pop',
      'push',
      'concat',
      'reverse',
      'shift',
      'unshift',
      'slice',
      'splice',
      'sort',
      'filter',
      'forEach',
      'some',
      'every',
      'map',
      'indexOf',
      'lastIndexOf',
      'reduce',
      'reduceRight' ]
```

---
### `for` е гаден

```javascript
    var albums = ['Lateralus', '10,000 days', 'Ænima'];
    albums.forEach(function (album) {
      console.log(album + ' is an album by Tool');
    });
```

---
# filter

```javascript
    > albums.filter(function (album) {
      return album.charAt(0) === 'Æ';
    });
    ['Ænima']
```

---
# map
```javascript
    > albums.map(function (album) {
      return album.toLowerCase();
    });
    ['lateralus', '10,000 days', 'ænima']
```

---
# push/pop

```javascript
    > albums.push('Undertow');
    4
    > albums
    ['Lateralus', '10,000 days', 'Ænima', 'Undertow']
    > albums.pop();
    'Undertow'
    albums
    ['Lateralus', '10,000 days', 'Ænima']
```

---
# `Array`

```javascript
   > var bands = new Array(10);
   undefined
   > bands
   [ , , , , , , , , ,  ]
```

---
# `Array`

```javascript
    > var things = new Array(10, 'asd');
    undefined
    > things
    [ 10, 'asd' ]
```

---
# shift/unshift

Абсолютно същото, но в началото на списъка, а не в края

---
# Прости структури от данни

 * Сам по себе си е списък
 * `pop`/`push` ⇨ стек
 * `unshift`/`pop` или `push`/`shift` ⇨ опашка

---

# Нехомогенни

```javascript
    > things = [42, 'brie', {species: 'unicorn', пробабилитъ: '0.000000001'}]
```


---
# Сложност

Сложността на операциите върху `Array` обекти най-вероятно не е каквато очаквате. За това има [много добро обяснение](http://stackoverflow.com/questions/11514308/big-o-of-javascript-arrays#answer-11535121).

**TL;DR** Списъците са обекти, обектите са хешове.

---
# За разнообразие и по нужда
### linter-и(мъхясване?)

 * jslint/jshint
 * Интегрират се с всяка разумна среда

***

 * vim :
   [чрез syntastic](https://github.com/scrooloose/syntastic)
 * emacs :
   [чрез flycheck](http://www.emacswiki.org/emacs/Flycheck)
 * sublime text :
   [sublime-jslint](http://opensourcehacker.com/2013/04/12/jslint-integration-for-sublime-text-2/)
 * ако не сте си писали редактора сами най-вероятно има разумен начин да подкарате linter с него.

