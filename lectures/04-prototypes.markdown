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
* и др...

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

* true, false
```javascript
true.toString(); // -> "true"
```
* 'foo', 'bar', "baz"
```javascript
'foo'.split(''); // -> ["f","o","o"]
```
С изключение на:
* 1, 2, 3...
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
# Какво представляват прототипите в Javascript
***
* В Javascript прототипът представлява обект със специална роля.

* Може да си мислим за него като родител на друг обект, а ролята на родителите е да дават свойства на децата си.

---
## Вътрешно property - [[Prototype]]

<br><br>
* Всеки обект в Javascript има вътрешно свойство [[Prototype]], което е невидимо.

* То e референция или към друг обект или към null.

---
#Пример


<center> <img src='../html/img/prototype.png'> </center>

* a няма прототип
* а е прототип за b
* a и b формират прототипна верига (prototype chain)

```javascript
a.[[Prototype]] // -> null
b.[[Prototype]] // -> a
```
---

# Делегиране

Когато се създаде референция към свойство на даден обект интерпретаторът първо търси това свойство в самия обект и ако то бъде намерено се връща като резултат.

```javascript
var obj = { val: 10 };
obj.val // -> 10
```

Ако свойстното не бъде отрикто се проверява в прототипа на обекта.

```javascript
var parent = { val: 20 };
var child = { otherVal: 30 };

Object.setPrototypeOf(child, parent); //not good!

child.val // -> 20
child.otherVal // -> 30
```
---
# Присвояване на [[Prototype]]

* Всяка функция има свойството prototype, което е празен обект. (то е различно от [[Prototype]] !!!)

* Когато функция се използа като конструктор, стойността на вътрешното свойство [[Prototype]] на новосъздадения обект се сетва на стойността на prototype на функцията

---
# Пример

```javascript
var A = function () {};
A.prototype        // => {}

var a1 = new A();  // Извикваме А като конструктор.
a1.[[Prototype]]   // -> A.prototype

var a2 = new A();
a2.[[Prototype]]   // -> A.prototype

```
<br><br>
<center><img src='../html/img/assignment.png'></center>

---
# Нека добавим свойства към тези обекти

```javascript
var A = function() {};
A.p1 = 'A-1';
A.p4 = 'A-4';

A.prototype.p1 = 'A-P-1';
A.prototype.p3 = 'A-P-3';

var a1 = new A();
a1.p1 = 'a1-1';

var a2 = new A();
a2.p2 = 'a2-2';
```
---

<center><img src='../html/img/assignment-example.png'></center>

```javascript
A.p1   // => 'A-1'
A.p2   // => undefined
A.p3   // => undefined
A.p4   // => 'A-4'

A.prototype.p1  // => 'A-P-1'
A.prototype.p2  // => undefined
A.prototype.p3  // => 'A-P-3'
A.prototype.p4  // => undefined

a1.p1  // => 'a1-1'
a1.p2  // => undefined
a1.p3  // => 'A-P-3'
a1.p4  // => undefined

a2.p1  // => 'A-P-1'
a2.p2  // => 'a2-2'
a2.p3  // => 'A-P-3'
a2.p4  // => undefined
```
---
<center><img src="../html/img/all-objects.png"></center>
---
# Как да достъпим вътрешното [[Prototype]]

```javascript
var A = function() {};
var a = new A();

Object.getPrototypeOf(a) === A.prototype  // => true

a.__proto__ === A.prototype  // => true
```
---
### Друг по-добър начин за наследяване

```javascript

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

```javascript
Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
};

newObject = Object.create(oldObject);
```
---
# Polyfill за Object.create

* Object.create не се поддържа в IE6-8
* Може лесно да се 'запълни' пропуска
* ...или чрез es5-shim

(ref: https://github.com/es-shims/es5-shim)

---
####Parasitic Inheritance

```javascript
var MyClass = function(arg1, arg2){
    return {
        log: function(){
            return "this is my class log function";
        },
        privateVar1: function(){
            return arg1;
        },
        privateVar2: function(){
            return arg2;
        },
        toString: function(){
            return arg1 + ',' + arg2;
        }
    };
};

