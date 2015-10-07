# Objects, functions as objects

---

# ООП

* Абстракция
* Наследяване
* Полиморфизъм
* Енкапсулация

---

# Абстракция (1)

```text
Абстракция (от латински abstractio - отвлечен) е процес или израз означаващ
някакво отвлечено, ирационално понятие или фикция. В този смисъл
абстракциите са малко или много нереална, отдалечена представа за
действителността. Въпреки това обаче те са особена форма за опознаване
на тази действителност.
```

---

# Абстракция (2)

Абстракцията ни позволява да пренебрегнем имплементационни детайли,
давайки ни възможност да използваме API (например) от по-високо ниво.

Пример:
* Примитивните типове в C++
* Обектите, в кой да е ОО език
* Слоеве в OSI
* etc...

---

# Абстракция (3)

```javascript
function Person(age, name) {
  this.age = age;
  this.name = name;
}
```

---

# Абстракция (4)

Кой design pattern ни позволява да се абстрахираме от сложна система и
да използваме само прост интерфейс към нея?

---

# Абстракция (5)

Не, не е абстрактна фабрика - Фасада (Façade).

![](/img/facade.svg)

---

# Наследяване (1)

Използва се с цел преизползване на код и ни помага да се
възползваме "динамичното свързване".

---

# Наследяване (2)

```java
public class Person {
  private int age;
  private String name;
  public int getAge() {
    return age;
  }
  public void setAge(int age) {
    this.age = age;
  }
  public void talk() {
    System.out.println("I'm a person");
  }
}

public class Developer extends Person {
  private String[] languages;
  @Override
  public void talk() {
    System.out.println("I'm a developer");
  }
}
```

---

# Наследяване (3)

Наследяването НЕ ВИНАГИ е най-добрият вариант! Наследяването създава много
силен coupling /свързаност/ между класовете, които образуват
веригата на наследяването. В повечето случаи композиция е достатъчна.

---

# Полиморфизъм (1)

Позволява различно поведение при извикването на един и същи метод в
зависимост от типа на обекта, който приема извикването на метода.

---

# Полиморфизъм (2)

```java
public class Main {
  public static void main(String[] args) {
    Person p = new Developer();
    p.talk(); //I'm a developer
  }
}
```

---

# Енкапсулация (1)

* Техника, която ни позволява да намалим зависимостите между различните модули,
дефинирайки сктриктни външни интерфейси. Тези външни интерфейси служат като
"договор" между клиентите на модулите и самите модули.

* Всеки обект има добре дефиниран интерфейс, който определя поведението на модула
и е независим от конкретната имплементация.

