# JavaScript @ ФМИ

### 2015/2016

---

# JavaScript като цяло

  * Client side (демек в браузъра)
  * Server side (демек не в браузъра)
  * На някои странни места (tessel.io)

---
# Ще си говорим за

  * Програмиране с JavaScript генерално
  * Какво е асинхронен код и защо го ползваме
  * Какво (не) харесваме в асинхронния код
  * Как да се справим с проблемите
  * Каква е разликата между server и client side JavaScript
  * ФУНКЦИОНАЛНО ПРОГРАМИРАНЕ!!!

---

# Бегъл план

  * Основните неща в езика
    * Променливи
    * Функции
    * Callbacks
    * Събития
  * По-интересни js специфични теми
    * ООП (без класове)
    * Прототипи
    * Наследяване

---

class: center
# За да е по-лесно за всички

## Node first

## Browser later

---

# Защото

 * Консистентност
 * Тестването с node е значително по-просто от тестването в браузър.
 * Не искаме да рискуваме изказвания като „ама то може и в браузъра“

---

# Лекции

 * Веднъж в седмицата
 * Три часа
 * Присъствието очевидно не е задължително
 * Но със сигурност помага много

???

 * Кои дни
 * От колко часа
 * Кои зали

---

# ~Упражнения

** &lt; see previous slide &gt; **

???

  * Кои дни
  * От колко часа
  * Кои зали

---

# Домашни

 * Планираме да са ~ веднъж на две седмици (<small>но сме реалисти</small>)
 * Обикновено срокът ще е една седмица
 * Ще се тестват автоматично
   * „Ама то sum е почти същото като summ“
   * „Е добре де, връщам String, а не Number, ама е правилно“
   * …
 * Очевидно ще формират част от оценката

???

  * Колко често(ни се иска)
  * Как ще се проверяват
  * Каква тежест

---

# Проекти

 * Не може да завършвате курса без проект
 * Няма проблем да е web, с back-end на друг език(ruby/go/perl/…)
 * Много харесваме идеята за нещо, което е тотално несвързано с web
 * Никога не е твърде рано да започнете
 * Трябва да одобрим идеята

По-лесно е да научите технология, ако я ползвате за реализирането на нещо, което ви е интересно

???

  * Добре е да се почнат възможно най-рано
  * Добрата идея помага да научиш нужната технология
  * Каква тежест ще имат?

---

# Тестове

 * Два на брой
   * В средата на семестъра
   * В края на семестъра/през сесията
 * В moodle
 * Може да изпуснете един
 * Може да поправите някой през сесията
 * НЕ РАЗЧИТАЙТЕ ТВЪРДЕ МНОГО НА ПОСЛЕДНИТЕ ДВЕ

---

# Дните

Ще се постараем да не сме толкова досадни. Да заспивате след курса и да се събуждате, за да дойдете на курса определено не е най-прекрасното преживяване. За нас също.

---

# And now for something completely different …

---
class: center
# UNIX
![Dennis Ritchie](img/dennis_ritchie.jpg)

???

Горещо препоръчваме ползването на UNIX-like среди.

---

# Но все пак

В [download секцията](http://nodejs.org/download) на сайта на nodejs има msi инсталатори.

---

# nvm/n

По ред причини глобалното инсталиране на node за dev цели не е твърде удобен подход.

Двата варианта, които предлагаме са [nvm](github.com/creationix/nvm) и [n](https://github.com/visionmedia/n).

---

# REPL demo

---

# Скриптове

Пишем програмата си във файл. След това подаваме името на файла като аргумент на `node` командата и по този начин го изпълняваме.

Изненадани сте, нали?

```sh
    $ cat hi.js
    function sayHi(name) {
      console.log('Hello, ' + name);
    }
    sayHi('Pencho');

    $ node hi.js
    Hello, Pencho
```
