# Съдържание

* DOM
* DOM vs HTML
* Типове данни
* Селектиране на елементи
* Добавяне на събития
  * addEventListener
    * eventObject
    * bubbling
    * capturing
  * on.\*
* Премахване на събития
* Memory leaks при обработката на събития
---

# Document Object Model

API за работа с HTML и XML

Можем да си мислим за HTML като за сериализирана версия на DOM.

---

# DOM, типове елементи

- `document` - коренът на DOM дървото
- `Element` - елемент в DOM дървото, който има дъщерни елементи
- `NodeList` - списък с DOM обекти, които могат да бъдат както елементи, така и `text`
- `Text` - DOM обект, който съдържа само текст, не можа да съдържа елементи

---

## Достъп до елементи в DOM дървото

- `document.createElement(tag_name)` - създава нов елемент
- `element.childNodes` - достъп до всички дъщерни елементи на даден елемент
  - върнатият резултат е от тип `NodeList`, не е масив
- `element.children` - връща всички дъщерни елементи от тип `Element`
- `element.appendChild(child)` - добавя дъщерен елемент на даден елемент
- `element.removeChild(child)` - изтрива дъщерен елемент от даден елемент

---

# Атрибути vs полета

в HTML можем да зададем атрибути на различните елементи:

```html
<input type="checkbox" id="foo">
```

След като браузърът обработи HTML ще създаде `HTMLInputElement`, който ще има различни полета:

- checked
- type
- disabled
- value
- ...

---

# Работа с атрибути

- `element.setAttribute(attr_name, value)`
- `element.getAttribute(attr_name)`
- `element.removeAttribute(attr_name)`

---

# Селектиране на елементи

- `document.getElementById(id)` - селектира елемент по уникален идентификатор
- `element.getElementsByTagName(tag_name)` - селектира елементи по име на таг
- `element.getElementsByClassName(class_name)` - селектира елементи по име на клас
- `element.querySelectorAll(selector)` - селектира всички елементи, които отговарят на зададения селектор
- `element.querySelector(selector)` - селектира първият елемент, които отговаря на зададения селектор

---

# CSS селектори

- `element` - селектира всички елементи с име `element`
- `#element-id` - селектира елемента с идентификатор `element-id`
- `.class-name` - селектира всички елемент, които използват клас с име `class-name`
- `[attribute="value"]` - селектира всички елементи, които имат атрибут `attribute` със стойност `value`
- `parentSelector childSelector` - селектира всички елемент, които съвпадат със селектора `childSelector` и се намират в елементи съвпадащи със селектора `parentSelector`

---

# Примери

```javascript
document.querySelectorAll('#foo');

document.querySelector('.foo-bar');

document.querySelectorAll('content.container [title="foobar"]:nth-child(2)');
```
---

# Shadow DOM

Част от стандарта на WebComponents. Позволява ни по-добра енкапсулация.

- Можем да създадем т.нар. "shadow root", който е корен на поддърво, което се третира по други правила от браузъра
- Създаденото поддърво е независимо откъм стилове

---

# Shadow DOM

```html
<template id="greeting">
  <style>
    h1 {
      color: red;
    }
  </style>
  <section>
    <h1>Hello, <content></content>!</h1>
  </section>
</template>
<div id="foo">Foobar</div>
```


```javascript
let root = document.querySelector('#foo').createShadowRoot();
let clone = document.importNode(document.querySelector('#greeting').content, true);
root.appendChild(clone);
```

---

# Template елемента

Позволява да добавим markup в документа без той да бъде обработван от браузъра.

Не е нужно да използваме `<script/>` тагове за добавяне на темплейти онлайн (както се случваше с Backbone и Handlebars).

---

# Content елемента

Позволява да правим "content projection". В случая чрез този елемент, можем да проектираме съдържание от light DOM в shadow DOM.

---

# Асинхронна обработка на код в браузъра

- `addEventListener` - Добавяне на код обслужващ събития
- `removeEventListener` - Изтриване на код обслужващ събития
- `setTimeout` - Добавяне на код, който да бъде изпълнен след определен интервал
- `clearTimeout`
- `setInterval` - Добавяне на код, който да бъде изпълняван на регулярни интервали от време
- `clearInterval`
- `XMLHttpRequest`
- `fetch`
- `Promise`
- `requestAnimationFrame`
- `WebSocket`
- `WebWorkers`
- и други

---

# DOM събития

Обработката на събития в DOM ни помага да реагираме при настъпването на определени "условия".
---
# Примери за събития

* _mouseenter_ - курсорът на мишката бива преместен върху даден DOM елемент
* _click_ - натискане на левия бутон на мишката при преместен курсор върху даден DOM елемент
* _keydown_ - натискане на бутон на клавиатурата при фокус на даден елемент
* _load_ - при зареждане на даден елемент (изображение, iframe, и други)
* и други...
---
# Обработка на събития