* [C2](http://c2.com/cgi/wiki?ObjectOriented)

---

# Енкапсулация (2)

Това предразполага към идеята, че езика, в който програмираме трябва да
присъстват ключови думи/модификатори за достъп като "private", "public",
"protected", тъй като енкапсулация се постига с data hiding.

---

# Енкапсулация (3)

```text
Abstraction and encapsulation are complementary concepts: abstraction
focuses on the observable behavior of an object... encapsulation focuses
upon the implementation that gives rise to this behavior...

          Grady Booch
```

---

# How what about JavaScript?

---

# Почти всичко в JavaScript е обект

С изключение на:

* 1, 2, 3...
* true, false
* 'foo', 'bar', "baz"
* null
* undefined

```javascript
1.toString();
//Uncaught SyntaxError: Unexpected token ILLEGAL
```

---

# Можем да ги представим като обект...

```javascript
(1).toString(); //'1'

var answer = 42;
answer.toString(); //'42'

var foo = null;
foo.toString();
//TypeError: Cannot read property 'toString' of null
```

---

# В JavaScript няма класове, но има обекти...

=> JavaScript не е обектно-ориентиран?

---

# ООП

```text
Object-oriented programming (OOP) is a programming paradigm that represents
the concept of "objects" that have data fields (attributes that describe
the object) and associated procedures known as methods.
```

не се споменава понятието клас => JavaScript е обектно-ориентиран?


---

* Абстракция
* Енкапсулация
* Наследяване
* Полиморфизъм

Са основни характеристики на език за обектно-ориентирано програмиране.
=> Ако език за програмиране притежава тези характеристики е ОО?

---

# Objet literal синтаксис

```JavaScript
var obj = {};
obj.name = 'foo';
obj.getName = function () {
  return this.name;
};

obj.getName(); //'foo'

var obj = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

obj.getName(); //'foo'
```

---

# Прототипно наследяване

Характерно за езици като:

* Self
* Io
* ...JavaScript

---

# Прототипно наследяване

```JavaScript
var parent = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

var child = {
  age: 42,
  getAge: function () {
    return this.age;
  }
};

Object.setPrototypeOf(child, parent);
```

---

# Мислете за структура подобна на свързан списък

```text

+--------+    +-------+
|   C1   |    |   C2  |
+--------+    +-------+
| proto  |    | proto |
+--------+-+--+-------+
           |
           |
       +---v----+
       |   C0   |
       +--------+
       | proto  |
       +---+----+
           |
           |
       +---v----+
       |    P   |
       +--------+
       | proto  |
       +--------+
```
---
# Можем да пресъздадем горния пример и като:

```JavaScript
var parent = {
  name: 'foo',
  getName: function () {
    return this.name;
  }
};

var child = Object.create(parent);
child.age = 42;
child.getAge = function () {
  return this.age;
};
```

---

# В REPL пример с Object.create

```JavaScript

> a = { try : 'eet' }
{ try: 'eet' }
> b = Object.create(a);
{}
> a.magic = 'tricks';
'tricks'
> a
{ try: 'eet', magic: 'tricks' }
> b
{}
> b.magic
'tricks'
>

```

---

# "Класове"

Класът е шаблон, по който можем да създадем обектни, които да
притежават специфични характеристики.

В JavaScript имаме функции:

```JavaScript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

function Developer(age, name) {
  Person.call(this, name);
  this.age = age;
}

Developer.prototype = Object.create(Person.prototype);

Developer.prototype.getAge = function () {
  return this.age;
};

var dev = new Developer(42, 'foo');
```

---

# Какво ново видяхме в примера от предишния слайд:

* Оператора `new`
* Изпокзвайки полета (properties) и методи на функции
* Използваме метод call към обекта функция, за да укажем
  контекст (this), в който се извиква функцията

---

# Операторът new

Операторът `new` няма НИЩО (почти) общо с това, което той означава
в езици, в които сте свикнали да го виждате (Java, C#, PHP, C++...).

new извиква дадена функция с контекст (`this`), нов обект, който
ще бъде върнат от функцията, след като тялото и бъде изпълнено.

```JavaScript
function Person(foo) {
  this.name = 42;
  this.bar = foo;
}

var p = new Person('baz');
p.name === 42;
p.bar  === 'baz';
```
**Не е нужно явно (explicit) връщане на дадения контекст!**
**При извикване на функция с new, оператор return е безсмислен!**

---

# ами ако извикаме функцията без new?

```JavaScript
function katana(){ 
  this.isSharp = true; 
} 
katana(); 
assert( isSharp === true,
  "A global object now exists with that name and value." ); 
 
var shuriken = { 
  toss: function(){ 
    this.isSharp = true; 
  } 
}; 
shuriken.toss(); 
assert( shuriken.isSharp === true,
  "When it's an object property, the value is set within the object." );

```

...най-общо казано ще 'замърсим' контекста на извикващата функция.

(ref: http://ejohn.org/apps/learn/#24)

---

# за да сме сигурни, че не лиспва new

```JavaScript

function User(first, last){ 
  if ( !(this instanceof arguments.callee) ) 
    return new User(first, last); 
   
  this.name = first + " " + last; 
} 
 
var name = "Resig"; 
var user = User("John", name); 

assert( user, "This was defined correctly, even if it was by mistake." ); 
assert( name == "Resig", "The right name was maintained." );
 
```

(ref: http://ejohn.org/apps/learn/#38)

---

# Смяна на контекста (1)

```JavaScript
var foo = {
  bar: function () {
    return this;
  }
};

foo.bar() === foo // true

var foobar = foo.bar;

foobar() === foo // false
foobar() === window // false

foobar.call(foo) === foo // true
```

---

# Смяна на контекста (2)

* `apply(thisVal, [params...])` - извиква функция
* `call(thisVal, param1, param2, param3,...)` - извиква функция
* `bind(newThis, param1, param2,...)` - **създава** нова функция

```JavaScript
var foo = {
  bar: function () {
    return this;
  }.bind(document)
};

foo.bar() === document // true

function baz(bar, foo) {
  console.log(this, bar, foo);
}
var temp = baz.bind(foo, 42);

baz === temp // false

baz = temp;
baz(1.618); // foo, 42, 1.618
```
---

# Малко повече за bind...

```
function foo(a, b, c) {
  return a + b + c;
}

var bar = foo.bind(this, 1, 2);
bar = bar(3); //6
```

* тоест функцията bar ще бъде винаги в конкретен контекст
* и ще получава винаги първите два параметъра тично определени

---

# Всяка функция притежава поле prototype

<h3> Полето prototype задава прототип на всички обекти създадени
посредством извикване на дадената функция с оператора `new`. </h3>

---

# Нека разгледаме примера по-подробно...

```JavaScript
// Дефинира конструкторна функция
function Person(name) {
  // Добавя property name към всеки обект създаден
  // чрез извикване на Person с оператора new
  this.name = name;
}

// По подразбиране Person.prototype е обект
// Добавяме метод getName към този обект, което означава,
// че всеки обект създаден чрез извикване на Person с new
// ще притежава метод getName в своя прототип.
Person.prototype.getName = function () {
  return this.name;
};
```

---

```JavaScript
function Developer(age, name) {
  // Извиква функцията Person с контекст (this)
  // обектът, който ще бъде върнат от тази функция след
  // извикването и с new. Това ще добави полето name
  // на обектът, който ще бъде върнат от Developer
  Person.call(this, name);
  this.age = age;
}

// Задава прототип на всички обекти създадени посредством
// извикване на Developer с new. Прототипът ще бъде
// обект, чиито прототип е прототипът на обектите създадени чрез
// извикване на Person с new.
Developer.prototype = Object.create(Person.prototype);
```

---

# `__proto__` vs `Constructor.prototype`

---

```javascript
function Developer() {}

Developer.prototype = { foo: 42 };

var d = new Developer();
d.__proto__ === Developer.prototype;
var d2 = new Developer();
d2.__proto__.foo += 1;

console.log(d.foo); // 43
console.log(Object.keys(d)); // []

d.foo = 50;
d2.__proto__.foo += 1;
console.log(d.foo); // 50
console.log(Object.keys(d)); // ['foo']

```

* през всеки обект имаме достъп до прототипа, чрез __proto__
* при първото задаване на стойност за дадено property се създава такова 'конкретно' за обекта и вече се ползва само то
* при инстанциране на обекта той де факто няма property-та и Object.keys връща празен списък, но имена които могат да се открият в прототипа се дават като property-та.

```
---

# А как да заменим прототипа?

---
```javascript
Object.setPrototypeOf(d, {
  age: 42
});

Object.getPrototypeOf(d) === d.__proto__
```
---

# Визуално обяснениe

![](img/javascript-objects-treasure-map.png)

---

# Обект наследяващ от конструкторна функция

```JavaScript
var awesomeEventHandler = {};
EventEmitter.call(awesomeEventHandler);
Object.setPrototypeOf(awesomeEventHandler, EventEmitter.prototype);

awesomeEventHandler.on('event', function () {
  console.log('Callback!');
});
awesomeEventHandler.trigger('event');
```

---

![](img/crockford.png)

---

# Проблемът при използване на прототипи

```JavaScript
var sibling1, sibling2;

inherit(sibling1, parent);
inherit(sibling2, parent);

Object.getPrototypeOf(sibling1).prop = 42;
console.log(sibling1.prop); //42

Object.getPrototypeOf(sibling2).prop = 43;
console.log(sibling1.prop); //43
```
---

# Mixins

```JavaScript
var awesomeFunctionality = {
  foo: 42,
  saySomething: function () {
    return 'I\'m awesome code!';
  }
};

var simpleToBecomeAwesomeObject = {
  say: function () {
    return 'I\'m modest object';
  }
};

extend(simpleToBecomeAwesomeObject, awesomeFunctionality);
```

---

# Mixins

- Deep copy
- Shallow copy

---

# Mixins - deep copy

```JavaScript
var awesomeFunctionality = {
  baz: 1.618,
  foo: {
    bar: 42
  },
};

var sibling1 = {},
    sibling2 = {};

deepCopy(sibling1, awesomeFunctionality);
deepCopy(sibling2, awesomeFunctionality);
sibling1.foo.bar = 13;
console.log(sibling1.foo.bar); //13
console.log(sibling2.foo.bar); //42
```

---

# Mixins - deep copy

```JavaScript
var awesomeFunctionality = {
  baz: 1.618,
  foo: {
    bar: 42
  },
};

var sibling1 = {},
    sibling2 = {};

shallowCopy(sibling1, awesomeFunctionality);
shallowCopy(sibling2, awesomeFunctionality);
sibling1.foo.bar = 13;
console.log(sibling1.foo.bar); //13
console.log(sibling2.foo.bar); //13
```

---

# Конструкторите в JS са излишни ?

``` JavaScript
var myPrototype = {
  methodA: function methodA() {},
  methodB: function methodB() {},
  methodC: function methodC() {}
};
 
var createFoo = function createFoo() {
  return (Object.create(myPrototype));
};
```

* можем да създаваме нови обекти с `Object.create`
* спасяваме се от доста 'new' бъгове
* спираме да си мислим за JS като за Java
* създаваме по-добра предпоставка за полиморфизъм
* лесно можем да въведем Factory шаблон

(ref: http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/)

---

# Polyfill за Object.create

* Object.create не се поддържа в IE6-8
* може лесно да се 'запълни' пропуска
* ... или чрез es5-shim

(ref: https://github.com/es-shims/es5-shim)

---

# How about privacy?

---

# Module pattern

```JavaScript
var Page = (function () {

  var title;

  return {
    setTitle: function (t) {
      document.title = t;
      title = t;
    },
    getTitle: function () {
      return title;
    }
  };
}());
```

---

# Revealing Module Pattern

```
var Page = (function () {

  var title;

  function setTitle(t) {
    document.title = t;
    title = t;
  }

  function getTitle() {
    return title;
  }

  return {
    setTitle: setTitle,
    getTitle: getTitle
  };
}());
```
---
