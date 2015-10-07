class:center,middle
# функционално програмиране

--

![λ](img/praise-lambda.png)

---
# функционално програмиране

* > Functional programming is like describing your problem to a mathematician.

* > Imperative programming is like giving instructions to an idiot.

---
# забележка

Съвременните компютри са много *изпълнителни*. Без значение от сложността на подадените инструкции, стига да са коректни, изпълнението ми е гарантирано.

От друга страна математиците обикновено имат добре развито *асоциативно* мислене и относително лесно осмислят сложни концепции.

---
# забележка

Лесно за един процесор е да изпраща правилното напрежение по правилната пътечка, така че една по-висока абстракция да отчете увеличаване на стойността на променлива с 1. Може да го прави буквално милиарди пъти в секунда.

--
<br/><br/><br/><br/>

Лесно за един математик е да интегрира по части.

---
# функционално програмиране

* всяко изчисление е *оценка на чиста функция*
* всяка „хубава“ функция е чиста функция
* всяка „нечиста“ функция трябва много добре да оправдае съществуването си
* всяка математическа функция е чиста

---
# функционално програмиране

## чиста функция

* връща предвидим добре дефиниран резултат
* връща същия резултат при повторно извикване със същия аргумент
* ...(т.е. е изображение в математическия смисъл)
* не предизвиква странични ефекти!!
  * промяна стойността на глобална променлива
  * писане във файл(включително stdout)
* не зависи от информация недостъпна чрез подадените ѝ аргументи
  * четене от файл
  * четене от глобални променливи
  * четене от мрежата

---
class:center,middle
## чиста функция
![pure](img/pure_function.jpg)

---
## чиста функция
```javascript
function intersection(array1, array2) {
  return array1.filter(function (element) {
    return array2.indexOf(element) > -1;
  });
}
```
--

* Няма никакви странични ефекти.
--

* Аргументите ѝ не се променят в следствие на извикването ѝ.
--

* Никакво „глобално състояние“ не се променя в следствие на извикване ѝ.

---
# чисти функции

Извикванията на чисти функции са референтно прозрачни(referentially transparent)
--

```javascript
var belowTen = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    betweenFiveAndFifteen = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

console.log(intersection(belowTwenty, betweenFiveAndFifteen));
```
--

```javascript
var belowTen = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    betweenFiveAndFifteen = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

console.log([5, 6, 7, 8, 9]);
```

---
class:center,middle
## нечиста функция

![](img/impure_function.jpg)

---
## нечиста функция
```javascript
function intersection(array1, array2) {
  return array1.filter(function (element) {
    console.log(element);
    return array2.indexOf(element) > -1;
  });
}
```
--

* I/O операциите са промяна на състоянието (state change).

---
## (малко по-смислена) нечиста функция
```javascript
function reverse(array) {
  array.forEach(function (element, index) {
    var symmetricalIndex = array.length - 1 - index;

    if (index > symmetricalIndex) {
      return;
    }

    array[index] = array[symmetricalIndex];
    array[symmetricalIndex] = element;
  });
}
```

* Ако извикаме два пъти `reverse` с еднакви аргументи резултатите ще са различни.
* `array` преди и след извикването на `reverse` се променя.

---
class:center,middle
![](img/pure_phylosoraptor.jpg)

---
# в живия живот

Чистите функции не могат да свършат всичко, което искаме от една машина.

Комуникацията с потребител се извършва винаги с „нечисти“ функции, тъй като е необходима смяна на някакво глобално състояние(писане във файл, визуализация по екрана, пращане на неща по мрежата и т.н.)

Но всичко под този слой може да бъде организирано изцяло в pure functions.

Това е подход, който не се среща често извън изконно функционални езици(lisp, haskell), но стремежа към него в други езици рядко вреди.

---
# в javascript

Очевидно javascript не е чисто функционален език. Имаме глобален state. За всяка функция има косвен (implicit) `this`. В javascript за `this` можем да си мислим като за вграден в езика механизъм за запазване на state.

`this` е **runtime** контекста, в който се изпълнява функцията ни.

---
# `this`

```javascript
function constructGreeting() {
  return "Hello, I am " + this.name;
}

function setAge(age) {
  this.age = age;
}

var pesho = {
  name: 'Pesho',
  constructGreeting: constructGreeting,
  setAge: setAge,
};

var gosho = {
  name: 'Gosho',
  constructGreeting: constructGreeting,
  setAge: setAge,
}
```

* при задаване на атрибут setAge нямаме 'копиране' на обекта функция setAge

---
# `this`

```javascript
> pesho.constructGreeting()
'Hello, I am Pesho'
> gosho.constructGreeting()
'Hello, I am Gosho'
```

--

```javascript
> pesho.setAge(23)
> pesho.age
23
> gosho.setAge(42)
> gosho.age
42
```

--

```javascript
> pesho.constructGreeting === gosho.constructGreeting
true
> pesho.setAge === gosho.setAge
```