W3C стандартизира метода `addEventListener` на Node (`Node.prototype.addEventListener`),
който се използва за добавяне на функции, които обработват събития от определен (зададен) тип, към даден елемент.

(заб: тук под Node нямаме предвид Node.JS, а класът Node в DOM)

---
# addEventListener

`element.addEventListener(EVENT_NAME, HANDLER, CAPTURING)`

- `EVENT_NAME` - задава име на събитие, което искаме да обработваме с
- `HANDLER` - callback, който е отговорен за обработката на събитието
- `CAPTURING` - задава начина на "propagation" на събитията

---

# addEventListener

`addEventListener` ни позволява да добавяме няколко callback-а за едно
и също събитие към даден елемент.

---

# addEventListener

Пример:

```javascript
document.body.addEventListener('click', function (e) {
  console.log('The user just clicked onto the body');
}, false);
```
---

# event oбекта

Всеки callback получава като аргумент event обект. Някои от полетата на този event обект са:

* offsetY - Задава или връща y-координатата на курсора на мишката спрямо горния-ляв ъгъл на
позициониран родителски елемент (ancestor).
* offsetY - Задава или връща x-координатата на курсора на мишката спрямо горния-ляв ъгъл на
позициониран родителски елемент (ancestor).
* metaKey - Булева стойност индикираща дали meta бутонът на клавиатурата е натистнат
* altKey - Булева стойност индикираща дали alt бутонът на клавиатурата е натистнат
* shiftKey - Булева стойност индикираща дали shift бутонът на клавиатурата е натистнат
* ctrlKey - Булева стойност индикираща дали ctrl бутонът на клавиатурата е натистнат

---

* clientY - Връща y позицията на курсора по време на събитието спрямо горния десен ъгъл на window.
* clientX - Връща x позицията на курсора по време на събитието спрямо горния десен ъгъл на window.
* pageY - Връща y позицията на курсора по време на събитието спрямо document.
* pageX - Връща x позицията на курсора по време на събитието спрямо document.
* which - Връща unicode символ или номер на бутона на мишката, който е довел до събитието.
* keyCode - Връща идентификатор на бутона на клавиатурата, който е натистнат.
* cancelBubble - Задава дали искаме да прекратим bubbling на събитието.
* currentTarget - Връща текущия елемент, за който даденият еvent handler е извикан.
* target - Връща елемента, който е довел до задействане на събитието (източника).
* type - Връща типа на събитието (click, mousedown...).
---

# Bubbling & Capturing

![Bubbling & Capturing](http://www.guistuff.com/javascript/images/events_a.png)

---

# Bubbling

Стандартният начин за "propagation" на събитията е bottom-up - от child елемент към parent елемент:

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

```javascript
document.getElementById('parent').addEventListener('click', function () {
  console.log('parent');
});
document.getElementById('child').addEventListener('click', function () {
  console.log('child');
});
```

---

# Capturing

Алтернативен начин за обработка на събития е т.нар. capturing, където обработката се извършва в обратен ред:

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

```javascript
document.getElementById('parent').addEventListener('click', function () {
  console.log('parent');
}, true);
document.getElementById('child').addEventListener('click', function () {
  console.log('child');
}, true);
```
---

# on\*

Друг начин за добавяне на събития е чрез полетата на елементите `onEVENT_NAME`:

```
document.body.onclick = function (e) {
  console.log('Click on the body');
};

```

Недостатък

При него може да се добавя само еднин event handler, който евентуално да делегира изпълнението на
други методи.

Предимство

Като възможно *предимство* може да се отбележи факта, че имаме директен достъп до event handler без предварително да сме запазили референция към него.

По-добре не използвайте този начин за добавяне на event handlers.

---

# Премахване на събития

Премахването на събития се осъществява с метода: `removeEventListener`.
Той приема като аргумент име на събитие и callback, който да бъде премахнат.

**Метода трябва да бъде извикан с двата параметъра**, в противен случай
handler(s) няма да бъдат премахнат(и).

```javascript

var handler = function (e) {
  //...
};
el.addEventListener('click', handler);

//...

el.removeEventListener('click', handler);
```

---

# Премахване на събития

В случая, в който добавяме event handler от вида `onEVENT_NAME` премахването на даден handler може да се
осъществи като:

```javasctipt
document.body.onclick = function () {};
//...
document.body.onclick = undefined;
```

---

# Memory leaks

Много честа причина за memory leaks в JavaScript са именно забравени еvent handlers.

Заради създадения closure променливите от външните scope-ове на event handlers не могат да бъдат
премахнати, което води до невъзможност паметта да бъде освободена.

