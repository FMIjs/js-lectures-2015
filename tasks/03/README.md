I. Разширете прототипа на Array с функция myMap, която прилага функция към всеки елемент от масива и връща нов списък с резултата.

```javascript
[1,2,3,4,5,6,7,8,9].myMap(function(el){ return el + 10; }); // -> [11,12,13,14,15,16,17,18,19]
```

II. Напишете конструктор Vehicle, който взима един аргумент mileage, което е private свойство на обекта. Vehicle има следните методи: getMileage и toString.
getMilage връща стойността private свойството, а toString връща string: This Vehicle Mileage is <mileage> (mileage e обект с единствено свойство val!)

Напишете конструктор Car, който взима два аргумента: brand и consumption. Car има 3 метода:
    - drive(miles), който прибавя miles към mileage.val
    - getBrand(), който връща марката
    - getConsumption(), който връща consumption
    - toString(), който връща string съдържащ <brand> <consumption> + резултата от извикването на toString на "super" класа.

При създаването на нов обект от Car mileage.val трябва да бъде 0.

```javascript

var c1 = new Car('honda', 5);
c1.getMileage(); // -> 0
c1.toString(); // -> honda 5 This Vehicle mileage is 0
c1.drive(1000);
c1.getMileage(); // -> 1000
c1.toString(); // -> honda 5 This Vehicle mileage is 1000

```
Какво ще се случи, ако mileage не e обект, а е променлива?

III. Напишете конструктор Point, който взима 2 аргумента - x и y. Point има метод: toString, който връща - x, y. Напишете конструктор Point3D, който наследява
всички свойства на Point и има допълнителен аргумент z. Направете прототипно наследяване муждy Point3D и Point.
Напишете toString метод към прототипа на Point3D, който връща x, y, z като използва Point.toString за да върне x, y.
Напишете метод toArray към прототипа на Point, който връща координатите в списък. За Point3D toArray НЕ трябва бъде имплементиран, но ако бъде извикан той трябва да върне [x, y, z]

IV. Създайте библиотека FMIjs, която обработва списъци от числа и съдържа :
    1) BinaryHeap - клас с име MinHeap, чийто прототип има за прототип Array.prototype.
    2) heapSort - метод, който връща сортиран списък.

    MinHeap съдържа методи:
      - parentIndex
      - leftIndex
      - rightIndex
      - parentElement
      - leftElement
      - rightElement
      - getMinimum
      - isEmpty
      - insert (използвайте push, за слагане на елемент в списъка. Методът връща heap-а като string)
      - bubbleUp
      - bubbleDown

      и конструктор, който взима един аргумент - списък. Ако няма подаден списък или е подедено нещо друго да се създава празен heap.

(При създаване на повече от един heap методите на MinHeap трябва да се създадат само веднъж !)

Обяснете следния ефект:
```javascript
var b = new FMIjs.BinaryHeap();
b // -> []
b[0] = 1000;
b // -> []
b[0] // -> 1000
b.insert(5);
b // -> [5]
b[0] // -> 5
```
```javascript

var arr = [1,2,6,9,2,4,9,87,36,21,1];
FMIjs.heapSort(arr); // -> [1,1,2,2,4,6,9,9,21,36,87]

var b = FMIjs.BinaryHeap();
b.insert(5);
b.insert(10);
b.insert(1);

b.getMinimum(); //-> 1
b.getMinimum(); //-> 5
b.getMinimum(); //-> 10

```