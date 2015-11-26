# Събития в DOM

---
# Съдържание

* Добавяне на събития
  * addEventListener
    * eventObject
    * bubbling
    * capturing
  * on.\*
* Премахване на събития
* Memory leaks при обработката на събития
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

