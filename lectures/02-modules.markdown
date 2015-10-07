# js @ фми

---

# modules(в кратце)

Разделяме кода в отделни файлове с цел по-добра изолация на отделните парчета от програмата ни.

Получаваме по-лесен за поддръжка код, с по-лесно подменими компоненти(стига да се постараем да спазваме консистентни интерфейси между отделните парчета).

---

# require

Вградена функция в nodejs, с която „поискваме“ модули.

```javascript
  var fs = require('fs');
```

Получаваме обект, отговарящ на модула, който сме `require`-нали.

---

# module.exports

Във всеки файл, който изпълняваме с node имаме достъп до `module` обекта. Това е обект, чрез който можем да достъпваме функционалност свързана с текущия модул.

След време ще си поговорим по-подробно за това, за сега **don't overthink it!**

---
# домашни/задачки

Обещахме!

Като добри хора ще <small><small><small><small>(се постараем много сериозно да)</small></small></small></small> спазим обещанието си.

---
# домашни/задачки

В тоя ред на мисли всяко домашно, което предавате ще трябва да спазва някаква форма.

```javascript
module.exports = {
  fib: function (n) {
    …
  },
  …
}
```

Така си гарантираме, че имаме хубав интерфейс, през който да тестваме решенията ви.

---
# домашни/задачки

[В github (ще) има задачка]().

Живейте с мисълта, че имате срок до следващия петък.

Скоро ще се появи обяснение как да предавате решенията си.

---
# но първо

---
# list quirks

## `for … in …`

Най-вероятно не прави това, което очаквате. Ако знаехте какво точно прави, по-скоро бихте го избягвали.

---
# list quirks

## `for … in …`

### python
```python
a = ['brie', 42, 'bacon', 'cheddar', []]
for thing in a:
    print thing

brie
42
bacon
cheddar
[]
```

---
# list quirks

## `for … in …`

### javascript
```javascript
var a = ['brie', 42, 'bacon', 'cheddar', []]
for (thing in a) {
  console.log(thing);
}

0
1
2
3
4
```

---
# list quirks

## `for … in …`

### javascript
```javascript
var a = ['brie', 42, 'bacon', 'cheddar', []]
for (thing in a) {
  console.log(a[thing]);
}
brie
42
bacon
cheddar
[]
```

---
# list quirks

## `for … in …`

### javascript
```javascript
var a = ['brie', 42, 'bacon', 'cheddar', []]
a.foo = 'bar'
for (thing in a) {
  console.log(a[thing]);
}
brie
42
bacon
cheddar
[]
bar
```

---
# list quirks
## `for … in …`

[В MDN пише ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in):
> …
>
> A for...in loop iterates over the properties of an object in an arbitrary order
>
> …

---
# list quirks
## `for … in …`

За да сте информирани казваме изрично:

Списъци се обхождат **винаги и само** с `forEach`.

---
# list quirks
## `in`

Същия аналог

### python
```python
> a = [4, 5, 42, 'chunky']
> 'chunky' in a
True
```

### javascript
```javascript
> var a = [4, 5, 42, 'chunky']
> 'chunky' in a
false
```

---
# list quirks
## `in`

Проверка дали нещо принадлежи на списък се прави с `indexOf`.

```javascript
var a = [4, 5, 42, 'chunky']
a.indexOf('chunky') > -1
true
```

---
# list quirks

`Array` в javascript не е свързан списък, или последователни „клетки“ от паметта, или друга структура, която се използва често за представяне на масиви/списъци.

`Array` е „javascript обект“, което означава, че се държи по-скоро като dict/Hash/HashMap/etc. от колкото като линейна или свързана структура.

---
# `global`

Обекта, в който се пазят всички глобални имена за текущия процес.

---
# `typeof`

Задължителното „ако идвате от php“
