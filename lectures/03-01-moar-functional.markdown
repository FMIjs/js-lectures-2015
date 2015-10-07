# bind
`bind` „забранява“ сменянето на `this`

```javascript
var getThisValue = function () {
  return this.value;
};
var thing = { value: 42 },
    otherThing = { value: 73 };
```

```javascript
> getThisValue.bind(thing)();
42
> getThisValue.bind(thing).call(otherThing)
42
```

---

# Функционални забавления

В javascript липсват някои дребни удобства, които идват „безплатно“ в повечето други популярни езици. Пример за това е `range`. В много езици има възможност код като `range(10, 45)` да създаде обект, който да представлява нещо итеруемо, обхождащо стойностите от 10 до 45. Същото можем да постигнем с прости функционални похвати и в javascript:

```javascript
function range(start, end, stopIteration) {
  return function () {
    if (start > end) {
      return stopIteration;
    } else {
      return start++;
    }
  }
}
```

---

След това можем да използваме `range` функцията по следния начин:

```javascript
var stopIteration = {},
    next = range(42, 73, stopIteration),
    item;

while((item = next()) !== stopIteration) {
    console.log(item);
}
```

---

# `===` и `!==`

`===` и `!==` са **строги** проверки. Това ще рече, че за стойности от тип `string` и `number` не се прави type coercion.

* `5 === '5'` се оценява до `false`
* `6 !== '6'` се оценява до `true`.
* в javascript няма предефиниране на оператори, така че `{} == {}` винаги ще бъде `false`, тъй като това са два различни обекта.
* но поради имплицитния type coercion `{} == '[object Object]'` се оценява до `true`

⇨ правим проверката с `!==`, а не с `!=`

---

# алтернативи

* вместо проверка за `stopIteration` да „хвърлим“ грешка
* да получим тялото на цикъла като функция

```javascript
function range(start, end, stopIteration) {
  return function () {
    if (start > end) {
      throw new Error('RANGE OVER');
    } else {
      return start++;
    }
  }
}
```

Обаче:
* все още не знаем какво точно е `Error`
* поведението му може да ни изненада неприятно
* в javascript „хвърлянето“ на грешки не е на почит, защото не се държи възпитано при асинхронен код

---

# задачка
### `function iterator(array, stopIteration)`

Прави същото като `range`, но обхождайки подадения **Array-like** обект.

`function iterator(array, stopIteration)`, която прави същото като `range`, но обхождайки подадения **Array-like** обект.

---

# задачка
### `rangeMap`


```javascript
> var doubled = rangeMap(1, 3, function (item) { return item + item });
> console.log(doubled)
[2, 4, 6]
```
Алтернативна имплементация на `range`, която не очаква `stopIteration` обект, а се държи като `map`, очаквайки функция, която да изпълни върху всички елементи.