**Една и съща** функция се извиква в два различни контекста.

---

# `call` &amp; `apply`

помощни функции за промяна на контекста

```javascript
function constructGreeting() {
  return "Hello, I am " + this.name;
}

function setAge(age) {
  this.age = age;
}

var pesho = {
  name: 'Pesho',
};

var gosho = {
  name: 'Gosho',
}
```

---
# `call`

```javascript
> constructGreeting.call(pesho)
'Hello, I am Pesho'
> constructGreeting.call(gosho)
'Hello, I am Gosho'
```

```javascript
> setAge.call(pesho, 23)
'Hello, I am Pesho'
> setAge.call(gosho, 42)
'Hello, I am Gosho'
```

* първият аргумент на 'call' е 'this' обекта
* всички останали аргументи се предават като аргументи на функцията

---
# `apply`

* аналогично на 'call', но очаква Array

```javascript
> constructGreeting.apply(pesho)
'Hello, I am Pesho'
> constructGreeting.apply(gosho)
'Hello, I am Gosho'
> { name: 'Stamat', constructGreeting : constructGreeting }.constructGreeting();
'Hello, I am Stamat'
```

```javascript
> setAge.apply(pesho, [23])
'Hello, I am Pesho'
> setAge.apply(gosho, [42])
'Hello, I am Gosho'
```

---
# `call` vs. `apply`

* `call` и `apply` очакват като първи аргумент обекта, в чиито контекст да изпълнят функцията, т.е. стойността на `this`.
* `call` очаква като следващи аргументи, аргументите, които да се подадат на функцията.
* `apply` очаква като втори аргумент `Array`<small><small><small><small>(почти)</small></small></small></small>, с аргументите, които да се подадат на функцията.

---
# `arguments`

Някои функции приемат променлив(без горна граница) брой аргументи, или пък дефинират някои от аргументите си като опционални.

```javascript
function howManyThings() {
  return arguments.length;
}
```
--

```javascript
> howManyThings(1, 2, 3, 4);
4
> howManyThings(0, 12, 'бахур', 5, {});
5
> howManyThings(undefined, undefined, undefined);
3
```

---
# `apply` `arguments`

Казахме, че `apply` очаква списък, който да подаде като аргументи на функцията.

```javascript
var args = [];
args[0] = 42;
args[1] = 73;

function pokeAroundArguments() {
  console.log(arguments[0]);
  console.log(arguments[1])
  console.log(arguments.length);
}
```

```javascript
> pokeAroundArguments.apply(null, args);
42
73
2
```

---
# `apply` `arguments`

Всъщност е почти така. `apply` очаква обект който има `length` атрибут, според който определя как да конструира `arguments` обекта за функцията.

```javascript
var args = {};
args[0] = 42;
args[1] = 73;
args.length = 2;

function pokeAroundArguments() {
  console.log(arguments);
  console.log(arguments.length);
}
```

```javascript
> pokeAroundArguments.apply(null, args)
{ '0': 42, '1': 73 }
2
```

???

пример с max(1, 2, 3, 16, 5, 3, 14) чрез Math.max.apply
array() >> Array()

---
# `arguments` НЕ Е `Array`

```javascript
function doubleAll() {
  return arguments.map(function (item) {
    return item + item;
  });
}
```

```javascript
> doubleAll(1, 2, 3, 4)
TypeError: Object #<Object> has no method 'map'
```

--
<hr/>

```javascript
function doubleAll() {
  return [].map.call(arguments, function (item) {
    return item + item;
  });
}
```

```javascript
> doubleAll(36.5, 21, 'Jar')
[ 73, 42, 'JarJar' ]
```

---
# области на видимост

До сега си говорихме за runtime контекста, в който се изпълняват функциите, осъществен чрез `this` обекта.

Има обаче и лексикален контекст, който също влияе на начина, по който се държат функциите.

---
# области на видимост

*scope gate* - начало/край на конструкция на езика, която определя границите на област на видимост
--

```c
// in c
int a = 0;

for (int i = 0; i < 9; ++i) {
    int j = i * 2;
    a++;
}

printf("%d", a); // 9
printf("%d", j); // error: 'j' was not declared in this scope
```

---
# области на видимост

В javascript __единствените__ scope gate-ове са началото и краят на __*функция*__.

Всяка функция има собствена област на видимост. Всяка променлива декларирана в тялото на една функция е видима само по време на текущото изпълнение на функцията.


```javascript
> function whatIsSixTimesNine() {
...  var answer = parseInt('42' 13);
...  return answer;
...}
undefined
> whatIsSixTimesNine()
54
> answer
ReferenceError: answer is not defined
```

---
# области на видимост
### `var`

Всяка функция има собствена област на видимост. Всяка променлива **декларирана** в тялото на една функция е видима само по време на текущото изпълнение на функцията.

* декларация на `a`:
  * `var a;`
  * `var a = 5;`
