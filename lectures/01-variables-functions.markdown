# variables, functions, linting

---
## книжки

* JavaScript - The Good Parts /David Crockford/
 

---

# променливи

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

# оценяване

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

* познатото ни двойно равно (==) ще сравно стойността обръщайки типовете до подходящ (според вируталната машина) тип
* ето защо проверката за еквивалентност по тип и стойност в JS се прави с === (тройно равно)
* макар и незначителна тази разлика може да доведе до неочаквани и най-често неприятни резултати

---

# типове „неща“
## числа

```javascript
    > var low_boundary = 9000;
    undefined
    > typeof low_boundary
    'number'
    > var pi = 3.14;
    undefined
    > typeof pi
    'number'
```
* всичко има тип 
* undefined е ключова дума в езика
* за да проверим дали нещо е дефинирано или не... :

```javascript
    > typeof notDefinedVar === 'undefined'
    true
```

в браузера може и така : 

```javascript
    > notDefinedVar === undefined
    true
```

---
# типове „неща“
## низове

```javascript
    > var name = 'Pen\ncho';
```

съвсем същото като

```javascript
    > var name = "Pen\ncho";
```

---
# типове „неща“
## списъци

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
* списъците както всичко друго - са обекти. 
* можем да ги създадем с new или директно с [] (квадратни скоби)
* добавянето на елементи НЕ предполага явно 'разщиряване на размера' 
* списъците са динамични и се оразмеряват според броя елементи

---
# типове „неща“
## обекти

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

* обект/асоциативен списък са едно и също в javascript се оказва
че всички атрибути на даден обект са обект на autovivification ...
* ...в момента на първото присвояване на стойност!!!
* ...но ако не е било присвоено нищо на даден атрибут, първото му 
прочитане връща undefined
* t.е. -> при добавяне на атрибут се самосъздава елемента без да е нужно
неговото експлицитно (по някакъв начин) предефиниране.

---
# функции

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

* дефиницията на функциите е като в C и Java
* но в JavaScript дефиниция на функция води до 
създаване на инстанция на обект от класа Function
* т.е. всичи функции са обекти, но за това повече после...

```javascript
    var sumTwoThings = function (a, b) {
      return a + b;
    };
```

---

## `for` е кофти

* не, няма смисъл да спорим
* повече по този въпрос после
* има няколко други механизъма за итериране, които са в духа на JavaScript

---
# за разнообразие
### linter-и(мъхясване?)

 * jslint/jshint
 * интегрират се с всяка разумна среда

***

 * vim - [syntastic](https://github.com/scrooloose/syntastic)
 * emacs - [flycheck](http://www.emacswiki.org/emacs/Flycheck)
 * sublime text - [sublime-jslint](http://opensourcehacker.com/2012/04/12/jslint-integration-for-sublime-text-2/)
 * ако не сте си писали редактора сами най-вероятно има разумен начин да подкарате linter с него.

---

# по-подробно за списъци

## методи

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
# прости структури от данни

 * сам по себе си е списък
 * `pop`/`push` ⇨ стек
 * `unshift`/`pop` или `push`/`shift` ⇨ опашка

---

# нехомогенни

```javascript
    > things = [42, 'brie', {species: 'unicorn', пробабилитъ: '0.000000001'}]
```


---
# сложност

Сложността на операциите върху `Array` обекти най-вероятно не е каквато очаквате. За това има [много добро обяснение](http://stackoverflow.com/questions/11514308/big-o-of-javascript-arrays#answer-11535121).

**TL;DR** Списъците са обекти, обектите са хешове.

---
# за разнообразие и по нужда
### linter-и(мъхясване?)

 * jslint/jshint
 * интегрират се с всяка разумна среда

***

 * vim :
   [чрез syntastic](https://github.com/scrooloose/syntastic)
 * emacs :
   [чрез flycheck](http://www.emacswiki.org/emacs/Flycheck)
 * sublime text :
   [sublime-jslint](http://opensourcehacker.com/2013/04/12/jslint-integration-for-sublime-text-2/)
 * ако не сте си писали редактора сами най-вероятно има разумен начин да подкарате linter с него.

