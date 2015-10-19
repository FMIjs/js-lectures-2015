1. Направете функция която която приема произволен брой аргументи и връща сумата от квадратите на нечетните аргументи.

```javascript
sumSquaresOfOddArgs(1, 2, 3, 4, 5, 6)
> 35
```

2. Направете функция sum която взима като аргументи 2 числа но при подадено само едно връща нова функция (взимаща 1) която ще сумира с първия аргумент.

```javascript
var partialSum = sum(5);
partialSum
> [Function]

partialSum(10)
> 15

sum(5)(2)
> 7
```

3. Направете функция curry взимаща друга функция (а) като аргумент и връща а със способност да и се подават частично аргументи

```javascript
var curried = curry(function (a, b, c, d) {
  return a + b + c;
});

curried(6, 6);
> [Function]


curried(6, 6)(6, 6);
> 18

```

4. Направете функция sequence която взима като аргументи произволен брой функции и връща нова функция която прилага всички тези функции върху своя аргумент.

```javascript
  var number = sequence()
  var toNumber = sequence(parseFloat, Math.round);

  // първо прилага parseFloat а после Math.round
  toNumber('66.7')
  > 67
```

5. Направете функция compose която работи като sequence но изпълнява аргументите (функциите) в обратен ред.

```javascript
  var number = compose(Math.round, parseFloat);
  number(66.6)
  > 67

```

6. Направете функция cons (двойка) която взима като аргументи два елемента.cons връща функция която взима като аргумент функция която се изпълнява върху двойката а и b.

```javascript
cons(a, b)
> [Function]
```
7. Направете функция car(глава) която взима като аргумент вече създадена двойка от cons, прилагайки му функция която връща първия елемент на двойката (а).

```javascript
  var pair = cons(7, 8);
  car(pair)
  > 7
```

8. Направете функция cdr(опашка) която взима като аргумент вече създадена двойка(cons) и му прилага функция която връща втория елемент на двойката (b).

```javascript
  var list = cons(7, cons(8, 9));
  var tail = cdr(list)
  tail
  > [Function]
  cdr(tail)
  > 9
```

9. Направете функция forEach която взима аргументи списък от двойки и функция която да се изпълни върху всеки елемент от списъка.

```javascript
  var log = console.log.bind(console);
  var list = cons(1, cons(2, cons(3, cons(4, 5))));
  forEach(list, log);

  > 1
  2
  3
  4
  5
```

10. Направете функция map която взима като аргументи свързан списък от двойки и функция f.
map връща нов списък като на всеки елемент има приложена функцията f.

```javascript
  var list = cons(1, cons(2, cons(3, cons(4, 5))));
  var mapped = map(list, function (el) {
    return el * el;
  });

  forEach(mapped, log);
  > 1
  4
  9
  16
  25 
```


11. Направете функция filter която взима като аргументи списък от двойки и предикатна функция и връща нов списък само с елементите за които тази предикатна функция връща true.

```javascript
  var list = cons(1, cons(2, cons(3, cons(4, 5))));
  var filtered = filter(list, function (e) {
    return e % 2 === 0;
  });

  forEach(filtered, log);
  > 2
  4
```

12. Направете функция reduce която взима като аргументи списък от двойки, функция на два аргумента и първоначална стойност. Функцията която е като втори аргумент акумулира всички елементи върху началната стойност

```javascript
  var list = cons(1, cons(2, cons(3, cons(4, 5))));

  var sum = reduce(list, function (accumulation, current) {
    return accumulation + current;
  }, 0);

  sum
  > 15

  var product = reduce(list, function (accum, curr) {
    return accum * curr;
  }, 1);
  
  product
  > 121
```