* дефиниция/присвояване на стойност на `a`:
  * `a = 5;`
  * `a += '';`

---
# области на видимост

Когато се опитаме да достъпим променлива в дадена функция търсенето на дефиницията се извърша навън през обграждащите я области на видимост.

```javascript
function middleScope() {
  var scopedInTheMiddle = 42;
  console.log(1, scopedInTheMiddle);

  function innerScope() {
    console.log(2, scopedInTheMiddle);
    scopedInTheMiddle = 120;
  }

  console.log(3, scopedInTheMiddle);
  innerScope();
  console.log(4, scopedInTheMiddle);
}

middleScope()
```

--

```
1 42
3 42
2 42
4 120
```

---
# области на видимост

Последното ниво на видимост е глабалното, т.е. имената, които са атрибути на `globals` обекта.

Ако името не бъде намерено и там получаваме `ReferenceError`. (4 слайда назад)


---
# области на видимост

При присвояване на стойност обаче поведението е друго.

```javascript
> typeof a
'undefined'
> function mazalo() {
... a = 13;
... }
undefined
> typeof a
'undefined'
> mazalo()
undefined
> typeof a
'number'
> a
13
```

---
# области на видимост

```javascript
> typeof a
'undefined'
> function mazalo() {
... console.log(1, typeof a);
... a = 13;
... console.log(2, typeof a);
... }
undefined
> typeof a
'undefined'
> mazalo()
1 'undefined'
2 'number'
undefined
> typeof a
'number'
> a
13
```


---
# closures

Това поведение има и добри страни, ако бъде използвано разумно.

```javascript
> function makeAdder(a) {
... return function (b) {
..... return a + b;
..... };
... }
undefined
> makeAdder(4)
[Function]
> makeAdder(4)(3)
7

```

---
# closures
.left-column[
![](img/great-power.png)
]
.right-column[
```javascript
function makeAdder(a) {
  return [function (b) {
    return a + b;
  },
  function (distort) {
    a += distort;
  }];
}

```

```javascript
> var functions = makeAdder(3)
undefined
> var adder = functions[0]
undefined
> adder(4)
7
> var distorter = functions[1]
undefined
> distorter(5)
undefined
> adder(4)
12
```
]

---
# function definition vs. function expressions
--

function definition
```javascript
function superPandaFunction() {
  …
}
```
--

function expression
```javascript
var superPandaFunction = function() {
  …
};
```
--

function expression
```javascript
var superPandaFunction = function superPandaFunction () {
  …
};
```

---
# function expression `name`

```javascript
> var superPandaFunction = function superUnicornFunction () {
...   …
... };
```
--

```javascript
> superPandaFunction
[Function: superUnicornFunction]
```
--

```javascript
> superPandaFunction.name
'superUnicornFunction'
```
--

```javascript
> superUnicornFunction
ReferenceError: superUnicornFunction is not defined
```

---
# hoisting
### function definitions

Всяка функция, дефинирана с function definition е видима в целия scope, в който е дефинирана.

```javascript
function hoistingExample() {
  var a = returnStuff();
  console.log(a);

  function returnStuff() {
    return 'stuff';
  }
}
```

```javascript
> hoistingExample();
stuff
```

---
# hoisting 
### name declarations

```javascript
var thing = 5;

function tryToMessWithGlobals() {
    console.log(1, thing);

    // хм. този thing не е горния!
    thing = 15;

    // дефиницията отива в началото на closure-a !!!
    var thing;

    console.log(2, thing);
}

console.log(3, thing)
tryToMessWithGlobals();
console.log(4, thing)
```

```javascript
3 5
1 undefined
2 15
4 5
```

---
# hoisting
### function expressions (a bit tricky)

```javascript
function hoistExpression() {
  console.log(five);
  console.log(five());
  var five = function () {
    return 5;
  }
}
```

```
> hoistExpression()
undefined
TypeError: undefined is not a function
...
```

* защо става така ?!
* function expressions не създават имена, а function обекти
* function definitions отиват в началото на видимостта

---
# hoisting
### function expressions (a bit tricky)

```javascript
function hoistExpression() {
  console.log(five());
}
```

```
> hoistExpression()
ReferenceError: five is not defined
```

---

# анонимен scope

```javascript

(function() { 
  var notglobal = 'something';
  this.global = 'explicit global setting';
})();

```

* избягвайте да пишете по global-ния scope/context.
* можете да използвате анонимна функция за целта
* ...или анонимен обект с някакъв метод


---

# промени по глобалния scope

* използвайте (1) global или window
* правете го явно - въвеждайте имена през (1)
* анонимните функции могат да 'мажат' през this

---

# свързване на променливите (още)

```javascript

for ( var d = 0; d < 3; d++ ) (function(d){
 setTimeout(function(){
   console.log( "Value of d: ", d );
   assert( d == d, "Check the value of d." );
 }, d * 200);
})(d);

```

* предаването на параметър става по стойност

(ref: http://ejohn.org/apps/learn/#59)