var MyOtherClass = function(arg1, arg2, arg3){
    var that = MyClass(arg1, arg2);
    var super_toString = that.toString;

    that.otherLog = function(){
        return "This is my other class log function";
    };

    that.toString = function(){
        return super_toString() + ',' + arg3;
    };
    return that;
};
```

---

###Prototypal Inheritance
```javascript
var point = {
    x: 0,
    y: 0
};

var cPoint = Object.create(point);
cPoint.x = 10;
cPoint.y = 20;

var point3d = Object.create(point);
point3d.z = 30;

```
---

###Prototypal Inheritance
```javascript

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

###Singleton class
```javascript
var singleton = (function(x, y){
    return {
        x: x,
        y: y,
        toString: function(){
            return x + ',' + y;
        }
    };
})(1,2);
```
---
<br><br><br>
<br><br><br>
<br><br><br>
<center><h3>Дълбоките йерархии не са добри!</h3></center>

---
### Oпрератора new

* new няма нищо общо с new в C#, C++, PHP ...

* new извиква дадена функция с контекст (this), нов обект, който ще бъде върнат от функцията, след като тялото и бъде изпълнено.

```javascript

function Person(foo) {
  this.name = 42;
  this.bar = foo;
}

var p = new Person('baz');
p.name === 42;
p.bar  === 'baz';

```
##### Не е нужно явно (explicit) връщане на дадения контекст! При извикване на функция с new, оператор return е безсмислен!
---
<br><br><br>
<br><br><br>
###Какво ще се случи ако извикаме функцията без оператора new?

---

###"Замърсяваме" глобалния контекст (window в browser)
```javascript

function Person(foo) {
  this.name = 42;
  this.bar = foo;
}

var p = Person('baz');
p.name === 42; //false
p.bar  === 'baz'; //false

window.name === 42; //true
window.bar  === 'baz'; //true

```
---

###За да сме сигурни, че не лиспва new:

```javascript
function User(first, last){
  if (!(this instanceof User))
    return new User(first, last);

  this.name = first + " " + last;
}

var name = "Resig";
var user = User("John", name);

assert( user, "This was defined correctly, even if it was by mistake." );
assert( name == "Resig", "The right name was maintained." );
```
---
#Конструкторите в JS са излишни?

```javascript
var myPrototype = {
  methodA: function methodA() {},
  methodB: function methodB() {},
  methodC: function methodC() {}
};

var createFoo = function createFoo() {
  return (Object.create(myPrototype));
};
```

* Можем да създаваме нови обекти с Object.create

* Спасяваме се от доста 'new' бъгове

* Спираме да си мислим за JS като за Java

* Създаваме по-добра предпоставка за полиморфизъм

* Лесно можем да въведем Factory шаблон

(ref: http://ericleads.com/2012/09/stop-using-constructor-functions-in-javascript/)
---

###Mixins

####Нека да разгледаме един JS обект
```javascript
var sam = {
  firstName: 'Sam',
  lastName: 'Lowry',
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
  rename: function (first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
}
```
---
####Можем да разделим домейна от поведението
```javascript
var sam = {
  firstName: 'Sam',
  lastName: 'Lowry'
};

var person = {
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
  rename: function (first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
};
```

* Person обека се явява като темплейт
---
#####Използване на extend за миксване на поведение

```javascript
var __slice = [].slice;

function extend () {
  var consumer = arguments[0],
      providers = __slice.call(arguments, 1),
      key,
      i,
      provider;

  for (i = 0; i < providers.length; ++i) {
    provider = providers[i];
    for (key in provider) {
      if (provider.hasOwnProperty(key)) {
        consumer[key] = provider[key];
      };
    };
  };
  return consumer;
};

var sam = {
  firstName: 'Sam',
  lastName: 'Peckinpah'
};

extend(sam, person);

sam.rename
  //=> [Function]

```
---
###Можем да добавим още поведение

```javascript
var hasCareer = {
  career: function () {
    return this.chosenCareer;
  },
  setCareer: function (career) {
    this.chosenCareer = career;
    return this;
  }
};

extend(sam, hasCareer);
sam.setCareer('Director');
```
---
<br><br><br>
<br><br><br>
####Използването на темплейти ни позволява да не копираме функцийте, които използваме всеки път.

####Всеки път когато създадем обект по този начин той получава референция към функициите от темплейта.
---
# Видове Mixins

- Deep copy
- Shallow copy

---

# Mixins - deep copy

```javascript
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

# Mixins - shallow copy

```javascript
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